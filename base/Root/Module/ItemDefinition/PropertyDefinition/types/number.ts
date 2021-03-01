/**
 * Contains the number type description
 *
 * @module
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLFloat } from "graphql";
import {
  standardSQLInFn,
  standardSQLOutFn,
  standardSQLSearchFnExactAndRange,
  standardSQLEqualFn,
  getStandardSQLFnFor,
  standardSQLBtreeIndexable,
  standardSQLOrderBy,
  standardSQLSelect,
} from "../sql";
import {
  standardSQLSSCacheEqualFn, standardLocalEqual,
} from "../local-sql";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import {
  MAX_SUPPORTED_REAL,
  MIN_SUPPORTED_REAL,
  MAX_DECIMAL_COUNT,
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
 * The number type is described by a simple number
 */
export type PropertyDefinitionSupportedNumberType = number;

/**
 * The type of the number describe how numbers behave in the app
 */
const typeValue: IPropertyDefinitionSupportedType = {
  // a number is just a number can be integer or decimal
  json: "number",
  gql: GraphQLFloat,
  sql: getStandardSQLFnFor && getStandardSQLFnFor("REAL"),
  sqlSelect: standardSQLSelect,
  sqlIn: standardSQLInFn,
  sqlOut: standardSQLOutFn,
  sqlSearch: standardSQLSearchFnExactAndRange,
  sqlEqual: standardSQLEqualFn,
  sqlSSCacheEqual: standardSQLSSCacheEqualFn,
  sqlBtreeIndexable: standardSQLBtreeIndexable,
  sqlMantenience: null,
  sqlStrSearch: null,
  localStrSearch: null,
  sqlOrderBy: standardSQLOrderBy,
  localOrderBy: (arg) => {
    if (arg.a === null && arg.b === null) {
      return 0;
    } else if (arg.a === null) {
      return arg.nulls === "last" ? 1 : -1;
    } else if (arg.b === null) {
      return arg.nulls === "last" ? -1 : 1;
    }
    if (arg.direction === "desc") {
      return arg.b as number - (arg.a as number);
    }
    return arg.a as number - (arg.b as number);
  },

  localSearch: standardLocalSearchExactAndRange,
  localEqual: standardLocalEqual,

  // the validator
  validate: (n: PropertyDefinitionSupportedNumberType) => {
    if (isNaN(n)) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    if (n > MAX_SUPPORTED_REAL) {
      return PropertyInvalidReason.TOO_LARGE;
    } else if (n < MIN_SUPPORTED_REAL) {
      return PropertyInvalidReason.TOO_SMALL;
    }

    const splittedDecimals = n.toString().split(".");
    if (!splittedDecimals[1] || splittedDecimals[1].length <= MAX_DECIMAL_COUNT) {
      return null;
    }

    return PropertyInvalidReason.TOO_MANY_DECIMALS;
  },
  // it is searchable
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
  allowsMinMaxDefined: true,
  allowsMaxDecimalCountDefined: true,
  // i18n attributes required
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    searchBase: CLASSIC_SEARCH_BASE_I18N,
    searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
    searchRange: CLASSIC_SEARCH_RANGED_I18N,
    searchRangeOptional: CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
    tooSmallErrorInclude: true,
    tooLargeErrorInclude: true,
    tooManyDecimalsErrorInclude: true,
  },
};
export default typeValue;
