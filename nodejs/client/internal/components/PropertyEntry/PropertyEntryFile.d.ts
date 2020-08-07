/**
 * Contains the entry file handler
 * @packageDocumentation
 */
import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import { PropertyDefinitionSupportedFileType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
import { IImageSizes } from "../../../components/util";
/**
 * This is the entry file renderer props that every renderer for a files type will recieve.
 * please do not use onChange with the file renderer, as it's odd, use onSetFile instead
 *
 * You might want to check text-specs.md for consistency on displaying files, but it is not
 * required to display as text-specs.md specifies
 */
export interface IPropertyEntryFileRendererProps extends IPropertyEntryRendererProps<PropertyDefinitionSupportedFileType> {
    /**
     * The accept string, use it in your input type
     */
    accept: string;
    /**
     * Whether we are expecting images and only images, this correlates
     * to accept
     */
    isExpectingImages: boolean;
    /**
     * A placeholder to show when the file field is active, normally
     * it'll contains something on the drop files here
     */
    genericActivePlaceholder: string;
    /**
     * A label to show for a button or the likes for the file to be
     * deleted
     */
    genericDeleteLabel: string;
    /**
     * A label to show for a button or the likes for the file to be
     * selected
     */
    genericSelectLabel: string;
    /**
     * Specifies whether the current value is of a supported image type, this
     * is independent of the isExpectingImages or accept; as a generic file
     * can be of the image type and the user might have specified an image for it
     * even if the file could have been any type
     */
    isSupportedImage: boolean;
    /**
     * A boolean that specifies whether the current value is actually a rejected
     * value that was not accepted by the filtering functions, either because of size
     * or whatnot, when rejected is true, the true property has a value of null
     */
    rejected: boolean;
    /**
     * A localized reason on why the rejected status is active
     */
    rejectedReason: string;
    /**
     * A source set for the image type that exists if isSupportedImage is true
     */
    imageSrcSet: string;
    /**
     * The image sizes that exist if isSupportedImage is true for the current value
     */
    imageSizes: IImageSizes;
    /**
     * A human readable form of the current size of the file, or null if no file
     */
    prettySize: string;
    /**
     * The extension for this file, it has nothing to do with the name; it's more
     * used for display purposes
     */
    extension: string;
    /**
     * Once you have got hold of a file use this function and pass it so
     * properties can be calculated, do not use onChange, use this function
     * instead
     *
     * If the property is image uploader type, or if the file is on itself
     * an image it will ensure to give it metadata
     */
    onSetFile: (file: File) => void;
    /**
     * A function to clear the file
     */
    onRemoveFile: () => void;
    /**
     * A function to open the current file
     */
    openFile: () => void;
}
/**
 * The property entry file contains an state for the rejected file
 * if such a file was rejected
 */
interface IPropertyEntryFileState {
    /**
     * The rejected file value
     */
    rejectedValue: PropertyDefinitionSupportedFileType;
    /**
     * The reason why it was rejected
     */
    rejectedReason: string;
}
/**
 * This is the property entry file class
 */
export default class PropertyEntryFile extends React.Component<IPropertyEntryHandlerProps<PropertyDefinitionSupportedFileType, IPropertyEntryFileRendererProps>, IPropertyEntryFileState> {
    /**
     * Owned object urls that creates blob urls
     * for the given files, it is cleared on dismount; this means
     * that any urls used that are temporary blobs will only
     * be available as long as the entry is active, as such
     * views will update, using the given url, and other entries
     * will keep themselves in sync, however once the entry is done
     * the values aren't available anymore, even if the state
     * still specifies a blob url because it hasn't been changed
     *
     * Submitting will still work just fine, because the src still
     * points to a file
     */
    private ownedObjectURLPool;
    constructor(props: IPropertyEntryHandlerProps<PropertyDefinitionSupportedFileType, IPropertyEntryFileRendererProps>);
    shouldComponentUpdate(nextProps: IPropertyEntryHandlerProps<PropertyDefinitionSupportedFileType, IPropertyEntryFileRendererProps>, nextState: IPropertyEntryFileState): boolean;
    componentWillUnmount(): void;
    /**
     * Provides the current value, either the actual value
     * or the rejected value
     * @returns a PropertyDefinitionSupportedFileType
     */
    private getCurrentValue;
    openFile(): void;
    onSetFile(file: File): void;
    onRemoveFile(): void;
    render(): JSX.Element;
}
export {};
