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
import PropertyView from "./components/base/PropertyView";
import { PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { ICurrencyType, arrCurrencies, currencies, countries, arrCountries, ICountryType } from "../../resources";
import { Link as RouterLink, LinkProps, Route as RouterRoute, RouteProps } from "react-router-dom";

export function Link(props: LinkProps) {
  const currentLocaleFromURL = location.pathname.split("/")[1] || null;
  if (!currentLocaleFromURL) {
    return null;
  }
  let urlDefined = props.to;
  if (urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  return <RouterLink {...props} to={`/${currentLocaleFromURL}${urlDefined}`}/>;
}

export function Route(props: RouteProps) {
  let urlDefined = props.path;
  if (urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  return <RouterRoute {...props} path={`/:__lang${urlDefined}`}/>;
}

// TODO add showAsInvalid as an option
interface IPropertyEntryProps {
  id: string;
  item?: string;
  showAsInvalid?: boolean;
  onChange?: (property: PropertyDefinition, newValue: PropertyDefinitionSupportedType, inernalValue?: any) => void;
}

interface IPropertyReadProps {
  id: string;
  item?: string;
  children?: (value: PropertyDefinitionSupportedType) => React.ReactNode;
}

interface IPropertyViewProps {
  id: string;
  item?: string;
}

interface IPropertyEntryViewReadProps {
  id: string;
  item?: string;
  children?: (value: PropertyDefinitionSupportedType) => React.ReactNode;
  showAsInvalid?: boolean;
  onChange?: (property: PropertyDefinition, newValue: PropertyDefinitionSupportedType, internalValue?: any) => void;
}

function EntryViewRead(props: IPropertyEntryViewReadProps, view: boolean, read: boolean) {
  return (
    <ItemDefinitionContext.Consumer>
      {
        (itemDefinitionContextualValue) => {
          if (!itemDefinitionContextualValue) {
            throw new Error("The Entry/View/Read must be in a ItemDefinitionProvider context");
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

          if (read) {
            return props.children(propertyValue.value);
          } else if (view) {
            return (
              <PropertyView
                property={property}
                value={propertyValue}
              />
            );
          } else {
            const onChange = (newValue: PropertyDefinitionSupportedType, internalValue?: any) => {
              if (props.onChange) {
                props.onChange(property, newValue, internalValue);
              }
              itemDefinitionContextualValue.onPropertyChange(property, newValue, internalValue);
            };
            return (
              <PropertyEntry
                property={property}
                value={propertyValue}
                onChange={onChange}
                forceInvalid={props.showAsInvalid}
              />
            );
          }
        }
      }
    </ItemDefinitionContext.Consumer>
  );
}

export function Entry(props: IPropertyEntryProps) {
  return EntryViewRead(props, false, false);
}

export function View(props: IPropertyViewProps) {
  return EntryViewRead(props, true, false);
}

export function Reader(props: IPropertyReadProps) {
  return EntryViewRead(props, false, true);
}

interface II18nReadProps {
  id: string;
  args?: string[];
  item?: string;
  children?: (value: string) => React.ReactNode;
}

export function I18nRead(props: II18nReadProps) {
  return (
    <LocaleContext.Consumer>
      {
        (localeContext) => (
          <ItemDefinitionContext.Consumer>
            {
              (itemDefinitionContextualValue) => {
                if (!itemDefinitionContextualValue) {
                  throw new Error("The i18nRead must be in a ItemDefinitionProvider context");
                }

                let i18nValue: string = null;
                if (props.item) {
                  const item = itemDefinitionContextualValue.idef.getItemFor(props.item);
                  if (props.id === "name") {
                    i18nValue = item.getI18nNameFor(localeContext.language) || null;
                  } else {
                    const itemI18nData = item.getI18nDataFor(localeContext.language);
                    i18nValue = itemI18nData ? itemI18nData[props.id] : null;
                  }
                } else {
                  const i18nIdefData = itemDefinitionContextualValue.idef.getI18nDataFor(localeContext.language);
                  if (i18nIdefData && i18nIdefData.custom && i18nIdefData.custom[props.id]) {
                    i18nValue = i18nIdefData.custom[props.id];
                  } else {
                    i18nValue = i18nIdefData ? i18nIdefData[props.id] : null;
                  }
                }

                if (props.args) {
                  i18nValue = i18nValue.replace(/\{(\d+)\}/g, (match, indexMatch) => (props.args[indexMatch] || "?"));
                }

                if (!props.children) {
                  return i18nValue;
                }
                return props.children(i18nValue);
              }
            }
          </ItemDefinitionContext.Consumer>
        )
      }
    </LocaleContext.Consumer>
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
  children: (actioner: {
    login: () => any,
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

                  return props.children && props.children({
                    login,
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

interface IUserIdRetrieverProps {
  children: (id: number) => React.ReactNode;
}
export function UserIdRetriever(props: IUserIdRetrieverProps) {
  return (
    <TokenContext.Consumer>
      {
        (value) => {
          return props.children(value.id);
        }
      }
    </TokenContext.Consumer>
  );
}

interface IFnAppLanguageRetrieverLanguageFormType {
  code: string;
  name: string;
}
type FnAppLanguageRetrieverType = (arg: {
  currentLanguage: IFnAppLanguageRetrieverLanguageFormType,
  availableLanguages: IFnAppLanguageRetrieverLanguageFormType[],
  changeLanguageTo: (code: string) => void,
}) => React.ReactNode;
export function AppLanguageRetriever(props: {
  children: FnAppLanguageRetrieverType;
}) {
  return (
    <LocaleContext.Consumer>
      {
        (localeContext) => {
          const currentLanguage: IFnAppLanguageRetrieverLanguageFormType = {
            code: localeContext.language,
            name: localeContext.localeData[localeContext.language].name,
          };
          const availableLanguages: IFnAppLanguageRetrieverLanguageFormType[] = [];
          Object.keys(localeContext.localeData).forEach((code) => {
            availableLanguages.push({
              code,
              name: localeContext.localeData[code].name,
            });
          });
          return props.children({
            currentLanguage,
            availableLanguages,
            changeLanguageTo: localeContext.updating ? () => null : localeContext.changeLanguageTo,
          });
        }
      }
    </LocaleContext.Consumer>
  );
}

type FnAppCurrencyRetrieverType = (arg: {
  currentCurrency: ICurrencyType,
  availableCurrencies: ICurrencyType[],
  changeCurrencyTo: (code: string) => void,
}) => React.ReactNode;
export function AppCurrencyRetriever(props: {
  children: FnAppCurrencyRetrieverType;
}) {
  return (
    <LocaleContext.Consumer>
      {
        (localeContext) => {
          return props.children({
            currentCurrency: currencies[localeContext.currency.toUpperCase()],
            availableCurrencies: arrCurrencies,
            changeCurrencyTo: localeContext.updating ? () => null : localeContext.changeCurrencyTo,
          });
        }
      }
    </LocaleContext.Consumer>
  );
}

type FnAppCountryRetrieverType = (arg: {
  currentCountry: ICountryType,
  availableCountries: ICountryType[],
  changeCountryTo: (code: string) => void,
}) => React.ReactNode;
export function AppCountryRetriever(props: {
  children: FnAppCountryRetrieverType;
}) {
  return (
    <LocaleContext.Consumer>
      {
        (localeContext) => {
          return props.children({
            currentCountry: countries[localeContext.country.toUpperCase()],
            availableCountries: arrCountries,
            changeCountryTo: localeContext.updating ? () => null : localeContext.changeCountryTo,
          });
        }
      }
    </LocaleContext.Consumer>
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