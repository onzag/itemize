import React from "react";
import { IPropertyEntryRendererProps, IPropertyEntryHandlerProps } from ".";
import { PropertyDefinitionSupportedBooleanType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/boolean";
export interface IPropertyEntryBooleanRendererProps extends IPropertyEntryRendererProps<PropertyDefinitionSupportedBooleanType> {
    isTernary: boolean;
    trueLabel?: string;
    falseLabel?: string;
    nullLabel?: string;
}
export default class PropertyEntryBoolean extends React.Component<IPropertyEntryHandlerProps<PropertyDefinitionSupportedBooleanType, IPropertyEntryBooleanRendererProps>> {
    constructor(props: IPropertyEntryHandlerProps<PropertyDefinitionSupportedBooleanType, IPropertyEntryBooleanRendererProps>);
    onRestoreHijacked(): void;
    shouldComponentUpdate(nextProps: IPropertyEntryHandlerProps<PropertyDefinitionSupportedBooleanType, IPropertyEntryBooleanRendererProps>): boolean;
    render(): JSX.Element;
}
