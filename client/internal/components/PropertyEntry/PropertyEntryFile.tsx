/**
 * Contains the entry file handler
 * @module
 */

import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import equals from "deep-equal";
import { MAX_FILE_SIZE, FILE_SUPPORTED_IMAGE_TYPES } from "../../../../constants";
import uuid from "uuid";
import { PropertyDefinitionSupportedFileType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
import prettyBytes from "pretty-bytes";
import { localeReplacer, mimeTypeToExtension, capitalize, checkFileInAccepts, processAccepts, fileURLAbsoluter } from "../../../../util";
import { imageSrcSetRetriever, imageSizeRetriever, IImageSizes } from "../../../components/util";

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
   * The extra metadata that is provided
   */
  extraMetadata: string;
  /**
   * Once you have got hold of a file use this function and pass it so
   * properties can be calculated, do not use onChange, use this function
   * instead
   * 
   * If the property is image uploader type, or if the file is on itself
   * an image it will ensure to give it metadata
   */
  onSetFile: (file: File, extraMetadata?: string) => void;
  /**
   * Allows to update and set the extra metadata that is contained within the file
   */
  onUpdateExtraMetadata: (extraMetadata: string) => void;
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
  showUserSetErrors: boolean;
}

/**
 * This is the property entry file class
 */
export default class PropertyEntryFile
  extends React.Component<
  IPropertyEntryHandlerProps<PropertyDefinitionSupportedFileType, IPropertyEntryFileRendererProps>,
  IPropertyEntryFileState
  > {

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
  private ownedObjectURLPool: {[key: string]: string};

  constructor(props: IPropertyEntryHandlerProps<PropertyDefinitionSupportedFileType, IPropertyEntryFileRendererProps>) {
    super(props);

    // the pool is set
    this.ownedObjectURLPool = {};

    this.state = {
      rejectedValue: null,
      rejectedReason: null,
      showUserSetErrors: false,
    };

    // the functions are binded
    this.onSetFile = this.onSetFile.bind(this);
    this.onRemoveFile = this.onRemoveFile.bind(this);
    this.openFile = this.openFile.bind(this);
    this.enableUserSetErrors = this.enableUserSetErrors.bind(this);
    this.onUpdateExtraMetadata = this.onUpdateExtraMetadata.bind(this);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<PropertyDefinitionSupportedFileType, IPropertyEntryFileRendererProps>,
    nextState: IPropertyEntryFileState,
  ) {
    // This is optimized to only update for the thing it uses
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      !equals(this.props.state, nextProps.state) ||
      !!this.props.poked !== !!nextProps.poked ||
      nextProps.forId !== this.props.forId ||
      nextProps.forVersion !== this.props.forVersion ||
      !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
      this.props.altDescription !== nextProps.altDescription ||
      this.props.altPlaceholder !== nextProps.altPlaceholder ||
      this.props.altLabel !== nextProps.altLabel ||
      !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
      nextProps.language !== this.props.language ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.icon !== this.props.icon ||
      nextProps.renderer !== this.props.renderer ||
      !equals(this.state, nextState) ||
      !equals(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public componentWillUnmount() {
    // revoke urls on unmount
    Object.keys(this.ownedObjectURLPool).forEach((id: string) => {
      URL.revokeObjectURL(this.ownedObjectURLPool[id]);
    });
  }

  /**
   * Provides the current value, either the actual value
   * or the rejected value
   * @returns a PropertyDefinitionSupportedFileType
   */
  private getCurrentValue() {
    let currentValue = this.state.rejectedValue ||
      this.props.state.value as PropertyDefinitionSupportedFileType;

    if (
      currentValue &&
      currentValue.url.indexOf("blob:") !== 0
    ) {
      if (this.ownedObjectURLPool[currentValue.id]) {
        currentValue = {
          ...currentValue,
          url: this.ownedObjectURLPool[currentValue.id],
        };
      } else {
        const domain = process.env.NODE_ENV === "production" ? this.props.config.productionHostname : this.props.config.developmentHostname;
        currentValue = fileURLAbsoluter(
          domain,
          this.props.config.containersHostnamePrefixes,
          currentValue,
          this.props.itemDefinition,
          this.props.forId,
          this.props.forVersion,
          this.props.containerId,
          this.props.include,
          this.props.property,
          this.props.cacheFiles,
        );
      }
    }

    return currentValue;
  }

  public openFile() {
    const value = this.getCurrentValue();
    window.open(value.url, value.name);
  }

  public onUpdateExtraMetadata(extraMetadata: string) {
    const currentValue = this.props.state.value as PropertyDefinitionSupportedFileType;
    if (!currentValue || !currentValue.metadata) {
      return;
    }

    const updatedValue = {
      ...currentValue,
    };

    const metadataCreated = updatedValue.metadata.split(";");
    const wxh = metadataCreated[0];
    const sizes = metadataCreated[1];
    updatedValue.metadata = wxh + ";" + sizes + ";" + extraMetadata;

    this.props.onChange(updatedValue, null);
  }

  public onSetFile(file: File, extraMetadata?: string) {
    // when a drop is accepted, let's check, if it's a single file
    const id = "FILE" + uuid.v4().replace(/-/g, "");
    const objectURL = URL.createObjectURL(file);
    this.ownedObjectURLPool[id] = objectURL;
    const value: PropertyDefinitionSupportedFileType = {
      name: file.name,
      type: file.type,
      id,
      url: objectURL,
      size: file.size,
      src: file,
      metadata: null,
    };

    const isExpectingImages = !!this.props.property.getSpecialProperty("imageUploader");
    const accept = processAccepts(
      this.props.property.getSpecialProperty("accept") as string,
      isExpectingImages,
    );

    // check if it's images we are accepting
    if (!checkFileInAccepts(value.type, accept)) {
      this.setState({
        rejectedValue: value,
        rejectedReason: this.props.i18n[this.props.language]
          [(isExpectingImages ? "image_uploader_invalid_type" : "file_uploader_invalid_type")],
      });
      return;
    } else if (value.size > MAX_FILE_SIZE) {
      const prettySize = prettyBytes(MAX_FILE_SIZE);
      this.setState({
        rejectedValue: value,
        rejectedReason: localeReplacer(
          this.props.i18n[this.props.language]
            [(isExpectingImages ? "image_uploader_file_too_big" : "file_uploader_file_too_big")],
          prettySize,
        ),
      });
      return;
    } else {
      this.setState({
        rejectedValue: null,
        rejectedReason: null,
      })
    }

    if (isExpectingImages || value.type.startsWith("image")) {
      const img = new Image();
      img.onload = () => {
        const dimensions: string = this.props.property.getSpecialProperty("dimensions") || "";
        const dimensionNames = dimensions.split(";").map((d) => d.trim().split(" ")[0]);
        value.metadata = img.width + "x" + img.height + ";" + dimensionNames.join(",");

        if (extraMetadata) {
          value.metadata += ";" + extraMetadata;
        }

        this.props.onChange(
          value,
          null,
        );
      }
      img.onerror = () => {
        this.setState({
          rejectedValue: value,
          rejectedReason: this.props.i18n[this.props.language]["image_uploader_invalid_type"],
        });
      }
      img.src = value.url;
    } else {
      this.props.onChange(
        value,
        null,
      );
    }
  }
  public onRemoveFile() {
    this.props.onChange(
      null,
      null,
    );
  }
  public enableUserSetErrors() {
    this.setState({
      showUserSetErrors: true,
    });
  }
  public render() {
    // getting the basic data
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const i18nLabel = this.props.altLabel || (i18nData && i18nData.label);
    const i18nDescription = this.props.hideDescription ? null : (this.props.altDescription || (i18nData && i18nData.description));
    const i18nPlaceholder = this.props.altPlaceholder || (i18nData && i18nData.placeholder);
    const isSupportedImage = !this.props.state.value ?
      false :
      FILE_SUPPORTED_IMAGE_TYPES.includes((this.props.state.value as PropertyDefinitionSupportedFileType).type);

    // get the invalid reason if any
    const invalidReason = this.props.state.invalidReason;
    const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
      (this.props.poked || (this.state.showUserSetErrors && this.props.state.userSet)) && invalidReason;
    let i18nInvalidReason = null;
    if (
      isCurrentlyShownAsInvalid && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
      i18nInvalidReason = i18nData.error[invalidReason];
    }

    const currentValue = this.getCurrentValue();
    const imageSizes = isSupportedImage ? imageSizeRetriever(currentValue, this.props.property) : null;
    const imageSrcSet = isSupportedImage ? imageSrcSetRetriever(currentValue, this.props.property, imageSizes) : null;

    const isExpectingImages = !!this.props.property.getSpecialProperty("imageUploader");
    const accept = processAccepts(
      this.props.property.getSpecialProperty("accept") as string,
      isExpectingImages
    );

    // the placeholder when active
    let genericActivePlaceholder = this.props.i18n[this.props.language].file_uploader_placeholder_active_single;
    if (isExpectingImages) {
      genericActivePlaceholder = this.props.i18n[this.props.language].image_uploader_placeholder_active_single;
    }
    genericActivePlaceholder = capitalize(genericActivePlaceholder);

    let genericDeleteLabel = this.props.i18n[this.props.language].file_uploader_delete_file;
    if (isExpectingImages) {
      genericDeleteLabel = this.props.i18n[this.props.language].image_uploader_delete_file;
    }
    genericDeleteLabel = capitalize(genericDeleteLabel);

    let genericSelectLabel = this.props.i18n[this.props.language].file_uploader_select_file;
    if (isExpectingImages) {
      genericSelectLabel = this.props.i18n[this.props.language].image_uploader_select_file;
    }
    genericSelectLabel = capitalize(genericSelectLabel);

    const prettySize = currentValue && prettyBytes(currentValue.size);
    const extension = currentValue && mimeTypeToExtension(currentValue.type);

    const stateValue = (this.props.state.value as PropertyDefinitionSupportedFileType);
    const extraMetadata: string = (stateValue && stateValue.metadata && stateValue.metadata.split(";")[3]) || null;

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntryFileRendererProps = {
      propertyId: this.props.property.getId(),

      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      icon: this.props.icon,

      currentAppliedValue: this.props.state.stateAppliedValue as PropertyDefinitionSupportedFileType,
      currentValue,
      currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: i18nInvalidReason,
      currentInternalValue: this.props.state.internalValue,

      disabled: this.props.state.enforced,
      autoFocus: this.props.autoFocus || false,
      onChange: this.props.onChange,
      onRestore: this.props.onRestore,
      canRestore: !equals(this.props.state.value, this.props.state.stateAppliedValue),

      onSetFile: this.onSetFile,
      onRemoveFile: this.onRemoveFile,
      openFile: this.openFile,
      onUpdateExtraMetadata: this.onUpdateExtraMetadata,

      accept,
      isExpectingImages,
      genericActivePlaceholder,
      genericDeleteLabel,
      genericSelectLabel,
      extraMetadata,

      rejected: !!this.state.rejectedReason,
      rejectedReason: this.state.rejectedReason,

      isSupportedImage,
      imageSrcSet,
      imageSizes,
      prettySize,
      extension,

      enableUserSetErrors: this.enableUserSetErrors,
    };

    return <RendererElement {...rendererArgs} />;
  }
}
