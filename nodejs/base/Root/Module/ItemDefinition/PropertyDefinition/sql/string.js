"use strict";
/**
 * This file contains the sql server side functions for the string type
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const search_interfaces_1 = require("../search-interfaces");
const string_1 = require("../types/string");
/**
 * The string sql search functionality
 * @param arg the sql search arg info
 * @returns a boolean on whether it was searched by it
 */
function stringSQLSearch(arg) {
    // first we analyze and get the search name
    const searchName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.SEARCH + arg.prefix + arg.id;
    // now we see if we have an argument for it
    if (typeof arg.args[searchName] !== "undefined" && arg.args[searchName] !== null) {
        // and we check it...
        if (string_1.exactStringSearchSubtypes.includes(arg.property.getSubtype())) {
            arg.knexBuilder.andWhere(arg.prefix + arg.id, arg.args[searchName]);
        }
        else {
            arg.knexBuilder.andWhereRaw("?? ilike ? escape ?", [
                arg.prefix + arg.id,
                "%" + arg.args[searchName].replace(/\%/g, "\\%").replace(/\_/g, "\\_") + "%",
                "\\",
            ]);
        }
        return true;
    }
    return false;
}
exports.stringSQLSearch = stringSQLSearch;
/**
 * The string FTS search functionality from the search field
 * @param arg the sql str search argument
 * @returns a boolean on whether it was searched by it
 */
function stringSQLStrSearch(arg) {
    // this is due to knex shenanigans, we need to check it
    // it's a limitation
    if (arg.knexBuilder) {
        // so we check it
        if (string_1.exactStringSearchSubtypes.includes(arg.property.getSubtype())) {
            arg.knexBuilder.andWhere(arg.prefix + arg.id, arg.search);
        }
        else {
            arg.knexBuilder.andWhereRaw("?? ilike ? escape ?", [
                arg.prefix + arg.id,
                "%" + arg.search.replace(/\%/g, "\\%").replace(/\_/g, "\\_") + "%",
                "\\",
            ]);
        }
    }
    return true;
}
exports.stringSQLStrSearch = stringSQLStrSearch;
