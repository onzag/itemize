/**
 * This file contains the slate element, the slate element is used to create
 * rich text editors and designed to be used with the PropertyEntryText type
 * even if it can also be used in a standalone way
 * 
 * @packageDocumentation
 */

import React from "react";
import equals from "deep-equal";
import { createEditor, Transforms, Range, Editor, Element, Node, Path, Text, NodeEntry, Point } from "slate";
import { Slate, Editable, withReact, ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";
import { withHistory, HistoryEditor } from "slate-history";

import { IRootLevelDocument, deserialize, SERIALIZATION_REGISTRY, RichElement, deserializePlain } from "../../../internal/text/serializer";
import { CONTAINER_CLASS_PREFIX, countSize, CUSTOM_CLASS_PREFIX,
  IFeatureSupportOptions, RICH_TEXT_CLASS_PREFIX, serializeString } from "../../../internal/text";
import { LAST_RICH_TEXT_CHANGE_LENGTH } from "../../../../constants";
import uuid from "uuid";
import { IInsertedFileInformationType } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import { copyElementBase } from "../../../internal/text/serializer/base";
import { IVideo } from "../../../internal/text/serializer/types/video";
import { mimeTypeToExtension } from "../../../../util";
import prettyBytes from "pretty-bytes";
import { IContainer } from "../../../internal/text/serializer/types/container";
import { IParagraph } from "../../../internal/text/serializer/types/paragraph";
import { IFile } from "../../../internal/text/serializer/types/file";
import { IImage } from "../../../internal/text/serializer/types/image";
import { IText, STANDARD_TEXT_NODE } from "../../../internal/text/serializer/types/text";
import { ICustom } from "../../../internal/text/serializer/types/custom";
import { IInline } from "../../../internal/text/serializer/types/inline";

/**
 * Combine both interfaces
 */
interface ItemizeEditor extends ReactEditor, HistoryEditor {};

/**
 * The template argument is used in a template context in order
 * to specify the existant arguments that are going to be used during
 * a template construction of a rich text when such is meant to be rendered
 * as a template, put the example of a rich text that is expected to be a template where
 * a score and a name exist, so we have two properties that will be used, name and score
 * as
 * 
 * {name: "kitten", score: "3"}
 * 
 * Each property to be used will be defined as an argument as
 * 
 * {
 *   type: "text",
 *   label: "name",
 * }
 * 
 * we do not know the values of these only at render time, but then we know
 * these are available arguments
 */
interface ITemplateArg {
  /**
   * The type of the template argument, such are
   * 1. text: basic text type, implies a string value
   * 2. link: a link value, specifies a url
   * 3. html: HTML content to replace the inner html of another component
   * 4. function: a function, to be used within an action
   * 5. ui-handler: a special type that represents an ui handled element, these
   * can be used to specify custom types with custom functionality, remember to specify
   * "handler", "handlerExtraArgs" and "handlerPassSlateInfo" to unlock
   * the ui-handler full potential
   */
  type: "text" | "link" | "html" | "function" | "ui-handler";
  /**
   * The label to be used to specify this value, it should be given
   * in the given language that wants to be shown as, the actual string
   * value to be used depend on the key that the argument has eg.
   * 
   * {
   *   type: "context",
   *   label: "base",
   *   properties: {
   *     name: {
   *       type: "text",
   *       label: "nombre"
   *     }
   *   }
   * }
   * 
   * where name is the actual value used, and label is a good i18n label
   * 
   * A react node can also be given to pass the i18n component
   */
  label: string | React.ReactNode;

  /**
   * A handler component to use during the edition of a component
   * that matches this ui handler signature
   */
  handler?: React.ComponentType;
  /**
   * Extra arguments to pass to the handler component itself
   * every instance of this given handler will be passed the same
   * extra argument, it can be used to specify that the handler
   * is being used in edit mode and as such render differently
   * and have different functionality
   */
  handlerExtraArgs?: any;
  /**
   * Pass extra attributes to the props of the handler
   * for the rich text, these include
   * "selected" for when the rich text editor is selecting
   * "helpers" for the rich text helpers
   */
  handlerPassSlateInfo?: boolean;
}

/**
 * Represents the available args in the context, a context is a compound
 * of arguments that represent an object shape, that will be used to create
 * a template and render such
 * 
 * For example let's say a template consumes a context such as
 * 
 * {
 *   name: "kitten",
 *   score: "3",
 *   achievements: [
 *     {
 *       type: "bad-kitten"
 *     },
 *     {
 *       type: "angry-kitten"
 *     },
 *   ]
 * }
 * 
 * In order to create a context that specifies this structure
 * 
 * {
 *   type: "context",
 *   label: "root",
 *   properties: {
 *     name: {
 *       type: "text",
 *       label: "name",
 *     },
 *     score: {
 *       type: "text",
 *       label: "score",
 *     },
 *     achievements: {
 *       type: "context",
 *       label: "achievements",
 *       loopable: true,
 *       properties: {
 *         type: {
 *           type: "text",
 *           label: "type",
 *         }
 *       }
 *     }
 *   }
 * }
 * 
 * And that will enable the editor to understand the structure that it should
 * consume
 */
export interface ITemplateArgsContext {
  /**
   * The type which will always be "context"
   */
  type: "context";
  /**
   * A human readable label for this given context value
   * it should be in the given language
   * 
   * A react node can be given, used for passing the I18n component
   */
  label: string | React.ReactNode;
  /**
   * If the context is an array or iterable, then mark it as such
   */
  loopable?: boolean;
  /**
   * The properties that the context contains
   */
  properties: {
    [name: string]: ITemplateArg | ITemplateArgsContext;
  };
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
function calculateStylesheet(stylesheet: CSSStyleSheet) {
  // so first we split within the rules
  Array.from(stylesheet.cssRules).forEach((r) => {
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
      const className = s.substr(1);

      // and we check whether it matches any of our prefixes that
      // make it a valid class of the given type
      if (className.startsWith(CONTAINER_CLASS_PREFIX)) {
        ALL_CONTAINERS.push(className.substr(CONTAINER_CLASS_PREFIX.length))
      } else if (className.startsWith(CUSTOM_CLASS_PREFIX)) {
        ALL_CUSTOM.push(className.substr(CUSTOM_CLASS_PREFIX.length))
      } else if (className.startsWith(RICH_TEXT_CLASS_PREFIX)) {
        ALL_RICH_CLASSES.push(className.substr(RICH_TEXT_CLASS_PREFIX.length))
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
   * Whether an image can be inserted at the given location
   */
  canInsertImage: boolean;
  /**
   * Whether a video can be inserted at the given location
   */
  canInsertVideo: boolean;
  /**
   * Whether a file can be inserted at the given location
   */
  canInsertFile: boolean;
  /**
   * Whether a link can be inserted at the given location
   */
  canInsertLink: boolean;
  /**
   * Whether a container can be inserted at the given location
   */
  canInsertContainer: boolean;
  /**
   * Whether a list can be inserted at the given location
   */
  canInsertList: boolean;
  /**
   * Whether a custom element can be inserted at the given
   * location
   */
  canInsertCustom: boolean;
  /**
   * Whether a quote can be inserted at the given location
   */
  canInsertQuote: boolean;
  /**
   * Whether a title element can be inserted at the given location
   */
  canInsertTitle: boolean;
  /**
   * Whether a rich class element can be inserted at the given location
   */
  canInsertRichClass: boolean;

  /**
   * Whether the style of the current element can be set
   */
  canSetStyle: boolean;
  // Templating specific
  /**
   * Whether we can set the hover style
   * normally true if templating is true
   */
  canSetHoverStyle: boolean;
  /**
   * Whether the active style can be set
   * normally true if templating is true
   */
  canSetActiveStyle: boolean;
  /**
   * Whether the dynamic href can be set for links
   * normally true if templating is true
   */
  canSetDynamicHref: boolean;
  /**
   * Whether an UI handler can be set on the given element
   * normally true if templating is true
   */
  canSetUIHandler: boolean;
  /**
   * Whether an action function can be set on the given element
   * normally true if templating is true
   */
  canSetActionFunction: boolean;
  /**
   * Whether a loop can be established
   * normally true if templating is true
   */
  canSetLoop: boolean;

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
   * performs a pseudo selection at a given path
   * this selection is silent and does not affect other than the current
   * selected path based on the information, it does not cause a caret
   * change or anything of the sorts
   * @param path the path to select
   */
  selectPath: (path: Path) => void;

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
  focusAt: (at: Range) => void;

  /**
   * Will insert an image based on a given file that has
   * been taken as an input
   * @param file the file
   * @param at an optional range to insert at
   * @param standalone whether to make it a standalone image
   */
  insertImage: (file: File, standalone: boolean, at?: Range) => void;
  /**
   * Will insert a video given the information
   * @param url the url of the video, only youtube and vimeo supported as origin
   * @param at an optional range to insert at
   * @returns a boolean true if the video was properly inserted, false if the video url was invalid
   */
  insertVideo: (url: string, at?: Range) => boolean;
  /**
   * Will insert a file based on the information given
   * @param file the file to insert
   * @param at an optional range to insert at
   */
  insertFile: (file: File, at?: Range) => void;
  /**
   * Will insert a container at the given location
   * @param type optional, the container type, otherwise will
   * insert a standard container
   * this is caret based unless you specify your own custom range
   * note that calling this function will cause a refocus
   * @param type the container type
   * @param at an optional range to insert at
   */
  insertContainer: (type?: string, at?: Range) => void;
  /**
   * Inserts a custom element
   * this is caret based unless you specify your own custom range
   * note that calling this function will cause a refocus
   * @param type the custom type
   * @param at an optional range to insert at
   */
  insertCustom: (type: string, at?: Range) => void;
  /**
   * Inserts a template text
   * this is caret based unless you specify your own custom range
   * note that calling this function will cause a refocus
   * @param label the label to use for the template text
   * @param value the actual value for the template text to be used off the context
   * @param at an optional range to insert at
   */
  insertTemplateText: (label: string, value: string, at?: Range) => void;
  /**
   * Inserts a template html fragment
   * this is caret based unless you specify your own custom range
   * note that calling this function will cause a refocus
   * @param label the label to use for the template html
   * @param value the actual value for the template html to be used off the context
   * @param at an optional range to insert at
   */
  insertTemplateHTML: (label: string, value: string, at?: Range) => void;
  /**
   * Inserts an UI handled container
   * @param type the type of the container
   * @param value the ui handler identifier in the context
   * @param args the args for the ui handler
   * @param at an optional range to insert at
   */
  insertUIHandledContainer: (type: string, value: string, args: { [key: string]: string }, at?: Range) => void;

  /**
   * Makes a quote out of the current element
   * this is caret based unless you specify your own custom range
   * note that calling this function will cause a refocus
   */
  toggleQuote: (at?: Range) => void;
  /**
   * Makes a title out of the current element
   * this is caret based unless you specify your own custom range
   * note that calling this function will cause a refocus
   */
  toggleTitle: (type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6", at?: Range) => void;
  /**
   * Makes a list out of the current element
   * this is caret based unless you specify your own custom range
   * note that calling this function will cause a refocus
   */
  toggleList: (type: "bulleted" | "numbered", at?: Range) => void;
  /**
   * Makes a link out of the current element
   * this is caret based unless you specify your own custom range
   * note that calling this function will cause a refocus
   * @returns a boolean specifying whether the toggling was succesful or it failed
   * for some reason, eg. invalid link, links are not supported
   */
  toggleLink: (url: string, templateValue: string, at?: Range) => boolean;

  /**
   * Formats the current text as bold
   * this is always caret based and does not allow for custom
   * ranges
   * It will refocus once done
   */
  formatToggleBold: () => void;
  /**
   * formats the current text as italic
   * this is always caret based and does not allow for custom
   * ranges
   * It will refocus once done
   */
  formatToggleItalic: () => void;
  /**
   * formats to underline
   * this is always caret based and does not allow for custom
   * ranges
   * It will refocus once done
   */
  formatToggleUnderline: () => void;

  /**
   * does an arbitrary update of arbitrary arguments off the current
   * element value, this function does not refocus and it's silent and meant
   * for indirect usage
   * @param args the arbitrary arguments (partial value)
   * @param anchor the anchor where the update should take place (should point at an element)
   */
  set: (args: any, anchor: Path) => void;

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
   * Sets an UI handler in the given anchor with the given args
   * this function does not refocus and it's silent and meant
   * for indirect usage
   */
  setUIHandler: (key: string, args: { [key: string]: string }, anchor: Path) => void;
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
}

/**
 * Contains the information about the
 * state of the editor as it is right
 * now
 */
export interface ISlateEditorStateType {
  /**
   * Whether it is curently focused
   * this is a state inherent of the
   * state of the editor
   */
  isFocused: boolean;

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
   * The current element being worked with as it
   * is selected right now, the current element can
   * be virtually anything, block, superblock, inline, etc...
   * it will mostly always be a block type
   */
  currentElement: RichElement;

  /**
   * The current element (block type)
   * represents the element that is currently
   * selected that is a block type, or its nearest
   * ancestor that is a block type
   */
  currentBlockElement: RichElement;

  /**
   * The current super block (superblock type)
   * represents current superblock that wraps the current
   * element
   */
  currentSuperBlockElement: RichElement;

  /**
   * The current text being worked with, represents
   * a text node where the caret is currently placed
   */
  currentText: IText;

  /**
   * The current selected node that is being worked with
   * this is normally automatically selected to be the
   * current element but it can also be a text node
   * by default if a text node represents a template node
   * then it will be selected instead
   */
  currentSelectedNode: RichElement | IText;

  /**
   * The text node that is selected that is being worked with
   * this is normally automatically selected to be the current
   * text
   */
  currentSelectedTextNode: IText;

  /**
   * The current templating context, as it is
   * based on the root context, this is a subcontext
   * from that base context
   */
  currentContext: ITemplateArgsContext;

  /**
   * The current value from the document that is used
   * in the slate rich text editor
   */
  currentValue: Node[];

  /**
   * The current path followed, text path for the current text
   */
  textAnchor: Path;

  /**
   * The current path followed, for element
   */
  currentElementAnchor: Path;

  /**
   * The current path followed for block
   */
  currentBlockElementAnchor: Path;

  /**
   * The current path followed for super block
   */
  currentSuperBlockElementAnchor: Path;

  /**
   * Selected anchor
   */
  currentSelectedNodeAnchor: Path;

  /**
   * The anchor of the current selected text node
   */
  currentSelectedTextNodeAnchor: Path;
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
  state: ISlateEditorStateType;
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
  rootContext: ITemplateArgsContext;
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
  internalValue: IRootLevelDocument;
  /**
   * Triggers on change, it is meant to keep the same shape
   * as the handler expects it
   */
  onChange: (value: string, internalValue: IRootLevelDocument) => void;
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
   * A placeholder to be used to be displayed, it only displays when the value
   * is considered to be the null document
   */
  placeholder?: string;
}

/**
 * Represents the internal state of this editor and it is used only
 * internally in the editor state, the wrapper might access some parts of it
 * nevertheless via the helpers, feature support and whatnot
 */
interface ISlateEditorState {
  /**
   * The actual internal value that slate is
   * using, slate expects an immutable object here, and this is what it is
   * using the serializer functions in the utilities in order
   * to obtain this internal value
   */
  internalValue: IRootLevelDocument;
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
   * Whether it is currently focused
   */
  focused: boolean;
  /**
   * The current anchor, null if not focused
   */
  currentAnchor: Path;
  /**
   * The current element anchor
   */
  currentElementAnchor: Path;
  /**
   * The current block anchor
   */
  currentBlockElementAnchor: Path;
  /**
   * The current super block anchor
   */
  currentSuperBlockElementAnchor: Path;
  /**
   * The selected anchor path
   */
  currentSelectedNodeAnchor: Path;
  /**
   * Related to the anchor, specifies the current context
   * that is being worked with, can be null, if context is null
   * or found context doesn't exist
   */
  currentContext: ITemplateArgsContext;
  /**
   * current text node that is selected
   */
  currentText: IText;
  /**
   * current rich text node that is selected
   */
  currentElement: RichElement;
  /**
   * current block element
   */
  currentBlockElement: RichElement;
  /**
   * current super block element
   */
  currentSuperBlockElement: RichElement;
  /**
   * The selected node 
   */
  currentSelectedNode: RichElement | IText;
  /**
   * The selected node context
   */
  currentSelectedNodeContext: ITemplateArgsContext;
  /**
   * The selected node
   */
  currentSelectedTextNode: IText;
  /**
   * The selected node
   */
  currentSelectedTextNodeAnchor: Path;
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
      if (props.internalValue) {

        // we check, if we don't have an internal value then certainly
        // this new internal value applies, and also we only care about changing
        // to the internal value new value if the ids are mistmatching as this id
        // represents the unique signature of that value
        if (!state.internalValue || props.internalValue.id !== state.internalValue.id) {

          // so if the criteria passes, and the signatures don't match or there's no internal
          // value to compare against we will update the internal value and clear all the anchors
          return {
            internalValue: props.internalValue,
            currentAnchor: null,
            currentElementAnchor: null,
            currentBlockElementAnchor: null,
            currentSelectedNodeAnchor: null,
            currentContext: props.rootContext || null,
            currentElement: null,
            currentBlockElement: null,
            currentSuperBlockElement: null,
            currentSuperBlockElementAnchor: null,
            currentText: null,
            currentSelectedNode: null,
            currentSelectedNodeContext: null,
            currentSelectedTextNode: null,
            currentSelectedTextNodeAnchor: null,
          };
        }

        // if we don't have an internal value we need to use the given
        // string
      } else {
        // and deserialize it based on the props
        const newInternalValue = props.isRichText ?
          deserialize(props.value, state.internalValue) :
          deserializePlain(props.value, state.internalValue);

        // if there's no internal value to compare, or the new internal value doesn't
        // match with the current, note that the signature will match with parsed values
        // as it uses a namespaced uuid that will give the same value for the same string
        if (!state.internalValue || newInternalValue.id !== state.internalValue.id) {

          // then we do the same and set the new internal value
          // and clear all the anchors
          return {
            internalValue: newInternalValue,
            currentAnchor: null,
            currentElementAnchor: null,
            currentBlockElementAnchor: null,
            currentSelectedNodeAnchor: null,
            currentContext: props.rootContext || null,
            currentElement: null,
            currentBlockElement: null,
            currentSuperBlockElement: null,
            currentSuperBlockElementAnchor: null,
            currentText: null,
            currentSelectedNode: null,
            currentSelectedNodeContext: null,
            currentSelectedTextNode: null,
            currentSelectedTextNodeAnchor: null,
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
      internalValue: props.internalValue || (props.isRichText ? deserialize(props.value) : deserializePlain(props.value)),

      // we are synced
      synced: true,
      // focused
      focused: false,

      // set up the anchors
      currentAnchor: null,
      currentElementAnchor: null,
      currentBlockElementAnchor: null,
      currentSuperBlockElementAnchor: null,
      currentSelectedNodeAnchor: null,
      currentContext: this.props.rootContext || null,
      currentElement: null,
      currentBlockElement: null,
      currentSuperBlockElement: null,
      currentText: null,
      currentSelectedNode: null,
      currentSelectedNodeContext: null,
      currentSelectedTextNode: null,
      currentSelectedTextNodeAnchor: null,

      // ensure SSR compatibility
      // since we cannot read the CSS file on the server side
      // as we have no access to stylesheets
      allContainers: [],
      allCustom: [],
      allRichClasses: [],
    }

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

    // and so we override
    this.editor.isInline = this.isInline as any;
    this.editor.isVoid = this.isVoid as any;
    this.editor.normalizeNode = this.normalizeNode;
    this.editor.insertBreak = this.insertBreak;
    this.editor.deleteBackward = this.deleteBackward;

    // other functions and heler utilities
    this.deleteSelectedNode = this.deleteSelectedNode.bind(this);
    this.setValue = this.setValue.bind(this);
    this.renderElement = this.renderElement.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderText = this.renderText.bind(this);
    this.onFocusedChange = this.onFocusedChange.bind(this);
    this.onBlurredChange = this.onBlurredChange.bind(this);
    this.onNativeBlur = this.onNativeBlur.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.selectPath = this.selectPath.bind(this);
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
    this.toggleList = this.toggleList.bind(this);
    this.toggleLink = this.toggleLink.bind(this);
    this.setStyle = this.setStyle.bind(this);
    this.set = this.set.bind(this);
    this.setHoverStyle = this.setHoverStyle.bind(this);
    this.setActiveStyle = this.setActiveStyle.bind(this);
    this.setRichClasses = this.setRichClasses.bind(this);
    this.setContext = this.setContext.bind(this);
    this.setForEach = this.setForEach.bind(this);
    this.formatToggleBold = this.formatToggleBold.bind(this);
    this.formatToggleItalic = this.formatToggleItalic.bind(this);
    this.formatToggleUnderline = this.formatToggleUnderline.bind(this);
    this.setAction = this.setAction.bind(this);
    this.insertUIHandledContainer = this.insertUIHandledContainer.bind(this);

    this.availableFilteringFunction = this.availableFilteringFunction.bind(this);
    this.calculateAnchorsAndContext = this.calculateAnchorsAndContext.bind(this);

    this.blockBlur = this.blockBlur.bind(this);
    this.releaseBlur = this.releaseBlur.bind(this);
  }

  /**
   * Checks whether two nodes are mergable
   * @param n1 the first node
   * @param n2 the second node
   * @returns a boolean on whether they should merge
   */
  public checkShouldMerge(n1: Node, n2: Node) {
    // first we take all the properties of these nodes and check that
    // every one of them passes
    return Object.keys(n1).concat(Object.keys(n2)).every((key) => {
      // we don't compare children nor the text content
      // of these
      if (key === "children" || key === "text") {
        // assume they pass
        return true;
      }

      // so we check for equality
      return equals(n1[key], n2[key]);
    });
  }

  /**
   * Normalization funciton that overrides the normalization
   * of the standard editor
   * @param entry the entry we are normalizing
   */
  public normalizeNode(entry: NodeEntry<Node>) {
    const [node, path] = entry;

    // if it's the editor itself, this happens when clearing
    // and deleting everything and the only thing left is the
    // editor itself
    if (Editor.isEditor(node)) {
      // this will basically be true every time
      if (node.children.length === 0) {
        // we insert a paragraph
        Transforms.insertNodes(this.editor,
          { type: "paragraph", containment: "block", children: [STANDARD_TEXT_NODE] },
          { at: path.concat(0) }
        );
      }

      // if it's an element
    } else if (Element.isElement(node)) {
      const managedChildrenExistance = node.children.map((v) => true);
      // the total current nodes
      let totalNodes = node.children.length;
      // we got to check first if we should merge the nodes
      let n = 0;
      // for that we loop
      for (let i = 0; i < node.children.length; i++) {
        let prevIndex = i - 1;
        while (!managedChildrenExistance[prevIndex] && prevIndex >= 0) {
          prevIndex--;
        }
        const prev = node.children[prevIndex];
        const current = node.children[i];
        const next = node.children[i + 1];

        // if we have a text type inside
        if (Text.isText(current)) {
          // we get the previous and current path
          const curPath = path.concat(n);
          // and this is where we are now
          const currentTextAnchorPath = this.editor.selection && this.editor.selection.anchor.path;
          // if we have a previous that is also a text that is not our anchor and is mergable
          if (
            prev &&
            Text.isText(prev) &&
            this.checkShouldMerge(current, prev)
          ) {
            // we merge it
            Transforms.mergeNodes(this.editor, { at: path.concat(n) });
            n--;
            totalNodes--;
            // otherwise if we have an empty node and either it is not selected which means
            // all non selected empty text nodes will dissapear regardless, or if it's able
            // to merge which means that it's a pointless empty node
            // note that we prevent to delete the node if that will leave us with no text nodes
          } else if (
            // empty text node
            current.text === "" &&
            // that is not our current anchor path or we have set it to ignore the current
            (!equals(curPath, currentTextAnchorPath) || this.ignoreCurrentLocationToRemoveEmpty) &&
            // and total nodes in the entire thing is not just that one node (there's more)
            totalNodes !== 1 &&
            // is not the ending of an inline element, as there should be an empty text node after
            // that in the end of the line
            !(Element.isElement(prev) && this.editor.isInline(prev) && (!next || !Text.isText(next))) &&
            // is not the start of an inline element, as there should be an empty text node after it
            // before the start of the line
            !(Element.isElement(next) && this.editor.isInline(next) && (!prev || !Text.isText(prev)))
          ) {
            // delete it
            Transforms.delete(this.editor, { at: path.concat(n) });
            n--;
            totalNodes--;
            managedChildrenExistance[i] = false;
          }
        } else if (Element.isElement(current) && this.editor.isInline(current)) {
          // if we have an inline and they are both
          // mergable the previous with the current
          if (
            prev &&
            Element.isElement(prev) &&
            this.editor.isInline(prev) &&
            this.checkShouldMerge(current, prev)
          ) {
            // we merge it
            Transforms.mergeNodes(this.editor, { at: path.concat(n) });
            n--;
            totalNodes--;
          }

          // now if we don't have a text node after our inline element
          if (!next || !Text.isText(next)) {
            // let's pick the last text element
            const lastText = (current as any).children[(current as any).children.length - 1];
            // and insert it after the inline
            Transforms.insertNodes(
              this.editor,
              {
                bold: false,
                italic: false,
                underline: false,
                ...copyElementBase(lastText),
                text: "",
              },
              { at: path.concat(n + 1) }
            );

            n++;
            totalNodes++;
          }

          // now if we don't have a prev node after our inline element
          if (!prev || !Text.isText(prev)) {
            // let's pick the first text element
            const firstText = (current as any).children[0];
            // and insert it after the inline
            Transforms.insertNodes(
              this.editor,
              {
                bold: false,
                italic: false,
                underline: false,
                ...copyElementBase(firstText),
                text: "",
              },
              { at: path.concat(n - 1) }
            );

            n++;
            totalNodes++;
          }
        }

        // one more
        n++;
      }

      // just a cheap casting
      const nodeAsRichElement = (node as any as RichElement);

      // now if we have a children that can only have inline as children types
      // because that's what a block basically is, it contains inlines as children
      // as well as text
      if (nodeAsRichElement.containment === "block") {
        // we get the node from the given path
        const newNode = Node.get(this.editor, path);

        // and now we recalculate
        let offset = 0;
        for (let i = 0; i < (newNode.children as any).length; i++) {
          // we get the given children
          const child = newNode.children[i];
          // and if these children are not inline components
          if (Element.isElement(child) && !this.editor.isInline(child)) {
            // then they should be unwrapped from it
            Transforms.unwrapNodes(this.editor, { at: path.concat(i + offset) });
            // and we offset from the children, we add how many new children
            // we have added and offset by the lost node that we just unwrapped
            offset += child.children.length - 1;
          }
        }

        // if we have no children
        if ((newNode.children as any).length === 0) {
          // then we add a basic text node
          Transforms.insertNodes(this.editor,
            STANDARD_TEXT_NODE,
            { at: path.concat(0) }
          );
        }

        // now for inlines that can only truly have
        // texts as children
      } else if (nodeAsRichElement.containment === "inline") {
        // get the node again
        const newNode = Node.get(this.editor, path);

        // and now we can check everything inside it
        let offset = 0;
        for (let i = 0; i < (newNode.children as any).length; i++) {
          // and now we can get the child
          const child = newNode.children[i];
          // and if it's an element (not text) it's forbidden and should
          // be unwrapped
          if (Element.isElement(child)) {
            // so we do so note that normalization will keep looping on itself
            // until there are only text nodes left
            Transforms.unwrapNodes(this.editor, { at: path.concat(i + offset) });
            offset += child.children.length - 1;
          }
        }

        // and if we don't have children as well
        if ((newNode.children as any).length === 0) {
          // equally we add a simple text node
          Transforms.insertNodes(this.editor,
            STANDARD_TEXT_NODE,
            { at: path.concat(0) }
          );
        }

        // now for standard basic superblocks
        // superblocks can only have blocks as children
        // as well as other superblocks, they are made
        // to be containers for the most part
      } else if (nodeAsRichElement.containment === "superblock") {
        // we get the node
        const newNode = Node.get(this.editor, path);

        // and we loop around it
        for (let i = 0; i < (newNode.children as any).length; i++) {
          // get the children
          const child = newNode.children[i];
          // and if it's a text, aka not a block or it's an inline element
          if (Text.isText(child) || this.editor.isInline(child)) {
            // then we wrap the thing in a paragraph
            Transforms.wrapNodes(this.editor, { type: "paragraph", containment: "block", children: [] }, { at: path.concat(i) });
          }
        }

        // or if we have no children
        if ((newNode.children as any).length === 0) {
          // we add an empty paragraph
          Transforms.insertNodes(this.editor,
            { type: "paragraph", containment: "block", children: [STANDARD_TEXT_NODE] },
            { at: path.concat(0) }
          );
        }

        // list superblocks are equally superblocks but they can only contain
        // list-item as children, these are blocks indeed, but that's the only
        // allowed type
      } else if (nodeAsRichElement.containment === "list-superblock") {
        // get the node
        const newNode = Node.get(this.editor, path);

        // and now start looping in the children
        let offset = 0;
        for (let i = 0; i < (newNode.children as any).length; i++) {
          // let's get the child
          const child = newNode.children[i] as any as RichElement;
          // if it's an element and it's another list superblock inside it
          if (Element.isElement(child) && child.containment === "list-superblock") {
            // we refuse
            Transforms.unwrapNodes(this.editor, { at: path.concat(i + offset) });
            offset += child.children.length - 1;
          } else if (Text.isText(child) || child.type !== "list-item") {
            // otherwise if it's a text or if it's something that is not a list item
            // then we wrap it into a list item
            // list item being a block will unwrap things inside it that are not
            // inline
            Transforms.wrapNodes(this.editor, { type: "list-item", containment: "block", children: [] }, { at: path.concat(i + offset) });
          }
        }

        // otherwise if there are no children in the list superblock
        if ((newNode.children as any).length === 0) {
          // we need to add an emtpy list item node
          Transforms.insertNodes(this.editor,
            { type: "list-item", containment: "block", children: [STANDARD_TEXT_NODE] },
            { at: path.concat(0) }
          );
        }
      }
    }
  }

  /**
   * Override for the default editor inline function
   * @param element the element that is to be considered
   * @returns a boolean on whether it represents an inline element
   */
  public isInline(element: RichElement) {
    return element.containment === "inline" || element.containment === "void-inline";
  }

  /**
   * Override for the default editor void function
   * @param element the element that is to be considered
   * @returns a boolean on whether it represents a void element
   */
  public isVoid(element: RichElement) {
    // all ui handled elements are void
    if (element.uiHandler) {
      return true;
    }

    // otherwise it depends on the containment
    // void-block are for example videos, and void-inline are for example files
    return element.containment === "void-block" || element.containment === "void-inline";
  }

  /**
   * Override for the default editor insert break function
   */
  public insertBreak() {
    if (
      // if we are simply collapsed
      Range.isCollapsed(this.editor.selection) &&
      // and we have a superblock
      this.state.currentSuperBlockElement &&
      // and we are within a list and a list item
      this.state.currentSuperBlockElement.type === "list" &&
      this.state.currentBlockElement.type === "list-item" &&
      // and our current block element, our list item, has
      // only one children
      this.state.currentBlockElement.children.length === 1 &&
      // and that children is a text node
      Text.isText(this.state.currentBlockElement.children[0]) &&
      // and that text node is empty
      // basically
      // 1. list item 1
      // 2. |
      // 3. list item 3
      // and we are pressing enter there where | represents the caret
      this.state.currentBlockElement.children[0].text === ""
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
        containment: "block",
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

    // if the end we are dealing with is exactly
    // at this last point and offset so we are right
    // at the end of the given block
    // we do this to avoid copying template text elements
    // when we deal with text so that they don't also
    // become template text
    if (
      end.offset === finalBlockOffset &&
      Path.equals(finalBlockPath, end.path)
    ) {
      // then we want to clone the current block
      // we are dealing with and copy all its properties
      Transforms.insertNodes(this.editor, {
        ...this.state.currentBlockElement,
        // but certainly not its current text properties
        // that we might be at, as we don't want to copy nor the
        // text, nor the template text values
        children: [
          {
            ...this.state.currentText,
            text: "",
          }
        ]
      });
    } else {
      // otherwise we do a simple split node
      Transforms.splitNodes(this.editor, { always: true })
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
          // and the current block has only one children
          this.state.currentBlockElement.children.length === 1 &&
          // and it is a text node inside
          Text.isText(this.state.currentBlockElement.children[0]) &&
          // and we have nothing left in that text, so we are deleting
          // in a list one element
          this.state.currentBlockElement.children[0].text === ""
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
    } else {
      // do a normal delete
      Transforms.delete(this.editor, { unit, reverse: true });
    }
  }

  /**
   * Breaks the list based on the current selection
   * we must be in a list currently, this function is called
   * by the delete backwards functionality as well as the toggle
   * list one
   */
  public breakList() {
    // so we can get the current list item index in the list
    const currentListItemIndex = this.state.currentBlockElementAnchor[this.state.currentBlockElementAnchor.length - 1];
    // and then we check if we have more list items next ot it based on how many the super block has off children
    const hasChildrenNext = currentListItemIndex < this.state.currentSuperBlockElement.children.length - 1;

    // now we can get the last children anchor we basically calculate it
    // by changing the last value
    const lastListItemAnchor = [...this.state.currentBlockElementAnchor];
    lastListItemAnchor[lastListItemAnchor.length - 1] = this.state.currentSuperBlockElement.children.length - 1;

    // and then we need to check what's the next for such an event
    // we clone the anchor, and add 1 to the last value of the path
    // so say [1,1,1] turns to [1,1,2]
    const nextSuperAnchor = [...this.state.currentSuperBlockElementAnchor];
    const lastSuperAnchorIndex = nextSuperAnchor.length - 1;
    nextSuperAnchor[lastSuperAnchorIndex] = nextSuperAnchor[lastSuperAnchorIndex] + 1;

    // if the index of our list item is 0
    // then we are basically taking off the first node
    if (currentListItemIndex === 0) {
      // we remove the whole superblock that contains everything
      Transforms.removeNodes(this.editor, { at: this.state.currentSuperBlockElementAnchor });
      // and we say that the next super anchor position is back to be our current
      // superblock position
      nextSuperAnchor[lastSuperAnchorIndex]--;
    } else {
      // otherwise we just remove the entire list item itself all the way
      // to the last, so our superblock only keeps the previous existing
      // items in the list
      Transforms.removeNodes(this.editor, {
        at: {
          anchor: Editor.start(this.editor, this.state.currentBlockElementAnchor),
          focus: Editor.end(this.editor, lastListItemAnchor)
        }
      });
    }

    // now if we have children in the next place that we are supposed to
    // deal with
    if (hasChildrenNext) {
      // we are inserting those nodes at the next place after the super anchor
      // that we have calculated is
      Transforms.insertNodes(
        this.editor,
        {
          // we copy our super block
          ...copyElementBase(this.state.currentSuperBlockElement),
          type: "list",
          containment: "list-item",
          listType: (this.state.currentSuperBlockElement as any).listType,
          // and slice the children
          children: (this.state.currentSuperBlockElement.children.slice(this.state.currentBlockElementAnchor.length) as any as Node[]),
        },
        {
          at: nextSuperAnchor,
        },
      );
    }

    // now at that exact same place at the next super anchor
    // we will insert a paragraph, so now the list item superblock has been
    // split in 3 pieces
    Transforms.insertNodes(
      this.editor,
      {
        ...copyElementBase(this.state.currentSuperBlockElement),
        type: "paragraph",
        containment: "block",
        children: this.state.currentBlockElement.children as any,
      },
      {
        at: nextSuperAnchor,
      },
    );

    // and we reset the selection at the paragraph
    Transforms.setSelection(
      this.editor,
      {
        anchor: Editor.start(this.editor, nextSuperAnchor),
        focus: Editor.start(this.editor, nextSuperAnchor),
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
      nextAnchor[currentSuperBlockElementAnchor.length - 1]++;

      // and we insert a clone based on the block itself
      // with no text
      Transforms.insertNodes(this.editor, {
        ...this.state.currentBlockElement,
        children: [
          {
            ...this.state.currentText,
            text: "",
          }
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
  }

  /**
   * Calculates the anchors and the context based on a given value
   * (or the current value of the editor) and the selection nodes
   * that are currently selected (or it will override with the defaults)
   * @param anchor the anchor that is currently deemed to be selected at
   * @param value the value that we are working with, if not provided it will take it from the state
   * @param currentSelectedNodeAnchorAndTextAnchor the selected node anchor, and text anchor if not provided
   * it will use the default values based on the logic of the calculated anchors
   */
  public calculateAnchorsAndContext(anchor: Path, value?: Node[], currentSelectedNodeAnchorAndTextAnchor?: [Path, Path]) {
    // first we set up all the basics to their null value
    let currentContext: ITemplateArgsContext = null;
    let currentElement: RichElement = null;
    let currentElementAnchor: Path = null;
    let currentBlockElement: RichElement = null;
    let currentBlockElementAnchor: Path = null;
    let currentSuperBlockElement: RichElement = null;
    let currentSuperBlockElementAnchor: Path = null;
    let currentText: IText = null;

    // now we do need to setup the anchor if we have an anchor
    // in that case we need to populate these fields
    if (anchor) {
      // right now we setup everything at root
      currentContext = this.props.rootContext || null;
      // the current element
      currentElement = value ? {
        children: value,
      } as any : this.state.internalValue;
      // and the element anchor is one down to the text anchor
      currentElementAnchor = [...anchor];
      currentElementAnchor.pop();
      // the block and superblock need to be calculated
      currentBlockElementAnchor = [];
      currentSuperBlockElementAnchor = [];

      // so now we need to calculate
      const last = anchor.length - 1;
      // we loop in our text anchor
      anchor.forEach((n: number, index: number) => {
        // if we are in the last
        if (index === last) {
          // that must be our text
          currentText = currentElement.children[n] as IText;
        } else {
          // otherwise it's an element
          currentElement = currentElement.children[n] as RichElement;

          // if it's a non inline then we are into our current block
          if (currentElement.containment !== "inline") {
            currentBlockElement = currentElement;
            currentBlockElementAnchor.push(n);
          }

          // if we have a superblock or list-item element that contains lists
          if (currentElement.containment === "superblock" || currentElement.containment === "list-superblock") {
            currentSuperBlockElement = currentElement;
            currentSuperBlockElementAnchor.push(n);
          }

          // now we need to fetch the context we are in
          if (currentContext && currentElement.context) {
            currentContext = currentContext.properties[currentElement.context] as ITemplateArgsContext || null;
            if (currentContext.type !== "context" || currentContext.loopable) {
              currentContext = null;
            }
          }

          // also in the foreach context
          if (currentContext && currentElement.forEach) {
            currentContext = currentContext.properties[currentElement.forEach] as ITemplateArgsContext || null;
            if (currentContext.type !== "context" || !currentContext.loopable) {
              currentContext = null;
            }
          }
        }
      });
    } else {
      currentContext = this.props.rootContext || null;
    }

    // now for our selection, by default it's all null
    let currentSelectedNodeAnchor: Path = null;
    let currentSelectedNode: RichElement | IText = null;
    let currentSelectedTextNode: IText = null;
    let currentSelectedTextNodeAnchor: Path = null;
    let currentSelectedNodeContext: ITemplateArgsContext = null;

    // if we don't have a selected anchor and origin
    // we have purposely set then we should
    // default to the currently selected values, if any
    if (!currentSelectedNodeAnchorAndTextAnchor) {
      // so the selected anchor will be the element anchor
      currentSelectedNodeAnchor = currentElementAnchor;
      // the origin will be made on the text
      currentSelectedTextNode = currentText;
      // the origin anchor will be the text anchor
      currentSelectedTextNodeAnchor = anchor;
      // the selected node is the element just like the anchor
      currentSelectedNode = currentElement;
      // and the context is our current context
      currentSelectedNodeContext = currentContext;
    } else {
      // otherwise here, we are going to pick and trust
      // the values we are given, the anchors
      // are the these values
      currentSelectedNodeAnchor = currentSelectedNodeAnchorAndTextAnchor[0];
      currentSelectedTextNodeAnchor = currentSelectedNodeAnchorAndTextAnchor[1];

      // now we need to prepare and find the text origin, and context
      // as well as the selected element
      currentSelectedTextNode = value ? {
        children: value,
      } as any : this.state.internalValue;
      currentSelectedNodeContext = this.props.rootContext || null;

      // so we loop in the origin anchor
      currentSelectedTextNodeAnchor.forEach((n: number, index: number) => {
        // and update the node origin
        currentSelectedTextNode = (currentSelectedTextNode as any).children[n];

        // if it's our last value from the selected anchor, which should
        // be contained in the origin
        if (index === currentSelectedNodeAnchor.length - 1) {
          // then that's our node
          currentSelectedNode = currentSelectedTextNode;
        }

        // if we are still within the selected anchor
        if (index < currentSelectedNodeAnchor.length) {
          // we need to fetch the context we are in for the currentSelectedNodeContext
          // which might differ
          if (currentSelectedNodeContext && (currentSelectedTextNode as any).context) {
            // so we pick it from the origin value we are using to loop in
            currentSelectedNodeContext =
              currentSelectedNodeContext.properties[(currentSelectedTextNode as any).context] as ITemplateArgsContext || null;

            // and then we recheck these
            if (currentSelectedNodeContext.type !== "context" || currentSelectedNodeContext.loopable) {
              currentSelectedNodeContext = null;
            }
          }

          // also in the foreach context
          if (currentSelectedNodeContext && (currentSelectedTextNode as any).forEach) {
            currentSelectedNodeContext = currentSelectedNodeContext.properties[(currentSelectedTextNode as any).forEach] as ITemplateArgsContext || null;
            if (currentSelectedNodeContext.type !== "context" || !currentSelectedNodeContext.loopable) {
              currentSelectedNodeContext = null;
            }
          }
        }
      });
    }

    // now we can return
    return {
      currentAnchor: anchor,
      currentElementAnchor,
      currentBlockElementAnchor,
      currentSelectedNodeAnchor,
      currentContext,
      currentElement,
      currentBlockElement,
      currentSuperBlockElement,
      currentSuperBlockElementAnchor,
      currentText,
      currentSelectedNode,
      currentSelectedNodeContext,
      currentSelectedTextNode,
      currentSelectedTextNodeAnchor,
    }
  }

  /**
   * Triggers on change when the field is focused
   * and has changed
   * @param anchor the anchor that we are at
   * @param value the value that we got
   */
  public onFocusedChange(anchor: Path, value: Node[]) {
    // now we can calculate the anchors and context
    this.setState(this.calculateAnchorsAndContext(anchor, value));

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
  public onBlurredChange(value: Node[]) {
    // if we are considered as focused
    if (this.state.focused) {
      // well not anymore
      this.props.onBlur && this.props.onBlur();
    }

    // now we can call this
    const anchorData = this.calculateAnchorsAndContext(
      // no anchor as it is not known
      null,
      // the value
      value,
      // and we pass the selected node anchor as it
      // remains even after the selection only if
      // we have not just deleted that node
      this.state.currentSelectedNodeAnchor &&
        !this.lastChangeWasSelectedDelete ? [
          this.state.currentSelectedNodeAnchor,
          this.state.currentSelectedTextNodeAnchor,
        ] : null,
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
      nextState.currentAnchor !== this.state.currentAnchor ||
      nextState.currentSelectedNodeAnchor !== this.state.currentSelectedNodeAnchor ||
      nextProps.currentLoadError !== this.props.currentLoadError ||
      !equals(this.state.allContainers, nextState.allContainers) ||
      !equals(this.state.allCustom, nextState.allCustom) ||
      !equals(this.state.allRichClasses, nextState.allRichClasses) ||
      !equals(nextProps.wrapperArgs, this.props.wrapperArgs) ||
      !equals(nextProps.features, this.props.features)
    )

    // if it's a standard update match
    if (standardUpdate) {
      // yep
      return true;
    }

    // otherwise let's check for internal values signature differences
    if (nextProps.internalValue && nextState.synced) {
      return nextProps.internalValue.id !== this.state.internalValue.id;
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
    // build a new document
    const newRootDocument: IRootLevelDocument = {
      id: uuid.v4(),
      type: "document",
      rich: this.state.internalValue.rich,
      children: v,
    };

    // and set the state to that
    this.setState({
      internalValue: newRootDocument,
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
      if (this.state.internalValue.rich) {
        // what we do is that we count the characters
        const count = countSize(this.state.internalValue);
        // and set it in the last rich text change cheat variable
        (window as any)[LAST_RICH_TEXT_CHANGE_LENGTH] = count;
      }
      // and now we can trigger the on change event
      this.props.onChange(serializeString(this.state.internalValue), this.state.internalValue);
      // and now we are going to wait a little bit more
      this.updateTimeout = setTimeout(() => {
        // to tell it that it should sync
        this.setState({
          synced: true,
        });
      }, 30);
    }, 300);
  }

  /**
   * the render element function to be used in slate editor
   * @param props the properties that slate provides to render the component
   */
  public renderElement(props: RenderElementProps) {
    // first we extract all these stuffs
    const { attributes, children, element } = props;

    // now we check if we are in a selected elelement
    // because the component is immutable, we can do this
    const isSelected = (
      (element as any) === this.state.currentBlockElement ||
      (element as any) === this.state.currentElement ||
      (element as any) === this.state.currentSuperBlockElement
    );

    // let's check for a ui handler
    const uiHandler = (element as any as RichElement).uiHandler;

    // if we have one
    if (uiHandler) {

      // we extract the arguments for the ui handler that are in the rich element
      const uiHandlerArgs = (element as any as RichElement).uiHandlerArgs;

      // and now we try to get the ui handler from the context itself
      // either the root or the one in the property itself
      const propertiesFromContext =
        this.state.currentContext.properties[uiHandler] ||
        this.props.rootContext.properties[uiHandler];

      // if we don't find a UI handler
      // let's put a message about it
      if (
        !propertiesFromContext ||
        propertiesFromContext.type !== "ui-handler" ||
        !propertiesFromContext.handler
      ) {
        return (
          <div>
            <span>{`UI Handled [${uiHandler}]`}</span>
            <span>You are missing the given UI Handler as such it can't be rendered</span>
          </div>
        );
      }

      // now we can get the component, extra args and whatnot
      const HandlerComponent = propertiesFromContext.handler;
      const handlerExtraArgs = propertiesFromContext.handlerExtraArgs;
      const passExtraInfo = propertiesFromContext.handlerPassSlateInfo;

      // the extra info that should be passed if necessary
      const extraInfoArgs = passExtraInfo ?
        {
          helpers: this.getHelpers(),
          selected: isSelected,
        } : {};

      // now we can use the handler component that is given via the ui handler
      return (
        <HandlerComponent
          {...uiHandlerArgs}
          {...handlerExtraArgs}
          {...extraInfoArgs}
        />
      );
    }

    // and now we call the reactification
    return SERIALIZATION_REGISTRY.REACTIFY[element.type as string]({
      active: false,
      selected: isSelected,
      element: element as any,
      asTemplate: false,
      customProps: { ...attributes, children },
    }) as any;
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

    // first we clear the timeout of the blur
    // this is used during the blur blocking so now
    // the field won't be blurred because a change occured
    // but it will at the end depend on the editor selection
    // whether it ends up being blurred or not
    clearTimeout(this.blurTimeout);

    // if there's a selection
    if (this.editor.selection) {
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
    if (newValue !== this.state.internalValue.children as any) {
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
   * given a node path, that should represent either an element or a text node
   * this allows such a path to be selected and be marked into the selection
   * @param p the path to select
   */
  public selectPath(p: Path) {
    // first we need to find the actual node that is referred to that path
    let finalNode: any = this.state.internalValue;
    p.forEach((v) => {
      finalNode = finalNode.children[v];
    });

    // now we can update the state
    this.setState({
      currentSelectedNodeAnchor: p,
      currentSelectedNode: finalNode,
    });
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

    // so we delete which will call onchange and normalization
    Transforms.delete(this.editor, {
      at: this.state.currentSelectedNodeAnchor,
    });

    // and now we can refocus
    ReactEditor.focus(this.editor);
  };

  /**
   * A helper function to call react focus back into the editor
   */
  public focus() {
    ReactEditor.focus(this.editor);
  }

  /**
   * An async function that is a bit of a hack to focus at a given
   * range, because of the way slate works it needs to be async
   * @param at the range to focus at
   * @returns a void promise once it's done
   */
  public async focusAt(at: Range) {
    return new Promise((r) => {
      setTimeout(() => {
        ReactEditor.focus(this.editor);
        setTimeout(() => {
          Transforms.setSelection(this.editor, at);
          setTimeout(r, 0);
        }, 0);
      }, 0);
    });
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
   * @param at a range to insert it at (optional)
   * @returns a void promise once it's done
   */
  public async insertImage(file: File, standalone: boolean, at?: Range): Promise<void> {
    // we try
    try {
      // now let's see what we get
      const data = await this.props.onInsertFile(file, true);

      // let's refocus
      if (at) {
        await this.focusAt(at);
      }

      if (!data) {
        // something went wrong there should be an error in the props
        return;
      }

      // now we can build the image node that we should add in the tree
      const imageNode: IImage = {
        type: "image",
        containment: "void-block",
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
        sizes: null,
        src: data.result.url,
        srcId: data.result.id,
        srcSet: null,
        standalone,
      };

      // and we call the insert node
      this.editor.insertNode(imageNode as any);
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
  public async insertTemplateText(label: string, value: string, at?: Range) {

    // if we have a range to insert at
    if (at) {
      // we focus there
      await this.focusAt(at);
    }

    // now we pick the current text node, if possible
    const currentText: IText = (this.state.currentText || (at ? Node.get(this.editor, at.anchor.path) : null)) as IText;

    // now we make the text node
    const textNode: IText = {
      bold: false,
      italic: false,
      underline: false,
      ...currentText, // note how we override here
      text: label,
    }

    // and now we build a paragraph node to put the text there
    const inlineNode: IInline = {
      children: [textNode],
      containment: "inline",
      type: "inline",
      textContent: value,
    };

    // and insert right there
    this.editor.insertNode(inlineNode as any);
  }

  /**
   * Will insert a bit of template html that is used for templating purposes, work similar
   * to template text, except it uses html content instead to replace the inner html
   * 
   * @param label the label to be given to the element to be added
   * @param value the value that will be used from the context
   * @param at an optional range where to be inserted
   */
  public async insertTemplateHTML(label: string, value: string, at?: Range) {

    // if we have a range to insert at
    if (at) {
      // we focus there
      await this.focusAt(at);
    }

    // now we pick the current text node, if possible
    const currentText: IText = (this.state.currentText || (at ? Node.get(this.editor, at.anchor.path) : null)) as IText;

    // and create a text node based on that
    // which is where we put the label
    const textNode: IText = {
      bold: false,
      italic: false,
      underline: false,
      ...currentText,
      text: label,
    }

    // and now we build a paragraph node to put the text there
    const blockNode: IParagraph = {
      children: [textNode],
      containment: "block",
      type: "paragraph",
    };

    // and a container to make it be the inner html
    // container
    const superBlock: IContainer = {
      children: [blockNode],
      containment: "superblock",
      containerType: null,
      type: "container",
      html: value,
    }

    // now we can insert that node
    this.editor.insertNode(superBlock as any);
  }

  /**
   * Will insert a video given the information
   * @param url the url of the video
   * @param at a partial range to insert at
   * @returns a boolean on whether it succeeded
   */
  public insertVideo(url: string, at?: Range): boolean {

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

    // now we can do this part async
    (async () => {
      // and set the focus
      if (at) {
        await this.focusAt(at);
      }

      // and insert the video if we have been
      // considered succesful
      if (status) {
        const videoNode: IVideo = {
          type: "video",
          containment: "void-block",
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

        // insert the video node
        this.editor.insertNode(videoNode as any);
      }
    })();

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
  public async insertFile(file: File, at?: Range) {
    // so we try
    try {
      // we call the insert file function, and pass false because
      // we are not dealing with an image
      const data = await this.props.onInsertFile(file, false);

      // now we focus
      if (at) {
        await this.focusAt(at);
      }

      if (!data) {
        // something went wrong there should be an error in the state
        return;
      }

      // now we can build the file node
      const fileNode: IFile = {
        type: "file",
        containment: "void-inline",
        children: [
          {
            bold: false,
            italic: false,
            text: "",
            underline: false,
          }
        ],
        extension: mimeTypeToExtension(file.type),
        name: data.result.name,
        size: prettyBytes(data.result.size),
        src: data.result.url,
        srcId: data.result.id,
      };

      // and insert it
      this.editor.insertNode(fileNode as any);
    } catch (err) {
    }
  };

  /**
   * Will insert a container at the given location
   * @param type optional, the container type, otherwise will insert a standard container
   * @param at an optional range
   */
  public async insertContainer(type?: string, at?: Range) {
    // if we are provided a range
    if (at) {
      // we focus at it
      await this.focusAt(at);
    }

    // first we get the current text
    const currentText: IText = (this.state.currentText || (at ? Node.get(this.editor, at.anchor.path) : null)) as IText;

    // also the current block based on such text
    let currentBlockElement: RichElement = this.state.currentBlockElement;
    // if it's not in the state, we need to find it, for that we need to have a current text
    // found and an at attribute to search for
    if (!currentBlockElement && currentText && at) {
      // we build a path
      let currentPath = [...at.anchor.path];
      while ((!currentBlockElement || currentBlockElement.containment !== "block") && currentPath.length) {
        currentPath.pop();
        currentBlockElement = Node.get(this.editor, currentPath) as any as RichElement;
      }
    }

    // now we can insert a node based on the current block
    // which is most likely a paragraph
    Transforms.insertNodes(this.editor, {
      type: "paragraph",
      // we use the current block element here in case we don't find it
      // the type is on top for case of emergency
      ...currentBlockElement,
      children: [
        {
          bold: false,
          italic: false,
          underline: false,
          ...currentText,
          text: "",
        }
      ]
    });

    // now we can make the container
    const containerNode: IContainer = {
      type: "container",
      containment: "superblock",
      children: [],
      containerType: type || null,
    };

    // and wrap the thing
    Transforms.wrapNodes(this.editor, containerNode as any);

    // then refocus
    ReactEditor.focus(this.editor);
  };

  /**
   * Inserts a custom element
   * @param type the type for the custom element
   * @param at an optional at range to insert the custom at
   */
  public async insertCustom(type: string, at?: Range) {
    // if we are provided a range
    if (at) {
      // we focus at it
      await this.focusAt(at);
    }

    // first we get the current text
    const currentText: IText = (this.state.currentText || (at ? Node.get(this.editor, at.anchor.path) : null)) as IText;

    // also the current block based on such text
    let currentBlockElement: RichElement = this.state.currentBlockElement;
    // if it's not in the state, we need to find it, for that we need to have a current text
    // found and an at attribute to search for
    if (!currentBlockElement && currentText && at) {
      // we build a path
      let currentPath = [...at.anchor.path];
      while ((!currentBlockElement || currentBlockElement.containment !== "block") && currentPath.length) {
        currentPath.pop();
        currentBlockElement = Node.get(this.editor, currentPath) as any as RichElement;
      }
    }

    // now we can insert a node based on the current block
    // which is most likely a paragraph
    Transforms.insertNodes(this.editor, {
      type: "paragraph",
      // we use the current block element here in case we don't find it
      // the type is on top for case of emergency
      ...currentBlockElement,
      children: [
        {
          bold: false,
          italic: false,
          underline: false,
          ...currentText,
          text: "",
        }
      ]
    });

    // now we can make the custom
    const customNode: ICustom = {
      type: "custom",
      containment: "superblock",
      children: [],
      customType: type,
    };

    // and wrap the thing
    Transforms.wrapNodes(this.editor, customNode as any);

    // then refocus
    ReactEditor.focus(this.editor);
  };

  /**
   * Makes a quote out of the current element
   * @param at toggle at the given range, this will cause a focus
   */
  public async toggleQuote(at?: Range) {
    // if we are offered a range
    if (at) {
      // use it
      await this.focusAt(at);
    }

    // now we got to check if we are collapsed
    const isCollapsed = Range.isCollapsed(at || this.editor.selection);
    // and get the anchor data from the at, or from the state
    const anchorData = at ? this.calculateAnchorsAndContext(at.anchor.path) : this.state;
    // if our current block element is a quote
    if (anchorData.currentBlockElement.type === "quote") {
      // then we would actually want to wrap into a paragraph so
      // that the quote itself is normalized out and it goes back
      // into a paragraph
      Transforms.wrapNodes(
        this.editor,
        {
          ...copyElementBase(anchorData.currentBlockElement),
          type: "paragraph",
          containment: "block",
          children: [],
        },
        { split: !isCollapsed, at: isCollapsed ? anchorData.currentBlockElementAnchor : undefined },
      );

    // otherwise we want to wrap into a quote
    } else {
      // so we do
      Transforms.wrapNodes(
        this.editor,
        {
          ...copyElementBase(anchorData.currentBlockElement),
          type: "quote",
          containment: "block",
          children: [],
        },
        { split: !isCollapsed, at: isCollapsed ? anchorData.currentBlockElementAnchor : undefined },
      );
    }

    // FOCUS
    ReactEditor.focus(this.editor);
  };

  /**
   * Makes a title out of the current element
   * @param type the title type
   * @param at an optional range
   */
  public async toggleTitle(type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6", at?: Range) {
    // if we are provided a range
    if (at) {
      // let's focus at it there
      await this.focusAt(at);
    }

    // then let's get this information to know the state and if it's collapsed
    const isCollapsed = Range.isCollapsed(at || this.editor.selection);
    const anchorData = at ? this.calculateAnchorsAndContext(at.anchor.path) : this.state;

    // if we are already wrapped in it and we need to toggle
    if (anchorData.currentBlockElement.type === "title" && anchorData.currentBlockElement.subtype === type) {
      // then we wrap back into a paragraph to normalize the title back into a paragraph
      Transforms.wrapNodes(
        this.editor,
        {
          ...copyElementBase(anchorData.currentBlockElement),
          type: "paragraph",
          containment: "block",
          children: [],
        },
        { split: !isCollapsed, at: isCollapsed ? anchorData.currentBlockElementAnchor : undefined },
      );
    } else {
      // otherwise we wrap into the new title
      Transforms.wrapNodes(
        this.editor,
        {
          ...copyElementBase(anchorData.currentBlockElement),
          type: "title",
          containment: "block",
          subtype: type,
          children: [],
        },
        { split: !isCollapsed, at: isCollapsed ? anchorData.currentBlockElementAnchor : undefined },
      );
    }

    // Focus
    ReactEditor.focus(this.editor);
  };

  /**
   * Makes a list out of the current element
   * @param type the type of the list that is to be toggled, either bulleted or number
   * @param at an optional range
   */
  public async toggleList(type: "bulleted" | "numbered", at?: Range) {

    // if we have a range we focus at it
    if (at) {
      await this.focusAt(at);
    }

    // now we need to check for the collapsing information and anchor data
    const isCollapsed = Range.isCollapsed(at || this.editor.selection);
    const anchorData = at ? this.calculateAnchorsAndContext(at.anchor.path) : this.state;

    // if we have a current super block and which is a list already
    if (anchorData.currentSuperBlockElement && anchorData.currentSuperBlockElement.type === "list") {
      // if the super block is not of the same list type, then we basically rewrap
      // to normalize it out
      if (anchorData.currentSuperBlockElement.listType !== type) {
        // so here we rewrap with the new list type
        Transforms.wrapNodes(
          this.editor,
          {
            ...copyElementBase(anchorData.currentSuperBlockElement),
            type: "list",
            listType: type,
            containment: "list-superblock",
            children: [],
          },
          { split: false, at: anchorData.currentSuperBlockElementAnchor },
        );
      } else {
        // otherwise we just break the list
        // which will delete the list if all is chosen or whatever
        // is chosen will be broken
        this.breakList();
      }
    } else {
      // otherwise we wrap into a new list
      Transforms.wrapNodes(
        this.editor,
        {
          ...copyElementBase(anchorData.currentBlockElement),
          type: "list",
          listType: type,
          containment: "list-superblock",
          children: [],
        },
        { split: !isCollapsed, at: isCollapsed ? anchorData.currentBlockElementAnchor : undefined },
      );
    }

    // focus
    ReactEditor.focus(this.editor);
  };

  /**
   * Makes a link out of the current element
   * @param url the url that we are using (null if using tvalue)
   * @param tvalue the template value to use (null if providing url)
   * @param at an optional range to pass
   * @returns a boolean if the link was valid and successful
   */
  public toggleLink(url: string, tvalue: string, at?: Range): boolean {
    // if we don't support a link
    if (!this.props.features.supportsLinks) {
      // we have failed
      return false;
    }

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

    // now if there is no link, no tvalue and no url
    const noLink = !tvalue && !url;

    // let's get this information
    const isCollapsed = Range.isCollapsed(at || this.editor.selection);
    const anchorData = at ? this.calculateAnchorsAndContext(at.anchor.path) : this.state;

    (async () => {
      // and now we can focus
      if (at) {
        await this.focusAt(at);
      }

      // if we are collapsed, we want to wrap
      // the entire element
      if (isCollapsed) {

        // so we are going to check if we already just
        // have a link in place
        if (
          anchorData.currentElement &&
          anchorData.currentElement.type === "link"
        ) {
          // if we have a url to a tvalue
          if (urlToUse || tvalue) {
            // then we update the current link
            Transforms.setNodes(
              this.editor,
              {
                href: !tvalue ? urlToUse : null,
                thref: tvalue ? tvalue : null,
              },
              { at: anchorData.currentElementAnchor }
            );
          } else {
            // otherwise we unwrap the given link
            Transforms.unwrapNodes(
              this.editor,
              { at: anchorData.currentElementAnchor }
            );
          }

        // now if have link information to be used to create a link
        } else if (!noLink) {
          // we do so by wrapping
          Transforms.wrapNodes(
            this.editor,
            {
              type: "link",
              containment: "inline",
              href: !tvalue ? urlToUse : null,
              thref: tvalue ? tvalue : null,
              children: [],
            },
            { split: false, at: anchorData.currentBlockElementAnchor, match: (n: any) => n.containment === "inline" || Text.isText(n) },
          );
        }

      // otherwise if we are not collapsed
      } else {
        // if we are within a link
        if (
          anchorData.currentElement &&
          anchorData.currentElement.type === "link"
        ) {
          // then we reset the nodes
          if (urlToUse || tvalue) {
            Transforms.setNodes(
              this.editor,
              {
                href: !tvalue ? urlToUse : null,
                thref: tvalue ? tvalue : null,
              },
              { split: true, match: (n: any) => n.type === "link" }
            );
          } else {
            // or we unwrap them if the link value or tvalue
            // is not given so we have no link
            Transforms.unwrapNodes(
              this.editor,
              { split: true, match: (n: any) => n.type === "link" },
            );
          }
        } else {
          // otherwise if we are not within the link
          // we wrap with a link
          Transforms.wrapNodes(
            this.editor,
            {
              type: "link",
              containment: "inline",
              href: !tvalue ? urlToUse : null,
              thref: tvalue ? tvalue : null,
              children: [],
            },
            { split: true, match: (n: any) => n.containment === "inline" || Text.isText(n) },
          );
        }
      }

      // and then we focus
      ReactEditor.focus(this.editor);
    })();

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
   * Will insert a container at the given location and assign it an UI handler
   * @param type the container type
   * @param value the value for the ui handler that should be taken out of the context
   * @param args the args for the ui handler
   * @param at an optional range
   */
  public async insertUIHandledContainer(type: string, value: string, args: { [key: string]: string }, at?: Range) {
    // if we are provided a range
    if (at) {
      // we focus at it
      await this.focusAt(at);
    }

    // now we can make the container
    const containerNode: IContainer = {
      type: "container",
      containment: "superblock",
      children: [],
      containerType: type || null,
      uiHandler: value,
      uiHandlerArgs: args,
    };

    // and insert the thing
    Transforms.insertNodes(this.editor, containerNode as any);

    // then refocus
    ReactEditor.focus(this.editor);
  };

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
  public formatToggleBold() {
    // if we have a selection and the points are equal
    // basically the same as a collapsed selection
    if (this.editor.selection && Point.equals(this.editor.selection.anchor, this.editor.selection.focus)) {
      // then we insert an empty text node, it will remain alive
      // by virtue of it being the same location as our cursor so
      // normalization won't remove it
      Transforms.insertNodes(
        this.editor,
        {
          ...this.state.currentText,
          text: "",
          bold: !this.state.currentText.bold,
        },
      );
    } else {
      // otherwise we just toggle
      Transforms.setNodes(
        this.editor,
        { bold: !this.state.currentText.bold },
        { match: n => Text.isText(n), split: true }
      );
    }
    // now we need to refocus
    ReactEditor.focus(this.editor);
  }

  /**
   * formats the current text as italic
   */
  public formatToggleItalic() {
    // if we have a selection and the points are equal
    // basically the same as a collapsed selection
    if (this.editor.selection && Point.equals(this.editor.selection.anchor, this.editor.selection.focus)) {
      // then we insert an empty text node, it will remain alive
      // by virtue of it being the same location as our cursor so
      // normalization won't remove it
      Transforms.insertNodes(
        this.editor,
        {
          ...this.state.currentText,
          text: "",
          italic: !this.state.currentText.italic,
        },
      );
    } else {
      // otherwise we just toggle
      Transforms.setNodes(
        this.editor,
        { italic: !this.state.currentText.italic },
        { match: n => Text.isText(n), split: true }
      );
    }

    // now we need to refocus
    ReactEditor.focus(this.editor);
  };

  /**
   * formats the current text as italic
   */
  public formatToggleUnderline() {
    // if we have a selection and the points are equal
    // basically the same as a collapsed selection
    if (this.editor.selection && Point.equals(this.editor.selection.anchor, this.editor.selection.focus)) {
      // then we insert an empty text node, it will remain alive
      // by virtue of it being the same location as our cursor so
      // normalization won't remove it
      Transforms.insertNodes(
        this.editor,
        {
          ...this.state.currentText,
          text: "",
          underline: !this.state.currentText.underline,
        },
      );
    } else {
      // otherwise we just toggle
      Transforms.setNodes(
        this.editor,
        { underline: !this.state.currentText.underline },
        { match: n => Text.isText(n), split: true }
      );
    }
    // now we need to refocus
    ReactEditor.focus(this.editor);
  };

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
      }
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
    } else if ((e.key === "y" && e.ctrlKey) || (e.key === "z" && e.ctrlKey && e.shiftKey)) {
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
    this.setState({
      allContainers: ALL_CONTAINERS,
      allCustom: ALL_CUSTOM,
      allRichClasses: ALL_RICH_CLASSES,
    });
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

      selectPath: this.selectPath,

      deleteSelectedNode: this.deleteSelectedNode,

      focus: this.focus,
      focusAt: this.focusAt,

      formatToggleBold: this.formatToggleBold,
      formatToggleItalic: this.formatToggleItalic,
      formatToggleUnderline: this.formatToggleUnderline,
      insertContainer: this.insertContainer,
      insertCustom: this.insertCustom,
      insertFile: this.insertFile,
      insertImage: this.insertImage,
      insertVideo: this.insertVideo,
      insertTemplateText: this.insertTemplateText,
      insertTemplateHTML: this.insertTemplateHTML,
      toggleLink: this.toggleLink,
      toggleList: this.toggleList,
      toggleQuote: this.toggleQuote,
      toggleTitle: this.toggleTitle,
      setActiveStyle: this.setActiveStyle,
      setContext: this.setContext,
      setForEach: this.setForEach,
      setHoverStyle: this.setHoverStyle,
      setStyle: this.setStyle,
      set: this.set,
      setRichClasses: this.setRichClasses,
      setAction: this.setAction,
      setUIHandler: this.setUIHandler,
      insertUIHandledContainer: this.insertUIHandledContainer,

      blockBlur: this.blockBlur,
      releaseBlur: this.releaseBlur,
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

    // and extend based on the features
    const newFeatureSupport: IAccessibleFeatureSupportOptions = {
      ...this.props.features,

      availableContainers: this.availableFilteringFunction("supportsContainers", "allContainers", "supportedContainers", "containers"),
      availableCustoms: availableCustoms,
      availableRichClasses,

      canInsertContainer: this.state.currentBlockElement && this.props.features.supportsContainers,
      canInsertCustom: this.state.currentBlockElement && this.props.features.supportsCustom && !!availableCustoms.length,
      canInsertFile: this.state.currentBlockElement && this.props.features.supportsFiles,
      canInsertImage: this.state.currentBlockElement && this.props.features.supportsImages,
      canInsertLink: this.state.currentBlockElement && this.props.features.supportsLinks,
      canInsertList: this.state.currentBlockElement && this.props.features.supportsLists,
      canInsertQuote: this.state.currentBlockElement && this.props.features.supportsQuote,
      canInsertRichClass: this.state.currentBlockElement && this.props.features.supportsRichClasses && !!availableRichClasses.length,
      canInsertTitle: this.state.currentText && this.props.features.supportsTitle,
      canInsertVideo: this.state.currentBlockElement && this.props.features.supportsVideos,
      canSetActionFunction: this.state.currentBlockElement && this.props.features.supportsTemplating,
      canSetActiveStyle: this.state.currentBlockElement && this.props.features.supportsTemplating,
      canSetDynamicHref: this.state.currentBlockElement && this.props.features.supportsTemplating,
      canSetHoverStyle: this.state.currentBlockElement && this.props.features.supportsTemplating,
      canSetLoop: this.state.currentBlockElement && this.props.features.supportsTemplating,
      canSetStyle: this.state.currentBlockElement && this.props.features.supportsCustomStyles,
      canSetUIHandler: this.state.currentBlockElement && this.props.features.supportsTemplating,
    };

    return newFeatureSupport;
  }

  /**
   * Render function
   */
  public render() {
    // make the editable
    let children: React.ReactNode = (
      <Editable
        id={this.props.id}
        onKeyDown={this.onKeyDown}
        onBlur={this.onNativeBlur}
        renderElement={this.renderElement}
        renderLeaf={this.renderText}
        placeholder={this.props.placeholder}
      />
    );

    // and pick on the wrapper, hopefully we have one
    // it'd be weird not to have one
    const Wrapper = this.props.Wrapper;

    // if we have a wrapper
    if (Wrapper) {

      // we get the state that we will feed
      const state: ISlateEditorStateType = {
        currentValid: this.props.currentValid,
        isFocused: this.state.focused,
        currentContext: this.state.currentContext,
        currentBlockElement: this.state.currentBlockElement,
        currentSuperBlockElement: this.state.currentSuperBlockElement,
        currentElement: this.state.currentElement,
        currentText: this.state.currentText,
        currentSelectedNode: this.state.currentSelectedNode,
        currentSelectedTextNode: this.state.currentSelectedTextNode,
        currentSelectedTextNodeAnchor: this.state.currentSelectedTextNodeAnchor,
        isRichText: this.props.isRichText,
        currentValue: this.state.internalValue.children as any,
        textAnchor: this.state.currentAnchor,
        currentBlockElementAnchor: this.state.currentBlockElementAnchor,
        currentElementAnchor: this.state.currentElementAnchor,
        currentSuperBlockElementAnchor: this.state.currentSuperBlockElementAnchor,
        currentSelectedNodeAnchor: this.state.currentSelectedNodeAnchor,
      }

      // and we feed the thing in the wrapper as the new children
      // that is now wrapper inside the wrapper
      children = (
        <Wrapper
          {...this.props.wrapperArgs}
          state={state}
          helpers={this.getHelpers()}
          featureSupport={this.getFeatureSupport()}
          currentLoadError={this.props.currentLoadError}
          dismissCurrentLoadError={this.props.dismissCurrentLoadError}
        >
          {children}
        </Wrapper>
      );
    }

    // now we can return
    return (
      <Slate
        editor={this.editor}
        value={this.state.internalValue.children as any}
        onChange={this.onChange}
      >
        {children}
      </Slate>
    );
  }
}
