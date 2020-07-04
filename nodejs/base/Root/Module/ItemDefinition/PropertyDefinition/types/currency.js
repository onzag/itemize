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
    sql: (arg) => {
        return {
            [arg.prefix + arg.id + "_VALUE"]: { type: "float" },
            [arg.prefix + arg.id + "_CURRENCY"]: { type: "text" },
            [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: { type: "float" },
        };
    },
    sqlIn: (arg) => {
        const value = arg.value;
        if (arg.value === null) {
            return {
                [arg.prefix + arg.id + "_VALUE"]: null,
                [arg.prefix + arg.id + "_CURRENCY"]: null,
                [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: null,
            };
        }
        const factor = arg.serverData[constants_1.CURRENCY_FACTORS_IDENTIFIER][value.currency];
        const normalized = factor ? (1 / factor) * value.value : null;
        return {
            [arg.prefix + arg.id + "_VALUE"]: value.value,
            [arg.prefix + arg.id + "_CURRENCY"]: value.currency,
            [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: normalized,
        };
    },
    sqlOut: (arg) => {
        const result = {
            value: arg.row[arg.prefix + arg.id + "_VALUE"],
            currency: arg.row[arg.prefix + arg.id + "_CURRENCY"],
        };
        if (result.value === null) {
            return null;
        }
        return result;
    },
    sqlSearch: (arg) => {
        const fromName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
        const toName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
        const exactName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;
        let searchedByIt = false;
        if (typeof arg.args[exactName] !== "undefined" && arg.args[exactName] !== null) {
            const exactArg = arg.args[exactName];
            arg.knexBuilder.andWhere(arg.prefix + arg.id + "_CURRENCY", exactArg.currency);
            arg.knexBuilder.andWhere(arg.prefix + arg.id + "_VALUE", exactArg.value);
        }
        else if (arg.args[exactName] === null) {
            arg.knexBuilder.andWhere(arg.prefix + arg.id + "_VALUE", null);
            searchedByIt = true;
        }
        if (typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null) {
            const fromArg = arg.args[fromName];
            const factor = arg.serverData[constants_1.CURRENCY_FACTORS_IDENTIFIER][fromArg.currency];
            const normalized = factor ? factor * fromArg.value : null;
            arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_VALUE", ">=", normalized);
            searchedByIt = true;
        }
        if (typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null) {
            const toArg = arg.args[toName];
            const factor = arg.serverData[constants_1.CURRENCY_FACTORS_IDENTIFIER][toArg.currency];
            const normalized = factor ? factor * toArg.value : null;
            arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_VALUE", "<=", normalized);
            searchedByIt = true;
        }
        return searchedByIt;
    },
    sqlStrSearch: null,
    localStrSearch: null,
    sqlOrderBy: (arg) => {
        return [arg.prefix + arg.id + "_NORMALIZED_VALUE", arg.direction, arg.nulls];
    },
    localOrderBy: (arg) => {
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
    sqlBtreeIndexable: (arg) => {
        return [arg.prefix + arg.id + "_CURRENCY", arg.prefix + arg.id + "_NORMALIZED_VALUE"];
    },
    sqlMantenience: (arg) => {
        const valueId = arg.prefix + arg.id + "_VALUE";
        const normalizedValueId = arg.prefix + arg.id + "_NORMALIZED_VALUE";
        const currencyId = arg.prefix + arg.id + "_CURRENCY";
        const asConversionRule = arg.prefix + arg.id + "_CURRENCY_FACTORS";
        return {
            columnToSet: normalizedValueId,
            setColumnToRaw: ["??*??.??", [valueId, asConversionRule, "factor"]],
            from: constants_1.CURRENCY_FACTORS_IDENTIFIER,
            fromAs: asConversionRule,
            whereRaw: ["?? is not NULL AND ??.?? = ??", [valueId, asConversionRule, "code", currencyId]],
            updateConditionRaw: ["??*??.?? > 0.5", [valueId, asConversionRule, "factor"]],
        };
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
    sqlEqual: (arg) => {
        return {
            [arg.prefix + arg.id + "_CURRENCY"]: arg.value.currency,
            [arg.prefix + arg.id + "_VALUE"]: arg.value.value,
        };
    },
    sqlSSCacheEqual: (arg) => {
        if (arg.value === null) {
            return arg.row[arg.prefix + arg.id + "_VALUE"] === null;
        }
        return arg.row[arg.prefix + arg.id + "_VALUE"] === arg.value.value &&
            arg.row[arg.prefix + arg.id + "_CURRENCY"] === arg.value.currency;
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
