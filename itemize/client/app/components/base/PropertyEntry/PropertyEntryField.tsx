import React from "react";
import { IPropertyEntryProps } from ".";
import TextField from "@material-ui/core/TextField";

import {
  MenuItem,
  Paper,
  InputAdornment,
  Icon,
  IconButton,
} from "@material-ui/core";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import equals from "deep-equal";
import { PropertyDefinitionSupportedStringType } from "../../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/string";

const SUGGESTIONS_ARRAY = [
  {
    i18nValue: "one",
    value: "oneValue",
  },
  {
    i18nValue: "two",
    value: "twoValue",
  },
  {
    i18nValue: "three",
    value: "threeValue",
  },
];

interface IPropertyEntryFieldState {
  suggestions: IPropertyEntryAutocompleteSuggestion[];
  visible: boolean;
}

interface IPropertyEntryAutocompleteSuggestion {
  i18nValue: string;
  value: PropertyDefinitionSupportedStringType;
}

export default class PropertyEntryField
  extends React.Component<IPropertyEntryProps, IPropertyEntryFieldState> {

  private inputRef: HTMLInputElement;
  private lastAutocompleteFetchRequestTime: number;

  constructor(props: IPropertyEntryProps) {
    super(props);

    // set the state, contains suggestions and whether it is
    // visible or not, mainly for use with type password
    this.state = {
      suggestions: [],
      visible: props.property.getType() !== "password",
    };

    // binding all the functions
    this.onChange = this.onChange.bind(this);
    this.onChangeByHTMLEvent = this.onChangeByHTMLEvent.bind(this);
    this.renderBasicTextField = this.renderBasicTextField.bind(this);
    this.renderAutosuggestSuggestion = this.renderAutosuggestSuggestion.bind(this);
    this.renderAutosuggestField = this.renderAutosuggestField.bind(this);
    this.renderAutosuggestContainer = this.renderAutosuggestContainer.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.clearSuggestions = this.clearSuggestions.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
  }

  public componentDidMount() {
    if (this.props.autoFocus && this.inputRef) {
      this.inputRef.focus();
    }
  }

  public componentDidUpdate(prevProps: IPropertyEntryProps) {
    // TODO update displayed value in autocomplete based in language
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryProps,
    nextState: IPropertyEntryFieldState,
  ) {
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      !equals(this.state.suggestions, nextState.suggestions) ||
      this.state.visible !== nextState.visible ||
      !equals(this.props.value, nextProps.value) ||
      !!this.props.poked !== !!nextProps.poked ||
      !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
      nextProps.language !== this.props.language ||
      nextProps.i18n !== this.props.i18n;
  }

  public toggleVisible() {
    // toggle visible and focus, mainly for password type
    this.setState({
      visible: !this.state.visible,
    });
    this.inputRef.focus();
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
      if (this.props.property.isAutocompleteLocalized()) {
        const suggestionFound = this.state.suggestions.find((s) => s.i18nValue === internalValue);
        value = suggestionFound ? suggestionFound.value : value;
      }
    } else {
      value = e.target.value.toString();
      internalValue = value;
    }

    this.props.onChange(value, internalValue);
  }

  public render() {
    if (this.props.property.hasAutocomplete()) {
      // render as autosuggest if it has autocomplete
      return this.renderAutosuggestField();
    }

    // or just render a text field
    return this.renderBasicTextField();
  }

  public renderBasicTextField(textFieldProps?: any) {
    // as you can see it takes some textFieldProps,
    // these are given by the autocomplete parent basically
    // if it has one, it might not be the case

    // get the basic data
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const i18nLabel = i18nData && i18nData.label;
    const i18nDescription = i18nData && i18nData.description;
    const i18nPlaceholder = i18nData && i18nData.placeholder;

    // get the invalid reason if any
    const invalidReason = this.props.value.invalidReason;
    let i18nInvalidReason = null;
    if (
      (this.props.poked || this.props.value.userSet) &&
      invalidReason && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
        i18nInvalidReason = i18nData.error[invalidReason];
    }

    // set the input mode, this is for mobile,
    // basically according to our input we need
    // different keys
    let inputMode = "text";
    const type = this.props.property.getType();
    const subtype = this.props.property.getSubtype();
    if (subtype === "email") {
      inputMode = "email";
    }

    // these are the inputProps of the small input
    const inputProps = {
      inputMode,
      autoComplete: this.props.property.getHTMLAutocomplete(),
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
    if (type === "password") {
      // set the end addornment for the show and hide button
      appliedInputProps.endAdornment = (
        <InputAdornment position="end">
          <IconButton
            classes={{root: this.props.classes.iconButton}}
            onClick={this.toggleVisible}
          >
            <Icon>
              {this.state.visible ? "visibility" : "visibility_off"}
            </Icon>
          </IconButton>
        </InputAdornment>
      );
    } else if (this.props.property.getIcon()) {
      // set it at the end
      appliedInputProps.endAdornment = (
        <InputAdornment position="end">
          <Icon classes={{root: this.props.classes.icon}}>
            {this.props.property.getIcon()}
          </Icon>
        </InputAdornment>
      );
    }

    // return the complex overengineered component in all its glory
    return (
      <div className={this.props.classes.container}>
        {i18nDescription ? <div className={this.props.classes.description}>
          <Icon>keyboard_arrow_down</Icon>{i18nDescription}</div> : null}
        <TextField
          fullWidth={true}
          type={this.state.visible ? "text" : "password"}
          className={this.props.classes.entry}
          label={i18nLabel}
          placeholder={i18nPlaceholder}
          value={this.props.value.internalValue || this.props.value.value || ""}
          onChange={this.onChangeByHTMLEvent}
          InputProps={{
            classes: {
              root: this.props.classes.fieldInput,
              focused: "focused",
            },
            disabled: this.props.value.enforced,
            ...appliedInputProps,
          }}
          InputLabelProps={{
            classes: {
              root: this.props.classes.label,
              focused: "focused",
            },
          }}
          inputProps={inputProps}
          disabled={this.props.value.enforced}
          variant="filled"
          {...appliedTextFieldProps}
        />
        <div className={this.props.classes.errorMessage}>
          {i18nInvalidReason}
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
    suggestion: IPropertyEntryAutocompleteSuggestion,
    params: Autosuggest.RenderSuggestionParams,
  ) {
    // returns a specific suggestion

    // we match the value according to whether is localized or not
    // because we support numbers and stuff we need to know what value
    // we are matching against, a localized or non localized one
    const valueToMatch: string = this.props.property.isAutocompleteLocalized() ?
      suggestion.i18nValue :
      suggestion.value;
    const matches = match(valueToMatch, params.query);
    const parts = parse(valueToMatch, matches);

    return (
      <MenuItem selected={params.isHighlighted} component="div">
        <div>
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
    suggestion: IPropertyEntryAutocompleteSuggestion,
  ) {
    // just return the suggestion value as it will want to
    // be set in the input, we localize it if deemed necessary
    return this.props.property.isAutocompleteLocalized() ?
      suggestion.i18nValue :
      suggestion.value;
  }

  public onSuggestionsFetchRequested({value}) {
    const currentFetchRequestTimeId = (new Date()).getTime();
    this.lastAutocompleteFetchRequestTime = currentFetchRequestTimeId;

    setTimeout(() => {
      if (currentFetchRequestTimeId === this.lastAutocompleteFetchRequestTime) {
        this.setState({
          suggestions: SUGGESTIONS_ARRAY,
        });
      }
      if (this.props.property.isAutocompleteLocalized()) {
        const suggestionFound = SUGGESTIONS_ARRAY.find((s) => s.i18nValue === this.props.value.internalValue || "");
        if (suggestionFound && suggestionFound.value !== this.props.value.value) {
          this.props.onChange(suggestionFound.value, this.props.value.internalValue);
        }
      }
    }, 5000);
  }

  public clearSuggestions() {
    // prevent delayed suggestion for being displayed
    this.lastAutocompleteFetchRequestTime = (new Date()).getTime();
    this.setState({
      suggestions: [],
    });
  }

  public renderAutosuggestField() {
    return (
      <Autosuggest
        renderInputComponent={this.renderBasicTextField}
        renderSuggestionsContainer={this.renderAutosuggestContainer}
        renderSuggestion={this.renderAutosuggestSuggestion}
        getSuggestionValue={this.getSuggestionValue}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.clearSuggestions}
        suggestions={this.state.suggestions}
        theme={{
          container:
            "property-entry-field-autocomplete-container",
          containerOpen:
            "property-entry-field-autocomplete-container--open",
          input:
            "property-entry-field-autocomplete-input",
          inputOpen:
            "property-entry-field-autocomplete-input--open",
          inputFocused:
            "focused",
          suggestionsContainer:
            "property-entry-field-autocomplete-suggestions-container",
          suggestionsContainerOpen:
            "property-entry-field-autocomplete-suggestions-container--open",
          suggestionsList:
            "property-entry-field-autocomplete-suggestions-list",
          suggestion:
            "property-entry-field-autocomplete-suggestion",
          suggestionFirst:
            "property-entry-field-autocomplete-suggestion--first",
          suggestionHighlighted:
            "property-entry-field-autocomplete-suggestion--highlighted",
          sectionContainer:
            "property-entry-field-autocomplete-section-container",
          sectionContainerFirst:
            "property-entry-field-autocomplete-section-container--first",
          sectionTitle:
            "property-entry-field-autocomplete-section-title",
        }}
        inputProps={{
          value: this.props.value.internalValue || this.props.value.value || "",
          onChange: this.onChange,
          className: "property-entry--field--autocomplete",
          disabled: this.props.value.enforced,
        }}
      />
    );
  }
}
