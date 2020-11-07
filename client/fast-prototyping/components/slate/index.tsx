import React from "react";
import equals from "deep-equal";
import { createEditor, Transforms, Range, Editor, Element } from 'slate';
import { Slate, Editable, withReact, ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';

import { IRootLevelDocument, deserialize, SERIALIZATION_REGISTRY } from "../../../internal/text/serializer";
import { compareLoselyEquals } from "../../../internal/text";

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
   * Trusted editors will enable access to
   * rich text prefixes and containers
   */
  isTrusted?: boolean;
  /**
   * The class name where all trusted components
   * for CSS usage are, defaults to "trusted"
   */
  trustedClassName?: string;
  /**
   * The classes that we have available for
   * this specific editor to use the rich-text type
   * they are all prefixed with the rich text prefix
   * if not specified it will read the current stylesheets
   * in order to find what is available
   */
  availiableRichTextSubclasses?: string[];
  /**
   * The classes that we have available for
   * this specific editor to use the container type
   * they are all prefixed with the container prefix
   * if not specified it will read the current stylesheets
   * in order to find what is available
   */
  containersRichTextSubclasses?: string[];
  /**
   * Whether it represents a template
   */
  isTemplate?: boolean;
  /**
   * The structure of the available template arguments
   */
  templateArgsContext?: ITemplateArgsContext;
  /**
   * The value as html
   */
  value: string | Node[];
  /**
   * An internal value provided
   * that represents a slate document
   * it might be null if this value
   * is unknown
   */
  internalValue: IRootLevelDocument;
}

interface ISlateEditorState {
  /**
   * The actual internal value that slate is
   * using
   */
  internalValue: IRootLevelDocument;
}

export class SlateEditor extends React.Component<ISlateEditorProps, ISlateEditorState> {
  private editor: ReactEditor;
  constructor(props: ISlateEditorProps) {
    super(props);

    this.state = {
      internalValue: props.internalValue || deserialize(props.value),
    }

    const rawEditor = createEditor();
    this.editor = withReact(rawEditor);

    this.setValue = this.setValue.bind(this);
    this.renderElement = this.renderElement.bind(this);
    this.renderText = this.renderText.bind(this);
  }
  public shouldComponentUpdate(nextProps: ISlateEditorProps) {
    const standardUpdate = (
      nextProps.isTrusted !== this.props.isTrusted ||
      nextProps.trustedClassName !== this.props.trustedClassName ||
      !equals(nextProps.availiableRichTextSubclasses, this.props.availiableRichTextSubclasses) ||
      !equals(nextProps.containersRichTextSubclasses, this.props.containersRichTextSubclasses) ||
      nextProps.isTemplate !== this.props.isTemplate ||
      !equals(nextProps.templateArgsContext, this.props.templateArgsContext)
    )
    if (standardUpdate) {
      return true;
    }

    if (nextProps.internalValue) {
      return nextProps.internalValue.id !== this.props.internalValue.id;
    }

    const requiresUpdate = !compareLoselyEquals(nextProps.value, this.state.internalValue);
    if (requiresUpdate) {
      return true;
    }

    return false;
  }
  componentDidUpdate(prevProps: ISlateEditorProps) {
    if (this.props.internalValue && this.props.internalValue.id !== prevProps.internalValue.id) {
      this.setState({
        internalValue: this.props.internalValue,
      });
    } else if (!compareLoselyEquals(prevProps.value, this.state.internalValue)) {
      this.setState({
        internalValue: deserialize(this.props.value),
      });
    }
  }
  public setValue(v: any) {
    const newRootDocument: IRootLevelDocument = {
      id: this.state.internalValue.id,
      type: "document",
      children: v,
    };
    this.setState({
      internalValue: newRootDocument,
    });
    // TODO use a timeout in order to send updates
  }
  public renderElement(props: RenderElementProps) {
    const { attributes, children, element } = props;
    return SERIALIZATION_REGISTRY.REACTIFY[element.type as string](element as any, {...attributes, children}) as any;
  }
  public renderText(props: RenderLeafProps) {
    const { attributes, children, leaf } = props;
    return SERIALIZATION_REGISTRY.REACTIFY.text(leaf as any, {...attributes, children}) as any;
  }
  public render() {
    return (
      <Slate editor={this.editor} value={this.state.internalValue.children as any} onChange={newValue => this.setValue(newValue)}>
        <Editable
          renderElement={this.renderElement}
          renderLeaf={this.renderText}
        />
      </Slate>
    )
  }
}