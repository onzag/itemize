/**
 * Contains the integer type description
 *
 * @packageDocumentation
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLInt } from "graphql";
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
  MAX_SUPPORTED_INTEGER,
  MIN_SUPPORTED_INTEGER,
  CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N,
  CLASSIC_SEARCH_BASE_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N,
  CLASSIC_SEARCH_RANGED_I18N,
  CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
} from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesType } from "../search-interfaces";
import { standardLocalSearchExactAndRange } from "../local-search";

/**
 * The integer is descibred by a number
 */
export type PropertyDefinitionSupportedIntegerType = number;

/**
 * The type defines the behaviour of integers in the app
 */
const typeValue: IPropertyDefinitionSupportedType = {
  // an integer is represented as a number
  json: "number",
  gql: GraphQLInt,
  sql: getStandardSQLFnFor && getStandardSQLFnFor("integer"),
  sqlIn: stardardSQLInFn,
  sqlOut: standardSQLOutFn,
  sqlSearch: standardSQLSearchFnExactAndRange,
  sqlEqual: standardSQLEqualFn,
  sqlLocalEqual: standardSQLLocalEqualFn,
  localEqual: standardLocalEqual,
  sqlMantenience: null,

  localSearch: standardLocalSearchExactAndRange,

  // it gotta be validated to check it's a number
  validate: (n: PropertyDefinitionSupportedIntegerType) => {
    if (isNaN(n) || !Number.isInteger(n)) {
      return PropertyInvalidReason.INVALID_VALUE;
    } else if (n > MAX_SUPPORTED_INTEGER) {
      return PropertyInvalidReason.TOO_LARGE;
    } else if (n < MIN_SUPPORTED_INTEGER) {
      return PropertyInvalidReason.TOO_SMALL;
    }

    return null;
  },
  // it is searchable by exact and range value
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
  allowsMinMaxDefined: true,
  // i18n attributes
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    searchBase: CLASSIC_SEARCH_BASE_I18N,
    searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
    searchRange: CLASSIC_SEARCH_RANGED_I18N,
    searchRangeOptional: CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
    tooSmallErrorInclude: true,
    tooLargeErrorInclude: true,
  },
};
export default typeValue;
