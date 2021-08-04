/**
 * The behemoth that the entry fast prototyping is for the text type since text
 * types can be fairly complex, this renderer uses quill, quill also doesn't support SSR
 * so it must be double passed
 * 
 * This renderer is used for text/plain and text/html, aka rich text, but not with
 * any other non-subtype text, it will use the field instead
 * 
 * @module
 */
import React from "react";
import {
  InputLabel, IconButton, Typography, RestoreIcon, ClearIcon,
  WithStyles, withStyles, createStyles, Alert,
} from "../../mui-core";
import { IPropertyEntryTextRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import { SlateEditor } from "../../components/slate";
import { MaterialUISlateWrapper } from "../../components/slate/wrapper";

import { capitalize } from "../../../../util";

/**
 * A simple helper function that says when it should show invalid
 * @param props the renderer props
 * @returns a boolean on whether is invalid
 */
function shouldShowInvalid(props: IPropertyEntryTextRendererProps) {
  return !props.currentValid;
}

/**
 * The styles for the text entry
 */
export const style = createStyles({
  entry: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    width: "100%",
  },
  description: {
    width: "100%",
  },
  errorMessage: {
    color: "#f44336",
    height: "1.3rem",
    fontSize: "0.85rem",
  },
  icon: {
    color: "#424242",
  },
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
    "color": shouldShowInvalid(props) ? "#f44336" : "rgb(66, 66, 66)",
    "&.focused": {
      color: shouldShowInvalid(props) ? "#f44336" : "#3f51b5",
    },
  }),
  labelSingleLine: {
    padding: "1rem 0",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "5rem",
  },
  labelNoToolbar: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "5rem",
    padding: "1rem 0 0 0",
  },
  editor: (props: IPropertyEntryTextRendererProps) => {
    const shouldShowInvalidEditor = shouldShowInvalid(props);
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
          (shouldShowInvalidEditor ? "#e57373" : "rgba(0,0,0,0.42)"),
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
          (shouldShowInvalidEditor ? "#f44336" : "#3f51b5"),
        pointerEvents: "none",
      },
      // during the hover event
      "&.focused::after": {
        transform: "none",
      },
    };
  },
  rawTextArea: {
    width: "100%",
    border: "none",
    outline: "none",
    boxShadow: "none",
    resize: "none",
    padding: "12px 15px",
    fontSize: "1rem",
    overflow: "hidden",
  }
});

interface IPropertyEntryTextRendererState {
  focused: boolean;
}


/**
 * The text renderer styles
 */
interface IPropertyEntryTextRendererWithStylesProps extends IPropertyEntryTextRendererProps, WithStyles<typeof style> {
}

/**
 * The class that does the magic
 */
class ActualPropertyEntryTextRenderer extends React.PureComponent<IPropertyEntryTextRendererWithStylesProps, IPropertyEntryTextRendererState> {
  constructor(props: IPropertyEntryTextRendererWithStylesProps) {
    super(props);

    this.state = {
      focused: false,
    }

    // basic functions
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  public onFocus() {
    this.setState({
      focused: true,
    });
  }
  public onBlur() {
    this.props.enableUserSetErrors();
    this.setState({
      focused: false,
    });
  }
  public render() {
    // the icon as usual
    let icon: React.ReactNode;
    if (this.props.canRestore) {
      if (this.props.currentAppliedValue) {
        icon = <RestoreIcon />
      } else {
        icon = <ClearIcon />
      }
    } else if (this.props.icon) {
      icon = this.props.icon;
    }
    const iconComponent = icon ? (
      <IconButton
        tabIndex={-1}
        className={this.props.classes.icon}
        onClick={this.props.canRestore ? this.props.onRestore : null}
      >
        {icon}
      </IconButton>
    ) : null;

    const descriptionAsAlert = this.props.args["descriptionAsAlert"];

    const editor =
      <SlateEditor
        id={this.props.propertyId}
        features={this.props.args.features ? {...this.props.features, ...this.props.args.features} : this.props.features}
        value={this.props.currentValue}
        autoFocus={this.props.autoFocus}
        internalValue={this.props.currentInternalValue}
        onChange={this.props.onChange}
        onInsertFile={this.props.onInsertFile}
        onInsertFileFromURL={this.props.onInsertFileFromURL}
        onCheckFileExists={this.props.onCheckFileExists}
        onRetrieveDataURI={this.props.onRetrieveDataURI}
        isRichText={this.props.isRichText}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        rootContext={this.props.args.context || null}
        currentValid={this.props.currentValid}
        currentLoadError={this.props.lastLoadedFileError}
        dismissCurrentLoadError={this.props.dismissLastLoadedFileError}
        Wrapper={this.props.args.Wrapper || MaterialUISlateWrapper}
        rootI18n={this.props.i18nRoot}
        placeholder={this.props.placeholder}
        wrapperArgs={
          {
            i18nGenericError: this.props.i18nGenericError,
            i18nOk: this.props.i18nOk,
            i18nRichInfo: this.props.i18nRichInfo,
            ...this.props.args.wrapperArgs,
          }
        }
        toolbarExtras={
          this.props.args.toolbarExtras
        }
        customToolbar={
          this.props.args.customToolbar
        }
        drawerExtras={
          this.props.args.drawerExtras
        }
        hideDrawer={
          this.props.args.hideDrawer
        }
        drawerMode={
          this.props.args.drawerMode
        }
        hideTree={
          this.props.args.hideTree
        }
        disjointedMode={
          this.props.args.disjointedMode
        }
      />

    if (this.props.args.disjointedMode) {
      return editor;
    }

    // we return the component, note how we set the thing to focused
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
          {this.props.label ? <InputLabel
            htmlFor={this.props.propertyId}
            classes={{
              root: this.props.classes.label + " " +
                (this.props.isRichText ? this.props.classes.labelSingleLine : this.props.classes.labelNoToolbar),
              focused: "focused",
            }}
            focused={this.state.focused}
          >
            {capitalize(this.props.label)}{iconComponent}
          </InputLabel> : null}
          {editor}
        </div>
        <div className={this.props.classes.errorMessage}>
          {this.props.currentInvalidReason}
        </div>
      </div>
    );
  }
}

/**
 * The property entry text renderer, note that this renderer isn't used only for rich text
 * but rather for any text type that is either plain or html, a text without a subtype
 * will use the same as field
 */
const PropertyEntryTextRenderer = withStyles(style)(ActualPropertyEntryTextRenderer);
export default PropertyEntryTextRenderer;
