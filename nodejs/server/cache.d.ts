import { RedisClient } from "redis";
import Knex from "knex";
import { ISQLTableRowValue } from "../base/Root/sql";
import { IGQLSearchResult } from "../gql-querier";
export declare class Cache {
    private redisClient;
    private knex;
    constructor(redisClient: RedisClient, knex: Knex);
    getIdefCachedValue(idefQueryIdentifier: string): Promise<{
        value: ISQLTableRowValue;
    }>;
    pokeCache(keyIdentifier: string): void;
    forceCacheInto(idefTable: string, id: number, version: string, value: any): Promise<unknown>;
    requestCache(idefTable: string, moduleTable: string, id: number, version: string, refresh?: boolean): Promise<ISQLTableRowValue>;
    checkCache(keyIdentifier: string): Promise<boolean>;
    requestListCache(moduleTable: string, ids: IGQLSearchResult[]): Promise<ISQLTableRowValue[]>;
}
