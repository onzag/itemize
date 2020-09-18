/**
 * Contains the property entry main component that defines how properties
 * are to be managed within itemize for entry
 * @packageDocumentation
 */
import PropertyDefinition, { IPropertyDefinitionState } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import React from "react";
import { Ii18NType } from "../../../../base/Root";
import { PropertyDefinitionSupportedType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { ICurrencyType, ICountryType } from "../../../../imported-resources";
import { IRendererProps } from "../../renderer";
import ItemDefinition from "../../../../base/Root/Module/ItemDefinition";
import Include from "../../../../base/Root/Module/ItemDefinition/Include";
import { IConfigRawJSONDataType } from "../../../../config";
import { ITokenContextType } from "../../providers/token-provider";
import { ISSRContextType } from "../../providers/ssr-provider";
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
    forId: number;
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
 * This represents the main handler, it's used in base.tsx after reading
 * and calculating the properties it needs from the different contexts
 *
 * Being an internal function this should never really be called by the developer
 * they should instead use Entry, which uses the base.tsx file in order to automatically
 * provide most of the properties required
 *
 * @param props
 */
export default function PropertyEntry(props: IPropertyEntryMainHandlerProps<PropertyDefinitionSupportedType, IPropertyEntryRendererProps<PropertyDefinitionSupportedType>>): JSX.Element;
