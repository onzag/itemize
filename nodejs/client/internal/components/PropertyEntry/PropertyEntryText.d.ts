import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import { IPropertyDefinitionSupportedSingleFilesType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
export interface IPropertyEntryTextRendererProps extends IPropertyEntryRendererProps<string> {
    i18nFormat: {
        formatBoldLabel: string;
        formatItalicLabel: string;
        formatUnderlineLabel: string;
        formatTitleLabel: string;
        formatQuoteLabel: string;
        formatListNumberedLabel: string;
        formatListBulletedLabel: string;
        formatAddImageLabel: string;
        formatAddVideoLabel: string;
        formatAddFileLabel: string;
    };
    i18nLoadVideo: {
        invalid: string;
        label: string;
        placeholder: string;
        title: string;
        submit: string;
    };
    isRichText: boolean;
    supportsImages: boolean;
    supportsFiles: boolean;
    supportsVideos: boolean;
    mediaPropertyAcceptsFiles: string;
    mediaPropertyAcceptsImages: string;
    i18nGenericError: string;
    i18nOk: string;
    lastLoadedFileError: string;
    dismissLastLoadedFileError: () => void;
    onInsertFile: (file: File) => IPropertyDefinitionSupportedSingleFilesType;
    onInsertImage: (file: File) => Promise<{
        result: IPropertyDefinitionSupportedSingleFilesType;
        width: number;
        height: number;
    }>;
}
interface IPropertyEntryTextState {
    lastLoadedFileError: string;
}
export default class PropertyEntryText extends React.Component<IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>, IPropertyEntryTextState> {
    private cachedMediaProperty;
    private cachedMediaPropertyAcceptsFiles;
    private cachedMediaPropertyAcceptsImages;
    private internalFileCache;
    constructor(props: IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>);
    dismissLastLoadedFileError(): void;
    componentWillUnmount(): void;
    cacheMediaPropertyInProps(props: IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>): void;
    cacheCurrentFiles(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>): void;
    onChangeHijacked(value: string, internalValue: any): void;
    onRestoreHijacked(): void;
    onSyncFile(fileId: string): void;
    onRemoveFile(fileId: string): void;
    /**
     * Insers an image based on a file into the correlated file field and performs
     * the required checks
     * @param file the file to insert
     * @returns a promise, note that this promise can fail if the file itself fails and provide a generic error
     */
    onInsertImage(file: File): Promise<{
        result: IPropertyDefinitionSupportedSingleFilesType;
        width: number;
        height: number;
    }>;
    setMetadata(file: IPropertyDefinitionSupportedSingleFilesType, metadata: string): void;
    /**
     * Inserts a file in the media property
     * @param file the file to insert
     * @param validateAgainstImages whether the errors and check given will be for image types
     */
    onInsertFile(file: File, validateAgainstImages?: boolean): IPropertyDefinitionSupportedSingleFilesType;
    shouldComponentUpdate(nextProps: IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>): boolean;
    render(): JSX.Element;
}
export {};
