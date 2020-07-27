/**
 * This file contains fake local sql functions that run as if they were sql
 * functions but in the javascript context
 *
 * They exist for use within the redis cache
 * within the server and client side respectively
 *
 * @packageDocumentation
 */
import { ISQLSSCacheEqualInfo, ILocalEqualInfo } from "./types";
/**
 * This function represents the standard way an equality check
 * is performed locally in the cache when equality between properties is requests
 * this local equal is ran against SQL cached properties, that is redis cache
 * it is used for check for policies
 * @param arg the sql ss cache equal info
 * @returns a boolean on whether it equals
 */
export declare function standardSQLSSCacheEqualFn(arg: ISQLSSCacheEqualInfo): boolean;
/**
 * Standard local equal for comparing values locally in the client side
 * by default it just compares
 * @param arg the local information
 * @returns a boolean on whether it equals or not
 */
export declare function standardLocalEqual(arg: ILocalEqualInfo): boolean;
