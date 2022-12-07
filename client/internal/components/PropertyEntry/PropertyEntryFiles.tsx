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
import { PropertyDefinitionSupportedFilesType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import prettyBytes from "pretty-bytes";
import { localeReplacer, mimeTypeToExtension, capitalize, checkFileInAccepts, processAccepts, fileURLAbsoluter } from "../../../../util";
import { imageSrcSetRetriever, imageSizeRetriever, IImageSizes } from "../../../components/util";
import { deepRendererArgsComparer } from "../general-fn";
import PropertyDefinition from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";

interface IOnSetDataInfo {
  extraMetadata?: string,
  accept?: string,
  expectImage?: boolean,
};

interface PropertyDefinitionSupportedFileTypeWithInfo extends PropertyDefinitionSupportedFileType {
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
   * Allows to update and set the extra metadata that is contained within the file
   */
  updateExtraMetadata: (extraMetadata: string) => void;
  /**
   * A function to clear the file
   */
  removeFile: () => void;
  /**
   * A function to open the current file
   */
  openFile: () => void;
}

/**
 * This is the entry file renderer props that every renderer for a files type will recieve.
 * please do not use onChange with the file renderer, as it's odd, use onSetFile instead
 * 
 * You might want to check text-specs.md for consistency on displaying files, but it is not
 * required to display as text-specs.md specifies
 */
export interface IPropertyEntryFilesRendererProps extends IPropertyEntryRendererProps<PropertyDefinitionSupportedFilesType> {
  /**
   * The accept string, use it in your input type
   */
  accept: string;
  /**
   * The max file size individually
   */
  maxFileSize: number;
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
   * The values with information
   */
  currentValueWithInfo: PropertyDefinitionSupportedFileTypeWithInfo[];
  /**
   * Once you have got hold of a file use this function and pass it so
   * properties can be calculated, do not use onChange, use this function
   * instead
   * 
   * If the property is image uploader type, or if the file is on itself
   * an image it will ensure to give it metadata
   */
  onPushFile: (file: File, info?: IOnSetDataInfo) => void;
  onPushFiles: (file: File[], info?: IOnSetDataInfo) => void;
}

/**
 * The property entry files contains an state for the rejected files
 * if that happens to occur
 */
interface IPropertyEntryFilesState {
  /**
   * The rejected file value
   */
  rejectedValues: Array<{
    value: PropertyDefinitionSupportedFileType;
    reason: string;
    afterFileId: string;
  }>;
  /**
   * Whether to show the user set errors
   */
  showUserSetErrors: boolean;
}

/**
 * This is the property entry file class
 */
export default class PropertyEntryFile
  extends React.Component<
  IPropertyEntryHandlerProps<PropertyDefinitionSupportedFilesType, IPropertyEntryFilesRendererProps>,
  IPropertyEntryFilesState
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
  private ownedObjectURLPool: { [key: string]: string };

  constructor(props: IPropertyEntryHandlerProps<PropertyDefinitionSupportedFilesType, IPropertyEntryFilesRendererProps>) {
    super(props);

    // the pool is set
    this.ownedObjectURLPool = {};

    this.state = {
      rejectedValues: [],
      showUserSetErrors: false,
    };

    // the functions are binded
    this.onPushFile = this.onPushFile.bind(this);
    this.onPushFileInternal = this.onPushFileInternal.bind(this);
    this.onPushFiles = this.onPushFiles.bind(this);
    this.onRemoveFileAt = this.onRemoveFileAt.bind(this);
    this.onRemoveRejectFileAt = this.onRemoveRejectFileAt.bind(this);
    this.openFile = this.openFile.bind(this);
    this.enableUserSetErrors = this.enableUserSetErrors.bind(this);
    this.onUpdateExtraMetadataAt = this.onUpdateExtraMetadataAt.bind(this);
    this.onUpdateRejectExtraMetadataAt = this.onUpdateRejectExtraMetadataAt.bind(this);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<PropertyDefinitionSupportedFilesType, IPropertyEntryFilesRendererProps>,
    nextState: IPropertyEntryFilesState,
  ) {
    // This is optimized to only update for the thing it uses
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      !equals(this.props.state, nextProps.state, { strict: true }) ||
      !!this.props.poked !== !!nextProps.poked ||
      nextProps.forId !== this.props.forId ||
      nextProps.forVersion !== this.props.forVersion ||
      !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
      this.props.altDescription !== nextProps.altDescription ||
      this.props.altPlaceholder !== nextProps.altPlaceholder ||
      this.props.altLabel !== nextProps.altLabel ||
      this.props.hideLabel !== nextProps.hideLabel ||
      !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
      nextProps.language !== this.props.language ||
      nextProps.languageOverride !== this.props.languageOverride ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.renderer !== this.props.renderer ||
      !equals(this.state, nextState, { strict: true }) ||
      !deepRendererArgsComparer(this.props.rendererArgs, nextProps.rendererArgs);
  }

  public componentWillUnmount() {
    // now revoking happens at base level once the items are cleaned or released
    Object.keys(this.ownedObjectURLPool).forEach((id: string) => {
      URL.revokeObjectURL(this.ownedObjectURLPool[id]);
    });
  }

  private getIdOfLastValue() {
    const currentValue: PropertyDefinitionSupportedFilesType = (
      this.props.state.value as PropertyDefinitionSupportedFilesType || []
    );

    if (!currentValue.length) {
      return null;
    }

    return currentValue[currentValue.length - 1].id;
  }

  /**
   * Provides the current value, either the actual value
   * or the rejected value
   * @returns a PropertyDefinitionSupportedFileType
   */
  private getCurrentValue() {
    const currentValue: PropertyDefinitionSupportedFilesType = (
      this.props.state.value as PropertyDefinitionSupportedFilesType || []
    ).map((v) => {
      if (v.url.indexOf("blob:") !== 0) {
        if (this.ownedObjectURLPool[v.id]) {
          return {
            ...v,
            url: this.ownedObjectURLPool[v.id],
          };
        } else {
          const domain = process.env.NODE_ENV === "production" ? this.props.config.productionHostname : this.props.config.developmentHostname;
          return fileURLAbsoluter(
            domain,
            this.props.config.containersHostnamePrefixes,
            v,
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

      return v;
    });

    return currentValue;
  }

  private getValueWithInfoFromSpecific(
    v: PropertyDefinitionSupportedFileType,
    data: {
      givenIndex: number,
      isReject?: boolean,
      rejectedReason?: string,
    }
  ): PropertyDefinitionSupportedFileTypeWithInfo {
    const isSupportedImage = FILE_SUPPORTED_IMAGE_TYPES.includes(v.type);
    const imageSizes = isSupportedImage ? imageSizeRetriever(v) : null;
    const imageSrcSet = isSupportedImage ? imageSrcSetRetriever(v, this.props.property, imageSizes) : null;
    const prettySize = prettyBytes(v.size);
    const extension = mimeTypeToExtension(v.type);
    const extraMetadata: string = (v.metadata && v.metadata.split(";")[3]) || null;

    const vWithInfo: PropertyDefinitionSupportedFileTypeWithInfo = {
      ...v,
      isSupportedImage,
      extension,
      extraMetadata,
      imageSizes,
      imageSrcSet,
      openFile: this.openFile.bind(this, v),
      prettySize,
      rejected: !!data.isReject,
      rejectedReason: !data.isReject ? null : data.rejectedReason,
      removeFile: data.isReject ?
        this.onRemoveRejectFileAt.bind(this, data.givenIndex) :
        this.onRemoveFileAt.bind(this, data.givenIndex),
      updateExtraMetadata: data.isReject ?
        this.onUpdateRejectExtraMetadataAt.bind(this, data.givenIndex) :
        this.onUpdateExtraMetadataAt.bind(this, data.givenIndex),
    }

    return vWithInfo;
  }

  private getCurrentValueWithInfo() {
    const baseElements = this.getCurrentValue().map((v, index) => {
      return this.getValueWithInfoFromSpecific(v, {
        givenIndex: index,
      });
    });

    // now we need to add the rejects to that base so that they
    // are displayed even when they are not in our field
    this.state.rejectedValues.forEach((reject, rejectIndex) => {
      // here we go first we need to see after which index
      // they are supposed to be set
      let afterIndex: number = -1;
      // if there's none this means that the reject goes at first so stays at -1
      if (reject.afterFileId !== null) {
        // otherwise we see where
        afterIndex = baseElements.findIndex((v) => v.id === reject.afterFileId);
      }

      // now we need to see where it is going to be placed, after all the other
      // possible rejects
      do {
        afterIndex++;
      } while (baseElements[afterIndex] && baseElements[afterIndex].rejected);

      // and now we build the rejected reason
      let rejectedReason = this.props.i18n[this.props.language][reject.reason];
      if (
        reject.reason === "image_uploader_file_too_big" ||
        reject.reason === "file_uploader_file_too_big"
      ) {
        const prettySize = prettyBytes(MAX_FILE_SIZE);
        rejectedReason = localeReplacer(rejectedReason, prettySize);
      }

      // now we can push the element in place
      baseElements.splice(afterIndex, 0, this.getValueWithInfoFromSpecific(reject.value, {
        givenIndex: rejectIndex,
        isReject: true,
        rejectedReason,
      }));
    });

    // and return it
    return baseElements;
  }

  public openFile(v: PropertyDefinitionSupportedFileType) {
    window.open(v.url, v.name);
  }

  public onUpdateExtraMetadataAt(index: number, extraMetadata: string) {
    const value = this.getCurrentValue();
    const currentValue = value[index];
    if (!currentValue) {
      return;
    }

    const updatedValue = {
      ...currentValue,
    };

    if (!updatedValue.metadata) {
      updatedValue.metadata = ";;" + extraMetadata;
    } else {
      const metadataCreated = updatedValue.metadata.split(";");
      const wxh = metadataCreated[0];
      const sizes = metadataCreated[1];
      updatedValue.metadata = wxh + ";" + sizes + ";" + extraMetadata;
    }

    value[index] = updatedValue;

    this.props.onChange(value, null);
  }

  public onUpdateRejectExtraMetadataAt() {
    // DO NOTHING
  }
  public async onPushFiles(files: File[], info: IOnSetDataInfo = {}) {
    const arrAwaited = (await Promise.all(files.map((f) => {
      return this.onPushFileInternal(f, info, true);
    }))).filter((v) => !!v);

    // now we can commit all at once
    // once they have loaded all avoding triggering
    // an entry driven change per file
    let newFilesValue = this.getCurrentValue();
    newFilesValue = newFilesValue.concat(arrAwaited);

    this.props.onChange(
      newFilesValue,
      null,
    );
  }
  public onPushFile(file: File, info: IOnSetDataInfo = {}) {
    return this.onPushFileInternal(file, info);
  }
  public checkFileInAcceptsAndCommit(
    isExpectingImages: boolean,
    acceptOverride: string,
    value: PropertyDefinitionSupportedFileType,
    avoidChanges: boolean,
  ) {
    const accept = processAccepts(
      acceptOverride || this.props.property.getSpecialProperty("accept") as string,
      isExpectingImages,
    );

    // check if it's images we are accepting
    if (!checkFileInAccepts(value.type, accept)) {
      const newRejectedArray = [...this.state.rejectedValues];
      newRejectedArray.push({
        value,
        reason: isExpectingImages ? "image_uploader_invalid_type" : "file_uploader_invalid_type",
        afterFileId: this.getIdOfLastValue(),
      })
      this.setState({
        rejectedValues: newRejectedArray,
      });
      return false;
    } else if (value.size > MAX_FILE_SIZE) {
      const newRejectedArray = [...this.state.rejectedValues];
      newRejectedArray.push({
        value,
        reason: isExpectingImages ? "image_uploader_file_too_big" : "file_uploader_file_too_big",
        afterFileId: this.getIdOfLastValue(),
      })
      this.setState({
        rejectedValues: newRejectedArray,
      });

      return false;
    } else if (!avoidChanges) {
      const newFilesValue = this.getCurrentValue();
      newFilesValue.push(value);

      this.props.onChange(
        newFilesValue,
        null,
      );
    }

    return true;
  }
  public async onPushFileInternal(file: File, info: IOnSetDataInfo = {}, avoidChanges?: boolean): Promise<PropertyDefinitionSupportedFileType> {
    // when a drop is accepted, let's check, if it's a single file
    const id = "FILE" + uuid.v4().replace(/-/g, "");
    const objectURL = URL.createObjectURL(file);
    this.ownedObjectURLPool[id] = objectURL;
    const value: PropertyDefinitionSupportedFileType = PropertyDefinition.createFileForProperty(
      id,
      file.name,
      null,
      file,
    );

    if (info.extraMetadata) {
      value.metadata = ";;" + info.extraMetadata;
    }

    const isExpectingImages = !!this.props.property.getSpecialProperty("imageUploader") || info.expectImage;

    if (isExpectingImages || value.type.startsWith("image")) {
      const promise = new Promise<PropertyDefinitionSupportedFileType>((resolve) => {
        const img = new Image();
        img.onload = () => {
          const dimensions: string = this.props.property.getSpecialProperty("dimensions") || "";
          const dimensionNames = dimensions.split(";").map((d) => d.trim().split(" ")[0]);
          value.metadata = img.width + "x" + img.height + ";" + dimensionNames.join(",");

          if (info.extraMetadata) {
            value.metadata += ";" + info.extraMetadata;
          }

          const valuePassed = this.checkFileInAcceptsAndCommit(
            isExpectingImages,
            info.accept,
            value,
            avoidChanges,
          );

          resolve(valuePassed ? value : null);
        }
        img.onerror = () => {
          const newRejectedArray = [...this.state.rejectedValues];
          newRejectedArray.push({
            value,
            reason: "image_uploader_invalid_type",
            afterFileId: this.getIdOfLastValue(),
          })
          this.setState({
            rejectedValues: newRejectedArray,
          });

          resolve(null);
        }
        img.src = value.url;
      });
      return await promise;
    } else if (value.type.startsWith("audio")) {
      const promise = new Promise<PropertyDefinitionSupportedFileType>((resolve) => {
        const audio = new Audio();
        audio.onloadeddata = () => {
          // https://bugs.chromium.org/p/chromium/issues/detail?id=642012
          if (audio.duration === Infinity) {
            audio.ontimeupdate = () => {
              value.metadata = audio.duration.toString();
              if (info.extraMetadata) {
                value.metadata += ";;" + info.extraMetadata;
              }

              const valuePassed = this.checkFileInAcceptsAndCommit(
                isExpectingImages,
                info.accept,
                value,
                avoidChanges,
              );

              resolve(valuePassed ? value : null);
            }
            audio.currentTime = Number.MAX_SAFE_INTEGER;
          } else {
            value.metadata = audio.duration.toString();
            if (info.extraMetadata) {
              value.metadata += ";;" + info.extraMetadata;
            }

            const valuePassed = this.checkFileInAcceptsAndCommit(
              isExpectingImages,
              info.accept,
              value,
              avoidChanges,
            );

            resolve(valuePassed ? value : null);
          }
        }
        audio.onerror = () => {
          const valuePassed = this.checkFileInAcceptsAndCommit(
            isExpectingImages,
            info.accept,
            value,
            avoidChanges,
          );

          resolve(valuePassed ? value : null);
        }
        audio.src = value.url;
      });
      return await promise;
    } else {
      const valuePassed = this.checkFileInAcceptsAndCommit(
        isExpectingImages,
        info.accept,
        value,
        avoidChanges,
      );

      return valuePassed ? value : null;
    }
  }
  public onRemoveFileAt(index: number) {
    const newFilesValue = this.getCurrentValue();
    newFilesValue.splice(index, 1);
    if (newFilesValue.length === 0) {
      this.props.onChange(
        null,
        null,
      );
    } else {
      this.props.onChange(
        newFilesValue,
        null,
      );
    }
  }
  public onRemoveRejectFileAt(index: number) {
    const newFilesValue = [...this.state.rejectedValues];
    newFilesValue.splice(index, 1);
    this.setState({
      rejectedValues: newFilesValue,
    });
  }
  public enableUserSetErrors() {
    this.setState({
      showUserSetErrors: true,
    });
  }
  public render() {
    const currentValueWithInfo = this.getCurrentValueWithInfo();

    // getting the basic data
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const i18nLabel = this.props.hideLabel ? null : (typeof this.props.altLabel !== "undefined" ? this.props.altLabel : (i18nData && i18nData.label));
    const i18nDescription = this.props.hideDescription ? null : (typeof this.props.altDescription !== "undefined" ? this.props.altDescription : (i18nData && i18nData.description));
    const i18nPlaceholder = this.props.altPlaceholder || (i18nData && i18nData.placeholder);

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

    const isExpectingImages = !!this.props.property.getSpecialProperty("imageUploader");
    const accept = processAccepts(
      this.props.property.getSpecialProperty("accept") as string,
      isExpectingImages
    );

    // the placeholder when active
    let genericActivePlaceholder = this.props.i18n[this.props.language].file_uploader_placeholder_active;
    if (isExpectingImages) {
      genericActivePlaceholder = this.props.i18n[this.props.language].image_uploader_placeholder_active;
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

    const canRestore = !this.props.state.value ? (
      this.props.state.value !== this.props.state.stateAppliedValue
    ) : !(this.props.state.value as PropertyDefinitionSupportedFilesType).every((v, index) => {
      if (!this.props.state.stateAppliedValue) {
        return false;
      }
      const stateValueCounterpart = this.props.state.stateAppliedValue[index];
      if (!stateValueCounterpart) {
        return false;
      }
      return (v.id === stateValueCounterpart.id);
    });

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntryFilesRendererProps = {
      propertyId: this.props.property.getId(),
      uniqueId: this.props.property.getUniqueIdentifier(this.props.forId, this.props.forVersion),

      maxFileSize: MAX_FILE_SIZE,

      args: this.props.rendererArgs || {},
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      language: this.props.language,
      languageOverride: this.props.languageOverride,

      currentAppliedValue: this.props.state.stateAppliedValue as PropertyDefinitionSupportedFilesType,
      currentValue: this.props.state.value as PropertyDefinitionSupportedFilesType,
      currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: i18nInvalidReason,
      currentInternalValue: this.props.state.internalValue,

      disabled:
        typeof this.props.disabled !== "undefined" && this.props.disabled !== null ?
          this.props.disabled :
          this.props.state.enforced,
      autoFocus: this.props.autoFocus || false,
      onChange: this.props.onChange,
      onRestore: this.props.onRestore,
      canRestore,

      onPushFile: this.onPushFile,
      onPushFiles: this.onPushFiles,

      accept,
      isExpectingImages,
      genericActivePlaceholder,
      genericDeleteLabel,
      genericSelectLabel,

      currentValueWithInfo,

      enableUserSetErrors: this.enableUserSetErrors,
    };

    return <RendererElement {...rendererArgs} />;
  }
}