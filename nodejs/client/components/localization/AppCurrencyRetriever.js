"use strict";
/**
 * Simply provides the current currency
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const imported_resources_1 = require("../../../imported-resources");
const app_1 = require("../../internal/app");
/**
 * Provides the current currency in the application context and allows
 * it to be changed by a new one from the available list it also provides
 * @param props the props
 * @returns a react node
 */
function AppCurrencyRetriever(props) {
    return (react_1.default.createElement(app_1.LocaleContext.Consumer, null, (localeContext) => {
        return props.children({
            currentCurrency: imported_resources_1.currencies[localeContext.currency.toUpperCase()],
            availableCurrencies: imported_resources_1.arrCurrencies,
            changeCurrencyTo: localeContext.updating ? () => null : localeContext.changeCurrencyTo,
        });
    }));
}
exports.default = AppCurrencyRetriever;
