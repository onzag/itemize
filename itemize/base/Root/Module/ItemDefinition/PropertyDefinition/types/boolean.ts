/**
 * Contains the boolean type description
 *
 * @packageDocumentation
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLBoolean } from "graphql";
import {
  stardardSQLInFn,
  standardSQLOutFn,
  standardSQLSearchFnExactAndRange,
  standardSQLEqualFn,
  getStandardSQLFnFor,
} from "../sql";
import {
  standardSQLLocalEqualFn,
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
const typeValue: IPropertyDefinitionSupportedType = {
  // a boolean type can be written as a boolean
  json: "boolean",
  gql: GraphQLBoolean,
  sql: getStandardSQLFnFor && getStandardSQLFnFor("boolean"),
  sqlIn: stardardSQLInFn,
  sqlOut: standardSQLOutFn,
  sqlSearch: standardSQLSearchFnExactAndRange,
  sqlEqual: standardSQLEqualFn,
  sqlLocalEqual: standardSQLLocalEqualFn,

  localSearch: standardLocalSearchExactAndRange,

  // it is searchable by default
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.EXACT,
  // the i18n attributes
  i18n: {
    base: REDUCED_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    searchBase: REDUCED_SEARCH_BASE_I18N,
    searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
  },
};
export default typeValue;
