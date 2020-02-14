"use strict";
/**
 * This file contains the critical build for the search mode build of a module
 * given an input of a module to be converted into its search form
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const search_mode_1 = require("./ItemDefinition/search-mode");
const search_mode_2 = require("./ItemDefinition/PropertyDefinition/search-mode");
const constants_1 = require("../../../constants");
/**
 * Builds the module based on its raw data
 * @param rawData the raw data for the module
 * @returns a raw module
 */
function buildSearchModeModule(rawData) {
    // cloning the module
    const newModule = { ...rawData };
    // We need to avoid name collision within modules
    // search mode modules are prefixed and contain no child modules
    newModule.name = constants_1.SEARCH_MODE_MODULE_PREFIX + newModule.name;
    // we fetch all the properties
    const knownPropExtMap = {};
    if (newModule.propExtensions) {
        // gathering the prop extensions as raw to the known prop extension map
        newModule.propExtensions.forEach((pe) => {
            knownPropExtMap[pe.id] = pe;
        });
        // we build them using that prop extension map we have used
        // we need to merge the arrays together and the result can be several
        // property definitions for one in search mode, specifically in range and
        // location
        newModule.propExtensions = newModule.propExtensions
            .map((pe) => search_mode_2.buildSearchModePropertyDefinitions(pe, knownPropExtMap))
            .reduce((arr, peArr) => [...arr, ...peArr]);
    }
    // if we have children in this module, which should be the case
    if (newModule.children) {
        // we map them
        newModule.children = newModule.children.map((m) => {
            // we ignore modules, as it's the job of the module class to build the search mode
            // of that specific module
            if (m.type === "module") {
                return null;
            }
            else {
                // and we do item definitions
                return search_mode_1.buildSearchModeItemDefinition(m, knownPropExtMap, rawData);
            }
        }).filter((s) => !!s);
    }
    return newModule;
}
exports.buildSearchModeModule = buildSearchModeModule;
