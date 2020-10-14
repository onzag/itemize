"use strict";
/**
 * The date time view handler
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyViewDateTime = void 0;
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const moment_1 = __importDefault(require("moment"));
const util_1 = require("../../../../util");
const constants_1 = require("../../../../constants");
/**
 * The property view date time handler class
 */
class PropertyViewDateTime extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps) {
        // This is optimized to only update for the thing it uses
        return this.props.useAppliedValue !== nextProps.useAppliedValue ||
            (!this.props.useAppliedValue && !deep_equal_1.default(this.props.state.value, nextProps.state.value)) ||
            (this.props.useAppliedValue && !deep_equal_1.default(this.props.state.stateAppliedValue, nextProps.state.stateAppliedValue)) ||
            nextProps.property !== this.props.property ||
            nextProps.renderer !== this.props.renderer ||
            nextProps.capitalize !== this.props.capitalize ||
            !!this.props.rtl !== !!nextProps.rtl ||
            this.props.language !== nextProps.language ||
            !deep_equal_1.default(this.props.rendererArgs, nextProps.rendererArgs);
    }
    render() {
        const type = this.props.property.getType();
        let format;
        let dbFormat;
        if (type === "date") {
            format = util_1.getLocalizedDateFormat();
            dbFormat = constants_1.DATE_FORMAT;
        }
        else if (type === "datetime") {
            format = util_1.getLocalizedDateTimeFormat();
            dbFormat = constants_1.DATETIME_FORMAT;
        }
        else {
            format = util_1.getLocalizedTimeFormat();
            dbFormat = constants_1.TIME_FORMAT;
        }
        let momentValue = null;
        const valueToUse = (this.props.useAppliedValue ? this.props.state.stateAppliedValue : this.props.state.value);
        if (valueToUse && valueToUse !== "Invalid Date") {
            momentValue = moment_1.default(valueToUse, dbFormat).utc();
            if (!momentValue.isValid()) {
                momentValue = null;
            }
        }
        const RendererElement = this.props.renderer;
        const rendererArgs = {
            args: this.props.rendererArgs,
            rtl: this.props.rtl,
            currentValue: valueToUse,
            momentValue,
            dbFormat,
            defaultFormat: format,
            defaultFormattedValue: momentValue ? momentValue.format(format) : null,
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererArgs));
    }
}
exports.PropertyViewDateTime = PropertyViewDateTime;
