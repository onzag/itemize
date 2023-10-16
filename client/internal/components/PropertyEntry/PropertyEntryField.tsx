/**
 * Contains the field handler for field types
 * @module
 */

import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import equals from "deep-equal";
import { escapeStringRegexp } from "../../../../util";
import { IPropertyDefinitionSupportedCurrencyType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/currency";
import { MAX_DECIMAL_COUNT } from "../../../../constants";
import { ICurrencyType, currencies, arrCurrencies, ICountryType, arrCountries, ILanguageType, arrLanguages } from "../../../../imported-resources";
import convert from "convert-units";
import { IPropertyDefinitionSupportedUnitType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/unit";
import { deepRendererArgsComparer } from "../general-fn";
import { IPropertyDefinitionSupportedTextType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/text";

/**
 * An enum which is useful for numeric types
 */
export enum NumericType {
  /**
   * For currency, unit and number
   */
  FLOAT,
  /**
   * For year, integer
   */
  INTEGER,
  /**
   * Not a number, for textual types
   */
  NAN,
}

function canRestoreCalculator(v: ValueType, v2: ValueType, comparisonType: string) {
  if (v === v2) {
    return false;
  }
  if (
    typeof v === "string" || typeof v === "number" || !v || typeof v === "boolean" ||
    typeof v2 === "string" || typeof v2 === "number" || !v2 || typeof v2 === "boolean"
  ) {
    return v !== v2;
  }

  if (comparisonType === "currency") {
    const currency1 = (v as IPropertyDefinitionSupportedCurrencyType).currency;
    const currency2 = (v2 as IPropertyDefinitionSupportedCurrencyType).currency;
    const value1 = (v as IPropertyDefinitionSupportedCurrencyType).value;
    const value2 = (v2 as IPropertyDefinitionSupportedCurrencyType).value;

    return currency1 !== currency2 || value1 !== value2;
  } else if (comparisonType === "text") {
    const language1 = (v as IPropertyDefinitionSupportedTextType).language;
    const language2 = (v2 as IPropertyDefinitionSupportedTextType).language;
    const value1 = (v as IPropertyDefinitionSupportedTextType).value;
    const value2 = (v2 as IPropertyDefinitionSupportedTextType).value;

    return language1 !== language2 || value1 !== value2;
  } else if (comparisonType === "unit") {
    const unit1 = (v as IPropertyDefinitionSupportedUnitType).unit;
    const unit2 = (v2 as IPropertyDefinitionSupportedUnitType).unit;
    const value1 = (v as IPropertyDefinitionSupportedUnitType).value;
    const value2 = (v2 as IPropertyDefinitionSupportedUnitType).value;

    return unit1 !== unit2 || value1 !== value2;
  }

  return v !== v2;
}

/**
 * Provides the numeric type of a given type
 * @param type the type we are using, number, currency, unit, etc...
 */
export function getNumericType(type: string): NumericType {
  if (type === "number" || type === "currency" || type === "unit") {
    return NumericType.FLOAT;
  } else if (type === "integer" || type === "year") {
    return NumericType.INTEGER;
  }
  return NumericType.NAN;
}

/**
 * Given a value, either a raw string or an obeject with a value property that is
 * either a number or a string formatted for the given language
 * @param numericType the numeric type as specified above
 * @param numberSeparator the numeric separator used for this locale
 * @param value either a raw string, a number, or an object that contains a value property that is any of that
 * @returns a string
 */
function formatValueAsString(numericType: NumericType, numberSeparator: string, value: any) {
  const actualValue = value === null || typeof value === "undefined" ? value : (
    typeof value.value !== "undefined" ? value.value : value
  );
  if (actualValue === null) {
    return "";
  }
  if (numericType === NumericType.FLOAT) {
    return actualValue.toString().replace(/\./g, numberSeparator);
  }
  return actualValue.toString();
}

/**
 * Contains the unit i18n data, usually to build
 * a dialog or menu structure of the sorts
 */
interface IUnitI18nType {
  /**
   * The standard title
   */
  title: string;
  /**
   * For other units of measurement than the default
   */
  others: string;
  /**
   * A label for metric
   */
  metric: string;
  /**
   * A label for the imperial system
   */
  imperial: string;
};

/**
 * Contains the currency i18n data, usually to build
 * a dialog or menu of sorts
 */
interface ICurrencyI18nType {
  /**
   * The title of such structure
   */
  title: string;
}

/**
 * The property field renderers that every field will get
 */
export interface IPropertyEntryFieldRendererProps extends IPropertyEntryRendererProps<ValueType> {
  /**
   * These are the types that every field renderer is expected to support, the handler
   * makes it easier so implementing it shouldn't be too hard
   */
  type: "string" | "password" | "text" | "integer" | "number" | "currency" | "year" | "unit";
  /**
   * These are the subtypes
   */
  subtype?: "email" | "identifier" | "locale" | "comprehensive-locale" | "language" | "country" | "currency" | "plain" | string;

  /**
   * Whether the type is a numeric type, INTEGER or FLOAT apply
   */
  isNumericType: boolean;
  /**
   * A current textual value formatted as it should be, use this value
   * instead of any of the internal value or the current value
   */
  currentTextualValue: string;

  /**
   * When using a text type that has language information this specifies
   * what language is believed to be in use by the field
   */
  currentValueLang: string;

  /**
   * Use this function instead of the onChange function, just pass
   * the textual value that the user input, the handler will be in charge
   * of knowing what value to apply to the actual item definition
   */
  onChangeByTextualValue: (textualValue: string) => void;

  /**
   * Text types when rendered by the field have a language property that specify
   * the language that the field is using, use this to change such language
   */
  onChangeTextLanguage: (code: string) => void;

  /**
   * The country we are currently using, only avaliable if subtype is phone, country or language
   */
  defaultCountry?: ICountryType;
  /**
   * The countries we have available, only avaliable if subtype is phone, country or language
   */
  countriesAvailable?: ICountryType[];

  /**
   * The language we are currently using, only avaliable if subtype is language
   */
  defaultLanguage?: ILanguageType;
  /**
   * The languages we have available
   */
  languagesAvailable?: ILanguageType[];

  /**
   * The currency we are currently using, only avaliable if subtype is currency or type is currency
   */
  defaultCurrency?: ICurrencyType;
  /**
   * So the curency we are currently using, only available if type="currency"
   */
  currency?: ICurrencyType;
  /**
   * So the curency format, it's a localization specific question, and specifies
   * whether the currency symbol goes first or last, only available if type="currency"
   */
  currencyFormat?: "$N" | "N$",
  /**
   * All the currency types that are available, so you can allow for chosing
   * an alternative currency, only available if type="currency" or subtype is currency 
   */
  currencyAvailable?: ICurrencyType[],
  /**
   * The currency i18n data, only available if type="currency"
   */
  currencyI18n?: ICurrencyI18nType;
  /**
   * Change the currency to another currecy, only available if type="currency"
   * pick the currency from the currencyAvailable, every currency in that list
   * should have a code, only available if type="currency"
   */
  onChangeCurrency?: (code: string) => void;

  /**
   * The current unit code, only available if type="unit"
   */
  unit?: string;
  /**
   * The code for the primary metric unit, only available if type="unit"
   */
  unitPrimary?: string;
  /**
   * The code for the primary imperial unit, only available if type="unit"
   */
  unitPrimaryImperial?: string;
  /**
   * The code for all the unit options for the metric type, only available if type="unit"
   * use these options to build a list to change the unit
   */
  unitOptions?: string[];
  /**
   * The code for all the unit options for the imperial type, only available if type="unit"
   * use these options to build a list to change the unit
   */
  unitImperialOptions?: string[];
  /**
   * Specifies whether you should give priority to imperial over metric,
   * only available if type="unit"
   */
  unitPrefersImperial?: boolean;
  /**
   * Specifies that you shouldn't really try to switch the unit to any other than
   * unitPrimary, and unitPrimaryImperial
   * only available if type="unit"
   */
  unitIsLockedToPrimaries?: boolean;
  /**
   * The unit i18n data
   * only available if type="unit"
   */
  unitI18n?: IUnitI18nType;
  /**
   * Unit codes are not meant to be nice on the screen, this converts these unit
   * codes to a human readable unit node
   * only available if type="unit"
   */
  unitToNode?: (unit: string) => React.ReactNode;
  /**
   * Change the unit code
   * only available if type="unit"
   */
  onChangeUnit?: (unit: string) => void;
}

/**
 * These are all the values the field can work with
 */
type ValueType = string | number | IPropertyDefinitionSupportedCurrencyType | IPropertyDefinitionSupportedUnitType | IPropertyDefinitionSupportedTextType;

interface IPropertyEntryFieldState {
  showUserSetErrors: boolean;
}

/**
 * The property entry field handler
 */
export default class PropertyEntryField
  extends React.Component<
    IPropertyEntryHandlerProps<ValueType, IPropertyEntryFieldRendererProps>,
    IPropertyEntryFieldState
  > {

  constructor(props: IPropertyEntryHandlerProps<ValueType, IPropertyEntryFieldRendererProps>) {
    super(props);

    this.onChangeByTextualValue = this.onChangeByTextualValue.bind(this);
    this.unitToNode = this.unitToNode.bind(this);
    this.onChangeUnit = this.onChangeUnit.bind(this);
    this.onChangeCurrency = this.onChangeCurrency.bind(this);
    this.onChangeTextLanguage = this.onChangeTextLanguage.bind(this);

    this.getCurrentCurrency = this.getCurrentCurrency.bind(this);
    this.getCurrentUnit = this.getCurrentUnit.bind(this);

    this.enableUserSetErrors = this.enableUserSetErrors.bind(this);

    this.state = {
      showUserSetErrors: false,
    }
  }

  /**
   * This is the unit to node function that is passed that convets the
   * unit code into something more legible and meant for interaction
   * @param unit the unit code
   * @returns a react element
   */
  public unitToNode(unit: string) {
    // for liters
    if (unit === "l") {
      // we just return big liter
      return <span>L</span>;
      // for mililiters, deciliters, kiloliters, etc...
    } else if (unit === "ml" || unit === "cl" || unit === "dl" || unit === "kl") {
      return <span>{unit[0]}L</span>;
      // degrees, celcius, farenheit, kelvin, and whatever R degrees are
    } else if (unit === "C" || unit === "K" || unit === "F" || unit === "R") {
      return <span>&deg;{unit}</span>;
    }

    // otherwise we are going to take the numbers and make them superstring
    // works for things like m3 and the like
    return (
      <span>
        {unit.split(/(\d+)/).filter((m) => !!m).map((m, i) => isNaN(m as any) ?
          <span key={i}>{m}</span> : <sup key={i}>{m}</sup>)}
      </span>
    );
  }

  public componentDidMount() {
    // we take the initial prefill, which only truly exists for the unit and currency type
    const initialPrefill = this.props.property.getConfigValue("initialPrefill") as number;
    // and if we have one
    if (
      typeof initialPrefill !== "undefined" &&
      initialPrefill !== null &&
      !this.props.state.value
    ) {
      // we call this function
      this.onChangeByTextualValue(
        initialPrefill.toString().replace(".", this.props.i18n[this.props.language].number_decimal_separator),
      );
    }
  }

  public componentDidUpdate(
    prevProps: IPropertyEntryHandlerProps<ValueType, IPropertyEntryFieldRendererProps>,
  ) {
    // so if our currency changes, and we are talking about currency, and we have
    // a value for such currency, this happens when the user used
    // some selector to change his standard currency
    if (
      prevProps.currency.code !== this.props.currency.code &&
      this.props.property.getType() === "currency" &&
      this.props.state.value
    ) {
      // we change the code to fit this new currency, we dont run
      // conversions
      this.props.onChange({
        value: (this.props.state.value as IPropertyDefinitionSupportedCurrencyType).value,
        currency: this.props.currency.code,
      }, this.props.state.internalValue);

      // otherwise if our country code changed
    } else if (
      prevProps.country.code !== this.props.country.code &&
      this.props.property.getType() === "unit" &&
      (this.props.state.value || this.props.state.internalValue)
    ) {
      // yes we literally just check for USA, makes no sense
      // to use an special imperial check when only USA uses imperial
      // like come on...
      const wasImperial = prevProps.country.code === "US";
      const isImperial = this.props.country.code === "US";

      // So if our imperial usage has changed
      if (wasImperial !== isImperial) {
        // we change to the new appropiate
        if (!isImperial) {
          const metricUnit = this.props.property.getConfigValue("unit") as string;
          this.onChangeUnit(metricUnit);
        } else {
          const imperialUnit = this.props.property.getConfigValue("imperialUnit") as string;
          this.onChangeUnit(imperialUnit);
        }
      }
    }
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<ValueType, IPropertyEntryFieldRendererProps>,
    nextState: IPropertyEntryFieldState
  ) {
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      nextState.showUserSetErrors !== this.state.showUserSetErrors ||
      !equals(this.props.state, nextProps.state, { strict: true }) ||
      !!this.props.poked !== !!nextProps.poked ||
      !!this.props.rtl !== !!nextProps.rtl ||
      !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
      nextProps.currency.code !== this.props.currency.code ||
      nextProps.country.code !== this.props.country.code ||
      this.props.altDescription !== nextProps.altDescription ||
      this.props.altPlaceholder !== nextProps.altPlaceholder ||
      this.props.altLabel !== nextProps.altLabel ||
      this.props.hideLabel !== nextProps.hideLabel ||
      this.props.hidePlaceholder !== nextProps.hidePlaceholder ||
      !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
      nextProps.language !== this.props.language ||
      nextProps.languageOverride !== this.props.languageOverride ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.renderer !== this.props.renderer ||
      !deepRendererArgsComparer(this.props.rendererArgs, nextProps.rendererArgs);
  }

  public enableUserSetErrors() {
    this.setState({
      showUserSetErrors: true,
    });
  }

  /**
   * Changes the unit to a new unit
   * @param newUnit the new unit code
   */
  public onChangeUnit(newUnit: string) {
    // if we have no value currently to change
    // for
    if (!this.props.state.value) {
      // we just update the unit
      this.props.onChange(
        this.props.state.value as IPropertyDefinitionSupportedUnitType,
        {
          ...this.props.state.internalValue,
          unit: newUnit,
        }
      );
      return;
    }

    // otherwise we get the current value
    const value = (this.props.state.value as IPropertyDefinitionSupportedUnitType).value;
    // and the old unit
    const oldUnit = (this.props.state.value as IPropertyDefinitionSupportedUnitType).unit;

    // now we need the max decimal count for this thing
    const maxDecimalCount = this.props.property.getMaxDecimalCount() || MAX_DECIMAL_COUNT;
    // and we convert the thing from the old unit to the new unit
    const valueInNewUnit = parseFloat(convert(value).from(oldUnit as any).to(newUnit as any).toFixed(maxDecimalCount));

    // and we run the onchange function
    this.props.onChange(
      {
        ...(this.props.state.value as IPropertyDefinitionSupportedUnitType),
        unit: newUnit,
        value: valueInNewUnit,
      },
      {
        value: valueInNewUnit.toString().replace(".", this.props.i18n[this.props.language].number_decimal_separator),
        unit: newUnit,
      }
    );
  }

  /**
   * Change the language code, only works for text types
   * @param code the language code
   */
  public onChangeTextLanguage(code: string) {
    const currentTextValue = this.props.state.value as IPropertyDefinitionSupportedTextType;

    this.props.onChange(
      {
        value: null,
        ...currentTextValue,
        language: code,
      },
      null,
    );
  }

  /**
   * Change the currency code
   * @param code the code
   */
  public onChangeCurrency(code: string) {
    const value = this.props.state.value as IPropertyDefinitionSupportedCurrencyType;

    // no current value, we just change the code
    if (
      !value
    ) {
      this.props.onChange(
        value as IPropertyDefinitionSupportedCurrencyType,
        {
          ...this.props.state.internalValue,
          currency: code,
        }
      );
      return;
    }

    // otherwise we just get the current value as string
    const valueStr = typeof value.value === "number" && !isNaN(value.value) ? value.value.toString() : "";
    // as well as the internal value since we do no conversions
    const internalValue: string = this.props.state.internalValue && this.props.state.internalValue.value;

    // and now we call on change with this
    this.props.onChange(
      {
        ...value,
        currency: code,
      },
      {
        value: (internalValue || valueStr).toString().replace(".", this.props.i18n[this.props.language].number_decimal_separator),
        currency: code,
      },
    );
  }

  /**
   * Provides the information about the current unit, regardless on whether
   * we have internal data for it or not
   * @returns an array where, 0 is currentUnit by state, 1 is the standard metric unit code to use
   * 2 is the imperial unit to use, and 3 is whether the user prefers imperial
   */
  public getCurrentUnit(): [string, string, string, boolean] {
    // yet another USA shenanigan
    const prefersImperial = this.props.country.code === "US";

    // now we get the imperial and metric unit
    const imperialUnit = this.props.property.getConfigValue("imperialUnit") as string;
    const standardUnit = this.props.property.getConfigValue("unit") as string;

    // and we specify what we want to use
    const usedUnit = prefersImperial ? imperialUnit : standardUnit;

    // so the current unit, if we have a value, then it's the unit specified
    // by the value, otherwise it's the one in our internal value, otherwise
    // it's the standard unit for this user
    const currentUnit = (
      this.props.state.value ?
        (this.props.state.value as IPropertyDefinitionSupportedUnitType).unit :
        (this.props.state.internalValue && this.props.state.internalValue.unit)
    ) || usedUnit;

    // return that info
    return [currentUnit, standardUnit, imperialUnit, prefersImperial];
  }

  /**
   * Provides information about the currency currency
   * @returns an array where, 0 is the current currency and 1 is the default currency
   * according to what we have selected in our localization options
   */
  public getCurrentCurrency(): [string, string] {
    // so we do it similarly to unit
    const countrySelectedCurrency = this.props.currency.code;
    const currentCurrency = (
      this.props.state.value ?
        (this.props.state.value as IPropertyDefinitionSupportedCurrencyType).currency :
        (this.props.state.internalValue && this.props.state.internalValue.currency)
    ) || countrySelectedCurrency;
    return [currentCurrency, countrySelectedCurrency];
  }

  /**
   * Given a textual value, updates regardless on the type
   * it is, and controls the internal value based on that
   * @param textualValue the textual value used in the field
   */
  public onChangeByTextualValue(textualValue: string) {
    // let's get the type and the base type
    const type = this.props.property.getType();
    const numericType = getNumericType(type);

    // if it's not a number
    if (numericType === NumericType.NAN) {
      // easy, we just change
      if (type === "text") {
        const currentLanguage = (
          this.props.state.value &&
          (this.props.state.value as IPropertyDefinitionSupportedTextType).language
        ) || null;
        this.props.onChange({
          value: textualValue,
          language: currentLanguage,
        }, null);
      } else {
        this.props.onChange(textualValue, null);
      }
      return;
    }

    // now we are in number place, let's see
    // the textual value, we check the trimmed
    // these meant basically null
    if (textualValue.trim() === "") {
      // so we do the null changes
      if (type === "unit") {
        // for unit we get the current unit
        // and the new value is null, note
        // how the value in the internal is the string given
        const [newUnit] = this.getCurrentUnit();
        this.props.onChange(null, {
          unit: newUnit,
          value: textualValue,
        });
      } else if (type === "currency") {
        // same for currency
        const [newCurrency] = this.getCurrentCurrency();
        this.props.onChange(null, {
          currency: newCurrency,
          value: textualValue,
        });
      } else {
        // otherwise for integer, number, year and whatnot
        // just pass this textual value as it is
        this.props.onChange(null, textualValue);
      }

      // and we are done
      return;
    }

    // like if we have a float
    let numericValue: number;
    let normalizedTextualValueAsString: string;
    if (numericType === NumericType.FLOAT) {
      // get the separator escaped
      const escapedNumberSeparator = escapeStringRegexp(
        this.props.i18n[this.props.language].number_decimal_separator,
      );
      // and replace it for the standard separator, given
      // that it can be written in the comma form
      normalizedTextualValueAsString = textualValue.replace(
        new RegExp(escapedNumberSeparator, "g"), ".");

      // we set the numeric value from the normalized by parsing it
      // NaN is a possibility
      numericValue = parseFloat(normalizedTextualValueAsString);

      // if we have an integer of course the normalized value is the same
    } else if (numericType === NumericType.INTEGER) {
      // we just set the numeric value
      // NaN is a possibility
      numericValue = parseInt(textualValue, 10);
      normalizedTextualValueAsString = textualValue;
    }

    // so if we have a numeric value, which is the actual number
    // that somehow didn't parse from the textual value; OR the normalized
    // value is nan, eg. "6,666A" -> "6.666A" -> 6.666 it will parse to the number
    // given that logic but "6,666A" is not really a number because it has an A to it
    // so we check both
    if (
      isNaN(numericValue) ||
      // buggy typescript definition which doesn't expect strings
      // need to cast to any
      isNaN(normalizedTextualValueAsString as any)
    ) {
      // we send a nan so it gives invalid number
      if (type === "unit") {
        const [newUnit] = this.getCurrentUnit();
        this.props.onChange(NaN, {
          unit: newUnit,
          value: textualValue,
        });
      } else if (type === "currency") {
        // same for curency
        const [newCurrency] = this.getCurrentCurrency();
        this.props.onChange(NaN, {
          currency: newCurrency,
          value: textualValue,
        });
      } else {
        this.props.onChange(NaN, textualValue);
      }
      return;
    } else if (numericType === NumericType.INTEGER) {
      this.props.onChange(numericValue, textualValue);
      return;
    }

    // set the textual value, yes again, in all chances it will be the same
    // but let's say the user pressed "." instead of "," then we need to
    // properly format inormalizedNumericValueAsStringt
    const newTextualValue = formatValueAsString(
      numericType,
      this.props.i18n[this.props.language].number_decimal_separator,
      textualValue,
    );

    // Number line overflow protection
    // the problem is that too many decimals cause it to round
    // so let's only send 1 max of the maximum number of decimals
    // if there are decimals
    let actualNumericValue = numericValue;
    const baseValue = normalizedTextualValueAsString.split(".")[0];
    const decimalValue = normalizedTextualValueAsString.split(".")[1] || "";
    const decimalCount = decimalValue.length;
    // For some cases like in currency this value is null so set it up to max decimal count
    // as a fallback
    const maxDecimalCount = this.props.property.getMaxDecimalCount() || MAX_DECIMAL_COUNT;

    // if we have too many decimals from the string count
    if (maxDecimalCount < decimalCount) {
      // cut the line as an overflow protection, we need to set the last as 9
      actualNumericValue = parseFloat(baseValue + "." + decimalValue.substr(0, maxDecimalCount) + "9");
    }

    // if the type is a currency
    if (type === "currency") {
      const [currentCurrency] = this.getCurrentCurrency();
      // do the onchange with the currency code
      this.props.onChange({
        value: actualNumericValue,
        currency: currentCurrency,
      }, {
        value: textualValue,
        currency: currentCurrency,
      });
    } else if (type === "unit") {
      const [newUnit, standardUnit] = this.getCurrentUnit();
      this.props.onChange({
        value: actualNumericValue,
        unit: newUnit,
        normalizedValue: convert(actualNumericValue)
          .from(newUnit as any).to(standardUnit as any),
        normalizedUnit: standardUnit,
      }, {
        unit: newUnit,
        value: newTextualValue,
      });
    } else {
      // do the on change
      this.props.onChange(actualNumericValue, newTextualValue);
    }
  }

  public render() {
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const i18nLabel = this.props.hideLabel ? null : (typeof this.props.altLabel !== "undefined" ? this.props.altLabel : (i18nData && i18nData.label));
    const i18nDescription = this.props.hideDescription ? null : (typeof this.props.altDescription !== "undefined" ? this.props.altDescription : (i18nData && i18nData.description));
    const i18nPlaceholder = this.props.hidePlaceholder ? null : (this.props.altPlaceholder || (i18nData && i18nData.placeholder));

    // get the invalid reason if any
    const invalidReason = this.props.state.invalidReason;
    const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
      (this.props.poked || (this.state.showUserSetErrors && this.props.state.userSet)) && invalidReason;
    let i18nInvalidReason = null;
    if (
      isCurrentlyShownAsInvalid && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
      i18nInvalidReason = i18nData.error[invalidReason];
    }

    // set the input mode, this is for mobile,
    // basically according to our input we need
    // different keys
    const type = this.props.property.getType();
    const subtype = this.props.property.getSubtype();

    let currency: ICurrencyType = null;
    let currencyFormat: string = null;
    let currencyAvailable: ICurrencyType[] = null;
    let currencyI18n: ICurrencyI18nType = null;
    let defaultCurrency: ICurrencyType = null;
    if (type === "currency") {
      currencyAvailable = arrCurrencies;
      const [currencCurrency] = this.getCurrentCurrency();
      currency = currencies[currencCurrency];
      currencyFormat = this.props.i18n[this.props.language].currency_format;
      currencyI18n = {
        title: this.props.i18n[this.props.language].currency_dialog_title,
      };
      defaultCurrency = this.props.currency;
    }

    let defaultCountry: ICountryType = null;
    let countriesAvailable: ICountryType[] = null;
    if (subtype === "phone" || subtype === "country" || subtype === "language") {
      defaultCountry = this.props.country;
      countriesAvailable = arrCountries;
    }

    let defaultLanguage: ILanguageType = null;
    let languagesAvailable: ILanguageType[] = null;
    if (subtype === "language") {
      defaultLanguage = arrLanguages.find((l) => l.code === this.props.language);
      languagesAvailable = arrLanguages;
    }

    if (subtype === "currency") {
      currencyAvailable = arrCurrencies;
    }

    let unitPrefersImperial: boolean;
    let unitIsLockedToPrimaries: boolean;
    let unitOptions: string[];
    let unitImperialOptions: string[];
    let unit: string;
    let unitPrimary: string;
    let unitPrimaryImperial: string;
    let unitI18n: IUnitI18nType;
    if (type === "unit") {
      const answer = this.getCurrentUnit();
      unit = answer[0];
      unitPrimary = answer[1];
      unitPrimaryImperial = answer[2];
      unitPrefersImperial = answer[3];

      unitIsLockedToPrimaries = this.props.property.getConfigValue("lockUnitsToPrimaries") as boolean;

      const availableUnits = convert().list(subtype as any);
      unitOptions = unitIsLockedToPrimaries ? null : availableUnits.filter(
        (unit) => unit.system === "metric" && unit.abbr !== unitPrimary
      ).map((u) => u.abbr);
      unitImperialOptions = unitIsLockedToPrimaries ? null : availableUnits.filter(
        (unit) => unit.system === "imperial" && unit.abbr !== unitPrimaryImperial
      ).map((u) => u.abbr);

      unitI18n = {
        title: this.props.i18n[this.props.language].unit_dialog_title,
        others: this.props.i18n[this.props.language].unit_dialog_others,
        metric: this.props.i18n[this.props.language].unit_dialog_metric,
        imperial: this.props.i18n[this.props.language].unit_dialog_imperial,
      };
    }

    let currentValueLang: string = null;

    if (type === "text" && this.props.state.value) {
      currentValueLang = (this.props.state.value as any).language || null;
    }

    let currentTextualValue: string = (type === "unit" || type === "currency" || type === "text") && this.props.state.internalValue ?
      this.props.state.internalValue.value : this.props.state.internalValue;

    if (!currentTextualValue) {
      if (type === "text") {
        currentTextualValue = this.props.state.value ?
          (this.props.state.value as any).value : "";
      } else {
        currentTextualValue = (type === "unit" || type === "currency") && this.props.state.value ?
          (this.props.state.value as any).value.toString() : (
            this.props.state.value && this.props.state.value.toString()
          );
      }
    }

    if (!currentTextualValue) {
      currentTextualValue = "";
    }

    const numericType = getNumericType(type);
    if (numericType === NumericType.FLOAT) {
      currentTextualValue = formatValueAsString(
        numericType,
        this.props.i18n[this.props.language].number_decimal_separator,
        currentTextualValue,
      );
    }

    const RendererElement = this.props.renderer;
    const rendererArgs = {
      propertyId: this.props.property.getId(),
      uniqueId: this.props.property.getUniqueIdentifier(this.props.forId, this.props.forVersion),

      args: this.props.rendererArgs || {},
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      type: type as any,
      subtype: subtype as any,
      language: this.props.language,
      languageOverride: this.props.languageOverride,

      currentAppliedValue: this.props.state.stateAppliedValue as any,
      currentValue: this.props.state.value as any,
      currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: i18nInvalidReason,
      currentInternalValue: this.props.state.internalValue,
      currentTextualValue,
      currentValueLang,
      canRestore: canRestoreCalculator(this.props.state.value, this.props.state.stateAppliedValue, type),

      disabled:
        typeof this.props.disabled !== "undefined" && this.props.disabled !== null ?
          this.props.disabled :
          this.props.state.enforced,

      autoFocus: this.props.autoFocus || false,

      onChange: this.props.onChange,
      onChangeByTextualValue: this.onChangeByTextualValue,
      onChangeCurrency: this.onChangeCurrency,
      onChangeTextLanguage: this.onChangeTextLanguage,
      onRestore: this.props.onRestore,

      defaultCountry,
      countriesAvailable,

      defaultLanguage,
      languagesAvailable,

      defaultCurrency,
      currency,
      currencyFormat: currencyFormat as any,
      currencyAvailable: currencyAvailable,
      currencyI18n,

      isNumericType: type === "currency" || type === "unit" || type === "number" || type === "integer" || type === "year",

      unitPrefersImperial,
      unitOptions,
      unitImperialOptions,
      unitPrimary,
      unitPrimaryImperial,
      unit,
      unitI18n,
      unitIsLockedToPrimaries,
      unitToNode: this.unitToNode,
      onChangeUnit: this.onChangeUnit,
      enableUserSetErrors: this.enableUserSetErrors,
    };

    return <RendererElement {...rendererArgs} />
  }
}
