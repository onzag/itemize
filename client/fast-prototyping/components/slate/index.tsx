import React from "react";
import equals from "deep-equal";
import { createEditor, Transforms, Range, Editor, Element, Node, Path, Text, NodeEntry, Point } from 'slate';
import { Slate, Editable, withReact, ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';

import { IRootLevelDocument, deserialize, SERIALIZATION_REGISTRY, RichElement, deserializePlain } from "../../../internal/text/serializer";
import { CONTAINER_CLASS_PREFIX, countSize, CUSTOM_CLASS_PREFIX, IFeatureSupportOptions, RICH_TEXT_CLASS_PREFIX, serializeString } from "../../../internal/text";
import { LAST_RICH_TEXT_CHANGE_LENGTH } from "../../../../constants";
import uuid from "uuid";
import { IText, STANDARD_TEXT_NODE } from "../../../internal/text/serializer/text";
import { IInsertedFileInformationType } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import { copyElementBase } from "../../../internal/text/serializer/base";
import { IImage } from "../../../internal/text/serializer/image";
import { IFile } from "../../../internal/text/serializer/file";
import { IVideo } from "../../../internal/text/serializer/video";
import { mimeTypeToExtension } from "../../../../util";
import prettyBytes from "pretty-bytes";
import { IContainer } from "../../../internal/text/serializer/container";

interface ITemplateArg {
  type: "text" | "link" | "html" | "ui-handler" | "function";
  label: string;

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
 * Represents the vailable args in the context
 */
export interface ITemplateArgsContext {
  type: "context";
  loopable?: boolean;
  properties: {
    [name: string]: ITemplateArg | ITemplateArgsContext;
  };
}

/**
 * Represents a custom set of classes that are avaliable
 * for the creation of the custom element
 */
export interface ITemplateArgsClasses {
  rich?: IAvailableElement[];
  custom?: IAvailableElement[];
  container?: IAvailableElement[];
  baseContainer?: IAvailableElement;
}

interface IAvailableElement {
  value: string;
  label: string;
}

let ALL_CONTAINERS: string[] = [];
let ALL_CUSTOM: string[] = [];
let ALL_RICH_CLASSES: string[] = [];
let ALL_IS_LOADED: boolean = false;

function calculateStylesheet(stylesheet: CSSStyleSheet) {
  Array.from(stylesheet.cssRules).forEach((r) => {
    const selectorSplitted = ((r as any).selectorText as string || r.cssText.split("{")[0].trim()).split(" ");
    selectorSplitted.forEach((s) => {
      if (s[0] !== ".") {
        return;
      }

      const className = s.substr(1);
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

// we are going to build a promise
// for retrieving the available classes for the rich
// text editor
const ALL_PROMISE = new Promise(async (resolve) => {
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
  availableRichClasses: IAvailableElement[];
  /**
   * The customs that are available
   */
  availableCustoms: IAvailableElement[];
  /**
   * The classes that are available for the containers
   */
  availableContainers: IAvailableElement[];
}

export interface IHelperFunctions {
  editor: ReactEditor;
  ReactEditor: typeof ReactEditor;
  Transforms: typeof Transforms;
  Range: typeof Range;

  /**
   * performs a pseudo selection at a given path
   */
  selectPath: (path: Path) => void;

  /**
   * Deletes the given node at the given path
   */
  deleteSelectedNode: () => void;

  /**
   * focuses the element
   */
  focus: () => void;
  /**
   * Focuses at the desired location
   */
  focusAt: (at: Range) => void;

  /**
   * Will insert an image based on a given file that has
   * been taken as an input
   * @param file the file
   * @param standalone whether to make it a standalone image
   */
  insertImage: (file: File, standalone: boolean, at?: Range) => void;
  /**
   * Will insert a video given the information
   * @param url the url of the video, only youtube and vimeo supported as origin
   * @returns a boolean true if the video was properly inserted, false if the video url was invalid
   */
  insertVideo: (url: string, at?: Range) => boolean;
  /**
   * Will insert a file based on the information given
   * @param file the file to insert
   */
  insertFile: (file: File, at?: Range) => void;
  /**
   * Will insert a container at the given location
   * @param type optional, the container type, otherwise will
   * insert a standard container
   */
  insertContainer: (type?: string, at?: Range) => void;
  /**
   * Inserts a custom element
   */
  insertCustom: (type: string, at?: Range) => void;
  /**
   * Inserts a template text
   */
  insertTemplateText: (label: string, value: string, at?: Range) => void;

  /**
   * Makes a quote out of the current element
   */
  toggleQuote: (at?: Range) => void;
  /**
   * Makes a title out of the current element
   */
  toggleTitle: (type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6", at?: Range) => void;
  /**
   * Makes a list out of the current element
   */
  toggleList: (type: "bulleted" | "numbered", at?: Range) => void;
  /**
   * Makes a link out of the current element
   */
  toggleLink: (url: string, templateValue: string, at?: Range) => boolean;

  /**
   * Sets the current style for the element
   */
  setStyle: (style: string, anchor: Path) => void;
  /**
   * Sets the template hover style for the element
   */
  setHoverStyle: (style: string, anchor: Path) => void;
  /**
   * Sets the active style for the element
   */
  setActiveStyle: (style: string, anchor: Path) => void;
  /**
   * Sets the context key
   */
  setContext: (key: string, anchor: Path) => void;
  /**
   * Sets the for-each loop key
   */
  setForEach: (key: string, anchor: Path) => void;
  /**
   * Sets all the rich classes
   */
  setRichClasses: (list: string[], anchor: Path) => void;
  /**
   * Sets an action key
   */
  setAction: (key: string, value: string, anchor: Path) => void;

  /**
   * Formats the current text as bold
   */
  formatToggleBold: () => void;
  /**
   * formats the current text as italic
   */
  formatToggleItalic: () => void;
  /**
   * formats to underline
   */
  formatToggleUnderline: () => void;

  /**
   * cancels the field from blurring
   */
  blockBlur: () => void;
  /**
   * releases the blur
   */
  releaseBlur: () => void;
}

export interface ISlateEditorInfoType {
  /**
   * Whether it is curently focused
   */
  isFocused: boolean;
  /**
   * Whether it is rich text
   */
  isRichText: boolean;
  /**
   * Whether the current value is valid
   */
  currentValid: boolean;
  /**
   * The current element being worked with
   */
  currentElement: RichElement;
  /**
   * The current element (block type)
   */
  currentBlock: RichElement;
  /**
   * The current super block (superblock type)
   */
  currentSuperBlock: RichElement;
  /**
   * The current text being worked with
   */
  currentText: IText;
  /**
   * The current pseudo element being worked with
   * normally equal to the current text unless selected
   * against
   */
  currentSelectedNode: RichElement | IText;
  /**
   * The text node that originated the selected node
   * path
   */
  currentSelectedNodeOrigin: IText;
  /**
   * The anchor that such node implies
   */
  selectedOriginAnchor: Path;

  // Templating specific
  /**
   * The current templating context
   */
  currentContext: ITemplateArgsContext;
  /**
   * The current value
   */
  currentValue: Node[];
  /**
   * The current path followed, text path for the current text
   */
  textAnchor: Path;
  /**
   * The current path followed, for element
   */
  elementAnchor: Path;
  /**
   * The current path followed for block
   */
  blockAnchor: Path;
  /**
   * The current path followed for super block
   */
  superBlockAnchor: Path;
  /**
   * Selected anchor
   */
  selectedAnchor: Path;
}

export interface ISlateEditorWrapperBaseProps {
  info: ISlateEditorInfoType;
  featureSupport: IAccessibleFeatureSupportOptions;
  helpers: IHelperFunctions;
  children: React.ReactNode;
  /**
   * A current error, translated
   */
  currentLoadError: string;
  /**
   * Dismiss the current load error
   */
  dismissCurrentLoadError: () => void;
}

interface ISlateEditorProps {
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
   * Extra wrapper arguments to pass to the wrapper
   */
  wrapperArgs?: any;
  /**
   * The list of standard features that are supported
   * according to the definition
   */
  features: IFeatureSupportOptions,
  /**
   * The value as html or plain text
   */
  value: string;
  /**
   * whether the current value is valid
   */
  currentValid: boolean;
  /**
   * A current error, translated
   */
  currentLoadError: string;
  /**
   * Dismiss the current load error
   */
  dismissCurrentLoadError: () => void;
  /**
   * The root context, can be null if no context
   */
  rootContext: ITemplateArgsContext;
  /**
   * The root i18n
   */
  rootI18n: any;
  /**
   * Whether the value represents rich text
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
   * Triggers on change
   */
  onChange: (value: string, internalValue: IRootLevelDocument) => void;
  /**
   * Triggers on focus
   */
  onFocus: () => void;
  /**
   * Triggers on blur
   */
  onBlur: () => void;
  /**
   * Function that usually comes from the handler and is provided via the renderer
   * directly to this in order to handle file insertions into the media property
   */
  onInsertFile: (file: File, isExpectingImage?: boolean) => Promise<IInsertedFileInformationType>;
}

interface ISlateEditorState {
  /**
   * The actual internal value that slate is
   * using
   */
  internalValue: IRootLevelDocument;
  /**
   * Whether the internal value is synced or should be synced
   */
  synced: boolean;
  /**
   * Whether it is currently focused
   */
  focused: boolean;
  /**
   * The current anchor, null if not focused
   */
  anchor: Path;
  /**
   * The current element anchor
   */
  elementAnchor: Path;
  /**
   * The current block anchor
   */
  blockAnchor: Path;
  /**
   * The current super block anchor
   */
  superBlockAnchor: Path;
  /**
   * The selected anchor path
   */
  selectedAnchor: Path;
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
  currentBlock: RichElement;
  /**
   * current super block element
   */
  currentSuperBlock: RichElement;
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
  currentSelectedNodeOrigin: IText;
  /**
   * The selected node
   */
  selectedOriginAnchor: Path;
  /**
   * available containers
   */
  allContainers: string[];
  /**
   * available containers
   */
  allCustom: string[];
  /**
   * available rich class
   */
  allRichClasses: string[];
}

export class SlateEditor extends React.Component<ISlateEditorProps, ISlateEditorState> {
  private editor: ReactEditor;
  private updateTimeout: NodeJS.Timeout;
  private blurTimeout: NodeJS.Timeout;
  private blurBlocked: boolean = false;
  private ignoreCurrentLocationToRemoveEmpty: boolean = false;
  private lastChangeWasSelectedDelete: boolean = false;

  static getDerivedStateFromProps(props: ISlateEditorProps, state: ISlateEditorState) {
    if (state.synced) {
      if (props.internalValue) {
        if (!state.internalValue || props.internalValue.id !== state.internalValue.id) {
          return {
            internalValue: props.internalValue,
          };
        }
      } else {
        return {
          internalValue: props.isRichText ? deserialize(props.value, state.internalValue) : deserializePlain(props.value, state.internalValue),
        };
      }
    }

    return null;
  }
  constructor(props: ISlateEditorProps) {
    super(props);

    this.state = {
      internalValue: props.internalValue || (props.isRichText ? deserialize(props.value) : deserializePlain(props.value)),
      synced: true,
      focused: false,
      anchor: null,
      elementAnchor: null,
      blockAnchor: null,
      superBlockAnchor: null,
      selectedAnchor: null,
      currentContext: this.props.rootContext || null,
      currentElement: null,
      currentBlock: null,
      currentSuperBlock: null,
      currentText: null,
      currentSelectedNode: null,
      currentSelectedNodeContext: null,
      currentSelectedNodeOrigin: null,
      selectedOriginAnchor: null,

      // ensure SSR compatibility
      allContainers: [],
      allCustom: [],
      allRichClasses: [],
    }

    const rawEditor = createEditor();
    this.editor = withReact(rawEditor);

    this.normalizeNode = this.normalizeNode.bind(this);
    this.insertBreak = this.insertBreak.bind(this);
    this.insertSuperblockBreak = this.insertSuperblockBreak.bind(this);
    this.deleteBackward = this.deleteBackward.bind(this);
    this.deleteForward = this.deleteForward.bind(this);

    this.editor.isInline = this.isInline as any;
    this.editor.isVoid = this.isVoid as any;
    this.editor.normalizeNode = this.normalizeNode;
    this.editor.insertBreak = this.insertBreak;
    this.editor.deleteBackward = this.deleteBackward;

    this.deleteSelectedNode = this.deleteSelectedNode.bind(this);
    this.setValue = this.setValue.bind(this);
    this.renderElement = this.renderElement.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderText = this.renderText.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onNativeBlur = this.onNativeBlur.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.selectPath = this.selectPath.bind(this);
    this.focus = this.focus.bind(this);
    this.insertImage = this.insertImage.bind(this);
    this.insertVideo = this.insertVideo.bind(this);
    this.insertFile = this.insertFile.bind(this);
    this.insertTemplateText = this.insertTemplateText.bind(this);
    this.insertContainer = this.insertContainer.bind(this);
    this.insertCustom = this.insertCustom.bind(this);
    this.toggleQuote = this.toggleQuote.bind(this);
    this.toggleTitle = this.toggleTitle.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.toggleLink = this.toggleLink.bind(this);
    this.setStyle = this.setStyle.bind(this);
    this.setHoverStyle = this.setHoverStyle.bind(this);
    this.setActiveStyle = this.setActiveStyle.bind(this);
    this.setRichClasses = this.setRichClasses.bind(this);
    this.setContext = this.setContext.bind(this);
    this.setForEach = this.setForEach.bind(this);
    this.formatToggleBold = this.formatToggleBold.bind(this);
    this.formatToggleItalic = this.formatToggleItalic.bind(this);
    this.formatToggleUnderline = this.formatToggleUnderline.bind(this);
    this.setAction = this.setAction.bind(this);

    this.availableFilteringFunction = this.availableFilteringFunction.bind(this);
    this.calculateAnchorsAndContext = this.calculateAnchorsAndContext.bind(this);

    this.blockBlur = this.blockBlur.bind(this);
    this.releaseBlur = this.releaseBlur.bind(this);
  }
  public checkShouldMerge(n1: Node, n2: Node) {
    return Object.keys(n1).concat(Object.keys(n2)).every((key) => {
      if (key === "children" || key === "text") {
        return true;
      }

      return equals(n1[key], n2[key]);
    });
  }
  public normalizeNode(entry: NodeEntry<Node>) {
    const [node, path] = entry;

    // if it's the editor itself
    if (Editor.isEditor(node)) {
      if (node.children.length === 0) {
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
            !(Element.isElement(prev) && this.editor.isInline(prev) && !next)
          ) {
            // delete it
            Transforms.delete(this.editor, { at: path.concat(n) });
            n--;
            totalNodes--;
            managedChildrenExistance[i] = false;
          }
        } else if (Element.isElement(current) && this.editor.isInline(current)) {
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

          if (!next) {
            const lastText = (current as any).children[(current as any).children.length - 1];
            Transforms.insertNodes(
              this.editor,
              {
                bold: false,
                italic: false,
                underline: false,
                ...copyElementBase(lastText),
                templateText: null,
                text: "",
              },
              { at: path.concat(n + 1) }
            );
          }
        }

        // one more
        n++;
      }

      const nodeAsRichElement = (node as any as RichElement);

      // now if we have a children that can only have inline as children types
      if (nodeAsRichElement.containment === "block") {
        const newNode = Node.get(this.editor, path);
        let offset = 0;
        for (let i = 0; i < (newNode.children as any).length; i++) {
          const child = newNode.children[i];
          if (Element.isElement(child) && !this.editor.isInline(child)) {
            Transforms.unwrapNodes(this.editor, { at: path.concat(i + offset) });
            offset += child.children.length - 1;
          }
        }
        if ((newNode.children as any).length === 0) {
          Transforms.insertNodes(this.editor,
            STANDARD_TEXT_NODE,
            { at: path.concat(0) }
          );
        }
      } else if (nodeAsRichElement.containment === "inline") {
        const newNode = Node.get(this.editor, path);
        let offset = 0;
        for (let i = 0; i < (newNode.children as any).length; i++) {
          const child = newNode.children[i];
          if (Element.isElement(child)) {
            Transforms.unwrapNodes(this.editor, { at: path.concat(i + offset) });
            offset += child.children.length - 1;
          }
        }
        if ((newNode.children as any).length === 0) {
          Transforms.insertNodes(this.editor,
            STANDARD_TEXT_NODE,
            { at: path.concat(0) }
          );
        }
      } else if (nodeAsRichElement.containment === "superblock") {
        const newNode = Node.get(this.editor, path);
        for (let i = 0; i < (newNode.children as any).length; i++) {
          const child = newNode.children[i];
          if (Text.isText(child)) {
            Transforms.wrapNodes(this.editor, { type: "paragraph", containment: "block", children: [] }, { at: path.concat(i) });
          }
        }

        if ((newNode.children as any).length === 0) {
          Transforms.insertNodes(this.editor,
            { type: "paragraph", containment: "block", children: [STANDARD_TEXT_NODE] },
            { at: path.concat(0) }
          );
        }
      } else if (nodeAsRichElement.containment === "list-item") {
        const newNode = Node.get(this.editor, path);
        let offset = 0;
        for (let i = 0; i < (newNode.children as any).length; i++) {
          const child = newNode.children[i] as any as RichElement;
          if (Element.isElement(child) && child.containment === "list-item") {
            Transforms.unwrapNodes(this.editor, { at: path.concat(i + offset) });
            offset += child.children.length - 1;
          } else if (Text.isText(child) || child.type !== "list-item") {
            Transforms.wrapNodes(this.editor, { type: "list-item", containment: "block", children: [] }, { at: path.concat(i + offset) });
          }
        }
        if ((newNode.children as any).length === 0) {
          Transforms.insertNodes(this.editor,
            { type: "list-item", containment: "block", children: [STANDARD_TEXT_NODE] },
            { at: path.concat(0) }
          );
        }
      }
    }
  }
  public isInline(element: RichElement) {
    return element.containment === "inline" || element.containment === "void-inline";
  }
  public isVoid(element: RichElement) {
    if (element.uiHandler) {
      return true;
    }
    return element.containment === "void-block" || element.containment === "void-inline";
  }
  public breakList() {
    const lastIndex = this.state.blockAnchor.length - 1;
    const lastNumber = this.state.blockAnchor[lastIndex];
    const hasChildrenNext = lastNumber < this.state.currentSuperBlock.children.length - 1;

    const lastChildren = [...this.state.blockAnchor];
    lastChildren[lastChildren.length - 1] = this.state.currentSuperBlock.children.length - 1;

    const nextSuperAnchor = [...this.state.superBlockAnchor];
    const lastSuperAnchorIndex = nextSuperAnchor.length - 1;
    nextSuperAnchor[lastSuperAnchorIndex] = nextSuperAnchor[lastSuperAnchorIndex] + 1;

    if (lastNumber === 0) {
      Transforms.removeNodes(this.editor, { at: this.state.superBlockAnchor });
      nextSuperAnchor[lastSuperAnchorIndex]--;
    } else {
      Transforms.removeNodes(this.editor, {
        at: {
          anchor: Editor.start(this.editor, this.state.blockAnchor),
          focus: Editor.end(this.editor, lastChildren)
        }
      });
    }

    if (hasChildrenNext) {
      Transforms.insertNodes(
        this.editor,
        {
          ...copyElementBase(this.state.currentSuperBlock),
          type: "list",
          containment: "list-item",
          listType: (this.state.currentSuperBlock as any).listType,
          children: (this.state.currentSuperBlock.children.slice(lastNumber + 1) as any as Node[]),
        },
        {
          at: nextSuperAnchor,
        },
      );
    }

    Transforms.insertNodes(
      this.editor,
      {
        ...copyElementBase(this.state.currentSuperBlock),
        type: "paragraph",
        containment: "block",
        children: this.state.currentBlock.children as any,
      },
      {
        at: nextSuperAnchor,
      },
    );

    Transforms.setSelection(
      this.editor,
      {
        anchor: Editor.start(this.editor, nextSuperAnchor),
        focus: Editor.start(this.editor, nextSuperAnchor),
      }
    );
  }
  public insertBreak() {
    if (
      Range.isCollapsed(this.editor.selection) &&
      this.state.currentSuperBlock.type === "list" &&
      this.state.currentBlock.type === "list-item" &&
      this.state.currentBlock.children.length === 1 &&
      Text.isText(this.state.currentBlock.children[0]) &&
      this.state.currentBlock.children[0].text === ""
    ) {
      this.breakList();
      return;
    }

    const end = Range.end(this.editor.selection);
    const finalBlockPath: Path = [...this.state.blockAnchor];
    let lastChild: Node;
    do {
      const lastPoint = this.state.currentBlock.children.length - 1;
      lastChild = this.state.currentBlock.children[lastPoint] as any as Node;
      finalBlockPath.push(lastPoint);
    } while (Element.isElement(lastChild));
    const finalBlockOffset = lastChild.text.length;

    if (
      end.offset === finalBlockOffset &&
      Path.equals(finalBlockPath, end.path)
    ) {
      Transforms.insertNodes(this.editor, {
        ...this.state.currentBlock,
        children: [
          {
            ...this.state.currentText,
            text: "",
            templateText: null,
          }
        ]
      });
    } else {
      Transforms.splitNodes(this.editor, { always: true })
    }
  }
  public insertSuperblockBreak() {
    if (
      this.state.currentSuperBlock
    ) {
      const superBlockAnchor = this.state.superBlockAnchor;
      const nextAnchor = [...superBlockAnchor];
      nextAnchor[superBlockAnchor.length - 1]++;

      Transforms.insertNodes(this.editor, {
        ...this.state.currentBlock,
        children: [
          {
            ...this.state.currentText,
            text: "",
            templateText: null,
          }
        ]
      }, { at: nextAnchor });

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
  public deleteBackward(unit: "character" | "word" | "line" | "block") {
    const { selection } = this.editor

    if (
      selection &&
      Range.isCollapsed(this.editor.selection) &&
      this.state.currentSuperBlock &&
      this.state.currentSuperBlock.type === "list" &&
      this.state.currentBlock.type === "list-item" &&
      (
        (
          (unit === "character" || unit === "word") &&
          this.state.currentBlock.children.length === 1 &&
          Text.isText(this.state.currentBlock.children[0]) &&
          this.state.currentBlock.children[0].text === ""
        ) ||
        (
          unit === "line" || unit == "block"
        )
      )
    ) {
      this.breakList();
    } else if (selection && Range.isCollapsed(selection)) {
      this.ignoreCurrentLocationToRemoveEmpty = true;
      Transforms.delete(this.editor, { unit, reverse: true });
      this.ignoreCurrentLocationToRemoveEmpty = false;
    }
  }
  public deleteForward(unit: "character" | "word" | "line" | "block") {

  }
  public calculateAnchorsAndContext(anchor: Path, value?: Node[], selectedAnchorAndOrigin?: [Path, Path]) {
    // first we set up all the basics to their null value
    let currentContext: ITemplateArgsContext = null;
    let currentElement: RichElement = null;
    let elementAnchor: Path = null;
    let currentBlock: RichElement = null;
    let blockAnchor: Path = null;
    let currentSuperBlock: RichElement = null;
    let superBlockAnchor: Path = null;
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
      elementAnchor = [...anchor];
      elementAnchor.pop();
      // the block and superblock need to be calculated
      blockAnchor = [];
      superBlockAnchor = [];

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
            currentBlock = currentElement;
            blockAnchor.push(n);
          }

          // if we have a superblock or list-item element that contains lists
          if (currentElement.containment === "superblock" || currentElement.containment === "list-item") {
            currentSuperBlock = currentElement;
            superBlockAnchor.push(n);
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
    }

    // now for our selection, by default it's all null
    let selectedAnchor: Path = null;
    let currentSelectedNode: RichElement | IText = null;
    let currentSelectedNodeOrigin: IText = null;
    let selectedOriginAnchor: Path = null;
    let currentSelectedNodeContext: ITemplateArgsContext = null;

    // if we don't have a selected anchor and origin
    // we have purposely set then we should
    // default to the currently selected values, if any
    if (!selectedAnchorAndOrigin) {
      // so the selected anchor will be the element anchor
      selectedAnchor = elementAnchor;
      // the origin will be made on the text
      currentSelectedNodeOrigin = currentText;
      // the origin anchor will be the text anchor
      selectedOriginAnchor = anchor;
      // the selected node is the element just like the anchor
      currentSelectedNode = currentElement;
      // and the context is our current context
      currentSelectedNodeContext = currentContext;
      // if we have a text element that is templatizeable, then
      // that will be our new selected node and anchor
      if (currentText && currentText.templateText) {
        selectedAnchor = anchor;
        currentSelectedNode = currentText;
      }
    } else {
      // otherwise here, we are going to pick and trust
      // the values we are given, the anchors
      // are the these values
      selectedAnchor = selectedAnchorAndOrigin[0];
      selectedOriginAnchor = selectedAnchorAndOrigin[1];

      // now we need to prepare and find the text origin, and context
      // as well as the selected element
      currentSelectedNodeOrigin = value ? {
        children: value,
      } as any : this.state.internalValue;
      currentSelectedNodeContext = this.props.rootContext || null;

      // so we loop in the origin anchor
      selectedOriginAnchor.forEach((n: number, index: number) => {
        // and update the node origin
        currentSelectedNodeOrigin = (currentSelectedNodeOrigin as any).children[n];

        // if it's our last value from the selected anchor, which should
        // be contained in the origin
        if (index === selectedAnchor.length - 1) {
          // then that's our node
          currentSelectedNode = currentSelectedNodeOrigin;
        }

        // if we are still within the selected anchor
        if (index < selectedAnchor.length) {
          // we need to fetch the context we are in for the currentSelectedNodeContext
          // which might differ
          if (currentSelectedNodeContext && (currentSelectedNodeOrigin as any).context) {
            // so we pick it from the origin value we are using to loop in
            currentSelectedNodeContext =
              currentSelectedNodeContext.properties[(currentSelectedNodeOrigin as any).context] as ITemplateArgsContext || null;

            // and then we recheck these
            if (currentSelectedNodeContext.type !== "context" || currentSelectedNodeContext.loopable) {
              currentSelectedNodeContext = null;
            }
          }

          // also in the foreach context
          if (currentSelectedNodeContext && (currentSelectedNodeOrigin as any).forEach) {
            currentSelectedNodeContext = currentSelectedNodeContext.properties[(currentSelectedNodeOrigin as any).forEach] as ITemplateArgsContext || null;
            if (currentSelectedNodeContext.type !== "context" || !currentSelectedNodeContext.loopable) {
              currentSelectedNodeContext = null;
            }
          }
        }
      });
    }

    return {
      anchor,
      elementAnchor,
      blockAnchor,
      selectedAnchor,
      currentContext,
      currentElement,
      currentBlock,
      currentSuperBlock,
      superBlockAnchor,
      currentText,
      currentSelectedNode,
      currentSelectedNodeContext,
      currentSelectedNodeOrigin,
      selectedOriginAnchor,
    }
  }
  public onFocus(anchor: Path, value: Node[]) {
    this.setState(this.calculateAnchorsAndContext(anchor, value));
    if (!this.state.focused) {
      this.props.onFocus && this.props.onFocus();
      this.setState({
        focused: true,
      });
    }
  }
  public onBlur(value: Node[]) {
    if (this.state.focused) {
      this.props.onBlur && this.props.onBlur();
    }

    const anchorData = this.calculateAnchorsAndContext(null, value, this.state.selectedAnchor && !this.lastChangeWasSelectedDelete ? [
      this.state.selectedAnchor,
      this.state.selectedOriginAnchor,
    ] : null)
    this.setState({
      focused: false,
      ...anchorData,
    });
  }
  public onNativeBlur() {
    if (this.state.focused && !this.blurBlocked) {
      this.blurTimeout = setTimeout(this.onBlur, 70);
    }
    return false;
  }
  public shouldComponentUpdate(nextProps: ISlateEditorProps, nextState: ISlateEditorState) {
    const standardUpdate = (
      nextProps.currentValid !== this.props.currentValid ||
      nextState.focused !== this.state.focused ||
      nextProps.Wrapper !== this.props.Wrapper ||
      nextProps.isRichText !== this.props.isRichText ||
      nextProps.rootContext !== this.props.rootContext ||
      nextProps.rootI18n !== this.props.rootI18n ||
      nextState.anchor !== this.state.anchor ||
      nextState.selectedAnchor !== this.state.selectedAnchor ||
      nextProps.currentLoadError !== this.props.currentLoadError ||
      !equals(this.state.allContainers, nextState.allContainers) ||
      !equals(this.state.allCustom, nextState.allCustom) ||
      !equals(this.state.allRichClasses, nextState.allRichClasses) ||
      !equals(nextProps.wrapperArgs, this.props.wrapperArgs) ||
      !equals(nextProps.features, this.props.features)
    )
    if (standardUpdate) {
      return true;
    }

    if (nextProps.internalValue && nextState.synced) {
      return nextProps.internalValue.id !== this.state.internalValue.id;
    }

    return true;
  }
  public setValue(v: any) {
    const newRootDocument: IRootLevelDocument = {
      id: uuid.v4(),
      type: "document",
      rich: this.state.internalValue.rich,
      children: v,
    };
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
  public renderElement(props: RenderElementProps) {
    const { attributes, children, element } = props;

    const isSelected = (
      (element as any) === this.state.currentBlock ||
      (element as any) === this.state.currentElement ||
      (element as any) === this.state.currentSuperBlock
    );

    const uiHandler = (element as any as RichElement).uiHandler;
    if (uiHandler) {
      const uiHandlerArgs = (element as any as RichElement).uiHandlerArgs;

      const propertiesFromContext =
        this.state.currentContext.properties[uiHandler] ||
        this.props.rootContext.properties[uiHandler];

      if (
        !propertiesFromContext ||
        propertiesFromContext.type !== "ui-handler" ||
        !propertiesFromContext.handler
      ) {
        return (
          <div>
            <span>{`UI Handled [${uiHandler}]`}</span>
            <span>You are missing a handler descrption for the given UI Handler as such it can't be rendered</span>
          </div>
        );
      }
      const HandlerComponent = propertiesFromContext.handler;
      const handlerExtraArgs = propertiesFromContext.handlerExtraArgs;
      const passExtraInfo = propertiesFromContext.handlerPassSlateInfo;

      const extraInfoArgs = passExtraInfo ?
        {
          helpers: this.getHelpers(),
          selected: isSelected,
        } : {};

      return (
        <HandlerComponent
          {...uiHandlerArgs}
          {...handlerExtraArgs}
          {...extraInfoArgs}
        />
      );
    }

    let className: string = null;
    if (isSelected) {
      className = "selected";
    }

    return SERIALIZATION_REGISTRY.REACTIFY[element.type as string](element as any, false, { ...attributes, children, className }) as any;
  }
  public renderText(props: RenderLeafProps) {
    const { attributes, children, leaf } = props;
    return SERIALIZATION_REGISTRY.REACTIFY.text(leaf as any, false, { ...attributes, children }) as any;
  }
  public onChange(newValue: Node[]) {
    clearTimeout(this.blurTimeout);
    if (this.editor.selection) {
      this.onFocus(this.editor.selection.anchor.path, newValue);
    } else {
      this.onBlur(newValue);
    }

    this.lastChangeWasSelectedDelete = false;

    if (newValue !== this.state.internalValue.children as any) {
      this.setValue(newValue);
    }
  }
  public blockBlur() {
    clearTimeout(this.blurTimeout);
    this.blurBlocked = true;
  }
  public releaseBlur() {
    this.blurBlocked = false;
  }

  public selectPath(selectPath: Path) {
    let finalNode: any = this.state.internalValue;
    selectPath.forEach((v) => {
      finalNode = finalNode.children[v];
    });
    this.setState({
      selectedAnchor: selectPath,
      currentSelectedNode: finalNode,
    });
  }

  public deleteSelectedNode() {
    this.lastChangeWasSelectedDelete = true;

    Transforms.delete(this.editor, {
      at: this.state.selectedAnchor,
    });

    ReactEditor.focus(this.editor);
  };

  public focus() {
    ReactEditor.focus(this.editor);
  }

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
   * @param file the file
   * @param standalone whether to make it a standalone image
   * @param at a range to insert it at
   */
  public async insertImage(file: File, standalone: boolean, at?: Range): Promise<void> {
    try {
      const data = await this.props.onInsertFile(file, true);

      if (at) {
        await this.focusAt(at);
      }

      if (!data) {
        // soething went wrong there should be an error in the state
        return;
      }

      const imageNode: IImage = {
        type: "image",
        containment: "void-block",
        alt: null,
        children: [
          {
            bold: false,
            italic: false,
            templateText: null,
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

      this.editor.insertNode(imageNode as any);
    } catch (err) {
    }
  }
  public async insertTemplateText(label: string, value: string, at?: Range) {
    if (at) {
      await this.focusAt(at);
    }
    const textNode: IText = {
      ...this.state.currentText,
      text: label,
      templateText: value,
    }

    this.editor.insertNode(textNode as any);
  }
  /**
   * Will insert a video given the information
   * @param url the url of the video
   * @param at a partial range to insert at
   */
  public insertVideo(url: string, at?: Range): boolean {
    const parsedURL = new URL(url);
    let src: string;
    let origin: string;
    let status: boolean = false;

    if (
      parsedURL.hostname === "youtube.com" ||
      parsedURL.hostname === "www.youtube.com" ||
      parsedURL.hostname === "youtu.be"
    ) {
      origin = "youtube";
      const isClassicYTUrl = (
        parsedURL.hostname === "youtube.com" ||
        parsedURL.hostname === "www.youtube.com"
      );
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

      status = true;
    } else if (
      parsedURL.host === "player.vimeo.com"
    ) {
      origin = "vimeo";
      src = parsedURL.pathname.split("/")[2];
      status = true
    }

    (async () => {
      if (at) {
        await this.focusAt(at);
      }
      if (status) {
        const videoNode: IVideo = {
          type: "video",
          containment: "void-block",
          children: [
            {
              bold: false,
              italic: false,
              templateText: null,
              text: "",
              underline: false,
            }
          ],
          origin: origin as any,
          src,
        }

        this.editor.insertNode(videoNode as any);
      }
    })();

    return status;
  };
  /**
   * Will insert a file based on the information given
   * @param file the file to insert
   * @param at a partial range to insert at
   */
  public async insertFile(file: File, at?: Range) {
    try {
      const data = await this.props.onInsertFile(file, false);

      if (at) {
        await this.focusAt(at);
      }

      if (!data) {
        // soething went wrong there should be an error in the state
        return;
      }

      const fileNode: IFile = {
        type: "file",
        containment: "void-inline",
        children: [
          {
            bold: false,
            italic: false,
            templateText: null,
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

      this.editor.insertNode(fileNode as any);
    } catch (err) {
    }
  };
  /**
   * Will insert a container at the given location
   * @param type optional, the container type, otherwise will
   * insert a standard container
   */
  public async insertContainer(type?: string, at?: Range) {
    if (at) {
      await this.focusAt(at);
    }

    Transforms.insertNodes(this.editor, {
      ...this.state.currentBlock,
      children: [
        {
          ...this.state.currentText,
          text: "",
          templateText: null,
        }
      ]
    });

    const containerNode: IContainer = {
      type: "container",
      containment: "superblock",
      children: [],
      containerType: type || null,
    };

    Transforms.wrapNodes(this.editor, containerNode as any);

    ReactEditor.focus(this.editor);
  };
  /**
   * Inserts a custom element
   */
  public insertCustom(type: string, at?: Range) {

  };

  /**
   * Makes a quote out of the current element
   */
  public async toggleQuote(at?: Range) {
    if (at) {
      await this.focusAt(at);
    }

    const isCollapsed = Range.isCollapsed(at || this.editor.selection);
    const anchorData = at ? this.calculateAnchorsAndContext(at.anchor.path) : this.state;
    if (anchorData.currentBlock.type === "quote") {
      Transforms.wrapNodes(
        this.editor,
        {
          ...copyElementBase(anchorData.currentBlock),
          type: "paragraph",
          containment: "block",
          children: [],
        },
        { split: !isCollapsed, at: isCollapsed ? anchorData.blockAnchor : undefined },
      );
    } else {
      Transforms.wrapNodes(
        this.editor,
        {
          ...copyElementBase(anchorData.currentBlock),
          type: "quote",
          containment: "block",
          children: [],
        },
        { split: !isCollapsed, at: isCollapsed ? anchorData.blockAnchor : undefined },
      );
    }
    ReactEditor.focus(this.editor);
  };
  /**
   * Makes a title out of the current element
   */
  public async toggleTitle(type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6", at?: Range) {
    if (at) {
      await this.focusAt(at);
    }

    const isCollapsed = Range.isCollapsed(at || this.editor.selection);
    const anchorData = at ? this.calculateAnchorsAndContext(at.anchor.path) : this.state;

    if (anchorData.currentBlock.type === "title" && anchorData.currentBlock.subtype === type) {
      Transforms.wrapNodes(
        this.editor,
        {
          ...copyElementBase(anchorData.currentBlock),
          type: "paragraph",
          containment: "block",
          children: [],
        },
        { split: !isCollapsed, at: isCollapsed ? anchorData.blockAnchor : undefined },
      );
    } else {
      Transforms.wrapNodes(
        this.editor,
        {
          ...copyElementBase(anchorData.currentBlock),
          type: "title",
          containment: "block",
          subtype: type,
          children: [],
        },
        { split: !isCollapsed, at: isCollapsed ? anchorData.blockAnchor : undefined },
      );
    }
    ReactEditor.focus(this.editor);
  };
  /**
   * Makes a list out of the current element
   */
  public async toggleList(type: "bulleted" | "numbered", at?: Range) {
    if (at) {
      await this.focusAt(at);
    }

    const isCollapsed = Range.isCollapsed(at || this.editor.selection);
    const anchorData = at ? this.calculateAnchorsAndContext(at.anchor.path) : this.state;

    if (anchorData.currentSuperBlock && anchorData.currentSuperBlock.type === "list") {
      if (anchorData.currentSuperBlock.listType !== type) {
        Transforms.wrapNodes(
          this.editor,
          {
            ...copyElementBase(anchorData.currentSuperBlock),
            type: "list",
            listType: type,
            containment: "list-item",
            children: [],
          },
          { split: false, at: anchorData.superBlockAnchor },
        );
      } else {
        this.breakList();
      }
    } else {
      Transforms.wrapNodes(
        this.editor,
        {
          ...copyElementBase(anchorData.currentBlock),
          type: "list",
          listType: type,
          containment: "list-item",
          children: [],
        },
        { split: !isCollapsed, at: isCollapsed ? anchorData.blockAnchor : undefined },
      );
    }
    ReactEditor.focus(this.editor);
  };
  /**
   * Makes a link out of the current element
   */
  public toggleLink(url: string, tvalue: string, at?: Range): boolean {
    if (!this.props.features.supportsLinks) {
      return false;
    }

    let urlToUse: string = url;
    if (!tvalue && url) {
      try {
        const urlParsed = new URL(url);
        const isLocal = urlParsed.hostname === location.hostname;
        const onlyLocal = !this.props.features.supportsExternalLinks;
        if (onlyLocal && !isLocal) {
          return false;
        } else if (isLocal) {
          urlToUse = urlParsed.pathname + urlParsed.search + urlParsed.hash;
        }
      } catch {
        return false;
      }
    }

    const noLink = !tvalue && !url;

    const isCollapsed = Range.isCollapsed(at || this.editor.selection);
    const anchorData = at ? this.calculateAnchorsAndContext(at.anchor.path) : this.state;

    (async () => {
      if (at) {
        await this.focusAt(at);
      }
      if (isCollapsed) {
        if (
          anchorData.currentElement &&
          anchorData.currentElement.type === "link"
        ) {
          if (urlToUse || tvalue) {
            Transforms.setNodes(
              this.editor,
              {
                href: !tvalue ? urlToUse : null,
                thref: tvalue ? tvalue : null,
              },
              { at: anchorData.elementAnchor }
            );
          } else {
            Transforms.unwrapNodes(
              this.editor,
              { at: anchorData.elementAnchor }
            );
          }
        } else if (!noLink) {
          Transforms.wrapNodes(
            this.editor,
            {
              type: "link",
              containment: "inline",
              href: !tvalue ? urlToUse : null,
              thref: tvalue ? tvalue : null,
              children: [],
            },
            { split: false, at: anchorData.blockAnchor, match: (n: any) => n.containment === "inline" || Text.isText(n) },
          );
        }
      } else {
        if (
          anchorData.currentElement &&
          anchorData.currentElement.type === "link"
        ) {
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
            Transforms.unwrapNodes(
              this.editor,
              { split: true, match: (n: any) => n.type === "link" },
            );
          }
        } else {
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
      ReactEditor.focus(this.editor);
    })();

    return true;
  };

  /**
   * Sets the current style for the element
   */
  public setStyle(style: string, anchor: Path) {
    Transforms.setNodes(this.editor, {
      style,
    }, { at: anchor });
  };
  /**
   * Sets the template hover style for the element
   */
  public setHoverStyle(style: string, anchor: Path) {
    Transforms.setNodes(this.editor, {
      styleHover: style,
    }, { at: anchor });
  };
  /**
   * Sets the active style for the element
   */
  public setActiveStyle(style: string, anchor: Path) {
    Transforms.setNodes(this.editor, {
      styleActive: style,
    }, { at: anchor });
  };
  /**
   * Sets the rich classes of the element
   * @param classes 
   * @param anchor 
   */
  public setRichClasses(classes: string[], anchor: Path) {
    Transforms.setNodes(this.editor, {
      richClassList: classes,
    }, { at: anchor });
  };

  public setAction(key: string, value: string, anchor: Path) {
    Transforms.setNodes(this.editor, {
      [key]: value,
    }, { at: anchor });
  }

  /**
   * Sets the context key
   */
  public setContext(key: string) {

  };
  /**
  * Sets the for-each loop key
  */
  public setForEach(key: string) {

  };

  /**
   * Formats the current text as bold
   */
  public formatToggleBold() {
    if (this.editor.selection && equals(this.editor.selection.anchor, this.editor.selection.focus)) {
      Transforms.insertNodes(
        this.editor,
        {
          ...this.state.currentText,
          text: "",
          bold: !this.state.currentText.bold,
        },
      );
    } else {
      Transforms.setNodes(
        this.editor,
        { bold: !this.state.currentText.bold },
        { match: n => Text.isText(n), split: true }
      );
    }
    ReactEditor.focus(this.editor);
  }
  /**
   * formats the current text as italic
   */
  public formatToggleItalic() {
    if (this.editor.selection && equals(this.editor.selection.anchor, this.editor.selection.focus)) {
      Transforms.insertNodes(
        this.editor,
        {
          ...this.state.currentText,
          text: "",
          italic: !this.state.currentText.italic,
        },
      );
    } else {
      Transforms.setNodes(
        this.editor,
        { italic: !this.state.currentText.italic },
        { match: n => Text.isText(n), split: true }
      );
    }
    ReactEditor.focus(this.editor);
  };
  /**
   * formats the current text as italic
   */
  public formatToggleUnderline() {
    if (this.editor.selection && equals(this.editor.selection.anchor, this.editor.selection.focus)) {
      Transforms.insertNodes(
        this.editor,
        {
          ...this.state.currentText,
          text: "",
          underline: !this.state.currentText.underline,
        },
      );
    } else {
      Transforms.setNodes(
        this.editor,
        { underline: !this.state.currentText.underline },
        { match: n => Text.isText(n), split: true }
      );
    }
    ReactEditor.focus(this.editor);
  };

  private availableFilteringFunction(feature: string, featureAll: string, featureList: string, i18nLocation: string): IAvailableElement[] {
    return (
      this.props.features[feature] ?
        (this.state[featureAll] as string[]).filter((c) =>
          this.props.features[featureList] ? this.props.features[featureList].includes(c) : true
        ) :
        []
    ).map((c) => {
      return {
        value: c,
        label: (
          this.props.rootI18n &&
          this.props.rootI18n.custom &&
          this.props.rootI18n.custom[i18nLocation] &&
          (
            this.props.rootI18n.custom[i18nLocation][c] ||
            this.props.rootI18n.custom[i18nLocation][c.replace(/-/g, "_")]
          )
        ) || c
      }
    });
  }

  public onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && e.altKey) {
      this.insertSuperblockBreak();
    }
  }

  public async componentDidMount() {
    // ensure SSR compatibility
    await ALL_PROMISE;
    this.setState({
      allContainers: ALL_CONTAINERS,
      allCustom: ALL_CUSTOM,
      allRichClasses: ALL_RICH_CLASSES,
    });
  }

  public getHelpers() {
    const helpers: IHelperFunctions = {
      editor: this.editor,
      Transforms,
      Range,
      ReactEditor,

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
      toggleLink: this.toggleLink,
      toggleList: this.toggleList,
      toggleQuote: this.toggleQuote,
      toggleTitle: this.toggleTitle,
      setActiveStyle: this.setActiveStyle,
      setContext: this.setContext,
      setForEach: this.setForEach,
      setHoverStyle: this.setHoverStyle,
      setStyle: this.setStyle,
      setRichClasses: this.setRichClasses,
      setAction: this.setAction,

      blockBlur: this.blockBlur,
      releaseBlur: this.releaseBlur,
    }

    return helpers;
  }

  public getFeatureSupport() {
    const availableCustoms = this.availableFilteringFunction("supportsCustom", "allCustom", "supportedCustoms", "custom");
    const availableRichClasses = this.availableFilteringFunction("supportsRichClasses", "allRichClasses", "supportedRichClasses", "rich");

    const newFeatureSupport: IAccessibleFeatureSupportOptions = {
      ...this.props.features,

      availableContainers: this.availableFilteringFunction("supportsContainers", "allContainers", "supportedContainers", "containers"),
      availableCustoms: availableCustoms,
      availableRichClasses,

      canInsertContainer: this.state.currentBlock && this.props.features.supportsContainers,
      canInsertCustom: this.state.currentBlock && this.props.features.supportsCustom && !!availableCustoms.length,
      canInsertFile: this.state.currentBlock && this.props.features.supportsFiles,
      canInsertImage: this.state.currentBlock && this.props.features.supportsImages,
      canInsertLink: this.state.currentBlock && this.props.features.supportsLinks,
      canInsertList: this.state.currentBlock && this.props.features.supportsLists,
      canInsertQuote: this.state.currentBlock && this.props.features.supportsQuote,
      canInsertRichClass: this.state.currentBlock && this.props.features.supportsRichClasses && !!availableRichClasses.length,
      canInsertTitle: this.state.currentText && this.props.features.supportsTitle,
      canInsertVideo: this.state.currentBlock && this.props.features.supportsVideos,
      canSetActionFunction: this.state.currentBlock && this.props.features.supportsTemplating,
      canSetActiveStyle: this.state.currentBlock && this.props.features.supportsTemplating,
      canSetDynamicHref: this.state.currentBlock && this.props.features.supportsTemplating,
      canSetHoverStyle: this.state.currentBlock && this.props.features.supportsTemplating,
      canSetLoop: this.state.currentBlock && this.props.features.supportsTemplating,
      canSetStyle: this.state.currentBlock && this.props.features.supportsCustomStyles,
      canSetUIHandler: this.state.currentBlock && this.props.features.supportsTemplating,
    };

    return newFeatureSupport;
  }

  public render() {
    let children: React.ReactNode = (
      <Editable
        onKeyDown={this.onKeyDown}
        onBlur={this.onNativeBlur}
        renderElement={this.renderElement}
        renderLeaf={this.renderText}
      />
    );
    const Wrapper = this.props.Wrapper;
    if (Wrapper) {
      const info: ISlateEditorInfoType = {
        currentValid: this.props.currentValid,
        isFocused: this.state.focused,
        currentContext: this.state.currentContext,
        currentBlock: this.state.currentBlock,
        currentSuperBlock: this.state.currentSuperBlock,
        currentElement: this.state.currentElement,
        currentText: this.state.currentText,
        currentSelectedNode: this.state.currentSelectedNode,
        currentSelectedNodeOrigin: this.state.currentSelectedNodeOrigin,
        selectedOriginAnchor: this.state.selectedOriginAnchor,
        isRichText: this.props.isRichText,
        currentValue: this.state.internalValue.children as any,
        textAnchor: this.state.anchor,
        blockAnchor: this.state.blockAnchor,
        elementAnchor: this.state.elementAnchor,
        superBlockAnchor: this.state.superBlockAnchor,
        selectedAnchor: this.state.selectedAnchor,
      }

      children = (
        <Wrapper
          {...this.props.wrapperArgs}
          info={info}
          helpers={this.getHelpers()}
          featureSupport={this.getFeatureSupport()}
          currentLoadError={this.props.currentLoadError}
          dismissCurrentLoadError={this.props.dismissCurrentLoadError}
        >
          {children}
        </Wrapper>
      );
    }
    return (
      <>
        <Slate editor={this.editor} value={this.state.internalValue.children as any} onChange={this.onChange}>
          {children}
        </Slate>
        <code>
          {JSON.stringify(this.state.internalValue, null, 2)}
        </code>
      </>
    )
  }
}