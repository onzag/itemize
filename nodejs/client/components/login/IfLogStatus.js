"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const token_provider_1 = require("../../internal/providers/token-provider");
// tslint:disable-next-line: max-classes-per-file
class ActualIfLogStatus extends react_1.default.PureComponent {
    render() {
        const logStatus = this.props.isLoggedIn ? "LOGGED_IN" : (this.props.isLoggingIn ? "LOGGING_IN" : "LOGGED_OUT");
        const shouldRender = !this.props.status || (this.props.status === logStatus);
        if (!shouldRender) {
            return null;
        }
        else if (typeof this.props.children === "function") {
            return this.props.children(logStatus) || null;
        }
        else {
            return this.props.children || null;
        }
    }
}
function IfLogStatus(props) {
    return (react_1.default.createElement(token_provider_1.TokenContext.Consumer, null, (value) => {
        return react_1.default.createElement(ActualIfLogStatus, Object.assign({}, props, { isLoggedIn: !!value.token, isLoggingIn: value.isLoggingIn }));
    }));
}
exports.IfLogStatus = IfLogStatus;
