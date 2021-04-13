/**
 * Contains the taglist type description
 * the taglist represents an array of string of defined
 * types that allows for tagging
 *
 * @module
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLString } from "graphql";
import {
  standardSQLOutFn,
  getStandardSQLFnFor,
  standardSQLSelect,
} from "../sql";
import { PropertyInvalidReason, IPropertyDefinitionRawJSONDataType } from "../../PropertyDefinition";
import {
  CLASSIC_BASE_I18N,
  CLASSIC_OPTIONAL_I18N,
  CLASSIC_SEARCH_BASE_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N,
  SQL_CONSTRAINT_PREFIX,
  INCLUDE_PREFIX,
} from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesType, PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import { taglistSQLEqualFn, taglistSQLIn, taglistSQLSearch, taglistSQLSSCacheEqualFn } from "../sql/taglist";

/**
 * The string type is described, by, you guessed it, a string
 */
export type PropertyDefinitionSupportedTagListType = string[];

/**
 * The behaviour of strings is described by this type
 */
const typeValue: IPropertyDefinitionSupportedType<PropertyDefinitionSupportedTagListType> = {
  gql: GraphQLString,
  json: "string",
  gqlList: true,
  sql: getStandardSQLFnFor && getStandardSQLFnFor("TEXT[]", null, (subtype: string, sqlPrefix: string, id: string) => {
    return {
      type: "gin",
      id: SQL_CONSTRAINT_PREFIX + sqlPrefix + id,
      level: 0,
    }
  }),
  sqlSelect: standardSQLSelect,
  sqlIn: taglistSQLIn,
  sqlOut: standardSQLOutFn,
  sqlSearch: taglistSQLSearch,
  sqlEqual: taglistSQLEqualFn,
  sqlSSCacheEqual: taglistSQLSSCacheEqualFn,
  sqlBtreeIndexable: null,
  sqlMantenience: null,
  sqlStrSearch: null,
  localStrSearch: null,
  sqlOrderBy: null,
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

    if (typeof usefulArgs[searchName] !== "undefined" && usefulArgs[searchName] !== null) {
      const searchMatch = usefulArgs[searchName];
      const propertyValue = arg.include ? arg.gqlValue.DATA[arg.include.getId()][arg.id] : arg.gqlValue.DATA[arg.id];

      if (propertyValue === null) {
        return false;
      }

      return propertyValue.every((v: string) => searchMatch.includes(v)) && searchMatch.every((v: string) => propertyValue.includes(v));
    }

    return true;
  },
  localEqual: (arg) => {
    const valueA = arg.a as string[];
    const valueB = arg.b as any as string[];

    if (valueA === null || valueB === null) {
      return valueB === valueA;
    }

    return valueA.every((v) => valueB.includes(v)) && valueB.every((v) => valueA.includes(v));
  },
  nullableDefault: [],
  validate: (s: PropertyDefinitionSupportedTagListType, p: IPropertyDefinitionRawJSONDataType) => {
    if (!s.every((v) => {
      return (
        typeof v === "string" &&
        p.values.includes(v)
      );
    })) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    if (s.length > p.values.length) {
      return PropertyInvalidReason.TOO_LARGE;
    }

    return null;
  },
  // it is searchable by an exact value, use text for organic things
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.TAGS,
  allowsMinMaxLengthDefined: true,
  requiresValues: true,

  // i18n attributes required
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    searchBase: CLASSIC_SEARCH_BASE_I18N,
    searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
    tooLargeErrorInclude: true,
  },
};
export default typeValue;
