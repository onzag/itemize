"use strict";
/**
 * Contains the unit type description
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const constants_1 = require("../../../../../../constants");
const PropertyDefinition_1 = require("../../PropertyDefinition");
const search_interfaces_1 = require("../search-interfaces");
/**
 * The description of the unit type as it behaves in the app
 */
const typeValue = {
    gql: "PROPERTY_TYPE__Unit",
    gqlFields: {
        value: {
            type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat),
        },
        unit: {
            type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        },
        normalizedValue: {
            type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat),
        },
        normalizedUnit: {
            type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        },
    },
    sql: (arg) => {
        return {
            [arg.prefix + arg.id + "_VALUE"]: {
                type: "float",
            },
            [arg.prefix + arg.id + "_UNIT"]: {
                type: "text",
            },
            [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: {
                type: "float",
            },
            [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: {
                type: "text",
            },
        };
    },
    sqlIn: (arg) => {
        if (arg.value === null) {
            return {
                [arg.prefix + arg.id + "_VALUE"]: null,
                [arg.prefix + arg.id + "_UNIT"]: null,
                [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: null,
                [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: null,
            };
        }
        const value = arg.value;
        return {
            [arg.prefix + arg.id + "_VALUE"]: value.value,
            [arg.prefix + arg.id + "_UNIT"]: value.unit,
            [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: value.normalizedValue,
            [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: value.normalizedUnit,
        };
    },
    sqlOut: (arg) => {
        const result = {
            value: arg.row[arg.prefix + arg.id + "_VALUE"],
            unit: arg.row[arg.prefix + arg.id + "_UNIT"],
            normalizedValue: arg.row[arg.prefix + arg.id + "_NORMALIZED_VALUE"],
            normalizedUnit: arg.row[arg.prefix + arg.id + "_NORMALIZED_UNIT"],
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
            const exactAsUnit = arg.args[exactName];
            arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_UNIT", exactAsUnit.normalizedUnit);
            arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_VALUE", exactAsUnit.normalizedValue);
        }
        else if (arg.args[exactName] === null) {
            arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_VALUE", null);
            searchedByIt = true;
        }
        if (typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null) {
            const fromAsUnit = arg.args[fromName];
            arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_UNIT", fromAsUnit.normalizedUnit);
            arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_VALUE", ">=", fromAsUnit.normalizedValue);
            searchedByIt = true;
        }
        if (typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null) {
            const toAsUnit = arg.args[toName];
            arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_UNIT", toAsUnit.normalizedUnit);
            arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_VALUE", "<=", toAsUnit.normalizedValue);
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
        if (arg.direction === "desc") {
            return arg.b.normalizedValue -
                arg.a.normalizedValue;
        }
        return arg.a.normalizedValue -
            arg.b.normalizedValue;
    },
    localSearch: (arg) => {
        // item is deleted
        if (!arg.gqlValue) {
            return false;
        }
        // item is blocked
        if (arg.gqlValue.DATA === null) {
            return false;
        }
        const fromName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
        const toName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
        const exactName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;
        const usefulArgs = arg.include ? arg.args[constants_1.INCLUDE_PREFIX + arg.include.getId()] || {} : arg.args;
        const propertyValue = arg.include ? arg.gqlValue.DATA[arg.include.getId()][arg.id] : arg.gqlValue.DATA[arg.id];
        const conditions = [];
        if (typeof usefulArgs[exactName] !== "undefined") {
            if (usefulArgs[exactName] === null) {
                conditions.push(propertyValue.normalizedValue === null);
            }
            else {
                conditions.push(propertyValue.normalizedValue === usefulArgs[exactName].normalizedValue &&
                    propertyValue.normalizedUnit === usefulArgs[exactName].normalizedUnit);
            }
        }
        if (typeof usefulArgs[fromName] !== "undefined" && usefulArgs[fromName] !== null) {
            conditions.push(propertyValue.normalizedValue >= usefulArgs[fromName].normalizedValue &&
                propertyValue.normalizedUnit === usefulArgs[fromName].normalizedUnit);
        }
        if (typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null) {
            conditions.push(propertyValue.normalizedValue <= usefulArgs[toName].normalizedValue &&
                propertyValue.normalizedUnit === usefulArgs[toName].normalizedUnit);
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
            [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: arg.value.normalizedUnit,
            [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: arg.value.normalizedValue,
        };
    },
    sqlSSCacheEqual: (arg) => {
        if (arg.value === null) {
            return arg.row[arg.prefix + arg.id + "_NORMALIZED_VALUE"] === null;
        }
        const value = arg.value;
        return arg.row[arg.prefix + arg.id + "_NORMALIZED_VALUE"] === value.normalizedValue &&
            arg.row[arg.prefix + arg.id + "_NORMALIZED_UNIT"] === value.normalizedUnit;
    },
    sqlBtreeIndexable: (arg) => {
        return [arg.prefix + arg.id + "_NORMALIZED_UNIT", arg.prefix + arg.id + "_NORMALIZED_VALUE"];
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
        return a.value === b.value && a.unit === b.unit;
    },
    supportedSubtypes: constants_1.UNIT_SUBTYPES,
    validate: (l) => {
        if (typeof l.value !== "number" ||
            typeof l.unit !== "string" ||
            typeof l.normalizedValue !== "number" ||
            typeof l.normalizedUnit !== "string") {
            return PropertyDefinition_1.PropertyInvalidReason.INVALID_VALUE;
        }
        if (isNaN(l.value) || isNaN(l.normalizedValue)) {
            return PropertyDefinition_1.PropertyInvalidReason.INVALID_VALUE;
        }
        if (l.value > constants_1.MAX_SUPPORTED_REAL) {
            return PropertyDefinition_1.PropertyInvalidReason.TOO_LARGE;
        }
        else if (l.value < constants_1.MIN_SUPPORTED_REAL) {
            return PropertyDefinition_1.PropertyInvalidReason.TOO_SMALL;
        }
        const splittedDecimals = l.value.toString().split(".");
        if (!splittedDecimals[1] || splittedDecimals[1].length <= constants_1.MAX_DECIMAL_COUNT) {
            return null;
        }
        return PropertyDefinition_1.PropertyInvalidReason.TOO_MANY_DECIMALS;
    },
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
    sqlMantenience: null,
    specialProperties: [
        {
            name: "unit",
            type: "string",
            required: true,
        },
        {
            name: "imperialUnit",
            type: "string",
            required: true,
        },
        {
            name: "lockUnitsToPrimaries",
            type: "boolean",
        },
        {
            name: "initialPrefill",
            type: "number",
        },
    ],
};
exports.default = typeValue;
