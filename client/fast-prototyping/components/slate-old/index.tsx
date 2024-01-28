/**
 * This file contains the slate element, the slate element is used to create
 * rich text editors and designed to be used with the PropertyEntryText type
 * even if it can also be used in a standalone way
 * 
 * @module
 */

import React from "react";
import equals from "deep-equal";
import { BaseEditor, createEditor, Transforms, Range, Editor, Element, Node, Path, Text, NodeEntry, Point } from "slate";
import { Slate, Editable, withReact, ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";
import { withHistory, HistoryEditor } from "slate-history";

import {
  IRootLevelDocument, deserialize, SERIALIZATION_REGISTRY, RichElement, deserializePlain,
  getContextFor, normalizeElement, getAllowedChildrenTypes, getUIHandlerValueWithKnownContextFor, isInline, isVoid, isSuperBlock, isBlock, getUUIDFor
} from "../../../internal/text/serializer";
import {
  CONTAINER_CLASS_PREFIX, countSize, CUSTOM_CLASS_PREFIX,
  IFeatureSupportOptions, RICH_TEXT_CLASS_PREFIX, serialize, serializeString, TABLE_CLASS_PREFIX
} from "../../../internal/text";
import { FILE_SUPPORTED_IMAGE_TYPES, LAST_RICH_TEXT_CHANGE_LENGTH } from "../../../../constants";
import { IInsertedFileInformationType } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import { convertStyleStringToReactObject, IUIHandlerProps } from "../../../internal/text/serializer/base";
import { IVideo } from "../../../internal/text/serializer/types/video";
import { localeReplacer, mimeTypeToExtension } from "../../../../util";
import prettyBytes from "pretty-bytes";
import { IContainer } from "../../../internal/text/serializer/types/container";
import { IFile } from "../../../internal/text/serializer/types/file";
import { IImage } from "../../../internal/text/serializer/types/image";
import { IText, STANDARD_TEXT_NODE } from "../../../internal/text/serializer/types/text";
import { ICustom } from "../../../internal/text/serializer/types/custom";
import { IInline } from "../../../internal/text/serializer/types/inline";
import { CurrentElementProvider, CurrentElementRetriever } from "./current-element";
import { IVoidBlock } from "../../../internal/text/serializer/types/void-block";
import { IList } from "../../../internal/text/serializer/types/list";
import { STANDARD_PARAGRAPH } from "../../../internal/text/serializer/types/paragraph";
import { ITemplateArgContextDefinition, ITemplateArgHTMLDefinition, ITemplateArgTextDefinition, ITemplateArgUIHandlerDefinition } from "../../../internal/text/serializer/template-args";
import { ILink } from "../../../internal/text/serializer/types/link";
import { ITable, ITbody, ITd, ITfoot, ITr } from "../../../internal/text/serializer/types/table";
import type { IPropertyDefinitionSupportedSingleFilesType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: RichElement;
    Text: IText;
  }
}

/**
 * Used within contexts with loop emulation to disable the element wrapper to display in all
 * but the last element
 */
const ElementWrapperDisabler = React.createContext(false);

function findLastIndex(arr: any[], fn: (ele: any) => boolean) {
  let currentIndex = arr.length;
  while (currentIndex--) {
    if (fn(arr[currentIndex])) {
      return currentIndex;
    }
  }

  return -1;
}

// for some reason despite there being a single class and with certainty
// when the focusAt function gets called the onFocus function gets executed with
// the previous values for the instance in a way that makes zero sense
// some optimization things are going on from the browser
// This only occurs in Chrome.... so it is related to chrome
// let preventNextFocus = false;

// function preventFocus() {
//   preventNextFocus = true;
//   setTimeout(() => {
//     preventNextFocus = false;
//   }, 300);
// }

// Slate is buggy regarding shift+tab
// remove when shift+tab is fixed
const EDITOR_POOL = new Map<HTMLElement, SlateEditor>();

// buggy to repair it not focusing when it should and keeping focus when it shouldn't
// for both tab and shift tab
function onAnyTab(ev: KeyboardEvent) {
  setTimeout(() => {
    const editorElement = EDITOR_POOL.get(document.activeElement as any);
    EDITOR_POOL.forEach((e) => e !== editorElement && e.selectiveHardBlurIfHasSelectedElement(ev, document.activeElement instanceof HTMLElement ?
      document.activeElement : null));
    if (editorElement) {
      // maybe a way to keep the cursor where it was?....
      // it's kind of annoying that the cursor moves
      editorElement.forceFocus();
    }
  }, 70);
}

// what's worse sometimes it retains focus when it shouldn't

if (typeof document !== "undefined") {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      onAnyTab(e);
    }
  });
}

/**
 * Combine both interfaces
 */
interface ItemizeEditor extends ReactEditor, HistoryEditor { };

/**
 * The ui handler props that an ui handler takes
 */
export interface ISlateTemplateUIHandlerProps extends IUIHandlerProps {
  /**
   * Whether it is currently into an slate instance
   */
  isSlate: boolean;
  /**
   * The attributes that slate provides
   */
  attributes: any;
  /**
   * The helpers that might be provided if the handler
   * requests extra info
   */
  helpers?: IHelperFunctions;
  /**
   * The selected state that might be provided if the handler
   * requests extra info
   */
  selected?: boolean;
}

/**
 * Represents an available element, used internally
 * for the classes that are available for usage on rich
 * classes, container, and so on...
 */
interface IAvailableElementCSSClassName {
  /**
   * The value of the given available element
   */
  value: string;
  /**
   * A human readable value, extracted from the root
   * i18n data with the same class name
   * for the given current language, it is usually subclassed
   * into several subcontainers in the root information given
   * 
   * rich: for rich text classes
   * containers: for containers
   * custom: for custom
   * 
   * eg. container-maximum as a class name, is referred as
   * maximum as the contaner type, so it will look for containers.maximum
   * in the properties file on the given language for a given label
   * 
   * eg. rich-text--ultra-mega-bold is referred as the ultra-mega-bold
   * rich class, so it will look for rich.ultra-mega-bold or rich.ultra_mega_bold
   * in the properties file
   */
  label: string;
}

// We need to find all the containers, custom classes and rich classes
// we have available by default and that can be used inside the itemize
// application, so we use these helper variables
// that exists only here inside this module

/**
 * All the containers that we could find so far
 * @ignore
 */
let ALL_CONTAINERS: string[] = [];
/**
 * All the tables that we could find so far
 * @ignore
 */
let ALL_TABLES: string[] = [];
/**
 * All the custom classes that we could find so far
 * @ignore
 */
let ALL_CUSTOM: string[] = [];
/**
 * All the rich classes that we could find so far
 * @ignore
 */
let ALL_RICH_CLASSES: string[] = [];
/**
 * Whether we have loaded all these variables
 * @ignore
 */
let ALL_IS_LOADED: boolean = false;

/**
 * With a given stylesheet that is passed inside the stylesheet variable
 * set, it will use it to find the given class names that are available
 * for usage within the rich text editor and add it to the registry
 * @param stylesheet the stylesheet to calculate
 * @ignore
 */
function calculateStylesheet(stylesheet: CSSStyleSheet | CSSMediaRule) {
  // so first we split within the rules
  Array.from(stylesheet.cssRules).forEach((r) => {
    if (r instanceof CSSMediaRule || (r as any).cssRules) {
      calculateStylesheet(r as CSSMediaRule);
      return;
    }

    // and now we need the selector part that selects, and split it so we have
    // something like [".trusted", ".rich-text--something"]
    // selectorText is supported in chromium based browsers but not all, so we have a more expensive
    // fallback in place for that
    const selectorSplitted = ((r as any).selectorText as string || r.cssText.split("{")[0].trim()).split(" ");

    // now we take that selection, we are only concerned with the classes
    // that match our prefixed things
    selectorSplitted.forEach((sbase) => {
      let internalSelectorSplitted = sbase.split(".");
      internalSelectorSplitted.shift();

      internalSelectorSplitted.forEach((s) => {
        // now we take the class name
        let className = s;
        if (className.includes(":")) {
          className = className.split(":")[0];
        }
        if (className.endsWith(",")) {
          className = className.substr(0, className.length - 1);
        }

        // and we check whether it matches any of our prefixes that
        // make it a valid class of the given type
        if (className.startsWith(CONTAINER_CLASS_PREFIX)) {
          const toPush = className.substr(CONTAINER_CLASS_PREFIX.length);
          if (!ALL_CONTAINERS.includes(toPush)) {
            ALL_CONTAINERS.push(toPush);
          }
        } else if (className.startsWith(TABLE_CLASS_PREFIX)) {
          const toPush = className.substr(TABLE_CLASS_PREFIX.length);
          if (!ALL_TABLES.includes(toPush)) {
            ALL_TABLES.push(toPush);
          }
        } else if (className.startsWith(CUSTOM_CLASS_PREFIX)) {
          const toPush = className.substr(CUSTOM_CLASS_PREFIX.length);
          if (!ALL_CUSTOM.includes(toPush)) {
            ALL_CUSTOM.push(toPush);
          }
        } else if (className.startsWith(RICH_TEXT_CLASS_PREFIX)) {
          const toPush = className.substr(RICH_TEXT_CLASS_PREFIX.length);
          if (!ALL_RICH_CLASSES.includes(toPush)) {
            ALL_RICH_CLASSES.push(toPush);
          }
        }
      });
    });
  });
}

/**
 * we are going to build a promise
 * for retrieving the available classes for the rich
 * text editor
 * @ignore
 */
const ALL_PROMISE = new Promise<void>(async (resolve) => {
  // if we are already loaded then we are done
  if (ALL_IS_LOADED) {
    resolve();
    return;
  }
  if (typeof document !== "undefined") {
    const stylesheetHrefPrefix = location.protocol + "//" + location.host + "/rest/resource/build";
    // now we got to see if by the time this promise is running
    // it is already done loading
    const foundPreloadedStylesheet =
      document.styleSheets && Array.from(document.styleSheets).find((s) => s.href && s.href.startsWith(stylesheetHrefPrefix));

    // if we find it and use it to calculate it
    if (foundPreloadedStylesheet) {
      ALL_IS_LOADED = true;
      calculateStylesheet(foundPreloadedStylesheet);
      resolve();

      // otherwise we need to wait for the link to load
    } else {
      const allLinks = document.head.querySelectorAll("link");
      const foundStylesheetNode = Array.from(allLinks).find((s) => s.href.startsWith(stylesheetHrefPrefix));

      // if we don't find a base css build, then we mark it as done
      if (!foundStylesheetNode) {
        ALL_IS_LOADED = true;
        resolve();
      } else {
        // otherwise we set up a onload callback
        foundStylesheetNode.addEventListener("load", () => {
          // and once we are loaded we want to grab the css stylesheet
          const foundLoadedStyleSheet =
            document.styleSheets &&
            Array.from(document.styleSheets).find((s) => s.href && s.href.startsWith(stylesheetHrefPrefix));
          // mark it as loaded
          ALL_IS_LOADED = true;

          // process it
          if (foundLoadedStyleSheet) {
            calculateStylesheet(foundLoadedStyleSheet);
          }
          // and resolve
          resolve();
        });
      }
    }
  }
});

/**
 * Represents an extended set of the features that the editor supports
 * with a lot more of contextual information on what it has in place
 * for such
 */
export interface IAccessibleFeatureSupportOptions extends IFeatureSupportOptions {
  /**
   * The classes that are available by the rich text
   * non prefixed
   */
  availableRichClasses: IAvailableElementCSSClassName[];
  /**
   * The customs that are available
   */
  availableCustoms: IAvailableElementCSSClassName[];
  /**
   * The classes that are available for the containers
   */
  availableContainers: IAvailableElementCSSClassName[];
  /**
   * The classes that are available for the containers
   */
  availableTables: IAvailableElementCSSClassName[];
}

/**
 * Represents a bunch of helpers that will help out building
 * things like toolbars or anything else (aka. the wrapper)
 * around the editor
 */
export interface IHelperFunctions {
  /**
   * This is the editor instance of the given
   * editor
   */
  editor: ItemizeEditor;
  /**
   * This is the react editor class itself
   * provided by slate
   */
  ReactEditor: typeof ReactEditor;
  /**
   * This is the history editor class itself
   * provided by slate
   */
  HistoryEditor: typeof HistoryEditor;
  /**
   * This is the transforms class itself
   * provided by slate
   */
  Transforms: typeof Transforms;
  /**
   * This is the range class itself
   * provided by slate
   */
  Range: typeof Range;
  /**
   * This is the node class itself
   */
  Node: typeof Node;
  /**
   * The path type
   */
  Path: typeof Path;

  /**
   * Provies the context for the given path
   */
  getContextFor: (element: RichElement | IText | Path, level?: "final" | "select-context" | "select-loop", onlySwichingContext?: boolean) => ITemplateArgContextDefinition;
  getRootContext: () => ITemplateArgContextDefinition;
  getState: () => ISlateEditorInternalStateType;

  /**
   * performs a pseudo selection at a given path
   * this selection is silent and does not affect other than the current
   * selected path based on the information, it does not cause a caret
   * change or anything of the sorts
   * @param path the path to select
   */
  selectPath: (path: Path) => void;

  /**
   * Switches a path from one place to another
   */
  movePaths: (from: Path, to: Path) => void;

  /**
   * Deletes given a path
   */
  deletePath: (path: Path) => void;

  /**
   * Deletes the node at the selected path
   */
  deleteSelectedNode: () => void;

  /**
   * Allows to kno what the previous selected element was
   * before this one was selected
   */
  getPreviousSelectedElementAnchor: () => Path;
  /**
   * Allows to kno what the previous selected element was
   * before this one was selected
   */
  getPreviousTextAnchor: () => Path;

  /**
   * focuses the text editor
   */
  focus: () => void;
  /**
   * Focuses at the desired location
   * @param at the range to insert at
   */
  focusAt: (at: Range | Path) => Promise<void>;

  /**
   * inserts a super break at the given position in order
   * to add a paragraph
   */
  insertSuperbreak: (at?: Path, reverse?: boolean) => void;

  /**
   * Will insert an image based on a given file that has
   * been taken as an input
   * @param file the file
   * @param at an optional range to insert at
   * @param standalone whether to make it a standalone image
   */
  insertImage: (file: File, standalone: boolean) => void;
  /**
   * Will insert a video given the information
   * @param url the url of the video, only youtube and vimeo supported as origin
   * @param at an optional range to insert at
   * @returns a boolean true if the video was properly inserted, false if the video url was invalid
   */
  insertVideo: (url: string) => boolean;
  updateVideo: (url: string) => boolean;
  /**
   * Will insert a file based on the information given
   * @param file the file to insert
   * @param at an optional range to insert at
   */
  insertFile: (file: File) => void;
  /**
   * Will insert a container at the given location
   * @param type optional, the container type, otherwise will
   * insert a standard container
   * this is caret based unless you specify your own custom range
   * note that calling this function will cause a refocus
   * @param type the container type
   * @param at an optional range to insert at
   */
  insertContainer: (type?: string) => void;
  /**
   * Inserts a custom element
   * this is caret based unless you specify your own custom range
   * note that calling this function will cause a refocus
   * @param type the custom type
   * @param at an optional range to insert at
   */
  insertCustom: (type: string) => void;
  /**
   * Inserts a template text
   * this is caret based unless you specify your own custom range
   * note that calling this function will cause a refocus
   * @param label the label to use for the template text
   * @param value the actual value for the template text to be used off the context
   * @param at an optional range to insert at
   */
  insertTemplateText: (label: string, value: string) => void;
  updateTemplateText: (label: string, value: string) => void;
  /**
   * Inserts a template html fragment
   * this is caret based unless you specify your own custom range
   * note that calling this function will cause a refocus
   * @param label the label to use for the template html
   * @param value the actual value for the template html to be used off the context
   * @param at an optional range to insert at
   */
  insertTemplateHTML: (label: string, value: string) => void;
  updateTemplateHTML: (label: string, value: string) => void;

  /**
   * Inserts an element at the given position
   * @param element the element to insert
   * @param at optional range to insert at
   */
  insertElement: (element: RichElement) => void;

  /**
   * Inserts a table at the given location
   */
  insertTable: (tableType: string) => void;
  insertTableColumn: () => void;
  insertTableRow: () => void;
  deleteTableColumn: () => void;
  deleteTableRow: () => void;
  toggleTable: (element: "thead" | "tfoot") => void;
  canToggleTable: (element: "thead" | "tfoot") => boolean;

  /**
   * Makes a quote out of the current element
   * this is caret based unless you specify your own custom range
   * note that calling this function will cause a refocus
   */
  toggleQuote: () => void;
  /**
   * Makes a title out of the current element
   * this is caret based unless you specify your own custom range
   * note that calling this function will cause a refocus
   */
  toggleTitle: (type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") => void;
  /**
   * Makes a list out of the current element
   * this is caret based unless you specify your own custom range
   * note that calling this function will cause a refocus
   */
  insertList: (type: "bulleted" | "numbered") => void;
  /**
   * Makes a link out of the current element
   * this is caret based unless you specify your own custom range
   * note that calling this function will cause a refocus
   * @returns a boolean specifying whether the toggling was succesful or it failed
   * for some reason, eg. invalid link, links are not supported
   */
  toggleLink: (url: string, templateValue: string) => boolean;
  updateLink: (url: string, templateValue: string) => boolean;

  /**
   * Formats the current text as bold
   * this is always caret based and does not allow for custom
   * ranges
   * It will refocus once done
   */
  formatToggle: (type: "bold" | "italic" | "underline") => void;

  /**
   * does an arbitrary update of arbitrary arguments off the current
   * element value, this function does not refocus and it's silent and meant
   * for indirect usage
   * @param args the arbitrary arguments (partial value)
   * @param anchor the anchor where the update should take place (should point at an element)
   */
  set: (args: Partial<RichElement> | Partial<IText>, anchor: Path) => void;

  /**
   * Sets the current style for the element
   * this function does not refocus and it's silent and meant
   * for indirect usage
   */
  setStyle: (style: string, anchor: Path) => void;
  /**
   * Sets the template hover style for the element
   * this function does not refocus and it's silent and meant
   * for indirect usage
   */
  setHoverStyle: (style: string, anchor: Path) => void;
  /**
   * Sets the active style for the element
   * this function does not refocus and it's silent and meant
   * for indirect usage
   */
  setActiveStyle: (style: string, anchor: Path) => void;
  /**
   * Sets the context key
   * this function does not refocus and it's silent and meant
   * for indirect usage
   */
  setContext: (key: string, anchor: Path) => void;
  /**
   * Sets the if render condition
   * this function does not refocus and it's silent and meant
   * for indirect usage
   */
  setIfCondition: (key: string, anchor: Path) => void;
  /**
   * Sets an UI handler in the given anchor with the given args
   * this function does not refocus and it's silent and meant
   * for indirect usage
   */
  setUIHandler: (key: string, args: { [key: string]: string }, anchor: Path) => void;
  /**
   * Allows to set UI handler args in the ui handler
   */
  setUIHandlerArg: (key: string, value: string, anchor: Path) => void;
  /**
   * Sets the for-each loop key
   * this function does not refocus and it's silent and meant
   * for indirect usage
   */
  setForEach: (key: string, anchor: Path) => void;
  /**
   * Sets all the rich classes
   * this function does not refocus and it's silent and meant
   * for indirect usage
   */
  setRichClasses: (list: string[], anchor: Path) => void;
  /**
   * Sets an action key
   * this function does not refocus and it's silent and meant
   * for indirect usage
   */
  setAction: (key: string, value: string, anchor: Path) => void;

  /**
   * Performs a hard blur, and even the selected paths are lost
   */
  hardBlur: () => void;
  /**
   * Performs a soft blur event
   */
  softBlur: () => void;
}

/**
 * Contains the information about the
 * state of the editor as it is right
 * now
 */
export interface ISlateEditorInternalStateType {
  /**
   * Whether it is curently focused
   * this is a state inherent of the
   * state of the editor
   */
  focused: boolean;

  /**
   * Whether it is rich text
   * the slate editor is able to contain
   * non-rich text, when it's as a plain
   * text form
   * 
   * you should use this to change/remove
   * the toolbars and wrappers and use
   * only paragraphs
   * 
   * this is passed directly from
   * the props of the editor
   */
  isRichText: boolean;

  /**
   * Whether the current value is valid
   * this is passed directly from the props
   * and it's used for stylistic purposes
   */
  currentValid: boolean;

  /**
   * The current text being worked with, represents
   * a text node where the caret is currently placed
   */
  currentText: IText;
  currentInlineElement: RichElement;
  currentBlockElement: RichElement;
  currentSuperBlockElements: RichElement[];

  /**
   * The current path followed, text path for the current text
   */
  currentTextAnchor: Path;
  currentInlineElementAnchor: Path;
  currentBlockElementAnchor: Path;
  currentSuperBlockElementAnchors: Path[];

  /**
   * The current selected node that is being worked with
   * this is normally automatically selected to be the
   * current element
   */
  currentSelectedText: IText;
  currentSelectedInlineElement: RichElement;
  currentSelectedBlockElement: RichElement;
  currentSelectedSuperBlockElements: RichElement[];
  currentSelectedElement: RichElement;

  currentSelectedTextAnchor: Path;
  currentSelectedInlineElementAnchor: Path;
  currentSelectedBlockElementAnchor: Path;
  currentSelectedSuperBlockElementAnchors: Path[];

  currentSelectedElementAnchor: Path;
  previousSelectedElementAnchor: Path;
  previousTextAnchor: Path;

  currentRootContext: ITemplateArgContextDefinition;
  currentSelectedTopmostSuperBlockContext: ITemplateArgContextDefinition;
  currentSelectedBlockContext: ITemplateArgContextDefinition;
  currentSelectedInlineContext: ITemplateArgContextDefinition;
  currentSelectedElementContext: ITemplateArgContextDefinition;

  /**
   * The current value from the document that is used
   * in the slate rich text editor
   */
  currentValue: IRootLevelDocument;

  /**
   * Contextual, very specific to the current context
   * where the cursor is located
   */
  allowsInsertElement: (element: RichElement, opts?: { collapsed?: boolean; extended?: boolean; selected?: boolean }) => boolean;
  allowsText: boolean;
  inlineIsVoid: boolean;
  blockIsVoid: boolean;
  topmostSuperblockIsVoid: boolean;
  superBlockUIHandler: ITemplateArgUIHandlerDefinition;
  blockUIHandler: ITemplateArgUIHandlerDefinition;
  inlineUIHandler: ITemplateArgUIHandlerDefinition;
}

/**
 * The props that every element wrapper is going to get
 * based on the standard that is pased by each element
 * once such element is selected
 */
export interface ISlateEditorWrapperElementProps {
  /**
   * The element being selected
   */
  element: RichElement;
  /**
   * Whether the selection is primary
   */
  primarySelection: boolean;
  /**
   * wether is selected
   */
  isSelected: boolean;
  /**
   * The helpers functions
   */
  helpers: IHelperFunctions;
  /**
   * The element component itself that should
   * be returned
   */
  children: React.ReactNode;
  /**
   * The feature support
   */
  featureSupport: IAccessibleFeatureSupportOptions;
}

/**
 * The element wrappers
 */
export interface ISlateEditorElementWrappers {
  components?: {
    [key: string]: React.ComponentType<ISlateEditorWrapperElementProps>;
  },
  uiHandler?: {
    [key: string]: React.ComponentType<ISlateEditorWrapperElementProps>;
  },
};

/**
 * The base props that every wrapper is going to get
 * based on the standard that is passed by the component
 * that contains the base rich text editor
 * 
 * You might extend this class and require extra props, these
 * props might be passed by using the wrapperArgs from
 * the main component which will pass them to the wrapper
 * 
 * When implementing the wrapper you may add a selectiveHardBlur function
 * for which triggers when the element is blurred to prevent real blurring (aka executing hardBlur)
 * depending on if something is selected in the wrapper
 * 
 * The selectiveHardBlur should take a (ev: KeyboardEvent, target: HTMLElement) if you wish to prevent
 * the blur from happening
 */
export interface ISlateEditorWrapperBaseProps {
  /**
   * Whether it is disabled
   */
  disabled: boolean;
  /**
   * This is the slate editor current state
   * that is passed to the wrapper in order
   * so it can get state information
   */
  state: ISlateEditorInternalStateType;
  /**
   * This is a list of extended features that are available
   * to the editor, and the wrapper can render buttons
   * and whatnot from it
   */
  featureSupport: IAccessibleFeatureSupportOptions;
  /**
   * These are helper functions that are used to insert elements
   * and modify nodes
   */
  helpers: IHelperFunctions;
  /**
   * This is the thing to wrap, it is the react
   * rich text editor itself as it comes from slate
   * and it should be rendered
   * where it is expected to be used
   */
  children: React.ReactNode;
  /**
   * A current error, translated
   * it is given directly as a prop to the editor class
   * as it's just passed right here as well to the wrapper
   * this is used via the PropertyEntryText as it does
   * indeed provide this as a prop for the render
   */
  currentLoadError: string;
  /**
   * Dismiss the current load error follows the same logic
   * as the currentLoadError
   */
  dismissCurrentLoadError: () => void;
}

/**
 * These are the props that the editor itself requires
 * in order to function, and they are designed in mind to make
 * itself suitable to be an entry type for itemize text types, both
 * plain and html
 */
interface ISlateEditorProps {
  /**
   * An id for the content editable area
   */
  id: string;

  /**
   * Value for the lang property
   */
  lang: string;

  /**
   * A react component that is to wrap the editor
   * normally will be used to create toolbars and add to the functionality
   * that wishes to be added in order to make it fully customizable
   * The wrapper will receive the rich text editor component itself as a children
   * the raw editor to launch commands and some utility functions
   * 
   * When building your own custom renderers and you still will use the fast prototying
   * slate renderer as your rich text editor of choice, it is the wrapper that you will
   * use to customize your toolbar and other functionality you want to add; while the standard
   * itemize fast prototyping editor and its wrapper can do wonders it might not cover
   * all your use cases and you might want to create your own cusom renderers
   */
  Wrapper?: React.ComponentType<ISlateEditorWrapperBaseProps>;
  /**
   * Extra wrapper arguments to pass to the wrapper, the component for the wrapper
   * always must have the base wrapper props, but it can have extra arguments
   * and they can be provided via this argument
   */
  wrapperArgs?: any;

  /**
   * Wrappers for specific elements as they are selected and only if they are selected
   */
  elementWrappers?: ISlateEditorElementWrappers;

  /**
   * Args passed to all the element wrappers
   */
  elementWrappersArgs: any;

  /**
   * The list of standard features that are supported
   * according to the definition, the property entry handler
   * provides this right away to the renderer
   */
  features: IFeatureSupportOptions;
  /**
   * The value as html or plain text, look at the
   * isRichText prop in this same structure in order
   * to mark it as html or plain
   */
  value: string;
  /**
   * whether the current value is valid, the handler
   * can decide whether the value is valid, eg. too long
   * and mark it here as invalid
   */
  currentValid: boolean;
  /**
   * A current loading error, translated, this is also given by
   * the handler; it is used when a failure occurred to insert
   * files and other forms of media content
   */
  currentLoadError: string;
  /**
   * Used to set aria values for people who use screen readers
   * 
   * affects both aria-invalid and aria-errormessage
   */
  currentGeneralErrorElementId?: string;
  /**
   * affects aria-describedby
   */
  currentDescribedBy?: string;
  /**
   * Dismiss the current load error
   */
  dismissCurrentLoadError: () => void;
  /**
   * The root context, can be null if no context; given this is a text type
   * and the context is an special sort of argument the renderer must be the one
   * that decides how to receive these and how to take them, using the
   * rendererArgs property it might be passed there, as this is a rendering
   * element
   */
  rootContext: ITemplateArgContextDefinition;
  /**
   * The root i18n, renderers have a way to receive the root i18n data
   * based on the property definition they are using
   */
  rootI18n: any;
  /**
   * Whether the value represents rich text, given the value is
   * a string, this editor must know how to parse it
   */
  isRichText: boolean;
  /**
   * An internal value provided
   * that represents a slate document
   * it might be null if this value
   * is unknown
   */
  currentValue: IRootLevelDocument;
  /**
   * Triggers on change, it is meant to keep the same shape
   * as the handler expects it
   */
  onChange: (value: string, currentValue: IRootLevelDocument) => void;
  /**
   * Triggers on focus, it can be used to customize the renderer that is created
   * using it
   */
  onFocus: () => void;
  /**
   * Triggers on blur, it can be used to customize the renderer that is created
   * using it
   */
  onBlur: () => void;
  /**
   * Function that usually comes from the handler and is provided via the renderer
   * directly to this in order to handle file insertions into the media property
   * this function is given by the handler in this way to the renderer
   */
  onInsertFile: (file: File, isExpectingImage?: boolean) => Promise<IInsertedFileInformationType>;
  /**
   * Function that usually comes from the handler and is provided via the renderer
   * directly to this in order to handle file insertions into the media property
   * this function is given by the handler in this way to the renderer
   */
  onInsertFileFromURL: (url: string, name: string, isExpectingImage?: boolean) => Promise<IInsertedFileInformationType>;
  /**
   * Function that should be specified to inform whether a file is included
   * in the current internal information
   */
  onRetrieveFile: (fileId: string) => IPropertyDefinitionSupportedSingleFilesType;

  /**
   * Function that should be specified to retrieve an image
   * @param fileId 
   * @returns 
   */
  onRetrieveImage: (fileId: string) => ({ file: IPropertyDefinitionSupportedSingleFilesType, srcset: string })
  /**
   * Function that should be specified to retrieve data uris from blob urls given
   * a file id
   */
  // onRetrieveDataURI: (fileId: string) => string;
  /**
   * A placeholder to be used to be displayed, it only displays when the value
   * is considered to be the null document
   */
  placeholder?: string;
  /**
   * Whether to auto focus on mount
   */
  autoFocus?: boolean;
  /**
   * Whether the field is disabled
   */
  disabled?: boolean;
  /**
   * An specific scroll margin top to be used when scroll into view is used
   * against this element
   */
  scrollMarginTop?: string | number;
}

/**
 * Represents the internal state of this editor and it is used only
 * internally in the editor state, the wrapper might access some parts of it
 * nevertheless via the helpers, feature support and whatnot
 */
interface ISlateEditorState extends ISlateEditorInternalStateType {
  /**
   * The actual internal value that slate is
   * using, slate expects an immutable object here, and this is what it is
   * using the serializer functions in the utilities in order
   * to obtain this internal value
   */
  currentValue: IRootLevelDocument;
  /**
   * Whether the internal value is synced or should be synced, because the rich
   * text editor is rather complex, sending updates all the time and refetching from
   * the string that is current value to reparse is expensive, we do the following
   * 
   * 1. once something has changed in slate, the synced state will be set to false, and a timer will be set as
   * a timeout in order to actually call onChange, so itemize internal handling (which is expensive), won't trigger
   * on every single keypress, once the user stops typing, the entire chain of events gets released
   * 2. while the flag is false the string value cannot affect the internally set value and it will not override, so
   * the value that is shown is only dependant on the internal state that is here, and once the flag is set to true
   * then it will be rechecked
   * 3. when the flag is set to true (using getDerived in order o be cheaper and avoid 1 extra render cycle) we will
   * 3.1. Check the internal value, if one provided, and if they both are the same and match the uuid signature, then we
   * consider we are holding the same value; if that's not the case, no internal value, or internal value doesn't match
   * we reset to the new internal value and disable all current selections and anchors
   * 3.2. Check the string value and serialize it, based on the isRichText property to define how it will be parsed
   * to create a document, check the signature of the result, if the signature doesn't match, this means they are different
   * documents so we do the same, and update with the new value
   */
  synced: boolean;
  /**
   * all containers that exist within the definitions
   * for the css classes
   * 
   * They exist as state because of SSR
   * The server side is not able to access these nor read the CSS file
   * from the stylesheets definition
   */
  allContainers: string[];
  /**
   * available custom that exist within the definitions
   * for the css classes
   * 
   * They exist as state because of SSR
   * The server side is not able to access these nor read the CSS file
   * from the stylesheets definition
   */
  allCustom: string[];
  /**
   * available rich class that exist within the definitions
   * for the css classes
   * 
   * They exist as state because of SSR
   * The server side is not able to access these nor read the CSS file
   * from the stylesheets definition
   */
  allRichClasses: string[];
  /**
   * all tables that exist within the definitions
   * for the css classes
   * 
   * They exist as state because of SSR
   * The server side is not able to access these nor read the CSS file
   * from the stylesheets definition
   */
  allTables: string[];
}

const falseFn = () => false;

/**
 * Behold the component that does a lot of the magic
 * for rich text handling, this component does not have any definition
 * on how it is supposed to render things like the toolbar and what functions
 * such provides in order to be able to construct the rich text
 * and it's the job of the developer to decide how to do so, by default there
 * is a wrapper that is used for fast prototyping, but it's a rather generic
 * one, and developers using itemize should use this slate editor class and are
 * commended to, because it's easy, but they should prefer to use their own
 * customized wrapper to provide the functionality they want and how they want it
 * so they can define even their own custom ui-handler based elements, such as, eg.
 * math components
 * 
 * it is recommended to use your own custom renderer and import this class, copying off
 * the PropertyEntryText because it will not include any material UI fast prototyping resources
 * otherwise if you are also using material UI as included in itemize you might use
 * Wrapper and wrapperArgs in the rendererArgs but this is rather advanced, the most
 * advanced stuff off itemize and one that should be simplified
 */
export class SlateEditor extends React.Component<ISlateEditorProps, ISlateEditorState> {
  /**
   * Represents the react editor element that is created
   * using slate
   */
  private editor: ItemizeEditor;
  /**
   * This is the update timeout that is used in order to run onChange events when
   * the user stops typing and not on every keystroke, because rich text is expensive
   */
  private updateTimeout: NodeJS.Timeout;
  private isInNormalization: boolean = false;
  private preventNormalize: boolean = false;
  /**
   * When a call to delete the current selected node is done, the selection anchors as they have been set
   * need to be removed and reset because otherwise they will be pointing to invalid nodes, this internal
   * flag allows to keep track of that so.
   * 
   * 1. the delete function gets called, the flag gets set to true
   * 2. slate is internally asked to delete at the selected and given path
   * 3. this triggers the change function which will try to recalculate anchors, but the old anchors are invalid
   * 4. because of the flag the change function knows the löast change was a selected delete and tells the anchor
   * recalculation not to reuse old anchors
   */
  private lastChangeWasSelectedDelete: boolean = false;

  private originalSetFragmentData: any;
  private originalInsertData: any;
  private isUnmounted: boolean;

  private editableRef: React.RefObject<HTMLDivElement> = React.createRef();
  private wrapperRef: React.RefObject<any> = React.createRef();

  /**
   * The standard derived state function is used in order to set the state in an effective way
   * it is used because the behaviour of this editor is rather complex
   * @param props the current props
   * @param state the current state
   * @returns a partial of the new state or null
   */
  static getDerivedStateFromProps(props: ISlateEditorProps, state: ISlateEditorState): Partial<ISlateEditorState> {
    // we only mess with the state if we are synced
    // if we did not our state would basically be immutable
    // as it would restore from the prop on each render cycle
    if (state.synced) {
      // now if we have an internal value that is given via the props
      // this means that this is the internal value that refers to the value
      // itself
      if (props.currentValue) {

        // we check, if we don't have an internal value then certainly
        // this new internal value applies, and also we only care about changing
        // to the internal value new value if the ids are mistmatching as this id
        // represents the unique signature of that value
        if (!state.currentValue || props.currentValue.id !== state.currentValue.id) {

          // so if the criteria passes, and the signatures don't match or there's no internal
          // value to compare against we will update the internal value and clear all the anchors
          return {
            currentValue: props.currentValue,
            isRichText: props.isRichText,
            currentRootContext: props.rootContext || null,
            currentValid: props.currentValid,

            currentText: null,
            currentInlineElement: null,
            currentBlockElement: null,
            currentSuperBlockElements: null,
            currentTextAnchor: null,
            currentInlineElementAnchor: null,
            currentBlockElementAnchor: null,
            currentSuperBlockElementAnchors: null,

            currentSelectedText: null,
            currentSelectedInlineElement: null,
            currentSelectedBlockElement: null,
            currentSelectedSuperBlockElements: null,
            currentSelectedTextAnchor: null,
            currentSelectedInlineElementAnchor: null,
            currentSelectedBlockElementAnchor: null,
            currentSelectedSuperBlockElementAnchors: null,
            currentSelectedBlockContext: null,
            currentSelectedInlineContext: null,
            currentSelectedTopmostSuperBlockContext: null,
            currentSelectedElement: null,
            currentSelectedElementAnchor: null,
            currentSelectedElementContext: null,
            previousSelectedElementAnchor: null,
            previousTextAnchor: null,

            allowsInsertElement: falseFn,
            allowsText: false,
            inlineIsVoid: false,
            blockIsVoid: false,
            topmostSuperblockIsVoid: false,
            superBlockUIHandler: null,
            blockUIHandler: null,
            inlineUIHandler: null,
          };
        }

        // if we don't have an internal value we need to use the given
        // string
      } else {
        // and deserialize it based on the props
        const newcurrentValue = props.isRichText ?
          deserialize(props.value, state.currentValue, {
            useContextRulesOf: state.currentRootContext,
          }) :
          deserializePlain(props.value, state.currentValue);

        // if there's no internal value to compare, or the new internal value doesn't
        // match with the current, note that the signature will match with parsed values
        // as it uses a namespaced uuid that will give the same value for the same string
        if (!state.currentValue || newcurrentValue.id !== state.currentValue.id) {

          // then we do the same and set the new internal value
          // and clear all the anchors
          return {
            currentValue: newcurrentValue,
            isRichText: props.isRichText,
            currentRootContext: props.rootContext || null,
            currentValid: props.currentValid,

            currentText: null,
            currentInlineElement: null,
            currentBlockElement: null,
            currentSuperBlockElements: null,
            currentTextAnchor: null,
            currentInlineElementAnchor: null,
            currentBlockElementAnchor: null,
            currentSuperBlockElementAnchors: null,

            currentSelectedText: null,
            currentSelectedInlineElement: null,
            currentSelectedBlockElement: null,
            currentSelectedSuperBlockElements: null,
            currentSelectedTextAnchor: null,
            currentSelectedInlineElementAnchor: null,
            currentSelectedBlockElementAnchor: null,
            currentSelectedSuperBlockElementAnchors: null,
            currentSelectedElement: null,
            currentSelectedElementAnchor: null,
            previousSelectedElementAnchor: null,
            previousTextAnchor: null,

            allowsInsertElement: falseFn,
            allowsText: false,
            inlineIsVoid: false,
            blockIsVoid: false,
            topmostSuperblockIsVoid: false,
            superBlockUIHandler: null,
            blockUIHandler: null,
            inlineUIHandler: null,
          };
        }
      }
    }

    return null;
  }

  /**
   * Constructs a new instance of the slate editor component
   * @param props the props
   */
  constructor(props: ISlateEditorProps) {
    super(props);

    this.state = {
      // setting up the internal value from the property
      // first we pick the internal value if available
      // or otherwise we parse one
      currentValue: props.currentValue || (props.isRichText ? deserialize(props.value, null, {
        useContextRulesOf: props.rootContext,
      }) : deserializePlain(props.value)),

      // we are synced
      synced: true,
      // focused
      focused: false,

      // set up the anchors
      currentText: null,
      currentInlineElement: null,
      currentBlockElement: null,
      currentSuperBlockElements: null,
      currentTextAnchor: null,
      currentInlineElementAnchor: null,
      currentBlockElementAnchor: null,
      currentSuperBlockElementAnchors: null,

      currentSelectedText: null,
      currentSelectedInlineElement: null,
      currentSelectedBlockElement: null,
      currentSelectedSuperBlockElements: null,
      currentSelectedTextAnchor: null,
      currentSelectedInlineElementAnchor: null,
      currentSelectedBlockElementAnchor: null,
      currentSelectedSuperBlockElementAnchors: null,
      currentSelectedElement: null,
      currentSelectedElementAnchor: null,
      previousSelectedElementAnchor: null,
      previousTextAnchor: null,

      isRichText: props.isRichText,
      currentRootContext: props.rootContext || null,
      currentSelectedBlockContext: null,
      currentSelectedInlineContext: null,
      currentSelectedTopmostSuperBlockContext: null,
      currentSelectedElementContext: null,
      currentValid: props.currentValid,

      // ensure SSR compatibility
      // since we cannot read the CSS file on the server side
      // as we have no access to stylesheets
      allContainers: [],
      allCustom: [],
      allRichClasses: [],
      allTables: [],

      allowsInsertElement: falseFn,
      allowsText: false,
      inlineIsVoid: false,
      blockIsVoid: false,
      topmostSuperblockIsVoid: false,
      superBlockUIHandler: null,
      blockUIHandler: null,
      inlineUIHandler: null,
    }

    this.isUnmounted = false;

    // now we build the slate editor
    const rawEditor = createEditor();
    // with react of course ;)
    this.editor = withReact(withHistory(rawEditor));

    this.forceFocus = this.forceFocus.bind(this);
    this.forceBlur = this.forceBlur.bind(this);

    // setting up the functions to override
    // the defaults
    this.normalizeNode = this.normalizeNode.bind(this);
    this.insertBreak = this.insertBreak.bind(this);
    this.insertSuperbreak = this.insertSuperbreak.bind(this);
    this.deleteBackward = this.deleteBackward.bind(this);
    this.deleteForward = this.deleteForward.bind(this);
    this.setFragmentData = this.setFragmentData.bind(this);
    this.findAndAppendFilesToDataTransfer = this.findAndAppendFilesToDataTransfer.bind(this);
    this.insertData = this.insertData.bind(this);
    this.findAndInsertFilesFromDataTransfer = this.findAndInsertFilesFromDataTransfer.bind(this);
    this.isVoid = this.isVoid.bind(this);
    this.getContextFor = this.getContextFor.bind(this);
    this.getRootContext = this.getRootContext.bind(this);

    this.originalSetFragmentData = this.editor.setFragmentData;
    this.originalInsertData = this.editor.insertData;

    // and so we override
    this.editor.isInline = this.isInline as any;
    this.editor.isVoid = this.isVoid as any;
    this.editor.normalizeNode = this.normalizeNode;
    this.editor.insertBreak = this.insertBreak;
    this.editor.deleteBackward = this.deleteBackward;
    this.editor.deleteForward = this.deleteForward;
    this.editor.setFragmentData = this.setFragmentData;
    this.editor.insertData = this.insertData;

    this.getPreviousSelectedElementAnchor = this.getPreviousSelectedElementAnchor.bind(this);
    this.getPreviousTextAnchor = this.getPreviousTextAnchor.bind(this);

    // other functions and heler utilities
    this.deleteSelectedNode = this.deleteSelectedNode.bind(this);
    this.deletePath = this.deletePath.bind(this);
    this.setValue = this.setValue.bind(this);
    this.renderElement = this.renderElement.bind(this);
    this.actuallyRenderElement = this.actuallyRenderElement.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderText = this.renderText.bind(this);
    this.onFocusedChange = this.onFocusedChange.bind(this);
    this.onBlurredChange = this.onBlurredChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.deleteTableColumn = this.deleteTableColumn.bind(this);
    this.deleteTableRow = this.deleteTableRow.bind(this);
    this.selectPath = this.selectPath.bind(this);
    this.movePaths = this.movePaths.bind(this);
    this.focus = this.focus.bind(this);
    this.insertImage = this.insertImage.bind(this);
    this.insertVideo = this.insertVideo.bind(this);
    this.updateVideo = this.updateVideo.bind(this);
    this.insertFile = this.insertFile.bind(this);
    this.insertTemplateText = this.insertTemplateText.bind(this);
    this.updateTemplateText = this.updateTemplateText.bind(this);
    this.insertTemplateHTML = this.insertTemplateHTML.bind(this);
    this.updateTemplateHTML = this.updateTemplateHTML.bind(this);
    this.insertTable = this.insertTable.bind(this);
    this.insertTableColumn = this.insertTableColumn.bind(this);
    this.insertTableRow = this.insertTableRow.bind(this);
    this.toggleTable = this.toggleTable.bind(this);
    this.canToggleTable = this.canToggleTable.bind(this);
    this.insertContainer = this.insertContainer.bind(this);
    this.insertCustom = this.insertCustom.bind(this);
    this.toggleQuote = this.toggleQuote.bind(this);
    this.toggleTitle = this.toggleTitle.bind(this);
    this.insertList = this.insertList.bind(this);
    this.toggleLink = this.toggleLink.bind(this);
    this.updateLink = this.updateLink.bind(this);
    this.setStyle = this.setStyle.bind(this);
    this.set = this.set.bind(this);
    this.setHoverStyle = this.setHoverStyle.bind(this);
    this.setActiveStyle = this.setActiveStyle.bind(this);
    this.setRichClasses = this.setRichClasses.bind(this);
    this.setContext = this.setContext.bind(this);
    this.setIfCondition = this.setIfCondition.bind(this);
    this.setForEach = this.setForEach.bind(this);
    this.formatToggle = this.formatToggle.bind(this);
    this.setAction = this.setAction.bind(this);
    this.insertElement = this.insertElement.bind(this);
    this.getState = this.getState.bind(this);
    this.setUIHandler = this.setUIHandler.bind(this);
    this.setUIHandlerArg = this.setUIHandlerArg.bind(this);

    this.availableFilteringFunction = this.availableFilteringFunction.bind(this);
    this.calculateAnchors = this.calculateAnchors.bind(this);

    this.updateNodeAt = this.updateNodeAt.bind(this);
    this.insertNodeAt = this.insertNodeAt.bind(this);
    this.deleteNodeAt = this.deleteNodeAt.bind(this);
    this.mergeNodesAt = this.mergeNodesAt.bind(this);
    this.splitElementAndEscapeChildIntoParentAt = this.splitElementAndEscapeChildIntoParentAt.bind(this);
    this.wrapNodeAt = this.wrapNodeAt.bind(this);
    this.getNodeAt = this.getNodeAt.bind(this);
    this.cloneElementAt = this.cloneElementAt.bind(this);
    this.moveNodeAt = this.moveNodeAt.bind(this);

    this.hardBlur = this.hardBlur.bind(this);
    this.selectiveHardBlurIfHasSelectedElement = this.selectiveHardBlurIfHasSelectedElement.bind(this);
    this.softBlur = this.softBlur.bind(this);
  }

  /**
   * This function runs and prepares the tree that is to be inserted into the
   * pasted content
   * @param data the data transfer of the clipboard
   * @param blobs an object that contains the blob transfer object
   * @param element the element we are currently processing
   */
  public async findAndInsertFilesFromDataTransfer(data: DataTransfer, element: RichElement): Promise<RichElement> {
    // by default the new element is itself
    let newElement = element;
    let wasOverwritten = false;

    // however we might have these types we need to process
    if (newElement.type === "image" || newElement.type === "file") {
      const idSpecified = newElement.srcId;
      const urlToReadFrom = newElement.src;

      const existantFile = newElement.type === "image" ?
        this.props.onRetrieveImage(idSpecified) :
        this.props.onRetrieveFile(idSpecified);

      if (existantFile) {
        // File belongs to this editor, nothing to do
        if (newElement.type === "image") {
          const newImageNode: IImage = {
            ...newElement,
            type: "image",
            children: [
              {
                bold: false,
                italic: false,
                text: "",
                underline: false,
              }
            ],
            src: (existantFile as any).file.url,
            srcSet: (existantFile as any).srcset,
            sizes: "70vw",
          };
          newElement = newImageNode;
          wasOverwritten = true;
        } else {
          const newFileNode: IFile = {
            ...newElement,
            type: "file",
            children: [
              {
                bold: false,
                italic: false,
                text: "",
                underline: false,
              }
            ],
            src: (existantFile as any).url,
          };
          newElement = newFileNode;
          wasOverwritten = true;
        }
      } else {
        // File belongs to a different editor, cloning the content
        const infoFromInsert = await this.props.onInsertFileFromURL(
          urlToReadFrom,
          (newElement as any).fileName || (newElement as any).alt || idSpecified,
          newElement.type === "image",
        );

        if (infoFromInsert) {
          if (newElement.type === "image") {
            const imageNode: IImage = {
              ...newElement,
              type: "image",
              children: [
                {
                  bold: false,
                  italic: false,
                  text: "",
                  underline: false,
                }
              ],
              height: infoFromInsert.height,
              width: infoFromInsert.width,
              src: infoFromInsert.result.url,
              srcId: infoFromInsert.result.id,
              srcSet: null,
            };
            newElement = imageNode;
            wasOverwritten = true;
          } else {
            const fileNode: IFile = {
              ...newElement,
              type: "file",
              children: [
                {
                  bold: false,
                  italic: false,
                  text: "",
                  underline: false,
                }
              ],
              size: prettyBytes(infoFromInsert.result.size),
              src: infoFromInsert.result.url,
              srcId: infoFromInsert.result.id,
            };
            newElement = fileNode;
            wasOverwritten = true;
          }
        } else {
          newElement = null;
          wasOverwritten = true;
        }
      }
    }

    // if we still have the element and it has children
    // we need to process those too
    if (newElement && newElement.children && !wasOverwritten) {
      newElement = { ...newElement };
      newElement.children = (
        await Promise.all((newElement.children as any).map(this.findAndInsertFilesFromDataTransfer.bind(this, data)))
      ).filter(e => !!e) as any;
    }

    return newElement;
  }

  /**
   * This function runs when we are inserting using the slate clipboard
   * @param data the data transfer
   */
  public async insertData(data: DataTransfer) {
    // we grab the fragment data for slate
    const fragment = data.getData('application/x-slate-fragment');

    // if we have it this is the default clipboard
    // this should not happen by default this means it is using the fallback
    // clipboard mechanism
    if (fragment) {
      console.warn("The editor used the fallback clipboard mechanism rather than the new clipboard, files may fail to load");
      // then we decode and parse
      const decoded = decodeURIComponent(window.atob(fragment));
      // note how we filter in case bits fail to load (aka images and files)
      const parsed = (
        await Promise.all(JSON.parse(decoded).map(this.findAndInsertFilesFromDataTransfer.bind(this, data))) as Node[]
      ).filter(e => !!e) as any;

      if (!parsed || !parsed.length) {
        console.warn("Failed to find children to add");
        return;
      }

      // now we can insert that fragment once we are done
      const shouldUseInsertFragment = !isSuperBlock(parsed[0]);
      if (shouldUseInsertFragment) {
        // inserting a fragment allows merging of blocks
        // with this we ensure that for example, a title can be pasted
        // inside a paragraph
        Transforms.insertFragment(this.editor, parsed);
      } else if (this.state.currentBlockElementAnchor) {
        // the next one is a superblock we are trying to push
        // we do not allow it attempting to merge with our current
        Transforms.insertNodes(this.editor, parsed);
      }
      return;
    }

    if (data.files.length) {
      Array.from(data.files).forEach((f) => {
        if (FILE_SUPPORTED_IMAGE_TYPES.includes(f.type)) {
          this.insertImage(f, false);
        } else {
          this.insertFile(f);
        }
      });
      return;
    }

    // new way that offers super compability with everything
    const htmlData = data.getData("text/html");
    if (htmlData) {
      // we deserialize and process a raw html
      const deserialized = deserialize(htmlData, null, {
        dontNormalize: true,
      });

      // then send it for file processing
      const parsed = (
        await Promise.all(deserialized.children.map(this.findAndInsertFilesFromDataTransfer.bind(this, data))) as Node[]
      ).filter(e => !!e) as any;

      if (!parsed || !parsed.length) {
        console.warn("Failed to find children to add");
        return;
      }

      // now we can insert that fragment once we are done
      const shouldUseInsertFragment = !isSuperBlock(parsed[0]);
      if (shouldUseInsertFragment) {
        // inserting a fragment allows merging of blocks
        // with this we ensure that for example, a title can be pasted
        // inside a paragraph
        Transforms.insertFragment(this.editor, parsed);
      } else if (this.state.currentBlockElementAnchor) {
        // the next one is a superblock we are trying to push
        // we do not allow it attempting to merge with our current
        Transforms.insertNodes(this.editor, parsed);
      }
      return;
    } else {
      this.originalInsertData(data);
      return;
    }
  }

  public getDataURI(blob: Blob): Promise<string> {
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    return new Promise((resolve, reject) => {
      reader.addEventListener(
        "load",
        () => {
          // convert image file to base64 string
          resolve(reader.result as any);
        },
        false
      );
      reader.addEventListener("error", () => {
        reject();
      });
    });
  }

  /**
   * Runs per each rich element that has just been copied to the clipboard
   * @param data the data transfer
   * @param element the rich element we have just copied
   */
  public async findAndAppendFilesToDataTransfer(data: DataTransfer, element: RichElement): Promise<any> {
    // we want to spot images and files
    if (element.type === "image" || element.type === "file") {
      // get the url
      const urlToReadFrom = element.src;

      try {
        const blob = await ((await fetch(urlToReadFrom)).blob());
        const dataURI = await this.getDataURI(blob);

        // // if it's a blob
        // const isBlob = urlToReadFrom.startsWith("blob:");

        // // then we should think about copying it right into the data transfer
        // // since blobs are temporary
        // if (isBlob) {
        //   const urlData = this.props.onRetrieveDataURI(element.srcId);
        //   if (urlData) {
        //     gatheredFiles[element.srcId] = urlData;
        //   }
        // }

        element.src = dataURI;
        delete (element as IImage).srcSet;
      } catch (err) { }
    }

    // now we run per each children
    if (element.children) {
      await Promise.all((element.children as any).map(this.findAndAppendFilesToDataTransfer.bind(this, data)));
    }
  }

  /**
   * This function runs when we are preparing the slate clipboard
   * @param data the data transfer
   */
  public async setFragmentData(data: DataTransfer) {
    // we run the original function to prepare the clipboard
    this.originalSetFragmentData(data);

    // need to find the files that are included in the copy
    const fragment64 = data.getData("application/x-slate-fragment");
    if (fragment64 && navigator.clipboard) {
      // we are doing the real copying here since the copying mechanism
      // that comes by default is not very good
      const copyDataTree: RichElement[] = JSON.parse(decodeURIComponent(atob(fragment64)));
      await Promise.all(copyDataTree.map(this.findAndAppendFilesToDataTransfer.bind(this, data)));

      const document = ({
        children: copyDataTree as any,
        id: "COPY_ELEMENT",
        rich: true,
        type: "document" as "document",
      });

      const html = serialize(document) as HTMLElement[];
      const htmlStr = html.map((n) => n.outerHTML).join("");
      const text = serializeString(document);

      const textPlain = new Blob([text], { type: 'text/plain' });
      const htmlBody = new Blob([htmlStr], { type: 'text/html' });
      const item = new ClipboardItem({
        'text/plain': textPlain,
        "text/html": htmlBody,
      });
      await navigator.clipboard.write([item]);
    }
  }

  private updateNodeAt(path: Path, v: Partial<RichElement | IText>) {
    Transforms.setNodes(this.editor, v, {
      at: path,
    });
  }
  private deleteNodeAt(path: Path) {
    Transforms.delete(this.editor, {
      at: path,
    });
  }
  private insertNodeAt(path: Path, node: RichElement | IText, targetIndex: number) {
    Transforms.insertNodes(this.editor, node, {
      at: [...path, targetIndex],
    });
  }
  private mergeNodesAt(basePath: Path, referencePath: Path) {
    const parentPath = [...basePath];
    parentPath.pop();

    // due to a slate bug merging doesn't quite work
    // it just does nothing, despite the specification
    // the second argument doesn't pass either
    Transforms.mergeNodes(this.editor, {
      at: referencePath,
      voids: true,
    });
  }
  private splitElementAndEscapeChildIntoParentAt(path: Path, escapingChildIndex: number) {
    Transforms.liftNodes(this.editor, {
      at: [...path, escapingChildIndex],
    })
  }
  private wrapNodeAt(path: Path, wrappers: RichElement[]) {
    wrappers.forEach((wrapper) => {
      Transforms.wrapNodes(this.editor, wrapper, {
        at: path,
      });
    });
  }
  private getNodeAt(path: Path) {
    return Node.get(this.editor, path) as RichElement | IText;
  }
  private cloneElementAt(fromPath: Path, toPath: Path) {
    const toCopyNode = this.getNodeAt(fromPath) as RichElement;
    const copy = {
      ...toCopyNode,
    }
    copy.children = [];

    Transforms.insertNodes(this.editor, copy, {
      at: toPath,
    });
  }
  private moveNodeAt(fromPath: Path, toPath: Path) {
    Transforms.moveNodes(this.editor, {
      at: fromPath,
      to: toPath,
    });
  }

  /**
   * Normalization funciton that overrides the normalization
   * of the standard editor
   * @param entry the entry we are normalizing
   */
  public normalizeNode(entry: NodeEntry<Node>) {
    // the normalization function that comes
    // from the serializer takes care of the
    // entire serialization mechanism and shall not
    // be recalled when it's doing its job
    if (this.isInNormalization || this.preventNormalize) {
      return;
    }

    const [node, path] = entry;

    // if it's the editor itself, this is the only case
    // we want to normalize
    // we want to avoid others as they are verbose
    if (Editor.isEditor(node)) {
      this.isInNormalization = true;

      // this will basically be true every time
      if (node.children.length === 0) {
        // we insert a paragraph
        Transforms.insertNodes(this.editor,
          { type: "paragraph", children: [STANDARD_TEXT_NODE() as any] },
          { at: path.concat(0) }
        );
      } else {
        const pseudoDocument: IRootLevelDocument = {
          type: "document",
          children: node.children as any,
          id: this.state.currentValue.id,
          rich: this.state.currentValue.rich,
        };

        const nodeAtSelection = this.editor.selection ? this.getNodeAt(this.editor.selection.anchor.path) : null;
        const nodeIgnore: Path[] = [];
        if (Text.isText(nodeAtSelection) && nodeAtSelection.text === "") {
          nodeIgnore.push(this.editor.selection.anchor.path);
        }

        try {
          normalizeElement(
            pseudoDocument,
            [],
            pseudoDocument,
            {
              workOnOriginal: false,
              updateNodeAt: this.updateNodeAt,
              deleteNodeAt: this.deleteNodeAt,
              insertNodeAt: this.insertNodeAt,
              mergeNodesAt: this.mergeNodesAt,
              splitElementAndEscapeChildIntoParentAt: this.splitElementAndEscapeChildIntoParentAt,
              wrapNodeAt: this.wrapNodeAt,
              getNodeAt: this.getNodeAt,
              cloneElementAt: this.cloneElementAt,
              moveNodeAt: this.moveNodeAt,
            },
            {
              ignoreNodesAt: nodeIgnore,
              useContextRulesOf: this.state.currentRootContext,
            }
          );
        } catch (err) {
          console.error(err.stack);
        }
      }

      this.isInNormalization = false;
    }
  }

  /**
   * Override for the default editor inline function
   * @param element the element that is to be considered
   * @returns a boolean on whether it represents an inline element
   */
  public isInline(element: RichElement) {
    return isInline(element);
  }

  /**
   * Override for the default editor void function
   * @param element the element that is to be considered
   * @returns a boolean on whether it represents a void element
   */
  public isVoid(element: RichElement) {
    return isVoid(element);
  }

  /**
   * Override for the default editor insert break function
   */
  public insertBreak() {
    const currentSuperBlockElement = this.state.currentSuperBlockElements &&
      this.state.currentSuperBlockElements[this.state.currentSuperBlockElements.length - 1];

    const isListItemBreak = (
      currentSuperBlockElement &&
      // and we are within a list and a list item
      currentSuperBlockElement.type === "list-item"
    );
    if (
      // if we are simply collapsed
      Range.isCollapsed(this.editor.selection) &&
      // and we have a list item
      isListItemBreak &&
      // and that first children is an empty paragraph
      // there may be a second list
      (currentSuperBlockElement.children[0] as any).type === "paragraph" &&
      // with one empty text node
      (currentSuperBlockElement.children[0] as any).children.length === 1 &&
      Text.isText((currentSuperBlockElement.children[0] as any).children[0]) &&
      (currentSuperBlockElement.children[0] as any).children[0].text === ""
      // and that text node is empty
      // basically
      // 1. list item 1
      // 2. |
      // 3. list item 3
      // and we are pressing enter there where | represents the caret
    ) {
      // we need to break the list
      this.breakList();
      return;
    }

    if (!this.state.currentBlockElement) {
      // strange
      Transforms.splitNodes(this.editor, { always: true });
      return;
    }

    // if we are dealing with a void element like an image
    // we don't want to clone it
    if (this.editor.isVoid(this.state.currentBlockElement as any)) {
      // then we want to insert an empty paragraph
      Transforms.insertNodes(this.editor, {
        type: "paragraph",
        children: [
          {
            ...this.state.currentText,
            text: "",
          }
        ]
      });
      return;
    }

    // now we get the end of the given range
    const end = Range.end(this.editor.selection);
    // and make a copy of the block element anchor
    const finalBlockPath: Path = [...this.state.currentBlockElementAnchor];

    // and let's find the last child that should be an text node
    // as we go deep inside the structure
    let lastChild: Node = this.state.currentBlockElement as any;
    if (lastChild && Element.isElement(lastChild)) {
      do {
        const lastPoint = lastChild.children.length - 1;
        lastChild = lastChild.children[lastPoint] as any as Node;
        finalBlockPath.push(lastPoint);
      } while (Element.isElement(lastChild));
    }

    // until we find the text node, the last text node in the last part
    // of these 
    const finalBlockOffset = lastChild ? (lastChild as Text).text.length : null;

    const isEndOfLine = (
      end.offset === finalBlockOffset &&
      Path.equals(finalBlockPath, end.path)
    );

    if (isListItemBreak) {
      // otherwise we do a simple split node
      Transforms.splitNodes(this.editor, { always: true, match: (n: any) => n.type === "list-item" });
    } else {
      // otherwise we do a simple split node
      Transforms.splitNodes(this.editor, { always: true })
    }

    // gotta clear ui handlers and whatnot
    if (isEndOfLine) {
      Transforms.setNodes(this.editor, {
        uiHandler: null,
        html: null,
        uiHandlerArgs: null,
        textContent: null,
      }, {
        match: (n) => {
          return isBlock(n as any);
        },
        mode: "lowest",
        at: this.editor.selection.anchor.path,
      })
    }
  }

  /**
   * Override function to perform a forward delete
   * backwards event
   * @param unit the unit we are dealing with
   */
  public deleteForward(unit: "character" | "word" | "line" | "block") {
    // first we pick the current selection
    const { selection } = this.editor

    if (selection && Range.isCollapsed(selection)) {
      if (
        this.state.currentBlockElement &&
        this.state.currentBlockElement.children.length === 1 &&
        Text.isText(this.state.currentBlockElement.children[0]) &&
        this.state.currentBlockElement.children[0].text === ""
      ) {
        Transforms.delete(this.editor, { at: this.state.currentBlockElementAnchor });
      } else {
        Transforms.delete(this.editor, { unit });
      }
    }
  }

  /**
   * Override function to perform a standard delete
   * backwards event
   * @param unit the unit we are dealing with
   */
  public deleteBackward(unit: "character" | "word" | "line" | "block") {
    // first we pick the current selection
    const { selection } = this.editor;

    const currentSuperBlockElement = this.state.currentSuperBlockElements &&
      this.state.currentSuperBlockElements[this.state.currentSuperBlockElements.length - 1];

    // if we have one of any kind
    if (
      selection &&
      // and it's collapsed
      Range.isCollapsed(selection) &&
      currentSuperBlockElement &&
      currentSuperBlockElement.type === "list-item" &&
      (
        // and we are deleting a character of a word
        (
          (unit === "character" || unit === "word") &&
          // and we are at the start of the block
          selection.anchor.offset === 0
        ) ||
        // or we are removing a line or block
        (
          unit === "line" || unit == "block"
        )
      )
    ) {
      // we need to break the list, breaking the list consist of splitting
      // one list into two, removing the first or the last element back to a paragraph
      // or whatnot, etc...
      this.breakList();

      // otherwise if we have a selection, and the selection is collapsed
    } else if (selection && Range.isCollapsed(selection)) {
      // we must avoid removing current location if such is empty
      // this is because eg. if we have a bold text
      // then we want to ensure that such is not removed
      // there are however in most circumstances we want to ensure
      // any empty text is removed even in the current caret
      Transforms.delete(this.editor, { unit, reverse: true });
      // otherwise
    }
  }

  /**
   * Breaks the list based on the current selection
   * we must be in a list currently, this function is called
   * by the delete backwards functionality as well as the toggle
   * list one
   */
  public breakList() {
    this.preventNormalize = true;

    Transforms.unwrapNodes(
      this.editor,
      {
        match: (n: any) => {
          return n.type === "list";
        },
        mode: "lowest",
        split: true,
      }
    );

    this.preventNormalize = false;

    Transforms.unwrapNodes(
      this.editor,
      {
        match: (n: any) => {
          return n.type === "list-item";
        },
        mode: "lowest",
        split: true,
      }
    );
  }

  /**
   * Inserts a superblock break, since you might not be able to escape
   * superblocks, eg. such as a single container, you will use a superblock break
   * alt+enter in order to escape the superblock
   * 
   * @param at the path of the superblock to insert a break at
   * @param reverse whether to insert it before or after, by default it will be after, use this flag for before
   */
  public insertSuperbreak(at?: Path, reverse?: boolean) {
    let currentElementToBreakFromAnchor = at || (
      this.state.currentBlockElement && isVoid(this.state.currentBlockElement) && this.state.currentBlockElementAnchor
    ) || (
        this.state.currentSuperBlockElements &&
        this.state.currentSuperBlockElementAnchors[this.state.currentSuperBlockElementAnchors.length - 1]
      );

    if (!currentElementToBreakFromAnchor) {
      return;
    }

    let currentElementToBreakFrom = Node.get(this.editor, currentElementToBreakFromAnchor) as RichElement;
    // make a copy
    currentElementToBreakFromAnchor = [...currentElementToBreakFromAnchor];
    // so we get this anchor for the parent
    let parentSuperBlockElementAnchor = [...currentElementToBreakFromAnchor];
    parentSuperBlockElementAnchor.pop();
    let parentSuperBlockElement: RichElement = null;

    // and now loop
    while (true) {
      // get the parent element and check that paragraphs can be added to it
      parentSuperBlockElement = Node.get(this.editor, parentSuperBlockElementAnchor) as RichElement;
      const allowsChildren = SERIALIZATION_REGISTRY.ALLOWS_CHILDREN[parentSuperBlockElement.type];
      const canParentHaveParagraphAsChildren = !allowsChildren || allowsChildren.includes("paragraph");
      const isASoloEscapableType = currentElementToBreakFrom.type === "list";

      // could be the editor, so we stop
      if (
        (
          // list and list items can be escaped by
          // standard entering so we don't allow that as a break point
          !isASoloEscapableType &&
          canParentHaveParagraphAsChildren
        ) ||
        !parentSuperBlockElementAnchor.length
      ) {
        break;
      }

      // otherwise we go one level up for both
      parentSuperBlockElementAnchor.pop();
      currentElementToBreakFromAnchor.pop();
      currentElementToBreakFrom = Node.get(this.editor, currentElementToBreakFromAnchor) as RichElement;
    };

    // cannot break as it's a solo escapable type
    if (currentElementToBreakFrom.type === "list") {
      return;
    }

    // and now we need to get the next anchor that is next to such block
    const nextAnchor = currentElementToBreakFromAnchor;
    if (!reverse) {
      // if it's in reverse we actually just insert right in the same spot
      // which will push the given superblock forwards
      nextAnchor[nextAnchor.length - 1]++;
    }

    // and we insert a clone based on the block itself
    // with no text
    Transforms.insertNodes(this.editor, {
      type: "paragraph" as any,
      children: [
        {
          text: "",
        } as any
      ]
    }, { at: nextAnchor });

    // and we want to focus on such text
    const nextAnchorText = nextAnchor.concat([0]);

    this.focusAt({
      anchor: {
        offset: 0,
        path: nextAnchorText,
      },
      focus: {
        offset: 0,
        path: nextAnchorText,
      },
    });
  }

  /**
   * Calculates the anchors and the context based on a given value
   * (or the current value of the editor) and the selection nodes
   * that are currently selected (or it will override with the defaults)
   * @param anchor the anchor that is currently deemed to be selected at
   * @param value the value that we are working with, if not provided it will take it from the state
   * @param currentGivenSelectedNodeAnchor the selected node anchor, and text anchor if not provided
   * it will use the default values based on the logic of the calculated anchors
   */
  public calculateAnchors(
    anchor: Path,
    value?: Node[],
    currentGivenSelectedNodeAnchor?: Path,
  ) {
    // first we set up all the basics to their null value
    let currentInlineElement: RichElement = null;
    let currentInlineElementAnchor: Path = null;
    let currentBlockElement: RichElement = null;
    let currentBlockElementAnchor: Path = null;
    let currentSuperBlockElements: RichElement[] = null;
    let currentSuperBlockElementAnchors: Path[] = null;
    let currentText: IText = null;
    let currentTextAnchor: Path = null;

    let previousSelectedElementAnchor: Path = this.state.currentSelectedElementAnchor;
    let previousTextAnchor: Path = this.state.currentTextAnchor;

    // now we do need to setup the anchor if we have an anchor
    // in that case we need to populate these fields
    if (anchor) {
      // the current element
      let currentLoopingElement = value ? {
        children: value,
      } as any : this.state.currentValue;
      const loopingAnchor: Path = [];

      // we loop in our text anchor
      anchor.forEach((n: number, index: number) => {
        loopingAnchor.push(n);
        // otherwise it's an element
        currentLoopingElement = currentLoopingElement && currentLoopingElement.children[n] as RichElement;

        // if it's a non inline then we are into our current block
        if (currentLoopingElement && SERIALIZATION_REGISTRY.INLINES[currentLoopingElement.type]) {
          currentInlineElement = currentLoopingElement;
          currentInlineElementAnchor = [...loopingAnchor];
        }

        // if we have a superblock or list-item element that contains lists
        if (currentLoopingElement && SERIALIZATION_REGISTRY.BLOCKS[currentLoopingElement.type]) {
          currentBlockElement = currentLoopingElement;
          currentBlockElementAnchor = [...loopingAnchor];
        }

        // if we have a superblock or list-item element that contains lists
        if (currentLoopingElement && SERIALIZATION_REGISTRY.SUPERBLOCKS[currentLoopingElement.type]) {
          if (!currentSuperBlockElements) {
            currentSuperBlockElements = [];
            currentSuperBlockElementAnchors = [];
          }
          currentSuperBlockElements.push(currentLoopingElement);
          currentSuperBlockElementAnchors.push([...loopingAnchor]);
        }

        if (currentLoopingElement && Text.isText(currentLoopingElement)) {
          currentText = currentLoopingElement;
          currentTextAnchor = [...loopingAnchor];
        }
      });
    }

    // now for our selection, by default it's all null
    let currentSelectedInlineElementAnchor: Path = null;
    let currentSelectedInlineElement: RichElement = null;
    let currentSelectedBlockElement: RichElement = null;
    let currentSelectedSuperBlockElements: RichElement[] = null;
    let currentSelectedBlockElementAnchor: Path = null;
    let currentSelectedSuperBlockElementAnchors: Path[] = null;
    let currentSelectedText: IText = null;
    let currentSelectedTextAnchor: Path = null;

    let givenSelectedNodeAnchorIsCorrupted = false;

    if (currentGivenSelectedNodeAnchor) {
      let currentSelectedElementCorruptionTest = value ? {
        children: value,
      } as any : this.state.currentValue;
      givenSelectedNodeAnchorIsCorrupted = currentGivenSelectedNodeAnchor.some((n: number, index: number) => {
        if (
          !currentSelectedElementCorruptionTest ||
          !currentSelectedElementCorruptionTest.children ||
          !currentSelectedElementCorruptionTest.children[n]
        ) {
          return true;
        }
        currentSelectedElementCorruptionTest = currentSelectedElementCorruptionTest.children[n];
      });
    }

    // if we don't have a selected anchor and origin
    // we have purposely set then we should
    // default to the currently selected values, if any
    if (!currentGivenSelectedNodeAnchor || givenSelectedNodeAnchorIsCorrupted) {
      currentSelectedInlineElementAnchor = currentInlineElementAnchor;
      currentSelectedInlineElement = currentInlineElement;
      currentSelectedBlockElement = currentBlockElement;
      currentSelectedBlockElementAnchor = currentBlockElementAnchor;
      currentSelectedSuperBlockElements = currentSuperBlockElements;
      currentSelectedSuperBlockElementAnchors = currentSuperBlockElementAnchors;
      currentSelectedText = currentText;
      currentSelectedTextAnchor = currentTextAnchor;
    } else {
      const loopingAnchor: Path = [];

      // now we need to prepare and find the text origin, and context
      // as well as the selected element
      let currentLoopingElement = value ? {
        children: value,
      } as any : this.state.currentValue;

      // so we loop in the origin anchor
      currentGivenSelectedNodeAnchor.forEach((n: number, index: number) => {
        // and update the node origin
        currentLoopingElement = currentLoopingElement && currentLoopingElement.children[n];
        loopingAnchor.push(n);

        if (currentLoopingElement && SERIALIZATION_REGISTRY.INLINES[currentLoopingElement.type]) {
          currentSelectedInlineElement = currentLoopingElement;
          currentSelectedInlineElementAnchor = [...loopingAnchor];
        }

        // if we have a superblock or list-item element that contains lists
        if (currentLoopingElement && SERIALIZATION_REGISTRY.BLOCKS[currentLoopingElement.type]) {
          currentSelectedBlockElement = currentLoopingElement;
          currentSelectedBlockElementAnchor = [...loopingAnchor];
        }

        // if we have a superblock or list-item element that contains lists
        if (currentLoopingElement && SERIALIZATION_REGISTRY.SUPERBLOCKS[currentLoopingElement.type]) {
          if (!currentSelectedSuperBlockElements) {
            currentSelectedSuperBlockElements = [];
            currentSelectedSuperBlockElementAnchors = [];
          }
          currentSelectedSuperBlockElements.push(currentLoopingElement);
          currentSelectedSuperBlockElementAnchors.push([...loopingAnchor]);
        }

        if (currentLoopingElement && Text.isText(currentLoopingElement)) {
          currentSelectedText = currentLoopingElement;
          currentSelectedTextAnchor = [...loopingAnchor];
        }
      });
    }

    const pseudoDocument: IRootLevelDocument = {
      type: "document",
      children: value as any,
      id: this.state.currentValue.id,
      rich: this.state.currentValue.rich,
    };

    const currentSelectedTopmostSuperBlockContext = getContextFor(
      currentSelectedSuperBlockElementAnchors && currentSelectedSuperBlockElementAnchors[currentSelectedSuperBlockElementAnchors.length - 1],
      "final",
      pseudoDocument,
      this.state.currentRootContext,
    );
    const currentSelectedBlockContext = getContextFor(
      currentSelectedBlockElementAnchor,
      "final",
      pseudoDocument,
      this.state.currentRootContext,
    );
    const currentSelectedInlineContext = getContextFor(
      currentSelectedInlineElementAnchor,
      "final",
      pseudoDocument,
      this.state.currentRootContext,
    );

    // Calculation of other contextual information
    const baseSuperBlock = (
      currentSelectedSuperBlockElements && currentSelectedSuperBlockElements[currentSelectedSuperBlockElements.length - 1]
    ) || pseudoDocument;
    const baseAllowedChildreOfSuperBlock = baseSuperBlock ? getAllowedChildrenTypes(baseSuperBlock) : [];

    const superBlockUIHandler = getUIHandlerValueWithKnownContextFor(
      baseSuperBlock as RichElement,
      currentSelectedTopmostSuperBlockContext || this.state.currentRootContext,
      this.state.currentRootContext,
    );

    const baseBlock = currentSelectedBlockElement;
    const baseAllowedChildrenOfBlock = baseBlock ? getAllowedChildrenTypes(baseBlock) : [];

    const blockUIHandler = getUIHandlerValueWithKnownContextFor(
      baseBlock,
      currentSelectedBlockContext,
      this.state.currentRootContext,
    );

    const inlineUIHandler = getUIHandlerValueWithKnownContextFor(
      currentSelectedInlineElement,
      currentSelectedInlineContext,
      this.state.currentRootContext,
    );

    const allowsInsertElement = (element: RichElement, opts: { collapsed?: boolean; extended?: boolean; selected?: boolean } = {}) => {
      if (opts.collapsed || opts.extended || opts.selected) {
        if (opts.selected && !this.editor.selection) {
          return false;
        }
        const isCollapsed = this.editor.selection && Range.isCollapsed(this.editor.selection);
        if (!isCollapsed && opts.collapsed) {
          return false;
        } else if (isCollapsed && opts.extended) {
          return false;
        }
      }

      // we first need to check where it goes
      if (isSuperBlock(element) || isBlock(element)) {
        if (!baseAllowedChildreOfSuperBlock.includes(element.type)) {
          return false;
        }

        return superBlockUIHandler && superBlockUIHandler.allowsChildren ?
          superBlockUIHandler.allowsChildren(element, baseSuperBlock as RichElement) :
          true;
      } else if (isInline(element)) {
        if (!baseAllowedChildrenOfBlock.includes(element.type)) {
          return false;
        }

        return blockUIHandler && blockUIHandler.allowsChildren ?
          blockUIHandler.allowsChildren(element, baseBlock) :
          true;
      } else {
        return false;
      }
    }

    const topmostSuperblock = currentSelectedSuperBlockElements &&
      currentSelectedSuperBlockElements[currentSelectedSuperBlockElements.length - 1];
    const topmostSuperblockAnchor = currentSelectedSuperBlockElementAnchors &&
      currentSelectedSuperBlockElementAnchors[currentSelectedSuperBlockElementAnchors.length - 1];
    const inlineIsVoid = currentSelectedInlineElement ? isVoid(currentSelectedInlineElement) : false;
    const blockIsVoid = currentSelectedBlockElement ? isVoid(currentSelectedBlockElement) : false;
    const topmostSuperblockIsVoid = topmostSuperblock ? isVoid(topmostSuperblock) : false;
    const voidElement = inlineIsVoid || blockIsVoid || topmostSuperblockIsVoid;
    const allowsText = !voidElement;

    const currentSelectedElement = currentSelectedInlineElement || currentSelectedBlockElement || topmostSuperblock || null;
    const currentSelectedElementAnchor = currentSelectedInlineElementAnchor || currentSelectedBlockElementAnchor || topmostSuperblockAnchor || null;

    // now we can return
    return {
      currentTextAnchor,
      currentText,
      currentBlockElement,
      currentBlockElementAnchor,
      currentInlineElement,
      currentInlineElementAnchor,
      currentSuperBlockElements,
      currentSuperBlockElementAnchors,
      currentSelectedText,
      currentSelectedTextAnchor,
      currentSelectedBlockElement,
      currentSelectedBlockElementAnchor,
      currentSelectedInlineElement,
      currentSelectedInlineElementAnchor,
      currentSelectedSuperBlockElements,
      currentSelectedSuperBlockElementAnchors,
      currentSelectedElement,
      currentSelectedElementAnchor,

      currentSelectedTopmostSuperBlockContext,
      currentSelectedBlockContext,
      currentSelectedInlineContext,
      currentSelectedElementContext: currentSelectedInlineContext || currentSelectedBlockContext || currentSelectedTopmostSuperBlockContext,

      allowsInsertElement,
      allowsText,
      inlineIsVoid,
      blockIsVoid,
      topmostSuperblockIsVoid,
      superBlockUIHandler,
      blockUIHandler,
      inlineUIHandler,

      previousSelectedElementAnchor,
      previousTextAnchor,
    }
  }

  /**
   * Triggers on change when the field is focused
   * and has changed
   * @param anchor the anchor that we are at
   * @param value the value that we got
   */
  public onFocusedChange(anchor: Path, value: Node[]) {
    if (this.isUnmounted) {
      return;
    }
    // now we can calculate the anchors and context
    this.setState(this.calculateAnchors(anchor, value));

    // if we are not considered as currently focused
    if (!this.state.focused) {
      // we call this
      this.props.onFocus && this.props.onFocus();
      // and set the state
      this.setState({
        focused: true,
      });
    }
  }

  /**
   * Triggers on an on change whent he field is blurred
   * @param value the value that we are working with
   */
  public onBlurredChange(value?: Node[]) {
    if (this.isUnmounted) {
      return;
    }
    // if we are considered as focused
    if (this.state.focused) {
      // well not anymore
      this.props.onBlur && this.props.onBlur();
    }

    const currentSelectedSuperBlockElementAnchor = this.state.currentSelectedSuperBlockElementAnchors &&
      this.state.currentSelectedSuperBlockElementAnchors[this.state.currentSelectedSuperBlockElementAnchors.length - 1];

    // we pick the anchor based on specificity
    // the one we got the most specific we pass that
    const currentSelectedAnchor =
      this.state.currentSelectedTextAnchor ||
      this.state.currentSelectedInlineElementAnchor ||
      this.state.currentSelectedBlockElementAnchor ||
      currentSelectedSuperBlockElementAnchor;

    // now we can call this
    const anchorData = this.calculateAnchors(
      // no anchor as it is not known
      null,
      // the value
      value,
      // and we pass the selected node anchor as it
      // remains even after the selection only if
      // we have not just deleted that node
      currentSelectedAnchor &&
        !this.lastChangeWasSelectedDelete ? currentSelectedAnchor : null,
    );
    this.setState({
      focused: false,
      ...anchorData,
    });
  }

  /**
   * An optimization so that the component updates only when it's necessary
   * @param nextProps the next properties
   * @param nextState the next state
   */
  public shouldComponentUpdate(nextProps: ISlateEditorProps, nextState: ISlateEditorState) {
    const standardUpdate = (
      nextProps.id !== this.props.id ||
      nextProps.lang !== this.props.lang ||
      nextProps.currentValid !== this.props.currentValid ||
      nextState.focused !== this.state.focused ||
      nextProps.Wrapper !== this.props.Wrapper ||
      nextProps.isRichText !== this.props.isRichText ||
      nextProps.rootContext !== this.props.rootContext ||
      nextProps.rootI18n !== this.props.rootI18n ||
      nextState.currentTextAnchor !== this.state.currentTextAnchor ||
      nextState.currentSelectedTextAnchor !== this.state.currentSelectedTextAnchor ||
      nextState.currentRootContext !== this.state.currentRootContext ||
      nextProps.currentLoadError !== this.props.currentLoadError ||
      !equals(this.state.allContainers, nextState.allContainers, { strict: true }) ||
      !equals(this.state.allTables, nextState.allTables, { strict: true }) ||
      !equals(this.state.allCustom, nextState.allCustom, { strict: true }) ||
      !equals(this.state.allRichClasses, nextState.allRichClasses, { strict: true }) ||
      !equals(nextProps.wrapperArgs, this.props.wrapperArgs, { strict: true }) ||
      !equals(nextProps.elementWrappersArgs, this.props.elementWrappersArgs, { strict: true }) ||
      !equals(nextProps.features, this.props.features, { strict: true })
    )

    // if it's a standard update match
    if (standardUpdate) {
      // yep
      return true;
    }

    // otherwise let's check for internal values signature differences
    if (nextProps.currentValue && nextState.synced) {
      return nextProps.currentValue.id !== this.state.currentValue.id;
    }

    // otherwise we do allow for the update
    // as without an internal value or in a non-synced state
    // we are listening for every change
    return true;
  }

  /**
   * Sets the value off the rich text
   * @param v the value to set
   */
  public setValue(v: any) {
    // for some reason slate keeps triggering
    // a value change when it's disabled
    // because slate can be buggy
    if (this.isUnmounted || this.props.disabled) {
      return;
    }

    // build a new document
    const newRootDocument: IRootLevelDocument = {
      // we don't know the id yet
      id: null,
      type: "document",
      rich: this.state.currentValue.rich,
      children: v,
    };

    const serialized = serializeString(newRootDocument);
    newRootDocument.id = getUUIDFor(serialized);

    // we do not update immediately,
    // for that we first clear the update timeout
    // the update timeout contains update instructions
    // 2 of them
    // we want to halt such async execution
    clearTimeout(this.updateTimeout);

    const isEqual = (serialized || null) === (this.props.value || null);

    if (isEqual) {
      // and set the state to that
      this.setState({
        currentValue: newRootDocument,
        synced: true,
      });
    } else {
      this.setState({
        currentValue: newRootDocument,
        synced: false,
      });

      // now we can set it
      this.updateTimeout = setTimeout(() => {
        if (this.state.currentValue.rich) {
          // what we do is that we count the characters
          const count = countSize(this.state.currentValue);
          // and set it in the last rich text change cheat variable
          (window as any)[LAST_RICH_TEXT_CHANGE_LENGTH] = count;
        }

        // and now we can trigger the on change event
        this.props.onChange(serializeString(this.state.currentValue), this.state.currentValue);
        // and now we are going to wait a little bit more
        this.updateTimeout = setTimeout(() => {
          // to tell it that it should sync
          if (!this.isUnmounted) {
            this.setState({
              synced: true,
            });
          }
        }, 30);
      }, 300);
    }
  }

  /**
   * Provides the context a given node is sitting in
   * @param n the node in question
   * @param onlySwichingContext provides the context only if it was set
   * by the given node otherwise it will return null
   */
  public getContextFor(n: Node | Path, level?: "final" | "select-context" | "select-loop", onlySwichingContext?: boolean): ITemplateArgContextDefinition {
    if (onlySwichingContext) {
      const nodeAsRichElement: RichElement = (Path.isPath(n) ? Node.get(this.editor, n) : n) as RichElement;
      if (!nodeAsRichElement.context && !nodeAsRichElement.forEach) {
        return null;
      }
    }

    const pathOfNode = Path.isPath(n) ? n : ReactEditor.findPath(this.editor, n);
    return getContextFor(
      pathOfNode,
      level || "final",
      this.state.currentValue,
      this.state.currentRootContext,
    );
  }

  public getRootContext() {
    return this.state.currentRootContext;
  }

  public renderElement(props: RenderElementProps) {
    return (
      <CurrentElementRetriever
        {...props}
        fn={this.actuallyRenderElement}
      />
    )
  }

  /**
   * the render element function to be used in slate editor
   * @param props the properties that slate provides to render the component
   */
  public actuallyRenderElement(
    props: RenderElementProps,
    isSelected: boolean,
    selectionCriteria: "block" | "superblock" | "inline",
    isPrimary: boolean,
  ) {
    // first we extract all these stuffs
    const { attributes, children, element } = props;

    // let's check for a ui handler
    const uiHandler = (element as any as RichElement).uiHandler;
    let toReturn: React.ReactNode = null;
    let wasUIHandled = false;

    // if we have one
    if (uiHandler) {
      const handlerContext = this.getContextFor(element as any);

      // we extract the arguments for the ui handler that are in the rich element
      const uiHandlerArgs = (element as any as RichElement).uiHandlerArgs;

      // and now we try to get the ui handler from the context itself
      // either the root or the one in the property itself
      let propertiesFromContext: ITemplateArgUIHandlerDefinition =
        (handlerContext && handlerContext.properties && handlerContext.properties[uiHandler]) as ITemplateArgUIHandlerDefinition;

      if (!propertiesFromContext) {
        propertiesFromContext = (this.props.rootContext && this.props.rootContext.properties[uiHandler]) as ITemplateArgUIHandlerDefinition;
        if (propertiesFromContext && propertiesFromContext.nonRootInheritable) {
          propertiesFromContext = null;
        }
      }

      // if we don't find a UI handler
      // let's put a message about it
      if (
        propertiesFromContext &&
        propertiesFromContext.type === "ui-handler" &&
        propertiesFromContext.editorHandler
      ) {
        // now we can get the component, extra args and whatnot
        const HandlerComponent = propertiesFromContext.editorHandler.Component;
        const handlerExtraArgs = propertiesFromContext.editorHandler.extraArgs;
        const passExtraInfo = propertiesFromContext.editorHandler.passSlateInfo;

        // the extra info that should be passed if necessary
        const extraInfo = passExtraInfo ?
          {
            helpers: this.getHelpers(),
            selected: isSelected && isPrimary,
          } : {};

        let className: string = null;
        (element as any as RichElement).richClassList && (element as any as RichElement).richClassList.forEach((c) => {
          className = (className || "") + " rich-text--" + c;
        });
        const style = convertStyleStringToReactObject((element as any as RichElement).style);
        const styleActive = convertStyleStringToReactObject((element as any as RichElement).styleActive);
        const styleHover = convertStyleStringToReactObject((element as any as RichElement).styleHover);

        // now we can use the handler component that is given via the ui handler
        toReturn = <HandlerComponent
          args={{
            ...uiHandlerArgs,
            ...handlerExtraArgs,
          } as any}
          isSlate={true}
          attributes={attributes}
          element={element as any}
          style={style}
          styleActive={styleActive}
          styleHover={styleHover}
          className={className}
          events={null}
          {...extraInfo}
        >
          {children}
        </HandlerComponent>;

        const contextSwichContext = this.getContextFor(element as any, "final", true);

        // if we are in a ui handler that is currently looping
        // as we have entered a loopable context
        if (
          contextSwichContext &&
          contextSwichContext.loopable &&
          contextSwichContext.editorArgs &&
          contextSwichContext.editorArgs.loopEmulation &&
          contextSwichContext.editorArgs.loopEmulation >= 1
        ) {
          // and now we have entered loop emulation
          const arr: React.ReactNode[] = [];
          // we are going to use the wrapper in each case to change the context
          // which hopefully will change things down the line
          for (let i = 0; i < contextSwichContext.editorArgs.loopEmulation; i++) {
            const shouldDisableElementWrappers = i !== contextSwichContext.editorArgs.loopEmulation - 1;
            if (contextSwichContext.editorArgs.wrapper) {
              if (shouldDisableElementWrappers) {
                arr.push(
                  <ElementWrapperDisabler.Provider value={true} key={i}>
                    {contextSwichContext.editorArgs.wrapper(toReturn, i)}
                  </ElementWrapperDisabler.Provider>
                );
              } else {
                arr.push(<React.Fragment key={i}>{contextSwichContext.editorArgs.wrapper(toReturn, i)}</React.Fragment>);
              }
            } else {
              if (shouldDisableElementWrappers) {
                arr.push(
                  <ElementWrapperDisabler.Provider value={true} key={i}>
                    {toReturn}
                  </ElementWrapperDisabler.Provider>
                );
              } else {
                arr.push(<React.Fragment key={i}>{toReturn}</React.Fragment>);
              }
            }
          }
          toReturn = arr;
        } else if (contextSwichContext && contextSwichContext.editorArgs && contextSwichContext.editorArgs.wrapper) {
          // otherwise if we got a standard context, with a wrapper, then we use it
          toReturn = contextSwichContext.editorArgs.wrapper(toReturn);
        }

        wasUIHandled = true;
      }
    }

    if (!wasUIHandled) {
      const customProps: any = { ...attributes, children };

      const html = (element as any as RichElement).html;
      if (typeof html === "string") {
        const htmlContext = this.getContextFor(element as any);
        let propertiesFromContext: ITemplateArgHTMLDefinition = htmlContext && htmlContext.properties && htmlContext.properties[html] as ITemplateArgHTMLDefinition;
        if (!propertiesFromContext) {
          propertiesFromContext = this.props.rootContext && this.props.rootContext.properties && this.props.rootContext.properties[html] as ITemplateArgHTMLDefinition;
          if (propertiesFromContext && propertiesFromContext.nonRootInheritable) {
            propertiesFromContext = null;
          }
        }

        if (propertiesFromContext && propertiesFromContext.type === "html" && typeof propertiesFromContext.editorDisplay !== "undefined") {
          const toDisplay = propertiesFromContext.editorDisplay;
          if (typeof toDisplay === "string") {
            customProps.children = (
              <>
                <div contentEditable={false} dangerouslySetInnerHTML={{ __html: toDisplay }} style={{ display: "contents" }} />
                {children}
              </>
            );
          } else {
            customProps.children = (
              <>
                <div contentEditable={false} style={{ display: "contents" }}>
                  {toDisplay}
                </div>
                {children}
              </>
            );
          }
        } else {
          customProps.children = (
            <>
              {(propertiesFromContext && propertiesFromContext.label) || (element as any).children[0].text}
              {children}
            </>
          );
        }
      }

      const text = element.textContent;
      if (typeof text === "string") {
        const textContext = this.getContextFor(element as any);
        let propertiesFromContext: ITemplateArgTextDefinition = textContext &&
          textContext.properties &&
          textContext.properties[text] as ITemplateArgTextDefinition;
        if (!propertiesFromContext) {
          propertiesFromContext = this.props.rootContext &&
            this.props.rootContext.properties &&
            this.props.rootContext.properties[text] as ITemplateArgTextDefinition;
          if (propertiesFromContext && propertiesFromContext.nonRootInheritable) {
            propertiesFromContext = null;
          }
        }

        customProps.children = (
          <>
            {(
              propertiesFromContext &&
              propertiesFromContext.type === "text" &&
              (propertiesFromContext.editorDisplay || propertiesFromContext.label)
            ) || (element as any).children[0].text}
            {children}
          </>
        );
      }

      // and now we call the reactification
      toReturn = SERIALIZATION_REGISTRY.REACTIFY[element.type as string]({
        active: false,
        selected: isSelected && isPrimary,
        element: element as any,
        asTemplate: false,
        customProps,

        // we don't care as we are not using the onCustom function
        parent: null,
        tree: null,
        path: [],
        accumulatedSentence: null,
        accumulatedWord: null,
        trueParent: null,
      }) as any;

      const contextSwichContext = this.getContextFor(element as any, "final", true);

      // if we find ourselves in a loopable context as we are currently looping
      if (
        contextSwichContext &&
        contextSwichContext.loopable &&
        contextSwichContext.editorArgs &&
        contextSwichContext.editorArgs.loopEmulation &&
        contextSwichContext.editorArgs.loopEmulation >= 1
      ) {
        const arr: React.ReactNode[] = [];
        for (let i = 0; i < contextSwichContext.editorArgs.loopEmulation; i++) {
          const shouldDisableElementWrappers = i !== contextSwichContext.editorArgs.loopEmulation - 1;
          if (contextSwichContext.editorArgs.wrapper) {
            if (shouldDisableElementWrappers) {
              arr.push(
                <ElementWrapperDisabler.Provider value={true} key={i}>
                  {contextSwichContext.editorArgs.wrapper(toReturn, i)}
                </ElementWrapperDisabler.Provider>
              );
            } else {
              arr.push(<React.Fragment key={i}>{contextSwichContext.editorArgs.wrapper(toReturn, i)}</React.Fragment>);
            }
          } else {
            if (shouldDisableElementWrappers) {
              arr.push(
                <ElementWrapperDisabler.Provider value={true} key={i}>
                  {toReturn}
                </ElementWrapperDisabler.Provider>
              );
            } else {
              arr.push(<React.Fragment key={i}>{toReturn}</React.Fragment>);
            }
          }
        }
        toReturn = arr;
      } else if (contextSwichContext && contextSwichContext.editorArgs && contextSwichContext.editorArgs.wrapper) {
        toReturn = contextSwichContext.editorArgs.wrapper(toReturn);
      }
    }

    if (
      this.props.elementWrappers &&
      (
        (
          !wasUIHandled &&
          this.props.elementWrappers.components &&
          this.props.elementWrappers.components[element.type]
        ) || (
          this.props.elementWrappers.uiHandler &&
          this.props.elementWrappers.uiHandler[element.uiHandler]
        )
      )
    ) {
      const ElementWrapper =
        (
          this.props.elementWrappers.uiHandler &&
          this.props.elementWrappers.uiHandler[element.uiHandler]
        ) || this.props.elementWrappers.components[element.type];

      if (ElementWrapper) {
        return (
          <ElementWrapperDisabler.Consumer>
            {(disabled) => (
              disabled ? toReturn : (
                <ElementWrapper
                  element={element}
                  helpers={this.getHelpers()}
                  primarySelection={isPrimary}
                  isSelected={isSelected}
                  featureSupport={this.getFeatureSupport()}
                  {...this.props.elementWrappersArgs}
                >
                  {toReturn}
                </ElementWrapper>
              )
            )}
          </ElementWrapperDisabler.Consumer>
        );
      }
    }

    return toReturn;
  }

  /**
   * the function that is called by slate to render text
   * @param props the properties given by slate to render a text leaf
   */
  public renderText(props: RenderLeafProps) {
    // first we extract the attributes
    const { attributes, children, leaf } = props;

    // now we use the serialization registry in order
    // to make the calls
    return SERIALIZATION_REGISTRY.REACTIFY.text({
      active: false,
      selected: false,
      element: leaf as any,
      asTemplate: false,
      customProps: { ...attributes, children },

      // we don't care as we are not using the onCustom function
      // this will prevent normalization but that's fine
      parent: null,
      tree: null,
      path: [],
      accumulatedSentence: null,
      accumulatedWord: null,
      trueParent: null,
    }) as any;
  }

  /**
   * The change function that is called via slate when a change occurs
   * this function hits every time on every change of the rich text
   * @param newValue the new value of the children of the document
   */
  public onChange(newValue: Node[]) {
    if (this.isUnmounted) {
      return;
    }

    // if there's a selection
    if (this.editor.selection && ReactEditor.isFocused(this.editor)) {
      // we are on focus
      this.onFocusedChange(this.editor.selection.anchor.path, newValue);
    } else {
      // otherwise we are blurred
      this.onBlurredChange(newValue);
    }

    // always remark the flag as false as this change is a normal change
    this.lastChangeWasSelectedDelete = false;

    // and if the new value is not the same as the old children of the document
    // as these values are immutable and we just override them
    // NOW it matters as slate did a weird update where it changes the immutable
    // state because now the state is mutable
    //if (newValue !== this.state.currentValue.children as any) {
    // we update, the reason the value might be equal is because the change
    // triggers for changes in the selection
    this.setValue(newValue);
    //}
  }

  /**
   * Performs a hard blur event and the paths are cleared out
   */
  public hardBlur() {
    if (this.isUnmounted) {
      return;
    }
    this.setState({
      currentSelectedInlineElementAnchor: null,
      currentSelectedInlineElement: null,
      currentSelectedText: null,
      currentSelectedTextAnchor: null,
      currentSelectedBlockElement: null,
      currentSelectedBlockElementAnchor: null,
      currentSelectedSuperBlockElements: null,
      currentSelectedSuperBlockElementAnchors: null,
      currentSelectedInlineContext: null,
      currentSelectedBlockContext: null,
      currentSelectedTopmostSuperBlockContext: null,
      currentSelectedElement: null,
      currentSelectedElementAnchor: null,
      currentSelectedElementContext: null,
      previousSelectedElementAnchor: this.state.currentSelectedElementAnchor,
      previousTextAnchor: this.state.currentTextAnchor,
    });
    Transforms.deselect(this.editor);
    ReactEditor.blur(this.editor);
  }

  public selectiveHardBlurIfHasSelectedElement(e: KeyboardEvent, ele: HTMLElement) {
    if (this.state.currentSelectedElement) {
      if (ele && this.wrapperRef?.current?.selectiveHardBlur) {
        this.wrapperRef?.current?.selectiveHardBlur(e, ele);
      } else {
        this.hardBlur();
      }
    }
  }

  /**
   * Performs a soft blur event
   */
  public softBlur() {
    ReactEditor.blur(this.editor);
    Transforms.deselect(this.editor);
  }

  public deletePath(p: Path) {
    const currentSelectedElementAnchor = this.state.currentSelectedElementAnchor;

    if (
      Path.equals(p, currentSelectedElementAnchor) ||
      Path.isAncestor(p, currentSelectedElementAnchor)
    ) {
      this.lastChangeWasSelectedDelete = true;
    }

    Transforms.delete(this.editor, {
      at: p,
    });

    // and now we can refocus
    if (this.state.currentText) {
      // now we need to refocus
      ReactEditor.focus(this.editor);
    } else {
      ReactEditor.blur(this.editor);
    }
  }

  /**
   * given a node path, that should represent either an element or a text node
   * this allows such a path to be selected and be marked into the selection
   * @param p the path to select
   */
  public selectPath(p: Path) {
    if (this.isUnmounted) {
      return;
    }

    // now we can update the state
    this.setState(
      this.calculateAnchors(
        this.editor.selection && this.editor.selection.anchor.path,
        this.state.currentValue.children as any,
        p,
      ),
    );
  }

  /**
   * Allows to move between two paths as it moves elements to one place to another
   * @param p the path to select
   */
  public movePaths(from: Path, to: Path) {
    if (this.isUnmounted) {
      return;
    }

    const selectedElement = this.state.currentSelectedElement;

    // due to a bug in the way the nodes are moved actually
    // it has to be done this way so first we need to find
    // if we are just sorting, sorting in the same level
    const toCropped = [...to];
    const toLast = toCropped.pop();

    const fromCropped = [...from];
    const fromLast = fromCropped.pop();

    // this will work as where we are actually moving to
    const actualTo = [...to];

    // if we are at the same level, and we are moving under our from
    if (Path.equals(fromCropped, toCropped) && toLast > fromLast) {
      // then we substract one
      actualTo[actualTo.length - 1]--;
    }

    // the reason we do that is because for some weird messed up reason slate
    // is going to move things at the same level one position further because
    // we are taking one element away (it does that) and then it moves it to the wrong
    // place one further because then it is not there anymore, weirdly this doesn't
    // happen when there are many levels involved

    // and we can move it now
    Transforms.moveNodes(
      this.editor,
      {
        at: from,
        to: actualTo,
      }
    );

    setTimeout(() => {
      // and now we need to find out the path to select
      const newSelectedAnchor = selectedElement ? ReactEditor.findPath(this.editor, selectedElement) : null;
      this.setState(this.calculateAnchors(this.editor.selection && this.editor.selection.anchor.path, null, newSelectedAnchor))
    }, 0);
  }

  public getPreviousSelectedElementAnchor() {
    return this.state.previousSelectedElementAnchor;
  }

  public getPreviousTextAnchor() {
    return this.state.previousTextAnchor;
  }

  /**
   * Deletes the selected node that has been selected, either the current default
   * or one that has been manually selected using selectPath
   */
  public deleteSelectedNode() {
    // first we mark to say that the last was selected delete, remember as defined
    // this is used because during the normalization the anchors might corrupt during the
    // call to onchange as the selected anchors are now messed up, so this flag
    // ensures to clear up the anchors just after the transform
    this.lastChangeWasSelectedDelete = true;

    const selectedElementAnchor = this.state.currentSelectedElementAnchor;

    // so we delete which will call onchange and normalization
    Transforms.delete(this.editor, {
      at: selectedElementAnchor,
    });

    // and now we can refocus
    if (this.state.currentText) {
      // now we need to refocus
      ReactEditor.focus(this.editor);
    } else {
      ReactEditor.blur(this.editor);
    }
  };

  /**
   * A helper function to call react focus back into the editor
   */
  public focus() {
    //preventFocus();
    // now we need to refocus
    ReactEditor.focus(this.editor);
  }

  /**
   * An async function that is a bit of a hack to focus at a given
   * range, because of the way slate works it needs to be async
   * @param at the range to focus at
   * @returns a void promise once it's done
   */
  public async focusAt(at: Range | Path): Promise<void> {
    //preventFocus();

    if (Range.isRange(at)) {
      return new Promise((r) => {
        setTimeout(() => {
          ReactEditor.focus(this.editor);
          setTimeout(() => {
            Transforms.select(this.editor, at);
            setTimeout(r, 0);
          }, 0);
        }, 0);
      });
    } else {
      this.selectPath(at);
    }
  }

  /**
   * Provides a fallback for insert when no insert region is found
   * @param type 
   * @returns 
   */
  public getFallbackInsertPath() {
    if (this.state.currentSelectedInlineElement) {
      return [...this.state.currentSelectedInlineElementAnchor, this.state.currentSelectedInlineElement.children.length];
    } else if (this.state.currentSelectedBlockElement) {
      return [...this.state.currentSelectedBlockElementAnchor, this.state.currentSelectedBlockElement.children.length];
    } else if (this.state.currentSelectedSuperBlockElements) {
      const currentSelectedSuperBlockElementAnchor =
        this.state.currentSelectedSuperBlockElementAnchors[this.state.currentSelectedSuperBlockElementAnchors.length - 1];
      const currentSelectedSuperBlockElement =
        this.state.currentSelectedSuperBlockElements[this.state.currentSelectedSuperBlockElements.length - 1];
      return [...currentSelectedSuperBlockElementAnchor, currentSelectedSuperBlockElement.children.length];
    } else {
      return [this.state.currentValue.children.length];
    }
  }

  /**
   * Will insert an image based on a given file that has
   * been taken as an input
   * 
   * Note that there is an insert file function that should be given
   * as prop and that's what this function will call, if an error occurred
   * it should have been fed as a prop as well, so this function always
   * returns a void promise
   * 
   * @param file the file
   * @param standalone whether to make it a standalone image
   * @returns a void promise once it's done
   */
  public async insertImage(file: File, standalone: boolean): Promise<void> {
    // we try
    try {
      // now let's see what we get
      const data = await this.props.onInsertFile(file, true);
      if (!data) {
        // something went wrong there should be an error in the props
        return;
      }

      // now we can build the image node that we should add in the tree
      const imageNode: IImage = {
        type: "image",
        alt: null,
        children: [
          {
            bold: false,
            italic: false,
            text: "",
            underline: false,
          }
        ],
        height: data.height,
        width: data.width,
        sizes: "70vw",
        src: data.result.url,
        srcId: data.result.id,
        srcSet: null,
        standalone,
      };

      // and we call the insert node
      if (!this.editor.selection) {
        Transforms.insertNodes(this.editor, imageNode as any, { at: this.getFallbackInsertPath() });
      } else {
        Transforms.insertNodes(this.editor, imageNode);
      }
    } catch (err) {
    }
  }

  public updateTemplateText(label: string, value: string) {
    if (this.state.currentSelectedInlineElement) {
      Transforms.setNodes(this.editor, {
        textContent: value || "",
      }, { at: this.state.currentSelectedInlineElementAnchor });
      Transforms.setNodes(this.editor, {
        text: label || localeReplacer(this.props.rootI18n.rich_template_component, this.props.rootI18n.rich_text),
      }, { at: this.state.currentSelectedTextAnchor });
    }
  }

  /**
   * Will insert a bit of template text that is used for templating purposes
   * 
   * @param label the label to give it
   * @param value the value that it gets
   * @param at at which range to insert it (optional)
   * @returns a void promise
   */
  public insertTemplateText(label: string, value: string) {
    // now we make the text node
    const textNode: IText = {
      bold: false,
      italic: false,
      underline: false,
      text: label || localeReplacer(this.props.rootI18n.rich_template_component, this.props.rootI18n.rich_text),
    };

    // and now we build a paragraph node to put the text there
    const inlineNode: IInline = {
      children: [textNode],
      type: "inline",
      textContent: value || "",
    };

    // and we call the insert node
    if (!this.editor.selection) {
      Transforms.insertNodes(this.editor, inlineNode as any, { at: this.getFallbackInsertPath() });
    } else {
      Transforms.insertNodes(this.editor, inlineNode);
    }
  }

  public updateTemplateHTML(label: string, value: string) {
    if (this.state.currentSelectedBlockElement) {
      Transforms.setNodes(this.editor, {
        html: value || "",
      }, { at: this.state.currentSelectedBlockElementAnchor });
      Transforms.setNodes(this.editor, {
        text: label || localeReplacer(this.props.rootI18n.rich_template_component, this.props.rootI18n.rich_container),
      }, { at: this.state.currentSelectedTextAnchor });
    }
  }

  /**
   * Will insert a bit of template html that is used for templating purposes, work similar
   * to template text, except it uses html content instead to replace the inner html
   * 
   * @param label the label to be given to the element to be added
   * @param value the value that will be used from the context
   * @param at an optional range where to be inserted
   */
  public insertTemplateHTML(label: string, value: string) {
    // and create a text node based on that
    // which is where we put the label
    const textNode: IText = {
      bold: false,
      italic: false,
      underline: false,
      text: label || localeReplacer(this.props.rootI18n.rich_template_component, this.props.rootI18n.rich_container),
    }

    // and a container to make it be the inner html
    // container
    const voidBlock: IVoidBlock = {
      children: [textNode],
      type: "void-block",
      html: value || "",
    }

    // and we call the insert node
    if (!this.editor.selection) {
      Transforms.insertNodes(this.editor, voidBlock, { at: this.getFallbackInsertPath() });
    } else {
      Transforms.insertNodes(this.editor, voidBlock);
    }
  }

  /**
   * Inserts a table at the given location
   * @param type the type of the table
   */
  public insertTable(type?: string) {
    // now we can make the container
    const tableNode: ITable = {
      type: "table",
      children: [
        {
          type: "tbody",
          children: [
            {
              type: "tr",
              children: [
                {
                  type: "td",
                  children: [
                    STANDARD_PARAGRAPH(),
                  ],
                }
              ]
            }
          ]
        },
      ],
      tableType: type || null,
    };

    // and we call the insert node
    if (!this.editor.selection) {
      Transforms.insertNodes(this.editor, tableNode, { at: this.getFallbackInsertPath() });
    } else {
      Transforms.insertNodes(this.editor, tableNode);
    }
  }

  public insertTableColumn() {
    if (!this.state.currentSelectedSuperBlockElements) {
      return;
    }

    const currentColumnIndex = this.state.currentSelectedSuperBlockElements &&
      findLastIndex(this.state.currentSelectedSuperBlockElements, (e) => e.type === "td" || e.type === "th");

    if (currentColumnIndex === -1) {
      return;
    }

    const currentColumn = this.state.currentSelectedSuperBlockElements[currentColumnIndex];
    const currentColumnAnchor = this.state.currentSelectedSuperBlockElementAnchors[currentColumnIndex];

    // this is where we end to focus as that's where we add the new row at
    // however we do need to add a new column at the same index in every
    // row
    const targetColumnAnchor = [...currentColumnAnchor];
    targetColumnAnchor[targetColumnAnchor.length - 1]++;

    const targetIndex = targetColumnAnchor[targetColumnAnchor.length - 1];

    const tableAnchor = [...currentColumnAnchor];
    // tr
    tableAnchor.pop();
    // thead or tbody
    tableAnchor.pop();
    // table
    tableAnchor.pop();

    try {
      const tableElement = this.getNodeAt(tableAnchor) as RichElement;

      if (tableElement.type === "table") {
        tableElement.children.forEach((theadOrTbodyOrTfoot, theadOrTbodyOrTFootIndex) => {
          theadOrTbodyOrTfoot.children.forEach((row, rowIndex) => {
            const column: ITd = {
              type: "td",
              children: [
                STANDARD_PARAGRAPH(),
              ],
            };

            let actualTargetIndex: number = targetIndex;
            if (actualTargetIndex > row.children.length) {
              actualTargetIndex = row.children.length;
            }

            const insertPoint = [...tableAnchor, theadOrTbodyOrTFootIndex, rowIndex, actualTargetIndex];

            // only allow to normalize at our last insert
            // otherwise the normalizer will get crazy
            this.preventNormalize = rowIndex !== theadOrTbodyOrTfoot.children.length - 1;
            Transforms.insertNodes(this.editor, column, { at: insertPoint });
            this.preventNormalize = false;
          });
        });

        const textAnchorOfColumn = targetColumnAnchor;
        // paragraph
        textAnchorOfColumn.push(0);
        // text
        textAnchorOfColumn.push(0);

        this.focusAt({
          anchor: {
            offset: 0,
            path: targetColumnAnchor,
          },
          focus: {
            offset: 0,
            path: targetColumnAnchor,
          },
        });
      }
    } catch {

    }
  }

  public deleteTableColumn() {
    if (!this.state.currentSelectedSuperBlockElements) {
      return;
    }

    const currentColumnIndex = this.state.currentSelectedSuperBlockElements &&
      findLastIndex(this.state.currentSelectedSuperBlockElements, (e) => e.type === "td" || e.type === "th");

    if (currentColumnIndex === -1) {
      return;
    }

    const currentColumn = this.state.currentSelectedSuperBlockElements[currentColumnIndex];
    const currentColumnAnchor = this.state.currentSelectedSuperBlockElementAnchors[currentColumnIndex];

    // this is the index we are removing in each row
    const targetIndex = currentColumnAnchor[currentColumnAnchor.length - 1];

    const tableAnchor = [...currentColumnAnchor];
    // tr
    tableAnchor.pop();
    // thead or tbody
    tableAnchor.pop();
    // table
    tableAnchor.pop();

    try {
      const tableElement = this.getNodeAt(tableAnchor) as RichElement;

      if (tableElement.type === "table") {
        tableElement.children.forEach((theadOrTbodyOrTfoot, theadOrTbodyOrTFootIndex) => {
          theadOrTbodyOrTfoot.children.forEach((row, rowIndex) => {
            const deletePoint = [...tableAnchor, theadOrTbodyOrTFootIndex, rowIndex, targetIndex];

            // only allow to normalize at our last insert
            // otherwise the normalizer will get crazy
            this.preventNormalize = rowIndex !== theadOrTbodyOrTfoot.children.length - 1;
            Transforms.delete(this.editor, { at: deletePoint });
            this.preventNormalize = false;
          });
        });
      }
    } catch {

    }
  }

  public insertTableRow() {
    if (!this.state.currentSelectedSuperBlockElements) {
      return;
    }

    const currentRowIndex = this.state.currentSelectedSuperBlockElements &&
      findLastIndex(this.state.currentSelectedSuperBlockElements, (e) => e.type === "tr");

    if (currentRowIndex === -1) {
      return;
    }

    const currentRow = this.state.currentSelectedSuperBlockElements[currentRowIndex];
    const currentRowAnchor = this.state.currentSelectedSuperBlockElementAnchors[currentRowIndex];

    const row: ITr = {
      type: "tr",
      children: currentRow.children.map((v) => (
        {
          type: "td",
          children: [
            STANDARD_PARAGRAPH(),
          ],
        }
      )),
    };

    // and now let's get the thead or tbody in question
    const parentTbodyOrTheadOrTfootAnchor = [...currentRowAnchor];
    parentTbodyOrTheadOrTfootAnchor.pop();
    const parentTbodyOrTheadOrTfoot = this.getNodeAt(parentTbodyOrTheadOrTfootAnchor) as RichElement;

    // if it's a tbody
    if (parentTbodyOrTheadOrTfoot.type === "tbody") {
      // we simply add the row next to the current
      const targetRowAnchor = currentRowAnchor;
      targetRowAnchor[targetRowAnchor.length - 1]++;
      Transforms.insertNodes(this.editor, row, { at: targetRowAnchor });

      const targetRowAnchorFirstText = targetRowAnchor;
      // first td
      targetRowAnchorFirstText.push(0);
      // first paragraph
      targetRowAnchorFirstText.push(0);
      // first text in paragraph
      targetRowAnchorFirstText.push(0);

      this.focusAt({
        anchor: {
          offset: 0,
          path: targetRowAnchorFirstText,
        },
        focus: {
          offset: 0,
          path: targetRowAnchorFirstText,
        },
      });
    } else if (parentTbodyOrTheadOrTfoot.type === "thead") {
      // otherwise we need to add the row in the tbody, that is next
      // to the thead
      const tbodyAnchor = [...parentTbodyOrTheadOrTfootAnchor];
      tbodyAnchor[tbodyAnchor.length - 1]++;

      // let's get the tbody
      let tbody: RichElement = null;
      try {
        tbody = this.getNodeAt(tbodyAnchor) as RichElement;
      } catch {

      }

      // if we have a tbody
      if (tbody && tbody.type === "tbody") {
        // new row at the start of the tbody
        const targetRowAnchor = tbodyAnchor;
        targetRowAnchor.push(0);
        Transforms.insertNodes(this.editor, row, { at: targetRowAnchor });

        const targetRowAnchorFirstText = targetRowAnchor;
        // first td
        targetRowAnchorFirstText.push(0);
        // first paragraph
        targetRowAnchorFirstText.push(0);
        // first text in paragraph
        targetRowAnchorFirstText.push(0);

        this.focusAt({
          anchor: {
            offset: 0,
            path: targetRowAnchorFirstText,
          },
          focus: {
            offset: 0,
            path: targetRowAnchorFirstText,
          },
        });
      } else {
        // no tbody, we need to add a new tbody where it should be
        // could be a tfoot or downright missing
        const tbody: ITbody = {
          type: "tbody",
          children: [row],
        };

        Transforms.insertNodes(this.editor, tbody, { at: tbodyAnchor });

        const targetRowAnchorFirstText = tbodyAnchor;
        // first tr
        targetRowAnchorFirstText.push(0);
        // first td
        targetRowAnchorFirstText.push(0);
        // first paragraph
        targetRowAnchorFirstText.push(0);
        // first text in paragraph
        targetRowAnchorFirstText.push(0);

        this.focusAt({
          anchor: {
            offset: 0,
            path: targetRowAnchorFirstText,
          },
          focus: {
            offset: 0,
            path: targetRowAnchorFirstText,
          },
        });
      }
    } else if (parentTbodyOrTheadOrTfoot.type === "tfoot") {
      // otherwise we need to add the row in the tbody, that is next
      // to the thead
      const tbodyAnchor = [...parentTbodyOrTheadOrTfootAnchor];
      tbodyAnchor[tbodyAnchor.length - 1]--;

      // let's get the tbody
      let tbody: RichElement = null;
      try {
        tbody = this.getNodeAt(tbodyAnchor) as RichElement;
      } catch {

      }

      const tfootClone = { ...parentTbodyOrTheadOrTfoot } as ITfoot;
      tfootClone.children = tfootClone.children.map((v) => {
        return {
          type: "tr",
          children: v.children.map(v2 => (
            {
              type: "td",
              children: [
                STANDARD_PARAGRAPH(),
              ]
            }
          )),
        }
      });

      // if we have a tbody
      this.preventNormalize = true;
      if (tbody && tbody.type === "tbody") {
        // we update our tfoot to be tbody so that it merges
        const currentTBodyPropsCopy = { ...tbody };
        delete currentTBodyPropsCopy.children;
        Transforms.setNodes(
          this.editor,
          currentTBodyPropsCopy as any,
          {
            at: parentTbodyOrTheadOrTfootAnchor,
          }
        );
      } else {
        // we simply make it into a tbody
        Transforms.setNodes(
          this.editor,
          {
            type: "tbody",
          },
          {
            at: parentTbodyOrTheadOrTfootAnchor,
          }
        );
      }
      this.preventNormalize = false;

      const nextAnchorForTfoot = [...parentTbodyOrTheadOrTfootAnchor];
      nextAnchorForTfoot[nextAnchorForTfoot.length - 1]++;
      Transforms.insertNodes(this.editor, tfootClone, { at: nextAnchorForTfoot });

      // if there was a tbody the merging reaction caused that the next anchor is not
      // anymore where our node is so we can use this one, otherwise it is the same as the next
      const targetRowAnchorFirstText = tbody ? parentTbodyOrTheadOrTfootAnchor : nextAnchorForTfoot;
      // first tr
      targetRowAnchorFirstText.push(0);
      // first td
      targetRowAnchorFirstText.push(0);
      // first paragraph
      targetRowAnchorFirstText.push(0);
      // first text in paragraph
      targetRowAnchorFirstText.push(0);

      this.focusAt({
        anchor: {
          offset: 0,
          path: targetRowAnchorFirstText,
        },
        focus: {
          offset: 0,
          path: targetRowAnchorFirstText,
        },
      });
    }
  }

  public deleteTableRow() {
    if (!this.state.currentSelectedSuperBlockElements) {
      return;
    }

    const currentRowIndex = this.state.currentSelectedSuperBlockElements &&
      findLastIndex(this.state.currentSelectedSuperBlockElements, (e) => e.type === "tr");

    if (currentRowIndex === -1) {
      return;
    }

    try {
      Transforms.delete(this.editor, { at: this.state.currentSelectedSuperBlockElementAnchors[currentRowIndex] });
    } catch {

    }
  }

  /**
   * Tells whether the current table row can
   * be toggled in the environment it is
   */
  public canToggleTable(element: "thead" | "tfoot") {
    if (!this.state.currentSelectedSuperBlockElements) {
      return false;
    }

    const potentialTdIndex = findLastIndex(this.state.currentSelectedSuperBlockElements, (e) => e.type === "td" || e.type === "th");

    if (potentialTdIndex === -1) {
      return false;
    }

    const tdAnchor = this.state.currentSelectedSuperBlockElementAnchors[potentialTdIndex];

    const rowPath = [...tdAnchor];
    rowPath.pop();

    const theadOrTbodyOrTfootPath = [...rowPath];
    theadOrTbodyOrTfootPath.pop();

    const tablePath = [...theadOrTbodyOrTfootPath];
    tablePath.pop();

    try {
      const potentialRow = this.getNodeAt(rowPath) as RichElement;
      if (potentialRow.type !== "tr") {
        return false;
      }

      const theadOrTbodyOrTfoot = this.getNodeAt(theadOrTbodyOrTfootPath) as RichElement;
      if (theadOrTbodyOrTfoot.type === element) {
        // if we are already in a thead of course we can toggle it into a tbody
        // row element
        return true;
      } else if (theadOrTbodyOrTfoot.type === "tfoot" || theadOrTbodyOrTfoot.type === "thead") {
        // we can't convert the same thing as we are not in the right place
        return false;
      }

      const tableParent = this.getNodeAt(tablePath) as RichElement;
      if (tableParent.type !== "table") {
        return false;
      }

      // we cannot toggle if we already have a thead
      const theadOrTfootAlreadyExists = tableParent.children.find((c) => c.type === element);
      if (theadOrTfootAlreadyExists) {
        return false;
      } else {
        if (element === "thead") {
          // otherwise we can only toggle if this is the first row of the table
          return rowPath[rowPath.length - 1] === 0;
        } else if (element === "tfoot") {
          // otherwise we can only toggle if this is the last row of the table
          return rowPath[rowPath.length - 1] === theadOrTbodyOrTfoot.children.length - 1;
        }

        return false;
      }
    } catch {
      return false;
    }
  }

  /**
   * Only works when the first element of the table
   * is selected, aka the first row
   */
  public toggleTable(element: "thead" | "tfoot") {
    if (!this.canToggleTable(element)) {
      return;
    }

    const potentialTdIndex = findLastIndex(this.state.currentSuperBlockElements, (e) => e.type === "td" || e.type === "th");
    const tdAnchor = this.state.currentSelectedSuperBlockElementAnchors[potentialTdIndex];

    const rowPath = [...tdAnchor];
    rowPath.pop();

    const theadOrTbodyPath = [...rowPath];
    theadOrTbodyPath.pop();

    const tablePath = [...theadOrTbodyPath];
    tablePath.pop();

    const tableParent = this.getNodeAt(tablePath) as ITable;

    // move all the thead elements into the tbody
    const position = tableParent.children.findIndex((e) => e.type === element);
    const bodyPosition = tableParent.children.findIndex((e) => e.type === "tbody");
    if (position !== -1) {
      const currentTBody = tableParent.children[bodyPosition];

      if (!currentTBody) {
        // no body let's make the whole thing the body
        Transforms.setNodes(
          this.editor,
          {
            type: "tbody",
          },
          {
            at: [...tablePath, position],
          }
        );
      } else {
        // ensure they will merge and become 1 single body
        // as they are mergable
        const currentTBodyPropsCopy = { ...currentTBody };
        delete currentTBodyPropsCopy.children;
        Transforms.setNodes(
          this.editor,
          currentTBodyPropsCopy as any,
          {
            at: [...tablePath, position],
          }
        );
      }
    } else {
      // move the first row of the tbody as a thead
      const currentTBody = tableParent.children[bodyPosition];

      if (!currentTBody) {
        return;
      }

      // only that one row
      if (currentTBody.children.length === 1) {
        // no other than one row let's make the whole thing the thead
        Transforms.setNodes(
          this.editor,
          {
            type: element,
          },
          {
            at: [...tablePath, bodyPosition],
          }
        );
      } else {
        const currentTBodyPropsCopy = { ...currentTBody };
        currentTBodyPropsCopy.children = [];
        currentTBodyPropsCopy.type = element;

        // inserting empty element
        this.preventNormalize = true;
        Transforms.insertNodes(
          this.editor,
          currentTBodyPropsCopy as any,
          {
            at: [...tablePath, element === "thead" ? 0 : bodyPosition + 1],
          }
        );
        this.preventNormalize = false;

        if (element === "thead") {
          Transforms.moveNodes(
            this.editor,
            {
              // tbody is now in 1 ahead
              // zero for the first row
              at: [...tablePath, bodyPosition + 1, 0],
              // this is our new thead
              to: [...tablePath, 0, 0],
            }
          );
        } else {
          Transforms.moveNodes(
            this.editor,
            {
              // tbody is at the same place as before
              // we pick the last row
              at: [...tablePath, bodyPosition, currentTBody.children.length - 1],
              // this is our new tfoot which is after our body
              to: [...tablePath, bodyPosition + 1, 0],
            }
          );
        }
      }
    }
  }

  private _getVideoSrcOriginAndStatus(url: string) {
    // first we parse the url, we only support youtube or vimeo
    // urls for the video
    let src: string = null;
    let origin: string = null;
    let status: boolean = true;

    let parsedURL: URL = null;
    if (url) {
      try {
        parsedURL = new URL(url);
      } catch {
        status = false;
      }
    }

    // first we are going to check for youtube
    // urls
    if (parsedURL) {
      if (
        parsedURL.hostname === "youtube.com" ||
        parsedURL.hostname === "www.youtube.com" ||
        parsedURL.hostname === "youtu.be"
      ) {
        // set it as youtube in the origin
        origin = "youtube";

        // check for classic youtube urls
        const isClassicYTUrl = (
          parsedURL.hostname === "youtube.com" ||
          parsedURL.hostname === "www.youtube.com"
        );

        // and then we can check for these as we try
        // to get the source id
        if (
          isClassicYTUrl &&
          parsedURL.pathname.startsWith("/embed/")
        ) {
          src = parsedURL.pathname.split("/")[2];
        } else if (
          isClassicYTUrl &&
          parsedURL.pathname.startsWith("/watch")
        ) {
          let search = parsedURL.search;
          if (search[0] === "?") {
            search = search.substr(1);
          }
          search.split("&").forEach((v) => {
            if (v.startsWith("v=")) {
              src = v.substr(2);
            }
          });
        } else if (
          parsedURL.hostname === "youtu.be"
        ) {
          src = parsedURL.pathname.split("/")[1];
        }

        // we have succeded
        status = true;

        // now for vimeo
      } else if (
        parsedURL.host === "player.vimeo.com"
      ) {
        // much simpler
        origin = "vimeo";
        src = parsedURL.pathname.split("/")[2];
        status = true
      } else {
        status = false;
      }
    }

    return {
      src,
      origin,
      status,
    }
  }

  public updateVideo(url: string): boolean {
    const data = this._getVideoSrcOriginAndStatus(url);

    if (
      data.status &&
      this.state.currentSelectedBlockElement &&
      this.state.currentSelectedBlockElement.type === "video"
    ) {
      Transforms.setNodes(this.editor, {
        origin: data.origin,
        src: data.src,
      } as any, {
        at: this.state.currentSelectedBlockElementAnchor
      })
    }

    return data.status;
  }

  /**
   * Will insert a video given the information
   * @param url the url of the video
   * @param at a partial range to insert at
   * @returns a boolean on whether it succeeded
   */
  public insertVideo(url: string): boolean {
    const data = this._getVideoSrcOriginAndStatus(url);


    // and insert the video if we have been
    // considered succesful
    const videoNode: IVideo = {
      type: "video",
      children: [
        {
          bold: false,
          italic: false,
          text: "",
          underline: false,
        }
      ],
      origin: data.origin as any,
      src: data.src,
    }

    // and we call the insert node
    if (!this.editor.selection) {
      Transforms.insertNodes(this.editor, videoNode, { at: this.getFallbackInsertPath() });
    } else {
      Transforms.insertNodes(this.editor, videoNode);
    }

    // related to the buggy mess slate has become
    this.onChange(this.editor.children);

    // return the status
    return data.status;
  };
  /**
   * Will insert a file based on the information given it uses
   * the standard on insert file function in order to perfom it
   *
   * @param file the file to insert
   * @param at a partial range to insert at
   */
  public async insertFile(file: File) {
    // so we try
    try {
      // we call the insert file function, and pass false because
      // we are not dealing with an image
      const data = await this.props.onInsertFile(file, false);

      if (!data) {
        // something went wrong there should be an error in the state
        return;
      }

      // now we can build the file node
      const fileNode: IFile = {
        type: "file",
        children: [
          {
            bold: false,
            italic: false,
            text: "",
            underline: false,
          }
        ],
        extension: mimeTypeToExtension(file.type),
        fileName: data.result.name,
        size: prettyBytes(data.result.size),
        src: data.result.url,
        srcId: data.result.id,
      };

      // and we call the insert node
      if (!this.editor.selection) {
        Transforms.insertNodes(this.editor, fileNode, { at: this.getFallbackInsertPath() });
      } else {
        Transforms.insertNodes(this.editor, fileNode);
      }
    } catch (err) {
    }

    // related to the buggy mess slate has become
    this.onChange(this.editor.children);
  };

  /**
   * Will insert a container at the given location
   * @param type optional, the container type, otherwise will insert a standard container
   * @param at an optional range
   */
  public async insertContainer(type?: string) {
    // now we can make the container
    const containerNode: IContainer = {
      type: "container",
      children: [
        {
          type: "paragraph",
          children: [
            {
              bold: false,
              italic: false,
              underline: false,
              text: "",
            }
          ]
        },
      ],
      containerType: type || null,
    };

    // and we call the insert node
    if (!this.editor.selection) {
      Transforms.insertNodes(this.editor, containerNode, { at: this.getFallbackInsertPath() });
    } else {
      Transforms.insertNodes(this.editor, containerNode);
    }

    // related to the buggy mess slate has become
    this.onChange(this.editor.children);
  };

  /**
   * Inserts a custom element
   * @param type the type for the custom element
   * @param at an optional at range to insert the custom at
   */
  public async insertCustom(type: string) {
    // now we can make the custom
    const customNode: ICustom = {
      type: "custom",
      children: [
        {
          type: "paragraph",
          children: [
            {
              bold: false,
              italic: false,
              underline: false,
              text: "",
            }
          ]
        } as any
      ],
      customType: type,
    };

    // and we call the insert node
    if (!this.editor.selection) {
      Transforms.insertNodes(this.editor, customNode, { at: this.getFallbackInsertPath() });
    } else {
      Transforms.insertNodes(this.editor, customNode);
    }

    // related to the buggy mess slate has become
    this.onChange(this.editor.children);
  };

  /**
   * Makes a quote out of the current element
   * @param at toggle at the given range, this will cause a focus
   */
  public async toggleQuote() {
    // now we got to check if we are collapsed
    const isCollapsed = Range.isCollapsed(this.editor.selection);

    if (isCollapsed && this.state.currentSelectedBlockElement) {
      if (this.state.currentSelectedBlockElement.type === "quote") {
        Transforms.setNodes(
          this.editor,
          {
            type: "paragraph",
          }
        );
      } else {
        Transforms.setNodes(
          this.editor,
          {
            type: "quote",
          }
        );
      }
    }

    // related to the buggy mess slate has become
    this.onChange(this.editor.children);
  };

  /**
   * Makes a title out of the current element
   * @param type the title type
   * @param at an optional range
   */
  public async toggleTitle(type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
    // now we got to check if we are collapsed
    const isCollapsed = Range.isCollapsed(this.editor.selection);

    if (isCollapsed && this.state.currentSelectedBlockElement) {
      if (this.state.currentSelectedBlockElement.type === "title") {
        Transforms.setNodes(
          this.editor,
          {
            type: "paragraph",
          }
        );
      } else {
        Transforms.setNodes(
          this.editor,
          {
            type: "title",
            titleType: type,
          }
        );
      }
    }

    // related to the buggy mess slate has become
    this.onChange(this.editor.children);
  };

  /**
   * Makes a list out of the current element
   * @param type the type of the list that is to be toggled, either bulleted or number
   * @param at an optional range
   */
  public async insertList(type: "bulleted" | "numbered") {
    // now we can make the lust
    const listNode: IList = {
      type: "list",
      listType: type,
      children: [
        {
          type: "list-item",
          children: [
            STANDARD_PARAGRAPH(),
          ]
        },
      ],
    };

    // and we call the insert node
    if (!this.editor.selection) {
      Transforms.insertNodes(this.editor, listNode, { at: this.getFallbackInsertPath() });
    } else {
      Transforms.insertNodes(this.editor, listNode);
    }
  };

  public updateLink(url: string, tvalue: string): boolean {
    // otherwise let's find what url we are using
    let validState: boolean = true;
    // if there are no tvalue's given
    if (url) {
      // we attempt to parse it
      try {
        // and so we do in order to check locality
        const urlParsed = new URL(url);
        const isLocal = urlParsed.hostname === location.hostname;

        // now as feature support maybe only local urls be allowed
        const onlyLocal = !this.props.features.supportsExternalLinks;
        // if it's such the case adn it's not a local url
        if (onlyLocal && !isLocal) {
          // we have failed
          validState = false;
        }
      } catch {
        validState = false;
      }
    }

    if (
      this.state.currentSelectedInlineElement &&
      this.state.currentSelectedInlineElement.type === "link"
    ) {
      const link: Partial<ILink> = {
        href: url,
        thref: tvalue,
      }
      Transforms.setNodes(this.editor, link, {
        at: this.state.currentSelectedInlineElementAnchor,
      });
    }

    // related to the buggy mess slate has become
    this.onChange(this.editor.children);

    return validState;
  }

  /**
   * Makes a link out of the current element
   * @param url the url that we are using (null if using tvalue)
   * @param tvalue the template value to use (null if providing url)
   * @param at an optional range to pass
   * @returns a boolean if the link was valid and toggleLink
   */
  public toggleLink(url: string, tvalue: string): boolean {
    // otherwise let's find what url we are using
    let validState: boolean = true;
    // if there are no tvalue's given
    if (url) {
      // we attempt to parse it
      try {
        // and so we do in order to check locality
        const urlParsed = new URL(url);
        const isLocal = urlParsed.hostname === location.hostname;

        // now as feature support maybe only local urls be allowed
        const onlyLocal = !this.props.features.supportsExternalLinks;
        // if it's such the case adn it's not a local url
        if (onlyLocal && !isLocal) {
          // we have failed
          validState = false;
        }
      } catch {
        validState = false;
      }
    }

    const link: ILink = {
      type: "link",
      href: url,
      thref: tvalue,
      children: [
        STANDARD_TEXT_NODE(this.props.rootI18n.rich_link)
      ]
    }

    if (
      this.editor.selection &&
      Range.isCollapsed(this.editor.selection)
    ) {
      if (
        this.state.currentSelectedInlineElement &&
        this.state.currentSelectedInlineElement.type === "link"
      ) {
        Transforms.unwrapNodes(this.editor, {
          at: this.state.currentSelectedInlineElementAnchor
        });
      } else {
        Transforms.insertNodes(this.editor, link);
      }
    } else if (this.editor.selection) {
      Transforms.wrapNodes(this.editor, link, {
        match: (v) => Text.isText(v),
        split: true,
      });
    } else {
      Transforms.insertNodes(this.editor, link, {
        at: this.getFallbackInsertPath(),
      });
    }

    // related to the buggy mess slate has become
    this.onChange(this.editor.children);

    // we have succeeded
    return validState;
  };

  /**
   * Abitrary update, does an arbitrary update for an element or node
   * at the given path
   * @param args an object to update that should be partial of the element rich properties
   * @param anchor the node anchor to update
   */
  public set(args: any, anchor: Path) {
    Transforms.setNodes(this.editor, args, { at: anchor });

    // related to the buggy mess slate has become
    this.onChange(this.editor.children);
  };

  /**
   * Sets the current style for the element
   * @param style the style to be set, this should be a style string
   * @param anchor the element anchor to update
   */
  public setStyle(style: string, anchor: Path) {
    Transforms.setNodes(this.editor, {
      style,
    }, { at: anchor });

    // related to the buggy mess slate has become
    this.onChange(this.editor.children);
  };

  /**
   * Sets the template hover style for the element
   * @param style the style to be set, this should be a style string
   * @param anchor the element anchor to update
   */
  public setHoverStyle(style: string, anchor: Path) {
    Transforms.setNodes(this.editor, {
      styleHover: style,
    }, { at: anchor });

    // related to the buggy mess slate has become
    this.onChange(this.editor.children);
  };

  /**
   * Sets the active style for the element
   * @param style the style to be set, this should be a style string
   * @param anchor the element anchor to update
   */
  public setActiveStyle(style: string, anchor: Path) {
    Transforms.setNodes(this.editor, {
      styleActive: style,
    }, { at: anchor });

    // related to the buggy mess slate has become
    this.onChange(this.editor.children);
  };

  /**
   * Sets the rich classes of the element
   * @param classes an array of string that represent the rich classes
   * @param anchor the element anchor
   */
  public setRichClasses(classes: string[], anchor: Path) {
    Transforms.setNodes(this.editor, {
      richClassList: classes,
    }, { at: anchor });

    // related to the buggy mess slate has become
    this.onChange(this.editor.children);
  };

  /**
   * Sets a given action for usage within templating
   * as an event listener
   * 
   * Note that using this function is risky if the structure to provide a given
   * key is not understood properly, keys should be valid
   * 
   * @param key the key for the action, should be something like, click, mouseenter, etc...
   * @param value the value for the property
   * @param anchor the anchor for the element that is to be assigned the listener to turn interactive
   */
  public setAction(key: string, value: string, anchor: Path) {
    Transforms.setNodes(this.editor, {
      [key]: value,
    }, { at: anchor });

    // related to the buggy mess slate has become
    this.onChange(this.editor.children);
  }

  /**
   * Sets an UI handler to a given element so that it is ui handled
   * 
   * This is an avanced option for ui handling
   * 
   * normally you would use this function for updating an already inserted
   * ui handled component
   * 
   * @param value the value for the ui handler that should be taken out of the context
   * @param args the args for the ui handler
   * @param anchor the anchor where to insert at
   */
  public setUIHandler(value: string, args: { [key: string]: string }, anchor: Path) {
    Transforms.setNodes(this.editor, {
      uiHandler: value,
      uiHandlerArgs: args,
    }, { at: anchor });

    // related to the buggy mess slate has become
    this.onChange(this.editor.children);
  }

  /**
   * Sets ui handler args to a given element
   * @param key the ui handler arg key
   * @param value the ui handler arg value
   * @param anchor the anchor in question
   */
  public setUIHandlerArg(key: string, value: string, anchor: Path) {
    const nodeAtPath = Node.get(this.editor, anchor);
    let newValue: any = {
      ...(nodeAtPath as any as RichElement).uiHandlerArgs,
      [key]: value,
    };

    if (value === null || value === undefined) {
      delete newValue[key];
    }
    Transforms.setNodes(this.editor, {
      uiHandlerArgs: newValue,
    }, { at: anchor });

    // related to the buggy mess slate has become
    this.onChange(this.editor.children);
  }

  /**
   * Inserts an element at a given position
   * @param element the element 
   * @param at an optional position to do it at
   */
  public insertElement(element: RichElement) {
    // and we call the insert node
    if (!this.editor.selection) {
      Transforms.insertNodes(this.editor, element, { at: this.getFallbackInsertPath() });
    } else {
      Transforms.insertNodes(this.editor, element);
    }
  }

  /**
   * Sets the context key
   * @param value the value for the new context key
   * @param anchor the anchor where to set the context key at
   */
  public setContext(value: string, anchor: Path) {
    Transforms.setNodes(this.editor, {
      context: value,
    }, { at: anchor });
  };

  /**
   * Sets the context key
   * @param value the value for the new if condition key
   * @param anchor the anchor where to set the context key at
   */
  public setIfCondition(value: string, anchor: Path) {
    Transforms.setNodes(this.editor, {
      ifCondition: value,
    }, { at: anchor });
  };


  /**
  * Sets the for-each loop key
  * @param value the value for the new context key
  * @param anchor the anchor where to set the context key at
  */
  public setForEach(value: string, anchor: Path) {
    Transforms.setNodes(this.editor, {
      forEach: value,
    }, { at: anchor });
  };

  /**
   * Formats the current text as bold
   */
  public formatToggle(key: "bold" | "italic" | "underline") {
    // if we have a selection and the points are equal
    // basically the same as a collapsed selection
    if (
      this.state.currentText &&
      this.editor.selection &&
      Point.equals(this.editor.selection.anchor, this.editor.selection.focus)
    ) {
      // then we insert an empty text node, it will remain alive
      // by virtue of it being the same location as our cursor so
      // normalization won't remove it
      Transforms.insertNodes(
        this.editor,
        {
          ...this.state.currentText,
          text: "",
          [key]: !this.state.currentText[key],
        },
      );
    } else {
      // otherwise we just toggle
      if (this.state.currentText) {
        Transforms.setNodes(
          this.editor,
          { [key]: !this.state.currentText[key] },
          { match: n => Text.isText(n), split: true }
        );
      } else if (this.state.currentSelectedText) {
        Transforms.setNodes(
          this.editor,
          { [key]: !this.state.currentSelectedText[key] },
          { match: n => Text.isText(n), at: this.state.currentSelectedBlockElementAnchor, mode: "all" }
        );
      }
    }
  }

  /**
   * This is a helper function that is used in order to extract the available
   * classes that we have for usage within rich classes, container, and customs
   * considering what we have found in the all promise for all what is available
   * because there might be filters for them, and we need to find the labels and whatnot
   * of what we can actually use
   * 
   * @param feature the feature we are searching for basically, supportsCustom, supportsRichClasses and supportsContainers
   * that we decide on whether we support that feature
   * @param featureAll the all name for the feature in the state and where it is located in the state that we are meant to await
   * basically allCustoms, allRichClasses and allContainers
   * @param featureList the list of supported that is given in the feature support of the property so basically
   * supportedCustoms, supportedRichClasses and supportedContainers
   * @param i18nLocation the location for the i18n data in the i18n root, basically custom, containers and rich
   */
  private availableFilteringFunction(
    feature: string,
    featureAll: string,
    featureList: string,
    i18nLocation: string,
  ): IAvailableElementCSSClassName[] {

    // so we do it in one line because apparently we don't care about readability
    // and will fix it with comments
    return (
      // we pick the feature of the eg. supportsCustom, supportsRichClasses out of the feature support to see
      // if we support that feature at all
      this.props.features[feature] ?
        // if we do we pick from the state what we have found in the stylesheet
        // of the classes for that feature as we have awaited
        (this.state[featureAll] as string[]).filter((c) =>
          // and we filter based on our feature list, if we have one of course, otherwise all pass
          this.props.features[featureList] ? this.props.features[featureList].includes(c) : true
        ) :
        []
    ).map((c) => {
      // and now we map in order to give it a label based on the root i18n data
      // as we have described before, and they are found in the i18n location that
      // they have been defined by default by this text editor element
      // and we search into the i18n root
      return {
        value: c,
        label: (
          this.props.rootI18n &&
          this.props.rootI18n[i18nLocation] &&
          (
            // both the default and by replacing
            this.props.rootI18n[i18nLocation][c] ||
            this.props.rootI18n[i18nLocation][c.replace(/-/g, "_")]
          )
        ) || c
        // and if we find nothing we use the value itself
      };
    });
  }

  /**
   * Triggers on the keydown of the slate editor itself
   * @param e the event
   */
  public onKeyDown(e: React.KeyboardEvent) {
    // on alt+enter we want to insert a super block break
    if (e.key === "Enter" && e.altKey) {
      this.insertSuperbreak(null, e.shiftKey);
    } else if (e.key === "z" && e.ctrlKey && !e.shiftKey) {
      this.editor.undo();
    } else if ((e.key === "y" && e.ctrlKey) || (e.key === "z" && e.ctrlKey && e.shiftKey)) {
      this.editor.redo();
    }
  }

  /**
   * Basic old school component did mount
   */
  public async componentDidMount() {
    // now we can await for our all promise here
    await ALL_PROMISE;
    // and fit the information there as we have gotten
    // our arrays filled from the stylesheet
    if (!this.isUnmounted) {
      this.setState({
        allContainers: ALL_CONTAINERS,
        allTables: ALL_TABLES,
        allCustom: ALL_CUSTOM,
        allRichClasses: ALL_RICH_CLASSES,
      });
    }

    if (this.props.autoFocus) {
      ReactEditor.focus(this.editor);
      // bug sometimes it will not focus
      // Focus god damn it
      this.forceFocus();
    }

    const editableHTMLElement = this.editableRef.current.childNodes[0] as HTMLDivElement;
    EDITOR_POOL.set(editableHTMLElement, this);
  }

  public componentDidUpdate(prevProps: Readonly<ISlateEditorProps>, prevState: Readonly<ISlateEditorState>, snapshot?: any): void {
    // if our prev selected text is empty
    if (prevState.currentText && prevState.currentText.text === "") {
      // let's find where it is now
      const anchorInCurrent = ReactEditor.findPath(this.editor, prevState.currentText);
      if (anchorInCurrent) {
        // let's find what it is now
        try {
          const elementInCurrent = Node.get(this.editor, anchorInCurrent) as IText;
          // if it's still empty and we are not over it, then we may want to delete it
          if (elementInCurrent.text === "" && elementInCurrent !== this.state.currentText) {
            // now we need to know if it's an inline spacer, void, etc...
            // so we just call normalization
            this.normalizeNode([this.editor, []]);
          }
        } catch {
          // node is missing and slate somehow reports it at still being there
          // causes an error, nothign to do, the node has been deleted
        }
      }
    }
  }

  public getState() {
    return this.state;
  }

  /**
   * Sometimes slate leaves a selection behind we need to unselect if such
   * is the case
   */
  public componentWillUnmount() {
    // we need to set this to prevent the set value
    // from being called on an unmounted component
    this.isUnmounted = true;
    ReactEditor.deselect(this.editor);

    const editableHTMLElement = this.editableRef.current.childNodes[0] as HTMLDivElement;
    EDITOR_POOL.delete(editableHTMLElement);
  }

  /**
   * Provides the helpers that are used by the editor
   * to construct rich text data
   */
  public getHelpers() {
    const helpers: IHelperFunctions = {
      editor: this.editor,
      Transforms,
      Range,
      ReactEditor,
      HistoryEditor,
      Node,
      Path,

      getContextFor: this.getContextFor,
      getRootContext: this.getRootContext,
      getState: this.getState,

      selectPath: this.selectPath,
      deletePath: this.deletePath,
      movePaths: this.movePaths,

      deleteSelectedNode: this.deleteSelectedNode,

      getPreviousSelectedElementAnchor: this.getPreviousSelectedElementAnchor,
      getPreviousTextAnchor: this.getPreviousTextAnchor,

      focus: this.focus,
      focusAt: this.focusAt,

      insertSuperbreak: this.insertSuperbreak,

      formatToggle: this.formatToggle,
      insertContainer: this.insertContainer,
      insertCustom: this.insertCustom,
      insertFile: this.insertFile,
      insertImage: this.insertImage,
      insertVideo: this.insertVideo,
      updateVideo: this.updateVideo,
      insertTemplateText: this.insertTemplateText,
      updateTemplateText: this.updateTemplateText,
      insertTemplateHTML: this.insertTemplateHTML,
      updateTemplateHTML: this.updateTemplateHTML,
      insertTable: this.insertTable,
      insertTableColumn: this.insertTableColumn,
      insertTableRow: this.insertTableRow,
      toggleTable: this.toggleTable,
      canToggleTable: this.canToggleTable,
      toggleLink: this.toggleLink,
      updateLink: this.updateLink,
      insertList: this.insertList,
      toggleQuote: this.toggleQuote,
      toggleTitle: this.toggleTitle,
      setActiveStyle: this.setActiveStyle,
      setContext: this.setContext,
      setIfCondition: this.setIfCondition,
      setForEach: this.setForEach,
      setHoverStyle: this.setHoverStyle,
      setStyle: this.setStyle,
      set: this.set,
      setRichClasses: this.setRichClasses,
      setAction: this.setAction,
      setUIHandler: this.setUIHandler,
      setUIHandlerArg: this.setUIHandlerArg,
      insertElement: this.insertElement,
      deleteTableColumn: this.deleteTableColumn,
      deleteTableRow: this.deleteTableRow,

      hardBlur: this.hardBlur,
      softBlur: this.softBlur,
    }

    return helpers;
  }

  /**
   * Provides the feature support information that is used by the editor
   * to know what it can and can't do
   */
  public getFeatureSupport() {
    // Happens for plaintext which has no features
    // since it doesn't support any
    if (this.props.features === null) {
      return null;
    }

    // we get these from the available filtering functions
    const availableCustoms = this.availableFilteringFunction("supportsCustom", "allCustom", "supportedCustoms", "rich_customs");
    const availableRichClasses = this.availableFilteringFunction("supportsRichClasses", "allRichClasses", "supportedRichClasses", "rich_classes");
    const availableContainers = this.availableFilteringFunction("supportsContainers", "allContainers", "supportedContainers", "rich_containers");
    const availableTables = this.availableFilteringFunction("supportsTables", "allTables", "supportedTables", "rich_tables");

    // and extend based on the features
    const newFeatureSupport: IAccessibleFeatureSupportOptions = {
      ...this.props.features,

      availableContainers,
      availableCustoms,
      availableRichClasses,
      availableTables,
    };

    return newFeatureSupport;
  }

  public forceFocus() {
    // with this condition we avoid it applying with children
    // that are nested, such as internal textareas
    // if (
    //   //!preventNextFocus &&
    //   e.target &&
    //   (e.target as HTMLDivElement).dataset &&
    //   (e.target as HTMLDivElement).dataset.slateEditor === "true"
    // ) {
    if (!this.state.focused) {
      const path: Path = [];
      let current: any = this.editor.children && this.editor.children[0];
      while (current) {
        path.push(0);
        current = current.children && current.children[0];
      }
      // bug in slate sometimes it just rejects to focus
      // when using tab, specifically shift+tab
      // nah it does it also with tab sometimes
      this.focusAt({
        anchor: {
          offset: 0,
          path,
        },
        focus: {
          offset: 0,
          path,
        },
      });

      // More bugs in slate still may reject to focus because slate
      // can be very buggy
      setTimeout(() => {
        if (!this.state.focused) {
          this.onFocusedChange(path, this.editor.children);
        }
      }, 20);
    }
    // }
  }

  public forceBlur() {
    // bug in slate sometimes it will not blur and just rejects to blur
    // when another element has been blurred
    setTimeout(() => {
      if (this.state.focused) {
        this.onBlurredChange(this.editor.children);
      }
    }, 20);
  }

  /**
   * Render function
   */
  public render() {
    // make the editable
    let children: React.ReactNode = (
      <CurrentElementProvider
        block={this.state.currentSelectedBlockElement}
        superblocks={this.state.currentSelectedSuperBlockElements || []}
        inline={this.state.currentSelectedInlineElement}
      >
        <div ref={this.editableRef} style={{ display: "contents" }} data-slate-bug="true">
          <Editable
            id={this.props.id}
            lang={this.props.lang}
            onKeyDown={this.onKeyDown}
            renderElement={this.renderElement}
            renderLeaf={this.renderText}
            placeholder={this.props.placeholder}
            readOnly={this.props.disabled}
            disabled={this.props.disabled}
            style={{ scrollMarginTop: this.props.scrollMarginTop }}
            // onFocus={this.forceFocus}
            onBlur={this.forceBlur}
            // onClick={preventFocus}
            aria-invalid={!this.props.currentValid}
            aria-errormessage={this.props.currentValid ? null : this.props.currentGeneralErrorElementId}
            aria-describedby={this.props.currentDescribedBy}
            aria-placeholder={this.props.placeholder}
          />
        </div>
      </CurrentElementProvider>
    );

    // and pick on the wrapper, hopefully we have one
    // it'd be weird not to have one
    const Wrapper = this.props.Wrapper;

    // if we have a wrapper
    if (Wrapper) {
      // and we feed the thing in the wrapper as the new children
      // that is now wrapper inside the wrapper
      children = (
        <Wrapper
          {...this.props.wrapperArgs}
          disabled={this.props.disabled}
          state={this.state}
          helpers={this.getHelpers()}
          featureSupport={this.getFeatureSupport()}
          currentLoadError={this.props.currentLoadError}
          dismissCurrentLoadError={this.props.dismissCurrentLoadError}
          ref={this.wrapperRef}
        >
          {children}
        </Wrapper>
      );
    }

    // wrapping based on the root context
    if (this.props.rootContext && this.props.rootContext.editorArgs && this.props.rootContext.editorArgs.wrapper) {
      children = this.props.rootContext.editorArgs.wrapper(children);
    }

    // https://github.com/ianstormtaylor/slate/pull/4540
    if (this.state.currentValue.children !== this.editor.children) {
      this.editor.children = this.state.currentValue.children;
    }

    // now we can return
    return (
      <Slate
        editor={this.editor}
        value={this.state.currentValue.children}
        onChange={this.onChange}
      >
        {children}
      </Slate>
    );
  }
}
