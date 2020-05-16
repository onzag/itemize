import React from "react";
import { InputLabel, IconButton, ThemeProvider, Typography, TextField, Button } from "@material-ui/core";
import ReactQuill from "react-quill";
import Toolbar from "@material-ui/core/Toolbar";
import { IPropertyEntryTextRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import { IPropertyEntryThemeType, STANDARD_THEME } from "./styles";
import { Alert } from "@material-ui/lab";
import {
  WithStyles,
  withStyles,
  createStyles,
} from "@material-ui/styles";
import uuid from "uuid";

import AttachFileIcon from "@material-ui/icons/AttachFile";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import TitleIcon from "@material-ui/icons/Title";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatBoldIcon from "@material-ui/icons/FormatBold";

import "react-quill/dist/quill.core.css";
import "../../../internal/theme/quill.scss";
import { capitalize, mimeTypeToExtension } from "../../../../util";
import { LAST_RICH_TEXT_CHANGE_LENGTH } from "../../../../constants";
import { Dialog } from "../../components/dialog";
import prettyBytes from "pretty-bytes";
import TextareaAutosize from "react-textarea-autosize";

import RestoreIcon from '@material-ui/icons/Restore';
import ClearIcon from '@material-ui/icons/Clear';
import { SlowLoadingElement } from "../../components/util";

const BlockEmbed = ReactQuill.Quill.import("blots/block/embed");
const Embed = ReactQuill.Quill.import("blots/embed");
const Delta = ReactQuill.Quill.import("delta");

interface ItemizeImageBlotValue {
  alt: string;
  src: string;
  srcId: string;
  srcSet: string;
  sizes: string;
  srcWidth: number;
  srcHeight: number;
}

class ItemizeImageBlot extends BlockEmbed {
  static create(value: ItemizeImageBlotValue) {
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
  
  static value(node: HTMLDivElement) {
    const img = node.childNodes[0].childNodes[0].childNodes[0] as HTMLImageElement;
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

interface ItemizeVideoBlotValue {
  src: string;
  origin: "youtube" | "vimeo";
}

class ItemizeVideoBlot extends BlockEmbed {
  static create(value: ItemizeVideoBlotValue) {
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
    } else {
      iframe.src = `https://player.vimeo.com/video/${value.src}?title=0&byline=0&portrait=0&badge=0`;
    }

    return mainContainer;
  }

  static value(node: HTMLDivElement) {
    const iframe = node.childNodes[0].childNodes[0] as HTMLIFrameElement;
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

interface ItemizeFileBlotValue {
  srcId: string;
  name: string;
  extension: string;
  size: string;
  src: string;
}

class ItemizeFileBlot extends Embed {
  static create(value: ItemizeFileBlotValue) {
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

  static value(node: HTMLDivElement) {
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

function shouldShowInvalid(props: IPropertyEntryTextRendererProps) {
  return !props.currentValid;
}
export const style = (theme: IPropertyEntryThemeType) => createStyles({
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
  icon: (props: IPropertyEntryTextRendererProps) => ({
    color: shouldShowInvalid(props) ? theme.invalidColor : theme.iconColor,
  }),
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
  label: (props: IPropertyEntryTextRendererProps) => ({
    "color": shouldShowInvalid(props) ? theme.labelInvalidColor : theme.labelColor,
    "&.focused": {
      color: shouldShowInvalid(props) ? theme.labelInvalidFocusedColor : theme.labelFocusedColor,
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
  quill: (props: IPropertyEntryTextRendererProps) => {
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
          (shouldShowInvalidQuill ? theme.fieldBorderInvalidColor : theme.fieldBorderColor),
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
          (shouldShowInvalidQuill ? theme.fieldBorderInvalidColorFocused : theme.fieldBorderColorFocused),
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
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "1rem",
    overflow: "hidden",
  }
});

// TODO implement missing toolbar functionality
function RichTextEditorToolbar(props: {
  id: string,
  i18n: {
    formatBoldLabel: string,
    formatItalicLabel: string;
    formatUnderlineLabel: string;
    formatTitleLabel: string;
    formatQuoteLabel: string;
    formatListNumberedLabel: string;
    formatListBulletedLabel: string;
    formatAddImageLabel: string;
    formatAddVideoLabel: string;
    formatAddFileLabel: string;
  },
  supportsImages: boolean;
  supportsFiles: boolean;
  supportsVideos: boolean;
  className: string;
}) {
  return (
    <Toolbar id={props.id} className={props.className}>
      <IconButton
        tabIndex={-1}
        title={props.i18n.formatBoldLabel}
        classes={{root: "ql-bold"}}
      >
        <FormatBoldIcon/>
      </IconButton>
      <IconButton
        tabIndex={-1}
        title={props.i18n.formatItalicLabel}
        classes={{ root: "ql-italic" }}
      >
        <FormatItalicIcon/>
      </IconButton>
      <IconButton
        tabIndex={-1}
        title={props.i18n.formatUnderlineLabel}
        classes={{ root: "ql-underline" }}
      >
        <FormatUnderlinedIcon/>
      </IconButton>
      <IconButton
        tabIndex={-1}
        title={props.i18n.formatTitleLabel}
        classes={{ root: "ql-header" }}
        value="1"
      >
        <TitleIcon/>
      </IconButton>
      <span className="ql-divider" />
      <IconButton
        tabIndex={-1}
        title={props.i18n.formatQuoteLabel}
        classes={{ root: "ql-blockquote" }}
      >
        <FormatQuoteIcon/>
      </IconButton>
      <span className="ql-divider" />
      <IconButton
        tabIndex={-1}
        title={props.i18n.formatListNumberedLabel}
        classes={{ root: "ql-list" }}
        value="ordered"
      >
        <FormatListNumberedIcon/>
      </IconButton>
      <IconButton
        tabIndex={-1}
        title={props.i18n.formatListBulletedLabel}
        classes={{ root: "ql-list" }}
        value="bullet"
      >
        <FormatListBulletedIcon/>
      </IconButton>
      {
        props.supportsImages || props.supportsFiles ?
        (
          <span className="ql-divider" />
        ) : null
      }
      {
        props.supportsImages ?
        (
          <IconButton
            tabIndex={-1}
            title={props.i18n.formatAddImageLabel}
            classes={{ root: "ql-image" }}
          >
            <InsertPhotoIcon/>
          </IconButton>
        ) : null
      }
      {
        props.supportsVideos ?
        (
          <IconButton
            tabIndex={-1}
            title={props.i18n.formatAddVideoLabel}
            classes={{ root: "ql-video" }}
          >
            <VideoLibraryIcon/>
          </IconButton>
        ) : null
      }
      {
        props.supportsFiles ?
        (
          <IconButton
            tabIndex={-1}
            title={props.i18n.formatAddFileLabel}
            classes={{ root: "ql-file" }}
          >
            <AttachFileIcon/>
          </IconButton>
        ) : null
      }
    </Toolbar>
  );
}
        
interface IPropertyEntryTextRendererWithStylesProps extends IPropertyEntryTextRendererProps, WithStyles<typeof style> {
}

interface IPropertyEntryTextRendererState {
  focused: boolean;
  requestingVideoLink: boolean;
  invalidVideoLink: boolean;
  currentVideoLink: string;
}

const CACHED_FORMATS_RICH = ["bold", "italic", "underline", "header", "blockquote", "list", "itemizeimage", "itemizevideo", "itemizefile"];
const CACHED_CLIPBOARD_MATCHERS: ReactQuill.ClipboardMatcher[] = [
  [Node.ELEMENT_NODE, collapseToPlainTextMatcher],
];

function collapseToPlainTextMatcher(node: Node) {
  return new Delta().insert(node.textContent);
}

class ActualPropertyEntryTextRenderer extends React.PureComponent<IPropertyEntryTextRendererWithStylesProps, IPropertyEntryTextRendererState> {
  // this one also gets an uuid
  private uuid: string;
  private inputImageRef: React.RefObject<HTMLInputElement>;
  private fileInputRef: React.RefObject<HTMLInputElement>;

  private cachedModuleOptionsRich: any;

  private quillRef: React.RefObject<ReactQuill>;

  constructor(props: IPropertyEntryTextRendererWithStylesProps) {
    super(props);

    // whether it is focused or not
    this.state = {
      focused: false,
      requestingVideoLink: false,
      invalidVideoLink: false,
      currentVideoLink: "",
    };

    this.uuid =  "uuid-" + uuid.v4();
    this.inputImageRef = React.createRef();
    this.quillRef = React.createRef();
    this.fileInputRef = React.createRef();

    // basic functions
    this.onChange = this.onChange.bind(this);
    this.onChangeByTextarea = this.onChangeByTextarea.bind(this);
    this.addPasteEventOnEditor = this.addPasteEventOnEditor.bind(this);
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
  public componentDidMount() {
    if (this.props.isRichText) {
      this.addPasteEventOnEditor();
    }
  }
  public componentDidUpdate(prevProps: IPropertyEntryTextRendererWithStylesProps, prevState: IPropertyEntryTextRendererState) {
    if (prevProps.isRichText && !this.props.isRichText) {
      this.addPasteEventOnEditor();
    }
  }
  public addPasteEventOnEditor() {
    const editor = this.quillRef.current.getEditor();
    editor.root.addEventListener('paste', async (e) => {
      const clipboardData: DataTransfer = e.clipboardData || (window as any).clipboardData;
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
      }, (ReactQuill.Quill as any).sources.USER);
      editor.setSelection(range.index + 2, 0, (ReactQuill.Quill as any).sources.SILENT);
    });
  }
  public onChangeByTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value || null;
    this.props.onChange(value, null);
  }
  public onChange(value: string, delta: any, sources: string, editor: ReactQuill.UnprivilegedEditor) {
    // on change, these values are basically empty
    // so we set to null, however in some circumstances
    // they are unavoidable, use a value larger than 1 for min
    // if the field is not nullable
    if (
      value === "<p><br></p>" ||
      value === "<p><span class=\"ql-cursor\">\ufeff</span></p>"
    ) {
      // prevent this change where it changes to the same value on focus
      if (this.props.currentValue !== null) {
        if (window) {
          (window as any)[LAST_RICH_TEXT_CHANGE_LENGTH] = 0;
        }
        this.props.onChange(null, null);
      }
      return;
    } else if (window) {
      const actualLenght = editor.getText().replace(/\n/g, "").length;
      (window as any)[LAST_RICH_TEXT_CHANGE_LENGTH] = actualLenght;
    }
    this.props.onChange(value, null);
  }
  /**
   * This image handler is not binded due to quill existing in the this namespace
   */
  public customImageHandler() {
    this.inputImageRef.current.click();
  }
  public customFileHandler() {
    this.fileInputRef.current.click();
  }
  public customVideoHandler() {
    this.setState({
      currentVideoLink: "",
      invalidVideoLink: false,
      requestingVideoLink: true,
    });
  }
  public closeVideoRequesting() {
    this.setState({
      requestingVideoLink: false,
    });
  }
  public updateCurrentVideoLink(e: React.ChangeEvent<HTMLInputElement>) {
    let isValid = false;
    try {
      const url = new URL(e.target.value);
      isValid = url.hostname === "youtube.com" || url.hostname === "player.vimeo.com" || url.hostname === "youtu.be";
    } catch {
    }
    this.setState({
      currentVideoLink: e.target.value,
      invalidVideoLink: !isValid,
    });
  }
  public submitVideoLink() {
    const quill = this.quillRef.current.getEditor();
    const range = quill.getSelection(true);

    const url = new URL(this.state.currentVideoLink);
    let src: string;
    let origin: string;

    if (
      url.hostname === "youtube.com" ||
      url.hostname === "www.youtube.com" ||
      url.hostname === "youtu.be"
    ) {
      origin = "youtube";
      const isClassicYTUrl = (
        url.hostname === "youtube.com" ||
        url.hostname === "www.youtube.com"
      );
      if (
        isClassicYTUrl &&
        url.pathname.startsWith("/embed/")
      ) {
        src = url.pathname.split("/")[2];
      } else if (
        isClassicYTUrl &&
        url.pathname.startsWith("/watch")
      ) {
        let search = url.search;
        if (search[0] === "?") {
          search = search.substr(1);
        }
        search.split("&").forEach((v) => {
          if (v.startsWith("v=")) {
            src = v.substr(2);
          }
        });
      } else if (
        url.hostname === "youtu.be"
      ) {
        src = url.pathname.split("/")[1];
      }
    } else if (
      url.host === "player.vimeo.com"
    ) {
      origin = "vimeo";
      src = url.pathname.split("/")[2];
    } else {
      return;
    }

    quill.insertEmbed(range.index, "itemizevideo", {
      src,
      origin,
    }, (ReactQuill.Quill as any).sources.USER);
    quill.setSelection(range.index + 2, 0, (ReactQuill.Quill as any).sources.SILENT);

    this.closeVideoRequesting();
  }
  public onFileLoad(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files[0];
    e.target.value = "";

    const fileData = this.props.onInsertFile(file);

    const prettySize = prettyBytes(fileData.size);
    const expectedExtension = mimeTypeToExtension(fileData.type);
  
    const quill = this.quillRef.current.getEditor();
    const range = quill.getSelection(true);

    try {
      quill.insertEmbed(range.index, "itemizefile", {
        srcId: fileData.id,
        src: fileData.url,
        name: fileData.name,
        extension: expectedExtension,
        size: prettySize,
      }, (ReactQuill.Quill as any).sources.USER);
      quill.setSelection(range.index + 2, 0, (ReactQuill.Quill as any).sources.SILENT);
    } catch (err) {}
  }
  public async onImageLoad(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files[0];
    e.target.value = "";

    let alt: string = null;
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
      }, (ReactQuill.Quill as any).sources.USER);
      quill.setSelection(range.index + 2, 0, (ReactQuill.Quill as any).sources.SILENT);
    } catch (err) {
    }
  }
  // basically get the state onto its parent of the focus and blur
  public onFocus() {
    this.setState({
      focused: true,
    });
  }
  public onBlur() {
    this.setState({
      focused: false,
    });
  }
  public render() {
    // this is the editor value
    const editorValue = this.props.currentValue as string || "";

    // the icon as usual
    let icon: React.ReactNode;
    if (this.props.canRestore) {
      if (this.props.currentAppliedValue) {
        icon = <RestoreIcon />
      } else {
        icon = <ClearIcon />
      }
    } else if (this.props.icon) {
      icon = this.props.icon;
    }
    const iconComponent = icon ? (
      <IconButton
        tabIndex={-1}
        className={this.props.classes.icon}
        onClick={this.props.canRestore ? this.props.onRestore : null}
      >
        {icon}
      </IconButton>
    ) : null;

    const descriptionAsAlert = this.props.args["descriptionAsAlert"];

    const imageInput = this.props.supportsImages ? (
      <input
        ref={this.inputImageRef}
        type="file"
        accept={this.props.mediaPropertyAcceptsImages}
        tabIndex={-1}
        style={{display: "none"}}
        autoComplete="off"
        onChange={this.onImageLoad}
      />
    ) : null;

    const fileInput = this.props.supportsFiles ? (
      <input
        ref={this.fileInputRef}
        type="file"
        accept={this.props.mediaPropertyAcceptsFiles}
        tabIndex={-1}
        style={{display: "none"}}
        autoComplete="off"
        onChange={this.onFileLoad}
      />
    ) : null;

    const uploadVideoDialog = this.props.supportsVideos ? (
      <Dialog
        fullScreen={false}
        open={this.state.requestingVideoLink}
        onClose={this.closeVideoRequesting}
        title={this.props.i18nLoadVideo.title}
        buttons={
          <Button onClick={this.submitVideoLink}>
            {this.props.i18nLoadVideo.submit}
          </Button>
        }
      >
        <div>
          <TextField
            fullWidth={true}
            value={this.state.currentVideoLink}
            onChange={this.updateCurrentVideoLink}
            label={this.props.i18nLoadVideo.label}
            placeholder={this.props.i18nLoadVideo.placeholder}
          />
          <div>{this.state.invalidVideoLink ? this.props.i18nLoadVideo.invalid : null}</div>
        </div>
      </Dialog>
    ) : null;

    const fileLoadErrorDialog = (this.props.supportsImages || this.props.supportsFiles) ? (
      <Dialog
        fullScreen={false}
        open={!!this.props.lastLoadedFileError}
        onClose={this.props.dismissLastLoadedFileError}
        title={capitalize(this.props.i18nGenericError)}
        buttons={
          <Button onClick={this.props.dismissLastLoadedFileError}>
            {capitalize(this.props.i18nOk)}
          </Button>
        }
      >
        <Typography>
          {this.props.lastLoadedFileError}
        </Typography>
      </Dialog>
    ) : null;

    // we return the component, note how we set the thing to focused
    // TODO disabled
    return (
      <div className={this.props.classes.container}>
        {
          this.props.description && descriptionAsAlert ?
          <Alert severity="info" className={this.props.classes.description}>
            {this.props.description}
          </Alert> :
          null
        }
        {
          this.props.description && !descriptionAsAlert ?
          <Typography variant="caption" className={this.props.classes.description}>
            {this.props.description}
          </Typography> :
          null
        }
        <div>
          <InputLabel
            classes={{
              root: this.props.classes.label + " " +
                (this.props.isRichText ? this.props.classes.labelSingleLine : this.props.classes.labelNoToolbar),
              focused: "focused",
            }}
            focused={this.state.focused}
          >
            {capitalize(this.props.label)}{iconComponent}
          </InputLabel>
          {
            this.props.isRichText ? (
              <>
                <RichTextEditorToolbar
                  id={this.uuid}
                  i18n={this.props.i18nFormat}
                  supportsImages={this.props.supportsImages}
                  supportsFiles={this.props.supportsFiles}
                  supportsVideos={this.props.supportsVideos}
                  className={this.props.classes.toolbar}
                />
                <ReactQuill
                  ref={this.quillRef}
                  className={this.props.classes.quill + (this.state.focused ? " focused" : "")}
                  modules={this.cachedModuleOptionsRich}
                  formats={CACHED_FORMATS_RICH}
                  theme={null}
                  placeholder={capitalize(this.props.placeholder)}
                  value={editorValue}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  disableClipboardMatchersOnUpdate={CACHED_CLIPBOARD_MATCHERS}
                />
              </>
            ) : (
              <div
                className={this.props.classes.quill + (this.state.focused ? " focused" : "")}
              >
                <SlowLoadingElement id="textarea">
                  <TextareaAutosize
                    className={this.props.classes.rawTextArea}
                    onChange={this.onChangeByTextarea}
                    placeholder={capitalize(this.props.placeholder)}
                    value={editorValue}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                  />
                </SlowLoadingElement>
              </div>
            )
          }
        </div>
        <div className={this.props.classes.errorMessage}>
          {this.props.currentInvalidReason}
        </div>
        {imageInput}
        {fileInput}
        {uploadVideoDialog}
        {fileLoadErrorDialog}
      </div>
    );
  }
}

const ActualPropertyEntryTextRendererWithStyles = withStyles(style)(ActualPropertyEntryTextRenderer);

export default function PropertyEntryTextRenderer(props: IPropertyEntryTextRendererProps) {
  let appliedTheme: IPropertyEntryThemeType = STANDARD_THEME;
  if (props.args["theme"]) {
    appliedTheme = {
      ...STANDARD_THEME,
      ...props.args["theme"],
    };
  }
  return (
    <ThemeProvider theme={appliedTheme}>
      <ActualPropertyEntryTextRendererWithStyles {...props}/>
    </ThemeProvider>
  )
}