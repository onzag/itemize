/**
 * Provides the sql functions for use with the text type
 * 
 * @module
 */

import { ISQLArgInfo, ISQLInInfo, ISQLSearchInfo, ISQLOrderByInfo, ISQLStrSearchInfo, ISQLRedoDictionaryBasedIndex } from "../types";
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
      type: "TEXT",
    },
    [arg.prefix + arg.id + "_PLAIN"]: {
      type: "TEXT",
    },
    [arg.prefix + arg.id + "_DICTIONARY"]: {
      type: "REGCONFIG",
    },
    [arg.prefix + arg.id + "_VECTOR"]: {
      type: "TSVECTOR",
      index: {
        type: "gin",
        id: "FTS_" + arg.prefix + arg.id,
        level: 0,
      },
    },
  };
}

function fakeInnerText(ele: Node): string {
  if (ele.nodeType === 3) {
    return ele.textContent.trim();
  }

  if (!ele.childNodes) {
    return "";
  }

  return Array.from(ele.childNodes).map(fakeInnerText).filter((v) => v !== "").join(" ");
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
      [arg.prefix + arg.id + "_PLAIN"]: null,
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
    escapedText = fakeInnerText(dummyElement);

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
      FORBID_ATTR: ["srcset", "src", "data-src", "loading", "id"],
    });
  }

  console.log("WTF", {
    [arg.prefix + arg.id]: purifiedText,
    [arg.prefix + arg.id + "_PLAIN"]: arg.property.isRichText() ? escapedText : null,
    [arg.prefix + arg.id + "_DICTIONARY"]: arg.dictionary,
    [arg.prefix + arg.id + "_VECTOR"]: [
      "to_tsvector(?, ?)",
      [
        arg.dictionary,
        escapedText,
      ],
    ],
  });

  // now we set the value
  return {
    [arg.prefix + arg.id]: purifiedText,
    [arg.prefix + arg.id + "_PLAIN"]: arg.property.isRichText() ? escapedText : null,
    [arg.prefix + arg.id + "_DICTIONARY"]: arg.dictionary,
    [arg.prefix + arg.id + "_VECTOR"]: [
      "to_tsvector(?, ?)",
      [
        arg.dictionary,
        escapedText,
      ],
    ],
  };
}

/**
 * Provides the sql in functionality for redoing sql based indexes
 * @param arg the sql in arg info
 * @returns a partial row value
 */
export function textSqlRedoDictionaryIndex(arg: ISQLRedoDictionaryBasedIndex) {
  const plainLocation = arg.property.isRichText() ? arg.prefix + arg.id + "_PLAIN" : arg.prefix + arg.id;
  return {
    [arg.prefix + arg.id + "_DICTIONARY"]: arg.newDictionary,
    [arg.prefix + arg.id + "_VECTOR"]: [
      "to_tsvector(?, " + JSON.stringify(plainLocation) + ")",
      [
        arg.newDictionary,
      ],
    ],
  }
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
    arg.whereBuilder.andWhere(
      JSON.stringify(arg.prefix + arg.id + "_VECTOR") + " @@ plainto_tsquery(" + JSON.stringify(arg.prefix + arg.id + "_DICTIONARY") + ", ?)",
      [
        arg.args[searchName] as string,
      ],
    );

    if (arg.isOrderedByIt) {
      return [
        "ts_rank(" + JSON.stringify(arg.prefix + arg.id + "_VECTOR") +
        ", plainto_tsquery(" + JSON.stringify(arg.prefix + arg.id + "_DICTIONARY") + ", ?)) AS " +
        JSON.stringify(arg.prefix + arg.id + "_RANK"),
        [
          arg.args[searchName] as string,
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

  arg.whereBuilder && arg.whereBuilder.andWhere(
    JSON.stringify(arg.prefix + arg.id + "_VECTOR") + " @@ to_tsquery(" + JSON.stringify(arg.prefix + arg.id + "_DICTIONARY") + ", ?)",
    [
      arg.search,
    ],
  );

  if (arg.isOrderedByIt) {
    return [
      "ts_rank(" + JSON.stringify(arg.prefix + arg.id + "_VECTOR") +
      ", to_tsquery(" + JSON.stringify(arg.prefix + arg.id + "_DICTIONARY") + ", ?)) AS " +
      JSON.stringify(arg.prefix + arg.id + "_STRRANK"),
      [
        arg.search,
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