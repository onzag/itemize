"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const util_1 = require("../../../../util");
const core_1 = require("@material-ui/core");
class PropertyViewBoolean extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.i18n !== nextProps.i18n ||
            this.props.state.value !== nextProps.state.value;
    }
    render() {
        let i18nLabel = null;
        let icon = null;
        if (this.props.state.value === null) {
            i18nLabel = util_1.capitalize(this.props.i18n[this.props.language].unspecified);
            icon = <core_1.Icon>indeterminate_check_box</core_1.Icon>;
        }
        else if (this.props.state.value === true) {
            i18nLabel = util_1.capitalize(this.props.i18n[this.props.language].yes);
            icon = <core_1.Icon>check_box</core_1.Icon>;
        }
        else if (this.props.state.value === false) {
            i18nLabel = util_1.capitalize(this.props.i18n[this.props.language].no);
            icon = <core_1.Icon>check_box_outline_blank</core_1.Icon>;
        }
        return (<div className={this.props.classes.container}>
        {i18nLabel}{icon}
      </div>);
    }
}
exports.default = PropertyViewBoolean;
