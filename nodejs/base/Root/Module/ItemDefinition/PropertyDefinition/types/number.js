"use strict";
/**
 * Contains the number type description
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
 * The type of the number describe how numbers behave in the app
 */
const typeValue = {
    // a number is just a number can be integer or decimal
    json: "number",
    gql: graphql_1.GraphQLFloat,
    sql: sql_1.getStandardSQLFnFor && sql_1.getStandardSQLFnFor("float"),
    sqlIn: sql_1.stardardSQLInFn,
    sqlOut: sql_1.standardSQLOutFn,
    sqlSearch: sql_1.standardSQLSearchFnExactAndRange,
    sqlEqual: sql_1.standardSQLEqualFn,
    sqlLocalEqual: local_sql_1.standardSQLLocalEqualFn,
    sqlBtreeIndexable: sql_1.standardSQLBtreeIndexable,
    sqlMantenience: null,
    localSearch: local_search_1.standardLocalSearchExactAndRange,
    localEqual: local_sql_1.standardLocalEqual,
    // the validator
    validate: (n) => {
        if (isNaN(n)) {
            return PropertyDefinition_1.PropertyInvalidReason.INVALID_VALUE;
        }
        if (n > constants_1.MAX_SUPPORTED_REAL) {
            return PropertyDefinition_1.PropertyInvalidReason.TOO_LARGE;
        }
        else if (n < constants_1.MIN_SUPPORTED_REAL) {
            return PropertyDefinition_1.PropertyInvalidReason.TOO_SMALL;
        }
        const splittedDecimals = n.toString().split(".");
        if (!splittedDecimals[1] || splittedDecimals[1].length <= constants_1.MAX_DECIMAL_COUNT) {
            return null;
        }
        return PropertyDefinition_1.PropertyInvalidReason.TOO_MANY_DECIMALS;
    },
    // it is searchable
    searchable: true,
    searchInterface: search_interfaces_1.PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    allowsMinMaxDefined: true,
    allowsMaxDecimalCountDefined: true,
    // i18n attributes required
    i18n: {
        base: constants_1.CLASSIC_BASE_I18N,
        optional: constants_1.CLASSIC_OPTIONAL_I18N,
        searchBase: constants_1.CLASSIC_SEARCH_BASE_I18N,
        searchOptional: constants_1.CLASSIC_SEARCH_OPTIONAL_I18N,
        searchRange: constants_1.CLASSIC_SEARCH_RANGED_I18N,
        searchRangeOptional: constants_1.CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
        tooSmallErrorInclude: true,
        tooLargeErrorInclude: true,
        tooManyDecimalsErrorInclude: true,
    },
};
exports.default = typeValue;
