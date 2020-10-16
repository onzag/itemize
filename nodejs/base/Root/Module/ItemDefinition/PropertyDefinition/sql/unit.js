"use strict";
/**
 * This file provides the sql functionality for the unit type
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const search_interfaces_1 = require("../search-interfaces");
/**
 * The unit sql function that specifies the schema
 * @param arg the sql arg info
 * @returns a patial row definition
 */
function unitSQL(arg) {
    return {
        [arg.prefix + arg.id + "_VALUE"]: {
            type: "float",
        },
        [arg.prefix + arg.id + "_UNIT"]: {
            type: "text",
        },
        [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: {
            type: "float",
        },
        [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: {
            type: "text",
        },
    };
}
exports.unitSQL = unitSQL;
/**
 * Specifies how units are to be sql in
 * @param arg the sql in arg info
 * @returns a partial row value
 */
function unitSQLIn(arg) {
    if (arg.value === null) {
        return {
            [arg.prefix + arg.id + "_VALUE"]: null,
            [arg.prefix + arg.id + "_UNIT"]: null,
            [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: null,
            [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: null,
        };
    }
    const value = arg.value;
    return {
        [arg.prefix + arg.id + "_VALUE"]: value.value,
        [arg.prefix + arg.id + "_UNIT"]: value.unit,
        [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: value.normalizedValue,
        [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: value.normalizedUnit,
    };
}
exports.unitSQLIn = unitSQLIn;
/**
 * Specifies how units are to be outputted from a raw row
 * @param arg the sql out arg info
 * @returns a supported unit type (or null)
 */
function unitSQLOut(arg) {
    const result = {
        value: arg.row[arg.prefix + arg.id + "_VALUE"],
        unit: arg.row[arg.prefix + arg.id + "_UNIT"],
        normalizedValue: arg.row[arg.prefix + arg.id + "_NORMALIZED_VALUE"],
        normalizedUnit: arg.row[arg.prefix + arg.id + "_NORMALIZED_UNIT"],
    };
    if (result.value === null) {
        return null;
    }
    return result;
}
exports.unitSQLOut = unitSQLOut;
/**
 * Specifies how units are to be searched by
 * @param arg the sql search arg info
 * @returns a boolean on whether it was searched by it
 */
function unitSQLSearch(arg) {
    const fromName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
    const toName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
    const exactName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;
    let searchedByIt = false;
    if (typeof arg.args[exactName] !== "undefined" && arg.args[exactName] !== null) {
        const exactAsUnit = arg.args[exactName];
        arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_UNIT", exactAsUnit.normalizedUnit);
        arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_VALUE", exactAsUnit.normalizedValue);
    }
    if (typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null) {
        const fromAsUnit = arg.args[fromName];
        arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_UNIT", fromAsUnit.normalizedUnit);
        arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_VALUE", ">=", fromAsUnit.normalizedValue);
        searchedByIt = true;
    }
    if (typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null) {
        const toAsUnit = arg.args[toName];
        arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_UNIT", toAsUnit.normalizedUnit);
        arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_VALUE", "<=", toAsUnit.normalizedValue);
        searchedByIt = true;
    }
    return searchedByIt;
}
exports.unitSQLSearch = unitSQLSearch;
/**
 * Specifies how units are to be ordered by
 * @param arg the sql order by info arg
 * @returns the three string order by rule
 */
function unitSQLOrderBy(arg) {
    return [arg.prefix + arg.id + "_NORMALIZED_VALUE", arg.direction, arg.nulls];
}
exports.unitSQLOrderBy = unitSQLOrderBy;
/**
 * Specifies how units are to be btree indexed to accelerate searches
 * @param arg the sql btree indexable info arg
 * @returns the rows to be btree indexed
 */
function unitSQLBtreeIndexable(arg) {
    return [arg.prefix + arg.id + "_NORMALIZED_UNIT", arg.prefix + arg.id + "_NORMALIZED_VALUE"];
}
exports.unitSQLBtreeIndexable = unitSQLBtreeIndexable;
/**
 * Specifies how units are to be compared for equality in the database
 * @param arg the sql equal arg info
 * @returns a partial row comparison
 */
function unitSQLEqual(arg) {
    return {
        [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: arg.value.normalizedUnit,
        [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: arg.value.normalizedValue,
    };
}
exports.unitSQLEqual = unitSQLEqual;
/**
 * Specifies how units are to be compared for equality in the cache
 * @param arg the sql ss equal arg info
 * @returns a boolean on whether the equality succeed or not
 */
function unitSQLSSCacheEqual(arg) {
    if (arg.value === null) {
        return arg.row[arg.prefix + arg.id + "_NORMALIZED_VALUE"] === null;
    }
    const value = arg.value;
    return arg.row[arg.prefix + arg.id + "_NORMALIZED_VALUE"] === value.normalizedValue &&
        arg.row[arg.prefix + arg.id + "_NORMALIZED_UNIT"] === value.normalizedUnit;
}
exports.unitSQLSSCacheEqual = unitSQLSSCacheEqual;
