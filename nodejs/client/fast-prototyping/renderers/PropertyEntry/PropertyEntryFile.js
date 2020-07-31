"use strict";
/**
 * Contains the fast prototyping element for renering a file entry
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mui_core_1 = require("../../mui-core");
const constants_1 = require("../../../../constants");
const react_dropzone_1 = __importDefault(require("react-dropzone"));
const react_1 = __importDefault(require("react"));
const localization_1 = require("../../../components/localization");
/**
 * A simple helper function that says when it should show invalid
 * @param props the renderer props
 * @returns a boolean on whether is invalid
 */
function shouldShowInvalid(props) {
    return !props.currentValid;
}
/**
 * the styles for the file entry
 */
exports.style = mui_core_1.createStyles({
    entry: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    container: {
        width: "100%",
    },
    description: {
        width: "100%",
    },
    errorMessage: {
        color: "#f44336",
        height: "1.3rem",
        fontSize: "0.85rem",
    },
    icon: {
        color: "#424242",
    },
    label: (props) => ({
        "color": shouldShowInvalid(props) ? "#f44336" : "rgb(66, 66, 66)",
        "width": "100%",
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "space-between",
        "&.focused": {
            color: shouldShowInvalid(props) ? "#f44336" : "#3f51b5",
        },
    }),
    fileDeleteButton: {
        top: "-25px",
        right: 0,
        position: "absolute",
    },
    fileRejectedDescription: {
        width: "100%",
        textAlign: "center",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontSize: "0.75rem",
    },
    paper: {
        marginTop: "5px",
        backgroundColor: "rgba(0, 0, 0, 0.09)",
        width: "100%",
        minHeight: "200px",
        height: "auto",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        cursor: "pointer",
        position: "relative",
        padding: "20px 20px calc(2.5rem + 20px) 20px",
        flexWrap: "wrap",
    },
    paperPlaceholder: {
        flexGrow: 2,
        display: "block",
        textAlign: "center",
        fontSize: "1rem",
        userSelect: "none",
        color: "rgb(117, 117, 117)",
        borderRadius: "25px",
        border: "dotted 2px #ccc",
        padding: "25px 0",
        margin: "0 25px",
    },
    paperPlaceholderAccepting: {
        borderColor: "#42a5f5",
    },
    paperPlaceholderRejecting: {
        borderColor: "#f44336",
    },
    paperIconAdd: {
        opacity: 0.1,
        fontSize: "100px",
    },
    buttonContainer: {
        position: "absolute",
        bottom: "0",
        left: "0",
        right: "0",
        display: "flex",
    },
    button: {
        flexGrow: 1,
        height: "2.5rem",
    },
    buttonIcon: {
        marginLeft: "0.75rem",
    },
});
/**
 * Simple function that binds the onSetFile function from the handler
 * and triggers when the dropzone receives files
 * @param onSetFile the on set file function from the handler
 * @param files the files the dropper got
 */
function onDrop(onSetFile, files) {
    onSetFile(files[0]);
}
/**
 * trigger the upload manually
 * @param dropzoneRef the dropzone reference
 */
function manuallyTriggerUpload(dropzoneRef) {
    // utility for the button to manually trigger upload
    // using the ref when it is disabled
    if (dropzoneRef.current) {
        dropzoneRef.current.open();
    }
}
/**
 * The property entry file renderer, allows to set and upload a single file in its
 * form, support both images and standard files
 * @param props the entry props
 * @returns a react element
 */
const PropertyEntryFileRenderer = mui_core_1.withStyles(exports.style)((props) => {
    const dropzoneRef = react_1.default.useRef();
    let icon;
    if (props.canRestore) {
        if (props.currentAppliedValue) {
            icon = react_1.default.createElement(mui_core_1.RestoreIcon, null);
        }
        else {
            icon = react_1.default.createElement(mui_core_1.ClearIcon, null);
        }
    }
    else if (props.icon) {
        icon = props.icon;
    }
    const descriptionAsAlert = props.args["descriptionAsAlert"];
    return (react_1.default.createElement("div", { className: props.classes.container },
        props.description && descriptionAsAlert ? react_1.default.createElement(mui_core_1.Alert, { severity: "info", className: props.classes.description }, props.description) : null,
        props.description && !descriptionAsAlert ? react_1.default.createElement(mui_core_1.Typography, { variant: "caption", className: props.classes.description }, props.description) : null,
        react_1.default.createElement(mui_core_1.FormLabel, { "aria-label": props.label, classes: {
                root: props.classes.label,
                focused: "focused",
            } },
            localization_1.capitalize(props.label),
            icon ? react_1.default.createElement(mui_core_1.IconButton, { tabIndex: -1, className: props.classes.icon, onClick: props.canRestore ? props.onRestore : null }, icon) : null),
        react_1.default.createElement(react_dropzone_1.default, { onDropAccepted: onDrop.bind(null, props.onSetFile), onDropRejected: onDrop.bind(null, props.onSetFile), maxSize: constants_1.MAX_FILE_SIZE, accept: props.accept, multiple: false, noClick: !!props.currentValue, ref: dropzoneRef, disabled: props.disabled }, ({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, }) => {
            const { ref, ...rootProps } = getRootProps();
            let displayContent = null;
            if (props.currentValue) {
                const mainFileClassName = "file" +
                    (props.rejected ? " rejected" : "");
                displayContent = (react_1.default.createElement("div", { className: mainFileClassName, onClick: props.openFile.bind(null, props.currentValue) },
                    react_1.default.createElement("div", { className: "file-container" },
                        props.isSupportedImage ? (react_1.default.createElement("img", { srcSet: props.imageSrcSet, sizes: "100px", src: props.currentValue.url, className: "thumbnail" })) : (react_1.default.createElement("div", { className: "file-icon" },
                            react_1.default.createElement("span", { className: "file-extension" }, props.extension))),
                        react_1.default.createElement("p", { className: "file-name" }, props.currentValue.name),
                        react_1.default.createElement("p", { className: "file-size" }, props.prettySize),
                        props.rejected ? react_1.default.createElement("p", { className: props.classes.fileRejectedDescription }, props.rejectedReason) : null)));
            }
            else {
                displayContent = (react_1.default.createElement("div", { className: `${props.classes.paperPlaceholder} ${isDragAccept ?
                        props.classes.paperPlaceholderAccepting : ""} ${isDragReject ?
                        props.classes.paperPlaceholderRejecting : ""}` },
                    react_1.default.createElement("p", null, isDragActive ? localization_1.capitalize(props.genericActivePlaceholder) : localization_1.capitalize(props.placeholder)),
                    react_1.default.createElement(mui_core_1.NoteAddIcon, { className: props.classes.paperIconAdd })));
            }
            return (react_1.default.createElement(mui_core_1.RootRef, { rootRef: ref },
                react_1.default.createElement(mui_core_1.Paper, Object.assign({}, rootProps, { classes: {
                        root: props.classes.paper,
                    } }),
                    react_1.default.createElement("input", Object.assign({}, getInputProps())),
                    displayContent,
                    react_1.default.createElement("div", { className: props.classes.buttonContainer },
                        react_1.default.createElement(mui_core_1.Button, { className: props.classes.button, variant: "contained", color: "secondary", "aria-label": props.genericDeleteLabel, onClick: props.onRemoveFile },
                            props.genericDeleteLabel,
                            react_1.default.createElement(mui_core_1.RemoveCircleOutlineIcon, { className: props.classes.buttonIcon })),
                        react_1.default.createElement(mui_core_1.Button, { className: props.classes.button, variant: "contained", color: "primary", "aria-label": props.genericSelectLabel, onClick: manuallyTriggerUpload.bind(null, dropzoneRef) },
                            props.genericSelectLabel,
                            react_1.default.createElement(mui_core_1.CloudUploadIcon, { className: props.classes.buttonIcon }))))));
        }),
        react_1.default.createElement("div", { className: props.classes.errorMessage }, props.currentInvalidReason)));
});
exports.default = PropertyEntryFileRenderer;
