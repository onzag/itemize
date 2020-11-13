import React from "react";
import equals from "deep-equal";
import { createEditor, Transforms, Range, Editor, Element, Node, Path } from 'slate';
import { Slate, Editable, withReact, ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';

import { IRootLevelDocument, deserialize, SERIALIZATION_REGISTRY, RichElement, deserializePlain } from "../../../internal/text/serializer";
import { countSize, IFeatureSupportOptions, serializeString } from "../../../internal/text";
import { LAST_RICH_TEXT_CHANGE_LENGTH } from "../../../../constants";
import uuid from "uuid";
import { IText } from "../../../internal/text/serializer/text";
import { IInsertedFileInformationType } from "../../../internal/components/PropertyEntry/PropertyEntryText";

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
  editor: any;

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
  makeQuote: () => void;
  /**
   * Makes a title out of the current element
   */
  makeTitle: (type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") => void;
  /**
   * Makes a list out of the current element
   */
  makeList: () => void;
  /**
   * Makes a link out of the current element
   */
  makeLink: (url: string) => void;
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
   * toggles a given active rich class
   */
  formatToggleRichClass: (richClass: string) => void;
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
}

export class SlateEditor extends React.Component<ISlateEditorProps, ISlateEditorState> {
  private editor: ReactEditor;
  private updateTimeout: NodeJS.Timeout;
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
          internalValue: props.isRichText ? deserialize(props.value) : deserializePlain(props.value),
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
      currentContext: this.props.rootContext || null,
      currentElement: null,
      currentText: null,
    }

    const rawEditor = createEditor();
    this.editor = withReact(rawEditor);

    this.setValue = this.setValue.bind(this);
    this.renderElement = this.renderElement.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderText = this.renderText.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  public onFocus(anchor: Path, value: Node[]) {
    let currentContext = this.props.rootContext || null;
    let currentElement: RichElement = {
      children: value,
    } as any;
    let currentText: IText = null;

    if (anchor) {
      const last = anchor.length - 1;
      anchor.forEach((n: number, index: number) => {
        if (index === last) {
          currentText = currentElement.children[n] as IText;
        } else {
          currentElement = currentElement.children[n] as RichElement;
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
      currentContext,
      currentElement,
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
        currentContext: this.props.rootContext || null,
        currentElement: null,
        currentText: null,
      });
    }
  }
  public shouldComponentUpdate(nextProps: ISlateEditorProps, nextState: ISlateEditorState) {
    const standardUpdate = (
      nextProps.currentValid !== this.props.currentValid ||
      nextState.focused !== this.state.focused ||
      nextProps.Wrapper !== this.props.Wrapper ||
      nextProps.isRichText !== this.props.isRichText ||
      nextProps.rootContext !== this.props.rootContext ||
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
    if (this.editor.selection) {
      this.onFocus(this.editor.selection.anchor.path, newValue);
    } else {
      this.onBlur();
    }

    this.setValue(newValue);
  }
  public render() {
    let children: React.ReactNode = (
      <Editable
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
        currentElement: this.state.currentElement,
        currentText: this.state.currentText,
        isRichText: this.props.isRichText,
      }
      children = (
        <Wrapper {...this.props.wrapperArgs} info={info}>
          {children}
        </Wrapper>
      );
    }
    return (
      <Slate editor={this.editor} value={this.state.internalValue.children as any} onChange={this.onChange}>
        {children}
      </Slate>
    )
  }
}