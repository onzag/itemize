"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read_1 = require("../read");
const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function genToken(length) {
    var result = "";
    for (var i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    ;
    return result;
}
async function sensitiveConfigSetup(version, currentConfig, referenceConfig) {
    const newConfig = await read_1.configRequest(currentConfig || referenceConfig, "Sensitive configuration (" + version + ")", [
        {
            variableName: "ipStackAccessKey",
            message: "An ip stack access key, get one at https://ipstack.com/product." +
                "It is required if you want to be able to guess the user location and language otherwise" +
                "Fallbacks are used",
            defaultValue: "",
            hidden: true,
        },
        {
            variableName: "hereAppID",
            message: "Used in order to be able to type addresses and get locations get the ID and code at https://developer.here.com/",
            defaultValue: "",
            hidden: true,
        },
        {
            variableName: "hereAppCode",
            message: "Used in order to be able to type addresses and get locations get the ID and code at https://developer.here.com/",
            defaultValue: "",
            hidden: true,
        },
        {
            variableName: "jwtKey",
            message: "a JSON web token key used for key validation and token generation, leave blank to autogenerate one if not filled",
            defaultValue: "",
            hidden: true,
        },
    ]);
    if (!newConfig.jwtKey) {
        newConfig.jwtKey = genToken(64);
    }
    return newConfig;
}
exports.sensitiveConfigSetup = sensitiveConfigSetup;
