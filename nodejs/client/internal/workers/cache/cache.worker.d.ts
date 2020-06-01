import "core-js/stable";
import "regenerator-runtime/runtime";
import { DBSchema } from "idb";
import { IGQLSearchRecord, IGQLValue, IGQLRequestFields, IGQLArgs, IGQLEndpointValue } from "../../../../gql-querier";
import { IRootRawJSONDataType } from "../../../../base/Root";
export interface ICacheMatchType {
    value: IGQLValue;
    fields: IGQLRequestFields;
}
export interface ICachedSearchResult {
    gqlValue: IGQLEndpointValue;
    dataMightBeStale: boolean;
    lastRecordDate: string;
}
export interface ISearchMatchType {
    fields: IGQLRequestFields;
    value: IGQLSearchRecord[];
    allResultsPreloaded: boolean;
    lastRecordDate: string;
    limit: number;
}
export interface ICacheDB extends DBSchema {
    queries: {
        key: string;
        value: ICacheMatchType;
    };
    searches: {
        key: string;
        value: ISearchMatchType;
    };
}
export declare const CACHE_NAME = "ITEMIZE_CACHE";
export declare const QUERIES_TABLE_NAME = "queries";
export declare const SEARCHES_TABLE_NAME = "searches";
/**
 * This class represents a worker that works under the hood
 * of the main app in order to cache queries coming from the
 * itemize main provider, this is the most complex cache of
 * them all, because it supports partial saving and it just
 * gathers data on top of itself, its not a service worker
 * it's a standard worker as it needs to access indexed db
 */
export default class CacheWorker {
    /**
     * Represents the indexed db database, as a promise
     * as the db might be loading even before it is requested
     * to perform any action
     */
    private db;
    /**
     * Specifies whether a version has been set for this
     * database, setting up the version is necessary to setup
     * the database but it's only necessary to do it once
     * however many instances might call the same function
     * when they need the cache, so it simply ignores next calls
     */
    private versionHasBeenSet;
    /**
     * The comlink proxied root class
     */
    private rootProxy;
    /**
     * Whether currently the cache is blocked from
     * releasing
     */
    private isCurrentlyBlocked;
    /**
     * a function to call once the blocked changes state
     */
    private blockedCallback;
    private waitForSetupPromise;
    private waitForSetupPromiseResolve;
    private resolved;
    constructor();
    /**
     * This actually setups the worker
     * @param version pass the build number here
     */
    setupVersion(version: number): Promise<void>;
    /**
     * Sets the cached value as null and updates all the searches
     * that contained that value to have it sliced from it
     * @param id the id of the item definition
     * @param version the version of the item definition
     * @param type the type of the item definition
     * @param queryName the GET query name
     * @param searchQueryNameModule optional, a search query name module to
     * be the only one to check against it should be SEARCH prefixed
     * @param searchQueryNameItemDefinition optional, a search query name
     * item definition to be the only one to check against it should be SEARCH prefixed
     *
     * These optional attributes make it way more efficient as it will allow
     * the algorithm to ignore something if it knows it won't contain the
     * item definition
     */
    setCachedValueAsNullAndUpdateSearches(id: number, version: string, type: string, queryName: string, searchQueryNameModule?: string, searchQueryNameItemDefinition?: string): Promise<boolean>;
    /**
     * sets a cache value, all of it, using a query name, should
     * be a get query, the id of the item definition and the
     * value that was retrieved, this value can be a partial value
     * @param queryName the query name
     * @param id the id of the item definition instance
     * @param version the version of the item definition instance
     * @param partialValue the partial value
     * @param partialFields the fields that represent the partial value
     * @param touchOrMerge optional, whether this is because of a touch of merge reqeust
     *                     doesn't do anything in practique, just for logging
     */
    setCachedValue(queryName: string, id: number, version: string, partialValue: IGQLValue, partialFields: IGQLRequestFields, touchOrMerge?: boolean): Promise<boolean>;
    deleteCachedValue(queryName: string, id: number, version: string): Promise<boolean>;
    mergeCachedValue(queryName: string, id: number, version: string, partialValue: IGQLValue, partialFields: IGQLRequestFields): Promise<boolean>;
    /**
     * Provides a cached value (all of it) if and only if this matches
     * the requested fields, it will not return anything (cache miss)
     * if it doesn't match all the requested fields
     * @param queryName the query name that is necessary to match against
     * @param id the id of the item definition instance
     * @param version the version of the item definition instance
     * @param requestedFields the requested fields from graphql
     */
    getCachedValue(queryName: string, id: number, version: string, requestedFields?: IGQLRequestFields): Promise<ICacheMatchType>;
    addRecordsToCachedSearch(searchQueryName: string, createdByIfKnown: number, parentTypeIfKnown: string, parentIdIfKnown: number, parentVersionIfKnown: string, newRecords: IGQLSearchRecord[], newLastRecordDate: string, cachePolicy: "by-owner" | "by-parent"): Promise<boolean>;
    runCachedSearch(searchQueryName: string, searchArgs: IGQLArgs, getListQueryName: string, getListTokenArgs: string, getListLangArgs: string, getListRequestedFields: IGQLRequestFields, cachePolicy: "by-owner" | "by-parent"): Promise<ICachedSearchResult>;
    proxyRoot(rootProxy: IRootRawJSONDataType): Promise<void>;
    setBlockedCallback(callback: (state: boolean) => void): Promise<void>;
}
