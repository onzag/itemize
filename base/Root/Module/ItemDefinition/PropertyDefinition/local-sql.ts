/**
 * This file contains fake local sql functions that run as if they were sql
 * functions but in the javascript context
 *
 * They exist for use within the redis cache
 * within the server and client side respectively
 *
 * @packageDocumentation
 */

import { PropertyDefinitionSupportedType, ISQLSSCacheEqualInfo, ILocalEqualInfo } from "./types";
import equals from "deep-equal";

/**
 * This function represents the standard way an equality check
 * is performed locally in the cache when equality between properties is requests
 * this local equal is ran against SQL cached properties, that is redis cache
 * it is used for check for policies
 * @returns a boolean on whether it equals
 */
export function standardSQLSSCacheEqualFn(arg: ISQLSSCacheEqualInfo): boolean {
  return arg.row[arg.prefix + arg.id] === arg.value;
}

export function standardLocalEqual(arg: ILocalEqualInfo): boolean {
  return equals(arg.a, arg.b);
}