"use strict";
/**
 * This file contains the language utilities that build the primary language
 * information for the main language file that belongs to the root as well
 * as for the lang.json file
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearLang = exports.buildLang = void 0;
const util_1 = require("./util");
const constants_1 = require("../constants");
const properties_reader_1 = __importDefault(require("properties-reader"));
const Error_1 = __importDefault(require("./Error"));
const path_1 = __importDefault(require("path"));
/**
 * Given the properties information provides all the key names
 * that exist within that properties information as an array
 * of string
 * @param obj the object to recurse
 * @param prefix the prefix to use
 * @returns an array of string with the . separated names
 */
function getAllKeyNames(obj, prefix) {
    // this is the result
    let result = [];
    Object.keys(obj).forEach((key) => {
        // so get the value
        const value = obj[key];
        // if the value is a string, we've hit a leaf
        if (typeof value === "string") {
            result.push(prefix + key);
        }
        else {
            // otherwise let's keep getting in
            result = result.concat(getAllKeyNames(value, prefix + key + "."));
        }
    });
    // return the result
    return result;
}
/**
 * Build the core language data that holds information
 * about the language itself and other localizables
 * @param supportedLanguages the array of supported languages
 * @param actualRootLocation the root location that sets these languages
 * @param traceback the traceback in the location
 * @retuns a promise for locale language data
 */
async function buildLang(rawDataConfig, actualRootLocation, i18nBaseFileLocation, traceback) {
    const languageFileLocation = actualRootLocation
        .replace(".json", ".properties");
    const baseFileLocation = await util_1.getActualFileLocation([path_1.default.dirname(actualRootLocation), i18nBaseFileLocation], traceback, "properties");
    // this is the root of the index.properties that is used to extend
    // the base
    await util_1.checkExists(languageFileLocation, traceback);
    const propertiesBase = properties_reader_1.default(baseFileLocation).path();
    const propertiesRoot = properties_reader_1.default(languageFileLocation).path();
    const result = {};
    const internalTracebackBaseFile = traceback.newTraceToLocation(i18nBaseFileLocation);
    const internalTracebackRootFile = traceback.newTraceToLocation(languageFileLocation);
    const extraGatheredProperties = {};
    // and start to loop
    rawDataConfig.standard.supportedLanguages.forEach((locale) => {
        if (!propertiesBase[locale]) {
            throw new Error_1.default("File does not include language data for '" + locale + "'", internalTracebackBaseFile);
        }
        result[locale] = {};
        const propertiesToRequest = constants_1.LOCALE_I18N.map((property) => ({ base: true, property }))
            .concat(constants_1.ROOT_REQUIRED_LOCALE_I18N.map((property) => ({ base: false, property })));
        // we gather all the properties that were added in the root file, just to ensure
        // we have matching property values
        extraGatheredProperties[locale] = getAllKeyNames(propertiesRoot[locale], "");
        propertiesToRequest.forEach((propertyToRequestObject) => {
            const property = propertyToRequestObject.property;
            const propertySplitted = property.split(".");
            const internalTraceback = propertyToRequestObject.base ? internalTracebackBaseFile : internalTracebackRootFile;
            let propertyResult = propertiesBase[locale];
            if (!propertyToRequestObject.base) {
                propertyResult = propertiesRoot[locale];
            }
            if (!propertyResult) {
                throw new Error_1.default("File does not include data for locale '" + locale + "'", internalTraceback);
            }
            let propKey;
            // try to find it
            for (propKey of propertySplitted) {
                propertyResult = propertyResult[propKey];
                if (!propertyResult) {
                    break;
                }
            }
            if (!propertyResult) {
                throw new Error_1.default("File does not include data for '" + locale + "' in '" + property + "'", internalTraceback);
            }
            else if (typeof propertyResult !== "string") {
                throw new Error_1.default("File has an invalid type for '" + locale + "' in '" + property + "'", internalTraceback);
            }
            propertyResult = propertyResult.trim();
            let whereToSet = result[locale];
            // by looping on the splitted value
            propertySplitted.forEach((keyValue, index) => {
                // on the last one we set it as the value
                if (index === propertySplitted.length - 1) {
                    whereToSet[keyValue] = propertyResult;
                    return;
                }
                // otherwise we try to get deeper
                whereToSet[keyValue] = whereToSet[keyValue] || {};
                whereToSet = whereToSet[keyValue];
            });
        });
        result[locale] = { ...result[locale], ...propertiesRoot[locale] };
    });
    Object.keys(extraGatheredProperties).forEach((locale) => {
        const propertiesInLocale = extraGatheredProperties[locale];
        Object.keys(extraGatheredProperties).forEach((locale2) => {
            const propertiesInSecondLocale = extraGatheredProperties[locale2];
            propertiesInLocale.forEach((property) => {
                if (!propertiesInSecondLocale.find((p) => p === property)) {
                    throw new Error_1.default("File mismatch in locale '" + locale + "' and locale '" + locale2 +
                        "' where a locale key '" + property + "' exists in the first but not in the later", internalTracebackRootFile);
                }
            });
        });
    });
    return result;
}
exports.buildLang = buildLang;
/**
 * Clears language data in such a way that it leaves only the name
 * and the supported locales
 * @param rawData the raw locale language data
 * @param rawDataConfig the raw data config
 * @returns the new locale language data with only names
 */
function clearLang(rawData, rawDataConfig) {
    const nRawData = {};
    Object.keys(rawData).forEach((locale) => {
        nRawData[locale] = {
            name: rawData[locale].name,
            rtl: rawDataConfig.standard.rtlLanguages.includes(locale),
        };
    });
    return nRawData;
}
exports.clearLang = clearLang;
