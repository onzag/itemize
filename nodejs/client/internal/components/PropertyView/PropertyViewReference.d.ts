import React from "react";
import { IPropertyViewHandlerProps } from ".";
import { EndpointErrorType } from "../../../../base/errors";
import ItemDefinition from "../../../../base/Root/Module/ItemDefinition";
import PropertyDefinition, { PropertyDefinitionValueType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { IPropertyViewSimpleRendererProps } from "./PropertyViewSimple";
export interface IPropertyViewReferenceOption {
    id: number;
    text: string;
}
export interface IReferrencedPropertySet {
    [propertyId: string]: PropertyDefinitionValueType;
}
interface IPropertyViewReferenceState {
    currentFindError: EndpointErrorType;
    currentStrValue: string;
}
export default class PropertyViewReference extends React.Component<IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>, IPropertyViewReferenceState> {
    private currentlyFindingValueFor;
    constructor(props: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>);
    componentDidMount(): void;
    getSpecialData(): [ItemDefinition, PropertyDefinition, PropertyDefinition];
    getSSRFoundValue(forId: number, forVersion: string): string;
    findCurrentStrValue(forId: number, forVersion: string): Promise<void>;
    componentDidUpdate(prevProps: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>): void;
    shouldComponentUpdate(nextProps: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>, nextState: IPropertyViewReferenceState): boolean;
    render(): JSX.Element;
}
export {};
