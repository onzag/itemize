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
  getContextFor, normalizeElement, getAllowedChildrenTypes, getUIHandlerValueWithKnownContextFor, isInline, isVoid, isSuperBlock, isBlock
} from "../../../internal/text/serializer";
import {
  CONTAINER_CLASS_PREFIX, countSize, CUSTOM_CLASS_PREFIX,
  IFeatureSupportOptions, RICH_TEXT_CLASS_PREFIX, serializeString
} from "../../../internal/text";
import { LAST_RICH_TEXT_CHANGE_LENGTH } from "../../../../constants";
import uuid from "uuid";
import { IInsertedFileInformationType } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import { convertStyleStringToReactObject, IUIHandlerProps } from "../../../internal/text/serializer/base";
import { IVideo } from "../../../internal/text/serializer/types/video";
import { mimeTypeToExtension } from "../../../../util";
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

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: RichElement;
    Text: IText;
  }
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
    selectorSplitted.forEach((s) => {
      // if it's not a class, then we can ignore it
      if (s[0] !== ".") {
        // continue;
        return;
      }

      // now we take the class name
      let className = s.substr(1);
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
   * Provies the context for the given path
   */
  getContextFor: (element: RichElement | IText | Path, level?: "final" | "select-context" | "select-loop", onlySwichingContext?: boolean) => ITemplateArgContextDefinition;

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
   * focuses the text editor
   */
  focus: () => void;
  /**
   * Focuses at the desired location
   * @param at the range to insert at
   */
  focusAt: (at: Range | Path) => Promise<void>;

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
  /**
   * Inserts a template html fragment
   * this is caret based unless you specify your own custom range
   * note that calling this function will cause a refocus
   * @param label the label to use for the template html
   * @param value the actual value for the template html to be used off the context
   * @param at an optional range to insert at
   */
  insertTemplateHTML: (label: string, value: string) => void;

  /**
   * Inserts an element at the given position
   * @param element the element to insert
   * @param at optional range to insert at
   */
  insertElement: (element: RichElement) => void;

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
   * cancels the field from blurring
   * you should use this on the mousedown on buttons that
   * are outside the selected area
   * not using this function should not have any effect
   */
  blockBlur: () => void;
  /**
   * releases the blur
   * you should use this on the onmouseup on buttons that
   * are outside the selected area
   * not using this function should not have any effect
   */
  releaseBlur: () => void;
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
  currentSuperBlockElement: RichElement;

  /**
   * The current path followed, text path for the current text
   */
  currentTextAnchor: Path;
  currentInlineElementAnchor: Path;
  currentBlockElementAnchor: Path;
  currentSuperBlockElementAnchor: Path;

  /**
   * The current selected node that is being worked with
   * this is normally automatically selected to be the
   * current element
   */
  currentSelectedText: IText;
  currentSelectedInlineElement: RichElement;
  currentSelectedBlockElement: RichElement;
  currentSelectedSuperBlockElement: RichElement;
  currentSelectedElement: RichElement;

  currentSelectedTextAnchor: Path;
  currentSelectedInlineElementAnchor: Path;
  currentSelectedBlockElementAnchor: Path;
  currentSelectedSuperBlockElementAnchor: Path;
  currentSelectedElementAnchor: Path;

  currentRootContext: ITemplateArgContextDefinition;
  currentSelectedSuperBlockContext: ITemplateArgContextDefinition;
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
  allowsInsertElement: (element: RichElement) => boolean;
  allowsText: boolean;
  inlineIsVoid: boolean;
  blockIsVoid: boolean;
  superblockIsVoid: boolean;
  superBlockUIHandler: ITemplateArgUIHandlerDefinition;
  blockUIHandler: ITemplateArgUIHandlerDefinition;
  inlineUIHandler: ITemplateArgUIHandlerDefinition;
}

/**
 * The base props that every wrapper is going to get
 * based on the standard that is passed by the component
 * that contains the base rich text editor
 * 
 * You might extend this class and require extra props, these
 * props might be passed by using the wrapperArgs from
 * the main component which will pass them to the wrapper
 */
export interface ISlateEditorWrapperBaseProps {
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
   * The list of standard features that are supported
   * according to the definition, the property entry handler
   * provides this right away to the renderer
   */
  features: IFeatureSupportOptions,
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
  onCheckFileExists: (fileId: string) => boolean;
  /**
   * Function that should be specified to retrieve data uris from blob urls given
   * a file id
   */
  onRetrieveDataURI: (fileId: string) => string;
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
  /**
   * Blurring is rather complex on this, and pressing the toolbar buttons and all around stuff
   * causes flickering on the blur animations, so this blur timeout will ensure to call onblur
   * only if it's not just to call onfocus later
   */
  private blurTimeout: NodeJS.Timeout;
  /**
   * This allows to block the blurring from happening, normally this is blocked via the blockBlur
   * and releaseBlur functions and prevent the focused state to turn into false, it will not
   * affect the actual focus, as the caret is anyway lost when you click on something like on a toolbar
   * but most of these buttons once done cause a regain on focus, however, an animation might play
   * that can be distracting and rather annoying otherwise
   */
  private blurBlocked: boolean = false;
  /**
   * This flag allows to disable removing empty text nodes that exist in the current location
   * when set to true, eg. if we set a bold text node, while in most case we want these empty text nodes
   * gone, not all the time
   */
  private ignoreCurrentLocationToRemoveEmpty: boolean = false;
  private isInNormalization: boolean = false;
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
            currentSuperBlockElement: null,
            currentTextAnchor: null,
            currentInlineElementAnchor: null,
            currentBlockElementAnchor: null,
            currentSuperBlockElementAnchor: null,

            currentSelectedText: null,
            currentSelectedInlineElement: null,
            currentSelectedBlockElement: null,
            currentSelectedSuperBlockElement: null,
            currentSelectedTextAnchor: null,
            currentSelectedInlineElementAnchor: null,
            currentSelectedBlockElementAnchor: null,
            currentSelectedSuperBlockElementAnchor: null,
            currentSelectedBlockContext: null,
            currentSelectedInlineContext: null,
            currentSelectedSuperBlockContext: null,
            currentSelectedElement: null,
            currentSelectedElementAnchor: null,
            currentSelectedElementContext: null,

            allowsInsertElement: falseFn,
            allowsText: false,
            inlineIsVoid: false,
            blockIsVoid: false,
            superblockIsVoid: false,
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
            currentSuperBlockElement: null,
            currentTextAnchor: null,
            currentInlineElementAnchor: null,
            currentBlockElementAnchor: null,
            currentSuperBlockElementAnchor: null,

            currentSelectedText: null,
            currentSelectedInlineElement: null,
            currentSelectedBlockElement: null,
            currentSelectedSuperBlockElement: null,
            currentSelectedTextAnchor: null,
            currentSelectedInlineElementAnchor: null,
            currentSelectedBlockElementAnchor: null,
            currentSelectedSuperBlockElementAnchor: null,
            currentSelectedElement: null,
            currentSelectedElementAnchor: null,

            allowsInsertElement: falseFn,
            allowsText: false,
            inlineIsVoid: false,
            blockIsVoid: false,
            superblockIsVoid: false,
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
      currentSuperBlockElement: null,
      currentTextAnchor: null,
      currentInlineElementAnchor: null,
      currentBlockElementAnchor: null,
      currentSuperBlockElementAnchor: null,

      currentSelectedText: null,
      currentSelectedInlineElement: null,
      currentSelectedBlockElement: null,
      currentSelectedSuperBlockElement: null,
      currentSelectedTextAnchor: null,
      currentSelectedInlineElementAnchor: null,
      currentSelectedBlockElementAnchor: null,
      currentSelectedSuperBlockElementAnchor: null,
      currentSelectedElement: null,
      currentSelectedElementAnchor: null,

      isRichText: props.isRichText,
      currentRootContext: props.rootContext || null,
      currentSelectedBlockContext: null,
      currentSelectedInlineContext: null,
      currentSelectedSuperBlockContext: null,
      currentSelectedElementContext: null,
      currentValid: props.currentValid,

      // ensure SSR compatibility
      // since we cannot read the CSS file on the server side
      // as we have no access to stylesheets
      allContainers: [],
      allCustom: [],
      allRichClasses: [],

      allowsInsertElement: falseFn,
      allowsText: false,
      inlineIsVoid: false,
      blockIsVoid: false,
      superblockIsVoid: false,
      superBlockUIHandler: null,
      blockUIHandler: null,
      inlineUIHandler: null,
    }

    this.isUnmounted = false;

    // now we build the slate editor
    const rawEditor = createEditor();
    // with react of course ;)
    this.editor = withReact(withHistory(rawEditor));

    // setting up the functions to override
    // the defaults
    this.normalizeNode = this.normalizeNode.bind(this);
    this.insertBreak = this.insertBreak.bind(this);
    this.insertSuperblockBreak = this.insertSuperblockBreak.bind(this);
    this.deleteBackward = this.deleteBackward.bind(this);
    this.deleteForward = this.deleteForward.bind(this);
    this.setFragmentData = this.setFragmentData.bind(this);
    this.findAndAppendFilesToDataTransfer = this.findAndAppendFilesToDataTransfer.bind(this);
    this.insertData = this.insertData.bind(this);
    this.findAndInsertFilesFromDataTransfer = this.findAndInsertFilesFromDataTransfer.bind(this);
    this.isVoid = this.isVoid.bind(this);
    this.getContextFor = this.getContextFor.bind(this);

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
    this.onNativeBlur = this.onNativeBlur.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.selectPath = this.selectPath.bind(this);
    this.movePaths = this.movePaths.bind(this);
    this.focus = this.focus.bind(this);
    this.insertImage = this.insertImage.bind(this);
    this.insertVideo = this.insertVideo.bind(this);
    this.insertFile = this.insertFile.bind(this);
    this.insertTemplateText = this.insertTemplateText.bind(this);
    this.insertTemplateHTML = this.insertTemplateHTML.bind(this);
    this.insertContainer = this.insertContainer.bind(this);
    this.insertCustom = this.insertCustom.bind(this);
    this.toggleQuote = this.toggleQuote.bind(this);
    this.toggleTitle = this.toggleTitle.bind(this);
    this.insertList = this.insertList.bind(this);
    this.toggleLink = this.toggleLink.bind(this);
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

    this.availableFilteringFunction = this.availableFilteringFunction.bind(this);
    this.calculateAnchors = this.calculateAnchors.bind(this);

    this.blockBlur = this.blockBlur.bind(this);
    this.releaseBlur = this.releaseBlur.bind(this);
    this.hardBlur = this.hardBlur.bind(this);
    this.softBlur = this.softBlur.bind(this);
  }

  /**
   * This function runs and prepares the tree that is to be inserted into the
   * pasted content
   * @param data the data transfer of the clipboard
   * @param blobs an object that contains the blob transfer object
   * @param element the element we are currently processing
   */
  public async findAndInsertFilesFromDataTransfer(data: DataTransfer, blobs: any, element: RichElement): Promise<RichElement> {
    // by default the new element is itself
    let newElement = element;

    // however we might have these types we need to process
    if (newElement.type === "image" || newElement.type === "file") {
      const idSpecified = newElement.srcId;
      const urlToReadFrom = blobs[idSpecified] ? blobs[idSpecified] : newElement.src;

      if (this.props.onCheckFileExists(idSpecified)) {
        // File belongs to this editor, nothing to do
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
          }
        } else {
          newElement = null;
        }
      }
    }

    // if we still have the element and it has children
    // we need to process those too
    if (newElement && newElement.children) {
      newElement.children = (
        await Promise.all((newElement.children as any).map(this.findAndInsertFilesFromDataTransfer.bind(this, data, blobs)))
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

    // if we have it
    if (fragment) {
      // let's get the blobs
      const blobs = JSON.parse(data.getData('application/x-slate-blobs') || "{}");
      // then we decode and parse
      const decoded = decodeURIComponent(window.atob(fragment));
      // note how we filter in case bits fail to load (aka images and files)
      const parsed = (
        await Promise.all(JSON.parse(decoded).map(this.findAndInsertFilesFromDataTransfer.bind(this, data, blobs))) as Node[]
      ).filter(e => !!e) as any;
      // now we can insert that fragment once we are done
      console.log("TODO", parsed);
      // const parsedIsStandard = parsed.every((n: RichElement) => n.containment !== "superblock" && n.containment !== "list-superblock");
      // if (parsedIsStandard) {
      //   Transforms.insertFragment(this.editor, parsed);
      // } else if (this.state.currentBlockElementAnchor) {
      //   const pathForNext = [...this.state.currentBlockElementAnchor];
      //   pathForNext[pathForNext.length - 1]++;
      //   Transforms.insertNodes(this.editor, parsed, { at: pathForNext });
      // }
      return;
    }

    // otherwise run the original
    this.originalInsertData(data);
  }

  /**
   * Runs per each rich element that has just been copied to the clipboard
   * @param data the data transfer
   * @param element the rich element we have just copied
   */
  public findAndAppendFilesToDataTransfer(data: DataTransfer, element: RichElement): Promise<any> {
    const gatheredFiles: any = {};

    // we want to spot images and files
    if (element.type === "image" || element.type === "file") {
      // get the url
      const urlToReadFrom = element.src;

      // if it's a blob
      const isBlob = urlToReadFrom.startsWith("blob:");

      // then we should think about copying it right into the data transfer
      // since blobs are temporary
      if (isBlob) {
        const urlData = this.props.onRetrieveDataURI(element.srcId);
        if (urlData) {
          gatheredFiles[element.srcId] = urlData;
        }
      }
    }

    // now we run per each children
    if (element.children) {
      const gatheredFilesArr = (element.children as any).map(this.findAndAppendFilesToDataTransfer.bind(this, data));
      gatheredFilesArr.forEach((gatheredFilesPerChildren: any) => {
        Object.assign(gatheredFiles, gatheredFilesPerChildren);
      });
    }

    return gatheredFiles;
  }

  /**
   * This function runs when we are preparing the slate clipboard
   * @param data the data transfer
   */
  public setFragmentData(data: DataTransfer) {
    // we run the original function to prepare the clipboard
    this.originalSetFragmentData(data);

    // need to find the files that are included in the copy
    const fragment64 = data.getData("application/x-slate-fragment");
    if (fragment64) {
      const copyDataTree: RichElement[] = JSON.parse(decodeURIComponent(atob(fragment64)));

      const gatheredFiles: any = {};
      const gatheredFilesArr = copyDataTree.map(this.findAndAppendFilesToDataTransfer.bind(this, data));
      gatheredFilesArr.forEach((gatheredFilesPerChildren) => {
        Object.assign(gatheredFiles, gatheredFilesPerChildren);
      });

      data.setData("application/x-slate-blobs", JSON.stringify(gatheredFiles));
    }
  }

  public componentDidUpdate(prevProps: ISlateEditorProps, prevState: ISlateEditorState) {

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
    if (this.isInNormalization) {
      return;
    }

    const [node, path] = entry;

    // if it's the editor itself, this happens when clearing
    // and deleting everything and the only thing left is the
    // editor itself
    if (Editor.isEditor(node)) {
      // this will basically be true every time
      if (node.children.length === 0) {
        // we insert a paragraph
        Transforms.insertNodes(this.editor,
          { type: "paragraph", children: [STANDARD_TEXT_NODE() as any] },
          { at: path.concat(0) }
        );
      }

      // if it's an element
    } else if (Element.isElement(node)) {
      this.isInNormalization = true;

      normalizeElement(
        node,
        path,
        this.state.currentValue,
        {
          workOnOriginal: false,
          updateNodeAt(path, v) {
            Transforms.setNodes(this.editor, v, {
              at: path,
            });
          },
          deleteNodeAt(path) {
            Transforms.delete(this.editor, {
              at: path,
            });
          },
          insertNodeAt(path, node, targetIndex) {
            Transforms.insertNodes(this.editor, node, {
              at: [...path, targetIndex],
            });
          },
          mergeNodesAt(basePath, referencePath) {
            const parentPath = [...basePath];
            parentPath.pop();

            Transforms.mergeNodes(this.editor, {
              at: parentPath,
              match(node, pathMatch) {
                return Path.equals(pathMatch, basePath) || Path.equals(pathMatch, referencePath);
              },
            });
          },
          splitElementAndEscapeChildIntoParentAt(path, escapingChildIndex) {
            // TODO
          },
          wrapNodeAt(path, wrappers) {
            wrappers.forEach((wrapper) => {
              Transforms.wrapNodes(this.editor, wrapper, {
                at: path,
              });
            });
          },
          getNodeAt(path) {
            return Node.get(this.editor, path) as RichElement;
          },
        }
      );

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
    const isListItemBreak = (
      this.state.currentSuperBlockElement &&
      // and we are within a list and a list item
      this.state.currentSuperBlockElement.type === "list-item"
    );
    if (
      // if we are simply collapsed
      Range.isCollapsed(this.editor.selection) &&
      // and we have a list item
      isListItemBreak &&
      // and our current super block element, our list item, has
      // only one children
      this.state.currentSuperBlockElement.children.length === 1 &&
      // and that children is an empty paragraph
      (this.state.currentSuperBlockElement.children[0] as any).type === "paragraph" &&
      (this.state.currentSuperBlockElement.children[0] as any).children.length === 1 &&
      Text.isText((this.state.currentSuperBlockElement.children[0] as any).children[0]) &&
      (this.state.currentSuperBlockElement.children[0] as any).children[0].text === ""
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
    const shouldCreateFreshParagraph = isEndOfLine;

    // if the end we are dealing with is exactly
    // at this last point and offset so we are right
    // at the end of the given block
    // we do this to avoid copying template text elements
    // when we deal with text so that they don't also
    // become template text
    if (shouldCreateFreshParagraph) {
      // then we want to clone the current block
      // we are dealing with and copy all its properties
      if (isListItemBreak) {
        Transforms.insertNodes(this.editor, {
          ...this.state.currentSuperBlockElement,
          uiHandler: null,
          uiHandlerArgs: null,
          givenName: null,
          // but certainly not its current text properties
          // that we might be at, as we don't want to copy nor the
          // text, nor the template text values
          children: [
            {
              ...this.state.currentText,
              text: "",
            } as any
          ]
        }, {
          match: (n: any) => n.type === "list-item"
        });
      } else {
        Transforms.insertNodes(this.editor, {
          ...this.state.currentBlockElement,
          uiHandler: null,
          uiHandlerArgs: null,
          givenName: null,
          // but certainly not its current text properties
          // that we might be at, as we don't want to copy nor the
          // text, nor the template text values
          children: [
            {
              ...this.state.currentText,
              text: "",
            } as any
          ]
        });
      }
    } else {
      if (isListItemBreak) {
        // otherwise we do a simple split node
        Transforms.splitNodes(this.editor, { always: true, match: (n: any) => n.type === "list-item" })
      } else {
        // otherwise we do a simple split node
        Transforms.splitNodes(this.editor, { always: true })
      }
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
      Transforms.delete(this.editor, { unit });
    }
  }

  /**
   * Override function to perform a standard delete
   * backwards event
   * @param unit the unit we are dealing with
   */
  public deleteBackward(unit: "character" | "word" | "line" | "block") {
    // first we pick the current selection
    const { selection } = this.editor

    // if we have one of any kind
    if (
      selection &&
      // and it's collapsed
      Range.isCollapsed(selection) &&
      this.state.currentSuperBlockElement &&
      this.state.currentSuperBlockElement.type === "list" &&
      // and we are in a list item type
      this.state.currentBlockElement.type === "list-item" &&
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
      this.ignoreCurrentLocationToRemoveEmpty = true;
      Transforms.delete(this.editor, { unit, reverse: true });
      this.ignoreCurrentLocationToRemoveEmpty = false;
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

    // let's check if the now new nodes are laying right into
    // the list item, which is valid indeed, but rather unwanted
    // this should make it so that the paragraph that now dangles at
    // the end is unwrapped
    Transforms.unwrapNodes(
      this.editor,
      {
        match: (n: any) => {
          return n.type === "list-item" &&
            n.children.length >= 2 &&
            n.children[n.children.length - 1] &&
            n.children[n.children.length - 1].type === "paragraph";
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
   */
  public insertSuperblockBreak() {
    // of course there needs to be such a superblock
    if (
      this.state.currentSuperBlockElement
    ) {
      // and now we need to get the next anchor that is next to such block
      const currentSuperBlockElementAnchor = this.state.currentSuperBlockElementAnchor;
      const nextAnchor = [...currentSuperBlockElementAnchor];
      nextAnchor[nextAnchor.length - 1]++;

      if (this.state.currentSuperBlockElement === this.state.currentBlockElement) {
        // in cases where the block is also the super block, these odd types
        // that exist due to templating reasons
        Transforms.insertNodes(this.editor, {
          type: "paragraph",
          children: [
            {
              ...this.state.currentText,
              text: "",
            }
          ]
        }, { at: nextAnchor });
      } else {
        // and we insert a clone based on the block itself
        // with no text
        Transforms.insertNodes(this.editor, {
          ...this.state.currentBlockElement,
          uiHandler: null,
          uiHandlerArgs: null,
          children: [
            {
              ...this.state.currentText,
              text: "",
            } as any
          ]
        }, { at: nextAnchor });
      }

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
  public calculateAnchors(anchor: Path, value?: Node[], currentGivenSelectedNodeAnchor?: Path) {
    // first we set up all the basics to their null value
    let currentInlineElement: RichElement = null;
    let currentInlineElementAnchor: Path = null;
    let currentBlockElement: RichElement = null;
    let currentBlockElementAnchor: Path = null;
    let currentSuperBlockElement: RichElement = null;
    let currentSuperBlockElementAnchor: Path = null;
    let currentText: IText = null;
    let currentTextAnchor: Path = null;

    // now we do need to setup the anchor if we have an anchor
    // in that case we need to populate these fields
    if (anchor) {
      // the block and superblock need to be calculated
      currentBlockElementAnchor = [];
      currentSuperBlockElementAnchor = [];
      currentInlineElementAnchor = [];
      currentTextAnchor = anchor;

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
          currentSuperBlockElement = currentLoopingElement;
          currentSuperBlockElementAnchor = [...loopingAnchor];
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
    let currentSelectedSuperBlockElement: RichElement = null;
    let currentSelectedBlockElementAnchor: Path = null;
    let currentSelectedSuperBlockElementAnchor: Path = null;
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
      currentSelectedSuperBlockElement = currentSuperBlockElement;
      currentSelectedSuperBlockElementAnchor = currentSuperBlockElementAnchor;
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
          currentSelectedSuperBlockElement = currentLoopingElement;
          currentSelectedSuperBlockElementAnchor = [...loopingAnchor];
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

    const currentSelectedSuperBlockContext = getContextFor(
      currentSelectedSuperBlockElementAnchor,
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
    const baseSuperBlock = currentSelectedSuperBlockElement || pseudoDocument;
    const baseAllowedChildreOfSuperBlock = baseSuperBlock ? getAllowedChildrenTypes(baseSuperBlock) : [];

    const superBlockUIHandler = getUIHandlerValueWithKnownContextFor(
      baseSuperBlock as RichElement,
      currentSelectedSuperBlockContext || this.state.currentRootContext,
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

    const allowsInsertElement = (element: RichElement) => {
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

    const inlineIsVoid = currentSelectedInlineElement ? isVoid(currentSelectedInlineElement) : false;
    const blockIsVoid = currentSelectedBlockElement ? isVoid(currentSelectedBlockElement) : false;
    const superblockIsVoid = currentSelectedSuperBlockElement ? isVoid(currentSelectedSuperBlockElement) : false;
    const voidElement = inlineIsVoid || blockIsVoid || superblockIsVoid;
    const allowsText = !voidElement;

    // now we can return
    return {
      currentTextAnchor,
      currentText,
      currentBlockElement,
      currentBlockElementAnchor,
      currentInlineElement,
      currentInlineElementAnchor,
      currentSuperBlockElement,
      currentSuperBlockElementAnchor,
      currentSelectedText,
      currentSelectedTextAnchor,
      currentSelectedBlockElement,
      currentSelectedBlockElementAnchor,
      currentSelectedInlineElement,
      currentSelectedInlineElementAnchor,
      currentSelectedSuperBlockElement,
      currentSelectedSuperBlockElementAnchor,
      currentSelectedElement: currentSelectedSuperBlockElement || currentSelectedBlockElement || currentSelectedInlineElement,
      currentSelectedElementAnchor: currentSelectedSuperBlockElementAnchor || currentSelectedBlockElementAnchor || currentSelectedInlineElementAnchor,

      currentSelectedSuperBlockContext,
      currentSelectedBlockContext,
      currentSelectedInlineContext,
      currentSelectedElementContext: currentSelectedInlineContext || currentSelectedBlockContext || currentSelectedSuperBlockContext,

      allowsInsertElement,
      allowsText,
      inlineIsVoid,
      blockIsVoid,
      superblockIsVoid,
      superBlockUIHandler,
      blockUIHandler,
      inlineUIHandler,
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

    const currentSelectedElementAnchor = this.state.currentSelectedElementAnchor;

    // now we can call this
    const anchorData = this.calculateAnchors(
      // no anchor as it is not known
      null,
      // the value
      value,
      // and we pass the selected node anchor as it
      // remains even after the selection only if
      // we have not just deleted that node
      currentSelectedElementAnchor &&
        !this.lastChangeWasSelectedDelete ? currentSelectedElementAnchor : null,
    );
    this.setState({
      focused: false,
      ...anchorData,
    });
  }

  /**
   * Runs during the native blur off the content editable
   * we need to avoid flickery animation and so we perform
   * this trickery
   */
  public onNativeBlur() {
    if (this.state.focused && !this.blurBlocked) {
      this.blurTimeout = setTimeout(this.onBlurredChange, 70);
    }
    return false;
  }

  /**
   * An optimization so that the component updates only when it's necessary
   * @param nextProps the next properties
   * @param nextState the next state
   */
  public shouldComponentUpdate(nextProps: ISlateEditorProps, nextState: ISlateEditorState) {
    const standardUpdate = (
      nextProps.id !== this.props.id ||
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
      !equals(this.state.allCustom, nextState.allCustom, { strict: true }) ||
      !equals(this.state.allRichClasses, nextState.allRichClasses, { strict: true }) ||
      !equals(nextProps.wrapperArgs, this.props.wrapperArgs, { strict: true }) ||
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
    if (this.isUnmounted) {
      return;
    }

    // build a new document
    const newRootDocument: IRootLevelDocument = {
      id: uuid.v4(),
      type: "document",
      rich: this.state.currentValue.rich,
      children: v,
    };

    // and set the state to that
    this.setState({
      currentValue: newRootDocument,
      synced: false,
    });

    // we do not update immediately,
    // for that we first clear the update timeout
    // the update timeout contains update instructions
    // 2 of them
    // we want to halt such async execution
    clearTimeout(this.updateTimeout);

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
        let toReturn: React.ReactNode = <HandlerComponent
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
            if (contextSwichContext.editorArgs.wrapper) {
              arr.push(<React.Fragment key={i}>{contextSwichContext.editorArgs.wrapper(toReturn, i)}</React.Fragment>);
            } else {
              arr.push(<React.Fragment key={i}>{toReturn}</React.Fragment>);
            }
          }
          toReturn = arr;
        } else if (contextSwichContext && contextSwichContext.editorArgs && contextSwichContext.editorArgs.wrapper) {
          // otherwise if we got a standard context, with a wrapper, then we use it
          toReturn = contextSwichContext.editorArgs.wrapper(toReturn);
        }

        // otherwise return
        return toReturn;
      }
    }

    const customProps: any = { ...attributes, children };

    const html = (element as any as RichElement).html;
    if (html) {
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

    const text = (element as any as RichElement).textContent;
    if (text) {
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

      if (propertiesFromContext && propertiesFromContext.type === "text") {
        customProps.children = (
          <>
            {(propertiesFromContext && (propertiesFromContext.editorDisplay || propertiesFromContext.label)) || (element as any).children[0].text}
            {children}
          </>
        );
      }
    }

    // and now we call the reactification
    let toReturn = SERIALIZATION_REGISTRY.REACTIFY[element.type as string]({
      active: false,
      selected: isSelected && isPrimary,
      element: element as any,
      asTemplate: false,
      customProps,
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
        if (contextSwichContext.editorArgs.wrapper) {
          arr.push(<React.Fragment key={i}>{contextSwichContext.editorArgs.wrapper(toReturn, i)}</React.Fragment>);
        } else {
          arr.push(<React.Fragment key={i}>{toReturn}</React.Fragment>);
        }
      }
      toReturn = arr;
    } else if (contextSwichContext && contextSwichContext.editorArgs && contextSwichContext.editorArgs.wrapper) {
      toReturn = contextSwichContext.editorArgs.wrapper(toReturn);
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

    // first we clear the timeout of the blur
    // this is used during the blur blocking so now
    // the field won't be blurred because a change occured
    // but it will at the end depend on the editor selection
    // whether it ends up being blurred or not
    clearTimeout(this.blurTimeout);

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
    if (newValue !== this.state.currentValue.children as any) {
      // we update, the reason the value might be equal is because the change
      // triggers for changes in the selection
      this.setValue(newValue);
    }
  }

  /**
   * The blocking blur function it is a helper function that is called usually on the toolbars
   * to prevent the field from blurring on mousedown, ups events, as this will cause a blur only
   * to cause a refocus, this prevents that
   */
  public blockBlur() {
    clearTimeout(this.blurTimeout);
    this.blurBlocked = true;
  }

  /**
   * This is part of the blur blocking event chain and releases
   * the blocking of the blur event
   */
  public releaseBlur() {
    this.blurBlocked = false;
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
      currentSelectedSuperBlockElement: null,
      currentSelectedSuperBlockElementAnchor: null,
      currentSelectedInlineContext: null,
      currentSelectedBlockContext: null,
      currentSelectedSuperBlockContext: null,
      currentSelectedElement: null,
      currentSelectedElementAnchor: null,
      currentSelectedElementContext: null,
    });
    Transforms.deselect(this.editor);
    ReactEditor.blur(this.editor);
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
    if (Range.isRange(at)) {
      return new Promise((r) => {
        setTimeout(() => {
          ReactEditor.focus(this.editor);
          setTimeout(() => {
            Transforms.setSelection(this.editor, at);
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
    } else if (this.state.currentSelectedSuperBlockElement) {
      return [...this.state.currentSelectedSuperBlockElementAnchor, this.state.currentSelectedSuperBlockElement.children.length];
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
      text: label,
    }

    // and now we build a paragraph node to put the text there
    const inlineNode: IInline = {
      children: [textNode],
      type: "inline",
      textContent: value,
      givenName: label,
    };

    // and we call the insert node
    if (!this.editor.selection) {
      Transforms.insertNodes(this.editor, inlineNode as any, { at: this.getFallbackInsertPath() });
    } else {
      Transforms.insertNodes(this.editor, inlineNode);
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
  public insertTemplateHTML(label: string, value: string, at?: Range | Path) {
    // and create a text node based on that
    // which is where we put the label
    const textNode: IText = {
      bold: false,
      italic: false,
      underline: false,
      text: label,
    }

    // and a container to make it be the inner html
    // container
    const voidBlock: IVoidBlock = {
      children: [textNode],
      type: "void-block",
      html: value,
      givenName: label,
    }

    // and we call the insert node
    if (!this.editor.selection) {
      Transforms.insertNodes(this.editor, voidBlock, { at: this.getFallbackInsertPath() });
    } else {
      Transforms.insertNodes(this.editor, voidBlock);
    }
  }

  /**
   * Will insert a video given the information
   * @param url the url of the video
   * @param at a partial range to insert at
   * @returns a boolean on whether it succeeded
   */
  public insertVideo(url: string, at?: Range | Path): boolean {

    // first we parse the url, we only support youtube or vimeo
    // urls for the video
    const parsedURL = new URL(url);
    let src: string;
    let origin: string;
    let status: boolean = false;

    // first we are going to check for youtube
    // urls
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
    }


    // and insert the video if we have been
    // considered succesful
    if (status) {
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
        origin: origin as any,
        src,
      }

      // and we call the insert node
      if (!this.editor.selection) {
        Transforms.insertNodes(this.editor, videoNode, { at: this.getFallbackInsertPath() });
      } else {
        Transforms.insertNodes(this.editor, videoNode);
      }
    }

    // return the status
    return status;
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
        givenName: data.result.name,
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
      givenName: type || null,
      children: [
        {
          type: "paragraph",
          // we use the current block element here in case we don't find it
          // the type is on top for case of emergency
          givenName: null,
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
      givenName: type || null,
      children: [
        {
          type: "paragraph",
          // we use the current block element here in case we don't find it
          // the type is on top for case of emergency
          givenName: null,
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
      if (this.state.currentSelectedBlockElement.type === "title" && this.state.currentSelectedBlockElement.subtype === type) {
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
            subtype: type,
          }
        );
      }
    }
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
          // we use the current block element here in case we don't find it
          // the type is on top for case of emergency
          givenName: null,
          children: [
            STANDARD_PARAGRAPH()
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

  /**
   * Makes a link out of the current element
   * @param url the url that we are using (null if using tvalue)
   * @param tvalue the template value to use (null if providing url)
   * @param at an optional range to pass
   * @returns a boolean if the link was valid and toggleLink
   */
  public toggleLink(url: string, tvalue: string): boolean {
    // TODO


    // otherwise let's find what url we are using
    let urlToUse: string = url;
    // if there are no tvalue's given
    if (!tvalue && url) {
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
          return false;
        } else if (isLocal) {
          // otherwise we rewrite the url
          urlToUse = urlParsed.pathname + urlParsed.search + urlParsed.hash;
        }
      } catch {
        return false;
      }
    }


    // we have succeeded
    return true;
  };

  /**
   * Abitrary update, does an arbitrary update for an element or node
   * at the given path
   * @param args an object to update that should be partial of the element rich properties
   * @param anchor the node anchor to update
   */
  public set(args: any, anchor: Path) {
    Transforms.setNodes(this.editor, args, { at: anchor });
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
          this.props.rootI18n.custom &&
          this.props.rootI18n.custom[i18nLocation] &&
          (
            // both the default and by replacing
            this.props.rootI18n.custom[i18nLocation][c] ||
            this.props.rootI18n.custom[i18nLocation][c.replace(/-/g, "_")]
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
      this.insertSuperblockBreak();
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
        allCustom: ALL_CUSTOM,
        allRichClasses: ALL_RICH_CLASSES,
      });
    }

    if (this.props.autoFocus) {
      ReactEditor.focus(this.editor);
    }
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

      getContextFor: this.getContextFor,

      selectPath: this.selectPath,
      deletePath: this.deletePath,
      movePaths: this.movePaths,

      deleteSelectedNode: this.deleteSelectedNode,

      focus: this.focus,
      focusAt: this.focusAt,

      formatToggle: this.formatToggle,
      insertContainer: this.insertContainer,
      insertCustom: this.insertCustom,
      insertFile: this.insertFile,
      insertImage: this.insertImage,
      insertVideo: this.insertVideo,
      insertTemplateText: this.insertTemplateText,
      insertTemplateHTML: this.insertTemplateHTML,
      toggleLink: this.toggleLink,
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

      blockBlur: this.blockBlur,
      releaseBlur: this.releaseBlur,
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
    const availableCustoms = this.availableFilteringFunction("supportsCustom", "allCustom", "supportedCustoms", "custom");
    const availableRichClasses = this.availableFilteringFunction("supportsRichClasses", "allRichClasses", "supportedRichClasses", "rich");
    const availableContainers = this.availableFilteringFunction("supportsContainers", "allContainers", "supportedContainers", "containers");

    // and extend based on the features
    const newFeatureSupport: IAccessibleFeatureSupportOptions = {
      ...this.props.features,

      availableContainers,
      availableCustoms,
      availableRichClasses,
    };

    return newFeatureSupport;
  }

  /**
   * Render function
   */
  public render() {
    // make the editable
    let children: React.ReactNode = (
      <CurrentElementProvider
        block={this.state.currentSelectedBlockElement}
        superblock={this.state.currentSelectedSuperBlockElement}
        inline={this.state.currentSelectedInlineElement}
      >
        <Editable
          id={this.props.id}
          onKeyDown={this.onKeyDown}
          onBlur={this.onNativeBlur}
          renderElement={this.renderElement}
          renderLeaf={this.renderText}
          placeholder={this.props.placeholder}
          readOnly={this.props.disabled}
          disabled={this.props.disabled}
        />
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
          state={this.state}
          helpers={this.getHelpers()}
          featureSupport={this.getFeatureSupport()}
          currentLoadError={this.props.currentLoadError}
          dismissCurrentLoadError={this.props.dismissCurrentLoadError}
        >
          {children}
        </Wrapper>
      );
    }

    // wrapping based on the root context
    if (this.props.rootContext && this.props.rootContext.editorArgs && this.props.rootContext.editorArgs.wrapper) {
      children = this.props.rootContext.editorArgs.wrapper(children);
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
