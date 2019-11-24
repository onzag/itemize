import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLInt } from "graphql";
import {
  stardardSQLInFn,
  standardSQLOutFn,
  standardSQLSearchFnExactAndRange,
  standardSQLEqualFn,
  getStandardSQLFnFor,
} from "../sql";
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

export type PropertyDefinitionSupportedIntegerType = number;
const typeValue: IPropertyDefinitionSupportedType = {
  // an integer is represented as a number
  json: "number",
  gql: GraphQLInt,
  sql: getStandardSQLFnFor("integer"),
  sqlIn: stardardSQLInFn,
  sqlOut: standardSQLOutFn,
  sqlSearch: standardSQLSearchFnExactAndRange,
  sqlEqual: standardSQLEqualFn,

  supportsAutocomplete: true,
  // it gotta be validated to check it's a number
  validate: (n: PropertyDefinitionSupportedIntegerType) => {
    if (isNaN(n) || !Number.isInteger(n)) {
      return PropertyInvalidReason.UNSPECIFIED;
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
  supportsIcons: true,
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