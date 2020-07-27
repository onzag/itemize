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
const unit_1 = require("../sql/unit");
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
    sql: unit_1.unitSQL,
    sqlIn: unit_1.unitSQLIn,
    sqlOut: unit_1.unitSQLOut,
    sqlSearch: unit_1.unitSQLSearch,
    sqlStrSearch: null,
    localStrSearch: null,
    sqlOrderBy: unit_1.unitSQLOrderBy,
    sqlEqual: unit_1.unitSQLEqual,
    sqlSSCacheEqual: unit_1.unitSQLSSCacheEqual,
    sqlBtreeIndexable: unit_1.unitSQLBtreeIndexable,
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
