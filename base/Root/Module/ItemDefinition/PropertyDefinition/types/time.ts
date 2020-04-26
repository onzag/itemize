/**
 * Contains the time type description
 *
 * @packageDocumentation
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLString } from "graphql";
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
import { PropertyDefinitionSupportedDateType } from "./date";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import {
  CLASSIC_BASE_I18N,
  CLASSIC_OPTIONAL_I18N,
  CLASSIC_SEARCH_BASE_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N,
  CLASSIC_SEARCH_RANGED_I18N,
  CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
  TIME_FORMAT,
} from "../../../../../../constants";
import Moment from "moment";
import { PropertyDefinitionSearchInterfacesType } from "../search-interfaces";
import { dateLocalSearchExactAndRange } from "../local-search";

/**
 * Time is defined as a string, it's clock time
 */
export type PropertyDefinitionSupportedTimeType = string;

/**
 * The behaviour of the time is described by this type
 */
const typeValue: IPropertyDefinitionSupportedType = {
  gql: GraphQLString,
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
  sql: getStandardSQLFnFor && getStandardSQLFnFor("time"),
  sqlIn: stardardSQLInFn,
  sqlOut: standardSQLOutFn,
  sqlSearch: standardSQLSearchFnExactAndRange,
  sqlEqual: standardSQLEqualFn,
  sqlLocalEqual: standardSQLLocalEqualFn,

  localSearch: dateLocalSearchExactAndRange.bind(null, TIME_FORMAT),
  localEqual: standardLocalEqual,

  validate: (d: PropertyDefinitionSupportedDateType) => {
    if (d === "Invalid Date") {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    const dateForm = Moment(d, TIME_FORMAT);
    if (!dateForm.isValid() || dateForm.format(TIME_FORMAT) !== d) {
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
