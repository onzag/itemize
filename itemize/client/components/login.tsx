import React from "react";
import { GraphQLEndpointErrorType } from "../../base/errors";
import { TokenContext } from "../app/internal-providers";
import { ItemDefinitionContext } from "../app/providers";

interface ILogActionerProps {
  children: (actioner: {
    login: () => any,
    signup: () => any,
    logout: () => any,
    error: GraphQLEndpointErrorType,
    dismissError: () => any,
  }) => React.ReactNode;
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

                  const username = itemDefinitionContextualValue.state.properties
                    .find((pv) => pv.propertyId === "username");
                  const password = itemDefinitionContextualValue.state.properties
                    .find((pv) => pv.propertyId === "password");

                  if (!username) {
                    throw new Error("The LogActioner ItemDefinitionProvider context does not contain an username property");
                  } else if (!password) {
                    throw new Error("The LogActioner ItemDefinitionProvider context does not contain an password property");
                  }

                  const usernameValue = username.value;
                  const passwordValue = password.value;

                  if (typeof usernameValue !== "string" && usernameValue !== null) {
                    throw new Error("The LogActioner ItemDefinitionProvider context provides an invalid username");
                  } else if (typeof passwordValue !== "string" && passwordValue !== null) {
                    throw new Error("The LogActioner ItemDefinitionProvider context provides an invalid password");
                  }

                  let login: () => any;
                  let logout: () => any;
                  let dismissError: () => any;
                  let signup: () => any;
                  if (!tokenContextValue.isLoggingIn) {
                    const cleanFields = () => {
                      const passwordPdef =
                        itemDefinitionContextualValue.idef.getPropertyDefinitionFor("password", false);
                      passwordPdef.cleanValueFor(null);
                      itemDefinitionContextualValue.idef.triggerListeners(null);
                    };
                    login = () => {
                      tokenContextValue.login(usernameValue as string, passwordValue as string, null);
                      // we do it but on a delay in order to avoid flickering for example
                      // in dialogs that are going to close
                      setTimeout(cleanFields, 300);
                    };
                    signup = () => {
                      setTimeout(cleanFields, 300);
                    };
                    logout = tokenContextValue.logout;
                    dismissError = tokenContextValue.dismissError;
                  } else {
                    login = () => null;
                    logout = () => null;
                    dismissError = () => null;
                    signup = () => null;
                  }

                  return props.children && props.children({
                    login,
                    signup,
                    logout,
                    error: tokenContextValue.error,
                    dismissError,
                  });
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

export function IfLogStatus(props: IIfLogStatusProps) {
  return (
    <TokenContext.Consumer>
      {
        (value) => {
          const isLoggedIn = !!value.token;
          const logStatus: logStatusType = isLoggedIn ? "LOGGED_IN" : (
            value.isLoggingIn ? "LOGGING_IN" : "LOGGED_OUT"
          );
          const shouldRender = !props.status || props.status === logStatus;
          if (!shouldRender) {
            return null;
          } else if (typeof props.children === "function") {
            return props.children(logStatus);
          } else {
            return props.children;
          }
        }
      }
    </TokenContext.Consumer>
  );
}
