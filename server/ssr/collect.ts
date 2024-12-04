/**
 * This file contains the collector that collects results based on what the react
 * tree has asked to collect for
 * @module
 */

import { ISQLTableRowValue } from "../../base/Root/sql";
import { IRQRequestFields, IRQSearchRecord, IRQSearchResultsContainer, IRQValue } from "../../rq-querier";
import ItemDefinition, { IItemSearchStateType, ItemDefinitionIOActions } from "../../base/Root/Module/ItemDefinition";
import { filterAndPrepareRQValue } from "../resolvers/basic";
import { IAppDataType } from "../../server";
import { logger } from "../logger";
import { ENDPOINT_ERRORS, PROTECTED_RESOURCES, UNSPECIFIED_OWNER } from "../../constants";
import { ISSRCollectedQueryType, ISSRCollectedResourcesType, ISSRCollectedSearchType } from "../../client/internal/providers/ssr-provider";
import { ISSRRule } from ".";
import { IOTriggerActions } from "../resolvers/triggers";
import { CustomRoleGranterEnvironment, CustomRoleManager } from "../resolvers/roles";
import { convertSQLValueToRQValueForItemDefinition } from "../../base/Root/Module/ItemDefinition/sql";
import type { IActionSearchOptions } from "../../client/providers/item";
import fs from "fs";
import path from "path";
import { getFieldsAndArgs, getPropertyListForSearchMode, getSearchQueryFor } from "../../client/internal/rq-client-util";
import { searchItemDefinition, searchModule } from "../resolvers/actions/search";
import { EndpointError } from "../../base/errors";
import { deepMerge } from "../../rq-util";

function noop() {};

const fsAsync = fs.promises;

interface IBaseCollectionResult {
  /**
   * The date when the result was last modified
   */
  lastModified: Date;
  /**
   * The signature for this specific collection result
   * make it something unique, and include the last modified date within it
   * separate by dots, this specifies this exact data point
   */
  signature: string;

  /**
   * The type
   * @override
   */
  type: string;
}

export interface IResourceCollectionResult extends IBaseCollectionResult {
  /**
   * The data collected if any
   */
  data: string;
  /**
   * The type collected
   */
  type: "resource";
}

interface IInternalResourceCollectionResult extends IResourceCollectionResult {
  path: string;
}

/**
 * This is what a collection result looks like
 */
export interface IQueryCollectionResult extends IBaseCollectionResult {
  /**
   * The query value, the same that is passed to the client side
   * this contains the value and all the attributes
   */
  query: ISSRCollectedQueryType;
  requestFieldsAcc: IRQRequestFields;
  type: "query";
};

export interface ISearchCollectionResult extends IBaseCollectionResult {
  search: ISSRCollectedSearchType;
  type: "search";
};

/**
 * This is the collector class that actually does
 * the collection for the SSR, it is attached to the
 * react rendering
 * 
 * The collector binds it collect function to the request manager of the root
 * the item-provider (for example) calls this function during the getDerivedServerSideStateFromProps
 * that is used during SSR, which delays the execution of render until the collection
 * is done
 * 
 * The collector is then able to retrieve all the collection requests given by the
 * rendering of the app
 */
export class Collector {
  /**
   * Represents all the collected results
   */
  private results: Array<IInternalResourceCollectionResult | IQueryCollectionResult | ISearchCollectionResult> = [];
  /**
   * All the collection statuses per result
   */
  private collectionStatuses: {
    [mergedID: string]: boolean;
  } = {};
  /**
   * All the collection statuses per result
   */
  private collectionData: {
    [mergedID: string]: any;
  } = {};
  /**
   * Collection requests callbacks of other
   * collection requests that are awaiting because
   * we might ask for collection and then ask again
   * for collection for the same item
   */
  private collectionRequestsCbs: {
    [mergedID: string]: Array<(data?: any) => void>;
  } = {};
  /**
   * Same but gives a rejected promise instead
   */
  private collectionRequestsRejectedCbs: {
    [mergedID: string]: Array<(data?: any) => void>;
  } = {};

  /**
   * The app data that is being used while rendering
   * this
   */
  private appData: IAppDataType;
  /**
   * The SSR rule that is being used
   */
  private appliedRule: ISSRRule;
  /**
   * A signature for forbidden elements that did not
   * pass the security scrutiny, either by the default
   * rule or because of read triggers
   */
  private forbiddenSignature: string[] = [];

  /**
   * Builds a new collector
   * @param appData the application data
   * @param rule the SSR rule
   */
  constructor(appData: IAppDataType, rule: ISSRRule) {
    this.appData = appData;
    this.appliedRule = rule;

    this.collect = this.collect.bind(this);
    this.collectSearch = this.collectSearch.bind(this);
    this.collectResource = this.collectResource.bind(this);
  }

  /**
   * Provides the last date of the last modified of the given
   * results, the most recent one, or the date that the application
   * was built at if nothing else is found
   */
  public getLastModified() {
    let final = new Date(parseInt(this.appData.buildnumber));
    // filtering items without access rights
    this.results.filter((r) => r !== null).forEach((r) => {
      // last modified can be null due to it being not found
      if (r.lastModified && r.lastModified.getTime() > final.getTime()) {
        final = r.lastModified;
      }
    });
    return final;
  }

  /**
   * Provides all the resulting queries for use in the client side
   */
  public getQueries() {
    // TODO filter by requested fields by the accumulator, add the requested fields in each collection
    // and in the final only add those

    // remove the non-accessible ones
    return this.results.filter((r) => r !== null && r.type === "query").map((r: IQueryCollectionResult) => r.query);
  }

  /**
   * Provides all the resulting searches for use in the client side
   */
  public getSearches(): ISSRCollectedSearchType[] {
    return this.results.filter((r) => r !== null && r.type === "search").map((r: ISearchCollectionResult) => r.search);
  }

  /**
   * Provides the map of all the resulting resources that were fetched
   */
  public getResources(): ISSRCollectedResourcesType {
    const rs: ISSRCollectedResourcesType = {};
    this.results.filter((r) => r !== null && r.type === "resource").forEach((r: IInternalResourceCollectionResult) => {
      rs[r.path] = r.data;
    });
    return rs;
  }

  /**
   * Provides the signature of all the collected results, this signature
   * can be used to create an etag, but remember to add the buildnumber and
   * the mode it was rendered at for it
   */
  public getSignature() {
    const standard = this.results.filter((r) => r !== null).map((r) => r.signature).sort((a, b) => {
      return a.localeCompare(b);
    }).join(";");
    const forbiddenBit = this.getForbiddenSignature();
    return standard + (forbiddenBit ? "_FORBIDDEN_" : "") + forbiddenBit;
  }

  /**
   * Provides a forbidden signature for the bits that couldn't be accessed and
   * were denied absolute access, note that the primary signature already
   * constains this forbidden information
   */
  public getForbiddenSignature() {
    return this.forbiddenSignature.join(";");
  }

  /**
   * Informs whether the collection caught up forbidden resources
   */
  public hasForbiddenResources() {
    return this.results.some((r) => r === null);
  }

  public async collectResource(finalPath: string, customResolver: (appData: IAppDataType, finalPath: string) => Promise<IResourceCollectionResult>): Promise<string> {
    const mergedID = "__RESOURCE__" + finalPath;

    // request has been done and it's ready
    if (this.collectionStatuses[mergedID]) {
      return this.collectionData[mergedID].toString();
    } else if (this.collectionStatuses[mergedID] === false) {
      // request is in progress, add it to queue
      return new Promise<string>((resolve, reject) => {
        this.collectionRequestsCbs[mergedID].push(resolve);
        this.collectionRequestsRejectedCbs[mergedID].push(reject);
      });
    }

    // mark it as in progress
    this.collectionStatuses[mergedID] = false;
    this.collectionData[mergedID] = null;
    this.collectionRequestsCbs[mergedID] = [];
    this.collectionRequestsRejectedCbs[mergedID] = [];

    let result: IResourceCollectionResult;
    let forbiddenToDevKey: boolean = false;

    if (customResolver) {
      try {
        result = await customResolver(this.appData, finalPath);

        if (!result.lastModified) {
          result.lastModified = new Date();
        }
      } catch (err) {
        logger.error(
          {
            className: "Collector",
            methodName: "collectResource",
            message: "Collection of resource at " + finalPath + " failed due to error in custom resolver",
            serious: true,
            err,
            data: {
              path: finalPath,
            },
          }
        )

        this.collectionRequestsRejectedCbs[mergedID].forEach((r) => r());

        throw err;
      }
    } else {
      // Potential security vulnerability here because we try to read a file
      // but we must ensure such a file only exist within the resource folder
      // we must also respect the protected resources
      try {
        if (!finalPath.startsWith("/rest/resource/")) {
          throw new Error("Trying to access non-resource with no custom resolver");
        }

        const finalPathNonRes = finalPath.replace("/rest/resource/", "");

        if (finalPathNonRes.includes("..")) {
          throw new Error("Invalid resource path that includes double dots in it");
        }

        const isProtectedResource = PROTECTED_RESOURCES.includes(finalPathNonRes);
        if (isProtectedResource && this.appliedRule.mode !== "development") {
          forbiddenToDevKey = true;
          result = {
            lastModified: new Date(this.appData.buildnumber),
            data: null,
            // no need for last modified since it uses the buildnumber
            signature: finalPath,
            type: "resource",
          };
        } else {
          const fullPath = path.join(path.resolve(path.join("dist", "data")), finalPathNonRes);
          const data = await fsAsync.readFile(fullPath, "utf-8");

          result = {
            lastModified: new Date(this.appData.buildnumber),
            data,
            // no need for last modified since it uses the buildnumber
            signature: finalPath,
            type: "resource",
          }
        }
      } catch (err) {
        logger.error(
          {
            className: "Collector",
            methodName: "collectResource",
            message: "Collection of resource at " + finalPath + " failed due to missing file or unreadable",
            serious: true,
            err,
            data: {
              path: finalPath,
            },
          }
        );

        this.collectionRequestsRejectedCbs[mergedID].forEach((r) => r());

        throw err;
      }
    }

    this.collectionStatuses[mergedID] = true;
    this.collectionData[mergedID] = result.data;
    this.collectionRequestsCbs[mergedID].forEach((r) => r(result.data));

    if (forbiddenToDevKey) {
      this.forbiddenSignature.push(finalPath + "[FORBIDDEN_PROTECTED_RESOURCE]");
    } else {
      this.results.push({
        ...result,
        path: finalPath,
      });
    }

    return result.data;
  }

  public async collectSearch(idef: ItemDefinition, id: string, version: string, args: IActionSearchOptions): Promise<void> {
    if (!args.ssrEnabled || (args.cachePolicy && args.cachePolicy !== "none") || !args.traditional) {
      return null;
    }

    const mergedID = idef.getQualifiedPathName() + "." + id + "." + (version || "");

    // request has been done and it's ready
    if (this.collectionStatuses[mergedID]) {
      return;
    } else if (this.collectionStatuses[mergedID] === false) {
      // request is in progress, add it to queue
      return new Promise((resolve, reject) => {
        this.collectionRequestsCbs[mergedID].push(resolve);
        this.collectionRequestsRejectedCbs[mergedID].push(reject);
      });
    }

    // mark it as in progress
    this.collectionStatuses[mergedID] = false;
    this.collectionRequestsCbs[mergedID] = [];
    this.collectionRequestsRejectedCbs[mergedID] = [];

    // this function is too complicated to be like the second so it's better to just use searchModule and work
    // from that, basically create a token for the given user (or pass a flag?), build the args, do everything like
    // the thing wants to, copy the client search to see how it's done to create the args

    // we need the standard counterpart given we are in search mode right now, 
    const standardCounterpart = idef.getStandardCounterpart();
    // first we calculate the properties that are to be submitted, by using the standard counterpart
    // a search action is only to be executed if the item definition (either a real item definition or
    // one representing a module) is actually in search mode, otherwise this would crash
    const propertiesForArgs = getPropertyListForSearchMode(args.searchByProperties, standardCounterpart);

    // the args of the item definition depend on the search mode, hence we use
    // our current item definition instance to get the arguments we want to load
    // in order to perform the search based on the search mode

    // THIS IS A COPY AND PASTE FROM ITEM THAT IS MODIFIED
    try {
      const {
        argumentsForQuery,
      } = getFieldsAndArgs({
        includeArgs: true,
        includeFields: false,
        propertiesForArgs,
        includesForArgs: args.searchByIncludes || {},
        itemDefinitionInstance: idef,
        forId: id || null,
        forVersion: version || null,
      });

      // the fields nevertheless are another story as it uses the standard logic
      const searchFieldsAndArgs = getFieldsAndArgs({
        includeArgs: false,
        includeFields: true,
        properties: args.ssrRequestedProperties || args.requestedProperties,
        includes: args.ssrRequestedIncludes || args.requestedIncludes || {},
        itemDefinitionInstance: standardCounterpart,
        forId: null,
        forVersion: null,
      });

      let types: string[] = null;
      if (args.types) {
        const root = idef.getParentModule().getParentRoot();
        types = args.types.map((t) => root.registry[t].getQualifiedPathName());
      }

      // while these search fields are of virtually no use for standard searchs
      // these are used when doing a traditional search and when doing a search
      // in a cache policy mode
      const requestedSearchFields = searchFieldsAndArgs.requestFields;

      let parentedBy = null;
      if (args.parentedBy && args.parentedBy !== "NO_PARENT") {
        const root = idef.getParentModule().getParentRoot();
        const parentIdef = root.registry[args.parentedBy.item] as ItemDefinition;
        parentedBy = {
          itemDefinition: parentIdef,
          id: args.parentedBy.id || null,
          version: args.parentedBy.version || null,
        };
      }

      const query = getSearchQueryFor({
        args: argumentsForQuery,
        fields: requestedSearchFields,
        itemDefinition: idef,
        createdBy: args.createdBy || null,
        since: args.since || null,
        until: args.until || null,
        orderBy: args.orderBy || {
          created_at: {
            priority: 0,
            nulls: "last",
            direction: "desc",
          }
        },
        types,
        // note how we override and make it traditional
        // we want a traditional search we will steal
        // the records from that
        traditional: true,//!!args.traditional,
        token: this.appliedRule.forUser.token,
        language: this.appliedRule.language,
        limit: args.limit,
        offset: args.offset,
        enableNulls: args.enableNulls,
        parentNull: args.parentedBy === "NO_PARENT",
        parentedBy,
      });

      const stateOfSearch = idef.getStateNoExternalChecking(
        id || null,
        version || null,
      );

      // we use the server side call to get what we would receive
      const basicQueryElement = query.getServerSideQueryByIndex(0);

      // now we can use this to pass directly and straight to the search function
      // depending on what we are doing we need those records and for that
      // we will use a traditional search
      const isModuleSearch = idef.isExtensionsInstance();
      let rs: IRQSearchResultsContainer;
      if (isModuleSearch) {
        rs = await searchModule(
          this.appData,
          idef.getParentModule().getStandardModule(),
          {
            args: basicQueryElement.args,
            fields: basicQueryElement.fields,
          },
          {traditional: true, noLimitOffset: args.ssrNoLimitOffset},
        ) as IRQSearchResultsContainer;
      } else {
        rs = await searchItemDefinition(
          this.appData,
          idef.getStandardCounterpart(),
          {
            args: basicQueryElement.args,
            fields: basicQueryElement.fields,
          },
          {traditional: true, noLimitOffset: args.ssrNoLimitOffset},
        ) as IRQSearchResultsContainer;
      }

      const records = (rs.results as IRQValue[]).map((v) => ({
        type: v.type,
        version: v.version || null,
        id: v.id || null,
        last_modified: v.last_modified || null
      })) as IRQSearchRecord[];

      let searchParent: [string, string, string] = null;
      if (args.parentedBy && args.parentedBy !== "NO_PARENT" && args.parentedBy.id) {
        const itemDefinitionInQuestion = idef.getParentModule()
          .getParentRoot().registry[args.parentedBy.item] as ItemDefinition;

        // and that way we calculate the search parent
        searchParent = [
          itemDefinitionInQuestion.getQualifiedPathName(),
          args.parentedBy.id,
          args.parentedBy.version || null,
        ];
      }

      const highlights: any = rs.highlights || {};

      const searchState: IItemSearchStateType = {
        searchError: null as any,
        searching: false,
        searchResults: rs.results,
        searchHighlights: highlights,
        searchEngineUsedFullHighlights: args.useSearchEngine ? args.useSearchEngineFullHighlights : null,
        searchRecords: records,
        searchCount: rs.count,
        searchLimit: rs.limit,
        searchOffset: rs.offset,
        searchId: "SSR_SEARCH",
        searchOwner: args.createdBy || null,
        searchParent,
        searchCacheUsesProperty: null as [string, string],
        searchShouldCache: false,
        searchFields: requestedSearchFields,
        searchRequestedProperties: args.requestedProperties,
        searchRequestedIncludes: args.requestedIncludes || {},
        searchLastModified: rs.last_modified,
        searchEngineEnabled: !!args.useSearchEngine,
        searchEngineEnabledLang: typeof args.useSearchEngine === "string" ? args.useSearchEngine : null,
        searchCachePolicy: args.cachePolicy || "none",
        searchListenPolicy: args.listenPolicy || args.cachePolicy || "none",
        searchOriginalOptions: args,
        searchMetadata: rs.metadata,

        // we don't need because they are traditional
        searchEngineHighlightArgs: null as any,
        searchListenSlowPolling: args.listenPolicySlowPolling || false,
      };

      const state = {
        searchState,
        state: stateOfSearch,
      };

      idef.setSearchState(
        id || null,
        version || null,
        state,
      );

      this.results.push({
        lastModified: new Date(rs.last_modified),
        signature: mergedID,
        search: {
          id: id || null,
          version: version || null,
          idef: idef.getQualifiedPathName(),
          state,
        },
        type: "search" as "search",
      });
    } catch (err) {
      if (err instanceof EndpointError && err.data.code === ENDPOINT_ERRORS.FORBIDDEN) {
        this.results.push(null);
        this.forbiddenSignature.push(mergedID + "[FORBIDDEN]");
      } else {
        logger.error(
          {
            className: "Collector",
            methodName: "collectSearch",
            message: "Search collection failed due to request not passing",
            serious: true,
            err,
          }
        )

        // reject all these will also cause rendering to crash as the bottom line
        this.collectionRequestsRejectedCbs[mergedID].forEach((r) => r());

        // this is bad our collection failed, this will cause the rendering to crash
        // and it will fallback to no SSR
        throw err;
      }
    }

    // completed
    this.collectionStatuses[mergedID] = true;
    this.collectionRequestsCbs[mergedID].forEach((r) => r());
  }

  /**
   * This is the actual collection function and it is what is called
   * by the getDerivedServerSideStateFromProps function in the custom build on the server side
   * @param idef the item definition in question
   * @param id the id we want
   * @param version the version we want
   */
  public async collect(idef: ItemDefinition, id: string, version: string, requestFields: IRQRequestFields): Promise<void> {
    // now we build the merged id
    const mergedID = idef.getQualifiedPathName() + "." + id + "." + (version || "");

    const onRequestDone = () => {
      const query: IQueryCollectionResult = this.collectionData[mergedID];

      // was forbidden
      if (query === null) {
        return;
      }

      // we can manage to add the accumulated properties
      query.requestFieldsAcc = deepMerge(requestFields, query.requestFieldsAcc);
    };

    // request has been done and it's ready
    if (this.collectionStatuses[mergedID]) {
      onRequestDone();
      return;
    } else if (this.collectionStatuses[mergedID] === false) {
      // request is in progress, add it to queue
      return new Promise((resolve, reject) => {
        this.collectionRequestsCbs[mergedID].push(() => {
          onRequestDone();
          resolve();
        });
        this.collectionRequestsRejectedCbs[mergedID].push(reject);
      });
    }

    // mark it as in progress
    this.collectionStatuses[mergedID] = false;
    this.collectionRequestsCbs[mergedID] = [];
    this.collectionRequestsRejectedCbs[mergedID] = [];

    let signature = "NULL";
    let lastModified: Date = null;
    let query: ISSRCollectedQueryType = null;
    let forbiddenSignatureReason: string = null;

    // and we ask the cache for the given value
    let rowValue: ISQLTableRowValue;
    try {
      rowValue = await this.appData.cache.requestValue(idef, id, version);
    } catch (err) {
      logger.error(
        {
          className: "Collector",
          methodName: "collect",
          message: "Collection failed due to request not passing",
          serious: true,
          err,
        }
      )

      // reject all these will also cause rendering to crash as the bottom line
      this.collectionRequestsRejectedCbs[mergedID].forEach((r) => r());

      // this is bad our collection failed, this will cause the rendering to crash
      // and it will fallback to no SSR
      throw err;
    }

    // now we check, is it not found, if it's not found, or signature is going to be
    // null for such index
    if (rowValue === null) {
      signature = idef.getQualifiedPathName() + "." + id + "." + (version || "") + ".NOT_FOUND";
    } else {
      // otherwise it's when it was last modified
      lastModified = new Date(rowValue.last_modified);
      signature = rowValue.type + "." + rowValue.id + "." + (rowValue.version || "") + "." + rowValue.last_modified;
    }

    const ownerId = rowValue ? (idef.isOwnerObjectId() ? rowValue.id : rowValue.created_by) : null;
    const rolesManager = new CustomRoleManager(
      this.appData.customRoles,
      {
        cache: this.appData.cache,
        databaseConnection: this.appData.databaseConnection,
        rawDB: this.appData.rawDB,
        environment: CustomRoleGranterEnvironment.RETRIEVING,
        item: idef,
        module: idef.getParentModule(),
        owner: ownerId,
        root: this.appData.root,
        parent: rowValue && rowValue.parent_id ? {
          id: rowValue.parent_id,
          type: rowValue.parent_type,
          version: rowValue.parent_version,
        } : null,
        id: id,
        version: version || null,
        requestArgs: null,
        tokenData: this.appliedRule.forUser,
        user: this.appliedRule.forUser,
        value: rowValue ? convertSQLValueToRQValueForItemDefinition(
          this.appData.cache.getServerData(),
          this.appData,
          idef,
          rowValue,
        ) : null,
        parentNull: !(rowValue && rowValue.parent_id),
        customId: null,
        environmentParent: null,
      }
    );

    // now we build the fileds for the given role access
    // TODO we need to change this, this is too expensive, we are loading
    // every field even if that is not necessary
    // TODO we also need some form of SSR prevented properties even on top of that
    // to use in our item provider, some things may just be way too heavy, let it refresh
    // when it gets to the client side
    const fields: IRQRequestFields = await idef.buildFieldsForRoleAccess(
      ItemDefinitionIOActions.READ,
      this.appliedRule.forUser.role,
      this.appliedRule.forUser.id,
      ownerId || UNSPECIFIED_OWNER,
      rolesManager,
    );

    // and if we have fields at all, such user might not even have access to them at all
    // which is possible
    if (fields) {
      // we build the value for the given role with the given fields
      const value = rowValue === null ? null : await filterAndPrepareRQValue(
        this.appData.cache.getServerData(),
        this.appData,
        rowValue,
        fields,
        this.appliedRule.forUser.role,
        this.appliedRule.forUser.id,
        ownerId,
        rolesManager,
        idef,
      );

      const valueToReturnToUser = value ? value.toReturnToUser : null;

      // now we need to find the triggers
      const pathOfThisIdef = idef.getAbsolutePath().join("/");
      const mod = idef.getParentModule();
      const pathOfThisModule = mod.getPath().join("/");
      // and extract the triggers from the registry
      const itemDefinitionTrigger = this.appData.triggers.item.io[pathOfThisIdef]
      const moduleTrigger = this.appData.triggers.module.io[pathOfThisModule];

      let queryWasForbiddenByTriggers = false;
      if ((moduleTrigger || itemDefinitionTrigger) && value) {

        if (moduleTrigger) {
          await moduleTrigger({
            language: this.appliedRule.language,
            dictionary: this.appData.databaseConfig.dictionaries[this.appliedRule.language] || this.appData.databaseConfig.dictionaries["*"],
            appData: this.appData,
            itemDefinition: idef,
            module: mod,
            originalValue: value.actualValue,
            originalValueSQL: rowValue,
            originalValueBlocked: value.toReturnToUser.DATA === null,
            requestedUpdate: null,
            requestedUpdateToBlock: null,
            requestedUpdateToUnblock: null,
            requestedUpdateParent: null,
            requestedUpdateCreatedBy: null,
            newValue: null,
            newValueSQL: null,
            newValueBlocked: null,
            extraArgs: {},
            action: IOTriggerActions.READ,
            id,
            version: version || null,
            user: {
              role: this.appliedRule.forUser.role,
              id: this.appliedRule.forUser.id,
              customData: this.appliedRule.forUser.customData,
            },
            forbid: () => {
              queryWasForbiddenByTriggers = true;
              forbiddenSignatureReason = "[FORBIDDEN_BY_MOD_TRIGGER]";
            },
            triggerCache: {},
            customId: null,
            setForId: noop,
            setVersion: noop,
            deleted: null,
            collectDeletedCascade: noop,
          });
        }

        if (itemDefinitionTrigger) {
          await itemDefinitionTrigger({
            language: this.appliedRule.language,
            dictionary: this.appData.databaseConfig.dictionaries[this.appliedRule.language] || this.appData.databaseConfig.dictionaries["*"],
            appData: this.appData,
            itemDefinition: idef,
            module: mod,
            originalValue: value.actualValue,
            originalValueSQL: rowValue,
            originalValueBlocked: value.toReturnToUser.DATA === null,
            requestedUpdate: null,
            requestedUpdateToBlock: null,
            requestedUpdateToUnblock: null,
            requestedUpdateParent: null,
            requestedUpdateCreatedBy: null,
            newValue: null,
            newValueSQL: null,
            newValueBlocked: null,
            extraArgs: {},
            action: IOTriggerActions.READ,
            id,
            version: version || null,
            user: {
              role: this.appliedRule.forUser.role,
              id: this.appliedRule.forUser.id,
              customData: this.appliedRule.forUser.customData,
            },
            forbid: () => {
              queryWasForbiddenByTriggers = true;
              forbiddenSignatureReason = "[FORBIDDEN_BY_IDEF_TRIGGER]";
            },
            customId: null,
            setForId: noop,
            setVersion: noop,
            triggerCache: {},
            deleted: null,
            collectDeletedCascade: noop,
          });
        }
      }

      if (queryWasForbiddenByTriggers) {
        query = null;
      } else {
        // and now we build the query
        query = {
          idef: idef.getQualifiedPathName(),
          id,
          version,
          value: valueToReturnToUser,
          fields: value ? value.requestFields : null,
        };
      }
    } else {
      forbiddenSignatureReason = "[FORBIDDEN_BY_SCHEMA]";
      // means no access to them at all
      query = null;
    }

    // no access
    if (query === null) {
      this.results.push(null);
      this.collectionData[mergedID] = null;
      this.forbiddenSignature.push(mergedID + forbiddenSignatureReason);
    } else {
      const result = {
        lastModified,
        signature,
        query,
        requestFieldsAcc: requestFields,
        type: "query" as "query",
      };
      this.collectionData[mergedID] = result;
      this.results.push(result);
      idef.applyValue(
        query.id,
        query.version,
        query.value,
        false,
        query.fields,
        false,
      );
    }

    // ensure all the callbacks
    this.collectionStatuses[mergedID] = true;
    this.collectionRequestsCbs[mergedID].forEach((r) => r());
  }
}