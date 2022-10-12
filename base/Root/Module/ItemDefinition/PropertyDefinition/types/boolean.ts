/**
 * Contains the boolean type description
 *
 * @module
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLBoolean } from "graphql";
import {
  standardSQLInFn,
  standardSQLOutFn,
  standardSQLSearchFnExactAndRange,
  standardSQLEqualFn,
  getStandardSQLFnFor,
  standardSQLBtreeIndexable,
  standardSQLSelect,
  standardSQLElasticInFn,
  getStandardElasticForWithNullField,
  standardElasticSearchFnWithNullFieldExactAndRange,
} from "../sql";
import {
  standardSQLSSCacheEqualFn,
  standardLocalEqual,
} from "../local-sql";
import { REDUCED_BASE_I18N, CLASSIC_OPTIONAL_I18N, REDUCED_SEARCH_BASE_I18N, CLASSIC_SEARCH_OPTIONAL_I18N } from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesType } from "../search-interfaces";
import { standardLocalSearchExactAndRange } from "../local-search";

/**
 * The representation of a boolean type is equal to a boolean
 */
export type PropertyDefinitionSupportedBooleanType = boolean;
/**
 * The that specifies how a boolean behaves in the app
 */
const typeValue: IPropertyDefinitionSupportedType<PropertyDefinitionSupportedBooleanType> = {
  // a boolean type can be written as a boolean
  json: "boolean",
  gql: GraphQLBoolean,
  sql: getStandardSQLFnFor && getStandardSQLFnFor("BOOLEAN"),
  elastic: getStandardElasticForWithNullField && getStandardElasticForWithNullField("boolean"),
  sqlSelect: standardSQLSelect,
  sqlIn: standardSQLInFn,
  sqlOut: standardSQLOutFn && standardSQLOutFn.bind(null, false),
  sqlElasticIn: standardSQLElasticInFn,
  sqlSearch: standardSQLSearchFnExactAndRange,
  elasticSearch: standardElasticSearchFnWithNullFieldExactAndRange,
  sqlStrSearch: null,
  elasticStrSearch: null,
  localStrSearch: null,
  sqlEqual: standardSQLEqualFn,
  sqlSSCacheEqual: standardSQLSSCacheEqualFn,
  sqlBtreeIndexable: standardSQLBtreeIndexable,
  sqlMantenience: null,
  sqlOrderBy: null,
  elasticSort: null,
  localOrderBy: null,

  localSearch: standardLocalSearchExactAndRange,
  localEqual: standardLocalEqual,

  // it is searchable by default
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.EXACT,
  // the i18n attributes
  i18n: {
    base: REDUCED_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N.concat("true_label", "false_label", "null_label"),
    searchBase: REDUCED_SEARCH_BASE_I18N,
    searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N.concat("search.true_label", "search.false_label", "search.null_label"),
  },
};
export default typeValue;
