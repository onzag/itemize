import "core-js/stable";
import "regenerator-runtime/runtime";

import { expose } from "comlink";
import { openDB, DBSchema, IDBPDatabase } from "idb";
import { requestFieldsAreContained, deepMerge } from "../../../../gql-util";
import { IGQLSearchRecord, buildGqlQuery, gqlQuery, GQLEnum,
  IGQLValue, IGQLRequestFields, IGQLArgs, IGQLEndpointValue } from "../../../../gql-querier";
import { PREFIX_GET, ENDPOINT_ERRORS } from "../../../../constants";
import { EndpointErrorType } from "../../../../base/errors";
import { search } from "./cache.worker.search";
import Root, { IRootRawJSONDataType } from "../../../../base/Root";

// a cache match
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

// Name of the cache in the indexed db database
export const CACHE_NAME = "ITEMIZE_CACHE";
// Name of the table
export const QUERIES_TABLE_NAME = "queries";
export const SEARCHES_TABLE_NAME = "searches";

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

  private waitForSetupPromise: Promise<void>;
  private waitForSetupPromiseResolve: () => void;
  private resolved: boolean = false;

  public constructor() {
    this.waitForSetupPromise = new Promise((resolve) => {
      this.waitForSetupPromiseResolve = () => {
        if (!this.resolved) {
          this.resolved = true;
          resolve();
        }
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
            } catch (err) {
              // No way to know if the store is there
              // so must catch the error
            }
            db.createObjectStore(QUERIES_TABLE_NAME);
            db.createObjectStore(SEARCHES_TABLE_NAME);
          } catch (err) {
            console.warn(err);
          }
          this.isCurrentlyBlocked = false;
          if (this.blockedCallback) {
            this.blockedCallback(false);
          }

          this.waitForSetupPromiseResolve();
        },
        blocked: () => {
          console.log("BLOCKED");
          this.isCurrentlyBlocked = true;
          if (this.blockedCallback) {
            this.blockedCallback(true);
          }
        },
        terminated: () => {
          console.log("TERMINATED");
          this.db = null;
        }
      });

      this.db = await dbPromise;

      // due to a bug in the indexed db implementation
      // sometimes the blocked event just doesn't get called
      // this forces me to somehow botch a blocked event
      // in order to be able to display the proper notification
      // because, well, bugs... not a single event will be called
      // so this is the only possible recourse
      (async () => {
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

        this.waitForSetupPromiseResolve();
      })();
    } catch (err) {
      console.log(err);
      dbPromise = null;
      this.waitForSetupPromiseResolve();
    }

    console.log("CACHE SETUP", version);
  }

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
  public async setCachedValueAsNullAndUpdateSearches(
    id: number,
    version: string,
    type: string,
    queryName: string,
    searchQueryNameModule?: string,
    searchQueryNameItemDefinition?: string,
  ) {
    await this.waitForSetupPromise;

    const succeed = await this.setCachedValue(
      queryName,
      id,
      version,
      null,
      null,
    );
    if (!succeed) {
      return false;
    }

    // so first we await for our database
    if (!this.db) {
      return succeed;
    }

    try {
      const allKeys = await this.db.getAllKeys(SEARCHES_TABLE_NAME);
      await Promise.all(allKeys.map(async (key) => {
        try {
          const splitted = key.split(".");
          if (
            !searchQueryNameModule ||
            !searchQueryNameItemDefinition ||
            splitted[0] === searchQueryNameModule ||
            splitted[0] === searchQueryNameItemDefinition
          ) {
            const currentValue: ISearchMatchType = await this.db.get(SEARCHES_TABLE_NAME, key);
            const foundIndex = currentValue.value.findIndex((v) => v.id === id && v.type === type);
            if (foundIndex !== -1) {
              currentValue.value.splice(foundIndex, 1);
              await this.db.put(SEARCHES_TABLE_NAME, currentValue, key);
            }
          }
        } catch (err) {
          console.warn(err);
        }
      }));
    } catch (err) {
      console.warn(err);
    }

    // we consider it sucesful even if they
    // failed to update
    return succeed;
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
   * @param touchOrMerge optional, whether this is because of a touch of merge reqeust
   *                     doesn't do anything in practique, just for logging
   */
  public async setCachedValue(
    queryName: string,
    id: number,
    version: string,
    partialValue: IGQLValue,
    partialFields: IGQLRequestFields,
    touchOrMerge?: boolean,
  ): Promise<boolean> {
    if (!touchOrMerge) {
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

  public async deleteCachedValue(
    queryName: string,
    id: number,
    version: string,
  ): Promise<boolean> {
    console.log("REQUESTED TO DELETE", queryName, id, version);

    await this.waitForSetupPromise;

    // if we don't have it
    if (!this.db) {
      // what gives, we return
      return false;
    }

    const queryIdentifier = `${queryName}.${id}.${(version || "")}`;

    try {
      await this.db.delete(QUERIES_TABLE_NAME, queryIdentifier);
    } catch (err) {
      console.warn(err);
      return false;
    }

    return true;
  }

  public async mergeCachedValue(
    queryName: string,
    id: number,
    version: string,
    partialValue: IGQLValue,
    partialFields: IGQLRequestFields,
  ): Promise<boolean> {
    console.log("REQUESTED TO MERGE", queryName, id, version, partialValue);

    const currentValue = await this.getCachedValue(queryName, id, version);
    if (
      !currentValue ||
      !currentValue.value ||
      partialValue.last_modified !== currentValue.value.last_modified
    ) {
      return await this.setCachedValue(
        queryName,
        id,
        version,
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
   * @param requestedFields the requested fields from graphql
   */
  public async getCachedValue(
    queryName: string,
    id: number,
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

        if (!requestedFields || requestFieldsAreContained(requestedFields, fields)) {
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

  public async addRecordsToCachedSearch(
    searchQueryName: string,
    createdByIfKnown: number,
    parentTypeIfKnown: string,
    parentIdIfKnown: number,
    parentVersionIfKnown: string,
    newRecords: IGQLSearchRecord[],
    newLastRecordDate: string,
    cachePolicy: "by-owner" | "by-parent",
  ): Promise<boolean> {
    await this.waitForSetupPromise;
  
    // so we fetch our db like usual
    if (!this.db) {
      return false;
    }

    let storeKeyName = searchQueryName + "." + cachePolicy.replace("-", "_") + ".";
    if (cachePolicy === "by-owner") {
      storeKeyName += createdByIfKnown;
    } else {
      storeKeyName += parentTypeIfKnown + "." + parentIdIfKnown + "." + JSON.stringify(parentVersionIfKnown);
    }

    // So we say that not all results are preloaded so that when the next iteration of the
    // search notices (which should be executed shortly afterwards, then the new records are loaded)
    try {
      const currentValue: ISearchMatchType = await this.db.get(SEARCHES_TABLE_NAME, storeKeyName);
      await this.db.put(SEARCHES_TABLE_NAME, {
        ...currentValue,
        lastRecordDate: newLastRecordDate,
        value: currentValue.value.concat(newRecords),
        allResultsPreloaded: false,
      }, storeKeyName);
    } catch {
      return false;
    }

    return true;
  }

  public async runCachedSearch(
    searchQueryName: string,
    searchArgs: IGQLArgs,
    getListQueryName: string,
    getListTokenArgs: string,
    getListLangArgs: string,
    getListRequestedFields: IGQLRequestFields,
    cachePolicy: "by-owner" | "by-parent",
    maxGetListResultsAtOnce: number,
  ): Promise<ICachedSearchResult> {
    await this.waitForSetupPromise;

    if (!this.db) {
      return null;
    }

    let storeKeyName = searchQueryName + "." + cachePolicy.replace("-", "_") + ".";
    if (cachePolicy === "by-owner") {
      storeKeyName += searchArgs.created_by;
    } else {
      storeKeyName += searchArgs.parent_type + "." +
        searchArgs.parent_id + "." + (searchArgs.parent_version || "");
    }

    // first we build an array for the results that we need to process
    // this means results that are not loaded in memory or partially loaded
    // in memory for some reason, say if the last search failed partially
    let resultsToProcess: IGQLSearchRecord[];
    // this is what the fields end up being, say that there are two different
    // cached searches with different fields, we need both to be merged
    // in order to know what we have retrieved, originally it's just what
    // we were asked for
    let lastRecordDate: string;
    let dataMightBeStale = false;
    let limitToSetInDb: number;

    try {
      // now we request indexed db for a result
      const dbValue: ISearchMatchType = await this.db.get(SEARCHES_TABLE_NAME, storeKeyName);
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
        if (cachePolicy === "by-owner") {
          actualArgsToUseInGQLSearch.created_by = searchArgs.created_by;
        } else {
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
              created_at: {},
            },
            last_record_date: {},
            limit: {},
            offset: {},
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
            lastRecordDate: null,
          };
        }

        // now these are the results that we need to process
        // from the search query, the IGQLSearchRecord that we
        // need to process
        resultsToProcess = serverValue.data[searchQueryName].records as IGQLSearchRecord[];
        lastRecordDate = serverValue.data[searchQueryName].last_record_date as string;
        limitToSetInDb = searchArgs.limit as number;
      } else {
        // otherwise our results to process are the same ones we got
        // from the database, but do we need to process them for real?
        // it depends
        resultsToProcess = dbValue.value;
        lastRecordDate = dbValue.lastRecordDate;
        dataMightBeStale = true;
        limitToSetInDb = dbValue.limit;

        // if the fields are contained within what the database has loaded
        // and if all the results were preloaded then they don't need to be
        // preloaded
        if (
          requestFieldsAreContained(getListRequestedFields, dbValue.fields) &&
          dbValue.allResultsPreloaded
        ) {
          // now we can actually start using the args to run a local filtering
          // function

          try {
            const records = await search(this.rootProxy, this.db, resultsToProcess, searchArgs);
            const gqlValue: IGQLEndpointValue = {
              data: {
                [searchQueryName]: {
                  records,
                  last_record_date: lastRecordDate,
                  // we return the true limit, because records might grow over the limit
                  limit: (records.length < searchArgs.limit ? searchArgs.limit : records.length) as number,
                  offset: 0,
                },
              },
            };

            return {
              gqlValue,
              dataMightBeStale,
              lastRecordDate,
            };
          } catch (err) {
            // It comes here if it finds data corruption during the search and it should
            // be handled accordingly by the refetcher
            // note how we are suppressing this one error
          }
        }
      }
    } catch (err) {
      // yet some other errors might come here
      console.error(err);
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
        lastRecordDate,
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
      lastRecordDate,
      limit: limitToSetInDb,
    }, storeKeyName);

    // now we first got to extract what is has actually been loaded from those
    // results to process and actually has managed to make it to the database
    // this can happens when something fails in between, or it is loaded by another
    // part of the application
    const uncachedResultsToProcess: IGQLSearchRecord[] = [];
    // so now we check all the results we are asked to process
    await Promise.all(resultsToProcess.map(async (resultToProcess) => {
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
        uncachedResultsToProcess.push(resultToProcess);
      }
    }));

    // now it's time to preload, there's a limit on how big the batches can be on the server side
    // so we have to limit our batches size
    const batches: IGQLSearchRecord[][] = [[]];
    let lastBatchIndex = 0;
    // for that we run a each event in all our uncached results
    uncachedResultsToProcess.forEach((uncachedResultToProcess) => {
      // and when we hit the limit, we build a new batch
      if (batches[lastBatchIndex].length === maxGetListResultsAtOnce) {
        batches.push([]);
        lastBatchIndex++;
      }

      // add this to the batch
      batches[lastBatchIndex].push(uncachedResultToProcess);
    });

    // now we need to load all those batches into graphql queries
    const processedBatches = await Promise.all(batches.map(async (batch) => {
      const args: IGQLArgs = {
        token: getListTokenArgs,
        language: getListLangArgs,
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
      return {gqlValue, batch};
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
            // later when executed the item is gone, then we mark it as deleted
            // note that this will have an effect on the query itself of our
            // current search as deleting values (setting them to null) causes them
            // to be dropped off searchs where they might have been, this will have
            // the side effect of updating our search values, yes we use the
            // inefficient search without the optionals, this is unlikely anyway
            suceedStoring = await this.setCachedValueAsNullAndUpdateSearches(
              originalBatchRequest.id,
              originalBatchRequest.type,
              originalBatchRequest.version,
              PREFIX_GET + originalBatchRequest.type,
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
      // everything! null results that somehow appeared deleted
      // were automatically deleted by the setCachedValue function
      // using null, this is why we must reread our fields as some
      // records might have been removed from the databse itself
      // during our process of fetching, this can happen
      // with incompleted searches where results were partial, and then
      // some were deleted, eg we get, 1,2,3,4,5 but then only manage to fetch
      // 1,2,3 because our connection dropped, then using another device the
      // user deletes 5, then comes back to this device when it's loading
      // this loader will notice 5 is gone and cache its value as null, which
      // will in turn go to the 1,2,3,4,5 results and remove the 5 key from the list
      // so using resultsToProcess variable could be wrong as that would contain
      // 1,2,3,4,5
      const actualCurrentSearchValue: ISearchMatchType = await this.db.get(SEARCHES_TABLE_NAME, storeKeyName);
      await this.db.put(SEARCHES_TABLE_NAME, {
        ...actualCurrentSearchValue,
        allResultsPreloaded: true,
      }, storeKeyName);

      // Now we need to filter the search results in order to return what is
      // appropiate using the actualCurrentSearchValue

      const gqlValue: IGQLEndpointValue = {
        data: {
          [searchQueryName]: {
            records: await search(this.rootProxy, this.db, actualCurrentSearchValue.value, searchArgs),
          },
        },
      };

      return {
        gqlValue,
        dataMightBeStale,
        lastRecordDate,
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
        lastRecordDate,
      };
    } else {
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
        lastRecordDate,
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
