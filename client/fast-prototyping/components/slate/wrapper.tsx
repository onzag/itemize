/**
 * This file contains the fast prototyping wrapper that uses the material UI elements
 * in order to create the slate editor for the PropertyViewText
 * 
 * The wrapper component is added as a property to the slate editor itself so other wrappers
 * can be added as replacement, you can also design your own wrapper based on this one
 * 
 * @packageDocumentation
 */

import { IPropertyEntryI18nRichTextInfo } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import React, { useEffect, useState } from "react";
import { ISlateEditorStateType, ISlateEditorWrapperBaseProps } from ".";
import {
  IconButton, Toolbar, WithStyles, withStyles, createStyles, AppBar,
  AttachFileIcon, VideoLibraryIcon, InsertPhotoIcon, FormatListBulletedIcon,
  FormatListNumberedIcon, FormatQuoteIcon, TitleIcon, FormatUnderlinedIcon, FormatItalicIcon,
  FormatBoldIcon, MoreHorizIcon, ExpandLessIcon, Divider, LinkIcon, CheckBoxOutlineBlankIcon,
  TextFieldsIcon, CodeIcon, Badge,
} from "../../mui-core";
import { Path, Range, Text } from "slate";
import { RichElement } from "../../../internal/text/serializer";
import { WrapperDrawer } from "./drawer";
import { FileLoadErrorDialog } from "./dialogs/file";
import { LinkDialog } from "./dialogs/link";
import { VideoDialog } from "./dialogs/video";
import { TemplateElementDialog } from "./dialogs/template-element";

/**
 * Defining a bunch of styles for the wrapper
 */
const style = createStyles({
  selectionInput: {
    width: "100%",
  },
  box: {
    padding: "0.5rem",
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  input: {
    width: "100%",
  },
  editorContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  wrapperButton: {
    fontSize: "0.5rem",
    padding: "0.1rem 0.5rem 0.2rem 0.5rem",
    borderLeft: "solid 2px #ccc",
    borderRadius: 0,
  },
  treeChildrenBox: {
    padding: "0 0 0 0.5rem",
    borderLeft: "solid 1px #ccc",
  },
  treeDataBox: {
    width: "100%",
    position: "relative",
    maxHeight: "360px",
    overflowY: "auto",
    flex: "1 0 auto",
  },
  dropPositionEnabled: {
    height: "0.5rem",
    border: "dashed 1px #ccc",
    "&:hover": {
      border: "dashed 1px green",
    },
  },
  dropPositionDisabled: {
    height: "0.5rem",
    border: "solid 1px invisible",
  },
  separator: {
    margin: "1rem 0",
  },
  tab: {
    minWidth: "auto",
  },
  badge: {
    transform: "scale(1) translate(0%, 0%)",
  },
  badgeDisabled: {
    transform: "scale(1) translate(0%, 0%)",
    opacity: 0.5,
  },
  elementTitle: {
    textTransform: "capitalize",
    fontWeight: 700,
    color: "#444",
    fontSize: "1rem",
    height: "1rem",
    flex: "0 0 1rem",
  },
  editorDrawer: {
    width: 0,
    height: 0,
    transition: "width 0.5s ease-in-out, height 0.5s ease-in-out",
    "&.open": {
      width: "300px",
      height: "800px",
    },
    overflow: "hidden",
    position: "relative",
    flex: "none",
  },
  editorDrawerNoAnimate: {
    transition: "none",
  },
  editorDrawerBody: {
    width: "300px",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    backgroundColor: "#f5f5f5",
    padding: "1rem",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  drawerSettingsForNodePaper: {
    flex: "0 1 auto",
    overflowY: "auto",
  },
  editor: (props: ISlateEditorWrapperBaseProps) => {
    const shouldShowInvalidEditor = !props.state.currentValid;
    return {
      "flex": "1 1 100%",
      "position": "relative",
      "padding": props.state.isRichText ? "1rem" : "0 1rem 1rem 1rem",
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
  linkTemplateOptionsBox: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem 0 0 0",
  },
  linkTemplateOptionsText: {
    width: "100%",
    textAlign: "center",
    color: "#aaa",
    paddingBottom: "1rem",
  },
});

/**
 * These are the base props that this wrapper uses, note how we extend the base wrapper props as defined
 * in the slate editor itself, and add the styles for the classes and these i18n info
 * 
 * If you wonder how the i18n information is to be added, in the PropertyEntryText when creating
 * the slate editor as a component the wrapper can receive wrapperArgs so these args are passed
 * when the editor is created with the wrapper itself
 */
export interface MaterialUISlateWrapperWithStyles extends ISlateEditorWrapperBaseProps, WithStyles<typeof style> {
  /**
   * A generic error message
   */
  i18nGenericError: string;
  /**
   * A generic ok
   */
  i18nOk: string;
  /**
   * The whole of the i18n rich information that is given by default
   */
  i18nRichInfo: IPropertyEntryI18nRichTextInfo;
};

/**
 * These are the rich text editor toolbar properties they basically take the same
 * that the entire wrapper does, but adding these functions and flags taken from
 * the state of the wrapper or other functions
 */
interface RichTextEditorToolbarProps extends MaterialUISlateWrapperWithStyles {
  /**
   * Whether the drawer is open, the drawer is the side drawer that contains
   * a lot of functionality to edit the currently selected element
   */
  drawerOpen: boolean;

  /**
   * The current state
   */
  state: ISlateEditorStateType;

  /**
   * call to request an image, opens a dialog so requires a state
   */
  requestImage: () => void;

  /**
   * Call to request a file, opens a dialog so requires a state
   */
  requestFile: () => void;

  /**
   * Call to request a video, opens a dialog so requires a state
   */
  requestVideo: () => void;

  /**
   * Call to request a link, opens a dialog so requires a state
   */
  requestLink: () => void;

  /**
   * A function that specifies whether the drawer should
   * exist
   * @returns a boolean as the answer
   */
  shouldHaveDrawer: () => boolean;

  /**
   * Toggle the drawer open or close
   */
  toggleDrawer: () => void;

  /**
   * Call to insert a container, opens a dialog so requires a state
   */
  insertContainer: () => void;

  /**
   * Call to insert a template text bit from the context, opens a dialog so requires a state
   */
  requestTemplateText: () => void;

  /**
   * Call to insert a template html bit from the context, opens a dialog so requires a state
   */
  requestTemplateHTML: () => void;
}

/**
 * This is the function component that represents the toolbar for the wrapper
 * @param props the entire rich text editor toolbar props with all the added functions
 */
function RichTextEditorToolbar(props: RichTextEditorToolbarProps) {
  // issues with the badge and SSR
  const [isReady, makeReady] = useState(false);
  useEffect(() => {
    makeReady(true);
  }, []);

  // no rich text
  if (!props.state.isRichText) {
    // no toolbar
    return null;
  }

  let templateTextAmount = 0;
  let templateHTMLAmount = 0;
  let templateLinkAmount = 0;

  if (props.featureSupport.supportsTemplating && props.state.currentContext) {
    Object.keys(props.state.currentContext.properties).forEach((key) => {
      const property = props.state.currentContext.properties[key];

      // but they must be the given element type
      if (property.type === "text") {
        templateTextAmount++;
      } else if (property.type === "html") {
        templateHTMLAmount++;
      } else if (property.type === "link") {
        templateLinkAmount++;
      }
    });
  }

  let linkBaseComponent = props.featureSupport.supportsLinks ? (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatLinkLabel}
      color={props.state.currentSelectedElement && props.state.currentSelectedElement.type === "link" ? "primary" : "default"}
      disabled={!props.featureSupport.canInsertLink}
      onClick={props.requestLink}
      onMouseDown={props.helpers.blockBlur}
      onMouseUp={props.helpers.releaseBlur}
    >
      <LinkIcon />
    </IconButton>
  ) : null;

  if (props.featureSupport.supportsLinks && templateLinkAmount && isReady) {
    linkBaseComponent = <Badge
      badgeContent={templateLinkAmount}
      color="secondary"
      classes={{ badge: props.state.currentSelectedElement ? props.classes.badge : props.classes.badgeDisabled }}
    >{linkBaseComponent}</Badge>
  }

  let templateTextBaseComponent: React.ReactNode = null;

  if (templateTextAmount && isReady) {
    templateTextBaseComponent = <Badge
      badgeContent={templateTextAmount}
      color="secondary"
      classes={{ badge: props.state.currentSelectedElement ? props.classes.badge : props.classes.badgeDisabled }}
    >
      <IconButton
        tabIndex={-1}
        title={props.i18nRichInfo.formatAddTemplateText}
        disabled={!props.state.currentSelectedElement}
        onMouseDown={props.helpers.blockBlur}
        onClick={props.requestTemplateText}
        onMouseUp={props.helpers.releaseBlur}
      >
        <TextFieldsIcon />
      </IconButton>
    </Badge>
  }

  let templateHTMLBaseComponent: React.ReactNode = null;

  if (templateHTMLAmount && isReady) {
    templateHTMLBaseComponent = <Badge
      badgeContent={templateHTMLAmount}
      color="secondary"
      classes={{ badge: props.state.currentSelectedElement ? props.classes.badge : props.classes.badgeDisabled }}
    >
      <IconButton
        tabIndex={-1}
        title={props.i18nRichInfo.formatAddTemplateHTML}
        disabled={!props.featureSupport.canInsertContainer}
        onMouseDown={props.helpers.blockBlur}
        onClick={props.requestTemplateHTML}
        onMouseUp={props.helpers.releaseBlur}
      >
        <CodeIcon />
      </IconButton>
    </Badge>
  }

  let toolbarExtras: React.ReactNode[] = null;
  if (props.toolbarExtras && props.toolbarExtras.length) {
    toolbarExtras = props.toolbarExtras.map((x, index) => (
      <IconButton
        key={index}
        tabIndex={-1}
        title={x.title}
        disabled={!props.featureSupport.canInsertAnyElement}
        onMouseDown={props.helpers.blockBlur}
        onMouseUp={props.helpers.releaseBlur}
        onClick={props.helpers.insertElement.bind(null, x.element, null)}
      >
        {x.icon}
      </IconButton>
    ));
  }

  let currentSuperBlockElement = props.state.currentSuperBlockElement;
  if (!currentSuperBlockElement && props.state.currentSelectedElement && props.state.currentSelectedElement.containment === "superblock") {
    currentSuperBlockElement = props.state.currentSelectedElement;
  }

  // now we can create the component itself
  // there is not much to say on how this all works
  return (
    <AppBar position="relative" variant="outlined" color="default" className={props.classes.appbar} data-unblur="true">
      <Toolbar className={props.classes.toolbar}>
        <IconButton
          tabIndex={-1}
          title={props.i18nRichInfo.formatBoldLabel}
          disabled={!props.state.currentSelectedText}
          color={props.state.currentSelectedText && props.state.currentSelectedText.bold ? "primary" : "default"}
          onMouseDown={props.helpers.blockBlur}
          onMouseUp={props.helpers.releaseBlur}
          onClick={props.helpers.formatToggleBold}
        >
          <FormatBoldIcon />
        </IconButton>
        <IconButton
          tabIndex={-1}
          title={props.i18nRichInfo.formatItalicLabel}
          disabled={!props.state.currentSelectedText}
          color={props.state.currentSelectedText && props.state.currentSelectedText.italic ? "primary" : "default"}
          onMouseDown={props.helpers.blockBlur}
          onMouseUp={props.helpers.releaseBlur}
          onClick={props.helpers.formatToggleItalic}
        >
          <FormatItalicIcon />
        </IconButton>
        <IconButton
          tabIndex={-1}
          title={props.i18nRichInfo.formatUnderlineLabel}
          disabled={!props.state.currentSelectedText}
          color={props.state.currentSelectedText && props.state.currentSelectedText.underline ? "primary" : "default"}
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
        {linkBaseComponent}
        {
          props.featureSupport.supportsTitle ?
            <IconButton
              tabIndex={-1}
              title={props.i18nRichInfo.formatTitleLabel}
              color={props.state.currentSelectedElement && props.state.currentSelectedElement.type === "title" ? "primary" : "default"}
              disabled={!props.featureSupport.canInsertTitle}
              onClick={props.helpers.toggleTitle.bind(null, "h1", null)}
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
              color={props.state.currentSelectedElement && props.state.currentSelectedElement.type === "quote" ? "primary" : "default"}
              disabled={!props.featureSupport.canInsertQuote}
              onClick={props.helpers.toggleQuote.bind(null, null)}
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
                currentSuperBlockElement && currentSuperBlockElement.type === "list" &&
                  currentSuperBlockElement.listType === "numbered" ? "primary" : "default"
              }
              disabled={!props.featureSupport.canInsertList}
              onClick={props.helpers.toggleList.bind(null, "numbered", null)}
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
              title={props.i18nRichInfo.formatListBulletedLabel}
              color={
                currentSuperBlockElement && currentSuperBlockElement.type === "list" &&
                  currentSuperBlockElement.listType === "bulleted" ? "primary" : "default"
              }
              disabled={!props.featureSupport.canInsertList}
              onClick={props.helpers.toggleList.bind(null, "bulleted", null)}
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
        {
          props.featureSupport.supportsContainers ||
            toolbarExtras ||
            templateTextBaseComponent ||
            templateHTMLBaseComponent ?
            <Divider orientation="vertical" className={props.classes.divider} /> :
            null
        }
        {
          props.featureSupport.supportsContainers ?
            <IconButton
              tabIndex={-1}
              title={props.i18nRichInfo.formatAddContainerLabel}
              disabled={!props.featureSupport.canInsertContainer}
              onMouseDown={props.helpers.blockBlur}
              onClick={props.insertContainer}
              onMouseUp={props.helpers.releaseBlur}
            >
              <CheckBoxOutlineBlankIcon />
            </IconButton> :
            null
        }
        {templateTextBaseComponent}
        {templateHTMLBaseComponent}
        {toolbarExtras}
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

/**
 * This is the state for the wrapper
 * the state is necessary as the wrapper can hold dialogs open
 * and the drawer itself
 */
export interface MaterialUISlateWrapperState {
  /**
   * Specifies whether the video dialog to input the url for the video is open
   */
  videoDialogOpen: boolean;

  /**
   * Specifies whether the link dialog to input links and template links is open
   */
  linkDialogOpen: boolean;

  /**
   * Specifies whether the link dialog to input templated text is open
   */
  templateTextDialogOpen: boolean;

  /**
   * Specifies whether the link dialog to input templated html is open
   */
  templateHTMLDialogOpen: boolean;

  /**
   * Specifies the state of the drawer
   */
  drawerOpen: boolean;

  /**
   * The drawer being open or closed is stored in local storage, which is not available in the server
   * side, and the drawer animates when it's opened and closed, so this variable is always false at the
   * start, the drawer is always closed at the start, however, if we need to open the drawer at the start
   * on mount we don't want any animation so we toggle this flag temporarily, it doesn't need to be part
   * of the state as it's only used there
   */
  noAnimate: boolean;

  /**
   * When opening a dialog and losing focus to the slate rich text editor content editable
   * we lose access to the anchors and current elements now that we are in focus of something
   * else so we need to store the element that was the current element that was in focus
   * before that happened
   */
  elementThatWasCurrentBeforeLosingFocus: RichElement;
}

/**
 * This represents the unwrapped class that is used for the wrapper, it is not
 * the exported one because it needs to be withStyles for stylization
 */
class MaterialUISlateWrapperClass extends React.PureComponent<MaterialUISlateWrapperWithStyles, MaterialUISlateWrapperState> {
  /**
   * The ref object for the input object for image input
   */
  private inputImageRef: React.RefObject<HTMLInputElement>;

  /**
   * The ref object for the input object for any file input
   */
  private inputFileRef: React.RefObject<HTMLInputElement>;

  /**
   * This is the range that was in place before losing focus, it is used because
   * when opening some dialog, the insertion or change needs to happen at a given
   * selection range, but that is lost when losing focus, so we need to remember it
   */
  private originalSelectionArea: Range;
  /**
   * If instead of having a selection area we had a selection path as a selected element
   * because we were workign in the range
   */
  private originalSelectionPath: Path;

  /**
   * this is used to ensure a refocus after the native dialogs for file and for image that
   * are used to get a file are closed; while we need to wait for the input event to trigger
   * we don't know if that happens first as there are no guarantees so we delay it a little bit
   * and the change event might not even trigger
   */
  private refocusTimeout: NodeJS.Timeout;

  /**
   * Constructs a new material ui based wrapper for the slate editor
   * @param props the base properties that every wrapper gets extended for this specific wrapper
   */
  constructor(props: MaterialUISlateWrapperWithStyles) {

    // super calling
    super(props);

    // setup the initial state
    this.state = {
      videoDialogOpen: false,
      linkDialogOpen: false,
      templateTextDialogOpen: false,
      templateHTMLDialogOpen: false,
      elementThatWasCurrentBeforeLosingFocus: null,

      // keep SSR compatibility by keeping the drawer closed at the start
      // as we cannot read local storage in the server side
      drawerOpen: false,
      noAnimate: true,
    }

    // create the refs
    this.inputImageRef = React.createRef();
    this.inputFileRef = React.createRef();

    // bind all the functions
    this.onImageLoad = this.onImageLoad.bind(this);
    this.onFileLoad = this.onFileLoad.bind(this);
    this.requestImage = this.requestImage.bind(this);
    this.requestFile = this.requestFile.bind(this);
    this.requestVideo = this.requestVideo.bind(this);
    this.requestLink = this.requestLink.bind(this);
    this.requestTemplateText = this.requestTemplateText.bind(this);
    this.closeDialogVideo = this.closeDialogVideo.bind(this);
    this.closeDialogLink = this.closeDialogLink.bind(this);
    this.closeDialogTemplateText = this.closeDialogTemplateText.bind(this);
    this.acceptVideo = this.acceptVideo.bind(this);
    this.onFileEventedReFocus = this.onFileEventedReFocus.bind(this);
    this.refocus = this.refocus.bind(this);
    this.shouldHaveDrawer = this.shouldHaveDrawer.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.acceptLink = this.acceptLink.bind(this);
    this.insertContainer = this.insertContainer.bind(this);
    this.insertTemplateText = this.insertTemplateText.bind(this);
    this.requestTemplateHTML = this.requestTemplateHTML.bind(this);
    this.closeDialogTemplateHTML = this.closeDialogTemplateHTML.bind(this);
    this.insertTemplateHTML = this.insertTemplateHTML.bind(this);
    this.selectiveHardBlur = this.selectiveHardBlur.bind(this);
  }

  /**
   * During the mount event
   */
  public componentDidMount() {
    // if we should have a drawer
    if (this.shouldHaveDrawer()) {
      // and set the state of the drawer based on the local storage value
      this.setState({
        drawerOpen: localStorage.getItem("SLATE_DRAWER_OPEN") === "true",
        noAnimate: true,
      }, () => {
        // We need to wait 300 seconds because as usual
        // some bug in react causes states to stack
        setTimeout(() => {
          // and re-enable the animation
          // if the drawer opened it won't animate
          // this keeps SSR compatibility
          this.setState({
            noAnimate: false,
          })
        }, 300);
      });
    } else {
      // otherwise animation is enabled
      this.setState({
        noAnimate: false,
      });
    }

    document.body.addEventListener("mousedown", this.selectiveHardBlur);
    document.body.addEventListener("touchstart", this.selectiveHardBlur);
  }

  public componentWillUnmount() {
    document.body.removeEventListener("mousedown", this.selectiveHardBlur);
    document.body.removeEventListener("touchstart", this.selectiveHardBlur);
  }

  public selectiveHardBlur(e: MouseEvent) {
    if (this.props.state.currentSelectedElement) {
      if ((e.target as any).parentElement) {
        if (!this.isParentedBySlateOrUnblurred(e.target as any)) {
          this.props.helpers.hardBlur();
        }
      } else {
        this.props.helpers.hardBlur();
      }
    }
  }

  public isParentedBySlateOrUnblurred(ele: HTMLElement): boolean {
    if (ele.dataset.unblur || ele.dataset.slateNode || ele.dataset.slateLeaf || ele.dataset.slateVoid) {
      return true;
    }

    if (ele.parentElement) {
      return this.isParentedBySlateOrUnblurred(ele.parentElement);
    }

    return false;
  }

  /**
   * Specifies on whether it should have a drawer
   * @returns a boolean on this fact
   */
  public shouldHaveDrawer() {
    // basically not rich text
    if (!this.props.featureSupport) {
      return false;
    }
    // a drawer is only necessary if we support all of these
    // beause that's what we configure in the drawer
    return !!(
      this.props.featureSupport.supportsTemplating ||
      this.props.featureSupport.supportsCustomStyles ||
      this.props.featureSupport.supportsContainers ||
      this.props.featureSupport.supportedCustoms ||
      this.props.featureSupport.supportsRichClasses
    );
  }

  /**
   * Executes in order to open the dialog in order to request an image
   * via this file upload dialog
   */
  public requestImage() {
    // we add the focus listener for the refocus when the dialog closes
    document.body.addEventListener("focus", this.onFileEventedReFocus, { capture: true });
    // get the original selection area
    this.originalSelectionArea = this.props.state.currentText ? this.props.helpers.editor.selection : null;
    this.originalSelectionPath = this.props.state.currentSelectedElementAnchor;
    // trigger a click
    this.inputImageRef.current.click();
  }

  /**
   * Executes in order to open the dialog in order to request an file
   * via this file upload dialog
   */
  public requestFile() {
    // we add the focus listener for the refocus when the dialog closes
    document.body.addEventListener("focus", this.onFileEventedReFocus, { capture: true });
    // get the original selection area
    this.originalSelectionArea = this.props.state.currentText ? this.props.helpers.editor.selection : null;
    this.originalSelectionPath = this.props.state.currentSelectedElementAnchor;
    // trigger a click
    this.inputFileRef.current.click();
  }

  /**
   * Opens/closes the drawer
   */
  public toggleDrawer() {
    // we take the new state that we will be using as the opposite of  the current
    const newState = !this.state.drawerOpen;

    // put it in the state
    this.setState({
      drawerOpen: newState,
    });

    // and put it in local storage
    localStorage.setItem("SLATE_DRAWER_OPEN", JSON.stringify(newState));
  }

  /**
   * Refocuses as the original selection area that was focused
   * mainly used by dialogs once they haave closed
   */
  public refocus() {
    if (this.originalSelectionArea) {
      this.props.helpers.focusAt(this.originalSelectionArea);
    } else if (this.originalSelectionPath) {
      this.props.helpers.selectPath(this.originalSelectionPath);
    }
  }

  /**
   * Triggers once the document has recovered focus from the file
   * dialog that is native for the file upload
   */
  public onFileEventedReFocus() {
    // remove the old listener from the body
    document.body.removeEventListener("focus", this.onFileEventedReFocus, { capture: true });

    // we do it this way because this is a hacky way and we are not sure
    // on whether the focus event will trigger before the input event,
    // that comes from the file input dialog, the input should come first
    // as the file is to upload, but we make no assumptions
    this.refocusTimeout = setTimeout(this.refocus, 30);
  }

  /**
   * Triggers the state change to open the html based dialog for
   * requesting a video
   */
  public requestVideo() {
    // save the selection area before losing focus
    this.originalSelectionArea = this.props.state.currentText ? this.props.helpers.editor.selection : null;
    this.originalSelectionPath = this.props.state.currentSelectedElementAnchor;
    // set the state to open the dialog
    this.setState({
      videoDialogOpen: true,
    });
  }

  /**
   * Triggers the state change to open the html based dialog for
   * requesting insertion of a template text bit
   */
  public requestTemplateText() {
    // save the selection area before losing focus
    this.originalSelectionArea = this.props.state.currentText ? this.props.helpers.editor.selection : null;
    this.originalSelectionPath = this.props.state.currentSelectedElementAnchor;
    // set the state to open the dialog
    this.setState({
      templateTextDialogOpen: true,
    });
  }

  /**
   * Triggers the state change to open the html based dialog for
   * requesting insertion of a template html bit
   */
  public requestTemplateHTML() {
    // save the selection area before losing focus
    this.originalSelectionArea = this.props.state.currentText ? this.props.helpers.editor.selection : null;
    this.originalSelectionPath = this.props.state.currentSelectedElementAnchor;
    // set the state to open the dialog
    this.setState({
      templateHTMLDialogOpen: true,
    });
  }

  /**
   * Triggers the state change to open the html based dialog for
   * requesting insertion of a link or template link if available
   */
  public requestLink() {
    // save the selection area before losing focus
    this.originalSelectionArea = this.props.state.currentText ? this.props.helpers.editor.selection : null;
    this.originalSelectionPath = this.props.state.currentSelectedElementAnchor;
    // now we open the dialog and we also save
    // the current element because we might be opening
    // in order to modify the current link
    this.setState({
      linkDialogOpen: true,
      elementThatWasCurrentBeforeLosingFocus: this.props.state.currentSelectedElement,
    });
  }

  /**
   * Closes the dialog for the video input
   */
  public closeDialogVideo() {
    // refocus back to where we were focused originally as we
    // saved before opening the dialog
    this.refocus();
    // close the dialog
    this.setState({
      videoDialogOpen: false,
    });
  }

  /**
   * Closes the dialog for the link input
   */
  public closeDialogLink() {
    // refocus back to where we were focused originally as we
    // saved before opening the dialog
    this.refocus();
    // change the state to close the dialog
    this.setState({
      linkDialogOpen: false,
    });
  }

  /**
   * Closes the dialog for the template text input
   */
  public closeDialogTemplateText() {
    // refocus back to where we were focused originally as we
    // saved before opening the dialog
    this.refocus();
    // change the state to close the dialog
    this.setState({
      templateTextDialogOpen: false,
    });
  }

  /**
   * Closes the dialog for the template html input
   */
  public closeDialogTemplateHTML() {
    // refocus back to where we were focused originally as we
    // saved before opening the dialog
    this.refocus();
    // change the state to close the dialog
    this.setState({
      templateHTMLDialogOpen: false,
    });
  }

  /**
   * Inserts a container, a basic one in place
   */
  public insertContainer() {
    // basically just calls the helper to insert the container
    this.props.helpers.insertContainer();
  }

  /**
   * This function gets executed before the dialog for the video
   * closes in order to accept the video url
   * @param videoURL the video url in question
   * @returns a boolean on whether the insertion succeeded
   */
  public acceptVideo(videoURL: string) {
    // we need to pass the original selection area to tell the helper
    // where we are about to insert that video, in which range
    // this will cause a refocus there
    return this.props.helpers.insertVideo(videoURL, this.originalSelectionArea || this.originalSelectionPath);
  }

  /**
   * This function gets executed before the dialog for the video
   * closes in order to accept the video url
   * @param videoURL the video url in question
   * @returns a boolean on whether the insertion succeeded
   */
  public acceptLink(linkURL: string, linkTValue: string) {
    // we need to pass the original selection area to tell the helper
    // where we are about to insert that link, in which range
    // this will cause a refocus there
    return this.props.helpers.toggleLink(linkURL, linkTValue, this.originalSelectionArea || this.originalSelectionPath);
  }

  /**
   * Inserts a template text bit in the last location that was
   * selected
   * @param label the label that will be shown 
   * @param value the value off the context to be taken to replace
   */
  public insertTemplateText(label: string, value: string) {
    // we need to pass the original selection area to tell the helper
    // where we are about to insert that template text, in which range
    // this will cause a refocus there
    this.props.helpers.insertTemplateText(label, value, this.originalSelectionArea || this.originalSelectionPath);
  }

  /**
   * Inserts a template html in the last location that was
   * selected
   * @param label the label that will be shown 
   * @param value the value off the context to be taken to replace
   */
  public insertTemplateHTML(label: string, value: string) {
    // we need to pass the original selection area to tell the helper
    // where we are about to insert that template html, in which range
    // this will cause a refocus there
    this.props.helpers.insertTemplateHTML(label, value, this.originalSelectionArea || this.originalSelectionPath);
  }

  /**
   * This function gets called once the image input calls the on change event
   * which means it has been loaded by the input itself and it's available for
   * reading
   * @param e the change event that contains the file 
   */
  public async onImageLoad(e: React.ChangeEvent<HTMLInputElement>) {
    // remove the listener for the whole input for the refocus back into the field
    document.body.removeEventListener("focus", this.onFileEventedReFocus, { capture: true });
    // clear a timeout in case there is one for this refocus, since the event
    // might refer to a cancel, then we need to ensure it is cancelled
    // as this function itself will refocus after the image is inserted
    clearTimeout(this.refocusTimeout);
    // now we pick the image
    const file = e.target.files[0];
    e.target.value = "";
    // and insert it
    this.props.helpers.insertImage(file, false, this.originalSelectionArea || this.originalSelectionPath);
  }

  /**
   * This function gets called once the file input calls the on change event
   * which means it has been loaded by the input itself and it's available for
   * reading
   * @param e the change event that contains the file
   */
  public async onFileLoad(e: React.ChangeEvent<HTMLInputElement>) {
    // remove the listener for the whole input for the refocus back into the field
    document.body.removeEventListener("focus", this.onFileEventedReFocus, { capture: true });
    // clear a timeout in case there is one for this refocus, since the event
    // might refer to a cancel, then we need to ensure it is cancelled
    // as this function itself will refocus after the image is inserted
    clearTimeout(this.refocusTimeout);
    // now we pick the file
    const file = e.target.files[0];
    e.target.value = "";
    // and insert it
    this.props.helpers.insertFile(file, this.originalSelectionArea || this.originalSelectionPath);
  }

  /**
   * Standard render function from the wrapper
   */
  public render() {

    // first we build the iamge input if we support it
    const imageInput = this.props.state.isRichText && this.props.featureSupport.supportsImages ? (
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

    // now the general file input
    const fileInput = this.props.state.isRichText && this.props.featureSupport.supportsFiles ? (
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

    // the file load error dialog that shows an error
    // based on the current load error
    const fileLoadErrorDialog =
      this.props.state.isRichText &&
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

    // the video dialog that allows for inserting
    // videos in the rich text based on the url
    const videoDialog = this.props.state.isRichText && this.props.featureSupport.supportsVideos ? (
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

    // the link dialog that allows for inserting links
    // and tempalte links on the markup
    const linkDialog = this.props.state.isRichText && this.props.featureSupport.supportsLinks ? (
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
        currentContext={this.props.state.currentContext}
        linkDialogOpen={this.state.linkDialogOpen}
        selectedElement={this.state.elementThatWasCurrentBeforeLosingFocus}
        supportsExternalLinks={this.props.featureSupport.supportsExternalLinks}
        templateBoxClassName={this.props.classes.linkTemplateOptionsBox}
        templateTextClassName={this.props.classes.linkTemplateOptionsText}
      />
    ) : null;

    // the template text dialog that allows to insert templated text fragments
    // to the markup itself
    const templateTextDialog = this.props.state.isRichText && this.props.featureSupport.supportsTemplating ? (
      <TemplateElementDialog
        insertTemplateElement={this.insertTemplateText}
        closeTemplateElementDialog={this.closeDialogTemplateText}
        templateElementDialogOpen={this.state.templateTextDialogOpen}
        currentContext={this.props.state.currentContext}
        i18nInsertTemplateElementLabel={this.props.i18nRichInfo.addTemplateText.label}
        i18nInsertTemplateElementPlaceholder={this.props.i18nRichInfo.addTemplateText.placeholder}
        i18nInsertTemplateElementSubmit={this.props.i18nRichInfo.addTemplateText.submit}
        i18nInsertTemplateElementTitle={this.props.i18nRichInfo.addTemplateText.title}
        elementType="text"
      />
    ) : null;

    // the template html dialog that allows to insert templated html fragments
    // to the markup itself
    const templateHTMLDialog = this.props.state.isRichText && this.props.featureSupport.supportsTemplating ? (
      <TemplateElementDialog
        insertTemplateElement={this.insertTemplateHTML}
        closeTemplateElementDialog={this.closeDialogTemplateHTML}
        templateElementDialogOpen={this.state.templateHTMLDialogOpen}
        currentContext={this.props.state.currentContext}
        i18nInsertTemplateElementLabel={this.props.i18nRichInfo.addTemplateHTML.label}
        i18nInsertTemplateElementPlaceholder={this.props.i18nRichInfo.addTemplateHTML.placeholder}
        i18nInsertTemplateElementSubmit={this.props.i18nRichInfo.addTemplateHTML.submit}
        i18nInsertTemplateElementTitle={this.props.i18nRichInfo.addTemplateHTML.title}
        elementType="html"
      />
    ) : null;

    // now we build the rich text editor itself
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
          insertContainer={this.insertContainer}
          requestTemplateText={this.requestTemplateText}
          requestTemplateHTML={this.requestTemplateHTML}
        />
        <div className={this.props.classes.editorContainer}>
          <div className={"rich-text " + this.props.classes.editor + (this.props.state.isFocused ? " focused" : "")}>
            {this.props.children}
          </div>
          <div
            data-unblur="true"
            onClick={this.props.helpers.softBlur}
            className={
              this.props.classes.editorDrawer +
              (this.state.drawerOpen ? " open" : "") +
              (this.state.noAnimate ? " " + this.props.classes.editorDrawerNoAnimate : "")
            }
          >
            <div className={this.props.classes.editorDrawerBody}>
              {this.state.drawerOpen ? <WrapperDrawer {...this.props} /> : null}
            </div>
          </div>
        </div>
        {fileLoadErrorDialog}
        {videoDialog}
        {linkDialog}
        {templateTextDialog}
        {templateHTMLDialog}
        {imageInput}
        {fileInput}
      </>
    );
  }
}

// export the thing with styles
export const MaterialUISlateWrapper = withStyles(style)(MaterialUISlateWrapperClass);
