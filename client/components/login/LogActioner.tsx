/**
 * This file contents functionality that is used as a component in order to perform
 * login and logout actions, they must be placed inside the provider of an item definition
 * of type user
 *
 * @packageDocumentation
 */

import React from "react";
import { EndpointErrorType } from "../../../base/errors";
import { TokenContext, ITokenContextType } from "../../internal/app/internal-providers";
import { ItemDefinitionContext, IItemDefinitionContextType } from "../../providers/item-definition";
import { MAX_SUPPORTED_INTEGER } from "../../../constants";

/**
 * This is the type we expect as the actioner for login and logout, the children
 * as it takes a function that returns a react node
 */
type ActionerFn = (actioner: {
  login: (cleanWhenSuccesful?: boolean) => Promise<{id: number, role: string, error: EndpointErrorType}>,
  signup: (cleanWhenSuccesful?: boolean) => Promise<{id: number, role: string, error: EndpointErrorType}>,
  logout: () => void,
  logoutAll: () => void,
  isLoggingIn: boolean,
  error: EndpointErrorType,
  dismissError: () => void,
  cleanUnsafeFields: (addDelay?: boolean) => void,
}) => React.ReactNode;

interface ILogActionerProps {
  children: ActionerFn;
}
interface IActualLogActionerProps extends ILogActionerProps {
  tokenContextValue: ITokenContextType;
  itemDefinitionContextualValue: IItemDefinitionContextType;
}

// TODO add analytics
class ActualLogActioner extends React.Component<IActualLogActionerProps, {}> {
  constructor(props: IActualLogActionerProps) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.logoutAll = this.logoutAll.bind(this);
    this.signup = this.signup.bind(this);
    this.dismissError = this.dismissError.bind(this);
    this.cleanUnsafeFields = this.cleanUnsafeFields.bind(this);
  }
  public shouldComponentUpdate(nextProps: IActualLogActionerProps) {
    return nextProps.children !== this.props.children ||
      nextProps.tokenContextValue.isLoggingIn !== this.props.tokenContextValue.isLoggingIn ||
      nextProps.tokenContextValue.error !== this.props.tokenContextValue.error ||
      nextProps.itemDefinitionContextualValue.submitError !== this.props.itemDefinitionContextualValue.submitError ||
      nextProps.itemDefinitionContextualValue.submitting !== this.props.itemDefinitionContextualValue.submitting;
  }
  public cleanUnsafeFields(addDelay?: boolean) {
    if (addDelay) {
      setTimeout(this.cleanUnsafeFields, 300);
      return;
    }
    const passwordPdef =
      this.props.itemDefinitionContextualValue.idef.getPropertyDefinitionFor("password", false);
    passwordPdef.cleanValueFor(
      this.props.itemDefinitionContextualValue.forId,
      this.props.itemDefinitionContextualValue.forVersion,
    );
    this.props.itemDefinitionContextualValue.idef.triggerListeners(
      "change",
      this.props.itemDefinitionContextualValue.forId,
      this.props.itemDefinitionContextualValue.forVersion,
    );
  }
  public async login(cleanWhenSuccesful: boolean = true): Promise<{
    id: number;
    role: string;
    error: EndpointErrorType;
  }> {
    const username = this.props.itemDefinitionContextualValue.state.properties
      .find((pv) => pv.propertyId === "username");
    const password = this.props.itemDefinitionContextualValue.state.properties
      .find((pv) => pv.propertyId === "password");

    if (!username) {
      throw new Error("The LogActioner ItemDefinitionProvider context does not contain an username property");
    } else if (!password) {
      throw new Error("The LogActioner ItemDefinitionProvider context does not contain an password property");
    }

    const usernameValue = username.value;
    const passwordValue = password.value;
    const userData = await this.props.tokenContextValue.login(usernameValue as string, passwordValue as string, null);

    // if we get a sucesful login
    if (cleanWhenSuccesful && userData && !userData.error) {
      // we do it but on a delay in order to avoid flickering for example
      // in dialogs that are going to close
      this.cleanUnsafeFields(true);
    }

    return userData;
  }
  public logout() {
    this.props.tokenContextValue.logout();
  }
  public async logoutAll() {
    // NOTE there's a possibility for the random number to be the same, even when this one is small
    // and an edge case and is very unlikely to fail, in case this is not enough, we can very likely use
    // a trigger in the server side for users in order to patch the edge case, but this might as well not
    // be necessary at all

    // we create a new session id
    const newSessionId = Math.floor(Math.random() * Math.floor(MAX_SUPPORTED_INTEGER));
    // we need to retrieve the session id property in order to botch a change event
    // as if it was the UI
    const sessionIdProperty =
      this.props.itemDefinitionContextualValue.idef.getPropertyDefinitionFor("session_id", false);
    // now we trigger the change
    this.props.itemDefinitionContextualValue.onPropertyChange(sessionIdProperty, newSessionId, null);
    // and we submit now
    const result = await this.props.itemDefinitionContextualValue.submit({
      properties: ["session_id"],
    });
    // if we don't get an error we call logout
    if (!result.error) {
      this.props.tokenContextValue.logout();
    }
  }
  public async signup(cleanWhenSuccesful: boolean = true): Promise<{
    id: number;
    role: string;
    error: EndpointErrorType;
  }> {
    const result = await this.props.itemDefinitionContextualValue.submit({
      properties: ["username", "password", "app_language", "app_country", "app_currency"],
    });
    if (!result.error) {
      return await this.login(cleanWhenSuccesful);
    }
    return {
      id: null,
      role: null,
      error: result.error,
    };
  }
  public dismissError() {
    this.props.tokenContextValue.dismissError();
    this.props.itemDefinitionContextualValue.dismissSubmitError();
  }
  public render() {
    let login: () => any;
    let logout: () => any;
    let signup: () => any;
    let logoutAll: () => any;
    const dismissError = this.dismissError;
    if (!this.props.tokenContextValue.isLoggingIn && !this.props.itemDefinitionContextualValue.submitting) {
      login = this.login;
      logout = this.logout;
      signup = this.signup;
      logoutAll = this.logoutAll;
    } else {
      login = () => null;
      logout = () => null;
      signup = () => null;
      logoutAll = () => null;
    }

    const output = (this.props.children as ActionerFn)({
      login,
      signup,
      logout,
      logoutAll,
      error: this.props.tokenContextValue.error || this.props.itemDefinitionContextualValue.submitError,
      dismissError,
      cleanUnsafeFields: this.cleanUnsafeFields,
      isLoggingIn: this.props.tokenContextValue.isLoggingIn || this.props.itemDefinitionContextualValue.submitting,
    });
    return output;
  }
}

export function LogActioner(props: ILogActionerProps) {
  return (
    <TokenContext.Consumer>
      {
        (tokenContextValue) => {
          return (
            <ItemDefinitionContext.Consumer>
              {
                (itemDefinitionContextualValue) => {
                  if (!itemDefinitionContextualValue) {
                    throw new Error("The LogActioner must be in a ItemDefinitionProvider context");
                  }

                  return (
                    <ActualLogActioner
                      {...props}
                      tokenContextValue={tokenContextValue}
                      itemDefinitionContextualValue={itemDefinitionContextualValue}
                    />
                  );
                }
              }
            </ItemDefinitionContext.Consumer>
          );
        }
      }
    </TokenContext.Consumer>
  );
}
