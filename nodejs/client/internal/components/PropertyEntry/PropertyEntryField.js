"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const util_1 = require("../../../../util");
const constants_1 = require("../../../../constants");
const imported_resources_1 = require("../../../../imported-resources");
const convert_units_1 = __importDefault(require("convert-units"));
var NumericType;
(function (NumericType) {
    NumericType[NumericType["FLOAT"] = 0] = "FLOAT";
    NumericType[NumericType["INTEGER"] = 1] = "INTEGER";
    NumericType[NumericType["NAN"] = 2] = "NAN";
})(NumericType = exports.NumericType || (exports.NumericType = {}));
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
class PropertyEntryField extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.onChangeByNumber = this.onChangeByNumber.bind(this);
        this.unitToNode = this.unitToNode.bind(this);
        this.onChangeUnit = this.onChangeUnit.bind(this);
        this.onChangeCurrency = this.onChangeCurrency.bind(this);
        this.getCurrentCurrency = this.getCurrentCurrency.bind(this);
        this.getCurrentUnit = this.getCurrentUnit.bind(this);
    }
    unitToNode(unit) {
        if (unit === "l") {
            return react_1.default.createElement("span", null, "L");
        }
        else if (unit === "ml" || unit === "cl" || unit === "dl" || unit === "kl") {
            return react_1.default.createElement("span", null,
                unit[0],
                "L");
        }
        else if (unit === "C" || unit === "K" || unit === "F" || unit === "R") {
            return react_1.default.createElement("span", null,
                "\u00B0",
                unit);
        }
        return (react_1.default.createElement("span", null, unit.split(/(\d+)/).filter((m) => !!m).map((m, i) => isNaN(m) ?
            react_1.default.createElement("span", { key: i }, m) : react_1.default.createElement("sup", { key: i }, m))));
    }
    componentDidMount() {
        const initialPrefill = this.props.property.getSpecialProperty("initialPrefill");
        if (typeof initialPrefill !== "undefined" &&
            initialPrefill !== null &&
            !this.props.state.value) {
            this.onChangeByNumber(initialPrefill.toString().replace(".", this.props.i18n[this.props.language].number_decimal_separator));
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.currency.code !== this.props.currency.code &&
            this.props.property.getType() === "currency" &&
            this.props.state.value) {
            this.props.onChange({
                value: this.props.state.value.value,
                currency: this.props.currency.code,
            }, this.props.state.internalValue);
        }
        else if (prevProps.country.code !== this.props.country.code &&
            this.props.property.getType() === "unit" &&
            (this.props.state.value || this.props.state.internalValue)) {
            const wasImperial = prevProps.country.code === "US";
            const isImperial = this.props.country.code === "US";
            if (wasImperial !== isImperial) {
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
    onChangeUnit(newUnit) {
        if (!this.props.state.value) {
            this.props.onChange(this.props.state.value, {
                ...this.props.state.internalValue,
                unit: newUnit,
            });
            return;
        }
        const value = this.props.state.value.value;
        const oldUnit = this.props.state.value.unit;
        const maxDecimalCount = this.props.property.getMaxDecimalCount() || constants_1.MAX_DECIMAL_COUNT;
        const valueInNewUnit = parseFloat(convert_units_1.default(value).from(oldUnit).to(newUnit).toFixed(maxDecimalCount));
        this.props.onChange({
            ...this.props.state.value,
            unit: newUnit,
            value: valueInNewUnit,
        }, {
            value: valueInNewUnit.toString().replace(".", this.props.i18n[this.props.language].number_decimal_separator),
            unit: newUnit,
        });
    }
    onChangeCurrency(code) {
        const value = this.props.state.value;
        if (!value) {
            this.props.onChange(value, {
                ...this.props.state.internalValue,
                currency: code,
            });
            return;
        }
        const valueStr = typeof value.value === "number" && !isNaN(value.value) ? value.value.toString() : "";
        const internalValue = this.props.state.internalValue && this.props.state.internalValue.value;
        this.props.onChange({
            ...value,
            currency: code,
        }, {
            value: (internalValue || valueStr).toString().replace(".", this.props.i18n[this.props.language].number_decimal_separator),
            currency: code,
        });
    }
    getCurrentUnit() {
        const prefersImperial = this.props.country.code === "US";
        const imperialUnit = this.props.property.getSpecialProperty("imperialUnit");
        const standardUnit = this.props.property.getSpecialProperty("unit");
        const usedUnit = prefersImperial ? imperialUnit : standardUnit;
        const currentUnit = (this.props.state.value ?
            this.props.state.value.unit :
            (this.props.state.internalValue && this.props.state.internalValue.unit)) || usedUnit;
        return [currentUnit, standardUnit, imperialUnit, prefersImperial];
    }
    getCurrentCurrency() {
        const countrySelectedCurrency = this.props.currency.code;
        const currentCurrency = (this.props.state.value ?
            this.props.state.value.currency :
            (this.props.state.internalValue && this.props.state.internalValue.currency)) || countrySelectedCurrency;
        return [currentCurrency, countrySelectedCurrency];
    }
    onChangeByNumber(textualValue) {
        // let's get the type and the base type
        const type = this.props.property.getType();
        const numericType = getNumericType(type);
        if (textualValue.trim() === "") {
            if (type === "unit") {
                const [newUnit] = this.getCurrentUnit();
                this.props.onChange(null, {
                    unit: newUnit,
                    value: textualValue,
                });
            }
            else if (type === "currency") {
                const [newCurrency] = this.getCurrentCurrency();
                this.props.onChange(null, {
                    currency: newCurrency,
                    value: textualValue,
                });
            }
            else {
                this.props.onChange(null, textualValue);
            }
            return;
        }
        // like if we have a float
        let numericValue;
        let normalizedTextualValueAsString;
        if (numericType === NumericType.FLOAT) {
            // get the separator escaped
            const escapedNumberSeparator = util_1.escapeStringRegexp(this.props.i18n[this.props.language].number_decimal_separator);
            // and replace it for the standard separator
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
        let currencyArrData = null;
        let currencyI18n = null;
        if (type === "currency") {
            currencyArrData = imported_resources_1.arrCurrencies;
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
        const currentInternalStrOnlyValue = (type === "unit" || type === "currency") && this.props.state.internalValue ?
            this.props.state.internalValue.value : this.props.state.internalValue;
        let currentStrOnlyValue = (type === "unit" || type === "currency") && this.props.state.value ?
            this.props.state.value.value.toString() : (this.props.state.value && this.props.state.value.toString());
        const numericType = getNumericType(type);
        if (numericType === NumericType.FLOAT) {
            currentStrOnlyValue = formatValueAsString(numericType, this.props.i18n[this.props.language].number_decimal_separator, currentStrOnlyValue);
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
            currentInternalStrOnlyValue,
            currentStrOnlyValue,
            canRestore: this.props.state.value !== this.props.state.stateAppliedValue,
            disabled: this.props.state.enforced,
            autoFocus: this.props.autoFocus || false,
            onChange: this.props.onChange,
            onChangeByNumber: this.onChangeByNumber,
            onChangeCurrency: this.onChangeCurrency,
            onRestore: this.props.onRestore,
            currency,
            currencyFormat: currencyFormat,
            currencyArrData: currencyArrData,
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
