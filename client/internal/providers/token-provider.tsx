import React from "react";
import { gqlQuery, buildGqlQuery, IGQLValue } from "../../../gql-querier";
import { EndpointErrorType } from "../../../base/errors";
import { ILocaleContextType } from "../app";
import { GUEST_METAROLE, ENDPOINT_ERRORS, MEMCACHED_DESTRUCTION_MARKERS_LOCATION, DESTRUCTION_MARKERS_LOCATION, PREFIX_GET } from "../../../constants";
import CacheWorkerInstance from "../workers/cache";
import equals from "deep-equal";
import { ISSRContextType, SSRContext } from "./ssr-provider";
import { getCookie } from "../..";

export interface IActualTokenProviderState {
  token: string;
  id: number;
  role: string;
  error: EndpointErrorType;
  isLoggingIn: boolean;
  isReady: boolean;
}

interface ITokenProviderProps {
  localeContext: ILocaleContextType;
  onProviderStateSet: (state: IActualTokenProviderState, logout: () => void) => void;
  children: React.ReactNode;
}

interface IActualTokenProviderProps extends ITokenProviderProps {
  ssrContext: ISSRContextType;
}

export interface ITokenContextType extends IActualTokenProviderState {
  login: (username: string, password: string, token: string) => Promise<{id: number, role: string, error: EndpointErrorType}>;
  logout: () => void;
  dismissError: () => void;
}

export const TokenContext = React.createContext<ITokenContextType>(null);

export function TokenProvider(props: ITokenProviderProps) {
  return (
    <SSRContext.Consumer>
      {(ssrContext) => (
        <ActualTokenProvider ssrContext={ssrContext} {...props}/>
      )}
    </SSRContext.Consumer>
  )
}

class ActualTokenProvider extends React.Component<IActualTokenProviderProps, IActualTokenProviderState> {
  constructor(props: IActualTokenProviderProps) {
    super(props);

    const initialState: IActualTokenProviderState = {
      token: null,
      id: null,
      role: GUEST_METAROLE,
      isLoggingIn: false,
      isReady: false,
      error: null,
    };

    if (props.ssrContext) {
      initialState.token = props.ssrContext.user.token || null;
      if (initialState.token === "IN_COOKIE") {
        initialState.token = getCookie("token");
      }
      initialState.id = props.ssrContext.user.id || null;
      initialState.role = props.ssrContext.user.role || GUEST_METAROLE;
      initialState.isReady = true;
    }
    
    this.state = initialState;

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }
  public shouldComponentUpdate(nextProps: IActualTokenProviderProps, nextState: IActualTokenProviderState) {
    return !equals(this.state, nextState) ||
      nextProps.localeContext !== this.props.localeContext;
  }
  public componentDidMount() {
    // happens if SSR happened, it has already
    // been validated by the server side render service
    // sometimes this doesn't happen nevertheless
    if (this.state.isReady) {
      this.props.onProviderStateSet(this.state, this.logout);
      return;
    }
    const storedToken = getCookie("token");
    if (storedToken !== null) {
      this.login(null, null, storedToken, true);
    } else {
      const newState: IActualTokenProviderState = {
        ...this.state,
        isReady: true,
      };
      this.props.onProviderStateSet(newState, this.logout);
      this.setState(newState);
    }
  }
  public async login(
    username: string,
    password: string,
    token: string,
    doNotShowLoginError?: boolean,
  ): Promise<{id: number, role: string, error: EndpointErrorType}> {
    if (this.state.isLoggingIn) {
      console.warn("Tried to login while logging in");
      return null;
    }
    this.setState({
      isLoggingIn: true,
    });
    const data = await gqlQuery(
      buildGqlQuery(
        {
          name: "token",
          args: {
            username,
            password,
            token,
          },
          fields: {
            id: {},
            role: {},
            token: {},
          },
        },
      ),
    );

    const error = data.errors ? data.errors[0].extensions : null;
    const isOffline = error && error.code === ENDPOINT_ERRORS.CANT_CONNECT;

    let tokenDataId: number = null;
    let tokenDataRole: string = null;
    let tokenDataToken: string = null;

    if (!isOffline) {
      const tokenData = data.data && data.data.token;
      tokenDataId = tokenData ? tokenData.id as number : null;
      tokenDataRole = tokenData ? tokenData.role as string : GUEST_METAROLE;
      tokenDataToken = tokenData ? tokenData.token as string : null;
      if (tokenDataToken !== null) {
        document.cookie = "token=" + tokenDataToken + ";path=/";
        document.cookie = "role=" + tokenDataRole + ";path=/";
        document.cookie = "id=" + tokenDataId + ";path=/";
      } else {
        document.cookie = "token=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/";
        document.cookie = "role=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/";
        document.cookie = "id=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/";
      }
    } else {
      tokenDataId = parseInt(getCookie("id")) || null;
      tokenDataRole = getCookie("role") || GUEST_METAROLE;
      tokenDataToken = getCookie("token");
    }

    const newState: IActualTokenProviderState = {
      isLoggingIn: false,
      id: tokenDataId as number,
      token: tokenDataToken as string,
      role: tokenDataRole as string,
      isReady: true,
      // when it's not ready and the login is automatic
      // we might want to ignore errors, user just got
      // logged off automatically, likely his token expired
      // otherwise errors might appear in off places
      error: !doNotShowLoginError ? error : null,
    };

    if (tokenDataToken !== null) {
      console.log("user", tokenDataId, tokenDataRole, "logged in");
    } else {
      console.log("credentials deemed invalid", error);
      this.cleanAndDestroyLoggedData();
    }

    this.props.onProviderStateSet(newState, this.logout);
    this.setState(newState);

    if (tokenDataId) {
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
      if (CacheWorkerInstance.isSupported) {
        const cachedValue =
          await CacheWorkerInstance.instance.getCachedValue(
            "GET_MOD_users__IDEF_user", tokenDataId as number, null, fields);
        if (cachedValue && cachedValue.value && cachedValue.value.DATA) {
          cachedData.app_country = (cachedValue.value.DATA as IGQLValue).app_country as string;
          cachedData.app_currency = (cachedValue.value.DATA as IGQLValue).app_currency as string;
          cachedData.app_language = (cachedValue.value.DATA as IGQLValue).app_language as string;
          console.log("cached user locale is", cachedData);
          if (this.props.localeContext.country !== cachedData.app_country) {
            this.props.localeContext.changeCountryTo(cachedData.app_country, true, true);
          }
          if (this.props.localeContext.language !== cachedData.app_language) {
            this.props.localeContext.changeLanguageTo(cachedData.app_language, true);
          }
          if (this.props.localeContext.currency !== cachedData.app_currency) {
            this.props.localeContext.changeCurrencyTo(cachedData.app_currency, true);
          }
        }
      }

      if (!isOffline) {
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

        if (userLanguageData && userLanguageData.data && userLanguageData.data.GET_MOD_users__IDEF_user) {
          const localeUserData: IGQLValue = userLanguageData.data.GET_MOD_users__IDEF_user.DATA as IGQLValue;
          // we still check everything just in case the user is blocked
          if (localeUserData) {
            console.log("user locale is", localeUserData);
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

          if (CacheWorkerInstance.isSupported) {
            const newCachedValue = userLanguageData.data.GET_MOD_users__IDEF_user;
            CacheWorkerInstance.instance.mergeCachedValue(
              "GET_MOD_users__IDEF_user", tokenDataId as number, null, newCachedValue, fields,
            );
          }
        }
      }
    }

    return {
      id: tokenDataId as number || null,
      role: tokenDataRole as string || GUEST_METAROLE,
      error: error || null,
    };
  }
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
      destructionMarkers[qualifiedPathName].forEach((marker: [number, string]) => {
        // and delete everything within it
        CacheWorkerInstance.instance.deleteCachedValue(
          PREFIX_GET + qualifiedPathName,
          marker[0],
          marker[1],
        );
      });
    });
  }
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
  public dismissError() {
    this.setState({
      error: null,
    });
  }
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
