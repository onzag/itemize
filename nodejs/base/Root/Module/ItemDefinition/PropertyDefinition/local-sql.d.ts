/**
 * This file contains fake local sql functions that run as if they were sql
 * functions but in the javascript context
 *
 * They exist for use within the redis cache
 * within the server and client side respectively
 *
 * @packageDocumentation
 */
import { PropertyDefinitionSupportedType } from "./types";
import { ISQLTableRowValue } from "../../../sql";
/**
 * This function represents the standard way an equality check
 * is performed locally in the cache when equality between properties is requests
 * this local equal is ran against SQL cached properties, that is redis cache
 * it is used for check for policies
 * @param value the value of the property
 * @param sqlPrefix the prefix of sql this is for ITEM_ form stuff
 * @param id the id of the property
 * @param data the sql data that has been cached
 * @returns a boolean on whether it equals
 */
export declare function standardSQLSSCacheEqualFn(value: PropertyDefinitionSupportedType, sqlPrefix: string, id: string, data: ISQLTableRowValue): boolean;
export declare function standardLocalEqual(a: PropertyDefinitionSupportedType, b: PropertyDefinitionSupportedType): boolean;
