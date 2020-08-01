"use strict";
/**
 * Contains the component that checks if the app is blocked from update
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const appdata_provider_1 = require("../../internal/providers/appdata-provider");
/**
 * This is the actual class that specify if it's blocked
 */
class ActualAppIsBlockedFromUpdate extends react_1.default.PureComponent {
    render() {
        return this.props.children(this.props.isBlocked);
    }
}
/**
 * Specifies if the app is blocked from update, this happens in the following scenario
 * User has opened 2 tabs, and one tab informs that there's a new version of the app the user then interacts and updates the app
 * when this app reloads it comes with its fresh new version with a new buildnumber, and as such, the initialization
 * will find out this mismatch and as such will attempt to clear up the old database with the old information as it might
 * not really be valid anymore, but an issue arises with that, that the second tab is opened with a worker that has hold
 * of that previous database that is attempted to be deleted
 *
 * As such the App is blocked from update, while this sounds like a rare case, it happens more often than is
 * imagined as users really like to open many tabs
 *
 * @param props the props
 * @returns a react component
 */
function AppIsBlockedFromUpdate(props) {
    return (react_1.default.createElement(appdata_provider_1.DataContext.Consumer, null, (data) => (react_1.default.createElement(ActualAppIsBlockedFromUpdate, Object.assign({}, props, { isBlocked: data.updateIsBlocked })))));
}
exports.AppIsBlockedFromUpdate = AppIsBlockedFromUpdate;
