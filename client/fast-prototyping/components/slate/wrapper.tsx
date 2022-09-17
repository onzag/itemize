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
import { IHelperFunctions, ISlateEditorInternalStateType, ISlateEditorWrapperBaseProps } from ".";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import TitleIcon from "@mui/icons-material/Title";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LinkIcon from "@mui/icons-material/Link";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CodeIcon from "@mui/icons-material/Code";
import ViewModuleIcon from '@mui/icons-material/ViewModule';

import { Path, Range } from "slate";
import { RichElement } from "../../../internal/text/serializer";
import { WrapperDrawer } from "./drawer";
import { FileLoadErrorDialog } from "./dialogs/file";
import ReactDOM from "react-dom";
import { countSizeAndWords } from "../../../internal/text";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { styled, SxProps, Theme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { STANDARD_TEXT_NODE } from "../../../internal/text/serializer/types/text";
import { AltBadgeReactioner } from "../alt-badge-reactioner";

/**
 * Defining a bunch of styles for the wrapper
 */
const style = {
  editorContainer: {
    width: "100%",
    display: "flex" as "flex",
    flexDirection: "row" as "row",
  },
  badge: {
    "&. MuiBadge-badge": {
      transform: "scale(1) translate(0%, 0%)",
    }
  },
  badgeDisabled: {
    "&. MuiBadge-badge": {
      transform: "scale(1) translate(0%, 0%)",
      opacity: 0.5,
    },
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
  editorDrawerAppbarSpacer: (theme: Theme) => {
    // bug in toolbar mixin https://github.com/mui/material-ui/issues/31358
    return (
      {
        minHeight: 54,
        [`${theme.breakpoints.up(0)} and (orientation: landscape)`]: {
          minHeight: 48,
        },
        [`${theme.breakpoints.up(600)} and (orientation: landscape)`]: {
          minHeight: 64,
        },
        [theme.breakpoints.up(600)]: {
          minHeight: 64,
        },
      }
    )
  },
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
  editor: (shouldShowInvalidEditor: boolean, isRichText: boolean) => {
    return {
      "flex": "1 1 100%",
      "position": "relative" as "relative",
      "padding": isRichText ? "1rem" : "0 1rem 1rem 1rem",
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

    "& + hr": {
      display: "none",
    },
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
};

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
  onClick?: (defaultAction: () => RichElement, e: React.MouseEvent<HTMLElement>) => void;
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
  /**
   * For usage with the badge will use a style transform
   * for the alt badge reactioner
   */
  useStyleTransform?: boolean;
  /**
   * will retrigger alt after usage with
   * alt
   */
  useTriggerAltAfterAction?: boolean;

  /**
   * use this priority instead of the standard
   * alt actioner priority
   */
  usePriority?: number;

  /**
   * whether it should be marked as selected
   */
  selected?: boolean;

  /**
   * Adds a custom children at the end of the toolbar
   */
  customChildren?: React.ReactNode;
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
  state: ISlateEditorInternalStateType;
}

export interface IDrawerUIHandlerElementConfigCustom {
  type: "custom";
  component: React.ComponentType<IDrawerUIHandlerElementConfigCustomProps>;
}

/**
 * Specifies a configurator to be added to the drawer
 */
export interface IDrawerConfiguratorElement {
  key?: string | number;
  Component: React.ComponentType<IDrawerContainerProps>;
}

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
  "table" |
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
export interface IMaterialUISlateWrapperProps extends ISlateEditorWrapperBaseProps {
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
  drawerExtras?: IDrawerConfiguratorElement[];
  /**
   * Whether to hide the drawer
   */
  hideDrawer?: boolean;
  /**
   * The disjointed mode
   */
  disjointedMode?: boolean;
  /**
   * Add a class name to the entire wrapper
   */
  wrapperClassName?: string;
  wrapperSx?: SxProps;
  /**
   * Add a class name to the container in the wrapper
   */
  wrapperTextEditorClassName?: string;
  wrapperTextEditorSx?: SxProps;
  /**
   * A function to define custom extra children
   */
  customExtraChildren?: (characterCount: number, wordCount: number) => React.ReactNode;
}

/**
 * These are the rich text editor toolbar properties they basically take the same
 * that the entire wrapper does, but adding these functions and flags taken from
 * the state of the wrapper or other functions
 */
export interface RichTextEditorToolbarProps extends IMaterialUISlateWrapperProps {
  /**
   * Whether the drawer is open, the drawer is the side drawer that contains
   * a lot of functionality to edit the currently selected element
   */
  drawerOpen: boolean;

  /**
   * The current state
   */
  state: ISlateEditorInternalStateType;

  /**
   * A custom toolbar state
   */
  toolbarState: string;

  /**
   * The toolbar height
   */
  toolbarHeight: number;

  /**
   * call to request an image, opens a dialog so requires a state
   */
  requestImage: () => void;

  /**
   * Call to request a file, opens a dialog so requires a state
   */
  requestFile: () => void;

  /**
   * sets the toolbar state
   */
  setToolbarState: (state: string | null) => void;

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
   * Called when the height changes
   */
  onHeightChange: (newHeight: number) => void;
}

interface RichTextEditorToolbarState {
  isReady: boolean;
}

interface RichTextEditorToolbarElementProps extends RichTextEditorToolbarState, RichTextEditorToolbarProps {
  fastKey: string;
  groupIndex: number;
}

function elementFastKeyReturn(
  props: RichTextEditorToolbarElementProps,
  element: React.ReactNode,
  altBadgedChildren: React.ReactNode,
  priority: number,
  groupIndex: number,
  disabled: boolean,
  useStyleTransform?: boolean,
  useTriggerAltAfterAction?: boolean,
  fastKeyOverride?: string,
): any {
  const fastKey = fastKeyOverride || props.fastKey;
  return (
    <AltBadgeReactioner
      reactionKey={fastKey}
      priority={priority}
      disabled={disabled || !props.state.currentSelectedElement}
      altBadgedChildren={altBadgedChildren}
      groupPosition={groupIndex}
      useTransform={useStyleTransform}
      triggerAltAfterAction={useTriggerAltAfterAction}
      selector="button"
    >
      {element}
    </AltBadgeReactioner>
  );
}

function Bold(props: RichTextEditorToolbarElementProps) {
  const disabled = !props.state.currentSelectedText || !props.state.allowsText;
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatBoldLabel}
      disabled={disabled}
      color={props.state.currentSelectedText && props.state.currentSelectedText.bold ? "primary" : "default"}
      onClick={props.helpers.formatToggle.bind(null, "bold")}
      size="large">
      <FormatBoldIcon />
    </IconButton>
  );

  return elementFastKeyReturn(props, element, null, 1, props.groupIndex, disabled, props.disjointedMode);
}

function Italic(props: RichTextEditorToolbarElementProps) {
  const disabled = !props.state.currentSelectedText || !props.state.allowsText;
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatItalicLabel}
      disabled={disabled}
      color={props.state.currentSelectedText && props.state.currentSelectedText.italic ? "primary" : "default"}
      onClick={props.helpers.formatToggle.bind(null, "italic")}
      size="large">
      <FormatItalicIcon />
    </IconButton>
  );

  return elementFastKeyReturn(props, element, null, 1, props.groupIndex, disabled, props.disjointedMode);
}

function Underline(props: RichTextEditorToolbarElementProps) {
  const disabled = !props.state.currentSelectedText || !props.state.allowsText;
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatUnderlineLabel}
      disabled={disabled}
      color={props.state.currentSelectedText && props.state.currentSelectedText.underline ? "primary" : "default"}
      onClick={props.helpers.formatToggle.bind(null, "underline")}
      size="large">
      <FormatUnderlinedIcon />
    </IconButton>
  );

  return elementFastKeyReturn(props, element, null, 1, props.groupIndex, disabled, props.disjointedMode);
}

function VDivider(props: RichTextEditorToolbarElementProps) {
  return (
    <Divider orientation="vertical" sx={style.divider} />
  );
}

function HDivider(props: RichTextEditorToolbarElementProps) {
  return (
    <>
      <Box sx={style.hdividerspacer} />
      <Divider orientation="horizontal" sx={style.hdivider} />
    </>
  );
}

function Link(props: RichTextEditorToolbarElementProps) {
  if (!props.featureSupport.supportsLinks || !props.isReady) {
    return null;
  }

  let templateLinkAmount = 0;

  if (props.featureSupport.supportsTemplating && props.state.currentSelectedBlockContext) {
    Object.keys(props.state.currentSelectedBlockContext.properties).forEach((key) => {
      const property = props.state.currentSelectedBlockContext.properties[key];

      // but they must be the given element type
      if (property.type === "link") {
        templateLinkAmount++;
      }
    });
  }

  if (
    props.featureSupport.supportsTemplating &&
    props.state.currentRootContext &&
    props.state.currentRootContext !== props.state.currentSelectedBlockContext
  ) {
    Object.keys(props.state.currentRootContext.properties).forEach((key) => {
      const property = props.state.currentRootContext.properties[key];
      if (property.nonRootInheritable) {
        return;
      }

      // but they must be the given element type
      if (property.type === "link") {
        templateLinkAmount++;
      }
    });
  }

  const disabled = !props.state.allowsInsertElement({ type: "link", href: "", children: [], thref: null });
  let linkBaseComponent = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatLinkLabel}
      color={
        props.helpers.editor.selection &&
          props.helpers.Range.isCollapsed(props.helpers.editor.selection) &&
          props.state.currentSelectedInlineElement &&
          props.state.currentSelectedInlineElement.type === "link" ?
          "primary" :
          "default"
      }
      disabled={disabled}
      onClick={props.helpers.toggleLink.bind(null, null, null)}
      size="large">
      <LinkIcon />
    </IconButton>
  );

  let linkBadged = linkBaseComponent;
  if (templateLinkAmount && props.isReady) {
    linkBadged = <Badge
      badgeContent={templateLinkAmount}
      color="error"
      sx={props.state.currentSelectedBlockElement ? style.badge : style.badgeDisabled}
    >{linkBaseComponent}</Badge>
  }

  return elementFastKeyReturn(props, linkBadged, linkBaseComponent, 1, props.groupIndex, disabled, props.disjointedMode);
}

function Title(props: RichTextEditorToolbarElementProps) {
  if (!props.featureSupport.supportsTitle) {
    return null;
  }

  const disabled = !props.state.allowsInsertElement({ type: "title", titleType: "h1", children: [] }, { collapsed: true });
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatTitleLabel}
      color={props.state.currentSelectedBlockElement && props.state.currentSelectedBlockElement.type === "title" ? "primary" : "default"}
      disabled={disabled}
      onClick={props.helpers.toggleTitle.bind(null, "h1")}
      size="large">
      <TitleIcon />
    </IconButton>
  );

  return elementFastKeyReturn(props, element, null, 1, props.groupIndex, disabled, props.disjointedMode);
}

function Quote(props: RichTextEditorToolbarElementProps) {
  if (!props.featureSupport.supportsQuote) {
    return null;
  }

  const disabled = !props.state.allowsInsertElement({ type: "quote", children: [] }, { collapsed: true });
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatQuoteLabel}
      color={props.state.currentSelectedBlockElement && props.state.currentSelectedBlockElement.type === "quote" ? "primary" : "default"}
      disabled={disabled}
      onClick={props.helpers.toggleQuote}
      size="large">
      <FormatQuoteIcon />
    </IconButton>
  );

  return elementFastKeyReturn(props, element, null, 1, props.groupIndex, disabled, props.disjointedMode);
}


function NumberedList(props: RichTextEditorToolbarElementProps) {
  if (!props.featureSupport.supportsLists) {
    return null;
  }

  const disabled = !props.state.allowsInsertElement({ type: "list", listType: "numbered", children: [] });
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatListNumberedLabel}
      onClick={props.helpers.insertList.bind(null, "numbered")}
      disabled={disabled}
      size="large">
      <FormatListNumberedIcon />
    </IconButton>
  );

  return elementFastKeyReturn(props, element, null, 1, props.groupIndex, disabled, props.disjointedMode);
}

function BulletedList(props: RichTextEditorToolbarElementProps) {
  if (!props.featureSupport.supportsLists) {
    return null;
  }

  const disabled = !props.state.allowsInsertElement({ type: "list", listType: "bulleted", children: [] });
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatListBulletedLabel}
      onClick={props.helpers.insertList.bind(null, "bulleted")}
      disabled={disabled}
      size="large">
      <FormatListBulletedIcon />
    </IconButton>
  );

  return elementFastKeyReturn(props, element, null, 1, props.groupIndex, disabled, props.disjointedMode);
}

const imgExample = {
  type: "image" as "image",
  children: [STANDARD_TEXT_NODE()] as any,
  width: 0,
  height: 0,
  alt: "",
  src: "",
  srcSet: "",
  srcId: "",
  standalone: false,
  sizes: "",
};

function Image(props: RichTextEditorToolbarElementProps) {
  if (
    !props.featureSupport.supportsLists
  ) {
    return null;
  }

  const disabled = !props.state.allowsInsertElement(imgExample, { selected: true });
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatAddImageLabel}
      disabled={disabled}
      onClick={props.requestImage}
      size="large">
      <InsertPhotoIcon />
    </IconButton>
  );

  return elementFastKeyReturn(props, element, null, 1, props.groupIndex, disabled, props.disjointedMode);
}

const videoExample = {
  type: "video" as "video",
  origin: "youtube" as "youtube",
  src: "",
  children: [STANDARD_TEXT_NODE()] as any,
}

function Video(props: RichTextEditorToolbarElementProps) {
  if (
    !props.featureSupport.supportsVideos
  ) {
    return null;
  }

  const disabled = !props.state.allowsInsertElement(videoExample, { selected: true });
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatAddVideoLabel}
      onClick={props.helpers.insertVideo.bind(null, null)}
      disabled={disabled}
      size="large">
      <VideoLibraryIcon />
    </IconButton>
  );

  return elementFastKeyReturn(props, element, null, 1, props.groupIndex, disabled, props.disjointedMode);
}

const fileExample = {
  type: "file" as "file",
  children: [STANDARD_TEXT_NODE()] as any,
  extension: "",
  fileName: "",
  size: "",
  src: "",
  srcId: "",
};

function File(props: RichTextEditorToolbarElementProps) {
  if (
    !props.featureSupport.supportsFiles
  ) {
    return null;
  }

  const disabled = !props.state.allowsInsertElement(fileExample, { selected: true });
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatAddFileLabel}
      onClick={props.requestFile}
      disabled={disabled}
      size="large">
      <AttachFileIcon />
    </IconButton>
  );

  return elementFastKeyReturn(props, element, null, 1, props.groupIndex, disabled, props.disjointedMode);
}

function Container(props: RichTextEditorToolbarElementProps) {
  if (
    !props.featureSupport.supportsContainers
  ) {
    return null;
  }

  const disabled = !props.state.allowsInsertElement({ type: "container", containerType: null, children: [] });
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatAddContainerLabel}
      onClick={props.helpers.insertContainer.bind(null, null)}
      disabled={disabled}
      size="large">
      <CheckBoxOutlineBlankIcon />
    </IconButton>
  );

  return elementFastKeyReturn(props, element, null, 1, props.groupIndex, disabled, props.disjointedMode);
}

function Table(props: RichTextEditorToolbarElementProps) {
  if (
    !props.featureSupport.supportsTables
  ) {
    return null;
  }

  const disabled = !props.state.allowsInsertElement({ type: "table", tableType: null, children: [] });
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatAddTableLabel}
      onClick={props.helpers.insertTable.bind(null, null)}
      disabled={disabled}
      size="large">
      <ViewModuleIcon />
    </IconButton>
  );

  return elementFastKeyReturn(props, element, null, 1, props.groupIndex, disabled, props.disjointedMode);
}

function TemplateText(props: RichTextEditorToolbarElementProps) {
  if (
    !props.isReady ||
    !props.featureSupport.supportsTemplating
  ) {
    return null;
  }

  let templateTextAmount = 0;

  if (props.state.currentSelectedBlockContext) {
    Object.keys(props.state.currentSelectedBlockContext.properties).forEach((key) => {
      const property = props.state.currentSelectedBlockContext.properties[key];

      // but they must be the given element type
      if (property.type === "text") {
        templateTextAmount++;
      }
    });
  }

  if (
    props.featureSupport.supportsTemplating &&
    props.state.currentRootContext &&
    props.state.currentRootContext !== props.state.currentSelectedBlockContext
  ) {
    Object.keys(props.state.currentRootContext.properties).forEach((key) => {
      const property = props.state.currentRootContext.properties[key];
      if (property.nonRootInheritable) {
        return;
      }

      // but they must be the given element type
      if (property.type === "text") {
        templateTextAmount++;
      }
    });
  }

  if (templateTextAmount === 0) {
    return null;
  }

  const disabled = !props.state.allowsInsertElement({ type: "inline", children: [], textContent: "text" });
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatAddTemplateText}
      onClick={props.helpers.insertTemplateText.bind(null, null, null)}
      disabled={disabled}
      size="large">
      <TextFieldsIcon />
    </IconButton>
  );

  const elementBadged = (
    <Badge
      badgeContent={templateTextAmount}
      color="error"
      sx={props.state.currentSelectedBlockElement ? style.badge : style.badgeDisabled}
    >
      {element}
    </Badge>
  );

  return elementFastKeyReturn(props, elementBadged, element, 1, props.groupIndex, disabled, props.disjointedMode);
}

function TemplateHTML(props: RichTextEditorToolbarElementProps) {
  if (
    !props.isReady ||
    !props.featureSupport.supportsTemplating
  ) {
    return null;
  }

  let templateHTMLAmount = 0;

  if (
    props.state.currentSelectedSuperBlockElement
  ) {
    Object.keys(props.state.currentSelectedSuperBlockContext.properties).forEach((key) => {
      const property = props.state.currentSelectedSuperBlockContext.properties[key];

      // but they must be the given element type
      if (property.type === "html") {
        templateHTMLAmount++;
      }
    });
  }

  if (
    props.featureSupport.supportsTemplating &&
    props.state.currentRootContext &&
    props.state.currentRootContext !== props.state.currentSelectedSuperBlockContext
  ) {
    Object.keys(props.state.currentRootContext.properties).forEach((key) => {
      const property = props.state.currentRootContext.properties[key];
      if (property.nonRootInheritable) {
        return;
      }

      // but they must be the given element type
      if (property.type === "html") {
        templateHTMLAmount++;
      }
    });
  }

  if (templateHTMLAmount === 0) {
    return null;
  }

  const disabled = !props.state.allowsInsertElement({ type: "void-block", children: [], html: "html" });
  const element = (
    <IconButton
      tabIndex={-1}
      title={props.i18nRichInfo.formatAddTemplateHTML}
      onClick={props.helpers.insertTemplateHTML.bind(null, null, null)}
      disabled={disabled}
      size="large">
      <CodeIcon />
    </IconButton>
  );

  const elementBadged = (
    <Badge
      badgeContent={templateHTMLAmount}
      color="error"
      sx={props.state.currentSelectedSuperBlockElement ? style.badge : style.badgeDisabled}
    >
      {element}
    </Badge>
  );

  return elementFastKeyReturn(props, elementBadged, element, 1, props.groupIndex, disabled, props.disjointedMode);
}

interface IToolbarExtraProps extends RichTextEditorToolbarElementProps {
  extra: IToolbarPrescenseElement;
}

function ToolbarExtra(props: IToolbarExtraProps) {
  const elementReference = typeof props.extra.element === "function" ? props.extra.element() : props.extra.element;
  const defaultAction = () => {
    const element = typeof props.extra.element === "function" ? props.extra.element() : props.extra.element;
    props.helpers.insertElement(element);
    return element;
  }

  const basicProps = {
    tabIndex: -1,
    onClick: props.extra.onClick ? props.extra.onClick.bind(null, defaultAction) : defaultAction,
  }

  let disabled = false;
  if (elementReference) {
    disabled = !props.state.allowsInsertElement(elementReference);
  }

  let returnNode: React.ReactNode;
  if (typeof props.extra.title === "string" || !props.extra.title) {
    returnNode = (
      <IconButton
        {...basicProps}
        title={props.extra.title as string}
        size="large"
        disabled={disabled}
        color={props.extra.selected ? "primary" : "default"}
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
          size="large"
          disabled={disabled}
          color={props.extra.selected ? "primary" : "default"}
        >
          {props.extra.icon}
        </IconButton>
      )
    });

    returnNode = elementCloned;
  }

  return elementFastKeyReturn(
    props,
    returnNode,
    null,
    typeof props.extra.usePriority === "number" ? props.extra.usePriority : 1,
    props.groupIndex,
    disabled,
    props.extra.useStyleTransform,
    props.extra.useTriggerAltAfterAction,
    props.extra.fastKey,
  );
}

function ToolbarExtras(props: RichTextEditorToolbarElementProps) {
  if (props.toolbarExtras && props.toolbarExtras.length) {
    const toolbarExtras = props.toolbarExtras.map((x, index) => {
      return (
        <ToolbarExtra {...props} extra={x} key={index} fastKey={null} />
      );
    });

    const customs = props.toolbarExtras.map((x, i) => (
      x.customChildren ? <React.Fragment key={i}>{x.customChildren}</React.Fragment> : null
    ));

    return (
      <>
        {toolbarExtras}
        {customs}
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
  table: Table,
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
  title: "a",
  container: "c",
  file: "f",
  image: "p",
  link: "l",
  quote: "q",
  video: "v",
  table: "t",
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
        this.props.featureSupport.supportsTables ? "table" : "none",
        (
          this.props.featureSupport.supportsImages ||
          this.props.featureSupport.supportsFiles ||
          this.props.featureSupport.supportsVideos
        ) ? "divider" : "none",
        this.props.featureSupport.supportsImages ? "image" : "none",
        this.props.featureSupport.supportsFiles ? "file" : "none",
        this.props.featureSupport.supportsVideos ? "video" : "none",
        "divider",
        this.props.featureSupport.supportsContainers ? "container" : "none",
        "template-text",
        "template-html",
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
        elementFastKeyReturn(
          this.props as any,
          <IconButton
            tabIndex={-1}
            onClick={this.props.toggleDrawer}
            size="large">
            {this.props.drawerOpen ? <ExpandLessIcon /> : <MoreHorizIcon />}
          </IconButton>,
          null,
          this.props.drawerOpen ? 2 : 1,
          499,
          false,
          this.props.disjointedMode,
          true,
          ".",
        ) :
        null
    );

    const customChildren: React.ReactNode[] = [];
    const toolbarFormMapped = (
      toolbarForm.map((ele, index) => {
        if (typeof ele === "string") {
          const Element = toolbarRegistry[ele];
          return (
            <Element
              {...this.props}
              isReady={this.state.isReady}
              key={index}
              groupIndex={index}
              fastKey={toolbarFastKeyRegistry[ele]}
            />
          );
        } else {
          const extraValue = typeof ele === "function" ? ele(this.props) : ele;

          if ((extraValue as IToolbarPrescenseElement).customChildren) {
            customChildren.push(
              <React.Fragment key={index}>
                {(extraValue as IToolbarPrescenseElement).customChildren}
              </React.Fragment>
            );
          }

          return (
            <ToolbarExtra
              {...this.props}
              isReady={this.state.isReady}
              key={index}
              groupIndex={index}
              extra={extraValue as IToolbarPrescenseElement}
              fastKey={null}
            />
          );
        }
      })
    );

    // now we can create the component itself
    // there is not much to say on how this all works
    const toReturn = (
      <AppBar
        position={this.props.disjointedMode ? "fixed" : "relative"}
        variant="outlined"
        elevation={0}
        color="default"
        sx={
          this.props.disjointedMode ? style.appbarFixed : style.appbar
        }
        ref={(obj) => {
          this.appBarHeader = obj as any;
        }}
      >
        <Toolbar sx={style.toolbar}>
          {toolbarFormMapped}
          {customChildren}
          <Box sx={style.moreOptionsSpacer} />
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
   * Specifies the state of the drawer
   */
  drawerOpen: boolean;

  /**
   * Specifies the height of the toolbar for use
   * when the drawer is open in disjointed mode
   */
  toolbarHeight: number;

  /**
   * A custom toolbar state
   */
  toolbarState: string;

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
  inlineElementThatWasCurrentBeforeLosingFocus: RichElement;
}

const StyledEditorContainer = styled("div")(style.editorContainer);

interface IStyledEditor {
  currentValid: boolean;
  isRichText: boolean;
}
const StyledEditor = styled("div", {
  shouldForwardProp: (p) => p !== "currentValid" && p !== "isRichText",
})<IStyledEditor>(({ currentValid, isRichText }) => style.editor(!currentValid, isRichText));

/**
 * This represents the unwrapped class that is used for the wrapper, it is not
 * the exported one because it needs to be withStyles for stylization
 */
export class MaterialUISlateWrapper extends React.PureComponent<IMaterialUISlateWrapperProps, MaterialUISlateWrapperState> {
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
  private DrawerContainerRef: React.RefObject<DrawerContainer>;

  /**
   * a ref to the editor
   */
  private editorRef: React.RefObject<HTMLDivElement>;

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

  private isUnmounted: boolean;

  /**
   * Constructs a new material ui based wrapper for the slate editor
   * @param props the base properties that every wrapper gets extended for this specific wrapper
   */
  constructor(props: IMaterialUISlateWrapperProps) {

    // super calling
    super(props);

    // setup the initial state
    this.state = {
      inlineElementThatWasCurrentBeforeLosingFocus: null,

      // keep SSR compatibility by keeping the drawer closed at the start
      // as we cannot read local storage in the server side
      drawerOpen: false,
      toolbarHeight: 0,
      noAnimate: true,
      toolbarState: null,
    }

    this.isUnmounted = false;

    // create the refs
    this.inputImageRef = React.createRef();
    this.inputFileRef = React.createRef();
    this.DrawerContainerRef = React.createRef();
    this.toolbarRef = React.createRef();
    this.editorRef = React.createRef();

    // bind all the functions
    this.onHeightChange = this.onHeightChange.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
    this.onFileLoad = this.onFileLoad.bind(this);
    this.requestImage = this.requestImage.bind(this);
    this.requestFile = this.requestFile.bind(this);
    this.onFileEventedReFocus = this.onFileEventedReFocus.bind(this);
    this.refocus = this.refocus.bind(this);
    this.shouldHaveDrawer = this.shouldHaveDrawer.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.setToolbarState = this.setToolbarState.bind(this);
    this.selectiveHardBlur = this.selectiveHardBlur.bind(this);
    this.keyUpListener = this.keyUpListener.bind(this);
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
  }

  public componentWillUnmount() {
    document.body.removeEventListener("mousedown", this.selectiveHardBlur);
    document.body.removeEventListener("touchstart", this.selectiveHardBlur);
    document.body.removeEventListener("keyup", this.keyUpListener);
    this.isUnmounted = true;
  }

  public keyUpListener(e: KeyboardEvent) {
    if (e.key === "Tab") {
      this.selectiveHardBlur(e);
    }
  }

  public selectiveHardBlur(e: MouseEvent | KeyboardEvent) {
    // we are currently in focus
    if (this.props.state.currentSelectedText) {
      // if it's an unblurred target, such as the toolbar
      // or the drawer
      if (this.isUnblurred(e.target as any)) {
        if ((e.target as HTMLElement).tagName !== "INPUT") {
          // stop from losing focus
          e.preventDefault();
        }
      } else if (!this.isInEditor(e.target as any)) {
        // otherwise if we are not in the editor
        // just lose all the focus
        this.props.helpers.hardBlur();
      }
    }
  }

  public isUnblurred(ele: HTMLElement): boolean {
    if (
      ele === this.toolbarRef.current.getAppbarHeader() ||
      ele === this.DrawerContainerRef.current.getDrawerBody() ||
      ele.dataset.unblur
    ) {
      return true;
    }

    if (ele.parentElement) {
      return this.isUnblurred(ele.parentElement);
    }

    return false;
  }

  public isInEditor(ele: HTMLElement): boolean {
    if (
      ele === this.editorRef.current
    ) {
      return true;
    }

    if (ele.parentElement) {
      return this.isInEditor(ele.parentElement);
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
    this.originalSelectionPath = this.props.state.currentSelectedInlineElementAnchor ||
      this.props.state.currentSelectedBlockElementAnchor ||
      this.props.state.currentSelectedSuperBlockElementAnchor;
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
    this.originalSelectionPath = this.props.state.currentSelectedInlineElementAnchor ||
      this.props.state.currentSelectedBlockElementAnchor ||
      this.props.state.currentSelectedSuperBlockElementAnchor;
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

    if (!this.props.disjointedMode) {
      window.dispatchEvent(new Event("SLATE_DRAWER_OPEN"));
    }

    // and put it in local storage
    localStorage.setItem("SLATE_DRAWER_OPEN", JSON.stringify(newState));
  }

  /**
   * Refocuses as the original selection area that was focused
   * mainly used by dialogs once they haave closed
   */
  public refocus() {
    if (this.isUnmounted) {
      return;
    }

    // TODO FIX

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

  public setToolbarState(state: string | null) {
    if (this.state.toolbarState !== state) {
      this.setState({toolbarState: state});
    }
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
    await this.props.helpers.focusAt(this.originalSelectionArea || this.originalSelectionPath);
    this.props.helpers.insertImage(file, false);
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
    await this.props.helpers.focusAt(this.originalSelectionArea || this.originalSelectionPath);
    this.props.helpers.insertFile(file);
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

    const toolbar = (
      <RichTextEditorToolbar
        {...this.props}
        toolbarState={this.state.toolbarState}
        toolbarHeight={this.state.toolbarHeight}
        ref={this.toolbarRef}
        onHeightChange={this.onHeightChange}
        requestImage={this.requestImage}
        requestFile={this.requestFile}
        shouldHaveDrawer={this.shouldHaveDrawer}
        drawerOpen={this.state.drawerOpen}
        toggleDrawer={this.toggleDrawer}
        setToolbarState={this.setToolbarState}
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
          <Box className={this.props.wrapperClassName} sx={this.props.wrapperSx} ref={this.editorRef}>
            <Box className={
              "rich-text " +
              (this.props.wrapperTextEditorClassName ? " " + this.props.wrapperTextEditorClassName : "") +
              (this.props.state.focused ? " focused" : "")
            } sx={this.props.wrapperTextEditorSx}>
              {this.props.children}
            </Box>
            {extraChildren}
          </Box>
          <DrawerContainer
            ref={this.DrawerContainerRef}
            {...this.props}
            drawerOpen={this.state.drawerOpen}
            noAnimate={this.state.noAnimate}
            toolbarHeight={this.state.toolbarHeight}
          />
          {fileLoadErrorDialog}
          {imageInput}
          {fileInput}
        </>
      );
    }

    // now we build the rich text editor itself
    return (
      <>
        {toolbar}
        <StyledEditorContainer sx={this.props.wrapperSx} className={this.props.wrapperClassName}>
          <StyledEditor
            ref={this.editorRef}
            className={
              "rich-text" +
              (this.props.state.focused ? " focused" : "") +
              (this.props.wrapperTextEditorClassName ? " " + this.props.wrapperTextEditorClassName : "")
            }
            currentValid={this.props.state.currentValid}
            isRichText={this.props.state.isRichText}
            sx={this.props.wrapperTextEditorSx}
          >
            {this.props.children}
          </StyledEditor>
          {extraChildren}
          <DrawerContainer
            {...this.props}
            ref={this.DrawerContainerRef}
            drawerOpen={this.state.drawerOpen}
            noAnimate={this.state.noAnimate}
            toolbarHeight={this.state.toolbarHeight}
          />
        </StyledEditorContainer>
        {fileLoadErrorDialog}
        {imageInput}
        {fileInput}
      </>
    );
  }
}

export interface IDrawerContainerProps extends IMaterialUISlateWrapperProps {
  drawerOpen: boolean;
  toolbarHeight: number;
  noAnimate: boolean;
}

interface IDrawerContainerState {
  isReady: boolean;
}

class DrawerContainer extends React.Component<IDrawerContainerProps, IDrawerContainerState> {
  private editorDrawerBodyRef: React.RefObject<HTMLDivElement>;
  constructor(props: IDrawerContainerProps) {
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
      <Box
        sx={[
          (this.props.disjointedMode ? style.editorDrawerFixed : style.editorDrawer),
          (this.props.noAnimate ? style.editorDrawerNoAnimate : null)
        ]}
        className={this.props.drawerOpen ? "open" : null}
      >
        {
          this.props.disjointedMode && this.props.drawerOpen ?
            <Box
              sx={style.editorDrawerAppbarSpacer}
              style={{ height: this.props.toolbarHeight, flex: "0 0 " + this.props.toolbarHeight + "px" }}
            /> :
            null
        }
        <Box sx={style.editorDrawerBody} ref={this.editorDrawerBodyRef}>
          {this.props.drawerOpen ? <WrapperDrawer {...this.props} /> : null}
        </Box>
      </Box>
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
