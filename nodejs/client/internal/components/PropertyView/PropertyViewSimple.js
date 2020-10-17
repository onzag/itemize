"use strict";
/**
 * The standard handler for the property view simple
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyViewSimple = void 0;
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const PropertyEntryField_1 = require("../PropertyEntry/PropertyEntryField");
/**
 * The property view simple class
 */
class PropertyViewSimple extends react_1.default.Component {
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
            nextProps.capitalize !== this.props.capitalize ||
            !!this.props.rtl !== !!nextProps.rtl ||
            this.props.language !== nextProps.language ||
            !deep_equal_1.default(this.props.rendererArgs, nextProps.rendererArgs);
    }
    render() {
        let i18nData = null;
        let nullValueLabel = null;
        if (this.props.property && this.props.property.hasSpecificValidValues()) {
            i18nData = this.props.property.getI18nDataFor(this.props.language);
            nullValueLabel = this.props.property.isNullable() ?
                i18nData && i18nData.null_value : null;
        }
        const value = (this.props.useAppliedValue ?
            this.props.state.stateAppliedValue :
            this.props.state.value);
        let currentValue = (value === null || (typeof value === "number" && isNaN(value))) ?
            nullValueLabel :
            ((i18nData && i18nData.values[value.toString()]) ||
                value.toString());
        const numericType = this.props.property ? PropertyEntryField_1.getNumericType(this.props.property.getType()) : PropertyEntryField_1.NumericType.NAN;
        if (numericType === PropertyEntryField_1.NumericType.FLOAT) {
            currentValue = currentValue.replace(".", this.props.i18n[this.props.language].number_decimal_separator);
        }
        const RendererElement = this.props.renderer;
        const rendererArgs = {
            args: this.props.rendererArgs,
            rtl: this.props.rtl,
            language: this.props.language,
            currentValue,
            capitalize: !!this.props.capitalize,
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererArgs));
    }
}
exports.PropertyViewSimple = PropertyViewSimple;
