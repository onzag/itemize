"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCurrencyLayer = exports.CurrencyLayer = void 0;
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const __1 = require("../");
const constants_1 = require("../../constants");
class CurrencyLayer {
    constructor(apiKey, globalCache, httpsEnabled) {
        this.apiKey = apiKey;
        this.httpsEnabled = httpsEnabled;
        this.globalCache = globalCache;
    }
    requestInfo() {
        return new Promise((resolve, reject) => {
            this.globalCache.get(constants_1.CACHED_CURRENCY_LAYER_RESPONSE, (err, cachedData) => {
                const parsedCachedData = cachedData && !err && JSON.parse(cachedData);
                if (!parsedCachedData || (new Date()).getTime() - (parsedCachedData.timestamp * 1000) >= 86400000) {
                    __1.logger.info("CurrencyLayer.requestInfo: requesting fresh info");
                    (this.httpsEnabled ? https_1.default : http_1.default).get(`http://api.currencylayer.com/live?access_key=${this.apiKey}`, (resp) => {
                        // let's get the response from the stream
                        let data = "";
                        resp.on("data", (chunk) => {
                            data += chunk;
                        });
                        resp.on("error", (err) => {
                            __1.logger.error("CurrencyLayer.requestInfo: request to the ip stack ip returned error", {
                                errMessage: err.message,
                                errStack: err.stack,
                            });
                            reject(err);
                        });
                        resp.on("end", () => {
                            // now that we got the answer, let's use our guess
                            try {
                                const parsedData = JSON.parse(data);
                                if (parsedData.error) {
                                    __1.logger.error("CurrencyLayer.requestInfo: CurrencyLayer provided a custom error", {
                                        errMessage: parsedData.error,
                                        data,
                                    });
                                    reject(new Error(parsedData.error));
                                }
                                else {
                                    this.globalCache.set(constants_1.CACHED_CURRENCY_LAYER_RESPONSE, data);
                                    resolve(parsedData);
                                }
                            }
                            catch (err) {
                                __1.logger.error("CurrencyLayer.requestInfo: request currency layer returned invalid data", {
                                    errMessage: err.message,
                                    errStack: err.stack,
                                    data,
                                });
                                reject(err);
                            }
                        });
                    }).on("error", (err) => {
                        __1.logger.error("CurrencyLayer.requestInfo: https request to CurrencyLayer API failed", {
                            errMessage: err.message,
                            errStack: err.stack,
                        });
                        reject(err);
                    });
                }
                else {
                    __1.logger.info("CurrencyLayer.requestInfo: reusing an existant value");
                    resolve(parsedCachedData);
                }
            });
        });
    }
    async requestCurrencyFactors() {
        const infoFromServer = await this.requestInfo();
        const converted = {};
        Object.keys(infoFromServer.quotes).forEach((quoteName) => {
            converted[quoteName.substr(3)] = 1 / infoFromServer.quotes[quoteName];
        });
        return converted;
    }
}
exports.CurrencyLayer = CurrencyLayer;
function setupCurrencyLayer(apiKey, globalCache, httpsEnabled) {
    return new CurrencyLayer(apiKey, globalCache, httpsEnabled);
}
exports.setupCurrencyLayer = setupCurrencyLayer;
