import { expose } from "comlink";
import { openDB, DBSchema, IDBPDatabase } from "idb";
import { requestFieldsAreContained, deepMerge } from "../app/gql-querier";

interface ICacheDB extends DBSchema {
  queries: {
    key: string;
    value: {
      value: any,
      expires: Date,
    };
    indexes: { expires: Date };
  };
}

interface ICachedResult {
  value: any;
}

const CACHE_NAME = "ITEMIZE_CACHE";
const TABLE_NAME = "queries";
const UNUSED_CACHE_DURATION_IN_DAYS = 7;

export default class CacheWorker {
  private dbPromise: Promise<IDBPDatabase<ICacheDB>> = null;
  private versionHasBeenSet: boolean = false;
  public setupVersion(version: number) {
    if (this.versionHasBeenSet) {
      return;
    }
    this.versionHasBeenSet = true;

    try {
      this.dbPromise = openDB<ICacheDB>(CACHE_NAME, version, {
        // TODO this function fails sometimes randomly and it's impossible to tell why
        // it's buggy, figure out why it fails and when
        upgrade(db) {
          const queriesStore = db.createObjectStore(TABLE_NAME);
          queriesStore.createIndex("expires", "timestamp");
        },
      });
    } catch (err) {
      console.warn(err);
    }

    this.cleanUpOldRecords();
  }
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
  public async setCache(queryName: string, id: number, value: any) {
    console.log("requested to save", queryName, id, value);
    const db = await this.dbPromise;
    if (!db) {
      return null;
    }
    const queryIdentifier = `${queryName}.${id}`;
    try {
      const idbNewValue = {
        value,
        expires: new Date(Date.now() + (UNUSED_CACHE_DURATION_IN_DAYS * 86400000)),
      };
      await db.put(TABLE_NAME, idbNewValue, queryIdentifier);
    } catch (err) {
      console.warn(err);
    }
  }
  public async getCachedValue(queryName: string, id: number, requestedFields: any) {
    console.log("requested", queryName, id, requestedFields);
    const db = await this.dbPromise;
    if (!db) {
      return null;
    }
    const queryIdentifier = `${queryName}.${id}`;
    try {
      const idbValue = await db.get(TABLE_NAME, queryIdentifier);
      if (idbValue) {
        const value = idbValue.value;
        if (requestFieldsAreContained(requestedFields, value)) {
          this.setCache(queryName, id, value);
          console.log("provided", value);
          return {
            value,
          };
        }
      }
    } catch (err) {
      console.warn(err);
    }
    console.log("not found");
    return null;
  }
}

expose(new CacheWorker());
