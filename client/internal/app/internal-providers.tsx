import React from "react";
import { gqlQuery, buildGqlQuery, IGQLValue } from "../../../gql-querier";
import { EndpointErrorType } from "../../../base/errors";
import { ILocaleContextType } from ".";
import { Location } from "history";
import { GUEST_METAROLE, ENDPOINT_ERRORS } from "../../../constants";
import CacheWorkerInstance from "../workers/cache";

export interface ITokenProviderState {
  token: string;
  id: number;
  role: string;
  error: EndpointErrorType;
  isLoggingIn: boolean;
  isReady: boolean;
}

interface ITokenProviderProps {
  localeContext: ILocaleContextType;
  onProviderStateSet: (state: ITokenProviderState) => void;
}

export interface ITokenContextType extends ITokenProviderState {
  login: (username: string, password: string, token: string) => Promise<{id: number, role: string, error: EndpointErrorType}>;
  logout: () => void;
  dismissError: () => void;
}

export const TokenContext = React.createContext<ITokenContextType>(null);

export class TokenProvider extends React.Component<ITokenProviderProps, ITokenProviderState> {
  constructor(props: ITokenProviderProps) {
    super(props);

    this.state = {
      token: null,
      id: null,
      role: GUEST_METAROLE,
      isLoggingIn: false,
      isReady: false,
      error: null,
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }
  public componentDidMount() {
    const storedToken = localStorage.getItem("TOKEN");
    if (storedToken !== null) {
      this.login(null, null, storedToken, true);
    } else {
      const newState: ITokenProviderState = {
        ...this.state,
        isReady: true,
      };
      this.props.onProviderStateSet(newState);
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
      tokenDataRole = tokenData ? tokenData.role as string : null;
      tokenDataToken = tokenData ? tokenData.token as string : null;
      if (tokenDataToken !== null) {
        localStorage.setItem("TOKEN", tokenDataToken as string);
        localStorage.setItem("ROLE", tokenDataRole as string);
        localStorage.setItem("ID", tokenDataId.toString());
      } else {
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("ROLE");
        localStorage.removeItem("ID");
      }
    } else {
      tokenDataId = parseInt(localStorage.getItem("ID")) || null;
      tokenDataRole = localStorage.getItem("ROLE");
      tokenDataToken = localStorage.getItem("TOKEN");
    }

    const newState: ITokenProviderState = {
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
    }

    this.props.onProviderStateSet(newState);
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
        app_country: null,
        app_currency: null,
        app_language: null,
      };
      if (CacheWorkerInstance.isSupported) {
        const cachedValue =
          await CacheWorkerInstance.instance.getCachedValue(
            "GET_MOD_users__IDEF_user", tokenDataId as number, null, fields);
        if (cachedValue && cachedValue.value && cachedValue.value.DATA) {
          cachedData.app_country = (cachedValue.value.DATA as IGQLValue).app_country;
          cachedData.app_currency = (cachedValue.value.DATA as IGQLValue).app_currency;
          cachedData.app_language = (cachedValue.value.DATA as IGQLValue).app_language;
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
      role: tokenDataRole as string || null,
      error: error || null,
    };
  }
  public logout() {
    if (this.state.isLoggingIn) {
      console.warn("Tried to logout while logging in");
      return;
    }
    localStorage.removeItem("TOKEN");
    CacheWorkerInstance.instance.deleteCachedValue(
      "GET_MOD_users__IDEF_user",
      this.state.id,
      null,
    );
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

export const LocationStateContext = React.createContext<Location>(null);
