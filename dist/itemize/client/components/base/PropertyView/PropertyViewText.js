"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const util_1 = require("../../../../util");
class PropertyViewText extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.state.value !== nextProps.state.value;
    }
    render() {
        if (this.props.property.isRichText()) {
            const purifiedText = util_1.DOMPurify.sanitize(this.props.state.value.toString());
            return (<div className="rich-text" dangerouslySetInnerHTML={{ __html: purifiedText }}/>);
        }
        return (<div className={this.props.classes.container}>
        {this.props.state.value}
      </div>);
    }
}
exports.default = PropertyViewText;
