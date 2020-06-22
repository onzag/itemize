/**
 * Contains the location type description
 *
 * @packageDocumentation
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLNonNull, GraphQLFloat, GraphQLString } from "graphql";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import { CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N, LOCATION_SEARCH_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N, INCLUDE_PREFIX, SQL_CONSTRAINT_PREFIX } from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesType, PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import { IPropertyDefinitionSupportedUnitType } from "./unit";

/**
 * The haversine formula extracted from stackoverflow
 * https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
 * @param lat1 the latitude 1
 * @param lon1 the longitude 1
 * @param lat2 the latitude 2
 * @param lon2 the longitude 2
 * @returns the distance in kilometers
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
 * @returns the radians of the input
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
  id: string;
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
    id: {
      type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
    },
  },
  sql: (arg) => {
    return {
      [arg.prefix + arg.id + "_GEO"]: {
        type: "GEOMETRY(POINT,4326)",
        ext: "postgis",
        index: {
          type: "gist",
          id: SQL_CONSTRAINT_PREFIX + arg.prefix + arg.id,
          level: 0,
        },
      },
      [arg.prefix + arg.id + "_ID"]: {
        type: "text",
      },
      [arg.prefix + arg.id + "_LAT"]: {
        type: "float",
      },
      [arg.prefix + arg.id + "_LNG"]: {
        type: "float",
      },
      [arg.prefix + arg.id + "_TXT"]: {
        type: "text",
      },
      [arg.prefix + arg.id + "_ATXT"]: {
        type: "text",
      },
    };
  },
  sqlIn: (arg) => {
    if (arg.value === null) {
      return {
        [arg.prefix + arg.id + "_GEO"]: null,
        [arg.prefix + arg.id + "_ID"]: null,
        [arg.prefix + arg.id + "_LAT"]: null,
        [arg.prefix + arg.id + "_LNG"]: null,
        [arg.prefix + arg.id + "_TXT"]: null,
        [arg.prefix + arg.id + "_ATXT"]: null,
      };
    }

    const value = arg.value as IPropertyDefinitionSupportedLocationType;
    return {
      [arg.prefix + arg.id + "_GEO"]: arg.knex.raw("ST_SetSRID(ST_MakePoint(?, ?), 4326)", [value.lng, value.lat]),
      [arg.prefix + arg.id + "_ID"]: value.id,
      [arg.prefix + arg.id + "_LAT"]: value.lat,
      [arg.prefix + arg.id + "_LNG"]: value.lng,
      [arg.prefix + arg.id + "_TXT"]: value.txt,
      [arg.prefix + arg.id + "_ATXT"]: value.atxt,
    };
  },
  sqlOut: (arg) => {
    const result: IPropertyDefinitionSupportedLocationType = {
      lat: arg.row[arg.prefix + arg.id + "_LAT"],
      lng: arg.row[arg.prefix + arg.id + "_LNG"],
      txt: arg.row[arg.prefix + arg.id + "_TXT"],
      atxt: arg.row[arg.prefix + arg.id + "_ATXT"],
      id: arg.row[arg.prefix + arg.id + "_ID"],
    };
    if (result.lat === null || result.lng === null) {
      return null;
    }
    return result;
  },
  sqlSearch: (arg) => {
    const radiusName = PropertyDefinitionSearchInterfacesPrefixes.RADIUS + arg.prefix + arg.id;
    const locationName = PropertyDefinitionSearchInterfacesPrefixes.LOCATION + arg.prefix + arg.id;

    if (
      typeof arg.args[locationName] !== "undefined" && arg.args[locationName] !== null &&
      typeof arg.args[radiusName] !== "undefined" && arg.args[radiusName] !== null
    ) {
      arg.knexBuilder.andWhere(arg.prefix + arg.id, "!=", null);

      const argAsLocation: IPropertyDefinitionSupportedLocationType = arg.args[locationName] as any;
      const lng = argAsLocation.lng || 0;
      const lat = argAsLocation.lat || 0;
      const argAsUnit: IPropertyDefinitionSupportedUnitType = arg.args[radiusName] as any;
      const distance = (argAsUnit.normalizedValue || 0) * 1000;
      arg.knexBuilder.andWhereRaw(
        "ST_DWithin(??, ST_MakePoint(?,?)::geography, ?)",
        [
          arg.prefix + arg.id,
          lng,
          lat,
          distance,
        ],
      );
      
      if (arg.isOrderedByIt) {
        return [
          "ST_Distance(??, ST_MakePoint(?,?)::geography) AS ??",
          [
            arg.prefix + arg.id,
            lng,
            lat,
            arg.prefix + arg.id + "_CALC_RADIUS",
          ],
        ]
      }

      return true;
    }

    return false;
  },
  sqlStrSearch: null,
  localStrSearch: null,
  sqlMantenience: null,
  sqlOrderBy: (arg) => {
    if (arg.wasIncludedInSearch) {
      return [arg.prefix + arg.id + "_CALC_RADIUS", arg.direction, arg.nulls];
    }
    return null;
  },
  localOrderBy: null,
  localSearch: (arg) => {
    // item is deleted
    if (!arg.gqlValue) {
      return false;
    }
    // item is blocked
    if (arg.gqlValue.DATA === null) {
      return false;
    }

    const radiusName = PropertyDefinitionSearchInterfacesPrefixes.RADIUS + arg.id;
    const locationName = PropertyDefinitionSearchInterfacesPrefixes.LOCATION + arg.id;

    const usefulArgs = arg.include ? arg.args[INCLUDE_PREFIX + arg.include.getId()] || {} : arg.args;

    if (
      typeof usefulArgs[locationName] !== "undefined" && usefulArgs[locationName] !== null &&
      typeof usefulArgs[radiusName] !== "undefined" && usefulArgs[radiusName] !== null
    ) {
      const propertyValue = arg.include ? arg.gqlValue.DATA[arg.include.getId()][arg.id] : arg.gqlValue.DATA[arg.id];
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
  sqlEqual: (arg) => {
    if (arg.value === null) {
      return {
        [arg.prefix + arg.id + "_ID"]: null,
      };
    }
    return {
      [arg.prefix + arg.id + "_ID"]: (arg.value as IPropertyDefinitionSupportedLocationType).id,
    };
  },
  sqlSSCacheEqual: (arg) => {
    if (arg.value === null) {
      return arg.row[arg.prefix + arg.id + "_ID"] === arg.value;
    }
    return arg.row[arg.prefix + arg.id + "ID"] === (arg.value as IPropertyDefinitionSupportedLocationType).id;
  },
  sqlBtreeIndexable: () => {
    return null;
  },
  localEqual: (arg) => {
    if (arg.a === arg.b) {
      return true;
    }

    if (arg.a === null && arg.b !== null) {
      return false;
    } else if (arg.b === null && arg.a !== null) {
      return false;
    }

    return (arg.a as IPropertyDefinitionSupportedLocationType).id === (arg.b as IPropertyDefinitionSupportedLocationType).id;
  },
  // locations just contain this basic data
  validate: (l: IPropertyDefinitionSupportedLocationType) => {
    if (
      typeof l.lat !== "number" ||
      typeof l.lng !== "number" ||
      typeof l.txt !== "string" ||
      typeof l.id !== "string" ||
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
