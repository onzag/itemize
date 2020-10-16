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
 * @param arg the sql ss cache equal info
 * @returns a boolean on whether it equals
 */
function standardSQLSSCacheEqualFn(arg) {
    return arg.row[arg.prefix + arg.id] === arg.value;
}
exports.standardSQLSSCacheEqualFn = standardSQLSSCacheEqualFn;
/**
 * Standard local equal for comparing values locally in the client side
 * by default it just compares
 * @param arg the local information
 * @returns a boolean on whether it equals or not
 */
function standardLocalEqual(arg) {
    return deep_equal_1.default(arg.a, arg.b);
}
exports.standardLocalEqual = standardLocalEqual;
