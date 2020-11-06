/**
 * Provides the sql functions for use with the text type
 * 
 * @packageDocumentation
 */

import { ISQLArgInfo, ISQLInInfo, ISQLSearchInfo, ISQLOrderByInfo, ISQLStrSearchInfo } from "../types";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import { DOMWindow, DOMPurify } from "../../../../../../util";

/**
 * Provides the sql form for the text type
 * @param arg the sql arg info
 * @returns a partial row definition
 */
export function textSQL(arg: ISQLArgInfo) {
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

/**
 * Provides the sql in functionality for the text type
 * @param arg the sql in arg info
 * @returns a partial row value
 */
export function textSQLIn(arg: ISQLInInfo) {
  // for null
  if (arg.value === null) {
    return {
      [arg.prefix + arg.id]: null,
      [arg.prefix + arg.id + "_VECTOR"]: null,
      [arg.prefix + arg.id + "_DICTIONARY"]: arg.dictionary,
    };
  }

  // otherwise let's check these
  let escapedText = arg.value as string;
  let purifiedText = arg.value as string;
  // if we have rich text we need to escape and sanitize
  if (arg.property.isRichText()) {
    // for that we use our dom window
    const dummyElement = DOMWindow.document.createElement("div");
    dummyElement.innerHTML = arg.value.toString();
    // the escaped text is used to build the FTS index and as such is necessary
    escapedText = dummyElement.textContent;

    // and we escape it, and now 
    purifiedText = DOMPurify.sanitize(arg.value.toString(), {
      // we allow iframes
      ADD_TAGS: ["iframe"],
      // we allow these attributes to be set
      ADD_ATTR: ["frameborder", "allow", "allowfullscreen", "scrolling", "spellcheck", "contenteditable"],
      // we forbid sizes, srcset, src and data-src; these attributes are used a lot for lazyloading of file content
      // as well as iframe content
      // and they might not be cleaned in the client side during setting since values tend to be fairly hot during
      // retrival, so they are cleaned here as well
      FORBID_ATTR: ["sizes", "srcset", "src", "data-src", "loading", "href"],
    });
  }

  // now we set the value
  return {
    [arg.prefix + arg.id]: purifiedText,
    [arg.prefix + arg.id + "_DICTIONARY"]: arg.dictionary,
    [arg.prefix + arg.id + "_VECTOR"]: arg.knex.raw(
      "to_tsvector(?, ?)",
      [
        arg.dictionary,
        escapedText,
      ],
    ),
  };
}

/**
 * Provides the text sql search functionality
 * @param arg the sql search arg info
 * @returns a boolean on whether it was searched by it, and a complementary column order by in case it needs it
 */
export function textSQLSearch(arg: ISQLSearchInfo): boolean | [string, any[]] {
  const searchName = PropertyDefinitionSearchInterfacesPrefixes.SEARCH + arg.prefix + arg.id;

  if (typeof arg.args[searchName] !== "undefined" && arg.args[searchName] !== null) {
    // TODO improve, this only matches exact words
    // maybe https://github.com/zombodb/zombodb
    arg.knexBuilder.andWhereRaw(
      "?? @@ to_tsquery(??, ?)",
      [
        arg.prefix + arg.id + "_VECTOR",
        arg.prefix + arg.id + "_DICTIONARY",
        arg.args[searchName] as string,
      ],
    );

    if (arg.isOrderedByIt) {
      return [
        "ts_rank(??, to_tsquery(??, ?)) AS ??",
        [
          arg.prefix + arg.id + "_VECTOR",
          arg.prefix + arg.id + "_DICTIONARY",
          arg.args[searchName] as string,
          arg.prefix + arg.id + "_RANK",
        ]
      ];
    }

    return true;
  }

  return false;
}

/**
 * Provides the text FTS str sql search functionality
 * @param arg the sql str search arg info
 * @returns a boolean on whether it was searched by it, and a complementary column order by in case it needs it
 */
export function textSQLStrSearch(arg: ISQLStrSearchInfo): boolean | [string, any[]] {
  // TODO improve, this only matches exact words
  // maybe https://github.com/zombodb/zombodb

  // due to technical limitations with knex, sometimes the builder
  // isn't available
  arg.knexBuilder && arg.knexBuilder.whereRaw(
    "?? @@ to_tsquery(??, ?)",
    [
      arg.prefix + arg.id + "_VECTOR",
      arg.prefix + arg.id + "_DICTIONARY",
      arg.search,
    ],
  );

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

/**
 * Provides the order by rule form
 * @param arg the sql order by arg info
 * @returns the order by rule string array (or null) if not possible to order
 */
export function textSQLOrderBy(arg: ISQLOrderByInfo): [string, string, string] {
  // we need to use the column we have created in the str search or search function
  // one however takes priority over the other
  if (arg.wasIncludedInSearch) {
    return [arg.prefix + arg.id + "_RANK", arg.direction, arg.nulls];
  } else if (arg.wasIncludedInStrSearch) {
    return [arg.prefix + arg.id + "_STRRANK", arg.direction, arg.nulls];
  }
  return null;
}

/**
 * Provides the btree indexable function for text type
 */
export function textSQLBtreeIndexable(): string[] {
  // Since btree is not supported they cannot be indexed
  return null;
}