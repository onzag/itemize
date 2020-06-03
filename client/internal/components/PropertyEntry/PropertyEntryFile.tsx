import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import equals from "deep-equal";
import { MAX_FILE_SIZE, FILE_SUPPORTED_IMAGE_TYPES } from "../../../../constants";
import uuid from "uuid";
import { PropertyDefinitionSupportedFileType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
import prettyBytes from "pretty-bytes";
import { localeReplacer, mimeTypeToExtension, capitalize, checkFileInAccepts, processAccepts, fileURLAbsoluter } from "../../../../util";
import { imageSrcSetRetriever, imageSizeRetriever, IImageSizes } from "../../../components/util";

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

export default class PropertyEntryFile
  extends React.Component<
  IPropertyEntryHandlerProps<PropertyDefinitionSupportedFileType, IPropertyEntryFileRendererProps>,
  IPropertyEntryFileState
  > {
  private ownedObjectURLPool: {[key: string]: string};

  constructor(props: IPropertyEntryHandlerProps<PropertyDefinitionSupportedFileType, IPropertyEntryFileRendererProps>) {
    super(props);

    // the pool is set
    this.ownedObjectURLPool = {};

    this.state = {
      rejectedValue: null,
      rejected: false,
      rejectedReason: null,
    };

    // the functions are binded
    this.onSetFile = this.onSetFile.bind(this);
    this.onRemoveFile = this.onRemoveFile.bind(this);
    this.openFile = this.openFile.bind(this);
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
      this.state.rejected !== nextState.rejected ||
      !equals(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public componentWillUnmount() {
    // revoke urls on unmount
    Object.keys(this.ownedObjectURLPool).forEach((id: string) => {
      URL.revokeObjectURL(this.ownedObjectURLPool[id]);
    });
  }
  public openFile(
    value: PropertyDefinitionSupportedFileType,
  ) {
    window.open(value.url, value.name);
  }
  public onSetFile(file: File) {
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
    };

    const isExpectingImages = !!this.props.property.getSpecialProperty("imageUploader");
    const accept = processAccepts(
      this.props.property.getSpecialProperty("accept") as string,
      isExpectingImages,
    );

    // check if it's images we are accepting
    if (!checkFileInAccepts(value.type, accept)) {
      this.setState({
        rejected: true,
        rejectedValue: value,
        rejectedReason: this.props.i18n[this.props.language]
          [(isExpectingImages ? "image_uploader_invalid_type" : "file_uploader_invalid_type")],
      });
      return;
    } else if (value.size > MAX_FILE_SIZE) {
      const prettySize = prettyBytes(MAX_FILE_SIZE);
      this.setState({
        rejected: true,
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
        rejected: false,
        rejectedValue: null,
        rejectedReason: null,
      })
    }

    this.props.onChange(
      value,
      null,
    );
  }
  public onRemoveFile() {
    this.props.onChange(
      null,
      null,
    );
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
      (this.props.poked || this.props.state.userSet) && invalidReason;
    let i18nInvalidReason = null;
    if (
      isCurrentlyShownAsInvalid && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
      i18nInvalidReason = i18nData.error[invalidReason];
    }

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
        currentValue = fileURLAbsoluter(
          this.props.config.containersHostnamePrefixes,
          currentValue,
          this.props.itemDefinition,
          this.props.forId,
          this.props.forVersion,
          this.props.containerId,
          this.props.include,
          this.props.property,
        );
      }
    }

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

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntryFileRendererProps = {
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

      accept,
      isExpectingImages,
      genericActivePlaceholder,
      genericDeleteLabel,
      genericSelectLabel,

      rejected: this.state.rejected,
      rejectedReason: this.state.rejectedReason,

      isSupportedImage,
      imageSrcSet,
      imageSizes,
      prettySize,
      extension,
    };

    return <RendererElement {...rendererArgs} />;
  }
}
