import PropertyEntry from "./components/base/PropertyEntry";
import { ItemDefinitionContext } from "./providers";
import PropertyDefinition, { IPropertyDefinitionValue, IPropertyDefinitionRawJSONDataType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import React from "react";
import ItemDefinition, { IItemDefinitionValue, IItemDefinitionRawJSONDataType } from "../../base/Root/Module/ItemDefinition";
import { TokenContext } from "./internal-providers";
import { GraphQLEndpointErrorType } from "../../base/errors";
import { DataContext, LocaleContext } from ".";
import Root from "../../base/Root";
import Module from "../../base/Root/Module";

interface IPropertyProps {
  id: string;
  item?: string;
}

export function Entry(props: IPropertyProps) {
  return (
    <ItemDefinitionContext.Consumer>
      {
        (itemDefinitionContextualValue) => {
          if (!itemDefinitionContextualValue) {
            throw new Error("The Entry must be in a ItemDefinitionProvider context");
          }

          let propertyValue: IPropertyDefinitionValue = null;
          if (props.item) {
            const itemValue = itemDefinitionContextualValue.value.items.find((i) => i.itemName === props.item);
            if (itemValue.itemDefinitionValue) {
              propertyValue = itemValue.itemDefinitionValue.properties.find((p) => p.propertyId === props.id);
            }
          } else {
            propertyValue = itemDefinitionContextualValue.value.properties.find((p) => p.propertyId === props.id);
          }

          const property = itemDefinitionContextualValue.idef.getPropertyDefinitionFor(props.id, true);
          return (
            <PropertyEntry
              property={property}
              value={propertyValue}
              onChange={itemDefinitionContextualValue.onPropertyChange.bind(null, property)}
            />
          );
        }
      }
    </ItemDefinitionContext.Consumer>
  );
}

interface IReadableErrorForProps {
  error: GraphQLEndpointErrorType;
}
export function ReadableErrorFor(props: IReadableErrorForProps) {
  if (props.error === null) {
    return null;
  }
  return (
    <LocaleContext.Consumer>
      {
        (localeData) => {
          const freeError = props.error as any;
          if (!freeError.modulePath) {
            const errorMessage: string = localeData.i18n.error[props.error.code];
            return errorMessage;
          }
          return (
            <DataContext.Consumer>
              {
                (data) => {
                  const mod = Root.getModuleRawFor(data.raw, freeError.modulePath);
                  if (!mod) {
                    return null;
                  }

                  let itemDef: IItemDefinitionRawJSONDataType;
                  if (freeError.itemDefPath) {
                    itemDef = Module.getItemDefinitionRawFor(mod, freeError.itemDefPath);
                    if (!itemDef) {
                      return null;
                    }
                  }

                  if (freeError.propertyId) {
                    let propertyDef: IPropertyDefinitionRawJSONDataType;
                    if (itemDef) {
                      propertyDef = ItemDefinition.getPropertyDefinitionRawFor(
                        itemDef,
                        mod,
                        freeError.propertyId,
                        true,
                      );
                    } else {
                      propertyDef = Module.getPropExtensionRawFor(
                        mod,
                        freeError.propertyId,
                      );
                    }
                    if (!propertyDef) {
                      return null;
                    }

                    return propertyDef.i18nData[localeData.language].error[props.error.code];
                  } else if (freeError.policyType) {
                    return itemDef
                      .i18nData[localeData.language]
                      .policies[freeError.policyType][freeError.policyName]
                      .fail;
                  }
                }
              }
            </DataContext.Consumer>
          );
        }
      }
    </LocaleContext.Consumer>
  );
}

interface ILogActionerProps {
  children: (
    login: () => any,
    logout: () => any,
    activeError: GraphQLEndpointErrorType,
    dismissError: () => any,
  ) => React.ReactNode;
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

                  const username = itemDefinitionContextualValue.value.properties
                    .find((pv) => pv.propertyId === "username");
                  const password = itemDefinitionContextualValue.value.properties
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
                  if (!tokenContextValue.isLoggingIn) {
                    login = tokenContextValue.login.bind(null, usernameValue, passwordValue, null);
                    logout = tokenContextValue.logout;
                    dismissError = tokenContextValue.dismissError;
                  } else {
                    login = () => null;
                    logout = () => null;
                    dismissError = () => null;
                  }

                  return props.children && props.children(login, logout, tokenContextValue.error, dismissError);
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

export function StatsForNerds() {
  return (
    <ItemDefinitionContext.Consumer>
      {
        (itemDefinitionContextualValue) => {
          const valueToStringify: IItemDefinitionValue = {
            ...itemDefinitionContextualValue.value,
            properties: itemDefinitionContextualValue.value.properties.map((propertyValue) => {
              let propertyValueToStringify = {...propertyValue};
              // a small hack due to internal values being too long
              if (
                propertyValueToStringify.internalValue !== null &&
                typeof propertyValueToStringify.internalValue !== "string"
              ) {
                propertyValueToStringify = {...propertyValueToStringify, internalValue: "[TOO BIG TO DISPLAY]"};
              }

              return propertyValueToStringify;
            }),
          };

          return <code>{JSON.stringify(valueToStringify, null, 2)}</code>;
        }
      }
    </ItemDefinitionContext.Consumer>
  );
}
