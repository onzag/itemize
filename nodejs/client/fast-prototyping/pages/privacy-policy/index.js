"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const I18nReadMany_1 = __importDefault(require("../../../components/localization/I18nReadMany"));
const TitleSetter_1 = __importDefault(require("../../../components/util/TitleSetter"));
const HTMLResourceLoader_1 = __importDefault(require("../../../components/resources/HTMLResourceLoader"));
function PrivacyPolicy() {
    return (react_1.default.createElement(I18nReadMany_1.default, { data: [
            { id: "privacy_policy", capitalize: true },
            { id: "privacy_policy_url" },
        ] }, (i18nPrivacyPolicy, privacyPolicyURL) => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(TitleSetter_1.default, null, i18nPrivacyPolicy),
            react_1.default.createElement(HTMLResourceLoader_1.default, { src: privacyPolicyURL })));
    }));
}
exports.PrivacyPolicy = PrivacyPolicy;
