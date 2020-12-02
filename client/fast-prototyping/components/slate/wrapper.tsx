import { IPropertyEntryI18nRichTextInfo } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import React from "react";
import { ISlateEditorWrapperBaseProps } from ".";
import {
  InputLabel, IconButton, Typography, RestoreIcon, ClearIcon,
  TextField, Button, AppBar, Toolbar, WithStyles, withStyles, createStyles,
  Alert, AttachFileIcon, VideoLibraryIcon, InsertPhotoIcon, FormatListBulletedIcon,
  FormatListNumberedIcon, FormatQuoteIcon, TitleIcon, FormatUnderlinedIcon, FormatItalicIcon,
  FormatBoldIcon, MoreHorizIcon, ExpandLessIcon, Divider, Select, FormControl, MenuItem, FilledInput, LinkIcon,
} from "../../mui-core";
import { Dialog } from "../dialog";
import { capitalize } from "../../../../util";
import { Range } from "slate";
import { RichElement } from "../../../internal/text/serializer";

const style = createStyles({
  editorContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  editorDrawer: {
    width: 0,
    height: 0,
    transition: "width 0.5s ease-in-out, height 0.5s ease-in-out",
    "&.open": {
      width: "300px",
      height: "500px",
    },
  },
  editor: (props: ISlateEditorWrapperBaseProps) => {
    const shouldShowInvalidEditor = !props.info.currentValid;
    return {
      "flex": "1 1 100%",
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
  moreOptionsSpacer: {
    flex: "1 1 auto",
    height: "100%",
  },
});

interface RichTextEditorToolbarProps extends MaterialUISlateWrapperStyles {
  requestImage: () => void;
  requestFile: () => void;
  requestVideo: () => void;
  requestLink: () => void;
  shouldHaveDrawer: () => boolean;
  drawerOpen: boolean;
  toggleDrawer: () => void;
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
          (
            props.featureSupport.supportsTitle ||
            props.featureSupport.supportsQuote ||
            props.featureSupport.supportsLinks ||
            props.featureSupport.supportsLists
          ) ?
            <Divider orientation="vertical" className={props.classes.divider} /> :
            null
        }
        {
          props.featureSupport.supportsLinks ?
            <IconButton
              tabIndex={-1}
              title={props.i18nRichInfo.formatLinkLabel}
              color={props.info.currentElement && props.info.currentElement.type === "link" ? "primary" : "default"}
              disabled={!props.featureSupport.canInsertLink}
              onClick={props.requestLink}
              onMouseDown={props.helpers.blockBlur}
              onMouseUp={props.helpers.releaseBlur}
            >
              <LinkIcon />
            </IconButton> :
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
        <div className={props.classes.moreOptionsSpacer} />
        {
          props.shouldHaveDrawer() ?
            <IconButton
              tabIndex={-1}
              onMouseDown={props.helpers.blockBlur}
              onClick={props.toggleDrawer}
              onMouseUp={props.helpers.releaseBlur}
            >
              {props.drawerOpen ? <ExpandLessIcon /> : <MoreHorizIcon />}
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
  linkDialogOpen: boolean;
  linkURL: string;
  linkTValue: string;
  linkInvalid: boolean;
  drawerOpen: boolean;
}

class MaterialUISlateWrapperClass extends React.PureComponent<MaterialUISlateWrapperStyles, MaterialUISlateWrapperState> {
  private inputImageRef: React.RefObject<HTMLInputElement>;
  private inputFileRef: React.RefObject<HTMLInputElement>;
  private originalSelectionArea: Range;
  private textFieldVideoRef: React.RefObject<HTMLDivElement>;
  private textFieldLinkRef: React.RefObject<HTMLDivElement>;
  private refocusTimeout: NodeJS.Timeout;
  private originalSelectedElement: RichElement;
  constructor(props: MaterialUISlateWrapperStyles) {
    super(props);

    this.state = {
      videoDialogOpen: false,
      videoURL: "",
      videoInvalid: false,
      linkDialogOpen: false,
      linkURL: "",
      linkTValue: "",
      linkInvalid: false,
      drawerOpen: !this.shouldHaveDrawer() ? false : localStorage.getItem("RICH_TEXT_DRAWER_OPEN") === "true",
    }

    this.inputImageRef = React.createRef();
    this.inputFileRef = React.createRef();
    this.textFieldVideoRef = React.createRef();
    this.textFieldLinkRef = React.createRef();

    this.onImageLoad = this.onImageLoad.bind(this);
    this.onFileLoad = this.onFileLoad.bind(this);
    this.requestImage = this.requestImage.bind(this);
    this.requestFile = this.requestFile.bind(this);
    this.requestVideo = this.requestVideo.bind(this);
    this.requestLink = this.requestLink.bind(this);
    this.closeDialogVideo = this.closeDialogVideo.bind(this);
    this.closeDialogLink = this.closeDialogLink.bind(this);
    this.acceptVideo = this.acceptVideo.bind(this);
    this.updateVideoURL = this.updateVideoURL.bind(this);
    this.focusVideoTextField = this.focusVideoTextField.bind(this);
    this.onFileEventedReFocus = this.onFileEventedReFocus.bind(this);
    this.refocus = this.refocus.bind(this);
    this.shouldHaveDrawer = this.shouldHaveDrawer.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.focusLinkTextField = this.focusLinkTextField.bind(this);
    this.acceptLink = this.acceptLink.bind(this);
    this.updateLinkURL = this.updateLinkURL.bind(this);
    this.updateLinkTValue = this.updateLinkTValue.bind(this);
  }
  public shouldHaveDrawer() {
    return !!(
      this.props.featureSupport.supportsTemplating ||
      this.props.featureSupport.supportsCustomStyles ||
      this.props.featureSupport.supportsContainers ||
      this.props.featureSupport.supportedCustoms ||
      this.props.featureSupport.supportsRichClasses
    );
  }
  public requestImage() {
    document.body.addEventListener("focus", this.onFileEventedReFocus, { capture: true });
    this.originalSelectionArea = this.props.helpers.editor.selection;
    this.inputImageRef.current.click();
  }
  public toggleDrawer() {
    const newState = !this.state.drawerOpen;
    this.setState({
      drawerOpen: newState,
    });
    localStorage.setItem("RICH_TEXT_DRAWER_OPEN", JSON.stringify(newState));
  }
  public refocus() {
    this.props.helpers.focusAt(this.originalSelectionArea);
  }
  public onFileEventedReFocus() {
    document.body.removeEventListener("focus", this.onFileEventedReFocus, { capture: true });

    // we do it this way because this is a hacky way and we are not sure
    // on whether the focus event will trigger before the input event, it should
    // trigger first, but we make no assumptions
    this.refocusTimeout = setTimeout(this.refocus, 30);
  }
  public requestFile() {
    document.body.addEventListener("focus", this.onFileEventedReFocus, { capture: true });
    this.originalSelectionArea = this.props.helpers.editor.selection;
    this.inputFileRef.current.click();
  }
  public requestVideo() {
    this.originalSelectionArea = this.props.helpers.editor.selection;
    this.setState({
      videoDialogOpen: true,
    });
  }
  public requestLink() {
    this.originalSelectionArea = this.props.helpers.editor.selection;
    this.originalSelectedElement = this.props.info.currentElement;
    this.setState({
      linkDialogOpen: true,
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
  public closeDialogLink() {
    this.refocus();
    this.setState({
      linkDialogOpen: false,
      linkURL: "",
      linkInvalid: false,
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
  public acceptLink() {
    const status = this.props.helpers.toggleLink(this.state.linkURL, this.state.linkTValue);
    if (!status) {
      this.setState({
        linkInvalid: true,
      });
    } else {
      this.setState({
        linkDialogOpen: false,
        linkURL: "",
        linkTValue: "",
        linkInvalid: false,
      });
    }
  }
  public updateVideoURL(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      videoURL: e.target.value,
    });
  }
  public updateLinkURL(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      linkURL: e.target.value,
    });
  }
  public updateLinkTValue(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({
      linkTValue: e.target.value,
    });
  }
  public focusVideoTextField() {
    this.textFieldVideoRef.current && this.textFieldVideoRef.current.focus();
  }
  public focusLinkTextField() {
    this.textFieldLinkRef.current && this.textFieldLinkRef.current.focus();
  }
  public async onImageLoad(e: React.ChangeEvent<HTMLInputElement>) {
    document.body.removeEventListener("focus", this.onFileEventedReFocus, { capture: true });
    clearTimeout(this.refocusTimeout);
    const file = e.target.files[0];
    e.target.value = "";
    this.props.helpers.insertImage(file, false, this.originalSelectionArea);
  }
  public async onFileLoad(e: React.ChangeEvent<HTMLInputElement>) {
    document.body.removeEventListener("focus", this.onFileEventedReFocus, { capture: true });
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

    const linkPropertiesToUse: Array<{
      value: string;
      label: string;
    }> = [];
    let selectedContextValue: string = "";

    if (this.props.info.isRichText && this.props.featureSupport.supportsLinks && this.state.linkDialogOpen) {
      this.props.info.currentContext && Object.keys(this.props.info.currentContext.properties).forEach((key) => {
        const property = this.props.info.currentContext.properties[key];
        if (property.type !== "link") {
          return;
        }
        linkPropertiesToUse.push({
          value: key,
          label: property.label || key,
        });
      });

      if (
        this.originalSelectedElement &&
        this.originalSelectedElement.type === "link" &&
        this.originalSelectedElement.thref
      ) {
        if (!linkPropertiesToUse.some((p) => p.value === (this.originalSelectedElement as any).thref)) {
          linkPropertiesToUse.push({
            value: this.originalSelectedElement.thref,
            label: this.originalSelectedElement.thref,
          });
        }

        selectedContextValue = this.originalSelectedElement.thref;
      }
    }

    const linkDialog = this.props.info.isRichText && this.props.featureSupport.supportsLinks ? (
      <Dialog
        fullScreen={false}
        open={this.state.linkDialogOpen}
        onClose={this.closeDialogLink}
        onOpen={this.focusLinkTextField}
        title={this.props.i18nRichInfo.setLink.title}
        buttons={
          <Button onClick={this.acceptLink}>
            {this.props.i18nRichInfo.setLink.submit}
          </Button>
        }
      >
        <div>
          <TextField
            fullWidth={true}
            value={this.state.linkURL}
            onChange={this.updateVideoURL}
            label={this.props.i18nRichInfo.setLink.label}
            placeholder={
              this.props.featureSupport.supportsExternalLinks ?
              this.props.i18nRichInfo.setLink.placeholder :
              this.props.i18nRichInfo.setLink.placeholderLocalOnly
            }
            inputRef={this.textFieldLinkRef}
          />
          <div>{this.state.linkInvalid ? this.props.i18nRichInfo.setLink.invalid : null}</div>
          {
            linkPropertiesToUse.length ?
              <div>
                {this.props.i18nRichInfo.setLink.templated}
                <FormControl
                  variant="filled"
                >
                  <InputLabel
                    htmlFor="slate-wrapper-template-entry-id"
                    shrink={true}
                  >
                    {this.props.i18nRichInfo.setLink.templatedLabel}
                  </InputLabel>
                  <Select
                    value={selectedContextValue}
                    onChange={this.updateLinkTValue}
                    displayEmpty={true}
                    variant="filled"
                    input={
                      <FilledInput
                        id="slate-wrapper-template-entry-id"
                        placeholder={this.props.i18nRichInfo.setLink.templatedPlaceholder}
                      />
                    }
                  >
                    <MenuItem value="">
                      <em>{this.props.i18nRichInfo.setLink.templatedUnspecified}</em>
                    </MenuItem>
                    {
                      // render the valid values that we display and choose
                      linkPropertiesToUse.map((vv) => {
                        // the i18n value from the i18n data
                        return <MenuItem key={vv.value} value={vv.value}>{
                          vv.label
                        }</MenuItem>;
                      })
                    }
                  </Select>
                </FormControl>
              </div> :
              null
          }
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
          shouldHaveDrawer={this.shouldHaveDrawer}
          drawerOpen={this.state.drawerOpen}
          toggleDrawer={this.toggleDrawer}
          requestLink={this.requestLink}
        />
        <div className={"rich-text " + this.props.classes.editorContainer}>
          <div className={this.props.classes.editor + (this.props.info.isFocused ? " focused" : "")}>
            {this.props.children}
          </div>
          <div className={this.props.classes.editorDrawer + (this.state.drawerOpen ? " open" : "")} />
        </div>
        {fileLoadErrorDialog}
        {videoDialog}
        {linkDialog}
        {imageInput}
        {fileInput}
      </>
    );
  }
}

export const MaterialUISlateWrapper = withStyles(style)(MaterialUISlateWrapperClass);
