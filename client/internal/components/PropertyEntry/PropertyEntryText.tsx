/**
 * The gargantuan entry text handler
 * @packageDocumentation
 */

import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import equals from "deep-equal";
import uuid from "uuid";
import { DOMPurify, checkFileInAccepts, processAccepts, localeReplacer } from "../../../../util";
import { IPropertyDefinitionSupportedSingleFilesType, PropertyDefinitionSupportedFilesType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import PropertyDefinition from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { FILE_SUPPORTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../../../../constants";
import prettyBytes from "pretty-bytes";
import { sanitize } from "../../../internal/text";

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
  onInsertFile: (file: File, isExpectingImage?: boolean) =>
    Promise<IInsertedFileInformationType>;
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
export default class PropertyEntryText
  extends React.Component<IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>, IPropertyEntryTextState> {

  /**
   * We hold and cache our media property
   */
  private cachedMediaProperty: PropertyDefinition;
  /**
   * We hold and cache our accepts for the media property
   */
  private cachedMediaPropertyAcceptsFiles: string;
  /**
   * We hold and cache our accpets for the images in the media property
   */
  private cachedMediaPropertyAcceptsImages: string;

  /**
   * As long as the property entry text is mounted it will keep track of all the files
   * that have ever been in it, in order to be able to restore
   * them during undo processes, note however, that this means that having
   * two equal property entry for text at the same time will revoke
   * all the blob urls during dismount and they will not share the same
   * history, this might cause issues due to this cache
   * so avoid having two entry at the same time
   */
  private internalFileCache: {
    [id: string]: IPropertyDefinitionSupportedSingleFilesType;
  }

  constructor(props: IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>) {
    super(props);

    this.state = {
      lastLoadedFileError: null,
    }

    this.internalFileCache = {};

    this.onInsertFile = this.onInsertFile.bind(this);
    this.onRestoreHijacked = this.onRestoreHijacked.bind(this);
    this.onChangeHijacked = this.onChangeHijacked.bind(this);
    this.dismissLastLoadedFileError = this.dismissLastLoadedFileError.bind(this);

    this.cacheMediaPropertyInProps(props);
  }

  public dismissLastLoadedFileError() {
    this.setState({
      lastLoadedFileError: null,
    });
  }

  public componentWillUnmount() {
    Object.keys(this.internalFileCache).forEach((k) => {
      if (this.internalFileCache[k].url.startsWith("blob:")) {
        URL.revokeObjectURL(this.internalFileCache[k].url);
      }
    });
  }

  /**
   * Called during initial setup
   * @param props the props we are using
   */
  public cacheMediaPropertyInProps(props: IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>) {
    // we get the media property name
    const mediaPropertyName = props.property.getSpecialProperty("mediaProperty") as string;
    // so if we have such as a media property
    if (mediaPropertyName) {
      // we are going to find and get it
      this.cachedMediaProperty = props.itemDefinition.getPropertyDefinitionFor(mediaPropertyName, true);

      // process the accepts
      this.cachedMediaPropertyAcceptsFiles = processAccepts(
        this.cachedMediaProperty.getSpecialProperty("accept") as string,
        !!this.cachedMediaProperty.getSpecialProperty("imageUploader"),
      );

      // and then see what images we support from these accepts
      this.cachedMediaPropertyAcceptsImages = this.cachedMediaPropertyAcceptsFiles === "*" ?
        FILE_SUPPORTED_IMAGE_TYPES.join(",") :
        this.cachedMediaPropertyAcceptsFiles.split(",").filter((accepting) => {
          return accepting.startsWith("image");
        }).join(",");
    }
  }

  /**
   * Ran during mount of updates, caches the files that are in the media property
   */
  public cacheCurrentFiles() {
    // so we get the media property
    const relatedPropertyName = this.props.property.getSpecialProperty("mediaProperty") as string;
    // if we have one
    if (relatedPropertyName) {
      // we will get such media property
      const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);
      // and the current value for it
      const currentValue =
        relatedProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

      // if we have one, we will loop and store such files
      if (currentValue) {
        currentValue.forEach((v) => {
          this.internalFileCache[v.id] = v;
        });
      }
    }
  }

  public componentDidMount() {
    // so if we are in rich text
    if (this.props.property.isRichText()) {
      // we cache the current files, if there are any and if
      // we even support media property
      this.cacheCurrentFiles();
    }
  }

  public componentDidUpdate(prevProps: IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>) {
    const relatedPropertyName = this.props.property.getSpecialProperty("mediaProperty") as string;
    // we assume that our related property has update if a value has been applied in which case we might want to load
    // such values in the cache
    if (
      relatedPropertyName &&
      prevProps.state.stateAppliedValue !== this.props.state.stateAppliedValue &&
      this.props.property.isRichText()
    ) {
      this.cacheCurrentFiles();
    }
  }

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
  public onChangeHijacked(value: string, internalValue: any) {
    // so first we try to read the html content in this fast and dirty way
    const dataSrcIdRegex = /data\-src\-id\=\"([A-Za-z0-9]+)\"/g;
    // this array for the ids we find
    const idsGathered: string[] = [];
    // and now we build a match loop
    let match: RegExpExecArray;
    do {
      match = dataSrcIdRegex.exec(value);
      if (match) {
        const id = match[1];
        idsGathered.push(id);
        // we call the sync function to restore the file
        // into the current value of the property if necessary
        this.onRestoreLostFile(id);
      }
    } while (match);

    // now we need to find the ones that have been deleted and are currently not loaded
    const relatedPropertyName = this.props.property.getSpecialProperty("mediaProperty") as string;
    const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);
    const currentValue =
      relatedProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

    // if we got a value
    if (currentValue) {
      // we loop within it and see
      currentValue.forEach((v) => {
        // if it's not in the gathered list
        if (!idsGathered.includes(v.id)) {
          this.onRemoveFile(v.id);
        }
      });
    }

    this.props.onChange(value, internalValue);
  }

  /**
   * The restore but hijacked, also only if there's
   * a media property; basically will do the standard
   * restoration, but also restore its related media property
   */
  public onRestoreHijacked() {
    const relatedPropertyName = this.props.property.getSpecialProperty("mediaProperty") as string;
    const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);

    relatedProperty.restoreValueFor(this.props.forId || null, this.props.forVersion || null);
    // don't need to trigger listeners as this will do it by itself
    this.props.onRestore();
  }

  /**
   * Function that triggers when a file that had been removed, needs to be restored
   * such as done by an undo ctrl+z event
   * @param fileId the file to be restored
   */
  public onRestoreLostFile(fileId: string) {
    const relatedPropertyName = this.props.property.getSpecialProperty("mediaProperty") as string;
    const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);
    const currentValue =
      relatedProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

    // it's almost certain that the file must be in this internal cache to restore files
    if ((!currentValue || !currentValue.find(v => v.id === fileId)) && this.internalFileCache[fileId]) {
      const newValue: PropertyDefinitionSupportedFilesType = currentValue !== null ?
        [...currentValue] : [];

      newValue.push(this.internalFileCache[fileId]);

      relatedProperty.setCurrentValue(this.props.forId || null, this.props.forVersion || null, newValue, null);
      this.props.itemDefinition.triggerListeners("change", this.props.forId || null, this.props.forVersion || null);
    }
  }

  /**
   * Function that triggers once a file has been requested to be removed
   * it remains however in the cache itself
   * @param fileId the file id
   */
  public onRemoveFile(fileId: string) {
    const relatedPropertyName = this.props.property.getSpecialProperty("mediaProperty") as string;
    const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);
    const currentValue =
      relatedProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

    // delete files but we don't get rid off them from the cache
    if (currentValue && currentValue.find(v => v.id === fileId)) {
      const newValue: PropertyDefinitionSupportedFilesType = currentValue.filter((f) => f.id !== fileId);

      relatedProperty.setCurrentValue(this.props.forId || null, this.props.forVersion || null, newValue.length === 0 ? null : newValue, null);
      this.props.itemDefinition.triggerListeners("change", this.props.forId || null, this.props.forVersion || null);
    }
  }

  /**
   * Inserts a file in the media property
   * @param file the file to insert
   * @param isExpectingImage whether the errors and check given will be for image types
   */
  public async onInsertFile(
    file: File,
    isExpectingImage?: boolean,
  ): Promise<IInsertedFileInformationType> {
    // So now if we are expecting image we check against images
    if (isExpectingImage && !checkFileInAccepts(file.type, this.cachedMediaPropertyAcceptsImages)) {
      this.setState({
        lastLoadedFileError: "image_uploader_invalid_type",
      });
      return null;

    // otherwise in the generic files
    } else if (!isExpectingImage && !checkFileInAccepts(file.type, this.cachedMediaPropertyAcceptsFiles)) {
      this.setState({
        lastLoadedFileError: "file_uploader_invalid_type",
      });
      return null;
    }

    // and for the file size
    if (file.size > MAX_FILE_SIZE) {
      this.setState({
        lastLoadedFileError: isExpectingImage ? "image_uploader_file_too_big" : "file_uploader_file_too_big",
      });
      return null;
    }

    // now we need a temporary url
    const tempURL = URL.createObjectURL(file);
    // our random id for the file
    const id = "FILE" + uuid.v4().replace(/-/g, "");

    // and this is our file, no metadata yet
    const addedFile: IPropertyDefinitionSupportedSingleFilesType = {
      name: file.name,
      type: file.type,
      id,
      url: tempURL,
      size: file.size,
      src: file,
      metadata: null,
    };

    // this is the default final value
    let finalValue: IInsertedFileInformationType = {
      result: addedFile,
      width: null,
      height: null,
      isImage: false,
    };
    
    // however if we are expecting images or the file to add is an image,
    // we need the image metadata
    if (isExpectingImage || addedFile.type.startsWith("image")) {
      // the final value is now a new final value that comes from this logic
      finalValue = await new Promise<IInsertedFileInformationType>(async (resolve) => {
        // so we create an image
        const img = new Image();
        // on load
        img.onload = () => {
          // we build the metadata
          const dimensions: string = this.props.property.getSpecialProperty("dimensions") || "";
          const dimensionNames = dimensions.split(";").map((d) => d.trim().split(" ")[0]);
          addedFile.metadata = img.width + "x" + img.height + ";" + dimensionNames.join(",");

          // and resolve
          resolve({
            result: addedFile,
            width: img.width,
            height: img.height,
            isImage: true,
          });
        }
        img.onerror = () => {
          // on error we set the last loaded error
          this.setState({
            lastLoadedFileError: "image_uploader_invalid_type",
          });
          // revoke the url
          URL.revokeObjectURL(tempURL);
          // and resolve to null
          resolve(null);
        }
        // and this is assigned the url of the image
        img.src = tempURL;
      });

      // if our final value is null
      if (finalValue === null) {
        // it's doomed
        return null;
      }
    }

    // now we get the current value of the media property
    const currentValue =
      this.cachedMediaProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

    // and add the new file
    const newValue: PropertyDefinitionSupportedFilesType = currentValue !== null ?
      [...currentValue] : [];
    newValue.push(addedFile);

    // add this to the cache
    this.internalFileCache[id] = addedFile;

    // and now we can set the value for the cached media property
    this.cachedMediaProperty.setCurrentValue(this.props.forId || null, this.props.forVersion || null, newValue, null);
    this.props.itemDefinition.triggerListeners("change", this.props.forId || null, this.props.forVersion || null);

    // the chicken is done
    return finalValue;
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>,
  ) {
    if (nextProps.property !== this.props.property) {
      this.cacheMediaPropertyInProps(nextProps);
    }
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      !equals(this.state, nextProps.state) ||
      !equals(this.props.state, nextProps.state) ||
      !!this.props.poked !== !!nextProps.poked ||
      !!this.props.rtl !== !!nextProps.rtl ||
      this.props.forId !== nextProps.forId ||
      this.props.forVersion !== nextProps.forVersion ||
      !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
      this.props.altDescription !== nextProps.altDescription ||
      this.props.altPlaceholder !== nextProps.altPlaceholder ||
      this.props.altLabel !== nextProps.altLabel ||
      !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
      nextProps.language !== this.props.language ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.icon !== this.props.icon ||
      nextProps.renderer !== this.props.renderer ||
      !equals(this.props.rendererArgs, nextProps.rendererArgs);
  }

  public render() {
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const i18nLabel = this.props.altLabel || (i18nData && i18nData.label);
    const i18nDescription = this.props.hideDescription ? null : (this.props.altDescription || (i18nData && i18nData.description));
    const i18nPlaceholder = this.props.altPlaceholder || (i18nData && i18nData.placeholder);

    // get the invalid reason if any
    const isRichText = this.props.property.isRichText();

    const mediaPropertyId = this.props.property.getSpecialProperty("mediaProperty") as string;
    const supportsMedia = !!mediaPropertyId && isRichText;
    const supportsVideos = isRichText && !!this.props.property.getSpecialProperty("supportsVideos");
    const supportsImages = supportsMedia && !!this.props.property.getSpecialProperty("supportsImages");
    const supportsFiles = supportsMedia && !!this.props.property.getSpecialProperty("supportsFiles");
    const i18nInLanguage = this.props.i18n[this.props.language];

    let currentValue = this.props.state.value as string;
    // we only want to purify values that haven't been manually set by the user, other
    // than that we can trust the value, it'd be a waste
    if (isRichText && currentValue && !this.props.state.stateValueHasBeenManuallySet) { 
      const currentFiles: PropertyDefinitionSupportedFilesType = this.cachedMediaProperty &&
        this.cachedMediaProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

      currentValue = sanitize(
        {
          cacheFiles: this.props.cacheFiles,
          config: this.props.config,
          containerId: this.props.containerId,
          currentFiles,
          forId: this.props.forId,
          forVersion: this.props.forVersion,
          include: this.props.include,
          itemDefinition: this.props.itemDefinition,
          mediaProperty: this.cachedMediaProperty,
          supportsFiles,
          supportsImages,
          supportsVideos,
        },
        currentValue,
      );
    }

    let invalidReason = this.props.state.invalidReason;
    let invalidReasonIsMediaProperty = false;
    if (!invalidReason && supportsMedia) {
      const mediaPropertyState = this.cachedMediaProperty.getStateNoExternalChecking(
        this.props.forId || null, this.props.forVersion || null,
      );
      if (mediaPropertyState.invalidReason) {
        invalidReasonIsMediaProperty = true;
        invalidReason = mediaPropertyState.invalidReason;
      }
    }
    const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
      (this.props.poked || this.props.state.userSet) && invalidReason;
    let i18nInvalidReason = null;
    if (
      !invalidReasonIsMediaProperty && isCurrentlyShownAsInvalid && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
      i18nInvalidReason = i18nData.error[invalidReason];
    } else if (
      invalidReasonIsMediaProperty && isCurrentlyShownAsInvalid && i18nData &&
      i18nData.error && i18nData.error["MEDIA_PROPERTY_" + invalidReason]
    ) {
      i18nInvalidReason = i18nData.error["MEDIA_PROPERTY_" + invalidReason];
    }

    let lastLoadedFileError = this.state.lastLoadedFileError;
    if (lastLoadedFileError === "image_uploader_file_too_big" || lastLoadedFileError === "file_uploader_file_too_big") {
      lastLoadedFileError = localeReplacer(
        i18nInLanguage[lastLoadedFileError],
        prettyBytes(MAX_FILE_SIZE),
      );
    } else if (lastLoadedFileError) {
      lastLoadedFileError = i18nInLanguage[lastLoadedFileError];
    }

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntryTextRendererProps = {
      propertyId: this.props.property.getId(),

      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      icon: this.props.icon,

      currentAppliedValue: this.props.state.stateAppliedValue as string,
      currentValue,
      currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: i18nInvalidReason,
      currentInternalValue: this.props.state.internalValue,
      canRestore: this.props.state.value !== this.props.state.stateAppliedValue,

      disabled: this.props.state.enforced,

      autoFocus: this.props.autoFocus || false,

      i18nFormat: {
        formatBoldLabel: i18nInLanguage.format_bold,
        formatItalicLabel: i18nInLanguage.format_italic,
        formatUnderlineLabel: i18nInLanguage.format_underline,
        formatTitleLabel: i18nInLanguage.format_title,
        formatQuoteLabel: i18nInLanguage.format_quote,
        formatListNumberedLabel: i18nInLanguage.format_list_numbered,
        formatListBulletedLabel: i18nInLanguage.format_list_bulleted,
        formatAddImageLabel: i18nInLanguage.format_add_image,
        formatAddVideoLabel: i18nInLanguage.format_add_video,
        formatAddFileLabel: i18nInLanguage.format_add_file,
      },

      i18nLoadVideo: {
        title: i18nInLanguage.video_loader_title,
        label: i18nInLanguage.video_loader_label,
        placeholder: i18nInLanguage.video_loader_placeholder,
        invalid: i18nInLanguage.video_loader_invalid,
        submit: i18nInLanguage.video_loader_submit,
      },

      i18nGenericError: i18nInLanguage["generic_error"],
      i18nOk: i18nInLanguage["ok"],

      supportsImages,
      supportsFiles,
      supportsVideos,
      mediaPropertyAcceptsFiles: this.cachedMediaPropertyAcceptsFiles,
      mediaPropertyAcceptsImages: this.cachedMediaPropertyAcceptsImages,

      isRichText,

      lastLoadedFileError,
      dismissLastLoadedFileError: this.dismissLastLoadedFileError,

      onChange: supportsMedia ? this.onChangeHijacked : this.props.onChange,
      onRestore: supportsMedia ? this.onRestoreHijacked : this.props.onRestore,

      onInsertFile: this.onInsertFile,
    };

    return <RendererElement {...rendererArgs} />
  }
}
