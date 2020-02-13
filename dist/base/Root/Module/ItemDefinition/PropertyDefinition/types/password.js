"use strict";
/**
 * Contains the password type description
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const sql_1 = require("../sql");
const PropertyDefinition_1 = require("../../PropertyDefinition");
const constants_1 = require("../../../../../../constants");
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * The behaviour of passwords is specified by this type
 */
const typeValue = {
    gql: graphql_1.GraphQLString,
    nullableDefault: "",
    sql: sql_1.getStandardSQLFnFor && sql_1.getStandardSQLFnFor("text", "pgcrypto"),
    sqlIn: (value, sqlPrefix, id, property, knex) => {
        if (value === null) {
            return {
                [sqlPrefix + id]: null,
            };
        }
        return {
            [sqlPrefix + id]: knex.raw("crypt(?, gen_salt('bf',10))", value),
        };
    },
    sqlOut: sql_1.standardSQLOutFn,
    sqlSearch: () => {
        // This should never happen,
        // first off the searchable is false so it should never trigger a sql search
        // EXACT_password will never exist in the search module
        // however passwords can be retrieved, its hash, they have to be explicitly set
        // disable retrieval to true, in the document definition itself, not doing so
        // is a leak, but should be obvious when checking /graphql
        // we throw an error still
        throw new Error("Attempted to search by password");
    },
    localSearch: () => {
        throw new Error("Attempted to local search by password");
    },
    sqlEqual: (value, sqlPrefix, id, knex, columnName) => {
        if (!columnName) {
            return knex.raw("?? = crypt(?, ??)", [
                sqlPrefix + id,
                value,
                sqlPrefix + id,
            ]);
        }
        return knex.raw("?? = crypt(?, ??) AS ??", [
            sqlPrefix + id,
            value,
            sqlPrefix + id,
            columnName,
        ]);
    },
    sqlLocalEqual: (value, sqlPrefix, id, data) => {
        if (value === null) {
            return data[sqlPrefix + id] === null;
        }
        else if (!data[sqlPrefix + id]) {
            return false;
        }
        return bcrypt_1.default.compareSync(value, data[sqlPrefix + id]);
    },
    // validates just the length
    validate: (s) => {
        if (typeof s !== "string") {
            return PropertyDefinition_1.PropertyInvalidReason.INVALID_VALUE;
        }
        else if (s.length > constants_1.MAX_STRING_LENGTH) {
            return PropertyDefinition_1.PropertyInvalidReason.TOO_LARGE;
        }
        return null;
    },
    searchable: false,
    // i18n attributes required
    i18n: {
        base: constants_1.CLASSIC_BASE_I18N,
        optional: constants_1.CLASSIC_OPTIONAL_I18N,
        tooLargeErrorInclude: true,
    },
};
exports.default = typeValue;
