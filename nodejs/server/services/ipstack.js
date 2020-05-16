"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const imported_resources_1 = require("../../imported-resources");
const __1 = require("../");
class IPStack {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    requestInfoFor(ip) {
        return new Promise((resolve, reject) => {
            https_1.default.get(`http://api.ipstack.com/${ip}?access_key=${this.apiKey}`, (resp) => {
                // let's get the response from the stream
                let data = "";
                resp.on("data", (chunk) => {
                    data += chunk;
                });
                resp.on("error", (err) => {
                    reject(err);
                });
                resp.on("end", () => {
                    // now that we got the answer, let's use our guess
                    try {
                        const parsedData = JSON.parse(data);
                        resolve(parsedData);
                    }
                    catch (err) {
                        __1.logger.error("IPStack.requestInfoFor: request to the ip stack ip returned invalid data", {
                            errMessage: err.message,
                            errStack: err.stack,
                            ip,
                            data,
                        });
                        reject(err);
                    }
                });
            }).on("error", (err) => {
                __1.logger.error("IPStack.requestInfoFor: https request to ipstack API failed", {
                    errMessage: err.message,
                    errStack: err.stack,
                    ip,
                });
                reject(err);
            });
        });
    }
    async requestUserInfoForIp(ip, fallback) {
        try {
            const standardResponse = await this.requestInfoFor(ip);
            const languageCode = standardResponse.location && standardResponse.location.languages &&
                standardResponse.location.languages[0] && standardResponse.location.languages[0].code;
            return {
                country: standardResponse.country_code,
                currency: imported_resources_1.countries[standardResponse.country_code] ? imported_resources_1.countries[standardResponse.country_code].currency || "EUR" : "EUR",
                language: languageCode ? languageCode : (imported_resources_1.countries[standardResponse.country_code].languages[0] || "en"),
            };
        }
        catch {
            return fallback;
        }
    }
}
exports.IPStack = IPStack;
function setupIPStack(apiKey) {
    return new IPStack(apiKey);
}
exports.setupIPStack = setupIPStack;
