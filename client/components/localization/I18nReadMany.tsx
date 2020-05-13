import React from "react";
import I18nReadError, { II18nReadErrorProps, i18nReadErrorInternal } from "./I18nReadError";
import I18nRead, { II18nReadProps, i18nReadInternal } from "./I18nRead";
import { DataContext, ILocaleContextType, IDataContextType, LocaleContext } from "../../internal/app";
import { IModuleContextType, ModuleContext } from "../../providers/module";
import { IItemDefinitionContextType, ItemDefinitionContext } from "../../providers/item-definition";
import { IIncludeContext, IncludeContext } from "../../providers/include";

interface Ii18nReadManyProps {
  data: Array<II18nReadProps | II18nReadErrorProps>;
  children: (...results: React.ReactNode[]) => React.ReactNode;
}

export function i18nReadManyInternal(
  localeContext: ILocaleContextType,
  dataContext: IDataContextType,
  moduleContextualValue: IModuleContextType,
  itemDefinitionContextualValue: IItemDefinitionContextType,
  includeContext: IIncludeContext,
  props: Ii18nReadManyProps,
) {
  const args: React.ReactNode[] = props.data.map((toProvideProps) => {
    if ((toProvideProps as II18nReadErrorProps).error) {
      return i18nReadErrorInternal(
        localeContext,
        dataContext,
        toProvideProps as II18nReadErrorProps,
      )
    } else {
      return i18nReadInternal(
        localeContext,
        moduleContextualValue,
        itemDefinitionContextualValue,
        includeContext,
        toProvideProps as II18nReadProps,
      )
    }
  });

  return props.children(...args);
}

export default function I18nReadMany(props: Ii18nReadManyProps): any {
  if (props.data.length === 0) {
    return props.children();
  } else if (props.data.length === 1) {
    const toProvide = props.data[0];
    if ((toProvide as II18nReadErrorProps).error) {
      <I18nReadError {...toProvide as II18nReadErrorProps}>
        {props.children}
      </I18nReadError>
    }
    return (
      <I18nRead {...toProvide as II18nReadProps}>
        {props.children}
      </I18nRead>
    );
  }

  const hasError = props.data.find((e) => (e as II18nReadErrorProps).error);
  if (!hasError) {
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
                              return i18nReadManyInternal(localeContext, null, moduleContextualValue, itemDefinitionContextualValue, includeContext, props);
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
    )
  } else {
    return (
      <LocaleContext.Consumer>
        {
          (localeContext) => (
            <DataContext.Consumer>
              {
                (dataContext) => (
                  <ModuleContext.Consumer>
                    {
                      (moduleContextualValue) => (
                        <ItemDefinitionContext.Consumer>
                          {
                            (itemDefinitionContextualValue) => (
                              <IncludeContext.Consumer>
                                {
                                  (includeContext) => {
                                    return i18nReadManyInternal(localeContext, dataContext, moduleContextualValue, itemDefinitionContextualValue, includeContext, props);
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
            </DataContext.Consumer>
          )
        }
      </LocaleContext.Consumer>
    )
  }
}