/**
 * This file contains the sql functionality to be used with the location type
 * 
 * @module
 */

import {
  ISQLArgInfo, ISQLInInfo, ISQLOutInfo, ISQLSearchInfo, ISQLOrderByInfo,
  ISQLEqualInfo, ISQLSSCacheEqualInfo, IElasticSearchInfo, IArgInfo
} from "../types";
import { MAX_DECIMAL_COUNT, SQL_CONSTRAINT_PREFIX } from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import { IPropertyDefinitionSupportedLocationType } from "../types/location";
import { IPropertyDefinitionSupportedUnitType } from "../types/unit";
import convert from "convert-units";

/**
 * provides the SQL form for the location type
 * @param arg the arg info
 * @returns a partial row definition
 */
export function locationSQL(arg: ISQLArgInfo) {
  return {
    // this contains the geometry form, and always contains
    // an index of type gist, as recommended for the documentation
    [arg.prefix + arg.id + "_GEO"]: {
      type: "GEOMETRY(POINT,4326)",
      ext: "postgis",
      index: {
        type: "gist",
        id: SQL_CONSTRAINT_PREFIX + arg.prefix + arg.id,
        level: 0,
      },
    },
    // this contains the id, which is an unique id generated
    // based on the lng and lat of the position
    [arg.prefix + arg.id + "_ID"]: {
      type: "TEXT",
    },
    // this is the latitude
    [arg.prefix + arg.id + "_LAT"]: {
      type: "REAL",
    },
    // the longitude
    [arg.prefix + arg.id + "_LNG"]: {
      type: "REAL",
    },
    // the text information
    [arg.prefix + arg.id + "_TXT"]: {
      type: "TEXT",
    },
    // and the alternative text information
    [arg.prefix + arg.id + "_ATXT"]: {
      type: "TEXT",
    },
  };
}

export function locationElastic(arg: IArgInfo) {
  return {
    properties: {
      [arg.prefix + arg.id + "_ID"]: {
        enabled: false,
      },
      [arg.prefix + arg.id + "_LAT"]: {
        enabled: false,
      },
      [arg.prefix + arg.id + "_LNG"]: {
        enabled: false,
      },
      [arg.prefix + arg.id + "_TXT"]: {
        enabled: false,
      },
      [arg.prefix + arg.id + "_ATXT"]: {
        enabled: false,
      },
      [arg.prefix + arg.id + "_GEO"]: {
        type: "geo_point",
      },
      [arg.prefix + arg.id + "_NULL"]: {
        type: "boolean",
      },
    },
  }
}

/**
 * provides the SQL select form for the location type
 * @param arg the arg info
 */
export function locationSQLSelect(arg: ISQLArgInfo) {
  return [
    arg.prefix + arg.id + "_LAT",
    arg.prefix + arg.id + "_LNG",
    arg.prefix + arg.id + "_TXT",
    arg.prefix + arg.id + "_ATXT",
    arg.prefix + arg.id + "_ID",
  ];
}

/**
 * Provides the functionality for sql in of data into
 * the row
 * @param arg the sql in arg info
 * @returns a partial row
 */
export function locationSQLIn(arg: ISQLInInfo) {
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

  // javascript undefined problem forces me to do this double check because it will not
  // trigger an error if the data is corrupted because javascript is javascript and will
  // do anything in its might to succeed even with corrupted data because javascript
  if (value !== null) {
    if (typeof value === "undefined") {
      throw new Error("Invalid location for SQL IN in must not be undefined in " + arg.property.getId());
    }

    if (
      typeof value.id !== "string"
    ) {
      throw new Error("Invalid location for SQL IN in " + JSON.stringify(arg.value) + " not valid id property");
    }

    if (
      typeof value.lat !== "number"
    ) {
      throw new Error("Invalid location for SQL IN in " + JSON.stringify(arg.value) + " not valid lat property");
    }

    if (
      typeof value.lng !== "number"
    ) {
      throw new Error("Invalid location for SQL IN in " + JSON.stringify(arg.value) + " not valid lng property");
    }

    if (
      typeof value.txt !== "string"
    ) {
      throw new Error("Invalid location for SQL IN in " + JSON.stringify(arg.value) + " not valid txt property");
    }

    if (
      typeof value.atxt !== "string"
    ) {
      throw new Error("Invalid location for SQL IN in " + JSON.stringify(arg.value) + " not valid atxt property");
    }
  }

  return {
    [arg.prefix + arg.id + "_GEO"]: ["ST_SetSRID(ST_MakePoint(?, ?), 4326)", [value.lng, value.lat]],
    [arg.prefix + arg.id + "_ID"]: value.id,
    [arg.prefix + arg.id + "_LAT"]: value.lat,
    [arg.prefix + arg.id + "_LNG"]: value.lng,
    [arg.prefix + arg.id + "_TXT"]: value.txt,
    [arg.prefix + arg.id + "_ATXT"]: value.atxt,
  };
}

/**
 * Provides the functionality to analyze a row value and
 * output the location type
 * @param arg the sql out info
 * @returns a property definition supported location type, or null
 */
export function locationSQLOut(arg: ISQLOutInfo): IPropertyDefinitionSupportedLocationType {
  const result: IPropertyDefinitionSupportedLocationType = {
    lat: arg.row[arg.prefix + arg.id + "_LAT"],
    lng: arg.row[arg.prefix + arg.id + "_LNG"],
    txt: arg.row[arg.prefix + arg.id + "_TXT"],
    atxt: arg.row[arg.prefix + arg.id + "_ATXT"],
    id: arg.row[arg.prefix + arg.id + "_ID"],
  };
  if (result.lat === null || result.lng === null) {
    if (!arg.property.isNullable()) {
      return (arg.property.getDefaultValue() as any) || {
        lat: 0,
        lng: 0,
        txt: "Null Island",
        atxt: "Null Island",
        id: "NULL",
      }
    }
    return null;
  }
  return result;
}

export function locationSQLElasticIn(arg: ISQLOutInfo) {
  const lat = arg.row[arg.prefix + arg.id + "_LAT"];
  const lng = arg.row[arg.prefix + arg.id + "_LNG"];
  const geo = (lat === null || lng === null) ? null : [
    lng,
    lat,
  ];
  
  return {
    [arg.prefix + arg.id + "_LAT"]: lat,
    [arg.prefix + arg.id + "_LNG"]: lng,
    [arg.prefix + arg.id + "_TXT"]: arg.row[arg.prefix + arg.id + "_TXT"],
    [arg.prefix + arg.id + "_ATXT"]: arg.row[arg.prefix + arg.id + "_ATXT"],
    [arg.prefix + arg.id + "_GEO"]: geo,
    [arg.prefix + arg.id + "_NULL"]: geo === null,
  }
}

/**
 * Provides the search functionality for the location type
 * @param arg the sql search info arg
 * @returns a boolean on whether it was searched by it, or an order by rule (also when it was searched by it)
 */
export function locationSQLSearch(arg: ISQLSearchInfo): boolean | [string, any[]] {
  const radiusName = PropertyDefinitionSearchInterfacesPrefixes.RADIUS + arg.prefix + arg.id;
  const locationName = PropertyDefinitionSearchInterfacesPrefixes.LOCATION + arg.prefix + arg.id;

  if (arg.args[locationName] === null) {
    arg.whereBuilder.andWhereColumnNull(arg.prefix + arg.id + "_GEO");
    return true;
  } else if (
    typeof arg.args[locationName] !== "undefined" && arg.args[locationName] !== null &&
    typeof arg.args[radiusName] !== "undefined" && arg.args[radiusName] !== null
  ) {
    arg.whereBuilder.andWhereColumnNotNull(arg.prefix + arg.id + "_GEO");

    const argAsLocation: IPropertyDefinitionSupportedLocationType = arg.args[locationName] as any;
    const lng = argAsLocation.lng || 0;
    const lat = argAsLocation.lat || 0;
    const argAsUnit: IPropertyDefinitionSupportedUnitType = arg.args[radiusName] as any;

    const distanceInMeters = parseFloat(convert(argAsUnit.normalizedValue || 0).from(argAsUnit.normalizedUnit as any).to("m").toFixed(MAX_DECIMAL_COUNT));
    const distance = distanceInMeters || 0;

    arg.whereBuilder.andWhere(
      "ST_DWithin(" + JSON.stringify(arg.prefix + arg.id + "_GEO") + ", ST_MakePoint(?,?)::geography, ?)",
      [
        lng,
        lat,
        distance,
      ],
    );

    if (arg.isOrderedByIt) {
      return [
        "ST_Distance(" + JSON.stringify(arg.prefix + arg.id + "_GEO") +
        ", ST_MakePoint(?,?)::geography) AS " +
        JSON.stringify(arg.prefix + arg.id + "_CALC_RADIUS"),
        [
          lng,
          lat,
        ],
      ]
    }

    return true;
  }

  return false;
}

export function locationElasticSearch(arg: IElasticSearchInfo) {
  const radiusName = PropertyDefinitionSearchInterfacesPrefixes.RADIUS + arg.prefix + arg.id;
  const locationName = PropertyDefinitionSearchInterfacesPrefixes.LOCATION + arg.prefix + arg.id;

  if (arg.args[locationName] === null) {
    arg.elasticQueryBuilder.mustTerm({
      [arg.prefix + arg.id + "_NULL"]: true,
    }, {
      boost: arg.boost,
      propertyId: arg.prefix + arg.id,
      groupId: "LOCATION_RADIUS_" + arg.prefix + arg.id,
    });
    return {};
  } else if (
    typeof arg.args[locationName] !== "undefined" && arg.args[locationName] !== null &&
    typeof arg.args[radiusName] !== "undefined" && arg.args[radiusName] !== null
  ) {
    const argAsLocation: IPropertyDefinitionSupportedLocationType = arg.args[locationName] as any;
    const lng = argAsLocation.lng || 0;
    const lat = argAsLocation.lat || 0;
    const argAsUnit: IPropertyDefinitionSupportedUnitType = arg.args[radiusName] as any;
    const distanceInMeters = parseFloat(convert(argAsUnit.normalizedValue || 0).from(argAsUnit.normalizedUnit as any).to("m").toFixed(MAX_DECIMAL_COUNT));
    const distance = distanceInMeters || 0;

    arg.elasticQueryBuilder.must({
      bool: {
        filter: [
          {
            geo_distance: {
              distance: distance + "m",
              [arg.prefix + arg.id + "_GEO"]: [
                lng,
                lat,
              ],
              _name: "_geo_distance_" + arg.prefix + arg.id,
              boost: arg.boost,
            }
          }
        ]
      }
    }, {
      propertyId: arg.prefix + arg.id,
      groupId: "LOCATION_RADIUS_" + arg.prefix + arg.id,
    });

    return {};
  }

  return null;
}

/**
 * Provides the functionality on how to order by
 * @param arg the order by rule info
 * @returns the order by rule string array
 */
export function locationSQLOrderBy(arg: ISQLOrderByInfo): [string, string, string] {
  if (arg.wasIncludedInSearch) {
    return [arg.prefix + arg.id + "_CALC_RADIUS", arg.direction, arg.nulls];
  }
  return null;
}

/**
 * Provides the functionality on how to order by
 * @param arg the order by rule info
 * @returns the order by rule string array
 */
 export function locationElasticOrderBy(arg: ISQLOrderByInfo) {
  if (arg.wasIncludedInSearch) {
    const locationName = PropertyDefinitionSearchInterfacesPrefixes.LOCATION + arg.prefix + arg.id;
    const argAsLocation: IPropertyDefinitionSupportedLocationType = arg.args[locationName] as any;
    const lng = argAsLocation.lng || 0;
    const lat = argAsLocation.lat || 0;

    return {
      ["_geo_distance_" + arg.prefix + arg.id]: {
        gps: {
          lat,
          lon: lng,
        },
        order: arg.direction,
        distance_type: "plane",
      }
    }
  }
  return null;
}

/**
 * Checks for equality within the database
 * @param arg the equal arg info
 * @returns a partial row match
 */
export function locationSQLEqual(arg: ISQLEqualInfo) {
  if (arg.value === null) {
    arg.whereBuilder.andWhereColumnNull(arg.prefix + arg.id + "_ID");
  } else {
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_ID", (arg.value as IPropertyDefinitionSupportedLocationType).id);
  }
}

/**
 * Checks for equality within the cache
 * @param arg the ss cache equal info
 * @returns a boolean
 */
export function locationSQLSSCacheEqual(arg: ISQLSSCacheEqualInfo) {
  if (arg.value === null) {
    return arg.row[arg.prefix + arg.id + "_ID"] === arg.value;
  }
  return arg.row[arg.prefix + arg.id + "ID"] === (arg.value as IPropertyDefinitionSupportedLocationType).id;
}

/**
 * Provides the btree indexable functionality
 */
export function locationSQLBtreeIndexable(): string[] {
  // not supported
  return null;
}