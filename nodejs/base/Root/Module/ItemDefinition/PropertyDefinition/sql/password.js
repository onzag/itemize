"use strict";
/**
 * This file contains the password server side sql functionality
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * Specifies how to SQL in the password
 * @param arg the sql in info arg
 * @eturns a partial row
 */
function passwordSQLIn(arg) {
    if (arg.value === null) {
        return {
            [arg.prefix + arg.id]: null,
        };
    }
    return {
        [arg.prefix + arg.id]: arg.knex.raw("crypt(?, gen_salt('bf',10))", arg.value),
    };
}
exports.passwordSQLIn = passwordSQLIn;
/**
 * Provides the equality function as run in the database
 * @param arg the sql equal arg info
 * @returns a knex raw execution query
 */
function passwordSQLEqual(arg) {
    return arg.knex.raw("?? = crypt(?, ??)", [
        arg.prefix + arg.id,
        arg.value,
        arg.prefix + arg.id,
    ]);
}
exports.passwordSQLEqual = passwordSQLEqual;
/**
 * Provides the equality function as run in a cached row
 * @param arg the sql ss cache equal arg info
 * @returns a boolean
 */
function passwordSQLSSEqual(arg) {
    // if the value is null, we check for both null
    if (arg.value === null) {
        // like this from the row itself
        return arg.row[arg.prefix + arg.id] === null;
        // if the row itself is null
    }
    else if (!arg.row[arg.prefix + arg.id]) {
        // it's false 
        return false;
    }
    try {
        // postgresql uses bcrypt, so this actually works to compare
        // the value properly
        return bcrypt_1.default.compareSync(arg.value, arg.row[arg.prefix + arg.id]);
    }
    catch (err) {
        return false;
    }
}
exports.passwordSQLSSEqual = passwordSQLSSEqual;
/**
 * Provides the password sql search functionality
 * @returns nothing, it just throws an error
 */
function passwordSQLSearch() {
    // This should never happen,
    // first off the searchable is false so it should never trigger a sql search
    // EXACT_password will never exist in the search module
    // however passwords can be retrieved, its hash, they have to be explicitly set
    // disable retrieval to true, in the document definition itself, not doing so
    // is a leak, but should be obvious when checking /graphql
    // we throw an error still
    throw new Error("Attempted to search by password");
}
exports.passwordSQLSearch = passwordSQLSearch;
