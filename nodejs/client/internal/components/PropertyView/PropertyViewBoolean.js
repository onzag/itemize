"use strict";
/**
 * Contains the handler for the boolean type
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyViewBoolean = void 0;
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const util_1 = require("../../../../util");
/**
 * The property view boolean handler
 */
class PropertyViewBoolean extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps) {
        // This is optimized to only update for the thing it uses
        return this.props.useAppliedValue !== nextProps.useAppliedValue ||
            (!this.props.useAppliedValue && this.props.state.value !== nextProps.state.value) ||
            (this.props.useAppliedValue && this.props.state.stateAppliedValue !== nextProps.state.stateAppliedValue) ||
            nextProps.language !== this.props.language ||
            nextProps.property !== this.props.property ||
            nextProps.renderer !== this.props.renderer ||
            !!this.props.rtl !== !!nextProps.rtl ||
            this.props.language !== nextProps.language ||
            !deep_equal_1.default(this.props.rendererArgs, nextProps.rendererArgs);
    }
    render() {
        const i18nYes = util_1.capitalize(this.props.i18n[this.props.language].yes);
        const i18nNo = util_1.capitalize(this.props.i18n[this.props.language].no);
        const i18nUnspecified = util_1.capitalize(this.props.i18n[this.props.language].unspecified);
        const RendererElement = this.props.renderer;
        const rendererArgs = {
            args: this.props.rendererArgs,
            rtl: this.props.rtl,
            currentValue: this.props.useAppliedValue ?
                this.props.state.stateAppliedValue :
                this.props.state.value,
            i18nNo,
            i18nYes,
            i18nUnspecified,
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererArgs));
    }
}
exports.PropertyViewBoolean = PropertyViewBoolean;
