"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMode = exports.getCookie = void 0;
function getCookie(splittedCookie, name) {
    const nameEQ = name + "=";
    const foundCookie = splittedCookie.find((cookieValue) => {
        return cookieValue.startsWith(nameEQ);
    });
    if (!foundCookie) {
        return null;
    }
    return foundCookie.substr(nameEQ.length) || null;
}
exports.getCookie = getCookie;
function getMode(appData, req) {
    let defaultMode = process.env.NODE_ENV;
    if (defaultMode !== "development" && defaultMode !== "production") {
        defaultMode = "development";
    }
    const cookies = req.headers["cookie"];
    if (cookies) {
        const splittedCookies = cookies.split(";").map((c) => c.trim());
        const devmode = getCookie(splittedCookies, "devmode");
        const devkey = getCookie(splittedCookies, "devkey");
        if ((devmode === "production" ||
            devkey === appData.sensitiveConfig.devKey) &&
            (devmode === "development" ||
                devmode === "production")) {
            return devmode;
        }
        else {
            return defaultMode;
        }
    }
    else {
        return defaultMode;
    }
}
exports.getMode = getMode;
