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
    sql: (sqlPrefix, id) => {
        return {
            [sqlPrefix + id + "_VALUE"]: {
                type: "float",
            },
            [sqlPrefix + id + "_UNIT"]: {
                type: "text",
            },
            [sqlPrefix + id + "_NORMALIZED_VALUE"]: {
                type: "float",
            },
            [sqlPrefix + id + "_NORMALIZED_UNIT"]: {
                type: "text",
            },
        };
    },
    sqlIn: (value, sqlPrefix, id) => {
        if (value === null) {
            return {
                [sqlPrefix + id + "_VALUE"]: null,
                [sqlPrefix + id + "_UNIT"]: null,
                [sqlPrefix + id + "_NORMALIZED_VALUE"]: null,
                [sqlPrefix + id + "_NORMALIZED_UNIT"]: null,
            };
        }
        return {
            [sqlPrefix + id + "_VALUE"]: value.value,
            [sqlPrefix + id + "_UNIT"]: value.unit,
            [sqlPrefix + id + "_NORMALIZED_VALUE"]: value.normalizedValue,
            [sqlPrefix + id + "_NORMALIZED_UNIT"]: value.normalizedUnit,
        };
    },
    sqlOut: (data, sqlPrefix, id) => {
        const result = {
            value: data[sqlPrefix + id + "_VALUE"],
            unit: data[sqlPrefix + id + "_UNIT"],
            normalizedValue: data[sqlPrefix + id + "_NORMALIZED_VALUE"],
            normalizedUnit: data[sqlPrefix + id + "_NORMALIZED_UNIT"],
        };
        if (result.value === null) {
            return null;
        }
        return result;
    },
    sqlSearch: (data, sqlPrefix, id, knexBuilder) => {
        const fromName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.FROM + id;
        const toName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.TO + id;
        const exactName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.EXACT + id;
        if (typeof data[exactName] !== "undefined" && data[exactName] !== null) {
            const exactAsUnit = data[exactName];
            knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_UNIT", exactAsUnit.normalizedUnit);
            knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_VALUE", exactAsUnit.normalizedValue);
        }
        else if (data[exactName] === null) {
            knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_VALUE", null);
        }
        if (typeof data[fromName] !== "undefined" && data[fromName] !== null) {
            const fromAsUnit = data[fromName];
            knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_UNIT", fromAsUnit.normalizedUnit);
            knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_VALUE", ">=", fromAsUnit.normalizedValue);
        }
        if (typeof data[toName] !== "undefined" && data[toName] !== null) {
            const toAsUnit = data[toName];
            knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_UNIT", toAsUnit.normalizedUnit);
            knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_VALUE", "<=", toAsUnit.normalizedValue);
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
    sqlEqual: (value, sqlPrefix, id, isCaseInsensitive, knex, columnName) => {
        if (!columnName) {
            return {
                [sqlPrefix + id + "_NORMALIZED_UNIT"]: value.normalizedUnit,
                [sqlPrefix + id + "_NORMALIZED_VALUE"]: value.normalizedValue,
            };
        }
        return knex.raw("?? = ? AND ?? = ? AS ??", [
            sqlPrefix + id + "_NORMALIZED_UNIT",
            value.normalizedUnit,
            sqlPrefix + id + "_NORMALIZED_VALUE",
            value.normalizedValue,
            columnName,
        ]);
    },
    sqlLocalEqual: (value, sqlPrefix, id, data) => {
        if (value === null) {
            return data[sqlPrefix + id + "_NORMALIZED_VALUE"] === value;
        }
        return data[sqlPrefix + id + "_NORMALIZED_VALUE"] === value.normalizedValue &&
            data[sqlPrefix + id + "_NORMALIZED_UNIT"] === value.normalizedUnit;
    },
    localEqual: (a, b) => {
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
