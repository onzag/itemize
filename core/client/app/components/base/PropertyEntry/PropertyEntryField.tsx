import React from "react";
import { IPropertyEntryProps, getClassName } from ".";
import {
  PropertyDefinitionSupportedStringType,
  PropertyDefinitionSupportedNumberType,
  PropertyDefinitionSupportedIntegerType,
  PropertyDefinitionSupportedYearType,
  IPropertyDefinitionSupportedCurrencyType,
} from "../../../../../base/ItemDefinition/PropertyDefinition";
import TextField from "@material-ui/core/TextField";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FilledInput,
  Paper,
  InputAdornment,
  Icon,
  IconButton,
  Divider,
} from "@material-ui/core";
import uuid from "uuid";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import equals from "deep-equal";
import { escapeStringRegexp } from "../../../../../util";
import { MAX_DECIMAL_COUNT } from "../../../../../constants";

interface IPropertyEntryFieldState {
  suggestions: IPropertyEntryAutocompleteSuggestion[];
  visible: boolean;
  _materialUIBugRefresh: boolean;
}

interface IPropertyEntryAutocompleteSuggestion {
  i18nValue: string;
  value: PropertyDefinitionSupportedStringType |
    PropertyDefinitionSupportedNumberType |
    PropertyDefinitionSupportedIntegerType |
    PropertyDefinitionSupportedYearType;
}

// these are the base types we support
// basically everything we have is either a float
// a integer or a string
enum BaseType {
  FLOAT,
  INTEGER,
  STRING,
}

/**
 * getting the base type for what we support
 * @param type the type as a string
 */
function getBaseType(type: string): BaseType {
  if (type === "number" || type === "currency") {
    return BaseType.FLOAT;
  } else if (type === "integer" || type === "year") {
    return BaseType.INTEGER;
  }
  return BaseType.STRING;
}

/**
 * Returns a boolean on whether the base type is numeric
 * @param baseType the base type in question
 */
function isNumeric(baseType: BaseType): boolean {
  return baseType === BaseType.FLOAT || baseType === BaseType.INTEGER;
}

/**
 * formats a numeric value as a string using the localized
 * number separator
 * @param type the type we are converting
 * @param numberSeparator the localized number separator
 * @param value the value in question
 */
function formatValueAsString(type: string, numberSeparator: string, value: any) {
  if (value === null) {
    return "";
  }
  if (getBaseType(type) === BaseType.FLOAT) {
    return value.toString().replace(/\./g, numberSeparator);
  }
  return value.toString();
}

export default class PropertyEntryField
  extends React.Component<IPropertyEntryProps, IPropertyEntryFieldState> {

  private uuid: string;
  private inputRef: HTMLInputElement;

  constructor(props: IPropertyEntryProps) {
    super(props);

    // we assign an uuid for this
    this.uuid =  "uuid-" + uuid.v4();

    // set the state, contains suggestions and whether it is
    // visible or not, mainly for use with type password
    this.state = {
      suggestions: [],
      visible: props.property.getType() !== "password",

      _materialUIBugRefresh: false,
    };

    // binding all the functions
    this.onChange = this.onChange.bind(this);
    this.onChangeByHTMLEvent = this.onChangeByHTMLEvent.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.renderSelectField = this.renderSelectField.bind(this);
    this.renderBasicTextField = this.renderBasicTextField.bind(this);
    this.renderAutosuggestSuggestion = this.renderAutosuggestSuggestion.bind(this);
    this.renderAutosuggestField = this.renderAutosuggestField.bind(this);
    this.renderAutosuggestContainer = this.renderAutosuggestContainer.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.clearSuggestions = this.clearSuggestions.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
  }

  public componentDidUpdate(prevProps: IPropertyEntryProps) {
    // let's update currencies if they change because of a locale change
    if (prevProps.currency !== this.props.currency && this.props.property.getType() === "currency") {
      // let's get the value
      const value: IPropertyDefinitionSupportedCurrencyType =
        this.props.value.value as IPropertyDefinitionSupportedCurrencyType;
      // if we have a value
      if (value !== null) {
        // update it for the new currency
        this.props.onChange({
          value: value.value,
          currency: this.props.currency.code,
        },
        // We do this replacement just in case anyway
        // we know it only makes sense if the locale changed too
        // from a language that uses different separators
        // but it doesn't hurt if it's the same
        this.props.value.internalValue.replace(
          prevProps.i18n.number_decimal_separator,
          this.props.i18n.number_decimal_separator,
        ));
      }

    // a decimal separator update in case
    } else if (prevProps.i18n.number_decimal_separator !== this.props.i18n.number_decimal_separator) {
      // if the value is not null
      if (this.props.value.value !== null) {
        this.props.onChange(
          this.props.value.value,
          this.props.value.internalValue.replace(
            prevProps.i18n.number_decimal_separator,
            this.props.i18n.number_decimal_separator,
          ),
        );
      }
    }

    // another buggy refresh required
    // the placeholder acts weird when changing position
    // it needs a hard refresh, from N$ to $N
    if (
      this.props.property.getType() === "currency" &&
      prevProps.i18n.currency_format !== this.props.i18n.currency_format
    ) {
      this.setState({
        _materialUIBugRefresh: true,
      });

      setTimeout(() => {
        this.setState({
          _materialUIBugRefresh: false,
        });
      }, 30);
    }
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
      nextProps.language !== this.props.language ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.currency !== this.props.currency ||
      nextState._materialUIBugRefresh !== this.state._materialUIBugRefresh;
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
    // some change events return a second event, we filter it here
    return this.onChange(e, null);
  }

  public onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    autosuggestOverride?: Autosuggest.ChangeEvent,
  ) {
    // the change has two values, a textual value, and a
    // numeric value, texual value is always set but
    // numeric value is only set for numbers
    let textualValue: string = null;
    // NaN is a possibility if the textualValue is empty for
    // example
    let numericValue: number = null;

    // the normalized numeric value as string is
    // basically the number value as eg. "3.14" rather
    // than "3,14" it basically removes localization factors
    // from the textual value, note that this value comes
    // from the textual value, so "3,00" won't become 3 but
    // remain "3.00" all decimals are preserved
    let normalizedNumericValueAsString: string = null;

    // the autosuggest override has priority
    if (autosuggestOverride) {
      textualValue = autosuggestOverride.newValue;
    } else {
      textualValue = e.target.value.toString();
    }

    // let's get the type and the base type
    const type = this.props.property.getType();
    const baseType = getBaseType(type);

    // if we have a number here
    if (isNumeric(baseType)) {

      // set the normalized numeric value, just starting up, it might change
      normalizedNumericValueAsString = textualValue;

      // like if we have a float
      if (baseType === BaseType.FLOAT) {
        // get the separator escaped
        const escapedNumberSeparator = escapeStringRegexp(this.props.i18n.number_decimal_separator);
        // and replace it for the standard separator
        normalizedNumericValueAsString = textualValue.replace(
          new RegExp(escapedNumberSeparator, "g"), ".");
        // we set the numeric value from the normalized by parsing it
        // NaN is a possibility
        numericValue = parseFloat(normalizedNumericValueAsString);

      // if we have an integer of course the normalized value is the same
      } else if (baseType === BaseType.INTEGER) {
        // we just set the numeric value
        // NaN is a possibility
        numericValue = parseInt(normalizedNumericValueAsString, 10);
      }

      // set the textual value, yes again, in all chances it will be the same
      // but let's say the user pressed "." instead of "," then we need to
      // properly format it
      textualValue = formatValueAsString(type, this.props.i18n.number_decimal_separator, textualValue);
    }

    // if we have an auto suggest override
    if (autosuggestOverride) {
      // let's find the suggestion that was given for that specific content
      const suggestionFound = this.state.suggestions.find((s) => {
        // if it's localized it's the i18nValue what matters for the comparison
        if (this.props.property.isAutocompleteLocalized()) {
          // if there is a match return that suggestion
          return s.i18nValue === textualValue;
        // otherwise for non localized values
        } else {
          // if we have numbers
          if (isNumeric(baseType)) {
            // we compared by equal values as it is
            return numericValue === s.value;
          }
          // otherwise we get the normalized string value, from the suggestion
          const normalizedValueAsString = (s.value === null ? "" : s.value.toString());
          // and compare it to the textual value
          return normalizedValueAsString === textualValue;
        }
      });

      // if we find a suggestion match
      if (suggestionFound) {
        // set it to that suggestion and store the textual value
        this.props.onChange(suggestionFound.value, textualValue);
        return;
      } else {
        // otherwise if we have an enforced autocomplete
        if (this.props.property.isAutocompleteEnforced()) {
          // just set the textual value as internal and set the value to null
          this.props.onChange(null, textualValue);
          return;
        }
      }
    }

    // now we run basic modifications

    // for numbers
    if (isNumeric(baseType)) {

      // NaN is like null
      if (isNaN(numericValue)) {
        this.props.onChange(null, textualValue);
        return;
      } else if (baseType === BaseType.INTEGER) {
        this.props.onChange(numericValue, textualValue);
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
      // For some cases like in currency this value is null so set it up to max decimal count
      // as a fallback
      const maxDecimalCount = this.props.property.getMaxDecimalCount() || MAX_DECIMAL_COUNT;

      // if we have too many decimals from the string count
      if (maxDecimalCount < decimalCount) {
        // cut the line as an overflow protection
        actualNumericValue = parseFloat(baseValue + "." + decimalValue.substr(0, maxDecimalCount + 1));
      }

      // if the type is a currency
      if (type === "currency") {
        // do the onchange with the currency code
        this.props.onChange({
          value: actualNumericValue,
          currency: this.props.currency.code,
        }, textualValue);
      } else {
        // do the on change
        this.props.onChange(actualNumericValue, textualValue);
      }
    } else {
      // for simple text do the onchange as it is
      this.props.onChange(textualValue, textualValue);
    }
  }

  public onKeyDown(e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) {
    // All fancy keycodes that don't represent a character are longer than 1
    // with this we allow all of the to pass
    if (e.key.length !== 1) {
      return;
    }

    // Basically this is mainly for numbers we need to prevent weird keys
    // that don't represent a number

    // so let's get the type and check that is numeric
    const type = this.props.property.getType();
    if (isNumeric(getBaseType(type))) {

      // let's get the current value currently being on display
      const currentValue = this.props.value.internalValue !== null ?
        this.props.value.internalValue :
        formatValueAsString(
          this.props.property.getType(),
          this.props.i18n.number_decimal_separator,
          this.props.value.value,
        );

      // We always allow dot, and the localized separator, it's usually another dot or a comma
      const separators = "." + this.props.i18n.number_decimal_separator;
      // this is what is valid key input
      const validKeys = "1234567890" + separators;
      // basically whether it is an integer
      const isBasicallyInteger = this.props.property.getMaxDecimalCount() === 0;
      // if we have a separator and we are basically inputting an integer
      if (separators.includes(e.key) && isBasicallyInteger) {
        // cancel the key changing the value
        e.preventDefault();
      } else if (!validKeys.includes(e.key)) {
        // also cancel it if it's not one of the valid keys
        e.preventDefault();
      } else if (
        // cancel a second separator being inserted, like "1.3" having another . inserted
        separators.includes(e.key) && (
          currentValue.includes(".") ||
          currentValue.includes(this.props.i18n.number_decimal_separator)
        )
      ) {
        e.preventDefault();
      }
    }
  }

  public render() {
    // basic rendering
    if (this.state._materialUIBugRefresh) {
      return null;
    }

    // if it's a field with specific values, render
    // as a select text field
    if (this.props.property.hasSpecificValidValues()) {
      return this.renderSelectField();
    } else if (this.props.property.hasAutocomplete()) {
      // render as autosuggest if it has autocomplete
      return this.renderAutosuggestField();
    }

    // or just render a text field
    return this.renderBasicTextField();
  }

  public renderSelectField() {
    // get the basic data
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const className = getClassName(this.props, "field", this.props.poked);
    const i18nLabel = i18nData && i18nData.label;
    const i18nPlaceholder = i18nData && i18nData.placeholder;
    const nullValueLabel = this.props.property.isNullable() ?
      i18nData && i18nData.null_value : null;

    // get the invalid reason
    const invalidReason = this.props.value.invalidReason;
    let i18nInvalidReason = null;
    if (
      (this.props.poked || this.props.value.userSet) &&
      invalidReason && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
      i18nInvalidReason = i18nData.error[invalidReason];
    }

    // build the icon
    const icon = this.props.property.getIcon();
    const addornment = icon ? (
      <InputAdornment position="end">
        <Icon classes={{root: "property-entry-icon"}}>{icon}</Icon>
      </InputAdornment>
    ) : null;

    // get the current value that is on display
    const currentValue = this.props.value.value !== null ?
      this.props.value.value :
      formatValueAsString(
        this.props.property.getType(),
        this.props.i18n.number_decimal_separator,
        this.props.value.value,
      );

    // and just return this
    return (
      <div className="property-entry-container">
        <FormControl variant="filled" className={className}>
          <InputLabel
            htmlFor={this.uuid}
            classes={{
              root: "property-entry-label",
              focused: "focused",
            }}
            shrink={nullValueLabel ? true : undefined}
          >
            {i18nLabel}
          </InputLabel>
          <Select
            value={currentValue}
            onChange={this.onChangeByHTMLEvent}
            displayEmpty={true}
            disabled={this.props.value.enforced}
            input={
              <FilledInput
                id={this.uuid}
                placeholder={i18nPlaceholder}
                endAdornment={addornment}
                classes={{
                  root: "property-entry-input",
                  focused: "focused",
                }}
              />
            }
          >
            <MenuItem
              selected={false}
              role="none"
              classes={{root: "property-entry-input-menu-item-placeholder"}}
              disabled={true}
            >
              <em>{i18nPlaceholder}</em>
            </MenuItem>
            <Divider/>
            {nullValueLabel ? <MenuItem value="">
              <em>{nullValueLabel}</em>
            </MenuItem> : null}
            {
              // render the valid values that we display and choose
              this.props.property.getSpecificValidValues().map((vv) => {
                // the i18n value from the i18n data
                const i18nIdentifier = vv.toString();
                const valueName = i18nData && i18nData.values[i18nIdentifier];
                return <MenuItem key={vv.toString()} value={vv as any}>{
                  valueName
                }</MenuItem>;
              })
            }
          </Select>
        </FormControl>
        <div className="property-entry-error">
          {i18nInvalidReason}
        </div>
      </div>
    );
  }

  public renderBasicTextField(textFieldProps?: any) {
    // as you can see it takes some textFieldProps,
    // these are given by the autocomplete parent basically
    // if it has one, it might not be the case

    // get the basic data
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const className = getClassName(this.props, "field", this.props.poked);
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
    const baseType = getBaseType(type);
    if (baseType === BaseType.INTEGER) {
      inputMode = "numeric";
    } else if (baseType === BaseType.FLOAT) {
      inputMode = "decimal";
    } else if (subtype === "email") {
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
        appliedTextFieldProps.className += " " + className;
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
            classes={{root: "property-entry-field-button"}}
            onClick={this.toggleVisible}
          >
            <Icon classes={{root: "property-entry-icon"}}>
              {this.state.visible ? "visibility" : "visibility_off"}
            </Icon>
          </IconButton>
        </InputAdornment>
      );

    // for currency
    } else if (type === "currency") {
      // depending if the format is N$ or $N we set it end or
      // start
      const currencyFormat = this.props.i18n.currency_format;
      if (currencyFormat === "N$") {
        appliedInputProps.endAdornment = (
          <InputAdornment position="end">
            <strong>{this.props.currency.symbol}</strong>
          </InputAdornment>
        );
      } else {
        appliedInputProps.startAdornment = (
          <InputAdornment position="start">
            <strong>{this.props.currency.symbol}</strong>
          </InputAdornment>
        );
      }

    // otherwise we might just have an icon
    } else if (this.props.property.getIcon()) {
      // set it at the end
      appliedInputProps.endAdornment = (
        <InputAdornment position="end">
          <Icon classes={{root: "property-entry-icon"}}>
            {this.props.property.getIcon()}
          </Icon>
        </InputAdornment>
      );
    }

    // get the currently being displayed value
    const currentValue = textFieldProps &&  textFieldProps.value ? textFieldProps.value : (
      this.props.value.internalValue !== null ?
      this.props.value.internalValue :
      formatValueAsString(
        this.props.property.getType(),
        this.props.i18n.number_decimal_separator,
        this.props.value.value,
      )
    );

    // return the complex overengineered component in all its glory
    return (
      <div className="property-entry-container">
        {i18nDescription ? <div className="property-entry-description">{i18nDescription}</div> : null}
        <TextField
          fullWidth={true}
          type={this.state.visible ? "text" : "password"}
          className={className}
          label={i18nLabel}
          placeholder={i18nPlaceholder}
          value={currentValue}
          onChange={this.onChangeByHTMLEvent}
          onKeyDown={this.onKeyDown}
          InputProps={{
            classes: {
              root: "property-entry-input",
              focused: "focused",
            },
            id: this.uuid,
            disabled: this.props.value.enforced,
            ...appliedInputProps,
          }}
          InputLabelProps={{
            classes: {
              root: "property-entry-label",
              focused: "focused",
            },
          }}
          inputProps={inputProps}
          disabled={this.props.value.enforced}
          variant="filled"
          {...appliedTextFieldProps}
        />
        <div className="property-entry-error">
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
    const valueToMatch = this.props.property.isAutocompleteLocalized() ?
      suggestion.i18nValue :
        (formatValueAsString(
          this.props.property.getType(),
          this.props.i18n.number_decimal_separator,
          suggestion.value,
        ));
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
        (formatValueAsString(
          this.props.property.getType(),
          this.props.i18n.number_decimal_separator,
          suggestion.value,
        ));
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

  public clearSuggestions() {
    this.setState({
      suggestions: [],
    });
  }

  public renderAutosuggestField() {
    const currentValue = this.props.value.internalValue !== null ?
      this.props.value.internalValue :
      formatValueAsString(
        this.props.property.getType(),
        this.props.i18n.number_decimal_separator,
        this.props.value.value,
      );

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
          value: currentValue,
          onChange: this.onChange,
          className: "property-entry--field--autocomplete",
          disabled: this.props.value.enforced,
        }}
      />
    );
  }
}
