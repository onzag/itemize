"use strict";
/**
 * Contains the property view datetime renderer
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/**
 * The fast prototyping property view date time renderer, basically uses moment to format
 * for the given date format
 *
 * supported args:
 * - NullComponent: a react component to render instead of the default when the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 * - dateFormat: a momentjs date string format to use instead of the default (keep localization in mind)
 *
 * @param props the property view date time renderer props given by the handler
 * @returns a react element
 */
function PropertyViewDateTimeRenderer(props) {
    let value;
    if (props.args.dateFormat) {
        value = props.momentValue ? props.momentValue.format(props.args.dateFormat) : null;
    }
    else {
        value = props.defaultFormattedValue;
    }
    if (value === null && props.args.NullComponent) {
        const NullComponent = props.args.NullComponent;
        const nullArgs = props.args.nullComponentArgs;
        value = react_1.default.createElement(NullComponent, Object.assign({}, nullArgs));
    }
    return (react_1.default.createElement("span", null, value));
}
exports.default = PropertyViewDateTimeRenderer;
