import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLString } from "graphql";
import {
  stardardSQLInFn,
  standardSQLOutFn,
  standardSQLSearchFnExactAndRange,
  standardSQLEqualFn,
  getStandardSQLFnFor,
  standardSQLLocalEqualFn,
  dateSQLLocalSearchExactAndRange,
} from "../sql";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import {
  CLASSIC_BASE_I18N,
  CLASSIC_OPTIONAL_I18N,
  CLASSIC_SEARCH_BASE_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N,
  CLASSIC_SEARCH_RANGED_I18N,
  CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
  DATE_FORMAT,
} from "../../../../../../constants";
import Moment from "moment";
import { PropertyDefinitionSearchInterfacesType } from "../search-interfaces";

export type PropertyDefinitionSupportedDateType = string;
const typeValue: IPropertyDefinitionSupportedType = {
  gql: GraphQLString,
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
  sql: getStandardSQLFnFor && getStandardSQLFnFor("date"),
  sqlIn: stardardSQLInFn,
  sqlOut: standardSQLOutFn,
  sqlSearch: standardSQLSearchFnExactAndRange,
  sqlLocalSearch: dateSQLLocalSearchExactAndRange,
  sqlEqual: standardSQLEqualFn,
  sqlLocalEqual: standardSQLLocalEqualFn,

  validate: (d: PropertyDefinitionSupportedDateType) => {
    if (d === "Invalid Date") {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    const dateForm = Moment(d, DATE_FORMAT);
    if (!dateForm.isValid() || dateForm.format(DATE_FORMAT) !== d) {
      return PropertyInvalidReason.INVALID_VALUE;
    }
    return null;
  },
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
