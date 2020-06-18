"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const IndeterminateCheckBox_1 = __importDefault(require("@material-ui/icons/IndeterminateCheckBox"));
const CheckBox_1 = __importDefault(require("@material-ui/icons/CheckBox"));
const CheckBoxOutlineBlank_1 = __importDefault(require("@material-ui/icons/CheckBoxOutlineBlank"));
function PropertyViewBooleanRenderer(props) {
    let i18nLabel = null;
    let icon = null;
    if (props.currentValue === null) {
        if (props.args.NullComponent) {
            const NullComponent = props.args.NullComponent;
            const nullArgs = props.args.nullComponentArgs;
            return react_1.default.createElement(NullComponent, Object.assign({}, nullArgs));
        }
        i18nLabel = props.args.hideLabel ? null : props.i18nUnspecified;
        icon = props.args.hideIcon ? null : react_1.default.createElement(IndeterminateCheckBox_1.default, null);
    }
    else if (props.currentValue === true) {
        i18nLabel = props.args.hideLabel ? null : props.i18nYes;
        icon = props.args.hideIcon ? null : react_1.default.createElement(CheckBox_1.default, null);
    }
    else if (props.currentValue === false) {
        i18nLabel = props.args.hideLabel ? null : props.i18nNo;
        icon = props.args.hideIcon ? null : react_1.default.createElement(CheckBoxOutlineBlank_1.default, null);
    }
    return (react_1.default.createElement("span", null,
        i18nLabel,
        icon));
}
exports.default = PropertyViewBooleanRenderer;
