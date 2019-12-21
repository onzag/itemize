import React from "react";
import { gqlQuery, buildGqlQuery } from "./gql-querier";
import { GraphQLEndpointErrorType } from "../../base/errors";
import { ILocaleContextType } from ".";
import { Location } from "history";

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
  login: (username: string, password: string, token: string) => void;
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
      role: "GUEST",
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
        id: null,
        token: null,
        role: "GUEST",
        error: {
          message: "Failed to connect",
          code: "CANT_CONNECT",
        },
        isReady: true,
      };
      this.setState(newState);
      this.props.onProviderStateSet(newState);
    } else {
      const tokenData = data.data.token;
      const tokenDataId = tokenData ? tokenData.id : null;
      const tokenDataRole = tokenData ? tokenData.role : null;
      const tokenDataToken = tokenData ? tokenData.token : null;
      if (tokenDataToken !== null) {
        localStorage.setItem("TOKEN", tokenDataToken);
      } else {
        localStorage.removeItem("TOKEN");
      }

      const newState: ITokenProviderState = {
        isLoggingIn: false,
        id: tokenDataId,
        token: tokenDataToken,
        role: tokenDataRole,
        isReady: true,
        error: data.errors ? data.errors[0].extensions : null,
      };

      console.log("user", tokenDataId, tokenDataRole, "logged in");

      this.setState(newState);
      this.props.onProviderStateSet(newState);

      // TODO clear cache?... all of it?...
      // thinking how loading changes depending of
      // on the user role

      if (tokenDataId) {
        const userLanguageData = await gqlQuery(
          buildGqlQuery(
            {
              name: "GET_MOD_users__IDEF_user",
              args: {
                token: tokenDataToken,
                language: this.props.localeContext.language.split("-")[0],
                country: this.props.localeContext.country,
                id: tokenDataId,
              },
              fields: {
                DATA: {
                  app_country: {},
                  app_lang_locale: {},
                  currency: {},
                },
              },
            },
          ),
        );

        if (userLanguageData && userLanguageData.data && userLanguageData.data.GET_MOD_users__IDEF_user) {
          const localeUserData = userLanguageData.data.GET_MOD_users__IDEF_user.DATA;
          // we still check everything just in case the user is blocked
          if (localeUserData) {
            console.log("user locale is", localeUserData);
            if (this.props.localeContext.country !== localeUserData.app_country) {
              this.props.localeContext.changeCountryTo(localeUserData.app_country, true, true);
            }
            if (this.props.localeContext.language !== localeUserData.app_lang_locale) {
              this.props.localeContext.changeLanguageTo(localeUserData.app_lang_locale, true);
            }
            if (this.props.localeContext.currency !== localeUserData.currency) {
              this.props.localeContext.changeCurrencyTo(localeUserData.currency, true);
            }
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
    localStorage.removeItem("ID");
    localStorage.removeItem("ROLE");
    this.setState({
      id: null,
      token: null,
      role: "GUEST",
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
