/**
 * Contains the property view currency handler
 * @packageDocumentation
 */
import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import { ICurrencyType } from "../../../../imported-resources";
import { IPropertyDefinitionSupportedCurrencyType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/currency";
/**
 * The property view currency renderer props
 */
export interface IPropertyViewCurrencyRendererProps extends IPropertyViewRendererProps<IPropertyDefinitionSupportedCurrencyType> {
    /**
     * The format which is used for the currency given the user's language
     * $N means symbol first, number last N$ means the opposite
     */
    format: "$N" | "N$";
    /**
     * The original value, as a number, might be null
     * if the value itself is null
     */
    originalValue: number;
    /**
     * The original value as a string, formatted
     * to match the user's locale, might be null
     * if the currency value itself is null
     */
    originalStrValue: string;
    /**
     * The original currency the currency type is
     * specified in, might be null if the currency
     * is null
     */
    originalCurrency: ICurrencyType;
    /**
     * If the original currency was not the user's selected
     * currency, this value is the result of that conversion,
     * otherwise null
     */
    convertedValue: number;
    /**
     * Same as the converted value, but formatted in order
     * to match the user's locale
     */
    convertedStrValue: string;
    /**
     * If the original curency was not the user's selected
     * currency, this value represents the user's currency
     * that it was converted to; it's basically the same as
     * the current's user currency
     */
    convertedCurrency: ICurrencyType;
}
export declare class PropertyViewCurrency extends React.Component<IPropertyViewHandlerProps<IPropertyViewCurrencyRendererProps>> {
    constructor(props: IPropertyViewHandlerProps<IPropertyViewCurrencyRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyViewHandlerProps<IPropertyViewCurrencyRendererProps>): boolean;
    render(): JSX.Element;
}
