/**
 * This file contains the fast prototyping wrapper that uses the material UI elements
 * in order to create the slate editor for the PropertyViewText
 * 
 * The wrapper component is added as a property to the slate editor itself so other wrappers
 * can be added as replacement, you can also design your own wrapper based on this one
 * 
 * @module
 */

import { IPropertyEntryI18nRichTextInfo } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import React from "react";
import { IHelperFunctions, ISlateEditorStateType, ISlateEditorWrapperBaseProps } from ".";
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
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import LinkIcon from "@material-ui/icons/Link";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CodeIcon from "@material-ui/icons/Code";

import { Path, Range } from "slate";
import { RichElement } from "../../../internal/text/serializer";
import { WrapperDrawer } from "./drawer";
import { FileLoadErrorDialog } from "./dialogs/file";
import { LinkDialog } from "./dialogs/link";
import { VideoDialog } from "./dialogs/video";
import { TemplateElementDialog } from "./dialogs/template-element";
import ReactDOM from "react-dom";
import { countSizeAndWords } from "../../../internal/text";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import { Theme, WithStyles, createStyles, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";

/**
 * Defining a bunch of styles for the wrapper
 */
const style = (theme: Theme) => createStyles({
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
  badgeFastKey: {
    transform: "scale(1) translate(0%, 0%)",
    backgroundColor: "#fffde7",
    color: "#212121",
    borderColor: "#f9a825",
  },
  badgeFastKeyShift: {
    transform: "scale(1) translate(0%, 0%)",
    backgroundColor: "#e3f2fd",
    color: "#212121",
    borderColor: "#f9a825",
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
    display: "flex",
    flexDirection: "column",
  },
  editorDrawerAppbarSpacer: theme.mixins.toolbar,
  editorDrawerFixed: {
    top: 0,
    right: 0,
    bottom: 0,
    width: 0,
    zIndex: 1,
    transition: "width 0.5s ease-in-out",
    "&.open": {
      width: "300px",
    },
    overflow: "hidden",
    position: "fixed",
    flex: "none",
    display: "flex",
    flexDirection: "column",
  },
  editorDrawerNoAnimate: {
    transition: "none",
  },
  editorDrawerBody: {
    flex: "1 1 auto",
    width: "300px",
    top: 0,
    left: 0,
    borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    backgroundColor: "#f5f5f5",
    padding: "1rem",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
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
    flexWrap: "wrap",
  },
  divider: {
    border: "solid 1px #ccc",
    height: "2rem",
    margin: "0 0.5rem",
  },
  hdivider: {
    border: "solid 1px #ccc",
    margin: "0.25rem 0.5rem",
    width: "100%",
  },
  hdividerspacer: {
    flex: "1 0 auto",
    width: "100%",
  },
  appbar: {
    zIndex: 1,
  },
  appbarFixed: {
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
  optionPrimary: {
    fontWeight: 700,
    color: "#1b5e20",
  },
  treeElement: {
    display: "flex",
    justifyContent: "space-between",
  },
  deleteButton: {
    height: "1rem",
    width: "1rem",
  },
  deleteIcon: {
    fontSize: "1rem",
  },
});

type RichElementFn = () => RichElement;

/**
 * Refers to toolbar prescence elements that are added
 */
export interface IToolbarPrescenseElement {
  /**
   * Given icon to use in the toolbar
   */
  icon: React.ReactNode;
  /**
   * A title to use
   * if a react node is provided this node will be modified
   * and added a children as (i18nValue: string) => React.Node
   * eg. the i18nRead element
   */
  title?: string | React.ReactNode;
  /**
   * The element to be added
   */
  element?: RichElement | RichElementFn;
  /**
   * Alternatively an action
   */
  onClick?: (defaultAction: () => RichElement) => void;
  /**
   * Manually specify whether it's disabled
   * if not specified it will check whether an element
   * can be inserted as it assumes it's about the insertion
   * of the element
   */
  disabled?: boolean;
  /**
   * The fast key value, if any
   */
  fastKey?: string;
}

/**
 * Specifies a input configuration for the ui handler argument
 * of type select
 */
export interface IDrawerUIHandlerElementConfigSelect {
  type: "select",
  label: string | React.ReactNode;
  fastKey?: string;

  /**
   * A placeholder to use
   * if a react node is provided this node will be modified
   * and added a children as (i18nValue: string) => React.Node
   * eg. the i18nRead element
   */
  placeholder: string | React.ReactNode;
  options: Array<{ value: string, label: string | React.ReactNode }>;
}

/**
 * Specifies an input configuration for the ui handler argument
 * of type input
 */
export interface IDrawerUIHandlerElementConfigInput {
  type: "input";
  label: string | React.ReactNode;
  pattern?: string;
  subtype?: "text" | "number";
  fastKey?: string;

  /**
   * A placeholder to use
   * if a react node is provided this node will be modified
   * and added a children as (i18nValue: string) => React.Node
   * eg. the i18nRead element
   */
  placeholder: string | React.ReactNode;
}

/**
 * Specifies a input configuration for the ui handler argument
 * of type boolean, because all ui handlers are strings
 * this uses the string true or false rather than actual
 * booleans
 */
export interface IDrawerUIHandlerElementConfigBoolean {
  type: "boolean",
  label: string | React.ReactNode;
  fastKey?: string;
}

export interface IDrawerUIHandlerElementConfigCustomProps {
  value: string;
  onChange: (value: string) => void;
  onDelayedChange: (value: string) => void;
  helpers: IHelperFunctions;
  state: ISlateEditorStateType;
  fastKeyActive?: boolean;
}

export interface IDrawerUIHandlerElementConfigCustom {
  type: "custom";
  component: React.ComponentType<IDrawerUIHandlerElementConfigCustomProps>;
}

/**
 * Specifies a configurator to be added to the UI handled element
 * that is created to be chosen in the drawer
 */
export interface IDrawerConfiguratorElementBase {
  /**
   * The ui handler in question
   */
  uiHandler?: null | string | string[];
  /**
   * The element it should work against, by default
   * it is the selected one
   */
  basis?: "selected" | "block" | "superblock";
  /**
   * Will match parent of the given element instead useful for nested
   * superblocks, so if you are in the current super block you may
   * want to match the parent of it instead, eg. if such superblock
   * is not selectable
   */
  basisParent?: number;
  /**
   * The relevant argument of the ui handler
   * if not provided value will be null and change functions wont
   * work
   */
  arg?: string;
  /**
   * A condition that uses the args as basis on whether this would appear or not
   */
  condition?: (state: ISlateEditorStateType) => boolean;
  /**
   * The way for the input to be specified
   */
  input:
  IDrawerUIHandlerElementConfigSelect |
  IDrawerUIHandlerElementConfigInput |
  IDrawerUIHandlerElementConfigBoolean |
  IDrawerUIHandlerElementConfigCustom;
}

export interface IDrawerConfiguratorElementSection {
  /**
   * The ui handler in question
   */
  uiHandler?: string;
  basis?: "selected" | "block" | "superblock";
  /**
   * Will match parent of the given element instead useful for nested
   * superblocks, so if you are in the current super block you may
   * want to match the parent of it instead, eg. if such superblock
   * is not selectable
   */
  basisParent?: number;
  unblur?: boolean;
  title: string | React.ReactNode;
  elements: IDrawerConfiguratorElementBase[];
}

export type DrawerConfiguratorElement = IDrawerConfiguratorElementBase | IDrawerConfiguratorElementSection;

export type SlateEditorWrapperCustomToolbarIdentifiedElement =
  "bold" |
  "italic" |
  "underline" |
  "link" |
  "title" |
  "bulleted-list" |
  "numbered-list" |
  "image" |
  "video" |
  "file" |
  "quote" |
  "container" |
  "template-text" |
  "template-html" |
  "extras" |
  "none" |
  "divider" |
  "hdivider";

export type SlateEditorWrapperCustomToolbarElementBaseForm =
  IToolbarPrescenseElement |
  SlateEditorWrapperCustomToolbarIdentifiedElement;

export type SlateEditorWrapperCustomToolbarElementFnForm = (toolbarProps: any) =>
  SlateEditorWrapperCustomToolbarElementBaseForm;

export type SlateEditorWrapperCustomToolbarElement =
  SlateEditorWrapperCustomToolbarElementBaseForm |
  SlateEditorWrapperCustomToolbarElementFnForm;

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
  /**
   * Function that should be specified to assign extra toolbar elements
   * to be used either by ui handled components and whatnot
   */
  toolbarExtras?: IToolbarPrescenseElement[];
  /**
   * Function to be used to specify a whole custom toolbar down to the very basics
   */
  customToolbar?: SlateEditorWrapperCustomToolbarElement[];
  /**
   * Drawer extras for the ui handled types
   */
  drawerExtras?: DrawerConfiguratorElement[];
  /**
   * Whether to hide the drawer
   */
  hideDrawer?: boolean;
  /**
   * Whether to hide the tree
   */
  hideTree?: boolean;
  /**
   * Drawer mode
   */
  drawerMode?: "full" | "with-styles" | "simple" | "barebones";
  /**
   * The disjointed mode
   */
  disjointedMode?: boolean;
  /**
   * Add a class name to the entire wrapper
   */
  wrapperClassName?: string;
  /**
   * Add a class name to the container in the wrapper
   */
  wrapperTextEditorClassName?: string;
  /**
   * A function to define custom extra children
   */
  customExtraChildren?: (characterCount: number, wordCount: number) => React.ReactNode;
};

/**
 * These are the rich text editor toolbar properties they basically take the same
 * that the entire wrapper does, but adding these functions and flags taken from
 * the state of the wrapper or other functions
 */
export interface RichTextEditorToolbarProps extends MaterialUISlateWrapperWithStyles {
  /**
   * Whether the drawer is open, the drawer is the side drawer that contains
   * a lot of functionality to edit the currently selected element
   */
  drawerOpen: boolean;

  /**
   * Whether the alt key is pressed right now
   * and it should show the effects
   */
  altKey: boolean;

  /**
   * Whether the shift key is pressed right now
   */
  shiftKey: boolean;

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
  /**
   * Called when the height changes
   */
  onHeightChange: (newHeight: number) => void;
}

interface RichTextEditorToolbarState {
  isReady: boolean;
}

interface RichTextEditorToolbarElementProps extends RichTextEditorToolbarState, RichTextEditorToolbarProps {
  fastKey: string;
};

function elementBadgeReturn(
  props: RichTextEditorToolbarElementProps,
  element: React.ReactNode,
  fastKeyOverride?: string,
  shiftKey?: boolean,
): any {
  if (props.altKey && (shiftKey ? props.shiftKey : !props.shiftKey) && (fastKeyOverride || props.fastKey)) {
    return (
      <Badge
        badgeContent={fastKeyOverride || props.fastKey}
        color="primary"
        classes={{ badge: shiftKey ? props.classes.badgeFastKeyShift : props.classes.badgeFastKey }}
      >
        {element}
      </Badge>
    );
  } else {
    return element;
  }
}

function Bold(props: RichTextEditorToolbarElementProps) {
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatBoldLabel}
      disabled={!props.state.currentSelectedText}
      color={props.state.currentSelectedText && props.state.currentSelectedText.bold ? "primary" : "default"}
      onMouseDown={props.helpers.blockBlur}
      onMouseUp={props.helpers.releaseBlur}
      onClick={props.helpers.formatToggleBold}
      data-fastkey={props.fastKey}
    >
      <FormatBoldIcon />
    </IconButton>
  );

  return elementBadgeReturn(props, element);
}

function Italic(props: RichTextEditorToolbarElementProps) {
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatItalicLabel}
      disabled={!props.state.currentSelectedText}
      color={props.state.currentSelectedText && props.state.currentSelectedText.italic ? "primary" : "default"}
      onMouseDown={props.helpers.blockBlur}
      onMouseUp={props.helpers.releaseBlur}
      onClick={props.helpers.formatToggleItalic}
      data-fastkey={props.fastKey}
    >
      <FormatItalicIcon />
    </IconButton>
  );

  return elementBadgeReturn(props, element);
}

function Underline(props: RichTextEditorToolbarElementProps) {
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatUnderlineLabel}
      disabled={!props.state.currentSelectedText}
      color={props.state.currentSelectedText && props.state.currentSelectedText.underline ? "primary" : "default"}
      onMouseDown={props.helpers.blockBlur}
      onMouseUp={props.helpers.releaseBlur}
      onClick={props.helpers.formatToggleUnderline}
      data-fastkey={props.fastKey}
    >
      <FormatUnderlinedIcon />
    </IconButton>
  );

  return elementBadgeReturn(props, element);
}

function VDivider(props: RichTextEditorToolbarElementProps) {
  return (
    <Divider orientation="vertical" className={props.classes.divider} />
  );
}

function HDivider(props: RichTextEditorToolbarElementProps) {
  return (
    <>
      <div className={props.classes.hdividerspacer} />
      <Divider orientation="horizontal" className={props.classes.hdivider} />
    </>
  );
}

function Link(props: RichTextEditorToolbarElementProps) {
  let templateLinkAmount = 0;

  if (props.featureSupport.supportsTemplating && props.state.currentSelectedElementContext) {
    Object.keys(props.state.currentSelectedElementContext.properties).forEach((key) => {
      const property = props.state.currentSelectedElementContext.properties[key];

      // but they must be the given element type
      if (property.type === "link") {
        templateLinkAmount++;
      }
    });
  }

  if (
    props.featureSupport.supportsTemplating &&
    props.state.currentRootContext &&
    props.state.currentRootContext !== props.state.currentSelectedElementContext
  ) {
    Object.keys(props.state.currentRootContext.properties).forEach((key) => {
      const property = props.state.currentRootContext.properties[key];
      if ((property as any).nonRootInheritable) {
        return;
      }

      // but they must be the given element type
      if (property.type === "link") {
        templateLinkAmount++;
      }
    });
  }

  let linkBaseComponent = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatLinkLabel}
      color={props.state.currentSelectedElement && props.state.currentSelectedElement.type === "link" ? "primary" : "default"}
      disabled={!props.featureSupport.canInsertLink}
      onClick={props.requestLink}
      onMouseDown={props.helpers.blockBlur}
      onMouseUp={props.helpers.releaseBlur}
      data-fastkey={props.fastKey}
    >
      <LinkIcon />
    </IconButton>
  );

  if (props.altKey && props.fastKey) {
    return elementBadgeReturn(props, linkBaseComponent);
  }

  if (props.featureSupport.supportsLinks && templateLinkAmount && props.isReady) {
    linkBaseComponent = <Badge
      badgeContent={templateLinkAmount}
      color="secondary"
      classes={{ badge: props.state.currentSelectedElement ? props.classes.badge : props.classes.badgeDisabled }}
    >{linkBaseComponent}</Badge>
  }

  return linkBaseComponent;
}

function Title(props: RichTextEditorToolbarElementProps) {
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatTitleLabel}
      color={props.state.currentSelectedElement && props.state.currentSelectedElement.type === "title" ? "primary" : "default"}
      disabled={!props.featureSupport.canInsertTitle}
      onClick={props.helpers.toggleTitle.bind(null, "h1", null)}
      onMouseDown={props.helpers.blockBlur}
      onMouseUp={props.helpers.releaseBlur}
      data-fastkey={props.fastKey}
    >
      <TitleIcon />
    </IconButton>
  );

  return elementBadgeReturn(props, element);
}

function Quote(props: RichTextEditorToolbarElementProps) {
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatQuoteLabel}
      color={props.state.currentSelectedElement && props.state.currentSelectedElement.type === "quote" ? "primary" : "default"}
      disabled={!props.featureSupport.canInsertQuote}
      onClick={props.helpers.toggleQuote.bind(null, null)}
      onMouseDown={props.helpers.blockBlur}
      onMouseUp={props.helpers.releaseBlur}
      data-fastkey={props.fastKey}
    >
      <FormatQuoteIcon />
    </IconButton>
  );

  return elementBadgeReturn(props, element);
}


function NumberedList(props: RichTextEditorToolbarElementProps) {
  const currentSuperBlockElement = props.state.currentSelectedSuperBlockElement;
  let parentOfSuperblock: RichElement = null;
  if (currentSuperBlockElement && currentSuperBlockElement.type === "list-item") {
    const parentAnchor = [...props.state.currentSelectedSuperBlockElementAnchor];
    parentAnchor.pop();
    parentOfSuperblock = props.helpers.Node.get(props.helpers.editor, parentAnchor) as any as RichElement;
  }

  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatListNumberedLabel}
      color={
        parentOfSuperblock && parentOfSuperblock.type === "list" &&
          parentOfSuperblock.listType === "numbered" ? "primary" : "default"
      }
      disabled={!props.featureSupport.canInsertList}
      onClick={props.helpers.toggleList.bind(null, "numbered", null)}
      onMouseDown={props.helpers.blockBlur}
      onMouseUp={props.helpers.releaseBlur}
      data-fastkey={props.fastKey}
    >
      <FormatListNumberedIcon />
    </IconButton>
  );

  return elementBadgeReturn(props, element);
}

function BulletedList(props: RichTextEditorToolbarElementProps) {
  const currentSuperBlockElement = props.state.currentSelectedSuperBlockElement;
  let parentOfSuperblock: RichElement = null;
  if (currentSuperBlockElement && currentSuperBlockElement.type === "list-item") {
    const parentAnchor = [...props.state.currentSelectedSuperBlockElementAnchor];
    parentAnchor.pop();
    parentOfSuperblock = props.helpers.Node.get(props.helpers.editor, parentAnchor) as any as RichElement;
  }

  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatListBulletedLabel}
      color={
        parentOfSuperblock && parentOfSuperblock.type === "list" &&
          parentOfSuperblock.listType === "bulleted" ? "primary" : "default"
      }
      disabled={!props.featureSupport.canInsertList}
      onClick={props.helpers.toggleList.bind(null, "bulleted", null)}
      onMouseDown={props.helpers.blockBlur}
      onMouseUp={props.helpers.releaseBlur}
      data-fastkey={props.fastKey}
    >
      <FormatListBulletedIcon />
    </IconButton>
  );

  return elementBadgeReturn(props, element);
}

function Image(props: RichTextEditorToolbarElementProps) {
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatAddImageLabel}
      disabled={!props.featureSupport.canInsertImage}
      onClick={props.requestImage}
      onMouseDown={props.helpers.blockBlur}
      onMouseUp={props.helpers.releaseBlur}
      data-fastkey={props.fastKey}
    >
      <InsertPhotoIcon />
    </IconButton>
  );

  return elementBadgeReturn(props, element);
}

function Video(props: RichTextEditorToolbarElementProps) {
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatAddVideoLabel}
      disabled={!props.featureSupport.canInsertVideo}
      onMouseDown={props.helpers.blockBlur}
      onClick={props.requestVideo}
      onMouseUp={props.helpers.releaseBlur}
      data-fastkey={props.fastKey}
    >
      <VideoLibraryIcon />
    </IconButton>
  );

  return elementBadgeReturn(props, element);
}

function File(props: RichTextEditorToolbarElementProps) {
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatAddFileLabel}
      disabled={!props.featureSupport.canInsertFile}
      onMouseDown={props.helpers.blockBlur}
      onClick={props.requestFile}
      onMouseUp={props.helpers.releaseBlur}
      data-fastkey={props.fastKey}
    >
      <AttachFileIcon />
    </IconButton>
  );

  return elementBadgeReturn(props, element);
}

function Container(props: RichTextEditorToolbarElementProps) {
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatAddContainerLabel}
      disabled={!props.featureSupport.canInsertContainer}
      onMouseDown={props.helpers.blockBlur}
      onClick={props.insertContainer}
      onMouseUp={props.helpers.releaseBlur}
      data-fastkey={props.fastKey}
    >
      <CheckBoxOutlineBlankIcon />
    </IconButton>
  );

  return elementBadgeReturn(props, element);
}

function TemplateText(props: RichTextEditorToolbarElementProps) {
  if (!props.isReady) {
    return null;
  }

  let templateTextAmount = 0;

  if (props.featureSupport.supportsTemplating && props.state.currentSelectedElementContext) {
    Object.keys(props.state.currentSelectedElementContext.properties).forEach((key) => {
      const property = props.state.currentSelectedElementContext.properties[key];

      // but they must be the given element type
      if (property.type === "text") {
        templateTextAmount++;
      }
    });
  }

  if (
    props.featureSupport.supportsTemplating &&
    props.state.currentRootContext &&
    props.state.currentRootContext !== props.state.currentSelectedElementContext
  ) {
    Object.keys(props.state.currentRootContext.properties).forEach((key) => {
      const property = props.state.currentRootContext.properties[key];
      if ((property as any).nonRootInheritable) {
        return;
      }

      // but they must be the given element type
      if (property.type === "text") {
        templateTextAmount++;
      }
    });
  }

  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatAddTemplateText}
      disabled={!props.state.currentSelectedElement}
      onMouseDown={props.helpers.blockBlur}
      onClick={props.requestTemplateText}
      onMouseUp={props.helpers.releaseBlur}
      data-fastkey={props.fastKey}
    >
      <TextFieldsIcon />
    </IconButton>
  );

  if (props.fastKey && props.altKey) {
    return elementBadgeReturn(props, element);
  }

  return (
    <Badge
      badgeContent={templateTextAmount}
      color="secondary"
      classes={{ badge: props.state.currentSelectedElement ? props.classes.badge : props.classes.badgeDisabled }}
    >
      {element}
    </Badge>
  );
}

function TemplateHTML(props: RichTextEditorToolbarElementProps) {
  if (!props.isReady) {
    return null;
  }

  let templateHTMLAmount = 0;

  if (
    props.featureSupport.supportsTemplating &&
    props.state.currentSelectedElementContext
  ) {
    Object.keys(props.state.currentSelectedElementContext.properties).forEach((key) => {
      const property = props.state.currentSelectedElementContext.properties[key];

      // but they must be the given element type
      if (property.type === "html") {
        templateHTMLAmount++;
      }
    });
  }

  if (
    props.featureSupport.supportsTemplating &&
    props.state.currentRootContext &&
    props.state.currentRootContext !== props.state.currentSelectedElementContext
  ) {
    Object.keys(props.state.currentRootContext.properties).forEach((key) => {
      const property = props.state.currentRootContext.properties[key];
      if ((property as any).nonRootInheritable) {
        return;
      }

      // but they must be the given element type
      if (property.type === "html") {
        templateHTMLAmount++;
      }
    });
  }

  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatAddTemplateHTML}
      disabled={!props.featureSupport.canInsertContainer}
      onMouseDown={props.helpers.blockBlur}
      onClick={props.requestTemplateHTML}
      onMouseUp={props.helpers.releaseBlur}
      data-fastkey={props.fastKey}
    >
      <CodeIcon />
    </IconButton>
  );

  if (props.fastKey && props.altKey) {
    return elementBadgeReturn(props, element);
  }

  return (
    <Badge
      badgeContent={templateHTMLAmount}
      color="secondary"
      classes={{ badge: props.state.currentSelectedElement ? props.classes.badge : props.classes.badgeDisabled }}
    >
      {element}
    </Badge>
  );
}

interface IToolbarExtraProps extends RichTextEditorToolbarElementProps {
  extra: IToolbarPrescenseElement;
}

function ToolbarExtra(props: IToolbarExtraProps) {
  const defaultAction = () => {
    const element = typeof props.extra.element === "function" ? props.extra.element() : props.extra.element;
    props.helpers.insertElement(element, null);
    return element;
  }
  const basicProps = {
    tabIndex: -1,
    disabled: (
      typeof props.extra.disabled !== "undefined" ?
        props.extra.disabled :
        !props.featureSupport.canInsertAnyElement
    ),
    onMouseDown: props.helpers.blockBlur,
    onMouseUp: props.helpers.releaseBlur,
    onClick: props.extra.onClick ? props.extra.onClick.bind(null, defaultAction) : defaultAction,
  }

  let returnNode: React.ReactNode;
  if (typeof props.extra.title === "string" || !props.extra.title) {
    returnNode = (
      <IconButton
        {...basicProps}
        title={props.extra.title as string}
        data-fastkey={props.extra.fastKey}
      >
        {props.extra.icon}
      </IconButton>
    );
  } else {
    const element: React.ReactElement = props.extra.title as any;
    const elementCloned = React.cloneElement(element, {
      children: (i18nTitle: string) => (
        <IconButton
          {...basicProps}
          title={i18nTitle}
          data-fastkey={props.extra.fastKey}
        >
          {props.extra.icon}
        </IconButton>
      )
    });

    returnNode = elementCloned;
  }

  if (props.altKey && props.extra.fastKey) {
    return elementBadgeReturn(props, returnNode, props.extra.fastKey);
  } else {
    return returnNode;
  }
}

function ToolbarExtras(props: RichTextEditorToolbarElementProps) {
  if (props.toolbarExtras && props.toolbarExtras.length) {
    const toolbarExtras = props.toolbarExtras.map((x, index) => {
      return (
        <ToolbarExtra {...props} extra={x} key={index} fastKey={null} />
      );
    });

    return (
      <>
        {toolbarExtras}
      </>
    );
  }

  return null;
}

function None(): any {
  return null;
}

const toolbarRegistry: Record<SlateEditorWrapperCustomToolbarIdentifiedElement, React.ElementType<RichTextEditorToolbarElementProps>> = {
  none: None,
  italic: Italic,
  bold: Bold,
  underline: Underline,
  "bulleted-list": BulletedList,
  "numbered-list": NumberedList,
  "template-html": TemplateHTML,
  "template-text": TemplateText,
  title: Title,
  container: Container,
  divider: VDivider,
  hdivider: HDivider,
  extras: ToolbarExtras,
  file: File,
  image: Image,
  link: Link,
  quote: Quote,
  video: Video,
}

const toolbarFastKeyRegistry: Record<SlateEditorWrapperCustomToolbarIdentifiedElement, string> = {
  none: null,
  italic: "i",
  bold: "b",
  underline: "u",
  "bulleted-list": "d",
  "numbered-list": "n",
  "template-html": "h",
  "template-text": "j",
  title: "t",
  container: "c",
  file: "f",
  image: "p",
  link: "l",
  quote: "q",
  video: "v",
  extras: null,
  divider: null,
  hdivider: null,
}

/**
 * This is the function component that represents the toolbar for the wrapper
 * @param props the entire rich text editor toolbar props with all the added functions
 */
class RichTextEditorToolbar extends React.Component<RichTextEditorToolbarProps, RichTextEditorToolbarState> {

  private appBarHeader: HTMLElement;

  constructor(props: RichTextEditorToolbarProps) {
    super(props);
    // issues with the badge and SSR
    this.state = {
      isReady: false,
    }
  }

  componentDidMount() {
    this.setState({
      isReady: true,
    });

    this.props.onHeightChange(this.getHeight());
  }

  componentDidUpdate() {
    this.props.onHeightChange(this.getHeight());
  }

  public getHeight() {
    return this.appBarHeader && this.appBarHeader.offsetHeight;
  }

  public getAppbarHeader() {
    return this.appBarHeader;
  }

  public render() {
    // no rich text
    if (!this.props.state.isRichText) {
      // no toolbar
      return null;
    }

    if (this.props.disjointedMode && !this.props.state.currentSelectedElement) {
      return null;
    }

    let templateTextAmount = 0;
    let templateHTMLAmount = 0;

    if (
      !this.props.customToolbar &&
      this.props.featureSupport.supportsTemplating &&
      this.props.state.currentSelectedElementContext
    ) {
      Object.keys(this.props.state.currentSelectedElementContext.properties).forEach((key) => {
        const property = this.props.state.currentSelectedElementContext.properties[key];

        // but they must be the given element type
        if (property.type === "text") {
          templateTextAmount++;
        } else if (property.type === "html") {
          templateHTMLAmount++;
        }
      });
    }

    if (
      !this.props.customToolbar &&
      this.props.featureSupport.supportsTemplating &&
      this.props.state.currentRootContext &&
      this.props.state.currentRootContext !== this.props.state.currentSelectedElementContext
    ) {
      Object.keys(this.props.state.currentRootContext.properties).forEach((key) => {
        const property = this.props.state.currentRootContext.properties[key];
        if ((property as any).nonRootInheritable) {
          return;
        }

        // but they must be the given element type
        if (property.type === "text") {
          templateTextAmount++;
        } else if (property.type === "html") {
          templateHTMLAmount++;
        }
      });
    }

    const toolbarForm: SlateEditorWrapperCustomToolbarElement[] = (
      this.props.customToolbar || [
        "bold",
        "italic",
        "underline",
        (
          this.props.featureSupport.supportsTitle ||
          this.props.featureSupport.supportsQuote ||
          this.props.featureSupport.supportsLinks ||
          this.props.featureSupport.supportsLists
        ) ? "divider" : "none",
        this.props.featureSupport.supportsLinks ? "link" : "none",
        this.props.featureSupport.supportsTitle ? "title" : "none",
        this.props.featureSupport.supportsQuote ? "quote" : "none",
        this.props.featureSupport.supportsLists ? "bulleted-list" : "none",
        this.props.featureSupport.supportsLists ? "numbered-list" : "none",
        (
          this.props.featureSupport.supportsImages ||
          this.props.featureSupport.supportsFiles ||
          this.props.featureSupport.supportsVideos
        ) ? "divider" : "none",
        this.props.featureSupport.supportsImages ? "image" : "none",
        this.props.featureSupport.supportsFiles ? "file" : "none",
        this.props.featureSupport.supportsVideos ? "video" : "none",
        (
          this.props.featureSupport.supportsContainers ||
          (this.props.toolbarExtras && this.props.toolbarExtras.length) ||
          templateTextAmount ||
          templateHTMLAmount
        ) ? "divider" : "none",
        this.props.featureSupport.supportsContainers ? "container" : "none",
        templateTextAmount ? "template-text" : "none",
        templateHTMLAmount ? "template-html" : "none",
        this.props.toolbarExtras && this.props.toolbarExtras.length ? "extras" : "none",
      ]
    ).map((v) => {
      if (typeof (v) === "function") {
        return v(this.props);
      }

      return v;
    });

    let drawerButton = (
      this.props.shouldHaveDrawer() ?
        <IconButton
          tabIndex={-1}
          onMouseDown={this.props.helpers.blockBlur}
          onClick={this.props.toggleDrawer}
          onMouseUp={this.props.helpers.releaseBlur}
        >
          {this.props.drawerOpen ? <ExpandLessIcon /> : <MoreHorizIcon />}
        </IconButton> :
        null
    );

    if (this.props.altKey) {
      if (this.props.shiftKey) {
        if (this.props.drawerOpen) {
          drawerButton = elementBadgeReturn(this.props as any, drawerButton, "↑↓", true);
        }
      } else {
        drawerButton = elementBadgeReturn(this.props as any, drawerButton, this.props.drawerOpen ? "↑" : "↓");
      }
    }

    // now we can create the component itself
    // there is not much to say on how this all works
    const toReturn = (
      <AppBar
        position={this.props.disjointedMode ? "fixed" : "relative"}
        variant="outlined"
        color="default"
        className={
          this.props.disjointedMode ? this.props.classes.appbarFixed : this.props.classes.appbar
        }
        data-unblur="true"
        ref={(obj) => {
          this.appBarHeader = obj as any;
        }}
      >
        <Toolbar className={this.props.classes.toolbar}>
          {toolbarForm.map((ele, index) => {
            if (typeof ele === "string") {
              const Element = toolbarRegistry[ele];
              return (
                <Element
                  {...this.props}
                  isReady={this.state.isReady}
                  key={index}
                  fastKey={toolbarFastKeyRegistry[ele]}
                />
              );
            } else {
              const extraValue = typeof ele === "function" ? ele(this.props) : ele;
              return (
                <ToolbarExtra
                  {...this.props}
                  isReady={this.state.isReady}
                  key={index}
                  extra={extraValue as IToolbarPrescenseElement}
                  fastKey={null}
                />
              );
            }
          })}
          <div className={this.props.classes.moreOptionsSpacer} />
          {drawerButton}
        </Toolbar>
      </AppBar>
    );

    if (this.props.disjointedMode && this.state.isReady) {
      return ReactDOM.createPortal(toReturn, document.body);
    } else if (this.props.disjointedMode) {
      return null;
    } else {
      return toReturn;
    }
  }
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
   * Specifies the height of the toolbar for use
   * when the drawer is open in disjointed mode
   */
  toolbarHeight: number;

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

  /**
   * Whether the alt key is currently pressed
   */
  altKey: boolean;
  shiftKey: boolean;
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
   * A ref to the container
   */
  private wrapperContainerRef: React.RefObject<WrapperContainer>;

  /**
   * A ref for the toolbar
   */
  private toolbarRef: React.RefObject<RichTextEditorToolbar>;

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
   * The accumulated fast key combo
   */
  private accumulatedFastKeyCombo: string;

  private isUnmounted: boolean;

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
      toolbarHeight: 0,
      noAnimate: true,
      altKey: false,
      shiftKey: false,
    }

    this.isUnmounted = false;

    // create the refs
    this.inputImageRef = React.createRef();
    this.inputFileRef = React.createRef();
    this.wrapperContainerRef = React.createRef();
    this.toolbarRef = React.createRef();

    // bind all the functions
    this.onHeightChange = this.onHeightChange.bind(this);
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
    this.keyDownListener = this.keyDownListener.bind(this);
    this.keyUpListener = this.keyUpListener.bind(this);
    this.visibilityListener = this.visibilityListener.bind(this);
    this.windowfocusListener = this.windowfocusListener.bind(this);

    this.accumulatedFastKeyCombo = "";
  }

  public onHeightChange(newHeight: number) {
    if (this.state.toolbarHeight !== newHeight) {
      this.setState({
        toolbarHeight: newHeight,
      });
    }
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
          !this.isUnmounted && this.setState({
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
    document.body.addEventListener("keyup", this.keyUpListener);
    document.body.addEventListener("keydown", this.keyDownListener);
    window.addEventListener("focus", this.windowfocusListener);
    document.addEventListener("visibilitychange", this.visibilityListener);
  }

  public componentWillUnmount() {
    document.body.removeEventListener("mousedown", this.selectiveHardBlur);
    document.body.removeEventListener("touchstart", this.selectiveHardBlur);
    document.body.removeEventListener("keyup", this.keyUpListener);
    document.body.removeEventListener("keydown", this.keyDownListener);
    window.removeEventListener("focus", this.windowfocusListener);
    document.removeEventListener("visibilitychange", this.visibilityListener);
    this.isUnmounted = true;
  }

  public keyDownListener(e: KeyboardEvent) {
    if (this.props.state.currentSelectedElement) {
      if (e.key === "Alt") {
        this.setState({
          altKey: true,
        });
      } else if (e.key === "Shift") {
        this.setState({
          shiftKey: true,
        });
      }
    }

    if (
      this.state.altKey &&
      e.key !== "Alt" &&
      e.key !== "Shift"
    ) {
      e.preventDefault();

      if (
        !this.state.shiftKey &&
        ((e.key === "ArrowUp" && this.state.drawerOpen) ||
          (e.key === "ArrowDown" && !this.state.drawerOpen))
      ) {
        this.toggleDrawer();
        this.accumulatedFastKeyCombo = "";
      } else if (this.state.shiftKey && this.state.drawerOpen && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
        this.scrollDrawer(e.key === "ArrowUp" ? "up" : "down");
        this.accumulatedFastKeyCombo = "";
      } else {
        let actualKeyCombo = e.key.toLowerCase();
        if (actualKeyCombo === "arrowleft") {
          actualKeyCombo = "←";
        } else if (actualKeyCombo === "arrowright") {
          actualKeyCombo = "→";
        }

        actualKeyCombo = this.accumulatedFastKeyCombo + actualKeyCombo;

        const fastkeySelector = (this.state.shiftKey ? "s" : "") + "fastkey";
        const selector = "[data-" + fastkeySelector + "=\"" + actualKeyCombo + "\"]";
        const toolbarElementMatching = this.toolbarRef.current &&
          this.toolbarRef.current.getAppbarHeader().querySelector(selector);
        const drawerElementMatching = this.wrapperContainerRef.current &&
          this.wrapperContainerRef.current.getDrawerBody().querySelector(selector)
        const elementMatching = toolbarElementMatching || drawerElementMatching;
        if (elementMatching instanceof HTMLInputElement) {
          elementMatching.focus();
          this.accumulatedFastKeyCombo = "";
        } else if (elementMatching instanceof HTMLElement) {
          elementMatching.click();
          this.accumulatedFastKeyCombo = "";
        } else {
          this.accumulatedFastKeyCombo = actualKeyCombo;
        }
      }
    }
  }

  public keyUpListener(e: KeyboardEvent) {
    if (e.key === "Tab") {
      this.selectiveHardBlur(e);
    }

    if (this.state.altKey && e.key === "Alt") {
      this.setState({
        altKey: false,
      });
      this.accumulatedFastKeyCombo = "";
    }

    if (this.state.shiftKey && e.key === "Shift") {
      this.setState({
        shiftKey: false,
      });
      this.accumulatedFastKeyCombo = "";
    }
  }

  public selectiveHardBlur(e: MouseEvent | KeyboardEvent) {
    if (this.props.state.currentSelectedElement) {
      if ((e.target as any).parentElement) {
        if (!this.isParentedBySlateOrUnblurred(e.target as any)) {
          this.props.helpers.hardBlur();
          this.setState({
            altKey: false,
            shiftKey: false,
          });
        }
      } else {
        this.props.helpers.hardBlur();
        this.setState({
          altKey: false,
          shiftKey: false,
        });
      }
    }
  }

  public visibilityListener() {
    if (document.visibilityState === "hidden") {
      this.setState({
        altKey: false,
        shiftKey: false,
      });
    }
  }

  public windowfocusListener() {
    this.setState({
      altKey: false,
      shiftKey: false,
    });
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
    if (!this.props.featureSupport || this.props.hideDrawer) {
      return false;
    }
    // a drawer is only necessary if we support all of these
    // beause that's what we configure in the drawer
    return !!(
      this.props.featureSupport.supportsTemplating ||
      this.props.featureSupport.supportsCustomStyles ||
      this.props.featureSupport.supportsContainers ||
      this.props.featureSupport.supportedCustoms ||
      this.props.featureSupport.supportsRichClasses ||
      this.props.drawerExtras
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
    this.setState({
      altKey: false,
      shiftKey: false,
    });
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
    this.setState({
      altKey: false,
      shiftKey: false,
    });
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
   * Scrolls the drawer in a given direction, used for accessibility purposes
   * only truly valid in disjointed mode
   * @param direction 
   */
  public scrollDrawer(direction: "up" | "down") {
    const body = this.wrapperContainerRef.current && this.wrapperContainerRef.current.getDrawerBody();
    if (body) {
      let amount = direction === "up" ? -50 : 50;
      body.scroll({
        top: body.scrollTop + amount,
        behavior: "smooth",
      });
    }
  }

  /**
   * Refocuses as the original selection area that was focused
   * mainly used by dialogs once they haave closed
   */
  public refocus() {
    if (this.isUnmounted) {
      return;
    }

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
        currentContext={this.props.state.currentSelectedElementContext}
        currentRootContext={this.props.state.currentRootContext}
        linkDialogOpen={this.state.linkDialogOpen}
        selectedElement={this.state.elementThatWasCurrentBeforeLosingFocus}
        supportsExternalLinks={this.props.featureSupport.supportsExternalLinks}
        templateBoxClassName={this.props.classes.linkTemplateOptionsBox}
        templateTextClassName={this.props.classes.linkTemplateOptionsText}
        optionPrimaryClassName={this.props.classes.optionPrimary}
      />
    ) : null;

    // the template text dialog that allows to insert templated text fragments
    // to the markup itself
    const templateTextDialog = this.props.state.isRichText && this.props.featureSupport.supportsTemplating ? (
      <TemplateElementDialog
        insertTemplateElement={this.insertTemplateText}
        closeTemplateElementDialog={this.closeDialogTemplateText}
        templateElementDialogOpen={this.state.templateTextDialogOpen}
        currentContext={this.props.state.currentSelectedElementContext}
        currentRootContext={this.props.state.currentRootContext}
        i18nInsertTemplateElementLabel={this.props.i18nRichInfo.addTemplateText.label}
        i18nInsertTemplateElementPlaceholder={this.props.i18nRichInfo.addTemplateText.placeholder}
        i18nInsertTemplateElementSubmit={this.props.i18nRichInfo.addTemplateText.submit}
        i18nInsertTemplateElementTitle={this.props.i18nRichInfo.addTemplateText.title}
        elementType="text"
        optionPrimaryClassName={this.props.classes.optionPrimary}
      />
    ) : null;

    // the template html dialog that allows to insert templated html fragments
    // to the markup itself
    const templateHTMLDialog = this.props.state.isRichText && this.props.featureSupport.supportsTemplating ? (
      <TemplateElementDialog
        insertTemplateElement={this.insertTemplateHTML}
        closeTemplateElementDialog={this.closeDialogTemplateHTML}
        templateElementDialogOpen={this.state.templateHTMLDialogOpen}
        currentContext={this.props.state.currentSelectedElementContext}
        currentRootContext={this.props.state.currentRootContext}
        i18nInsertTemplateElementLabel={this.props.i18nRichInfo.addTemplateHTML.label}
        i18nInsertTemplateElementPlaceholder={this.props.i18nRichInfo.addTemplateHTML.placeholder}
        i18nInsertTemplateElementSubmit={this.props.i18nRichInfo.addTemplateHTML.submit}
        i18nInsertTemplateElementTitle={this.props.i18nRichInfo.addTemplateHTML.title}
        elementType="html"
        optionPrimaryClassName={this.props.classes.optionPrimary}
      />
    ) : null;

    const toolbar = (
      <RichTextEditorToolbar
        {...this.props}
        ref={this.toolbarRef}
        altKey={this.state.altKey}
        shiftKey={this.state.shiftKey}
        onHeightChange={this.onHeightChange}
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
    );

    let extraChildren: React.ReactNode = null;
    if (this.props.customExtraChildren) {
      const [characterCount, wordCount] = countSizeAndWords(this.props.state.currentValue);
      extraChildren = this.props.customExtraChildren(characterCount, wordCount);
    }

    if (this.props.disjointedMode) {
      return (
        <>
          {toolbar}
          <div className={
            (this.props.wrapperClassName ? " " + this.props.wrapperClassName : "")
          }>
            <div className={
              "rich-text " +
              (this.props.wrapperTextEditorClassName ? " " + this.props.wrapperTextEditorClassName : "") +
              (this.props.state.isFocused ? " focused" : "")
            }>
              {this.props.children}
            </div>
            {extraChildren}
          </div>
          <WrapperContainer
            ref={this.wrapperContainerRef}
            {...this.props}
            drawerOpen={this.state.drawerOpen}
            noAnimate={this.state.noAnimate}
            toolbarHeight={this.state.toolbarHeight}
            fastKeyActive={this.state.altKey && this.state.shiftKey}
          />
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

    // now we build the rich text editor itself
    return (
      <>
        {toolbar}
        <div className={
          this.props.classes.editorContainer +
          (this.props.wrapperClassName ? " " + this.props.wrapperClassName : "")
        }>
          <div className={
            "rich-text " +
            this.props.classes.editor +
            (this.props.wrapperTextEditorClassName ? " " + this.props.wrapperTextEditorClassName : "") +
            (this.props.state.isFocused ? " focused" : "")
          }>
            {this.props.children}
          </div>
          {extraChildren}
          <WrapperContainer
            {...this.props}
            ref={this.wrapperContainerRef}
            drawerOpen={this.state.drawerOpen}
            noAnimate={this.state.noAnimate}
            toolbarHeight={this.state.toolbarHeight}
            fastKeyActive={this.state.altKey && this.state.shiftKey}
          />
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

export interface IWrapperContainerProps extends MaterialUISlateWrapperWithStyles {
  drawerOpen: boolean;
  toolbarHeight: number;
  noAnimate: boolean;
  fastKeyActive: boolean;
}

interface IWrapperContainerState {
  isReady: boolean;
}

class WrapperContainer extends React.Component<IWrapperContainerProps, IWrapperContainerState> {
  private editorDrawerBodyRef: React.RefObject<HTMLDivElement>;
  constructor(props: IWrapperContainerProps) {
    super(props);

    this.state = {
      isReady: false,
    }

    this.editorDrawerBodyRef = React.createRef();
  }
  public componentDidMount() {
    this.setState({
      isReady: true,
    });
  }
  public getDrawerBody() {
    return this.editorDrawerBodyRef.current;
  }
  public render() {
    if (this.props.disjointedMode && !this.props.state.currentSelectedElement) {
      return null;
    }

    const toReturn = (
      <div
        data-unblur="true"
        onClick={this.props.helpers.softBlur}
        className={
          (this.props.disjointedMode ? this.props.classes.editorDrawerFixed : this.props.classes.editorDrawer) +
          (this.props.drawerOpen ? " open" : "") +
          (this.props.noAnimate ? " " + this.props.classes.editorDrawerNoAnimate : "")
        }
      >
        {
          this.props.disjointedMode && this.props.drawerOpen ?
            <div
              className={this.props.classes.editorDrawerAppbarSpacer}
              style={{ height: this.props.toolbarHeight, flex: "0 0 " + this.props.toolbarHeight + "px" }}
            /> :
            null
        }
        <div className={this.props.classes.editorDrawerBody} ref={this.editorDrawerBodyRef}>
          {this.props.drawerOpen ? <WrapperDrawer {...this.props} /> : null}
        </div>
      </div>
    );

    if (this.props.disjointedMode) {
      if (this.state.isReady) {
        return ReactDOM.createPortal(toReturn, document.body);
      } else {
        return null;
      }
    } else {
      return toReturn;
    }
  }
}

// export the thing with styles
export const MaterialUISlateWrapper = withStyles(style)(MaterialUISlateWrapperClass);
