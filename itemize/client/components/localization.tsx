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

interface II18nReadProps {
  id: string;
  policyType?: string;
  policyName?: string;
  args?: any[];
  html?: boolean;
  htmlWrappingTag?: string;
  children?: (value: string | React.ReactNode) => React.ReactNode;
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

                            let i18nValue: any = null;
                            if (itemDefinitionContextualValue) {
                              if (includeContext) {
                                if (props.id === "name") {
                                  i18nValue = includeContext.include.getI18nNameFor(localeContext.language) || null;
                                } else {
                                  const includeI18nData = includeContext.include.getI18nDataFor(localeContext.language);
                                  i18nValue = includeI18nData ? includeI18nData[props.id] || null : null;
                                }
                              } else {
                                const i18nIdefData =
                                  itemDefinitionContextualValue.idef.getI18nDataFor(localeContext.language);
                                if (props.policyType && props.policyName) {
                                  const i18nPolicyTypeValue =
                                    i18nIdefData ? (i18nIdefData.policies && i18nIdefData.policies[props.policyType])
                                      || null : null;
                                  const i18nPolicyNameValue =
                                    i18nPolicyTypeValue ? i18nPolicyTypeValue[props.policyName] || null : null;
                                  i18nValue = i18nPolicyNameValue ? i18nPolicyNameValue[props.id] || null : null;
                                } else {
                                  if (i18nIdefData && i18nIdefData.custom && i18nIdefData.custom[props.id]) {
                                    i18nValue = i18nIdefData.custom[props.id];
                                  } else {
                                    i18nValue = i18nIdefData ? i18nIdefData[props.id] || null : null;
                                  }
                                }
                              }
                            }

                            if (moduleContextualValue && i18nValue === null) {
                              const i18nModData =
                                moduleContextualValue.mod.getI18nDataFor(localeContext.language);
                              if (i18nModData && i18nModData.custom && i18nModData.custom[props.id]) {
                                i18nValue = i18nModData.custom[props.id];
                              } else {
                                i18nValue = i18nModData ? i18nModData[props.id] || null : null;
                              }
                            }

                            if (i18nValue === null) {
                              i18nValue = (
                                localeContext.i18n[localeContext.language] &&
                                localeContext.i18n[localeContext.language][props.id]
                              ) || null;
                            }

                            if (i18nValue === null) {
                              let errMessage: string = "Unknown key in context: " + props.id;
                              if (itemDefinitionContextualValue) {
                                errMessage += "; in item definition context for " +
                                  itemDefinitionContextualValue.idef.getName();
                                if (props.policyType && props.policyName) {
                                  errMessage += "; in policy " + props.policyType + " " + props.policyName;
                                }
                                if (includeContext) {
                                  errMessage += "; in item context for " +
                                    includeContext.include.getId();
                                }
                              }
                              throw new Error(errMessage);
                            }

                            if (props.args) {
                              if (props.args.every((a) => typeof a === "string")) {
                                i18nValue = localeReplacer(i18nValue, ...props.args);
                              } else {
                                i18nValue = localeReplacerToArray(i18nValue, ...props.args).map((output, index) => (
                                  <React.Fragment key={index}>
                                    {output}
                                  </React.Fragment>
                                ));
                              }
                            }

                            let finalNode: string | React.ReactNode = i18nValue;
                            if (props.html && finalNode !== null) {
                              const Element: any = props.htmlWrappingTag || "div";
                              finalNode = (
                                <Element dangerouslySetInnerHTML={{__html: i18nValue}}/>
                              );
                            }

                            if (!props.children) {
                              return finalNode;
                            }
                            return props.children(finalNode);
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
