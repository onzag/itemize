"use strict";
/**
 * Simply provides the current language
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const locale_provider_1 = require("../../internal/providers/locale-provider");
/**
 * Allows to read the current language as well as to change it from
 * the list of available languages that it can change, it also provides
 * the rtl property for right to left languages
 * @param props the props
 * @returns a react node
 */
function AppLanguageRetriever(props) {
    return (react_1.default.createElement(locale_provider_1.LocaleContext.Consumer, null, (localeContext) => {
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
