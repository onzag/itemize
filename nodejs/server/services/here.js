"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const v5_1 = __importDefault(require("uuid/v5"));
const __1 = require("../");
// this id can be whatever just to ensure lat and long produce the same id no matter what
// basically a combination for location, this way we are not tied to any API
const NAMESPACE = "d27dba52-42ef-4649-81d2-568f9ba341ff";
function makeIdOutOf(lat, lng) {
    return "L" + v5_1.default(lat.toString() + lng.toString(), NAMESPACE).replace(/-/g, "");
}
// converts a suggestion to our lovely location type
function processHereResult(wordSeparator, suggestion, overwriteTxt) {
    return {
        lat: suggestion.position[0],
        lng: suggestion.position[1],
        txt: overwriteTxt || suggestion.title,
        id: makeIdOutOf(suggestion.position[0], suggestion.position[1]),
        // NOTE adding tf=plain makes plain text results, but this works pretty well
        atxt: suggestion.vicinity ? suggestion.vicinity.replace(/\<br\/\>/g, wordSeparator + " ") : null,
    };
}
class Here {
    constructor(appId, appCode) {
        this.appId = appId;
        this.appCode = appCode;
    }
    requestGeocodeFor(lat, lng, query, lang, sep) {
        const hostname = "places.cit.api.here.com";
        const path = "/places/v1/discover/here";
        const qs = `?at=${lat},${lng}&cat=none&app_id=${this.appId}&app_code=${this.appCode}`;
        const pathwithqs = path + qs;
        const latp = typeof lat === "number" ? lat : parseFloat(lat);
        const lngp = typeof lng === "number" ? lng : parseFloat(lng);
        const standardResponse = {
            txt: query ? query : "???",
            atxt: "???",
            lat: latp,
            lng: lngp,
            id: makeIdOutOf(latp, lngp),
        };
        return new Promise((resolve, reject) => {
            https_1.default.get({
                hostname,
                path: pathwithqs,
                headers: {
                    "Accept-Language": `${lang}, en-US;q=0.9, en;q=0.9, es-419;q=0.8, es;q=0.7`,
                },
            }, (resp) => {
                // let's get the response from the stream
                let data = "";
                resp.on("data", (chunk) => {
                    data += chunk;
                });
                resp.on("error", (err) => {
                    __1.logger.error("Here.requestGeocodeFor [SERIOUS]: here response cancelled", {
                        errMessage: err.message,
                        errStack: err.stack,
                        data,
                        lat,
                        lng,
                        query,
                        lang,
                        sep,
                    });
                    resolve(standardResponse);
                });
                resp.on("end", () => {
                    // now that we got the answer, let's use our guess
                    try {
                        const parsedData = JSON.parse(data);
                        const address = parsedData.search.context.location.address;
                        const addressText = address && address.text ? address.text.replace(/\<br\/\>/g, sep + " ") : "???";
                        resolve({
                            ...standardResponse,
                            atxt: addressText,
                            txt: query ? query : addressText,
                        });
                    }
                    catch (err) {
                        __1.logger.error("Here.requestGeocodeFor [SERIOUS]: here replied with invalid data or with error message", {
                            errMessage: err.message,
                            errStack: err.stack,
                            data,
                            lat,
                            lng,
                            query,
                            lang,
                            sep,
                        });
                        resolve(standardResponse);
                    }
                });
            }).on("error", (err) => {
                __1.logger.error("Here.requestGeocodeFor [SERIOUS]: https request to here API failed", {
                    errMessage: err.message,
                    errStack: err.stack,
                    lat,
                    lng,
                    query,
                    lang,
                    sep,
                });
                resolve(standardResponse);
            });
        });
    }
    requestSearchFor(lat, lng, query, lang, sep) {
        const hostname = "places.cit.api.here.com";
        const path = "/places/v1/discover/search";
        const qs = `?at=${lat},${lng}&q=${encodeURIComponent(query)}&app_id=${this.appId}&app_code=${this.appCode}`;
        const pathwithqs = path + qs;
        return new Promise((resolve, reject) => {
            https_1.default.get({
                hostname,
                path: pathwithqs,
                headers: {
                    "Accept-Language": `${lang}, en-US;q=0.9, en;q=0.9, es-419;q=0.8, es;q=0.7`,
                },
            }, (resp) => {
                // let's get the response from the stream
                let data = "";
                resp.on("data", (chunk) => {
                    data += chunk;
                });
                resp.on("error", (err) => {
                    __1.logger.error("Here.requestSearchFor [SERIOUS]: here response cancelled", {
                        errMessage: err.message,
                        errStack: err.stack,
                        data,
                        lat,
                        lng,
                        query,
                        lang,
                        sep,
                    });
                    resolve([]);
                });
                resp.on("end", () => {
                    // now that we got the answer, let's use our guess
                    try {
                        const parsedData = JSON.parse(data);
                        parsedData.results.items = parsedData.results.items
                            .filter((r) => r.position)
                            .filter((r, index, arr) => {
                            return arr.findIndex((r2) => r.position[0] === r2.position[0] && r.position[1] === r2.position[1]) === index;
                        });
                        resolve(parsedData.results.items.map((r) => processHereResult(sep, r, query)));
                    }
                    catch (err) {
                        __1.logger.error("Here.requestSearchFor [SERIOUS]: here replied with invalid data or with error message", {
                            errMessage: err.message,
                            errStack: err.stack,
                            data,
                            lat,
                            lng,
                            query,
                            lang,
                            sep,
                        });
                        resolve([]);
                    }
                });
            }).on("error", (err) => {
                __1.logger.error("Here.requestSearchFor [SERIOUS]: https request to here API failed", {
                    errMessage: err.message,
                    errStack: err.stack,
                    lat,
                    lng,
                    query,
                    lang,
                    sep,
                });
                resolve([]);
            });
        });
    }
    requestAutocompleteFor(lat, lng, query, lang, sep) {
        const hostname = "places.cit.api.here.com";
        const path = "/places/v1/autosuggest";
        const qs = `?at=${lat},${lng}&q=${encodeURIComponent(query)}&app_id=${this.appId}&app_code=${this.appCode}&size=6`;
        const pathwithqs = path + qs;
        return new Promise((resolve, reject) => {
            https_1.default.get({
                hostname,
                path: pathwithqs,
                headers: {
                    "Accept-Language": `${lang}, en-US;q=0.9, en;q=0.9, es-419;q=0.8, es;q=0.7`,
                },
            }, (resp) => {
                // let's get the response from the stream
                let data = "";
                resp.on("data", (chunk) => {
                    data += chunk;
                });
                resp.on("error", (err) => {
                    __1.logger.error("Here.requestAutocompleteFor [SERIOUS]: here response cancelled", {
                        errMessage: err.message,
                        errStack: err.stack,
                        data,
                        lat,
                        lng,
                        query,
                        lang,
                        sep,
                    });
                    resolve([]);
                });
                resp.on("end", () => {
                    // now that we got the answer, let's use our guess
                    try {
                        const parsedData = JSON.parse(data);
                        parsedData.results = parsedData.results.filter((s) => s.position);
                        resolve(parsedData.results.map((r) => processHereResult(sep, r)));
                    }
                    catch (err) {
                        __1.logger.error("Here.requestAutocompleteFor [SERIOUS]: here replied with invalid data or with error message", {
                            errMessage: err.message,
                            errStack: err.stack,
                            data,
                            lat,
                            lng,
                            query,
                            lang,
                            sep,
                        });
                        resolve([]);
                    }
                });
            }).on("error", (err) => {
                __1.logger.error("Here.requestSearchFor [SERIOUS]: https request to here API failed", {
                    errMessage: err.message,
                    errStack: err.stack,
                    lat,
                    lng,
                    query,
                    lang,
                    sep,
                });
                resolve([]);
            });
        });
    }
}
exports.Here = Here;
function setupHere(appId, appCode) {
    return new Here(appId, appCode);
}
exports.setupHere = setupHere;
