"use strict";
/**
 * Contains the data provider that provides application specific information
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/**
 * The data context provides the root as well as remote listener and whether
 * the update is blocked to any component that demands it under the tree
 */
exports.DataContext = react_1.default.createContext(null);
/**
 * The data provider provides the app data context with information
 * about the current data being executed down the application
 */
class DataProvider extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.children !== this.props.children ||
            nextProps.value.updateIsBlocked !== this.props.value.updateIsBlocked;
        // root and remote listener are never really going to change, language
        // changes should trigger by the locale context and not by this
    }
    render() {
        return (react_1.default.createElement(exports.DataContext.Provider, { value: this.props.value }, this.props.children));
    }
}
exports.DataProvider = DataProvider;
