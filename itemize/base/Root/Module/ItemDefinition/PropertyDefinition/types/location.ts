/**
 * Contains the location type description
 *
 * @packageDocumentation
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLNonNull, GraphQLFloat, GraphQLString } from "graphql";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import { CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N, LOCATION_SEARCH_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N, INCLUDE_PREFIX } from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesType, PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import Knex from "knex";
import { ISQLTableRowValue } from "../../../../sql";
import { IGQLValue, IGQLArgs } from "../../../../../../gql-querier";
import { IPropertyDefinitionSupportedUnitType } from "./unit";

/**
 * The haversine formula extracted from stackoverflow
 * https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
 * @param lat1 the latitude 1
 * @param lon1 the longitude 1
 * @param lat2 the latitude 2
 * @param lon2 the longitude 2
 */
function getDistanceFromLatLonInMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d * 1000;
}

/**
 * Convert degrees to radians
 * @param deg the degrees in numbers
 */
function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

/**
 * The location is described by an object with longitude, latitude,
 * a text description and an alternative text description
 */
export interface IPropertyDefinitionSupportedLocationType {
  lng: number;
  lat: number;
  txt: string;
  atxt: string;
}

/**
 * The type describes the behaviour of the location in the app
 */
const typeValue: IPropertyDefinitionSupportedType = {
  gql: "PROPERTY_TYPE__Location",
  gqlFields: {
    lng: {
      type: GraphQLNonNull && GraphQLNonNull(GraphQLFloat),
    },
    lat: {
      type: GraphQLNonNull && GraphQLNonNull(GraphQLFloat),
    },
    txt: {
      type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
    },
    atxt: {
      type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
    },
  },
  specialProperties: [
    {
      // TODO implement
      name: "prefillToUserLocationIfPossible",
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
  sqlIn: (value: IPropertyDefinitionSupportedLocationType, sqlPrefix: string, id, property, knex) => {
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
  sqlOut: (data: ISQLTableRowValue, sqlPrefix: string, id: string) => {
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
  sqlSearch: (args: IGQLArgs, sqlPrefix: string, id: string, knexBuilder) => {
    const radiusName = PropertyDefinitionSearchInterfacesPrefixes.RADIUS + id;
    const locationName = PropertyDefinitionSearchInterfacesPrefixes.LOCATION + id;

    if (
      typeof args[locationName] !== "undefined" && args[locationName] !== null &&
      typeof args[radiusName] !== "undefined" && args[radiusName] !== null
    ) {
      knexBuilder.andWhere(sqlPrefix + id, "!=", null);

      const argAsLocation: IPropertyDefinitionSupportedLocationType = args[locationName] as any;
      const lng = argAsLocation.lng || 0;
      const lat = argAsLocation.lat || 0;
      const argAsUnit: IPropertyDefinitionSupportedUnitType = args[radiusName] as any;
      const distance = (argAsUnit.normalizedValue || 0) * 1000;
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
  sqlLocalSearch: (
    args: IGQLArgs,
    rawData: IGQLValue,
    id: string,
    includeId?: string,
  ) => {
    // item is deleted
    if (!rawData) {
      return false;
    }
    // item is blocked
    if (rawData.DATA === null) {
      return false;
    }

    const radiusName = PropertyDefinitionSearchInterfacesPrefixes.RADIUS + id;
    const locationName = PropertyDefinitionSearchInterfacesPrefixes.LOCATION + id;

    const usefulArgs = includeId ? args[INCLUDE_PREFIX + includeId] || {} : args;

    if (
      typeof usefulArgs[locationName] !== "undefined" && usefulArgs[locationName] !== null &&
      typeof usefulArgs[radiusName] !== "undefined" && usefulArgs[radiusName] !== null
    ) {
      const propertyValue = includeId ? rawData.DATA[includeId][id] : rawData.DATA[id];
      if (propertyValue === null) {
        return false;
      }

      const propertyLng = propertyValue.lng || 0;
      const propertyLat = propertyValue.lat || 0;

      const lng = usefulArgs[locationName].lng || 0;
      const lat = usefulArgs[locationName].lat || 0;

      const expectedMaxDistance = (usefulArgs[radiusName].normalizedValue || 0) * 1000;

      const actualDistance = getDistanceFromLatLonInMeters(lat, lng, propertyLat, propertyLng);

      return actualDistance <= expectedMaxDistance;
    }

    return true;
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
