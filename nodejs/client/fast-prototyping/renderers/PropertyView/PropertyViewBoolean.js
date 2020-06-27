"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function PropertyViewBooleanRenderer(props) {
    let i18nLabel = null;
    if (props.currentValue === null) {
        if (props.args.NullComponent) {
            const NullComponent = props.args.NullComponent;
            const nullArgs = props.args.nullComponentArgs;
            return react_1.default.createElement(NullComponent, Object.assign({}, nullArgs));
        }
        i18nLabel = props.i18nUnspecified;
    }
    else if (props.currentValue === true) {
        i18nLabel = props.i18nYes;
    }
    else if (props.currentValue === false) {
        i18nLabel = props.i18nNo;
    }
    return (react_1.default.createElement("span", null, i18nLabel));
}
exports.default = PropertyViewBooleanRenderer;
