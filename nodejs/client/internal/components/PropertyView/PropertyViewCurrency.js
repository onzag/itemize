"use strict";
/**
 * Contains the property view currency handler
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const imported_resources_1 = require("../../../../imported-resources");
class PropertyViewCurrency extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps) {
        // This is optimized to only update for the thing it uses
        return this.props.useAppliedValue !== nextProps.useAppliedValue ||
            (!this.props.useAppliedValue && this.props.state.value !== nextProps.state.value) ||
            (this.props.useAppliedValue && this.props.state.stateAppliedValue !== nextProps.state.stateAppliedValue) ||
            nextProps.property !== this.props.property ||
            nextProps.renderer !== this.props.renderer ||
            !!this.props.rtl !== !!nextProps.rtl ||
            this.props.language !== nextProps.language ||
            this.props.currency !== nextProps.currency ||
            !deep_equal_1.default(this.props.rendererArgs, nextProps.rendererArgs);
    }
    render() {
        // we get the value that we will be using
        const value = (this.props.useAppliedValue ?
            this.props.state.stateAppliedValue :
            this.props.state.value);
        // and the original value numeric
        const originalValue = value && value.value;
        const originalCurrencyCode = value && value.currency;
        // and now for these
        let originalStrValue = null;
        let originalCurrency = null;
        let convertedCurrency = null;
        let convertedValue = null;
        let convertedStrValue = null;
        // might be null so we set it up
        if (originalCurrencyCode) {
            originalCurrency = imported_resources_1.currencies[originalCurrencyCode];
        }
        // so now we try to get these formatted
        if (typeof originalValue !== "undefined" && originalValue !== null) {
            // and we format by removing the dot
            originalStrValue = originalValue.toFixed(originalCurrency.decimals)
                .replace(".", this.props.i18n[this.props.language].number_decimal_separator);
            // if the currency code of the original
            // doesn't match the current's user code, and we have
            // currency factors
            if (originalCurrency.code !== this.props.currency.code &&
                this.props.currencyFactors[originalCurrency.code] &&
                this.props.currencyFactors[this.props.currency.code]) {
                // we convert it up
                convertedCurrency = this.props.currency;
                const inFactorCurrency = originalValue * this.props.currencyFactors[originalCurrency.code];
                convertedValue = inFactorCurrency / this.props.currencyFactors[convertedCurrency.code];
                // and then format
                convertedStrValue = convertedValue.toFixed(originalCurrency.decimals)
                    .replace(".", this.props.i18n[this.props.language].number_decimal_separator);
            }
        }
        const RendererElement = this.props.renderer;
        const rendererArgs = {
            args: this.props.rendererArgs,
            rtl: this.props.rtl,
            originalCurrency,
            originalStrValue,
            originalValue,
            convertedCurrency,
            convertedStrValue,
            convertedValue,
            format: this.props.i18n[this.props.language].currency_format,
            currentValue: value,
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererArgs));
    }
}
exports.PropertyViewCurrency = PropertyViewCurrency;
