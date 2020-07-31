"use strict";
/**
 * A fast prototyping component for the contact information
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const I18nReadMany_1 = __importDefault(require("../../../components/localization/I18nReadMany"));
const TitleSetter_1 = __importDefault(require("../../../components/util/TitleSetter"));
const HTMLResourceLoader_1 = __importDefault(require("../../../components/resources/HTMLResourceLoader"));
/**
 * The contact fast prototyping page
 * @param props the props for the contact
 * @returns a react element
 */
function Contact(props) {
    return (react_1.default.createElement(I18nReadMany_1.default, { data: [
            { id: props.titleI18nId || "contact", capitalize: true },
            { id: props.urlI18nId || "contact_url" },
        ] }, (i18nContact, i18nContactURL) => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(TitleSetter_1.default, null, i18nContact),
            react_1.default.createElement(HTMLResourceLoader_1.default, { src: i18nContactURL })));
    }));
}
exports.Contact = Contact;
/**
 * allows to inject props to the contact
 * @param props the props to inject
 * @returns an unitialized react component
 */
function contactWithProps(props) {
    return () => {
        react_1.default.createElement(Contact, Object.assign({}, props));
    };
}
exports.contactWithProps = contactWithProps;
