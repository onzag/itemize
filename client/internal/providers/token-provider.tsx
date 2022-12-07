/**
 * The token provider component
 * @module
 */

import React from "react";
import { gqlQuery, buildGqlQuery, IGQLValue } from "../../../gql-querier";
import { EndpointErrorType } from "../../../base/errors";
import { ILocaleContextType } from "./locale-provider";
import { GUEST_METAROLE, ENDPOINT_ERRORS, MEMCACHED_DESTRUCTION_MARKERS_LOCATION, DESTRUCTION_MARKERS_LOCATION, PREFIX_GET, SEARCH_DESTRUCTION_MARKERS_LOCATION, MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION, PREFIX_SEARCH } from "../../../constants";
import CacheWorkerInstance from "../workers/cache";
import equals from "deep-equal";
import { ISSRContextType, SSRContext } from "./ssr-provider";
import { getCookie, COOKIE_EXPIRATION_DATE } from "../..";

/**
 * State for the actual token provider that actually
 * gets the job done
 */
export interface IActualTokenProviderState {
  /**
   * The token we have got now
   */
  token: string;
  /**
   * The user id
   */
  id: string;
  /**
   * The user role
   */
  role: string;
  /**
   * An error that occured during login
   */
  error: EndpointErrorType;
  /**
   * Whether it's currently logging in
   */
  isLoggingIn: boolean;
  /**
   * Whether it's ready, the main component won't render
   * if is ready is false, because all query execution might mess up
   * say your token is invalid then you'll get a zillion errors and request
   * that will dissapear right away and interface flicker
   * 
   * is ready should be true in SSR mode as the server has "checked"
   * the token
   */
  isReady: boolean;
}

/**
 * The provider props that it takes
 */
interface ITokenProviderProps {
  /**
   * the locale context, the locale context allows for updating
   * the current language, country and currency that the app is running in
   * while optimally the rendered value matches the cookie, it's totally possible
   * eg. after a login event that this is not the case, this will happen
   * for both automatic logic and manual login, the language will be switched
   * to the one the user has setup if there's any mismatch
   */
  localeContext: ILocaleContextType;
  /**
   * A function to trigger once the provider state has been set
   * @param state the internal state of the token provider
   * @param logout the function to call when logout is called by the remote listener on
   * a kicked event
   */
  onProviderStateSet: (state: IActualTokenProviderState, logout: () => void) => void;
  /**
   * The children that will render, when the provider is ready
   */
  children: React.ReactNode;
}

/**
 * The actual props are the same as the normal props but
 * with the ssr context injected in it, this context is static
 */
interface IActualTokenProviderProps extends ITokenProviderProps {
  ssrContext: ISSRContextType;
}

/**
 * The token context which actually extends its own internal state
 * but with a couple of functions
 */
export interface ITokenContextType extends IActualTokenProviderState {
  /**
   * the login function
   * @param username the username to login with (can also be an email)
   * @param password the password to login with
   * @param token you can leave username and passwor as null, and provide a token
   * instead, so you are login in by token rather than by anything else, this
   * is used in the initial login
   * @returns a promise with the id, role and a possible error
   */
  login: (username: string, password: string, token: string) => Promise<{ id: string, role: string, error: EndpointErrorType }>;
  /**
   * logout function, for the logoutAll functionality check the LogActioner as it's a complex function
   * the token provider only manages simple functionality about the current app state
   */
  logout: () => void;
  /**
   * Dismiss the current login error
   */
  dismissError: () => void;
}

/**
 * The token context contains the current token state as well as several
 * functions, it should sit inside the application and over the main
 * component
 */
export const TokenContext = React.createContext<ITokenContextType>(null);

/**
 * The token provider that creates the token context
 * @param props the props for the token provider
 * @returns a react element
 */
export function TokenProvider(props: ITokenProviderProps) {
  return (
    <SSRContext.Consumer>
      {(ssrContext) => (
        <ActualTokenProvider ssrContext={ssrContext} {...props} />
      )}
    </SSRContext.Consumer>
  )
}

/**
 * The actual token provider class that actually performs the token
 * management logic
 */
class ActualTokenProvider extends React.Component<IActualTokenProviderProps, IActualTokenProviderState> {
  constructor(props: IActualTokenProviderProps) {
    super(props);

    // so we start to build our initial state by default
    const initialState: IActualTokenProviderState = {
      // we have no token, no id, and we are just a GUEST,
      token: null,
      id: null,
      role: GUEST_METAROLE,
      isLoggingIn: false,
      isReady: false,
      error: null,
    };

    // now login is done by the actual token provider if it deems
    // necessary when it mounts, but by default it will be a guest
    // and non ready, so the main component that sits under it
    // won't render at all

    // but if we are in the ssr 
    if (props.ssrContext) {
      // then we can set the token from it
      initialState.token = props.ssrContext.user.token || null;
      // and if it specifies the IN_COOKIE for the token
      // which means read from the cookie, for security reasons
      if (initialState.token === "IN_COOKIE") {
        // then we do so
        initialState.token = getCookie("token");
      }

      // now we set the id, role, and we say that we are indeed ready
      // the ssr info means that the server has validated all this
      // so we don't even need to recheck
      initialState.id = props.ssrContext.user.id || null;
      initialState.role = props.ssrContext.user.role || GUEST_METAROLE;
      initialState.isReady = true;
    }

    // set the initial state
    this.state = initialState;

    // bind the functions
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  public componentDidMount() {
    // happens if SSR happened, it has already
    // been validated by the server side render service
    if (this.state.isReady) {
      // so we go and call the function for the state being set with our
      // logout function
      this.props.onProviderStateSet(this.state, this.logout);
      return;
    }

    // now we are going to the non-SSR route
    // we get our stored token
    const storedToken = getCookie("token");
    // if we got one of those
    if (storedToken !== null) {
      // we call the login functionality
      this.login(null, null, storedToken, true);

      // otherwise with no stored token
      // aka no user logged in
    } else {
      // since the guest is our default, we just make ourselves ready
      const newState: IActualTokenProviderState = {
        ...this.state,
        isReady: true,
      };
      // we call the function for the provider state set
      // since login which would call it, is not in use
      this.props.onProviderStateSet(newState, this.logout);
      // and then we set the state here
      this.setState(newState);
    }
  }

  public shouldComponentUpdate(nextProps: IActualTokenProviderProps, nextState: IActualTokenProviderState) {
    // we only want to upate if these two differ, the ssrContext is static anyway
    return !equals(this.state, nextState, { strict: true }) ||
      nextProps.localeContext !== this.props.localeContext;
  }

  /**
   * The login function in the token provider
   * @param username the username (can also be an email)
   * @param password the password to validate with
   * @param token an alternative token, login with a token rather than the username and password combo,
   * for that make both username an password null and set this one
   * @param doNotShowLoginError avoid showing the login error, basically it won't set the state to error
   * it'd fail silently, this is useful for the initial login, where if we were logged out somehow, we
   * just fail silently and appear not logged in
   * @retuns a promise with the id, role and an error
   */
  public async login(
    username: string,
    password: string,
    token: string,
    doNotShowLoginError?: boolean,
  ): Promise<{ id: string, role: string, error: EndpointErrorType }> {

    // if we are already logging in
    if (this.state.isLoggingIn) {
      console.warn("Tried to login while logging in");
      return null;
    }

    // now we are logging in
    this.setState({
      isLoggingIn: true,
    });

    // we do the token request
    const data = await gqlQuery(
      buildGqlQuery(
        {
          name: "token",
          args: {
            username,
            password,
            token,
            country: this.props.localeContext.country,
          },
          fields: {
            id: {},
            role: {},
            token: {},
          },
        },
      ),
    );

    // and get the error
    const error = data.errors ? data.errors[0].extensions : null;
    // maybe it's offline, in which case we don't want to make the user
    // seem as logged out as that would break the flow
    const isOffline = error && error.code === ENDPOINT_ERRORS.CANT_CONNECT;

    // so we need to set these
    let tokenDataId: string = null;
    let tokenDataRole: string = null;
    let tokenDataToken: string = null;

    // if we are not offline
    if (!isOffline) {
      // then let's get the token data our server has given us
      const tokenData = data.data && data.data.token;
      // as well as these
      tokenDataId = tokenData ? tokenData.id as string : null;
      tokenDataRole = tokenData ? tokenData.role as string : GUEST_METAROLE;
      tokenDataToken = tokenData ? tokenData.token as string : null;

      let cookieEnd = ";domain=" + location.hostname;
      if (location.hostname !== "localhost") {
        cookieEnd = ";secure=true";
      }

      // so if we got the token, and assumingly an id and role; aka
      // we are not guests
      if (tokenDataToken !== null) {
        // we set them
        document.cookie = "token=" + tokenDataToken + ";expires=" + COOKIE_EXPIRATION_DATE + ";path=/" + cookieEnd;
        document.cookie = "role=" + tokenDataRole + ";expires=" + COOKIE_EXPIRATION_DATE + ";path=/" + cookieEnd;
        document.cookie = "id=" + tokenDataId + ";expires=" + COOKIE_EXPIRATION_DATE + ";path=/" + cookieEnd;
      } else {
        // otherwise we want to remove these cookies
        document.cookie = "token=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/" + cookieEnd;
        document.cookie = "role=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/" + cookieEnd;
        document.cookie = "id=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/" + cookieEnd;
      }
    } else {
      // otherwise if we are offline, we are going to trust our cookies
      // for the result
      tokenDataId = getCookie("id") || null;
      tokenDataRole = getCookie("role") || GUEST_METAROLE;
      tokenDataToken = getCookie("token");
    }

    // now this will be our new state
    const newState: IActualTokenProviderState = {
      isLoggingIn: false,
      id: tokenDataId as string,
      token: tokenDataToken as string,
      role: tokenDataRole as string,
      isReady: true,
      // when it's not ready and the login is automatic
      // we might want to ignore errors, user just got
      // logged off automatically, likely his token expired
      // otherwise errors might appear in off places
      error: !doNotShowLoginError ? error : null,
    };

    // we show these logged information
    if (tokenDataToken !== null) {
      console.log("user", tokenDataId, tokenDataRole, "logged in");
    } else {
      // but if we have no token, not even in offline mode, aka, we have been
      // logged out at some point, we need to destroy the logged in information
      // from the destruction markers
      console.log("credentials deemed invalid", error);
      this.cleanAndDestroyLoggedData();
    }

    // so now we call the provider state set function
    this.props.onProviderStateSet(newState, this.logout);
    // and then set the state
    this.setState(newState);

    // and that what we did was enough for
    // all, however, now we need to get our localization custom
    // user information to update the UI, so if we got an user
    if (tokenDataId) {

      // we need to get these fields
      const fields = {
        DATA: {
          app_country: {},
          app_language: {},
          app_currency: {},
        },
        last_modified: {},
      };
      const cachedData = {
        app_country: null as string,
        app_currency: null as string,
        app_language: null as string,
      };

      // so if we got a cache, we will give it a go first, regardless
      // this should work in offline mode too
      if (CacheWorkerInstance.isSupported) {
        // we get the cached value for this query
        const cachedValue =
          await CacheWorkerInstance.instance.getCachedValue(
            "GET_MOD_users__IDEF_user", tokenDataId as string, null, fields);

        // and if we got one, we will update
        if (cachedValue && cachedValue.value && cachedValue.value.DATA) {
          // first saved the cachedData we got
          cachedData.app_country = (cachedValue.value.DATA as IGQLValue).app_country as string;
          cachedData.app_currency = (cachedValue.value.DATA as IGQLValue).app_currency as string;
          cachedData.app_language = (cachedValue.value.DATA as IGQLValue).app_language as string;
          console.log("cached user locale is", cachedData);

          // and then we will update if deemed necessary
          if (this.props.localeContext.country !== cachedData.app_country) {
            this.props.localeContext.changeCountryTo(cachedData.app_country, false, true, true);
          }
          if (this.props.localeContext.language !== cachedData.app_language) {
            this.props.localeContext.changeLanguageTo(cachedData.app_language, true);
          }
          if (this.props.localeContext.currency !== cachedData.app_currency) {
            this.props.localeContext.changeCurrencyTo(cachedData.app_currency, true);
          }
        }
      }

      // now if we are not offline we can actually
      // do this one and actually request the server for info
      if (!isOffline) {
        // we build the grapqhl query for it and run it raw
        const userLanguageData = await gqlQuery(
          buildGqlQuery(
            {
              name: "GET_MOD_users__IDEF_user",
              args: {
                token: tokenDataToken,
                language: this.props.localeContext.language.split("-")[0],
                id: tokenDataId,
              },
              fields,
            },
          ),
        );

        // now if the request actually succeeded
        if (userLanguageData && userLanguageData.data && userLanguageData.data.GET_MOD_users__IDEF_user) {
          const localeUserData: IGQLValue = userLanguageData.data.GET_MOD_users__IDEF_user.DATA as IGQLValue;
          // we still check everything just in case the user is blocked
          if (localeUserData) {
            console.log("user locale is", localeUserData);

            // and now we can try to update if anything
            if (
              localeUserData.app_country !== cachedData.app_country &&
              this.props.localeContext.country !== localeUserData.app_country
            ) {
              this.props.localeContext.changeCountryTo(localeUserData.app_country as string, true, true);
            }
            if (
              localeUserData.app_language !== cachedData.app_language &&
              this.props.localeContext.language !== localeUserData.app_language
            ) {
              this.props.localeContext.changeLanguageTo(localeUserData.app_language as string, true);
            }
            if (
              localeUserData.app_currency !== cachedData.app_currency &&
              this.props.localeContext.currency !== localeUserData.app_currency
            ) {
              this.props.localeContext.changeCurrencyTo(localeUserData.app_currency as string, true);
            }
          }

          // and if our cache is supported
          if (CacheWorkerInstance.isSupported) {
            // we do merge the thing if possible
            const newCachedValue = userLanguageData.data.GET_MOD_users__IDEF_user;
            CacheWorkerInstance.instance.mergeCachedValue(
              "GET_MOD_users__IDEF_user", tokenDataId as string, null, newCachedValue, fields,
            );
          }
        }
      }
    }

    // and now we return the info about this
    return {
      id: tokenDataId as string || null,
      role: tokenDataRole as string || GUEST_METAROLE,
      error: error || null,
    };
  }

  /**
   * Cleans all the destruction markers
   */
  public cleanAndDestroyLoggedData() {
    // removing the user data
    document.cookie = "token=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/";
    document.cookie = "role=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/";
    document.cookie = "id=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/";

    // gathering the destruction markers
    const destructionMarkers =
      // if we have memcached them, pick those
      (window as any)[MEMCACHED_DESTRUCTION_MARKERS_LOCATION] ||
      // otherwise get them from local storage
      JSON.parse(localStorage.getItem(DESTRUCTION_MARKERS_LOCATION) || "{}");
    // clean them from the memory cache to match local storage
    (window as any)[MEMCACHED_DESTRUCTION_MARKERS_LOCATION] = {};
    // as we delete from local storage as well
    localStorage.removeItem(DESTRUCTION_MARKERS_LOCATION);

    // now we loop over the destruction markers
    Object.keys(destructionMarkers).forEach((qualifiedPathName: string) => {
      destructionMarkers[qualifiedPathName].forEach((marker: [string, string]) => {
        // and delete everything within it
        CacheWorkerInstance.instance.deleteCachedValue(
          PREFIX_GET + qualifiedPathName,
          marker[0],
          marker[1],
        );
      });
    });

    // gathering the search destruction markers
    const searchDestructionMarkers =
      // if we have memcached them, pick those
      (window as any)[MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION] ||
      // otherwise get them from local storage
      JSON.parse(localStorage.getItem(SEARCH_DESTRUCTION_MARKERS_LOCATION) || "{}");
  
    // clean them from the memory cache to match local storage
    (window as any)[MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION] = {};
    // as we delete from local storage as well
    localStorage.removeItem(SEARCH_DESTRUCTION_MARKERS_LOCATION);

    // now we loop over the destruction markers
    Object.keys(searchDestructionMarkers).forEach((qualifiedPathName: string) => {
      searchDestructionMarkers[qualifiedPathName].forEach((marker: [string, string, [string, string, string], [string, string]]) => {
        // and delete everything within it
        CacheWorkerInstance.instance.deleteCachedSearch(
          PREFIX_SEARCH + qualifiedPathName,
          marker[0] as any,
          marker[1],
          marker[2],
          marker[3],
        );
      });
    });
  }

  /**
   * Performs the logout process
   */
  public logout() {
    if (this.state.isLoggingIn) {
      console.warn("Tried to logout while logging in");
      return;
    }

    this.cleanAndDestroyLoggedData();

    // now we update the state
    this.setState({
      id: null,
      token: null,
      role: GUEST_METAROLE,
    });
  }

  /**
   * Removes the current login error
   */
  public dismissError() {
    this.setState({
      error: null,
    });
  }

  /**
   * Render function
   */
  public render() {
    if (!this.state.isReady) {
      return null;
    }
    return (
      <TokenContext.Provider
        value={{
          ...this.state,
          login: this.login,
          logout: this.logout,
          dismissError: this.dismissError,
        }}
      >
        {this.props.children}
      </TokenContext.Provider>
    );
  }
}
