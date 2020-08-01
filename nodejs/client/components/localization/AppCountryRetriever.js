"use strict";
/**
 * Simply provides the current country of the application context
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const imported_resources_1 = require("../../../imported-resources");
const locale_provider_1 = require("../../internal/providers/locale-provider");
/**
 * provides the current country and allows to change them
 * @param props the country retriever props
 * @returns a react node
 */
function AppCountryRetriever(props) {
    return (react_1.default.createElement(locale_provider_1.LocaleContext.Consumer, null, (localeContext) => {
        return props.children({
            currentCountry: imported_resources_1.countries[localeContext.country.toUpperCase()] || {
                name: "?",
                native: "?",
                code: "?",
                phone: "?",
                continent: "?",
                capital: "?",
                languages: [],
                emoji: "?",
                emojiU: "?",
                currency: "USD",
                longitude: 0,
                latitude: 0,
            },
            availableCountries: imported_resources_1.arrCountries,
            changeCountryTo: localeContext.updating ? () => null : localeContext.changeCountryTo,
        });
    }));
}
exports.default = AppCountryRetriever;
