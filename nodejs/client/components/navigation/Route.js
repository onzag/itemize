"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
/**
 * Same as the router from react router but takes care of the language
 * and considers the root to be the language source
 * @param props the RouterProps
 */
function Route(props) {
    let urlDefined = props.path;
    if (urlDefined[0] !== "/") {
        urlDefined = "/" + urlDefined;
    }
    return react_1.default.createElement(react_router_dom_1.Route, Object.assign({}, props, { path: `/:__lang${urlDefined}` }));
}
exports.default = Route;
