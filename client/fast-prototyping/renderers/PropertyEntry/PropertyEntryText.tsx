/**
 * The behemoth that the entry fast prototyping is for the text type since text
 * types can be fairly complex, this renderer uses quill, quill also doesn't support SSR
 * so it must be double passed
 * 
 * This renderer is used for text/plain and text/html, aka rich text, but not with
 * any other non-subtype text, it will use the field instead
 * 
 * @packageDocumentation
 */
import React from "react";
import { InputLabel, IconButton, Typography, RestoreIcon, ClearIcon,
  TextField, Button, Toolbar, WithStyles, withStyles, createStyles,
  Alert, AttachFileIcon, VideoLibraryIcon, InsertPhotoIcon, FormatListBulletedIcon,
  FormatListNumberedIcon, FormatQuoteIcon, TitleIcon, FormatUnderlinedIcon, FormatItalicIcon,
  FormatBoldIcon, CodeIcon } from "../../mui-core";
import { IPropertyEntryTextRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import { SlateEditor } from "../../components/slate";

import { capitalize, mimeTypeToExtension } from "../../../../util";
import { LAST_RICH_TEXT_CHANGE_LENGTH } from "../../../../constants";
import { Dialog } from "../../components/dialog";
import prettyBytes from "pretty-bytes";
import TextareaAutosize from "react-textarea-autosize";

import { SlowLoadingElement } from "../../components/util";

/**
 * A simple helper function that says when it should show invalid
 * @param props the renderer props
 * @returns a boolean on whether is invalid
 */
function shouldShowInvalid(props: IPropertyEntryTextRendererProps) {
  return !props.currentValid;
}

/**
 * The styles for the text entry
 */
export const style = createStyles({
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
  label: (props: IPropertyEntryTextRendererProps) => ({
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
  editor: (props: IPropertyEntryTextRendererProps) => {
    const shouldShowInvalidEditor = shouldShowInvalid(props);
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
          (shouldShowInvalidEditor ? "#e57373" : "rgba(0,0,0,0.42)"),
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
          (shouldShowInvalidEditor ? "#f44336" : "#3f51b5"),
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
    fontSize: "1rem",
    overflow: "hidden",
  }
});

function RichTextEditorToolbar(props: {
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
  supportsRawMode: boolean;
  supportsBasicMode: boolean;
  className: string;

  onToggleRawMode: () => void;
}) {
  return (
    <Toolbar className={props.className}>
      {props.supportsBasicMode ? <>
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
      </> : null}
      {
        props.supportsRawMode ?
        (
          <IconButton
            tabIndex={-1}
            onClick={props.onToggleRawMode}
          >
            <CodeIcon/>
          </IconButton>
        ) : null
      }
    </Toolbar>
  );
}

/**
 * The text renderer styles
 */
interface IPropertyEntryTextRendererWithStylesProps extends IPropertyEntryTextRendererProps, WithStyles<typeof style> {
}

/**
 * The text renderer state
 */
interface IPropertyEntryTextRendererState {
  /**
   * True when it's focused
   */
  focused: boolean;
  /**
   * True for when the user tries to put a link
   * so we show a dialog for the youtube/vimeo link
   */
  requestingVideoLink: boolean;
  /**
   * True when such link is invalid
   */
  invalidVideoLink: boolean;
  /**
   * The video link being input
   */
  currentVideoLink: string;
  /**
   * Whether it is in raw mode
   */
  rawMode: boolean;
}

/**
 * The class that does the magic
 */
class ActualPropertyEntryTextRenderer extends React.PureComponent<IPropertyEntryTextRendererWithStylesProps, IPropertyEntryTextRendererState> {
  // this one also gets an uuid
  private inputImageRef: React.RefObject<HTMLInputElement>;
  private fileInputRef: React.RefObject<HTMLInputElement>;

  private textAreaRef: React.RefObject<HTMLTextAreaElement>;

  constructor(props: IPropertyEntryTextRendererWithStylesProps) {
    super(props);

    // whether it is focused or not
    this.state = {
      focused: false,
      requestingVideoLink: false,
      invalidVideoLink: false,
      currentVideoLink: "",
      rawMode: false,
    };

    this.inputImageRef = React.createRef();
    this.textAreaRef = React.createRef();
    this.fileInputRef = React.createRef();

    // basic functions
    this.onChange = this.onChange.bind(this);
    this.onChangeByTextarea = this.onChangeByTextarea.bind(this);
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
  }
  public toggleRawMode() {
    this.setState({
      rawMode: !this.state.rawMode,
    });
  }
  public onChangeByTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value || null;
    this.props.onChange(value, null);
  }
  public onChange(value: string, delta: any, sources: string, editor: any) {
    // on change, these values are basically empty
    // so we set to null, however in some circumstances
    // they are unavoidable, use a value larger than 1 for min
    // if the field is not nullable
    // if (
    //   value === "<p><br></p>" ||
    //   value === "<p><span class=\"ql-cursor\">\ufeff</span></p>"
    // ) {
    //   // prevent this change where it changes to the same value on focus
    //   if (this.props.currentValue !== null) {
    //     if (window) {
    //       (window as any)[LAST_RICH_TEXT_CHANGE_LENGTH] = 0;
    //     }
    //     this.props.onChange(null, null);
    //   }
    //   return;
    // } else if (window) {
    //   const actualLenght = editor.getText().replace(/\n/g, "").length;
    //   (window as any)[LAST_RICH_TEXT_CHANGE_LENGTH] = actualLenght;
    // }
    // this.props.onChange(value, null);
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
      isValid = url.hostname === "youtube.com" || url.hostname === "www.youtube.com" ||
        url.hostname === "player.vimeo.com" || url.hostname === "youtu.be";
    } catch {
    }
    this.setState({
      currentVideoLink: e.target.value,
      invalidVideoLink: !isValid,
    });
  }
  public submitVideoLink() {
    // const quill = this.quillRef.current.getEditor();
    // const range = quill.getSelection(true);

    // const url = new URL(this.state.currentVideoLink);
    // let src: string;
    // let origin: string;

    // if (
    //   url.hostname === "youtube.com" ||
    //   url.hostname === "www.youtube.com" ||
    //   url.hostname === "youtu.be"
    // ) {
    //   origin = "youtube";
    //   const isClassicYTUrl = (
    //     url.hostname === "youtube.com" ||
    //     url.hostname === "www.youtube.com"
    //   );
    //   if (
    //     isClassicYTUrl &&
    //     url.pathname.startsWith("/embed/")
    //   ) {
    //     src = url.pathname.split("/")[2];
    //   } else if (
    //     isClassicYTUrl &&
    //     url.pathname.startsWith("/watch")
    //   ) {
    //     let search = url.search;
    //     if (search[0] === "?") {
    //       search = search.substr(1);
    //     }
    //     search.split("&").forEach((v) => {
    //       if (v.startsWith("v=")) {
    //         src = v.substr(2);
    //       }
    //     });
    //   } else if (
    //     url.hostname === "youtu.be"
    //   ) {
    //     src = url.pathname.split("/")[1];
    //   }
    // } else if (
    //   url.host === "player.vimeo.com"
    // ) {
    //   origin = "vimeo";
    //   src = url.pathname.split("/")[2];
    // } else {
    //   return;
    // }

    // quill.insertEmbed(range.index, "itemizevideo", {
    //   src,
    //   origin,
    // }, (ReactQuill.Quill as any).sources.USER);
    // quill.setSelection(range.index + 2, 0, (ReactQuill.Quill as any).sources.SILENT);

    this.closeVideoRequesting();
  }
  public async onFileLoad(e: React.ChangeEvent<HTMLInputElement>) {
    // const file = e.target.files[0];
    // e.target.value = "";

    // const fileData = await this.props.onInsertFile(file);

    // const prettySize = prettyBytes(fileData.result.size);
    // const expectedExtension = mimeTypeToExtension(fileData.result.type);
  
    // const quill = this.quillRef.current.getEditor();
    // const range = quill.getSelection(true);

    // try {
    //   quill.insertEmbed(range.index, "itemizefile", {
    //     srcId: fileData.result.id,
    //     src: fileData.result.url,
    //     name: fileData.result.name,
    //     extension: expectedExtension,
    //     size: prettySize,
    //   }, (ReactQuill.Quill as any).sources.USER);
    //   quill.setSelection(range.index + 2, 0, (ReactQuill.Quill as any).sources.SILENT);
    // } catch (err) {}
  }
  public async onImageLoad(e: React.ChangeEvent<HTMLInputElement>) {
    // const file = e.target.files[0];
    // e.target.value = "";

    // let alt: string = null;
    // if (this.props.args["requestAltOnImages"]) {
    //   alt = prompt("Please write an alt for your image:", "") || null;
    // }
    // try {
    //   const data = await this.props.onInsertFile(file, true);

    //   // first we get this information from it in order
    //   // to build a ratio
    //   const width = data.width;
    //   const height = data.height;
    //   const ratio = height / width;
    //   const percentage = ratio * 100;
    //   const padStyle = "padding-bottom:" + percentage + "%";
    
    //   const quill = this.quillRef.current.getEditor();
    //   const range = quill.getSelection(true);
    //   quill.insertEmbed(range.index, "itemizeimage", {
    //     alt,
    //     src: data.result.url,
    //     srcId: data.result.id,
    //     srcSet: null,
    //     sizes: null,
    //     srcWidth: data.width,
    //     srcHeight: data.height,
    //     padStyle,
    //   }, (ReactQuill.Quill as any).sources.USER);
    //   quill.setSelection(range.index + 2, 0, (ReactQuill.Quill as any).sources.SILENT);
    // } catch (err) {
    // }
  }
  public focusIfNecessary() {
    if (this.props.autoFocus) {
      // if (this.quillRef.current) {
      //   this.quillRef.current.focus();
      // } else
      if (this.textAreaRef.current) {
        this.textAreaRef.current.focus();
      }
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

    const slate = <>
      <RichTextEditorToolbar
        i18n={this.props.i18nFormat}
        supportsImages={this.props.supportsImages}
        supportsFiles={this.props.supportsFiles}
        supportsVideos={this.props.supportsVideos}
        supportsBasicMode={true}
        className={this.props.classes.toolbar}
        supportsRawMode={this.props.args.supportsRawMode}
        onToggleRawMode={this.toggleRawMode}
      />
      <SlateEditor
        value={this.props.currentValue}
        internalValue={this.props.currentInternalValue}
      />
    </>;

    // we return the component, note how we set the thing to focused
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
            (
              <>
                {this.props.isRichText && this.props.args.supportsRawMode ? <RichTextEditorToolbar
                  i18n={this.props.i18nFormat}
                  supportsImages={false}
                  supportsFiles={false}
                  supportsVideos={false}
                  supportsBasicMode={false}
                  className={this.props.classes.toolbar}
                  supportsRawMode={this.props.args.supportsRawMode}
                  onToggleRawMode={this.toggleRawMode}
                /> : null}
                <div
                  className={this.props.classes.editor + (this.state.focused ? " focused" : "")}
                >
                  <SlowLoadingElement id="textarea" onMount={this.focusIfNecessary}>
                    <TextareaAutosize
                      ref={this.textAreaRef as any}
                      className={this.props.classes.rawTextArea}
                      onChange={this.onChangeByTextarea}
                      placeholder={capitalize(this.props.placeholder)}
                      value={editorValue}
                      onFocus={this.onFocus}
                      onBlur={this.onBlur}
                      disabled={this.props.disabled}
                    />
                  </SlowLoadingElement>
                </div>
              </>
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

/**
 * The property entry text renderer, note that this renderer isn't used only for rich text
 * but rather for any text type that is either plain or html, a text without a subtype
 * will use the same as field
 */
const PropertyEntryTextRenderer = withStyles(style)(ActualPropertyEntryTextRenderer);
export default PropertyEntryTextRenderer;
