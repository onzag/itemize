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
export declare function search(rootProxy: Root, db: IDBPDatabase<ICacheDB>, searchResults: IGQLSearchRecord[], searchArgs: any): Promise<IGQLSearchRecord[]>;
