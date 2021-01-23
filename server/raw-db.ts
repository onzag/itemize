/**
 * This file contains the functions that allow for raw modification of the database
 * as well as to propagate these changes to the caches and all the running
 * clusters
 * 
 * @packageDocumentation
 */

import { ISQLTableRowValue } from "../base/Root/sql";
import { CHANGED_FEEEDBACK_EVENT, IChangedFeedbackEvent, IOwnedSearchRecordsEvent, IParentedSearchRecordsEvent, IRedisEvent, OWNED_SEARCH_RECORDS_EVENT, PARENTED_SEARCH_RECORDS_EVENT } from "../base/remote-protocol";
import { CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, DELETED_REGISTRY_IDENTIFIER, UNSPECIFIED_OWNER } from "../constants";
import Root from "../base/Root";
import Knex from "knex";
import { logger } from ".";
import { ItemizeRedisClient } from "./redis";
import { findLastRecordLastModifiedDate } from "./resolvers/actions/search";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import { convertVersionsIntoNullsWhenNecessary } from "./version-null-value";

/**
 * The required properties that every row should have
 * @ignore
 */
const requiredProperties = ["id", "version", "type", "created_by", "parent_id", "parent_type", "parent_version", "last_modified"];

/**
 * This is a very advanced feature, if you are here is because you are doing raw database
 * updates and want to propagate them into your clients to ensure that the realtime attributes
 * get mantained and the caches get properly invalidated
 */
export class ItemizeRawDB {
  private redisPub: ItemizeRedisClient;
  private knex: Knex;
  private root: Root;

  /**
   * Builds a new instance of the change informer
   * @param redisPub the redis publish instance
   * @param knex a connection to the database
   * @param root the root instance
   */
  constructor(redisPub: ItemizeRedisClient, knex: Knex, root: Root) {
    this.redisPub = redisPub;
    this.knex = knex;
    this.root = root;
  }

  /**
   * Takes a row and stores it in the deleted registry
   * @param row the row to store
   * @param moduleName the module that it belongs to (based on the type)
   * @returns the transaction time
   */
  private async storeInDeleteRegistry(row: ISQLTableRowValue, moduleName: string) {
    // simply build the query
    const insertQueryValue = await this.knex(DELETED_REGISTRY_IDENTIFIER).insert({
      id: row.id,
      version: row.version,
      type: row.type,
      module: moduleName,
      created_by: row.created_by || null,
      parenting_id: row.parent_id ? (row.parent_type + "." + row.parent_id + "." + row.parent_version || "") : null,
      transaction_time: this.knex.fn.now(),
    }).returning("transaction_time");

    // returning the transaction time
    return insertQueryValue[0].transaction_time as string;
  }

  /**
   * Informs all the caches all the way to the clients of a change in a given
   * row 
   * @param row the row to inform a change on
   * @param action what happened to the row
   * @param dataIsComplete whether the row contains complete data
   */
  private async informChangeOnRow(row: ISQLTableRowValue, action: "created" | "deleted" | "modified", dataIsComplete: boolean) {
    // first let's check whether the row is valid for the bare minimum
    const isRowValid = requiredProperties.every((p) => {
      if (typeof row[p] === "undefined") {
        logger && logger.error(
          "ItemizeRawDB.informChangeOnRow: row data is invalid as it misses property " + p,
          {
            row,
          }
        );
        return false;
      }

      return true;
    });

    // if it's not valid we return null
    if (!isRowValid) {
      return null;
    }

    // now let's grab the module qualified name
    const moduleName = this.root.registry[row.type].getQualifiedPathName();

    // and set into the deleted registry if we don't have it
    let lastModified = row.last_modified;
    if (action === "deleted") {
      lastModified = await this.storeInDeleteRegistry(row, moduleName);
    }

    // build the change event
    const changedFeedbackEvent: IChangedFeedbackEvent = {
      lastModified,
      id: row.id,
      itemDefinition: row.type,
      type: action === "deleted" ? "not_found" : action,
      version: row.verion,
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
      type: CHANGED_FEEEDBACK_EVENT,
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
    rowDataIsComplete: boolean
  ) {
    // first we call to change every single row so that the changed events propagate
    const processedChanges = (await Promise.all(rows.map((r) => this.informChangeOnRow(r, action, rowDataIsComplete)))).filter((r) => r !== null);

    // now we can grab where we are putting the records for searches, depending on what occured to these rows
    const recordsLocation = action === "deleted" ? "lostRecords" : (action === "created" ? "newRecords" : "modifiedRecords");

    // and let's start collecting all the events that we need to trigger about these records
    // because we have both parented and owned events, we will start collecting them
    const collectedOwned: { [key: string]: IOwnedSearchRecordsEvent } = {};
    const collectedParented: { [key: string]: IParentedSearchRecordsEvent } = {};

    // we will loop on the changes
    processedChanges.forEach((c) => {
      // for the creator one
      if (c.row.created_by !== UNSPECIFIED_OWNER) {
        // these are the cache index identifiers for the module and item based search
        const ownedMergedIndexIdentifierOnItem = "OWNED_SEARCH." + c.itemQualifiedPathName + "." + c.row.created_by;
        const ownedMergedIndexIdentifierOnModule = "OWNED_SEARCH." + c.moduleQualifiedPathName + "." + c.row.created_by;

        // if we don't have an event for these, we create them
        if (!collectedOwned[ownedMergedIndexIdentifierOnItem]) {
          collectedOwned[ownedMergedIndexIdentifierOnItem] = {
            createdBy: c.row.created_by,
            qualifiedPathName: c.itemQualifiedPathName,
            newRecords: [],
            lostRecords: [],
            modifiedRecords: [],
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
            newLastModified: null,
          }
        }

        // and this is our record
        const record = {
          id: c.row.id,
          last_modified: c.lastModified,
          type: c.row.type,
          version: c.row.version || null,
        };

        // we add it at the right place
        collectedOwned[ownedMergedIndexIdentifierOnItem][recordsLocation].push(record);
        collectedOwned[ownedMergedIndexIdentifierOnModule][recordsLocation].push(record);
      }

      // now for parenting, if we have a parent
      if (c.row.parent_id) {
        // equally we build the cache identifiers for the parented searches both by module and by item
        const parentedMergedIndexIdentifierOnItem = "PARENTED_SEARCH." + c.itemQualifiedPathName + "." + c.row.parent_id + "." +
          c.row.parent_version + "." + c.row.parent_type;
        const parentedMergedIndexIdentifierOnModule = "PARENTED_SEARCH." + c.moduleQualifiedPathName + "." + c.row.parent_type + "." +
          c.row.parent_id + "." + (c.row.parent_version || "");

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
            newLastModified: null,
          }
        }

        // this is our record
        const record = {
          id: c.row.id,
          last_modified: c.lastModified,
          type: c.row.type,
          version: c.row.version || null,
        };

        // and we add it to the parented list
        collectedParented[parentedMergedIndexIdentifierOnItem][recordsLocation].push(record);
        collectedParented[parentedMergedIndexIdentifierOnModule][recordsLocation].push(record);
      }
    });

    // now we can start emitting these events, first with the owned ones
    Object.keys(collectedOwned).forEach((mergedIndexIdentifier) => {
      // grab the event
      const ownedEvent = collectedOwned[mergedIndexIdentifier];
      // we set our last modified date now from the records
      ownedEvent.newLastModified = findLastRecordLastModifiedDate(ownedEvent.newRecords, ownedEvent.modifiedRecords, ownedEvent.lostRecords);

      const redisEvent: IRedisEvent = {
        event: ownedEvent,
        serverInstanceGroupId: null,
        source: "global",
        type: OWNED_SEARCH_RECORDS_EVENT,
      };

      this.redisPub.redisClient.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
    });

    // now with the parented ones
    Object.keys(collectedParented).forEach((mergedIndexIdentifier) => {
      // grab the event
      const parentedEvent = collectedParented[mergedIndexIdentifier];
      // we set our last modified date now from the records
      parentedEvent.newLastModified = findLastRecordLastModifiedDate(parentedEvent.newRecords, parentedEvent.modifiedRecords, parentedEvent.lostRecords);

      const redisEvent: IRedisEvent = {
        event: parentedEvent,
        serverInstanceGroupId: null,
        source: "global",
        type: PARENTED_SEARCH_RECORDS_EVENT,
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
   * @param rowDataIsComplete whether the rows contain complete data
   */
  public async informRowsHaveBeenModified(rows: ISQLTableRowValue[], rowDataIsComplete?: boolean) {
    return await this.informChangeOnRows(rows, "modified", rowDataIsComplete);
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
    return await this.informChangeOnRows(rows, "deleted", false);
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
   * @param rowDataIsComplete whether the rows contain complete data
   */
  public async informRowsHaveBeenAdded(rows: ISQLTableRowValue[], rowDataIsComplete?: boolean) {
    return await this.informChangeOnRows(rows, "created", rowDataIsComplete);
  }

  /**
   * Performs a raw database update, use this method in order to update critical data that could
   * lead to race conditions, otherwise stay by updating through the cache
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
      moduleTableUpdate?: any;
      itemTableUpdate?: any;
    }
  ): Promise<ISQLTableRowValue> {
    if (!updater.moduleTableUpdate && !updater.itemTableUpdate) {
      throw new Error("no module update and no item update was specified into the updater");
    }

    const itemDefinition = item instanceof ItemDefinition ? item : this.root.registry[item] as ItemDefinition;
    const mod = itemDefinition.getParentModule();

    const moduleTable = mod.getQualifiedPathName();
    const selfTable = itemDefinition.getQualifiedPathName();

    const sqlModData = {
      ...updater.moduleTableUpdate,
      last_modified: this.knex.fn.now(),
    };

    const sqlIdefData = updater.itemTableUpdate || {};

    const sqlValue = convertVersionsIntoNullsWhenNecessary(
      await this.knex.transaction(async (transactionKnex) => {
        // and add them if we have them, note that the module will always have
        // something to update because the edited_at field is always added when
        // edition is taking place
        const updateQueryMod = transactionKnex(moduleTable)
          .update(sqlModData).where("id", id).andWhere("version", version || "")
          .returning("*");

        // for the update query of the item definition we have to take several things
        // into consideration, first we set it as an empty object
        let updateOrSelectQueryIdef: any = {};
        // if we have something to update
        if (Object.keys(sqlIdefData).length) {
          // we make the update query
          updateOrSelectQueryIdef = transactionKnex(selfTable).update(sqlIdefData).where(
            CONNECTOR_SQL_COLUMN_ID_FK_NAME,
            id,
          ).andWhere(
            CONNECTOR_SQL_COLUMN_VERSION_FK_NAME,
            version || "",
          ).returning("*");
          // otherwise we check if we are just requesting some fields from the idef
        } else {
          // and make a simple select query
          updateOrSelectQueryIdef = transactionKnex(selfTable).select("*").where(
            CONNECTOR_SQL_COLUMN_ID_FK_NAME,
            id,
          ).andWhere(
            CONNECTOR_SQL_COLUMN_VERSION_FK_NAME,
            version || "",
          );
        }
        // if there's nothing to update, or there is nothing to retrieve, it won't touch the idef table

        // now we run both queries
        const updateQueryValueMod = await updateQueryMod;
        const updateQueryValueIdef = await updateOrSelectQueryIdef;

        return {
          ...updateQueryValueMod[0],
          ...updateQueryValueIdef[0],
        };
      }),
    );

    await this.informRowsHaveBeenModified([sqlValue], true);

    return sqlValue;
  }
}