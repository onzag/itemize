"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const util_1 = require("../../../../util");
const moment_1 = __importDefault(require("moment"));
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
