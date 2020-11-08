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
import {
  InputLabel, IconButton, Typography, RestoreIcon, ClearIcon,
  Button, WithStyles, withStyles, createStyles,
  Alert,
} from "../../mui-core";
import { IPropertyEntryTextRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import { SlateEditor } from "../../components/slate";

import { capitalize } from "../../../../util";

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

interface IPropertyEntryTextRendererState {
  focused: boolean;
}


/**
 * The text renderer styles
 */
interface IPropertyEntryTextRendererWithStylesProps extends IPropertyEntryTextRendererProps, WithStyles<typeof style> {
}

/**
 * The class that does the magic
 */
class ActualPropertyEntryTextRenderer extends React.PureComponent<IPropertyEntryTextRendererWithStylesProps, IPropertyEntryTextRendererState> {
  constructor(props: IPropertyEntryTextRendererWithStylesProps) {
    super(props);

    this.state = {
      focused: false,
    }

    // basic functions
    this.focusIfNecessary = this.focusIfNecessary.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  public componentDidMount() {
    this.focusIfNecessary();
  }
  // public updateCurrentVideoLink(e: React.ChangeEvent<HTMLInputElement>) {
  //   let isValid = false;
  //   try {
  //     const url = new URL(e.target.value);
  //     isValid = url.hostname === "youtube.com" || url.hostname === "www.youtube.com" ||
  //       url.hostname === "player.vimeo.com" || url.hostname === "youtu.be";
  //   } catch {
  //   }
  //   this.setState({
  //     currentVideoLink: e.target.value,
  //     invalidVideoLink: !isValid,
  //   });
  // }
  // public submitVideoLink() {
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
  // }
  // public async onFileLoad(e: React.ChangeEvent<HTMLInputElement>) {
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
  // }
  // public async onImageLoad(e: React.ChangeEvent<HTMLInputElement>) {
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
  // }
  public focusIfNecessary() {
    if (this.props.autoFocus) {
      // if (this.quillRef.current) {
      //   this.quillRef.current.focus();
      // } else
      // if (this.textAreaRef.current) {
      //   this.textAreaRef.current.focus();
      // }
    }
  }
  public onFocus() {
    this.setState({
      focused: true,
    });
  }
  public onBlur() {
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

    // const imageInput = this.props.isRichText && this.props.features.supportsImages ? (
    //   <input
    //     ref={this.inputImageRef}
    //     type="file"
    //     accept={this.props.mediaPropertyAcceptsImages}
    //     tabIndex={-1}
    //     style={{ display: "none" }}
    //     autoComplete="off"
    //     onChange={this.onImageLoad}
    //   />
    // ) : null;

    // const fileInput = this.props.isRichText && this.props.features.supportsFiles ? (
    //   <input
    //     ref={this.fileInputRef}
    //     type="file"
    //     accept={this.props.mediaPropertyAcceptsFiles}
    //     tabIndex={-1}
    //     style={{ display: "none" }}
    //     autoComplete="off"
    //     onChange={this.onFileLoad}
    //   />
    // ) : null;

    // const uploadVideoDialog = this.props.isRichText && this.props.features.supportsVideos ? (
    //   <Dialog
    //     fullScreen={false}
    //     open={this.state.requestingVideoLink}
    //     onClose={this.closeVideoRequesting}
    //     title={this.props.i18nLoadVideo.title}
    //     buttons={
    //       <Button onClick={this.submitVideoLink}>
    //         {this.props.i18nLoadVideo.submit}
    //       </Button>
    //     }
    //   >
    //     <div>
    //       <TextField
    //         fullWidth={true}
    //         value={this.state.currentVideoLink}
    //         onChange={this.updateCurrentVideoLink}
    //         label={this.props.i18nLoadVideo.label}
    //         placeholder={this.props.i18nLoadVideo.placeholder}
    //       />
    //       <div>{this.state.invalidVideoLink ? this.props.i18nLoadVideo.invalid : null}</div>
    //     </div>
    //   </Dialog>
    // ) : null;

    // const fileLoadErrorDialog = this.props.isRichText && (this.props.features.supportsImages || this.props.features.supportsFiles) ? (
    //   <Dialog
    //     fullScreen={false}
    //     open={!!this.props.lastLoadedFileError}
    //     onClose={this.props.dismissLastLoadedFileError}
    //     title={capitalize(this.props.i18nGenericError)}
    //     buttons={
    //       <Button onClick={this.props.dismissLastLoadedFileError}>
    //         {capitalize(this.props.i18nOk)}
    //       </Button>
    //     }
    //   >
    //     <Typography>
    //       {this.props.lastLoadedFileError}
    //     </Typography>
    //   </Dialog>
    // ) : null;

    const editor =
      <SlateEditor
        features={this.props.features}
        value={this.props.currentValue}
        internalValue={this.props.currentInternalValue}
        onChange={this.props.onChange}
        onInsertFile={this.props.onInsertFile}
        isRichText={this.props.isRichText}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />

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
          {editor}
          {/* {
            (
              <>
                <div
                  className={this.props.classes.editor + (this.state.focused ? " focused" : "")}
                >
                  {editor}
                </div>
              </>
            )
          } */}
        </div>
        <div className={this.props.classes.errorMessage}>
          {this.props.currentInvalidReason}
        </div>
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
