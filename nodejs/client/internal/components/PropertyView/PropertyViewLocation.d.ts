import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import { IPropertyDefinitionSupportedLocationType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
import { IViewport } from "../PropertyEntry/PropertyEntryLocation";
export interface IPropertyViewLocationRendererProps extends IPropertyViewRendererProps<IPropertyDefinitionSupportedLocationType> {
    viewport: IViewport;
    onViewportChange: (viewport: IViewport) => void;
    onResetViewportCenter: () => void;
    canResetViewportCenter: boolean;
}
interface IPropertyViewLocationRendererState {
    viewport: IViewport;
}
export declare function isCenterBasicallyEquals(one: [number, number], two: [number, number]): boolean;
export declare class PropertyViewLocation extends React.Component<IPropertyViewHandlerProps<IPropertyViewLocationRendererProps>, IPropertyViewLocationRendererState> {
    constructor(props: IPropertyViewHandlerProps<IPropertyViewLocationRendererProps>);
    componentDidUpdate(prevProps: IPropertyViewHandlerProps<IPropertyViewLocationRendererProps>): void;
    onViewportChange(viewport: IViewport): void;
    onResetViewportCenter(): void;
    shouldComponentUpdate(nextProps: IPropertyViewHandlerProps<IPropertyViewLocationRendererProps>, nextState: IPropertyViewLocationRendererState): boolean;
    render(): JSX.Element;
}
export {};
