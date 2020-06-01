"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const app_1 = require("../../internal/app");
function AppLanguageRetriever(props) {
    return (react_1.default.createElement(app_1.LocaleContext.Consumer, null, (localeContext) => {
        const currentLanguage = {
            code: localeContext.language,
            name: localeContext.langLocales[localeContext.language].name,
        };
        const availableLanguages = [];
        Object.keys(localeContext.langLocales).forEach((code) => {
            availableLanguages.push({
                code,
                name: localeContext.langLocales[code].name,
            });
        });
        return props.children({
            currentLanguage,
            availableLanguages,
            rtl: localeContext.rtl,
            changeLanguageTo: localeContext.updating ? () => null : localeContext.changeLanguageTo,
        });
    }));
}
exports.default = AppLanguageRetriever;
