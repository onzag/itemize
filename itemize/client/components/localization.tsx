import React from "react";
import { LocaleContext, DataContext } from "../app";
import { ItemDefinitionContext } from "../providers/item-definition";
import { localeReplacerToArray, localeReplacer } from "../../util";
import { GraphQLEndpointErrorType } from "../../base/errors";
import Root from "../../base/Root";
import Module from "../../base/Root/Module";
import ItemDefinition, { IItemDefinitionRawJSONDataType } from "../../base/Root/Module/ItemDefinition";
import PropertyDefinition, { IPropertyDefinitionRawJSONDataType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { ICurrencyType, arrCurrencies, currencies, countries, arrCountries, ICountryType } from "../../imported-resources";
import { ItemContext } from "../providers/item";

interface II18nReadProps {
  id: string;
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
          <ItemDefinitionContext.Consumer>
            {
              (itemDefinitionContextualValue) => (
                <ItemContext.Consumer>
                  {
                    (itemContext) => {

                      let i18nValue: any = null;
                      if (itemDefinitionContextualValue) {
                        if (itemContext) {
                          if (props.id === "name") {
                            i18nValue = itemContext.item.getI18nNameFor(localeContext.language) || null;
                          } else {
                            const itemI18nData = itemContext.item.getI18nDataFor(localeContext.language);
                            i18nValue = itemI18nData ? itemI18nData[props.id] || null : null;
                          }
                        } else {
                          const i18nIdefData =
                            itemDefinitionContextualValue.idef.getI18nDataFor(localeContext.language);
                          if (i18nIdefData && i18nIdefData.custom && i18nIdefData.custom[props.id]) {
                            i18nValue = i18nIdefData.custom[props.id];
                          } else {
                            i18nValue = i18nIdefData ? i18nIdefData[props.id] || null : null;
                          }
                        }
                      }

                      if (!itemDefinitionContextualValue || i18nValue === null) {
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
                          if (itemContext) {
                            errMessage += "; in item context for " +
                              itemContext.item.getName();
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
                </ItemContext.Consumer>
              )
            }
          </ItemDefinitionContext.Consumer>
        )
      }
    </LocaleContext.Consumer>
  );
}

interface II18nReadErrorProps {
  error: GraphQLEndpointErrorType;
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
                  if (freeError.itemIdItemDefPath) {
                    try {
                      itemDef = mod.getItemDefinitionFor(freeError.itemIdItemDefPath);
                    } catch {
                      console.warn("failed to display error due to itemIdItemDefPath", freeError);
                      return null;
                    }
                  } else if (freeError.itemDefPath) {
                    try {
                      itemDef = mod.getItemDefinitionFor(freeError.itemDefPath);
                    } catch {
                      console.warn("failed to display error due to itemIdItemDefPath", freeError);
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
                    const i18nErrorValue = i18nData && i18nData.error && i18nData.error[freeError.code];
                    if (!i18nErrorValue) {
                      console.warn("failed to display error due to code or language", freeError);
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
