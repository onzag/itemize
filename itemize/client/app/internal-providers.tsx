import React from "react";
import { gqlQuery, buildGqlQuery } from "./gql-querier";
import { GraphQLEndpointErrorType } from "../../base/errors";
import { ILocaleContextType } from ".";
import { Location } from "history";
import { GUEST_METAROLE } from "../../constants";
import CacheWorkerInstance from "../workers/cache";
import { ICacheMatchType } from "../workers/cache.worker";
import { deepMerge } from "../../gql-util";
import equals from "deep-equal";

export interface ITokenProviderState {
  token: string;
  id: number;
  role: string;
  error: GraphQLEndpointErrorType;
  isLoggingIn: boolean;
  isReady: boolean;
}

interface ITokenProviderProps {
  localeContext: ILocaleContextType;
  onProviderStateSet: (state: ITokenProviderState) => void;
}

export interface ITokenContextType extends ITokenProviderState {
  login: (username: string, password: string, token: string) => Promise<void>;
  logout: () => void;
  dismissError: () => void;
}

export const TokenContext = React.createContext<ITokenContextType>(null);

export class TokenProvider extends React.Component<ITokenProviderProps, ITokenProviderState> {
  constructor(props: ITokenProviderProps) {
    super(props);

    const hasStoredToken = !!localStorage.getItem("TOKEN");
    this.state = {
      token: null,
      id: null,
      role: GUEST_METAROLE,
      isLoggingIn: false,
      isReady: !hasStoredToken,
      error: null,
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }
  public componentDidMount() {
    const storedToken = localStorage.getItem("TOKEN");
    if (storedToken !== null) {
      this.login(null, null, storedToken);
    } else {
      this.props.onProviderStateSet(this.state);
    }
  }
  public async login(username: string, password: string, token: string) {
    if (this.state.isLoggingIn) {
      console.warn("Tried to login while logging in");
      return;
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

    if (!data) {
      const newState: ITokenProviderState = {
        isLoggingIn: false,
        id: parseInt(localStorage.getItem("ID"), 10),
        token: localStorage.getItem("TOKEN"),
        role: localStorage.getItem("ROLE"),
        error: {
          message: "Failed to connect",
          code: "CANT_CONNECT",
        },
        isReady: true,
      };
      this.setState(newState);
      this.props.onProviderStateSet(newState);
    } else {
      const tokenData = data.data && data.data.token;
      const tokenDataId = tokenData ? tokenData.id : null;
      const tokenDataRole = tokenData ? tokenData.role : null;
      const tokenDataToken = tokenData ? tokenData.token : null;
      if (tokenDataToken !== null) {
        localStorage.setItem("TOKEN", tokenDataToken);
        localStorage.setItem("ROLE", tokenDataRole);
        localStorage.setItem("ID", tokenDataId);
      } else {
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("ROLE");
        localStorage.removeItem("ID");
      }

      const error = data.errors ? data.errors[0].extensions : null;
      const newState: ITokenProviderState = {
        isLoggingIn: false,
        id: tokenDataId,
        token: tokenDataToken,
        role: tokenDataRole,
        isReady: true,
        // when it's not ready and the login is automatic
        // we might want to ignore errors, user just got
        // logged off automatically, likely his token expired
        // otherwise errors might appear in off places
        error: this.state.isReady ? error : null,
      };

      if (tokenDataToken !== null) {
        console.log("user", tokenDataId, tokenDataRole, "logged in");
      } else {
        console.log("credentials deemed invalid", error);
      }

      this.setState(newState);
      this.props.onProviderStateSet(newState);

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
            await CacheWorkerInstance.instance.getCachedValue("GET_MOD_users__IDEF_user", tokenDataId, fields);
          if (cachedValue && cachedValue.value && cachedValue.value.DATA) {
            cachedData.app_country = cachedValue.value.DATA.app_country;
            cachedData.app_currency = cachedValue.value.DATA.app_currency;
            cachedData.app_language = cachedValue.value.DATA.app_language;
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
          const localeUserData = userLanguageData.data.GET_MOD_users__IDEF_user.DATA;
          // we still check everything just in case the user is blocked
          if (localeUserData) {
            console.log("user locale is", localeUserData);
            if (
              localeUserData.app_country !== cachedData.app_country &&
              this.props.localeContext.country !== localeUserData.app_country
            ) {
              this.props.localeContext.changeCountryTo(localeUserData.app_country, true, true);
            }
            if (
              localeUserData.app_language !== cachedData.app_language &&
              this.props.localeContext.language !== localeUserData.app_language
            ) {
              this.props.localeContext.changeLanguageTo(localeUserData.app_language, true);
            }
            if (
              localeUserData.app_currency !== cachedData.app_currency &&
              this.props.localeContext.currency !== localeUserData.app_currency
            ) {
              this.props.localeContext.changeCurrencyTo(localeUserData.app_currency, true);
            }
          }

          if (CacheWorkerInstance.isSupported) {
            const newCachedValue = userLanguageData.data.GET_MOD_users__IDEF_user;
            CacheWorkerInstance.instance.mergeCachedValue(
              "GET_MOD_users__IDEF_user", tokenDataId, newCachedValue, fields,
            );
          }
        }
      }
    }
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
