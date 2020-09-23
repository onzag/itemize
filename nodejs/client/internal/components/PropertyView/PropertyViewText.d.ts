/**
 * Contains the property view text handler as well as some other
 * functionality that is used for handling text
 * @packageDocumentation
 */
import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import { PropertyDefinitionSupportedTextType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/text";
import { IPropertyDefinitionSupportedSingleFilesType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import PropertyDefinition from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
/**
 * The property view renderer props as it requires the properties
 * note that this renderer is only used for html and plain, but not for the default
 * null subtype
 */
export interface IPropertyViewTextRendererProps extends IPropertyViewRendererProps<PropertyDefinitionSupportedTextType> {
    /**
     * Whether it is rich text, as in its subtype is html
     */
    isRichText: boolean;
    /**
     * Whether it is type html or plain
     */
    subtype: "html" | "plain";
}
/**
 * Sanitazation standard configuraton
 */
export declare const PROPERTY_VIEW_SANITIZE_CONFIG: {
    ADD_TAGS: string[];
    ADD_ATTR: string[];
    ALLOW_UNKNOWN_PROTOCOLS: boolean;
};
/**
 * The list of allowed classes for text as defined by the text-specs
 * this will prevent users from class injection
 */
export declare const ALLOWED_CLASSES: string[];
/**
 * The list of allowed prefixes
 */
export declare const ALLOWED_CLASSES_PREFIXES: string[];
/**
 * Template events that are supported these
 * exist as data-on-[event]="{{event}}"
 */
export declare const SUPPORTED_TEMPLATE_EVENTS: string[];
/**
 * Styles that might pop in when using templates
 * exist as data-[supportedTemplateStyle]-style="position:absolute;"
 */
export declare const SUPPORTED_TEMPLATE_STYLES: string[];
/**
 * Modify the content of the children based on
 * the template args
 */
export declare const SUPPORTED_CONTENT_MODIFIERS: string[];
/**
 * Custom handlers to modify the information within the system
 * use args
 */
export declare const SUPPORTED_HANDLERS: string[];
/**
 * This is what a handler expects out of the template
 */
export interface ICustomUITemplateHandler {
    initialize: (bareNode: HTMLElement) => HTMLElement;
    load?: (customNode: HTMLElement) => void;
    unload?: (customNode: HTMLElement) => void;
}
/**
 * The postprocessing hook that cleans and sets the attributes
 * right for the rich text in order to follow the standards
 * given by the text-specs.md file
 *
 * @param relatedProperty the property we are used as media property
 * @param currentFiles the current files
 * @param supportsImages whether we are supporting images
 * @param supportsVideos whether we are supporting videos
 * @param supportsFiles whether we are supporting files
 * @param node the given node in question we are currently processing, this is a recursive
 * function after all
 * @returns a node
 */
export declare function propertyViewPostProcessingHook(relatedProperty: PropertyDefinition, currentFiles: IPropertyDefinitionSupportedSingleFilesType[], supportsImages: boolean, supportsVideos: boolean, supportsFiles: boolean, node: HTMLElement): HTMLElement;
/**
 * The property view text class
 */
export default class PropertyViewText extends React.Component<IPropertyViewHandlerProps<IPropertyViewTextRendererProps>> {
    constructor(props: IPropertyViewHandlerProps<IPropertyViewTextRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyViewHandlerProps<IPropertyViewTextRendererProps>): boolean;
    render(): JSX.Element;
}
