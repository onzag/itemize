"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
class PropertyViewSimple extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps) {
        // This is optimized to only update for the thing it uses
        return !deep_equal_1.default(this.props.state.value, nextProps.state.value) ||
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
        const RendererElement = this.props.renderer;
        const rendererArgs = {
            args: this.props.rendererArgs,
            rtl: this.props.rtl,
            language: this.props.language,
            currentValue: this.props.state.value === null ?
                nullValueLabel :
                ((i18nData && i18nData.values[this.props.state.value.toString()]) ||
                    this.props.state.value.toString()),
            capitalize: !!this.props.capitalize,
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererArgs));
    }
}
exports.PropertyViewSimple = PropertyViewSimple;
