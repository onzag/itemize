"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const item_definition_1 = require("../../providers/item-definition");
class ActualSubmitActioner extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.children !== this.props.children ||
            nextProps.itemDefinitionContext.submitError !== this.props.itemDefinitionContext.submitError ||
            nextProps.itemDefinitionContext.submitting !== this.props.itemDefinitionContext.submitting ||
            nextProps.itemDefinitionContext.submitted !== this.props.itemDefinitionContext.submitted;
    }
    render() {
        return this.props.children({
            submitError: this.props.itemDefinitionContext.submitError,
            submitting: this.props.itemDefinitionContext.submitting,
            submitted: this.props.itemDefinitionContext.submitted,
            submit: this.props.itemDefinitionContext.submit,
            dismissError: this.props.itemDefinitionContext.dismissSubmitError,
            dismissSubmitted: this.props.itemDefinitionContext.dismissSubmitted,
            clean: this.props.itemDefinitionContext.clean,
        });
    }
}
function SubmitActioner(props) {
    return (react_1.default.createElement(item_definition_1.ItemDefinitionContext.Consumer, null, (itemDefinitionContext) => (react_1.default.createElement(ActualSubmitActioner, Object.assign({}, props, { itemDefinitionContext: itemDefinitionContext })))));
}
exports.default = SubmitActioner;
