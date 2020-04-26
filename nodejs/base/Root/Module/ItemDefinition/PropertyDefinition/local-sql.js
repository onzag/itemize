"use strict";
/**
 * This file contains fake local sql functions that run as if they were sql
 * functions but in the javascript context
 *
 * They exist for use within the redis cache
 * within the server and client side respectively
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deep_equal_1 = __importDefault(require("deep-equal"));
/**
 * This function represents the standard way an equality check
 * is performed locally in the cache when equality between properties is requests
 * this local equal is ran against SQL cached properties, that is redis cache
 * it is used for check for policies
 * @param value the value of the property
 * @param sqlPrefix the prefix of sql this is for ITEM_ form stuff
 * @param id the id of the property
 * @param data the sql data that has been cached
 * @returns a boolean on whether it equals
 */
function standardSQLLocalEqualFn(value, sqlPrefix, id, data) {
    return data[sqlPrefix + id] === value;
}
exports.standardSQLLocalEqualFn = standardSQLLocalEqualFn;
function standardLocalEqual(a, b) {
    return deep_equal_1.default(a, b);
}
exports.standardLocalEqual = standardLocalEqual;
