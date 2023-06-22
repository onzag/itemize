/**
 * Contains the location type description
 *
 * @module
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLNonNull, GraphQLFloat, GraphQLString } from "graphql";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import { CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N, LOCATION_SEARCH_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N, INCLUDE_PREFIX, SQL_CONSTRAINT_PREFIX } from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesType, PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import { locationSQL, locationSQLIn, locationSQLOut, locationSQLSearch, locationSQLOrderBy, locationSQLEqual, locationSQLSSCacheEqual,
  locationSQLBtreeIndexable, locationSQLSelect, locationSQLElasticIn, locationElasticSearch, locationElastic, locationElasticOrderBy } from "../sql/location";

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
const typeValue: IPropertyDefinitionSupportedType<IPropertyDefinitionSupportedLocationType> = {
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
  sql: locationSQL,
  elastic: locationElastic,
  sqlSelect: locationSQLSelect,
  sqlIn: locationSQLIn,
  sqlOut: locationSQLOut,
  sqlElasticIn: locationSQLElasticIn,
  sqlSearch: locationSQLSearch,
  elasticSearch: locationElasticSearch,
  sqlStrSearch: null,
  elasticStrSearch: null,
  localStrSearch: null,
  sqlMantenience: null,
  sqlOrderBy: locationSQLOrderBy,
  elasticSort: locationElasticOrderBy,
  localOrderBy: null,
  sqlEqual: locationSQLEqual,
  sqlSSCacheEqual: locationSQLSSCacheEqual,
  sqlBtreeIndexable: locationSQLBtreeIndexable,

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
    if (typeof usefulArgs[locationName] === null) {
      const propertyValue = arg.include ? arg.gqlValue.DATA[arg.include.getId()][arg.id] : arg.gqlValue.DATA[arg.id];

      if (typeof propertyValue === "undefined") {
        console.warn("Attempted to local search by the property " + arg.id + " but could not find it in the local given value");
        return false;
      }

      return propertyValue === null;
    } else if (
      typeof usefulArgs[locationName] !== "undefined" && usefulArgs[locationName] !== null &&
      typeof usefulArgs[radiusName] !== "undefined" && usefulArgs[radiusName] !== null
    ) {
      const propertyValue = arg.include ? arg.gqlValue.DATA[arg.include.getId()][arg.id] : arg.gqlValue.DATA[arg.id];

      if (typeof propertyValue === "undefined") {
        console.warn("Attempted to local search by the property " + arg.id + " but could not find it in the local given value");
        return false;
      }

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
  configOptions: [
    {
      name: "maxSearchRadius",
      type: "number",
    },
    {
      name: "searchRadiusInitialPrefill",
      type: "number",
    },
    {
      name: "searchRadiusUnit",
      type: "string",
    },
    {
      name: "searchRadiusImperialUnit",
      type: "string",
    }
  ],
  // i18n with the distance attributes
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    searchBase: LOCATION_SEARCH_I18N,
    searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
  },
};
export default typeValue;
