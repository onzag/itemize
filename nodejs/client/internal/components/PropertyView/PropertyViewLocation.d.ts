/**
 * The property view location handler
 * @packageDocumentation
 */
import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import { IPropertyDefinitionSupportedLocationType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
import { IViewport } from "../PropertyEntry/PropertyEntryLocation";
/**
 * The property view location renderer props
 */
export interface IPropertyViewLocationRendererProps extends IPropertyViewRendererProps<IPropertyDefinitionSupportedLocationType> {
    /**
     * A viewport that is currently in use
     */
    viewport: IViewport;
    /**
     * The viewport change event
     */
    onViewportChange: (viewport: IViewport) => void;
    /**
     * Reset viewport center
     */
    onResetViewportCenter: () => void;
    /**
     * can the viewport center be reset? this allows
     * to show a button when the viewport can indeed
     * be reset
     */
    canResetViewportCenter: boolean;
}
/**
 * The property view handler state
 */
interface IPropertyViewLocationRendererState {
    /**
     * The current viewport
     */
    viewport: IViewport;
}
/**
 * cheap function to compare two lng, and lat pairs to see
 * if they are basically equal
 * @param one an array of [lat, lng]
 * @param two another array of [lat, lng]
 * @returns a boolean on whether it is for all intents and purposes an equal location
 */
export declare function isCenterBasicallyEquals(one: [number, number], two: [number, number]): boolean;
/**
 * The property view location handler class
 */
export declare class PropertyViewLocation extends React.Component<IPropertyViewHandlerProps<IPropertyViewLocationRendererProps>, IPropertyViewLocationRendererState> {
    constructor(props: IPropertyViewHandlerProps<IPropertyViewLocationRendererProps>);
    componentDidUpdate(prevProps: IPropertyViewHandlerProps<IPropertyViewLocationRendererProps>): void;
    onViewportChange(viewport: IViewport): void;
    onResetViewportCenter(): void;
    shouldComponentUpdate(nextProps: IPropertyViewHandlerProps<IPropertyViewLocationRendererProps>, nextState: IPropertyViewLocationRendererState): boolean;
    render(): JSX.Element;
}
export {};
