"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const location_context_1 = require("../../internal/providers/location-context");
const _1 = require(".");
function LocationStateReader(props) {
    return (react_1.default.createElement(location_context_1.LocationStateContext.Consumer, null, (location) => {
        if (props.stateIsInQueryString) {
            const searchParams = new URLSearchParams(location.search);
            const statefulValue = {};
            Object.keys(props.defaultState).forEach((key) => {
                statefulValue[key] = searchParams.has(key) ? searchParams.get(key) : props.defaultState[key];
            });
            return props.children(statefulValue, _1.setHistoryQSState.bind(null, location));
        }
        else {
            if (!location.state) {
                return props.children(props.defaultState, _1.setHistoryState.bind(null, location));
            }
            const statefulValue = {};
            Object.keys(props.defaultState).forEach((key) => {
                statefulValue[key] = typeof location.state[key] !== "undefined" ? location.state[key] : props.defaultState[key];
            });
            return props.children(statefulValue, _1.setHistoryState.bind(null, location));
        }
    }));
}
exports.default = LocationStateReader;
