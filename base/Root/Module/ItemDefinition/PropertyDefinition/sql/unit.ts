/**
 * This file provides the sql functionality for the unit type
 * 
 * @packageDocumentation
 */

import { ISQLArgInfo, ISQLInInfo, ISQLOutInfo, ISQLSearchInfo, ISQLOrderByInfo, ISQLBtreeIndexableInfo,
  ISQLEqualInfo, ISQLSSCacheEqualInfo } from "../types";
import { IPropertyDefinitionSupportedUnitType } from "../types/unit";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";

/**
 * The unit sql function that specifies the schema
 * @param arg the sql arg info
 * @returns a patial row definition
 */
export function unitSQL(arg: ISQLArgInfo) {
  return {
    [arg.prefix + arg.id + "_VALUE"]: {
      type: "REAL",
    },
    [arg.prefix + arg.id + "_UNIT"]: {
      type: "TEXT",
    },
    [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: {
      type: "REAL",
    },
    [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: {
      type: "TEXT",
    },
  };
}

/**
 * the selection function for unit based elements
 * @param arg the arg
 */
export function unitSQLSelect(arg: ISQLArgInfo) {
  return [
    arg.prefix + arg.id + "_VALUE",
    arg.prefix + arg.id + "_UNIT",
    arg.prefix + arg.id + "_NORMALIZED_VALUE",
    arg.prefix + arg.id + "_NORMALIZED_UNIT",
  ];
}

/**
 * Specifies how units are to be sql in
 * @param arg the sql in arg info
 * @returns a partial row value
 */
export function unitSQLIn(arg: ISQLInInfo) {
  if (arg.value === null) {
    return {
      [arg.prefix + arg.id + "_VALUE"]: null,
      [arg.prefix + arg.id + "_UNIT"]: null,
      [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: null,
      [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: null,
    };
  }
  const value = arg.value as IPropertyDefinitionSupportedUnitType;
  return {
    [arg.prefix + arg.id + "_VALUE"]: value.value,
    [arg.prefix + arg.id + "_UNIT"]: value.unit,
    [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: value.normalizedValue,
    [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: value.normalizedUnit,
  };
}

/**
 * Specifies how units are to be outputted from a raw row
 * @param arg the sql out arg info
 * @returns a supported unit type (or null)
 */
export function unitSQLOut(arg: ISQLOutInfo) {
  const result: IPropertyDefinitionSupportedUnitType = {
    value: arg.row[arg.prefix + arg.id + "_VALUE"],
    unit: arg.row[arg.prefix + arg.id + "_UNIT"],
    normalizedValue: arg.row[arg.prefix + arg.id + "_NORMALIZED_VALUE"],
    normalizedUnit: arg.row[arg.prefix + arg.id + "_NORMALIZED_UNIT"],
  };
  if (result.value === null) {
    return null;
  }
  return result;
}

/**
 * Specifies how units are to be searched by
 * @param arg the sql search arg info
 * @returns a boolean on whether it was searched by it
 */
export function unitSQLSearch(arg: ISQLSearchInfo) {
  const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
  const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
  const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;
  let searchedByIt = false;

  if (typeof arg.args[exactName] !== "undefined" && arg.args[exactName] !== null) {
    const exactAsUnit: IPropertyDefinitionSupportedUnitType = arg.args[exactName] as any;
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_UNIT", exactAsUnit.normalizedUnit);
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_VALUE", exactAsUnit.normalizedValue);
  }

  if (typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null) {
    const fromAsUnit: IPropertyDefinitionSupportedUnitType = arg.args[fromName] as any;
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_UNIT", fromAsUnit.normalizedUnit);
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_VALUE", ">=", fromAsUnit.normalizedValue);
    searchedByIt = true;
  }

  if (typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null) {
    const toAsUnit: IPropertyDefinitionSupportedUnitType = arg.args[toName] as any;
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_UNIT", toAsUnit.normalizedUnit);
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_VALUE", "<=", toAsUnit.normalizedValue);
    searchedByIt = true;
  }

  return searchedByIt;
}

/**
 * Specifies how units are to be ordered by
 * @param arg the sql order by info arg
 * @returns the three string order by rule
 */
export function unitSQLOrderBy(arg: ISQLOrderByInfo): [string, string, string] {
  return [arg.prefix + arg.id + "_NORMALIZED_VALUE", arg.direction, arg.nulls];
}

/**
 * Specifies how units are to be btree indexed to accelerate searches
 * @param arg the sql btree indexable info arg
 * @returns the rows to be btree indexed
 */
export function unitSQLBtreeIndexable(arg: ISQLBtreeIndexableInfo) {
  return [arg.prefix + arg.id + "_NORMALIZED_UNIT", arg.prefix + arg.id + "_NORMALIZED_VALUE"];
}

/**
 * Specifies how units are to be compared for equality in the database
 * @param arg the sql equal arg info
 * @returns a partial row comparison
 */
export function unitSQLEqual(arg: ISQLEqualInfo) {
  arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_UNIT", (arg.value as IPropertyDefinitionSupportedUnitType).normalizedUnit);
  arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_VALUE", (arg.value as IPropertyDefinitionSupportedUnitType).normalizedValue);
}

/**
 * Specifies how units are to be compared for equality in the cache
 * @param arg the sql ss equal arg info
 * @returns a boolean on whether the equality succeed or not
 */
export function unitSQLSSCacheEqual(arg: ISQLSSCacheEqualInfo) {
  if (arg.value === null) {
    return arg.row[arg.prefix + arg.id + "_NORMALIZED_VALUE"] === null;
  }
  const value = arg.value as IPropertyDefinitionSupportedUnitType;
  return arg.row[arg.prefix + arg.id + "_NORMALIZED_VALUE"] === value.normalizedValue &&
    arg.row[arg.prefix + arg.id + "_NORMALIZED_UNIT"] === value.normalizedUnit;
}