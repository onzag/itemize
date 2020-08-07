/**
 * Contains the field handler for field types
 * @packageDocumentation
 */
import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import { IPropertyDefinitionSupportedCurrencyType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/currency";
import { ICurrencyType } from "../../../../imported-resources";
import { IPropertyDefinitionSupportedUnitType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/unit";
/**
 * An enum which is useful for numeric types
 */
export declare enum NumericType {
    /**
     * For currency, unit and number
     */
    FLOAT = 0,
    /**
     * For year, integer
     */
    INTEGER = 1,
    /**
     * Not a number, for textual types
     */
    NAN = 2
}
/**
 * Provides the numeric type of a given type
 * @param type the type we are using, number, currency, unit, etc...
 */
export declare function getNumericType(type: string): NumericType;
/**
 * Contains the unit i18n data, usually to build
 * a dialog or menu structure of the sorts
 */
interface IUnitI18nType {
    /**
     * The standard title
     */
    title: string;
    /**
     * For other units of measurement than the default
     */
    others: string;
    /**
     * A label for metric
     */
    metric: string;
    /**
     * A label for the imperial system
     */
    imperial: string;
}
/**
 * Contains the currency i18n data, usually to build
 * a dialog or menu of sorts
 */
interface ICurrencyI18nType {
    /**
     * The title of such structure
     */
    title: string;
}
/**
 * The property field renderers that every field will get
 */
export interface IPropertyEntryFieldRendererProps extends IPropertyEntryRendererProps<string> {
    /**
     * These are the types that every field renderer is expected to support, the handler
     * makes it easier so implementing it shouldn't be too hard
     */
    type: "string" | "password" | "text" | "integer" | "number" | "currency" | "year" | "unit";
    /**
     * These are the subtypes
     */
    subtype?: "email" | "identifier" | "locale" | "comprehensive-locale" | "language" | "country" | "currency" | "plain" | string;
    /**
     * The html autocomplete value is a property that comes in the schema to define how it is
     * to be html autocompleted
     */
    htmlAutocomplete?: string;
    /**
     * Whether the type is a numeric type, INTEGER or FLOAT apply
     */
    isNumericType: boolean;
    /**
     * A current textual value formatted as it should be, use this value
     * instead of any of the internal value or the current value
     */
    currentTextualValue: string;
    /**
     * Use this function instead of the onChange function, just pass
     * the textual value that the user input, the handler will be in charge
     * of knowing what value to apply to the actual item definition
     */
    onChangeByTextualValue: (textualValue: string) => void;
    /**
     * So the curency we are currently using, only available if type="currency"
     */
    currency?: ICurrencyType;
    /**
     * So the curency format, it's a localization specific question, and specifies
     * whether the currency symbol goes first or last, only available if type="currency"
     */
    currencyFormat?: "$N" | "N$";
    /**
     * All the currency types that are available, so you can allow for chosing
     * an alternative currency, only available if type="currency"
     */
    currencyAvailable?: ICurrencyType[];
    /**
     * The currency i18n data, only available if type="currency"
     */
    currencyI18n?: ICurrencyI18nType;
    /**
     * Change the currency to another currecy, only available if type="currency"
     * pick the currency from the currencyAvailable, every currency in that list
     * should have a code, only available if type="currency"
     */
    onChangeCurrency?: (code: string) => void;
    /**
     * The current unit code, only available if type="unit"
     */
    unit?: string;
    /**
     * The code for the primary metric unit, only available if type="unit"
     */
    unitPrimary?: string;
    /**
     * The code for the primary imperial unit, only available if type="unit"
     */
    unitPrimaryImperial?: string;
    /**
     * The code for all the unit options for the metric type, only available if type="unit"
     * use these options to build a list to change the unit
     */
    unitOptions?: string[];
    /**
     * The code for all the unit options for the imperial type, only available if type="unit"
     * use these options to build a list to change the unit
     */
    unitImperialOptions?: string[];
    /**
     * Specifies whether you should give priority to imperial over metric,
     * only available if type="unit"
     */
    unitPrefersImperial?: boolean;
    /**
     * Specifies that you shouldn't really try to switch the unit to any other than
     * unitPrimary, and unitPrimaryImperial
     * only available if type="unit"
     */
    unitIsLockedToPrimaries?: boolean;
    /**
     * The unit i18n data
     * only available if type="unit"
     */
    unitI18n?: IUnitI18nType;
    /**
     * Unit codes are not meant to be nice on the screen, this converts these unit
     * codes to a human readable unit node
     * only available if type="unit"
     */
    unitToNode?: (unit: string) => React.ReactNode;
    /**
     * Change the unit code
     * only available if type="unit"
     */
    onChangeUnit?: (unit: string) => void;
}
/**
 * These are all the values the field can work with
 */
declare type ValueType = string | number | IPropertyDefinitionSupportedCurrencyType | IPropertyDefinitionSupportedUnitType;
/**
 * The property entry field handler
 */
export default class PropertyEntryField extends React.Component<IPropertyEntryHandlerProps<ValueType, IPropertyEntryFieldRendererProps>> {
    constructor(props: IPropertyEntryHandlerProps<ValueType, IPropertyEntryFieldRendererProps>);
    /**
     * This is the unit to node function that is passed that convets the
     * unit code into something more legible and meant for interaction
     * @param unit the unit code
     * @returns a react element
     */
    unitToNode(unit: string): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IPropertyEntryHandlerProps<ValueType, IPropertyEntryFieldRendererProps>): void;
    shouldComponentUpdate(nextProps: IPropertyEntryHandlerProps<ValueType, IPropertyEntryFieldRendererProps>): boolean;
    /**
     * Changes the unit to a new unit
     * @param newUnit the new unit code
     */
    onChangeUnit(newUnit: string): void;
    /**
     * Change the currency code
     * @param code the code
     */
    onChangeCurrency(code: string): void;
    /**
     * Provides the information about the current unit, regardless on whether
     * we have internal data for it or not
     * @returns an array where, 0 is currentUnit by state, 1 is the standard metric unit code to use
     * 2 is the imperial unit to use, and 3 is whether the user prefers imperial
     */
    getCurrentUnit(): [string, string, string, boolean];
    /**
     * Provides information about the currency currency
     * @returns an array where, 0 is the current currency and 1 is the default currency
     * according to what we have selected in our localization options
     */
    getCurrentCurrency(): [string, string];
    /**
     * Given a textual value, updates regardless on the type
     * it is, and controls the internal value based on that
     * @param textualValue the textual value used in the field
     */
    onChangeByTextualValue(textualValue: string): void;
    render(): JSX.Element;
}
export {};
