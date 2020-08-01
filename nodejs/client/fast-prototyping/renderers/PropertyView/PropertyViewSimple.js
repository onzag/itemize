"use strict";
/**
 * Contains the property view simple renderer that simply displays a thing
 * used in raw properties and in simple properties such as text or numbers
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const util_1 = require("../../../../util");
const moment_1 = __importDefault(require("moment"));
/**
 * Allows for simple viewing of simple attributes
 *
 * supported args:
 * - NullComponent: a react component to use rather than the default if the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 * - dateFormat: a string, if specified will use that with moment to format the string like that
 *
 * @param props the props for the simple renderer passed by the handler
 * @returns a react element
 */
function PropertyViewSimpleRenderer(props) {
    let value;
    if (props.args.dateFormat) {
        value = props.currentValue ? moment_1.default(props.currentValue).format(props.args.dateFormat) : props.currentValue;
    }
    else {
        value = props.capitalize ? util_1.capitalize(props.currentValue) : props.currentValue;
    }
    if (value === null && props.args.NullComponent) {
        const NullComponent = props.args.NullComponent;
        const nullArgs = props.args.nullComponentArgs;
        value = react_1.default.createElement(NullComponent, Object.assign({}, nullArgs));
    }
    return (react_1.default.createElement("span", null, value));
}
exports.default = PropertyViewSimpleRenderer;
