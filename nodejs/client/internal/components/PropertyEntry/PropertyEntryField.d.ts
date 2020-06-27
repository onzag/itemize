import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import { IPropertyDefinitionSupportedCurrencyType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/currency";
import { ICurrencyType } from "../../../../imported-resources";
import { IPropertyDefinitionSupportedUnitType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/unit";
interface IUnitI18nType {
    title: string;
    others: string;
    metric: string;
    imperial: string;
}
export interface IPropertyEntryFieldRendererProps extends IPropertyEntryRendererProps<string> {
    currentInternalStrOnlyValue: string;
    currentStrOnlyValue: string;
    type: "string" | "password" | "text" | "integer" | "number" | "currency" | "year" | "unit";
    subtype?: "email" | "identifier" | "locale" | "comprehensive-locale" | "language" | "country" | "currency" | "plain" | string;
    htmlAutocomplete?: string;
    isNumericType: boolean;
    onChangeByNumber: (textualValue: string) => void;
    currency?: ICurrencyType;
    currencyFormat?: "$N" | "N$";
    unit?: string;
    unitPrimary?: string;
    unitPrimaryImperial?: string;
    unitOptions?: string[];
    unitImperialOptions?: string[];
    unitPrefersImperial?: boolean;
    unitIsLockedToPrimaries?: boolean;
    unitI18n?: IUnitI18nType;
    unitToNode?: (unit: string) => React.ReactNode;
    onChangeUnit?: (unit: string) => void;
}
declare type ValueType = string | number | IPropertyDefinitionSupportedCurrencyType | IPropertyDefinitionSupportedUnitType;
export default class PropertyEntryField extends React.Component<IPropertyEntryHandlerProps<ValueType, IPropertyEntryFieldRendererProps>> {
    constructor(props: IPropertyEntryHandlerProps<ValueType, IPropertyEntryFieldRendererProps>);
    unitToNode(unit: string): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IPropertyEntryHandlerProps<ValueType, IPropertyEntryFieldRendererProps>): void;
    shouldComponentUpdate(nextProps: IPropertyEntryHandlerProps<ValueType, IPropertyEntryFieldRendererProps>): boolean;
    onChangeUnit(newUnit: string): void;
    getCurrentUnit(): [string, string, string, boolean];
    onChangeByNumber(textualValue: string): void;
    render(): JSX.Element;
}
export {};
