/**
 * This file contains the functions that allow for raw modification of the database
 * as well as to propagate these changes to the caches and all the running
 * clusters
 * 
 * @module
 */

import { ISQLTableRowValue } from "../base/Root/sql";
import { CHANGED_FEEEDBACK_EVENT, IChangedFeedbackEvent, IOwnedSearchRecordsEvent, IParentedSearchRecordsEvent, IRedisEvent, OWNED_SEARCH_RECORDS_EVENT, PARENTED_SEARCH_RECORDS_EVENT } from "../base/remote-protocol";
import { CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, DELETED_REGISTRY_IDENTIFIER, UNSPECIFIED_OWNER } from "../constants";
import Root from "../base/Root";
import { logger } from "./logger";
import { ItemizeRedisClient } from "./redis";
import { findLastRecordLastModifiedDate } from "./resolvers/actions/search";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import { convertVersionsIntoNullsWhenNecessary } from "./version-null-value";
import Module from "../base/Root/Module";
import { UpdateBuilder } from "../database/UpdateBuilder";
import { DatabaseConnection } from "../database";
import { IManyValueType } from "../database/base";
import { SelectBuilder } from "../database/SelectBuilder";
import { WhereBuilder } from "../database/WhereBuilder";
import { SetBuilder } from "../database/SetBuilder";
import { WithBuilder } from "../database/WithBuilder";
import { convertGQLValueToSQLValueForModule } from "../base/Root/Module/sql";
import { convertGQLValueToSQLValueForItemDefinition } from "../base/Root/Module/ItemDefinition/sql";
import uuid from "uuid";
import uuidv5 from "uuid/v5";
import { DeleteBuilder } from "../database/DeleteBuilder";

const NAMESPACE = "23ab4609-af49-4cdf-921b-4700adb284f3";
export function makeIdOutOf(str: string) {
  return uuidv5(str, NAMESPACE).replace(/-/g, "");
}

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
  private root: Root;

  private transacting: boolean;
  private transactingQueue: Function[] = [];

  public databaseConnection: DatabaseConnection;

  /**
   * Builds a new instance of the change informer
   * @param redisPub the redis publish instance
   * @param databaseConnection a connection to the database
   * @param root the root instance
   */
  constructor(redisPub: ItemizeRedisClient, databaseConnection: DatabaseConnection, root: Root) {
    this.redisPub = redisPub;
    this.databaseConnection = databaseConnection;
    this.root = root;
  }

  /**
   * Starts a new instance of raw db but in transaction mode
   * @param fn the transactional function
   * @returns whatever is returned in the transactional function
   */
  public startTransaction<T>(fn: (transactingRawDB: ItemizeRawDB) => Promise<T>): Promise<T> {
    return this.databaseConnection.startTransaction(async (transactingClient) => {
      const newRawDB = new ItemizeRawDB(this.redisPub, transactingClient, this.root);
      newRawDB.transacting = true;

      const resolvedPromiseToReturn = await fn(newRawDB);
      this.transactingQueue.forEach((q) => q());
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
  public processGQLValue(item: ItemDefinition | string, value: any, serverData: any, dictionary: string, partialFields?: any): {
    modSQL: ISQLTableRowValue
    itemSQL: ISQLTableRowValue
  } {
    const itemDefinition = item instanceof ItemDefinition ? item : this.root.registry[item] as ItemDefinition;
    const mod = itemDefinition.getParentModule();

    const modSQL = convertGQLValueToSQLValueForModule(
      serverData,
      mod,
      value,
      null,
      null,
      null,
      dictionary,
      partialFields,
    ).value;

    const itemSQL = convertGQLValueToSQLValueForItemDefinition(
      serverData,
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
   * Takes a row and stores it in the deleted registry
   * @param row the row to store
   * @param moduleName the module that it belongs to (based on the type)
   * @returns the transaction time
   */
  private async storeInDeleteRegistry(row: ISQLTableRowValue, moduleName: string) {
    const insertQuery = this.databaseConnection.getInsertBuilder();
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

  /**
   * Informs all the caches all the way to the clients of a change in a given
   * row 
   * @param row the row to inform a change on
   * @param action what happened to the row
   * @param dataIsComplete whether the row contains complete data
   */
  private async informChangeOnRow(row: ISQLTableRowValue, action: "created" | "deleted" | "modified", dataIsComplete: boolean) {
    // first let's check whether the row is valid for the bare minimum
    const isRowValid = row && Array.isArray(row) && requiredProperties.every((p) => {
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

      // does not inform for updates to other clusters
      // or caches or anything at all, mantains last modified
      // value
      dangerousUseSilentMode?: boolean;
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
        this.transactingQueue.push(this.informRowsHaveBeenAdded.bind(this, result, true));
      } else {
        await this.informRowsHaveBeenAdded(result, true); 
      }
    }

    return result;
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
    preventJoin?: boolean,
  ): Promise<ISQLTableRowValue[]> {
    const itemDefinitionOrModuleInstance = typeof itemDefinitionOrModule === "string" ?
      this.root.registry[itemDefinitionOrModule] :
      itemDefinitionOrModule;

    const builder = new SelectBuilder();

    if (itemDefinitionOrModuleInstance instanceof ItemDefinition && !preventJoin) {
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

    return await this.databaseConnection.queryRows(builder);
  }

  /**
   * Performs a raw db update for many rows
   * in the database this is a very powerful and quite
   * advanced method
   * 
   * TODO returning builder somehow
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
      moduleTableUpdater?: (arg: SetBuilder) => void;
      itemTableUpdater?: (arg: SetBuilder) => void;
      // does not inform for updates to other clusters
      // or caches or anything at all, mantains last modified
      // value
      dangerousUseSilentMode?: boolean;
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
    const mod = itemDefinition.getParentModule();

    const moduleTable = mod.getQualifiedPathName();
    const selfTable = itemDefinition.getQualifiedPathName();

    const withQuery = new WithBuilder();

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
      // here we will update our last modified
      if (!updater.dangerousUseSilentMode) {
        moduleUpdateQuery.setBuilder.set(JSON.stringify("last_modified") + " = NOW()", []);
      }
      if (updater.moduleTableUpdate) {
        moduleUpdateQuery.setBuilder.setMany(updater.moduleTableUpdate);
      }
      updater.moduleTableUpdater && updater.moduleTableUpdater(moduleUpdateQuery.setBuilder);

      // and join it on id and version match
      moduleUpdateQuery.whereBuilder.andWhere(JSON.stringify("id") + "=" + JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME));
      moduleUpdateQuery.whereBuilder.andWhere(JSON.stringify("version") + "=" + JSON.stringify(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME));
      // now we pass the where criteria selector for further filtering
      updater.whereCriteriaSelector(moduleUpdateQuery.whereBuilder);
      moduleUpdateQuery.fromBuilder.from(selfTable);
      // returning only the module table information
      moduleUpdateQuery.returningBuilder.returningAll(moduleTable);
      withQuery.with("MTABLE", moduleUpdateQuery);
    }

    if (updater.itemTableUpdater || updater.itemTableUpdate) {
      const itemUpdateQuery = new UpdateBuilder();
      itemUpdateQuery.table(selfTable);
      // and join it on id and version match
      itemUpdateQuery.whereBuilder.andWhere(JSON.stringify("id") + "=" + JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME));
      itemUpdateQuery.whereBuilder.andWhere(JSON.stringify("version") + "=" + JSON.stringify(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME));
      itemUpdateQuery.fromBuilder.from("MTABLE");
      // returning only the item table information
      itemUpdateQuery.returningBuilder.returningAll(selfTable);

      if (updater.itemTableUpdate) {
        itemUpdateQuery.setBuilder.setMany(updater.itemTableUpdate);
      }
      updater.itemTableUpdater && updater.itemTableUpdater(itemUpdateQuery.setBuilder);

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
    const allRows = await this.databaseConnection.queryRows(withQuery);
    const result = allRows.map(convertVersionsIntoNullsWhenNecessary);

    if (!updater.dangerousUseSilentMode) {
      if (this.transacting) {
        this.transactingQueue.push(this.informRowsHaveBeenModified.bind(this, result, true));
      } else {
        await this.informRowsHaveBeenModified(result, true); 
      }
    }

    return result;
  }

  /**
   * Performs a raw database update, use this method in order to update critical data that could
   * lead to race conditions, otherwise stay by updating through the cache
   * 
   * TODO returning builder access
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
      moduleTableUpdater?: (arg: SetBuilder) => void;
      itemTableUpdater?: (arg: SetBuilder) => void;
      // does not inform for updates to other clusters
      // or caches or anything at all, mantains last modified
      // value
      dangerousUseSilentMode?: boolean;
    }
  ): Promise<ISQLTableRowValue> {
    if (
      !updater.moduleTableUpdate &&
      !updater.itemTableUpdate &&
      !updater.moduleTableUpdater &&
      !updater.itemTableUpdater
    ) {
      throw new Error("no module update and no item update was specified into the updater");
    }

    const itemDefinition = item instanceof ItemDefinition ? item : this.root.registry[item] as ItemDefinition;
    const mod = itemDefinition.getParentModule();

    const moduleTable = mod.getQualifiedPathName();
    const selfTable = itemDefinition.getQualifiedPathName();

    const withQuery = new WithBuilder();

    if (
      updater.dangerousUseSilentMode &&
      (!updater.moduleTableUpdate || Object.keys(updater.moduleTableUpdate).length === 0) &&
      !updater.moduleTableUpdater
    ) {
      const moduleSelectQuery = new SelectBuilder();
      moduleSelectQuery.selectAll().fromBuilder.from(moduleTable);
      moduleSelectQuery.whereBuilder.andWhereColumn("id", id);
      moduleSelectQuery.whereBuilder.andWhereColumn("version", version || "");
      withQuery.with("MTABLE", moduleSelectQuery);
    } else {
      const moduleUpdateQuery = new UpdateBuilder();
      moduleUpdateQuery.table(moduleTable);

      // here we will update our last modified
      if (!updater.dangerousUseSilentMode) {
        moduleUpdateQuery.setBuilder.set(JSON.stringify("last_modified") + " = NOW()", []);
      }
      if (updater.moduleTableUpdate) {
        moduleUpdateQuery.setBuilder.setMany(updater.moduleTableUpdate);
      }
      // and join it on id and version match
      moduleUpdateQuery.whereBuilder.andWhereColumn("id", id);
      moduleUpdateQuery.whereBuilder.andWhereColumn("version", version || "");

      // returning only the module table information
      moduleUpdateQuery.returningBuilder.returningAll();

      withQuery.with("MTABLE", moduleUpdateQuery);
    }

    if (updater.itemTableUpdater || updater.itemTableUpdate) {
      const itemUpdateQuery = new UpdateBuilder();
      itemUpdateQuery.table(selfTable);
      // and join it on id and version match
      itemUpdateQuery.whereBuilder.andWhereColumn(CONNECTOR_SQL_COLUMN_ID_FK_NAME, id);
      itemUpdateQuery.whereBuilder.andWhereColumn(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, version || "");
      // returning only the item table information
      itemUpdateQuery.returningBuilder.returningAll();

      if (updater.itemTableUpdate) {
        itemUpdateQuery.setBuilder.setMany(updater.itemTableUpdate);
      }
      updater.itemTableUpdater && updater.itemTableUpdater(itemUpdateQuery.setBuilder);

      withQuery.with("ITABLE", itemUpdateQuery);
    } else {
      const itemSelectQuery = new SelectBuilder();
      // from both tables
      itemSelectQuery.fromBuilder.from(selfTable);
      // where they match the id and version so that it joins
      itemSelectQuery.whereBuilder.andWhereColumn(CONNECTOR_SQL_COLUMN_ID_FK_NAME, id);
      itemSelectQuery.whereBuilder.andWhereColumn(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, version || "");
      // here we would do a simple select of only the properties
      // of the item definition table
      itemSelectQuery.selectAll();

      withQuery.with("ITABLE", itemSelectQuery);
    }

    const selectQuery = new SelectBuilder();
    selectQuery.selectAll().fromBuilder.from("MTABLE");
    selectQuery.joinBuilder.join("ITABLE", (rule) => {
      rule.onColumnEquals(CONNECTOR_SQL_COLUMN_ID_FK_NAME, "id");
      rule.onColumnEquals(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "version");
    });
    selectQuery.limit(1);

    withQuery.do(selectQuery);

    // this is basically the same as the cache one
    const sqlValue = convertVersionsIntoNullsWhenNecessary(
      await this.databaseConnection.queryFirst(withQuery),
    );

    if (!updater.dangerousUseSilentMode) {
      if (this.transacting) {
        this.transactingQueue.push(this.informRowsHaveBeenModified.bind(this, [sqlValue], true));
      } else {
        await this.informRowsHaveBeenModified([sqlValue], true); 
      }
    }

    return sqlValue;
  }
}