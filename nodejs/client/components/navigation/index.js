"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
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
function setHistoryQSState(location, state, replace) {
    const searchParams = new URLSearchParams(location.search);
    let differs = false;
    if (state) {
        Object.keys(state).forEach((key) => {
            if (!differs &&
                state[key] !== searchParams.get(key)) {
                differs = true;
            }
            if (state[key] === null) {
                searchParams.delete(key);
            }
            else {
                searchParams.set(key, state[key]);
            }
        });
    }
    if (!differs) {
        return;
    }
    if (!replace) {
        __1.history.push(location.pathname + "?" + searchParams.toString() + location.hash, location.state);
    }
    else {
        __1.history.replace(location.pathname + "?" + searchParams.toString() + location.hash, location.state);
    }
}
exports.setHistoryQSState = setHistoryQSState;
function redirectTo(newLocation, state, replace) {
    if (replace) {
        __1.history.replace(newLocation, state);
    }
    else {
        __1.history.push(newLocation, state);
    }
}
exports.redirectTo = redirectTo;
function localizedRedirectTo(newLocation, state, replace) {
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
function goBack() {
    __1.history.goBack();
}
exports.goBack = goBack;
