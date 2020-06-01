"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const I18nReadMany_1 = __importDefault(require("../../../components/localization/I18nReadMany"));
const TitleSetter_1 = __importDefault(require("../../../components/util/TitleSetter"));
const HTMLResourceLoader_1 = __importDefault(require("../../../components/resources/HTMLResourceLoader"));
function Contact() {
    return (react_1.default.createElement(I18nReadMany_1.default, { data: [
            { id: "contact", capitalize: true },
            { id: "contact_url" },
        ] }, (i18nContact, i18nContactURL) => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(TitleSetter_1.default, null, i18nContact),
            react_1.default.createElement(HTMLResourceLoader_1.default, { src: i18nContactURL })));
    }));
}
exports.Contact = Contact;
