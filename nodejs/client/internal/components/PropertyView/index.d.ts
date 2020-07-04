import PropertyDefinition, { IPropertyDefinitionState } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import React from "react";
import { Ii18NType } from "../../../../base/Root";
import { PropertyDefinitionSupportedType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { ICurrencyType, ICountryType } from "../../../../imported-resources";
import { IRendererProps } from "../../renderer";
import ItemDefinition from "../../../../base/Root/Module/ItemDefinition";
import Include from "../../../../base/Root/Module/ItemDefinition/Include";
import { IConfigRawJSONDataType } from "../../../../config";
/**
 * This is what every view renderer gets
 *
 * Expect these to be extended
 */
export interface IPropertyViewRendererProps<ValueType> extends IRendererProps {
    currentValue: ValueType;
}
/**
 * This is what the general view handler is supposed to get
 */
export interface IPropertyViewMainHandlerProps<RendererPropsType> {
    config?: IConfigRawJSONDataType;
    containerId: string;
    include: Include;
    itemDefinition: ItemDefinition;
    forId: number;
    forVersion: string;
    property: PropertyDefinition;
    capitalize?: boolean;
    state: IPropertyDefinitionState;
    renderer?: React.ComponentType<RendererPropsType>;
    rendererArgs?: object;
    useAppliedValue?: boolean;
}
export interface IPropertyViewHandlerProps<RendererPropsType> extends IPropertyViewMainHandlerProps<RendererPropsType> {
    language: string;
    rtl: boolean;
    currency: ICurrencyType;
    currencyFactors: {
        [code: string]: number;
    };
    i18n: Ii18NType;
    country: ICountryType;
}
export declare function RawBasePropertyView(props: {
    value: string;
    renderer?: React.ComponentType<IRendererProps>;
    rendererArgs?: object;
}): JSX.Element;
export default function PropertyView(props: IPropertyViewMainHandlerProps<IPropertyViewRendererProps<PropertyDefinitionSupportedType>>): JSX.Element;
