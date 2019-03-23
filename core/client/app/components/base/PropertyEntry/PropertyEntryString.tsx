import React from "react";
import { IPropertyEntryProps, getClassName } from ".";
import {
  PropertyDefinitionSupportedStringType,
} from "../../../../../base/ItemDefinition/PropertyDefinition";
import TextField from "@material-ui/core/TextField";
import { FormControl, InputLabel, Select, MenuItem, FilledInput, Paper } from "@material-ui/core";
import uuid from "uuid";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import equals from "deep-equal";

interface IPropertyEntryStringState {
  autocompleteInternalUnmanagedValue: PropertyDefinitionSupportedStringType;
  suggestions: IPropertyEntryAutocompleteSuggestion[];
  uuid: string;
}

interface IPropertyEntryAutocompleteSuggestion {
  label: string;
  value: string;
}

export default class PropertyEntryString
  extends React.Component<IPropertyEntryProps, IPropertyEntryStringState> {

  constructor(props: IPropertyEntryProps) {
    super(props);

    this.state = {
      autocompleteInternalUnmanagedValue: "",
      suggestions: [],
      uuid: "uuid-" + uuid.v4(),
    };

    this.onChange = this.onChange.bind(this);
    this.renderSelectField = this.renderSelectField.bind(this);
    this.renderBasicTextField = this.renderBasicTextField.bind(this);
    this.renderAutosuggestField = this.renderAutosuggestField.bind(this);
    this.renderAutosuggestContainer = this.renderAutosuggestContainer.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.clearSuggestions = this.clearSuggestions.bind(this);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyEntryProps,
    nextState: IPropertyEntryStringState,
  ) {
    return nextProps.property !== this.props.property ||
      this.state.autocompleteInternalUnmanagedValue !==
        nextState.autocompleteInternalUnmanagedValue ||
      !equals(this.state.suggestions, nextState.suggestions) ||
      !equals(this.props.value, nextProps.value) ||
      nextProps.locale !== this.props.locale;
  }

  public onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    autosuggestOverride?: Autosuggest.ChangeEvent,
  ) {
    if (autosuggestOverride) {
      if (this.props.property.isAutocompleteEnforced()) {
        const suggestionFound = this.state.suggestions
          .find((s) => s.label === autosuggestOverride.newValue);
        this.setState({
          autocompleteInternalUnmanagedValue: autosuggestOverride.newValue,
        });
        if (suggestionFound) {
          this.props.onChange(suggestionFound.value);
        } else {
          this.props.onChange(null);
        }
      } else {
        this.props.onChange(autosuggestOverride.newValue);
      }
      return;
    }
    this.props.onChange(e.target.value);
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
          value={this.props.value.value || ""}
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

  public renderBasicTextField(inputProps?: any) {
    const i18nData = this.props.property.getI18nDataFor(this.props.locale);
    const className = getClassName(this.props, "field");
    const i18nLabel = i18nData && i18nData.label;
    const i18nPlaceholder = i18nData && i18nData.placeholder;

    let appliedTextFieldProps: any = {};
    let appliedInputProps: any = {};
    if (inputProps) {
      const { inputRef = () => {return; } , ref, ...other } = inputProps;
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
    }

    return (
      <TextField
        fullWidth={true}
        className={className}
        label={i18nLabel}
        placeholder={i18nPlaceholder}
        type="text"
        value={this.props.value.value || ""}
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
        disabled={this.props.value.enforced}
        variant="filled"
        {...appliedTextFieldProps}
      />
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
    const label = suggestion.label;
    const matches = match(label, params.query);
    const parts = parse(label, matches);

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
    return suggestion.label;
  }

  public onSuggestionsFetchRequested({value}) {
    // TODO implement these
    this.setState({
      suggestions: [
        {
          label: "one",
          value: "oneValue",
        },
        {
          label: "two",
          value: "twoValue",
        },
        {
          label: "three",
          value: "threeValue",
        },
      ],
    });
  }

  public clearSuggestions() {
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
          value: this.props.property.isAutocompleteEnforced() ?
            this.state.autocompleteInternalUnmanagedValue :
            (this.props.value.value as PropertyDefinitionSupportedStringType || ""),
          onChange: this.onChange,
          className: "property-entry--field--autocomplete",
        }}
      />
    );
  }
}
