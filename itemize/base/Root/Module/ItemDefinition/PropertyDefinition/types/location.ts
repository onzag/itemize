import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLNonNull, GraphQLFloat, GraphQLString } from "graphql";
import { IGQLValue } from "../../../../gql";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import { CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N, LOCATION_SEARCH_I18N, CLASSIC_SEARCH_OPTIONAL_I18N } from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesType, PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import Knex from "knex";
import { ISQLTableRowValue } from "../../../../sql";

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
      type: GraphQLNonNull(GraphQLString),
    },
    atxt: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  specialProperties: [
    {
      // TODO implement
      name: "prefill_to_user_location_if_possible",
      type: "boolean",
    },
  ],
  sql: (sqlPrefix: string, id: string) => {
    return {
      [sqlPrefix + id + "_GEO"]: {
        type: "GEOMETRY(POINT,4326)",
      },
      [sqlPrefix + id + "_LAT"]: {
        type: "float",
      },
      [sqlPrefix + id + "_LNG"]: {
        type: "float",
      },
      [sqlPrefix + id + "_TXT"]: {
        type: "text",
      },
      [sqlPrefix + id + "_ATXT"]: {
        type: "text",
      },
    };
  },
  sqlIn : (value: IPropertyDefinitionSupportedLocationType, sqlPrefix: string, id, property, knex) => {
    if (value === null) {
      return {
        [sqlPrefix + id + "_GEO"]: null,
        [sqlPrefix + id + "_LAT"]: null,
        [sqlPrefix + id + "_LNG"]: null,
        [sqlPrefix + id + "_TXT"]: null,
        [sqlPrefix + id + "_ATXT"]: null,
      };
    }

    return {
      [sqlPrefix + id + "_GEO"]: knex.raw("ST_SetSRID(ST_MakePoint(?, ?), 4326);", value.lng, value.lat),
      [sqlPrefix + id + "_LAT"]: value.lat,
      [sqlPrefix + id + "_LNG"]: value.lng,
      [sqlPrefix + id + "_TXT"]: value.txt,
      [sqlPrefix + id + "_ATXT"]: value.atxt,
    };
  },
  sqlOut: (data: {[key: string]: any}, sqlPrefix: string, id: string) => {
    const result: IPropertyDefinitionSupportedLocationType = {
      lat: data[sqlPrefix + id + "_LAT"],
      lng: data[sqlPrefix + id + "_LNG"],
      txt: data[sqlPrefix + id + "_TXT"],
      atxt: data[sqlPrefix + id + "_ATXT"],
    };
    if (result.lat === null || result.lng === null) {
      return null;
    }
    return result;
  },
  sqlSearch: (data: IGQLValue, sqlPrefix: string, id: string, knexBuilder) => {
    const radiusName = PropertyDefinitionSearchInterfacesPrefixes.RADIUS + id;
    const locationName = PropertyDefinitionSearchInterfacesPrefixes.LOCATION + id;

    if (
      typeof data[locationName] !== "undefined" && data[locationName] !== null &&
      typeof data[radiusName] !== "undefined" && data[radiusName] !== null
    ) {
      const lng = data[locationName].lng || 0;
      const lat = data[locationName].lat || 0;
      const distance = (data[radiusName].normalizedValue || 0) * 1000;
      knexBuilder.andWhereRaw(
        "ST_DWithin(??, ST_MakePoint(?,?)::geography, ?)",
        [
          sqlPrefix + id,
          lng,
          lat,
          distance,
        ],
      );
    }
  },
  sqlEqual: (
    value: IPropertyDefinitionSupportedLocationType,
    sqlPrefix: string,
    id: string,
    knex: Knex,
    columnName?: string,
  ) => {
    if (!columnName) {
      return {
        [sqlPrefix + id + "_LAT"]: value.lat,
        [sqlPrefix + id + "_LNG"]: value.lng,
      };
    }
    return knex.raw(
      "?? = ? AND ?? = ? AS ??",
      [
        sqlPrefix + id + "_LAT",
        value.lat,
        sqlPrefix + id + "_LNG",
        value.lng,
        columnName,
      ],
    );
  },
  sqlLocalEqual: (
    value: IPropertyDefinitionSupportedLocationType,
    sqlPrefix: string,
    id: string,
    data: ISQLTableRowValue,
  ) => {
    if (value === null) {
      return data[sqlPrefix + id + "_LAT"] === value;
    }
    return data[sqlPrefix + id + "_LAT"] === value.lat &&
      data[sqlPrefix + id + "_LNG"] === value.lng;
  },
  // locations just contain this basic data
  validate: (l: IPropertyDefinitionSupportedLocationType) => {
    if (
      typeof l.lat !== "number" ||
      typeof l.lng !== "number" ||
      typeof l.txt !== "string" ||
      (typeof l.atxt !== "string" && l.atxt !== null)
    ) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    return null;
  },
  // they are searchable
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.LOCATION_RADIUS,
  // i18n with the distance attributes
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    searchBase: LOCATION_SEARCH_I18N,
    searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
  },
};
export default typeValue;
