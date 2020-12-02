import { IPropertyEntryI18nRichTextInfo } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import React from "react";
import { ISlateEditorWrapperBaseProps } from ".";
import {
  InputLabel, IconButton, Typography, RestoreIcon, ClearIcon,
  TextField, Button, AppBar, Toolbar, WithStyles, withStyles, createStyles,
  Alert, AttachFileIcon, VideoLibraryIcon, InsertPhotoIcon, FormatListBulletedIcon,
  FormatListNumberedIcon, FormatQuoteIcon, TitleIcon, FormatUnderlinedIcon, FormatItalicIcon,
  FormatBoldIcon, CodeIcon, Divider
} from "../../mui-core";
import { Dialog } from "../dialog";
import { capitalize } from "../../../../util";
import { Range } from "slate";

const style = createStyles({
  editor: (props: ISlateEditorWrapperBaseProps) => {
    const shouldShowInvalidEditor = !props.info.currentValid;
    return {
      "position": "relative",
      "padding": props.info.isRichText ? "1rem" : "0 1rem 1rem 1rem",
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
  toolbar: {
    overflow: "auto",
  },
  divider: {
    border: "solid 1px #ccc",
    height: "2rem",
    margin: "0 0.5rem",
  },
  appbar: {
    zIndex: 1,
  },
});

interface RichTextEditorToolbarProps extends MaterialUISlateWrapperStyles {
  requestImage: () => void;
  requestFile: () => void;
  requestVideo: () => void;
}

function RichTextEditorToolbar(props: RichTextEditorToolbarProps) {
  if (!props.info.isRichText) {
    return null;
  }
  return (
    <AppBar position="relative" variant="outlined" color="default" className={props.classes.appbar}>
      <Toolbar className={props.classes.toolbar}>
        <IconButton
          tabIndex={-1}
          title={props.i18nRichInfo.formatBoldLabel}
          disabled={!props.info.currentText}
          color={props.info.currentText && props.info.currentText.bold ? "primary" : "default"}
          onMouseDown={props.helpers.blockBlur}
          onMouseUp={props.helpers.releaseBlur}
          onClick={props.helpers.formatToggleBold}
        >
          <FormatBoldIcon />
        </IconButton>
        <IconButton
          tabIndex={-1}
          title={props.i18nRichInfo.formatItalicLabel}
          disabled={!props.info.currentText}
          color={props.info.currentText && props.info.currentText.italic ? "primary" : "default"}
          onMouseDown={props.helpers.blockBlur}
          onMouseUp={props.helpers.releaseBlur}
          onClick={props.helpers.formatToggleItalic}
        >
          <FormatItalicIcon />
        </IconButton>
        <IconButton
          tabIndex={-1}
          title={props.i18nRichInfo.formatUnderlineLabel}
          disabled={!props.info.currentText}
          color={props.info.currentText && props.info.currentText.underline ? "primary" : "default"}
          onMouseDown={props.helpers.blockBlur}
          onMouseUp={props.helpers.releaseBlur}
          onClick={props.helpers.formatToggleUnderline}
        >
          <FormatUnderlinedIcon />
        </IconButton>
        {
          props.featureSupport.supportsTitle || props.featureSupport.supportsQuote || props.featureSupport.supportsLists ?
            <Divider orientation="vertical" className={props.classes.divider} /> :
            null
        }
        {
          props.featureSupport.supportsTitle ?
            <IconButton
              tabIndex={-1}
              title={props.i18nRichInfo.formatTitleLabel}
              color={props.info.currentBlock && props.info.currentBlock.type === "title" ? "primary" : "default"}
              disabled={!props.featureSupport.canInsertTitle}
              onClick={props.helpers.toggleTitle.bind(null, "h1")}
              onMouseDown={props.helpers.blockBlur}
              onMouseUp={props.helpers.releaseBlur}
            >
              <TitleIcon />
            </IconButton> :
            null
        }
        {
          props.featureSupport.supportsQuote ?
            <IconButton
              tabIndex={-1}
              title={props.i18nRichInfo.formatQuoteLabel}
              color={props.info.currentBlock && props.info.currentBlock.type === "quote" ? "primary" : "default"}
              disabled={!props.featureSupport.canInsertQuote}
              onClick={props.helpers.toggleQuote}
              onMouseDown={props.helpers.blockBlur}
              onMouseUp={props.helpers.releaseBlur}
            >
              <FormatQuoteIcon />
            </IconButton> :
            null
        }
        {
          props.featureSupport.supportsLists ?
            <IconButton
              tabIndex={-1}
              title={props.i18nRichInfo.formatListNumberedLabel}
              color={
                props.info.currentBlock && props.info.currentSuperBlock.type === "list" &&
                  props.info.currentSuperBlock.listType === "numbered" ? "primary" : "default"
              }
              disabled={!props.featureSupport.canInsertList}
              onClick={props.helpers.toggleList.bind(null, "numbered")}
              onMouseDown={props.helpers.blockBlur}
              onMouseUp={props.helpers.releaseBlur}
            >
              <FormatListNumberedIcon />
            </IconButton> :
            null
        }
        {
          props.featureSupport.supportsLists ?
            <IconButton
              tabIndex={-1}
              title={props.i18nRichInfo.formatListNumberedLabel}
              color={
                props.info.currentBlock && props.info.currentSuperBlock.type === "list" &&
                  props.info.currentSuperBlock.listType === "bulleted" ? "primary" : "default"
              }
              disabled={!props.featureSupport.canInsertList}
              onClick={props.helpers.toggleList.bind(null, "bulleted")}
              onMouseDown={props.helpers.blockBlur}
              onMouseUp={props.helpers.releaseBlur}
            >
              <FormatListBulletedIcon />
            </IconButton> :
            null
        }
        {
          props.featureSupport.supportsImages || props.featureSupport.supportsFiles || props.featureSupport.supportsVideos ?
            <Divider orientation="vertical" className={props.classes.divider} /> :
            null
        }
        {
          props.featureSupport.supportsImages ?
            <IconButton
              tabIndex={-1}
              title={props.i18nRichInfo.formatAddImageLabel}
              disabled={!props.featureSupport.canInsertImage}
              onClick={props.requestImage}
              onMouseDown={props.helpers.blockBlur}
              onMouseUp={props.helpers.releaseBlur}
            >
              <InsertPhotoIcon />
            </IconButton> :
            null
        }
        {
          props.featureSupport.supportsFiles ?
            <IconButton
              tabIndex={-1}
              title={props.i18nRichInfo.formatAddVideoLabel}
              disabled={!props.featureSupport.canInsertVideo}
              onMouseDown={props.helpers.blockBlur}
              onClick={props.requestVideo}
              onMouseUp={props.helpers.releaseBlur}
            >
              <VideoLibraryIcon />
            </IconButton> :
            null
        }
        {
          props.featureSupport.supportsFiles ?
            <IconButton
              tabIndex={-1}
              title={props.i18nRichInfo.formatAddFileLabel}
              disabled={!props.featureSupport.canInsertFile}
              onMouseDown={props.helpers.blockBlur}
              onClick={props.requestFile}
              onMouseUp={props.helpers.releaseBlur}
            >
              <AttachFileIcon />
            </IconButton> :
            null
        }
      </Toolbar>
    </AppBar>
  );
}

interface MaterialUISlateWrapperStyles extends ISlateEditorWrapperBaseProps, WithStyles<typeof style> {
  i18nGenericError: string;
  i18nOk: string;
  i18nRichInfo: IPropertyEntryI18nRichTextInfo;
};

interface MaterialUISlateWrapperState {
  videoDialogOpen: boolean;
  videoURL: string;
  videoInvalid: boolean;
}

class MaterialUISlateWrapperClass extends React.PureComponent<MaterialUISlateWrapperStyles, MaterialUISlateWrapperState> {
  private inputImageRef: React.RefObject<HTMLInputElement>;
  private inputFileRef: React.RefObject<HTMLInputElement>;
  private originalSelectionArea: Range;
  private textFieldVideoRef: React.RefObject<HTMLDivElement>;
  private refocusTimeout: NodeJS.Timeout;
  constructor(props: MaterialUISlateWrapperStyles) {
    super(props);

    this.state = {
      videoDialogOpen: false,
      videoURL: "",
      videoInvalid: false,
    }

    this.inputImageRef = React.createRef();
    this.inputFileRef = React.createRef();
    this.textFieldVideoRef = React.createRef();

    this.onImageLoad = this.onImageLoad.bind(this);
    this.onFileLoad = this.onFileLoad.bind(this);
    this.requestImage = this.requestImage.bind(this);
    this.requestFile = this.requestFile.bind(this);
    this.requestVideo = this.requestVideo.bind(this);
    this.closeDialogVideo = this.closeDialogVideo.bind(this);
    this.acceptVideo = this.acceptVideo.bind(this);
    this.updateVideoURL = this.updateVideoURL.bind(this);
    this.focusVideoTextField = this.focusVideoTextField.bind(this);
    this.onFileEventedReFocus = this.onFileEventedReFocus.bind(this);
    this.refocus = this.refocus.bind(this);
  }
  public requestImage() {
    document.body.addEventListener("focus", this.onFileEventedReFocus, {capture: true});
    this.originalSelectionArea = this.props.helpers.editor.selection;
    this.inputImageRef.current.click();
  }
  public refocus() {
    this.props.helpers.focusAt(this.originalSelectionArea);
  }
  public onFileEventedReFocus() {
    document.body.removeEventListener("focus", this.onFileEventedReFocus, {capture: true});

    // we do it this way because this is a hacky way and we are not sure
    // on whether the focus event will trigger before the input event, it should
    // trigger first, but we make no assumptions
    this.refocusTimeout = setTimeout(this.refocus, 30);
  }
  public requestFile() {
    document.body.addEventListener("focus", this.onFileEventedReFocus, {capture: true});
    this.originalSelectionArea = this.props.helpers.editor.selection;
    this.inputFileRef.current.click();
  }
  public requestVideo() {
    this.originalSelectionArea = this.props.helpers.editor.selection;
    this.setState({
      videoDialogOpen: true,
    });
  }
  public closeDialogVideo() {
    this.refocus();
    this.setState({
      videoDialogOpen: false,
      videoURL: "",
      videoInvalid: false,
    });
  }
  public acceptVideo() {
    const status = this.props.helpers.insertVideo(this.state.videoURL, this.originalSelectionArea);
    if (!status) {
      this.setState({
        videoInvalid: true,
      });
    } else {
      this.setState({
        videoDialogOpen: false,
        videoURL: "",
        videoInvalid: false,
      });
    }
  }
  public updateVideoURL(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      videoURL: e.target.value,
    });
  }
  public focusVideoTextField() {
    this.textFieldVideoRef.current && this.textFieldVideoRef.current.focus();
  }
  public async onImageLoad(e: React.ChangeEvent<HTMLInputElement>) {
    document.body.removeEventListener("focus", this.onFileEventedReFocus, {capture: true});
    clearTimeout(this.refocusTimeout);
    const file = e.target.files[0];
    e.target.value = "";
    this.props.helpers.insertImage(file, false, this.originalSelectionArea);
  }
  public async onFileLoad(e: React.ChangeEvent<HTMLInputElement>) {
    document.body.removeEventListener("focus", this.onFileEventedReFocus, {capture: true});
    clearTimeout(this.refocusTimeout);
    const file = e.target.files[0];
    e.target.value = "";
    this.props.helpers.insertFile(file, this.originalSelectionArea);
  }
  public render() {
    const imageInput = this.props.featureSupport.supportsImages ? (
      <input
        ref={this.inputImageRef}
        type="file"
        accept={this.props.featureSupport.supportsImagesAccept}
        tabIndex={-1}
        style={{ display: "none" }}
        autoComplete="off"
        onChange={this.onImageLoad}
      />
    ) : null;

    const fileInput = this.props.featureSupport.supportsFiles ? (
      <input
        ref={this.inputFileRef}
        type="file"
        accept={this.props.featureSupport.supportsFilesAccept}
        tabIndex={-1}
        style={{ display: "none" }}
        autoComplete="off"
        onChange={this.onFileLoad}
      />
    ) : null;

    const fileLoadErrorDialog = this.props.info.isRichText && (this.props.featureSupport.supportsImages || this.props.featureSupport.supportsFiles) ? (
      <Dialog
        fullScreen={false}
        open={!!this.props.currentLoadError}
        onClose={this.props.dismissCurrentLoadError}
        title={capitalize(this.props.i18nGenericError)}
        buttons={
          <Button onClick={this.props.dismissCurrentLoadError}>
            {capitalize(this.props.i18nOk)}
          </Button>
        }
      >
        <Typography>
          {this.props.currentLoadError}
        </Typography>
      </Dialog>
    ) : null;

    const videoDialog = this.props.info.isRichText && this.props.featureSupport.supportsVideos ? (
      <Dialog
        fullScreen={false}
        open={this.state.videoDialogOpen}
        onClose={this.closeDialogVideo}
        onOpen={this.focusVideoTextField}
        title={this.props.i18nRichInfo.loadVideo.title}
        buttons={
          <Button onClick={this.acceptVideo}>
            {this.props.i18nRichInfo.loadVideo.submit}
          </Button>
        }
      >
        <div>
          <TextField
            fullWidth={true}
            value={this.state.videoURL}
            onChange={this.updateVideoURL}
            label={this.props.i18nRichInfo.loadVideo.label}
            placeholder={this.props.i18nRichInfo.loadVideo.placeholder}
            inputRef={this.textFieldVideoRef}
          />
          <div>{this.state.videoInvalid ? this.props.i18nRichInfo.loadVideo.invalid : null}</div>
        </div>
      </Dialog>
    ) : null;

    return (
      <>
        <RichTextEditorToolbar
          {...this.props}
          requestImage={this.requestImage}
          requestFile={this.requestFile}
          requestVideo={this.requestVideo}
        />
        <div className="rich-text">
          <div className={this.props.classes.editor + (this.props.info.isFocused ? " focused" : "")}>
            {this.props.children}
          </div>
        </div>
        {fileLoadErrorDialog}
        {videoDialog}
        {imageInput}
        {fileInput}
      </>
    );
  }
}

export const MaterialUISlateWrapper = withStyles(style)(MaterialUISlateWrapperClass);
