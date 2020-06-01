import { IGQLSearchRecord } from "../../../../gql-querier";
import { IDBPDatabase } from "idb";
import { ICacheDB } from "./cache.worker";
import Root from "../../../../base/Root";
export declare function search(rootProxy: Root, db: IDBPDatabase<ICacheDB>, searchResults: IGQLSearchRecord[], searchArgs: any): Promise<IGQLSearchRecord[]>;
