"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const util_1 = require("../../../../util");
const moment_1 = __importDefault(require("moment"));
function PropertyViewSimpleRenderer(props) {
    if (props.args.dateFormat) {
        return (react_1.default.createElement("span", null, props.currentValue ? moment_1.default(props.currentValue).format(props.args.dateFormat) : props.currentValue));
    }
    return (react_1.default.createElement("span", null, props.capitalize ? util_1.capitalize(props.currentValue) : props.currentValue));
}
exports.default = PropertyViewSimpleRenderer;
