"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
function Redirect(props) {
    const currentLocaleFromURL = location.pathname.split("/")[1] || null;
    if (!currentLocaleFromURL) {
        return null;
    }
    let urlDefined = props.to;
    if (urlDefined !== null && urlDefined[0] !== "/") {
        urlDefined = "/" + urlDefined;
    }
    const urlTo = urlDefined ? `/${currentLocaleFromURL}${urlDefined}` : null;
    const newProps = {
        ...props,
        to: urlTo,
    };
    return react_1.default.createElement(react_router_dom_1.Redirect, Object.assign({}, newProps));
}
exports.default = Redirect;
