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
    specialProperties: [
        {
            // TODO implement
            name: "prefillToUserLocationIfPossible",
            type: "boolean",
        },
    ],
    sql: (sqlPrefix, id) => {
        return {
            [sqlPrefix + id + "_GEO"]: {
                type: "GEOMETRY(POINT,4326)",
                ext: "postgis",
                index: {
                    type: "gist",
                    id: constants_1.SQL_CONSTRAINT_PREFIX + sqlPrefix + id,
                    level: 0,
                },
            },
            [sqlPrefix + id + "_ID"]: {
                type: "text",
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
    sqlIn: (value, sqlPrefix, id, property, knex) => {
        if (value === null) {
            return {
                [sqlPrefix + id + "_GEO"]: null,
                [sqlPrefix + id + "_ID"]: null,
                [sqlPrefix + id + "_LAT"]: null,
                [sqlPrefix + id + "_LNG"]: null,
                [sqlPrefix + id + "_TXT"]: null,
                [sqlPrefix + id + "_ATXT"]: null,
            };
        }
        return {
            [sqlPrefix + id + "_GEO"]: knex.raw("ST_SetSRID(ST_MakePoint(?, ?), 4326)", [value.lng, value.lat]),
            [sqlPrefix + id + "_ID"]: value.id,
            [sqlPrefix + id + "_LAT"]: value.lat,
            [sqlPrefix + id + "_LNG"]: value.lng,
            [sqlPrefix + id + "_TXT"]: value.txt,
            [sqlPrefix + id + "_ATXT"]: value.atxt,
        };
    },
    sqlOut: (data, sqlPrefix, id) => {
        const result = {
            lat: data[sqlPrefix + id + "_LAT"],
            lng: data[sqlPrefix + id + "_LNG"],
            txt: data[sqlPrefix + id + "_TXT"],
            atxt: data[sqlPrefix + id + "_ATXT"],
            id: data[sqlPrefix + id + "_ID"],
        };
        if (result.lat === null || result.lng === null) {
            return null;
        }
        return result;
    },
    sqlSearch: (args, sqlPrefix, id, knexBuilder) => {
        const radiusName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.RADIUS + id;
        const locationName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.LOCATION + id;
        if (typeof args[locationName] !== "undefined" && args[locationName] !== null &&
            typeof args[radiusName] !== "undefined" && args[radiusName] !== null) {
            knexBuilder.andWhere(sqlPrefix + id, "!=", null);
            const argAsLocation = args[locationName];
            const lng = argAsLocation.lng || 0;
            const lat = argAsLocation.lat || 0;
            const argAsUnit = args[radiusName];
            const distance = (argAsUnit.normalizedValue || 0) * 1000;
            knexBuilder.andWhereRaw("ST_DWithin(??, ST_MakePoint(?,?)::geography, ?)", [
                sqlPrefix + id,
                lng,
                lat,
                distance,
            ]);
        }
    },
    sqlMantenience: null,
    localSearch: (args, rawData, id, includeId) => {
        // item is deleted
        if (!rawData) {
            return false;
        }
        // item is blocked
        if (rawData.DATA === null) {
            return false;
        }
        const radiusName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.RADIUS + id;
        const locationName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.LOCATION + id;
        const usefulArgs = includeId ? args[constants_1.INCLUDE_PREFIX + includeId] || {} : args;
        if (typeof usefulArgs[locationName] !== "undefined" && usefulArgs[locationName] !== null &&
            typeof usefulArgs[radiusName] !== "undefined" && usefulArgs[radiusName] !== null) {
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
    sqlEqual: (value, sqlPrefix, id, isCaseInsensitive, knex, columnName) => {
        if (!columnName) {
            return {
                [sqlPrefix + id + "_ID"]: value.id,
            };
        }
        return knex.raw("?? = ? AS ??", [
            sqlPrefix + id + "_ID",
            value.id,
            columnName,
        ]);
    },
    sqlLocalEqual: (value, sqlPrefix, id, data) => {
        if (value === null) {
            return data[sqlPrefix + id + "_ID"] === value;
        }
        return data[sqlPrefix + id + "ID"] === value.id;
    },
    sqlBtreeIndexable: () => {
        return null;
    },
    localEqual: (a, b) => {
        if (a === b) {
            return true;
        }
        if (a === null && b !== null) {
            return false;
        }
        else if (b === null && a !== null) {
            return false;
        }
        return a.id === b.id;
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
    // i18n with the distance attributes
    i18n: {
        base: constants_1.CLASSIC_BASE_I18N,
        optional: constants_1.CLASSIC_OPTIONAL_I18N,
        searchBase: constants_1.LOCATION_SEARCH_I18N,
        searchOptional: constants_1.CLASSIC_SEARCH_OPTIONAL_I18N,
    },
};
exports.default = typeValue;
