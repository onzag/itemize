/**
 * This file contains the sql server side functions for the string type
 *
 * @packageDocumentation
 */
import { ISQLSearchInfo, ISQLStrSearchInfo } from "../types";
/**
 * The string sql search functionality
 * @param arg the sql search arg info
 * @returns a boolean on whether it was searched by it
 */
export declare function stringSQLSearch(arg: ISQLSearchInfo): boolean;
/**
 * The string FTS search functionality from the search field
 * @param arg the sql str search argument
 * @returns a boolean on whether it was searched by it
 */
export declare function stringSQLStrSearch(arg: ISQLStrSearchInfo): boolean;
