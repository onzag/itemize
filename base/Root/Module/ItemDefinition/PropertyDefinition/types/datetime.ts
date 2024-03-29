/**
 * Contains the datetime type description
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
  DATETIME_FORMAT,
  DATETIME_FORMAT_ELASTIC_NANO,
} from "../../../../../../constants";
import Moment from "moment";
import { PropertyDefinitionSearchInterfacesType } from "../search-interfaces";
import { dateLocalSearchExactAndRange } from "../local-search";

/**
 * A datetime is represented as a string
 */
export type PropertyDefinitionSupportedDateTimeType = string;

/**
 * The behaviour of a datetime as how it behaves in the app
 */
const typeValue: IPropertyDefinitionSupportedType<PropertyDefinitionSupportedDateTimeType> = {
  rq: {
    type: "string",
  },
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
  sql: getStandardSQLFnFor && getStandardSQLFnFor("TIMESTAMPTZ"),
  elastic: getStandardElasticForWithNullField && getStandardElasticForWithNullField("date", DATETIME_FORMAT_ELASTIC_NANO),
  sqlSelect: standardSQLSelect,
  sqlIn: standardSQLInFn,
  sqlOut: standardSQLOutFn && standardSQLOutFn.bind(null, "1970-01-01 00:00:00.00000+00"),
  sqlElasticIn: standardSQLElasticInFn,
  sqlSearch: standardSQLSearchFnExactAndRange,
  elasticSearch: standardElasticSearchFnWithNullFieldExactAndRange,
  sqlEqual: standardSQLEqualFn,
  sqlSSCacheEqual: standardSQLSSCacheEqualFn,
  localEqual: standardLocalEqual,
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
    const dateA = (new Date(arg.a as string)).getTime();
    const dateB = (new Date(arg.b as string)).getTime();
    if (arg.direction === "desc") {
      return dateB - dateA;
    }
    return dateA - dateB;
  },

  localSearch: dateLocalSearchExactAndRange.bind(null, DATETIME_FORMAT),

  validate: (d: PropertyDefinitionSupportedDateType) => {
    if (d === "Invalid Date") {
      return PropertyInvalidReason.INVALID_VALUE;
    } else if (d === "now") {
      return null;
    }

    const dateForm = Moment(d, DATETIME_FORMAT).utc();
    if (!dateForm.isValid()) {
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
