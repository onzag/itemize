"use strict";
/**
 * Provides the route which is able to create routes that will work
 * under any language
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
 * Same as the router from react router but takes care of the language
 * and considers the root to be the language source
 * @param props the RouterProps
 */
function Route(props) {
    // first we check and add the trailing slash if missing
    let newPathAttr;
    if (Array.isArray(props.path)) {
        newPathAttr = props.path.map((urlD) => {
            if (urlD[0] !== "/") {
                return "/:__lang/" + urlD;
            }
            return "/:__lang" + urlD;
        });
    }
    else {
        if (props.path[0] !== "/") {
            newPathAttr = "/:__lang/" + props.path;
        }
        else {
            newPathAttr = "/:__lang" + props.path;
        }
    }
    // and then we build the route on it, note the path
    // we use __lang as the param, unlikely to use
    // in any circumstance, the lang is diresgarded, as well
    // use the AppLanguageRetriever instead to get the language
    // there might be delays and the url is not always accurate
    return react_1.default.createElement(react_router_dom_1.Route, Object.assign({}, props, { path: newPathAttr }));
}
exports.default = Route;
