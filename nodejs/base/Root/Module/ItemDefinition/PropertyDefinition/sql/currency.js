"use strict";
/**
 * Contains the sql and server side specific functions for the currency type
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../../../../constants");
const search_interfaces_1 = require("../search-interfaces");
/**
 * the sql function that setups the fields for currency
 * @param arg the sql argumnent
 * @returns a partial row definition
 */
function currencySQL(arg) {
    // there are 3 fields, value, currency and normalized value
    return {
        [arg.prefix + arg.id + "_VALUE"]: { type: "float" },
        [arg.prefix + arg.id + "_CURRENCY"]: { type: "text" },
        [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: { type: "float" },
    };
}
exports.currencySQL = currencySQL;
/**
 * The sql in function for the currency
 * @param arg the sql in info argument
 * @returns a partial row
 */
function currencySQLIn(arg) {
    // so we get our value we are trying to input in the row for the arg
    const value = arg.value;
    // if this value is null
    if (arg.value === null) {
        return {
            [arg.prefix + arg.id + "_VALUE"]: null,
            [arg.prefix + arg.id + "_CURRENCY"]: null,
            [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: null,
        };
    }
    // otherwise we need to get the conversion information from the server data
    const factor = arg.serverData[constants_1.CURRENCY_FACTORS_IDENTIFIER][value.currency];
    const normalized = factor ? (1 / factor) * value.value : null;
    return {
        [arg.prefix + arg.id + "_VALUE"]: value.value,
        [arg.prefix + arg.id + "_CURRENCY"]: value.currency,
        [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: normalized,
    };
}
exports.currencySQLIn = currencySQLIn;
/**
 * The sql out function
 * @param arg the argument out info
 * @returns a property definition supported currency type (or null)
 */
function currencySQLOut(arg) {
    // so our results depends on the row we are getting
    const result = {
        value: arg.row[arg.prefix + arg.id + "_VALUE"],
        currency: arg.row[arg.prefix + arg.id + "_CURRENCY"],
    };
    // if our value happens to be null
    if (result.value === null) {
        // return whole null as it should
        return null;
    }
    // otherwise return the result itself, note how normalized
    // isn't included as the currency doesn't include the normalized
    return result;
}
exports.currencySQLOut = currencySQLOut;
/**
 * Searching for currency values
 * @param arg the argument search info
 * @returns a boolean on whether it's searched by it or not
 */
function currencySQLSearch(arg) {
    // first we need to get the arguments
    const fromName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
    const toName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
    const exactName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;
    // now if we are searching by it
    let searchedByIt = false;
    // if we have an exact search
    if (typeof arg.args[exactName] !== "undefined" && arg.args[exactName] !== null) {
        const exactArg = arg.args[exactName];
        // we just match it as it is
        arg.knexBuilder.andWhere(arg.prefix + arg.id + "_CURRENCY", exactArg.currency);
        arg.knexBuilder.andWhere(arg.prefix + arg.id + "_VALUE", exactArg.value);
    }
    // if we have a from search
    if (typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null) {
        const fromArg = arg.args[fromName];
        const factor = arg.serverData[constants_1.CURRENCY_FACTORS_IDENTIFIER][fromArg.currency];
        // in these cases we use the normalized values and for that we use the conversion
        const normalized = factor ? factor * fromArg.value : null;
        // so we do
        arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_VALUE", ">=", normalized);
        searchedByIt = true;
    }
    // same here as we did with from, but with the to
    if (typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null) {
        const toArg = arg.args[toName];
        const factor = arg.serverData[constants_1.CURRENCY_FACTORS_IDENTIFIER][toArg.currency];
        const normalized = factor ? factor * toArg.value : null;
        arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_VALUE", "<=", normalized);
        searchedByIt = true;
    }
    // now we return if we have been searched by it at the end
    return searchedByIt;
}
exports.currencySQLSearch = currencySQLSearch;
/**
 * The order by functionality for the currency type
 * @param arg the order by arg
 * @returns an array of string with the rule options
 */
function currencySQLOrderBy(arg) {
    // we order via the normalized value as a matter of fact
    return [arg.prefix + arg.id + "_NORMALIZED_VALUE", arg.direction, arg.nulls];
}
exports.currencySQLOrderBy = currencySQLOrderBy;
/**
 * The btree indexable used in searches
 * @param arg the arg for the btree indexable options
 * @returns the columns to index
 */
function currencySQLBtreeIndexable(arg) {
    // we index the currency column and the normalize value column
    return [arg.prefix + arg.id + "_CURRENCY", arg.prefix + arg.id + "_NORMALIZED_VALUE"];
}
exports.currencySQLBtreeIndexable = currencySQLBtreeIndexable;
/**
 * The SQL mantenience for the currency fields that are currently active
 * to be searched
 * @param arg the sql mantenience arg
 * @returns the sql mantenience rule
 */
function currencySQLMantenience(arg) {
    // so the value of the currency in its original currency is in this column
    const valueId = arg.prefix + arg.id + "_VALUE";
    // the normalized value
    const normalizedValueId = arg.prefix + arg.id + "_NORMALIZED_VALUE";
    // the currency itself
    const currencyId = arg.prefix + arg.id + "_CURRENCY";
    // and this is an unique id we will use for the conversion, a meta row
    const asConversionRule = arg.prefix + arg.id + "_CURRENCY_FACTORS";
    return {
        // so we are setting normalized value column
        columnToSet: normalizedValueId,
        // we are setting it to, the value column multiplied by the meta row, factor column 
        setColumnToRaw: ["??*??.??", [valueId, asConversionRule, "factor"]],
        // from our currency factors table
        from: constants_1.CURRENCY_FACTORS_IDENTIFIER,
        // the table row that matches will be matched as the conversion rule id we have just created
        fromAs: asConversionRule,
        // and this row will be updated only if the value is not null, and also the currency
        // factors table, code, matches our current currency id
        whereRaw: ["?? is not NULL AND ??.?? = ??", [valueId, asConversionRule, "code", currencyId]],
        // we only update if the result of all this creates a change that is larger than 0.1 from the original
        // this will avoid updating too much unnecesarily, basically 1 cent of difference
        updateConditionRaw: ["??*??.?? > 0.1", [valueId, asConversionRule, "factor"]],
    };
}
exports.currencySQLMantenience = currencySQLMantenience;
/**
 * How to consider equality with a value
 * @param arg the argument to check equality against
 * @returns a partial row match
 */
function currencySQLEqual(arg) {
    return {
        [arg.prefix + arg.id + "_CURRENCY"]: arg.value.currency,
        [arg.prefix + arg.id + "_VALUE"]: arg.value.value,
    };
}
exports.currencySQLEqual = currencySQLEqual;
/**
 * How to check equality with a value using the cache
 * @param arg the argument to check against
 * @returns a boolean
 */
function currencySQLSSCacheEqual(arg) {
    if (arg.value === null) {
        return arg.row[arg.prefix + arg.id + "_VALUE"] === null;
    }
    return arg.row[arg.prefix + arg.id + "_VALUE"] === arg.value.value &&
        arg.row[arg.prefix + arg.id + "_CURRENCY"] === arg.value.currency;
}
exports.currencySQLSSCacheEqual = currencySQLSSCacheEqual;
