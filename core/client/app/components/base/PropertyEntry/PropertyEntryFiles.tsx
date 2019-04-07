import React from "react";
import { IPropertyEntryProps, getClassName } from ".";
import Dropzone from "react-dropzone";
import { Paper, RootRef, Icon, FormLabel, IconButton } from "@material-ui/core";
import { PropertyDefinitionSupportedFilesType } from "../../../../../base/ItemDefinition/PropertyDefinition";
import { MAX_FILE_SIZE } from "../../../../../constants";
import { mimeTypeToExtension } from "../../../../../util";

interface IFileData {
  name: string;
  type: string;
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
  return {
    name,
    type: simpleQSparse(queryString).type,
  };
}

export default class PropertyEntryFiles extends React.Component<IPropertyEntryProps, {}> {
  private ownedObjectURLPool: {[key: string]: File};

  constructor(props: IPropertyEntryProps) {
    super(props);

    this.ownedObjectURLPool = {};
    this.onDropAccepted = this.onDropAccepted.bind(this);
    this.onRemoveFile = this.onRemoveFile.bind(this);
    this.openFile = this.openFile.bind(this);
  }
  public componentWillUnmount() {
    Object.keys(this.ownedObjectURLPool).forEach((ownedURL: string) => {
      URL.revokeObjectURL(ownedURL);
    });
  }
  public componentDidUpdate() {
    (this.props.value.value as PropertyDefinitionSupportedFilesType || []).forEach((url: string) => {
      if (url.startsWith("blob:") && !this.ownedObjectURLPool[url]) {
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
      null,
    );
  }
  public openFile(index, e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();

    if (!this.props.value.value) {
      return;
    }

    const urlToOpen: string = this.props.value.value[index];
    const fileData: IFileData = this.ownedObjectURLPool[urlToOpen] || extractFileDataFromUrl(urlToOpen);

    const w = window.open(urlToOpen, "_blank");
  }
  public onRemoveFile(index: number, e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();

    if (!this.props.value.value) {
      return;
    }

    const urlToRemove: string = this.props.value.value[index];
    if (urlToRemove) {
      if (this.ownedObjectURLPool[urlToRemove]) {
        delete this.ownedObjectURLPool[urlToRemove];
        URL.revokeObjectURL(urlToRemove);
      }

      const newValue = [...this.props.value.value as PropertyDefinitionSupportedFilesType];
      newValue.splice(index, 1);

      this.props.onChange(
        newValue.length === 0 ? null : newValue,
        null,
      );
    }
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

    let placeholderActive = this.props.i18n.file_drag_and_drop_placeholder_active;
    if (this.props.property.getType() === "images") {
      placeholderActive = this.props.i18n.image_drag_and_drop_placeholder_active;
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
        <Dropzone onDropAccepted={this.onDropAccepted} maxSize={MAX_FILE_SIZE}>
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject,
          }) => {
            const {ref, ...rootProps} = getRootProps();

            const files = (this.props.value.value as PropertyDefinitionSupportedFilesType || []).map((url, index) => {
              const fileData: IFileData = this.ownedObjectURLPool[url] || extractFileDataFromUrl(url);
              if (fileData.type.startsWith("image/")) {
                const reduceSizeURL = url.indexOf("blob:") !== 0 ? url + "&small" : url;
                return (
                  <div className="property-entry--files--file" key={index} onClick={this.openFile.bind(this, index)}>
                    <div className="property-entry--files--file--image">
                      <img src={reduceSizeURL}/>
                      <IconButton
                        className="property-entry--files--file--delete"
                        onClick={this.onRemoveFile.bind(this, index)}
                      >
                        <Icon>remove_circle</Icon>
                      </IconButton>
                    </div>
                    <p className="property-entry--files--file--name">{fileData.name}</p>
                  </div>
                );
              } else {
                return (
                  <div className="property-entry--files--file" key={index} onClick={this.openFile.bind(this, index)}>
                    <div className="property-entry--files--file--icon">
                      <Icon className="property-entry--files--file--icon-background">insert_drive_file</Icon>
                      <span className="property-entry--files--file--icon-filetype">{
                        mimeTypeToExtension(fileData.type)
                      }</span>
                      <IconButton
                        className="property-entry--files--file--delete"
                        onClick={this.onRemoveFile.bind(this, index)}
                      >
                        <Icon>remove_circle</Icon>
                      </IconButton>
                    </div>
                    <p className="property-entry--files--file--name">{fileData.name}</p>
                  </div>
                );
              }
            });

            return (
              <RootRef rootRef={ref}>
                <Paper {...rootProps} classes={{root: "property-entry--files-paper"}}>
                  <input {...getInputProps()} />
                  {!this.props.value.value ? <div className="property-entry--files--placeholder">
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
