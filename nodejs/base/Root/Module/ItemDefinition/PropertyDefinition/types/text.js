"use strict";
/**
 * Contains the text type description
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
const text_1 = require("../sql/text");
/**
 * The type describes how the text type behaves in the app, this includes rich text
 */
const typeValue = {
    gql: graphql_1.GraphQLString,
    nullableDefault: "",
    supportedSubtypes: ["html", "plain"],
    specialProperties: [
        {
            name: "mediaProperty",
            type: "string",
        },
        {
            name: "supportsVideos",
            type: "boolean",
        },
        {
            name: "supportsImages",
            type: "boolean",
        },
        {
            name: "supportsFiles",
            type: "boolean",
        },
    ],
    sql: text_1.textSQL,
    sqlIn: text_1.textSQLIn,
    sqlOut: sql_1.standardSQLOutFn,
    sqlSearch: text_1.textSQLSearch,
    sqlStrSearch: text_1.textSQLStrSearch,
    sqlBtreeIndexable: text_1.textSQLBtreeIndexable,
    sqlMantenience: null,
    localSearch: (arg) => {
        // item is deleted
        if (!arg.gqlValue) {
            return false;
        }
        // item is blocked
        if (arg.gqlValue.DATA === null) {
            return false;
        }
        const searchName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.SEARCH + arg.id;
        const usefulArgs = arg.include ? arg.args[constants_1.INCLUDE_PREFIX + arg.include.getId()] || {} : arg.args;
        if (typeof usefulArgs[searchName] !== "undefined" && usefulArgs[searchName] !== null) {
            const searchMatch = usefulArgs[searchName];
            const propertyValue = arg.include ? arg.gqlValue.DATA[arg.include.getId()][arg.id] : arg.gqlValue.DATA[arg.id];
            if (propertyValue === null) {
                return false;
            }
            // this is the FTS in the client side, it's not good, it's not meant
            // to be good, but it gets the job done
            return propertyValue.includes(searchMatch);
        }
        return true;
    },
    localStrSearch: (arg) => {
        // item is deleted
        if (!arg.gqlValue) {
            return false;
        }
        // item is blocked
        if (arg.gqlValue.DATA === null) {
            return false;
        }
        if (arg.search) {
            const propertyValue = arg.include ? arg.gqlValue.DATA[arg.include.getId()][arg.id] : arg.gqlValue.DATA[arg.id];
            // this is the simple FTS that you get in the client
            return propertyValue.includes(arg.search);
        }
        return true;
    },
    sqlEqual: sql_1.standardSQLEqualFn,
    sqlSSCacheEqual: local_sql_1.standardSQLSSCacheEqualFn,
    localEqual: local_sql_1.standardLocalEqual,
    sqlOrderBy: text_1.textSQLOrderBy,
    localOrderBy: () => {
        // can't sort due to ranking limitations
        return 0;
    },
    // validates the text, texts don't support json value
    validate: (s, subtype) => {
        if (typeof s !== "string") {
            return PropertyDefinition_1.PropertyInvalidReason.INVALID_VALUE;
        }
        return null;
    },
    // the max length for the text
    // whether it is searchable or not
    searchable: true,
    searchInterface: search_interfaces_1.PropertyDefinitionSearchInterfacesType.TEXT,
    allowsMinMaxLengthDefined: true,
    // i18n attributes
    i18n: {
        base: constants_1.CLASSIC_BASE_I18N,
        optional: constants_1.CLASSIC_OPTIONAL_I18N,
        searchBase: constants_1.CLASSIC_SEARCH_BASE_I18N,
        searchOptional: constants_1.CLASSIC_SEARCH_OPTIONAL_I18N,
        tooLargeErrorInclude: true,
    },
};
exports.default = typeValue;
