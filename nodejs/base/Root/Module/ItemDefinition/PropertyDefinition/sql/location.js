"use strict";
/**
 * This file contains the sql functionality to be used with the location type
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationSQLBtreeIndexable = exports.locationSQLSSCacheEqual = exports.locationSQLEqual = exports.locationSQLOrderBy = exports.locationSQLSearch = exports.locationSQLOut = exports.locationSQLIn = exports.locationSQL = void 0;
const constants_1 = require("../../../../../../constants");
const search_interfaces_1 = require("../search-interfaces");
/**
 * provides the SQL form for the location type
 * @param arg the arg info
 * @returns a partial row definition
 */
function locationSQL(arg) {
    return {
        // this contains the geometry form, and always contains
        // an index of type gist, as recommended for the documentation
        [arg.prefix + arg.id + "_GEO"]: {
            type: "GEOMETRY(POINT,4326)",
            ext: "postgis",
            index: {
                type: "gist",
                id: constants_1.SQL_CONSTRAINT_PREFIX + arg.prefix + arg.id,
                level: 0,
            },
        },
        // this contains the id, which is an unique id generated
        // based on the lng and lat of the position
        [arg.prefix + arg.id + "_ID"]: {
            type: "text",
        },
        // this is the latitude
        [arg.prefix + arg.id + "_LAT"]: {
            type: "float",
        },
        // the longitude
        [arg.prefix + arg.id + "_LNG"]: {
            type: "float",
        },
        // the text information
        [arg.prefix + arg.id + "_TXT"]: {
            type: "text",
        },
        // and the alternative text information
        [arg.prefix + arg.id + "_ATXT"]: {
            type: "text",
        },
    };
}
exports.locationSQL = locationSQL;
/**
 * Provides the functionality for sql in of data into
 * the row
 * @param arg the sql in arg info
 * @returns a partial row
 */
function locationSQLIn(arg) {
    if (arg.value === null) {
        return {
            [arg.prefix + arg.id + "_GEO"]: null,
            [arg.prefix + arg.id + "_ID"]: null,
            [arg.prefix + arg.id + "_LAT"]: null,
            [arg.prefix + arg.id + "_LNG"]: null,
            [arg.prefix + arg.id + "_TXT"]: null,
            [arg.prefix + arg.id + "_ATXT"]: null,
        };
    }
    const value = arg.value;
    return {
        [arg.prefix + arg.id + "_GEO"]: arg.knex.raw("ST_SetSRID(ST_MakePoint(?, ?), 4326)", [value.lng, value.lat]),
        [arg.prefix + arg.id + "_ID"]: value.id,
        [arg.prefix + arg.id + "_LAT"]: value.lat,
        [arg.prefix + arg.id + "_LNG"]: value.lng,
        [arg.prefix + arg.id + "_TXT"]: value.txt,
        [arg.prefix + arg.id + "_ATXT"]: value.atxt,
    };
}
exports.locationSQLIn = locationSQLIn;
/**
 * Provides the functionality to analyze a row value and
 * output the location type
 * @param arg the sql out info
 * @returns a property definition supported location type, or null
 */
function locationSQLOut(arg) {
    const result = {
        lat: arg.row[arg.prefix + arg.id + "_LAT"],
        lng: arg.row[arg.prefix + arg.id + "_LNG"],
        txt: arg.row[arg.prefix + arg.id + "_TXT"],
        atxt: arg.row[arg.prefix + arg.id + "_ATXT"],
        id: arg.row[arg.prefix + arg.id + "_ID"],
    };
    if (result.lat === null || result.lng === null) {
        return null;
    }
    return result;
}
exports.locationSQLOut = locationSQLOut;
/**
 * Provides the search functionality for the location type
 * @param arg the sql search info arg
 * @returns a boolean on whether it was searched by it, or an order by rule (also when it was searched by it)
 */
function locationSQLSearch(arg) {
    const radiusName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.RADIUS + arg.prefix + arg.id;
    const locationName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.LOCATION + arg.prefix + arg.id;
    if (typeof arg.args[locationName] !== "undefined" && arg.args[locationName] !== null &&
        typeof arg.args[radiusName] !== "undefined" && arg.args[radiusName] !== null) {
        arg.knexBuilder.andWhere(arg.prefix + arg.id + "_GEO", "is not", null);
        const argAsLocation = arg.args[locationName];
        const lng = argAsLocation.lng || 0;
        const lat = argAsLocation.lat || 0;
        const argAsUnit = arg.args[radiusName];
        const distance = (argAsUnit.normalizedValue || 0) * 1000;
        arg.knexBuilder.andWhereRaw("ST_DWithin(??, ST_MakePoint(?,?)::geography, ?)", [
            arg.prefix + arg.id + "_GEO",
            lng,
            lat,
            distance,
        ]);
        if (arg.isOrderedByIt) {
            return [
                "ST_Distance(??, ST_MakePoint(?,?)::geography) AS ??",
                [
                    arg.prefix + arg.id + "_GEO",
                    lng,
                    lat,
                    arg.prefix + arg.id + "_CALC_RADIUS",
                ],
            ];
        }
        return true;
    }
    return false;
}
exports.locationSQLSearch = locationSQLSearch;
/**
 * Provides the functionality on how to order by
 * @param arg the order by rule info
 * @returns the order by rule string array
 */
function locationSQLOrderBy(arg) {
    if (arg.wasIncludedInSearch) {
        return [arg.prefix + arg.id + "_CALC_RADIUS", arg.direction, arg.nulls];
    }
    return null;
}
exports.locationSQLOrderBy = locationSQLOrderBy;
/**
 * Checks for equality within the database
 * @param arg the equal arg info
 * @returns a partial row match
 */
function locationSQLEqual(arg) {
    if (arg.value === null) {
        return {
            [arg.prefix + arg.id + "_ID"]: null,
        };
    }
    return {
        [arg.prefix + arg.id + "_ID"]: arg.value.id,
    };
}
exports.locationSQLEqual = locationSQLEqual;
/**
 * Checks for equality within the cache
 * @param arg the ss cache equal info
 * @returns a boolean
 */
function locationSQLSSCacheEqual(arg) {
    if (arg.value === null) {
        return arg.row[arg.prefix + arg.id + "_ID"] === arg.value;
    }
    return arg.row[arg.prefix + arg.id + "ID"] === arg.value.id;
}
exports.locationSQLSSCacheEqual = locationSQLSSCacheEqual;
/**
 * Provides the btree indexable functionality
 */
function locationSQLBtreeIndexable() {
    // not supported
    return null;
}
exports.locationSQLBtreeIndexable = locationSQLBtreeIndexable;
