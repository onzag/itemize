"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dropzone_1 = __importDefault(require("react-dropzone"));
const core_1 = require("@material-ui/core");
const util_1 = require("../../../../util");
const pretty_bytes_1 = __importDefault(require("pretty-bytes"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const constants_1 = require("../../../../constants");
const uuid_1 = __importDefault(require("uuid"));
class PropertyEntryFiles extends react_1.default.Component {
    constructor(props) {
        super(props);
        // the dropzone ref
        this.dropzoneRef = react_1.default.createRef();
        // the pool is set
        this.ownedObjectURLPool = {};
        // the functions are binded
        this.onDropAccepted = this.onDropAccepted.bind(this);
        this.onDropRejected = this.onDropRejected.bind(this);
        this.onRemoveFile = this.onRemoveFile.bind(this);
        this.openFile = this.openFile.bind(this);
        this.manuallyTriggerUpload = this.manuallyTriggerUpload.bind(this);
    }
    shouldComponentUpdate(nextProps) {
        // This is optimized to only update for the thing it uses
        return nextProps.property !== this.props.property ||
            !deep_equal_1.default(this.props.state, nextProps.state) ||
            !!this.props.poked !== !!nextProps.poked ||
            !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
            nextProps.language !== this.props.language ||
            nextProps.i18n !== this.props.i18n ||
            nextProps.icon !== this.props.icon;
    }
    manuallyTriggerUpload() {
        // utility for the button to manually trigger upload
        // using the ref when it is disabled
        if (this.dropzoneRef.current) {
            this.dropzoneRef.current.open();
        }
    }
    componentWillUnmount() {
        // revoke urls on unmount
        Object.keys(this.ownedObjectURLPool).forEach((id) => {
            URL.revokeObjectURL(this.ownedObjectURLPool[id]);
        });
    }
    onDropAccepted(files) {
        // when a drop is accepted, let's check, if it's a single file
        const singleFile = this.props.property.getMaxLength() === 1;
        // let's get the object urls of the files added
        const newFiles = files.map((file) => {
            const objectURL = URL.createObjectURL(file);
            const id = "FILE" + uuid_1.default.v4().replace(/-/g, "");
            this.ownedObjectURLPool[id] = objectURL;
            return {
                name: file.name,
                type: file.type,
                id,
                url: objectURL,
                size: file.size,
                src: file,
            };
        });
        const newInternalFiles = newFiles.map((value) => {
            return {
                value,
            };
        });
        // call the onchange, as replacing or as concatenating depending
        // on whether it is a single file or not
        this.props.onChange((singleFile ? [] : this.props.state.value || [])
            .concat(newFiles), (singleFile ? [] : this.props.state.internalValue || [])
            .concat(newInternalFiles));
    }
    onDropRejected(files) {
        // let's get the object urls of the files added
        const newFiles = files.map((file) => {
            const objectURL = URL.createObjectURL(file);
            const id = "FILE" + uuid_1.default.v4().replace(/-/g, "");
            this.ownedObjectURLPool[id] = objectURL;
            return {
                name: file.name,
                type: file.type,
                id,
                url: objectURL,
                size: file.size,
                src: file,
            };
        });
        // we need to create our internal values with the rejection and the reason of why
        // they were rejected
        const newInternalValueData = newFiles.map((value) => {
            // check if it's images we are accepting
            const isImage = (this.props.property.getSpecialProperty("accept") || "").startsWith("image");
            // the reason by default is that is an invalid type
            let reason = isImage ? "image_uploader_invalid_type" : "file_uploader_invalid_type";
            // but if the file is too large
            if (value.size > constants_1.MAX_FILE_SIZE) {
                // change it to that
                reason = isImage ? "image_uploader_file_too_big" : "file_uploader_file_too_big";
            }
            return {
                value,
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
        let valueAsInternal = singleFile ? [] : this.props.state.internalValue;
        if (!valueAsInternal && this.props.state.value) {
            valueAsInternal = this.props.state.value.map((value) => {
                return { value };
            });
        }
        else if (!valueAsInternal) {
            valueAsInternal = [];
        }
        // by the same logic the onchange set it to null
        // replacing an existant file if there was one
        this.props.onChange(singleFile ? null : this.props.state.value, valueAsInternal.concat(newInternalValueData));
    }
    openFile(value, e) {
        // open a file, let's stop the propagation
        // for some reason it's not possible to set the window title
        e.stopPropagation();
        e.preventDefault();
        window.open(value.url, "_blank");
    }
    onRemoveFile(value, e) {
        // stop the propagation and stuff
        e.stopPropagation();
        e.preventDefault();
        // revoke the url and remove it from the pool
        if (this.ownedObjectURLPool[value.id]) {
            URL.revokeObjectURL(this.ownedObjectURLPool[value.id]);
            delete this.ownedObjectURLPool[value.id];
        }
        // let's get the index in the internal value
        const indexInInternalValue = (this.props.state.internalValue || []).findIndex((internalValue) => internalValue.value.id === value.id);
        // this will be the new value
        let newInternalValue = this.props.state.internalValue;
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
        const indexInValue = (this.props.state.value || []).findIndex((standardValue) => standardValue.id === value.id);
        let newValue = this.props.state.value;
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
    render() {
        // getting the basic data
        const i18nData = this.props.property.getI18nDataFor(this.props.language);
        const i18nLabel = i18nData && i18nData.label;
        const i18nDescription = i18nData && i18nData.description;
        const i18nPlaceholder = i18nData && i18nData.placeholder;
        // getting the icon
        const icon = this.props.icon;
        const iconComponent = icon ? (<core_1.Icon classes={{ root: this.props.classes.icon }}>{icon}</core_1.Icon>) : null;
        // whether it is a single file
        const singleFile = this.props.property.getMaxLength() === 1;
        // whether we are expecting images only
        const isExpectingImages = (this.props.property.getSpecialProperty("accept") || "").startsWith("image");
        // the placeholder when active
        let placeholderActive = singleFile ?
            this.props.i18n[this.props.language].file_uploader_placeholder_active_single :
            this.props.i18n[this.props.language].file_uploader_placeholder_active;
        if (isExpectingImages) {
            placeholderActive = singleFile ?
                this.props.i18n[this.props.language].image_uploader_placeholder_active_single :
                this.props.i18n[this.props.language].image_uploader_placeholder_active;
        }
        // the invalid reason
        const invalidReason = this.props.state.invalidReason;
        let i18nInvalidReason = null;
        if ((this.props.poked || this.props.state.userSet) &&
            invalidReason && i18nData &&
            i18nData.error && i18nData.error[invalidReason]) {
            i18nInvalidReason = i18nData.error[invalidReason];
        }
        // what are we accepting, note that "image" will trasnlate to the
        // supported browser image types
        let accept = this.props.property.getSpecialProperty("accept");
        if (accept === "image") {
            accept = constants_1.FILE_SUPPORTED_IMAGE_TYPES;
        }
        // the value from the internal source, either recreated or from the internal value
        let valueAsInternal = this.props.state.internalValue;
        if (!valueAsInternal && this.props.state.value) {
            valueAsInternal = this.props.state.value.map((value) => ({ value }));
        }
        else if (!valueAsInternal) {
            valueAsInternal = [];
        }
        // return the component itself
        return (<div className={this.props.classes.container}>
        <core_1.FormLabel aria-label={i18nLabel} classes={{
            root: this.props.classes.label + " " + this.props.classes.labelSingleLine,
            focused: "focused",
        }}>
          {i18nLabel}{iconComponent}
        </core_1.FormLabel>
        {i18nDescription ? <div className={this.props.classes.description}>
          {i18nDescription}
        </div> : null}
        <react_dropzone_1.default onDropAccepted={this.onDropAccepted} onDropRejected={this.onDropRejected} maxSize={constants_1.MAX_FILE_SIZE} accept={accept} multiple={!singleFile} noClick={singleFile && valueAsInternal.length === 1} ref={this.dropzoneRef} disabled={this.props.state.enforced}>
          {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, }) => {
            const { ref, ...rootProps } = getRootProps();
            const files = valueAsInternal.map((value, index) => {
                const isSupportedImage = value.value.type.indexOf("image/") === 0 &&
                    constants_1.FILE_SUPPORTED_IMAGE_TYPES.includes(value.value.type);
                const mainFileClassName = this.props.classes.file +
                    (value.rejected ? " " + this.props.classes.fileRejected : "");
                if (isSupportedImage) {
                    let toUseURL = value.value.url;
                    if (toUseURL.indexOf("blob:") !== 0) {
                        const objectURL = this.ownedObjectURLPool[value.value.id];
                        if (objectURL) {
                            toUseURL = objectURL;
                        }
                    }
                    let reduceSizeURL = toUseURL;
                    if (reduceSizeURL.indexOf("blob:") !== 0 &&
                        value.value.type.indexOf("svg") !== 0) {
                        const splittedURL = reduceSizeURL.split("/");
                        const fileName = splittedURL.pop();
                        const baseURL = splittedURL.join("/");
                        const fileNameDotSplitted = fileName.split(".");
                        fileNameDotSplitted.pop();
                        const recoveredFileName = fileNameDotSplitted.join(".");
                        const fileNameWithoutExtension = recoveredFileName === "" ?
                            fileName :
                            recoveredFileName;
                        if (singleFile) {
                            reduceSizeURL = baseURL + "/medium_" + fileNameWithoutExtension + ".jpg";
                        }
                        else {
                            reduceSizeURL = baseURL + "/small_" + fileNameWithoutExtension + ".jpg";
                        }
                    }
                    return (<div className={mainFileClassName} key={index} onClick={this.openFile.bind(this, value.value)}>
                    <div className={this.props.classes.fileDataContainer}>
                      <img src={reduceSizeURL} className={this.props.classes.imageThumbnail}/>
                      {!singleFile ? <core_1.IconButton className={this.props.classes.fileDeleteButton} onClick={this.onRemoveFile.bind(this, value.value)}>
                        <core_1.Icon>remove_circle</core_1.Icon>
                      </core_1.IconButton> : null}
                    </div>
                    <p className={this.props.classes.fileName}>{value.value.name}</p>
                    <p className={this.props.classes.fileSize}>({pretty_bytes_1.default(value.value.size)})</p>
                    {value.rejected ? <p className={this.props.classes.fileRejectedDescription}>
                      {util_1.localeReplacer(this.props.i18n[this.props.language][value.reason], pretty_bytes_1.default(constants_1.MAX_FILE_SIZE))}
                    </p> : null}
                  </div>);
                }
                else {
                    return (<div className={mainFileClassName} key={index} onClick={this.openFile.bind(this, value.value)}>
                    <div className={this.props.classes.fileDataContainer}>
                      <core_1.Icon className={this.props.classes.fileIcon}>insert_drive_file</core_1.Icon>
                      <span className={this.props.classes.fileMimeType}>{util_1.mimeTypeToExtension(value.value.type)}</span>
                      {!singleFile ? <core_1.IconButton className={this.props.classes.fileDeleteButton} onClick={this.onRemoveFile.bind(this, value.value)}>
                        <core_1.Icon>remove_circle</core_1.Icon>
                      </core_1.IconButton> : null}
                    </div>
                    <p className={this.props.classes.fileName}>{value.value.name}</p>
                    <p className={this.props.classes.fileSize}>({pretty_bytes_1.default(value.value.size)})</p>
                    {value.rejected ? <p className={this.props.classes.fileRejectedDescription}>
                      {util_1.localeReplacer(this.props.i18n[this.props.language][value.reason], pretty_bytes_1.default(constants_1.MAX_FILE_SIZE))}
                    </p> : null}
                  </div>);
                }
            });
            return (<core_1.RootRef rootRef={ref}>
                <core_1.Paper {...rootProps} classes={{
                root: `${this.props.classes.filesPaper} ${singleFile ?
                    this.props.classes.filesPaperSingleFile : ""}`,
            }}>
                  <input {...getInputProps()}/>
                  {files}
                  {(this.props.property.getMaxLength() === 1 &&
                valueAsInternal.length === 1) ? null :
                <div className={`${this.props.classes.filesPlaceholder} ${isDragAccept ?
                    this.props.classes.filesPlaceholderAccepting : ""} ${isDragReject ?
                    this.props.classes.filesPlaceholderRejecting : ""}`}>
                      {!valueAsInternal.length ? <p>{isDragActive ? placeholderActive : i18nPlaceholder}</p> : null}
                      <core_1.Icon className={this.props.classes.filesIconAdd}>note_add</core_1.Icon>
                    </div>}
                  {singleFile && valueAsInternal.length === 1 ? <div className={this.props.classes.filesSingleFileButtonContainer}>
                      <core_1.Button className={this.props.classes.filesSingleFileButton} variant="contained" color="secondary" onClick={this.onRemoveFile.bind(this, valueAsInternal[0].value)}>
                        {isExpectingImages ?
                this.props.i18n[this.props.language].image_uploader_delete_file :
                this.props.i18n[this.props.language].file_uploader_delete_file}
                        <core_1.Icon className={this.props.classes.filesSingleFileButtonIcon}>remove_circle_outline</core_1.Icon>
                      </core_1.Button>
                      <core_1.Button className={this.props.classes.filesSingleFileButton} variant="contained" color="primary" onClick={this.manuallyTriggerUpload}>
                        {isExpectingImages ?
                this.props.i18n[this.props.language].image_uploader_select_file :
                this.props.i18n[this.props.language].file_uploader_select_file}
                        <core_1.Icon className={this.props.classes.filesSingleFileButtonIcon}>cloud_upload</core_1.Icon>
                      </core_1.Button>
                    </div> : null}
                </core_1.Paper>
              </core_1.RootRef>);
        }}
        </react_dropzone_1.default>
        <div className={this.props.classes.errorMessage}>
          {i18nInvalidReason}
        </div>
      </div>);
    }
}
exports.default = PropertyEntryFiles;
