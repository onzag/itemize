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
    sql: (arg) => {
        return {
            [arg.prefix + arg.id]: {
                type: "text",
            },
            [arg.prefix + arg.id + "_DICTIONARY"]: {
                type: "regconfig",
            },
            [arg.prefix + arg.id + "_VECTOR"]: {
                type: "tsvector",
                index: {
                    type: "gin",
                    id: "FTS_" + arg.prefix + arg.id,
                    level: 0,
                },
            },
        };
    },
    sqlIn: (arg) => {
        if (arg.value === null) {
            return {
                [arg.prefix + arg.id]: null,
                [arg.prefix + arg.id + "_VECTOR"]: null,
                [arg.prefix + arg.id + "_DICTIONARY"]: arg.dictionary,
            };
        }
        let escapedText = arg.value;
        let purifiedText = arg.value;
        if (arg.property.isRichText()) {
            const dummyElement = util_1.DOMWindow.document.createElement("div");
            dummyElement.innerHTML = arg.value.toString();
            escapedText = dummyElement.textContent;
            purifiedText = util_1.DOMPurify.sanitize(arg.value.toString(), {
                ADD_TAGS: ["iframe"],
                ADD_ATTR: ["frameborder", "allow", "allowfullscreen", "scrolling", "spellcheck", "contenteditable"],
                FORBID_ATTR: ["sizes", "srcset", "src", "data-src"],
            });
        }
        return {
            [arg.prefix + arg.id]: purifiedText,
            [arg.prefix + arg.id + "_DICTIONARY"]: arg.dictionary,
            [arg.prefix + arg.id + "_VECTOR"]: arg.knex.raw("to_tsvector(?, ?)", [
                arg.dictionary,
                escapedText,
            ]),
        };
    },
    sqlOut: sql_1.standardSQLOutFn,
    sqlSearch: (arg) => {
        const searchName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.SEARCH + arg.prefix + arg.id;
        if (typeof arg.args[searchName] !== "undefined" && arg.args[searchName] !== null) {
            // TODO improve, this only matches exact words
            // maybe https://github.com/zombodb/zombodb
            arg.knexBuilder.andWhereRaw("?? @@ to_tsquery(??, ?)", [
                arg.prefix + arg.id + "_VECTOR",
                arg.prefix + arg.id + "_DICTIONARY",
                arg.args[searchName],
            ]);
            if (arg.isOrderedByIt) {
                return [
                    "ts_rank(??, to_tsquery(??, ?)) AS ??",
                    [
                        arg.prefix + arg.id + "_VECTOR",
                        arg.prefix + arg.id + "_DICTIONARY",
                        arg.args[searchName],
                        arg.prefix + arg.id + "_RANK",
                    ]
                ];
            }
            return true;
        }
        return false;
    },
    sqlStrSearch: (arg) => {
        // TODO improve, this only matches exact words
        // maybe https://github.com/zombodb/zombodb
        // due to technical limitations with knex, sometimes the builder
        // isn't available
        arg.knexBuilder && arg.knexBuilder.whereRaw("?? @@ to_tsquery(??, ?)", [
            arg.prefix + arg.id + "_VECTOR",
            arg.prefix + arg.id + "_DICTIONARY",
            arg.search,
        ]);
        if (arg.isOrderedByIt) {
            return [
                "ts_rank(??, to_tsquery(??, ?)) AS ??",
                [
                    arg.prefix + arg.id + "_VECTOR",
                    arg.prefix + arg.id + "_DICTIONARY",
                    arg.search,
                    arg.prefix + arg.id + "_STRRANK",
                ]
            ];
        }
        return true;
    },
    sqlBtreeIndexable: () => null,
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
    sqlOrderBy: (arg) => {
        if (arg.wasIncludedInSearch) {
            return [arg.prefix + arg.id + "_RANK", arg.direction, arg.nulls];
        }
        else if (arg.wasIncludedInStrSearch) {
            return [arg.prefix + arg.id + "_STRRANK", arg.direction, arg.nulls];
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
