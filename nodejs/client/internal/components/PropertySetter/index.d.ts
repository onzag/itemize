import React from "react";
import PropertyDefinition from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { PropertyDefinitionSupportedType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
export interface IPropertySetterBaseProps {
    property: PropertyDefinition;
    forId: number;
    forVersion?: string;
    value: PropertyDefinitionSupportedType;
    onEnforce: (value: PropertyDefinitionSupportedType, forId: number, forVersion: string) => void;
    onClearEnforcement: (forId: number, forVersion: string) => void;
}
export default class PropertySetter extends React.Component<IPropertySetterBaseProps, {}> {
    constructor(props: IPropertySetterBaseProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: IPropertySetterBaseProps): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
