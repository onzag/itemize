import React from "react";
import { IPropertyEntryProps, IPropertyEntryRendererProps } from ".";
import equals from "deep-equal";
import { MAX_FILE_SIZE, FILE_SUPPORTED_IMAGE_TYPES } from "../../../../constants";
import uuid from "uuid";
import { PropertyDefinitionSupportedFileType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
import prettyBytes from "pretty-bytes";
import { localeReplacer, mimeTypeToExtension, capitalize } from "../../../../util";
import { imageSizeRetriever } from "../../../components/util";

export interface IPropertyEntryFileRendererProps extends IPropertyEntryRendererProps<PropertyDefinitionSupportedFileType> {
  accept: string;
  isExpectingImages: boolean;
  genericActivePlaceholder: string;
  genericDeleteLabel: string;
  genericSelectLabel: string;
  isSupportedImage: boolean;
  rejected: boolean;
  rejectedReason: string;
  imageSizes: {
    imageMediumSizeURL: string;
    imageSmallSizeURL: string;
    imageLargeSizeURL: string;
    imageStandardSizeURL: string;
  };
  prettySize: string;
  expectedExtension: string;
  onSetFile: (file: File) => void;
  onRemoveFile: () => void;
  openFile: (value: PropertyDefinitionSupportedFileType) => void;
}

interface IPropertyEntryFileState {
  rejectedValue: PropertyDefinitionSupportedFileType;
  rejected: boolean;
  rejectedReason: string;
}

function checkFileInAccepts(fileType: string, accept: string) {
  var typeRegex = new RegExp(accept.replace(/\*/g, '.\*').replace(/\,/g, '|'));
  return typeRegex.test(fileType);
}

export default class PropertyEntryFile
  extends React.Component<
  IPropertyEntryProps<PropertyDefinitionSupportedFileType, IPropertyEntryFileRendererProps>,
  IPropertyEntryFileState
  > {
  private ownedObjectURLPool: {[key: string]: string};

  constructor(props: IPropertyEntryProps<PropertyDefinitionSupportedFileType, IPropertyEntryFileRendererProps>) {
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
    nextProps: IPropertyEntryProps<PropertyDefinitionSupportedFileType, IPropertyEntryFileRendererProps>,
    nextState: IPropertyEntryFileState,
  ) {
    // This is optimized to only update for the thing it uses
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      !equals(this.props.state, nextProps.state) ||
      !!this.props.poked !== !!nextProps.poked ||
      !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
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
    window.open(value.url, "_blank");
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
    const accept = (
      this.props.property.getSpecialProperty("accept") as string ||
      (isExpectingImages ? FILE_SUPPORTED_IMAGE_TYPES.join(",") : "*")
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
    const i18nLabel = i18nData && i18nData.label;
    const i18nDescription = i18nData && i18nData.description;
    const i18nPlaceholder = i18nData && i18nData.placeholder;
    const isSupportedImage = !this.props.state.value ?
      false :
      FILE_SUPPORTED_IMAGE_TYPES.includes((this.props.state.value as PropertyDefinitionSupportedFileType).type);

    // get the invalid reason if any
    const invalidReason = this.props.state.invalidReason;
    const isCurrentlyShownAsInvalid = (this.props.poked || this.props.state.userSet) && invalidReason;
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
      currentValue.url.indexOf("blob:") !== 0 &&
      this.ownedObjectURLPool[currentValue.id]
    ) {
      currentValue = {
        ...currentValue,
        url: this.ownedObjectURLPool[currentValue.id],
      };
    } else {
      let prefix: string = (window as any).UPLOADS_PREFIX;
      if (prefix.indexOf("/") !== 0) {
        prefix = location.protocol + "//" + prefix;
      }
      currentValue = {
        ...currentValue,
        url:
          prefix +
          this.props.itemDefinition.getQualifiedPathName() + "/" +
          this.props.forId + "." + (this.props.forVersion || null) + "/" +
          (this.props.include ? this.props.include.getId() + "/" : "") +
          this.props.property.getId() + "/" +
          currentValue.id + "/" + currentValue.url,
      }
    }

    const imageSizes = isSupportedImage ? imageSizeRetriever(currentValue) : {
      imageMediumSizeURL: null,
      imageSmallSizeURL: null,
      imageLargeSizeURL: null,
      imageStandardSizeURL: null,
    };

    const isExpectingImages = !!this.props.property.getSpecialProperty("imageUploader");
    const accept = (
      this.props.property.getSpecialProperty("accept") as string ||
      (isExpectingImages ? FILE_SUPPORTED_IMAGE_TYPES.join(",") : "*")
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
    const expectedExtension = currentValue && mimeTypeToExtension(currentValue.type);

    const RendererElement = this.props.renderer;
    const rendererArgs = {
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
      onChange: this.props.onChange,

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
      imageSizes,
      prettySize,
      expectedExtension,
    };

    return <RendererElement {...rendererArgs} />;
  }
}
