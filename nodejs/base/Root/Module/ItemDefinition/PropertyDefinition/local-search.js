"use strict";
/**
 * This file contains helper local functions that are used against
 * graphql values in order to perform local searches as if it was
 * running in the server side, these tend to run in the IndexedDB
 * database
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const search_interfaces_1 = require("./search-interfaces");
const constants_1 = require("../../../../../constants");
const moment_1 = __importDefault(require("moment"));
/**
 * Performs a local search of an exact and ranged search for
 * a property value
 * @returns a boolean on whether it matches
 */
function standardLocalSearchExactAndRange(arg) {
    // item is deleted
    if (!arg.gqlValue) {
        return false;
    }
    // item is blocked
    if (arg.gqlValue.DATA === null) {
        return false;
    }
    // now we get the names according to the interface
    const fromName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
    const toName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
    const exactName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;
    // the args come as a whole so we need to extract what we are using in the search mode
    const usefulArgs = arg.include ? arg.args[constants_1.INCLUDE_PREFIX + arg.include.getId()] || {} : arg.args;
    // the property value also comes from the value as a whole, the value is not
    // flattened
    const propertyValue = arg.include ? arg.gqlValue.DATA[arg.include.getId()][arg.id] : arg.gqlValue.DATA[arg.id];
    // now we check each condition
    const conditions = [];
    if (typeof usefulArgs[exactName] !== "undefined") {
        conditions.push(propertyValue === usefulArgs[exactName]);
    }
    if (typeof usefulArgs[fromName] !== "undefined" && usefulArgs[fromName] !== null) {
        conditions.push(propertyValue >= usefulArgs[fromName]);
    }
    if (typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null) {
        conditions.push(propertyValue <= usefulArgs[toName]);
    }
    // if no conditions applied this means the property matches by default
    if (!conditions.length) {
        return true;
    }
    else {
        // if not we check that every single condition works
        return conditions.every((c) => c);
    }
}
exports.standardLocalSearchExactAndRange = standardLocalSearchExactAndRange;
/**
 * Runs the same as the standard sql search exact and range but using the date
 * functionality
 * @param format the format either DATE_FORMAT TIME_FORMAT or DATETIME_FORMAT
 * @param args the whole raw arguments from graphql
 * @param rawData the raw data non flattened of the current value being questioned
 * @param id the id of the property
 * @param includeId an optional include id
 * @returns a boolean on whether it matches
 */
function dateLocalSearchExactAndRange(format, args, rawData, id, includeId) {
    // item is deleted
    if (!rawData) {
        return false;
    }
    // item is blocked
    if (rawData.DATA === null) {
        return false;
    }
    // we get the names just as we did standard before
    const fromName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.FROM + id;
    const toName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.TO + id;
    const exactName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.EXACT + id;
    // now the useful args again
    const usefulArgs = includeId ? args[constants_1.INCLUDE_PREFIX + includeId] || {} : args;
    // now we use moment to parse our string value
    const propertyValueMoment = moment_1.default(includeId ? rawData.DATA[includeId][id] : rawData.DATA[id], format);
    // and get the conditions
    const conditions = [];
    if (typeof usefulArgs[exactName] !== "undefined") {
        // we use moment in each of these conditions
        const exactComparedValueMoment = moment_1.default(usefulArgs[exactName], format);
        conditions.push(propertyValueMoment.isSame(exactComparedValueMoment));
    }
    if (typeof usefulArgs[fromName] !== "undefined" && usefulArgs[fromName] !== null) {
        const fromComparedValueMoment = moment_1.default(usefulArgs[fromName], format);
        conditions.push(propertyValueMoment.isSameOrAfter(fromComparedValueMoment));
    }
    if (typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null) {
        const toComparedValueMoment = moment_1.default(usefulArgs[toName], format);
        conditions.push(propertyValueMoment.isSameOrBefore(toComparedValueMoment));
    }
    // and just as before
    if (!conditions.length) {
        return true;
    }
    else {
        return conditions.every((c) => c);
    }
}
exports.dateLocalSearchExactAndRange = dateLocalSearchExactAndRange;
