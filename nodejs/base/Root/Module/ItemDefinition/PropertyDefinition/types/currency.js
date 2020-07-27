"use strict";
/**
 * Contains the currency type description
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const imported_resources_1 = require("../../../../../../imported-resources");
const graphql_1 = require("graphql");
const PropertyDefinition_1 = require("../../PropertyDefinition");
const constants_1 = require("../../../../../../constants");
const search_interfaces_1 = require("../search-interfaces");
const currency_1 = require("../sql/currency");
/**
 * The type of a curreny type specifies how it behaves in the app
 */
const typeValue = {
    // the graphql is a new type
    gql: "PROPERTY_TYPE__Currency",
    // it contains the following fields, note how they
    // are conditional due to the fact this goes to the client side as well
    gqlFields: {
        value: {
            type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat),
        },
        currency: {
            type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        },
    },
    // from the sql file to save space as they are not
    // used in the client side
    sql: currency_1.currencySQL,
    sqlIn: currency_1.currencySQLIn,
    sqlOut: currency_1.currencySQLOut,
    sqlSearch: currency_1.currencySQLSearch,
    sqlStrSearch: null,
    localStrSearch: null,
    sqlOrderBy: currency_1.currencySQLOrderBy,
    sqlBtreeIndexable: currency_1.currencySQLBtreeIndexable,
    sqlMantenience: currency_1.currencySQLMantenience,
    sqlEqual: currency_1.currencySQLEqual,
    sqlSSCacheEqual: currency_1.currencySQLSSCacheEqual,
    // local order by used in the cached searches
    localOrderBy: (arg) => {
        // compare a and b, nulls are equal
        if (arg.a === null && arg.b === null) {
            return 0;
        }
        else if (arg.a === null) {
            return arg.nulls === "last" ? 1 : -1;
        }
        else if (arg.b === null) {
            return arg.nulls === "last" ? -1 : 1;
        }
        // locally currencies are ignored because it's too expensive
        // for the client, it's possible to read server data here nevertheless
        const a = arg.a;
        const b = arg.b;
        if (arg.direction === "desc") {
            return b.value - a.value;
        }
        return a.value - b.value;
    },
    localSearch: (arg) => {
        // item is deleted
        if (!arg.gqlValue) {
            return false;
        }
        // item is blocked
        if (!arg.gqlValue.DATA === null) {
            return false;
        }
        const fromName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
        const toName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
        const exactName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;
        const includeId = arg.include ? arg.include.getId() : null;
        const usefulArgs = includeId ? arg.args[constants_1.INCLUDE_PREFIX + includeId] || {} : arg.args;
        const propertyValue = includeId ? arg.gqlValue.DATA[includeId][arg.id] : arg.gqlValue.DATA[arg.id];
        const conditions = [];
        if (typeof usefulArgs[exactName] !== "undefined") {
            if (usefulArgs[exactName] === null) {
                conditions.push(propertyValue.value === null);
            }
            else {
                conditions.push(propertyValue.value === usefulArgs[exactName].value &&
                    propertyValue.currency === usefulArgs[exactName].currency);
            }
        }
        if (typeof usefulArgs[fromName] !== "undefined" && usefulArgs[fromName] !== null) {
            conditions.push(propertyValue.currency === usefulArgs[fromName].currency &&
                propertyValue.value >= usefulArgs[fromName].value);
        }
        if (typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null) {
            conditions.push(propertyValue.currency === usefulArgs[fromName].currency &&
                propertyValue.value <= usefulArgs[fromName].value);
        }
        if (!conditions.length) {
            return true;
        }
        else {
            return conditions.every((c) => c);
        }
    },
    localEqual: (arg) => {
        const a = arg.a;
        const b = arg.b;
        if (a === b) {
            return true;
        }
        else if (a === null || b === null) {
            return false;
        }
        return a.value === b.value && a.currency === b.currency;
    },
    validate: (l) => {
        if (typeof l.value !== "number" ||
            typeof l.currency !== "string") {
            return PropertyDefinition_1.PropertyInvalidReason.INVALID_VALUE;
        }
        if (isNaN(l.value)) {
            return PropertyDefinition_1.PropertyInvalidReason.INVALID_VALUE;
        }
        if (l.value > constants_1.MAX_SUPPORTED_REAL) {
            return PropertyDefinition_1.PropertyInvalidReason.TOO_LARGE;
        }
        else if (l.value < 0) {
            return PropertyDefinition_1.PropertyInvalidReason.TOO_SMALL;
        }
        const currencyData = imported_resources_1.currencies[l.currency];
        if (!currencyData) {
            return PropertyDefinition_1.PropertyInvalidReason.INVALID_VALUE;
        }
        const splittedDecimals = l.value.toString().split(".");
        const currencyDefinitionDecimals = currencyData.decimals;
        if (!splittedDecimals[1] ||
            splittedDecimals[1].length <= currencyDefinitionDecimals) {
            if (currencyData.rounding && !Number.isInteger((l.value * 10 ** 2) / (currencyData.rounding * 10 ** 2))) {
                return PropertyDefinition_1.PropertyInvalidReason.INVALID_VALUE;
            }
            return null;
        }
        return PropertyDefinition_1.PropertyInvalidReason.TOO_MANY_DECIMALS;
    },
    // it is searchable
    searchable: true,
    searchInterface: search_interfaces_1.PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    // i18n attributes required
    i18n: {
        base: constants_1.CLASSIC_BASE_I18N,
        optional: constants_1.CLASSIC_OPTIONAL_I18N,
        searchBase: constants_1.CLASSIC_SEARCH_BASE_I18N,
        searchOptional: constants_1.CLASSIC_SEARCH_OPTIONAL_I18N,
        searchRange: constants_1.CLASSIC_SEARCH_RANGED_I18N,
        searchRangeOptional: constants_1.CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
        tooLargeErrorInclude: true,
        tooManyDecimalsErrorInclude: true,
    },
};
exports.default = typeValue;
