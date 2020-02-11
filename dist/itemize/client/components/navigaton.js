"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const internal_providers_1 = require("../internal/app/internal-providers");
const __1 = require("..");
function setHistoryState(location, state, replace) {
    const newState = { ...location.state };
    if (state) {
        Object.keys(state).forEach((key) => {
            newState[key] = state[key];
        });
    }
    if (Object.is(newState, location.state)) {
        return;
    }
    if (!replace) {
        __1.history.push(location.pathname + location.search + location.hash, newState);
    }
    else {
        __1.history.replace(location.pathname + location.search + location.hash, newState);
    }
}
exports.setHistoryState = setHistoryState;
function redirectTo(newLocation, state) {
    __1.history.push(newLocation, state);
}
exports.redirectTo = redirectTo;
function localizedRedirectTo(newLocation, state) {
    const currentLocaleFromURL = location.pathname.split("/")[1] || null;
    if (!currentLocaleFromURL) {
        return null;
    }
    let urlDefined = newLocation;
    if (urlDefined[0] !== "/") {
        urlDefined = "/" + urlDefined;
    }
    const urlTo = `/${currentLocaleFromURL}${urlDefined}`;
    return redirectTo(urlTo, state);
}
exports.localizedRedirectTo = localizedRedirectTo;
// TODO add analytics
function linkOnClick(props, e) {
    if (props.to === location.pathname + location.search) {
        e.preventDefault();
    }
    if (props.onClick) {
        props.onClick(e);
    }
}
/**
 * Same as the router link but actually takes
 * care of the current language set and uses such
 * language if the location is absolute
 * @param props the LinkProps
 */
function Link(props) {
    const currentLocaleFromURL = location.pathname.split("/")[1] || null;
    if (!currentLocaleFromURL) {
        return null;
    }
    let urlDefined = props.to;
    if (urlDefined[0] !== "/") {
        urlDefined = "/" + urlDefined;
    }
    const urlTo = `/${currentLocaleFromURL}${urlDefined}`;
    const newProps = {
        ...props,
        to: urlTo,
    };
    return <react_router_dom_1.Link {...newProps} onClick={linkOnClick.bind(null, newProps)}/>;
}
exports.Link = Link;
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
    return <react_router_dom_1.Route {...props} path={`/:__lang${urlDefined}`}/>;
}
exports.Route = Route;
function LocationStateReader(props) {
    return (<internal_providers_1.LocationStateContext.Consumer>
      {(value) => {
        if (!value.state) {
            const valueWithState = {
                ...value,
                state: {},
            };
            return props.children(valueWithState, setHistoryState.bind(null, valueWithState));
        }
        return props.children(value, setHistoryState.bind(null, value));
    }}
    </internal_providers_1.LocationStateContext.Consumer>);
}
exports.LocationStateReader = LocationStateReader;
