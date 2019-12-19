import React from "react";
import { LocaleContext, DataContext } from "../app";
import { ItemDefinitionContext, ItemContext } from "../app/providers";
import { localeReplacer } from "../../util";
import { GraphQLEndpointErrorType } from "../../base/errors";
import Root from "../../base/Root";
import Module from "../../base/Root/Module";
import ItemDefinition, { IItemDefinitionRawJSONDataType } from "../../base/Root/Module/ItemDefinition";
import { IPropertyDefinitionRawJSONDataType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { ICurrencyType, arrCurrencies, currencies, countries, arrCountries, ICountryType } from "../../imported-resources";

interface II18nReadProps {
  id: string;
  args?: string[];
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

                      let i18nValue: string = null;
                      if (itemDefinitionContextualValue) {
                        if (itemContext) {
                          if (props.id === "name") {
                            i18nValue = itemContext.item.getI18nNameFor(localeContext.language) || null;
                          } else {
                            const itemI18nData = itemContext.item.getI18nDataFor(localeContext.language);
                            i18nValue = itemI18nData ? itemI18nData[props.id] : null;
                          }
                        } else {
                          const i18nIdefData =
                            itemDefinitionContextualValue.idef.getI18nDataFor(localeContext.language);
                          if (i18nIdefData && i18nIdefData.custom && i18nIdefData.custom[props.id]) {
                            i18nValue = i18nIdefData.custom[props.id];
                          } else {
                            i18nValue = i18nIdefData ? i18nIdefData[props.id] : null;
                          }
                        }
                      } else {
                        i18nValue = localeContext.i18n[props.id] || null;
                      }

                      if (props.args) {
                        i18nValue = localeReplacer(i18nValue, props.args);
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

// TODO language switch that is able to update the current user
// maybe we need to do this whole deep level
// one procedure might be to take the appData root and
// somehow pipe the data there if we have an active user
// and if we do update that and trigger the listeners
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
