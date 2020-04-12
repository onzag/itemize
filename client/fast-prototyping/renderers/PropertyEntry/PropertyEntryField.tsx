import React from "react";
import TextField from "@material-ui/core/TextField";
import {
  MenuItem,
  Paper,
  InputAdornment,
  IconButton,
  ThemeProvider,
} from "@material-ui/core";
import {
  WithStyles,
  withStyles,
  createStyles,
} from "@material-ui/styles";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { IPropertyEntryFieldRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryField";
import { IPropertyEntryThemeType, STANDARD_THEME } from "./styles";
import { IAutocompleteOutputType } from "../../../../base/Autocomplete";
import IconVisibilityOff from "@material-ui/icons/VisibilityOff";
import IconVisibility from "@material-ui/icons/Visibility";
import { Alert } from "@material-ui/lab";

function shouldShowInvalid(props: IPropertyEntryFieldRendererProps) {
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
  icon: (props: IPropertyEntryFieldRendererProps) => ({
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
  label: (props: IPropertyEntryFieldRendererProps) => ({
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
  fieldInput: (props: IPropertyEntryFieldRendererProps) => {
    if (shouldShowInvalid(props)) {
      return {
        "width": "100%",
        // this is the colur when the field is out of focus
        "&::before": {
          borderBottomColor: theme.fieldBorderInvalidColor,
        },
        // the color that pops up when the field is in focus
        "&::after": {
          borderBottomColor: theme.fieldBorderInvalidColorFocused,
        },
        // during the hover event
        "&:hover::before": {
          borderBottomColor: props.disabled ? theme.fieldBorderColor : theme.fieldBorderInvalidColorFocused,
        },
      };
    }
    return {
      "width": "100%",
      "&::before": {
        borderBottomColor: theme.fieldBorderColor,
      },
      "&::after": {
        borderBottomColor: theme.fieldBorderColorFocused,
      },
      "&:hover::before": {
        borderBottomColor: theme.fieldBorderColorFocused,
      },
    };
  },
  selectFieldIconWhenAddornmentIsActive: {
    right: "46px",
  },
  unitDialog: {
    minWidth: "400px",
  },
  unitDialogSubheader: {
    backgroundColor: "white",
    borderBottom: "solid 1px #eee",
  },
  autocompleteContainer: {
    position: "relative",
    display: "block",
    width: "100%",
  },
  autocompleteContainerOpen: {

  },
  autocompleteInput: {

  },
  autocompleteInputOpen: {

  },
  autocompleteSuggestionsContainer: {
    position: "absolute" as "absolute",
    display: "block",
    width: "100%",
    top: `calc(100% - ${theme.errorMessageContainerSize})`,
    zIndex: 1000,
  },
  autocompleteSuggestionsContainerOpen: {

  },
  autocompleteSuggestionsList: {

  },
  autocompleteSuggestion: {

  },
  autocompleteFirstSuggestion: {

  },
  autocompleteSuggestionHighlighted: {

  },
  autocompleteSectionContainer: {

  },
  autocompleteFirstSectionContainer: {

  },
  autocompleteSectionTitle: {

  },
  autocompleteMenuItem: {
    height: "auto",
    paddingTop: 4,
    paddingBottom: 8,
  },
  autocompleteMenuItemMainText: {
    fontSize: theme.autocompleteMenuItemFontSize,
    lineHeight: theme.autocompleteMenuItemFontSize,
  },
  autocompleteMenuItemSubText: {
    fontSize: theme.autocompleteMenuItemSubFontSize,
    lineHeight: theme.autocompleteMenuItemSubFontSize,
  },
  locationAlternativeTextHeader: {
    height: theme.locationAlternativeTextHeaderHeight,
    fontSize: theme.locationAlternativeTextHeaderFontSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  locationMapContainer: {

  },
  quill: (props: IPropertyEntryFieldRendererProps) => {
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
  file: {
    "width": "125px",
    "padding": "25px 0",
    "alignSelf": "flex-start",
    "&:hover $imageThumbnail": {
      boxShadow: "0 0 5px 2px #42a5f5",
    },
    "&:hover $fileDeleteButton": {
      color: "#f44336",
    },
  },
  fileRejected: {
    "& $imageThumbnail": {
      boxShadow: "0 0 5px 2px #e57373",
    },
    "&:hover $imageThumbnail": {
      boxShadow: "0 0 5px 2px #f44336",
    },
    "& $fileName, & $fileSize, & $fileRejectedDescription, & $fileIcon": {
      color: "#e57373",
    },
    "&:hover $fileName, &:hover $fileSize, &:hover $fileRejectedDescription, &:hover $fileIcon": {
      color: "#f44336",
    },
  },
  fileDataContainer: {
    height: "75px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  fileDeleteButton: {
    top: "-25px",
    right: 0,
    position: "absolute",
  },
  fileName: {
    width: "100%",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "0.75rem",
  },
  fileSize: {
    width: "100%",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "0.75rem",
    opacity: "0.75",
  },
  fileRejectedDescription: {
    width: "100%",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "0.75rem",
  },
  fileIcon: {
    fontSize: "75px",
    color: "#424242",
  },
  fileMimeType: {
    position: "absolute",
    color: "white",
    width: "100%",
    fontSize: "16px",
    textAlign: "center",
    padding: "0 40px",
    bottom: "15px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  filesPaper: {
    marginTop: "5px",
    backgroundColor: "rgba(0, 0, 0, 0.09)",
    width: "100%",
    minHeight: "200px",
    height: "auto",
    alignItems: "center",
    justifyContent: "flex-start",
    display: "flex",
    cursor: "pointer",
    position: "relative",
    padding: "20px",
    flexWrap: "wrap",
  },
  filesPaperSingleFile: {
    justifyContent: "center",
  },
  filesPlaceholder: {
    flexGrow: 2,
    display: "block",
    textAlign: "center",
    fontSize: "1rem",
    userSelect: "none",
    color: "rgb(117, 117, 117)",
    borderRadius: "25px",
    border: "dotted 2px #ccc",
    padding: "25px 0",
    margin: "0 25px",
  },
  filesPlaceholderAccepting: {
    borderColor: "#42a5f5",
  },
  filesPlaceholderRejecting: {
    borderColor: "#f44336",
  },
  filesIconAdd: {
    opacity: 0.1,
    fontSize: "100px",
  },
  filesSingleFileButtonContainer: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    display: "flex",
  },
  filesSingleFileButton: {
    flexGrow: 1,
  },
  filesSingleFileButtonIcon: {
    marginLeft: "0.75rem",
  },
  imageThumbnail: {
    height: "100%",
    borderRadius: "3px",
  },
});


interface IPropertyEntryFieldRendererWithStylesProps extends IPropertyEntryFieldRendererProps, WithStyles<typeof style> {
}

interface IPropertyEntryFieldRendererState {
  visible: boolean;
}

class ActualPropertyEntryFieldRenderer
  extends React.Component<IPropertyEntryFieldRendererWithStylesProps, IPropertyEntryFieldRendererState> {

  private inputRef: HTMLInputElement;
  private inputRefSelectionStart: number;

  constructor(props: IPropertyEntryFieldRendererWithStylesProps) {
    super(props);

    this.state = {
      visible: props.type !== "password",
    }

    this.toggleVisible = this.toggleVisible.bind(this);
    this.catchToggleMouseDownEvent = this.catchToggleMouseDownEvent.bind(this);
    this.onChangeByHTMLEvent = this.onChangeByHTMLEvent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderBasicTextField = this.renderBasicTextField.bind(this);
    this.renderAutosuggestContainer = this.renderAutosuggestContainer.bind(this);
    this.renderAutosuggestField = this.renderAutosuggestField.bind(this);
    this.renderAutosuggestSuggestion = this.renderAutosuggestSuggestion.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
  }

  public componentDidMount() {
    if (this.props.autoFocus && this.inputRef) {
      this.inputRef.focus();
    }
  }

  public toggleVisible(e: React.MouseEvent) {
    e.preventDefault();
    this.setState({
      visible: !this.state.visible,
    });

    if (this.inputRef) {
      // we focus
      this.inputRef.focus();

      // BUG in latest chrome causes the input caret location
      // to be lost so we need to gain the location again
      // now we check we can set the caret
      // This is unecessary in FF and other browsers
      if (
        typeof this.inputRefSelectionStart !== "undefined" &&
        typeof this.inputRef.setSelectionRange !== "undefined"
      ) { 
        // We need to do it in a timeout of 0 because chrome reports
        // the wrong caret location and will refuse to update otherwise
        // adding this as a side effect say as a callback of setState
        // does not work, only this works...
        setTimeout(() => {
          this.inputRef.setSelectionRange(
            this.inputRefSelectionStart,
            this.inputRefSelectionStart,
          );
        }, 0);
      }
    }
  }

  public catchToggleMouseDownEvent(e: React.MouseEvent) {
    e.preventDefault();

    // BUG in latest chrome causes the input caret location to be lost
    // the so we save the location of the caret
    if (this.inputRef && typeof this.inputRef.selectionStart !== "undefined") {
      this.inputRefSelectionStart = this.inputRef.selectionStart;
    }
  }

  public render() {
    if (this.props.autocompleteMode) {
      return this.renderAutosuggestField();
    }

    return this.renderBasicTextField();
  }

  public onChangeByHTMLEvent(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    this.onChange(e);
  }

  public onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    autosuggestOverride?: Autosuggest.ChangeEvent,
  ) {
    // the change has two values, a textual value, and a
    // numeric value, texual value is always set but
    // numeric value is only set for numbers
    let value: string = null;
    let internalValue: string = null;

    // the autosuggest override has priority
    if (autosuggestOverride) {
      value = autosuggestOverride.newValue;
      internalValue = value;
      if (this.props.autocompleteIsLocalized) {
        const suggestionFound = this.props.autocompleteSuggestions.find((s) => s.i18n === internalValue);
        value = suggestionFound ? suggestionFound.value : value;
      }
    } else {
      value = e.target.value.toString();
      internalValue = value;
    }

    this.props.onChange(value, internalValue);
  }

  public renderBasicTextField(textFieldProps?: any) {
    // set the input mode, this is for mobile,
    // basically according to our input we need
    // different keys
    let inputMode = "text";
    if (this.props.subtype === "email") {
      inputMode = "email";
    }

    // these are the inputProps of the small input
    const inputProps = {
      inputMode,
      autoComplete: this.props.htmlAutocomplete,
    };

    // these are the TextField props that are applied
    let appliedTextFieldProps: any = {};
    // these are applied to the Input element
    let appliedInputProps: any = {
      inputRef: (node: HTMLInputElement) => {
        this.inputRef = node;
      },
    };

    // if there are textFieldProps
    if (textFieldProps) {
      // we need to extract the ref setting
      const { inputRef = () => {return; } , ref, ...other } = textFieldProps;
      // set all the other properties as applied to the TextField
      appliedTextFieldProps = other;

      // and we need to setup the ref setting and rescue our function
      // so that we can have the ref too for the Input
      appliedInputProps = {
        inputRef: (node: HTMLInputElement) => {
          ref(node);
          inputRef(node);

          this.inputRef = node;
        },
      };

      // if we have a className, it will inevitably override our class name
      // but we need ours too, so let's merge it in the TextField
      if (appliedTextFieldProps.className) {
        appliedTextFieldProps.className += " " + this.props.classes.entry;
      }

      // if there are small inputProps, they will override our inputProps,
      // of the input mode and autocomplete html, so we need to merge them
      if (appliedTextFieldProps.inputProps) {
        appliedTextFieldProps.inputProps = {
          ...inputProps,
          ...appliedTextFieldProps.inputProps,
        };
      }
    }

    // if the type is a password
    if (this.props.type === "password") {
      // set the end addornment for the show and hide button
      appliedInputProps.endAdornment = (
        <InputAdornment position="end">
          <IconButton
            classes={{root: this.props.classes.iconButton}}
            onClick={this.toggleVisible}
            onMouseDown={this.catchToggleMouseDownEvent}
          >
            {this.state.visible ? <IconVisibility/> : <IconVisibilityOff/>}
          </IconButton>
        </InputAdornment>
      );
    } else if (this.props.icon) {
      // set it at the end
      appliedInputProps.endAdornment = (
        <InputAdornment position="end">
          {this.props.icon}
        </InputAdornment>
      );
    }

    // return the complex overengineered component in all its glory
    return (
      <div className={this.props.classes.container}>
        {
          this.props.description ?
          <Alert severity="info" className={this.props.classes.description}>
            {this.props.description}
          </Alert> :
          null
        }
        <TextField
          fullWidth={true}
          type={this.state.visible ? "text" : "password"}
          className={this.props.classes.entry}
          label={this.props.label}
          placeholder={this.props.placeholder}
          value={this.props.currentInternalValue || this.props.currentValue || ""}
          onChange={this.onChangeByHTMLEvent}
          InputProps={{
            classes: {
              root: this.props.classes.fieldInput,
              focused: "focused",
            },
            disabled: this.props.disabled,
            ...appliedInputProps,
          }}
          InputLabelProps={{
            classes: {
              root: this.props.classes.label,
              focused: "focused",
            },
          }}
          inputProps={inputProps}
          disabled={this.props.disabled}
          variant="filled"
          {...appliedTextFieldProps}
        />
        <div className={this.props.classes.errorMessage}>
          {this.props.currentInvalidReason}
        </div>
      </div>
    );
  }

  public renderAutosuggestContainer(
    options: Autosuggest.RenderSuggestionsContainerParams,
  ) {
    // returns the autosuggest container that contains the stuff
    // handled by react autossugest
    return (
      <Paper
        {...options.containerProps}
        square={true}
      >
        {options.children}
      </Paper>
    );
  }

  public renderAutosuggestSuggestion(
    suggestion: IAutocompleteOutputType,
    params: Autosuggest.RenderSuggestionParams,
  ) {
    // returns a specific suggestion

    // we match the value according to whether is localized or not
    // because we support numbers and stuff we need to know what value
    // we are matching against, a localized or non localized one
    const valueToMatch: string = this.props.autocompleteIsLocalized ?
      suggestion.i18n :
      suggestion.value;
    const matches = match(valueToMatch, params.query);
    const parts = parse(valueToMatch, matches);

    return (
      <MenuItem
        className={this.props.classes.autocompleteMenuItem}
        selected={params.isHighlighted}
        component="div"
      >
        <div className={this.props.classes.autocompleteMenuItemMainText}>
          {
            parts.map((part, index) =>
              part.highlight ? (
                <span key={index} style={{ fontWeight: 500 }}>
                  {part.text}
                </span>
              ) : (
                <strong key={index} style={{ fontWeight: 300 }}>
                  {part.text}
                </strong>
              ),
            )
          }
        </div>
      </MenuItem>
    );
  }

  public getSuggestionValue(
    suggestion: IAutocompleteOutputType,
  ) {
    // just return the suggestion value as it will want to
    // be set in the input, we localize it if deemed necessary
    return this.props.autocompleteIsLocalized ?
      suggestion.i18n :
      suggestion.value;
  }

  public onSuggestionsFetchRequested({ value }) {
    this.props.onRequestToFetchSuggestions(value);
  }

  public renderAutosuggestField() {
    return (
      <Autosuggest
        renderInputComponent={this.renderBasicTextField}
        renderSuggestionsContainer={this.renderAutosuggestContainer}
        renderSuggestion={this.renderAutosuggestSuggestion}
        getSuggestionValue={this.getSuggestionValue}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.props.onRequestToClearSuggestions}
        suggestions={this.props.autocompleteSuggestions}
        theme={{
          container: this.props.classes.autocompleteContainer,
          containerOpen: this.props.classes.autocompleteContainerOpen,
          input: this.props.classes.autocompleteInput,
          inputOpen: this.props.classes.autocompleteInputOpen,
          inputFocused: "focused",
          suggestionsContainer: this.props.classes.autocompleteSuggestionsContainer,
          suggestionsContainerOpen: this.props.classes.autocompleteSuggestionsContainerOpen,
          suggestionsList: this.props.classes.autocompleteSuggestionsList,
          suggestion: this.props.classes.autocompleteSuggestion,
          suggestionFirst: this.props.classes.autocompleteFirstSuggestion,
          suggestionHighlighted: this.props.classes.autocompleteSuggestionHighlighted,
          sectionContainer: this.props.classes.autocompleteSectionContainer,
          sectionContainerFirst: this.props.classes.autocompleteFirstSectionContainer,
          sectionTitle: this.props.classes.autocompleteSectionTitle,
        }}
        inputProps={{
          value: this.props.currentInternalValue || this.props.currentValue || "",
          onChange: this.onChange,
          disabled: this.props.disabled,
        }}
      />
    );
  }
}

const ActualPropertyEntryFieldRendererWithStyles = withStyles(style)(ActualPropertyEntryFieldRenderer);

export default function PropertyEntryFieldRenderer(props: IPropertyEntryFieldRendererProps) {
  let appliedTheme: IPropertyEntryThemeType = STANDARD_THEME;
  if (props.args["theme"]) {
    appliedTheme = {
      ...STANDARD_THEME,
      ...props.args["theme"],
    };
  }
  return (
    <ThemeProvider theme={appliedTheme}>
      <ActualPropertyEntryFieldRendererWithStyles {...props}/>
    </ThemeProvider>
  )
}