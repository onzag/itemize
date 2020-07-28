"use strict";
/**
 * Constains the redirect component which basically does a 302 redirect
 * but on the client side and as part of the DOM (kinda)
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
/**
 * The redirect component, localized in order to take advantage
 * of the itemize app context
 * @param props the props
 * @returns a react component
 */
function Redirect(props) {
    // first we extract the locale
    const currentLocaleFromURL = location.pathname.split("/")[1] || null;
    if (!currentLocaleFromURL) {
        return null;
    }
    // and then build the url, adding a trailing slash if missing
    let urlDefined = props.to;
    if (urlDefined !== null && urlDefined[0] !== "/") {
        urlDefined = "/" + urlDefined;
    }
    // then creting it
    const urlTo = urlDefined ? `/${currentLocaleFromURL}${urlDefined}` : null;
    // and making the new props
    const newProps = {
        ...props,
        to: urlTo,
    };
    // returning the redirect
    return react_1.default.createElement(react_router_dom_1.Redirect, Object.assign({}, newProps));
}
exports.default = Redirect;
