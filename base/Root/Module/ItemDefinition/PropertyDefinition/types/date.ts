/**
 * Contains the date type description
 *
 * @module
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLString } from "graphql";
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
import { dateLocalSearchExactAndRange } from "../local-search";

/**
 * The date is represented as a single string
 */
export type PropertyDefinitionSupportedDateType = string;

/**
 * The type specifies how a date behaves in the app
 */
const typeValue: IPropertyDefinitionSupportedType = {
  gql: GraphQLString,
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
  sql: getStandardSQLFnFor && getStandardSQLFnFor("DATE"),
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
    } else if (arg.a === arg.b) {
      return 0;
    }
    const dateA = (new Date(arg.a as string)).getTime();
    const dateB = (new Date(arg.b as string)).getTime();
    if (arg.direction === "desc") {
      return dateB - dateA;
    }
    return dateA - dateB;
  },

  localSearch: dateLocalSearchExactAndRange.bind(null, DATE_FORMAT),
  localEqual: standardLocalEqual,

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
