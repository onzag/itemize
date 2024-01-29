/**
 * Provides the sql functions for use with the text type
 * 
 * @module
 */

import { ISQLArgInfo, ISQLInInfo, ISQLSearchInfo, ISQLOrderByInfo, ISQLStrSearchInfo, ISQLRedoDictionaryBasedIndex, IElasticSearchInfo, IArgInfo, ISQLOutInfo, IElasticStrSearchInfo } from "../types";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import { DOMWindow, DOMPurify } from "@onzag/itemize-text-engine/serializer/dom";
import type { IPropertyDefinitionSupportedTextType } from "../types/text";

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
    [arg.prefix + arg.id + "_LANGUAGE"]: {
      type: "TEXT",
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

export function textSQLSelect(arg: IArgInfo) {
  return [
    arg.prefix + arg.id,
    arg.prefix + arg.id + "_LANGUAGE",
  ];
}

export function textElastic(arg: ISQLArgInfo) {
  const isRichText = arg.property.isRichText();

  if (isRichText) {
    return {
      properties: {
        [arg.prefix + arg.id]: {
          enabled: false,
        },
        [arg.prefix + arg.id + "_LANGUAGE"]: {
          type: "text",
        },
        [arg.prefix + arg.id + "_PLAIN"]: {
          type: "text",
        },
        [arg.prefix + arg.id + "_NULL"]: {
          type: "boolean",
        }
      }
    }
  } else {
    return {
      properties: {
        [arg.prefix + arg.id]: {
          type: "text",
        },
        [arg.prefix + arg.id + "_NULL"]: {
          type: "boolean",
        },
        [arg.prefix + arg.id + "_LANGUAGE"]: {
          type: "text",
        },
      }
    }
  }
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

export function textSQLOut(arg: ISQLOutInfo): IPropertyDefinitionSupportedTextType {
  const value = arg.row[arg.prefix + arg.id];
  const language = arg.row[arg.prefix + arg.id + "_LANGUAGE"] ||
    (arg.appData && arg.appData.config.fallbackLanguage.split("-")[0]) ||
    "en";

  if (
    (
      typeof value === "undefined" ||
      value === null
    ) && !arg.property.isNullable()
  ) {
    const def = arg.property.getDefaultValue();
    if (def !== null) {
      return def as IPropertyDefinitionSupportedTextType;
    }
    return {
      value: "?",
      language,
    }
  }

  return {
    value,
    language,
  }
}

/**
 * Provides the sql in functionality for the text type
 * @param arg the sql in arg info
 * @returns a partial row value
 */
export function textSQLIn(arg: ISQLInInfo) {

  // javascript undefined problem forces me to do this double check because it will not
  // trigger an error if the data is corrupted because javascript is javascript and will
  // do anything in its might to succeed even with corrupted data because javascript
  if (arg.value !== null) {
    if (typeof arg.value === "undefined") {
      throw new Error("Invalid text for SQL IN in must not be undefined in " + arg.property.getId());
    }

    if (
      typeof (arg.value as IPropertyDefinitionSupportedTextType).language !== "string" &&
      (arg.value as IPropertyDefinitionSupportedTextType).language !== null
    ) {
      throw new Error("Invalid text for SQL IN in " + JSON.stringify(arg.value) + " not valid language property");
    }

    if (
      typeof (arg.value as IPropertyDefinitionSupportedTextType).value !== "string" &&
      (arg.value as IPropertyDefinitionSupportedTextType).value !== null
    ) {
      throw new Error("Invalid text for SQL IN in " + JSON.stringify(arg.value) + " not valid value property");
    }
  }

  let dictionary: string;
  if (typeof arg.dictionary === "string" || !arg.language) {
    dictionary = (arg.dictionary || null) as string;
  } else {
    dictionary = arg[arg.prefix + arg.id + "_DICTIONARY"] || null;
  }

  let language: string;
  if ((arg.value as IPropertyDefinitionSupportedTextType) && (arg.value as IPropertyDefinitionSupportedTextType).language) {
    language = (arg.value as IPropertyDefinitionSupportedTextType).language || null;
    dictionary = arg.appData ? (arg.appData.databaseConfig.dictionaries[language] ||
      arg.appData.databaseConfig.dictionaries["*"] ||
      null) : null;
  } else if (typeof arg.language === "string" || !arg.language) {
    language = (arg.language || null) as string;
  } else {
    language = arg[arg.prefix + arg.id + "_LANGUAGE"] || null;
  }

  // for null
  if (arg.value === null) {
    return {
      [arg.prefix + arg.id]: null,
      [arg.prefix + arg.id + "_PLAIN"]: null,
      [arg.prefix + arg.id + "_VECTOR"]: null,
      [arg.prefix + arg.id + "_LANGUAGE"]: language,
      [arg.prefix + arg.id + "_DICTIONARY"]: dictionary,
    };
  }

  // otherwise let's check these
  let escapedText = (arg.value && (arg.value as IPropertyDefinitionSupportedTextType).value) as string;
  let purifiedText = (arg.value && (arg.value as IPropertyDefinitionSupportedTextType).value) as string;
  // if we have rich text we need to escape and sanitize
  if (arg.property.isRichText() && purifiedText) {
    // for that we use our dom window
    const dummyElement = DOMWindow.document.createElement("div");
    dummyElement.innerHTML = purifiedText;
    // the escaped text is used to build the FTS index and as such is necessary
    escapedText = fakeInnerText(dummyElement);

    // and we escape it, and now 
    purifiedText = DOMPurify.sanitize(purifiedText, {
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

  // now we set the value
  return {
    [arg.prefix + arg.id]: purifiedText,
    [arg.prefix + arg.id + "_PLAIN"]: arg.property.isRichText() ? escapedText : null,
    [arg.prefix + arg.id + "_LANGUAGE"]: language || null,
    [arg.prefix + arg.id + "_DICTIONARY"]: dictionary || null,
    [arg.prefix + arg.id + "_VECTOR"]: [
      "to_tsvector(?, ?)",
      [
        dictionary || null,
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
    [arg.prefix + arg.id + "_LANGUAGE"]: arg.newLanguage,
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
    // this only matches exact words
    // for better results you should use the search engine method
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
  } else if (arg.args[searchName] === null) {
    arg.whereBuilder.andWhereColumnNull(arg.prefix + arg.id);

    // was not included in search because we cannot really
    // order by nulls, this is used for ordering
    // and the ordering of text is complex, bit of a hack
    // but otherwise we would have to create the column for ranking
    return false;
  }

  return false;
}


/**
 * Provides the text sql search functionality
 * @param arg the sql search arg info
 * @returns a boolean on whether it was searched by it, and a complementary column order by in case it needs it
 */
export function textElasticSearch(arg: IElasticSearchInfo) {
  const searchName = PropertyDefinitionSearchInterfacesPrefixes.SEARCH + arg.prefix + arg.id;
  const isRichText = arg.property.isRichText();

  if (typeof arg.args[searchName] !== "undefined" && arg.args[searchName] !== null) {
    const usePhrasePrefix = arg.property.getConfigValue("elasticSearchUsesMatchPhrasePrefix");
    const usePhrase = arg.property.getConfigValue("elasticSearchUsesMatchPhrase");
    const matchRule = {
      [arg.prefix + arg.id + (isRichText ? "_PLAIN" : "")]: arg.args[searchName] as string,
    };
    if (usePhrasePrefix) {
      arg.elasticQueryBuilder.mustMatchPhrasePrefix(matchRule, {
        boost: arg.boost,
        groupId: searchName,
        propertyId: arg.prefix + arg.id,
      });
    } else if (usePhrase) {
      arg.elasticQueryBuilder.mustMatchPhrase(matchRule, {
        boost: arg.boost,
        groupId: searchName,
        propertyId: arg.prefix + arg.id,
      });
    } else {
      arg.elasticQueryBuilder.mustMatch(matchRule, {
        boost: arg.boost,
        groupId: searchName,
        propertyId: arg.prefix + arg.id,
      });
    }

    return {
      [arg.prefix + arg.id + (isRichText ? "_PLAIN" : "")]: {
        property: arg.property,
        include: arg.include,
        name: arg.prefix + arg.id,
        match: arg.args[searchName] as string,
      },
    };
  } else if (arg.args[searchName] === null) {
    arg.elasticQueryBuilder.mustTerm({
      [arg.prefix + arg.id + "_NULL"]: true,
    }, {
      boost: arg.boost,
      groupId: searchName,
      propertyId: arg.prefix + arg.id,
    });
    return {};
  }

  return null;
}

export function textElasticIn(arg: ISQLOutInfo) {
  const isRichText = arg.property.isRichText();
  if (isRichText) {
    return {
      [arg.prefix + arg.id]: arg.row[arg.prefix + arg.id],
      [arg.prefix + arg.id + "_PLAIN"]: arg.row[arg.prefix + arg.id + "_PLAIN"],
      [arg.prefix + arg.id + "_LANGUAGE"]: arg.row[arg.prefix + arg.id + "_LANGUAGE"],
      [arg.prefix + arg.id + "_NULL"]: !arg.row[arg.prefix + arg.id],
    };
  } else {
    return {
      [arg.prefix + arg.id]: arg.row[arg.prefix + arg.id],
      [arg.prefix + arg.id + "_LANGUAGE"]: arg.row[arg.prefix + arg.id + "_LANGUAGE"],
      [arg.prefix + arg.id + "_NULL"]: !arg.row[arg.prefix + arg.id],
    };
  }
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
 * Provides the text FTS str sql search functionality
 */
export function textElasticStrSearch(arg: IElasticStrSearchInfo) {
  const isRichText = arg.property.isRichText();
  const usePhrasePrefix = arg.property.getConfigValue("elasticSearchUsesMatchPhrasePrefix");
  const usePhrase = arg.property.getConfigValue("elasticSearchUsesMatchPhrase");
  const ruleValue = {
    [arg.prefix + arg.id + (isRichText ? "_PLAIN" : "")]: arg.search,
  };

  if (usePhrasePrefix) {
    arg.elasticQueryBuilder && arg.elasticQueryBuilder.mustMatchPhrasePrefix(ruleValue, {
      boost: arg.boost,
      groupId: "STRSEARCH",
      propertyId: arg.prefix + arg.id,
    });
  } else if (usePhrase) {
    arg.elasticQueryBuilder && arg.elasticQueryBuilder.mustMatchPhrase(ruleValue, {
      boost: arg.boost,
      groupId: "STRSEARCH",
      propertyId: arg.prefix + arg.id,
    });
  } else {
    arg.elasticQueryBuilder && arg.elasticQueryBuilder.mustMatch(ruleValue, {
      boost: arg.boost,
      groupId: "STRSEARCH",
      propertyId: arg.prefix + arg.id,
    });
  }

  return {
    [arg.prefix + arg.id + (isRichText ? "_PLAIN" : "")]: {
      name: arg.prefix + arg.id,
      match: arg.search,
      property: arg.property,
      include: arg.include,
    },
  };
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