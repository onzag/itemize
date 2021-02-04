/**
 * This file contains the sql functionality to be used with the location type
 * 
 * @packageDocumentation
 */

import { ISQLArgInfo, ISQLInInfo, ISQLOutInfo, ISQLSearchInfo, ISQLOrderByInfo,
  ISQLEqualInfo, ISQLSSCacheEqualInfo } from "../types";
import { SQL_CONSTRAINT_PREFIX } from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import { IPropertyDefinitionSupportedLocationType } from "../types/location";
import { IPropertyDefinitionSupportedUnitType } from "../types/unit";

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
export function locationSQLOut(arg: ISQLOutInfo) {
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
}

/**
 * Provides the search functionality for the location type
 * @param arg the sql search info arg
 * @returns a boolean on whether it was searched by it, or an order by rule (also when it was searched by it)
 */
export function locationSQLSearch(arg: ISQLSearchInfo): boolean | [string, any[]] {
  const radiusName = PropertyDefinitionSearchInterfacesPrefixes.RADIUS + arg.prefix + arg.id;
  const locationName = PropertyDefinitionSearchInterfacesPrefixes.LOCATION + arg.prefix + arg.id;

  if (
    typeof arg.args[locationName] !== "undefined" && arg.args[locationName] !== null &&
    typeof arg.args[radiusName] !== "undefined" && arg.args[radiusName] !== null
  ) {
    arg.whereBuilder.andWhereColumnNotNull(arg.prefix + arg.id + "_GEO");

    const argAsLocation: IPropertyDefinitionSupportedLocationType = arg.args[locationName] as any;
    const lng = argAsLocation.lng || 0;
    const lat = argAsLocation.lat || 0;
    const argAsUnit: IPropertyDefinitionSupportedUnitType = arg.args[radiusName] as any;
    const distance = (argAsUnit.normalizedValue || 0) * 1000;

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