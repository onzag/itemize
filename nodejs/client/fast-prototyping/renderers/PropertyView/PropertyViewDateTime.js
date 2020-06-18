"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
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
