/**
 * This file contains the functions that allow for raw modification of the database
 * as well as to propagate these changes to the caches and all the running
 * clusters
 * 
 * @module
 */

import { ISQLTableRowValue } from "../base/Root/sql";
import { CHANGED_FEEDBACK_EVENT, generateOwnedParentedSearchMergedIndexIdentifier, generateOwnedSearchMergedIndexIdentifier, generateParentedSearchMergedIndexIdentifier, generatePropertySearchMergedIndexIdentifier, IChangedFeedbackEvent, IOwnedParentedSearchRecordsEvent, IOwnedSearchRecordsEvent, IParentedSearchRecordsEvent, IPropertySearchRecordsEvent, IRedisEvent, OWNED_PARENTED_SEARCH_RECORDS_EVENT, OWNED_SEARCH_RECORDS_EVENT, PARENTED_SEARCH_RECORDS_EVENT, PROPERTY_SEARCH_RECORDS_EVENT } from "../base/remote-protocol";
import { CACHED_SELECTS_LOCATION_GLOBAL, CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, DELETED_REGISTRY_IDENTIFIER, TRACKERS_REGISTRY_IDENTIFIER, UNSPECIFIED_OWNER } from "../constants";
import Root from "../base/Root";
import { logger } from "./logger";
import type { ItemizeRedisClient } from "./redis";
import { findLastRecordDate } from "./resolvers/actions/search";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import { convertVersionsIntoNullsWhenNecessary } from "./version-null-value";
import Module from "../base/Root/Module";
import { UpdateBuilder } from "../database/UpdateBuilder";
import { DatabaseConnection } from "../database";
import { BasicBindingType, IManyValueType } from "../database/base";
import { SelectBuilder } from "../database/SelectBuilder";
import { WhereBuilder } from "../database/WhereBuilder";
import { SetBuilder } from "../database/SetBuilder";
import { WithBuilder } from "../database/WithBuilder";
import { convertGQLValueToSQLValueForModule } from "../base/Root/Module/sql";
import { convertGQLValueToSQLValueForItemDefinition } from "../base/Root/Module/ItemDefinition/sql";
import uuid from "uuid";
import uuidv5 from "uuid/v5";
import type PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import type Include from "../base/Root/Module/ItemDefinition/Include";
import { ItemizeElasticClient } from "./elastic";
import type { IAppDataType } from "../server";
import { DeclareCursorBuilder } from "../database/DeclareCursorBuilder";
import { CloseCursorBuilder } from "../database/CloseCursorBuilder";
import { FetchOrMoveFromCursorBuilder } from "../database/FetchOrMoveFromCursorBuilder";

type changeRowLanguageFnPropertyBased = (language: string, dictionary: string, property: string) => void;
type changeRowLanguageFnPropertyIncludeBased = (language: string, dictionary: string, include: string, property: string) => void;
type changeRowLanguageFn = changeRowLanguageFnPropertyBased | changeRowLanguageFnPropertyIncludeBased;

const NAMESPACE = "23ab4609-af49-4cdf-921b-4700adb284f3";
export function makeIdOutOf(str: string) {
  return uuidv5(str, NAMESPACE).replace(/-/g, "");
}

async function wait(ms: number) {
  return new Promise((r) => {
    setTimeout(r, ms);
  });
}

/**
 * The required properties that every row should have
 * @ignore
 */
const requiredProperties = ["id", "version", "type", "created_by", "parent_id", "parent_type", "parent_version", "last_modified"];
const invalidManualUpdate = ["id", "version", "type", "created_by", "last_modified", CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME];

/**
 * This is a very advanced feature, if you are here is because you are doing raw database
 * updates and want to propagate them into your clients to ensure that the realtime attributes
 * get mantained and the caches get properly invalidated
 */
export class ItemizeRawDB {
  private redisPub: ItemizeRedisClient;
  private redisSub: ItemizeRedisClient;
  private redisGlobal: ItemizeRedisClient;

  private root: Root;
  private elastic: ItemizeElasticClient;

  private transacting: boolean;
  private transactingQueue: Function[] = [];

  private cachedSelects: {
    [prefixedUniqueID: string]: {
      uniqueID: string,
      itemDefinitionOrModule: ItemDefinition | Module | string,
      selecter: (builder: SelectBuilder) => void,
      preventJoin: boolean,
      updateInterval: number,
      intervalObject: NodeJS.Timer,
      expiresAt: number,
    }
  } = {};

  private memCachedSelects: {
    [uniqueID: string]: {
      value: ISQLTableRowValue[];
      waitingPromise: Promise<void>;
      ready: boolean;
      err?: Error;
    },
  } = {};

  public databaseConnection: DatabaseConnection;

  /**
   * Builds a new instance of the change informer
   * @param redisPub the redis publish instance
   * @param databaseConnection a connection to the database
   * @param root the root instance
   */
  constructor(
    redisGlobal: ItemizeRedisClient,
    redisPub: ItemizeRedisClient,
    redisSub: ItemizeRedisClient,
    databaseConnection: DatabaseConnection,
    root: Root,
  ) {
    this.redisPub = redisPub;
    this.redisSub = redisSub;
    this.redisGlobal = redisGlobal;

    this.handleIncomingMessage = this.handleIncomingMessage.bind(this);

    if (this.redisSub) {
      this.redisSub.redisClient.on("message", this.handleIncomingMessage)
    }

    this.databaseConnection = databaseConnection;
    this.root = root;
  }

  /**
   * the elastic instance depends on raw db and raw db depends on the
   * elastic instance, as such elastic adds itself in here when initialized
   * @param elastic the elastic instance
   */
  public setupElastic(elastic: ItemizeElasticClient) {
    this.elastic = elastic;
  }

  /**
   * Starts a new instance of raw db but in transaction mode
   * @param fn the transactional function
   * @returns whatever is returned in the transactional function
   */
  public startTransaction<T>(fn: (transactingRawDB: ItemizeRawDB) => Promise<T>, opts: { ensureOrder?: boolean } = {}): Promise<T> {
    return this.databaseConnection.startTransaction(async (transactingClient) => {
      const newRawDB = new ItemizeRawDB(this.redisGlobal, this.redisPub, this.redisSub, transactingClient, this.root);
      newRawDB.transacting = true;

      const resolvedPromiseToReturn = await fn(newRawDB);
      if (opts.ensureOrder) {
        for (const q of this.transactingQueue) {
          await q();
        }
      } else {
        await Promise.all(this.transactingQueue.map((q) => q()));
      }
      return resolvedPromiseToReturn;
    });
  }

  /**
   * When using raw db you might be able to specify your own ids
   * by using these so you know them ahead of time
   * 
   * It's a simple v4 uuid
   * 
   * @returns a url safe v4 uuid
   */
  public provideRandomV4Id() {
    return uuid.v4().replace(/-/g, "");
  }

  /**
   * Provides a hashable v5 uuid that will ensure the same id
   * provided the same input
   * 
   * @returns a url safe v5 uuid
   */
  public provideHashableV5Id(input: string) {
    return makeIdOutOf(input);
  }

  /**
   * Will convert a graphql style value into a full row SQL value in order to execute many value
   * types functionality and directly insert values in a safer way
   * 
   * Note that this method is incapable of passing the required data for consuming stream which means
   * that if you set a value for a file and are working with files this will inevitably fail because
   * its incapable to access the storage provider and unable to consume streams
   * 
   * Raw writes on the database are after all dangerous
   *
   * @param item the item definition that you want to convert a value for
   * @param value the vale you want to convert
   * @param serverData server data, required for doing things like currency conversion, you might use null otherwise but it should
   * be readily available in the global environment as well as local, you should never use raw db in local nevertheless
   * @param dictionary the dictionary to use
   * @param partialFields by default it will populate the entire row information that is necessary to fill each one of the required
   * properties (not including the base) so with partial fields you can get partial values which are useful for updates, these
   * are the same as graphql fields
   * 
   * @returns an object which contains the total or partial values of the row to be inserted or updated
   */
  public processGQLValue(
    item: ItemDefinition | string,
    value: any,
    appData: IAppDataType,
    dictionary: string,
    partialFields?: any,
  ): {
    modSQL: ISQLTableRowValue
    itemSQL: ISQLTableRowValue
  } {
    const itemDefinition = item instanceof ItemDefinition ? item : this.root.registry[item] as ItemDefinition;
    const mod = itemDefinition.getParentModule();

    const modSQL = convertGQLValueToSQLValueForModule(
      appData.cache.getServerData(),
      appData,
      mod,
      value,
      null,
      null,
      null,
      dictionary,
      partialFields,
    ).value;

    const itemSQL = convertGQLValueToSQLValueForItemDefinition(
      appData.cache.getServerData(),
      appData,
      itemDefinition,
      value,
      null,
      null,
      null,
      dictionary,
      partialFields,
    ).value;

    return {
      modSQL,
      itemSQL,
    };
  }

  /**
   * Given incomplete row data this function will complete the row data (if possible)
   * and return completed array, note that this will likely be out of the order given
   * as the order in and out is not guaranteed
   * 
   * @param rows the rows, they should all have at least, id, version and type defined
   * @returns the entire row data
   */
  public async completeRowData(rows: ISQLTableRowValue[]): Promise<[ISQLTableRowValue[], boolean]> {
    if (!rows.length) {
      return [rows, true];
    }

    const typesOrg: { [type: string]: Array<[string, string]> } = {};

    const invalidRow = rows.some((r) => {
      return (typeof r.type === "undefined" || typeof r.id === "undefined" || typeof r.version === "undefined");
    });

    if (invalidRow) {
      // could not complete row data due to invalid row
      return [rows, false];
    }

    // let's reorganize the rows
    rows.forEach((r) => {
      if (!typesOrg[r.type]) {
        typesOrg[r.type] = [];
      }
      typesOrg[r.type].push([r.id, r.version || null]);
    });

    // now let's perform all those selects based on the types we have, we need different selects
    const selects = await Promise.all(Object.keys(typesOrg).map(async (type) => {
      // all the ids and versions we are selecting for the given type
      const idVersions = typesOrg[type];
      // whether all the versions are null and we are just updating ids
      const isAllNullVersions = idVersions.every((idVersion) => idVersion[1] === null);

      // now we can perform such select
      return await this.performRawDBSelect(type, (b) => {
        const whereBuilder = b.selectAll().whereBuilder;

        // if we are talking about just null versions
        if (isAllNullVersions) {
          const allIds = idVersions.map((idVersion) => idVersion[0]);
          whereBuilder.andWhere("\"id\" = ANY(ARRAY[" + allIds.map(() => "?").join(",") + "]::TEXT[])", allIds);
          whereBuilder.andWhereColumn("version", "");
        } else {
          idVersions.forEach((idVersion) => {
            whereBuilder.orWhere((subBuilder) => {
              subBuilder.andWhereColumn("id", idVersion[0]);
              subBuilder.andWhereColumn("version", idVersion[1]);
            });
          });
        }
      });
    }));

    // flatten this
    const newRowData = selects.flat();

    // something went wrong here too
    if (newRowData.length !== rows.length) {
      return [rows, false];
    }

    let somethingWentWrong = false;
    const finalRowData = newRowData.map((d) => {
      if (somethingWentWrong) {
        // collapse
        return null;
      }

      const originalRowData = rows.find((r) => r.id === d.id && (r.version || null) === (d.version || null));
      if (!originalRowData) {
        // went wrong this row shouldnt have been returned
        somethingWentWrong = true;
        return null;
      }

      // override what the original row data held
      // this include OLD_ stuff that is used during events
      // and trackers and whatnot
      return {
        ...newRowData,
        ...originalRowData,
      };
    });

    // something went seriously wrong
    if (somethingWentWrong) {
      return [rows, false];
    }

    // now we are done and we have completed the row data for each row
    return [finalRowData, true];
  }

  /**
   * Takes a row and stores it in the deleted registry
   * @param row the row to store
   * @param moduleName the module that it belongs to (based on the type)
   * @returns the transaction time
   */
  private async storeInDeleteRegistry(row: ISQLTableRowValue, moduleName: string, trackedProperties: string[]) {
    const insertQuery = this.databaseConnection.getInsertBuilder();

    const trackers: { [key: string]: string } = trackedProperties ? {} : null;
    trackedProperties.forEach((pId) => {
      const currentValue = row[pId] || null;
      if (currentValue) {
        trackers[pId] = currentValue;
      }
    });

    insertQuery.table(DELETED_REGISTRY_IDENTIFIER).insert({
      id: row.id,
      version: row.version,
      type: row.type,
      module: moduleName,
      created_by: row.created_by || null,
      parenting_id: row.parent_id ? (row.parent_type + "." + row.parent_id + "." + row.parent_version || "") : null,
      transaction_time: [
        "NOW()",
        [],
      ],
    });
    insertQuery.returningBuilder.returningColumn("transaction_time");

    // simply build the query
    const insertQueryValue = await this.databaseConnection.queryFirst(insertQuery);

    // returning the transaction time
    return insertQueryValue.transaction_time as string;
  }

  private async checkRowValidityForInformingChanges(row: ISQLTableRowValue, idef: ItemDefinition, doNotCheckTracked?: boolean) {
    return !!(row && (
      requiredProperties
        .concat(
          doNotCheckTracked ?
            [] :
            idef.getAllPropertyDefinitionsAndExtensions().filter((pdef) => pdef.isTracked()).map((pdef) => pdef.getId())
        )
    ).every((p) => {
      if (typeof row[p] === "undefined") {
        logger && logger.error(
          {
            className: "ItemizeRawDB",
            methodName: "checkRowValidityForInformingChanges",
            message: "row data is invalid as it misses property " + p,
            data: {
              row
            },
          }
        );
        return false;
      }

      return true;
    }));
  }

  private async informChangeOnRowElastic(
    rowWithOlds: ISQLTableRowValue,
    action: "created" | "deleted" | "modified",
    elasticLanguageOverride: string,
    dataIsComplete: boolean,
    hasBeenChecked: boolean,
  ) {
    if (!hasBeenChecked) {
      // we don't need to check tracked properties for this
      const isValid = this.checkRowValidityForInformingChanges(rowWithOlds, null, true);
      if (!isValid) {
        return;
      }
    }

    let row = rowWithOlds;
    const keys = Object.keys(row);
    if (action === "modified" && keys.some((key) => key.startsWith("OLD_"))) {
      row = { ...rowWithOlds };
      keys.forEach((k) => {
        if (k.startsWith("OLD_")) {
          delete row[k];
        }
      });
    }

    if (!dataIsComplete) {
      const [newRows, newIsComplete] = await this.completeRowData([row]);
      if (!newIsComplete) {
        logger && logger.error(
          {
            className: "ItemizeRawDB",
            methodName: "informChangeOnRowElastic",
            message: "row data could not be completed",
            data: {
              row
            },
          }
        );
        return;
      }
      row = newRows[0];
    }

    const idef = (this.root.registry[row.type] as ItemDefinition);

    // send to elasticsearch
    if (this.elastic) {
      // because this can be none, which returns null to fallback
      // to the standard language, we need to realize this that null
      // means we got it
      const hasBaseLanguageSpecified = typeof elasticLanguageOverride !== "undefined" || !!idef.rawData.searchEngineFallbackLang;

      // otherwise here we are checking what the dynamic column is and if we have it in
      // our element
      const reliesOnARowField = idef.getSearchEngineDynamicMainLanguageColumn();
      const containsSuchRowField = reliesOnARowField && typeof row[reliesOnARowField] !== "undefined";

      // all of it is known, we can proceed with a known update
      let language: string = null;
      if (hasBaseLanguageSpecified || (reliesOnARowField && containsSuchRowField)) {
        language = typeof elasticLanguageOverride !== "undefined" ? elasticLanguageOverride : idef.getSearchEngineMainLanguageFromRow(row)
      }

      if (!language) {
        logger && logger.error(
          {
            className: "ItemizeRawDB",
            methodName: "informChangeOnRowElastic",
            message: "Could not deterimine the language to execute on",
            data: {
              row
            },
          }
        );
        return;
      }

      if (action === "created") {
        await this.elastic.createDocument(
          idef,
          language,
          row.id,
          row.version || null,
          row,
        );
      } else if (action === "deleted") {
        await this.elastic.deleteDocument(
          idef,
          language,
          row.id,
          row.version || null,
        );
      } else if (action === "modified") {
        await this.elastic.updateDocumentUnknownOriginalLanguage(
          idef,
          language,
          row.id,
          row.version || null,
          row,
        );
      }
    }
  }

  /**
   * Informs all the caches all the way to the clients of a change in a given
   * row 
   * @param row the row to inform a change on
   * @param action what happened to the row
   * @param elasticLanguageOverride the elastic language override
   * @param dataIsComplete whether the row contains complete data
   */
  private async informChangeOnRow(row: ISQLTableRowValue, action: "created" | "deleted" | "modified", elasticLanguageOverride: string, dataIsComplete: boolean) {
    if (!row.type) {
      return null;
    }

    const idef = (this.root.registry[row.type] as ItemDefinition);

    if (!idef) {
      return null;
    }

    // first let's check whether the row is valid for the bare minimum
    // also includes whether it contains the tracked properties which are
    // required for this validity case
    const isRowValid = this.checkRowValidityForInformingChanges(row, idef, false);

    // if it's not valid we return null
    if (!isRowValid) {
      return null;
    }

    await this.informChangeOnRowElastic(row, action, elasticLanguageOverride, dataIsComplete, true);

    // now let's grab the module qualified name
    const moduleName = idef.getParentModule().getQualifiedPathName();

    const tracked = idef.getAllPropertyDefinitionsAndExtensions().filter((pdef) => pdef.isTracked()).map((pdef) => pdef.getId());

    // and set into the deleted registry if we don't have it
    let lastModified = row.last_modified;
    if (action === "deleted") {
      lastModified = await this.storeInDeleteRegistry(row, moduleName, tracked);
    }

    // build the change event
    const changedFeedbackEvent: IChangedFeedbackEvent = {
      lastModified,
      id: row.id,
      itemDefinition: row.type,
      type: action === "deleted" ? "not_found" : action,
      version: row.version || null,
    }

    // and the merged index identifier that the caches use for this event
    const mergedIndexIdentifier = changedFeedbackEvent.itemDefinition + "." +
      changedFeedbackEvent.id + "." + (changedFeedbackEvent.version || "");

    // now we can get ready to pipe the event into redis
    // we do not use an instance group id because
    // these changes are not given by the cache itself
    const event: IRedisEvent = {
      event: changedFeedbackEvent,
      serverInstanceGroupId: null,
      source: "global",
      mergedIndexIdentifier,
      type: CHANGED_FEEDBACK_EVENT,
    }

    // if the data is complete, the data of the event
    // can be passed
    if (dataIsComplete && action !== "deleted") {
      event.data = row;
    } else if (action === "deleted") {
      event.data = null;
    }

    // publish the event
    this.redisPub.redisClient.publish(mergedIndexIdentifier, JSON.stringify(event));

    // and let's return this information about the row
    return {
      row,
      lastModified,
      moduleQualifiedPathName: moduleName,
      itemQualifiedPathName: row.type,
    };
  }

  private async informChangeOnRowsElasticOnly(
    rows: ISQLTableRowValue[],
    action: "created" | "deleted" | "modified",
    elasticLanguageOverride: string,
    rowDataIsComplete: boolean,
  ) {
    const [completedRows, newRowDataIsComplete] = rowDataIsComplete || action === "deleted" ? [rows, rowDataIsComplete] : await this.completeRowData(rows);
    completedRows.forEach(async (r) => {
      try {
        await this.informChangeOnRowElastic(r, action, elasticLanguageOverride, newRowDataIsComplete, false)
      } catch { }
    });
  }

  /**
   * Actually does the job on informing changes in the rows
   * this function calls the changed mechanism and then does
   * the updates for all the searches that might be occuring inside
   * the clients that are related to those rows
   * 
   * @param rows the rows in question
   * @param action what happened to the rows
   * @param rowDataIsComplete whether the data is complete
   */
  private async informChangeOnRows(
    rows: ISQLTableRowValue[],
    action: "created" | "deleted" | "modified",
    elasticLanguageOverride: string,
    rowDataIsComplete: boolean,
  ) {
    const [completedRows, newRowDataIsComplete] = rowDataIsComplete || action === "deleted" ? [rows, rowDataIsComplete] : await this.completeRowData(rows);
    // first we call to change every single row so that the changed events propagate
    const processedChanges = (await Promise.all(completedRows.map((r) => this.informChangeOnRow(r, action, elasticLanguageOverride, newRowDataIsComplete)))).filter((r) => r !== null);

    // now we can grab where we are putting the records for searches, depending on what occured to these rows
    const recordsLocation = action === "deleted" ? "deletedRecords" : (action === "created" ? "createdRecords" : "modifiedRecords");

    // and let's start collecting all the events that we need to trigger about these records
    // because we have both parented and owned events, we will start collecting them
    const collectedOwned: { [key: string]: IOwnedSearchRecordsEvent } = {};
    const collectedParented: { [key: string]: IParentedSearchRecordsEvent } = {};
    const collectedOwnedParented: { [key: string]: IOwnedParentedSearchRecordsEvent } = {};
    const collectedProperty: { [key: string]: IPropertySearchRecordsEvent } = {};

    // we will loop on the changes
    processedChanges.forEach((c) => {
      // this is our record
      const record = {
        id: c.row.id,
        last_modified: c.lastModified,
        type: c.row.type,
        version: c.row.version || null,
      };

      // for the creator one
      if (c.row.created_by !== UNSPECIFIED_OWNER) {
        // these are the cache index identifiers for the module and item based search
        const ownedMergedIndexIdentifierOnItem = generateOwnedSearchMergedIndexIdentifier(
          c.itemQualifiedPathName,
          c.row.created_by,
        );
        const ownedMergedIndexIdentifierOnModule = generateOwnedSearchMergedIndexIdentifier(
          c.moduleQualifiedPathName,
          c.row.created_by,
        );

        // if we don't have an event for these, we create them
        if (!collectedOwned[ownedMergedIndexIdentifierOnItem]) {
          collectedOwned[ownedMergedIndexIdentifierOnItem] = {
            createdBy: c.row.created_by,
            qualifiedPathName: c.itemQualifiedPathName,
            newRecords: [],
            lostRecords: [],
            modifiedRecords: [],
            createdRecords: [],
            deletedRecords: [],
            newLastModified: null,
          }
        }
        if (!collectedOwned[ownedMergedIndexIdentifierOnModule]) {
          collectedOwned[ownedMergedIndexIdentifierOnModule] = {
            createdBy: c.row.created_by,
            qualifiedPathName: c.moduleQualifiedPathName,
            newRecords: [],
            lostRecords: [],
            modifiedRecords: [],
            createdRecords: [],
            deletedRecords: [],
            newLastModified: null,
          }
        }

        // we add it at the right place
        collectedOwned[ownedMergedIndexIdentifierOnItem][recordsLocation].push(record);
        collectedOwned[ownedMergedIndexIdentifierOnModule][recordsLocation].push(record);
      }

      // now for parenting, if we have a parent
      const oldParentId = typeof c.row.OLD_parent_id !== "undefined" ? c.row.OLD_parent_id : c.row.parent_id;
      const oldParentType = typeof c.row.OLD_parent_type !== "undefined" ? c.row.OLD_parent_type : c.row.parent_type;
      const oldParentVersion = typeof c.row.OLD_parent_version !== "undefined" ? c.row.OLD_parent_version : c.row.parent_version;
      const isReparent = c.row.parent_id !== oldParentId || c.row.parent_version !== oldParentVersion || c.row.parent_type !== oldParentType;

      if (c.row.parent_id || oldParentId) {
        // equally we build the cache identifiers for the parented searches both by module and by item
        const parentedMergedIndexIdentifierOnItem = generateParentedSearchMergedIndexIdentifier(
          c.itemQualifiedPathName,
          c.row.parent_type,
          c.row.parent_id,
          c.row.parent_version,
        );
        const parentedMergedIndexIdentifierOnModule = generateParentedSearchMergedIndexIdentifier(
          c.moduleQualifiedPathName,
          c.row.parent_type,
          c.row.parent_id,
          c.row.parent_version,
        );

        // and equally create the collection
        if (!collectedParented[parentedMergedIndexIdentifierOnItem]) {
          collectedParented[parentedMergedIndexIdentifierOnItem] = {
            parentId: c.row.parent_id,
            parentType: c.row.parent_type,
            parentVersion: c.row.parent_version || null,
            qualifiedPathName: c.itemQualifiedPathName,
            newRecords: [],
            lostRecords: [],
            modifiedRecords: [],
            createdRecords: [],
            deletedRecords: [],
            newLastModified: null,
          }
        }
        if (!collectedParented[parentedMergedIndexIdentifierOnModule]) {
          collectedParented[parentedMergedIndexIdentifierOnModule] = {
            parentId: c.row.parent_id,
            parentType: c.row.parent_type,
            parentVersion: c.row.parent_version || null,
            qualifiedPathName: c.moduleQualifiedPathName,
            newRecords: [],
            lostRecords: [],
            modifiedRecords: [],
            createdRecords: [],
            deletedRecords: [],
            newLastModified: null,
          }
        }

        // and we add it to the parented list
        if (!isReparent) {
          collectedParented[parentedMergedIndexIdentifierOnItem][recordsLocation].push(record);
          collectedParented[parentedMergedIndexIdentifierOnModule][recordsLocation].push(record);
        } else {
          // we add to the new records because we have reparented
          if (c.row.parent_id) {
            collectedParented[parentedMergedIndexIdentifierOnItem].newRecords.push(record);
            collectedParented[parentedMergedIndexIdentifierOnModule].newRecords.push(record);
          }

          if (oldParentId) {
            const oldparentedMergedIndexIdentifierOnItem = generateParentedSearchMergedIndexIdentifier(
              c.itemQualifiedPathName,
              oldParentType,
              oldParentId,
              oldParentVersion,
            );

            const oldParentedMergedIndexIdentifierOnModule = generateParentedSearchMergedIndexIdentifier(
              c.moduleQualifiedPathName,
              oldParentType,
              oldParentId,
              oldParentVersion,
            );

            if (!collectedParented[oldparentedMergedIndexIdentifierOnItem]) {
              collectedParented[oldparentedMergedIndexIdentifierOnItem] = {
                parentId: oldParentId,
                parentType: oldParentType,
                parentVersion: oldParentVersion || null,
                qualifiedPathName: c.itemQualifiedPathName,
                newRecords: [],
                lostRecords: [],
                modifiedRecords: [],
                createdRecords: [],
                deletedRecords: [],
                newLastModified: null,
              }
            }
            if (!collectedParented[oldParentedMergedIndexIdentifierOnModule]) {
              collectedParented[oldParentedMergedIndexIdentifierOnModule] = {
                parentId: oldParentId,
                parentType: oldParentType,
                parentVersion: oldParentVersion || null,
                qualifiedPathName: c.moduleQualifiedPathName,
                newRecords: [],
                lostRecords: [],
                modifiedRecords: [],
                createdRecords: [],
                deletedRecords: [],
                newLastModified: null,
              }
            }

            collectedParented[oldparentedMergedIndexIdentifierOnItem].lostRecords.push(record);
            collectedParented[oldParentedMergedIndexIdentifierOnModule].lostRecords.push(record);
          }
        }
      }

      // now for parenting, if we have a parent
      if ((c.row.parent_id || oldParentId) && c.row.created_by !== UNSPECIFIED_OWNER) {
        // equally we build the cache identifiers for the parented searches both by module and by item
        const ownedParentedMergedIndexIdentifierOnItem = generateOwnedParentedSearchMergedIndexIdentifier(
          c.itemQualifiedPathName,
          c.row.created_by,
          c.row.parent_type,
          c.row.parent_id,
          c.row.parent_version,
        );
        const ownedParentedMergedIndexIdentifierOnModule = generateOwnedParentedSearchMergedIndexIdentifier(
          c.moduleQualifiedPathName,
          c.row.created_by,
          c.row.parent_type,
          c.row.parent_id,
          c.row.parent_version,
        );

        // and equally create the collection
        if (!collectedOwnedParented[ownedParentedMergedIndexIdentifierOnItem]) {
          collectedOwnedParented[ownedParentedMergedIndexIdentifierOnItem] = {
            parentId: c.row.parent_id,
            createdBy: c.row.created_by,
            parentType: c.row.parent_type,
            parentVersion: c.row.parent_version || null,
            qualifiedPathName: c.itemQualifiedPathName,
            newRecords: [],
            lostRecords: [],
            modifiedRecords: [],
            createdRecords: [],
            deletedRecords: [],
            newLastModified: null,
          }
        }
        if (!collectedOwnedParented[ownedParentedMergedIndexIdentifierOnModule]) {
          collectedOwnedParented[ownedParentedMergedIndexIdentifierOnModule] = {
            parentId: c.row.parent_id,
            createdBy: c.row.created_by,
            parentType: c.row.parent_type,
            parentVersion: c.row.parent_version || null,
            qualifiedPathName: c.moduleQualifiedPathName,
            newRecords: [],
            lostRecords: [],
            modifiedRecords: [],
            createdRecords: [],
            deletedRecords: [],
            newLastModified: null,
          }
        }

        if (!isReparent) {
          // and we add it to the parented list
          collectedOwnedParented[ownedParentedMergedIndexIdentifierOnItem][recordsLocation].push(record);
          collectedOwnedParented[ownedParentedMergedIndexIdentifierOnModule][recordsLocation].push(record);
        } else {
          if (c.row.parent_id) {
            collectedOwnedParented[ownedParentedMergedIndexIdentifierOnItem].newRecords.push(record);
            collectedOwnedParented[ownedParentedMergedIndexIdentifierOnModule].newRecords.push(record);
          }

          if (oldParentId) {
            const oldOwnedParentedMergedIndexIdentifierOnItem = generateOwnedParentedSearchMergedIndexIdentifier(
              c.itemQualifiedPathName,
              c.row.created_by,
              oldParentType,
              oldParentId,
              oldParentVersion,
            );
            const oldOwnedParentedMergedIndexIdentifierOnModule = generateOwnedParentedSearchMergedIndexIdentifier(
              c.moduleQualifiedPathName,
              c.row.created_by,
              oldParentType,
              oldParentId,
              oldParentVersion,
            );

            if (!collectedOwnedParented[oldOwnedParentedMergedIndexIdentifierOnItem]) {
              collectedOwnedParented[oldOwnedParentedMergedIndexIdentifierOnItem] = {
                parentId: oldParentId,
                createdBy: c.row.created_by,
                parentType: oldParentType,
                parentVersion: oldParentVersion || null,
                qualifiedPathName: c.itemQualifiedPathName,
                newRecords: [],
                lostRecords: [],
                modifiedRecords: [],
                createdRecords: [],
                deletedRecords: [],
                newLastModified: null,
              }
            }
            if (!collectedOwnedParented[oldOwnedParentedMergedIndexIdentifierOnModule]) {
              collectedOwnedParented[oldOwnedParentedMergedIndexIdentifierOnModule] = {
                parentId: oldParentId,
                createdBy: c.row.created_by,
                parentType: oldParentType,
                parentVersion: oldParentVersion || null,
                qualifiedPathName: c.moduleQualifiedPathName,
                newRecords: [],
                lostRecords: [],
                modifiedRecords: [],
                createdRecords: [],
                deletedRecords: [],
                newLastModified: null,
              }
            }

            collectedOwnedParented[oldOwnedParentedMergedIndexIdentifierOnItem].lostRecords.push(record);
            collectedOwnedParented[oldOwnedParentedMergedIndexIdentifierOnModule].lostRecords.push(record);
          }
        }
      }

      const idef = this.root.registry[c.itemQualifiedPathName] as ItemDefinition;
      idef.getAllPropertyDefinitionsAndExtensions().filter((p) => p.isTracked()).forEach((trackedProperty) => {
        const currentValue = c.row[trackedProperty.getId()];
        const oldValue = c.row["OLD_" + trackedProperty.getId()] || currentValue;
        const isReproperty = oldValue !== currentValue;

        // equally we build the cache identifiers for the parented searches both by module and by item
        const propertyMergedIndexIdentifierOnItem = generatePropertySearchMergedIndexIdentifier(
          c.itemQualifiedPathName,
          trackedProperty.getId(),
          currentValue,
        );
        const propertyMergedIndexIdentifierOnModule = generatePropertySearchMergedIndexIdentifier(
          c.moduleQualifiedPathName,
          trackedProperty.getId(),
          currentValue,
        );

        // and equally create the collection
        if (!collectedProperty[propertyMergedIndexIdentifierOnItem]) {
          collectedProperty[propertyMergedIndexIdentifierOnItem] = {
            propertyId: trackedProperty.getId(),
            propertyValue: currentValue,
            qualifiedPathName: c.itemQualifiedPathName,
            newRecords: [],
            lostRecords: [],
            modifiedRecords: [],
            createdRecords: [],
            deletedRecords: [],
            newLastModified: null,
          }
        }
        if (!collectedProperty[propertyMergedIndexIdentifierOnModule]) {
          collectedProperty[propertyMergedIndexIdentifierOnModule] = {
            propertyId: trackedProperty.getId(),
            propertyValue: currentValue,
            qualifiedPathName: c.moduleQualifiedPathName,
            newRecords: [],
            lostRecords: [],
            modifiedRecords: [],
            createdRecords: [],
            deletedRecords: [],
            newLastModified: null,
          }
        }

        if (!isReproperty) {
          // and we add it to the parented list
          collectedProperty[propertyMergedIndexIdentifierOnItem][recordsLocation].push(record);
          collectedProperty[propertyMergedIndexIdentifierOnModule][recordsLocation].push(record);
        } else {
          if (currentValue) {
            collectedProperty[propertyMergedIndexIdentifierOnItem].newRecords.push(record);
            collectedProperty[propertyMergedIndexIdentifierOnModule].newRecords.push(record);
          }

          if (oldValue) {
            // equally we build the cache identifiers for the parented searches both by module and by item
            const oldPropertyMergedIndexIdentifierOnItem = generatePropertySearchMergedIndexIdentifier(
              c.itemQualifiedPathName,
              trackedProperty.getId(),
              oldValue,
            );
            const oldPropertyMergedIndexIdentifierOnModule = generatePropertySearchMergedIndexIdentifier(
              c.moduleQualifiedPathName,
              trackedProperty.getId(),
              oldValue,
            );

            if (!collectedProperty[oldPropertyMergedIndexIdentifierOnItem]) {
              collectedProperty[oldPropertyMergedIndexIdentifierOnItem] = {
                propertyId: trackedProperty.getId(),
                propertyValue: oldValue,
                qualifiedPathName: c.itemQualifiedPathName,
                newRecords: [],
                lostRecords: [],
                modifiedRecords: [],
                createdRecords: [],
                deletedRecords: [],
                newLastModified: null,
              }
            }
            if (!collectedProperty[oldPropertyMergedIndexIdentifierOnModule]) {
              collectedProperty[oldPropertyMergedIndexIdentifierOnModule] = {
                propertyId: trackedProperty.getId(),
                propertyValue: oldValue,
                qualifiedPathName: c.moduleQualifiedPathName,
                newRecords: [],
                lostRecords: [],
                modifiedRecords: [],
                createdRecords: [],
                deletedRecords: [],
                newLastModified: null,
              }
            }

            collectedProperty[oldPropertyMergedIndexIdentifierOnItem].lostRecords.push(record);
            collectedProperty[oldPropertyMergedIndexIdentifierOnModule].lostRecords.push(record);
          }
        }
      });
    });

    // now we can start emitting these events, first with the owned ones
    Object.keys(collectedOwned).forEach((mergedIndexIdentifier) => {
      // grab the event
      const ownedEvent = collectedOwned[mergedIndexIdentifier];
      // we set our last modified date now from the records
      ownedEvent.newLastModified = findLastRecordDate(
        "max",
        "last_modified",
        ownedEvent.newRecords,
        ownedEvent.modifiedRecords,
        ownedEvent.lostRecords,
        ownedEvent.deletedRecords,
        ownedEvent.createdRecords,
      );

      const redisEvent: IRedisEvent = {
        event: ownedEvent,
        serverInstanceGroupId: null,
        source: "global",
        type: OWNED_SEARCH_RECORDS_EVENT,
        mergedIndexIdentifier,
      };

      this.redisPub.redisClient.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
    });

    // now with the parented ones
    Object.keys(collectedParented).forEach((mergedIndexIdentifier) => {
      // grab the event
      const parentedEvent = collectedParented[mergedIndexIdentifier];
      // we set our last modified date now from the records
      parentedEvent.newLastModified = findLastRecordDate(
        "max",
        "last_modified",
        parentedEvent.newRecords,
        parentedEvent.modifiedRecords,
        parentedEvent.lostRecords,
        parentedEvent.deletedRecords,
        parentedEvent.createdRecords,
      );

      const redisEvent: IRedisEvent = {
        event: parentedEvent,
        serverInstanceGroupId: null,
        source: "global",
        type: PARENTED_SEARCH_RECORDS_EVENT,
        mergedIndexIdentifier,
      };

      this.redisPub.redisClient.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
    });

    // now with the parented ones
    Object.keys(collectedOwnedParented).forEach((mergedIndexIdentifier) => {
      // grab the event
      const ownedParentedEvent = collectedOwnedParented[mergedIndexIdentifier];
      // we set our last modified date now from the records
      ownedParentedEvent.newLastModified = findLastRecordDate(
        "max",
        "last_modified",
        ownedParentedEvent.newRecords,
        ownedParentedEvent.modifiedRecords,
        ownedParentedEvent.lostRecords,
        ownedParentedEvent.deletedRecords,
        ownedParentedEvent.createdRecords,
      );

      const redisEvent: IRedisEvent = {
        event: ownedParentedEvent,
        serverInstanceGroupId: null,
        source: "global",
        type: OWNED_PARENTED_SEARCH_RECORDS_EVENT,
        mergedIndexIdentifier,
      };

      this.redisPub.redisClient.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
    });

    // now with the parented ones
    Object.keys(collectedProperty).forEach((mergedIndexIdentifier) => {
      // grab the event
      const propertyEvent = collectedProperty[mergedIndexIdentifier];
      // we set our last modified date now from the records
      propertyEvent.newLastModified = findLastRecordDate(
        "max",
        "last_modified",
        propertyEvent.newRecords,
        propertyEvent.modifiedRecords,
        propertyEvent.lostRecords,
        propertyEvent.deletedRecords,
        propertyEvent.createdRecords,
      );

      const redisEvent: IRedisEvent = {
        event: propertyEvent,
        serverInstanceGroupId: null,
        source: "global",
        type: PROPERTY_SEARCH_RECORDS_EVENT,
        mergedIndexIdentifier,
      };

      this.redisPub.redisClient.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
    });


    // all events have been published
  }

  /**
   * Informs rows have changed in the database and as such all clients and instances
   * need to update its cache, this will affect all the way to each one of the singular clients
   * as it propagates database changes
   * 
   * Please make sure that you have updated the last_modified change in each one of the rows
   * you have modified before feeding them here otherwise while active clients will properly
   * update, inactive clients will fail to realize there has been a change once they ask
   * for the last modified signature
   * 
   * Ensure each row that you pass provides at least the following data (otherwise it will fail)
   * 
   * id
   * version
   * type
   * created_by
   * parent_id
   * parent_type
   * parent_version
   * last_modified
   * 
   * If your data is complete (recommended) that is, both the module and the item table have been
   * joined, then the changes can be propagated more efficiently as the caches won't have to reach
   * for the database for an updated value.
   * 
   * @param rows the rows to inform a change on
   * @param elasticLanguageOverride the language override, null is a valid value, please provide undefined for unspecified
   * @param rowDataIsComplete whether the rows contain complete data
   */
  public async informRowsHaveBeenModified(rows: ISQLTableRowValue[], elasticLanguageOverride?: string, rowDataIsComplete?: boolean) {
    return await this.informChangeOnRows(rows, "modified", elasticLanguageOverride, rowDataIsComplete);
  }
  public async informRowsHaveBeenModifiedElasticOnly(rows: ISQLTableRowValue[], elasticLanguageOverride?: string, rowDataIsComplete?: boolean) {
    return this.informChangeOnRowsElasticOnly(rows, "modified", elasticLanguageOverride, rowDataIsComplete);
  }

  /**
   * Informs rows have been deleted in the database and as such all clients and instances
   * need to update its cache, this will affect all the way to each one of the singular clients
   * as it propagates database changes
   * 
   * This function will also add the deleted rows into the deleted registry
   * 
   * Ensure each row that you pass provides at least the following data (otherwise it will fail)
   * 
   * id
   * version
   * type
   * created_by
   * parent_id
   * parent_type
   * parent_version
   * last_modified
   * 
   * @param rows the rows to inform a change on
   */
  public async informRowsHaveBeenDeleted(rows: ISQLTableRowValue[]) {
    // on delete the data being complete is irrelevant as the value that
    // is passed to data is always null
    return await this.informChangeOnRows(rows, "deleted", null, false);
  }
  public async informRowsHaveBeenDeletedElasticOnly(rows: ISQLTableRowValue[]) {
    // on delete the data being complete is irrelevant as the value that
    // is passed to data is always null
    return this.informChangeOnRowsElasticOnly(rows, "deleted", null, false);
  }

  /**
   * Informs rows have been added in the database and as such all clients and instances
   * need to update its cache, this will affect all the way to each one of the singular clients
   * as it propagates database changes
   * 
   * Ensure each row that you pass provides at least the following data (otherwise it will fail)
   * 
   * id
   * version
   * type
   * created_by
   * parent_id
   * parent_type
   * parent_version
   * last_modified
   * 
   * If your data is complete (recommended) that is, both the module and the item table have been
   * joined, then the changes can be propagated more efficiently as the caches won't have to reach
   * for the database for the value
   * 
   * @param rows the rows to inform a change on
   * @param elasticLanguageOverride the language override, null is a valid value, please provide undefined for unspecified
   * @param rowDataIsComplete whether the rows contain complete data
   */
  public async informRowsHaveBeenAdded(rows: ISQLTableRowValue[], elasticLanguageOverride?: string, rowDataIsComplete?: boolean) {
    return await this.informChangeOnRows(rows, "created", elasticLanguageOverride, rowDataIsComplete);
  }
  public async informRowsHaveBeenAddedElasticOnly(rows: ISQLTableRowValue[], elasticLanguageOverride?: string, rowDataIsComplete?: boolean) {
    return this.informChangeOnRowsElasticOnly(rows, "created", elasticLanguageOverride, rowDataIsComplete);
  }

  /**
   * A private helper function to use a item definition
   * and a set builder in order to update the dictionaries
   * of given properties
   * 
   * @param itemDefinition 
   * @param setBuilder 
   * @param dictionary 
   * @param propertyOrInclude 
   * @param property 
   * @returns 
   */
  private changeRowLanguageFn(
    itemDefinitionOrModule: ItemDefinition | Module,
    setBuilder: SetBuilder,
    language: string,
    dictionary: string,
    propertyOrInclude: string,
    property: string,
  ) {
    const actualProperty = property || propertyOrInclude;
    const actualInclude = property ? propertyOrInclude : null;

    if (!actualProperty) {
      return;
    }

    let prefix: string = "";
    let propertyObj: PropertyDefinition;
    let includeObj: Include = null;
    if (actualInclude && itemDefinitionOrModule instanceof ItemDefinition) {
      includeObj = (itemDefinitionOrModule as ItemDefinition).getIncludeFor(actualInclude);
      prefix = includeObj.getPrefixedQualifiedIdentifier();
      propertyObj = includeObj.getSinkingPropertyFor(actualProperty);
    } else {
      if (itemDefinitionOrModule instanceof ItemDefinition) {
        propertyObj = itemDefinitionOrModule.getPropertyDefinitionFor(actualProperty, true);
      } else {
        propertyObj = itemDefinitionOrModule.getPropExtensionFor(actualProperty);
      }
    }

    if (propertyObj.getPropertyDefinitionDescription().sqlRedoDictionaryIndex) {
      const redoIndexSetter = propertyObj.getPropertyDefinitionDescription().sqlRedoDictionaryIndex({
        id: actualProperty,
        itemDefinition: itemDefinitionOrModule instanceof ItemDefinition ? itemDefinitionOrModule : null,
        newDictionary: dictionary,
        newLanguage: language,
        prefix,
        property: propertyObj,
        include: includeObj,
      });

      if (redoIndexSetter) {
        setBuilder.setMany(redoIndexSetter);
      }
    }
  }

  public async performRawDBDelete(
    itemDefinitionOrModule: ItemDefinition | Module | string,
    id: string,
    version: string,
    deleter: {
      dangerousUseSilentMode?: boolean;
    },
  ) {
    // TODO must be similar to the select builder anyway
    const itemDefinitionOrModuleInstance = typeof itemDefinitionOrModule === "string" ?
      this.root.registry[itemDefinitionOrModule] :
      itemDefinitionOrModule;
  }

  public async performBatchRawDBDelete(
    itemDefinitionOrModule: ItemDefinition | Module | string,
    deleter: {
      select: (builder: SelectBuilder) => void;
      preventJoin?: boolean;
      dangerousUseSilentMode?: boolean;
    },
  ) {
    // TODO there is no delete builder, must be similar to the select builder anyway
    const itemDefinitionOrModuleInstance = typeof itemDefinitionOrModule === "string" ?
      this.root.registry[itemDefinitionOrModule] :
      itemDefinitionOrModule;
  }

  /**
   * Performs a raw db insert where the values of the database rows
   * are manually inserted value by value in a raw insert event
   * 
   * It is a rather advanced method to use as every row value to be inserted
   * has to be specified and it is easy to mess up
   * 
   * refer to processGQLValue in order to aid yourself a little when doing a raw db
   * insert
   * 
   * TODO returning builder access in order to modify what to return
   * 
   * @param item 
   * @param inserter 
   * @returns 
   */
  public async performRawDBInsert(
    item: ItemDefinition | string,
    inserter: {
      values: Array<
        {
          moduleTableInsert: IManyValueType;
          itemTableInsert: IManyValueType;
        }
      >;

      /**
       * Does not inform of updates or anything to the clusters
       * or elastic or anything at all, does not modify the last modified
       * signature
       */
      dangerousUseSilentMode?: boolean;
      /**
       * Forces a language update to the given language, will ignore silent
       * mode if provided
       */
      dangerousForceElasticLangUpdateTo?: string;
      /**
       * Will update search indices anyway
       */
      dangerousForceElasticUpdate?: boolean;
    }
  ) {
    inserter.values.forEach((v) => {
      if (!v.moduleTableInsert.container_id) {
        throw new Error("moduleTableInsert is missing container id");
      }
    });

    const itemDefinition = item instanceof ItemDefinition ? item : this.root.registry[item] as ItemDefinition;
    const mod = itemDefinition.getParentModule();

    const moduleTable = mod.getQualifiedPathName();
    const selfTable = itemDefinition.getQualifiedPathName();

    const transactionFn = async (transactingDatabase: DatabaseConnection) => {
      return await Promise.all(inserter.values.map(async (value) => {
        const insertQuery = transactingDatabase.getInsertBuilder().table(moduleTable);

        const modValue = {
          ...value.moduleTableInsert,
        };

        modValue.type = itemDefinition.getQualifiedPathName();
        modValue.created_at = [
          "NOW()",
          [],
        ];
        modValue.last_modified = [
          "NOW()",
          [],
        ];
        modValue.created_by = modValue.created_by || UNSPECIFIED_OWNER;
        modValue.version = modValue.version || "";

        insertQuery.insert(modValue).returningBuilder.returningAll();

        const insertQueryValueModRes = await transactingDatabase.query(insertQuery);
        const insertQueryValueMod = insertQueryValueModRes.rows[0];

        const idefValue = {
          ...value.itemTableInsert
        };

        idefValue[CONNECTOR_SQL_COLUMN_ID_FK_NAME] = insertQueryValueMod.id;
        idefValue[CONNECTOR_SQL_COLUMN_VERSION_FK_NAME] = insertQueryValueMod.version;

        // so now we create the insert query
        const insertQueryIdef = transactingDatabase.getInsertBuilder().table(selfTable);
        insertQueryIdef.insert(idefValue).returningBuilder.returningAll();
        // so we call the qery
        const insertQueryValueIdef = await transactingDatabase.queryFirst(insertQueryIdef);

        // and we return the joined result
        return {
          ...insertQueryValueMod,
          ...insertQueryValueIdef,
        };
      }));
    };

    const allInsertedRows: ISQLTableRowValue[] = this.transacting ?
      await transactionFn(this.databaseConnection) :
      await this.databaseConnection.startTransaction(transactionFn);

    const result = allInsertedRows.map(convertVersionsIntoNullsWhenNecessary);

    if (!inserter.dangerousUseSilentMode) {
      if (this.transacting) {
        this.transactingQueue.push(this.informRowsHaveBeenAdded.bind(this, result, inserter.dangerousForceElasticLangUpdateTo, true));
      } else {
        await this.informRowsHaveBeenAdded(result, inserter.dangerousForceElasticLangUpdateTo, true);
      }
    } else if (typeof inserter.dangerousForceElasticLangUpdateTo !== "undefined" || inserter.dangerousForceElasticUpdate) {
      if (this.transacting) {
        this.transactingQueue.push(this.informRowsHaveBeenAddedElasticOnly.bind(this, result, inserter.dangerousForceElasticLangUpdateTo, true));
      } else {
        await this.informRowsHaveBeenAddedElasticOnly(result, inserter.dangerousForceElasticLangUpdateTo, true);
      }
    }

    return result;
  }

  private _retrieveRawDBSelect(
    itemDefinitionOrModule: ItemDefinition | Module | string,
    selecter: (builder: SelectBuilder) => void,
    options: {
      preventJoin?: boolean,
    } = {}
  ) {
    const itemDefinitionOrModuleInstance = typeof itemDefinitionOrModule === "string" ?
      this.root.registry[itemDefinitionOrModule] :
      itemDefinitionOrModule;

    if (!itemDefinitionOrModuleInstance) {
      if (typeof itemDefinitionOrModule === "string") {
        throw new Error(itemDefinitionOrModule + " does not exist, as it was used while querying");
      } else {
        throw new Error("Recieved undefined/null while querying");
      }
    }

    const builder = new SelectBuilder();

    if (itemDefinitionOrModuleInstance instanceof ItemDefinition && !options.preventJoin) {
      const moduleInQuestion = itemDefinitionOrModuleInstance.getParentModule();
      builder.fromBuilder.from(moduleInQuestion.getQualifiedPathName());
      builder.joinBuilder.join(itemDefinitionOrModuleInstance.getQualifiedPathName(), (ruleBuilder) => {
        ruleBuilder.onColumnEquals(CONNECTOR_SQL_COLUMN_ID_FK_NAME, "id");
        ruleBuilder.onColumnEquals(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "version");
      });
    } else {
      builder.fromBuilder.from(itemDefinitionOrModuleInstance.getQualifiedPathName());
    }

    selecter(builder);

    return builder;
  }

  /**
   * Declares a new cursor agains a select statment and does nothing about it
   * @param itemDefinitionOrModule 
   * @param cursorName 
   * @param selecter 
   * @param options 
   * @returns 
   */
  public async declareRawDBCursorSelect(
    itemDefinitionOrModule: ItemDefinition | Module | string,
    cursorName: string,
    selecter: (builder: SelectBuilder) => void,
    options: {
      preventJoin?: boolean,
    } = {}
  ) {
    const builder = this._retrieveRawDBSelect(itemDefinitionOrModule, selecter, options);
    const declare = new DeclareCursorBuilder(cursorName, builder);

    return await this.databaseConnection.query(declare);
  }

  /**
   * Fetches from a cursor that was already declared
   * @param cursorName 
   * @param fetcher 
   * @returns 
   */
  public async fetchFromRawDBCursor(
    cursorName: string,
    fetcher: (builder: FetchOrMoveFromCursorBuilder) => void,
  ): Promise<ISQLTableRowValue[]> {
    const builder = new FetchOrMoveFromCursorBuilder("FETCH", cursorName);
    fetcher(builder);
    return await this.databaseConnection.queryRows(builder);
  }

  /**
   * Moves from a cursor that was already declared
   * @param cursorName 
   * @param mover 
   * @returns 
   */
  public async moveFromRawDBCursor(
    cursorName: string,
    mover: (builder: FetchOrMoveFromCursorBuilder) => void,
  ) {
    const builder = new FetchOrMoveFromCursorBuilder("MOVE", cursorName);
    mover(builder);
    return await this.databaseConnection.query(builder);
  }

  /**
   * Removes a given cursor
   * @param cursorName 
   * @returns 
   */
  public async closeRawDBCursor(cursorName: string) {
    return await this.databaseConnection.query(new CloseCursorBuilder(cursorName));
  }

  /**
   * This generator peforms a cursos based raw db select
   * executing a select function batch by batch with a given
   * batch size that defaults to 100 until all records of the
   * select are consumed
   * 
   * Whenever retrieving the next value you can provide a boolean
   * on whether the process should continue or it should stop, you should always ensure
   * that either the entire rows are consumed or if you need to abruptly stop
   * the processing to pass false to the next iterator because otherwise
   * the cursor will remain in the database hogging memory
   * 
   * @param itemDefinitionOrModule 
   * @param selecter 
   * @param options 
   */
  public async *performRawDBCursorSelect(
    itemDefinitionOrModule: ItemDefinition | Module | string,
    selecter: (builder: SelectBuilder) => void,
    options: {
      preventJoin?: boolean,
      batchSize?: number,
    } = {}
  ): AsyncGenerator<ISQLTableRowValue[], void, boolean | undefined> {
    const cursorname = "cursor_" + uuid.v4().replace(/-/g, "");
    const batchSize = options.batchSize || 100;
    await this.declareRawDBCursorSelect(
      itemDefinitionOrModule,
      cursorname,
      selecter,
      options,
    );

    try {
      let currentBatch = await this.fetchFromRawDBCursor(cursorname, (b) => {
        b.forward(batchSize);
      });

      while (currentBatch.length) {
        const continueProcessing = yield currentBatch;
        // do not treat undefined or null to break
        if (continueProcessing === false) {
          break;
        }
        currentBatch = await this.fetchFromRawDBCursor(cursorname, (b) => {
          b.forward(batchSize);
        });
      }
    } catch (err) {
      try {
        await this.closeRawDBCursor(cursorname);
      } catch (err2) {
        logger.error({
          methodName: "performRawDBCursorSelect",
          className: "ItemizeRawDB",
          message: "Cursor has been orphaned",
          orphan: true,
          serious: true,
          err: err2,
          data: {
            cursorname,
          }
        });
      }

      logger.error({
        methodName: "performRawDBCursorSelect",
        className: "ItemizeRawDB",
        message: "Failed to perform cursor select",
        orphan: true,
        serious: true,
        err,
        data: {
          cursorname,
        }
      });

      throw err;
    }

    try {
      await this.closeRawDBCursor(cursorname);
    } catch (err2) {
      logger.error({
        methodName: "performRawDBCursorSelect",
        className: "ItemizeRawDB",
        message: "Cursor has been orphaned",
        orphan: true,
        serious: true,
        err: err2,
        data: {
          cursorname,
        }
      });
    }
  }

  /**
   * Provides a db query builder for the given item or a module
   * @param itemDefinitionOrModule the item or module
   * @param preventJoin when using an item, if you will not be using properties
   * that are in the module table, like id, parents, creators, and prop extensions
   * then you can prevent the join from happening
   */
  public async performRawDBSelect(
    itemDefinitionOrModule: ItemDefinition | Module | string,
    selecter: (builder: SelectBuilder) => void,
    options: {
      preventJoin?: boolean,
      useMemoryCache?: string,
      useMemoryCacheMs?: number,
    } = {}
  ): Promise<ISQLTableRowValue[]> {
    let waitingPromiseResolve: () => void = null;
    if (options.useMemoryCache && this.memCachedSelects[options.useMemoryCache]) {
      if (this.memCachedSelects[options.useMemoryCache].waitingPromise) {
        await this.memCachedSelects[options.useMemoryCache].waitingPromise;
      }

      if (this.memCachedSelects[options.useMemoryCache].err) {
        throw this.memCachedSelects[options.useMemoryCache].err;
      }

      return this.memCachedSelects[options.useMemoryCache].value;
    } else if (options.useMemoryCache) {
      this.memCachedSelects[options.useMemoryCache] = {
        ready: false,
        value: null,
        waitingPromise: new Promise((r) => {
          waitingPromiseResolve = r;
        }),
        err: null,
      }
    }

    const builder = this._retrieveRawDBSelect(itemDefinitionOrModule, selecter, options);

    let value: ISQLTableRowValue[];
    try {
      value = (await this.databaseConnection.queryRows(builder)).map(convertVersionsIntoNullsWhenNecessary);
    } catch (err) {
      if (options.useMemoryCache) {
        this.memCachedSelects[options.useMemoryCache].ready = true;
        this.memCachedSelects[options.useMemoryCache].err = err;

        setTimeout(() => {
          delete this.memCachedSelects[options.useMemoryCache];
        }, typeof options.useMemoryCacheMs !== "undefined" ? options.useMemoryCacheMs : 1000);

        if (waitingPromiseResolve) {
          waitingPromiseResolve();
        }
      }

      throw err;
    }

    if (options.useMemoryCache) {
      this.memCachedSelects[options.useMemoryCache].ready = true;
      this.memCachedSelects[options.useMemoryCache].value = value;

      setTimeout(() => {
        delete this.memCachedSelects[options.useMemoryCache];
      }, typeof options.useMemoryCacheMs !== "undefined" ? options.useMemoryCacheMs : 1000);

      if (waitingPromiseResolve) {
        waitingPromiseResolve();
      }
    }

    return value;
  }

  /**
   * Retrieves a raw db select query in order to be used to assign values in updates
   * @param itemDefinitionOrModule 
   * @param selecter 
   * @param preventJoin 
   * @returns 
   */
  public retrieveRawDBSelect(
    itemDefinitionOrModule: ItemDefinition | Module | string,
    selecter: (builder: SelectBuilder) => void,
    options: {
      preventJoin?: boolean,
    } = {}
  ): [string, BasicBindingType[]] {
    const builder = this._retrieveRawDBSelect(itemDefinitionOrModule, selecter, options);

    return [
      "(" + builder.compile() + ")",
      builder.getBindings(),
    ];
  }

  /**
   * Note this is a slow method, better suited to use and forget
   * 
   * Creates a cached raw db select operation that executes
   * in the given interval
   * 
   * The reason for this is calculation of resources that are expensive and we would like to resolve only every so often
   * for example let's say we want to count the number of users but not be quite accurate
   * 
   * For example let's say we add the following function in our global manager when we initialize the server
   * 
   * initializeServer({...}, {...}, {globalManagerInitialServerDataFunction: (manager) => {
   *   manager.rawDB.createGloballyCachedRawDBSelect("NUMBER_OF_USERS", "users/user", (b) => b.select("COUNT(*)"), true);
   * }})
   * 
   * And then in and endpoint you may create in the router in order to get that information for the rows selected you may
   * 
   * appData.rawDB.retrieveGloballyCachedRawDBSelect("NUMBER_OF_USERS")
   * 
   * will yield the cached result exactly as it would do a raw db select
   * 
   * NOTE this method is slow, because of the way it has to function to ensure that the cached raw db select is created
   * and mantained by whichever instance created it first, it will send a message over the global network and then wait
   * to see if anything else is handling the same request with the same unique id, if there is, it will not create anything,
   * use doNotProbe if you want to create it regardless which will considerably speed it up
   */
  public async createGloballyCachedRawDBSelect(
    uniqueID: string,
    itemDefinitionOrModule: ItemDefinition | Module | string,
    selecter: (builder: SelectBuilder) => void,
    preventJoin?: boolean,
    options?: { updateInterval?: number, doNotProbe?: boolean, expire?: number },
  ): Promise<void> {
    // already exists, overwriting behaviour
    if (this.cachedSelects[uniqueID]) {
      this.cachedSelects[uniqueID].itemDefinitionOrModule = itemDefinitionOrModule;
      this.cachedSelects[uniqueID].preventJoin = preventJoin;
      this.cachedSelects[uniqueID].selecter = selecter;
      this.cachedSelects[uniqueID].updateInterval = options ? (options.updateInterval || null) : null;
      this.cachedSelects[uniqueID].expiresAt = options && options.expire ? ((new Date()).getTime()) + options.expire : null;
    } else {
      const subscribeLocation = CACHED_SELECTS_LOCATION_GLOBAL + "." + uniqueID;
      if (!options.doNotProbe) {
        // now we need to check if there's anything handling this request already
        // for that we need to subscribe to the probe of this temporarily
        const subscribeProbeLocation = "PROBE." + subscribeLocation;
        const timeout = 5000;

        this.redisSub.redisClient.subscribe(subscribeProbeLocation);

        const handled = await new Promise<boolean>((resolve) => {
          // the message handler
          const messageHandler = (channel: string, message: string) => {
            // received a correct probe we were waiting for
            if (channel === subscribeProbeLocation) {
              this.redisSub.redisClient.removeListener("message", messageHandler);
              resolve(true);
              return;
            }
          }

          // add the probe expecter
          this.redisSub.redisClient.on("message", messageHandler);

          // wait for the timeout to see if we get any response in the timeframe
          setTimeout(() => {
            this.redisSub.redisClient.removeListener("message", messageHandler);
            resolve(false);
          }, timeout);
        });

        // it is already handled so it will not be added
        // here
        if (handled) {
          return;
        }
      }

      // otherwise we register it with this instance
      this.cachedSelects[uniqueID] = {
        updateInterval: options ? (options.updateInterval || null) : null,
        selecter,
        preventJoin,
        itemDefinitionOrModule,
        intervalObject: null,
        uniqueID,
        expiresAt: options && options.expire ? ((new Date()).getTime()) + options.expire : null,
      }

      // and now we subscribe to listening to the events requesting to update
      // this cached select
      this.redisSub.redisClient.subscribe(subscribeLocation);

      // and we also update
      await this._updateCachedSelect(uniqueID, true);

      // and we are done
      return;
    }
  }

  /**
   * This is the function that handles the execution of the cached raw db select storage in global
   * redis
   * @param uniqueID 
   * @param throwErrors 
   * @returns 
   */
  private async _updateCachedSelect(uniqueID: string, throwErrors?: boolean): Promise<ISQLTableRowValue[]> {
    if (!this.cachedSelects[uniqueID]) {
      logger.error({
        methodName: "_updateCachedSelect",
        className: "ItemizeRawDB",
        message: "Could not execute update query for " + uniqueID + " as it doesn't exist",
      });
      return;
    }

    try {
      const value = await this.performRawDBSelect(
        this.cachedSelects[uniqueID].itemDefinitionOrModule,
        this.cachedSelects[uniqueID].selecter,
        {
          preventJoin: this.cachedSelects[uniqueID].preventJoin
        },
      );

      await this.redisGlobal.hset(CACHED_SELECTS_LOCATION_GLOBAL, uniqueID, JSON.stringify(value));

      if (this.cachedSelects[uniqueID].expiresAt) {
        const now = (new Date()).getTime();
        if (now >= this.cachedSelects[uniqueID].expiresAt) {
          await this.deleteGloballyCachedRawDBSelect(uniqueID);
          return value;
        }
      }

      if (this.cachedSelects[uniqueID].updateInterval) {
        this.cachedSelects[uniqueID].intervalObject =
          setTimeout(this._updateCachedSelect.bind(this, uniqueID), this.cachedSelects[uniqueID].updateInterval);
      }

      return value;
    } catch (err) {
      logger.error({
        methodName: "_updateCachedSelect",
        className: "ItemizeRawDB",
        serious: true,
        message: "Could not execute update query for " + uniqueID,
        err: err,
      });

      if (throwErrors) {
        throw err;
      }
    }
  }

  /**
   * Retrieves the raw db select that has been globally cached, given its unique id it will
   * provide the select results from that query
   * @param uniqueID 
   * @param options 
   * @returns 
   */
  public async retrieveGloballyCachedRawDBSelect(uniqueID: string, options?: { returnNullOnError?: boolean }): Promise<ISQLTableRowValue[]> {
    try {
      const valueRaw: string = await this.redisGlobal.hget(CACHED_SELECTS_LOCATION_GLOBAL, uniqueID);
      if (!valueRaw) {
        // it may be expired or have been removed from the cache for some reason
        // let's ping it just in case
        (async () => {
          try {
            await this.executeGloballyCachedRawDBSelect(uniqueID);
          } catch (err) {
          }
        });
        return null;
      }
      const valueParsed = JSON.parse(valueRaw);
      return valueParsed
    } catch (err) {
      logger.error({
        methodName: "_retrieveCachedSelect",
        className: "ItemizeRawDB",
        serious: true,
        message: "Could not execute retrieve query for " + uniqueID,
        err: err,
      });

      if (options.returnNullOnError) {
        return null;
      }

      throw err;
    }
  }

  /**
   * Executes a globally cached raw db select in order to keep it updated
   * in the cache
   * @param uniqueID 
   * @returns 
   */
  public async executeGloballyCachedRawDBSelect(uniqueID: string): Promise<void> {
    const event: IRedisEvent = {
      mergedIndexIdentifier: null,
      source: "global",
      serverInstanceGroupId: null,
      type: CACHED_SELECTS_LOCATION_GLOBAL,
      data: {
        uniqueID,
      },
    }
    return new Promise((resolve, reject) => {
      this.redisPub.redisClient.publish(CACHED_SELECTS_LOCATION_GLOBAL + "." + uniqueID, JSON.stringify(event), (err) => {
        if (err) {
          logger.error({
            methodName: "executeGloballyCachedRawDBSelect",
            className: "ItemizeRawDB",
            serious: true,
            message: "Could not send message to execute query for " + uniqueID,
            err: err,
          });
          reject(err);
          return;
        }

        resolve();
      });
    })
  }

  public async deleteGloballyCachedRawDBSelect(uniqueID: string) {
    if (this.cachedSelects[uniqueID]) {
      clearTimeout(this.cachedSelects[uniqueID].updateInterval);

      delete this.cachedSelects[uniqueID];

      try {
        await this.redisGlobal.hdel(CACHED_SELECTS_LOCATION_GLOBAL, uniqueID);
        this.redisSub.redisClient.unsubscribe(CACHED_SELECTS_LOCATION_GLOBAL + "." + uniqueID);
      } catch (err) {
        // we are okay with this passing since no errors should occur it is simply taking space
        logger.error({
          className: "ItemizeRawDB",
          methodName: "_deleteCachedRawDBSelect",
          message: "Attempted to delete cached raw db select for " + uniqueID +
            " but it failed at redis level",
          serious: true,
        });
      }

    } else {
      logger.error({
        className: "ItemizeRawDB",
        methodName: "_deleteCachedRawDBSelect",
        message: "Attempted to delete cached raw db select for " + uniqueID +
          " but this instance does not own or contain it",
      });
    }
  }

  private async handleIncomingMessage(channel: string, message: string) {
    try {
      const event: IRedisEvent = JSON.parse(message);
      if (event.source !== "global") {
        return;
      }

      if (event.type === CACHED_SELECTS_LOCATION_GLOBAL) {
        const uniqueID = event.data.uniqueID as string;

        // it is a probe and it doesn't actually want the data
        // it is checking whether there is something already handling this
        // unique id
        if (event.data.probe) {
          // tell it that it is actually being handled by echoing the message in the probe channel
          this.redisPub.redisClient.publish("PROBE." + CACHED_SELECTS_LOCATION_GLOBAL + "." + uniqueID, message)
          return;
        }

        this._updateCachedSelect(uniqueID);
      }
    } catch (err) {
      logger.error({
        className: "ItemizeRawDB",
        methodName: "handleIncomingMessage",
        message: "Received an invalid incoming message",
        data: {
          channel,
          message,
        },
        err,
        serious: true,
      });
    }
  }

  /**
   * Performs a raw db update for many rows
   * in the database this is a very powerful and quite
   * advanced method
   * 
   * @param item 
   * @param updater 
   */
  public async performBatchRawDBUpdate(
    item: ItemDefinition | string,
    updater: {
      // you only want to use where in here
      whereCriteriaSelector: (arg: WhereBuilder) => void;

      moduleTableUpdate?: IManyValueType;
      itemTableUpdate?: IManyValueType;
      // you only want to use set in these
      moduleTableUpdater?: (arg: SetBuilder, changeRowLanguage: changeRowLanguageFn) => void;
      itemTableUpdater?: (arg: SetBuilder, changeRowLanguage: changeRowLanguageFn) => void;
      /**
       * Does not inform of updates or anything to the clusters
       * or elastic or anything at all, does not modify the last modified
       * signature
       */
      dangerousUseSilentMode?: boolean;
      /**
       * Forces a language update to the given language, will ignore silent
       * mode if provided
       */
      dangerousForceElasticLangUpdateTo?: string;
      /**
       * Will update search indices anyway
       */
      dangerousForceElasticUpdate?: boolean;
    },
  ): Promise<ISQLTableRowValue[]> {
    if (
      !updater.moduleTableUpdate &&
      !updater.itemTableUpdate &&
      !updater.moduleTableUpdater &&
      !updater.itemTableUpdater
    ) {
      throw new Error("no module update and no item update was specified into the updater");
    }

    const itemDefinition = item instanceof ItemDefinition ? item : this.root.registry[item] as ItemDefinition;

    if (!itemDefinition || !(itemDefinition instanceof ItemDefinition)) {
      if (typeof item === "string" && !itemDefinition) {
        throw new Error(item + " does not exist, as it was used while batch updating");
      } else if (item instanceof Module) {
        throw new Error("Received an module for doing a batch update " + item.getQualifiedPathName());
      } else if (!item) {
        throw new Error("Recieved undefined/null for batch update");
      } else {
        throw new Error("Recieved unknown object for batch update");
      }
    }

    const mod = itemDefinition.getParentModule();

    const moduleTable = mod.getQualifiedPathName();
    const selfTable = itemDefinition.getQualifiedPathName();

    const withQuery = new WithBuilder();

    let potentialAffectedTrackedProperties: string[] = [];

    if (
      updater.dangerousUseSilentMode &&
      (!updater.moduleTableUpdate || Object.keys(updater.moduleTableUpdate).length === 0) &&
      !updater.moduleTableUpdater
    ) {
      const moduleSelectQuery = new SelectBuilder();
      moduleSelectQuery.selectAll().fromBuilder.from(moduleTable);
      moduleSelectQuery.joinBuilder.join(selfTable, (builder) => {
        builder.onColumnEquals("id", CONNECTOR_SQL_COLUMN_ID_FK_NAME);
        builder.onColumnEquals("version", CONNECTOR_SQL_COLUMN_VERSION_FK_NAME);
      })
      updater.whereCriteriaSelector(moduleSelectQuery.whereBuilder);
      withQuery.with("MTABLE", moduleSelectQuery);
    } else {
      const moduleUpdateQuery = new UpdateBuilder();
      moduleUpdateQuery.table(moduleTable);
      if (updater.moduleTableUpdate) {
        moduleUpdateQuery.setBuilder.setMany(updater.moduleTableUpdate);
      }

      updater.moduleTableUpdater &&
        updater.moduleTableUpdater(
          moduleUpdateQuery.setBuilder,
          this.changeRowLanguageFn.bind(this, itemDefinition, moduleUpdateQuery.setBuilder)
        );

      moduleUpdateQuery.setBuilder.knownAffectedColumns.forEach((affected) => {
        if (affected[0] === null && invalidManualUpdate.includes(affected[1])) {
          throw new Error("Cannot use a raw db update to modify the column " + affected[1]);
        }
      });

      // here we will update our last modified
      if (!updater.dangerousUseSilentMode) {
        moduleUpdateQuery.setBuilder.set(JSON.stringify("last_modified") + " = NOW()", [], "last_modified");
      }

      const basicModTracked = mod.getAllPropExtensions().filter((pExt) => pExt.isTracked()).map((pExt) => pExt.getId());

      const allModTracked = [
        "parent_id",
        "parent_type",
        "parent_version",
      ].concat(basicModTracked);

      // now we get all the potentially affected tracked properties that may have changed
      const potentialAffectedTrackedModProperties = moduleUpdateQuery.setBuilder.hasUnknownAffectedColumnExpression ? allModTracked : (
        allModTracked.filter((tracked) => moduleUpdateQuery.setBuilder.knownAffectedColumns.some(
          (affected) => affected[0] === null && affected[1] === tracked
        ))
      );

      potentialAffectedTrackedProperties = potentialAffectedTrackedModProperties;

      // now we may want to know the old values of these columnd
      // if they had happened to be affected as we have to know
      // what value they used to hold in order to trigger an update
      // to the old (eg. a reparent that a record was lost)
      // and to the new (eg. that a record was gained)
      if (potentialAffectedTrackedModProperties.length && !updater.dangerousUseSilentMode) {
        potentialAffectedTrackedModProperties.forEach((p) => {
          moduleUpdateQuery.returningBuilder.returningColumn("OLD_" + p);
        });
        moduleUpdateQuery.fromBuilder.fromSelect((b) => {
          b.fromBuilder.from(moduleTable);
          b.selectExpression("\"id\" \"OLD_id\"");
          b.selectExpression("\"version\" \"OLD_version\"");
          potentialAffectedTrackedModProperties.forEach((p) => {
            b.selectExpression(JSON.stringify(p) + " " + JSON.stringify("OLD_" + p));
          });
          updater.whereCriteriaSelector(b.whereBuilder);
          b.joinBuilder.join(selfTable, (builder) => {
            builder.onColumnEquals("id", CONNECTOR_SQL_COLUMN_ID_FK_NAME);
            builder.onColumnEquals("version", CONNECTOR_SQL_COLUMN_VERSION_FK_NAME);
          });
        }, "MOD_TABLE_OLD");
        moduleUpdateQuery.whereBuilder.andWhereColumn("id", ["\"MOD_TABLE_OLD\".\"OLD_id\"", []]);
        moduleUpdateQuery.whereBuilder.andWhereColumn("version", ["\"MOD_TABLE_OLD\".\"OLD_version\"", []]);
      } else {
        updater.whereCriteriaSelector(moduleUpdateQuery.whereBuilder);

        // and join it on id and version match
        moduleUpdateQuery.whereBuilder.andWhere(JSON.stringify("id") + "=" + JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME));
        moduleUpdateQuery.whereBuilder.andWhere(JSON.stringify("version") + "=" + JSON.stringify(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME));
        // now we pass the where criteria selector for further filtering
        moduleUpdateQuery.fromBuilder.from(selfTable);
      }

      // returning only the module table information
      moduleUpdateQuery.returningBuilder.returningAll(moduleTable);
      withQuery.with("MTABLE", moduleUpdateQuery);
    }

    if (updater.itemTableUpdater || updater.itemTableUpdate) {
      const itemUpdateQuery = new UpdateBuilder();
      itemUpdateQuery.table(selfTable);

      if (updater.itemTableUpdate) {
        itemUpdateQuery.setBuilder.setMany(updater.itemTableUpdate);
      }
      updater.itemTableUpdater &&
        updater.itemTableUpdater(
          itemUpdateQuery.setBuilder,
          this.changeRowLanguageFn.bind(this, itemDefinition, itemUpdateQuery.setBuilder),
        );

      itemUpdateQuery.setBuilder.knownAffectedColumns.forEach((affected) => {
        if (affected[0] === null && invalidManualUpdate.includes(affected[1])) {
          throw new Error("Cannot use a raw db update to modify the column " + affected[1]);
        }
      });

      const basicIdefTracked = mod.getAllPropExtensions().filter((pExt) => pExt.isTracked()).map((pExt) => pExt.getId());

      const potentialAffectedTrackedIdefProperties = itemUpdateQuery.setBuilder.hasUnknownAffectedColumnExpression ? basicIdefTracked : (
        basicIdefTracked.filter((tracked) => itemUpdateQuery.setBuilder.knownAffectedColumns.some(
          (affected) => affected[0] === null && affected[1] === tracked
        ))
      );

      potentialAffectedTrackedProperties = potentialAffectedTrackedProperties.concat(potentialAffectedTrackedIdefProperties);

      // now we may want to know the old values of these columnd
      // if they had happened to be affected as we have to know
      // what value they used to hold in order to trigger an update
      // to the old (eg. a reparent that a record was lost)
      // and to the new (eg. that a record was gained)
      if (potentialAffectedTrackedIdefProperties.length && !updater.dangerousUseSilentMode) {
        potentialAffectedTrackedIdefProperties.forEach((p) => {
          itemUpdateQuery.returningBuilder.returningColumn("OLD_" + p);
        });
        itemUpdateQuery.fromBuilder.fromSelect((b) => {
          b.fromBuilder.from(selfTable);
          b.selectExpression(JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME) + " " + JSON.stringify("OLD_" + CONNECTOR_SQL_COLUMN_ID_FK_NAME));
          b.selectExpression(JSON.stringify(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME) + " " + JSON.stringify("OLD_" + CONNECTOR_SQL_COLUMN_VERSION_FK_NAME));
          potentialAffectedTrackedIdefProperties.forEach((p) => {
            b.selectExpression(JSON.stringify(p) + " " + JSON.stringify("OLD_" + p));
          });
          updater.whereCriteriaSelector(b.whereBuilder);
          b.joinBuilder.join(moduleTable, (builder) => {
            builder.onColumnEquals(CONNECTOR_SQL_COLUMN_ID_FK_NAME, "id");
            builder.onColumnEquals(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "version");
          });
        }, "IDEF_TABLE_OLD");
        itemUpdateQuery.whereBuilder.andWhereColumn(
          CONNECTOR_SQL_COLUMN_ID_FK_NAME,
          ["\"IDEF_TABLE_OLD\"." + JSON.stringify("OLD_" + CONNECTOR_SQL_COLUMN_ID_FK_NAME), []],
        );
        itemUpdateQuery.whereBuilder.andWhereColumn(
          CONNECTOR_SQL_COLUMN_VERSION_FK_NAME,
          ["\"IDEF_TABLE_OLD\"." + JSON.stringify("OLD_" + CONNECTOR_SQL_COLUMN_VERSION_FK_NAME), []],
        );
      } else {
        // and join it on id and version match
        itemUpdateQuery.whereBuilder.andWhere(JSON.stringify("id") + "=" + JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME));
        itemUpdateQuery.whereBuilder.andWhere(JSON.stringify("version") + "=" + JSON.stringify(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME));
        itemUpdateQuery.fromBuilder.from("MTABLE");
      }

      // returning only the item table information
      itemUpdateQuery.returningBuilder.returningAll(selfTable);

      withQuery.with("ITABLE", itemUpdateQuery);
    } else {
      const itemSelectQuery = new SelectBuilder();
      // from both tables
      itemSelectQuery.fromBuilder.from(selfTable, "MTABLE");
      // where they match the id and version so that it joins
      itemSelectQuery.whereBuilder.andWhere(JSON.stringify("id") + "=" + JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME));
      itemSelectQuery.whereBuilder.andWhere(JSON.stringify("version") + "=" + JSON.stringify(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME));
      // here we would do a simple select of only the properties
      // of the item definition table
      itemSelectQuery.selectAll(selfTable);

      withQuery.with("ITABLE", itemSelectQuery);
    }

    const selectQuery = new SelectBuilder();
    selectQuery.selectAll().fromBuilder.from("MTABLE");
    selectQuery.joinBuilder.join("ITABLE", (rule) => {
      rule.onColumnEquals(CONNECTOR_SQL_COLUMN_ID_FK_NAME, "id");
      rule.onColumnEquals(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "version");
    });

    withQuery.do(selectQuery);

    // we got to get all rows, first we create a pseudo table
    // for our module
    const allRows = potentialAffectedTrackedProperties.length && !updater.dangerousUseSilentMode ? (
      await this.databaseConnection.startTransaction(async (transactingDb) => {
        const results = await transactingDb.queryRows(withQuery);

        await this.updateTrackers(
          transactingDb,
          results,
          potentialAffectedTrackedProperties,
          moduleTable,
        );

        return results;
      })
    ) : (
      await this.databaseConnection.queryRows(withQuery)
    );
    const result = allRows.map(convertVersionsIntoNullsWhenNecessary);

    if (!updater.dangerousUseSilentMode) {
      if (this.transacting) {
        this.transactingQueue.push(this.informRowsHaveBeenModified.bind(this, result, updater.dangerousForceElasticLangUpdateTo, true));
      } else {
        await this.informRowsHaveBeenModified(result, updater.dangerousForceElasticLangUpdateTo, true);
      }
    } else if (typeof updater.dangerousForceElasticLangUpdateTo !== "undefined" || updater.dangerousForceElasticUpdate) {
      if (this.transacting) {
        this.transactingQueue.push(this.informRowsHaveBeenModifiedElasticOnly.bind(this, result, updater.dangerousForceElasticLangUpdateTo, true));
      } else {
        await this.informRowsHaveBeenModifiedElasticOnly(result, updater.dangerousForceElasticLangUpdateTo, true);
      }
    }

    return result;
  }

  private async updateTrackers(
    transactingDb: DatabaseConnection,
    results: ISQLTableRowValue[],
    potentialAffectedTrackedProperties: string[],
    moduleTable: string,
  ) {
    const insertQueryBuilder = transactingDb.getInsertBuilder();
    insertQueryBuilder.table(TRACKERS_REGISTRY_IDENTIFIER);
    let hasAddedAtLeastOneInsert = false;

    results.forEach((result) => {
      let hasCheckedParent = false;

      potentialAffectedTrackedProperties.forEach((propertyId) => {
        if (propertyId === "parent_id" || propertyId === "parent_type" || propertyId === "parent_version") {
          if (hasCheckedParent) {
            return;
          }
          hasCheckedParent = true;

          const currentParent = {
            id: result.parent_id,
            version: result.parent_version || null,
            type: result.parent_type || null,
          };

          const oldParent = {
            id: typeof result.OLD_parent_id === "undefined" ? currentParent.id : result.OLD_parent_id,
            version: (typeof result.OLD_parent_version === "undefined" ? currentParent.id : result.OLD_parent_version) || null,
            type: (typeof result.OLD_parent_type === "undefined" ? currentParent.type : result.OLD_parent_type) || null,
          }

          if (currentParent.id !== oldParent.id || currentParent.type !== oldParent.type || currentParent.version !== oldParent.version) {
            if (currentParent.id) {
              // store the new parenting
              insertQueryBuilder.insert({
                id: result.id,
                version: result.version || "",
                type: result.type,
                module: moduleTable,
                property: "PARENT",
                value: currentParent.type + "." + currentParent.id + "." + (currentParent.version || ""),
                status: true,
                transaction_time: [
                  "NOW()",
                  [],
                ],
              });
              hasAddedAtLeastOneInsert = true;
            }
            if (oldParent.id) {
              insertQueryBuilder.insert({
                id: result.id,
                version: result.version || "",
                type: result.type,
                module: moduleTable,
                property: "PARENT",
                value: oldParent.type + "." + oldParent.id + "." + (oldParent.version || ""),
                status: false,
                transaction_time: [
                  "NOW()",
                  [],
                ],
              });
              hasAddedAtLeastOneInsert = true;
            }
          }
        } else {
          const currentValue = result[propertyId];
          const oldValue = typeof result["OLD_" + propertyId] === "undefined" ? currentValue : result["OLD_" + propertyId];

          if (currentValue !== oldValue) {
            if (currentValue) {
              insertQueryBuilder.insert({
                id: result.id,
                version: result.version || "",
                type: result.type,
                module: moduleTable,
                property: propertyId,
                value: currentValue,
                status: true,
                transaction_time: [
                  "NOW()",
                  [],
                ],
              });
              hasAddedAtLeastOneInsert = true;
            }
            if (oldValue) {
              insertQueryBuilder.insert({
                id: result.id,
                version: result.version || "",
                type: result.type,
                module: moduleTable,
                property: propertyId,
                value: oldValue,
                status: false,
                transaction_time: [
                  "NOW()",
                  [],
                ],
              });
              hasAddedAtLeastOneInsert = true;
            }
          }
        }
      });
    });

    // there can only be one property tracker in the trackers table on whether
    // the given property id, property value, id, version, type combo; whether
    // it was lost or gained, as all other info is irrelevant, this uniqueness constrain
    // will be abused to ensure updates and to keep the tracking database small
    insertQueryBuilder.onConflictOn(
      ["property", "value", "type", "id", "version"],
      "UPDATE",
      (setBlder) => {
        setBlder.setColumn(
          "transaction_time", [
          "NOW()",
          [],
        ],
        );
        setBlder.setColumn(
          "status", [
          "EXCLUDED.\"status\"",
          [],
        ],
        );
      });

    if (hasAddedAtLeastOneInsert) {
      await transactingDb.queryRows(insertQueryBuilder);
    }
  }

  /**
   * Performs a raw db update for many rows
   * in the database this is a very powerful and quite
   * advanced method
   * 
   * @param moduleToUpdate 
   * @param updater 
   */
  public async performModuleBatchRawDBUpdate(
    moduleToUpdate: Module | string,
    updater: {
      // you only want to use where in here
      whereCriteriaSelector: (arg: WhereBuilder) => void;

      moduleTableUpdate?: IManyValueType;
      moduleTableUpdater?: (arg: SetBuilder, changeRowLanguage: changeRowLanguageFnPropertyBased) => void;
      /**
       * Does not inform of updates or anything to the clusters
       * or elastic or anything at all, does not modify the last modified
       * signature
       */
      dangerousUseSilentMode?: boolean;
      /**
       * Forces a language update to the given language, will ignore silent
       * mode if provided
       */
      dangerousForceElasticLangUpdateTo?: string;
      /**
       * Will update search indices anyway
       */
      dangerousForceElasticUpdate?: boolean;
    },
  ): Promise<ISQLTableRowValue[]> {
    if (
      !updater.moduleTableUpdate &&
      !updater.moduleTableUpdater
    ) {
      throw new Error("no module update was specified into the updater");
    }

    const mod = moduleToUpdate instanceof Module ? moduleToUpdate : this.root.registry[moduleToUpdate] as Module;

    if (!mod || !(mod instanceof Module)) {
      if (typeof moduleToUpdate === "string" && !mod) {
        throw new Error(mod + " does not exist, as it was used while batch updating");
      } else if (mod instanceof ItemDefinition) {
        // typescript bug
        throw new Error("Received an item for doing a batch update " + (mod as any).getQualifiedPathName());
      } else if (!moduleToUpdate) {
        throw new Error("Recieved undefined/null for batch module update");
      } else {
        throw new Error("Recieved unknown object for batch module update");
      }
    }

    const moduleTable = mod.getQualifiedPathName();

    // we are going to check that no tracked properties exist in the item, otherwise the update can't be done
    // using a batch raw db update because we are missing the tracked properties of each item definition for that
    if (!updater.dangerousUseSilentMode) {
      let affectedId: string = "";
      const affectedIdef = mod.getAllChildItemDefinitions().find((cIdef) => {
        const pdef = cIdef.getAllPropertyDefinitions().find((pIdef) => pIdef.isTracked());
        if (pdef) {
          affectedId = pdef.getId();
          return true;
        }

        return false;
      });

      if (affectedIdef) {
        throw new Error("Cannot run a batch module based update because child item " +
          affectedIdef.getName() + " has a tracked property " + affectedId);
      }
    }

    const moduleUpdateQuery = new UpdateBuilder();
    moduleUpdateQuery.table(moduleTable);
    if (updater.moduleTableUpdate) {
      moduleUpdateQuery.setBuilder.setMany(updater.moduleTableUpdate);
    }

    moduleUpdateQuery.setBuilder.knownAffectedColumns.forEach((affected) => {
      if (affected[0] === null && invalidManualUpdate.includes(affected[1])) {
        throw new Error("Cannot use a raw db update to modify the column " + affected[1]);
      }
    });

    // here we will update our last modified
    if (!updater.dangerousUseSilentMode) {
      moduleUpdateQuery.setBuilder.set(JSON.stringify("last_modified") + " = NOW()", [], "last_modified");
    }

    const basicTracked = mod.getAllPropExtensions().filter((pExt) => pExt.isTracked()).map((pExt) => pExt.getId());

    updater.moduleTableUpdater && updater.moduleTableUpdater(
      moduleUpdateQuery.setBuilder,
      this.changeRowLanguageFn.bind(this, mod, moduleUpdateQuery.setBuilder),
    );

    moduleUpdateQuery.returningBuilder.returningColumn("id");
    moduleUpdateQuery.returningBuilder.returningColumn("version");
    moduleUpdateQuery.returningBuilder.returningColumn("type");
    moduleUpdateQuery.returningBuilder.returningColumn("created_by");
    moduleUpdateQuery.returningBuilder.returningColumn("parent_id");
    moduleUpdateQuery.returningBuilder.returningColumn("parent_type");
    moduleUpdateQuery.returningBuilder.returningColumn("parent_version");
    moduleUpdateQuery.returningBuilder.returningColumn("last_modified");

    const allTracked = [
      "parent_id",
      "parent_type",
      "parent_version",
    ].concat(basicTracked);

    // now we get all the potentially affected tracked properties that may have changed
    const potentialAffectedTrackedProperties = moduleUpdateQuery.setBuilder.hasUnknownAffectedColumnExpression ? allTracked : (
      allTracked.filter((tracked) => moduleUpdateQuery.setBuilder.knownAffectedColumns.some(
        (affected) => affected[0] === null && affected[1] === tracked
      ))
    );

    if (!updater.dangerousUseSilentMode) {
      // add the tracked columns
      basicTracked.forEach((t) => {
        moduleUpdateQuery.returningBuilder.returningColumn(t);
      });

      // now we may want to know the old values of these columnd
      // if they had happened to be affected as we have to know
      // what value they used to hold in order to trigger an update
      // to the old (eg. a reparent that a record was lost)
      // and to the new (eg. that a record was gained)
      if (potentialAffectedTrackedProperties.length) {
        potentialAffectedTrackedProperties.forEach((p) => {
          moduleUpdateQuery.returningBuilder.returningColumn("OLD_" + p);
        });
        moduleUpdateQuery.fromBuilder.fromSelect((b) => {
          b.fromBuilder.from(moduleTable);
          b.selectExpression("\"id\" \"OLD_id\"");
          b.selectExpression("\"version\" \"OLD_version\"");
          potentialAffectedTrackedProperties.forEach((p) => {
            b.selectExpression(JSON.stringify(p) + " " + JSON.stringify("OLD_" + p));
          });
          updater.whereCriteriaSelector(b.whereBuilder);
        }, "MOD_TABLE_OLD");
        moduleUpdateQuery.whereBuilder.andWhereColumn("id", ["\"MOD_TABLE_OLD\".\"OLD_id\"", []]);
        moduleUpdateQuery.whereBuilder.andWhereColumn("version", ["\"MOD_TABLE_OLD\".\"OLD_version\"", []]);
      } else {
        updater.whereCriteriaSelector(moduleUpdateQuery.whereBuilder);
      }
    } else {
      updater.whereCriteriaSelector(moduleUpdateQuery.whereBuilder);
    }

    // we got to get all rows, first we create a pseudo table
    // for our module
    const allRows = potentialAffectedTrackedProperties.length && !updater.dangerousUseSilentMode ? (
      await this.databaseConnection.startTransaction(async (transactingDb) => {
        const results = await transactingDb.queryRows(moduleUpdateQuery);

        await this.updateTrackers(
          transactingDb,
          results,
          potentialAffectedTrackedProperties,
          moduleTable,
        );

        return results;
      })
    ) : (
      await this.databaseConnection.queryRows(moduleUpdateQuery)
    );
    const result = allRows.map(convertVersionsIntoNullsWhenNecessary);

    if (!updater.dangerousUseSilentMode) {
      if (this.transacting) {
        // row data is not complete so we pass false
        // otherwise we would corrupt the cache
        this.transactingQueue.push(this.informRowsHaveBeenModified.bind(this, result, updater.dangerousForceElasticLangUpdateTo, false));
      } else {
        await this.informRowsHaveBeenModified(result, updater.dangerousForceElasticLangUpdateTo, false);
      }
    } else if (typeof updater.dangerousForceElasticLangUpdateTo !== "undefined" || updater.dangerousForceElasticUpdate) {
      if (this.transacting) {
        // row data is not complete so we pass false
        // otherwise we would corrupt the cache
        this.transactingQueue.push(this.informRowsHaveBeenModifiedElasticOnly.bind(this, result, updater.dangerousForceElasticLangUpdateTo, false));
      } else {
        await this.informRowsHaveBeenModifiedElasticOnly(result, updater.dangerousForceElasticLangUpdateTo, false);
      }
    }

    return result;
  }

  /**
   * Performs a raw database update, use this method in order to update critical data that could
   * lead to race conditions, otherwise stay by updating through the cache
   * 
   * TODO returning builder access will affect tracked properties
   *
   * @param item 
   * @param id 
   * @param version 
   * @param updater
   */
  public async performRawDBUpdate(
    item: ItemDefinition | string,
    id: string,
    version: string,
    updater: {
      moduleTableUpdate?: IManyValueType;
      itemTableUpdate?: IManyValueType;
      // you only want to use set in these, not select not anything
      moduleTableUpdater?: (arg: SetBuilder, changeRowLanguage: changeRowLanguageFn) => void;
      itemTableUpdater?: (arg: SetBuilder, changeRowLanguage: changeRowLanguageFn) => void;
      /**
       * Does not inform of updates or anything to the clusters
       * or elastic or anything at all, does not modify the last modified
       * signature
       */
      dangerousUseSilentMode?: boolean;
      /**
       * Forces a language update to the given language, will ignore silent
       * mode if provided
       */
      dangerousForceElasticLangUpdateTo?: string;
      /**
       * Will update search indices anyway
       */
      dangerousForceElasticUpdate?: boolean;
    }
  ): Promise<ISQLTableRowValue> {
    return (await this.performBatchRawDBUpdate(
      item,
      {
        ...updater,
        whereCriteriaSelector: (arg) => {
          arg.andWhereColumn("id", id).andWhereColumn("version", version || "")
        },
      }
    ))[0] || null;
  }
}