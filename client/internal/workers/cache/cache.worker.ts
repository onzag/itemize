/**
 * This is the cache worker itself, the cache worker allows to store
 * queries to singular item definition values as well as it allows
 * to store searched in owner or parented search mode and perform
 * emulated searches within it
 * @module
 */

import "core-js/stable";
import "regenerator-runtime/runtime";

import { expose } from "comlink";
import { openDB, DBSchema, IDBPDatabase } from "idb";
import { requestFieldsAreContained, deepMerge } from "../../../../gql-util";
import {
  IGQLSearchRecord, buildGqlQuery, gqlQuery, GQLEnum,
  IGQLValue, IGQLRequestFields, IGQLArgs, IGQLEndpointValue
} from "../../../../gql-querier";
import { PREFIX_GET, ENDPOINT_ERRORS } from "../../../../constants";
import { EndpointErrorType } from "../../../../base/errors";
import { search } from "./cache.worker.search";
import Root, { IRootRawJSONDataType } from "../../../../base/Root";
import { NanoSecondComposedDate } from "../../../../nanodate";

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
   * When was this last search modified
   */
  lastModified: string;
  /**
   * The source records that were used in the search
   */
  sourceRecords: IGQLSearchRecord[];
  sourceResults: ICacheMatchType[];
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
  lastModified: string;
  /**
   * The limit we limited ourselves to, the list can however
   * be larger than the limit as it might grow by events
   */
  limit: number;
  /**
   * the count that is set by the server when it retrieved
   * it's tried to be kept in sync
   */
  count: number;
}

export interface ICacheMetadataMatchType {
  /**
   * The value of the match
   */
  value: any;
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
  /**
   * Contains stored states
   */
  states: {
    key: string;
    value: any;
  };
  /**
   * Metadata stuff
   */
  metadata: {
    key: string;
    value: any;
  }
}

// Name of the cache in the indexed db database
export const CACHE_NAME = "ITEMIZE_CACHE";
// Name of the table
export const QUERIES_TABLE_NAME = "queries";
export const SEARCHES_TABLE_NAME = "searches";
export const STATES_TABLE_NAME = "states";
export const METADATA_TABLE_NAME = "metadata";

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
  private db: IDBPDatabase<ICacheDB> = null;
  /**
   * Specifies whether a version has been set for this
   * database, setting up the version is necessary to setup
   * the database but it's only necessary to do it once
   * however many instances might call the same function
   * when they need the cache, so it simply ignores next calls
   */
  private versionHasBeenSet: boolean = false;

  /**
   * The comlink proxied root class
   */
  private rootProxy: Root;

  /**
   * Whether currently the cache is blocked from
   * releasing
   */
  private isCurrentlyBlocked: boolean;

  /**
   * a function to call once the blocked changes state
   */
  private blockedCallback: (state: boolean) => void;

  /**
   * A promise that is resolved once the indexed db
   * has been setup, this doesn't say whether it was succesful
   * or it failed
   */
  private waitForSetupPromise: Promise<void>;
  /**
   * The resolve function that calls once the resolve has
   * been set
   */
  private waitForSetupPromiseResolve: () => void;
  /**
   * Whether the promise has been resolved as a boolean
   */
  private resolved: boolean = false;

  /**
   * Constructs a new cache worker
   */
  public constructor() {
    // we build the promise for wait for setup
    this.waitForSetupPromise = new Promise((resolve) => {
      // and now we can set this variable as our resolve function
      this.waitForSetupPromiseResolve = () => {
        // if we are not resolved yet
        if (!this.resolved) {
          // we set our resolved to true
          this.resolved = true;
          // and resolve
          resolve();
        }

        // the reason we did it like that is because this function
        // might be called a couple of times accidentally due to
        // how indexed db works
      };
    });
  }

  /**
   * This actually setups the worker
   * @param version pass the build number here
   */
  public async setupVersion(version: number) {
    // so if the version has been set, we ignore it
    if (this.versionHasBeenSet) {
      return;
    }
    // and set it to true
    this.versionHasBeenSet = true;

    // now we try to create the promised database
    let dbPromise: Promise<IDBPDatabase<ICacheDB>>;
    try {
      dbPromise = openDB<ICacheDB>(CACHE_NAME, version, {
        upgrade: (db) => {
          try {
            console.log("CLEARING CACHE DUE TO UPGRADE");
            try {
              db.deleteObjectStore(QUERIES_TABLE_NAME);
              db.deleteObjectStore(SEARCHES_TABLE_NAME);
              db.deleteObjectStore(STATES_TABLE_NAME);
              db.deleteObjectStore(METADATA_TABLE_NAME);

            } catch (err) {
              // No way to know if the store is there
              // so must catch the error
            }
            db.createObjectStore(QUERIES_TABLE_NAME);
            db.createObjectStore(SEARCHES_TABLE_NAME);
            db.createObjectStore(STATES_TABLE_NAME);
            db.createObjectStore(METADATA_TABLE_NAME);
          } catch (err) {
            console.warn(err);
          }

          // if we managed it here, we must not be blocked
          // maybe we were blocked before so we set the blocked
          // callback to false
          this.isCurrentlyBlocked = false;
          if (this.blockedCallback) {
            this.blockedCallback(false);
          }
        },
        blocked: () => {
          console.log("BLOCKED");

          // if we managed it here, we are blocked
          this.isCurrentlyBlocked = true;
          if (this.blockedCallback) {
            this.blockedCallback(true);
          }
        },
        terminated: () => {
          // maybe no support to indexed db who knows
          console.log("TERMINATED");
          this.db = null;
        }
      });


      // now we can set our db
      this.db = await dbPromise;

      // due to a bug in the indexed db implementation
      // sometimes the blocked event just doesn't get called
      // this forces me to somehow botch a blocked event
      // in order to be able to display the proper notification
      // because, well, bugs... not a single event will be called
      // so this is the only possible recourse

      // for that we set a timeout
      const timeout = setTimeout(() => {
        // if it takes longer than that, we consider
        // it blocked
        this.isCurrentlyBlocked = true;
        if (this.blockedCallback) {
          this.blockedCallback(true);
        }
      }, 300);

      // and so we wait for the indexeddb
      await dbPromise;
      // clear the timeout and hopefully it will make it before
      clearTimeout(timeout);
      // if it is blocked then we set it as unblocked
      if (this.isCurrentlyBlocked) {
        this.isCurrentlyBlocked = false;
        if (this.blockedCallback) {
          this.blockedCallback(false);
        }
      }

      // now we can resolve this promise
      this.waitForSetupPromiseResolve();

    } catch (err) {
      // if we cached an error during all that
      console.log(err);
      // we consider it resolved, even if this.db will never be a thing
      this.waitForSetupPromiseResolve();
    }

    console.log("CACHE SETUP", version);
  }

  public async storeState(
    qualifiedName: string,
    id: string,
    version: string,
    value: any,
  ) {
    console.log("REQUESTED TO STORE STATE FOR", qualifiedName, id, version, value);

    await this.waitForSetupPromise;

    // so first we await for our database
    if (!this.db) {
      // what gives, we return
      return false;
    }

    // otherwise we build the index indentifier, which is simple
    const queryIdentifier = `${qualifiedName}.${id}.${(version || "")}`;

    // and try to save it in the database, notice how we setup the expirarion
    // date
    try {
      await this.db.put(STATES_TABLE_NAME, value, queryIdentifier);
    } catch (err) {
      console.warn(err);
      return false;
    }

    return true;
  }

  public async retrieveState(
    qualifiedName: string,
    id: string,
    version: string,
  ) {
    console.log("REQUESTED STORED STATE FOR", qualifiedName, id, version);

    await this.waitForSetupPromise;

    // so first we await for our database
    if (!this.db) {
      // what gives, we return
      return null;
    }

    // otherwise we build the index indentifier, which is simple
    const queryIdentifier = `${qualifiedName}.${id}.${(version || "")}`;

    // and try to save it in the database, notice how we setup the expirarion
    // date
    try {
      return await this.db.get(STATES_TABLE_NAME, queryIdentifier);
    } catch (err) {
      console.warn(err);
      return null;
    }
  }

  public async deleteState(
    qualifiedName: string,
    id: string,
    version: string,
  ) {
    console.log("REQUESTED TO DELETE STATE FOR", qualifiedName, id, version);

    await this.waitForSetupPromise;

    // so first we await for our database
    if (!this.db) {
      // what gives, we return
      return false;
    }

    // otherwise we build the index indentifier, which is simple
    const queryIdentifier = `${qualifiedName}.${id}.${(version || "")}`;

    // and try to save it in the database, notice how we setup the expirarion
    // date
    try {
      await this.db.delete(STATES_TABLE_NAME, queryIdentifier);
    } catch (err) {
      console.warn(err);
      return false;
    }

    return true;
  }

  /**
   * sets a cache value, all of it, using a query name, should
   * be a get query, the id of the item definition and the
   * value that was retrieved, this value can be a partial value
   * @param queryName the query name
   * @param id the id of the item definition instance
   * @param version the version of the item definition instance
   * @param partialValue the partial value
   * @param partialFields the fields that represent the partial value
   * @param merge optional, whether this is because of a merge request
   */
  public async setCachedValue(
    queryName: string,
    id: string,
    version: string,
    partialValue: IGQLValue,
    partialFields: IGQLRequestFields,
    merge?: boolean,
  ): Promise<boolean> {
    if (!merge) {
      console.log("REQUESTED TO STORE", queryName, id, version, partialValue);
    }

    await this.waitForSetupPromise;

    // so first we await for our database
    if (!this.db) {
      // what gives, we return
      return false;
    }

    // otherwise we build the index indentifier, which is simple
    const queryIdentifier = `${queryName}.${id}.${(version || "")}`;

    // and try to save it in the database, notice how we setup the expirarion
    // date
    try {
      const idbNewValue = {
        value: partialValue,
        fields: partialFields,
      };
      await this.db.put(QUERIES_TABLE_NAME, idbNewValue, queryIdentifier);
    } catch (err) {
      console.warn(err);
      return false;
    }

    return true;
  }

  /**
   * Deletes a cached value for a GET request
   * @param queryName the query name of the item definition
   * @param id the id to use
   * @param version the version (or null)
   * @returns a boolean whether we succeed or not
   */
  public async deleteCachedValue(
    queryName: string,
    id: string,
    version: string,
  ): Promise<boolean> {
    console.log("REQUESTED TO DELETE", queryName, id, version);

    // so we wait for the setup, just in case
    await this.waitForSetupPromise;

    // if we don't have it
    if (!this.db) {
      // what gives, we return
      return false;
    }

    // now we can see the identifier of our query
    const queryIdentifier = `${queryName}.${id}.${(version || "")}`;

    // and now we try this
    try {
      await this.db.delete(QUERIES_TABLE_NAME, queryIdentifier);
      await this.db.delete(METADATA_TABLE_NAME, queryIdentifier);
    } catch (err) {
      console.warn(err);
      return false;
    }

    return true;
  }

  public async writeSearchMetadata(
    queryName: string,
    cachePolicy: "by-owner" | "by-parent" | "by-owner-and-parent",
    createdByIfKnown: string,
    parentTypeIfKnown: string,
    parentIdIfKnown: string,
    parentVersionIfKnown: string,
    metadata: any,
  ) {
    console.log(
      "REQUESTED TO STORE SEARCH METADATA FOR",
      queryName, cachePolicy, createdByIfKnown, parentTypeIfKnown, parentIdIfKnown, parentVersionIfKnown);

    await this.waitForSetupPromise;

    // so first we await for our database
    if (!this.db) {
      // what gives, we return
      return false;
    }

    let storeKeyName = queryName + "." + cachePolicy.replace("-", "_") + ".";
    if (cachePolicy === "by-owner") {
      storeKeyName += (createdByIfKnown || "");
    } else if (cachePolicy === "by-parent") {
      storeKeyName += parentTypeIfKnown + "." + parentIdIfKnown + "." + (parentVersionIfKnown || "");
    } else {
      storeKeyName += (createdByIfKnown || "") + "." + parentTypeIfKnown + "." + parentIdIfKnown + "." + (parentVersionIfKnown || "");
    }

    // and try to save it in the database, notice how we setup the expirarion
    // date
    try {
      const idbNewValue = {
        value: metadata,
      };
      await this.db.put(METADATA_TABLE_NAME, idbNewValue, storeKeyName);
    } catch (err) {
      console.warn(err);
      return false;
    }

    return true;
  }

  public async writeMetadata(
    queryName: string,
    id: string,
    version: string,
    metadata: any,
  ) {
    console.log("REQUESTED TO STORE METADATA FOR", queryName, id, version, metadata);

    await this.waitForSetupPromise;

    // so first we await for our database
    if (!this.db) {
      // what gives, we return
      return false;
    }

    // otherwise we build the index indentifier, which is simple
    const queryIdentifier = `${queryName}.${id}.${(version || "")}`;

    // and try to save it in the database, notice how we setup the expirarion
    // date
    try {
      const idbNewValue = {
        value: metadata,
      };
      await this.db.put(METADATA_TABLE_NAME, idbNewValue, queryIdentifier);
    } catch (err) {
      console.warn(err);
      return false;
    }

    return true;
  }

  public async readSearchMetadata(
    queryName: string,
    cachePolicy: "by-owner" | "by-parent" | "by-owner-and-parent",
    createdByIfKnown: string,
    parentTypeIfKnown: string,
    parentIdIfKnown: string,
    parentVersionIfKnown: string,
  ): Promise<ICacheMetadataMatchType> {
    console.log(
      "REQUESTED TO READ SEARCH METADATA FOR",
      queryName, cachePolicy, createdByIfKnown, parentTypeIfKnown, parentIdIfKnown, parentVersionIfKnown);

    await this.waitForSetupPromise;

    // so first we await for our database
    if (!this.db) {
      // what gives, we return
      return null;
    }

    let storeKeyName = queryName + "." + cachePolicy.replace("-", "_") + ".";
    if (cachePolicy === "by-owner") {
      storeKeyName += (createdByIfKnown || "");
    } else if (cachePolicy === "by-parent") {
      storeKeyName += parentTypeIfKnown + "." + parentIdIfKnown + "." + (parentVersionIfKnown || "");
    } else {
      storeKeyName += (createdByIfKnown || "") + "." + parentTypeIfKnown + "." + parentIdIfKnown + "." + (parentVersionIfKnown || "");
    }

    try {
      return await this.db.get(METADATA_TABLE_NAME, storeKeyName);
    } catch (err) {
      console.warn(err);
      return null;
    }
  }

  public async readMetadata(
    queryName: string,
    id: string,
    version: string,
  ): Promise<ICacheMetadataMatchType> {
    console.log("REQUESTED TO READ METADATA FOR", queryName, id, version);

    await this.waitForSetupPromise;

    // so first we await for our database
    if (!this.db) {
      // what gives, we return
      return null;
    }

    // otherwise we build the index indentifier, which is simple
    const queryIdentifier = `${queryName}.${id}.${(version || "")}`;

    try {
      return await this.db.get(METADATA_TABLE_NAME, queryIdentifier);
    } catch (err) {
      console.warn(err);
      return null;
    }
  }

  /**
   * Deletes a cached search and all the referent values that are related to it
   * @param queryName the query name for that cached search
   * @param type the type of the search
   * @param arg either the owner or the parent or all
   */
  public async deleteCachedSearch(
    queryName: string,
    type: "by-parent" | "by-owner" | "by-owner-and-parent",
    owner: string,
    parent: [string, string, string],
  ) {
    // so we wait for the setup, just in case
    await this.waitForSetupPromise;

    // if we don't have it
    if (!this.db) {
      // what gives, we return
      return false;
    }

    // we get the key name where we are supposed to be
    let storeKeyName = queryName + "." + type.replace("-", "_") + ".";
    if (type === "by-owner") {
      storeKeyName += (owner || "");
    } else if (type === "by-parent") {
      storeKeyName += parent[0] + "." + parent[1] + "." + (parent[2] || "");
    } else if (type === "by-owner-and-parent") {
      storeKeyName += (owner || "") + "." + parent[0] + "." + parent[1] + "." + (parent[2] || "");
    }

    try {
      // get the current value
      const currentValue: ISearchMatchType = await this.db.get(SEARCHES_TABLE_NAME, storeKeyName);

      if (!currentValue) {
        return false;
      }

      // and now we loop on all the records and delete them
      // as well
      await Promise.all(
        currentValue.value.map((record) => {
          return this.deleteCachedValue(
            PREFIX_GET + record.type,
            record.id,
            record.version,
          );
        })
      );

      // and now we can delete the search itself
      await this.db.delete(QUERIES_TABLE_NAME, storeKeyName);
    } catch (err) {
      console.warn(err);
      return false;
    }

    return true;
  }

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
  public async mergeCachedValue(
    queryName: string,
    id: string,
    version: string,
    partialValue: IGQLValue,
    partialFields: IGQLRequestFields,
  ): Promise<boolean> {
    console.log("REQUESTED TO MERGE", queryName, id, version, partialValue);

    // so we get the current value
    const currentValue = await this.getCachedValue(queryName, id, version);

    // if there's no current value
    // or the value is null (aka not_found value)
    // or the time signature does not match
    if (
      !currentValue ||
      !currentValue.value ||
      partialValue.last_modified !== currentValue.value.last_modified
    ) {
      // we perform an override only if the value is greater
      let shouldMerge = !currentValue || !currentValue.value;
      if (!shouldMerge) {
        const partialValueTime = new NanoSecondComposedDate(partialValue.last_modified as string);
        const currentValueTime = new NanoSecondComposedDate(currentValue.value.last_modified as string);
        shouldMerge = partialValueTime.greaterThan(currentValueTime)
      }

      if (shouldMerge) {
        return await this.setCachedValue(
          queryName,
          id,
          version,
          partialValue,
          partialFields,
          true,
        );
      }
    } else {
      // otherwise there's a current value with the same time signature
      // and we can merge it
      const mergedFields = deepMerge(
        partialFields,
        currentValue.fields,
      );
      const mergedValue = deepMerge(
        partialValue,
        currentValue.value,
      );
      // like this
      return await this.setCachedValue(
        queryName,
        id,
        version,
        mergedValue,
        mergedFields,
        true,
      );
    }
  }

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
  public async getCachedValue(
    queryName: string,
    id: string,
    version: string,
    requestedFields?: IGQLRequestFields,
  ): Promise<ICacheMatchType> {
    if (requestedFields) {
      console.log("CACHED QUERY REQUESTED", queryName, id, version, requestedFields);
    }

    await this.waitForSetupPromise;

    // if we don't have a database no match
    if (!this.db) {
      return null;
    }

    // now we build the identifier
    const queryIdentifier = `${queryName}.${id}.${(version || "")}`;
    try {
      // and we attempt to get the value from the database
      const idbValue: ICacheMatchType = await this.db.get(QUERIES_TABLE_NAME, queryIdentifier);
      // if we found a value, in this case a null value means
      // no match
      if (idbValue) {
        // let's check what kind of value it is, note this value
        // might be null itself (not found, deleted) elements
        // match like that
        const fields = idbValue.fields;

        if (!requestedFields || requestFieldsAreContained(requestedFields, fields)) {
          if (requestedFields) {
            console.log("RETURNING FROM CACHE", queryName, id, version, requestedFields, idbValue);
          }
          return idbValue;
        }
      }
    } catch (err) {
      console.warn(err);
    }

    if (requestedFields) {
      console.log("NO MATCH", queryName, id, requestedFields);
    }
    // cache didn't match, returning no match
    // something wrong might have happened as well
    return null;
  }

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
  public async updateRecordsOnCachedSearch(
    searchQueryName: string,
    createdByIfKnown: string,
    parentTypeIfKnown: string,
    parentIdIfKnown: string,
    parentVersionIfKnown: string,
    newRecords: IGQLSearchRecord[],
    modifiedRecords: IGQLSearchRecord[],
    lostRecords: IGQLSearchRecord[],
    newLastModified: string,
    cachePolicy: "by-owner" | "by-parent" | "by-owner-and-parent",
  ): Promise<boolean> {
    await this.waitForSetupPromise;

    // so we fetch our db like usual
    if (!this.db) {
      return false;
    }

    let storeKeyName = searchQueryName + "." + cachePolicy.replace("-", "_") + ".";
    if (cachePolicy === "by-owner") {
      storeKeyName += (createdByIfKnown || "");
    } else if (cachePolicy === "by-parent") {
      storeKeyName += parentTypeIfKnown + "." + parentIdIfKnown + "." + (parentVersionIfKnown || "");
    } else {
      storeKeyName += (createdByIfKnown || "") + "." + parentTypeIfKnown + "." + parentIdIfKnown + "." + (parentVersionIfKnown || "");
    }

    try {
      await Promise.all(lostRecords.map((r) => {
        return this.setCachedValue(
          PREFIX_GET + r.type,
          r.id,
          r.version,
          null,
          null,
          undefined,
        );
      }));
    } catch {

    }

    // So we say that not all results are preloaded so that when the next iteration of the
    // search notices (which should be executed shortly afterwards, then the new records are loaded)
    try {
      const currentValue: ISearchMatchType = await this.db.get(SEARCHES_TABLE_NAME, storeKeyName);

      if (!currentValue) {
        return false;
      }

      // the patch has already been applied it must be the same
      // exact patch
      if (currentValue.lastModified === newLastModified) {
        return;
      }

      // there might not be a current value, eg. if for some reason cache policy was set to none and yet
      // there was a listen policy for it, or if otherwise the data got somehow corrupted
      if (currentValue) {
        let newCount = currentValue.count - lostRecords.length + newRecords.length;
        // weird
        if (newCount < 0) {
          newCount = 0;
        }

        let newValue = currentValue.value.map((r) => {
          const matchingLostRecord = lostRecords.find((lr) => lr.id === r.id && lr.version === r.version);
          if (matchingLostRecord) {
            return null;
          }
          const matchingUpdatedRecord = modifiedRecords.find((mr) => mr.id === r.id && mr.version === r.version);
          if (matchingUpdatedRecord) {
            // just in case and to avoid corruption we should ensure that the new record incoming
            // for modification is newer than the current one
            const matchingUpdatedRecordNano = new NanoSecondComposedDate(matchingUpdatedRecord.last_modified);
            const currentRecordNano = new NanoSecondComposedDate(r.last_modified);

            // if our current is older than the supposed patch update
            if (currentRecordNano.greaterThan(matchingUpdatedRecordNano)) {
              // we avoid and return our current since it's newer
              return r;
            }

            // otherwise we return the newer patch
            return matchingUpdatedRecord;
          }

          return r;
        }).filter((r) => r !== null);

        // we need to filter the new records to stop duplicates from occurring
        // this can happen when there are several listeners going on at the same time
        const newRecordsFiltered: IGQLSearchRecord[] = newRecords.filter((nr) => {
          const recordAlreadyAdded = newValue.find((r) => r.id === nr.id && r.version === nr.version);
          return !recordAlreadyAdded;
        });

        // and now we can concat them
        newValue = newValue.concat(newRecordsFiltered);

        // this list will fill when a row is modified but it was actually reparented
        // so it registers as modified but it is now in our current list of values
        const recordsThatRequestedModificationButArentInTheList: IGQLSearchRecord[] = modifiedRecords.filter((mr) => {
          // only not found passes
          return newValue.findIndex((r) => r.id === mr.id && r.version === mr.version) === -1;
        });

        newValue = newValue.concat(recordsThatRequestedModificationButArentInTheList);

        await this.db.put(SEARCHES_TABLE_NAME, {
          ...currentValue,
          lastModified: newLastModified,
          value: newValue,
          count: newCount,
          allResultsPreloaded: false,
        }, storeKeyName);
      }
    } catch {
      return false;
    }

    return true;
  }

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
  public async runCachedSearch(
    searchQueryName: string,
    searchArgs: IGQLArgs,
    getListQueryName: string,
    getListTokenArg: string,
    getListLangArg: string,
    getListRequestedFields: IGQLRequestFields,
    cachePolicy: "by-owner" | "by-parent" | "by-owner-and-parent",
    maxGetListResultsAtOnce: number,
    returnSources: boolean,
    redoSearch: boolean,
    redoRecords: boolean | IGQLSearchRecord[],
  ): Promise<ICachedSearchResult> {
    await this.waitForSetupPromise;

    if (!this.db) {
      return null;
    }

    let storeKeyName = searchQueryName + "." + cachePolicy.replace("-", "_") + ".";
    if (cachePolicy === "by-owner") {
      storeKeyName += searchArgs.created_by;
    } else if (cachePolicy === "by-parent") {
      storeKeyName += searchArgs.parent_type + "." +
        searchArgs.parent_id + "." + (searchArgs.parent_version || "");
    } else {
      storeKeyName += searchArgs.created_by + "." + searchArgs.parent_type + "." +
        searchArgs.parent_id + "." + (searchArgs.parent_version || "");
    }

    // first we build an array for the results that we need to process
    // this means results that are not loaded in memory or partially loaded
    // in memory for some reason, say if the last search failed partially
    let resultsToProcess: IGQLSearchRecord[];
    let resultsCount: number;
    // this is what the fields end up being, say that there are two different
    // cached searches with different fields, we need both to be merged
    // in order to know what we have retrieved, originally it's just what
    // we were asked for
    let lastModified: string;
    let dataMightBeStale = false;
    let limitToSetInDb: number;

    try {
      // now we request indexed db for a result
      const dbValue: ISearchMatchType = redoSearch ? null : await this.db.get(SEARCHES_TABLE_NAME, storeKeyName);
      // if the database is not offering anything or the limit is less than
      // it is supposed to be, this means that we have grown the cache size, but yet
      // the cache remains constrained by the older size, this only truly matters if
      // the new limit is larger than the old limit, otherwise it's fine
      if (!dbValue || dbValue.limit < searchArgs.limit) {
        // we need to remove the specifics of the search
        // as we are caching everything to the given criteria
        // and then using client side to filter
        const actualArgsToUseInGQLSearch: IGQLArgs = {
          token: searchArgs.token,
          language: searchArgs.language,
          order_by: {
            created_at: {
              nulls: new GQLEnum("LAST"),
              direction: new GQLEnum("DESC"),
              priority: 0,
            },
          },
          limit: searchArgs.limit,
          offset: 0,
        };

        if (cachePolicy === "by-owner" || cachePolicy === "by-owner-and-parent") {
          actualArgsToUseInGQLSearch.created_by = searchArgs.created_by;
        }

        if (cachePolicy === "by-parent" || cachePolicy === "by-owner-and-parent") {
          actualArgsToUseInGQLSearch.parent_type = searchArgs.parent_type;
          actualArgsToUseInGQLSearch.parent_id = searchArgs.parent_id;
          actualArgsToUseInGQLSearch.parent_version = searchArgs.parent_version;
        }

        // we request the server for this, in this case
        // it might not have been able to connect
        const query = buildGqlQuery({
          name: searchQueryName,
          args: actualArgsToUseInGQLSearch,
          fields: {
            records: {
              id: {},
              version: {},
              type: {},
              last_modified: {},
            },
            last_modified: {},
            limit: {},
            offset: {},
            count: {},
          },
        });

        // so we get the server value
        const serverValue = await gqlQuery(query);

        // if we get an error from the server, return the
        // server value and let it be handled
        if (serverValue.errors) {
          // return it
          return {
            gqlValue: serverValue,
            dataMightBeStale: false,
            lastModified: null,
            sourceRecords: null,
            sourceResults: null,
          };
        }

        // now these are the results that we need to process
        // from the search query, the IGQLSearchRecord that we
        // need to process
        resultsToProcess = serverValue.data[searchQueryName].records as IGQLSearchRecord[];
        lastModified = serverValue.data[searchQueryName].last_modified as string;
        limitToSetInDb = searchArgs.limit as number;
        resultsCount = serverValue.data[searchQueryName].count as number;
      } else {
        // otherwise our results to process are the same ones we got
        // from the database, but do we need to process them for real?
        // it depends
        resultsToProcess = dbValue.value;
        lastModified = dbValue.lastModified;
        dataMightBeStale = true;
        limitToSetInDb = dbValue.limit;
        resultsCount = dbValue.count;

        // if the fields are contained within what the database has loaded
        // and if all the results were preloaded then they don't need to be
        // preloaded
        if (
          requestFieldsAreContained(getListRequestedFields, dbValue.fields) &&
          // all results preloaded will not be true when the listener triggers
          dbValue.allResultsPreloaded &&
          // not tasked to redo the records
          !redoRecords
        ) {
          // now we can actually start using the args to run a local filtering
          // function

          try {
            const searchResponse = await search(this.rootProxy, this.db, resultsToProcess, searchArgs, returnSources);
            const records = searchResponse.filteredRecords;
            const sourceResults = searchResponse.sourceResults;
            const gqlValue: IGQLEndpointValue = {
              data: {
                [searchQueryName]: {
                  records,
                  last_modified: lastModified,
                  // we return the true limit, because records might grow over the limit
                  limit: (records.length < searchArgs.limit ? searchArgs.limit : records.length) as number,
                  offset: 0,
                  count: resultsCount,
                },
              },
            };

            return {
              gqlValue,
              dataMightBeStale,
              lastModified,
              sourceRecords: resultsToProcess,
              sourceResults,
            };
          } catch (err) {
            // It comes here if it finds data corruption during the search and it should
            // be handled accordingly by the refetcher which is under all this
            // after the next catch
            // note how we are suppressing this one error
          }
        }
      }
    } catch (err) {
      // yet some other errors might come here
      // we return an unspecified error if we hit an error
      const gqlValue: IGQLEndpointValue = {
        data: null,
        errors: [
          {
            extensions: {
              code: ENDPOINT_ERRORS.UNSPECIFIED,
              message: "Unspecified error in worker",
            },
          },
        ],
      };

      return {
        gqlValue,
        dataMightBeStale,
        lastModified,
        sourceRecords: null,
        sourceResults: null,
      };
    }

    // IT goes here if, not all results were preloaded or
    // there was nothing stored at all

    // now we set what we have just gotten from the server (or the database)
    // and assign the value (maybe again) with the results, the fields we are supposed
    // to have contained within all the fetched batches at the end and say
    // false to preloaded because we haven't preloaded anything
    await this.db.put(SEARCHES_TABLE_NAME, {
      value: resultsToProcess,
      fields: getListRequestedFields,
      allResultsPreloaded: false,
      lastModified,
      limit: limitToSetInDb,
      count: resultsCount,
    }, storeKeyName);

    // now we first got to extract what is has actually been loaded from those
    // results to process and actually has managed to make it to the database
    // this can happens when something fails in between, or it is loaded by another
    // part of the application
    const uncachedOrOutdatedResultsToProcess: IGQLSearchRecord[] = [];
    // so now we check all the results we are asked to process
    await Promise.all(resultsToProcess.map(async (resultToProcess) => {
      // manual set for redoing records
      if (redoRecords === true) {
        uncachedOrOutdatedResultsToProcess.push(resultToProcess);
        return;
      } else if (Array.isArray(redoRecords)) {
        const matchFound = redoRecords.find((r) =>
          r.id === resultToProcess.id && r.version === resultToProcess.version && r.type === resultToProcess.type);
        if (matchFound) {
          uncachedOrOutdatedResultsToProcess.push(resultToProcess);
        }
        return;
      }

      // and get the cached results, considering the fields
      // we are asked to request
      const cachedResult = await this.getCachedValue(
        PREFIX_GET + resultToProcess.type,
        resultToProcess.id,
        resultToProcess.version,
        getListRequestedFields,
      );
      // if there is no cached results
      if (!cachedResult) {
        // then we add it to the uncached list we need to process
        uncachedOrOutdatedResultsToProcess.push(resultToProcess);
      } else if (cachedResult && cachedResult.value) {
        // this is the value that it has for the last modified as a query
        const cachedResultNanoDate = new NanoSecondComposedDate(cachedResult.value.last_modified as string);
        // this is the value that it has for the last modified as a record
        const recordNanoDate = new NanoSecondComposedDate(resultToProcess.last_modified);
        // if the cached result date is less than the record it means the record is newer and it
        // was updated during the search and that's why all results preloaded might be false
        // then those records must be added
        if (cachedResultNanoDate.lessThan(recordNanoDate)) {
          // it is outdated
          uncachedOrOutdatedResultsToProcess.push(resultToProcess);
        }
      }
    }));

    // now it's time to preload, there's a limit on how big the batches can be on the server side
    // so we have to limit our batches size
    const batches: IGQLSearchRecord[][] = [[]];
    let lastBatchIndex = 0;
    // for that we run a each event in all our uncached results
    uncachedOrOutdatedResultsToProcess.forEach((uncachedOrOutdatedResultToProcess) => {
      // and when we hit the limit, we build a new batch
      if (batches[lastBatchIndex].length === maxGetListResultsAtOnce) {
        batches.push([]);
        lastBatchIndex++;
      }

      // add this to the batch
      batches[lastBatchIndex].push(uncachedOrOutdatedResultToProcess);
    });

    // now we need to load all those batches into graphql queries
    const processedBatches = await Promise.all(batches.map(async (batch) => {
      // makes no sense sending a request with nothing to fetch
      if (batch.length === 0) {
        return {
          gqlValue: {
            data: {
              [getListQueryName]: {
                results: [],
              }
            },
          },
          batch,
        }
      }

      const args: IGQLArgs = {
        token: getListTokenArg,
        language: getListLangArg,
        records: batch,
      };
      if (searchArgs.created_by) {
        args.created_by = searchArgs.created_by;
      }
      // we build the query, using the get list functionality
      const listQuery = buildGqlQuery({
        name: getListQueryName,
        args,
        fields: {
          results: getListRequestedFields,
        },
      });
      // and execute it
      const gqlValue = await gqlQuery(
        listQuery,
      );

      // return the value, whatever it is, null, error, etc..
      return { gqlValue, batch };
    }));

    // we will assume one error, whatever we pick at last, to be
    // the global error and consider everything to be failed even if
    // just one of them fails, however, we do in fact want still to cache
    // whatever it is sucesful, so we don't have to retrieve it again
    // in a second round
    let somethingFailed = false;
    let error: EndpointErrorType;

    // now we call every processed batch
    await Promise.all(processedBatches.map(async (processedBatch) => {
      const originalBatch = processedBatch.batch;
      const resultingValue = processedBatch.gqlValue;
      // the resulting value is what gql gave us
      if (resultingValue.errors) {
        // if there's an error, we use that error as the error
        somethingFailed = true;
        error = resultingValue.errors[0].extensions;
      } else if (
        !resultingValue.data ||
        !resultingValue.data[getListQueryName] ||
        !resultingValue.data[getListQueryName].results
      ) {
        somethingFailed = true;
        error = {
          code: ENDPOINT_ERRORS.UNSPECIFIED,
          message: "There was no data in the resulting value, despite no errors",
        };
      } else {
        // otherwise now we need to set all that in memory right now
        // and so we will do
        await Promise.all(
          (resultingValue.data[getListQueryName].results as IGQLValue[]).map(async (value, index) => {
            const originalBatchRequest = originalBatch[index];
            let suceedStoring: boolean;
            if (value === null) {
              // if the item was deleted, somehow, like it's so unlikely but
              // still possible, say run a search search fails somehow, and then
              // later when executed the item is gone
              suceedStoring = await this.setCachedValue(
                PREFIX_GET + originalBatchRequest.type,
                originalBatchRequest.id,
                originalBatchRequest.version,
                null,
                null
              );
            } else {
              // otherwise we do push the value and merge the cache
              // notice how we consider this an actual resulting value, whereas
              // we would not even use the deleted as a search result
              suceedStoring = await this.mergeCachedValue(
                PREFIX_GET + originalBatchRequest.type,
                originalBatchRequest.id,
                originalBatchRequest.version,
                value,
                getListRequestedFields,
              );
            }

            // if it didn't succeed strong the value
            // from the cache then we consider the whole combo
            // failed, even it's just one
            if (!suceedStoring) {
              somethingFailed = true;
              error = {
                code: ENDPOINT_ERRORS.UNSPECIFIED,
                message: "Failed to store the cached value",
              };
            }
          }));
      }
    }));

    // if something has not failed then we are good to go
    if (!somethingFailed) {
      // we mark everything as cached, it has succeed caching
      // everything!
      const actualCurrentSearchValue: ISearchMatchType = await this.db.get(SEARCHES_TABLE_NAME, storeKeyName);
      await this.db.put(SEARCHES_TABLE_NAME, {
        ...actualCurrentSearchValue,
        allResultsPreloaded: true,
      }, storeKeyName);

      // Now we need to filter the search results in order to return what is
      // appropiate using the actualCurrentSearchValue
      const searchResponse = await search(this.rootProxy, this.db, actualCurrentSearchValue.value, searchArgs, returnSources);
      const records = searchResponse.filteredRecords;
      const sourceResults = searchResponse.sourceResults;
      const gqlValue: IGQLEndpointValue = {
        data: {
          [searchQueryName]: {
            last_modified: lastModified,
            records,
            limit: (records.length < searchArgs.limit ? searchArgs.limit : records.length) as number,
            offset: 0,
            count: resultsCount,
          },
        },
      };

      return {
        gqlValue,
        dataMightBeStale,
        lastModified,
        sourceResults,
        sourceRecords: actualCurrentSearchValue.value,
      };
    } else if (error) {
      // if we managed to catch an error, we pretend
      // to be graphql
      const gqlValue: IGQLEndpointValue = {
        data: null,
        errors: [
          {
            extensions: error,
          },
        ],
      };
      return {
        gqlValue,
        dataMightBeStale,
        lastModified,
        sourceRecords: null,
        sourceResults: null,
      };
    } else {
      // otherwise it must have been some sort
      // of connection failure (or database error)
      // we return an unspecified error if we hit an error
      const gqlValue: IGQLEndpointValue = {
        data: null,
        errors: [
          {
            extensions: {
              code: ENDPOINT_ERRORS.UNSPECIFIED,
              message: "Unspecified error in worker",
            },
          },
        ],
      };

      return {
        gqlValue,
        dataMightBeStale,
        lastModified,
        sourceRecords: null,
        sourceResults: null,
      };
    }
  }

  public async proxyRoot(rootProxy: IRootRawJSONDataType) {
    this.rootProxy = new Root(rootProxy);
  }

  public async setBlockedCallback(callback: (state: boolean) => void) {
    this.blockedCallback = callback;
    if (this.isCurrentlyBlocked) {
      callback(this.isCurrentlyBlocked);
    }
  }
}

console.log("CACHE WORKER EXPOSING");

// expose using comlink
expose(new CacheWorker());
