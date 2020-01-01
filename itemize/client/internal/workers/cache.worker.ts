import "babel-polyfill";
import { expose } from "comlink";
import { openDB, DBSchema, IDBPDatabase } from "idb";
import { requestFieldsAreContained, deepMerge } from "../../../gql-util";

export interface ICacheMatchType {
  value: any;
  fields: any;
  expires: Date;
}

interface ICacheDB extends DBSchema {
  queries: {
    key: string;
    value: ICacheMatchType;
    indexes: { expires: Date };
  };
}

// Name of the cache in the indexed db database
const CACHE_NAME = "ITEMIZE_CACHE";
// Name of the table
const TABLE_NAME = "queries";
// For how long the cache persists before being removed
const UNUSED_CACHE_DURATION_IN_DAYS = 7;

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
  private dbPromise: Promise<IDBPDatabase<ICacheDB>> = null;
  /**
   * Specifies whether a version has been set for this
   * database, setting up the version is necessary to setup
   * the database but it's only necessary to do it once
   * however many instances might call the same function
   * when they need the cache, so it simply ignores next calls
   */
  private versionHasBeenSet: boolean = false;
  /**
   * This actually setups the worker
   * @param version pass the build number here
   */
  public setupVersion(version: number) {
    // so if the version has been set, we ignore it
    if (this.versionHasBeenSet) {
      return;
    }
    // and set it to true
    this.versionHasBeenSet = true;

    // now we try to create the promised database
    this.dbPromise = openDB<ICacheDB>(CACHE_NAME, version, {
      upgrade(db) {
        try {
          console.log("CLEARING CACHE DUE TO UPGRADE");
          try {
            db.deleteObjectStore(TABLE_NAME);
          } catch (err) {
            // No way to know if the store is there
            // so must catch the error
          }
          const queriesStore = db.createObjectStore(TABLE_NAME);
          queriesStore.createIndex("expires", "timestamp");
        } catch (err) {
          console.warn(err);
        }
      },
    });

    console.log("CACHE SETUP", version);

    // and we request to clean any old data
    this.cleanUpOldRecords();
  }

  /**
   * This was shamessly stolen from an idea from stack overflow
   * in order to be able to remove old records from a database
   * as we don't want our cache to linger on forever
   */
  public async cleanUpOldRecords() {
    // https://stackoverflow.com/questions/35511033/how-to-apply-expiry-times-to-keys-in-html5-indexeddb/35518068
    const db = await this.dbPromise;
    if (!db) {
      return;
    }
    const tx = db.transaction(TABLE_NAME, "readwrite");
    const range = IDBKeyRange.upperBound(new Date());
    let cursor = await tx.objectStore(TABLE_NAME).index("expires").openCursor(range);
    while (cursor) {
      await cursor.delete();
      cursor = await cursor.continue();
    }
  }

  /**
   * sets a cache value, all of it, using a query name, should
   * be a get query, the id of the item definition and the
   * value that was retrieved, this value can be a partial value
   * @param queryName the query name
   * @param id the id of the item definition instance
   * @param partialValue the partial value
   * @param partialFields the fields that represent the partial value
   * @param touchOrMerge optional, whether this is because of a touch of merge reqeust
   *                     doesn't do anything in practique, just for logging
   */
  public async setCachedValue(
    queryName: string,
    id: number,
    partialValue: any,
    partialFields: any,
    touchOrMerge?: boolean,
  ) {
    if (!touchOrMerge) {
      console.log("REQUESTED TO STORE", queryName, id, partialValue);
    }

    // so first we await for our database
    const db = await this.dbPromise;
    // if we don't have it
    if (!db) {
      // what gives, we return
      return;
    }

    // otherwise we build the index indentifier, which is simple
    const queryIdentifier = `${queryName}.${id}`;

    // and try to save it in the database, notice how we setup the expirarion
    // date
    try {
      const idbNewValue = {
        value: partialValue,
        fields: partialFields,
        expires: new Date(Date.now() + (UNUSED_CACHE_DURATION_IN_DAYS * 86400000)),
      };
      await db.put(TABLE_NAME, idbNewValue, queryIdentifier);
    } catch (err) {
      console.warn(err);
    }
  }

  public async deleteCachedValue(
    queryName: string,
    id: number,
  ) {
    console.log("REQUESTED TO DELETE", queryName, id);

    // so first we await for our database
    const db = await this.dbPromise;
    // if we don't have it
    if (!db) {
      // what gives, we return
      return;
    }

    const queryIdentifier = `${queryName}.${id}`;

    try {
      await db.delete(TABLE_NAME, queryIdentifier);
    } catch (err) {
      console.warn(err);
    }
  }

  public async mergeCachedValue(
    queryName: string,
    id: number,
    partialValue: any,
    partialFields: any,
  ) {
    console.log("REQUESTED TO MERGE", queryName, id, partialValue);

    const currentValue = await this.getCachedValue(queryName, id);
    if (
      !currentValue ||
      !currentValue.value ||
      partialValue.last_modified !== currentValue.value.last_modified
    ) {
      await this.setCachedValue(
        queryName,
        id,
        partialValue,
        partialFields,
        true,
      );
    } else {
      const mergedFields = deepMerge(
        partialFields,
        currentValue.fields,
      );
      const mergedValue = deepMerge(
        partialValue,
        currentValue.value,
      );
      await this.setCachedValue(
        queryName,
        id,
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
   * @param requestedFields the requested fields from graphql
   */
  public async getCachedValue(queryName: string, id: number, requestedFields?: any): Promise<ICacheMatchType> {
    if (requestedFields) {
      console.log("CACHED QUERY REQUESTED", queryName, id, requestedFields);
    }

    // so we fetch our db like usual
    let db: any;
    try {
      db = await this.dbPromise;
    } catch (err) {
      console.log(err);
    }

    // if we don't have a database no match
    if (!db) {
      console.log("null");
      return null;
    }

    // now we build the identifier
    const queryIdentifier = `${queryName}.${id}`;
    try {
      // and we attempt to get the value from the database
      const idbValue = await db.get(TABLE_NAME, queryIdentifier);
      // if we found a value, in this case a null value means
      // no match
      if (idbValue) {
        // let's check what kind of value it is, note this value
        // might be null itself (not found, deleted) elements
        // match like that
        const value = idbValue.value;
        const fields = idbValue.fields;

        this.setCachedValue(queryName, id, value, fields, true);

        if (!requestedFields || requestFieldsAreContained(requestedFields, fields)) {
          if (requestedFields) {
            console.log("RETURNING FROM CACHE", queryName, id, requestedFields, idbValue);
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
}

// expose using comlink
expose(new CacheWorker());
