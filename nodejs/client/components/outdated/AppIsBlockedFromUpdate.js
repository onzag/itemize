"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const app_1 = require("../../internal/app");
class ActualAppIsBlockedFromUpdate extends react_1.default.PureComponent {
    render() {
        return this.props.children(this.props.isBlocked);
    }
}
function AppIsBlockedFromUpdate(props) {
    return (react_1.default.createElement(app_1.DataContext.Consumer, null, (data) => (react_1.default.createElement(ActualAppIsBlockedFromUpdate, Object.assign({}, props, { isBlocked: data.updateIsBlocked })))));
}
exports.AppIsBlockedFromUpdate = AppIsBlockedFromUpdate;
