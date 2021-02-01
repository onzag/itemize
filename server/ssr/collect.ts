/**
 * This file contains the collector that collects results based on what the react
 * tree has asked to collect for
 * @packageDocumentation
 */

import { ISQLTableRowValue } from "../../base/Root/sql";
import { IGQLRequestFields } from "../../gql-querier";
import ItemDefinition, { ItemDefinitionIOActions } from "../../base/Root/Module/ItemDefinition";
import { filterAndPrepareGQLValue } from "../resolvers/basic";
import { logger, IAppDataType } from "../../server";
import { UNSPECIFIED_OWNER } from "../../constants";
import { ISSRCollectedQueryType } from "../../client/internal/providers/ssr-provider";
import { ISSRRule } from ".";
import { IOTriggerActions } from "../resolvers/triggers";
import { CustomRoleGranterEnvironment, CustomRoleManager } from "../resolvers/roles";
import { convertSQLValueToGQLValueForItemDefinition } from "../../base/Root/Module/ItemDefinition/sql";

/**
 * This is what a collection result looks like
 */
export interface ICollectionResult {
  /**
   * The date when the result was last modified
   */
  lastModified: Date,
  /**
   * The signature for this specific collection result
   */
  signature: string,
  /**
   * The query value, the same that is passed to the client side
   * this contains the value and all the attributes
   */
  query: ISSRCollectedQueryType,
};

/**
 * This is the collector class that actually does
 * the collection for the SSR, it is attached to the
 * react rendering
 * 
 * The collector binds it collect function to the request manager of the root
 * the item-provider (for example) calls this function during the beforeSSRRender
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
  private results: ICollectionResult[] = [];
  /**
   * All the collection statuses per result
   */
  private collectionStatuses: {
    [mergedID: string]: boolean;
  } = {};
  /**
   * Collection requests callbacks of other
   * collection requests that are awaiting because
   * we might ask for collection and then ask again
   * for collection for the same item
   */
  private collectionRequestsCbs: {
    [mergedID: string]: Array<() => void>;
  } = {};
  /**
   * Same but gives a rejected promise instead
   */
  private collectionRequestsRejectedCbs: {
    [mergedID: string]: Array<() => void>;
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
    // remove the non-accessible ones
    return this.results.filter((r) => r !== null).map((r) => r.query);
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

  /**
   * This is the actual collection function and it is what is called
   * by the beforeSSRRender function in the custom build on the server side
   * @param idef the item definition in question
   * @param id the id we want
   * @param version the version we want
   */
  public async collect(idef: ItemDefinition, id: string, version: string): Promise<void> {
    // now we build the merged id
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
        "ssrGenerator [SERIOUS]: Collection failed due to request not passing",
        {
          errStack: err.stack,
          errMessage: err.message,
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

    const rolesManager = new CustomRoleManager(
      this.appData.customRoles,
      {
        cache: this.appData.cache,
        databaseConnection: this.appData.databaseConnection,
        rawDB: this.appData.rawDB,
        environment: CustomRoleGranterEnvironment.RETRIEVING,
        item: idef,
        module: idef.getParentModule(),
        owner: rowValue ? (idef.isOwnerObjectId() ? rowValue.id : rowValue.created_by) : null,
        root: this.appData.root,
        parent: rowValue && rowValue.parent_id ? {
          id: rowValue.parent_id,
          type: rowValue.parent_type,
          version: rowValue.parent_version,
        } : null,
        tokenData: this.appliedRule.forUser,
        value: rowValue ? convertSQLValueToGQLValueForItemDefinition(
          this.appData.cache.getServerData(),
          idef,
          rowValue,
        ) : null,
      }
    );

    // now we build the fileds for the given role access
    const fields: IGQLRequestFields = await idef.buildFieldsForRoleAccess(
      ItemDefinitionIOActions.READ,
      this.appliedRule.forUser.role,
      this.appliedRule.forUser.id,
      rowValue ? (idef.isOwnerObjectId() ? rowValue.id : rowValue.created_by) : UNSPECIFIED_OWNER,
      rolesManager,
    );

    // and if we have fields at all, such user might not even have access to them at all
    // which is possible
    if (fields) {
      // we build the value for the given role with the given fields
      const value = rowValue === null ? null : filterAndPrepareGQLValue(
        this.appData.cache.getServerData(), rowValue, fields, this.appliedRule.forUser.role, idef,
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
      if (moduleTrigger || itemDefinitionTrigger) {

        if (moduleTrigger) {
          await moduleTrigger({
            appData: this.appData,
            itemDefinition: idef,
            module: mod,
            originalValue: value.actualValue,
            requestedUpdate: null,
            newValue: null,
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
          });
        }

        if (itemDefinitionTrigger) {
          await itemDefinitionTrigger({
            appData: this.appData,
            itemDefinition: idef,
            module: mod,
            originalValue: value.actualValue,
            requestedUpdate: null,
            newValue: null,
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
      this.forbiddenSignature.push(mergedID + forbiddenSignatureReason);
    } else {
      const result = {
        lastModified,
        signature,
        query,
      };
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