import React from "react";
import { IPropertyViewRendererProps, IPropertyViewHandlerProps } from ".";
import { PropertyDefinitionSupportedFileType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
export interface IPropertyViewFileRendererProps extends IPropertyViewRendererProps<PropertyDefinitionSupportedFileType> {
    isSupportedImage: boolean;
    imageSrcSet: string;
    prettySize: string;
    extension: string;
    openFile: (value: PropertyDefinitionSupportedFileType) => void;
}
export default class PropertyViewFile extends React.Component<IPropertyViewHandlerProps<IPropertyViewFileRendererProps>> {
    shouldComponentUpdate(nextProps: IPropertyViewHandlerProps<IPropertyViewFileRendererProps>): boolean;
    openFile(value: PropertyDefinitionSupportedFileType): void;
    render(): JSX.Element;
}
