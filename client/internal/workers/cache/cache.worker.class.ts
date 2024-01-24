/**
 * This is the cache worker itself, the cache worker allows to store
 * queries to singular item definition values as well as it allows
 * to store searched in owner or parented search mode and perform
 * emulated searches within it
 * @module
 */

import { openDB, DBSchema, IDBPDatabase } from "idb";
import { requestFieldsAreContained, deepMerge } from "../../../../rq-util";
import {
  IRQSearchRecord, buildRQQuery, rqQuery,
  IRQValue, IRQRequestFields, IRQArgs, IRQEndpointValue, IRQFile
} from "../../../../rq-querier";
import { PREFIX_GET, ENDPOINT_ERRORS } from "../../../../constants";
import type { EndpointErrorType } from "../../../../base/errors";
import { search } from "./cache.worker.search";
import Root, { IRootRawJSONDataType } from "../../../../base/Root";
import { NanoSecondComposedDate } from "../../../../nanodate";
import type ItemDefinition from "../../../../base/Root/Module/ItemDefinition";
import type PropertyDefinition from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import type Include from "../../../../base/Root/Module/ItemDefinition/Include";
import type { IConfigRawJSONDataType } from "../../../../config";
import type { IItemStateType } from "../../../../base/Root/Module/ItemDefinition";

// taken from the server side to specify what is a valid
const customIdVersionRegex = /^[A-Za-z0-9-_\+\!\#]+$/;
export function validateCustomIdVersion(idOrVersion: string) {
  if (!customIdVersionRegex.test(idOrVersion)) {
    return false;
  }
  return true;
}

function checkIdVersionThrowErr(idOrVersion: string): void {
  if (!idOrVersion) {
    return;
  }

  const isValid = validateCustomIdVersion(idOrVersion);

  if (!isValid) {
    throw new Error("Invalid id/version specified that contains special invalid characters " + idOrVersion);
  }
}

// Name of the table
export const QUERIES_TABLE_NAME = "queries";
export const SEARCHES_TABLE_NAME = "searches";
export const STATES_TABLE_NAME = "states";
export const METADATA_TABLE_NAME = "metadata";

const STATE_LISTENERS: { [key: string]: Array<Function> } = {};
export const POLYFILLED_INDEXED_DB: {
  [storeName: string]: {
    [key: string]: any;
  }
} = {};
POLYFILLED_INDEXED_DB[STATES_TABLE_NAME] = {};
POLYFILLED_INDEXED_DB[SEARCHES_TABLE_NAME] = {};
POLYFILLED_INDEXED_DB[QUERIES_TABLE_NAME] = {};
POLYFILLED_INDEXED_DB[METADATA_TABLE_NAME] = {};

export interface ICacheStateMetadata {
  overwriteLastModified: string;
  overwriteId: string;
  overwriteVersion: string;
  overwriteType: string;
}

async function wait(n: number) {
  return new Promise((r) => {
    setTimeout(r, n);
  })
}

// TODO make orphan table
// when deleting cached values that are marked for destruction
// for example within a search they will delete such values regardless
// of whom is using them, for example, say a search and another search have
// overlapping values, deleting one search will delete all the values that
// are in use in the other search, a source of origin must be specified so
// that values are only deleted once the sources of origin have been
// exhaused so that the element is not left orphaned

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
  value: IRQValue;
  /**
   * The fields that can be requested for that value
   */
  fields: IRQRequestFields;
}

/**
 * The cached search result is what comes from the cached search
 * once a search has been performed, it emulates a search done
 * in the server side; the cache worker creates this
 */
export interface ICachedSearchResult {
  /**
   * The rq value that it emulates from the server side
   */
  rqValue: IRQEndpointValue;
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
   * The source records that were used in the search, aka all the records that
   * were searched for in the search, not just the matching ones that were
   * requested, this list may be very large
   */
  sourceRecords: IRQSearchRecord[];
  /**
   * The source results that were used in the search, if requested, this
   * is basically the source records themselves but containing all the fields
   * and matching data that was available
   */
  sourceResults: ICacheMatchType[];
  /**
   * Whether the polyfill had to be used in the process say due to errors
   * while storing with indexedb and if the option to enable writes
   * to polyfill was allowed
   */
  polyfilled: boolean;
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
  fields: IRQRequestFields;
  /**
   * The value as a list of search records
   */
  value: IRQSearchRecord[];
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
    value: {
      state: IItemStateType,
      metadata: ICacheStateMetadata,
    };
  };
  /**
   * Metadata stuff
   */
  metadata: {
    key: string;
    value: any;
  }
}

function fixOneFile(
  file: IRQFile,
) {
  if (!file.src) {
    return;
  }

  try {
    file.url = URL.createObjectURL(file.src as Blob);
    delete file.src;
  } catch (err) {
    console.error("Could not resolve file src for", file);
  }
}

export function fixFilesURLAt(
  partialValue: IRQValue,
  itemDef: ItemDefinition,
  include: Include,
  property: PropertyDefinition,
) {
  if (!partialValue) {
    return;
  }

  const idLocation = include ? include.getPrefixedQualifiedIdentifier() + property.getId() : property.getId();
  if (
    (
      property.getType() !== "file" &&
      property.getType() !== "files"
    ) || !partialValue.DATA || !partialValue.DATA[idLocation]
  ) {
    return;
  }

  const value = partialValue.DATA[idLocation];

  if (Array.isArray(value)) {
    value.forEach((v) => fixOneFile(v as any));
  } else {
    fixOneFile(value as any);
  }
}

// Name of the cache in the indexed db database
export const CACHE_NAME = "ITEMIZE_CACHE";

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
  private root: Root;
  private config: IConfigRawJSONDataType;

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
   * whether to use a polyfilled cache worker
   */
  private polyfilled: boolean = false;
  /**
   * because we need to repair the cache worker to have some functions
   * called within the main thread, we need to have this remote one
   * wrapped inside our main
   */
  private worker: CacheWorker = null;

  /**
   * force storage full functionality
   */
  private storageFullForced: boolean = false;
  private badReadsForced: boolean = false;
  private badWritesForced: boolean = false;

  /**
   * used during initialization to block the execution
   * of code
   */
  private waitForBlockPromise: Promise<void> = null;
  private waitForBlockPromiseResolve: () => void = null;

  /**
   * Constructs a new cache worker
   */
  public constructor(polyfilled: boolean, worker?: CacheWorker) {
    this.polyfilled = polyfilled;
    this.worker = worker;

    if (this.worker) {
      return;
    }

    if (!this.polyfilled) {
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
    } else {
      this.waitForSetupPromise = null;
    }
  }

  public forceStorageFull() {
    this.storageFullForced = true;
  }

  public forceBadReads() {
    this.badReadsForced = true;
  }

  public forceBadWrites() {
    this.badWritesForced = true;
  }

  /**
   * This actually setups the worker
   * @param version pass the build number here
   */
  public async setupVersion(version: number): Promise<void> {
    if (this.worker) {
      return this.worker.setupVersion(version);
    }

    if (this.polyfilled) {
      this.db = true as any;
      return;
    }
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
            // console.log("CLEARING CACHE DUE TO UPGRADE");
            try {
              db.deleteObjectStore(QUERIES_TABLE_NAME);
              db.deleteObjectStore(SEARCHES_TABLE_NAME);
              // db.deleteObjectStore(STATES_TABLE_NAME);
              db.deleteObjectStore(METADATA_TABLE_NAME);

            } catch (err) {
              // No way to know if the store is there
              // so must catch the error
            }
            db.createObjectStore(QUERIES_TABLE_NAME);
            db.createObjectStore(SEARCHES_TABLE_NAME);
            // the states should not be removed as they represent
            // stuff that the user saved
            if (!db.objectStoreNames.contains(STATES_TABLE_NAME)) {
              db.createObjectStore(STATES_TABLE_NAME)
            }
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
          // console.log("BLOCKED");

          // if we managed it here, we are blocked
          this.isCurrentlyBlocked = true;
          if (this.blockedCallback) {
            this.blockedCallback(true);
          }
        },
        terminated: () => {
          // maybe no support to indexed db who knows
          // console.log("TERMINATED");
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

    // console.log("CACHE SETUP", version);
  }

  public async addEventListenerToStateChange(
    qualifiedName: string,
    id: string,
    version: string,
    callback: (id: string, version: string, state: any, metadata: ICacheStateMetadata) => void,
  ) {
    checkIdVersionThrowErr(id);
    checkIdVersionThrowErr(version);

    if (this.worker) {
      const listenerLoc = qualifiedName + "." + (id || "") + "." + (version || "");
      if (!STATE_LISTENERS[listenerLoc]) {
        STATE_LISTENERS[listenerLoc] = [callback];
      } else {
        STATE_LISTENERS[listenerLoc].push(callback);
      }
    } else {
      console.error("The actual worker cannot add event listeners to the state change");
      return;
    }
  }

  public async removeEventListenerToStateChange(
    qualifiedName: string,
    id: string,
    version: string,
    callback: (id: string, version: string, state: any, metadata: ICacheStateMetadata) => void,
  ) {
    checkIdVersionThrowErr(id);
    checkIdVersionThrowErr(version);

    if (this.worker) {
      const listenerLoc = qualifiedName + "." + (id || "") + "." + (version || "");
      if (STATE_LISTENERS[listenerLoc]) {
        const index = STATE_LISTENERS[listenerLoc].indexOf(callback);
        if (index !== -1) {
          STATE_LISTENERS[listenerLoc].splice(index, 1);
        }
      }
    } else {
      console.error("The actual worker cannot remove event listeners to the state change");
      return;
    }
  }

  public async addUnversionedEventListenerToStateChange(
    qualifiedName: string,
    id: string,
    callback: (id: string, version: string, state: any, metadata: ICacheStateMetadata) => void,
  ) {
    checkIdVersionThrowErr(id);

    if (this.worker) {
      const listenerLoc = qualifiedName + "." + (id || "");
      if (!STATE_LISTENERS[listenerLoc]) {
        STATE_LISTENERS[listenerLoc] = [callback];
      } else {
        STATE_LISTENERS[listenerLoc].push(callback);
      }
    } else {
      console.error("The actual worker cannot add unversioned event listeners to the state change");
      return;
    }
  }

  public async removeUnversionedEventListenerToStateChange(
    qualifiedName: string,
    id: string,
    callback: (id: string, version: string, state: any, metadata: ICacheStateMetadata) => void,
  ) {
    checkIdVersionThrowErr(id);

    if (this.worker) {
      const listenerLoc = qualifiedName + "." + (id || "");
      if (STATE_LISTENERS[listenerLoc]) {
        const index = STATE_LISTENERS[listenerLoc].indexOf(callback);
        if (index !== -1) {
          STATE_LISTENERS[listenerLoc].splice(index, 1);
        }
      }
    } else {
      console.error("The actual worker cannot remove unversioned event listeners to the state change");
      return;
    }
  }

  public async storeState(
    qualifiedName: string,
    id: string,
    version: string,
    state: IItemStateType,
    metadata: ICacheStateMetadata,
    options?: {
      allowFallbackWritesToPolyfill?: boolean,
    }
  ): Promise<boolean> {
    checkIdVersionThrowErr(id);
    checkIdVersionThrowErr(version);

    // console.log("REQUESTED TO STORE STATE FOR", qualifiedName, id, version, value);
    if (this.worker) {
      const rs = await this.worker.storeState(qualifiedName, id, version, state, metadata, options);
      if (rs) {
        const listeners = STATE_LISTENERS[qualifiedName + "." + (id || "") + "." + (version || "")];
        listeners && listeners.forEach((l) => l(id, version, state, metadata || null));

        const idSpecificListeners = STATE_LISTENERS[qualifiedName + "." + (id || "")];
        idSpecificListeners && idSpecificListeners.forEach((l) => l(id, version, state, metadata || null));
      }
      return rs;
    }

    await this.waitForSetupPromise;
    await this.waitForBlockPromise;

    // so first we await for our database
    if (!this.db) {
      console.warn("Could not retrieve IndexedDB");
      // what gives, we return
      return false;
    }

    // otherwise we build the index indentifier, which is simple
    const queryIdentifier = `${qualifiedName}.${(id || "")}.${(version || "")}`;

    // and try to save it in the database, notice how we setup the expirarion
    // date
    try {
      // cheating we slap METADATA in there
      if (this.polyfilled) {
        POLYFILLED_INDEXED_DB[STATES_TABLE_NAME][queryIdentifier] = { state, metadata };
      } else {
        delete POLYFILLED_INDEXED_DB[STATES_TABLE_NAME][queryIdentifier];
        if (this.badWritesForced) {
          throw new Error("Forced bad writes error");
        }
        if (this.storageFullForced) {
          throw new Error("Forced storage full error");
        }
        await this.db.put(
          STATES_TABLE_NAME,
          ({ state, metadata }), queryIdentifier);
      }
    } catch (err) {
      if (options && options.allowFallbackWritesToPolyfill) {
        POLYFILLED_INDEXED_DB[STATES_TABLE_NAME][queryIdentifier] = { state, metadata };
        return true;
      }
      console.warn(err);
      return false;
    }

    return true;
  }

  public async retrieveUnversionedStateList(
    qualifiedName: string,
    id: string,
  ): Promise<Array<{ id: string, version: string }>> {
    checkIdVersionThrowErr(id);

    if (this.worker) {
      return this.worker.retrieveUnversionedStateList(qualifiedName, id);
    }

    await this.waitForSetupPromise;
    await this.waitForBlockPromise;

    if (!this.db) {
      console.warn("Could not retrieve IndexedDB");
      // what gives, we return
      return [];
    }

    let keys: string[];
    if (this.polyfilled) {
      keys = Object.keys(POLYFILLED_INDEXED_DB[STATES_TABLE_NAME]);
    } else {
      const tx = this.db.transaction(STATES_TABLE_NAME);
      const store = tx.objectStore(STATES_TABLE_NAME);
      keys = await store.getAllKeys();
      // add the keys from the polyfilled
      const polyfilledKeys = Object.keys(POLYFILLED_INDEXED_DB[STATES_TABLE_NAME]);
      Object.assign(keys, polyfilledKeys);
    }

    // with all the keys now we know the value
    return keys.map((v) => v.split(".") as [string, string, string]).filter((v) => v[0] === qualifiedName && v[1] === id).map((v) => (
      { id, version: v[2] }
    ));
  }

  public async retrieveState(
    qualifiedName: string,
    id: string,
    version: string,
  ): Promise<[IItemStateType, ICacheStateMetadata]> {
    checkIdVersionThrowErr(id);

    if (this.worker) {
      return this.worker.retrieveState(qualifiedName, id, version);
    }
    // console.log("REQUESTED STORED STATE FOR", qualifiedName, id, version);

    await this.waitForSetupPromise;
    await this.waitForBlockPromise;

    // so first we await for our database
    if (!this.db) {
      console.warn("Could not retrieve IndexedDB");
      // what gives, we return
      return [null, null];
    }

    // otherwise we build the index indentifier, which is simple
    const queryIdentifier = `${qualifiedName}.${(id || "")}.${(version || "")}`;

    // and try to save it in the database, notice how we setup the expirarion
    // date
    try {
      let value: { state: IItemStateType, metadata: ICacheStateMetadata };
      if (this.polyfilled) {
        value = POLYFILLED_INDEXED_DB[STATES_TABLE_NAME][queryIdentifier] || null;
      } else {
        value = POLYFILLED_INDEXED_DB[STATES_TABLE_NAME][queryIdentifier];
        if (!value) {
          if (this.badReadsForced) {
            throw new Error("Forced bad read error");
          }
          value = await this.db.get(STATES_TABLE_NAME, queryIdentifier);
        }
      }
      if (value) {
        return [value.state, value.metadata];
      } else {
        return [null, null];
      }
    } catch (err) {
      console.warn(err);
      return [null, null];
    }
  }

  public async deleteState(
    qualifiedName: string,
    id: string,
    version: string,
  ): Promise<boolean> {
    checkIdVersionThrowErr(id);
    checkIdVersionThrowErr(version);

    // console.log("REQUESTED TO DELETE STATE FOR", qualifiedName, id, version);
    if (this.worker) {
      const rs = await this.worker.deleteState(qualifiedName, id, version);
      if (rs) {
        const listeners = STATE_LISTENERS[qualifiedName + "." + (id || "") + "." + (version || "")];
        listeners && listeners.forEach((l) => l(id, version, null, null));

        const idSpecificListeners = STATE_LISTENERS[qualifiedName + "." + (id || "")];
        idSpecificListeners && idSpecificListeners.forEach((l) => l(id, version, null, null));
      }
      return rs;
    }

    await this.waitForSetupPromise;
    await this.waitForBlockPromise;

    // so first we await for our database
    if (!this.db) {
      console.warn("Could not retrieve IndexedDB");
      // what gives, we return
      return false;
    }

    // otherwise we build the index indentifier, which is simple
    const queryIdentifier = `${qualifiedName}.${(id || "")}.${(version || "")}`;

    // and try to save it in the database, notice how we setup the expirarion
    // date
    try {
      // if (this.polyfilled) {
      delete POLYFILLED_INDEXED_DB[STATES_TABLE_NAME][queryIdentifier];
      if (!this.polyfilled) {
        if (this.badWritesForced) {
          throw new Error("Forced bad writes error");
        }
        await this.db.delete(STATES_TABLE_NAME, queryIdentifier);
      }
    } catch (err) {
      console.warn(err);
      return false;
    }

    return true;
  }

  private _fileURLAbsoluter(
    file: IRQFile,
    itemDef: ItemDefinition,
    include: Include,
    property: PropertyDefinition,
    containerId: string,
    id: string,
    version: string,
  ) {
    // this is taken from fileURLAbsoluter
    // not imported here in order to make it more efficient  
    if (
      file.url.indexOf("blob:") === 0 ||
      file.url.indexOf("http:") === 0 ||
      file.url.indexOf("https:") === 0
    ) {
      return file.url;
    }

    const domain = process.env.NODE_ENV === "development" ? this.config.developmentHostname : this.config.productionHostname;

    let prefix: string = this.config.containersHostnamePrefixes[containerId];

    if (!prefix) {
      return null;
    }

    // if it doesn't end in / this means we need to add it
    if (prefix[prefix.length - 1] !== "/") {
      prefix += "/";
    }
    // and now we add the domain /mysite.com/ where all the data shall be stored for
    // that container
    prefix += domain + "/";
    // if it doesn't start with /, which means it's not a local url but its own domain eg. container.com/KEY/mysite.com/
    // we want to add https to it
    if (prefix.indexOf("/") !== 0) {
      prefix = "https://" + prefix;
    }

    return (
      prefix +
      (
        property.isExtension() ?
          itemDef.getParentModule().getQualifiedPathName() :
          itemDef.getQualifiedPathName()
      ) + "/" +
      id + "." + (version || "") + "/" +
      (include ? include.getId() + "/" : "") +
      property.getId() + "/" +
      file.id + "/" + file.url
    );
  }

  private async obtainOneFile(
    file: IRQFile,
    itemDef: ItemDefinition,
    include: Include,
    property: PropertyDefinition,
    containerId: string,
    id: string,
    version: string,
  ) {
    if (file.src) {
      return;
    }

    const finalUrl: string = this._fileURLAbsoluter(file, itemDef, include, property, containerId, id, version);
    if (!finalUrl) {
      return;
    }

    // assigning the file to the blob and setting it into the source

    // STRANGE BUG where the blob fails to be received due to very nonsensical
    // behaviour, sometimes the stream just fail to be retrieved resulting in a size
    // 0 blob, reject such blobs until one real blob is received
    let size = 0;
    let time = (new Date()).getTime();
    let blob: Blob = null;
    while (size === 0) {
      blob = await (await fetch(finalUrl)).blob();
      size = blob.size;
      if (size === 0) {
        const timePassed = (new Date()).getTime() - time;
        // 10 seconds have passed and it couldn't get it
        if (timePassed >= 10000) {
          console.warn("Failed to receive proper blob information from url " + finalUrl + " received empty blob, gave up");
          return;
        }

        // wait 500 ms for next try
        console.warn("Failed to receive proper blob information from url " + finalUrl + " received empty blob, trying again");
        await wait(500);
      }
    }
    file.src = blob;
  }

  private async processFilesAt(
    partialValue: IRQValue,
    itemDef: ItemDefinition,
    include: Include,
    property: PropertyDefinition,
    containerId: string,
    id: string,
    version: string,
  ) {
    const idLocation = include ? include.getId() : property.getId();
    const idLocationLevel2 = include ? property.getId() : null;
    if (
      property.getType() !== "file" &&
      property.getType() !== "files"
    ) {
      return;
    }

    if (!partialValue || !partialValue.DATA || !partialValue.DATA[idLocation]) {
      return;
    }

    if (!idLocationLevel2 ? false : !partialValue[idLocation][idLocationLevel2]) {
      return;
    }

    let value = partialValue.DATA[idLocation];
    if (idLocationLevel2) {
      value = value[idLocationLevel2];
    }

    if (Array.isArray(value)) {
      await Promise.all(value.map((v) => this.obtainOneFile(v as any, itemDef, include, property, containerId, id, version)))
    } else {
      await this.obtainOneFile(value as any, itemDef, include, property, containerId, id, version);
    }
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
    partialValue: IRQValue,
    partialFields: IRQRequestFields,
    options?: {
      allowFallbackWritesToPolyfill?: boolean,
    }
  ): Promise<boolean> {
    checkIdVersionThrowErr(id);
    checkIdVersionThrowErr(version);

    if (this.worker) {
      return this.worker.setCachedValue(
        queryName,
        id,
        version,
        partialValue,
        partialFields,
        options,
      );
    }

    // if (!merge) {
    //   console.log("REQUESTED TO STORE", queryName, id, version, partialValue);
    // }

    await this.waitForSetupPromise;
    await this.waitForBlockPromise;

    // so first we await for our database
    if (!this.db) {
      console.warn("Could not retrieve IndexedDB");
      // what gives, we return
      return false;
    }

    // we need to resolve potential files
    // to be stored in our cached value as the source
    const type = queryName.replace(PREFIX_GET, "");
    const idef = this.root.registry[type] as ItemDefinition;

    const containerId = partialValue && partialValue.container_id as string;

    try {
      if (containerId && partialValue) {
        await Promise.all(idef.getAllPropertyDefinitionsAndExtensions().map(async (p) => {
          await this.processFilesAt(partialValue, idef, null, p, containerId, id, version);
        }));

        await Promise.all(idef.getAllIncludes().map(async (i) => {
          await Promise.all(i.getSinkingProperties().map(async (sp) => {
            await this.processFilesAt(partialValue, idef, i, sp, containerId, id, version);
          }));
        }));
      }
    } catch (err) {
      console.warn(err);
      return false;
    }

    // otherwise we build the index indentifier, which is simple
    const queryIdentifier = `${queryName}.${id}.${(version || "")}`;
    const idbNewValue = {
      value: partialValue,
      fields: partialFields,
    };

    // and try to save it in the database
    try {
      if (this.polyfilled) {
        POLYFILLED_INDEXED_DB[QUERIES_TABLE_NAME][queryIdentifier] = idbNewValue;
      } else {
        // delete a potential polyfilled in case
        delete POLYFILLED_INDEXED_DB[QUERIES_TABLE_NAME][queryIdentifier];
        if (this.badWritesForced) {
          throw new Error("Forced bad writes error");
        }
        if (this.storageFullForced) {
          throw new Error("Forced storage full error");
        }
        await this.db.put(QUERIES_TABLE_NAME, idbNewValue, queryIdentifier);
      }
    } catch (err) {
      console.warn(err);
      if (options && options.allowFallbackWritesToPolyfill) {
        POLYFILLED_INDEXED_DB[QUERIES_TABLE_NAME][queryIdentifier] = idbNewValue;
        return true;
      }
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
    checkIdVersionThrowErr(id);
    checkIdVersionThrowErr(version);

    if (this.worker) {
      return this.worker.deleteCachedValue(queryName, id, version);
    }
    // console.log("REQUESTED TO DELETE", queryName, id, version);

    // so we wait for the setup, just in case
    await this.waitForSetupPromise;
    // await this.waitForBlockPromise;

    // if we don't have it
    if (!this.db) {
      console.warn("Could not retrieve IndexedDB");
      // what gives, we return
      return false;
    }

    // now we can see the identifier of our query
    const queryIdentifier = `${queryName}.${id}.${(version || "")}`;

    // useful information
    console.log("Deleting query for " + queryIdentifier);

    // and now we try this
    try {
      // if (this.polyfilled) {
      delete POLYFILLED_INDEXED_DB[QUERIES_TABLE_NAME][queryIdentifier];
      delete POLYFILLED_INDEXED_DB[METADATA_TABLE_NAME][queryIdentifier];
      if (!this.polyfilled) {
        if (this.badWritesForced) {
          throw new Error("Forced bad writes error");
        }
        await this.db.delete(QUERIES_TABLE_NAME, queryIdentifier);
        await this.db.delete(METADATA_TABLE_NAME, queryIdentifier);
      }
    } catch (err) {
      console.warn(err);
      return false;
    }

    return true;
  }

  public async writeSearchMetadata(
    queryName: string,
    searchArgs: IRQArgs,
    cachePolicy: "by-owner" | "by-parent" | "by-owner-and-parent" | "by-property",
    trackedProperty: string,
    createdByIfKnown: string,
    parentTypeIfKnown: string,
    parentIdIfKnown: string,
    parentVersionIfKnown: string,
    metadata: any,
    options?: {
      allowFallbackWritesToPolyfill?: boolean,
    },
  ): Promise<boolean> {
    if (this.worker) {
      return this.worker.writeSearchMetadata(
        queryName,
        searchArgs,
        cachePolicy,
        trackedProperty,
        createdByIfKnown,
        parentTypeIfKnown,
        parentIdIfKnown,
        parentVersionIfKnown,
        metadata,
        options,
      );
    }

    // console.log(
    //   "REQUESTED TO STORE SEARCH METADATA FOR",
    //   queryName, cachePolicy, createdByIfKnown, parentTypeIfKnown, parentIdIfKnown, parentVersionIfKnown);

    await this.waitForSetupPromise;
    await this.waitForBlockPromise;

    // so first we await for our database
    if (!this.db) {
      console.warn("Could not retrieve IndexedDB");
      // what gives, we return
      return false;
    }

    let storeKeyName = queryName + "." + cachePolicy.replace("-", "_") + ".";
    if (cachePolicy === "by-owner") {
      storeKeyName += (createdByIfKnown || "");
    } else if (cachePolicy === "by-parent") {
      storeKeyName += parentTypeIfKnown + "." + parentIdIfKnown + "." + (parentVersionIfKnown || "");
    } else if (cachePolicy === "by-property") {
      const cachePropertyValue = searchArgs["SEARCH_" + trackedProperty] as string;
      if (!cachePropertyValue || typeof cachePropertyValue !== "string") {
        console.warn("Could not find a valid value for SEARCH_" + trackedProperty + " and hence the search cannot be executed");
        return null;
      }
      storeKeyName += trackedProperty + "." + cachePropertyValue;
    } else {
      storeKeyName += (createdByIfKnown || "") + "." + parentTypeIfKnown + "." + parentIdIfKnown + "." + (parentVersionIfKnown || "");
    }

    const idbNewValue = {
      value: metadata,
    };

    // and try to save it in the database, notice how we setup the expirarion
    // date
    try {
      if (this.polyfilled) {
        POLYFILLED_INDEXED_DB[METADATA_TABLE_NAME][storeKeyName] = idbNewValue;
      } else {
        delete POLYFILLED_INDEXED_DB[METADATA_TABLE_NAME][storeKeyName];
        if (this.badWritesForced) {
          throw new Error("Forced bad writes error");
        }
        if (this.storageFullForced) {
          throw new Error("Forced storage full error");
        }
        await this.db.put(METADATA_TABLE_NAME, idbNewValue, storeKeyName);
      }
    } catch (err) {
      if (options && options.allowFallbackWritesToPolyfill) {
        POLYFILLED_INDEXED_DB[METADATA_TABLE_NAME][storeKeyName] = idbNewValue;
        return true;
      }
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
    options?: {
      allowFallbackWritesToPolyfill?: boolean,
    },
  ): Promise<boolean> {
    checkIdVersionThrowErr(id);
    checkIdVersionThrowErr(version);

    if (this.worker) {
      return this.worker.writeMetadata(queryName, id, version, metadata, options);
    }
    // console.log("REQUESTED TO STORE METADATA FOR", queryName, id, version, metadata);

    await this.waitForSetupPromise;
    await this.waitForBlockPromise;

    // so first we await for our database
    if (!this.db) {
      console.warn("Could not retrieve IndexedDB");
      // what gives, we return
      return false;
    }

    // otherwise we build the index indentifier, which is simple
    const queryIdentifier = `${queryName}.${id}.${(version || "")}`;

    const idbNewValue = {
      value: metadata,
    };

    // and try to save it in the database, notice how we setup the expirarion
    // date
    try {
      if (this.polyfilled) {
        POLYFILLED_INDEXED_DB[METADATA_TABLE_NAME][queryIdentifier] = idbNewValue;
      } else {
        delete POLYFILLED_INDEXED_DB[METADATA_TABLE_NAME][queryIdentifier];
        if (this.badWritesForced) {
          throw new Error("Forced bad writes error");
        }
        if (this.storageFullForced) {
          throw new Error("Forced storage full error");
        }
        await this.db.put(METADATA_TABLE_NAME, idbNewValue, queryIdentifier);
      }
    } catch (err) {
      if (options && options.allowFallbackWritesToPolyfill) {
        POLYFILLED_INDEXED_DB[METADATA_TABLE_NAME][queryIdentifier] = idbNewValue;
        return true;
      }
      console.warn(err);
      return false;
    }

    return true;
  }

  public async readSearchMetadata(
    queryName: string,
    searchArgs: IRQArgs,
    cachePolicy: "by-owner" | "by-parent" | "by-owner-and-parent" | "by-property",
    trackedProperty: string,
    createdByIfKnown: string,
    parentTypeIfKnown: string,
    parentIdIfKnown: string,
    parentVersionIfKnown: string,
  ): Promise<ICacheMetadataMatchType> {
    if (this.worker) {
      return this.worker.readSearchMetadata(
        queryName,
        searchArgs,
        cachePolicy,
        trackedProperty,
        createdByIfKnown,
        parentTypeIfKnown,
        parentIdIfKnown,
        parentVersionIfKnown,
      );
    }
    // console.log(
    //   "REQUESTED TO READ SEARCH METADATA FOR",
    //   queryName, cachePolicy, createdByIfKnown, parentTypeIfKnown, parentIdIfKnown, parentVersionIfKnown);

    await this.waitForSetupPromise;
    await this.waitForBlockPromise;

    // so first we await for our database
    if (!this.db) {
      console.warn("Could not retrieve IndexedDB");
      // what gives, we return
      return null;
    }

    let storeKeyName = queryName + "." + cachePolicy.replace("-", "_") + ".";
    if (cachePolicy === "by-owner") {
      storeKeyName += (createdByIfKnown || "");
    } else if (cachePolicy === "by-parent") {
      storeKeyName += parentTypeIfKnown + "." + parentIdIfKnown + "." + (parentVersionIfKnown || "");
    } else if (cachePolicy === "by-property") {
      const cachePropertyValue = searchArgs["SEARCH_" + trackedProperty] as string;
      if (!cachePropertyValue || typeof cachePropertyValue !== "string") {
        console.warn("Could not find a valid value for SEARCH_" + trackedProperty + " and hence the search cannot be executed");
        return null;
      }
      storeKeyName += trackedProperty + "." + cachePropertyValue;
    } else {
      storeKeyName += (createdByIfKnown || "") + "." + parentTypeIfKnown + "." + parentIdIfKnown + "." + (parentVersionIfKnown || "");
    }

    try {
      if (this.polyfilled) {
        return POLYFILLED_INDEXED_DB[METADATA_TABLE_NAME][storeKeyName] || null;
      } else {
        let value = POLYFILLED_INDEXED_DB[METADATA_TABLE_NAME][storeKeyName];
        if (!value) {
          if (this.badReadsForced) {
            throw new Error("Forced bad read error");
          }
          value = await this.db.get(METADATA_TABLE_NAME, storeKeyName);
        }
        return value;
      }
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
    checkIdVersionThrowErr(id);
    checkIdVersionThrowErr(version);

    if (this.worker) {
      return this.worker.readMetadata(queryName, id, version);
    }
    // console.log("REQUESTED TO READ METADATA FOR", queryName, id, version);

    await this.waitForSetupPromise;
    await this.waitForBlockPromise;

    // so first we await for our database
    if (!this.db) {
      console.warn("Could not retrieve IndexedDB");
      // what gives, we return
      return null;
    }

    // otherwise we build the index indentifier, which is simple
    const queryIdentifier = `${queryName}.${id}.${(version || "")}`;

    try {
      if (this.polyfilled) {
        return POLYFILLED_INDEXED_DB[METADATA_TABLE_NAME][queryIdentifier] || null;
      } else {
        let value = POLYFILLED_INDEXED_DB[METADATA_TABLE_NAME][queryIdentifier];
        if (!value) {
          if (this.badReadsForced) {
            throw new Error("Forced bad read error");
          }
          value = await this.db.get(METADATA_TABLE_NAME, queryIdentifier);
        }
        return value;
      }
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
    type: "by-parent" | "by-owner" | "by-owner-and-parent" | "by-property",
    owner: string,
    parent: [string, string, string],
    property: [string, string],
  ): Promise<boolean> {
    if (this.worker) {
      return this.worker.deleteCachedSearch(queryName, type, owner, parent, property);
    }

    // so we wait for the setup, just in case
    await this.waitForSetupPromise;
    // await this.waitForBlockPromise;

    // if we don't have it
    if (!this.db) {
      // what gives, we return
      console.warn("Could not retrieve IndexedDB");
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
    } else if (type === "by-property") {
      storeKeyName += property[0] + "." + property[1];
    }

    if (!this.polyfilled) {
      try {
        if (this.badWritesForced) {
          throw new Error("Forced bad writes error");
        }
        await this.db.delete(METADATA_TABLE_NAME, storeKeyName);
      } catch (err) {
        console.error("Could not delete " + storeKeyName + " search metadata");
        console.error(err.stack);
      }
    }

    try {
      // get the current value
      let currentValue: ISearchMatchType = POLYFILLED_INDEXED_DB[SEARCHES_TABLE_NAME][storeKeyName] || null;

      if (!currentValue && !this.polyfilled) {
        if (this.badReadsForced) {
          throw new Error("Forced bad read error");
        }
        currentValue = await this.db.get(SEARCHES_TABLE_NAME, storeKeyName);
      }

      if (!currentValue) {
        console.warn("Requested to delete " + storeKeyName + " but no such search is found in IndexedDB");
        return true;
      }

      // useful information
      console.log("Deleting search query for " + storeKeyName);

      if (!currentValue.value || !Array.isArray(currentValue.value)) {
        console.warn("Requested to delete " + storeKeyName + " but it was corrupted");
      } else {
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
      }

      // and now we can delete the search itself
      // if (this.polyfilled) {
      delete POLYFILLED_INDEXED_DB[SEARCHES_TABLE_NAME][storeKeyName];
      if (!this.polyfilled) {
        if (this.badWritesForced) {
          throw new Error("Forced bad writes error");
        }
        await this.db.delete(SEARCHES_TABLE_NAME, storeKeyName);
      }
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
    partialValue: IRQValue,
    partialFields: IRQRequestFields,
    options?: {
      allowFallbackWritesToPolyfill?: boolean,
    },
  ): Promise<boolean> {
    checkIdVersionThrowErr(id);
    checkIdVersionThrowErr(version);

    if (this.worker) {
      return this.worker.mergeCachedValue(queryName, id, version, partialValue, partialFields, options);
    }
    // console.log("REQUESTED TO MERGE", queryName, id, version, partialValue);

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
          options,
          // true,
        );
      }

      return false;
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
        options,
        // true,
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
   * @param requestedFields the requested fields from rq, optional the function
   * will only return if it contains all those requested fields
   */
  public async getCachedValue(
    queryName: string,
    id: string,
    version: string,
    requestedFields?: IRQRequestFields,
  ): Promise<ICacheMatchType> {
    checkIdVersionThrowErr(id);
    checkIdVersionThrowErr(version);

    if (this.worker) {
      return this.worker.getCachedValue(queryName, id, version, requestedFields);
    }

    // if (requestedFields) {
    //   console.log("CACHED QUERY REQUESTED", queryName, id, version, requestedFields);
    // }

    await this.waitForSetupPromise;
    await this.waitForBlockPromise;

    // if we don't have a database no match
    if (!this.db) {
      console.warn("Could not retrieve IndexedDB");
      return null;
    }

    // now we build the identifier
    const queryIdentifier = `${queryName}.${id}.${(version || "")}`;
    try {
      // and we attempt to get the value from the database
      let idbValue: ICacheMatchType = POLYFILLED_INDEXED_DB[QUERIES_TABLE_NAME][queryIdentifier] || null;

      if (!idbValue && !this.polyfilled) {
        if (this.badReadsForced) {
          throw new Error("Forced bad read error");
        }
        idbValue = await this.db.get(QUERIES_TABLE_NAME, queryIdentifier);
      }

      // if we found a value, in this case a null value means
      // no match
      if (idbValue) {
        // let's check what kind of value it is, note this value
        // might be null itself (not found, deleted) elements
        // match like that
        const fields = idbValue.fields;

        if (!requestedFields || requestFieldsAreContained(requestedFields, fields)) {
          // if (requestedFields) {
          //   console.log("RETURNING FROM CACHE", queryName, id, version, requestedFields, idbValue);
          // }

          // we need to resolve potential files
          // to be stored in our cached value as the source
          const type = queryName.replace(PREFIX_GET, "");
          const idef = this.root.registry[type] as ItemDefinition;

          if (idbValue.value) {
            idef.getAllPropertyDefinitionsAndExtensions().forEach((p) => {
              fixFilesURLAt(idbValue.value, idef, null, p);
            });

            idef.getAllIncludes().forEach((i) => {
              i.getSinkingProperties().forEach((sp) => {
                fixFilesURLAt(idbValue.value, idef, i, sp);
              });
            });
          }

          return idbValue;
        }
      }
    } catch (err) {
      console.warn(err);
    }

    // if (requestedFields) {
    //   console.log("NO MATCH", queryName, id, requestedFields);
    // }
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
    trackedProperty: string,
    cachePropertyValue: string,
    newRecords: IRQSearchRecord[],
    createdRecords: IRQSearchRecord[],
    modifiedRecords: IRQSearchRecord[],
    lostRecords: IRQSearchRecord[],
    deletedRecords: IRQSearchRecord[],
    newLastModified: string,
    cachePolicy: "by-owner" | "by-parent" | "by-property" | "by-owner-and-parent",
  ): Promise<boolean> {
    if (this.worker) {
      return this.worker.updateRecordsOnCachedSearch(
        searchQueryName,
        createdByIfKnown,
        parentTypeIfKnown,
        parentIdIfKnown,
        parentVersionIfKnown,
        trackedProperty,
        cachePropertyValue,
        newRecords,
        createdRecords,
        modifiedRecords,
        lostRecords,
        deletedRecords,
        newLastModified,
        cachePolicy,
      );
    }

    await this.waitForSetupPromise;
    await this.waitForBlockPromise;

    // so we fetch our db like usual
    if (!this.db) {
      console.warn("Could not retrieve IndexedDB");
      return false;
    }

    let storeKeyName = searchQueryName + "." + cachePolicy.replace("-", "_") + ".";
    if (cachePolicy === "by-owner") {
      storeKeyName += (createdByIfKnown || "");
    } else if (cachePolicy === "by-parent") {
      storeKeyName += parentTypeIfKnown + "." + parentIdIfKnown + "." + (parentVersionIfKnown || "");
    } else if (cachePolicy === "by-property") {
      storeKeyName += trackedProperty + "." + cachePropertyValue;
    } else {
      storeKeyName += (createdByIfKnown || "") + "." + parentTypeIfKnown + "." + parentIdIfKnown + "." + (parentVersionIfKnown || "");
    }

    try {
      await Promise.all(deletedRecords.map((r) => {
        return this.setCachedValue(
          PREFIX_GET + r.type,
          r.id,
          r.version,
          null,
          null,
          {
            allowFallbackWritesToPolyfill: true,
          }
          // undefined,
        );
      }));
    } catch {

    }

    // So we say that not all results are preloaded so that when the next iteration of the
    // search notices (which should be executed shortly afterwards, then the new records are loaded)
    try {
      let currentValue: ISearchMatchType = POLYFILLED_INDEXED_DB[SEARCHES_TABLE_NAME][storeKeyName] || null;

      if (!currentValue && !this.polyfilled) {
        if (this.badReadsForced) {
          throw new Error("Forced bad read error");
        }
        currentValue = await this.db.get(SEARCHES_TABLE_NAME, storeKeyName);
      }

      if (!currentValue) {
        console.warn("Requested update for " + storeKeyName + " but no such search is found in IndexedDB");
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
        let newCount = currentValue.count - lostRecords.length - deletedRecords.length + newRecords.length + createdRecords.length;
        // weird
        if (newCount < 0) {
          newCount = 0;
        }

        let newValue = currentValue.value.map((r) => {
          const matchingLostRecord = lostRecords.concat(deletedRecords).find((lr) => lr.id === r.id && lr.version === r.version);
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
        const newRecordsFiltered: IRQSearchRecord[] = newRecords.concat(createdRecords).filter((nr) => {
          const recordAlreadyAdded = newValue.find((r) => r.id === nr.id && r.version === nr.version);
          return !recordAlreadyAdded;
        });

        // and now we can concat them
        newValue = newValue.concat(newRecordsFiltered);

        // this list will fill when a row is modified but it was actually reparented
        // so it registers as modified but it is now in our current list of values
        const recordsThatRequestedModificationButArentInTheList: IRQSearchRecord[] = modifiedRecords.filter((mr) => {
          // only not found passes
          return newValue.findIndex((r) => r.id === mr.id && r.version === mr.version) === -1;
        });

        newValue = newValue.concat(recordsThatRequestedModificationButArentInTheList);

        if (this.polyfilled) {
          POLYFILLED_INDEXED_DB[SEARCHES_TABLE_NAME][storeKeyName] = {
            ...currentValue,
            lastModified: newLastModified,
            value: newValue,
            count: newCount,
            allResultsPreloaded: false,
          };
        } else {
          delete POLYFILLED_INDEXED_DB[SEARCHES_TABLE_NAME][storeKeyName];
          if (this.badWritesForced) {
            throw new Error("Forced bad writes error");
          }
          if (this.storageFullForced) {
            throw new Error("Forced storage full error");
          }
          await this.db.put(SEARCHES_TABLE_NAME, {
            ...currentValue,
            lastModified: newLastModified,
            value: newValue,
            count: newCount,
            allResultsPreloaded: false,
          }, storeKeyName);
        }
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
    searchArgs: IRQArgs,
    getListQueryName: string,
    getListTokenArg: string,
    getListLangArg: string,
    getListRequestedFields: IRQRequestFields,
    cachePolicy: "by-owner" | "by-parent" | "by-owner-and-parent" | "by-property",
    cacheNoLimitOffset: boolean,
    trackedProperty: string,
    maxLimit: number,
    maxGetListResultsAtOnce: number,
    returnSources: boolean,
    redoSearch: boolean,
    redoRecords: boolean | IRQSearchRecord[],
    options?: {
      allowFallbackWritesToPolyfill?: boolean,
    }
  ): Promise<ICachedSearchResult> {
    if (this.worker) {
      return this.worker.runCachedSearch(
        searchQueryName,
        searchArgs,
        getListQueryName,
        getListTokenArg,
        getListLangArg,
        getListRequestedFields,
        cachePolicy,
        cacheNoLimitOffset,
        trackedProperty,
        maxLimit,
        maxGetListResultsAtOnce,
        returnSources,
        redoSearch,
        redoRecords,
        options,
      );
    }

    await this.waitForSetupPromise;
    await this.waitForBlockPromise;

    if (!this.db) {
      console.warn("Could not retrieve IndexedDB");
      return null;
    }

    let cachePropertyValue: string = null;
    let storeKeyName = searchQueryName + "." + cachePolicy.replace("-", "_") + ".";
    if (cachePolicy === "by-owner") {
      storeKeyName += searchArgs.created_by;
    } else if (cachePolicy === "by-parent") {
      storeKeyName += searchArgs.parent_type + "." +
        searchArgs.parent_id + "." + (searchArgs.parent_version || "");
    } else if (cachePolicy === "by-property") {
      cachePropertyValue = searchArgs["SEARCH_" + trackedProperty] as string;
      if (!cachePropertyValue || typeof cachePropertyValue !== "string") {
        console.warn("Could not find a valid value for SEARCH_" + trackedProperty + " and hence the search cannot be executed");
        return null;
      }
      storeKeyName += trackedProperty + "." + cachePropertyValue;
    } else {
      storeKeyName += searchArgs.created_by + "." + searchArgs.parent_type + "." +
        searchArgs.parent_id + "." + (searchArgs.parent_version || "");
    }

    let polyfilled = false;

    // first we build an array for the results that we need to process
    // this means results that are not loaded in memory or partially loaded
    // in memory for some reason, say if the last search failed partially
    let resultsToProcess: IRQSearchRecord[];
    let resultsCount: number;
    // this is what the fields end up being, say that there are two different
    // cached searches with different fields, we need both to be merged
    // in order to know what we have retrieved, originally it's just what
    // we were asked for
    let lastModified: string;
    let dataMightBeStale = false;

    try {
      // now we request indexed db for a result
      let dbValue: ISearchMatchType = redoSearch ? null : (
        POLYFILLED_INDEXED_DB[SEARCHES_TABLE_NAME][storeKeyName] || null
      );
      if (!dbValue && !this.polyfilled && !redoSearch) {
        if (this.badReadsForced) {
          throw new Error("Forced bad read error");
        }
        dbValue = await this.db.get(SEARCHES_TABLE_NAME, storeKeyName);
      }

      if (dbValue) {
        if (!dbValue.value || typeof dbValue.count !== "number" || !Array.isArray(dbValue.value)) {
          console.warn("Detected data corruption on " + storeKeyName);
          dbValue = null;
        }
      }

      // if the database is not offering anything or the limit is less than
      // it is supposed to be, this means that we have grown the cache size, but yet
      // the cache remains constrained by the older size
      if (!dbValue) {
        // we need to remove the specifics of the search
        // as we are caching everything to the given criteria
        // and then using client side to filter
        const actualArgsToUseInRQSearch: IRQArgs = {
          token: searchArgs.token,
          language: searchArgs.language,
          order_by: {
            created_at: {
              nulls: "LAST",
              direction: "DESC",
              priority: 0,
            },
          },
          limit: maxLimit,
          offset: 0,
        };

        if (cachePolicy === "by-owner" || cachePolicy === "by-owner-and-parent") {
          actualArgsToUseInRQSearch.created_by = searchArgs.created_by;
        }

        if (cachePolicy === "by-parent" || cachePolicy === "by-owner-and-parent") {
          actualArgsToUseInRQSearch.parent_type = searchArgs.parent_type;
          actualArgsToUseInRQSearch.parent_id = searchArgs.parent_id;
          actualArgsToUseInRQSearch.parent_version = searchArgs.parent_version;
        }

        if (cachePolicy === "by-property") {
          actualArgsToUseInRQSearch["SEARCH_" + trackedProperty] = cachePropertyValue;
        }

        // we request the server for this, in this case
        // it might not have been able to connect
        const query = buildRQQuery(this.root.getRQSchema(), {
          name: searchQueryName,
          args: actualArgsToUseInRQSearch,
          fields: {
            records: {
              id: {},
              version: {},
              type: {},
              last_modified: {},
            },
            last_modified: {},
            oldest_created_at: {},
            limit: {},
            offset: {},
            count: {},
          },
        });

        // so we get the server value
        const firstServerValue = await rqQuery(query);

        // if we get an error from the server, return the
        // server value and let it be handled
        if (firstServerValue.errors) {
          // return it
          return {
            rqValue: firstServerValue,
            dataMightBeStale: false,
            lastModified: null,
            sourceRecords: null,
            sourceResults: null,
            polyfilled,
          };
        }

        // now these are the results that we need to process
        // from the search query, the IRQSearchRecord that we
        // need to process
        resultsToProcess = firstServerValue.data[searchQueryName].records as IRQSearchRecord[];
        lastModified = firstServerValue.data[searchQueryName].last_modified as string;
        let lastModifiedNano = !lastModified ? null : new NanoSecondComposedDate(lastModified);
        resultsCount = firstServerValue.data[searchQueryName].count as number;

        let oldestCreatedAt = firstServerValue.data[searchQueryName].oldest_created_at as string;

        // there are still more results to process and we need more batches
        while (resultsCount > resultsToProcess.length) {
          // now let's try to get these batches
          actualArgsToUseInRQSearch.until = oldestCreatedAt;
          const query = buildRQQuery(this.root.getRQSchema(), {
            name: searchQueryName,
            args: actualArgsToUseInRQSearch,
            fields: {
              records: {
                id: {},
                version: {},
                type: {},
                last_modified: {},
              },
              last_modified: {},
              oldest_created_at: {},
              limit: {},
              offset: {},
            },
          });

          const serverValueOfBatch = await rqQuery(query);

          if (serverValueOfBatch.errors) {
            // return it
            return {
              rqValue: serverValueOfBatch,
              dataMightBeStale: false,
              lastModified: null,
              sourceRecords: null,
              sourceResults: null,
              polyfilled,
            };
          }

          const resultsToProcessOfBatch = firstServerValue.data[searchQueryName].records as IRQSearchRecord[];
          const lastModifiedOfBatch = firstServerValue.data[searchQueryName].last_modified as string;
          const lastModifiedOfBatchNano = lastModifiedOfBatch ? new NanoSecondComposedDate(lastModifiedOfBatch) : null;

          resultsToProcess = resultsToProcess.concat(resultsToProcessOfBatch);
          if (lastModifiedOfBatchNano && (!lastModifiedNano || lastModifiedNano.lessThan(lastModifiedOfBatchNano))) {
            lastModified = lastModifiedOfBatch;
            lastModifiedNano = lastModifiedOfBatchNano;
          }
        }

        // now we have loaded all the results that we were expecting and our data should not really be stale
      } else {
        // otherwise our results to process are the same ones we got
        // from the database, but do we need to process them for real?
        // it depends
        resultsToProcess = dbValue.value;
        lastModified = dbValue.lastModified;
        dataMightBeStale = true;
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
            const searchResponse = await search(this.root, this.db, resultsToProcess, searchArgs, returnSources, cacheNoLimitOffset);
            const records = searchResponse.filteredRecords;
            const results = searchResponse.filteredResults;
            const sourceResults = searchResponse.sourceResults;
            const rqValue: IRQEndpointValue = {
              data: {
                [searchQueryName]: {
                  records,
                  results,
                  last_modified: lastModified,
                  limit: searchArgs.limit as number,
                  offset: searchArgs.offset as number,
                  count: searchResponse.count,
                },
              },
            };

            return {
              rqValue,
              dataMightBeStale,
              lastModified,
              sourceRecords: resultsToProcess,
              sourceResults,
              polyfilled,
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
      console.error(err.stack);

      // yet some other errors might come here
      // we return an unspecified error if we hit an error
      const rqValue: IRQEndpointValue = {
        data: null,
        errors: [
          {
            error: {
              code: ENDPOINT_ERRORS.UNSPECIFIED,
              message: "Unspecified error in worker",
            },
          },
        ],
      };

      return {
        rqValue,
        dataMightBeStale,
        lastModified,
        sourceRecords: null,
        sourceResults: null,
        polyfilled,
      };
    }

    // IT goes here if, not all results were preloaded or
    // there was nothing stored at all

    // now we set what we have just gotten from the server (or the database)
    // and assign the value (maybe again) with the results, the fields we are supposed
    // to have contained within all the fetched batches at the end and say
    // false to preloaded because we haven't preloaded anything
    if (this.polyfilled) {
      POLYFILLED_INDEXED_DB[SEARCHES_TABLE_NAME][storeKeyName] = {
        value: resultsToProcess,
        fields: getListRequestedFields,
        allResultsPreloaded: false,
        lastModified,
        count: resultsCount,
      };
      polyfilled = true;
    } else {
      try {
        delete POLYFILLED_INDEXED_DB[SEARCHES_TABLE_NAME][storeKeyName];
        if (this.badWritesForced) {
          throw new Error("Forced bad writes error");
        }
        if (this.storageFullForced) {
          throw new Error("Forced storage full error");
        }
        await this.db.put(SEARCHES_TABLE_NAME, {
          value: resultsToProcess,
          fields: getListRequestedFields,
          allResultsPreloaded: false,
          lastModified,
          count: resultsCount,
        }, storeKeyName);
      } catch (err) {
        console.error(err);
        if (options && options.allowFallbackWritesToPolyfill) {
          POLYFILLED_INDEXED_DB[SEARCHES_TABLE_NAME][storeKeyName] = {
            value: resultsToProcess,
            fields: getListRequestedFields,
            allResultsPreloaded: false,
            lastModified,
            count: resultsCount,
          };
          polyfilled = true;
        } else {
          const rqValue: IRQEndpointValue = {
            data: null,
            errors: [
              {
                error: {
                  code: ENDPOINT_ERRORS.UNSPECIFIED,
                  message: "Error at the cache worker level, you may want to allowFallbackWritesToPolyfill",
                },
              },
            ],
          };
          return {
            rqValue,
            dataMightBeStale,
            lastModified,
            sourceRecords: null,
            sourceResults: null,
            polyfilled: false,
          };
        }
      }
    }

    // now we first got to extract what is has actually been loaded from those
    // results to process and actually has managed to make it to the database
    // this can happens when something fails in between, or it is loaded by another
    // part of the application
    const uncachedOrOutdatedResultsToProcess: IRQSearchRecord[] = [];
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
    const batches: IRQSearchRecord[][] = [[]];
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

    // now we need to load all those batches into rq queries
    let processedBatches: Array<{ rqValue: IRQEndpointValue, batch: IRQSearchRecord[] }>;
    try {
      processedBatches = await Promise.all(batches.map(async (batch) => {
        // makes no sense sending a request with nothing to fetch
        if (batch.length === 0) {
          return {
            rqValue: {
              data: {
                [getListQueryName]: {
                  results: [],
                }
              },
            },
            batch,
          }
        }

        const args: IRQArgs = {
          token: getListTokenArg,
          language: getListLangArg,
          records: batch,
        };
        if (searchArgs.created_by) {
          args.created_by = searchArgs.created_by;
        }
        // we build the query, using the get list functionality
        const listQuery = buildRQQuery(this.root.getRQSchema(), {
          name: getListQueryName,
          args,
          fields: {
            results: getListRequestedFields,
          },
        });
        // and execute it
        const rqValue = await rqQuery(
          listQuery,
          // let's not do that, this thing batches
          // because requests are big
          // {
          //   // should allow to merge all the
          //   // current batches into one request
          //   merge: true,
          //   mergeMS: 10,
          // }
        );

        // return the value, whatever it is, null, error, etc..
        return { rqValue, batch };
      }));
    } catch (err) {
      console.error(err);

      const rqValue: IRQEndpointValue = {
        data: null,
        errors: [
          {
            error: {
              code: ENDPOINT_ERRORS.UNSPECIFIED,
              message: "Error at the cache worker level, fetch has failed",
            },
          },
        ],
      };
      return {
        rqValue,
        dataMightBeStale,
        lastModified,
        sourceRecords: null,
        sourceResults: null,
        polyfilled: false,
      };
    }

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
      const resultingValue = processedBatch.rqValue;
      // the resulting value is what rq gave us
      if (resultingValue.errors) {
        // if there's an error, we use that error as the error
        somethingFailed = true;
        error = resultingValue.errors[0].error;
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
          (resultingValue.data[getListQueryName].results as IRQValue[]).map(async (value, index) => {
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
                null,
                options,
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
                options,
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
      let actualCurrentSearchValue: ISearchMatchType = POLYFILLED_INDEXED_DB[SEARCHES_TABLE_NAME][storeKeyName] || null;

      if (!actualCurrentSearchValue && !this.polyfilled) {
        if (this.badReadsForced) {
          throw new Error("Forced bad read error");
        }
        actualCurrentSearchValue = await this.db.get(SEARCHES_TABLE_NAME, storeKeyName);
      }

      if (this.polyfilled) {
        POLYFILLED_INDEXED_DB[SEARCHES_TABLE_NAME][storeKeyName] = {
          ...actualCurrentSearchValue,
          allResultsPreloaded: true,
        };
        polyfilled = true;
      } else {
        try {
          delete POLYFILLED_INDEXED_DB[SEARCHES_TABLE_NAME][storeKeyName];
          if (this.badWritesForced) {
            throw new Error("Forced bad writes error");
          }
          if (this.storageFullForced) {
            throw new Error("Forced storage full error");
          }
          await this.db.put(SEARCHES_TABLE_NAME, {
            ...actualCurrentSearchValue,
            allResultsPreloaded: true,
          }, storeKeyName);
        } catch (err) {
          if (options && options.allowFallbackWritesToPolyfill) {
            POLYFILLED_INDEXED_DB[SEARCHES_TABLE_NAME][storeKeyName] = {
              ...actualCurrentSearchValue,
              allResultsPreloaded: true,
            };
            polyfilled = true;
          } else {
            console.error(err);

            const rqValue: IRQEndpointValue = {
              data: null,
              errors: [
                {
                  error: {
                    code: ENDPOINT_ERRORS.UNSPECIFIED,
                    message: "Error at the cache worker level, storing the new all results preloaded state failed",
                  },
                },
              ],
            };
            return {
              rqValue,
              dataMightBeStale,
              lastModified,
              sourceRecords: null,
              sourceResults: null,
              polyfilled: false,
            };
          }
        }
      }

      // Now we need to filter the search results in order to return what is
      // appropiate using the actualCurrentSearchValue
      const searchResponse = await search(this.root, this.db, actualCurrentSearchValue.value, searchArgs, returnSources, cacheNoLimitOffset);
      const results = searchResponse.filteredResults;
      const records = searchResponse.filteredRecords;
      const sourceResults = searchResponse.sourceResults;
      const rqValue: IRQEndpointValue = {
        data: {
          [searchQueryName]: {
            last_modified: lastModified,
            records,
            results,
            limit: searchArgs.limit as number,
            offset: searchArgs.offset as number,
            count: searchResponse.count,
          },
        },
      };

      return {
        rqValue,
        dataMightBeStale,
        lastModified,
        sourceResults,
        sourceRecords: actualCurrentSearchValue.value,
        polyfilled,
      };
    } else if (error) {
      // if we managed to catch an error, we pretend
      // to be rq
      const rqValue: IRQEndpointValue = {
        data: null,
        errors: [
          {
            error: error,
          },
        ],
      };
      return {
        rqValue,
        dataMightBeStale,
        lastModified,
        sourceRecords: null,
        sourceResults: null,
        polyfilled: false,
      };
    } else {
      console.error("Unknown error in worker");
      // otherwise it must have been some sort
      // of connection failure (or database error)
      // we return an unspecified error if we hit an error
      // actually it seems impossible to get to this state
      const rqValue: IRQEndpointValue = {
        data: null,
        errors: [
          {
            error: {
              code: ENDPOINT_ERRORS.UNSPECIFIED,
              message: "Unspecified error in worker",
            },
          },
        ],
      };

      return {
        rqValue,
        dataMightBeStale,
        lastModified,
        sourceRecords: null,
        sourceResults: null,
        polyfilled: false,
      };
    }
  }

  public async proxyRoot(rootProxy: IRootRawJSONDataType, config: IConfigRawJSONDataType): Promise<void> {
    if (this.worker) {
      return this.worker.proxyRoot(rootProxy, config);
    }

    this.root = new Root(rootProxy);
    this.config = config;
  }

  public async setBlockedCallback(callback: (state: boolean) => void): Promise<void> {
    if (this.worker) {
      return this.worker.setBlockedCallback(callback);
    }

    this.blockedCallback = callback;
    if (this.isCurrentlyBlocked) {
      callback(this.isCurrentlyBlocked);
    }
  }

  public async startInitializationBlock(): Promise<void> {
    if (this.worker) {
      return this.worker.startInitializationBlock();
    }
    this.waitForBlockPromise = new Promise((r) => {
      this.waitForBlockPromiseResolve = r;
    });
  }

  public async endInitializationBlock(): Promise<void> {
    if (this.worker) {
      return this.worker.endInitializationBlock();
    }
    this.waitForBlockPromiseResolve();
  }

  public async waitForInitializationBlock(): Promise<void> {
    if (this.worker) {
      return this.worker.waitForInitializationBlock();
    }

    await this.waitForBlockPromise;
    return;
  }
}
