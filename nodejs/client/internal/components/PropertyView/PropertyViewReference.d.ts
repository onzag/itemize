/**
 * Contains the view handler for the reference
 * subtype, aka integer/reference
 * @packageDocumentation
 */
import React from "react";
import { IPropertyViewHandlerProps } from ".";
import { EndpointErrorType } from "../../../../base/errors";
import ItemDefinition from "../../../../base/Root/Module/ItemDefinition";
import PropertyDefinition from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { IPropertyViewSimpleRendererProps } from "./PropertyViewSimple";
/**
 * The property view reference state
 */
interface IPropertyViewReferenceState {
    /**
     * A current find error, currently not really being
     * used anywhere as it's not passed
     */
    currentFindError: EndpointErrorType;
    /**
     * Current string value of the current value
     * that is given as the value of the integer
     * or null
     */
    currentStrValue: string;
}
/**
 * The property view reference handler, note how unlike most
 * other handlers this handler uses the property view simple renderer
 * in order to render its value
 */
export default class PropertyViewReference extends React.Component<IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>, IPropertyViewReferenceState> {
    private currentlyFindingValueFor;
    constructor(props: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>);
    componentDidMount(): void;
    /**
     * Provides the special data for the reference
     * @returns an array where 0 is the item definition that is target, 1 is the property definition
     * we are using for display
     */
    getSpecialData(): [ItemDefinition, PropertyDefinition];
    /**
     * Provides the SSR found value if any found and if SSR active
     * @param forId for the given id
     * @param forVersion for the given version
     * @returns a string value or null if nothing found
     */
    getSSRFoundValue(forId: number, forVersion: string): string;
    /**
     * Finds the current string value for the given id and version
     * @param forId
     * @param forVersion
     */
    findCurrentStrValue(forId: number, forVersion: string): Promise<void>;
    componentDidUpdate(prevProps: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>): void;
    shouldComponentUpdate(nextProps: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>, nextState: IPropertyViewReferenceState): boolean;
    render(): JSX.Element;
}
export {};
