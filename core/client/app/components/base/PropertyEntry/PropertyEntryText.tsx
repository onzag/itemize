import React from "react";
import { IPropertyEntryProps, getClassName } from ".";
import PropertyEntryField from "./PropertyEntryField";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { stateFromHTML } from "draft-js-import-html";
import { stateToHTML } from "draft-js-export-html";
import { IPropertyValueGetterType } from "../../../../../base/ItemDefinition/PropertyDefinition";

// TODO handle images, files, emojis, and whatnot
function getStateFromValue(value: IPropertyValueGetterType): EditorState {
  return value.internalValue ? value.internalValue : (
    value.value ?
      EditorState.create(stateFromHTML(value.value as string)) :
      EditorState.createEmpty());
}

interface IRichTextEditorState {
  editorState: EditorState;
}

class RichTextEditor extends React.Component<IPropertyEntryProps, IRichTextEditorState> {
  constructor(props: IPropertyEntryProps) {
    super(props);

    this.state = {
      editorState: null,
    };

    this.onChange = this.onChange.bind(this);
  }
  public onChange(newState: EditorState) {
    const currentContentState = getStateFromValue(this.props.value).getCurrentContent();
    const newContentState = newState.getCurrentContent();

    if (currentContentState !== newContentState) {
      let html = stateToHTML(newContentState);
      if (html === "<p><br></p>") {
        html = null;
      }

      if (html !== this.props.value.value) {
        this.props.onChange(html, newState);
      }
    }
  }
  public render() {
    const editorState = getStateFromValue(this.props.value);

    const i18nData = this.props.property.getI18nDataFor(this.props.locale);
    const className = getClassName(this.props, "rich-text", this.props.poked);
    const i18nLabel = i18nData && i18nData.label;
    const i18nPlaceholder = i18nData && i18nData.placeholder;

    const invalidReason = this.props.value.invalidReason;
    let i18nInvalidReason = null;
    if (
      (this.props.poked || this.props.value.userSet) &&
      invalidReason && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
      i18nInvalidReason = i18nData.error[invalidReason];
    }

    return (
      <div className="property-entry--container">
        <Editor placeholder={i18nPlaceholder} editorState={editorState} onChange={this.onChange}/>
        <div className="property-entry--error">
          {i18nInvalidReason}
        </div>
      </div>
    );
  }
}

export default function PropertyEntryText(props: IPropertyEntryProps) {
  if (!props.property.isRichText()) {
    return <PropertyEntryField {...props}/>;
  }
  return <RichTextEditor {...props}/>;
}
