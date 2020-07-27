"use strict";
/**
 * Contains the password type description
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const sql_1 = require("../sql");
const PropertyDefinition_1 = require("../../PropertyDefinition");
const constants_1 = require("../../../../../../constants");
const password_1 = require("../sql/password");
/**
 * The behaviour of passwords is specified by this type
 */
const typeValue = {
    gql: graphql_1.GraphQLString,
    nullableDefault: "",
    sql: sql_1.getStandardSQLFnFor && sql_1.getStandardSQLFnFor("text", "pgcrypto"),
    sqlIn: password_1.passwordSQLIn,
    sqlOut: sql_1.standardSQLOutFn,
    sqlSearch: password_1.passwordSQLSearch,
    sqlStrSearch: null,
    localStrSearch: null,
    sqlOrderBy: null,
    localOrderBy: null,
    localSearch: () => {
        throw new Error("Attempted to local search by password");
    },
    localEqual: () => {
        throw new Error("Attempted to local equal a password");
    },
    sqlEqual: password_1.passwordSQLEqual,
    sqlSSCacheEqual: password_1.passwordSQLSSEqual,
    sqlBtreeIndexable: () => {
        throw new Error("Attempted to btree index a password, this might mean a files value is in request limiters, don't do that");
    },
    sqlMantenience: null,
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
