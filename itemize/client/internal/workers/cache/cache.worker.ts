import "core-js/stable";
import "regenerator-runtime/runtime";

import { expose } from "comlink";
import { openDB, DBSchema, IDBPDatabase } from "idb";
import { requestFieldsAreContained, deepMerge } from "../../../../gql-util";
import { ISearchResult, buildGqlQuery, gqlQuery, GQLEnum } from "../../../../gql-querier";
import { MAX_SEARCH_RESULTS_AT_ONCE_LIMIT, PREFIX_GET } from "../../../../constants";
import { GraphQLEndpointErrorType } from "../../../../base/errors";
import { search } from "./cache.worker.search";
import Root, { IRootRawJSONDataType } from "../../../../base/Root";

export interface ICacheMatchType {
  value: any;
  fields: any;
}

export interface ISearchMatchType {
  fields: any;
  value: ISearchResult[];
  allResultsPreloaded: boolean;
  lastRecord: number;
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
   * The comlink proxied root class
   */
  private rootProxy: Root;

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
      },
    });

    console.log("CACHE SETUP", version);
  }

  /**
   * Sets the cached value as null and updates all the searches
   * that contained that value to have it sliced from it
   * @param id the id of the item definition
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
    type: string,
    queryName: string,
    searchQueryNameModule?: string,
    searchQueryNameItemDefinition?: string,
  ) {
    const succeed = await this.setCachedValue(
      queryName,
      id,
      null,
      null,
    );
    if (!succeed) {
      return false;
    }

    // so first we await for our database
    const db = await this.dbPromise;
    // if we don't have it
    if (!db) {
      return succeed;
    }

    try {
      const allKeys = await db.getAllKeys(SEARCHES_TABLE_NAME);
      await Promise.all(allKeys.map(async (key) => {
        try {
          const splitted = key.split(".");
          if (
            !searchQueryNameModule ||
            !searchQueryNameItemDefinition ||
            splitted[0] === searchQueryNameModule ||
            splitted[0] === searchQueryNameItemDefinition
          ) {
            const currentValue: ISearchMatchType = await db.get(SEARCHES_TABLE_NAME, key);
            const foundIndex = currentValue.value.findIndex((v) => v.id === id && v.type === type);
            if (foundIndex !== -1) {
              currentValue.value.splice(foundIndex, 1);
              await db.put(SEARCHES_TABLE_NAME, currentValue, key);
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
  ): Promise<boolean> {
    if (!touchOrMerge) {
      console.log("REQUESTED TO STORE", queryName, id, partialValue);
    }

    // so first we await for our database
    const db = await this.dbPromise;
    // if we don't have it
    if (!db) {
      // what gives, we return
      return false;
    }

    // otherwise we build the index indentifier, which is simple
    const queryIdentifier = `${queryName}.${id}`;

    // and try to save it in the database, notice how we setup the expirarion
    // date
    try {
      const idbNewValue = {
        value: partialValue,
        fields: partialFields,
      };
      await db.put(QUERIES_TABLE_NAME, idbNewValue, queryIdentifier);
    } catch (err) {
      console.warn(err);
      return false;
    }

    return true;
  }

  // TODO we need a better method, let's use local storage or some form of solution
  // whatever can it be to store all the item definitions that are session loaded
  // as well as searches, using the item-definition.tsx flag as some sort of
  // cacheSecurityPolicy where you can say "by-session" or "none" once the user
  // gets logged out all the info in the cacheSecurityPolicy gets removed right
  // now cached data gets cached forever and this function only calls for when the user
  // is gone, let's leverage this for searches as well
  public async deleteCachedValue(
    queryName: string,
    id: number,
  ): Promise<boolean> {
    console.log("REQUESTED TO DELETE", queryName, id);

    // so first we await for our database
    const db = await this.dbPromise;
    // if we don't have it
    if (!db) {
      // what gives, we return
      return false;
    }

    const queryIdentifier = `${queryName}.${id}`;

    try {
      await db.delete(QUERIES_TABLE_NAME, queryIdentifier);
    } catch (err) {
      console.warn(err);
      return false;
    }

    return true;
  }

  public async mergeCachedValue(
    queryName: string,
    id: number,
    partialValue: any,
    partialFields: any,
  ): Promise<boolean> {
    console.log("REQUESTED TO MERGE", queryName, id, partialValue);

    const currentValue = await this.getCachedValue(queryName, id);
    if (
      !currentValue ||
      !currentValue.value ||
      partialValue.last_modified !== currentValue.value.last_modified
    ) {
      return await this.setCachedValue(
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
      return await this.setCachedValue(
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
    let db: IDBPDatabase<ICacheDB>;
    try {
      db = await this.dbPromise;
    } catch (err) {
      console.warn(err);
    }

    // if we don't have a database no match
    if (!db) {
      return null;
    }

    // now we build the identifier
    const queryIdentifier = `${queryName}.${id}`;
    try {
      // and we attempt to get the value from the database
      const idbValue: ICacheMatchType = await db.get(QUERIES_TABLE_NAME, queryIdentifier);
      // if we found a value, in this case a null value means
      // no match
      if (idbValue) {
        // let's check what kind of value it is, note this value
        // might be null itself (not found, deleted) elements
        // match like that
        const fields = idbValue.fields;

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

  public async addRecordsToCachedSearch(
    searchQueryName: string,
    ownerOrParentId: string,
    newIds: ISearchResult[],
    newLastRecord: number,
    cachePolicy: "by-owner" | "by-parent",
  ): Promise<boolean> {
    // so we fetch our db like usual
    let db: IDBPDatabase<ICacheDB>;
    try {
      db = await this.dbPromise;
    } catch (err) {
      console.warn(err);
    }

    if (!db) {
      return false;
    }

    let storeKeyName = searchQueryName + "." + cachePolicy.replace("-", "_") + ".";
    if (cachePolicy === "by-owner") {
      storeKeyName += ownerOrParentId;
    } else {
      // TODO
    }

    // So we say that not all results are preloaded so that when the next iteration of the
    // search notices (which should be executed shortly afterwards, then the new records are loaded)
    try {
      const currentValue: ISearchMatchType = await db.get(SEARCHES_TABLE_NAME, storeKeyName);
      await db.put(SEARCHES_TABLE_NAME, {
        ...currentValue,
        lastRecord: newLastRecord,
        value: currentValue.value.concat(newIds),
        allResultsPreloaded: false,
      }, storeKeyName);
    } catch {
      return false;
    }

    return true;
  }

  public async runCachedSearch(
    searchQueryName: string,
    searchArgs: any,
    getListQueryName: string,
    getListTokenArgs: string,
    getListLangArgs: string,
    getListRequestedFields: any,
    cachePolicy: "by-owner" | "by-parent",
  ) {
    // so we fetch our db like usual
    let db: IDBPDatabase<ICacheDB>;
    try {
      db = await this.dbPromise;
    } catch (err) {
      console.warn(err);
    }

    if (!db) {
      return null;
    }

    let storeKeyName = searchQueryName + "." + cachePolicy.replace("-", "_") + ".";
    if (cachePolicy === "by-owner") {
      storeKeyName += searchArgs.created_by;
    } else {
      // TODO
    }

    // first we build an array for the results that we need to process
    // this means results that are not loaded in memory or partially loaded
    // in memory for some reason, say if the last search failed partially
    let resultsToProcess: ISearchResult[];
    // this is what the fields end up being, say that there are two different
    // cached searches with different fields, we need both to be merged
    // in order to know what we have retrieved, originally it's just what
    // we were asked for
    let resultingGetListRequestedFields: any = getListRequestedFields;
    let lastRecord: number;
    let dataMightBeStale = false;

    try {
      // now we request indexed db for a result
      const dbValue: ISearchMatchType = await db.get(SEARCHES_TABLE_NAME, storeKeyName);
      // if the database is not offering anything
      if (!dbValue) {
        // we need to remove the specifics of the search
        // as we are caching everything to the given criteria
        // and then using client side to filter
        const actualArgsToUseInGQLSearch: any = {
          token: searchArgs.token,
          language: searchArgs.language,
          order_by: new GQLEnum("DEFAULT"),
        };
        if (cachePolicy === "by-owner") {
          actualArgsToUseInGQLSearch.created_by = searchArgs.created_by;
        } else {
          // TODO
        }

        // we request the server for this, in this case
        // it might not have been able to connect
        const query = buildGqlQuery({
          name: searchQueryName,
          args: actualArgsToUseInGQLSearch,
          fields: {
            ids: {
              id: {},
              type: {},
            },
            last_record: {},
          },
        });

        // so we get the server value
        const serverValue = await gqlQuery(query);

        // if we get an error from the server, return the
        // server value and let it be handled
        if (serverValue.errors) {
          // return it
          return serverValue;
        }

        // now these are the results that we need to process
        // from the search query, the ISearchResult that we
        // need to process
        resultsToProcess = serverValue.data[searchQueryName].ids;
        lastRecord = serverValue.data[searchQueryName].last_record;
      } else {
        // otherwise our results to process are the same ones we got
        // from the database, but do we need to process them for real?
        // it depends
        resultsToProcess = dbValue.value;
        lastRecord = dbValue.lastRecord;
        dataMightBeStale = true;

        // if the fields are contained within what the database has loaded
        // and if all the results were preloaded then they don't need to be
        // preloaded
        if (
          requestFieldsAreContained(getListRequestedFields, dbValue.fields) &&
          dbValue.allResultsPreloaded
        ) {
          // now we can actually start using the args to run a local filtering
          // function

          return {
            data: {
              [searchQueryName]: {
                ids: await search(this.rootProxy, db, resultsToProcess, searchArgs),
                last_record: lastRecord,
              },
            },
            dataMightBeStale,
            lastRecord,
          };
        }

        // the result get list requested fields will actually end up being a merge as
        // they are needed by both in such a case, but this is only guaranteed to be
        // the case if in the previous scenario all the results were preloaded, otherwise
        // it's the same as the query results, think about it, all the subloaded values are
        // supposed to be guaranteed to contain these fields, but if some of them failed to
        // load then it's no such guarantee, not a problem nevertheless, if the failed to load
        // search request loads again, it will be able to reuse what it failed to load
        // and actually cached
        resultingGetListRequestedFields = dbValue.allResultsPreloaded ?
          deepMerge(getListRequestedFields, dbValue.fields) :
          getListRequestedFields;
      }
    } catch (err) {
      console.warn(err);
      // we return null if we hit an error
      // this will trigger a CANT_CONNECT error in
      // the parent handler
      return null;
    }

    // now we set what we have just gotten from the server (or the database)
    // and assign the value (maybe again) with the results, the fields we are supposed
    // to have contained within all the fetched batches at the end and say
    // false to preloaded because we haven't preloaded anything
    await db.put(SEARCHES_TABLE_NAME, {
      value: resultsToProcess,
      fields: resultingGetListRequestedFields,
      allResultsPreloaded: false,
      lastRecord,
    }, storeKeyName);

    // now we first got to extract what is has actually been loaded from those
    // results to process and actually has managed to make it to the database
    // this can happens when something fails in between, or it is loaded by another
    // part of the application
    const uncachedResultsToProcess: ISearchResult[] = [];
    // so now we check all the results we are asked to process
    await Promise.all(resultsToProcess.map(async (resultToProcess) => {
      // and get the cached results, considering the fields
      // we are asked to request
      const cachedResult = await this.getCachedValue(
        PREFIX_GET + resultToProcess.type,
        resultToProcess.id,
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
    const batches: ISearchResult[][] = [[]];
    let lastBatchIndex = 0;
    // for that we run a each event in all our uncached results
    uncachedResultsToProcess.forEach((uncachedResultToProcess) => {
      // and when we hit the limit, we build a new batch
      if (batches[lastBatchIndex].length === MAX_SEARCH_RESULTS_AT_ONCE_LIMIT) {
        batches.push([]);
        lastBatchIndex++;
      }

      // add this to the batch
      batches[lastBatchIndex].push(uncachedResultToProcess);
    });

    // now we need to load all those batches into graphql queries
    const processedBatches = await Promise.all(batches.map(async (batch) => {
      const args: any = {
        token: getListTokenArgs,
        language: getListLangArgs,
        ids: batch,
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
    let error: GraphQLEndpointErrorType;

    // now we call every processed batch
    await Promise.all(processedBatches.map(async (processedBatch) => {
      const originalBatch = processedBatch.batch;
      const resultingValue = processedBatch.gqlValue;
      // the resulting value is what gql gave us
      if (!resultingValue) {
        // if it's null something has failed, the connection most likely
        somethingFailed = true;
      } else if (resultingValue.errors) {
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
          code: "UNSPECIFIED",
          message: "There was no data in the resulting value, despite no errors",
        };
      } else {
        // otherwise now we need to set all that in memory right now
        // and so we will don
        await Promise.all(resultingValue.data[getListQueryName].results.map(async (value, index) => {
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
              PREFIX_GET + originalBatchRequest.type,
            );
          } else {
            // otherwise we do push the value and merge the cache
            // notice how we consider this an actual resulting value, whereas
            // we would not even use the deleted as a search result
            suceedStoring = await this.mergeCachedValue(
              PREFIX_GET + originalBatchRequest.type,
              originalBatchRequest.id,
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
              code: "UNSPECIFIED",
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
      const actualCurrentSearchValue: ISearchMatchType = await db.get(SEARCHES_TABLE_NAME, storeKeyName);
      await db.put(SEARCHES_TABLE_NAME, {
        ...actualCurrentSearchValue,
        allResultsPreloaded: true,
      }, storeKeyName);

      // Now we need to filter the search results in order to return what is
      // appropiate using the actualCurrentSearchValue

      return {
        data: {
          [searchQueryName]: {
            ids: await search(this.rootProxy, db, actualCurrentSearchValue.value, searchArgs),
          },
        },
        dataMightBeStale,
        lastRecord,
      };
    } else if (error) {
      // if we managed to catch an error, we pretend
      // to be graphql
      return {
        data: null,
        errors: [
          {
            extensions: error,
          },
        ],
        dataMightBeStale,
        lastRecord,
      };
    } else {
      // otherwise it must have been some sort
      // of connection failure (or database error)
      return null;
    }
  }

  public async proxyRoot(rootProxy: IRootRawJSONDataType) {
    this.rootProxy = new Root(rootProxy);
  }
}

// expose using comlink
expose(new CacheWorker());
