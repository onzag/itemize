/**
 * This file provides a fast prototyping renderer for the reference type, which is basically
 * an integer but acts differently
 * 
 * @packageDocumentation
 */

import React from "react";
import {
  WithStyles,
  withStyles,
  createStyles,
  InputAdornment,
  IconButton,
  Typography,
  TextField,
  ClearIcon,
  RestoreIcon,
  Alert,
  Paper,
  MenuItem,
} from "../../mui-core/index";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { IPropertyEntryReferenceRendererProps, IPropertyEntryReferenceOption } from "../../../internal/components/PropertyEntry/PropertyEntryReference";
import PropertyEntrySelectRenderer from "./PropertyEntrySelect";
import equals from "deep-equal";

/**
 * A simple helper function that says when it should show invalid
 * @param props the renderer props
 * @returns a boolean on whether is invalid
 */
function shouldShowInvalid(props: IPropertyEntryReferenceRendererProps) {
  return !props.currentValid;
}

/**
 * The styles for the reference
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
  standardAddornment: (props: IPropertyEntryReferenceRendererProps) => ({
    color: shouldShowInvalid(props) ? "#f44336" : "#424242",
    marginRight: "-10px",
  }),
  smallAddornment: (props: IPropertyEntryReferenceRendererProps) => ({
    color: shouldShowInvalid(props) ? "#f44336" : "#424242",
  }),
  iconButtonPassword: {
    "backgroundColor": "#2196f3",
    "color": "#fff",
    "&:hover": {
      backgroundColor: "#1976d2",
    },
  },
  iconButton: {
    color: "#424242",
  },
  iconButtonSmall: {
    color: "#424242",
    width: "32px",
    height: "32px",
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
  label: (props: IPropertyEntryReferenceRendererProps) => ({
    "color": shouldShowInvalid(props) ? "#f44336" : "rgb(66, 66, 66)",
    "&.focused": {
      color: shouldShowInvalid(props) ? "#f44336" : "#3f51b5",
    },
  }),
  labelSingleLine: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fieldInput: (props: IPropertyEntryReferenceRendererProps) => {
    if (shouldShowInvalid(props)) {
      return {
        "width": "100%",
        // this is the colur when the field is out of focus
        "&::before": {
          borderBottomColor: "#e57373",
        },
        // the color that pops up when the field is in focus
        "&::after": {
          borderBottomColor: "#f44336",
        },
        // during the hover event
        "&:hover::before": {
          borderBottomColor: props.disabled ? "rgba(0,0,0,0.42)" : "#f44336",
        },
      };
    }
    return {
      "width": "100%",
      "&::before": {
        borderBottomColor: "rgba(0,0,0,0.42)",
      },
      "&::after": {
        borderBottomColor: "#3f51b5",
      },
      "&:hover::before": {
        borderBottomColor: "#3f51b5",
      },
    };
  },
  unitDialog: {
    minWidth: "400px",
  },
  unitDialogSubheader: {
    backgroundColor: "white",
    borderBottom: "solid 1px #eee",
  },
  autosuggestContainer: {
    position: "relative",
    display: "block",
    width: "100%",
  },
  autosuggestContainerOpen: {

  },
  autosuggestInput: {

  },
  autosuggestInputOpen: {

  },
  autosuggestSuggestionsContainer: {
    position: "absolute" as "absolute",
    display: "block",
    width: "100%",
    top: "calc(100% - 1.3rem)",
    zIndex: 1000,
  },
  autosuggestSuggestionsContainerOpen: {

  },
  autosuggestSuggestionsList: {

  },
  autosuggestSuggestion: {

  },
  autosuggestFirstSuggestion: {

  },
  autosuggestSuggestionHighlighted: {

  },
  autosuggestSectionContainer: {

  },
  autosuggestFirstSectionContainer: {

  },
  autosuggestSectionTitle: {

  },
  autosuggestMenuItem: {
    height: "auto",
    paddingTop: 4,
    paddingBottom: 8,
  },
  autosuggestMenuItemMainText: {
    fontSize: "1rem",
    lineHeight: "1rem",
  },
  autosuggestMenuItemSubText: {
    fontSize: "0.75rem",
    lineHeight: "0.75rem",
  },
});

/**
 * The props for the reference entry with styles
 */
interface IPropertyEntryReferenceRendererWithStylesProps extends IPropertyEntryReferenceRendererProps, WithStyles<typeof style> {
}

/**
 * The actual class for the reference renderer
 */
class ActualPropertyEntryReferenceRenderer
  extends React.Component<IPropertyEntryReferenceRendererWithStylesProps> {

  private inputRef: HTMLInputElement;

  constructor(props: IPropertyEntryReferenceRendererWithStylesProps) {
    super(props);

    this.onChangeByHTMLEvent = this.onChangeByHTMLEvent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderBasicTextField = this.renderBasicTextField.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.catchToggleMouseDownEvent = this.catchToggleMouseDownEvent.bind(this);
    this.renderAutosuggestContainer = this.renderAutosuggestContainer.bind(this);
    this.renderAutosuggestSuggestion = this.renderAutosuggestSuggestion.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
  }

  public componentDidMount() {
    if (this.props.autoFocus && this.inputRef) {
      this.inputRef.focus();
    }

    if (this.props.args.selectField) {
      this.props.loadAllPossibleValues(
        this.props.args.selectField,
        this.props.args.preventIds,
        this.props.args.preventEqualityWithProperties,
      );
    }
  }

  public componentDidUpdate(prevProps: IPropertyEntryReferenceRendererWithStylesProps) {
    if (
      !equals(prevProps.args.preventIds, this.props.args.preventIds) ||
      !equals(this.props.args.preventEqualityWithProperties, this.props.args.preventEqualityWithProperties)
    ) {
      this.props.refilterPossibleValues(
        this.props.args.preventIds,
        this.props.args.preventEqualityWithProperties,
      );
    }
  }

  /**
   * caches the mouse down event to prevent it from doing
   * anything
   * @param e the mouse event
   */
  public catchToggleMouseDownEvent(e: React.MouseEvent) {
    e.preventDefault();
  }

  /**
   * The change event but by the raw text field
   * @param e the change event
   */
  public onChangeByHTMLEvent(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    this.onChange(e);
  }

  /**
   * the change event that triggers in the autosuggest mode
   * or by default, if not autosuggest override given
   * @param e the event
   * @param autosuggestOverride autosuggest override
   */
  public onChange(
    e: React.ChangeEvent<HTMLInputElement>,
    autosuggestOverride?: Autosuggest.ChangeEvent,
  ) {
    let value: string = null;

    // the autosuggest override has priority
    if (autosuggestOverride) {
      value = autosuggestOverride.newValue;
    } else {
      value = e.target.value.toString();
    }

    // similarly to location
    if (
      value !== this.props.currentTextualValue &&
      autosuggestOverride.method === "type"
    ) {
      // we call the change of search
      this.props.onChangeSearch(value, this.props.args.preventIds, this.props.args.preventEqualityWithProperties);
    }
  }

  /**
   * The event on key down for the text field
   * @param e the event itself
   */
  public onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (this.props.args.onEnter && e.keyCode === 13) {
      this.props.args.onEnter();      
    }
  }

  /**
   * Render the basic text field for the reference
   * @param textFieldProps the text field props
   */
  public renderBasicTextField(textFieldProps?: any) {
    const inputMode = "text";

    // these are the inputProps of the small input
    const inputProps = {
      inputMode,
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

    if (this.props.canRestore) {
      let icon: React.ReactNode;
      if (this.props.currentAppliedValue) {
        icon = <RestoreIcon/>
      } else {
        icon = <ClearIcon />
      }
      appliedInputProps.endAdornment = (
        <InputAdornment
          position="end"
          className={this.props.classes.standardAddornment}
        >
          <IconButton
            tabIndex={-1}
            classes={{root: this.props.classes.iconButton}}
            onClick={this.props.onRestore}
            onMouseDown={this.catchToggleMouseDownEvent}
          >
            {icon}
          </IconButton>
        </InputAdornment>
      );
    } else if (this.props.icon) {
      // set it at the end
      appliedInputProps.endAdornment = (
        <InputAdornment position="end" className={this.props.classes.standardAddornment}>
          <IconButton
            tabIndex={-1}
            classes={{root: this.props.classes.iconButton}}
          >
            {this.props.icon}
          </IconButton>
        </InputAdornment>
      );
    }

    const descriptionAsAlert = this.props.args["descriptionAsAlert"];
    // return the complex overengineered component in all its glory
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
        <TextField
          fullWidth={true}
          type="text"
          className={this.props.classes.entry}
          label={this.props.label}
          placeholder={this.props.placeholder}
          value={this.props.currentTextualValue}
          onChange={this.onChangeByHTMLEvent}
          onKeyDown={this.onKeyDown}
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

  /**
   * renders the autosuggest container for the reference
   * @param options the autosuggest options
   */
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

  /**
   * Render the autosuggest suggestion for the reference
   * @param suggestion the suggestion itself
   * @param params the params to use
   */
  public renderAutosuggestSuggestion(
    suggestion: IPropertyEntryReferenceOption,
    params: Autosuggest.RenderSuggestionParams,
  ) {
    // returns a specific suggestion
    const matches = match(suggestion.text, params.query);
    const parts = parse(suggestion.text, matches);

    return (
      <MenuItem
        className={this.props.classes.autosuggestMenuItem}
        selected={params.isHighlighted}
        component="div"
        onClick={this.props.onSelect.bind(this, suggestion)}
      >
        <div className={this.props.classes.autosuggestMenuItemMainText}>
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

  /**
   * Provides the suggestion value
   * @param suggestion the suggestion itself
   */
  public getSuggestionValue(
    suggestion: IPropertyEntryReferenceOption,
  ) {
    // just return the suggestion value as it will want to
    // be set in the input, we localize it if deemed necessary
    return suggestion.text;
  }

  /**
   * When the suggestion fetch is triggered
   * @param arg the arg
   */
  public onSuggestionsFetchRequested(arg: {value: string, reason: string}) {
    if (arg.reason !== "input-focused") {
      this.props.onChangeSearch(arg.value, this.props.args.preventIds, this.props.args.preventEqualityWithProperties);
    }
  }

  public render() {
    if (this.props.args.selectField) {
      return this.renderAsSelectField();
    }

    return this.renderAsAutosuggest();
  }

  public renderAsSelectField() {
    const values = this.props.currentOptions.map((o) => ({
      i18nValue: o.text,
      value: o.id,
    }));

    // because the option might be missing if we haven't loaded
    // the current options, at least we add the current
    if (this.props.currentValue !== null && !values.find(v => v.value === this.props.currentValue)) {
      values.push({
        i18nValue: this.props.currentTextualValue,
        value: this.props.currentValue,
      });
    }

    const nullValue = {
      i18nValue: this.props.i18nUnspecified,
      value: null as any,
    };
    return (
      <PropertyEntrySelectRenderer
        values={values}
        canRestore={this.props.canRestore}
        currentAppliedValue={this.props.currentAppliedValue}
        currentI18nValue={this.props.currentTextualValue}
        currentValid={this.props.currentValid}
        currentValue={this.props.currentValue}
        currentInternalValue={this.props.currentInternalValue}
        currentInvalidReason={this.props.currentInvalidReason}
        rtl={this.props.rtl}
        propertyId={this.props.propertyId}
        placeholder={this.props.placeholder}
        args={this.props.args}
        label={this.props.label}
        icon={this.props.icon}
        disabled={this.props.disabled}
        autoFocus={this.props.autoFocus}
        onChange={this.props.onChange}
        onRestore={this.props.onRestore}
        nullValue={nullValue}
        isNullable={this.props.isNullable}
        isNumeric={true}
      />
    );
  }

  /**
   * render function
   */
  public renderAsAutosuggest() {
    return (
      <Autosuggest
        renderInputComponent={this.renderBasicTextField}
        renderSuggestionsContainer={this.renderAutosuggestContainer}
        renderSuggestion={this.renderAutosuggestSuggestion}
        getSuggestionValue={this.getSuggestionValue}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.props.onCancel}
        suggestions={this.props.currentOptions}
        theme={{
          container: this.props.classes.autosuggestContainer,
          containerOpen: this.props.classes.autosuggestContainerOpen,
          input: this.props.classes.autosuggestInput,
          inputOpen: this.props.classes.autosuggestInputOpen,
          inputFocused: "focused",
          suggestionsContainer: this.props.classes.autosuggestSuggestionsContainer,
          suggestionsContainerOpen: this.props.classes.autosuggestSuggestionsContainerOpen,
          suggestionsList: this.props.classes.autosuggestSuggestionsList,
          suggestion: this.props.classes.autosuggestSuggestion,
          suggestionFirst: this.props.classes.autosuggestFirstSuggestion,
          suggestionHighlighted: this.props.classes.autosuggestSuggestionHighlighted,
          sectionContainer: this.props.classes.autosuggestSectionContainer,
          sectionContainerFirst: this.props.classes.autosuggestFirstSectionContainer,
          sectionTitle: this.props.classes.autosuggestSectionTitle,
        }}
        inputProps={{
          value: this.props.currentInternalValue || this.props.currentTextualValue || "",
          onChange: this.onChange,
          disabled: this.props.disabled,
        }}
      />
    );
  }
}

/**
 * The renderer for the reference type, which basically allows to select an integer
 * for a given reference that represents an item definition somewhere else, the reference
 * type is very powerful and can do tasks of autocomplete and linking
 * 
 * Supported args:
 * 
 * - descriptionAsAlert: displays the description if exists as alert rather than the standard
 * - onEnter: A function that triggers when the enter key is pressed
 */
const PropertyEntryReferenceRenderer = withStyles(style)(ActualPropertyEntryReferenceRenderer);
export default PropertyEntryReferenceRenderer;
