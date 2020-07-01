import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import equals from "deep-equal";
import { escapeStringRegexp } from "../../../../util";
import { IPropertyDefinitionSupportedCurrencyType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/currency";
import { MAX_DECIMAL_COUNT } from "../../../../constants";
import { ICurrencyType, currencies } from "../../../../imported-resources";
import convert from "convert-units";
import { IPropertyDefinitionSupportedUnitType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/unit";

enum NumericType {
  FLOAT,
  INTEGER,
}

function getNumericType(type: string): NumericType {
  if (type === "number" || type === "currency" || type === "unit") {
    return NumericType.FLOAT;
  }
  return NumericType.INTEGER;
}

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

interface IUnitI18nType {
  title: string;
  others: string;
  metric: string;
  imperial: string;
};

export interface IPropertyEntryFieldRendererProps extends IPropertyEntryRendererProps<string> {
  currentInternalStrOnlyValue: string;
  currentStrOnlyValue: string;

  type: "string" | "password" | "text" | "integer" | "number" | "currency" | "year" | "unit";
  subtype?: "email" | "identifier" | "locale" | "comprehensive-locale" | "language" | "country" | "currency" | "plain" | string;
  htmlAutocomplete?: string;

  isNumericType: boolean;
  onChangeByNumber: (textualValue: string) => void;

  currency?: ICurrencyType;
  currencyFormat?: "$N" | "N$",

  unit?: string;
  unitPrimary?: string;
  unitPrimaryImperial?: string;
  unitOptions?: string[];
  unitImperialOptions?: string[];
  unitPrefersImperial?: boolean;
  unitIsLockedToPrimaries?: boolean;
  unitI18n?: IUnitI18nType;
  unitToNode?: (unit: string) => React.ReactNode;
  onChangeUnit?: (unit: string) => void;
}

type ValueType = string | number | IPropertyDefinitionSupportedCurrencyType | IPropertyDefinitionSupportedUnitType;

export default class PropertyEntryField
  extends React.Component<IPropertyEntryHandlerProps<ValueType, IPropertyEntryFieldRendererProps>> {

  constructor(props: IPropertyEntryHandlerProps<ValueType, IPropertyEntryFieldRendererProps>) {
    super(props);

    this.onChangeByNumber = this.onChangeByNumber.bind(this);
    this.unitToNode = this.unitToNode.bind(this);
    this.onChangeUnit = this.onChangeUnit.bind(this);
    this.getCurrentUnit = this.getCurrentUnit.bind(this);
  }

  public unitToNode(unit: string) {
    if (unit === "l") {
      return <span>L</span>;
    } else if (unit === "ml" || unit === "cl" || unit === "dl" || unit === "kl") {
      return <span>{unit[0]}L</span>;
    } else if (unit === "C" || unit === "K" || unit === "F" || unit === "R") {
      return <span>&deg;{unit}</span>;
    }
    return (
      <span>
        {unit.split(/(\d+)/).filter((m) => !!m).map((m, i) => isNaN(m as any) ?
          <span key={i}>{m}</span> : <sup key={i}>{m}</sup>)}
      </span>
    );
  }

  public componentDidMount() {
    const initialPrefill = this.props.property.getSpecialProperty("initialPrefill") as number;
    if (
      typeof initialPrefill !== "undefined" &&
      initialPrefill !== null &&
      !this.props.state.value
    ) {
      this.onChangeByNumber(initialPrefill.toString().replace(".", this.props.i18n[this.props.language].number_decimal_separator));
    }
  }

  public componentDidUpdate(
    prevProps: IPropertyEntryHandlerProps<ValueType, IPropertyEntryFieldRendererProps>,
  ) {
    if (
      prevProps.currency.code !== this.props.currency.code &&
      this.props.property.getType() === "currency" &&
      this.props.state.value
    ) {
      this.props.onChange({
        value: (this.props.state.value as IPropertyDefinitionSupportedCurrencyType).value,
        currency: this.props.currency.code,
      }, this.props.state.internalValue);
    } else if (
      prevProps.country.code !== this.props.country.code &&
      this.props.property.getType() === "unit" &&
      (this.props.state.value || this.props.state.internalValue)
    ) {
      const wasImperial = prevProps.country.code === "US";
      const isImperial = this.props.country.code === "US";
      if (wasImperial !== isImperial) {
        if (!isImperial) {
          const metricUnit = this.props.property.getSpecialProperty("unit") as string;
          this.onChangeUnit(metricUnit);
        } else {
          const imperialUnit = this.props.property.getSpecialProperty("imperialUnit") as string;
          this.onChangeUnit(imperialUnit);
        }
      }
    }
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<ValueType, IPropertyEntryFieldRendererProps>,
  ) {
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      !equals(this.props.state, nextProps.state) ||
      !!this.props.poked !== !!nextProps.poked ||
      !!this.props.rtl !== !!nextProps.rtl ||
      !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
      nextProps.currency.code !== this.props.currency.code ||
      nextProps.country.code !== this.props.country.code ||
      this.props.altDescription !== nextProps.altDescription ||
      this.props.altPlaceholder !== nextProps.altPlaceholder ||
      this.props.altLabel !== nextProps.altLabel ||
      !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
      nextProps.language !== this.props.language ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.icon !== this.props.icon ||
      nextProps.renderer !== this.props.renderer ||
      !equals(this.props.rendererArgs, nextProps.rendererArgs);
  }

  public onChangeUnit(newUnit: string) {
    if (!this.props.state.value) {
      this.props.onChange(
        this.props.state.value as IPropertyDefinitionSupportedUnitType,
        {
          ...this.props.state.internalValue,
          unit: newUnit,
        }
      );
      return;
    }

    const value = (this.props.state.value as IPropertyDefinitionSupportedUnitType).value;
    const oldUnit = (this.props.state.value as IPropertyDefinitionSupportedUnitType).unit;

    const maxDecimalCount = this.props.property.getMaxDecimalCount() || MAX_DECIMAL_COUNT;
    const valueInNewUnit = parseFloat(convert(value).from(oldUnit as any).to(newUnit as any).toFixed(maxDecimalCount));

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

  public getCurrentUnit(): [string, string, string, boolean] {
    const prefersImperial = this.props.country.code === "US";
    const imperialUnit = this.props.property.getSpecialProperty("imperialUnit") as string;
    const standardUnit = this.props.property.getSpecialProperty("unit") as string;
    const usedUnit = prefersImperial ? imperialUnit : standardUnit;
    const currentUnit = (
      this.props.state.value ?
      (this.props.state.value as IPropertyDefinitionSupportedUnitType).unit :
      (this.props.state.internalValue && this.props.state.internalValue.unit)
    ) || usedUnit;
    return [currentUnit, standardUnit, imperialUnit, prefersImperial];
  }

  public onChangeByNumber(textualValue: string) {
    if (textualValue.trim() === "") {
      this.props.onChange(null, textualValue);
      return;
    }

    // let's get the type and the base type
    const type = this.props.property.getType();
    const numericType = getNumericType(type);

    // like if we have a float
    let numericValue: number;
    let normalizedTextualValueAsString: string;
    if (numericType === NumericType.FLOAT) {
      // get the separator escaped
      const escapedNumberSeparator = escapeStringRegexp(
        this.props.i18n[this.props.language].number_decimal_separator,
      );
      // and replace it for the standard separator
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
      // do the onchange with the currency code
      this.props.onChange({
        value: actualNumericValue,
        currency: this.props.currency.code,
      }, newTextualValue);
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
    const i18nLabel = this.props.altLabel || (i18nData && i18nData.label);
    const i18nDescription = this.props.hideDescription ? null : (this.props.altDescription || (i18nData && i18nData.description));
    const i18nPlaceholder = this.props.altPlaceholder || (i18nData && i18nData.placeholder);

    // get the invalid reason if any
    const invalidReason = this.props.state.invalidReason;
    const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
      (this.props.poked || this.props.state.userSet) && invalidReason;
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
    if (type === "currency") {
      currency = this.props.state.value ?
        currencies[(this.props.state.value as IPropertyDefinitionSupportedCurrencyType).currency] :
        this.props.currency;
      currencyFormat = this.props.i18n[this.props.language].currency_format;
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

      unitIsLockedToPrimaries = this.props.property.getSpecialProperty("lockUnitsToPrimaries") as boolean;

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

    const RendererElement = this.props.renderer;
    const rendererArgs = {
      propertyId: this.props.property.getId(),
  
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      type: type as any,
      subtype: subtype as any,
      htmlAutocomplete: this.props.property.getHTMLAutocomplete(),
      icon: this.props.icon,

      currentAppliedValue: this.props.state.stateAppliedValue as any,
      currentValue: this.props.state.value as any,
      currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: i18nInvalidReason,
      currentInternalValue: this.props.state.internalValue,
      currentInternalStrOnlyValue: type === "unit" && this.props.state.internalValue ?
        this.props.state.internalValue.value : this.props.state.internalValue,
      currentStrOnlyValue: (type === "unit" || type === "currency") && this.props.state.value ?
        (this.props.state.value as any).value.toString() : (
          this.props.state.value && this.props.state.value.toString()
        ),
      canRestore: this.props.state.value !== this.props.state.stateAppliedValue,

      disabled: this.props.state.enforced,

      autoFocus: this.props.autoFocus || false,

      onChange: this.props.onChange,
      onChangeByNumber: this.onChangeByNumber,
      onRestore: this.props.onRestore,
      
      currency,
      currencyFormat: currencyFormat as any,
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
    };

    return <RendererElement {...rendererArgs}/>
  }
}
