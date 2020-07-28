"use strict";
/**
 * Contains the class that allows to generate conditional rendering
 * on whether the user is logged in or not
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const token_provider_1 = require("../../internal/providers/token-provider");
/**
 * The actual log status class, note how it is
 * a pure component for increased performance
 */
class ActualIfLogStatus extends react_1.default.PureComponent {
    render() {
        // so first using the logic we get the current status
        const logStatus = this.props.isLoggedIn ? "LOGGED_IN" : (this.props.isLoggingIn ? "LOGGING_IN" : "LOGGED_OUT");
        // and now whether it should render
        const shouldRender = !this.props.status || (this.props.status === logStatus);
        // if it shouldn't render
        if (!shouldRender) {
            // we give null
            return null;
        }
        else if (typeof this.props.children === "function") {
            // for function we pass the log status
            return this.props.children(logStatus) || null;
        }
        else {
            // otherwise we just render the children
            return this.props.children || null;
        }
    }
}
/**
 * The IfLogStatus component allows for conditional rendering of the
 * logged in status of the current user in the application context
 * @param props the log status props
 * @returns a react node
 */
function IfLogStatus(props) {
    return (react_1.default.createElement(token_provider_1.TokenContext.Consumer, null, (value) => {
        return react_1.default.createElement(ActualIfLogStatus, Object.assign({}, props, { isLoggedIn: !!value.token, isLoggingIn: value.isLoggingIn }));
    }));
}
exports.IfLogStatus = IfLogStatus;
