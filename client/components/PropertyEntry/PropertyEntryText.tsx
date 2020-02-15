import React from "react";
import { IPropertyEntryProps } from ".";
import PropertyEntryField from "./PropertyEntryField";
import { InputLabel, Icon, IconButton } from "@material-ui/core";
import ReactQuill from "react-quill/dist/react-quill.min.js";
import equals from "deep-equal";
import Toolbar from "@material-ui/core/Toolbar";
import uuid from "uuid";
import { Ii18NType } from "../../../base/Root";

import "react-quill/dist/quill.core.css";
import "../../internal/theme/quill.scss";

// TODO implement missing toolbar functionality
function RichTextEditorToolbar(props: {id: string, i18n: Ii18NType, language: string}) {
  return (
    <Toolbar id={props.id}>
      <IconButton
        title={props.i18n[props.language].format_bold}
        classes={{root: "ql-bold"}}
      >
        <Icon>format_bold</Icon>
      </IconButton>
      <IconButton
        title={props.i18n[props.language].format_italic}
        classes={{ root: "ql-italic" }}
      >
        <Icon>format_italic</Icon>
      </IconButton>
      <IconButton
        title={props.i18n[props.language].format_underline}
        classes={{ root: "ql-underline" }}
      >
        <Icon>format_underline</Icon>
      </IconButton>
      <IconButton
        title={props.i18n[props.language].format_title}
        classes={{ root: "ql-header" }}
        value="1"
      >
        <Icon>title</Icon>
      </IconButton>
      <span className="ql-divider" />
      <IconButton
        title={props.i18n[props.language].format_quote}
        classes={{ root: "ql-blockquote" }}
      >
        <Icon>format_quote</Icon>
      </IconButton>
      <span className="ql-divider" />
      <IconButton
        title={props.i18n[props.language].format_list_numbered}
        classes={{ root: "ql-list" }}
        value="ordered"
      >
        <Icon>format_list_numbered</Icon>
      </IconButton>
      <IconButton
        title={props.i18n[props.language].format_list_bulleted}
        classes={{ root: "ql-list" }}
        value="bullet"
      >
        <Icon>format_list_bulleted</Icon>
      </IconButton>
      <span className="ql-divider" />
      <IconButton
        title={props.i18n[props.language].format_add_image}
        classes={{ root: "" }}
      >
        <Icon>insert_photo</Icon>
      </IconButton>
      <IconButton
        title={props.i18n[props.language].format_add_video}
        classes={{ root: "" }}
      >
        <Icon>video_library</Icon>
      </IconButton>
      <IconButton
        title={props.i18n[props.language].format_add_file}
        classes={{ root: "" }}
      >
        <Icon>attach_file</Icon>
      </IconButton>
    </Toolbar>
  );
}

interface IRichTextEditorState {
  focused: boolean;
}

class RichTextEditor extends React.Component<IPropertyEntryProps, IRichTextEditorState> {
  // this one also gets an uuid
  private uuid: string;
  constructor(props: IPropertyEntryProps) {
    super(props);

    // whether it is focused or not
    this.state = {
      focused: false,
    };

    this.uuid =  "uuid-" + uuid.v4();

    // basic functions
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  public shouldComponentUpdate(nextProps: IPropertyEntryProps, nextState: IRichTextEditorState) {
    // we use this too
    return nextProps.property !== this.props.property ||
      !equals(this.state, nextState) ||
      !equals(this.props.state, nextProps.state) ||
      !!this.props.poked !== !!nextProps.poked ||
      !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
      nextProps.language !== this.props.language ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.icon !== this.props.icon;
  }
  public onChange(value: string) {
    // on change, these values are basically empty
    // so we set to null, however in some circumstances
    // they are unavoidable, use a value larger than 1 for min
    // if the field is not nullable
    if (
      value === "<p><br></p>" ||
      value === "<p><span class=\"ql-cursor\">\ufeff</span></p>"
    ) {
      this.props.onChange(null, null);
      return;
    }
    this.props.onChange(value, null);
  }
  // basically get the state onto its parent of the focus and blur
  public onFocus() {
    this.setState({
      focused: true,
    });
  }
  public onBlur() {
    this.setState({
      focused: false,
    });
  }
  public render() {
    // this is the editor value
    const editorValue = this.props.state.value ?
      this.props.state.value as string :
      "";

    // basic data
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const i18nLabel = i18nData && i18nData.label;
    const i18nDescription = i18nData && i18nData.description;
    const i18nPlaceholder = i18nData && i18nData.placeholder;

    // invalid reason
    const invalidReason = this.props.state.invalidReason;
    let i18nInvalidReason = null;
    if (
      (this.props.poked || this.props.state.userSet) &&
      invalidReason && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
      i18nInvalidReason = i18nData.error[invalidReason];
    }

    // the icon as usual
    const icon = this.props.icon;
    const iconComponent = icon ? (
      <Icon classes={{root: this.props.classes.icon}}>{icon}</Icon>
    ) : null;

    // we return the component, note how we set the thing to focused
    return (
      <div className={this.props.classes.container}>
        <div>
          <InputLabel
            classes={{
              root: this.props.classes.label,
              focused: "focused",
            }}
            focused={this.state.focused}
          >
            {i18nLabel}{iconComponent}
          </InputLabel>
          {i18nDescription ? <div className={this.props.classes.description}>
            <Icon>keyboard_arrow_down</Icon>{i18nDescription}</div> : null}
          <RichTextEditorToolbar id={this.uuid} i18n={this.props.i18n} language={this.props.language}/>
          <ReactQuill
            className={this.props.classes.quill + (this.state.focused ? " focused" : "")}
            disabled={this.props.state.enforced}
            modules={{
              toolbar: {
                container: "#" + this.uuid,
              },
            }}
            theme={null}
            placeholder={i18nPlaceholder}
            value={editorValue}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </div>
        <div className={this.props.classes.errorMessage}>
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
