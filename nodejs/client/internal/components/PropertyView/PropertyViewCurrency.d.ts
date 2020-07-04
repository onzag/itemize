import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import { ICurrencyType } from "../../../../imported-resources";
import { IPropertyDefinitionSupportedCurrencyType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/currency";
export interface IPropertyViewCurrencyRendererProps extends IPropertyViewRendererProps<IPropertyDefinitionSupportedCurrencyType> {
    format: "$N" | "N$";
    convertedCurrency: ICurrencyType;
    originalCurrency: ICurrencyType;
    convertedValue: number;
    convertedStrValue: string;
    originalValue: number;
    originalStrValue: string;
}
export declare class PropertyViewCurrency extends React.Component<IPropertyViewHandlerProps<IPropertyViewCurrencyRendererProps>> {
    constructor(props: IPropertyViewHandlerProps<IPropertyViewCurrencyRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyViewHandlerProps<IPropertyViewCurrencyRendererProps>): boolean;
    render(): JSX.Element;
}
