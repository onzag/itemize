/**
 * Contains the property view main handler that handles all
 * the property view variants and setups the renderers
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
import { ISSRContextType } from "../../../../client/internal/providers/ssr-provider";
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
    forId: number;
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
    token?: string;
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
        [code: string]: number;
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
 * A raw property view that uses the simple view
 * by default in order to build a view for a raw property, raw properties
 * such as created_at edited_at type and so on, which do not have entries
 * nor property definitions
 *
 * @param props the props
 * @returns areact element
 */
export declare function RawBasePropertyView(props: {
    value: string;
    renderer?: React.ComponentType<IRendererProps>;
    rendererArgs?: object;
}): JSX.Element;
export default function PropertyView(props: IPropertyViewMainHandlerProps<IPropertyViewRendererProps<PropertyDefinitionSupportedType>>): JSX.Element;
