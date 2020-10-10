"use strict";
/**
 * One of the most useful classes allows for submitting data to the server side
 * as well as do cleanup processes after the fact, most submit buttons will be built
 * upon this class, as it's meant to apply for a button, however it also allows
 * for displaying errors and trigger actions after success or failure
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const item_1 = require("../../providers/item");
/**
 * This is where the main logic happens, its in its own class in order to be
 * able to perform conditional rendering and avoid useless updates
 */
class ActualSubmitActioner extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.children !== this.props.children ||
            nextProps.itemContext.submitError !== this.props.itemContext.submitError ||
            nextProps.itemContext.submitting !== this.props.itemContext.submitting ||
            nextProps.itemContext.submitted !== this.props.itemContext.submitted;
    }
    render() {
        return this.props.children({
            submitError: this.props.itemContext.submitError,
            submitting: this.props.itemContext.submitting,
            submitted: this.props.itemContext.submitted,
            submit: this.props.itemContext.submit,
            dismissError: this.props.itemContext.dismissSubmitError,
            dismissSubmitted: this.props.itemContext.dismissSubmitted,
            clean: this.props.itemContext.clean,
        });
    }
}
/**
 * The submit actioner class allows for usage for triggering submits (add or update)
 * as well as to retrieve the status of such actions, use to create submit buttons as
 * well as to create error messages if such actions failed, the actioner is not stateful
 * and it belongs to the context, meaning all actioners within the same context
 * share the same state
 *
 * @param props the props
 * @returns a react component
 */
function SubmitActioner(props) {
    return (react_1.default.createElement(item_1.ItemContext.Consumer, null, (itemContext) => (react_1.default.createElement(ActualSubmitActioner, Object.assign({}, props, { itemContext: itemContext })))));
}
exports.default = SubmitActioner;
