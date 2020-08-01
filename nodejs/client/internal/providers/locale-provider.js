"use strict";
/**
 * Contains the locale provider that provides locale information
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
/**
 * The locale context provides the locale information down all the way
 * to any component that demands it
 */
exports.LocaleContext = react_1.default.createContext(null);
/**
 * The locale provider creates a context that serves the locale information
 * down the components
 */
class LocaleProvider extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.children !== this.props.children ||
            nextProps.value.country !== this.props.value.country ||
            nextProps.value.currency !== this.props.value.currency ||
            nextProps.value.currencyFactors !== this.props.value.currencyFactors ||
            nextProps.value.rtl !== this.props.value.rtl ||
            nextProps.value.updating !== this.props.value.updating ||
            !deep_equal_1.default(nextProps.value.i18n, this.props.value.i18n);
    }
    render() {
        return (react_1.default.createElement(exports.LocaleContext.Provider, { value: this.props.value }, this.props.children));
    }
}
exports.LocaleProvider = LocaleProvider;
