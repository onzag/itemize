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
    sql: (arg) => {
        return {
            [arg.prefix + arg.id + "_GEO"]: {
                type: "GEOMETRY(POINT,4326)",
                ext: "postgis",
                index: {
                    type: "gist",
                    id: constants_1.SQL_CONSTRAINT_PREFIX + arg.prefix + arg.id,
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
        const value = arg.value;
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
        const result = {
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
        const radiusName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.RADIUS + arg.prefix + arg.id;
        const locationName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.LOCATION + arg.prefix + arg.id;
        if (typeof arg.args[locationName] !== "undefined" && arg.args[locationName] !== null &&
            typeof arg.args[radiusName] !== "undefined" && arg.args[radiusName] !== null) {
            arg.knexBuilder.andWhere(arg.prefix + arg.id + "_GEO", "is not", null);
            const argAsLocation = arg.args[locationName];
            const lng = argAsLocation.lng || 0;
            const lat = argAsLocation.lat || 0;
            const argAsUnit = arg.args[radiusName];
            const distance = (argAsUnit.normalizedValue || 0) * 1000;
            arg.knexBuilder.andWhereRaw("ST_DWithin(??, ST_MakePoint(?,?)::geography, ?)", [
                arg.prefix + arg.id + "_GEO",
                lng,
                lat,
                distance,
            ]);
            if (arg.isOrderedByIt) {
                return [
                    "ST_Distance(??, ST_MakePoint(?,?)::geography) AS ??",
                    [
                        arg.prefix + arg.id + "_GEO",
                        lng,
                        lat,
                        arg.prefix + arg.id + "_CALC_RADIUS",
                    ],
                ];
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
    sqlEqual: (arg) => {
        if (arg.value === null) {
            return {
                [arg.prefix + arg.id + "_ID"]: null,
            };
        }
        return {
            [arg.prefix + arg.id + "_ID"]: arg.value.id,
        };
    },
    sqlSSCacheEqual: (arg) => {
        if (arg.value === null) {
            return arg.row[arg.prefix + arg.id + "_ID"] === arg.value;
        }
        return arg.row[arg.prefix + arg.id + "ID"] === arg.value.id;
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
