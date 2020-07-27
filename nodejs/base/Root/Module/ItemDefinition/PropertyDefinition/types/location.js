"use strict";
/**
 * Contains the location type description
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const PropertyDefinition_1 = require("../../PropertyDefinition");
const constants_1 = require("../../../../../../constants");
const search_interfaces_1 = require("../search-interfaces");
const location_1 = require("../sql/location");
/**
 * The haversine formula extracted from stackoverflow
 * https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
 * @param lat1 the latitude 1
 * @param lon1 the longitude 1
 * @param lat2 the latitude 2
 * @param lon2 the longitude 2
 * @returns the distance in kilometers
 */
function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
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
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
/**
 * The type describes the behaviour of the location in the app
 */
const typeValue = {
    gql: "PROPERTY_TYPE__Location",
    gqlFields: {
        lng: {
            type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat),
        },
        lat: {
            type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat),
        },
        txt: {
            type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        },
        atxt: {
            type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        },
        id: {
            type: graphql_1.GraphQLNonNull && graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        },
    },
    sql: location_1.locationSQL,
    sqlIn: location_1.locationSQLIn,
    sqlOut: location_1.locationSQLOut,
    sqlSearch: location_1.locationSQLSearch,
    sqlStrSearch: null,
    localStrSearch: null,
    sqlMantenience: null,
    sqlOrderBy: location_1.locationSQLOrderBy,
    localOrderBy: null,
    sqlEqual: location_1.locationSQLEqual,
    sqlSSCacheEqual: location_1.locationSQLSSCacheEqual,
    sqlBtreeIndexable: location_1.locationSQLBtreeIndexable,
    localSearch: (arg) => {
        // item is deleted
        if (!arg.gqlValue) {
            return false;
        }
        // item is blocked
        if (arg.gqlValue.DATA === null) {
            return false;
        }
        const radiusName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.RADIUS + arg.id;
        const locationName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.LOCATION + arg.id;
        const usefulArgs = arg.include ? arg.args[constants_1.INCLUDE_PREFIX + arg.include.getId()] || {} : arg.args;
        if (typeof usefulArgs[locationName] !== "undefined" && usefulArgs[locationName] !== null &&
            typeof usefulArgs[radiusName] !== "undefined" && usefulArgs[radiusName] !== null) {
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
    localEqual: (arg) => {
        if (arg.a === arg.b) {
            return true;
        }
        if (arg.a === null && arg.b !== null) {
            return false;
        }
        else if (arg.b === null && arg.a !== null) {
            return false;
        }
        return arg.a.id === arg.b.id;
    },
    // locations just contain this basic data
    validate: (l) => {
        if (typeof l.lat !== "number" ||
            typeof l.lng !== "number" ||
            typeof l.txt !== "string" ||
            typeof l.id !== "string" ||
            (typeof l.atxt !== "string" && l.atxt !== null)) {
            return PropertyDefinition_1.PropertyInvalidReason.INVALID_VALUE;
        }
        return null;
    },
    // they are searchable
    searchable: true,
    searchInterface: search_interfaces_1.PropertyDefinitionSearchInterfacesType.LOCATION_RADIUS,
    specialProperties: [
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
        base: constants_1.CLASSIC_BASE_I18N,
        optional: constants_1.CLASSIC_OPTIONAL_I18N,
        searchBase: constants_1.LOCATION_SEARCH_I18N,
        searchOptional: constants_1.CLASSIC_SEARCH_OPTIONAL_I18N,
    },
};
exports.default = typeValue;
