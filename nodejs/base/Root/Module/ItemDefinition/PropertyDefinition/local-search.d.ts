/**
 * This file contains helper local functions that are used against
 * graphql values in order to perform local searches as if it was
 * running in the server side, these tend to run in the IndexedDB
 * database
 *
 * @packageDocumentation
 */
import { IGQLArgs, IGQLValue } from "../../../../../gql-querier";
/**
 * Performs a local search of an exact and ranged search for
 * a property value
 * @param args the whole raw arguments from graphql
 * @param rawData the raw data non flattened of the current value being questioned (often from indexeddb)
 * @param id the id of the property that is being searched
 * @param includeId an include id (if available) where the property is contained
 * @returns a boolean on whether it matches
 */
export declare function standardLocalSearchExactAndRange(args: IGQLArgs, rawData: IGQLValue, id: string, includeId?: string): boolean;
/**
 * Runs the same as the standard sql search exact and range but using the date
 * functionality
 * @param format the format either DATE_FORMAT TIME_FORMAT or DATETIME_FORMAT
 * @param args the whole raw arguments from graphql
 * @param rawData the raw data non flattened of the current value being questioned
 * @param id the id of the property
 * @param includeId an optional include id
 * @returns a boolean on whether it matches
 */
export declare function dateLocalSearchExactAndRange(format: string, args: IGQLArgs, rawData: IGQLValue, id: string, includeId?: string): boolean;
