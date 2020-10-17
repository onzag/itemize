"use strict";
/**
 * Provides the sql functions for use with the text type
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.textSQLBtreeIndexable = exports.textSQLOrderBy = exports.textSQLStrSearch = exports.textSQLSearch = exports.textSQLIn = exports.textSQL = void 0;
const search_interfaces_1 = require("../search-interfaces");
const util_1 = require("../../../../../../util");
/**
 * Provides the sql form for the text type
 * @param arg the sql arg info
 * @returns a partial row definition
 */
function textSQL(arg) {
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
}
exports.textSQL = textSQL;
/**
 * Provides the sql in functionality for the text type
 * @param arg the sql in arg info
 * @returns a partial row value
 */
function textSQLIn(arg) {
    // for null
    if (arg.value === null) {
        return {
            [arg.prefix + arg.id]: null,
            [arg.prefix + arg.id + "_VECTOR"]: null,
            [arg.prefix + arg.id + "_DICTIONARY"]: arg.dictionary,
        };
    }
    // otherwise let's check these
    let escapedText = arg.value;
    let purifiedText = arg.value;
    // if we have rich text we need to escape and sanitize
    if (arg.property.isRichText()) {
        // for that we use our dom window
        const dummyElement = util_1.DOMWindow.document.createElement("div");
        dummyElement.innerHTML = arg.value.toString();
        // the escaped text is used to build the FTS index and as such is necessary
        escapedText = dummyElement.textContent;
        // and we escape it, and now 
        purifiedText = util_1.DOMPurify.sanitize(arg.value.toString(), {
            // we allow iframes
            ADD_TAGS: ["iframe"],
            // we allow these attributes to be set
            ADD_ATTR: ["frameborder", "allow", "allowfullscreen", "scrolling", "spellcheck", "contenteditable"],
            // we forbid sizes, srcset, src and data-src; these attributes are used a lot for lazyloading of file content
            // as well as iframe content
            // and they might not be cleaned in the client side during setting since values tend to be fairly hot during
            // retrival, so they are cleaned here as well
            FORBID_ATTR: ["sizes", "srcset", "src", "data-src", "loading"],
        });
    }
    // now we set the value
    return {
        [arg.prefix + arg.id]: purifiedText,
        [arg.prefix + arg.id + "_DICTIONARY"]: arg.dictionary,
        [arg.prefix + arg.id + "_VECTOR"]: arg.knex.raw("to_tsvector(?, ?)", [
            arg.dictionary,
            escapedText,
        ]),
    };
}
exports.textSQLIn = textSQLIn;
/**
 * Provides the text sql search functionality
 * @param arg the sql search arg info
 * @returns a boolean on whether it was searched by it, and a complementary column order by in case it needs it
 */
function textSQLSearch(arg) {
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
}
exports.textSQLSearch = textSQLSearch;
/**
 * Provides the text FTS str sql search functionality
 * @param arg the sql str search arg info
 * @returns a boolean on whether it was searched by it, and a complementary column order by in case it needs it
 */
function textSQLStrSearch(arg) {
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
}
exports.textSQLStrSearch = textSQLStrSearch;
/**
 * Provides the order by rule form
 * @param arg the sql order by arg info
 * @returns the order by rule string array (or null) if not possible to order
 */
function textSQLOrderBy(arg) {
    // we need to use the column we have created in the str search or search function
    // one however takes priority over the other
    if (arg.wasIncludedInSearch) {
        return [arg.prefix + arg.id + "_RANK", arg.direction, arg.nulls];
    }
    else if (arg.wasIncludedInStrSearch) {
        return [arg.prefix + arg.id + "_STRRANK", arg.direction, arg.nulls];
    }
    return null;
}
exports.textSQLOrderBy = textSQLOrderBy;
/**
 * Provides the btree indexable function for text type
 */
function textSQLBtreeIndexable() {
    // Since btree is not supported they cannot be indexed
    return null;
}
exports.textSQLBtreeIndexable = textSQLBtreeIndexable;
