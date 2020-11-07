import React from "react";
import equals from "deep-equal";
import { createEditor, Transforms, Range, Editor, Element, Node } from 'slate';
import { Slate, Editable, withReact, ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';

import { IRootLevelDocument, deserialize, SERIALIZATION_REGISTRY } from "../../../internal/text/serializer";
import { countSize, IFeatureSupportOptions, serializeHTMLString } from "../../../internal/text";
import { LAST_RICH_TEXT_CHANGE_LENGTH } from "../../../../constants";
import uuid from "uuid";

interface ITemplateArg {
  type: "text" | "link" | "html" | "ui-handler" | "function";
  description: string;
}

/**
 * Represents the vailable args in the context
 */
interface ITemplateArgsContext {
  type: "context";
  loopable?: boolean;
  properties: {
    [name: string]: ITemplateArg | ITemplateArgsContext;
  };
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
  Wrapper?: any;
  /**
   * The list of standard features that are supported
   * according to the definition
   */
  features: IFeatureSupportOptions,
  /**
   * The value as html
   */
  value: string;
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
}

export class SlateEditor extends React.Component<ISlateEditorProps, ISlateEditorState> {
  private editor: ReactEditor;
  private updateTimeout: NodeJS.Timeout;
  static getDerivedStateFromProps(props: ISlateEditorProps, state: ISlateEditorState) {
    if (state.synced) {
      if (props.internalValue) {
        if (!state.internalValue || props.internalValue.id !== state.internalValue.id) {
          return {
            internalValue: props.internalValue,
          };
        }
      } else {
        return {
          internalValue: deserialize(props.value),
        };
      }
    }

    return null;
  }
  constructor(props: ISlateEditorProps) {
    super(props);

    this.state = {
      internalValue: props.internalValue || deserialize(props.value),
      synced: true,
    }

    const rawEditor = createEditor();
    this.editor = withReact(rawEditor);

    this.setValue = this.setValue.bind(this);
    this.renderElement = this.renderElement.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderText = this.renderText.bind(this);
  }
  public shouldComponentUpdate(nextProps: ISlateEditorProps, nextState: ISlateEditorState) {
    const standardUpdate = (
      nextProps.Wrapper !== this.props.Wrapper ||
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
      // what we do is that we count the characters
      const count = countSize(this.state.internalValue);
      // and set it in the last rich text change cheat variable
      (window as any)[LAST_RICH_TEXT_CHANGE_LENGTH] = count;
      // and now we can trigger the on change event
      this.props.onChange(serializeHTMLString(this.state.internalValue), this.state.internalValue);
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
    return SERIALIZATION_REGISTRY.REACTIFY[element.type as string](element as any, {...attributes, children}) as any;
  }
  public renderText(props: RenderLeafProps) {
    const { attributes, children, leaf } = props;
    return SERIALIZATION_REGISTRY.REACTIFY.text(leaf as any, {...attributes, children}) as any;
  }
  public onChange(newValue: Node[]) {
    this.setValue(newValue);
  }
  public render() {
    return (
      <Slate editor={this.editor} value={this.state.internalValue.children as any} onChange={this.onChange}>
        <Editable
          renderElement={this.renderElement}
          renderLeaf={this.renderText}
        />
      </Slate>
    )
  }
}