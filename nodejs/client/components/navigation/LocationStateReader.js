"use strict";
/**
 * This file contains the location state reader which reads a pseudo state
 * obtained via the browser history api or the query string
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const react_router_dom_1 = require("react-router-dom");
/**
 * The location state reader component
 * @param props the props
 * @returns a react component
 */
function LocationStateReader(props) {
    // so if we are in our query string
    if (props.stateIsInQueryString) {
        // we need to parse that query string
        const searchParams = new URLSearchParams(props.location.search);
        // now we can get the value
        const statefulValue = {};
        // and add the default props if they are missing or otherwise read from the search params
        Object.keys(props.defaultState).forEach((key) => {
            statefulValue[key] = searchParams.has(key) ? searchParams.get(key) : props.defaultState[key];
        });
        // and call from here, note how we use the setHistoryQSState function here
        return props.children(statefulValue, _1.setHistoryQSState.bind(null, props.location));
    }
    else {
        // if there's no state
        if (!props.location.state) {
            // we just return the default state
            return props.children(props.defaultState, _1.setHistoryState.bind(null, props.location));
        }
        // otherwise equally we merge the states
        const statefulValue = {};
        Object.keys(props.defaultState).forEach((key) => {
            statefulValue[key] = typeof props.location.state[key] !== "undefined" ? props.location.state[key] : props.defaultState[key];
        });
        // and call it
        return props.children(statefulValue, _1.setHistoryState.bind(null, props.location));
    }
}
// buggy typescript forces me to do it this way
function FakeLocationStateReader(props) {
    return null;
}
exports.default = react_router_dom_1.withRouter(LocationStateReader);
