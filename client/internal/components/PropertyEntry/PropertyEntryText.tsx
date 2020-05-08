import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import equals from "deep-equal";
import { IGQLFile } from "../../../../gql-querier";
import uuid from "uuid";
import { IPropertyDefinitionSupportedSingleFilesType, PropertyDefinitionSupportedFilesType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import { escapeStringRegexp } from "../../../../util";
import { fileURLAbsoluter, imageSrcSetRetriever } from "../../../components/util";

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

  isRichText: boolean;

  supportsImages: boolean;
  supportsFiles: boolean;

  onInsertFile: (file: File) => IPropertyDefinitionSupportedSingleFilesType;
  onInsertImage: (file: File) => Promise<{
    result: IPropertyDefinitionSupportedSingleFilesType,
    width: number,
    height: number,
  }>
}

export default class PropertyEntryText
  extends React.Component<IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>> {

  // used to restore when doing undos and whatnot
  private internalFileCache: {
    [id: string]: IPropertyDefinitionSupportedSingleFilesType;
  }

  constructor(props: IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>) {
    super(props);

    this.internalFileCache = {};

    this.onInsertFile = this.onInsertFile.bind(this);
    this.onInsertImage = this.onInsertImage.bind(this);
    this.onChangeHijacked = this.onChangeHijacked.bind(this);
  }

  public componentWillUnmount() {
    Object.keys(this.internalFileCache).forEach((k) => {
      if (this.internalFileCache[k].url.startsWith("blob:")) {
        URL.revokeObjectURL(this.internalFileCache[k].url);
      }
    });
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

  public onSyncFile(fileId: string) {
    const relatedPropertyName = this.props.property.getSpecialProperty("mediaProperty") as string;
    const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);
    const currentValue =
      relatedProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

    // it's almost certain that the file must be in this internal cache to restore files
    if ((!currentValue || !currentValue.find(v => v.id === fileId)) && this.internalFileCache[fileId]) {
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

  public async onInsertImage(file: File): Promise<{
    result: IPropertyDefinitionSupportedSingleFilesType,
    width: number,
    height: number,
  }> {
    const fileInserted = this.onInsertFile(file);

    const tempURL = fileInserted.url;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          result: fileInserted,
          width: img.width,
          height: img.height,
        });
      }
      img.onerror = (ev) => {
        resolve(null);
      }
      img.src = tempURL;
    });
  }

  public onInsertFile(file: File) {
    const tempURL = URL.createObjectURL(file);
    
    const relatedPropertyName = this.props.property.getSpecialProperty("mediaProperty") as string;
    const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);

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
      relatedProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

    const newValue: PropertyDefinitionSupportedFilesType = currentValue !== null ?
      [...currentValue] : [];

    newValue.push(addedFile);
    this.internalFileCache[id] = addedFile;

    relatedProperty.setCurrentValue(this.props.forId || null, this.props.forVersion || null, newValue, null);
    this.props.itemDefinition.triggerListeners("change", this.props.forId || null, this.props.forVersion || null);

    return addedFile;
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<string, IPropertyEntryTextRendererProps>,
  ) {
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
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
    const invalidReason = this.props.state.invalidReason;
    const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
      (this.props.poked || this.props.state.userSet) && invalidReason;
    let i18nInvalidReason = null;
    if (
      isCurrentlyShownAsInvalid && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
      i18nInvalidReason = i18nData.error[invalidReason];
    }

    const isRichText = this.props.property.isRichText();

    const mediaPropertyId = this.props.property.getSpecialProperty("mediaProperty") as string;
    const supportsMedia = !!mediaPropertyId && isRichText;
    const supportsImages = supportsMedia && !!this.props.property.getSpecialProperty("supportsImages");
    const supportsFiles = supportsMedia && !!this.props.property.getSpecialProperty("supportsFiles");

    let currentValue = this.props.state.value as string;
    if (supportsMedia && currentValue && !this.props.state.stateValueHasBeenManuallySet) {
      const mediaProperty = this.props.itemDefinition.getPropertyDefinitionFor(mediaPropertyId, true);
      const currentFiles: PropertyDefinitionSupportedFilesType =
        mediaProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

      if (currentFiles && currentFiles.length) {
        currentFiles.forEach((cf) => {
          const absolutedFile = fileURLAbsoluter(
            cf,
            this.props.itemDefinition,
            this.props.forId,
            this.props.forVersion || null,
            this.props.include,
            mediaProperty,
          );
          const attrShape = `data-src-id="${cf.id}"`;
          const srcSet = `srcset="${imageSrcSetRetriever(absolutedFile, mediaProperty)}"`;
          const src = `src="${absolutedFile ? absolutedFile.url : "/rest/resource/image-fail.svg"}"`;
          const attrReplacement = `sizes="70vw" ${srcSet} ${src} ${attrShape}`;
          const attrShapeRegex = new RegExp(escapeStringRegexp(attrShape), "g");
          currentValue = currentValue.replace(attrShapeRegex, attrReplacement);
        });
      }
    }

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntryTextRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      icon: this.props.icon,

      currentValue,
      currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: i18nInvalidReason,
      currentInternalValue: this.props.state.internalValue,

      disabled: this.props.state.enforced,

      autoFocus: this.props.autoFocus || false,

      i18nFormat: {
        formatBoldLabel: this.props.i18n[this.props.language].format_bold,
        formatItalicLabel: this.props.i18n[this.props.language].format_italic,
        formatUnderlineLabel: this.props.i18n[this.props.language].format_underline,
        formatTitleLabel: this.props.i18n[this.props.language].format_title,
        formatQuoteLabel: this.props.i18n[this.props.language].format_quote,
        formatListNumberedLabel: this.props.i18n[this.props.language].format_list_numbered,
        formatListBulletedLabel: this.props.i18n[this.props.language].format_list_bulleted,
        formatAddImageLabel: this.props.i18n[this.props.language].format_add_image,
        formatAddVideoLabel: this.props.i18n[this.props.language].format_add_video,
        formatAddFileLabel: this.props.i18n[this.props.language].format_add_file,
      },

      supportsImages,
      supportsFiles,

      isRichText,

      onChange: supportsMedia ? this.onChangeHijacked : this.props.onChange,

      onInsertFile: this.onInsertFile,
      onInsertImage: this.onInsertImage,
    };

    return <RendererElement {...rendererArgs}/>
  }
}
