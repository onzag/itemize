import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import { PropertyDefinitionSupportedTextType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/text";
import { IPropertyDefinitionSupportedSingleFilesType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import PropertyDefinition from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
export interface IPropertyViewTextRendererProps extends IPropertyViewRendererProps<PropertyDefinitionSupportedTextType> {
    isRichText: boolean;
    subtype: null | "html" | "plain";
}
export declare const PROPERTY_VIEW_SANITIZE_CONFIG: {
    ADD_TAGS: string[];
    ADD_ATTR: string[];
    ALLOW_UNKNOWN_PROTOCOLS: boolean;
};
export declare const ALLOWED_CLASSES: string[];
export declare const ALLOWED_CLASSES_PREFIXES: string[];
export declare function propertyViewPostProcessingHook(relatedProperty: PropertyDefinition, currentFiles: IPropertyDefinitionSupportedSingleFilesType[], supportsImages: boolean, supportsVideos: boolean, supportsFiles: boolean, node: HTMLElement): HTMLElement;
export default class PropertyViewText extends React.Component<IPropertyViewHandlerProps<IPropertyViewTextRendererProps>> {
    constructor(props: IPropertyViewHandlerProps<IPropertyViewTextRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyViewHandlerProps<IPropertyViewTextRendererProps>): boolean;
    render(): JSX.Element;
}
