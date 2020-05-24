"use strict";
/**
 * Contains the date type description
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const sql_1 = require("../sql");
const local_sql_1 = require("../local-sql");
const PropertyDefinition_1 = require("../../PropertyDefinition");
const constants_1 = require("../../../../../../constants");
const moment_1 = __importDefault(require("moment"));
const search_interfaces_1 = require("../search-interfaces");
const local_search_1 = require("../local-search");
/**
 * The type specifies how a date behaves in the app
 */
const typeValue = {
    gql: graphql_1.GraphQLString,
    searchable: true,
    searchInterface: search_interfaces_1.PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    sql: sql_1.getStandardSQLFnFor && sql_1.getStandardSQLFnFor("date"),
    sqlIn: sql_1.stardardSQLInFn,
    sqlOut: sql_1.standardSQLOutFn,
    sqlSearch: sql_1.standardSQLSearchFnExactAndRange,
    sqlEqual: sql_1.standardSQLEqualFn,
    sqlLocalEqual: local_sql_1.standardSQLLocalEqualFn,
    sqlMantenience: null,
    localSearch: local_search_1.dateLocalSearchExactAndRange.bind(null, constants_1.DATE_FORMAT),
    localEqual: local_sql_1.standardLocalEqual,
    validate: (d) => {
        if (d === "Invalid Date") {
            return PropertyDefinition_1.PropertyInvalidReason.INVALID_VALUE;
        }
        const dateForm = moment_1.default(d, constants_1.DATE_FORMAT);
        if (!dateForm.isValid() || dateForm.format(constants_1.DATE_FORMAT) !== d) {
            return PropertyDefinition_1.PropertyInvalidReason.INVALID_VALUE;
        }
        return null;
    },
    i18n: {
        base: constants_1.CLASSIC_BASE_I18N,
        optional: constants_1.CLASSIC_OPTIONAL_I18N,
        searchBase: constants_1.CLASSIC_SEARCH_BASE_I18N,
        searchOptional: constants_1.CLASSIC_SEARCH_OPTIONAL_I18N,
        searchRange: constants_1.CLASSIC_SEARCH_RANGED_I18N,
        searchRangeOptional: constants_1.CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
    },
};
exports.default = typeValue;
