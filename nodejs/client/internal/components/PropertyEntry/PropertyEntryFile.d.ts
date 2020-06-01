import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import { PropertyDefinitionSupportedFileType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
import { IImageSizes } from "../../../components/util";
export interface IPropertyEntryFileRendererProps extends IPropertyEntryRendererProps<PropertyDefinitionSupportedFileType> {
    accept: string;
    isExpectingImages: boolean;
    genericActivePlaceholder: string;
    genericDeleteLabel: string;
    genericSelectLabel: string;
    isSupportedImage: boolean;
    rejected: boolean;
    rejectedReason: string;
    imageSrcSet: string;
    imageSizes: IImageSizes;
    prettySize: string;
    extension: string;
    onSetFile: (file: File) => void;
    onRemoveFile: () => void;
    openFile: (value: PropertyDefinitionSupportedFileType) => void;
}
interface IPropertyEntryFileState {
    rejectedValue: PropertyDefinitionSupportedFileType;
    rejected: boolean;
    rejectedReason: string;
}
export default class PropertyEntryFile extends React.Component<IPropertyEntryHandlerProps<PropertyDefinitionSupportedFileType, IPropertyEntryFileRendererProps>, IPropertyEntryFileState> {
    private ownedObjectURLPool;
    constructor(props: IPropertyEntryHandlerProps<PropertyDefinitionSupportedFileType, IPropertyEntryFileRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyEntryHandlerProps<PropertyDefinitionSupportedFileType, IPropertyEntryFileRendererProps>, nextState: IPropertyEntryFileState): boolean;
    componentWillUnmount(): void;
    openFile(value: PropertyDefinitionSupportedFileType): void;
    onSetFile(file: File): void;
    onRemoveFile(): void;
    render(): JSX.Element;
}
export {};
