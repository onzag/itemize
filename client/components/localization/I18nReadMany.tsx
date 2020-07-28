/**
 * Allows to read many errors and standard information at the same time (parallel)
 * in an efficient way
 * 
 * @packageDocumentation
 */

import React from "react";
import I18nReadError, { II18nReadErrorProps, I18nReadErrorInternalOptimized } from "./I18nReadError";
import I18nRead, { II18nReadProps, I18nReadInternalOptimized } from "./I18nRead";
import { DataContext, ILocaleContextType, IDataContextType, LocaleContext } from "../../internal/app";
import { IModuleContextType, ModuleContext } from "../../providers/module";
import { IItemDefinitionContextType, ItemDefinitionContext } from "../../providers/item-definition";
import { IIncludeContext, IncludeContext } from "../../providers/include";

/**
 * The props for the read many
 */
interface Ii18nReadManyProps {
  /**
   * An array of read props or read error
   */
  data: Array<II18nReadProps | II18nReadErrorProps>;
  /**
   * This passes the resulting "NODE" to the children function
   * this will not pass ever a string as a result unlike the children function
   * of the i18nRead or i18nReadError function that are able to pass strings
   * 
   * unlike other read functions children is required
   */
  children: (...results: React.ReactNode[]) => React.ReactNode;
}

/**
 * The internal read many functionality, somewhat less refined
 * than the previous because this one doesn't need an optimizer
 * on itself
 *
 * @param localeContext the locale context (always available)
 * @param dataContext data context for root data app access (available for errors)
 * @param moduleContextualValue module context (avaiable for standard display if exists)
 * @param itemDefinitionContextualValue item definition context (avaiable for standard display if exists)
 * @param includeContext include context (avaiable for standard display if exists)
 * @param props the actual read many props
 */
export function i18nReadManyInternal(
  localeContext: ILocaleContextType,
  dataContext: IDataContextType,
  moduleContextualValue: IModuleContextType,
  itemDefinitionContextualValue: IItemDefinitionContextType,
  includeContext: IIncludeContext,
  props: Ii18nReadManyProps,
) {
  // so we build the args based on the component required, note how
  // we use the internal optimized instead
  const args: React.ReactNode[] = props.data.map((toProvideProps) => {
    const toProvidePropsAsErrorProps = toProvideProps as II18nReadErrorProps;
    const toProvidePropsAsStdProps = toProvideProps as II18nReadProps;
    if (toProvidePropsAsErrorProps.error) {
      return (
        <I18nReadErrorInternalOptimized
          localeContext={localeContext}
          root={dataContext.value}
          {...toProvidePropsAsErrorProps}
        />
      );
    } else {
      return (
        <I18nReadInternalOptimized
          localeContext={localeContext}
          mod={moduleContextualValue && moduleContextualValue.mod}
          idef={itemDefinitionContextualValue && itemDefinitionContextualValue.idef}
          include={includeContext && includeContext.include}
          {...toProvidePropsAsStdProps}
        />
      );
    }
  });

  // and pass that to the children
  return props.children(...args);
}

/**
 * The read many component which allows to read many i18n data at once
 * @param props the props
 * @returns a react node, it is marked as any because typescript gets buggy
 * when such a function returns a react node
 */
export default function I18nReadMany(props: Ii18nReadManyProps): any {
  // if we got nothing
  if (props.data.length === 0) {
    // just return the children with no args
    return props.children();
  } else if (props.data.length === 1) {
    // if we have one
    const toProvide = props.data[0];

    // that is basically the same as this
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

  // otherwise let's first check if there's an error
  const hasError = props.data.find((e) => (e as II18nReadErrorProps).error);
  // and if everything is an error
  const isOnlyErrors = props.data.every((e) => (e as II18nReadErrorProps).error);

  // if it's only errors we don't need the item definition, include, module context
  if (isOnlyErrors) {
    return (
      <LocaleContext.Consumer>
        {
          (localeContext) => (
            <DataContext.Consumer>
              {
                (dataContext) => {
                  return i18nReadManyInternal(localeContext, dataContext, null, null, null, props);
                }
              }
            </DataContext.Consumer>
          )
        }
      </LocaleContext.Consumer>
    );
  } else if (!hasError) {
    // if it doesn't have an error we don't need the data context
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
    );
  } else {
    // otherwise we need everything
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
    );
  }
}
