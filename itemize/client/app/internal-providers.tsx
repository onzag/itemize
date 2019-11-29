import React from "react";
import { gqlQuery, buildGqlQuery } from "./gql-querier";
import { GraphQLEndpointErrorType } from "../../base/errors";
import { ILocaleContextType } from ".";
import { PREFIX_GET } from "../../constants";

interface ITokenProviderState {
  token: string;
  id: number;
  role: string;
  error: GraphQLEndpointErrorType;
  isLoggingIn: boolean;
}

interface ITokenProviderProps {
  localeContext: ILocaleContextType;
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

    this.state = {
      token: localStorage.getItem("TOKEN") || null,
      id: parseInt(localStorage.getItem("ID"), 10) || null,
      role: localStorage.getItem("ROLE") || null,
      isLoggingIn: false,
      error: null,
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  public componentDidMount() {
    if (this.state.token !== null) {
      this.login(null, null, this.state.token);
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
      this.setState({
        isLoggingIn: false,
        id: null,
        token: null,
        role: null,
        error: {
          message: "Failed to connect",
          code: "CANT_CONNECT",
        },
      });
    } else {
      if (data.errors) {
        this.setState({
          error: data.errors[0].extensions,
        });
      } else {
        this.setState({
          error: null,
        });
      }
      const tokenData = data.data.token;
      const tokenDataId = tokenData ? tokenData.id : null;
      const tokenDataRole = tokenData ? tokenData.role : null;
      const tokenDataToken = tokenData ? tokenData.token : null;
      if (tokenDataToken !== null) {
        localStorage.setItem("TOKEN", tokenDataToken);
      } else {
        localStorage.removeItem("TOKEN");
      }
      if (tokenDataId !== null) {
        localStorage.setItem("ID", tokenDataId);
      } else {
        localStorage.removeItem("ID");
      }
      if (tokenDataRole !== null) {
        localStorage.setItem("ROLE", tokenDataRole);
      } else {
        localStorage.removeItem("ROLE");
      }
      this.setState({
        isLoggingIn: false,
        id: tokenDataId,
        token: tokenDataToken,
        role: tokenDataRole,
      });

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
            if (this.props.localeContext.country !== localeUserData.app_country) {
              this.props.localeContext.changeCountryTo(localeUserData.app_country);
            }
            if (this.props.localeContext.language !== localeUserData.app_lang_locale) {
              this.props.localeContext.changeLanguageTo(localeUserData.app_lang_locale);
            }
            if (this.props.localeContext.currency !== localeUserData.currency) {
              this.props.localeContext.changeCurrencyTo(localeUserData.currency);
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
      role: null,
    });
  }
  public dismissError() {
    this.setState({
      error: null,
    });
  }
  public render() {
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
