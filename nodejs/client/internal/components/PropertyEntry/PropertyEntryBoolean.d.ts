/**
 * Contains the boolean handler
 * @packageDocumentation
 */
import React from "react";
import { IPropertyEntryRendererProps, IPropertyEntryHandlerProps } from ".";
import { PropertyDefinitionSupportedBooleanType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/boolean";
/**
 * Props that every boolean renderer is going to get
 */
export interface IPropertyEntryBooleanRendererProps extends IPropertyEntryRendererProps<PropertyDefinitionSupportedBooleanType> {
    /**
     * Defines if the boolean represents a ternary boolean type, aka it's a nullable boolean, so
     * it holds 3 values, true, false and null; you should use different logic for ternary booleans
     */
    isTernary: boolean;
    /**
     * The label for the true value, it is localized, and it can be passed optionally, there's a default for it otherwise
     */
    trueLabel: string;
    /**
     * The label for the false value, it is localized, and it can be passed optionally, there's a default for it otherwise
     */
    falseLabel: string;
    /**
     * The label for the null value, it is localized, and it can be passed optionally, there's a default for it otherwise
     */
    nullLabel: string;
}
/**
 * The property entry boolean handler
 */
export default class PropertyEntryBoolean extends React.Component<IPropertyEntryHandlerProps<PropertyDefinitionSupportedBooleanType, IPropertyEntryBooleanRendererProps>> {
    constructor(props: IPropertyEntryHandlerProps<PropertyDefinitionSupportedBooleanType, IPropertyEntryBooleanRendererProps>);
    /**
     * Instead of passing the raw on restore function we hijack the function
     * in order to restore conditionally, the reason is that restoring to null
     * might be bad if null is a non default value, and we want to restore to false
     */
    onRestoreHijacked(): void;
    shouldComponentUpdate(nextProps: IPropertyEntryHandlerProps<PropertyDefinitionSupportedBooleanType, IPropertyEntryBooleanRendererProps>): boolean;
    render(): JSX.Element;
}
