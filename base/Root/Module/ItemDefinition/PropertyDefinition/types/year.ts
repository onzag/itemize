/**
 * Contains the year type description
 *
 * @module
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLInt } from "graphql";
import {
  standardSQLInFn,
  standardSQLOutFn,
  standardSQLSearchFnExactAndRange,
  standardSQLEqualFn,
  getStandardSQLFnFor,
  standardSQLBtreeIndexable,
  standardSQLOrderBy,
  standardSQLSelect,
  standardElasticSearchFnExactAndRange,
  standardSQLElasticInFn,
  getStandardElasticFor,
  standardElasticOrderBy,
} from "../sql";
import {
  standardSQLSSCacheEqualFn, standardLocalEqual,
} from "../local-sql";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import {
  MAX_SUPPORTED_YEAR,
  MIN_SUPPORTED_YEAR,
  CLASSIC_BASE_I18N,
  CLASSIC_OPTIONAL_I18N,
  CLASSIC_SEARCH_BASE_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N,
  CLASSIC_SEARCH_RANGED_I18N,
  CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
} from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesType } from "../search-interfaces";
import { standardLocalSearchExactAndRange } from "../local-search";

/**
 * Years are simple integers
 */
export type PropertyDefinitionSupportedYearType = number;

/**
 * The type describes how the year type behaves in the app
 */
const typeValue: IPropertyDefinitionSupportedType<PropertyDefinitionSupportedYearType> = {
  gql: GraphQLInt,
  // years can be set as a number
  json: "number",
  sql: getStandardSQLFnFor && getStandardSQLFnFor("SMALLINT"),
  elastic: getStandardElasticFor && getStandardElasticFor("short", -1),
  sqlSelect: standardSQLSelect,
  sqlIn: standardSQLInFn,
  sqlOut: standardSQLOutFn && standardSQLOutFn.bind(null, 0),
  sqlElasticIn: standardSQLElasticInFn,
  sqlSearch: standardSQLSearchFnExactAndRange,
  elasticSearch: standardElasticSearchFnExactAndRange && standardElasticSearchFnExactAndRange.bind(null, -1),
  sqlEqual: standardSQLEqualFn,
  sqlSSCacheEqual: standardSQLSSCacheEqualFn,
  sqlBtreeIndexable: standardSQLBtreeIndexable,
  sqlStrSearch: null,
  elasticStrSearch: null,
  localStrSearch: null,
  sqlMantenience: null,
  sqlOrderBy: standardSQLOrderBy,
  elasticSort: standardElasticOrderBy,
  localOrderBy: (arg) => {
    if (arg.a === null && arg.b === null) {
      return 0;
    } else if (arg.a === null) {
      return arg.nulls === "last" ? 1 : -1;
    } else if (arg.b === null) {
      return arg.nulls === "last" ? -1 : 1;
    }
    if (arg.direction === "desc") {
      return (arg.b as number) - (arg.a as number);
    }
    return (arg.a as number) - (arg.b as number);
  },

  localSearch: standardLocalSearchExactAndRange,
  localEqual: standardLocalEqual,

  // validates
  validate: (n: PropertyDefinitionSupportedYearType) => {
    if (isNaN(n)) {
      return PropertyInvalidReason.INVALID_VALUE;
    } else if (!Number.isInteger(n)) {
      return PropertyInvalidReason.INVALID_VALUE;
    } else if (n > MAX_SUPPORTED_YEAR) {
      return PropertyInvalidReason.TOO_LARGE;
    } else if (n < MIN_SUPPORTED_YEAR) {
      return PropertyInvalidReason.TOO_SMALL;
    }

    return null;
  },
  // searchable attributes and supports range
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
  allowsMinMaxDefined: true,
  // i18n data
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    searchBase: CLASSIC_SEARCH_BASE_I18N,
    searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
    searchRange: CLASSIC_SEARCH_RANGED_I18N,
    searchRangeOptional: CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
  },
};
export default typeValue;
