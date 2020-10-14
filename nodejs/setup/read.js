"use strict";
/**
 * Constains function to read information from the console in order to be used
 * during the setup process
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirm = exports.configRequest = exports.fieldRequest = exports.request = void 0;
const read_1 = __importDefault(require("read"));
const colors_1 = __importDefault(require("colors"));
// @ts-nocheck
const prompt_confirm_1 = __importDefault(require("prompt-confirm"));
/**
 * requests a single value
 * @param options the read options
 */
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
/**
 * This function allows us to request one of the field types
 * @param type the type we are requesting
 * @param message the message we want to show
 * @param variableName the variable name we are setting
 * @param basedOnValue basically a previously assigned value we want to modify for this
 * @param defaultValue the default value for this
 * @param hidden whether we shouldn't display the characters for it to avoid logs
 * @param validate a function to validate the value
 * @param nullifyFalseValues whether we should make values that don't pass the if (value) check, null, basically empty string and 0
 * @returns the value it was read
 */
async function fieldRequest(type, message, variableName, basedOnValue, defaultValue, hidden, validate, nullifyFalseValues) {
    // so we show the message if we have one
    if (message) {
        console.log("\n" + message);
    }
    // so first we have this variable to specify
    // if the last value we used was invalid
    let wasLastAttemptValid = true;
    // our current value is the value we are basing ourselves into
    // it's not the default, the default it's the default, the based on
    // is basically a previously assigned value to this field
    let currentValue = basedOnValue;
    do {
        if (!wasLastAttemptValid) {
            if (!hidden) {
                console.log(JSON.stringify(currentValue) + colors_1.default.red(" is deemed invalid"));
            }
            else {
                console.log(colors_1.default.red("value is deemed invalid"));
            }
        }
        wasLastAttemptValid = false;
        // for integer
        if (type === "integer") {
            // we ask for
            const retrievedValue = await request({
                // the variable name and :
                prompt: variableName + ": ",
                // the default is what is based on, or otherwise the default, or otherwise nothing
                default: (basedOnValue || defaultValue || "").toString(),
                // we are editing, rather than writting a new value if we have a based on value
                edit: typeof basedOnValue !== "undefined" && basedOnValue !== null,
                // silent if it's hidden
                silent: hidden,
                // and we use asterisk
                replace: "*",
            });
            // but we need to parse the int, this might be nan, hence the validate function
            currentValue = parseInt(retrievedValue.result);
        }
        else if (type === "boolean") {
            // we ask for
            const retrievedValue = await request({
                // the variable name and :
                prompt: variableName + ": ",
                // we cast to boolean and stringify
                default: JSON.stringify(!!defaultValue),
                // we are editing, rather than writting a new value if we have a based on value
                edit: typeof basedOnValue !== "undefined" && basedOnValue !== null,
                // silent if it's hidden
                silent: hidden,
                // and we use asterisk
                replace: "*",
            });
            // but we need to parse the boolean
            try {
                currentValue = JSON.parse(retrievedValue.result);
            }
            catch (err) {
                currentValue = false;
            }
        }
        else if (type === "strarray") {
            // str array uses a comma separated list
            const actualDefaultValue = Array.isArray(defaultValue) ? defaultValue.join(", ") : (defaultValue || "").toString();
            // and we ask similarly to before
            const retrievedValue = await request({
                prompt: variableName + ": ",
                default: (basedOnValue || actualDefaultValue).toString(),
                edit: !!basedOnValue,
                silent: hidden,
                replace: "*",
            });
            currentValue = retrievedValue.result.split(",").map(v => v.trim()).filter(v => !!v);
            // so for str object one of the most complex
        }
        else if (type === "strobject") {
            // first we need the keys we ask for an array of string, by comma separating these values
            const keys = await fieldRequest("strarray", 
            // no message
            null, 
            // we want to show the variable name plus the key as what we are setting
            variableName + "[$key]", 
            // and the values we based on if we have one is the keys of the previous value
            basedOnValue ? Object.keys(basedOnValue) : null, 
            // and the keys of the default value
            defaultValue ? Object.keys(defaultValue) : []);
            // so now we can rebuild this value
            const finalValue = {};
            // for ever key we got of all those keys
            for (const key of keys) {
                // now we can request a simple string
                finalValue[key] = await fieldRequest("string", 
                // no message
                null, 
                // for that specific key
                variableName + "[" + JSON.stringify(key) + "]", 
                // the value we based ourselves upon
                basedOnValue ? basedOnValue[key] : null, 
                // and our default value
                defaultValue ? defaultValue[key] : "", 
                // and whether these values are hidden
                hidden);
            }
            currentValue = finalValue;
        }
        else {
            // and this is for simple strings
            const retrievedValue = await request({
                prompt: variableName + ": ",
                default: (basedOnValue || defaultValue || "").toString(),
                edit: !!basedOnValue,
                silent: hidden,
                replace: "*",
            });
            currentValue = retrievedValue.result;
        }
    } while (validate ? !validate(currentValue) : false);
    // we run the validate function until it passes
    // if we nullify false values
    if (nullifyFalseValues && !currentValue) {
        return null;
    }
    // otherwise we give the current value
    return currentValue;
}
exports.fieldRequest = fieldRequest;
;
/**
 * Performs a config request for entry an entire config
 * @param srcConfig the source configuration
 * @param message the message to show
 * @param extractData the ata to extract
 * @param variableNamePrefix a prefix to prefix all variable names
 */
async function configRequest(srcConfig, message, extractData, variableNamePrefix = "") {
    console.log(colors_1.default.bgGreen("\nENTER:") + " " + message);
    // so we first use our source to build this new config
    const newConfig = {
        ...srcConfig,
    };
    // and now we loop in our extract points of each data
    // that each represent a variable inside this config
    for (const extractPoint of extractData) {
        // so if it's a config type
        if (extractPoint.type === "config") {
            // we just set the variable to a new config request
            newConfig[extractPoint.variableName] = await configRequest(
            // the source value is the value inside this newConfig if there's one
            typeof newConfig[extractPoint.variableName] !== "undefined" ? newConfig[extractPoint.variableName] : null, 
            // the message
            extractPoint.message, 
            // the data we are extracting for
            extractPoint.extractData, 
            // and we prefix with the current prefix plus the variable name and a dot
            variableNamePrefix + extractPoint.variableName + ".");
            // now for multiconfig or the keys of config or multiconfig
        }
        else if (extractPoint.type === "multiconfig") {
            // if we don't have a current value
            if (!newConfig[extractPoint.variableName]) {
                // then the default will be nothing
                newConfig[extractPoint.variableName] = {};
            }
            // first we need to ask for a strarray for our multiconfig
            // keys
            const keys = await fieldRequest("strarray", 
            // no message as we should have already shown one on top
            null, 
            // the variable name as usual with the $key to say these are keys
            variableNamePrefix + extractPoint.variableName + "." + "[$key]", 
            // our based on value is our current value
            Object.keys(newConfig[extractPoint.variableName]), 
            // as well as our default
            Object.keys(newConfig[extractPoint.variableName]));
            // now for every key we have added in these key list
            for (const key of keys) {
                // we make a config request each
                newConfig[extractPoint.variableName][key] = await configRequest(
                // as you can see the source is what is inside of it right now
                typeof newConfig[extractPoint.variableName][key] !== "undefined" ? newConfig[extractPoint.variableName][key] : null, 
                // the message
                extractPoint.message, 
                // the data we are supposed to extract for each one of these
                extractPoint.extractData, 
                // and a nice prefix
                variableNamePrefix + extractPoint.variableName + "." + key + ".");
            }
        }
        else {
            // otherwise it's a normal standard field
            newConfig[extractPoint.variableName] = await fieldRequest(
            // so if no type, it will be string
            extractPoint.type || "string", 
            // the message we are using
            extractPoint.message, 
            // the variable name thing
            variableNamePrefix + extractPoint.variableName, 
            // and what value we are based on
            newConfig[extractPoint.variableName], 
            // our default value
            extractPoint.defaultValue, 
            // whether it's hidden
            extractPoint.hidden, 
            // the validate function which passes what we have already collected
            (value) => extractPoint.validate ? extractPoint.validate(value, newConfig) : true, 
            // and the option to nullify
            extractPoint.nullifyFalseValues);
        }
    }
    // we are done with it
    console.log(colors_1.default.bgGreen("\nEXIT:") + " " + message);
    // return this config
    return newConfig;
}
exports.configRequest = configRequest;
/**
 * Ask for confirmation given a message
 * @param question the question to ask
 * @returns a promise for a boolean
 */
function confirm(question) {
    return (new prompt_confirm_1.default(question)).run();
}
exports.confirm = confirm;
