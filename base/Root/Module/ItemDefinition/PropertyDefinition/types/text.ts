/**
 * Contains the text type description
 *
 * @module
 */

import {
  IPropertyDefinitionSupportedType,
} from "../types";
import { GraphQLString } from "graphql";
import { standardSQLEqualFn } from "../sql";
import {
  standardSQLSSCacheEqualFn,
} from "../local-sql";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import {
  CLASSIC_BASE_I18N,
  CLASSIC_OPTIONAL_I18N,
  CLASSIC_SEARCH_BASE_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N,
  INCLUDE_PREFIX,
} from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesPrefixes, PropertyDefinitionSearchInterfacesType } from "../search-interfaces";
import {
  textSQL, textSQLIn, textSqlRedoDictionaryIndex, textSQLSearch,
  textSQLStrSearch, textSQLBtreeIndexable, textSQLOrderBy, textElasticSearch,
  textElastic, textElasticStrSearch, textElasticIn, textSQLOut, textSQLSelect,
} from "../sql/text";

/**
 * The text is described by a string
 */
export interface IPropertyDefinitionSupportedTextType {
  /**
   * The text itself
   */
  value: string;

  /**
   * The language it has been processed with or meant to be
   * processed with
   */
  language: string;
};

/**
 * The type describes how the text type behaves in the app, this includes rich text
 */
const typeValue: IPropertyDefinitionSupportedType<IPropertyDefinitionSupportedTextType> = {
  gql: "PROPERTY_TYPE__Text",
  gqlFields: {
    value: {
      type: GraphQLString,
    },
    language: {
      type: GraphQLString,
    },
  },
  ownLanguageProperty: "language",
  isNull: (v) => {
    if (v === null) {
      return true;
    }

    return v.value === null;
  },
  getNullValue: (v) => {
    return ({
      language: null,
      ...v,
      value: null,
    });
  },
  supportedSubtypes: ["html", "plain"],
  specialProperties: [
    {
      name: "mediaProperty",
      type: "string",
    },
    {
      name: "supportsVideos",
      type: "boolean",
      required: ["html"],
    },
    {
      name: "supportsImages",
      type: "boolean",
      required: ["html"],
    },
    {
      name: "supportsFiles",
      type: "boolean",
      required: ["html"],
    },
    {
      name: "supportsLists",
      type: "boolean",
      required: ["html"],
    },
    {
      name: "supportsContainers",
      type: "boolean",
      required: ["html"],
    },
    {
      name: "supportedContainers",
      type: "array-string",
    },
    {
      name: "supportsTables",
      type: "boolean",
      required: ["html"],
    },
    {
      name: "supportedTables",
      type: "array-string",
    },
    {
      name: "supportsCustom",
      type: "boolean",
      required: ["html"],
    },
    {
      name: "supportedCustoms",
      type: "array-string",
    },
    {
      name: "supportsExternalLinks",
      type: "boolean",
      required: ["html"],
    },
    {
      name: "supportsLinks",
      type: "boolean",
      required: ["html"],
    },
    {
      name: "supportsQuote",
      type: "boolean",
      required: ["html"],
    },
    {
      name: "supportsRichClasses",
      type: "boolean",
      required: ["html"],
    },
    {
      name: "supportedRichClasses",
      type: "array-string",
    },
    {
      name: "supportsTitle",
      type: "boolean",
      required: ["html"],
    },
    {
      name: "supportsCustomStyles",
      type: "boolean",
      required: ["html"],
    },
    {
      name: "supportsTemplating",
      type: "boolean",
      required: ["html"],
    },

    // allows to query using partial
    // word matching, eg. if this is a title or short text
    // "this is a title" it will ensure that it matches
    {
      name: "searchUsesMatchPhrase",
      type: "boolean",
    },
  ],
  elastic: textElastic,
  sql: textSQL,
  sqlSelect: textSQLSelect,
  sqlIn: textSQLIn,
  sqlRedoDictionaryIndex: textSqlRedoDictionaryIndex,
  sqlOut: textSQLOut,
  sqlElasticIn: textElasticIn,
  sqlSearch: textSQLSearch,
  elasticSearch: textElasticSearch,
  sqlStrSearch: textSQLStrSearch,
  elasticStrSearch: textElasticStrSearch,
  elasticSort: null,
  sqlBtreeIndexable: textSQLBtreeIndexable,
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

    const searchName = PropertyDefinitionSearchInterfacesPrefixes.SEARCH + arg.id;
    const usefulArgs = arg.include ? arg.args[INCLUDE_PREFIX + arg.include.getId()] || {} : arg.args;

    if (typeof usefulArgs[searchName] !== "undefined" && usefulArgs[searchName] !== null) {
      const searchMatch = usefulArgs[searchName];
      const propertyValue = arg.include ? arg.gqlValue.DATA[arg.include.getId()][arg.id] : arg.gqlValue.DATA[arg.id];

      if (typeof propertyValue === "undefined") {
        console.warn("Attempted to local search by the property " + arg.id + " but could not find it in the local given value");
        return false;
      }

      if (propertyValue === null || propertyValue.text === null) {
        return false;
      }

      // this is the FTS in the client side, it's not good, it's not meant
      // to be good, but it gets the job done
      return propertyValue.text.includes(searchMatch);
    } else if (usefulArgs[searchName] === null) {
      const propertyValue = arg.include ? arg.gqlValue.DATA[arg.include.getId()][arg.id] : arg.gqlValue.DATA[arg.id];
      if (typeof propertyValue === "undefined") {
        console.warn("Attempted to local search by the property " + arg.id + " but could not find it in the local given value");
        return false;
      }
      return propertyValue === null || propertyValue.text === null;
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

      if (!propertyValue || !propertyValue.text) {
        return false;
      }

      // this is the simple FTS that you get in the client
      return propertyValue.includes(arg.search);
    }

    return true;
  },
  sqlEqual: standardSQLEqualFn,
  sqlSSCacheEqual: standardSQLSSCacheEqualFn,
  localEqual: (arg) => {
    const isANull = arg.a === null || arg.a.value === null;
    const isBNull = arg.b === null || arg.b.value === null;

    if (isANull && isBNull) {
      return true;
    } else if (isANull || isBNull) {
      return false;
    }

    return arg.a.value === arg.b.value;
  },
  sqlOrderBy: textSQLOrderBy,
  localOrderBy: () => {
    // can't sort due to ranking limitations
    return 0;
  },

  // validates the text, texts don't support json value
  validate: (s: IPropertyDefinitionSupportedTextType) => {
    if (typeof s.value !== "string") {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    if (s.language) {
      if (
        typeof s.language !== "string" ||
        s.language.toLowerCase() !== s.language ||
        s.language.length !== 2
      ) {
        return PropertyInvalidReason.INVALID_VALUE;
      }
    }

    return null;
  },
  // the max length for the text
  // whether it is searchable or not
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.TEXT,
  allowsMinMaxLengthDefined: true,
  // i18n attributes
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    searchBase: CLASSIC_SEARCH_BASE_I18N,
    searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
    tooLargeErrorInclude: true,
  },
};
export default typeValue;
