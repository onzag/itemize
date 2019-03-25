import React from "react";
import { IPropertyEntryProps, getClassName } from ".";
import {
  PropertyDefinitionSupportedStringType,
  PropertyDefinitionSupportedNumberType,
  PropertyDefinitionSupportedIntegerType,
} from "../../../../../base/ItemDefinition/PropertyDefinition";
import TextField from "@material-ui/core/TextField";
import { FormControl, InputLabel, Select, MenuItem, FilledInput, Paper } from "@material-ui/core";
import uuid from "uuid";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import equals from "deep-equal";

interface IPropertyEntryFieldState {
  internalUnmanagedValue: PropertyDefinitionSupportedStringType;
  suggestions: IPropertyEntryAutocompleteSuggestion[];
  uuid: string;
}

interface IPropertyEntryAutocompleteSuggestion {
  i18nValue: string;
  value: PropertyDefinitionSupportedStringType |
    PropertyDefinitionSupportedNumberType |
    PropertyDefinitionSupportedIntegerType;
}

export default class PropertyEntryField
  extends React.Component<IPropertyEntryProps, IPropertyEntryFieldState> {

  private currentSuggestion: IPropertyEntryAutocompleteSuggestion;

  constructor(props: IPropertyEntryProps) {
    super(props);

    const state: IPropertyEntryFieldState = {
      internalUnmanagedValue: props.value.value !== null ?
        props.value.value.toString() : "",
      suggestions: [],
      uuid: "uuid-" + uuid.v4(),
    };

    this.state = state;

    this.currentSuggestion = null;

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.renderSelectField = this.renderSelectField.bind(this);
    this.renderBasicTextField = this.renderBasicTextField.bind(this);
    this.renderAutosuggestSuggestion = this.renderAutosuggestSuggestion.bind(this);
    this.renderAutosuggestField = this.renderAutosuggestField.bind(this);
    this.renderAutosuggestContainer = this.renderAutosuggestContainer.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onI18nSuggestionFetchRequested = this.onI18nSuggestionFetchRequested.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.clearSuggestions = this.clearSuggestions.bind(this);
  }

  public componentDidMount() {
    if (
      this.props.value.value &&
      this.props.property.isAutocompleteEnforced() &&
      this.props.property.isAutocompleteLocalized()
    ) {
      this.onI18nSuggestionFetchRequested({
        value: this.props.value.value,
      });
    }
  }

  public componentDidUpdate(prevProps) {
    if (
      this.props.value.value &&
      prevProps.value.value !== this.props.value.value &&
      this.props.property.isAutocompleteEnforced() &&
      this.props.property.isAutocompleteLocalized()
    ) {
      if (!this.currentSuggestion ||
        this.currentSuggestion.value !== this.props.value.value) {
        this.onI18nSuggestionFetchRequested({
          value: this.props.value.value,
        });
      }
    }
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryProps,
    nextState: IPropertyEntryFieldState,
  ) {
    return nextProps.property !== this.props.property ||
      this.state.internalUnmanagedValue !==
        nextState.internalUnmanagedValue ||
      !equals(this.state.suggestions, nextState.suggestions) ||
      !equals(this.props.value, nextProps.value) ||
      nextProps.locale !== this.props.locale;
  }

  public onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    autosuggestOverride?: Autosuggest.ChangeEvent,
  ) {
    if (autosuggestOverride) {
      this.setState({
        internalUnmanagedValue: autosuggestOverride.newValue,
      });

      const suggestionFound = this.state.suggestions
        .find((s) => {
          if (this.props.property.isAutocompleteLocalized()) {
            return s.i18nValue === autosuggestOverride.newValue;
          } else {
            return (s.value === null ? "" : s.value.toString()) ===
              autosuggestOverride.newValue;
          }
        });
      if (suggestionFound) {
        this.currentSuggestion = suggestionFound;
        this.props.onChange(suggestionFound.value);
        return;
      } else {
        this.currentSuggestion = null;

        if (this.props.property.isAutocompleteEnforced()) {
          this.props.onChange(null);
          return;
        }
      }
    } else {
      this.setState({
        internalUnmanagedValue: e.target.value,
      });
    }

    if (this.props.property.getType() === "string") {
      this.props.onChange(e.target.value);
    } else if (this.props.property.getType() === "number") {
      const value = parseFloat(e.target.value);
      this.props.onChange(isNaN(value) ? null : value);
    } else if (this.props.property.getType() === "integer") {
      const value = parseInt(e.target.value, 10);
      this.props.onChange(isNaN(value) ? null : value);
    }
  }

  public onKeyDown(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (this.props.property.getType() === "number" ||
      this.props.property.getType() === "integer") {
      e.preventDefault();
    }
    const definition = this.props.property.getPropertyDefinitionDescription();
    // const totalMax = definition.max;
    // if (totalMax) {
    //  const value = parseFloat(e.target.value);

    //  if (value > totalMax) {
    //    e.preventDefault();
    //  }
    // }
  }

  public render() {
    if (this.props.property.hasSpecificValidValues()) {
      return this.renderSelectField();
    } else if (this.props.property.hasAutocomplete()) {
      return this.renderAutosuggestField();
    }

    return this.renderBasicTextField();
  }

  public renderSelectField() {
    const i18nData = this.props.property.getI18nDataFor(this.props.locale);
    const className = getClassName(this.props, "field");
    const i18nLabel = i18nData && i18nData.label;
    const i18nPlaceholder = i18nData && i18nData.placeholder;
    const nullValueLabel = i18nData && i18nData.nullValue;

    return (
      <FormControl variant="filled" className={className}>
        <InputLabel
          htmlFor={this.state.uuid}
          classes={{
            root: "property-field--label",
            focused: "focused",
          }}
        >
          {i18nLabel}
        </InputLabel>
        <Select
          value={this.state.internalUnmanagedValue}
          onChange={this.onChange}
          input={
            <FilledInput
              id={this.state.uuid}
              placeholder={i18nPlaceholder}
              classes={{
                root: "property-field--input",
                focused: "focused",
              }}
            />
          }
        >
          <MenuItem value="">
            <em>{nullValueLabel}</em>
          </MenuItem>
          {
            this.props.property.getSpecificValidValues().map((vv) => {
              const valueName = i18nData && i18nData.values[vv.toString()];
              return <MenuItem key={vv.toString()} value={vv.toString()}>{
                valueName
              }</MenuItem>;
            })
          }
        </Select>
      </FormControl>
    );
  }

  public renderBasicTextField(textFieldProps?: any) {
    const i18nData = this.props.property.getI18nDataFor(this.props.locale);
    const className = getClassName(this.props, "field");
    const i18nLabel = i18nData && i18nData.label;
    const i18nPlaceholder = i18nData && i18nData.placeholder;

    const invalidReason = this.props.value.invalidReason;
    let i18nInvalidReason = null;
    if (this.props.value.userSet && invalidReason && i18nData &&
      i18nData.error && i18nData.error[invalidReason]) {
        i18nInvalidReason = i18nData.error[invalidReason];
    }

    // TODO fix this for the type number property, add the arrows
    const propertyDescription = this.props.property
      .getPropertyDefinitionDescription();
    const inputProps = {
      min: propertyDescription.min,
      max: propertyDescription.max,
      step: 1 / Math.pow(10, propertyDescription.maxDecimalCount || 0),
    };

    let appliedTextFieldProps: any = {};
    let appliedInputProps: any = {};
    if (textFieldProps) {
      const { inputRef = () => {return; } , ref, ...other } = textFieldProps;
      appliedTextFieldProps = other;
      appliedInputProps = {
        inputRef: (node: HTMLInputElement) => {
          ref(node);
          inputRef(node);
        },
      };

      if (appliedTextFieldProps.className) {
        appliedTextFieldProps.className += " " + className;
      }

      if (appliedTextFieldProps.inputProps) {
        appliedTextFieldProps.inputProps = {
          ...appliedTextFieldProps.inputProps,
          ...inputProps,
        };
      }
    }

    return (
      <div className="property-entry--container">
        <TextField
          fullWidth={true}
          type="text"
          className={className}
          label={i18nLabel}
          placeholder={i18nPlaceholder}
          value={this.state.internalUnmanagedValue}
          onChange={this.onChange}
          InputProps={{
            classes: {
              root: "property-entry--input",
              focused: "focused",
            },
            id: this.state.uuid,
            ...appliedInputProps,
          }}
          InputLabelProps={{
            classes: {
              root: "property-entry--label",
              focused: "focused",
            },
          }}
          inputProps={inputProps}
          disabled={this.props.value.enforced}
          variant="filled"
          {...appliedTextFieldProps}
        />
        {<div className="property-entry--error">
          {i18nInvalidReason}
        </div>}
      </div>
    );
  }

  public renderAutosuggestContainer(
    options: Autosuggest.RenderSuggestionsContainerParams,
  ) {
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
    const valueToMatch = this.props.property.isAutocompleteLocalized() ?
      suggestion.i18nValue :
        (suggestion.value === null ? "" : suggestion.value.toString());
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
    return this.props.property.isAutocompleteLocalized() ?
      suggestion.i18nValue :
        (suggestion.value === null ? "" : suggestion.value.toString());
  }

  public onSuggestionsFetchRequested({value}) {
    // TODO implement these
    this.setState({
      suggestions: [
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
      ],
    });
  }

  public onI18nSuggestionFetchRequested({value}) {
    // TODO implement this
    console.log("i18n requested");
    const suggestion = ([
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
    ]).find((o) => o.value === value);

    this.currentSuggestion = suggestion;
    if (suggestion) {
      this.setState({
        internalUnmanagedValue: suggestion.i18nValue,
      });
    }
  }

  public clearSuggestions() {
    this.setState({
      suggestions: [],
    });
  }

  public renderAutosuggestField() {

    // TODO make it so that when the autosuggest property in from property value
    // is update it invalidates the autosuggest

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
            "property-entry--field--autocomplete-container",
          containerOpen:
            "property-entry--field--autocomplete-container--open",
          input:
            "property-entry--field--autocomplete-input",
          inputOpen:
            "property-entry--field--autocomplete-input--open",
          inputFocused:
            "focused",
          suggestionsContainer:
            "property-entry--field--autocomplete-suggestions-container",
          suggestionsContainerOpen:
            "property-entry--field--autocomplete-suggestions-container--open",
          suggestionsList:
            "property-entry--field--autocomplete-suggestions-list",
          suggestion:
            "property-entry--field--autocomplete-suggestion",
          suggestionFirst:
            "property-entry--field--autocomplete-first-suggestion",
          suggestionHighlighted:
            "property-entry--field--autocomplete-highlighted-suggestion",
          sectionContainer:
            "property-entry--field--autocomplete-section-container",
          sectionContainerFirst:
            "property-entry--field--autocomplete-first-section-container",
          sectionTitle:
            "property-entry--field--autocomplete-section-title",
        }}
        inputProps={{
          value: this.state.internalUnmanagedValue,
          onChange: this.onChange,
          className: "property-entry--field--autocomplete",
        }}
      />
    );
  }
}
