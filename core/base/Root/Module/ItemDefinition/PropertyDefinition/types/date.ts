import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLString } from "graphql";
import { stardardSQLInFn, standardSQLOutFn } from "../sql";
import { IGQLValue } from "../../../../gql";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import {
  CLASSIC_BASE_I18N,
  CLASSIC_OPTIONAL_I18N,
  CLASSIC_SEARCH_BASE_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N,
  CLASSIC_SEARCH_RANGED_I18N,
  CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
} from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesType } from "../search-interfaces";

export type PropertyDefinitionSupportedDateType = string;
const typeValue: IPropertyDefinitionSupportedType = {
  gql: GraphQLString,
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
  supportsIcons: false,
  sql: "date",
  sqlIn: stardardSQLInFn,
  sqlOut: standardSQLOutFn,
  sqlSearch: (data: IGQLValue, sqlPrefix: string, id: string, knexBuilder: any) => {
    // TODO date matching somehow, we need to check how input and output goes as
    // well, we need to be able to get date information properly accross
  },

  validate: (d: PropertyDefinitionSupportedDateType) => {
    if (d === "Invalid Date") {
      return PropertyInvalidReason.INVALID_DATETIME;
    }

    const dateForm = new Date(d);
    if (isNaN(dateForm.getTime()) || dateForm.toISOString() !== d) {
      return PropertyInvalidReason.INVALID_DATETIME;
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
