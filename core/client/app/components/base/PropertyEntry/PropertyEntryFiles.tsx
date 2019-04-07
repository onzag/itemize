import React from "react";
import { IPropertyEntryProps, getClassName } from ".";
import Dropzone from "react-dropzone";
import { Paper, RootRef, Icon, FormLabel, IconButton } from "@material-ui/core";
import { PropertyDefinitionSupportedFilesType } from "../../../../../base/ItemDefinition/PropertyDefinition";
import { MAX_FILE_SIZE, FILE_SUPPORTED_IMAGE_TYPES } from "../../../../../constants";
import { mimeTypeToExtension, localeReplacer } from "../../../../../util";
import prettyBytes from "pretty-bytes";

interface IFileData {
  name: string;
  type: string;
  size: number;
}

function simpleQSparse(queryString: string): {[key: string]: string} {
  const query = {};
  queryString.split("&").forEach((pair: string) => {
    const pairData = pair.split("=");
    query[decodeURIComponent(pairData[0])] = decodeURIComponent(pairData[1] || "");
  });
  return query;
}

function extractFileDataFromUrl(url: string): IFileData {
  const [base, queryString] = url.split("?");
  const baseSplitted = base.split("/");
  const name = decodeURIComponent(baseSplitted[baseSplitted.length - 1]);
  const parsed = simpleQSparse(queryString);
  return {
    name,
    type: parsed.type,
    size: parseInt(parsed.size, 10),
  };
}

interface IInternalURLFileDataWithState {
  url: string;
  rejected?: boolean;
  reason?: string;
}

export default class PropertyEntryFiles extends React.Component<IPropertyEntryProps, {}> {
  private ownedObjectURLPool: {[key: string]: File};

  constructor(props: IPropertyEntryProps) {
    super(props);

    this.ownedObjectURLPool = {};
    this.onDropAccepted = this.onDropAccepted.bind(this);
    this.onDropRejected = this.onDropRejected.bind(this);
    this.onRemoveFile = this.onRemoveFile.bind(this);
    this.openFile = this.openFile.bind(this);
  }
  public componentWillUnmount() {
    Object.keys(this.ownedObjectURLPool).forEach((ownedURL: string) => {
      URL.revokeObjectURL(ownedURL);
    });
  }
  public componentDidUpdate() {
    (this.props.value.value as PropertyDefinitionSupportedFilesType || []).forEach((url) => {
      if (url.startsWith("blob:") && !this.ownedObjectURLPool[url]) {
        console.warn("This component is using an object url that it doesn't own");
      }
    });
    (this.props.value.internalValue as IInternalURLFileDataWithState[] || []).forEach((value) => {
      if (value.url.startsWith("blob:") && !this.ownedObjectURLPool[value.url]) {
        console.warn("This component is using an object url that it doesn't own");
      }
    });
  }
  public onDropAccepted(files: File[]) {
    const objectURLS = files.map((file: File) => {
      const objectURL = URL.createObjectURL(file);
      this.ownedObjectURLPool[objectURL] = file;
      return objectURL;
    });
    this.props.onChange(
      (this.props.value.value as PropertyDefinitionSupportedFilesType || []).concat(objectURLS),
      (this.props.value.internalValue as IInternalURLFileDataWithState[] || []).concat(
        objectURLS.map((url: string) => ({url})),
      ),
    );
  }
  public onDropRejected(files: File[]) {
    const newInternalValueData: IInternalURLFileDataWithState[] = files.map((file: File) => {
      const objectURL = URL.createObjectURL(file);
      this.ownedObjectURLPool[objectURL] = file;

      const isImage = (this.props.property.getSpecialProperty("accept") as string || "").startsWith("image");
      let reason = isImage ? "image_uploader_invalid_type" : "file_uploader_invalid_type";
      if (file.size > MAX_FILE_SIZE) {
        reason = isImage ? "image_uploader_file_too_big" : "file_uploader_file_too_big";
      }

      return {
        url: objectURL,
        rejected: true,
        reason,
      };
    });

    let valueAsInternal: IInternalURLFileDataWithState[] = this.props.value.internalValue;
    if (!valueAsInternal && this.props.value.value) {
      valueAsInternal = (
        this.props.value.value as PropertyDefinitionSupportedFilesType
      ).map((url: string) => ({url}));
    } else if (!valueAsInternal) {
      valueAsInternal = [];
    }

    this.props.onChange(
      this.props.value.value,
      valueAsInternal.concat(newInternalValueData),
    );
  }
  public openFile(url: string, e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();

    const w = window.open(url, "_blank");
  }
  public onRemoveFile(url: string, e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();

    if (this.ownedObjectURLPool[url]) {
      delete this.ownedObjectURLPool[url];
      URL.revokeObjectURL(url);
    }

    const indexInInternalValue = (this.props.value.internalValue as IInternalURLFileDataWithState[] || []).findIndex(
      (value) => value.url === url,
    );
    let newInternalValue = this.props.value.internalValue as IInternalURLFileDataWithState[];
    if (indexInInternalValue !== -1) {
      newInternalValue = [...newInternalValue];
      newInternalValue.splice(indexInInternalValue, 1);
      if (newInternalValue.length === 0) {
        newInternalValue = null;
      }
    }

    const indexInValue = (this.props.value.value as PropertyDefinitionSupportedFilesType || []).findIndex(
      (value) => value === url,
    );
    let newValue = this.props.value.value as PropertyDefinitionSupportedFilesType;
    if (indexInValue !== -1) {
      newValue = [...newValue];
      newValue.splice(indexInValue, 1);
      if (newValue.length === 0) {
        newValue = null;
      }
    }

    this.props.onChange(newValue, newInternalValue);
  }
  public render() {
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const className = getClassName(this.props, "files", this.props.poked);
    const i18nLabel = i18nData && i18nData.label;
    const i18nPlaceholder = i18nData && i18nData.placeholder;
    const icon = this.props.property.getIcon();
    const iconComponent = icon ? (
      <Icon classes={{root: "property-entry--icon"}}>{icon}</Icon>
    ) : null;

    let placeholderActive = this.props.i18n.file_uploader_placeholder_active;
    if ((this.props.property.getSpecialProperty("accept") as string || "").startsWith("image")) {
      placeholderActive = this.props.i18n.image_uploader_placeholder_active;
    }

    const invalidReason = this.props.value.invalidReason;
    let i18nInvalidReason = null;
    if (
      (this.props.poked || this.props.value.userSet) &&
      invalidReason && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
      i18nInvalidReason = i18nData.error[invalidReason];
    }

    let accept: string | string[] = this.props.property.getSpecialProperty("accept") as string;
    if (accept === "image") {
      accept = FILE_SUPPORTED_IMAGE_TYPES;
    }

    return (
      <div className={className}>
        <FormLabel
          aria-label={i18nLabel}
          classes={{
            root: "property-entry--label",
            focused: "focused",
          }}
        >
          {i18nLabel}{iconComponent}
        </FormLabel>
        <Dropzone
          onDropAccepted={this.onDropAccepted}
          onDropRejected={this.onDropRejected}
          maxSize={MAX_FILE_SIZE}
          accept={accept}
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject,
          }) => {
            const {ref, ...rootProps} = getRootProps();

            let valueAsInternal: IInternalURLFileDataWithState[] = this.props.value.internalValue;
            if (!valueAsInternal && this.props.value.value) {
              valueAsInternal = (
                this.props.value.value as PropertyDefinitionSupportedFilesType
              ).map((url: string) => ({url}));
            } else if (!valueAsInternal) {
              valueAsInternal = [];
            }

            const files = valueAsInternal.map((value, index) => {
              const fileData: IFileData = this.ownedObjectURLPool[value.url] || extractFileDataFromUrl(value.url);
              const fileClassName =
                `property-entry--files--file ${value.rejected ? "property-entry--files--file--rejected" : ""}`;
              if (fileData.type.startsWith("image/") && FILE_SUPPORTED_IMAGE_TYPES.includes(fileData.type)) {
                const reduceSizeURL = value.url.indexOf("blob:") !== 0 ? value.url + "&small" : value.url;
                return (
                  <div
                    className={fileClassName}
                    key={index}
                    onClick={this.openFile.bind(this, value.url)}
                  >
                    <div className="property-entry--files--file--image">
                      <img src={reduceSizeURL}/>
                      <IconButton
                        className="property-entry--files--file--delete"
                        onClick={this.onRemoveFile.bind(this, value.url)}
                      >
                        <Icon>remove_circle</Icon>
                      </IconButton>
                    </div>
                    <p className="property-entry--files--file--name">{fileData.name}</p>
                    <p className="property-entry--files--file--size">({
                      prettyBytes(fileData.size)
                    })</p>
                    {value.rejected ? <p className="property-entry--files--file--rejected-reason">
                      {localeReplacer(this.props.i18n[value.reason], prettyBytes(MAX_FILE_SIZE))}
                    </p> : null}
                  </div>
                );
              } else {
                return (
                  <div
                    className={fileClassName}
                    key={index}
                    onClick={this.openFile.bind(this, value.url)}
                  >
                    <div className="property-entry--files--file--icon">
                      <Icon className="property-entry--files--file--icon-background">insert_drive_file</Icon>
                      <span className="property-entry--files--file--icon-filetype">{
                        mimeTypeToExtension(fileData.type)
                      }</span>
                      <IconButton
                        className="property-entry--files--file--delete"
                        onClick={this.onRemoveFile.bind(this, value.url)}
                      >
                        <Icon>remove_circle</Icon>
                      </IconButton>
                    </div>
                    <p className="property-entry--files--file--name">{fileData.name}</p>
                    <p className="property-entry--files--file--size">({
                      prettyBytes(fileData.size)
                    })</p>
                    {value.rejected ? <p className="property-entry--files--file--rejected-reason">
                      {localeReplacer(this.props.i18n[value.reason], prettyBytes(MAX_FILE_SIZE))}
                    </p> : null}
                  </div>
                );
              }
            });

            return (
              <RootRef rootRef={ref}>
                <Paper {...rootProps} classes={{root: "property-entry--files-paper"}}>
                  <input {...getInputProps()} />
                  {!valueAsInternal.length ? <div className="property-entry--files--placeholder">
                    <p>{isDragActive ? placeholderActive : i18nPlaceholder}</p>
                    <Icon className="property-entry--files--icon-add">note_add</Icon>
                  </div> : null}
                  {files}
                </Paper>
              </RootRef>
            );
          }}
        </Dropzone>
        <div className="property-entry--error">
          {i18nInvalidReason}
        </div>
      </div>
    );
  }
}
