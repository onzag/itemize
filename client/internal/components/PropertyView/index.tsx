/**
 * Contains the property view main handler that handles all
 * the property view variants and setups the renderers
 * @packageDocumentation
 */

import PropertyDefinition, {
  IPropertyDefinitionState,
} from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import React from "react";
import { LocaleContext } from "../../providers/locale-provider";
import { Ii18NType } from "../../../../base/Root";
import {
  PropertyDefinitionSupportedTypeName, PropertyDefinitionSupportedType,
} from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { currencies, countries, ICurrencyType, ICountryType } from "../../../../imported-resources";
import { IRendererProps } from "../../renderer";
import { RendererContext } from "../../../providers/renderer";
import { PropertyViewSimple, IPropertyViewSimpleRendererProps } from "./PropertyViewSimple";
import ItemDefinition from "../../../../base/Root/Module/ItemDefinition";
import Include from "../../../../base/Root/Module/ItemDefinition/Include";
import PropertyViewText from "./PropertyViewText";
import PropertyViewFile from "./PropertyViewFile";
import { IConfigRawJSONDataType } from "../../../../config";
import { ConfigContext } from "../../providers/config-provider";
import { PropertyViewBoolean } from "./PropertyViewBoolean";
import { PropertyViewDateTime } from "./PropertyViewDateTime";
import { PropertyViewLocation } from "./PropertyViewLocation";
import { PropertyViewCurrency } from "./PropertyViewCurrency";
import PropertyViewReference from "./PropertyViewReference";
import { ISSRContextType, SSRContext } from "../../../../client/internal/providers/ssr-provider";
import { TokenContext, ITokenContextType } from "../../../../client/internal/providers/token-provider";

/**
 * This is what every view renderer gets
 * 
 * Expect these to be extended
 */
export interface IPropertyViewRendererProps<ValueType> extends IRendererProps {
  /**
   * The current value to be displayed
   */
  currentValue: ValueType;
}

/**
 * This is what the main handler recieves and every handler that works
 * under it will receive as well
 */
export interface IPropertyViewMainHandlerProps<RendererPropsType> {
  /**
   * A current container id where the things are currently stored
   * this value can be null for new items as it only expresses where things
   * are "currently" stored not where they will be stored once submit is done
   * 
   * Automatically Provided check base.tsx
   * retrieved from the applied value from the item-definition.tsx context in the given slot
   */
  containerId: string;
  /**
   * An optional include, or null, where the property is encountered
   * 
   * Automatically Provided check base.tsx
   * retrieved from the item-definition.tsx context
   */
  include: Include;
  /**
   * The item definition in question, either a standard, search mode, extended, or some
   * combination, but nonetheless always available
   * 
   * Automatically Provided check base.tsx
   * retrieved from the item-definition.tsx context
   */
  itemDefinition: ItemDefinition;
  /**
   * The slot id in question, or null
   * 
   * Automatically Provided check base.tsx
   * retrieved from the item-definition.tsx context
   */
  forId: string;
  /**
   * The slot version in question, or null
   * 
   * Automatically Provided check base.tsx
   * retrieved from the item-definition.tsx context
   */
  forVersion: string;
  /**
   * The property in question
   * 
   * Automatically Provided check base.tsx
   * retrieved from the item-definition.tsx context
   */
  property: PropertyDefinition;
  /**
   * Whether to capitalize the output value
   * 
   * Provided by the user check base.tsx
   */
  capitalize?: boolean;
  /**
   * The state of the property definition, same as property.getState or property.getStateNoExternalChecking
   * but this value is more efficient to access
   * 
   * Automatically Provided check base.tsx
   * filtered for this specific property from the item-definition.tsx context state value
   */
  state: IPropertyDefinitionState;
  /**
   * Use applied value rather than the actual
   * value
   * 
   * Provided by the user check base.tsx
   */
  useAppliedValue?: boolean;
  /**
   * An alernative renderer chosen for this
   * 
   * Developer Provided check base.tsx
   */
  renderer?: React.ComponentType<RendererPropsType>;
  /**
   * Renderer args to be used, either by the default or
   * the alternative
   * 
   * Developer Provided check base.tsx
   */
  rendererArgs?: object;
  /**
   * Whether file urls are to be cached
   */
  cacheFiles: boolean;
}

/**
 * Views handlers that are standard will receive these props that actually
 * include these attributes added to the main ones
 */
export interface IPropertyViewHandlerProps<RendererPropsType> extends IPropertyViewMainHandlerProps<RendererPropsType> {
  /**
   * Config is a conditional include that will pass the config to the handler
   * 
   * Context Provided, Conditional, Standard Handler Only
   */
  config?: IConfigRawJSONDataType;
  /**
   * Token is a conditional include that will pass the token to the handler
   * 
   * Context Provided, Conditional, Standard Handler Only
   */
  tokenData?: ITokenContextType;
  /**
   * SSR context is a conditional include that will pass the ssr context to the
   * handler, used in references mainly
   * 
   * Context Provided, Conditional, Standard Handler Only
   */
  ssr?: ISSRContextType;

  /**
   * The language being used
   * 
   * Context Provided, Standard Handler Only
   */
  language: string;
  /**
   * Whether this language is rtl
   * 
   * Context Provided, Standard Handler Only
   */
  rtl: boolean;
  /**
   * The currency being used
   * 
   * Context Provided, Standard Handler Only
   */
  currency: ICurrencyType;
  /**
   * The currency factors given by the server data
   * 
   * Context provided, standard handler only
   */
  currencyFactors: {
    [code: string]: number,
  };
  /**
   * standard i18n data from the root
   * 
   * Context Provided, Standard Handler Only
   */
  i18n: Ii18NType;
  /**
   * the current country
   * 
   * Context Provided, Standard Handler Only
   */
  country: ICountryType;

  /**
   * There renderer that will be used
   * 
   * While this property also exists on the main renderer, there
   * it's optional and developer provided, whereas this one is always
   * there and represents the renderer that you will be using
   * 
   * Calculated, Standard Handler Only
   */
  renderer: React.ComponentType<RendererPropsType>;
  /**
   * There renderer args that will be used
   * 
   * While this property also exists on the main renderer, there
   * it's optional and developer provided, whereas this one is always
   * there, it's often the same that the developer passed, or an empty
   * object, since the args is supposed to be an object
   * 
   * Calculated, Standard Handler Only
   */
  rendererArgs: any;
}

/**
 * These aren't props, it's a type that we are using here
 * in order to build our registry of what handlers to use
 * and what props to pass to each handler
 */
interface IRendererHandlerType {
  /**
   * Where this is the default renderer we are using, this is
   * an identifier, it reads from the renderer context
   */
  renderer: string,
  /**
   * And this is the handler that will pass the props to the renderer
   * note how the handler uses the IPropertyViewHandlerProps so that
   * it should consume the interface before us
   */
  handler: React.ComponentType<IPropertyViewHandlerProps<IPropertyViewRendererProps<PropertyDefinitionSupportedType>>>,

  /**
   * Whether the handler should include the conditional configuration
   * and read it from the context
   */
  includeConfig?: boolean;
  /**
   * Whether the handler should include the user token as well as SSR
   * information
   */
  includeTokenDataAndSSR?: boolean;
};

/**
 * And this is how we define each entry point for the whole, this is only
 * for the base type as the subhandler can take the same properties
 */
interface IRendererWholeHandlerType extends IRendererHandlerType {
  defaultSubhandler?: IRendererHandlerType;
  subhandler?: {
    [type: string]: IRendererHandlerType;
  },
}

/**
 * The handler registry
 */
const handlerRegistry:
  Record<
    PropertyDefinitionSupportedTypeName,
    IRendererWholeHandlerType
  > = {
  string: {
    renderer: "PropertyViewSimple",
    handler: PropertyViewSimple,
    subhandler: {
      reference: {
        renderer: "PropertyViewSimple",
        handler: PropertyViewReference,
        includeTokenDataAndSSR: true,
      }
    },
  },
  integer: {
    renderer: "PropertyViewSimple",
    handler: PropertyViewSimple,
  },
  number: {
    renderer: "PropertyViewSimple",
    handler: PropertyViewSimple,
  },
  boolean: {
    renderer: "PropertyViewBoolean",
    handler: PropertyViewBoolean,
  },
  text: {
    renderer: "PropertyViewText",
    handler: PropertyViewText,
    includeConfig: true,
    defaultSubhandler: {
      renderer: "PropertyViewSimple",
      handler: PropertyViewSimple,
    }
  },
  currency: {
    renderer: "PropertyViewCurrency",
    handler: PropertyViewCurrency,
  },

  // TODO
  unit: null,
  password: {
    renderer: "PropertyViewSimple",
    handler: PropertyViewSimple,
  },
  year: {
    renderer: "PropertyViewSimple",
    handler: PropertyViewSimple,
  },
  datetime: {
    renderer: "PropertyViewDateTime",
    handler: PropertyViewDateTime,
  },
  date: {
    renderer: "PropertyViewDateTime",
    handler: PropertyViewDateTime,
  },
  time: {
    renderer: "PropertyViewDateTime",
    handler: PropertyViewDateTime,
  },
  location: {
    renderer: "PropertyViewLocation",
    handler: PropertyViewLocation,
  },
  file: {
    renderer: "PropertyViewFile",
    handler: PropertyViewFile,
    includeConfig: true,
  },
  // TODO
  files: null,
};

/**
 * A raw property view that uses the simple view
 * by default in order to build a view for a raw property, raw properties
 * such as created_at edited_at type and so on, which do not have entries
 * nor property definitions
 * 
 * @param props the props
 * @returns areact element
 */
export function RawBasePropertyView(props: {
  value: string;
  renderer?: React.ComponentType<IRendererProps>;
  rendererArgs?: object;
}) {
  // Build the context and render sending the right props
  return (
    <RendererContext.Consumer>
      {
        (renderers) =>
          <LocaleContext.Consumer>
            {
              (locale) => {
                const renderer: React.ComponentType<IPropertyViewSimpleRendererProps> =
                  props.renderer as React.ComponentType<IPropertyViewSimpleRendererProps> || renderers.PropertyViewSimple;
                return (
                  <PropertyViewSimple
                    itemDefinition={null}
                    property={null}
                    include={null}
                    forId={null}
                    forVersion={null}
                    containerId={null}
                    state={{
                      userSet: false,
                      default: null,
                      enforced: false,
                      hidden: false,
                      valid: true,        
                      value: props.value,
                      stateValue: props.value,
                      stateAppliedValue: props.value,
                      stateValueModified: false,
                      stateValueHasBeenManuallySet: false,
                      invalidReason: null,
                      internalValue: null,
                      propertyId: null,
                    }}
                    currencyFactors={null}
                    language={locale.language}
                    i18n={locale.i18n}
                    rtl={locale.rtl}
                    currency={currencies[locale.currency]}
                    country={countries[locale.country]}
                    renderer={renderer}
                    rendererArgs={props.rendererArgs || {}}
                    cacheFiles={false}
                  />
                );
              }
            }
          </LocaleContext.Consumer>
      }
    </RendererContext.Consumer>
  );
}


export default function PropertyView(
  props: IPropertyViewMainHandlerProps<IPropertyViewRendererProps<PropertyDefinitionSupportedType>>,
) {
  if (props.state.hidden) {
    return null;
  }

  const type = props.property.getType();
  const subtype = props.property.getSubtype();

  // First get the handler by the type
  let registryEntry: IRendererWholeHandlerType = handlerRegistry[type];
  if (subtype === null && registryEntry.defaultSubhandler) {
    registryEntry = registryEntry.defaultSubhandler;
  } else if (subtype && registryEntry.subhandler && registryEntry.subhandler[subtype]) {
    registryEntry = registryEntry.subhandler[subtype];
  }

  // First get the handler by the type
  const Element = registryEntry.handler;

  // Build the context and render sending the right props
  return (
    <RendererContext.Consumer>
      {
        (renderers) =>
          <LocaleContext.Consumer>
            {
              (locale) => {
                const renderer: React.ComponentType<IPropertyViewRendererProps<PropertyDefinitionSupportedType>> =
                  props.renderer || renderers[registryEntry.renderer];

                const nProps = {
                  ...props,
                  language: locale.language,
                  i18n: locale.i18n,
                  rtl: locale.rtl,
                  currency: currencies[locale.currency],
                  currencyFactors: locale.currencyFactors,
                  country: countries[locale.country],
                  renderer,
                  rendererArgs: props.rendererArgs || {},
                };

                if (registryEntry.includeConfig && registryEntry.includeTokenDataAndSSR) {
                  return (
                    <ConfigContext.Consumer>
                      {(config) => (
                        <SSRContext.Consumer>
                          {(ssr) => (
                            <TokenContext.Consumer>
                              {(tokenData) => (
                                <Element
                                  {...nProps}
                                  tokenData={tokenData}
                                  ssr={ssr}
                                  config={config}
                                />
                              )}
                            </TokenContext.Consumer>
                          )}
                        </SSRContext.Consumer>
                      )}
                    </ConfigContext.Consumer>
                  );
                } else if (registryEntry.includeConfig) {
                  return (
                    <ConfigContext.Consumer>
                      {(config) => (
                        <Element
                          {...nProps}
                          config={config}
                        />
                      )}
                    </ConfigContext.Consumer>
                  );
                } else if (registryEntry.includeTokenDataAndSSR) {
                  return (
                    <SSRContext.Consumer>
                      {(ssr) => (
                        <TokenContext.Consumer>
                          {(tokenData) => (
                            <Element
                              {...nProps}
                              tokenData={tokenData}
                              ssr={ssr}
                            />
                          )}
                        </TokenContext.Consumer>
                      )}
                    </SSRContext.Consumer>
                  );
                }
                return (
                  <Element
                    {...nProps}
                  />
                );
              }
            }
          </LocaleContext.Consumer>
      }
    </RendererContext.Consumer>
  );
}
