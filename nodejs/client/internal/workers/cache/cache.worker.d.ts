/**
 * This is the cache worker itself, the cache worker allows to store
 * queries to singular item definition values as well as it allows
 * to store searched in owner or parented search mode and perform
 * emulated searches within it
 * @packageDocumentation
 */
import "core-js/stable";
import "regenerator-runtime/runtime";
import { DBSchema } from "idb";
import { IGQLSearchRecord, IGQLValue, IGQLRequestFields, IGQLArgs, IGQLEndpointValue } from "../../../../gql-querier";
import { IRootRawJSONDataType } from "../../../../base/Root";
/**
 * A cache match for a standard query, basically
 * contains the value it got with the fields it requested
 * the value can be null yet it requested many fields, the fields
 * can also be null to match any field, a null, null combo is common for
 * deleted or not found values; the fields can have a mismatch
 * since the value can be blocked
 */
export interface ICacheMatchType {
    /**
     * The value of the match
     */
    value: IGQLValue;
    /**
     * The fields that can be requested for that value
     */
    fields: IGQLRequestFields;
}
/**
 * The cached search result is what comes from the cached search
 * once a search has been performed, it emulates a search done
 * in the server side; the cache worker creates this
 */
export interface ICachedSearchResult {
    /**
     * The graphql value that it emulates from the server side
     */
    gqlValue: IGQLEndpointValue;
    /**
     * Whether the data might be stale, as in old data that needs
     * to be rechecked an update
     */
    dataMightBeStale: boolean;
    /**
     * Of all the records stored for that search, what was the last time
     * we fetch a record for it, this is a nanodate type
     */
    lastRecordDate: string;
}
/**
 * This is the cached search itself as a list of matches, but not the value
 * themselves, this is possibly a limited list, and it's always 0 offset
 * (or it should be) ordered by time of adding (the default)
 */
export interface ISearchMatchType {
    /**
     * The fields that were requested and should be contained
     * in each one of these search matches
     */
    fields: IGQLRequestFields;
    /**
     * The value as a list of search records
     */
    value: IGQLSearchRecord[];
    /**
     * Whether all the records in that list have been preloaded
     * as matched on the cache itself
     */
    allResultsPreloaded: boolean;
    /**
     * The last record date of that records list
     */
    lastRecordDate: string;
    /**
     * The limit we limited ourselves to, the list can however
     * be larger than the limit as it might grow by events
     */
    limit: number;
}
/**
 * The cache indexed db database schema
 */
export interface ICacheDB extends DBSchema {
    /**
     * Contains all the GET queries
     */
    queries: {
        key: string;
        value: ICacheMatchType;
    };
    /**
     * Contains all searches, either owned or parented
     */
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
    /**
     * A promise that is resolved once the indexed db
     * has been setup, this doesn't say whether it was succesful
     * or it failed
     */
    private waitForSetupPromise;
    /**
     * The resolve function that calls once the resolve has
     * been set
     */
    private waitForSetupPromiseResolve;
    /**
     * Whether the promise has been resolved as a boolean
     */
    private resolved;
    /**
     * Constructs a new cache worker
     */
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
    /**
     * Deletes a cached value for a GET request
     * @param queryName the query name of the item definition
     * @param id the id to use
     * @param version the version (or null)
     * @returns a boolean whether we succeed or not
     */
    deleteCachedValue(queryName: string, id: number, version: string): Promise<boolean>;
    /**
     * Merges a cached value of an item definition with another if possible
     * it will perform a total override if the last_modified value do not match
     * as it doesn't know what else has changed, it can only truly merge
     * if the signature of time is equal
     * @param queryName the query we are merging for
     * @param id the id
     * @param version the version (or null)
     * @param partialValue the partial value we are merging
     * @param partialFields the partial fields
     */
    mergeCachedValue(queryName: string, id: number, version: string, partialValue: IGQLValue, partialFields: IGQLRequestFields): Promise<boolean>;
    /**
     * Provides a cached value (all of it) if and only if this matches
     * the requested fields, it will not return anything (cache miss)
     * if it doesn't match all the requested fields
     * @param queryName the query name that is necessary to match against
     * @param id the id of the item definition instance
     * @param version the version of the item definition instance
     * @param requestedFields the requested fields from graphql, optional the function
     * will only return if it contains all those requested fields
     */
    getCachedValue(queryName: string, id: number, version: string, requestedFields?: IGQLRequestFields): Promise<ICacheMatchType>;
    /**
     * Updates a cached search records list by pushing a new record
     * to the list in front
     * @param searchQueryName the search query to update
     * @param createdByIfKnown the created by (used for by-owner)
     * @param parentTypeIfKnown the parent type (user for by-parent)
     * @param parentIdIfKnown the parent id (user for by-parent)
     * @param parentVersionIfKnown the parent version, or null (user for by-parent)
     * @param newRecords the new records to be added
     * @param newLastRecordDate the new last record date of the added records
     * @param cachePolicy the cache policy that we are working with
     */
    addRecordsToCachedSearch(searchQueryName: string, createdByIfKnown: number, parentTypeIfKnown: string, parentIdIfKnown: number, parentVersionIfKnown: string, newRecords: IGQLSearchRecord[], newLastRecordDate: string, cachePolicy: "by-owner" | "by-parent"): Promise<boolean>;
    /**
     * Runs a search in the cache inside indexeddb rather than using
     * the server
     * @param searchQueryName the search query we are running
     * @param searchArgs the search arguments that would be passed to the server
     * that needs to be accounted for
     * @param getListQueryName the get list query name (either for module or item definition)
     * @param getListTokenArg the get list token
     * @param getListLangArg the get list arg
     * @param getListRequestedFields the requested fields for the get list process
     * @param cachePolicy the cache policy used
     * @param maxGetListResultsAtOnce how many results at once you can get for the batching
     * for when preloading every record in the list in the client side
     */
    runCachedSearch(searchQueryName: string, searchArgs: IGQLArgs, getListQueryName: string, getListTokenArg: string, getListLangArg: string, getListRequestedFields: IGQLRequestFields, cachePolicy: "by-owner" | "by-parent", maxGetListResultsAtOnce: number): Promise<ICachedSearchResult>;
    proxyRoot(rootProxy: IRootRawJSONDataType): Promise<void>;
    setBlockedCallback(callback: (state: boolean) => void): Promise<void>;
}
