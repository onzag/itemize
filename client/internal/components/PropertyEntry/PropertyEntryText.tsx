import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import equals from "deep-equal";
import uuid from "uuid";
import { DOMPurify, checkFileInAccepts, processAccepts, localeReplacer } from "../../../../util";
import { IPropertyDefinitionSupportedSingleFilesType, PropertyDefinitionSupportedFilesType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import { propertyViewPostProcessingHook, PROPERTY_VIEW_SANITIZE_CONFIG } from "../PropertyView/PropertyViewText";
import PropertyDefinition from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { FILE_SUPPORTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../../../../constants";
import prettyBytes from "pretty-bytes";

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
    result: IPropertyDefinitionSupportedSingleFilesType,
    width: number,
    height: number,
  }>
}

interface IPropertyEntryTextState {
  lastLoadedFileError: string;
}

export default class PropertyEntryText
  extends React.Component<IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>, IPropertyEntryTextState> {

  private cachedMediaProperty: PropertyDefinition;
  private cachedMediaPropertyAcceptsFiles: string;
  private cachedMediaPropertyAcceptsImages: string;

  // used to restore when doing undos and whatnot
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
    this.onInsertImage = this.onInsertImage.bind(this);
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

  public cacheMediaPropertyInProps(props: IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>) {
    const mediaPropertyName = props.property.getSpecialProperty("mediaProperty") as string;
    if (mediaPropertyName) {
      this.cachedMediaProperty = props.itemDefinition.getPropertyDefinitionFor(mediaPropertyName, true);
      this.cachedMediaPropertyAcceptsFiles = processAccepts(
        this.cachedMediaProperty.getSpecialProperty("accept") as string,
        !!this.cachedMediaProperty.getSpecialProperty("imageUploader"),
      );
      this.cachedMediaPropertyAcceptsImages = this.cachedMediaPropertyAcceptsFiles === "*" ?
        FILE_SUPPORTED_IMAGE_TYPES.join(",") :
        this.cachedMediaPropertyAcceptsFiles.split(",").filter((accepting) => {
          return accepting.startsWith("image");
        }).join(",");
    }
  }

  public cacheCurrentFiles() {
    const relatedPropertyName = this.props.property.getSpecialProperty("mediaProperty") as string;
    if (relatedPropertyName) {
      const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);
      const currentValue =
        relatedProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;
      if (currentValue) {
        currentValue.forEach((v) => {
          this.internalFileCache[v.id] = v;
        });
      }
    }
  }

  public componentDidMount() {
    if (this.props.property.isRichText()) {
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
        this.onSyncFile(id);
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

  public onRestoreHijacked() {
    const relatedPropertyName = this.props.property.getSpecialProperty("mediaProperty") as string;
    const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);

    relatedProperty.restoreValueFor(this.props.forId || null, this.props.forVersion || null);
    this.props.onRestore();
  }

  public onSyncFile(fileId: string) {
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
   * Insers an image based on a file into the correlated file field and performs
   * the required checks
   * @param file the file to insert
   * @returns a promise, note that this promise can fail if the file itself fails and provide a generic error
   */
  public async onInsertImage(file: File): Promise<{
    result: IPropertyDefinitionSupportedSingleFilesType,
    width: number,
    height: number,
  }> {
    return new Promise((resolve, reject) => {
      const fileInserted = this.onInsertFile(file, true);

      const tempURL = fileInserted.url;

      const img = new Image();
      img.onload = () => {
        resolve({
          result: fileInserted,
          width: img.width,
          height: img.height,
        });
      }
      img.onerror = () => {
        this.onRemoveFile(fileInserted.id);
        this.setState({
          lastLoadedFileError: "image_uploader_invalid_type",
        });
        reject(new Error("Invalid Image"));
      }
      img.src = tempURL;
    });
  }

  /**
   * Inserts a file in the media property
   * @param file the file to insert
   * @param validateAgainstImages whether the errors and check given will be for image types
   */
  public onInsertFile(file: File, validateAgainstImages?: boolean) {
    // we do this generic check to test whether the file is an image, even when
    // the file check will do its own check
    if (validateAgainstImages && !checkFileInAccepts(file.type, this.cachedMediaPropertyAcceptsImages)) {
      this.setState({
        lastLoadedFileError: "image_uploader_invalid_type",
      });
      throw new Error("Invalid image type");
    } else if (!validateAgainstImages && !checkFileInAccepts(file.type, this.cachedMediaPropertyAcceptsFiles)) {
      this.setState({
        lastLoadedFileError: "file_uploader_invalid_type",
      });
      throw new Error("Invalid file type");
    }

    if (file.size > MAX_FILE_SIZE) {
      this.setState({
        lastLoadedFileError: validateAgainstImages ? "image_uploader_file_too_big" : "file_uploader_file_too_big",
      });
      throw new Error("Size of image/file too large");
    }

    const tempURL = URL.createObjectURL(file);

    const id = "FILE" + uuid.v4().replace(/-/g, "");
    const addedFile: IPropertyDefinitionSupportedSingleFilesType = {
      name: file.name,
      type: file.type,
      id,
      url: tempURL,
      size: file.size,
      src: file,
    };

    const currentValue =
      this.cachedMediaProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

    const newValue: PropertyDefinitionSupportedFilesType = currentValue !== null ?
      [...currentValue] : [];

    newValue.push(addedFile);
    this.internalFileCache[id] = addedFile;

    this.cachedMediaProperty.setCurrentValue(this.props.forId || null, this.props.forVersion || null, newValue, null);
    this.props.itemDefinition.triggerListeners("change", this.props.forId || null, this.props.forVersion || null);

    return addedFile;
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
    if (supportsMedia && currentValue && !this.props.state.stateValueHasBeenManuallySet) { 
      const currentFiles: PropertyDefinitionSupportedFilesType =
        this.cachedMediaProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

      DOMPurify.addHook("afterSanitizeElements", propertyViewPostProcessingHook.bind(this, this.cachedMediaProperty, currentFiles, supportsImages, supportsVideos, supportsFiles));
      currentValue = DOMPurify.sanitize(currentValue, PROPERTY_VIEW_SANITIZE_CONFIG);
      DOMPurify.removeAllHooks();

      // TODO IMPORTANT ensure proper sorting
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
      onInsertImage: this.onInsertImage,
    };

    return <RendererElement {...rendererArgs} />
  }
}
