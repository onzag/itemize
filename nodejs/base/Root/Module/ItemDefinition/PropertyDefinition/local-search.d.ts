/**
 * This file contains helper local functions that are used against
 * graphql values in order to perform local searches as if it was
 * running in the server side, these tend to run in the IndexedDB
 * database
 *
 * @packageDocumentation
 */
import { ILocalSearchInfo } from "./types";
/**
 * Performs a local search of an exact and ranged search for
 * a property value
 * @param arg the local search arg info
 * @returns a boolean on whether it matches
 */
export declare function standardLocalSearchExactAndRange(arg: ILocalSearchInfo): boolean;
/**
 * Runs the same as the standard sql search exact and range but using the date
 * functionality
 * @param format the format either DATE_FORMAT TIME_FORMAT or DATETIME_FORMAT
 * @param arg the local search arg info
 * @returns a boolean on whether it matches
 */
export declare function dateLocalSearchExactAndRange(format: string, arg: ILocalSearchInfo): boolean;
