import React from "react";
import equals from "deep-equal";
import { createEditor, Transforms, Range, Editor, Element, Node, Path, Text, NodeEntry } from 'slate';
import { Slate, Editable, withReact, ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';

import { IRootLevelDocument, deserialize, SERIALIZATION_REGISTRY, RichElement, deserializePlain } from "../../../internal/text/serializer";
import { CONTAINER_CLASS_PREFIX, countSize, CUSTOM_CLASS_PREFIX, IFeatureSupportOptions, RICH_TEXT_CLASS_PREFIX, serializeString } from "../../../internal/text";
import { LAST_RICH_TEXT_CHANGE_LENGTH } from "../../../../constants";
import uuid from "uuid";
import { IText } from "../../../internal/text/serializer/text";
import { IInsertedFileInformationType } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import { copyElementBase } from "../../../internal/text/serializer/base";

interface ITemplateArg {
  type: "text" | "link" | "html" | "ui-handler" | "function";
  label: string;
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
    // now we got to see if by the time this promise is running
    // it is already done loading
    const foundPreloadedStylesheet =
      document.styleSheets && Array.from(document.styleSheets).find((s) => s.href && s.href.startsWith("/rest/resource/build"));

    // if we find it and use it to calculate it
    if (foundPreloadedStylesheet) {
      ALL_IS_LOADED = true;
      calculateStylesheet(foundPreloadedStylesheet);
      resolve();

      // otherwise we need to wait for the link to load
    } else {
      const allLinks = document.head.querySelectorAll("link");
      const foundStylesheetNode = Array.from(allLinks).find((s) => s.href.startsWith("/rest/resource/build"));

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
            Array.from(document.styleSheets).find((s) => s.href && s.href.startsWith("/rest/resource/build"));
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
   * Will insert an image based on a given file that has
   * been taken as an input
   * @param file the file
   * @param standalone whether to make it a standalone image
   */
  insertImage: (file: File, standalone: boolean) => void;
  /**
   * Will insert a video given the information
   * @param origin the origin of the video
   * @param id the id of the video
   */
  insertVideo: (origin: "youtube" | "vimeo", id: string) => void;
  /**
   * Will insert a file based on the information given
   * @param file the file to insert
   */
  insertFile: (file: File) => void;
  /**
   * Will insert a container at the given location
   * @param type optional, the container type, otherwise will
   * insert a standard container
   */
  insertContainer: (type?: string) => void;
  /**
   * Inserts a custom element
   */
  insertCustom: (type: string) => void;

  /**
   * Makes a quote out of the current element
   */
  toggleQuote: () => void;
  /**
   * Makes a title out of the current element
   */
  toggleTitle: (type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") => void;
  /**
   * Makes a list out of the current element
   */
  toggleList: (type: "bulleted" | "numbered") => void;
  /**
   * Makes a link out of the current element
   */
  toggleLink: (url: string) => void;
  /**
   * Makes a template link out of the current element
   */
  makeTemplateLink: (value: string) => void;

  /**
   * Sets the current style for the element
   */
  setStyle: (style: string) => void;
  /**
   * Sets the template hover style for the element
   */
  setHoverStyle: (style: string) => void;
  /**
   * Sets the active style for the element
   */
  setActiveStyle: (style: string) => void;
  /**
   * Sets the context key
   */
  setContext: (key: string) => void;
  /**
   * Sets the for-each loop key
   */
  setForEach: (key: string) => void;

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
   * toggles a given active rich class
   */
  formatToggleRichClass: (richClass: string) => void;
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
  // Templating specific
  /**
   * The current templating context
   */
  currentContext: ITemplateArgsContext;
}

export interface ISlateEditorWrapperBaseProps {
  info: ISlateEditorInfoType;
  featureSupport: IAccessibleFeatureSupportOptions;
  helpers: IHelperFunctions;
  children: React.ReactNode;
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
      currentContext: this.props.rootContext || null,
      currentElement: null,
      currentBlock: null,
      currentSuperBlock: null,
      currentText: null,

      // ensure SSR compatibility
      allContainers: [],
      allCustom: [],
      allRichClasses: [],
    }

    const rawEditor = createEditor();
    this.editor = withReact(rawEditor);

    this.normalizeNode = this.normalizeNode.bind(this);
    this.insertBreak = this.insertBreak.bind(this);
    this.deleteBackward = this.deleteBackward.bind(this);

    this.editor.isInline = this.isInline as any;
    this.editor.isVoid = this.isVoid as any;
    this.editor.normalizeNode = this.normalizeNode;
    this.editor.insertBreak = this.insertBreak;
    this.editor.deleteBackward = this.deleteBackward;

    this.setValue = this.setValue.bind(this);
    this.renderElement = this.renderElement.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderText = this.renderText.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onNativeBlur = this.onNativeBlur.bind(this);

    this.insertImage = this.insertImage.bind(this);
    this.insertVideo = this.insertVideo.bind(this);
    this.insertFile = this.insertFile.bind(this);
    this.insertContainer = this.insertContainer.bind(this);
    this.insertCustom = this.insertCustom.bind(this);
    this.toggleQuote = this.toggleQuote.bind(this);
    this.toggleTitle = this.toggleTitle.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.toggleLink = this.toggleLink.bind(this);
    this.makeTemplateLink = this.makeTemplateLink.bind(this);
    this.setStyle = this.setStyle.bind(this);
    this.setHoverStyle = this.setHoverStyle.bind(this);
    this.setActiveStyle = this.setActiveStyle.bind(this);
    this.setContext = this.setContext.bind(this);
    this.setForEach = this.setForEach.bind(this);
    this.formatToggleBold = this.formatToggleBold.bind(this);
    this.formatToggleItalic = this.formatToggleItalic.bind(this);
    this.formatToggleUnderline = this.formatToggleUnderline.bind(this);
    this.formatToggleRichClass = this.formatToggleRichClass.bind(this);

    this.availableFilteringFunction = this.availableFilteringFunction.bind(this);

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

    // if it's an element
    if (Element.isElement(node)) {
      // the total current nodes
      let totalNodes = node.children.length;
      // we got to check first if we should merge the nodes
      let n = 0;
      // for that we loop
      for (let i = 0; i < node.children.length; i++) {
        const prev = node.children[i - 1];
        const current = node.children[i];

        // if we have a text type inside
        if (Text.isText(current)) {
          // we get the previous and current path
          const curPath = path.concat(n);
          // and this is where we are now
          const currentTextAnchorPath = this.editor.selection.anchor.path;
          // if we have a previous that is also a text that is not our anchor and is mergable
          if (prev && Text.isText(prev) && this.checkShouldMerge(current, prev)) {
            // we merge it
            Transforms.mergeNodes(this.editor, { at: path.concat(n) });
            n--;
            totalNodes--;
            // otherwise if we have an empty node and either it is not selected which means
            // all non selected empty text nodes will dissapear regardless, or if it's able
            // to merge which means that it's a pointless empty node
            // note that we prevent to delete the node if that will leave us with no text nodes
          } else if (current.text === "" && !equals(curPath, currentTextAnchorPath) && totalNodes !== 1) {
            // we merge it with the previous
            Transforms.delete(this.editor, { at: path.concat(n) });
            n--;
            totalNodes--;
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
      } else if (nodeAsRichElement.containment === "superblock") {
        const newNode = Node.get(this.editor, path);
        for (let i = 0; i < (newNode.children as any).length; i++) {
          const child = newNode.children[i];
          if (Text.isText(child)) {
            Transforms.wrapNodes(this.editor, { type: "paragraph", containment: "block", children: [] }, { at: path.concat(i) });
          }
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
      }
    }
  }
  public isInline(element: RichElement) {
    return element.containment === "inline";
  }
  public isVoid(element: RichElement) {
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
      Transforms.removeNodes(this.editor, {at: this.state.superBlockAnchor});
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

    Transforms.splitNodes(this.editor, { always: true });
  }
  public deleteBackward(unit: "character" | "word" | "line" | "block") {
    const { selection } = this.editor

    if (
      selection &&
      Range.isCollapsed(this.editor.selection) &&
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
      Transforms.delete(this.editor, { unit, reverse: true })
    }
  }
  public onFocus(anchor: Path, value: Node[]) {
    let currentContext = this.props.rootContext || null;
    let currentElement: RichElement = {
      children: value,
    } as any;

    let elementAnchor: Path = [...anchor];
    elementAnchor.pop();

    let currentBlock: RichElement = null;

    let blockAnchor: Path = [];

    let currentSuperBlock: RichElement = null;

    let superBlockAnchor: Path = [];

    let currentText: IText = null;

    if (anchor) {
      const last = anchor.length - 1;
      anchor.forEach((n: number, index: number) => {
        if (index === last) {
          currentText = currentElement.children[n] as IText;
        } else {
          currentElement = currentElement.children[n] as RichElement;

          if (currentElement.containment !== "inline") {
            currentBlock = currentElement;
            blockAnchor.push(n);
          }

          if (currentElement.containment === "superblock" || currentElement.containment === "list-item") {
            currentSuperBlock = currentElement;
            superBlockAnchor.push(n);
          }

          if (currentContext && currentElement.context) {
            currentContext = currentContext.properties[currentElement.context] as ITemplateArgsContext || null;
            if (currentContext.type !== "context" || currentContext.loopable) {
              currentContext = null;
            }
          }
          if (currentContext && currentElement.forEach) {
            currentContext = currentContext.properties[currentElement.forEach] as ITemplateArgsContext || null;
            if (currentContext.type !== "context" || !currentContext.loopable) {
              currentContext = null;
            }
          }
        }
      });
    }

    this.setState({
      anchor,
      elementAnchor,
      blockAnchor,
      currentContext,
      currentElement,
      currentBlock,
      currentSuperBlock,
      superBlockAnchor,
      currentText,
    });
    if (!this.state.focused) {
      this.props.onFocus && this.props.onFocus();
      this.setState({
        focused: true,
      });
    }
  }
  public onBlur() {
    if (this.state.focused) {
      this.props.onBlur && this.props.onBlur();
      this.setState({
        focused: false,
        anchor: null,
        elementAnchor: null,
        blockAnchor: null,
        currentContext: this.props.rootContext || null,
        currentElement: null,
        currentBlock: null,
        currentSuperBlock: null,
        superBlockAnchor: null,
        currentText: null,
      });
    }
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
    return SERIALIZATION_REGISTRY.REACTIFY[element.type as string](element as any, { ...attributes, children }) as any;
  }
  public renderText(props: RenderLeafProps) {
    const { attributes, children, leaf } = props;
    return SERIALIZATION_REGISTRY.REACTIFY.text(leaf as any, { ...attributes, children }) as any;
  }
  public onChange(newValue: Node[]) {
    clearTimeout(this.blurTimeout);
    if (this.editor.selection) {
      this.onFocus(this.editor.selection.anchor.path, newValue);
    } else {
      this.onBlur();
    }

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
  /**
   * Will insert an image based on a given file that has
   * been taken as an input
   * @param file the file
   * @param standalone whether to make it a standalone image
   */
  public insertImage(file: File, standalone: boolean) {

  };
  /**
   * Will insert a video given the information
   * @param origin the origin of the video
   * @param id the id of the video
   */
  public insertVideo(origin: "youtube" | "vimeo", id: string) {

  };
  /**
   * Will insert a file based on the information given
   * @param file the file to insert
   */
  public insertFile(file: File) {

  };
  /**
   * Will insert a container at the given location
   * @param type optional, the container type, otherwise will
   * insert a standard container
   */
  public insertContainer(type?: string) {

  };
  /**
   * Inserts a custom element
   */
  public insertCustom(type: string) {

  };

  /**
   * Makes a quote out of the current element
   */
  public toggleQuote() {
    const isCollapsed = Range.isCollapsed(this.editor.selection);
    if (this.state.currentBlock.type === "quote") {
      Transforms.wrapNodes(
        this.editor,
        {
          ...copyElementBase(this.state.currentBlock),
          type: "paragraph",
          containment: "block",
          children: [],
        },
        { split: !isCollapsed, at: isCollapsed ? this.state.blockAnchor : this.editor.selection },
      );
    } else {
      Transforms.wrapNodes(
        this.editor,
        {
          ...copyElementBase(this.state.currentBlock),
          type: "quote",
          containment: "block",
          children: [],
        },
        { split: !isCollapsed, at: isCollapsed ? this.state.blockAnchor : this.editor.selection },
      );
    }
    ReactEditor.focus(this.editor);
  };
  /**
   * Makes a title out of the current element
   */
  public toggleTitle(type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
    const isCollapsed = Range.isCollapsed(this.editor.selection);
    if (this.state.currentBlock.type === "title" && this.state.currentBlock.subtype === type) {
      Transforms.wrapNodes(
        this.editor,
        {
          ...copyElementBase(this.state.currentBlock),
          type: "paragraph",
          containment: "block",
          children: [],
        },
        { split: !isCollapsed, at: isCollapsed ? this.state.blockAnchor : this.editor.selection },
      );
    } else {
      Transforms.wrapNodes(
        this.editor,
        {
          ...copyElementBase(this.state.currentBlock),
          type: "title",
          containment: "block",
          subtype: type,
          children: [],
        },
        { split: !isCollapsed, at: isCollapsed ? this.state.blockAnchor : this.editor.selection },
      );
    }
    ReactEditor.focus(this.editor);
  };
  /**
   * Makes a list out of the current element
   */
  public toggleList(type: "bulleted" | "numbered") {
    const isCollapsed = Range.isCollapsed(this.editor.selection);
    if (this.state.currentSuperBlock && this.state.currentSuperBlock.type === "list") {
      if (this.state.currentSuperBlock.listType !== type) {
        Transforms.wrapNodes(
          this.editor,
          {
            ...copyElementBase(this.state.currentSuperBlock),
            type: "list",
            listType: type,
            containment: "list-item",
            children: [],
          },
          { split: false, at: this.state.superBlockAnchor },
        );
      } else {
        this.breakList();
      }
    } else {
      Transforms.wrapNodes(
        this.editor,
        {
          ...copyElementBase(this.state.currentBlock),
          type: "list",
          listType: type,
          containment: "list-item",
          children: [],
        },
        { split: !isCollapsed, at: isCollapsed ? this.state.blockAnchor : this.editor.selection },
      );
    }
    ReactEditor.focus(this.editor);
  };
  /**
   * Makes a link out of the current element
   */
  public toggleLink(url: string) {

  };
  /**
   * Makes a template link out of the current element
   */
  public makeTemplateLink(value: string) {

  };;

  /**
   * Sets the current style for the element
   */
  public setStyle(style: string) {

  };
  /**
   * Sets the template hover style for the element
   */
  public setHoverStyle(style: string) {

  };
  /**
   * Sets the active style for the element
   */
  public setActiveStyle(style: string) {

  };
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
  /**
   * toggles a given active rich class
   */
  public formatToggleRichClass(richClass: string) {

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
          this.props.rootI18n.custom[i18nLocation][c]
        ) || c
      }
    });
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

  public render() {
    let children: React.ReactNode = (
      <Editable
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
        isRichText: this.props.isRichText,
      }

      const helpers: IHelperFunctions = {
        editor: this.editor,
        Transforms,
        Range,
        ReactEditor,

        formatToggleBold: this.formatToggleBold,
        formatToggleItalic: this.formatToggleItalic,
        formatToggleUnderline: this.formatToggleUnderline,
        formatToggleRichClass: this.formatToggleRichClass,
        insertContainer: this.insertContainer,
        insertCustom: this.insertCustom,
        insertFile: this.insertFile,
        insertImage: this.insertImage,
        insertVideo: this.insertVideo,
        toggleLink: this.toggleLink,
        toggleList: this.toggleList,
        toggleQuote: this.toggleQuote,
        makeTemplateLink: this.makeTemplateLink,
        toggleTitle: this.toggleTitle,
        setActiveStyle: this.setActiveStyle,
        setContext: this.setContext,
        setForEach: this.setForEach,
        setHoverStyle: this.setHoverStyle,
        setStyle: this.setStyle,

        blockBlur: this.blockBlur,
        releaseBlur: this.releaseBlur,
      }

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
      children = (
        <Wrapper {...this.props.wrapperArgs} info={info} helpers={helpers} featureSupport={newFeatureSupport}>
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