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
import { IPropertyEntryTextRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import { SlateEditor } from "../../components/slate";
import { MaterialUISlateWrapper } from "../../components/slate/wrapper";

import { capitalize } from "../../../../util";
import Alert from '@mui/material/Alert';
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import RestoreIcon from "@mui/icons-material/Restore";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import { RestoreIconButton } from "./general";

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
export const style = {
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
  label: (isInvalid: boolean, richText: boolean) => {
    const base = {
      "color": isInvalid ? "#f44336" : "rgb(66, 66, 66)",
      "&.focused": {
        color: isInvalid ? "#f44336" : "#3f51b5",
      },
    };

    if (richText) {
      Object.assign(base, style.labelSingleLine);    
    } else {
      Object.assign(base, style.labelNoToolbar); 
    }

    return base;
  },
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
};

interface IPropertyEntryTextRendererState {
  focused: boolean;
}

/**
 * The class that does the magic
 */
class PropertyEntryTextRenderer extends React.PureComponent<IPropertyEntryTextRendererProps, IPropertyEntryTextRendererState> {
  constructor(props: IPropertyEntryTextRendererProps) {
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
      <RestoreIconButton
        sx={style.icon}
        onClick={this.props.canRestore ? this.props.onRestore : null}
      >
        {icon}
      </RestoreIconButton>
    ) : null;

    const descriptionAsAlert = this.props.args["descriptionAsAlert"];

    const editor =
      <SlateEditor
        id={this.props.propertyId}
        features={this.props.args.features ? { ...this.props.features, ...this.props.args.features } : this.props.features}
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
        disabled={this.props.disabled}
        wrapperArgs={
          {
            i18nGenericError: this.props.i18nGenericError,
            i18nOk: this.props.i18nOk,
            i18nRichInfo: this.props.i18nRichInfo,
            ...this.props.args.wrapperArgs,
          }
        }
      />

    if (this.props.args.disjointedMode) {
      return editor;
    }

    // we return the component, note how we set the thing to focused
    const isInvalid = shouldShowInvalid(this.props);
    return (
      <Box sx={style.container}>
        {
          this.props.description && descriptionAsAlert ?
            <Alert severity="info" sx={style.description}>
              {this.props.description}
            </Alert> :
            null
        }
        {
          this.props.description && !descriptionAsAlert ?
            <Typography variant="caption" sx={style.description}>
              {this.props.description}
            </Typography> :
            null
        }
        <div>
          {this.props.label ? <InputLabel
            htmlFor={this.props.propertyId}
            sx={style.label(isInvalid, this.props.isRichText)}
            classes={{
              focused: "focused",
            }}
            focused={this.state.focused}
          >
            {capitalize(this.props.label)}{iconComponent}
          </InputLabel> : null}
          {editor}
        </div>
        <Box sx={style.errorMessage}>
          {this.props.currentInvalidReason}
        </Box>
      </Box>
    );
  }
}

/**
 * The property entry text renderer, note that this renderer isn't used only for rich text
 * but rather for any text type that is either plain or html, a text without a subtype
 * will use the same as field
 */
export default PropertyEntryTextRenderer;
