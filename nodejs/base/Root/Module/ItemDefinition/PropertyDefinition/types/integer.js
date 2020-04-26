"use strict";
/**
 * Contains the integer type description
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const sql_1 = require("../sql");
const local_sql_1 = require("../local-sql");
const PropertyDefinition_1 = require("../../PropertyDefinition");
const constants_1 = require("../../../../../../constants");
const search_interfaces_1 = require("../search-interfaces");
const local_search_1 = require("../local-search");
/**
 * The type defines the behaviour of integers in the app
 */
const typeValue = {
    // an integer is represented as a number
    json: "number",
    gql: graphql_1.GraphQLInt,
    sql: sql_1.getStandardSQLFnFor && sql_1.getStandardSQLFnFor("integer"),
    sqlIn: sql_1.stardardSQLInFn,
    sqlOut: sql_1.standardSQLOutFn,
    sqlSearch: sql_1.standardSQLSearchFnExactAndRange,
    sqlEqual: sql_1.standardSQLEqualFn,
    sqlLocalEqual: local_sql_1.standardSQLLocalEqualFn,
    localEqual: local_sql_1.standardLocalEqual,
    localSearch: local_search_1.standardLocalSearchExactAndRange,
    // it gotta be validated to check it's a number
    validate: (n) => {
        if (isNaN(n) || !Number.isInteger(n)) {
            return PropertyDefinition_1.PropertyInvalidReason.INVALID_VALUE;
        }
        else if (n > constants_1.MAX_SUPPORTED_INTEGER) {
            return PropertyDefinition_1.PropertyInvalidReason.TOO_LARGE;
        }
        else if (n < constants_1.MIN_SUPPORTED_INTEGER) {
            return PropertyDefinition_1.PropertyInvalidReason.TOO_SMALL;
        }
        return null;
    },
    // it is searchable by exact and range value
    searchable: true,
    searchInterface: search_interfaces_1.PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    allowsMinMaxDefined: true,
    // i18n attributes
    i18n: {
        base: constants_1.CLASSIC_BASE_I18N,
        optional: constants_1.CLASSIC_OPTIONAL_I18N,
        searchBase: constants_1.CLASSIC_SEARCH_BASE_I18N,
        searchOptional: constants_1.CLASSIC_SEARCH_OPTIONAL_I18N,
        searchRange: constants_1.CLASSIC_SEARCH_RANGED_I18N,
        searchRangeOptional: constants_1.CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
        tooSmallErrorInclude: true,
        tooLargeErrorInclude: true,
    },
};
exports.default = typeValue;
