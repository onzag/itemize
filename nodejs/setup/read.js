"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const read_1 = __importDefault(require("read"));
const colors_1 = __importDefault(require("colors"));
const prompt_confirm_1 = __importDefault(require("prompt-confirm"));
function request(options) {
    return new Promise((resolve, reject) => {
        read_1.default(options, (error, result, isDefault) => {
            if (error) {
                reject(error);
            }
            else {
                resolve({
                    result,
                    isDefault,
                });
            }
        });
    });
}
exports.request = request;
async function fieldRequest(type, message, variableName, basedOnValue, defaultValue, hidden, validate, nullifyFalseValues) {
    let wasLastValid = true;
    let currentValue = basedOnValue;
    if (message) {
        console.log("\n" + message);
    }
    if (type === "strobject") {
        const keys = await fieldRequest("strarray", null, variableName + "[$key]", basedOnValue ? Object.keys(basedOnValue) : null, Object.keys(defaultValue));
        const finalValue = {};
        for (const key of keys) {
            finalValue[key] = await fieldRequest("string", null, variableName + "[" + JSON.stringify(key) + "]", basedOnValue ? basedOnValue[key] : null, defaultValue ? defaultValue[key] : "", hidden);
        }
        return finalValue || null;
    }
    do {
        if (!wasLastValid) {
            if (!hidden) {
                console.log(JSON.stringify(currentValue) + colors_1.default.red(" is deemed invalid"));
            }
            else {
                console.log(colors_1.default.red("value is deemed invalid"));
            }
        }
        wasLastValid = false;
        const actualDefaultValue = Array.isArray(defaultValue) ? defaultValue.join(", ") : (defaultValue || "").toString();
        const retrievedValue = await request({
            prompt: variableName + ": ",
            default: (basedOnValue || actualDefaultValue).toString(),
            edit: !!basedOnValue,
            silent: hidden,
            replace: "*",
        });
        if (type === "integer") {
            currentValue = parseInt(retrievedValue.result);
        }
        else if (type === "strarray") {
            currentValue = retrievedValue.result.split(",").map(v => v.trim()).filter(v => !!v);
        }
        else {
            currentValue = retrievedValue.result;
        }
    } while (validate ? !validate(currentValue) : false);
    if (nullifyFalseValues && !currentValue) {
        return currentValue || null;
    }
    return currentValue;
}
exports.fieldRequest = fieldRequest;
;
async function configRequest(srcConfig, message, extractData, variableNamePrefix = "") {
    console.log(colors_1.default.bgGreen("\nENTER:") + " " + message);
    const newConfig = {
        ...srcConfig,
    };
    for (const extractPoint of extractData) {
        if (extractPoint.type === "config") {
            newConfig[extractPoint.variableName] = await configRequest(newConfig[extractPoint.variableName], extractPoint.message, extractPoint.extractData, extractPoint.variableName + ".");
        }
        else {
            newConfig[extractPoint.variableName] = await fieldRequest(extractPoint.type || "string", extractPoint.message, variableNamePrefix + extractPoint.variableName, newConfig[extractPoint.variableName], extractPoint.defaultValue, extractPoint.hidden, (value) => extractPoint.validate ? extractPoint.validate(value, newConfig) : true, extractPoint.nullifyFalseValues);
        }
    }
    console.log(colors_1.default.bgGreen("\nEXIT:") + " " + message);
    return newConfig;
}
exports.configRequest = configRequest;
function confirm(question) {
    return (new prompt_confirm_1.default(question)).run();
}
exports.confirm = confirm;
