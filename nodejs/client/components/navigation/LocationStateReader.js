"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const react_router_dom_1 = require("react-router-dom");
function LocationStateReader(props) {
    if (props.stateIsInQueryString) {
        const searchParams = new URLSearchParams(props.location.search);
        const statefulValue = {};
        Object.keys(props.defaultState).forEach((key) => {
            statefulValue[key] = searchParams.has(key) ? searchParams.get(key) : props.defaultState[key];
        });
        return props.children(statefulValue, _1.setHistoryQSState.bind(null, props.location));
    }
    else {
        if (!props.location.state) {
            return props.children(props.defaultState, _1.setHistoryState.bind(null, props.location));
        }
        const statefulValue = {};
        Object.keys(props.defaultState).forEach((key) => {
            statefulValue[key] = typeof props.location.state[key] !== "undefined" ? props.location.state[key] : props.defaultState[key];
        });
        return props.children(statefulValue, _1.setHistoryState.bind(null, props.location));
    }
}
// buggy typescript forces me to do it this way
function FakeLocationStateReader(props) {
    return null;
}
exports.default = react_router_dom_1.withRouter(LocationStateReader);
