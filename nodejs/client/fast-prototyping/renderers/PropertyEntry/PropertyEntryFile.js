"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/styles");
const styles_2 = require("./styles");
const core_1 = require("@material-ui/core");
const RemoveCircleOutline_1 = __importDefault(require("@material-ui/icons/RemoveCircleOutline"));
const CloudUpload_1 = __importDefault(require("@material-ui/icons/CloudUpload"));
const NoteAdd_1 = __importDefault(require("@material-ui/icons/NoteAdd"));
const constants_1 = require("../../../../constants");
const react_dropzone_1 = __importDefault(require("react-dropzone"));
const react_1 = __importDefault(require("react"));
const localization_1 = require("../../../components/localization");
const lab_1 = require("@material-ui/lab");
const Restore_1 = __importDefault(require("@material-ui/icons/Restore"));
const Clear_1 = __importDefault(require("@material-ui/icons/Clear"));
// TODO it's missing the icon
function shouldShowInvalid(props) {
    return !props.currentValid;
}
exports.style = (theme) => styles_1.createStyles({
    entry: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    container: {
        width: theme.containerWidth,
    },
    description: {
        width: "100%",
    },
    errorMessage: {
        color: theme.invalidColor,
        height: theme.errorMessageContainerSize,
        fontSize: theme.errorMessageFontSize,
    },
    icon: (props) => ({
        color: shouldShowInvalid(props) ? theme.invalidColor : theme.iconColor,
    }),
    label: (props) => ({
        "color": shouldShowInvalid(props) ? theme.labelInvalidColor : theme.labelColor,
        "width": "100%",
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "space-between",
        "&.focused": {
            color: shouldShowInvalid(props) ? theme.labelInvalidFocusedColor : theme.labelFocusedColor,
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
function onDrop(onSetFile, files) {
    onSetFile(files[0]);
}
function manuallyTriggerUpload(dropzoneRef) {
    // utility for the button to manually trigger upload
    // using the ref when it is disabled
    if (dropzoneRef.current) {
        dropzoneRef.current.open();
    }
}
const ActualPropertyEntryFileRendererWithStyles = styles_1.withStyles(exports.style)((props) => {
    const dropzoneRef = react_1.default.useRef();
    let icon;
    if (props.canRestore) {
        if (props.currentAppliedValue) {
            icon = react_1.default.createElement(Restore_1.default, null);
        }
        else {
            icon = react_1.default.createElement(Clear_1.default, null);
        }
    }
    else if (props.icon) {
        icon = props.icon;
    }
    const descriptionAsAlert = props.args["descriptionAsAlert"];
    return (react_1.default.createElement("div", { className: props.classes.container },
        props.description && descriptionAsAlert ? react_1.default.createElement(lab_1.Alert, { severity: "info", className: props.classes.description }, props.description) : null,
        props.description && !descriptionAsAlert ? react_1.default.createElement(core_1.Typography, { variant: "caption", className: props.classes.description }, props.description) : null,
        react_1.default.createElement(core_1.FormLabel, { "aria-label": props.label, classes: {
                root: props.classes.label,
                focused: "focused",
            } },
            localization_1.capitalize(props.label),
            icon ? react_1.default.createElement(core_1.IconButton, { tabIndex: -1, className: props.classes.icon, onClick: props.canRestore ? props.onRestore : null }, icon) : null),
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
                    react_1.default.createElement(NoteAdd_1.default, { className: props.classes.paperIconAdd })));
            }
            return (react_1.default.createElement(core_1.RootRef, { rootRef: ref },
                react_1.default.createElement(core_1.Paper, Object.assign({}, rootProps, { classes: {
                        root: props.classes.paper,
                    } }),
                    react_1.default.createElement("input", Object.assign({}, getInputProps())),
                    displayContent,
                    react_1.default.createElement("div", { className: props.classes.buttonContainer },
                        react_1.default.createElement(core_1.Button, { className: props.classes.button, variant: "contained", color: "secondary", "aria-label": props.genericDeleteLabel, onClick: props.onRemoveFile },
                            props.genericDeleteLabel,
                            react_1.default.createElement(RemoveCircleOutline_1.default, { className: props.classes.buttonIcon })),
                        react_1.default.createElement(core_1.Button, { className: props.classes.button, variant: "contained", color: "primary", "aria-label": props.genericSelectLabel, onClick: manuallyTriggerUpload.bind(null, dropzoneRef) },
                            props.genericSelectLabel,
                            react_1.default.createElement(CloudUpload_1.default, { className: props.classes.buttonIcon }))))));
        }),
        react_1.default.createElement("div", { className: props.classes.errorMessage }, props.currentInvalidReason)));
});
function PropertyEntryFileRenderer(props) {
    let appliedTheme = styles_2.STANDARD_THEME;
    if (props.args["theme"]) {
        appliedTheme = {
            ...styles_2.STANDARD_THEME,
            ...props.args["theme"],
        };
    }
    return (react_1.default.createElement(core_1.ThemeProvider, { theme: appliedTheme },
        react_1.default.createElement(ActualPropertyEntryFileRendererWithStyles, Object.assign({}, props))));
}
exports.default = PropertyEntryFileRenderer;
