import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLNonNull, GraphQLFloat } from "graphql";
import { IGQLValue } from "../../../../gql";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import { CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N, LOCATION_SEARCH_I18N, CLASSIC_SEARCH_OPTIONAL_I18N } from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesType } from "../search-interfaces";

export interface IPropertyDefinitionSupportedLocationType {
  lng: number;
  lat: number;
  txt: string;
  atxt: string;
}

const typeValue: IPropertyDefinitionSupportedType = {
  gql: "PROPERTY_TYPE__Location",
  gqlFields: {
    lng: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    lat: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    txt: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    atxt: {
      type: GraphQLNonNull(GraphQLFloat),
    },
  },
  specialProperties: [
    {
      name: "prefillToUserLocationIfPossible",
      type: "boolean",
    },
  ],
  sql: (id: string) => {
    const obj = {};
    obj[id + "_GEO"] = "GEOGRAPHY(Point)";
    obj[id + "_LAT"] = "float";
    obj[id + "_LNG"] = "float";
    obj[id + "_TXT"] = "text";
    obj[id + "_ATXT"] = "text";
    return obj;
  },
  sqlIn : (value: IPropertyDefinitionSupportedLocationType, id, property, raw) => {
    const obj = {};
    obj[id + "_GEO"] = raw("POINT(?, ?)", value.lng, value.lat);
    obj[id + "_LAT"] = value.lat;
    obj[id + "_LNG"] = value.lng;
    obj[id + "_TXT"] = value.txt;
    obj[id + "_ATXT"] = value.atxt;
    return obj;
  },
  sqlOut: (data: {[key: string]: any}, id: string) => {
    const result: IPropertyDefinitionSupportedLocationType = {
      lat: data[id + "_LAT"],
      lng: data[id + "_LNG"],
      txt: data[id + "_TXT"],
      atxt: data[id + "_ATXT"],
    };
    if (result.lat === null || result.lng === null) {
      return null;
    }
    return result;
  },
  sqlSearch: (data: IGQLValue, sqlPrefix: string, id: string, knexBuilder) => {
    // TODO
  },
  // locations just contain this basic data
  validate: (l: IPropertyDefinitionSupportedLocationType) => {
    if (
      typeof l.lat !== "number" ||
      typeof l.lng !== "number" ||
      typeof l.txt !== "string" ||
      (typeof l.atxt !== "string" && l.atxt !== null)
    ) {
      return PropertyInvalidReason.UNSPECIFIED;
    }

    return null;
  },
  // they are searchable
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.LOCATION_RADIUS,
  supportsIcons: false,
  // i18n with the distance attributes
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    searchBase: LOCATION_SEARCH_I18N,
    searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
  },
};
export default typeValue;
