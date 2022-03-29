/**
 * Contains the property entry main component that defines how properties
 * are to be managed within itemize for entry
 * @module
 */

import PropertyDefinition, {
  IPropertyDefinitionState,
} from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import React from "react";
import PropertyEntryBoolean from "./PropertyEntryBoolean";
import PropertyEntryText from "./PropertyEntryText";
import PropertyEntryDateTime from "./PropertyEntryDateTime";
import PropertyEntryLocation from "./PropertyEntryLocation";
import PropertyEntryReference from "./PropertyEntryReference";
import PropertyEntrySelect from "./PropertyEntrySelect";
import PropertyEntryField from "./PropertyEntryField";
import PropertyEntryFile from "./PropertyEntryFile";
import PropertyEntryPayment from "./PropertyEntryPayment";
import { LocaleContext } from "../../providers/locale-provider";
import { Ii18NType } from "../../../../base/Root";
import {
  PropertyDefinitionSupportedTypeName, PropertyDefinitionSupportedType,
} from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { currencies, countries, ICurrencyType, ICountryType } from "../../../../imported-resources";
import { RendererContext } from "../../../providers/renderer";
import { IRendererProps } from "../../renderer";
import ItemDefinition from "../../../../base/Root/Module/ItemDefinition";
import Include from "../../../../base/Root/Module/ItemDefinition/Include";
import { IConfigRawJSONDataType } from "../../../../config";
import { ConfigContext } from "../../providers/config-provider";
import { TokenContext, ITokenContextType } from "../../providers/token-provider";
import { ISSRContextType, SSRContext } from "../../providers/ssr-provider";
import PropertyEntryFiles from "./PropertyEntryFiles";

/**
 * This is what every renderer gets regardless of type as long as it's an entry
 * type, it will get this instance as its props, the ValueType represents the property definition
 * type it epects as its current value
 * 
 * Expect these to be extended
 */
export interface IPropertyEntryRendererProps<ValueType> extends IRendererProps {
  /**
   * The property id in question
   */
  propertyId: string;

  /**
   * label of the property, every property should have a label unless it's hidden
   * this is locale specific
   */
  label?: string;
  /**
   * The placeholder of the property, every property should have a placeholder unless it's hidden
   * this is locale specific
   */
  placeholder?: string;
  /**
   * The description of the property, properties might or might not have descriptions
   * this is locale specific; the description might not be passed if specified by the UI
   */
  description?: string;
  /**
   * Icon are an UI defined property for an icon to use during the view, handle as you wish
   */
  icon?: React.ReactNode;

  /**
   * The currently applied value that is in sync with the server side
   */
  currentAppliedValue: ValueType;
  /**
   * A boolean, normally true if our current applied value differs from our
   * current value, this check is exceptional as it uses the local equal function
   */
  canRestore: boolean;
  /**
   * The current value
   */
  currentValue: ValueType;
  /**
   * Whether this current value is currently seen as valid, this is a finicky
   * value that does not correlate directly to the actual property
   * state; things such as being poked, or the user having forced
   * a value for this play a role as well
   */
  currentValid: boolean;
  /**
   * If current valid is false, then there might be a reason
   * attached to it, this invalid reason is locale specific;
   * if there's no currently invalid reason, this usually means
   * the item was forced into the invalid state by the passing
   * of a flag
   */
  currentInvalidReason?: string;
  /**
   * The current internal value, if any given
   */
  currentInternalValue?: any;

  /**
   * Whether the entry should autofocus
   */
  autoFocus: boolean;
  /**
   * The disabled flag is passed often when the value is somehow
   * enforced, this means that the field cannot truly be editted
   * and attempts are futile to modify
   */
  disabled: boolean;

  /**
   * Allows for the display of user set error statuses, normally you
   * will call this function when your field has been blurred so that
   * currentInvalidReason gets populated even if the field is not poked
   */
  enableUserSetErrors: () => void;

  /**
   * Standard on change function, every renderer will recieve this function
   * to trigger a change, however sometimes handlers will pass their own
   * change function that is supposed to be used instead of this one so
   * caution is advised which one to use
   */
  onChange: (value: ValueType, internalValue: any) => void;
  /**
   * Call in order to trigger restoration, ensure that canRestore is true
   * when doing this
   */
  onRestore: () => void;
}

/**
 * This is what the whole entry react component expects as its properties
 * this is what should be fed to the generic PropertyEntry and it doesn't extend
 * anything, an optional renderer and rendererArgs can be passed to modify where
 * the values are distributed
 */
export interface IPropertyEntryMainHandlerProps<ValueType, RendererPropsType> {
  // AUTOMATICALLY PROVIDED BY THE base.tsx BEING CALCULATED
  /**
   * The item definition in question, either a standard, search mode, extended, or some
   * combination, but nonetheless always available
   * 
   * Automatically Provided check base.tsx
   * retrieved from the item-definition.tsx context
   */
  itemDefinition: ItemDefinition;
  /**
   * Injects a promise that will prevent submitting until the promise is completed
   * 
   * Automatically Provided check base.tsx
   * same as the item-definition.tsx context function
   */
  injectSubmitBlockPromise: (arg: Promise<any>) => void;
  /**
   * An optional include, or null, where the property is encountered
   * 
   * Automatically Provided check base.tsx
   * retrieved from the item-definition.tsx context
   */
  include: Include;
  /**
   * The property in question
   * 
   * Automatically Provided check base.tsx
   * retrieved from the item-definition.tsx context
   */
  property: PropertyDefinition;
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
   * The state of the property definition, same as property.getState or property.getStateNoExternalChecking
   * but this value is more efficient to access
   * 
   * Automatically Provided check base.tsx
   * filtered for this specific property from the item-definition.tsx context state value
   */
  state: IPropertyDefinitionState;
  /**
   * The on change event, this is similar to the property.setCurrentValue but takes cares of things
   * like slotting and does the necessary calls to the UI in order to keep the UI updated with these
   * changes, you will receive a new state in this case if the new state differs
   * 
   * Automatically Provided check base.tsx
   * based on the change function from the item-definition.tsx context
   */
  onChange: (newValue: ValueType, internalValue: any) => void;
  /**
   * The restore event, similar to property.restoreValueFor but takes cares of the slot and does
   * the necessary calls for the UI
   * 
   * Automatically Provided check base.tsx
   * based on the restore function from the item-definition.tsx context
   */
  onRestore: () => void;
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
   * Whether the item is currently poked
   * 
   * Automatically Provided check base.tsx
   * calculated from the item-definition.tsx context
   */
  poked?: boolean;

  /**
   * Whether the UI has specified this component to be forcefully invalid
   * even if that's not the case and there's no internal error
   * 
   * Developer Provided check base.tsx
   */
  forceInvalid?: boolean;
  /**
   * Avoid passing a description to the renderer
   * 
   * Developer Provided check base.tsx
   */
  hideDescription?: boolean;
  /**
   * Pass an alternative description to the renderer
   * 
   * Developer Provided check base.tsx
   */
  altDescription?: string;
  /**
   * Pass an alternative label to the renderer
   * 
   * Developer Provided check base.tsx
   */
  altLabel?: string;
  /**
   * Hides the label in the renderer
   * 
   * Developer Provided check base.tsx
   */
  hideLabel?: boolean;
  /**
   * Pass an alternative placeholder to the renderer
   * 
   * Developer Provided check base.tsx
   */
  altPlaceholder?: string;
  /**
   * Whether the item should autofocus on mount
   * 
   * Developer Provided check base.tsx
   */
  autoFocus?: boolean;
  /**
   * An optional icon
   * 
   * Developer Provided check base.tsx
   */
  icon?: React.ReactNode;
  /**
   * Whether to ignore errors, this means that it will
   * always show as valid, however forceInvalid is more
   * powerful that this
   * 
   * Developer Provided check base.tsx
   */
  ignoreErrors?: boolean;
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
   * A value to prefill with during the construction
   * event of the property
   * 
   * Developer provided check base.tsx
   */
  prefillWith?: PropertyDefinitionSupportedType;
  /**
   * A value used for the reference type in order
   * to apply to the filtering set that is used
   * in the reference
   * 
   * Developer provided check base.tsx
   */
  referenceFilteringSet?: {
    [key: string]: PropertyDefinitionSupportedType;
  };
  /**
   * A value specified to cache url files as they are loaded
   * via the url
   */
  cacheFiles: boolean;
  /**
   * Developer provider check base.tsx
   */
  disabled: boolean;
  /**
   * Will display even if it's hidden
   */
  displayHidden?: boolean;
}

/**
 * These represent values that are read from the context and every handler down the line gets
 * these do not need to be passed to the main handler, the main handler passes to the smaller
 * handlers, they receive all the main handler props and these
 */
export interface IPropertyEntryHandlerProps<ValueType, RendererPropsType> extends IPropertyEntryMainHandlerProps<ValueType, RendererPropsType> {
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
   * note how the handler uses the IPropertyEntryHandlerProps so that
   * it should consume the interface before us
   */
  handler: React.ComponentType<
    // A component that uses IPropertyEntryHandlerProps
    IPropertyEntryHandlerProps<
      // a generic one for that where value can be any of the supported value types
      PropertyDefinitionSupportedType,
      // and it should have a renderer component, where the component takes these props
      IPropertyEntryRendererProps<
        // and the renderer is also generic for the motives of this registry
        PropertyDefinitionSupportedType
      >
    >
  >,

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
 * This represents our standard select subhandler used for
 * selecting when there are specific valid values, a bit of an
 * exception since it works with numbers, text and string
 */
const selectHandler: IRendererHandlerType = {
  renderer: "PropertyEntrySelect",
  handler: PropertyEntrySelect as any,
}

/**
 * Now we can build or handler registry based on what we have
 * The type registry contains a list of handlers for a given type
 */
const handlerRegistry:
  Record<
    PropertyDefinitionSupportedTypeName,
    IRendererWholeHandlerType
  > = {
  string: {
    // The standard field handles string, as it's just a texfield
    renderer: "PropertyEntryField",
    handler: PropertyEntryField,
    subhandler: {
      // for the subtype reference we use another whole
      // different handler
      reference: {
        renderer: "PropertyEntryReference",
        handler: PropertyEntryReference,
        // references need the token and SSR in order
        // to fetch values and assign itself
        // values
        includeTokenDataAndSSR: true,
      },
    },
  },
  integer: {
    // The standard field also handles integers, as it's written in the same form
    renderer: "PropertyEntryField",
    handler: PropertyEntryField,
  },
  number: {
    // The standard field handles numbers as well, as it's just a texfield
    renderer: "PropertyEntryField",
    handler: PropertyEntryField,
  },
  boolean: {
    // Booleans are expected to be different UI wise, so we use
    // a different renderer
    renderer: "PropertyEntryBoolean",
    handler: PropertyEntryBoolean,
  },
  text: {
    // Text, both plain and html will use a different subhandler as
    // they are expected to be multiline content; even if one
    // does not qualify as rich text
    renderer: "PropertyEntryText",
    handler: PropertyEntryText,

    // however if no plain nor html has been specified
    defaultSubhandler: {
      // we use our standard field
      renderer: "PropertyEntryField",
      handler: PropertyEntryField,
    },
    includeConfig: true,
  },
  currency: {
    // Currency also uses the field renderer as it's
    // basically a glorified number
    renderer: "PropertyEntryField",
    handler: PropertyEntryField,
  },
  unit: {
    // Same for unit which is also basically a glorified number
    renderer: "PropertyEntryField",
    handler: PropertyEntryField,
  },
  password: {
    // Password is the same, field
    renderer: "PropertyEntryField",
    handler: PropertyEntryField,
  },
  year: {
    // Year is just an integer
    renderer: "PropertyEntryField",
    handler: PropertyEntryField,
  },
  datetime: {
    // Now date, datetime and date have their own
    // renderer as we can have some form of
    // date pickers for them
    renderer: "PropertyEntryDateTime",
    handler: PropertyEntryDateTime,
  },
  date: {
    renderer: "PropertyEntryDateTime",
    handler: PropertyEntryDateTime,
  },
  time: {
    renderer: "PropertyEntryDateTime",
    handler: PropertyEntryDateTime,
  },
  location: {
    // location is drastically different as well
    renderer: "PropertyEntryLocation",
    handler: PropertyEntryLocation,
  },
  file: {
    // and file uses its own renderer as well
    renderer: "PropertyEntryFile",
    handler: PropertyEntryFile,
    includeConfig: true,
  },
  payment: {
    renderer: "PropertyEntryPayment",
    handler: PropertyEntryPayment,
  },
  // unecessary to specify as the property entry select
  // will automatically handle the taglist because
  // it always has values into it
  // TODO now it is necessary as the arbitrary tags is now
  // into play
  taglist: null,

  files: {
    // and file uses its own renderer as well
    renderer: "PropertyEntryFiles",
    handler: PropertyEntryFiles,
    includeConfig: true,
  },
};

/**
 * This function provides a fake country if somehow
 * the code set for the country is invalid, this might happen
 * either because there's a bug in itemize, or because a country
 * was removed from itemize yet the value is stored, this prevents
 * the application from crashing and allows the user to select a new
 * country, this should never happen
 * 
 * @param code the country code
 */
function defaultCountryBugCatcher(code: string) {
  console.error("Attempted to load invalid country", code);
  return {
    name: "?",
    native: "?",
    code,
    phone: "?",
    continent: "?",
    capital: "?",
    languages: [] as string[],
    emoji: "?",
    emojiU: "?",
    currency: "USD",
    longitude: 0,
    latitude: 0,
  }
};

/**
 * This function provides a fake currency if somehow
 * the code set for the currency is invalid, this might happen
 * either because there's a bug in itemize, or because a currency
 * was removed from itemize yet the value is stored, this prevents
 * the application from crashing and allows the user to select a new
 * currency, this should never happen
 * 
 * @param code the currency code
 */
function defaultCurrencyBugCacher(code: string) {
  console.error("Attempted to load invalid currency", code);
  return {
    code,
    name: "?",
    symbol: "?",
    rounding: 0,
    decimals: 2,
  }
}

/**
 * This represents the main handler, it's used in base.tsx after reading
 * and calculating the properties it needs from the different contexts
 * 
 * Being an internal function this should never really be called by the developer
 * they should instead use Entry, which uses the base.tsx file in order to automatically
 * provide most of the properties required
 * 
 * @param props 
 */
export default class PropertyEntry extends
  React.Component<IPropertyEntryMainHandlerProps<PropertyDefinitionSupportedType, IPropertyEntryRendererProps<PropertyDefinitionSupportedType>>> {
  constructor(props: IPropertyEntryMainHandlerProps<PropertyDefinitionSupportedType, IPropertyEntryRendererProps<PropertyDefinitionSupportedType>>) {
    super(props);
  }

  public componentDidMount() {
    if (typeof this.props.prefillWith !== "undefined") {
      this.props.onChange(this.props.prefillWith, null);
    }
  }

  public render() {
    // hidden properties simply do not show, we short circuit here
    if (this.props.state.hidden && !this.props.displayHidden) {
      return null;
    }

    // now we need the type and subtype of the property itself
    const type = this.props.property.getType();
    const subtype = this.props.property.getSubtype();

    // First get the handler by the type
    // so our exception handler, for select, when we have specific valid values
    let registryEntry: IRendererWholeHandlerType = this.props.property.hasSpecificValidValues() ?
      selectHandler :
      handlerRegistry[type];

    // so now we check for subtype handling, if we got no subtype
    // at all, we check if we have a default subhandler
    if (subtype === null && registryEntry.defaultSubhandler) {
      registryEntry = registryEntry.defaultSubhandler;
    } else if (subtype && registryEntry.subhandler && registryEntry.subhandler[subtype]) {
      // also check for a specific subtype handler
      registryEntry = registryEntry.subhandler[subtype];
    }

    // now we can get the element that represents the handler
    // we will be working with
    const HandlerElement = registryEntry.handler;

    // Build the context and render sending the right props
    return (
      <RendererContext.Consumer>
        {
          (renderers) =>
            <LocaleContext.Consumer>
              {
                (locale) => {

                  // we will always need the renderer and locale context to get this data, first the renderer
                  // that we will be using, it could be a fast prototyping one or whatever
                  // the developer is using, note how the passed renderer holds priority
                  const renderer: React.ComponentType<IPropertyEntryRendererProps<PropertyDefinitionSupportedType>> =
                    this.props.renderer || renderers[registryEntry.renderer];

                  // now we define the props that our handler will be
                  // requiring in order to create this environemnt
                  // to pass to the renderers
                  const nProps = {
                    // first all the main handler props go in
                    ...this.props,

                    // now these come from our contexts
                    language: locale.language,
                    i18n: locale.i18n,
                    rtl: locale.rtl,
                    currency: currencies[locale.currency] || defaultCurrencyBugCacher(locale.currency),
                    country: countries[locale.country] || defaultCountryBugCatcher(locale.country),

                    // our new renderer
                    renderer,
                    // and its args
                    rendererArgs: this.props.rendererArgs || {},
                  };

                  // so now we should check for the contexts that we need
                  if (registryEntry.includeConfig && registryEntry.includeTokenDataAndSSR) {
                    // first and foremost the static contexts, then the dynamic
                    return (
                      <ConfigContext.Consumer>
                        {(config) => (
                          <SSRContext.Consumer>
                            {(ssr) => (
                              <TokenContext.Consumer>
                                {(tokenData) => (
                                  <HandlerElement
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
                    // same here
                    return (
                      <ConfigContext.Consumer>
                        {(config) => (
                          <HandlerElement
                            {...nProps}
                            config={config}
                          />
                        )}
                      </ConfigContext.Consumer>
                    );
                  } else if (registryEntry.includeTokenDataAndSSR) {
                    // and here
                    return (
                      <SSRContext.Consumer>
                        {(ssr) => (
                          <TokenContext.Consumer>
                            {(tokenData) => (
                              <HandlerElement
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

                  // if we don't need to read anything else from any other context
                  // we can do this
                  return (
                    <HandlerElement
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
}
