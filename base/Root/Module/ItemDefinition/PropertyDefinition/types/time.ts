/**
 * Contains the time type description
 *
 * @module
 */

import { IPropertyDefinitionSupportedType } from "../types";
import {
  standardSQLInFn,
  standardSQLOutFn,
  standardSQLSearchFnExactAndRange,
  standardSQLEqualFn,
  getStandardSQLFnFor,
  standardSQLBtreeIndexable,
  standardSQLOrderBy,
  standardSQLSelect,
  standardSQLElasticInFn,
  getStandardElasticForWithNullField,
  standardElasticSearchFnWithNullFieldExactAndRange,
  standardElasticOrderBy,
} from "../sql";
import {
  standardSQLSSCacheEqualFn, standardLocalEqual,
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
const typeValue: IPropertyDefinitionSupportedType<PropertyDefinitionSupportedTimeType> = {
  rq: {
    type: "string",
  },
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
  sql: getStandardSQLFnFor && getStandardSQLFnFor("TIME"),
  elastic: getStandardElasticForWithNullField && getStandardElasticForWithNullField("date", TIME_FORMAT),
  sqlSelect: standardSQLSelect,
  sqlIn: standardSQLInFn,
  sqlOut: standardSQLOutFn && standardSQLOutFn.bind(null, "00:00:00"),
  sqlElasticIn: standardSQLElasticInFn,
  sqlSearch: standardSQLSearchFnExactAndRange,
  elasticSearch: standardElasticSearchFnWithNullFieldExactAndRange,
  sqlEqual: standardSQLEqualFn,
  sqlSSCacheEqual: standardSQLSSCacheEqualFn,
  sqlBtreeIndexable: standardSQLBtreeIndexable,
  sqlMantenience: null,
  sqlStrSearch: null,
  elasticStrSearch: null,
  localStrSearch: null,
  sqlOrderBy: standardSQLOrderBy,
  elasticSort: standardElasticOrderBy,
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
    const dateA = (new Date("1970-01-01T" + arg.a as string)).getTime();
    const dateB = (new Date("1970-01-01T" + arg.b as string)).getTime();
    if (arg.direction === "desc") {
      return dateB - dateA;
    }
    return dateA - dateB;
  },
  localSearch: dateLocalSearchExactAndRange.bind(null, TIME_FORMAT),
  localEqual: standardLocalEqual,

  validate: (d: PropertyDefinitionSupportedDateType) => {
    if (d === "Invalid Date") {
      return PropertyInvalidReason.INVALID_VALUE;
    } else if (d === "now") {
      return null;
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
