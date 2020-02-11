"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class PropertyViewField extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.state.value !== nextProps.state.value;
    }
    render() {
        return (<div className={this.props.classes.container}>
        {this.props.state.value}
      </div>);
    }
}
exports.default = PropertyViewField;
