import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLBoolean } from "graphql";
import { stardardSQLInFn, standardSQLOutFn, standardSQLSearchFnExactAndRange } from "../sql";
import { REDUCED_BASE_I18N, CLASSIC_OPTIONAL_I18N, REDUCED_SEARCH_BASE_I18N, CLASSIC_SEARCH_OPTIONAL_I18N } from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesType } from "../search-interfaces";

export type PropertyDefinitionSupportedBooleanType = boolean;
const typeValue: IPropertyDefinitionSupportedType = {
  // a boolean type can be written as a boolean
  json: "boolean",
  gql: GraphQLBoolean,
  sql: "boolean",
  sqlIn: stardardSQLInFn,
  sqlOut: standardSQLOutFn,
  sqlSearch: standardSQLSearchFnExactAndRange,

  // it is searchable by default
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.EXACT,
  // the i18n attributes
  supportsIcons: true,
  i18n: {
    base: REDUCED_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    searchBase: REDUCED_SEARCH_BASE_I18N,
    searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
  },
};
export default typeValue;
