import React from "react";
import { IPropertyEntryProps, getClassName } from ".";
import PropertyEntryField from "./PropertyEntryField";
import { InputLabel, Icon, IconButton } from "@material-ui/core";
import ReactQuill from "react-quill";
import equals from "deep-equal";
import Toolbar from "@material-ui/core/Toolbar";
import uuid from "uuid";
import { LocaleDataContext, LocaleContext } from "../../..";

import "react-quill/dist/quill.core.css";
import "../../../../theme/quill.scss";

function RichTextEditorToolbar(props: {id: string}) {
  return (
    <LocaleContext.Consumer>
      {(currentLocale) => <LocaleDataContext.Consumer>
        {(localeData) =>
          <Toolbar id={props.id}>
            <IconButton
              title={localeData.locales[currentLocale.state].format_bold}
              classes={{root: "ql-bold"}}
            >
              <Icon>format_bold</Icon>
            </IconButton>
            <IconButton
              title={localeData.locales[currentLocale.state].format_italic}
              classes={{root: "ql-italic"}}
            >
              <Icon>format_italic</Icon>
            </IconButton>
            <IconButton
              title={localeData.locales[currentLocale.state].format_underline}
              classes={{root: "ql-underline"}}
            >
              <Icon>format_underline</Icon>
            </IconButton>
            <IconButton
              title={localeData.locales[currentLocale.state].format_title}
              classes={{root: "ql-header"}}
              value="1"
            >
              <Icon>title</Icon>
            </IconButton>
            <span className="ql-divider"/>
            <IconButton
              title={localeData.locales[currentLocale.state].format_quote}
              classes={{root: "ql-blockquote"}}
            >
              <Icon>format_quote</Icon>
            </IconButton>
            <span className="ql-divider"/>
            <IconButton
              title={localeData.locales[currentLocale.state].format_list_numbered}
              classes={{root: "ql-list"}}
              value="ordered"
            >
              <Icon>format_list_numbered</Icon>
            </IconButton>
            <IconButton
              title={localeData.locales[currentLocale.state].format_list_bulleted}
              classes={{root: "ql-list"}}
              value="bullet"
            >
              <Icon>format_list_bulleted</Icon>
            </IconButton>
            <span className="ql-divider"/>
            <IconButton
              title={localeData.locales[currentLocale.state].format_add_image}
              classes={{root: ""}}
            >
              <Icon>insert_photo</Icon>
            </IconButton>
            <IconButton
              title={localeData.locales[currentLocale.state].format_add_video}
              classes={{root: ""}}
            >
              <Icon>video_library</Icon>
            </IconButton>
            <IconButton
              title={localeData.locales[currentLocale.state].format_add_file}
              classes={{root: ""}}
            >
              <Icon>attach_file</Icon>
            </IconButton>
          </Toolbar>
        }
      </LocaleDataContext.Consumer>
    }
    </LocaleContext.Consumer>
  );
}

interface IRichTextEditorState {
  focused: boolean;
}

class RichTextEditor extends React.Component<IPropertyEntryProps, IRichTextEditorState> {
  private uuid: string;
  constructor(props: IPropertyEntryProps) {
    super(props);

    this.state = {
      focused: false,
    };

    this.uuid =  "uuid-" + uuid.v4();

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  public shouldComponentUpdate(nextProps: IPropertyEntryProps, nextState: IRichTextEditorState) {
    return (
      nextState.focused !== this.state.focused ||
      !equals(nextProps.value, this.props.value)
    );
  }
  public onChange(value: string) {
    if (
      value === "<p><br></p>" ||
      value === "<p><span class=\"ql-cursor\">\ufeff</span></p>"
    ) {
      this.props.onChange(null, null);
      return;
    }
    this.props.onChange(value, null);
  }
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
    const editorValue = this.props.value.value ?
      this.props.value.value as string :
      "";

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

    const icon = this.props.property.getIcon();
    const iconComponent = icon ? (
      <Icon>{icon}</Icon>
    ) : null;

    return (
      <div className="property-entry--container">
        <div className={className + (this.state.focused ? " focused" : "")}>
          <InputLabel
            classes={{
              root: "property-field--label",
              focused: "focused",
            }}
            focused={this.state.focused}
          >
            {iconComponent}{i18nLabel}
          </InputLabel>
          <RichTextEditorToolbar id={this.uuid}/>
          <ReactQuill
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
