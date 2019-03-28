import React from "react";
import { IPropertyEntryProps } from ".";
import PropertyEntryField from "./PropertyEntryField";
import {Editor, EditorState} from "draft-js";

interface IRichTextEditorState {
  editorState: EditorState;
}

class RichTextEditor extends React.Component<IPropertyEntryProps, IRichTextEditorState> {
  constructor(props: IPropertyEntryProps) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.onChange = this.onChange.bind(this);
  }
  public onChange(editorState: EditorState) {
    this.setState({
      editorState,
    });
  }
  public render() {
    return (
      <Editor editorState={this.state.editorState} onChange={this.onChange}/>
    );
  }
}

export default function PropertyEntryText(props: IPropertyEntryProps) {
  if (!props.property.isRichText()) {
    return <PropertyEntryField {...props}/>;
  }
  return null;
}
