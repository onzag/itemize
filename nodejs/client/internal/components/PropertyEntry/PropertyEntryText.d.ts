/**
 * The gargantuan entry text handler
 * @packageDocumentation
 */
import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import { IPropertyDefinitionSupportedSingleFilesType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
/**
 * Information about the file that has just been inserted
 */
export interface IInsertedFileInformationType {
    /**
     * The file itself
     */
    result: IPropertyDefinitionSupportedSingleFilesType;
    /**
     * width of the file, only available if it's an image
     */
    width: number;
    /**
     * height of the file, only available if it's an image
     */
    height: number;
    /**
     * whether it is an image
     */
    isImage: boolean;
}
/**
 * The entry text renderer props that every renderer is going to get
 * in order to render text
 */
export interface IPropertyEntryTextRendererProps extends IPropertyEntryRendererProps<string> {
    /**
     * For rich text contains the information about
     * building the standard toolbar that is expected
     */
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
    /**
     * For rich text contains locale information that
     * are used in order to specify the load video dialog
     * that takes an url
     */
    i18nLoadVideo: {
        invalid: string;
        label: string;
        placeholder: string;
        title: string;
        submit: string;
    };
    /**
     * Whether it is rich text
     */
    isRichText: boolean;
    /**
     * Whether it supports image loading
     */
    supportsImages: boolean;
    /**
     * Whether it supports file loading
     */
    supportsFiles: boolean;
    /**
     * Whether it supports videos
     */
    supportsVideos: boolean;
    /**
     * The accept for the input accept="property" of the linked media
     * property so you can filter by that, all files are included
     */
    mediaPropertyAcceptsFiles: string;
    /**
     * The accept for the input accept="property" of the linked media
     * property so you can filter by that, it's basically a narrowed
     * down version of mediaPropertyAcceptsFiles that only includes
     * image mime types
     */
    mediaPropertyAcceptsImages: string;
    /**
     * A generic error that is included for building the interface
     * you can use to show a dialog for when the loading of file
     * has failed and show this error
     */
    i18nGenericError: string;
    /**
     * A localized version of ok
     */
    i18nOk: string;
    /**
     * A localized version of an error for the last loaded file
     * that failed to load, try to dismiss it before attempting
     * to reset
     */
    lastLoadedFileError: string;
    /**
     * Dismiss the lastLoadedFileError
     */
    dismissLastLoadedFileError: () => void;
    /**
     * Insert a file, will insert a file into the media property
     * and will ensure that the file is valid as well
     * @param file the file we are passing
     * @param isExpectingImage whether the file should be an image
     * of the types we are expecting
     * @returns a promise with information about the file, note
     * that even if you are not expecting just an image but
     * you pass an image you will get image information
     */
    onInsertFile: (file: File, isExpectingImage?: boolean) => Promise<IInsertedFileInformationType>;
}
/**
 * The state for the entry text
 */
interface IPropertyEntryTextState {
    /**
     * An error for the last loaded file
     */
    lastLoadedFileError: string;
}
/**
 * The property entry text handler class
 */
export default class PropertyEntryText extends React.Component<IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>, IPropertyEntryTextState> {
    /**
     * We hold and cache our media property
     */
    private cachedMediaProperty;
    /**
     * We hold and cache our accepts for the media property
     */
    private cachedMediaPropertyAcceptsFiles;
    /**
     * We hold and cache our accpets for the images in the media property
     */
    private cachedMediaPropertyAcceptsImages;
    /**
     * As long as the property entry text is mounted it will keep track of all the files
     * that have ever been in it, in order to be able to restore
     * them during undo processes, note however, that this means that having
     * two equal property entry for text at the same time will revoke
     * all the blob urls during dismount and they will not share the same
     * history, this might cause issues due to this cache
     * so avoid having two entry at the same time
     */
    private internalFileCache;
    constructor(props: IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>);
    dismissLastLoadedFileError(): void;
    componentWillUnmount(): void;
    /**
     * Called during initial setup
     * @param props the props we are using
     */
    cacheMediaPropertyInProps(props: IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>): void;
    /**
     * Ran during mount of updates, caches the files that are in the media property
     */
    cacheCurrentFiles(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>): void;
    /**
     * the change event but hijacked so we can see
     * if we need to remove things from the media property
     *
     * This hijack only applies itself if there's a media property
     * so it makes sense
     *
     * @param value the value
     * @param internalValue the internal value
     */
    onChangeHijacked(value: string, internalValue: any): void;
    /**
     * The restore but hijacked, also only if there's
     * a media property; basically will do the standard
     * restoration, but also restore its related media property
     */
    onRestoreHijacked(): void;
    /**
     * Function that triggers when a file that had been removed, needs to be restored
     * such as done by an undo ctrl+z event
     * @param fileId the file to be restored
     */
    onRestoreLostFile(fileId: string): void;
    /**
     * Function that triggers once a file has been requested to be removed
     * it remains however in the cache itself
     * @param fileId the file id
     */
    onRemoveFile(fileId: string): void;
    /**
     * Inserts a file in the media property
     * @param file the file to insert
     * @param isExpectingImage whether the errors and check given will be for image types
     */
    onInsertFile(file: File, isExpectingImage?: boolean): Promise<IInsertedFileInformationType>;
    shouldComponentUpdate(nextProps: IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>): boolean;
    render(): JSX.Element;
}
export {};
