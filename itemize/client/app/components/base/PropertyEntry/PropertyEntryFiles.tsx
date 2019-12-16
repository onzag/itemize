import React from "react";
import { IPropertyEntryProps } from ".";
import Dropzone, { DropzoneRef } from "react-dropzone";
import { Paper, RootRef, Icon, FormLabel, IconButton, Button } from "@material-ui/core";
import { mimeTypeToExtension, localeReplacer } from "../../../../../util";
import prettyBytes from "pretty-bytes";
import equals from "deep-equal";
import { PropertyDefinitionSupportedFilesType } from "../../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import { MAX_FILE_SIZE, FILE_SUPPORTED_IMAGE_TYPES } from "../../../../../constants";

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

// because we expect to be efficient, we are going to actually store data in the url as
// query string, expected file location at /rest/files/:userId/:fileId/:fileName?type=:contentType&size=:size
// a &small attribute should be valid too, for a small version of images
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

// in reality there might be invisible for the property
// rejected files, so all files will have this state
// regardless of anything, this is for the internal
interface IInternalURLFileDataWithState {
  url: string;
  rejected?: boolean;
  reason?: string;
}

export default class PropertyEntryFiles extends React.Component<IPropertyEntryProps, {}> {
  // we have a pool of owned urls that are alive during the existance
  // of this component, be careful of using those urls elsewhere, they
  // will be revoked when this component unmounts
  private ownedObjectURLPool: {[key: string]: File};

  // the dropzone ref
  private dropzoneRef = React.createRef<DropzoneRef>();

  constructor(props: IPropertyEntryProps) {
    super(props);

    // the pool is set
    this.ownedObjectURLPool = {};

    // the functions are binded
    this.onDropAccepted = this.onDropAccepted.bind(this);
    this.onDropRejected = this.onDropRejected.bind(this);
    this.onRemoveFile = this.onRemoveFile.bind(this);
    this.openFile = this.openFile.bind(this);
    this.manuallyTriggerUpload = this.manuallyTriggerUpload.bind(this);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyEntryProps,
  ) {
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      !equals(this.props.value, nextProps.value) ||
      !!this.props.poked !== !!nextProps.poked ||
      !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
      nextProps.language !== this.props.language ||
      nextProps.i18n !== this.props.i18n;
  }
  public manuallyTriggerUpload() {
    // utility for the button to manually trigger upload
    // using the ref when it is disabled
    if (this.dropzoneRef.current) {
      this.dropzoneRef.current.open();
    }
  }
  public componentWillUnmount() {
    // revoke urls on unmount
    Object.keys(this.ownedObjectURLPool).forEach((ownedURL: string) => {
      URL.revokeObjectURL(ownedURL);
    });
  }
  public onDropAccepted(files: File[]) {
    // when a drop is accepted, let's check, if it's a single file
    const singleFile = this.props.property.getMaxLength() === 1;

    // let's get the object urls of the files added
    const objectURLS = files.map((file: File) => {
      const objectURL = URL.createObjectURL(file);
      this.ownedObjectURLPool[objectURL] = file;
      return objectURL;
    });

    // call the onchange, as replacing or as concatenating depending
    // on whether it is a single file or not
    this.props.onChange(
      (singleFile ? [] : this.props.value.value as PropertyDefinitionSupportedFilesType || []).concat(objectURLS),
      (singleFile ? [] : this.props.value.internalValue as IInternalURLFileDataWithState[] || []).concat(
        objectURLS.map((url: string) => ({url})),
      ),
    );
  }
  public onDropRejected(files: File[]) {
    // we need to create our internal values with the rejection and the reason of why
    // they were rejected
    const newInternalValueData: IInternalURLFileDataWithState[] = files.map((file: File) => {
      // create the object url
      const objectURL = URL.createObjectURL(file);
      // add it to the pool
      this.ownedObjectURLPool[objectURL] = file;

      // check if it's images we are accepting
      const isImage = (this.props.property.getSpecialProperty("accept") as string || "").startsWith("image");
      // the reason by default is that is an invalid type
      let reason = isImage ? "image_uploader_invalid_type" : "file_uploader_invalid_type";
      // but if the file is too large
      if (file.size > MAX_FILE_SIZE) {
        // change it to that
        reason = isImage ? "image_uploader_file_too_big" : "file_uploader_file_too_big";
      }

      return {
        url: objectURL,
        rejected: true,
        reason,
      };
    });

    // if it's a single file
    const singleFile = this.props.property.getMaxLength() === 1;

    // the internal value currently, it might be null so we need to recreate it
    // as what is the value currently, before the drop is going to be added
    // note that it is hardset to an empty string if it's a single file
    // so it forces a replacement, none of the conditionals will pass, it will
    // just remain an empty array, making it replace
    let valueAsInternal: IInternalURLFileDataWithState[] = singleFile ? [] : this.props.value.internalValue;
    if (!valueAsInternal && this.props.value.value) {
      valueAsInternal = (
        this.props.value.value as PropertyDefinitionSupportedFilesType
      ).map((url: string) => ({url}));
    } else if (!valueAsInternal) {
      valueAsInternal = [];
    }

    // by the same logic the onchange set it to null
    // replacing an existant file if there was one
    this.props.onChange(
      singleFile ? null : this.props.value.value,
      valueAsInternal.concat(newInternalValueData),
    );
  }
  public openFile(url: string, e: React.MouseEvent<HTMLButtonElement>) {
    // open a file, let's stop the propagation
    // for some reason it's not possible to set the window title
    e.stopPropagation();
    e.preventDefault();

    const w = window.open(url, "_blank");
  }
  public onRemoveFile(url: string, e: React.MouseEvent<HTMLButtonElement>) {
    // stop the propagation and stuff
    e.stopPropagation();
    e.preventDefault();

    // revoke the url and remove it from the pool
    if (this.ownedObjectURLPool[url]) {
      delete this.ownedObjectURLPool[url];
      URL.revokeObjectURL(url);
    }

    // let's get the index in the internal value
    const indexInInternalValue = (this.props.value.internalValue as IInternalURLFileDataWithState[] || []).findIndex(
      (value) => value.url === url,
    );
    // this will be the new value
    let newInternalValue = this.props.value.internalValue as IInternalURLFileDataWithState[];
    // if the index in the internal value the url is there
    if (indexInInternalValue !== -1) {
      // we make a copy, and splice it, and set it to null if necessary
      newInternalValue = [...newInternalValue];
      newInternalValue.splice(indexInInternalValue, 1);
      if (newInternalValue.length === 0) {
        newInternalValue = null;
      }
    }

    // let's do the exact same but for the actual value
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

    // trigger the on change
    this.props.onChange(newValue, newInternalValue);
  }
  public render() {
    // getting the basic data
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const i18nLabel = i18nData && i18nData.label;
    const i18nDescription = i18nData && i18nData.description;
    const i18nPlaceholder = i18nData && i18nData.placeholder;

    // getting the icon
    const icon = this.props.property.getIcon();
    const iconComponent = icon ? (
      <Icon classes={{root: "property-entry-icon"}}>{icon}</Icon>
    ) : null;

    // whether it is a single file
    const singleFile = this.props.property.getMaxLength() === 1;
    // whether we are expecting images only
    const isExpectingImages = (this.props.property.getSpecialProperty("accept") as string || "").startsWith("image");

    // the placeholder when active
    let placeholderActive = singleFile ?
      this.props.i18n.file_uploader_placeholder_active_single :
      this.props.i18n.file_uploader_placeholder_active;
    if (isExpectingImages) {
      placeholderActive = singleFile ?
        this.props.i18n.image_uploader_placeholder_active_single :
        this.props.i18n.image_uploader_placeholder_active;
    }

    // the invalid reason
    const invalidReason = this.props.value.invalidReason;
    let i18nInvalidReason = null;
    if (
      (this.props.poked || this.props.value.userSet) &&
      invalidReason && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
      i18nInvalidReason = i18nData.error[invalidReason];
    }

    // what are we accepting, note that "image" will trasnlate to the
    // supported browser image types
    let accept: string | string[] = this.props.property.getSpecialProperty("accept") as string;
    if (accept === "image") {
      accept = FILE_SUPPORTED_IMAGE_TYPES;
    }

    // the value from the internal source, either recreated or from the internal value
    let valueAsInternal: IInternalURLFileDataWithState[] = this.props.value.internalValue;
    if (!valueAsInternal && this.props.value.value) {
      valueAsInternal = (
        this.props.value.value as PropertyDefinitionSupportedFilesType
      ).map((url: string) => ({url}));
    } else if (!valueAsInternal) {
      valueAsInternal = [];
    }

    // return the component itself
    return (
      <div className={this.props.classes.container}>
        <FormLabel
          aria-label={i18nLabel}
          classes={{
            root: this.props.classes.label,
            focused: "focused",
          }}
        >
          {i18nLabel}{iconComponent}
        </FormLabel>
        {i18nDescription ? <div className={this.props.classes.description}>
          <Icon>keyboard_arrow_down</Icon>{i18nDescription}</div> : null}
        <Dropzone
          onDropAccepted={this.onDropAccepted}
          onDropRejected={this.onDropRejected}
          maxSize={MAX_FILE_SIZE}
          accept={accept}
          multiple={!singleFile}
          noClick={singleFile && valueAsInternal.length === 1}
          ref={this.dropzoneRef}
          disabled={this.props.value.enforced}
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject,
          }) => {
            const {ref, ...rootProps} = getRootProps();

            const files = valueAsInternal.map((value, index) => {
              const fileData: IFileData = this.ownedObjectURLPool[value.url] || extractFileDataFromUrl(value.url);
              const isSupportedImage = fileData.type.startsWith("image/") &&
                FILE_SUPPORTED_IMAGE_TYPES.includes(fileData.type);
              const mainFileClassName = this.props.classes.file +
                (value.rejected ? " " + this.props.classes.fileRejected : "");

              if (isSupportedImage) {
                const reduceSizeURL =
                  value.url.indexOf("blob:") !== 0 && !singleFile ?
                  value.url + "&small" :
                  value.url;
                return (
                  <div
                    className={mainFileClassName}
                    key={index}
                    onClick={this.openFile.bind(this, value.url)}
                  >
                    <div className={this.props.classes.fileDataContainer}>
                      <img src={reduceSizeURL} className={this.props.classes.imageThumbnail}/>
                      {!singleFile ? <IconButton
                        className={this.props.classes.fileDeleteButton}
                        onClick={this.onRemoveFile.bind(this, value.url)}
                      >
                        <Icon>remove_circle</Icon>
                      </IconButton> : null}
                    </div>
                    <p className={this.props.classes.fileName}>{fileData.name}</p>
                    <p className={this.props.classes.fileSize}>({
                      prettyBytes(fileData.size)
                    })</p>
                    {value.rejected ? <p className={this.props.classes.fileRejectedDescription}>
                      {localeReplacer(this.props.i18n[value.reason], prettyBytes(MAX_FILE_SIZE))}
                    </p> : null}
                  </div>
                );
              } else {
                return (
                  <div
                    className={mainFileClassName}
                    key={index}
                    onClick={this.openFile.bind(this, value.url)}
                  >
                    <div className={this.props.classes.fileDataContainer}>
                      <Icon className={this.props.classes.fileIcon}>insert_drive_file</Icon>
                      <span className={this.props.classes.fileMimeType}>{
                        mimeTypeToExtension(fileData.type)
                      }</span>
                      {!singleFile ? <IconButton
                        className={this.props.classes.fileDeleteButton}
                        onClick={this.onRemoveFile.bind(this, value.url)}
                      >
                        <Icon>remove_circle</Icon>
                      </IconButton> : null}
                    </div>
                    <p className={this.props.classes.fileName}>{fileData.name}</p>
                    <p className={this.props.classes.fileSize}>({
                      prettyBytes(fileData.size)
                    })</p>
                    {value.rejected ? <p className={this.props.classes.fileRejectedDescription}>
                      {localeReplacer(this.props.i18n[value.reason], prettyBytes(MAX_FILE_SIZE))}
                    </p> : null}
                  </div>
                );
              }
            });

            return (
              <RootRef rootRef={ref}>
                <Paper
                  {...rootProps}
                  classes={{
                    root: `${this.props.classes.filesPaper} ${singleFile ?
                      this.props.classes.filesPaperSingleFile : ""}`,
                  }}
                >
                  <input {...getInputProps()} />
                  {files}
                  {
                    (
                      this.props.property.getMaxLength() === 1 &&
                      valueAsInternal.length === 1
                    ) ? null :
                    <div
                      className={`${this.props.classes.filesPlaceholder} ${isDragAccept ?
                          this.props.classes.filesPlaceholderAccepting : ""} ${isDragReject ?
                          this.props.classes.filesPlaceholderRejecting : ""}`}
                    >
                      {!valueAsInternal.length ? <p>{isDragActive ? placeholderActive : i18nPlaceholder}</p> : null}
                      <Icon className={this.props.classes.filesIconAdd}>note_add</Icon>
                    </div>
                  }
                  {
                    singleFile && valueAsInternal.length === 1 ? <div
                      className={this.props.classes.filesSingleFileButtonContainer}
                    >
                      <Button
                        className={this.props.classes.filesSingleFileButton}
                        variant="contained"
                        color="secondary"
                        onClick={this.onRemoveFile.bind(this, valueAsInternal[0].url)}
                      >
                        {
                          isExpectingImages ?
                          this.props.i18n.image_uploader_delete_file :
                          this.props.i18n.file_uploader_delete_file
                        }
                        <Icon className={this.props.classes.filesSingleFileButtonIcon}>remove_circle_outline</Icon>
                      </Button>
                      <Button
                        className={this.props.classes.filesSingleFileButton}
                        variant="contained"
                        color="primary"
                        onClick={this.manuallyTriggerUpload}
                      >
                        {
                          isExpectingImages ?
                          this.props.i18n.image_uploader_select_file :
                          this.props.i18n.file_uploader_select_file
                        }
                        <Icon className={this.props.classes.filesSingleFileButtonIcon}>cloud_upload</Icon>
                      </Button>
                    </div> : null
                  }
                </Paper>
              </RootRef>
            );
          }}
        </Dropzone>
        <div className={this.props.classes.errorMessage}>
          {i18nInvalidReason}
        </div>
      </div>
    );
  }
}
