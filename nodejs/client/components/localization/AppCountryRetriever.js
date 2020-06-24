"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const imported_resources_1 = require("../../../imported-resources");
const app_1 = require("../../internal/app");
function AppCountryRetriever(props) {
    return (react_1.default.createElement(app_1.LocaleContext.Consumer, null, (localeContext) => {
        return props.children({
            currentCountry: imported_resources_1.countries[localeContext.country.toUpperCase()],
            availableCountries: imported_resources_1.arrCountries,
            changeCountryTo: localeContext.updating ? () => null : localeContext.changeCountryTo,
        });
    }));
}
exports.default = AppCountryRetriever;