import React from "react";
import PropertyEntryText from "./PropertyEntryText";
import { InputLabel, Icon, IconButton, ThemeProvider, Typography } from "@material-ui/core";
import ReactQuill from "react-quill";
import { DeltaStatic, Sources } from "quill";
import equals from "deep-equal";
import Toolbar from "@material-ui/core/Toolbar";
import { IPropertyEntryTextRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import { IPropertyEntryThemeType, STANDARD_THEME } from "./styles";
import { Alert } from "@material-ui/lab";
import {
  WithStyles,
  withStyles,
  createStyles,
} from "@material-ui/styles";
import uuid from "uuid";

import AttachFileIcon from "@material-ui/icons/AttachFile";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import TitleIcon from "@material-ui/icons/Title";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatBoldIcon from "@material-ui/icons/FormatBold";

import "react-quill/dist/quill.core.css";
import "../../../internal/theme/quill.scss";
import { capitalize } from "../../../../util";
import { LAST_RICH_TEXT_CHANGE_LENGTH } from "../../../../constants";


function shouldShowInvalid(props: IPropertyEntryTextRendererProps) {
  return !props.currentValid;
}
export const style = (theme: IPropertyEntryThemeType) => createStyles({
  entry: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    width: theme.containerWidth,
  },
  description: {
    width: "100%",
  },
  errorMessage: {
    color: theme.invalidColor,
    height: theme.errorMessageContainerSize,
    fontSize: theme.errorMessageFontSize,
  },
  icon: (props: IPropertyEntryTextRendererProps) => ({
    color: shouldShowInvalid(props) ? theme.invalidColor : theme.iconColor,
  }),
  iconButton: {
    "backgroundColor": "#2196f3",
    "color": "#fff",
    "&:hover": {
      backgroundColor: "#1976d2",
    },
  },
  textButton: {
    border: "solid 1px rgba(0,0,0,0.1)",
    display: "flex",
    minWidth: "50px",
    height: "50px",
    padding: "0 10px",
    margin: "0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
  },
  label: (props: IPropertyEntryTextRendererProps) => ({
    "padding": "1rem 0",
    "color": shouldShowInvalid(props) ? theme.labelInvalidColor : theme.labelColor,
    "&.focused": {
      color: shouldShowInvalid(props) ? theme.labelInvalidFocusedColor : theme.labelFocusedColor,
    },
  }),
  labelSingleLine: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quill: (props: IPropertyEntryTextRendererProps) => {
    const shouldShowInvalidQuill = shouldShowInvalid(props);
    return {
      "position": "relative",
      // this is the colur when the field is out of focus
      "&::before": {
        left: 0,
        right: 0,
        bottom: 0,
        content: "'\\00a0'",
        position: "absolute",
        transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        borderBottom: "1px solid " +
          (shouldShowInvalidQuill ? theme.fieldBorderInvalidColor : theme.fieldBorderColor),
        pointerEvents: "none",
      },
      // the color that pops up when the field is in focus
      "&::after": {
        left: 0,
        bottom: 0,
        right: 0,
        content: "''",
        position: "absolute",
        transform: "scaleX(0)",
        transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
        borderBottom: "2px solid " +
          (shouldShowInvalidQuill ? theme.fieldBorderInvalidColorFocused : theme.fieldBorderColorFocused),
        pointerEvents: "none",
      },
      // during the hover event
      "&.focused::after": {
        transform: "none",
      },
    };
  },
});

// TODO implement missing toolbar functionality
function RichTextEditorToolbar(props: {
  id: string,
  i18n: {
    formatBoldLabel: string,
    formatItalicLabel: string;
    formatUnderlineLabel: string;
    formatTitleLabel: string;
    formatQuoteLabel: string;
    formatListNumberedLabel: string;
    formatListBulletedLabel: string;
    formatAddImageLabel: string;
    formatAddVideoLabel: string;
    formatAddFileLabel: string;
  },
  supportsMedia: boolean;
}) {
  return (
    <Toolbar id={props.id}>
      <IconButton
        title={props.i18n.formatBoldLabel}
        classes={{root: "ql-bold"}}
      >
        <FormatBoldIcon/>
      </IconButton>
      <IconButton
        title={props.i18n.formatItalicLabel}
        classes={{ root: "ql-italic" }}
      >
        <FormatItalicIcon/>
      </IconButton>
      <IconButton
        title={props.i18n.formatUnderlineLabel}
        classes={{ root: "ql-underline" }}
      >
        <FormatUnderlinedIcon/>
      </IconButton>
      <IconButton
        title={props.i18n.formatTitleLabel}
        classes={{ root: "ql-header" }}
        value="1"
      >
        <TitleIcon/>
      </IconButton>
      <span className="ql-divider" />
      <IconButton
        title={props.i18n.formatQuoteLabel}
        classes={{ root: "ql-blockquote" }}
      >
        <FormatQuoteIcon/>
      </IconButton>
      <span className="ql-divider" />
      <IconButton
        title={props.i18n.formatListNumberedLabel}
        classes={{ root: "ql-list" }}
        value="ordered"
      >
        <FormatListNumberedIcon/>
      </IconButton>
      <IconButton
        title={props.i18n.formatListBulletedLabel}
        classes={{ root: "ql-list" }}
        value="bullet"
      >
        <FormatListBulletedIcon/>
      </IconButton>
      {
        props.supportsMedia ?
        (
          <React.Fragment>
            <span className="ql-divider" />
            <IconButton
              title={props.i18n.formatAddImageLabel}
              classes={{ root: "" }}
            >
              <InsertPhotoIcon/>
            </IconButton>
            <IconButton
              title={props.i18n.formatAddVideoLabel}
              classes={{ root: "" }}
            >
              <VideoLibraryIcon/>
            </IconButton>
            <IconButton
              title={props.i18n.formatAddFileLabel}
              classes={{ root: "" }}
            >
              <AttachFileIcon/>
            </IconButton>
          </React.Fragment>
        ) : null
      }
    </Toolbar>
  );
}

interface IPropertyEntryTextRendererWithStylesProps extends IPropertyEntryTextRendererProps, WithStyles<typeof style> {
}

interface IPropertyEntryTextRendererState {
  focused: boolean;
}

class ActualPropertyEntryTextRenderer extends React.PureComponent<IPropertyEntryTextRendererWithStylesProps, IPropertyEntryTextRendererState> {
  // this one also gets an uuid
  private uuid: string;
  constructor(props: IPropertyEntryTextRendererWithStylesProps) {
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
  public onChange(value: string, delta: DeltaStatic, sources: Sources, editor: ReactQuill.UnprivilegedEditor) {
    // on change, these values are basically empty
    // so we set to null, however in some circumstances
    // they are unavoidable, use a value larger than 1 for min
    // if the field is not nullable
    if (
      value === "<p><br></p>" ||
      value === "<p><span class=\"ql-cursor\">\ufeff</span></p>"
    ) {
      if (window) {
        (window as any)[LAST_RICH_TEXT_CHANGE_LENGTH] = 0;
      }
      this.props.onChange(null, null);
      return;
    } else if (window) {
      const actualLenght = editor.getText().replace(/\n/g, "").length;
      (window as any)[LAST_RICH_TEXT_CHANGE_LENGTH] = actualLenght;
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
    const editorValue = this.props.currentValue as string || "";

    // the icon as usual
    const icon = this.props.icon;
    const iconComponent = icon ? (
      <span className={this.props.classes.icon}>{icon}</span>
    ) : null;

    const descriptionAsAlert = this.props.args["descriptionAsAlert"];

    // we return the component, note how we set the thing to focused
    // TODO disabled
    return (
      <div className={this.props.classes.container}>
        {
          this.props.description && descriptionAsAlert ?
          <Alert severity="info" className={this.props.classes.description}>
            {this.props.description}
          </Alert> :
          null
        }
        {
          this.props.description && !descriptionAsAlert ?
          <Typography variant="caption" className={this.props.classes.description}>
            {this.props.description}
          </Typography> :
          null
        }
        <div>
          <InputLabel
            classes={{
              root: this.props.classes.label + " " + this.props.classes.labelSingleLine,
              focused: "focused",
            }}
            focused={this.state.focused}
          >
            {capitalize(this.props.label)}{iconComponent}
          </InputLabel>
          <RichTextEditorToolbar id={this.uuid} i18n={this.props.i18nFormat} supportsMedia={this.props.supportsMedia}/>
          <ReactQuill
            className={this.props.classes.quill + (this.state.focused ? " focused" : "")}
            modules={{
              toolbar: {
                container: "#" + this.uuid,
              },
            }}
            theme={null}
            placeholder={capitalize(this.props.placeholder)}
            value={editorValue}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </div>
        <div className={this.props.classes.errorMessage}>
          {this.props.currentInvalidReason}
        </div>
      </div>
    );
  }
}

const ActualPropertyEntryTextRendererWithStyles = withStyles(style)(ActualPropertyEntryTextRenderer);

export default function PropertyEntryTextRenderer(props: IPropertyEntryTextRendererProps) {
  let appliedTheme: IPropertyEntryThemeType = STANDARD_THEME;
  if (props.args["theme"]) {
    appliedTheme = {
      ...STANDARD_THEME,
      ...props.args["theme"],
    };
  }
  return (
    <ThemeProvider theme={appliedTheme}>
      <ActualPropertyEntryTextRendererWithStyles {...props}/>
    </ThemeProvider>
  )
}