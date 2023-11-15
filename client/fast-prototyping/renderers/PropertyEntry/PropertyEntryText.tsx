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
import { materialUIElementWrappers } from "../../components/slate/element-wrappers";

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
  labelContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  label: (isInvalid: boolean, richText: boolean) => {
    const base = {
      "color": isInvalid ? "#f44336" : "rgb(66, 66, 66)",
      "&.focused": {
        color: isInvalid ? "#f44336" : "#3f51b5",
      },
    };

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
    this.onChange = this.onChange.bind(this);
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
  public onChange(value: string, internalValue: any) {
    this.props.onChange({
      value,
      // by default the language is unspecified and when submitted
      // it will use whatever the language override is or whatever
      // the language is set as to be, so it will inherit that
      // but if a language is specified it will use that
      // instead
      language: this.props.languageOverride || null,
    }, internalValue);
  }
  public render() {
    // the icon as usual
    let icon: React.ReactNode;
    if (this.props.canRestore && !this.props.args.disableRestore) {
      if (this.props.currentAppliedValue) {
        icon = <RestoreIcon />
      } else {
        icon = <ClearIcon />
      }
    } else if (this.props.args.icon) {
      icon = this.props.args.icon;
    }
    const iconComponent = icon ? (
      <RestoreIconButton
        sx={style.icon}
        onClick={this.props.canRestore && !this.props.args.disableRestore ? this.props.onRestore : null}
      >
        {icon}
      </RestoreIconButton>
    ) : null;

    const startIconComponent = this.props.args.startIcon ? (
      <RestoreIconButton
        sx={style.icon}
      >
        {this.props.args.startIcon}
      </RestoreIconButton>
    ) : null;

    const descriptionAsAlert = this.props.args["descriptionAsAlert"];

    // extending element wrappers
    let elementWrappers = materialUIElementWrappers;
    if (this.props.args.elementWrappers) {
      elementWrappers = { ...elementWrappers };
      Object.keys(this.props.args.elementWrappers).forEach((k) => {
        if (elementWrappers[k]) {
          elementWrappers[k] = { ...elementWrappers[k] };
          Object.keys(this.props.args.elementWrappers[k]).forEach((k2) => {
            elementWrappers[k][k2] = this.props.args.elementWrappers[k][k2];
          });
        } else {
          elementWrappers[k] = this.props.args.elementWrappers[k];
        }
      });
    }

    const editor =
      <SlateEditor
        id={this.props.uniqueId}
        features={this.props.args.features ? { ...this.props.features, ...this.props.args.features } : this.props.features}
        value={this.props.currentValueText}
        autoFocus={this.props.autoFocus}
        currentValue={this.props.currentInternalValue}
        onChange={this.onChange}
        onInsertFile={this.props.onInsertFile}
        onInsertFileFromURL={this.props.onInsertFileFromURL}
        onRetrieveFile={this.props.onRetrieveFile}
        onRetrieveImage={this.props.onRetrieveImage}
        // onRetrieveDataURI={this.props.onRetrieveDataURI}
        isRichText={this.props.isRichText}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        rootContext={this.props.args.context || null}
        currentValid={this.props.currentValid}
        currentLoadError={this.props.lastLoadedFileError}
        currentGeneralErrorElementId={!this.props.args.hideError && !this.props.currentValid ? this.props.uniqueId + "_error" : null}
        currentDescribedBy={this.props.description ? this.props.uniqueId + "_desc" : null}
        dismissCurrentLoadError={this.props.dismissLastLoadedFileError}
        Wrapper={this.props.args.Wrapper || MaterialUISlateWrapper}
        elementWrappers={elementWrappers as any}
        elementWrappersArgs={
          {
            i18nGenericError: this.props.i18nGenericError,
            i18nOk: this.props.i18nOk,
            i18nRichInfo: this.props.i18nRichInfo,
            ...this.props.args.elementWrapperArgs,
          }
        }
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
        scrollMarginTop={this.props.args.scrollMarginTop}
        lang={this.props.currentValueLang}
      />

    if (this.props.args.disjointedMode) {
      return editor;
    }

    const isInvalid = shouldShowInvalid(this.props);

    const fieldLabel = (
      this.props.label ? <Box
        sx={this.props.isRichText ? style.labelSingleLine : style.labelNoToolbar}
      >
        <Box
          sx={style.labelContainer}
        >
          {startIconComponent}
          <InputLabel
            htmlFor={this.props.uniqueId}
            sx={style.label(isInvalid, this.props.isRichText)}
            classes={{
              focused: "focused",
            }}
            focused={this.state.focused}
          >
            {capitalize(this.props.label)}
          </InputLabel>
        </Box>
        {iconComponent}
      </Box> : null
    );

    let descriptionObject: React.ReactNode = null;
    if (this.props.description) {
      descriptionObject = descriptionAsAlert ? (
        <Alert severity="info" sx={style.description} role="note" id={this.props.uniqueId + "_desc"}>
          {this.props.description}
        </Alert>
      ) : (
        <Typography variant="caption" sx={style.description} id={this.props.uniqueId + "_desc"}>
          {this.props.description}
        </Typography>
      );
    }

    const error = (
      this.props.args.hideError ? null : <Box sx={style.errorMessage} id={this.props.uniqueId + "_error"}>
        {this.props.currentInvalidReason}
      </Box>
    );

    let inner: React.ReactNode;
    if (this.props.args.useCustomFieldRender) {
      inner = this.props.args.useCustomFieldRender(descriptionObject, fieldLabel, editor, error, this.props.disabled);
    } else {
      inner = (
        <>
          {descriptionObject}
          <div>
            {fieldLabel}
            {editor}
          </div>
          {error}
        </>
      )
    }

    // we return the component, note how we set the thing to focused
    return (
      <Box sx={style.container}>
        {inner}
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
