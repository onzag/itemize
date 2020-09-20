"use strict";
/**
 * Contains the field handler for field types
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumericType = exports.NumericType = void 0;
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const util_1 = require("../../../../util");
const constants_1 = require("../../../../constants");
const imported_resources_1 = require("../../../../imported-resources");
const convert_units_1 = __importDefault(require("convert-units"));
/**
 * An enum which is useful for numeric types
 */
var NumericType;
(function (NumericType) {
    /**
     * For currency, unit and number
     */
    NumericType[NumericType["FLOAT"] = 0] = "FLOAT";
    /**
     * For year, integer
     */
    NumericType[NumericType["INTEGER"] = 1] = "INTEGER";
    /**
     * Not a number, for textual types
     */
    NumericType[NumericType["NAN"] = 2] = "NAN";
})(NumericType = exports.NumericType || (exports.NumericType = {}));
/**
 * Provides the numeric type of a given type
 * @param type the type we are using, number, currency, unit, etc...
 */
function getNumericType(type) {
    if (type === "number" || type === "currency" || type === "unit") {
        return NumericType.FLOAT;
    }
    else if (type === "integer" || type === "year") {
        return NumericType.INTEGER;
    }
    return NumericType.NAN;
}
exports.getNumericType = getNumericType;
/**
 * Given a value, either a raw string or an obeject with a value property that is
 * either a number or a string formatted for the given language
 * @param numericType the numeric type as specified above
 * @param numberSeparator the numeric separator used for this locale
 * @param value either a raw string, a number, or an object that contains a value property that is any of that
 * @returns a string
 */
function formatValueAsString(numericType, numberSeparator, value) {
    const actualValue = value === null || typeof value === "undefined" ? value : (typeof value.value !== "undefined" ? value.value : value);
    if (actualValue === null) {
        return "";
    }
    if (numericType === NumericType.FLOAT) {
        return actualValue.toString().replace(/\./g, numberSeparator);
    }
    return actualValue.toString();
}
;
/**
 * The property entry field handler
 */
class PropertyEntryField extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.onChangeByTextualValue = this.onChangeByTextualValue.bind(this);
        this.unitToNode = this.unitToNode.bind(this);
        this.onChangeUnit = this.onChangeUnit.bind(this);
        this.onChangeCurrency = this.onChangeCurrency.bind(this);
        this.getCurrentCurrency = this.getCurrentCurrency.bind(this);
        this.getCurrentUnit = this.getCurrentUnit.bind(this);
    }
    /**
     * This is the unit to node function that is passed that convets the
     * unit code into something more legible and meant for interaction
     * @param unit the unit code
     * @returns a react element
     */
    unitToNode(unit) {
        // for liters
        if (unit === "l") {
            // we just return big liter
            return react_1.default.createElement("span", null, "L");
            // for mililiters, deciliters, kiloliters, etc...
        }
        else if (unit === "ml" || unit === "cl" || unit === "dl" || unit === "kl") {
            return react_1.default.createElement("span", null,
                unit[0],
                "L");
            // degrees, celcius, farenheit, kelvin, and whatever R degrees are
        }
        else if (unit === "C" || unit === "K" || unit === "F" || unit === "R") {
            return react_1.default.createElement("span", null,
                "\u00B0",
                unit);
        }
        // otherwise we are going to take the numbers and make them superstring
        // works for things like m3 and the like
        return (react_1.default.createElement("span", null, unit.split(/(\d+)/).filter((m) => !!m).map((m, i) => isNaN(m) ?
            react_1.default.createElement("span", { key: i }, m) : react_1.default.createElement("sup", { key: i }, m))));
    }
    componentDidMount() {
        // we take the initial prefill, which only truly exists for the unit type
        const initialPrefill = this.props.property.getSpecialProperty("initialPrefill");
        // and if we have one
        if (typeof initialPrefill !== "undefined" &&
            initialPrefill !== null &&
            !this.props.state.value) {
            // we call this function
            this.onChangeByTextualValue(initialPrefill.toString().replace(".", this.props.i18n[this.props.language].number_decimal_separator));
        }
    }
    componentDidUpdate(prevProps) {
        // so if our currency changes, and we are talking about currency, and we have
        // a value for such currency, this happens when the user used
        // some selector to change his standard currency
        if (prevProps.currency.code !== this.props.currency.code &&
            this.props.property.getType() === "currency" &&
            this.props.state.value) {
            // we change the code to fit this new currency, we dont run
            // conversions
            this.props.onChange({
                value: this.props.state.value.value,
                currency: this.props.currency.code,
            }, this.props.state.internalValue);
            // otherwise if our country code changed
        }
        else if (prevProps.country.code !== this.props.country.code &&
            this.props.property.getType() === "unit" &&
            (this.props.state.value || this.props.state.internalValue)) {
            // yes we literally just check for USA, makes no sense
            // to use an special imperial check when only USA uses imperial
            // like come on...
            const wasImperial = prevProps.country.code === "US";
            const isImperial = this.props.country.code === "US";
            // So if our imperial usage has changed
            if (wasImperial !== isImperial) {
                // we change to the new appropiate
                if (!isImperial) {
                    const metricUnit = this.props.property.getSpecialProperty("unit");
                    this.onChangeUnit(metricUnit);
                }
                else {
                    const imperialUnit = this.props.property.getSpecialProperty("imperialUnit");
                    this.onChangeUnit(imperialUnit);
                }
            }
        }
    }
    shouldComponentUpdate(nextProps) {
        // This is optimized to only update for the thing it uses
        return nextProps.property !== this.props.property ||
            !deep_equal_1.default(this.props.state, nextProps.state) ||
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
            !deep_equal_1.default(this.props.rendererArgs, nextProps.rendererArgs);
    }
    /**
     * Changes the unit to a new unit
     * @param newUnit the new unit code
     */
    onChangeUnit(newUnit) {
        // if we have no value currently to change
        // for
        if (!this.props.state.value) {
            // we just update the unit
            this.props.onChange(this.props.state.value, {
                ...this.props.state.internalValue,
                unit: newUnit,
            });
            return;
        }
        // otherwise we get the current value
        const value = this.props.state.value.value;
        // and the old unit
        const oldUnit = this.props.state.value.unit;
        // now we need the max decimal count for this thing
        const maxDecimalCount = this.props.property.getMaxDecimalCount() || constants_1.MAX_DECIMAL_COUNT;
        // and we convert the thing from the old unit to the new unit
        const valueInNewUnit = parseFloat(convert_units_1.default(value).from(oldUnit).to(newUnit).toFixed(maxDecimalCount));
        // and we run the onchange function
        this.props.onChange({
            ...this.props.state.value,
            unit: newUnit,
            value: valueInNewUnit,
        }, {
            value: valueInNewUnit.toString().replace(".", this.props.i18n[this.props.language].number_decimal_separator),
            unit: newUnit,
        });
    }
    /**
     * Change the currency code
     * @param code the code
     */
    onChangeCurrency(code) {
        const value = this.props.state.value;
        // no current value, we just change the code
        if (!value) {
            this.props.onChange(value, {
                ...this.props.state.internalValue,
                currency: code,
            });
            return;
        }
        // otherwise we just get the current value as string
        const valueStr = typeof value.value === "number" && !isNaN(value.value) ? value.value.toString() : "";
        // as well as the internal value since we do no conversions
        const internalValue = this.props.state.internalValue && this.props.state.internalValue.value;
        // and now we call on change with this
        this.props.onChange({
            ...value,
            currency: code,
        }, {
            value: (internalValue || valueStr).toString().replace(".", this.props.i18n[this.props.language].number_decimal_separator),
            currency: code,
        });
    }
    /**
     * Provides the information about the current unit, regardless on whether
     * we have internal data for it or not
     * @returns an array where, 0 is currentUnit by state, 1 is the standard metric unit code to use
     * 2 is the imperial unit to use, and 3 is whether the user prefers imperial
     */
    getCurrentUnit() {
        // yet another USA shenanigan
        const prefersImperial = this.props.country.code === "US";
        // now we get the imperial and metric unit
        const imperialUnit = this.props.property.getSpecialProperty("imperialUnit");
        const standardUnit = this.props.property.getSpecialProperty("unit");
        // and we specify what we want to use
        const usedUnit = prefersImperial ? imperialUnit : standardUnit;
        // so the current unit, if we have a value, then it's the unit specified
        // by the value, otherwise it's the one in our internal value, otherwise
        // it's the standard unit for this user
        const currentUnit = (this.props.state.value ?
            this.props.state.value.unit :
            (this.props.state.internalValue && this.props.state.internalValue.unit)) || usedUnit;
        // return that info
        return [currentUnit, standardUnit, imperialUnit, prefersImperial];
    }
    /**
     * Provides information about the currency currency
     * @returns an array where, 0 is the current currency and 1 is the default currency
     * according to what we have selected in our localization options
     */
    getCurrentCurrency() {
        // so we do it similarly to unit
        const countrySelectedCurrency = this.props.currency.code;
        const currentCurrency = (this.props.state.value ?
            this.props.state.value.currency :
            (this.props.state.internalValue && this.props.state.internalValue.currency)) || countrySelectedCurrency;
        return [currentCurrency, countrySelectedCurrency];
    }
    /**
     * Given a textual value, updates regardless on the type
     * it is, and controls the internal value based on that
     * @param textualValue the textual value used in the field
     */
    onChangeByTextualValue(textualValue) {
        // let's get the type and the base type
        const type = this.props.property.getType();
        const numericType = getNumericType(type);
        // if it's not a number
        if (numericType === NumericType.NAN) {
            // easy, we just change
            this.props.onChange(textualValue, null);
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
            }
            else if (type === "currency") {
                // same for currency
                const [newCurrency] = this.getCurrentCurrency();
                this.props.onChange(null, {
                    currency: newCurrency,
                    value: textualValue,
                });
            }
            else {
                // otherwise for integer, number, year and whatnot
                // just pass this textual value as it is
                this.props.onChange(null, textualValue);
            }
            // and we are done
            return;
        }
        // like if we have a float
        let numericValue;
        let normalizedTextualValueAsString;
        if (numericType === NumericType.FLOAT) {
            // get the separator escaped
            const escapedNumberSeparator = util_1.escapeStringRegexp(this.props.i18n[this.props.language].number_decimal_separator);
            // and replace it for the standard separator, given
            // that it can be written in the comma form
            normalizedTextualValueAsString = textualValue.replace(new RegExp(escapedNumberSeparator, "g"), ".");
            // we set the numeric value from the normalized by parsing it
            // NaN is a possibility
            numericValue = parseFloat(normalizedTextualValueAsString);
            // if we have an integer of course the normalized value is the same
        }
        else if (numericType === NumericType.INTEGER) {
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
        if (isNaN(numericValue) ||
            // buggy typescript definition which doesn't expect strings
            // need to cast to any
            isNaN(normalizedTextualValueAsString)) {
            // we send a nan so it gives invalid number
            if (type === "unit") {
                const [newUnit] = this.getCurrentUnit();
                this.props.onChange(NaN, {
                    unit: newUnit,
                    value: textualValue,
                });
            }
            else if (type === "currency") {
                // same for curency
                const [newCurrency] = this.getCurrentCurrency();
                this.props.onChange(NaN, {
                    currency: newCurrency,
                    value: textualValue,
                });
            }
            else {
                this.props.onChange(NaN, textualValue);
            }
            return;
        }
        else if (numericType === NumericType.INTEGER) {
            this.props.onChange(numericValue, textualValue);
            return;
        }
        // set the textual value, yes again, in all chances it will be the same
        // but let's say the user pressed "." instead of "," then we need to
        // properly format inormalizedNumericValueAsStringt
        const newTextualValue = formatValueAsString(numericType, this.props.i18n[this.props.language].number_decimal_separator, textualValue);
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
        const maxDecimalCount = this.props.property.getMaxDecimalCount() || constants_1.MAX_DECIMAL_COUNT;
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
        }
        else if (type === "unit") {
            const [newUnit, standardUnit] = this.getCurrentUnit();
            this.props.onChange({
                value: actualNumericValue,
                unit: newUnit,
                normalizedValue: convert_units_1.default(actualNumericValue)
                    .from(newUnit).to(standardUnit),
                normalizedUnit: standardUnit,
            }, {
                unit: newUnit,
                value: newTextualValue,
            });
        }
        else {
            // do the on change
            this.props.onChange(actualNumericValue, newTextualValue);
        }
    }
    render() {
        const i18nData = this.props.property.getI18nDataFor(this.props.language);
        const i18nLabel = this.props.altLabel || (i18nData && i18nData.label);
        const i18nDescription = this.props.hideDescription ? null : (this.props.altDescription || (i18nData && i18nData.description));
        const i18nPlaceholder = this.props.altPlaceholder || (i18nData && i18nData.placeholder);
        // get the invalid reason if any
        const invalidReason = this.props.state.invalidReason;
        const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
            (this.props.poked || this.props.state.userSet) && invalidReason;
        let i18nInvalidReason = null;
        if (isCurrentlyShownAsInvalid && i18nData &&
            i18nData.error && i18nData.error[invalidReason]) {
            i18nInvalidReason = i18nData.error[invalidReason];
        }
        // set the input mode, this is for mobile,
        // basically according to our input we need
        // different keys
        const type = this.props.property.getType();
        const subtype = this.props.property.getSubtype();
        let currency = null;
        let currencyFormat = null;
        let currencyAvailable = null;
        let currencyI18n = null;
        if (type === "currency") {
            currencyAvailable = imported_resources_1.arrCurrencies;
            const [currencCurrency] = this.getCurrentCurrency();
            currency = imported_resources_1.currencies[currencCurrency];
            currencyFormat = this.props.i18n[this.props.language].currency_format;
            currencyI18n = {
                title: this.props.i18n[this.props.language].currency_dialog_title,
            };
        }
        let unitPrefersImperial;
        let unitIsLockedToPrimaries;
        let unitOptions;
        let unitImperialOptions;
        let unit;
        let unitPrimary;
        let unitPrimaryImperial;
        let unitI18n;
        if (type === "unit") {
            const answer = this.getCurrentUnit();
            unit = answer[0];
            unitPrimary = answer[1];
            unitPrimaryImperial = answer[2];
            unitPrefersImperial = answer[3];
            unitIsLockedToPrimaries = this.props.property.getSpecialProperty("lockUnitsToPrimaries");
            const availableUnits = convert_units_1.default().list(subtype);
            unitOptions = unitIsLockedToPrimaries ? null : availableUnits.filter((unit) => unit.system === "metric" && unit.abbr !== unitPrimary).map((u) => u.abbr);
            unitImperialOptions = unitIsLockedToPrimaries ? null : availableUnits.filter((unit) => unit.system === "imperial" && unit.abbr !== unitPrimaryImperial).map((u) => u.abbr);
            unitI18n = {
                title: this.props.i18n[this.props.language].unit_dialog_title,
                others: this.props.i18n[this.props.language].unit_dialog_others,
                metric: this.props.i18n[this.props.language].unit_dialog_metric,
                imperial: this.props.i18n[this.props.language].unit_dialog_imperial,
            };
        }
        let currentTextualValue = (type === "unit" || type === "currency") && this.props.state.internalValue ?
            this.props.state.internalValue.value : this.props.state.internalValue;
        if (!currentTextualValue) {
            currentTextualValue = (type === "unit" || type === "currency") && this.props.state.value ?
                this.props.state.value.value.toString() : (this.props.state.value && this.props.state.value.toString());
        }
        if (!currentTextualValue) {
            currentTextualValue = "";
        }
        const numericType = getNumericType(type);
        if (numericType === NumericType.FLOAT) {
            currentTextualValue = formatValueAsString(numericType, this.props.i18n[this.props.language].number_decimal_separator, currentTextualValue);
        }
        const RendererElement = this.props.renderer;
        const rendererArgs = {
            propertyId: this.props.property.getId(),
            args: this.props.rendererArgs,
            rtl: this.props.rtl,
            label: i18nLabel,
            placeholder: i18nPlaceholder,
            description: i18nDescription,
            type: type,
            subtype: subtype,
            htmlAutocomplete: this.props.property.getHTMLAutocomplete(),
            icon: this.props.icon,
            currentAppliedValue: this.props.state.stateAppliedValue,
            currentValue: this.props.state.value,
            currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
            currentInvalidReason: i18nInvalidReason,
            currentInternalValue: this.props.state.internalValue,
            currentTextualValue,
            canRestore: this.props.state.value !== this.props.state.stateAppliedValue,
            disabled: this.props.state.enforced,
            autoFocus: this.props.autoFocus || false,
            onChange: this.props.onChange,
            onChangeByTextualValue: this.onChangeByTextualValue,
            onChangeCurrency: this.onChangeCurrency,
            onRestore: this.props.onRestore,
            currency,
            currencyFormat: currencyFormat,
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
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererArgs));
    }
}
exports.default = PropertyEntryField;
