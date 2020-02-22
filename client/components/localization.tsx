import React from "react";
import { LocaleContext, DataContext } from "../internal/app";
import { ItemDefinitionContext } from "../providers/item-definition";
import { localeReplacerToArray, localeReplacer } from "../../util";
import { EndpointErrorType } from "../../base/errors";
import Module from "../../base/Root/Module";
import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import PropertyDefinition from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { ICurrencyType, arrCurrencies, currencies, countries, arrCountries, ICountryType } from "../../imported-resources";
import { IncludeContext } from "../providers/include";
import { ModuleContext } from "../providers/module";
import { capitalize as utilcapitalize} from "../../util";

interface II18nReadProps {
  id: string;
  policyType?: string;
  policyName?: string;
  args?: any[];
  html?: boolean;
  htmlWrappingTag?: string;
  children?: (value: React.ReactNode) => React.ReactNode;
}

export function I18nRead(props: II18nReadProps) {
  return (
    <LocaleContext.Consumer>
      {
        (localeContext) => (
          <ModuleContext.Consumer>
            {
              (moduleContextualValue) => (
                <ItemDefinitionContext.Consumer>
                  {
                    (itemDefinitionContextualValue) => (
                      <IncludeContext.Consumer>
                        {
                          (includeContext) => {

                            // so first we go in order of priority of what we want to read
                            let i18nValue: React.ReactNode = null;

                            // first by the inlcude context
                            if (includeContext) {
                              // if we have a name we use the include context using the name i18n function
                              // as the name can be inherited from the item definition if not specified
                              if (props.id === "name") {
                                i18nValue = includeContext.include.getI18nNameFor(localeContext.language) || null;
                              } else {
                                // othewise we just extract the i18n data for the include and call it with the id,
                                // normally there are only specific labels here at this level in the include context
                                const includeI18nData = includeContext.include.getI18nDataFor(localeContext.language);
                                i18nValue = includeI18nData ? includeI18nData[props.id] || null : null;
                              }
                            }

                            // so if the include thing failed and we have an item definition context
                            if (itemDefinitionContextualValue && i18nValue === null) {
                              // so we get the i18n item definition data
                              const i18nIdefData =
                                itemDefinitionContextualValue.idef.getI18nDataFor(localeContext.language);
                              // if we are specifying a policy like if we are in a policy context
                              if (props.policyType && props.policyName) {
                                // we go for the policy value and the policy name value
                                const i18nPolicyTypeValue =
                                  i18nIdefData ? (i18nIdefData.policies && i18nIdefData.policies[props.policyType])
                                    || null : null;
                                const i18nPolicyNameValue =
                                  i18nPolicyTypeValue ? i18nPolicyTypeValue[props.policyName] || null : null;
                                // and then attempt to extract the actual value if we get anywhere, these policies
                                // usually contain the label of the policy and the failed message
                                i18nValue = i18nPolicyNameValue ? i18nPolicyNameValue[props.id] || null : null;
                              } else {
                                // otherwise without policy we check if we have custom data in the item definition
                                // and this custom properties fit the data
                                if (i18nIdefData && i18nIdefData.custom && i18nIdefData.custom[props.id]) {
                                  i18nValue = i18nIdefData.custom[props.id];
                                } else {
                                  // otherwise we give an standard property
                                  i18nValue = i18nIdefData ? i18nIdefData[props.id] || null : null;
                                }
                              }
                            }

                            // now in modules
                            if (moduleContextualValue && i18nValue === null) {
                              // modules act similar to item definitions they also support custom properties
                              const i18nModData =
                                moduleContextualValue.mod.getI18nDataFor(localeContext.language);
                              if (i18nModData && i18nModData.custom && i18nModData.custom[props.id]) {
                                i18nValue = i18nModData.custom[props.id];
                              } else {
                                i18nValue = i18nModData ? i18nModData[props.id] || null : null;
                              }
                            }

                            // now we search in the generic locale file, there are no custom, even though
                            // they are all required
                            if (i18nValue === null) {
                              // for that we extract it
                              i18nValue = (
                                localeContext.i18n[localeContext.language] &&
                                localeContext.i18n[localeContext.language][props.id]
                              ) || null;
                            }

                            // if we still find nothing in all these contexts
                            if (i18nValue === null) {
                              // we want to throw an error
                              let errMessage: string = "Unknown key in context: " + props.id;

                              // let's make the error more specific
                              if (itemDefinitionContextualValue) {
                                // specify the context
                                errMessage += "; in item definition context for " +
                                  itemDefinitionContextualValue.idef.getName();

                                // add the policies if any
                                if (props.policyType && props.policyName) {
                                  errMessage += "; in policy " + props.policyType + " " + props.policyName;
                                }

                                // and the include is if so deemed required
                                if (includeContext) {
                                  errMessage += "; in item context for " +
                                    includeContext.include.getId();
                                }
                              }
                              // throw the error
                              throw new Error(errMessage);
                            }

                            // if we are passing arguments to replace the {0} {1} etc... numbers
                            if (props.args) {
                              // we have two options, these are for basic types, which is faster and returns a string
                              if (props.args.every((a) => typeof a === "string" || typeof a === "number")) {
                                // the standard locale replacer
                                i18nValue = localeReplacer(i18nValue as string, ...props.args);
                              } else {
                                // otherwise we use the locale replacer to array which creates react fragments
                                // and returns an array of react nodes, this all depends on the args that the user
                                // is passing
                                i18nValue = localeReplacerToArray(i18nValue as string, ...props.args).map((output, index) => (
                                  <React.Fragment key={index}>
                                    {output}
                                  </React.Fragment>
                                ));
                              }
                            }

                            // now we want to get the final node that we are returning, the react node
                            let finalContent = i18nValue;
                            if (props.html) {
                              const Element: any = props.htmlWrappingTag || "div";
                              finalContent = (
                                <Element dangerouslySetInnerHTML={{__html: i18nValue}}/>
                              );
                            }

                            // if we haven't specified a children function
                            // we just return the entire content
                            if (!props.children) {
                              return finalContent;
                            }
                            // otherwise we return the children wrapped function
                            return props.children(finalContent);
                          }
                        }
                      </IncludeContext.Consumer>
                    )
                  }
                </ItemDefinitionContext.Consumer>
              )
            }
          </ModuleContext.Consumer>
        )
      }
    </LocaleContext.Consumer>
  );
}

const isDevelopment = process.env.NODE_ENV === "development";
interface II18nReadErrorProps {
  error: EndpointErrorType;
}
export function I18nReadError(props: II18nReadErrorProps) {
  if (props.error === null) {
    return null;
  }
  return (
    <LocaleContext.Consumer>
      {
        (localeData) => {
          const freeError = props.error as any;
          if (isDevelopment) {
            console.warn(freeError.message);
          }
          // cheap way to know if this is a basic error code
          // without having to check for all types of error code
          if (!freeError.modulePath) {
            const errorMessage: string = localeData.i18n[localeData.language].error[props.error.code];
            return errorMessage;
          }
          return (
            <DataContext.Consumer>
              {
                (data) => {
                  let mod: Module;
                  try {
                    mod = data.value.getModuleFor(freeError.modulePath);
                  } catch {
                    console.warn("Invalid error module in", freeError);
                    return null;
                  }

                  let itemDef: ItemDefinition;
                  if (freeError.includeIdItemDefPath) {
                    try {
                      itemDef = mod.getItemDefinitionFor(freeError.includeIdItemDefPath);
                    } catch {
                      console.warn("failed to display error due to includeIdItemDefPath", freeError);
                      return null;
                    }
                  } else if (freeError.itemDefPath) {
                    try {
                      itemDef = mod.getItemDefinitionFor(freeError.itemDefPath);
                    } catch {
                      console.warn("failed to display error due to includeIdItemDefPath", freeError);
                      return null;
                    }
                  }

                  if (freeError.propertyId) {
                    let propertyDef: PropertyDefinition;
                    if (itemDef) {
                      try {
                        propertyDef = itemDef.getPropertyDefinitionFor(
                          freeError.propertyId,
                          true,
                        );
                      } catch {
                        console.warn("failed to display error due to propertyId", freeError);
                        return null;
                      }
                    } else {
                      try {
                        propertyDef = mod.getPropExtensionFor(freeError.propertyId);
                      } catch {
                        console.warn("failed to display error due to propertyId not extension", freeError);
                        return null;
                      }
                    }

                    const i18nData = propertyDef.getI18nDataFor(localeData.language);
                    const i18nErrorValue = i18nData && i18nData.error && i18nData.error[freeError.pcode];
                    if (!i18nErrorValue) {
                      // pcode might be null, this can happen by a programming error
                      console.warn("failed to display error due to pcode or language", freeError);
                      return null;
                    }
                    return i18nErrorValue;
                  } else if (freeError.policyType) {
                    const i18nData = itemDef.getI18nDataFor(localeData.language);
                    const i18nErrorValue = i18nData &&
                      i18nData.policies &&
                      i18nData.policies[freeError.policyType] &&
                      i18nData.policies[freeError.policyType][freeError.policyName] &&
                      i18nData.policies[freeError.policyType][freeError.policyName].fail;
                    if (!i18nErrorValue) {
                      console.warn("failed to display error due to code or language", freeError);
                      return null;
                    }
                    return i18nErrorValue;
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

export function capitalize(str: string) {
  return utilcapitalize(str);
}

interface IFnAppLanguageRetrieverLanguageFormType {
  code: string;
  name: string;
}
type FnAppLanguageRetrieverType = (arg: {
  currentLanguage: IFnAppLanguageRetrieverLanguageFormType,
  availableLanguages: IFnAppLanguageRetrieverLanguageFormType[],
  rtl: boolean,
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
            name: localeContext.langLocales[localeContext.language].name,
          };
          const availableLanguages: IFnAppLanguageRetrieverLanguageFormType[] = [];
          Object.keys(localeContext.langLocales).forEach((code) => {
            availableLanguages.push({
              code,
              name: localeContext.langLocales[code].name,
            });
          });
          return props.children({
            currentLanguage,
            availableLanguages,
            rtl: localeContext.rtl,
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
