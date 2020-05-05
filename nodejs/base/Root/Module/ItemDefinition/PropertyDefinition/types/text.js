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
const util_1 = require("../../../../../../util");
/**
 * The type describes how the text type behaves in the app, this includes rich text
 */
const typeValue = {
    gql: graphql_1.GraphQLString,
    nullableDefault: "",
    supportedSubtypes: ["html"],
    specialProperties: [
        {
            name: "mediaProperty",
            type: "string",
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
    sql: (sqlPrefix, id) => {
        return {
            [sqlPrefix + id]: {
                type: "text",
            },
            [sqlPrefix + id + "_DICTIONARY"]: {
                type: "regconfig",
            },
            [sqlPrefix + id + "_VECTOR"]: {
                type: "tsvector",
                index: {
                    type: "gin",
                    id: "FULL_TEXT_SEARCH_GIN_INDEX_" + sqlPrefix + id,
                    level: 0,
                },
            },
        };
    },
    sqlIn: (value, sqlPrefix, id, property, knex, dictionary) => {
        if (value === null) {
            return {
                [sqlPrefix + id]: null,
                [sqlPrefix + id + "_VECTOR"]: null,
                [sqlPrefix + id + "_DICTIONARY"]: dictionary,
            };
        }
        let escapedText = value;
        let purifiedText = value;
        if (property.isRichText()) {
            const dummyElement = util_1.DOMWindow.document.createElement("div");
            dummyElement.innerHTML = value.toString();
            escapedText = dummyElement.textContent;
            purifiedText = util_1.DOMPurify.sanitize(value.toString(), {
                FORBID_ATTR: ["src"],
            });
        }
        return {
            [id]: purifiedText,
            [id + "_DICTIONARY"]: dictionary,
            [id + "_VECTOR"]: knex.raw("to_tsvector(?, ?)", [
                dictionary,
                escapedText,
            ]),
        };
    },
    sqlOut: sql_1.standardSQLOutFn,
    sqlSearch: (data, sqlPrefix, id, knexBuilder, dictionary) => {
        const searchName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.SEARCH + id;
        if (typeof data[searchName] !== "undefined" && data[searchName] !== null) {
            // TODO improve, this only matches exact words
            knexBuilder.andWhereRaw("?? @@ to_tsquery(??, ?)", [
                sqlPrefix + id + "_VECTOR",
                sqlPrefix + id + "_DICTIONARY",
                data[searchName],
            ]);
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
        const searchName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.SEARCH + id;
        const usefulArgs = includeId ? args[constants_1.INCLUDE_PREFIX + includeId] || {} : args;
        if (typeof usefulArgs[searchName] !== "undefined" && usefulArgs[searchName] !== null) {
            const searchMatch = usefulArgs[searchName];
            const propertyValue = includeId ? rawData.DATA[includeId][id] : rawData.DATA[id];
            // TODO improve, this is kinda trash FTS
            return propertyValue.includes(searchMatch);
        }
        return true;
    },
    sqlEqual: sql_1.standardSQLEqualFn,
    sqlLocalEqual: local_sql_1.standardSQLLocalEqualFn,
    localEqual: local_sql_1.standardLocalEqual,
    // validates the text, texts don't support json value
    validate: (s, subtype) => {
        if (typeof s !== "string") {
            return PropertyDefinition_1.PropertyInvalidReason.INVALID_VALUE;
            // NOTE how the html text lengh is not checked, even when it is possible
            // this is a raw check for the total character count otherwise we could get spammed
            // with empty tags, should be large enough not to bother
        }
        else if (s.length > constants_1.MAX_RAW_TEXT_LENGTH) {
            return PropertyDefinition_1.PropertyInvalidReason.TOO_LARGE;
        }
        return null;
    },
    // the max length for the text
    // whether it is searchable or not
    searchable: true,
    searchInterface: search_interfaces_1.PropertyDefinitionSearchInterfacesType.FTS,
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
