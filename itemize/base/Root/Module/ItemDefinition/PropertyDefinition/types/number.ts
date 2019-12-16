import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLFloat } from "graphql";
import {
  stardardSQLInFn,
  standardSQLOutFn,
  standardSQLSearchFnExactAndRange,
  standardSQLEqualFn,
  getStandardSQLFnFor,
} from "../sql";
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

export type PropertyDefinitionSupportedNumberType = number;
const typeValue: IPropertyDefinitionSupportedType = {
  // a number is just a number can be integer or decimal
  json: "number",
  gql: GraphQLFloat,
  sql: getStandardSQLFnFor("float"),
  sqlIn: stardardSQLInFn,
  sqlOut: standardSQLOutFn,
  sqlSearch: standardSQLSearchFnExactAndRange,
  sqlEqual: standardSQLEqualFn,
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
