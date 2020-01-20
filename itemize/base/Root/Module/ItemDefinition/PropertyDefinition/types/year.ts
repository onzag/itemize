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
  standardSQLLocalEqualFn,
  standardSQLLocalSearchExactAndRange,
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

export type PropertyDefinitionSupportedYearType = number;
const typeValue: IPropertyDefinitionSupportedType = {
  gql: GraphQLInt,
  // years can be set as a number
  json: "number",
  sql: getStandardSQLFnFor && getStandardSQLFnFor("integer"),
  sqlIn: stardardSQLInFn,
  sqlOut: standardSQLOutFn,
  sqlSearch: standardSQLSearchFnExactAndRange,
  sqlLocalSearch: standardSQLLocalSearchExactAndRange,
  sqlEqual: standardSQLEqualFn,
  sqlLocalEqual: standardSQLLocalEqualFn,

  // validates
  validate: (n: PropertyDefinitionSupportedYearType) => {
    if (isNaN(n)) {
      return PropertyInvalidReason.INVALID_VALUE;
    } else if (!Number.isInteger(n)) {
      return PropertyInvalidReason.INVALID_VALUE;
    } else if (n > MAX_SUPPORTED_YEAR) {
      return PropertyInvalidReason.TOO_LARGE;
    } else if (n > MIN_SUPPORTED_YEAR) {
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
