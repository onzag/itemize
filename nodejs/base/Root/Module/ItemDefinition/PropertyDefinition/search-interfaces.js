"use strict";
/**
 * Contains the search interfaces that a property can use
 * these are basically 4, also contains all the utilities and prefixes
 * that are related to these interfaces
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyDefinitionSearchInterfacesPrefixesList = exports.PropertyDefinitionSearchInterfacesPrefixes = exports.PropertyDefinitionSearchInterfacesType = void 0;
const constants_1 = require("../../../../../constants");
/**
 * These are all the 4 interfaces
 */
var PropertyDefinitionSearchInterfacesType;
(function (PropertyDefinitionSearchInterfacesType) {
    /**
     * uses an instance of the same property type input
     */
    PropertyDefinitionSearchInterfacesType[PropertyDefinitionSearchInterfacesType["EXACT"] = 0] = "EXACT";
    /**
     * uses an instance of the same property type input, or two for a range
     * provides either an exact value or a range
     */
    PropertyDefinitionSearchInterfacesType[PropertyDefinitionSearchInterfacesType["EXACT_AND_RANGE"] = 1] = "EXACT_AND_RANGE";
    /**
     * full text search, uses a simple raw string as search
     */
    PropertyDefinitionSearchInterfacesType[PropertyDefinitionSearchInterfacesType["TEXT"] = 2] = "TEXT";
    /**
     * uses location and radius for searching
     */
    PropertyDefinitionSearchInterfacesType[PropertyDefinitionSearchInterfacesType["LOCATION_RADIUS"] = 3] = "LOCATION_RADIUS";
})(PropertyDefinitionSearchInterfacesType = exports.PropertyDefinitionSearchInterfacesType || (exports.PropertyDefinitionSearchInterfacesType = {}));
/**
 * The prefixes for every location search interface
 */
exports.PropertyDefinitionSearchInterfacesPrefixes = {
    /**
     * Used to prefix the exact searches when using the exact or exact and range protocol
     */
    EXACT: constants_1.PREFIX_BUILD("EXACT"),
    /**
     * Used to prefix for the from value when using exact and range protocol
     */
    FROM: constants_1.PREFIX_BUILD("FROM"),
    /**
     * Used to prefix the value to for the to search
     */
    TO: constants_1.PREFIX_BUILD("TO"),
    /**
     * Used to prefix FTS queries
     */
    SEARCH: constants_1.PREFIX_BUILD("SEARCH"),
    /**
     * Used to prefix the location when using location radius
     */
    LOCATION: constants_1.PREFIX_BUILD("LOCATION"),
    /**
     * Used to prefix the radius when using location radius
     */
    RADIUS: constants_1.PREFIX_BUILD("RADIUS"),
};
/**
 * this correlates to our search interface enum, enums are numbers basically
 * so when we want to get which interfaces each uses, we refer to this
 * array of arrays
 */
exports.PropertyDefinitionSearchInterfacesPrefixesList = [
    [
        exports.PropertyDefinitionSearchInterfacesPrefixes.EXACT,
    ],
    [
        exports.PropertyDefinitionSearchInterfacesPrefixes.EXACT,
        exports.PropertyDefinitionSearchInterfacesPrefixes.FROM,
        exports.PropertyDefinitionSearchInterfacesPrefixes.TO,
    ],
    [
        exports.PropertyDefinitionSearchInterfacesPrefixes.SEARCH,
    ],
    [
        exports.PropertyDefinitionSearchInterfacesPrefixes.LOCATION,
        exports.PropertyDefinitionSearchInterfacesPrefixes.RADIUS,
    ],
];
