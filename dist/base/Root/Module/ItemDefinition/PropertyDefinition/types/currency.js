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
/**
 * The type of a curreny type specifies how it behaves in the app
 */
const typeValue = {
    gql: "PROPERTY_TYPE__Currency",
    gqlFields: {
        value: {
            type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat),
        },
        currency: {
            type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        },
    },
    sql: (sqlPrefix, id) => {
        return {
            [sqlPrefix + id + "_VALUE"]: { type: "float" },
            [sqlPrefix + id + "_CURRENCY"]: { type: "text" },
        };
    },
    sqlIn: (value, sqlPrefix, id) => {
        if (value === null) {
            return {
                [sqlPrefix + id + "_VALUE"]: null,
                [sqlPrefix + id + "_CURRENCY"]: null,
            };
        }
        return {
            [sqlPrefix + id + "_VALUE"]: value.value,
            [sqlPrefix + id + "_CURRENCY"]: value.currency,
        };
    },
    sqlOut: (data, sqlPrefix, id) => {
        const result = {
            value: data[sqlPrefix + id + "_VALUE"],
            currency: data[sqlPrefix + id + "_CURRENCY"],
        };
        if (result.value === null) {
            return null;
        }
        return result;
    },
    sqlSearch: (args, sqlPrefix, id, knexBuilder) => {
        const fromName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.FROM + id;
        const toName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.TO + id;
        const exactName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.EXACT + id;
        if (typeof args[exactName] !== "undefined" && args[exactName] !== null) {
            const exactArg = args[exactName];
            knexBuilder.andWhere(sqlPrefix + id + "_CURRENCY", exactArg.currency);
            knexBuilder.andWhere(sqlPrefix + id + "_VALUE", exactArg.value);
        }
        else if (args[exactName] === null) {
            knexBuilder.andWhere(sqlPrefix + id + "_VALUE", null);
        }
        if (typeof args[fromName] !== "undefined" && args[fromName] !== null) {
            const fromArg = args[fromName];
            knexBuilder.andWhere(sqlPrefix + id + "_CURRENCY", fromArg.currency);
            knexBuilder.andWhere(sqlPrefix + id + "_VALUE", ">=", fromArg.value);
        }
        if (typeof args[toName] !== "undefined" && args[toName] !== null) {
            const toArg = args[toName];
            knexBuilder.andWhere(sqlPrefix + id + "_CURRENCY", toArg.currency);
            knexBuilder.andWhere(sqlPrefix + id + "_VALUE", "<=", toArg.value);
        }
    },
    localSearch: (args, rawData, id, includeId) => {
        // item is deleted
        if (!rawData) {
            return false;
        }
        // item is blocked
        if (rawData.DATA === null) {
            return false;
        }
        const fromName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.FROM + id;
        const toName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.TO + id;
        const exactName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.EXACT + id;
        const usefulArgs = includeId ? args[constants_1.INCLUDE_PREFIX + includeId] || {} : args;
        const propertyValue = includeId ? rawData.DATA[includeId][id] : rawData.DATA[id];
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
            conditions.push(propertyValue.value >= usefulArgs[fromName].value &&
                propertyValue.currency === usefulArgs[fromName].currency);
        }
        if (typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null) {
            conditions.push(propertyValue.value <= usefulArgs[toName].value &&
                propertyValue.currency === usefulArgs[toName].currency);
        }
        if (!conditions.length) {
            return true;
        }
        else {
            return conditions.every((c) => c);
        }
    },
    sqlEqual: (value, sqlPrefix, id, knex, columnName) => {
        if (!columnName) {
            return {
                [sqlPrefix + id + "_CURRENCY"]: value.currency,
                [sqlPrefix + id + "_VALUE"]: value.value,
            };
        }
        return knex.raw("?? = ? AND ?? = ? AS ??", [
            sqlPrefix + id + "_CURRENCY",
            value.currency,
            sqlPrefix + id + "_VALUE",
            value.value,
            columnName,
        ]);
    },
    sqlLocalEqual: (value, sqlPrefix, id, data) => {
        if (value === null) {
            return data[sqlPrefix + id + "_VALUE"] === value;
        }
        return data[sqlPrefix + id + "_VALUE"] === value.value &&
            data[sqlPrefix + id + "_CURRENCY"] === value.currency;
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
        const splittedDecimals = l.value.toString().split(".");
        const currencyData = imported_resources_1.currencies[l.currency];
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
