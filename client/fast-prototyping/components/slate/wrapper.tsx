import { IPropertyEntryI18nRichTextInfo } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import React from "react";
import { ISlateEditorWrapperBaseProps } from ".";
import {
  IconButton, Toolbar, WithStyles, withStyles, createStyles, AppBar,
  AttachFileIcon, VideoLibraryIcon, InsertPhotoIcon, FormatListBulletedIcon,
  FormatListNumberedIcon, FormatQuoteIcon, TitleIcon, FormatUnderlinedIcon, FormatItalicIcon,
  FormatBoldIcon, MoreHorizIcon, ExpandLessIcon, Divider, LinkIcon,
} from "../../mui-core";
import { Range } from "slate";
import { RichElement } from "../../../internal/text/serializer";
import { FileLoadErrorDialog, LinkDialog, VideoDialog } from "./dialogs";

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
  linkDialogOpen: boolean;
  drawerOpen: boolean;
  originalSelectedElement: RichElement;
}

class MaterialUISlateWrapperClass extends React.PureComponent<MaterialUISlateWrapperStyles, MaterialUISlateWrapperState> {
  private inputImageRef: React.RefObject<HTMLInputElement>;
  private inputFileRef: React.RefObject<HTMLInputElement>;
  private originalSelectionArea: Range;
  private refocusTimeout: NodeJS.Timeout;
  constructor(props: MaterialUISlateWrapperStyles) {
    super(props);

    this.state = {
      videoDialogOpen: false,
      linkDialogOpen: false,
      drawerOpen: !this.shouldHaveDrawer() ? false : localStorage.getItem("RICH_TEXT_DRAWER_OPEN") === "true",
      originalSelectedElement: null,
    }

    this.inputImageRef = React.createRef();
    this.inputFileRef = React.createRef();

    this.onImageLoad = this.onImageLoad.bind(this);
    this.onFileLoad = this.onFileLoad.bind(this);
    this.requestImage = this.requestImage.bind(this);
    this.requestFile = this.requestFile.bind(this);
    this.requestVideo = this.requestVideo.bind(this);
    this.requestLink = this.requestLink.bind(this);
    this.closeDialogVideo = this.closeDialogVideo.bind(this);
    this.closeDialogLink = this.closeDialogLink.bind(this);
    this.acceptVideo = this.acceptVideo.bind(this);
    this.onFileEventedReFocus = this.onFileEventedReFocus.bind(this);
    this.refocus = this.refocus.bind(this);
    this.shouldHaveDrawer = this.shouldHaveDrawer.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.acceptLink = this.acceptLink.bind(this);
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
    this.setState({
      linkDialogOpen: true,
      originalSelectedElement: this.props.info.currentElement,
    });
  }
  public closeDialogVideo() {
    this.refocus();
    this.setState({
      videoDialogOpen: false,
    });
  }
  public closeDialogLink() {
    this.refocus();
    this.setState({
      linkDialogOpen: false,
    });
  }
  public acceptVideo(videoURL: string) {
    return this.props.helpers.insertVideo(videoURL, this.originalSelectionArea);
  }
  public acceptLink(linkURL: string, linkTValue: string) {
    return this.props.helpers.toggleLink(linkURL, linkTValue);
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

    const fileLoadErrorDialog =
      this.props.info.isRichText &&
        (
          this.props.featureSupport.supportsImages ||
          this.props.featureSupport.supportsFiles
        ) ?
        (
          <FileLoadErrorDialog
            currentLoadError={this.props.currentLoadError}
            dismissCurrentLoadError={this.props.dismissCurrentLoadError}
            i18nGenericError={this.props.i18nGenericError}
            i18nOk={this.props.i18nOk}
          />
        ) : null;

    const videoDialog = this.props.info.isRichText && this.props.featureSupport.supportsVideos ? (
      <VideoDialog
        acceptVideo={this.acceptVideo}
        closeDialogVideo={this.closeDialogVideo}
        videoDialogOpen={this.state.videoDialogOpen}
        i18nLoadVideoInvalid={this.props.i18nRichInfo.loadVideo.invalid}
        i18nLoadVideoLabel={this.props.i18nRichInfo.loadVideo.label}
        i18nLoadVideoPlaceholder={this.props.i18nRichInfo.loadVideo.placeholder}
        i18nLoadVideoSubmit={this.props.i18nRichInfo.loadVideo.submit}
        i18nLoadVideoTitle={this.props.i18nRichInfo.loadVideo.title}
      />
    ) : null;

    

    const linkDialog = this.props.info.isRichText && this.props.featureSupport.supportsLinks ? (
      <LinkDialog
        acceptLink={this.acceptLink}
        closeDialogLink={this.closeDialogLink}
        i18nSetLinkInvalid={this.props.i18nRichInfo.setLink.invalid}
        i18nSetLinkLabel={this.props.i18nRichInfo.setLink.label}
        i18nSetLinkPlaceholder={this.props.i18nRichInfo.setLink.placeholder}
        i18nSetLinkPlaceholderLocalOnly={this.props.i18nRichInfo.setLink.placeholderLocalOnly}
        i18nSetLinkSubmit={this.props.i18nRichInfo.setLink.submit}
        i18nSetLinkTemplated={this.props.i18nRichInfo.setLink.templated}
        i18nSetLinkTemplatedLabel={this.props.i18nRichInfo.setLink.templatedLabel}
        i18nSetLinkTemplatedPlaceholder={this.props.i18nRichInfo.setLink.templatedPlaceholder}
        i18nSetLinkTemplatedUnspecified={this.props.i18nRichInfo.setLink.templatedUnspecified}
        i18nSetLinkTitle={this.props.i18nRichInfo.setLink.title}
        info={this.props.info}
        linkDialogOpen={this.state.linkDialogOpen}
        originalSelectedElement={this.state.originalSelectedElement}
        supportsExternalLinks={this.props.featureSupport.supportsExternalLinks}
      />
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
