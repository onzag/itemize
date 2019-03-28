import React from "react";
import { IPropertyEntryProps, getClassName } from ".";
import {
  PropertyDefinitionSupportedStringType,
  PropertyDefinitionSupportedNumberType,
  PropertyDefinitionSupportedIntegerType,
  PropertyDefinitionSupportedYearType,
} from "../../../../../base/ItemDefinition/PropertyDefinition";
import TextField from "@material-ui/core/TextField";
import { FormControl, InputLabel, Select, MenuItem, FilledInput, Paper, InputAdornment, Icon } from "@material-ui/core";
import uuid from "uuid";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import equals from "deep-equal";
import * as escapeStringRegexp from "escape-string-regexp";

interface IPropertyEntryFieldState {
  internalUnmanagedValue: PropertyDefinitionSupportedStringType;
  suggestions: IPropertyEntryAutocompleteSuggestion[];
  uuid: string;
  valueId: string;
  preventNextDerivedUpdate: boolean;
}

interface IPropertyEntryFieldProps extends IPropertyEntryProps {
  numberSeparator?: string;
}

interface IPropertyEntryAutocompleteSuggestion {
  i18nValue: string;
  value: PropertyDefinitionSupportedStringType |
    PropertyDefinitionSupportedNumberType |
    PropertyDefinitionSupportedIntegerType |
    PropertyDefinitionSupportedYearType;
}

function formatValueAsString(type: string, numberSeparator: string, value: any) {
  if (type === "number") {
    return value.toString().replace(/\./g, numberSeparator);
  }
  return value.toString();
}

export default class PropertyEntryField
  extends React.Component<IPropertyEntryFieldProps, IPropertyEntryFieldState> {

  public static getDerivedStateFromProps(props: IPropertyEntryFieldProps, state: IPropertyEntryFieldState) {
    if (state.preventNextDerivedUpdate) {
      return {
        preventNextDerivedUpdate: false,
      };
    }

    if (props.value.valueId !== state.valueId || props.value.valueId === null) {
      return {
        internalUnmanagedValue: props.value.value !== null ?
        formatValueAsString(props.property.getType(), props.numberSeparator, props.value.value) : "",
      };
    }
    return null;
  }

  private currentSuggestion: IPropertyEntryAutocompleteSuggestion;
  constructor(props: IPropertyEntryFieldProps) {
    super(props);

    const state: IPropertyEntryFieldState = {
      internalUnmanagedValue: props.value.value !== null ?
        props.value.value.toString() : "",
      suggestions: [],
      uuid: "uuid-" + uuid.v4(),
      valueId: "uuid-" + uuid.v4(),
      preventNextDerivedUpdate: false,
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
    // Let's check if we have a localized autocomplete
    // situation on startup
    if (
      this.props.value.value &&
      this.props.property.isAutocompleteEnforced() &&
      this.props.property.isAutocompleteLocalized()
    ) {
      this.onI18nSuggestionFetchRequested({
        value: this.props.value.value,
        preventNextDerivedUpdate: true,
      });
    }
  }

  public componentDidUpdate(prevProps: IPropertyEntryFieldProps) {
    // let's check if we have a localized autocomplete
    // situation during our update, also making sure
    // that the value is not the same
    if (
      this.props.value.value !== prevProps.value.value &&
      this.props.value.valueId !== this.state.valueId &&
      this.props.value.value &&
      this.props.property.isAutocompleteEnforced() &&
      this.props.property.isAutocompleteLocalized()
    ) {
      this.onI18nSuggestionFetchRequested({
        value: this.props.value.value,
        preventNextDerivedUpdate: true,
      });
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
      !!this.props.poked !== !!nextProps.poked ||
      nextProps.locale !== this.props.locale;
  }

  public onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    autosuggestOverride?: Autosuggest.ChangeEvent,
  ) {
    let textualValue: string = null;
    let normalizedNumericValueAsString: string = null;
    let numericValue: number = null;

    if (autosuggestOverride) {
      textualValue = autosuggestOverride.newValue;
    } else {
      textualValue = e.target.value;
    }

    const type = this.props.property.getType();
    if (type === "number" || type === "integer" || type === "year") {
      normalizedNumericValueAsString = textualValue;
      if (type === "number") {
        normalizedNumericValueAsString = textualValue.replace(
          new RegExp(escapeStringRegexp(this.props.numberSeparator), "g"), ".");
        numericValue = parseFloat(normalizedNumericValueAsString);
      } else if (type === "integer" || type === "year") {
        numericValue = parseInt(normalizedNumericValueAsString, 10);
      }
      textualValue = formatValueAsString(type, this.props.numberSeparator, textualValue);
    }
    this.setState({
      internalUnmanagedValue: textualValue,
    });

    if (autosuggestOverride) {
      const suggestionFound = this.state.suggestions.find((s) => {
        if (this.props.property.isAutocompleteLocalized()) {
          return s.i18nValue === textualValue;
        } else {
          if (type === "number" || type === "integer" || type === "year") {
            return numericValue === s.value;
          }
          const normalizedValueAsString = (s.value === null ? "" : s.value.toString());
          return normalizedValueAsString === textualValue;
        }
      });

      if (suggestionFound) {
        this.currentSuggestion = suggestionFound;
        this.props.onChange(suggestionFound.value, this.state.valueId);
        return;
      } else {
        this.currentSuggestion = null;

        if (this.props.property.isAutocompleteEnforced()) {
          this.props.onChange(null, this.state.valueId);
          return;
        }
      }
    }

    if (type === "number" || type === "integer" || type === "year") {
      if (isNaN(numericValue)) {
        this.props.onChange(null, this.state.valueId);
        return;
      } else if (type === "integer" || type === "year") {
        this.props.onChange(numericValue, this.state.valueId);
        return;
      }

      // Number line overflow protection
      // the problem is that too many decimals cause it to round
      // so let's only send 1 max of the maximum number of decimals
      // if there are decimals
      let actualNumericValue = numericValue;
      const baseValue = normalizedNumericValueAsString.split(".")[0];
      const decimalValue = normalizedNumericValueAsString.split(".")[1] || "";
      const decimalCount = decimalValue.length;
      const maxDecimalCount = this.props.property.getMaxDecimalCount();

      if (maxDecimalCount < decimalCount) {
        actualNumericValue = parseFloat(baseValue + "." + decimalValue.substr(0, maxDecimalCount + 1));
      }

      this.props.onChange(actualNumericValue, this.state.valueId);
    } else {
      this.props.onChange(textualValue, this.state.valueId);
    }
  }

  public onKeyDown(e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) {
    // All fancy keycodes that don't represent a character are longer than 1
    // with this we allow all of the to pass
    if (e.key.length !== 1) {
      return;
    }

    const type = this.props.property.getType();
    if (type === "number" || type === "integer" || type === "year") {
      const separators = "." + this.props.numberSeparator;
      const validKeys = "1234567890" + separators;
      const isBasicallyInteger = this.props.property.getMaxDecimalCount() === 0;
      if (separators.includes(e.key) && isBasicallyInteger) {
        e.preventDefault();
      } else if (!validKeys.includes(e.key)) {
        e.preventDefault();
      } else if (
        separators.includes(e.key) && (
          this.state.internalUnmanagedValue.includes(".") ||
          this.state.internalUnmanagedValue.includes(this.props.numberSeparator)
        )
      ) {
        e.preventDefault();
      }
    }
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
    const className = getClassName(this.props, "field", this.props.poked);
    const i18nLabel = i18nData && i18nData.label;
    const i18nPlaceholder = i18nData && i18nData.placeholder;
    const nullValueLabel = i18nData && i18nData.nullValue;

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
    const addornment = icon ? (
      <InputAdornment position="end">
        <Icon>{icon}</Icon>
      </InputAdornment>
    ) : null;

    return (
      <div className="property-entry--container">
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
                endAdornment={addornment}
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
                const i18nIdentifier = vv.toString();
                const valueName = i18nData && i18nData.values[i18nIdentifier];
                return <MenuItem key={vv.toString()} value={vv as any}>{
                  valueName
                }</MenuItem>;
              })
            }
          </Select>
        </FormControl>
        <div className="property-entry--error">
          {i18nInvalidReason}
        </div>
      </div>
    );
  }

  public renderBasicTextField(textFieldProps?: any) {
    const i18nData = this.props.property.getI18nDataFor(this.props.locale);
    const className = getClassName(this.props, "field", this.props.poked);
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

    let inputMode = "text";
    const type = this.props.property.getType();
    if (type === "integer" || type === "year") {
      inputMode = "numeric";
    } else if (type === "number") {
      inputMode = "decimal";
    }

    const inputProps = {
      inputMode,
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

    const icon = this.props.property.getIcon();
    const addornment = icon ? (
      <InputAdornment position="end">
        <Icon>{icon}</Icon>
      </InputAdornment>
    ) : null;

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
          onKeyDown={this.onKeyDown}
          InputProps={{
            classes: {
              root: "property-entry--input",
              focused: "focused",
            },
            id: this.state.uuid,
            endAdornment: addornment,
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
        <div className="property-entry--error">
          {i18nInvalidReason}
        </div>
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
        (suggestion.value === null ? "" :
        formatValueAsString(this.props.property.getType(), this.props.numberSeparator, suggestion.value));
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
        (suggestion.value === null ? "" :
        formatValueAsString(this.props.property.getType(), this.props.numberSeparator, suggestion.value));
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

  public onI18nSuggestionFetchRequested({value, preventNextDerivedUpdate}) {
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
        preventNextDerivedUpdate,
      });
    }
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
          value: this.state.internalUnmanagedValue,
          onChange: this.onChange,
          className: "property-entry--field--autocomplete",
        }}
      />
    );
  }
}
