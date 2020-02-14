"use strict";
/**
 * Processes the json schema of itemize in order to remove useless data
 * like pointers, file information, trackers and location; and also strippes
 * unecessary language information if deemed required
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
/**
 * Cleans up build data from
 * and builds a new json
 * @param rawData the raw data
 * @param locale the locale
 * @returns the new json
 */
function processItemDefinition(rawData, locale) {
    const nRawData = { ...rawData };
    delete nRawData.location;
    delete nRawData.i18nDataLocation;
    delete nRawData.pointers;
    delete nRawData.raw;
    if (locale) {
        nRawData.i18nData = { ...nRawData.i18nData };
        Object.keys(nRawData.i18nData).forEach((key) => {
            if (key !== locale) {
                delete nRawData.i18nData[key];
            }
        });
    }
    nRawData.childDefinitions = nRawData.childDefinitions && nRawData
        .childDefinitions.map((cd) => processItemDefinition(cd, locale));
    nRawData.includes = nRawData.includes &&
        nRawData.includes.map((include) => processInclude(include, locale));
    nRawData.properties = nRawData.properties &&
        nRawData.properties
            .map((p) => processPropertyDefinition(p, locale));
    return nRawData;
}
exports.processItemDefinition = processItemDefinition;
/**
 * Cleans up build data from
 * and builds a new json
 * @param rawData the raw data
 * @param locale the locale
 * @returns the new json
 */
function processInclude(rawData, locale) {
    if (!locale) {
        return rawData;
    }
    const nRawData = { ...rawData };
    nRawData.i18nData = { ...nRawData.i18nData };
    Object.keys(nRawData.i18nData).forEach((key) => {
        if (key !== locale) {
            delete nRawData.i18nData[key];
        }
    });
    return nRawData;
}
exports.processInclude = processInclude;
function processPropertyDefinition(rawData, locale) {
    if (!locale) {
        return rawData;
    }
    const nRawData = { ...rawData };
    nRawData.i18nData = { ...nRawData.i18nData };
    Object.keys(nRawData.i18nData).forEach((key) => {
        if (key !== locale) {
            delete nRawData.i18nData[key];
        }
    });
    return nRawData;
}
exports.processPropertyDefinition = processPropertyDefinition;
/**
 * Cleans up build data from
 * and builds a new json
 * @param rawData the raw data
 * @param locale the locale
 * @returns the new json
 */
function processModule(rawData, locale) {
    const nRawData = { ...rawData };
    delete nRawData.location;
    delete nRawData.pointers;
    delete nRawData.raw;
    delete nRawData.propExtLocation;
    delete nRawData.propExtPointers;
    delete nRawData.propExtRaw;
    delete nRawData.i18nDataLocation;
    if (locale) {
        nRawData.i18nData = { ...nRawData.i18nData };
        Object.keys(nRawData.i18nData).forEach((key) => {
            if (key !== locale) {
                delete nRawData.i18nData[key];
            }
        });
    }
    nRawData.propExtensions = nRawData.propExtensions &&
        nRawData.propExtensions.map((propDef) => {
            return processPropertyDefinition(propDef, locale);
        });
    nRawData.children = nRawData.children &&
        nRawData.children.map((moduleOrItemDef) => {
            if (moduleOrItemDef.type === "module") {
                return processModule(moduleOrItemDef, locale);
            }
            else {
                return processItemDefinition(moduleOrItemDef, locale);
            }
        });
    return nRawData;
}
exports.processModule = processModule;
/**
 * Cleans up build data from
 * and builds a new json
 * @param rawData the raw data
 * @param locale the locale
 * @returns the new json
 */
function processRoot(rawData, locale) {
    const nRawData = { ...rawData };
    delete nRawData.location;
    delete nRawData.pointers;
    delete nRawData.raw;
    nRawData.children =
        nRawData.children && nRawData.children.map((mod) => {
            return processModule(mod, locale);
        });
    if (locale) {
        nRawData.i18nData = { ...nRawData.i18nData };
        Object.keys(nRawData.i18nData).forEach((key) => {
            if (key !== locale) {
                delete nRawData.i18nData[key];
            }
        });
    }
    return nRawData;
}
exports.processRoot = processRoot;
