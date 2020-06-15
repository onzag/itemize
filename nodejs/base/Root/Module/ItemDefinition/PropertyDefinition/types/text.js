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
                    id: "FTS_" + sqlPrefix + id,
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
                ADD_TAGS: ["iframe"],
                ADD_ATTR: ["frameborder", "allow", "allowfullscreen", "scrolling", "spellcheck", "contenteditable"],
                FORBID_ATTR: ["sizes", "srcset", "src", "data-src"],
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
    sqlSearch: (data, sqlPrefix, id, knexBuilder, dictionary, isOrderedbyIt) => {
        const searchName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.SEARCH + id;
        if (typeof data[searchName] !== "undefined" && data[searchName] !== null) {
            // TODO improve, this only matches exact words
            // maybe https://github.com/zombodb/zombodb
            knexBuilder.andWhereRaw("?? @@ to_tsquery(??, ?)", [
                sqlPrefix + id + "_VECTOR",
                sqlPrefix + id + "_DICTIONARY",
                data[searchName],
            ]);
            if (isOrderedbyIt) {
                return [
                    "ts_rank(??, to_tsquery(??, ?)) AS ??",
                    [
                        sqlPrefix + id + "_VECTOR",
                        sqlPrefix + id + "_DICTIONARY",
                        data[searchName],
                        sqlPrefix + id + "_RANK",
                    ]
                ];
            }
            return true;
        }
        return false;
    },
    sqlStrSearch: (search, sqlPrefix, id, knexBuilder, dictionary, isOrderedbyIt) => {
        // TODO improve, this only matches exact words
        // maybe https://github.com/zombodb/zombodb
        // due to technical limitations with knex, sometimes the builder
        // isn't available
        knexBuilder && knexBuilder.whereRaw("?? @@ to_tsquery(??, ?)", [
            sqlPrefix + id + "_VECTOR",
            sqlPrefix + id + "_DICTIONARY",
            search,
        ]);
        if (isOrderedbyIt) {
            return [
                "ts_rank(??, to_tsquery(??, ?)) AS ??",
                [
                    sqlPrefix + id + "_VECTOR",
                    sqlPrefix + id + "_DICTIONARY",
                    search,
                    sqlPrefix + id + "_STRRANK",
                ]
            ];
        }
        return true;
    },
    sqlBtreeIndexable: () => null,
    sqlMantenience: null,
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
            if (propertyValue === null) {
                return false;
            }
            // this is the FTS in the client side, it's not good, it's not meant
            // to be good, but it gets the job done
            return propertyValue.includes(searchMatch);
        }
        return true;
    },
    localStrSearch: (search, rawData, id, includeId) => {
        // item is deleted
        if (!rawData) {
            return false;
        }
        // item is blocked
        if (rawData.DATA === null) {
            return false;
        }
        if (search) {
            const propertyValue = includeId ? rawData.DATA[includeId][id] : rawData.DATA[id];
            // this is the simple FTS that you get in the client
            return propertyValue.includes(search);
        }
        return true;
    },
    sqlEqual: sql_1.standardSQLEqualFn,
    sqlSSCacheEqual: local_sql_1.standardSQLSSCacheEqualFn,
    localEqual: local_sql_1.standardLocalEqual,
    sqlOrderBy: (sqlPrefix, id, direction, nulls, wasIncludedInSearch, wasIncludedInStrSearch) => {
        if (wasIncludedInSearch) {
            return [sqlPrefix + id + "_RANK", direction, nulls];
        }
        else if (wasIncludedInStrSearch) {
            return [sqlPrefix + id + "_STRRANK", direction, nulls];
        }
        return null;
    },
    localOrderBy: () => {
        // can't sort due to ranking limitations
        return 0;
    },
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
