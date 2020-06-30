"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../internal/theme/quill.scss");
const react_1 = __importDefault(require("react"));
const mui_core_1 = require("../../mui-core");
const uuid_1 = __importDefault(require("uuid"));
const util_1 = require("../../../../util");
const constants_1 = require("../../../../constants");
const dialog_1 = require("../../components/dialog");
const pretty_bytes_1 = __importDefault(require("pretty-bytes"));
const react_textarea_autosize_1 = __importDefault(require("react-textarea-autosize"));
const util_2 = require("../../components/util");
let ReactQuill;
if (typeof document !== "undefined") {
    ReactQuill = require("@onzag/react-quill");
}
else {
    const dead = () => null;
    ReactQuill = {
        Quill: {
            import: dead,
            register: dead,
        }
    };
}
const BlockEmbed = ReactQuill.Quill.import("blots/block/embed");
const Embed = ReactQuill.Quill.import("blots/embed");
const Delta = ReactQuill.Quill.import("delta");
class ItemizeImageBlot extends BlockEmbed {
    static create(value) {
        if (value === null) {
            return null;
        }
        const width = value.srcWidth;
        const height = value.srcHeight;
        const ratio = height / width;
        const percentage = ratio * 100;
        const mainContainer = super.create();
        mainContainer.className = "image";
        const parentContainer = document.createElement("div");
        parentContainer.className = "image-container";
        mainContainer.appendChild(parentContainer);
        const childContainer = document.createElement("div");
        childContainer.className = "image-pad";
        childContainer.setAttribute("style", "padding-bottom: " + percentage + "%");
        parentContainer.appendChild(childContainer);
        const img = document.createElement("img");
        childContainer.appendChild(img);
        img.setAttribute("alt", value.alt || "");
        img.dataset.srcHeight = value.srcHeight.toString();
        img.dataset.srcId = value.srcId;
        img.dataset.srcWidth = value.srcWidth.toString();
        img.setAttribute("sizes", value.sizes || "");
        img.setAttribute("src", value.src || "");
        img.setAttribute("srcset", value.srcSet || "");
        return mainContainer;
    }
    static value(node) {
        const img = node.querySelector("img");
        if (!img) {
            return null;
        }
        return {
            alt: img.getAttribute("alt") || null,
            src: img.getAttribute("src"),
            srcId: img.dataset.srcId,
            srcSet: img.getAttribute("srcset") || null,
            sizes: img.getAttribute("sizes") || null,
            srcWidth: parseInt(img.dataset.srcWidth) || null,
            srcHeight: parseInt(img.dataset.srcHeight) || null,
        };
    }
}
ItemizeImageBlot.blotName = "itemizeimage";
ItemizeImageBlot.className = "image";
ItemizeImageBlot.tagName = "div";
ReactQuill.Quill.register(ItemizeImageBlot);
class ItemizeVideoBlot extends BlockEmbed {
    static create(value) {
        if (value === null) {
            return null;
        }
        const mainContainer = super.create();
        mainContainer.className = "video";
        const parentContainer = document.createElement("div");
        parentContainer.className = "video-container";
        mainContainer.appendChild(parentContainer);
        const iframe = document.createElement("iframe");
        parentContainer.appendChild(iframe);
        iframe.allowFullscreen = true;
        iframe.dataset.videoOrigin = value.origin;
        iframe.dataset.videoSrc = value.src;
        iframe.frameBorder = "0";
        if (value.origin === "youtube") {
            iframe.src = `https://youtube.com/embed/${value.src}?rel=0`;
        }
        else {
            iframe.src = `https://player.vimeo.com/video/${value.src}?title=0&byline=0&portrait=0&badge=0`;
        }
        return mainContainer;
    }
    static value(node) {
        const iframe = node.querySelector("iframe");
        if (!iframe) {
            return null;
        }
        return {
            src: iframe.dataset.videoSrc,
            origin: iframe.dataset.videoOrigin,
        };
    }
}
ItemizeVideoBlot.blotName = "itemizevideo";
ItemizeVideoBlot.className = "video";
ItemizeVideoBlot.tagName = "div";
ReactQuill.Quill.register(ItemizeVideoBlot);
class ItemizeFileBlot extends Embed {
    static create(value) {
        if (value === null) {
            return null;
        }
        const mainContainer = super.create();
        mainContainer.className = "file";
        mainContainer.contentEditable = false;
        mainContainer.dataset.src = value.src;
        mainContainer.dataset.srcId = value.srcId;
        mainContainer.spellcheck = false;
        const parentContainer = document.createElement("span");
        parentContainer.className = "file-container";
        mainContainer.appendChild(parentContainer);
        parentContainer.addEventListener("click", () => {
            if (value.src) {
                window.open(value.src, value.name || "_blank");
            }
        });
        const icon = document.createElement("span");
        icon.className = "file-icon";
        parentContainer.appendChild(icon);
        const extension = document.createElement("span");
        extension.className = "file-extension";
        extension.textContent = value.extension;
        icon.appendChild(extension);
        const name = document.createElement("span");
        name.className = "file-name";
        name.textContent = value.name;
        parentContainer.appendChild(name);
        const size = document.createElement("span");
        size.className = "file-size";
        size.textContent = value.size;
        parentContainer.appendChild(size);
        return mainContainer;
    }
    static value(node) {
        const fileNameNode = node.querySelector(".file-name");
        const fileExtensionNode = node.querySelector(".file-extension");
        const fileSizeNode = node.querySelector(".file-size");
        if (!fileNameNode || !fileExtensionNode || !fileSizeNode) {
            return null;
        }
        return {
            srcId: node.dataset.srcId,
            name: fileNameNode.textContent,
            extension: fileExtensionNode.textContent,
            size: fileSizeNode.textContent,
            src: node.dataset.src,
        };
    }
}
ItemizeFileBlot.blotName = "itemizefile";
ItemizeFileBlot.className = "file";
ItemizeFileBlot.tagName = "span";
ReactQuill.Quill.register(ItemizeFileBlot);
function shouldShowInvalid(props) {
    return !props.currentValid;
}
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
    iconButton: {
        "backgroundColor": "#2196f3",
        "color": "#fff",
        "&:hover": {
            backgroundColor: "#1976d2",
        },
    },
    toolbar: {
        overflow: "auto",
    },
    textButton: {
        border: "solid 1px rgba(0,0,0,0.1)",
        display: "flex",
        minWidth: "50px",
        height: "50px",
        padding: "0 10px",
        margin: "0",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
    },
    label: (props) => ({
        "color": shouldShowInvalid(props) ? "#f44336" : "rgb(66, 66, 66)",
        "&.focused": {
            color: shouldShowInvalid(props) ? "#f44336" : "#3f51b5",
        },
    }),
    labelSingleLine: {
        padding: "1rem 0",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "5rem",
    },
    labelNoToolbar: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "5rem",
        padding: "1rem 0 0 0",
    },
    quill: (props) => {
        const shouldShowInvalidQuill = shouldShowInvalid(props);
        return {
            "position": "relative",
            // this is the colur when the field is out of focus
            "&::before": {
                left: 0,
                right: 0,
                bottom: 0,
                content: "'\\00a0'",
                position: "absolute",
                transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                borderBottom: "1px solid " +
                    (shouldShowInvalidQuill ? "#e57373" : "rgba(0,0,0,0.42)"),
                pointerEvents: "none",
            },
            // the color that pops up when the field is in focus
            "&::after": {
                left: 0,
                bottom: 0,
                right: 0,
                content: "''",
                position: "absolute",
                transform: "scaleX(0)",
                transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
                borderBottom: "2px solid " +
                    (shouldShowInvalidQuill ? "#f44336" : "#3f51b5"),
                pointerEvents: "none",
            },
            // during the hover event
            "&.focused::after": {
                transform: "none",
            },
        };
    },
    rawTextArea: {
        width: "100%",
        border: "none",
        outline: "none",
        boxShadow: "none",
        resize: "none",
        padding: "12px 15px",
        fontFamily: "'" + window.FONT_NAME + "', sans-serif",
        fontSize: "1rem",
        overflow: "hidden",
    }
});
function RichTextEditorToolbar(props) {
    return (react_1.default.createElement(mui_core_1.Toolbar, { id: props.id, className: props.className },
        props.supportsBasicMode ? react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(mui_core_1.IconButton, { tabIndex: -1, title: props.i18n.formatBoldLabel, classes: { root: "ql-bold" } },
                react_1.default.createElement(mui_core_1.FormatBoldIcon, null)),
            react_1.default.createElement(mui_core_1.IconButton, { tabIndex: -1, title: props.i18n.formatItalicLabel, classes: { root: "ql-italic" } },
                react_1.default.createElement(mui_core_1.FormatItalicIcon, null)),
            react_1.default.createElement(mui_core_1.IconButton, { tabIndex: -1, title: props.i18n.formatUnderlineLabel, classes: { root: "ql-underline" } },
                react_1.default.createElement(mui_core_1.FormatUnderlinedIcon, null)),
            react_1.default.createElement(mui_core_1.IconButton, { tabIndex: -1, title: props.i18n.formatTitleLabel, classes: { root: "ql-header" }, value: "1" },
                react_1.default.createElement(mui_core_1.TitleIcon, null)),
            react_1.default.createElement("span", { className: "ql-divider" }),
            react_1.default.createElement(mui_core_1.IconButton, { tabIndex: -1, title: props.i18n.formatQuoteLabel, classes: { root: "ql-blockquote" } },
                react_1.default.createElement(mui_core_1.FormatQuoteIcon, null)),
            react_1.default.createElement("span", { className: "ql-divider" }),
            react_1.default.createElement(mui_core_1.IconButton, { tabIndex: -1, title: props.i18n.formatListNumberedLabel, classes: { root: "ql-list" }, value: "ordered" },
                react_1.default.createElement(mui_core_1.FormatListNumberedIcon, null)),
            react_1.default.createElement(mui_core_1.IconButton, { tabIndex: -1, title: props.i18n.formatListBulletedLabel, classes: { root: "ql-list" }, value: "bullet" },
                react_1.default.createElement(mui_core_1.FormatListBulletedIcon, null)),
            props.supportsImages || props.supportsFiles ?
                (react_1.default.createElement("span", { className: "ql-divider" })) : null,
            props.supportsImages ?
                (react_1.default.createElement(mui_core_1.IconButton, { tabIndex: -1, title: props.i18n.formatAddImageLabel, classes: { root: "ql-image" } },
                    react_1.default.createElement(mui_core_1.InsertPhotoIcon, null))) : null,
            props.supportsVideos ?
                (react_1.default.createElement(mui_core_1.IconButton, { tabIndex: -1, title: props.i18n.formatAddVideoLabel, classes: { root: "ql-video" } },
                    react_1.default.createElement(mui_core_1.VideoLibraryIcon, null))) : null,
            props.supportsFiles ?
                (react_1.default.createElement(mui_core_1.IconButton, { tabIndex: -1, title: props.i18n.formatAddFileLabel, classes: { root: "ql-file" } },
                    react_1.default.createElement(mui_core_1.AttachFileIcon, null))) : null) : null,
        props.supportsRawMode ?
            (react_1.default.createElement(mui_core_1.IconButton, { tabIndex: -1, onClick: props.onToggleRawMode },
                react_1.default.createElement(mui_core_1.CodeIcon, null))) : null));
}
const CACHED_FORMATS_RICH = ["bold", "italic", "underline", "header", "blockquote", "list", "itemizeimage", "itemizevideo", "itemizefile"];
// const CACHED_CLIPBOARD_MATCHERS: ReactQuill.ClipboardMatcher[] = [
const CACHED_CLIPBOARD_MATCHERS = [
    [typeof Node !== "undefined" ? Node.ELEMENT_NODE : null, collapseToPlainTextMatcher],
];
function collapseToPlainTextMatcher(node) {
    return new Delta().insert(node.textContent);
}
class ActualPropertyEntryTextRenderer extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        // whether it is focused or not
        this.state = {
            focused: false,
            requestingVideoLink: false,
            invalidVideoLink: false,
            currentVideoLink: "",
            rawMode: false,
            isReadyToType: false,
        };
        this.uuid = "uuid-" + uuid_1.default.v4();
        this.inputImageRef = react_1.default.createRef();
        this.quillRef = react_1.default.createRef();
        this.textAreaRef = react_1.default.createRef();
        this.fileInputRef = react_1.default.createRef();
        // basic functions
        this.onChange = this.onChange.bind(this);
        this.beforeChange = this.beforeChange.bind(this);
        this.onChangeByTextarea = this.onChangeByTextarea.bind(this);
        this.addPasteEventOnEditor = this.addPasteEventOnEditor.bind(this);
        this.focusIfNecessary = this.focusIfNecessary.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.customImageHandler = this.customImageHandler.bind(this);
        this.customVideoHandler = this.customVideoHandler.bind(this);
        this.customFileHandler = this.customFileHandler.bind(this);
        this.closeVideoRequesting = this.closeVideoRequesting.bind(this);
        this.onImageLoad = this.onImageLoad.bind(this);
        this.onFileLoad = this.onFileLoad.bind(this);
        this.submitVideoLink = this.submitVideoLink.bind(this);
        this.updateCurrentVideoLink = this.updateCurrentVideoLink.bind(this);
        this.onFileLoad = this.onFileLoad.bind(this);
        this.toggleRawMode = this.toggleRawMode.bind(this);
        this.cachedModuleOptionsRich = {
            toolbar: {
                container: "#" + this.uuid,
                handlers: {
                    image: this.customImageHandler,
                    video: this.customVideoHandler,
                    file: this.customFileHandler,
                },
            },
            clipboard: {
                matchVisual: false,
                matchers: CACHED_CLIPBOARD_MATCHERS,
            }
        };
    }
    toggleRawMode() {
        this.setState({
            rawMode: !this.state.rawMode,
        });
    }
    componentDidMount() {
        // double pass for SSR
        this.setState({
            isReadyToType: true,
        }, () => {
            this.focusIfNecessary();
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if ((prevProps.isRichText && !this.props.isRichText) ||
            (prevState.isReadyToType !== this.state.isReadyToType)) {
            this.addPasteEventOnEditor();
        }
    }
    addPasteEventOnEditor() {
        const editor = this.quillRef.current.getEditor();
        // Used any not to jinx SSR
        editor.root.addEventListener('paste', async (e) => {
            const clipboardData = e.clipboardData || window.clipboardData;
            // support cut by software & copy image file directly
            const isImage = clipboardData.types.length && clipboardData.types.join('').includes('Files');
            if (!isImage) {
                return;
            }
            // prevent default quill behaviour
            e.preventDefault();
            e.stopPropagation();
            // only support single image paste
            const file = clipboardData.files[0];
            const data = await this.props.onInsertImage(file);
            // image failed to load
            if (!data) {
                return;
            }
            const range = editor.getSelection(true);
            editor.insertEmbed(range.index, "itemizeimage", {
                alt: null,
                src: data.result.url,
                srcId: data.result.id,
                srcSet: null,
                sizes: null,
                srcWidth: data.width,
                srcHeight: data.height,
            }, ReactQuill.Quill.sources.USER);
            editor.setSelection(range.index + 2, 0, ReactQuill.Quill.sources.SILENT);
        });
    }
    onChangeByTextarea(e) {
        const value = e.target.value || null;
        this.props.onChange(value, null);
    }
    // public onChange(value: string, delta: any, sources: string, editor: ReactQuill.UnprivilegedEditor) {
    onChange(value, delta, sources, editor) {
        // on change, these values are basically empty
        // so we set to null, however in some circumstances
        // they are unavoidable, use a value larger than 1 for min
        // if the field is not nullable
        if (value === "<p><br></p>" ||
            value === "<p><span class=\"ql-cursor\">\ufeff</span></p>") {
            // prevent this change where it changes to the same value on focus
            if (this.props.currentValue !== null) {
                if (window) {
                    window[constants_1.LAST_RICH_TEXT_CHANGE_LENGTH] = 0;
                }
                this.props.onChange(null, null);
            }
            return;
        }
        else if (window) {
            const actualLenght = editor.getText().replace(/\n/g, "").length;
            window[constants_1.LAST_RICH_TEXT_CHANGE_LENGTH] = actualLenght;
        }
        this.props.onChange(value, null);
    }
    beforeChange(value, delta, source, editor) {
        if (source === "api") {
            const customElem = document.createElement("div");
            customElem.innerHTML = value;
            const customElem2 = document.createElement("div");
            const editorValue = this.props.currentValue || "";
            customElem2.innerHTML = editorValue;
            return !customElem.isEqualNode(customElem2);
        }
        return true;
    }
    /**
     * This image handler is not binded due to quill existing in the this namespace
     */
    customImageHandler() {
        this.inputImageRef.current.click();
    }
    customFileHandler() {
        this.fileInputRef.current.click();
    }
    customVideoHandler() {
        this.setState({
            currentVideoLink: "",
            invalidVideoLink: false,
            requestingVideoLink: true,
        });
    }
    closeVideoRequesting() {
        this.setState({
            requestingVideoLink: false,
        });
    }
    updateCurrentVideoLink(e) {
        let isValid = false;
        try {
            const url = new URL(e.target.value);
            isValid = url.hostname === "youtube.com" || url.hostname === "www.youtube.com" ||
                url.hostname === "player.vimeo.com" || url.hostname === "youtu.be";
        }
        catch {
        }
        this.setState({
            currentVideoLink: e.target.value,
            invalidVideoLink: !isValid,
        });
    }
    submitVideoLink() {
        const quill = this.quillRef.current.getEditor();
        const range = quill.getSelection(true);
        const url = new URL(this.state.currentVideoLink);
        let src;
        let origin;
        if (url.hostname === "youtube.com" ||
            url.hostname === "www.youtube.com" ||
            url.hostname === "youtu.be") {
            origin = "youtube";
            const isClassicYTUrl = (url.hostname === "youtube.com" ||
                url.hostname === "www.youtube.com");
            if (isClassicYTUrl &&
                url.pathname.startsWith("/embed/")) {
                src = url.pathname.split("/")[2];
            }
            else if (isClassicYTUrl &&
                url.pathname.startsWith("/watch")) {
                let search = url.search;
                if (search[0] === "?") {
                    search = search.substr(1);
                }
                search.split("&").forEach((v) => {
                    if (v.startsWith("v=")) {
                        src = v.substr(2);
                    }
                });
            }
            else if (url.hostname === "youtu.be") {
                src = url.pathname.split("/")[1];
            }
        }
        else if (url.host === "player.vimeo.com") {
            origin = "vimeo";
            src = url.pathname.split("/")[2];
        }
        else {
            return;
        }
        quill.insertEmbed(range.index, "itemizevideo", {
            src,
            origin,
        }, ReactQuill.Quill.sources.USER);
        quill.setSelection(range.index + 2, 0, ReactQuill.Quill.sources.SILENT);
        this.closeVideoRequesting();
    }
    onFileLoad(e) {
        const file = e.target.files[0];
        e.target.value = "";
        const fileData = this.props.onInsertFile(file);
        const prettySize = pretty_bytes_1.default(fileData.size);
        const expectedExtension = util_1.mimeTypeToExtension(fileData.type);
        const quill = this.quillRef.current.getEditor();
        const range = quill.getSelection(true);
        try {
            quill.insertEmbed(range.index, "itemizefile", {
                srcId: fileData.id,
                src: fileData.url,
                name: fileData.name,
                extension: expectedExtension,
                size: prettySize,
            }, ReactQuill.Quill.sources.USER);
            quill.setSelection(range.index + 2, 0, ReactQuill.Quill.sources.SILENT);
        }
        catch (err) { }
    }
    async onImageLoad(e) {
        const file = e.target.files[0];
        e.target.value = "";
        let alt = null;
        if (this.props.args["requestAltOnImages"]) {
            alt = prompt("Please write an alt for your image:", "") || null;
        }
        try {
            const data = await this.props.onInsertImage(file);
            const quill = this.quillRef.current.getEditor();
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, "itemizeimage", {
                alt,
                src: data.result.url,
                srcId: data.result.id,
                srcSet: null,
                sizes: null,
                srcWidth: data.width,
                srcHeight: data.height,
            }, ReactQuill.Quill.sources.USER);
            quill.setSelection(range.index + 2, 0, ReactQuill.Quill.sources.SILENT);
        }
        catch (err) {
        }
    }
    focusIfNecessary() {
        if (this.props.autoFocus) {
            if (this.quillRef.current) {
                this.quillRef.current.focus();
            }
            else if (this.textAreaRef.current) {
                this.textAreaRef.current.focus();
            }
        }
    }
    // basically get the state onto its parent of the focus and blur
    onFocus() {
        this.setState({
            focused: true,
        });
    }
    onBlur() {
        this.setState({
            focused: false,
        });
    }
    render() {
        // this is the editor value
        const editorValue = this.props.currentValue || "";
        // the icon as usual
        let icon;
        if (this.props.canRestore) {
            if (this.props.currentAppliedValue) {
                icon = react_1.default.createElement(mui_core_1.RestoreIcon, null);
            }
            else {
                icon = react_1.default.createElement(mui_core_1.ClearIcon, null);
            }
        }
        else if (this.props.icon) {
            icon = this.props.icon;
        }
        const iconComponent = icon ? (react_1.default.createElement(mui_core_1.IconButton, { tabIndex: -1, className: this.props.classes.icon, onClick: this.props.canRestore ? this.props.onRestore : null }, icon)) : null;
        const descriptionAsAlert = this.props.args["descriptionAsAlert"];
        const imageInput = this.props.supportsImages ? (react_1.default.createElement("input", { ref: this.inputImageRef, type: "file", accept: this.props.mediaPropertyAcceptsImages, tabIndex: -1, style: { display: "none" }, autoComplete: "off", onChange: this.onImageLoad })) : null;
        const fileInput = this.props.supportsFiles ? (react_1.default.createElement("input", { ref: this.fileInputRef, type: "file", accept: this.props.mediaPropertyAcceptsFiles, tabIndex: -1, style: { display: "none" }, autoComplete: "off", onChange: this.onFileLoad })) : null;
        const uploadVideoDialog = this.props.supportsVideos ? (react_1.default.createElement(dialog_1.Dialog, { fullScreen: false, open: this.state.requestingVideoLink, onClose: this.closeVideoRequesting, title: this.props.i18nLoadVideo.title, buttons: react_1.default.createElement(mui_core_1.Button, { onClick: this.submitVideoLink }, this.props.i18nLoadVideo.submit) },
            react_1.default.createElement("div", null,
                react_1.default.createElement(mui_core_1.TextField, { fullWidth: true, value: this.state.currentVideoLink, onChange: this.updateCurrentVideoLink, label: this.props.i18nLoadVideo.label, placeholder: this.props.i18nLoadVideo.placeholder }),
                react_1.default.createElement("div", null, this.state.invalidVideoLink ? this.props.i18nLoadVideo.invalid : null)))) : null;
        const fileLoadErrorDialog = (this.props.supportsImages || this.props.supportsFiles) ? (react_1.default.createElement(dialog_1.Dialog, { fullScreen: false, open: !!this.props.lastLoadedFileError, onClose: this.props.dismissLastLoadedFileError, title: util_1.capitalize(this.props.i18nGenericError), buttons: react_1.default.createElement(mui_core_1.Button, { onClick: this.props.dismissLastLoadedFileError }, util_1.capitalize(this.props.i18nOk)) },
            react_1.default.createElement(mui_core_1.Typography, null, this.props.lastLoadedFileError))) : null;
        const quill = this.state.isReadyToType ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(RichTextEditorToolbar, { id: this.uuid, i18n: this.props.i18nFormat, supportsImages: this.props.supportsImages, supportsFiles: this.props.supportsFiles, supportsVideos: this.props.supportsVideos, supportsBasicMode: true, className: this.props.classes.toolbar, supportsRawMode: this.props.args.supportsRawMode, onToggleRawMode: this.toggleRawMode }),
            react_1.default.createElement(ReactQuill, { ref: this.quillRef, className: this.props.classes.quill + (this.state.focused ? " focused" : ""), modules: this.cachedModuleOptionsRich, formats: CACHED_FORMATS_RICH, theme: null, placeholder: util_1.capitalize(this.props.placeholder), value: editorValue, onChange: this.onChange, beforeChange: this.beforeChange, onFocus: this.onFocus, onBlur: this.onBlur, disableClipboardMatchersOnUpdate: CACHED_CLIPBOARD_MATCHERS, readOnly: this.props.disabled }))) : null;
        // we return the component, note how we set the thing to focused
        return (react_1.default.createElement("div", { className: this.props.classes.container },
            this.props.description && descriptionAsAlert ?
                react_1.default.createElement(mui_core_1.Alert, { severity: "info", className: this.props.classes.description }, this.props.description) :
                null,
            this.props.description && !descriptionAsAlert ?
                react_1.default.createElement(mui_core_1.Typography, { variant: "caption", className: this.props.classes.description }, this.props.description) :
                null,
            react_1.default.createElement("div", null,
                react_1.default.createElement(mui_core_1.InputLabel, { classes: {
                        root: this.props.classes.label + " " +
                            (this.props.isRichText ? this.props.classes.labelSingleLine : this.props.classes.labelNoToolbar),
                        focused: "focused",
                    }, focused: this.state.focused },
                    util_1.capitalize(this.props.label),
                    iconComponent),
                this.props.isRichText && !this.state.rawMode ? quill : (react_1.default.createElement(react_1.default.Fragment, null,
                    this.props.isRichText && this.props.args.supportsRawMode ? react_1.default.createElement(RichTextEditorToolbar, { id: this.uuid + "-raw-mode-only", i18n: this.props.i18nFormat, supportsImages: false, supportsFiles: false, supportsVideos: false, supportsBasicMode: false, className: this.props.classes.toolbar, supportsRawMode: this.props.args.supportsRawMode, onToggleRawMode: this.toggleRawMode }) : null,
                    react_1.default.createElement("div", { className: this.props.classes.quill + (this.state.focused ? " focused" : "") },
                        react_1.default.createElement(util_2.SlowLoadingElement, { id: "textarea", onMount: this.focusIfNecessary },
                            react_1.default.createElement(react_textarea_autosize_1.default, { ref: this.textAreaRef, className: this.props.classes.rawTextArea, onChange: this.onChangeByTextarea, placeholder: util_1.capitalize(this.props.placeholder), value: editorValue, onFocus: this.onFocus, onBlur: this.onBlur, disabled: this.props.disabled })))))),
            react_1.default.createElement("div", { className: this.props.classes.errorMessage }, this.props.currentInvalidReason),
            imageInput,
            fileInput,
            uploadVideoDialog,
            fileLoadErrorDialog));
    }
}
const PropertyEntryTextRenderer = mui_core_1.withStyles(exports.style)(ActualPropertyEntryTextRenderer);
exports.default = PropertyEntryTextRenderer;
