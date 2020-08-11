/**
 * This contains the rather simple property setter component
 * @packageDocumentation
 */
import React from "react";
import PropertyDefinition from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { PropertyDefinitionSupportedType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
/**
 * Base props for the property setter, check base.tsx to check
 * how these properties are given
 */
export interface IPropertySetterBaseProps {
    /**
     * The property that is to be set
     * retrieved from the item-definition.tsx context
     */
    property: PropertyDefinition;
    /**
     * The slot id that is to be used, or null
     * retrieved from the item-definition.tsx context
     */
    forId: number;
    /**
     * The slot version that is to be used, or null
     * retrieved from the item-definition.tsx context
     */
    forVersion?: string;
    /**
     * The value that is to be set
     * Provided by the user
     */
    value: PropertyDefinitionSupportedType;
    /**
     * The enforcement function
     * retrieved from the item-definition.tsx context
     */
    onEnforce: (property: PropertyDefinition, value: PropertyDefinitionSupportedType, forId: number, forVersion: string) => void;
    /**
     * The clear enforcement function
     * retrieved from the item-definition.tsx context
     */
    onClearEnforcement: (property: PropertyDefinition, forId: number, forVersion: string) => void;
}
/**
 * The property setter allows to manually set values for
 * properties, these then become readonly
 */
export default class PropertySetter extends React.Component<IPropertySetterBaseProps, {}> {
    constructor(props: IPropertySetterBaseProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: IPropertySetterBaseProps): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
