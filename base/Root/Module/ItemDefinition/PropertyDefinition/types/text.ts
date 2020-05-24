/**
 * Contains the text type description
 *
 * @packageDocumentation
 */

import {
  IPropertyDefinitionSupportedType,
} from "../types";
import { GraphQLString } from "graphql";
import { standardSQLOutFn, standardSQLEqualFn } from "../sql";
import {
  standardSQLLocalEqualFn, standardLocalEqual,
} from "../local-sql";
import PropertyDefinition, { PropertyInvalidReason } from "../../PropertyDefinition";
import {
  MAX_RAW_TEXT_LENGTH,
  CLASSIC_BASE_I18N,
  CLASSIC_OPTIONAL_I18N,
  CLASSIC_SEARCH_BASE_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N,
  INCLUDE_PREFIX,
} from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesPrefixes, PropertyDefinitionSearchInterfacesType } from "../search-interfaces";
import Knex from "knex";
import { DOMWindow, DOMPurify } from "../../../../../../util";
import { IGQLValue, IGQLArgs } from "../../../../../../gql-querier";

/**
 * The text is described by a string
 */
export type PropertyDefinitionSupportedTextType = string;

/**
 * The type describes how the text type behaves in the app, this includes rich text
 */
const typeValue: IPropertyDefinitionSupportedType = {
  gql: GraphQLString,
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
  sql: (sqlPrefix: string, id: string) => {
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
  sqlIn: (
    value: PropertyDefinitionSupportedTextType,
    sqlPrefix: string,
    id: string,
    property: PropertyDefinition,
    knex: Knex,
    dictionary: string,
  ) => {
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
      const dummyElement = DOMWindow.document.createElement("div");
      dummyElement.innerHTML = value.toString();
      escapedText = dummyElement.textContent;

      purifiedText = DOMPurify.sanitize(value.toString(), {
        ADD_TAGS: ["iframe"],
        ADD_ATTR: ["frameborder", "allow", "allowfullscreen", "scrolling", "spellcheck", "contenteditable"],
        FORBID_ATTR: ["sizes", "srcset", "src", "data-src"],
      });
    }

    return {
      [id]: purifiedText,
      [id + "_DICTIONARY"]: dictionary,
      [id + "_VECTOR"]: knex.raw(
        "to_tsvector(?, ?)",
        [
          dictionary,
          escapedText,
        ],
      ),
    };
  },
  sqlOut: standardSQLOutFn,
  sqlSearch: (data: IGQLValue, sqlPrefix: string, id: string, knexBuilder: any, dictionary: string) => {
    const searchName = PropertyDefinitionSearchInterfacesPrefixes.SEARCH + id;

    if (typeof data[searchName] !== "undefined" && data[searchName] !== null) {
      // TODO improve, this only matches exact words
      knexBuilder.andWhereRaw(
        "?? @@ to_tsquery(??, ?)",
        [
          sqlPrefix + id + "_VECTOR",
          sqlPrefix + id + "_DICTIONARY",
          data[searchName],
        ],
      );
    }
  },
  sqlMantenience: null,
  localSearch: (
    args: IGQLArgs,
    rawData: IGQLValue,
    id: string,
    includeId?: string,
  ) => {
    // item is deleted
    if (!rawData) {
      return false;
    }
    // item is blocked
    if (rawData.DATA === null) {
      return false;
    }

    const searchName = PropertyDefinitionSearchInterfacesPrefixes.SEARCH + id;
    const usefulArgs = includeId ? args[INCLUDE_PREFIX + includeId] || {} : args;

    if (typeof usefulArgs[searchName] !== "undefined" && usefulArgs[searchName] !== null) {
      const searchMatch = usefulArgs[searchName];
      const propertyValue = includeId ? rawData.DATA[includeId][id] : rawData.DATA[id];

      // TODO improve, this is kinda trash FTS
      return propertyValue.includes(searchMatch);
    }

    return true;
  },
  sqlEqual: standardSQLEqualFn,
  sqlLocalEqual: standardSQLLocalEqualFn,
  localEqual: standardLocalEqual,

  // validates the text, texts don't support json value
  validate: (s: PropertyDefinitionSupportedTextType, subtype?: string) => {
    if (typeof s !== "string") {
      return PropertyInvalidReason.INVALID_VALUE;

    // NOTE how the html text lengh is not checked, even when it is possible
    // this is a raw check for the total character count otherwise we could get spammed
    // with empty tags, should be large enough not to bother
    } else if (s.length > MAX_RAW_TEXT_LENGTH) {
      return PropertyInvalidReason.TOO_LARGE;
    }

    return null;
  },
  // the max length for the text
  // whether it is searchable or not
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.FTS,
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
