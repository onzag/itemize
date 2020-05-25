"use strict";
/**
 * Contains the boolean type description
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const sql_1 = require("../sql");
const local_sql_1 = require("../local-sql");
const constants_1 = require("../../../../../../constants");
const search_interfaces_1 = require("../search-interfaces");
const local_search_1 = require("../local-search");
/**
 * The that specifies how a boolean behaves in the app
 */
const typeValue = {
    // a boolean type can be written as a boolean
    json: "boolean",
    gql: graphql_1.GraphQLBoolean,
    sql: sql_1.getStandardSQLFnFor && sql_1.getStandardSQLFnFor("boolean"),
    sqlIn: sql_1.stardardSQLInFn,
    sqlOut: sql_1.standardSQLOutFn,
    sqlSearch: sql_1.standardSQLSearchFnExactAndRange,
    sqlEqual: sql_1.standardSQLEqualFn,
    sqlLocalEqual: local_sql_1.standardSQLLocalEqualFn,
    sqlBtreeIndexable: sql_1.standardSQLBtreeIndexable,
    sqlMantenience: null,
    localSearch: local_search_1.standardLocalSearchExactAndRange,
    localEqual: local_sql_1.standardLocalEqual,
    // it is searchable by default
    searchable: true,
    searchInterface: search_interfaces_1.PropertyDefinitionSearchInterfacesType.EXACT,
    // the i18n attributes
    i18n: {
        base: constants_1.REDUCED_BASE_I18N,
        optional: constants_1.CLASSIC_OPTIONAL_I18N,
        searchBase: constants_1.REDUCED_SEARCH_BASE_I18N,
        searchOptional: constants_1.CLASSIC_SEARCH_OPTIONAL_I18N,
    },
};
exports.default = typeValue;
