import React from "react";
import { GraphQLEndpointErrorType } from "../../base/errors";
import { TokenContext, ITokenContextType } from "../internal/app/internal-providers";
import { ItemDefinitionContext, IItemDefinitionContextType } from "../providers/item-definition";

type ActionerFn = (actioner: {
  login: () => Promise<void>,
  signup: () => Promise<void>,
  logout: () => void,
  error: GraphQLEndpointErrorType,
  dismissError: () => void,
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
    this.signup = this.signup.bind(this);
    this.dismissError = this.dismissError.bind(this);
    this.cleanFields = this.cleanFields.bind(this);
  }
  public shouldComponentUpdate(nextProps: IActualLogActionerProps) {
    return nextProps.children !== this.props.children ||
      nextProps.tokenContextValue.isLoggingIn !== this.props.tokenContextValue.isLoggingIn ||
      nextProps.tokenContextValue.error !== this.props.tokenContextValue.error ||
      nextProps.itemDefinitionContextualValue.submitError !== this.props.itemDefinitionContextualValue.submitError ||
      nextProps.itemDefinitionContextualValue.submitting !== this.props.itemDefinitionContextualValue.submitting;
  }
  public cleanFields() {
    const passwordPdef =
      this.props.itemDefinitionContextualValue.idef.getPropertyDefinitionFor("password", false);
    passwordPdef.cleanValueFor(null);
    this.props.itemDefinitionContextualValue.idef.triggerListeners("change", null);
  }
  public async login() {
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
    await this.props.tokenContextValue.login(usernameValue as string, passwordValue as string, null);
    // we do it but on a delay in order to avoid flickering for example
    // in dialogs that are going to close
    setTimeout(this.cleanFields, 300);
  }
  public logout() {
    this.props.tokenContextValue.logout();
  }
  public async signup() {
    const result = await this.props.itemDefinitionContextualValue.submit();
    if (!result.error) {
      await this.login();
    }
  }
  public dismissError() {
    this.props.tokenContextValue.dismissError();
    this.props.itemDefinitionContextualValue.dismissSubmitError();
  }
  public render() {
    let login: () => any;
    let logout: () => any;
    let signup: () => any;
    const dismissError = this.dismissError;
    if (!this.props.tokenContextValue.isLoggingIn && !this.props.itemDefinitionContextualValue.submitting) {
      login = this.login;
      logout = this.logout;
      signup = this.signup;
    } else {
      login = () => null;
      logout = () => null;
      signup = () => null;
    }

    const output = (this.props.children as ActionerFn)({
      login,
      signup,
      logout,
      error: this.props.tokenContextValue.error || this.props.itemDefinitionContextualValue.submitError,
      dismissError,
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

type logStatusType = "LOGGED_IN" | "LOGGED_OUT" | "LOGGING_IN";
type IfLogStatusCallback = (status: logStatusType) => React.ReactNode;
interface IIfLogStatusProps {
  status?: logStatusType;
  children: React.ReactNode | IfLogStatusCallback;
}

interface IActualIfLogStatusProps extends IIfLogStatusProps {
  isLoggingIn: boolean;
  isLoggedIn: boolean;
}

// tslint:disable-next-line: max-classes-per-file
class ActualIfLogStatus extends React.PureComponent<IActualIfLogStatusProps, {}> {
  public render() {
    const logStatus: logStatusType = this.props.isLoggedIn ? "LOGGED_IN" : (
      this.props.isLoggingIn ? "LOGGING_IN" : "LOGGED_OUT"
    );
    const shouldRender = !this.props.status || (this.props.status === logStatus);
    if (!shouldRender) {
      return null;
    } else if (typeof this.props.children === "function") {
      return (this.props.children as IfLogStatusCallback)(logStatus) || null;
    } else {
      return this.props.children || null;
    }
  }
}

export function IfLogStatus(props: IIfLogStatusProps) {
  return (
    <TokenContext.Consumer>
      {
        (value) => {
          return <ActualIfLogStatus {...props} isLoggedIn={!!value.token} isLoggingIn={value.isLoggingIn} />;
        }
      }
    </TokenContext.Consumer>
  );
}
