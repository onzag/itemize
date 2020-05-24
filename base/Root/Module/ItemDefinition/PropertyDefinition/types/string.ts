/**
 * Contains the string type description
 *
 * @packageDocumentation
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLString, valueFromAST } from "graphql";
import {
  stardardSQLInFn,
  standardSQLOutFn,
  standardSQLSearchFnExactAndRange,
  standardSQLEqualFn,
  getStandardSQLFnFor,
} from "../sql";
import {
  standardSQLLocalEqualFn, standardLocalEqual,
} from "../local-sql";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import {
  MAX_STRING_LENGTH,
  CLASSIC_BASE_I18N,
  CLASSIC_OPTIONAL_I18N,
  CLASSIC_SEARCH_BASE_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N,
  SQL_CONSTRAINT_PREFIX,
} from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesType } from "../search-interfaces";
import { standardLocalSearchExactAndRange } from "../local-search";
import { countries, currencies } from "../../../../../../imported-resources";

/**
 * The email regex that is used to validate emails
 */
const EMAIL_REGEX = new RegExp("(?:[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+\\/=?^_`{|}~-]" +
  "+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09" +
  "\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9" +
  "-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]" +
  "|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53" +
  "-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])");

/**
 * Represents characters that are not allowed in identifier types, while this seems a bit arbitrary
 * remember that we try to keep it so that many languages are allowed, this is so usernames in
 * many languages are achievable, D'L things like that and so on, but we want to avoid characters
 * that can be used to build other stuff, and can make for confusing user identifiers
 */
const SPECIAL_CHARACTERS = [" ", "!", "¡", "?", "¿", "@", "#", "$", "£", "%", "/", "\\", "*", "\""];

/**
 * The string type is described, by, you guessed it, a string
 */
export type PropertyDefinitionSupportedStringType = string;

/**
 * The behaviour of strings is described by this type
 */
const typeValue: IPropertyDefinitionSupportedType = {
  gql: GraphQLString,
  // a string is a string
  json: "string",
  sql: getStandardSQLFnFor && getStandardSQLFnFor("text", null, (subtype: string, sqlPrefix: string, id: string) => {
    if (subtype) {
      return {
        type: "btree",
        id: SQL_CONSTRAINT_PREFIX + sqlPrefix + id,
        level: 0,
      }
    }
    return null;
  }),
  sqlIn: stardardSQLInFn,
  sqlOut: standardSQLOutFn,
  sqlSearch: standardSQLSearchFnExactAndRange,
  sqlEqual: standardSQLEqualFn,
  sqlLocalEqual: standardSQLLocalEqualFn,
  sqlMantenience: null,

  localSearch: standardLocalSearchExactAndRange,
  localEqual: standardLocalEqual,

  nullableDefault: "",
  supportedSubtypes: ["email", "identifier", "locale", "comprehensive-locale", "language", "country", "currency"],
  // validates just the length
  validate: (s: PropertyDefinitionSupportedStringType, subtype: string) => {
    if (typeof s !== "string") {
      return PropertyInvalidReason.INVALID_VALUE;
    } else if (s.length > MAX_STRING_LENGTH) {
      return PropertyInvalidReason.TOO_LARGE;
    }

    if (subtype === "email" && !EMAIL_REGEX.test(s)) {
      return PropertyInvalidReason.INVALID_SUBTYPE_VALUE;
    }

    if (subtype === "identifier") {
      const containsOneOfThose = SPECIAL_CHARACTERS.some((c) => s.indexOf(c) !== -1);
      if (containsOneOfThose) {
        return PropertyInvalidReason.INVALID_SUBTYPE_VALUE;
      }
    }
    
    const isComprehensiveLocale = subtype === "comprehensive-locale";
    if (subtype === "locale" || (isComprehensiveLocale && s.indexOf("-") !== -1)) {
      const splitted = s.split("-");
      const language = splitted[0];
      const country = splitted[1];

      if (!countries[country]) {
        return PropertyInvalidReason.INVALID_SUBTYPE_VALUE;
      // sadly we can't check whether the language is on the actual supported language list
      } else if (language.length !== 2 || language.toLowerCase() !== language) {
        return PropertyInvalidReason.INVALID_SUBTYPE_VALUE;
      }
      return null;
    } else if (subtype === "language" || (isComprehensiveLocale && s.toLowerCase() === s)) {
      // sadly we can't check whether the language is on the actual supported language list
      if (s.length !== 2 || s.toLowerCase() !== s) {
        return PropertyInvalidReason.INVALID_SUBTYPE_VALUE;
      }
      return null;
    } else if (subtype === "country" || (isComprehensiveLocale && s.toUpperCase() === s)) {
      if (!countries[s]) {
        return PropertyInvalidReason.INVALID_SUBTYPE_VALUE;
      }
      return null;
    } else if (subtype === "currency") {
      if (!currencies[s]) {
        return PropertyInvalidReason.INVALID_SUBTYPE_VALUE;
      }
      return null;
    }

    return null;
  },
  // it is searchable by an exact value, use text for organic things
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.EXACT,
  allowsMinMaxLengthDefined: true,
  // i18n attributes required
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    searchBase: CLASSIC_SEARCH_BASE_I18N,
    searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
    tooLargeErrorInclude: [null, "email", "identifier"],
    invalidSubtypeErrorInclude: true,
  },
};
export default typeValue;
