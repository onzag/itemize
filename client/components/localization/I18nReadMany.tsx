/**
 * Allows to read many errors and standard information at the same time (parallel)
 * in an efficient way
 * 
 * @module
 */

import React from "react";
import I18nReadError, { II18nReadErrorProps, I18nReadErrorInternalOptimized } from "./I18nReadError";
import I18nRead, { II18nReadProps, I18nReadInternalOptimized } from "./I18nRead";
import { ILocaleContextType, LocaleContext } from "../../internal/providers/locale-provider";
import { DataContext, IDataContextType } from "../../internal/providers/appdata-provider";
import { IModuleContextType, ModuleContext } from "../../providers/module";
import { IItemContextType, ItemContext } from "../../providers/item";
import type Root from "./../../../base/Root";
import { useRootRetriever } from "../root/RootRetriever";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import type Module from "../../../base/Root/Module";
import Include from "../../../base/Root/Module/ItemDefinition/Include";

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
 * @param itemContextualValue item definition context (avaiable for standard display if exists)
 * @param includeContext include context (avaiable for standard display if exists)
 * @param props the actual read many props
 */
export function i18nReadManyInternal(
  root: Root,
  localeContext: ILocaleContextType,
  dataContext: IDataContextType,
  moduleContextualValue: IModuleContextType,
  itemContextualValue: IItemContextType,
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
      if (toProvidePropsAsStdProps.context) {
        const itemDefOrModule = root.registry[toProvidePropsAsStdProps.context];

        const idef = itemDefOrModule instanceof ItemDefinition ? itemDefOrModule : null;
        const mod: Module = idef ? idef.getParentModule() : itemDefOrModule as Module;
        const include: Include = idef && toProvidePropsAsStdProps.include ? idef.getIncludeFor(toProvidePropsAsStdProps.include) : null;

        return (
          <I18nReadInternalOptimized
            {...toProvidePropsAsStdProps}
            localeContext={localeContext}
            mod={mod}
            idef={idef}
            incl={include}
          />
        );
      }

      const include: Include = itemContextualValue?.idef && toProvidePropsAsStdProps.include ?
        itemContextualValue.idef.getIncludeFor(toProvidePropsAsStdProps.include) : null;

      return (
        <I18nReadInternalOptimized
          localeContext={localeContext}
          mod={moduleContextualValue && moduleContextualValue.mod}
          idef={itemContextualValue && itemContextualValue.idef}
          incl={include}
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
  const root = useRootRetriever();
  // if we got nothing
  if (props.data.length === 0) {
    // just return the children with no args
    return props.children();
  } else if (props.data.length === 1) {
    // if we have one
    const toProvide = props.data[0];

    // that is basically the same as this
    if ((toProvide as II18nReadErrorProps).error) {
      return (
        <I18nReadError {...toProvide as II18nReadErrorProps}>
          {props.children}
        </I18nReadError>
      );
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
                  return i18nReadManyInternal(root.root, localeContext, dataContext, null, null, props);
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
                  <ItemContext.Consumer>
                    {
                      (itemContextualValue) => (
                        i18nReadManyInternal(root.root, localeContext, null, moduleContextualValue, itemContextualValue, props)
                      )
                    }
                  </ItemContext.Consumer>
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
                        <ItemContext.Consumer>
                          {
                            (itemContextualValue) => (
                              i18nReadManyInternal(root.root, localeContext, dataContext, moduleContextualValue, itemContextualValue, props)
                            )
                          }
                        </ItemContext.Consumer>
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
