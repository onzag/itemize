import { PropertyDefinitionSearchInterfacesPrefixes } from "./search-interfaces";
import { INCLUDE_PREFIX } from "../../../../../constants";
import { PropertyDefinitionSupportedType } from "./types";
import { ISQLTableRowValue } from "../../../sql";
import { IGQLArgs, IGQLValue } from "../../../../../gql-querier";

export function standardSQLLocalSearchExactAndRange(
  args: IGQLArgs,
  rawData: IGQLValue,
  id: string,
  includeId?: string,
) {
  // item is deleted
  if (!rawData) {
    return false;
  }
  // item is blocked
  if (rawData.DATA === null) {
    return false;
  }

  const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + id;
  const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + id;
  const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + id;

  const usefulArgs = includeId ? args[INCLUDE_PREFIX + includeId] || {} : args;

  const propertyValue = includeId ? rawData.DATA[includeId][id] : rawData.DATA[id];

  const conditions: boolean[] = [];
  if (typeof usefulArgs[exactName] !== "undefined") {
    conditions.push(propertyValue === usefulArgs[exactName]);
  }

  if (typeof usefulArgs[fromName] !== "undefined" && usefulArgs[fromName] !== null) {
    conditions.push(propertyValue >= usefulArgs[fromName]);
  }

  if (typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null) {
    conditions.push(propertyValue <= usefulArgs[toName]);
  }

  if (!conditions.length) {
    return true;
  } else {
    return conditions.every((c) => c);
  }
}

export function dateSQLLocalSearchExactAndRange(
  args: IGQLArgs,
  rawData: IGQLValue,
  id: string,
  includeId?: string,
) {
  // item is deleted
  if (!rawData) {
    return false;
  }
  // item is blocked
  if (rawData.DATA === null) {
    return false;
  }

  const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + id;
  const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + id;
  const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + id;

  const usefulArgs = includeId ? args[INCLUDE_PREFIX + includeId] || {} : args;

  const propertyValue = new Date(includeId ? rawData.DATA[includeId][id] : rawData.DATA[id]).getTime();

  const conditions: boolean[] = [];
  if (typeof usefulArgs[exactName] !== "undefined") {
    conditions.push(propertyValue === new Date(usefulArgs[exactName]).getTime());
  }

  if (typeof usefulArgs[fromName] !== "undefined" && usefulArgs[fromName] !== null) {
    conditions.push(propertyValue >= new Date(usefulArgs[fromName]).getTime());
  }

  if (typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null) {
    conditions.push(propertyValue <= new Date(usefulArgs[toName]).getTime());
  }

  if (!conditions.length) {
    return true;
  } else {
    return conditions.every((c) => c);
  }
}

export function standardSQLLocalEqualFn(
  value: PropertyDefinitionSupportedType,
  sqlPrefix: string,
  id: string,
  data: ISQLTableRowValue,
): boolean {
  return data[sqlPrefix + id] === value;
}
