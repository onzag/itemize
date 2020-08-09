/**
 * Contains the property view file handler
 * @packageDocumentation
 */
import React from "react";
import { IPropertyViewRendererProps, IPropertyViewHandlerProps } from ".";
import { PropertyDefinitionSupportedFileType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
/**
 * The property view renderer props that every property renderer
 * for file contains
 */
export interface IPropertyViewFileRendererProps extends IPropertyViewRendererProps<PropertyDefinitionSupportedFileType> {
    /**
     * whether the file is a supported image
     */
    isSupportedImage: boolean;
    /**
     * If it's a supported image, the source set
     * that is attached to that image
     */
    imageSrcSet: string;
    /**
     * The size of the file in a human readable form
     */
    prettySize: string;
    /**
     * The extension of that file
     */
    extension: string;
    /**
     * open the current file
     */
    openFile: () => void;
}
export default class PropertyViewFile extends React.Component<IPropertyViewHandlerProps<IPropertyViewFileRendererProps>> {
    shouldComponentUpdate(nextProps: IPropertyViewHandlerProps<IPropertyViewFileRendererProps>): boolean;
    openFile(): void;
    render(): JSX.Element;
}
