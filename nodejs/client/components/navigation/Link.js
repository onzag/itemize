"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
// TODO add analytics
function linkOnClick(props, e) {
    e.stopPropagation();
    if (props.to === location.pathname + location.search) {
        e.preventDefault();
    }
    if (props.onClick) {
        props.onClick(e);
    }
}
function LinkCustomComponent(Tag, props) {
    const { navigate, ...rest } = props;
    return react_1.default.createElement(Tag, Object.assign({}, rest, { onClick: navigate }));
}
/**
 * Same as the router link but actually takes
 * care of the current language set and uses such
 * language if the location is absolute
 * @param props the LinkProps
 */
function Link(props) {
    const locationCur = react_router_dom_1.useLocation();
    const currentLocaleFromURL = locationCur.pathname.split("/")[1] || null;
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
    if (props.as) {
        delete newProps["as"];
        newProps.component = LinkCustomComponent.bind(null, props.as);
    }
    return react_1.default.createElement(react_router_dom_1.Link, Object.assign({}, newProps, { onClick: linkOnClick.bind(null, newProps) }));
}
exports.default = Link;
