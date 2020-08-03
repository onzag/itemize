/**
 * Contains the filtering and ordering function to perform actual searches
 * @packageDocumentation
 */
import { IGQLSearchRecord } from "../../../../gql-querier";
import { IDBPDatabase } from "idb";
import { ICacheDB } from "./cache.worker";
import Root from "../../../../base/Root";
/**
 * An instance version of the error that contains
 * the raw object data of the error
 */
export declare class DataCorruptionError extends Error {
    constructor(message: string);
}
/**
 * Given a bunch of search records it will perform
 * the ordering and filtering of such records to return
 * them in place, as such it needs to read from the indexeddb
 * cache, this is a heavy process
 * @param rootProxy the root proxy we need to extract the functionality
 * for ordering and checking equality
 * @param db the database object
 * @param searchRecords the search records we got
 * @param searchArgs the search arguments (that would be sent to the server) an we need
 * to emulate for
 */
export declare function search(rootProxy: Root, db: IDBPDatabase<ICacheDB>, searchRecords: IGQLSearchRecord[], searchArgs: any): Promise<IGQLSearchRecord[]>;
