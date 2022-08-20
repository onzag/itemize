/**
 * Contains the string type description
 *
 * @module
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLString } from "graphql";
import {
  standardSQLInFn,
  standardSQLOutFn,
  standardSQLEqualFn,
  getStandardSQLFnFor,
  standardSQLBtreeIndexable,
  standardSQLSelect,
  standardSQLElasticInFn,
} from "../sql";
import {
  standardSQLSSCacheEqualFn, standardLocalEqual,
} from "../local-sql";
import { PropertyInvalidReason, IPropertyDefinitionRawJSONDataType } from "../../PropertyDefinition";
import {
  MAX_STRING_LENGTH,
  CLASSIC_BASE_I18N,
  CLASSIC_OPTIONAL_I18N,
  CLASSIC_SEARCH_BASE_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N,
  INCLUDE_PREFIX,
} from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesType, PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import { countries, currencies } from "../../../../../../imported-resources";
import { stringElastic, stringElasticSearch, stringElasticStrSearch, stringSQL, stringSQLElasticIn, stringSQLSearch, stringSQLStrSearch } from "../sql/string";

/**
 * The email regex that is used to validate emails
 */
const EMAIL_REGEX = new RegExp("(?:[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+\\/=?^_`{|}~-]" +
  "+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09" +
  "\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9" +
  "-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]" +
  "|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53" +
  "-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])");

const PHONE_REGEX = new RegExp("\\+(9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d|" +
  "2[98654321]\\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|" +
  "4[987654310]|3[9643210]|2[70]|7|1)\\d{1,14}$");

/**
 * Represents characters that are not allowed in identifier types, while this seems a bit arbitrary
 * remember that we try to keep it so that many languages are allowed, this is so usernames in
 * many languages are achievable, D'L things like that and so on, but we want to avoid characters
 * that can be used to build other stuff, and can make for confusing user identifiers
 * 
 * These identifiers are expected to be used as email handles so be careful
 */
const SPECIAL_CHARACTERS = [" ", "!", "¡", "?", "¿", "@", "#", "$", "£", "%", "/", "\\", "*", "\"", "+"];

/**
 * The string type is described, by, you guessed it, a string
 */
export type PropertyDefinitionSupportedStringType = string;

export const exactStringSearchSubtypes = [
  "comprehensive-locale",
  "phone",
  "language",
  "country",
  "currency",
  "role",
  "exact-identifier",
  "exact-value",
  "exact-value-tracked",
  "exact-identifier-tracked",
  "reference",
  "reference-tracked",
  // TODO check that JSON works well
  // it's an unchecked subtype
  "json",
];

/**
 * The behaviour of strings is described by this type
 */
const typeValue: IPropertyDefinitionSupportedType<PropertyDefinitionSupportedStringType> = {
  gql: GraphQLString,
  // a string is a string
  json: "string",
  sql: stringSQL,
  elastic: stringElastic,
  sqlSelect: standardSQLSelect,
  sqlIn: standardSQLInFn,
  sqlOut: standardSQLOutFn,
  sqlElasticIn: stringSQLElasticIn,
  sqlSearch: stringSQLSearch,
  elasticSearch: stringElasticSearch,
  sqlEqual: standardSQLEqualFn,
  sqlSSCacheEqual: standardSQLSSCacheEqualFn,
  sqlBtreeIndexable: standardSQLBtreeIndexable,
  sqlMantenience: null,
  sqlStrSearch: stringSQLStrSearch,
  elasticStrSearch: stringElasticStrSearch,
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

      if (exactStringSearchSubtypes.includes(arg.property.getSubtype())) {
        return propertyValue === arg.search;
      } else {
        // this is the simple FTS that you get in the client
        return propertyValue.includes(arg.search);
      }
    }

    return true;
  },
  sqlOrderBy: null,
  elasticSort: null,
  localOrderBy: null,

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

    if (typeof usefulArgs[searchName] !== "undefined") {
      const searchMatch = usefulArgs[searchName];
      const propertyValue = arg.include ? arg.gqlValue.DATA[arg.include.getId()][arg.id] : arg.gqlValue.DATA[arg.id];

      if (propertyValue === null) {
        return false;
      }

      // this is the FTS in the client side, it's not good, it's not meant
      // to be good, but it gets the job done
      return propertyValue.includes(searchMatch);
    } else if (usefulArgs[searchName] === null) {
      const propertyValue = arg.include ? arg.gqlValue.DATA[arg.include.getId()][arg.id] : arg.gqlValue.DATA[arg.id];
      return propertyValue === null;
    }

    return true;
  },
  localEqual: standardLocalEqual,

  nullableDefault: "",
  supportedSubtypes: [
    "email",
    "phone",
    "identifier",
    "locale",
  ].concat(exactStringSearchSubtypes),

  validate: (s: PropertyDefinitionSupportedStringType, p: IPropertyDefinitionRawJSONDataType) => {
    if (typeof s !== "string") {
      return PropertyInvalidReason.INVALID_VALUE;
    } else if (s.length > MAX_STRING_LENGTH) {
      return PropertyInvalidReason.TOO_LARGE;
    }

    const subtype = p.subtype;

    if ((subtype === "reference" || subtype === "reference-tracked") && s === "") {
      return PropertyInvalidReason.INVALID_SUBTYPE_VALUE;
    }

    if (subtype === "email" && !EMAIL_REGEX.test(s)) {
      return PropertyInvalidReason.INVALID_SUBTYPE_VALUE;
    }

    if (subtype === "phone" && !PHONE_REGEX.test(s)) {
      return PropertyInvalidReason.INVALID_SUBTYPE_VALUE;
    }

    if (subtype === "identifier" || subtype === "exact-identifier") {
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
  searchInterface: PropertyDefinitionSearchInterfacesType.STRING,
  allowsMinMaxLengthDefined: true,

  specialProperties: [
    {
      name: "referencedModule",
      type: "string",
      required: ["reference", "reference-tracked"],
    },
    {
      name: "referencedItemDefinition",
      type: "string",
      required: ["reference", "reference-tracked"],
    },
    {
      name: "referencedSearchProperty",
      type: "string",
      required: ["reference", "reference-tracked"],
    },
    {
      name: "referencedDisplayProperty",
      type: "string",
      required: ["reference", "reference-tracked"],
    },
    {
      name: "referencedFilteringPropertySet",
      type: "property-set",
    },
    {
      name: "referencedFilterByLanguage",
      type: "boolean",
    },
    {
      name: "referencedFilterByCreatedBySelf",
      type: "boolean",
    },
  ],

  // i18n attributes required
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    searchBase: CLASSIC_SEARCH_BASE_I18N,
    searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
    tooLargeErrorInclude: [null, "phone", "email", "identifier", "exact-identifier", "exact-value"],
    invalidSubtypeErrorInclude: ["phone", "email", "identifier", "locale", "comprehensive-locale", "language", "country", "currency"],
  },
};
export default typeValue;
