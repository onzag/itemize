/**
 * This is a very important class that contains the whole redis
 * wrapping that basically keeps everything synchronized, all the servers
 * and tells the clients that are connected to this specific instance, it provides
 * functionality to update, create and delete item definition values
 *
 * @packageDocumentation
 */

import Knex from "knex";
import {
  CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME,
  UNSPECIFIED_OWNER, ENDPOINT_ERRORS, INCLUDE_PREFIX, EXCLUSION_STATE_SUFFIX, DELETED_REGISTRY_IDENTIFIER, CACHED_CURRENCY_RESPONSE, SERVER_DATA_IDENTIFIER
} from "../constants";
import { ISQLTableRowValue, ISQLStreamComposedTableRowValue } from "../base/Root/sql";
import { IGQLSearchRecord, IGQLArgs, IGQLValue } from "../gql-querier";
import { convertVersionsIntoNullsWhenNecessary } from "./version-null-value";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import { Listener } from "./listener";
import Root from "../base/Root";
import { convertGQLValueToSQLValueForItemDefinition, convertSQLValueToGQLValueForItemDefinition } from "../base/Root/Module/ItemDefinition/sql";
import { convertGQLValueToSQLValueForModule } from "../base/Root/Module/sql";
import { deleteEverythingInFilesContainerId } from "../base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management";
import { IOwnedSearchRecordsEvent, IParentedSearchRecordsEvent } from "../base/remote-protocol";
import { IChangedFeedbackEvent } from "../base/remote-protocol";
import { EndpointError } from "../base/errors";
import { logger, IServerDataType } from ".";
import { jwtSign } from "./token";
import { ISensitiveConfigRawJSONDataType } from "../config";
import { IStorageProvidersObject } from "./services/base/StorageProvider";
import { ItemizeRedisClient } from "./redis";
import Module from "../base/Root/Module";

const CACHE_EXPIRES_DAYS = 14;
const MEMCACHE_EXPIRES_MS = 1000;

// Used to optimize, it is found out that passing unecessary logs to the transport
// can slow the logger down even if it won't display
const LOG_LEVEL = process.env.LOG_LEVEL;
const CAN_LOG_DEBUG = LOG_LEVEL === "debug" || LOG_LEVEL === "silly" || (!LOG_LEVEL && process.env.NODE_ENV !== "production");
const CAN_LOG_SILLY = LOG_LEVEL === "silly";

/**
 * The cache class that provides all the functionality that is
 * specified for the cache package, the cache is more than what
 * it name implies because it contains redis and it's the same in
 * all the servers
 */
export class Cache {
  private redisClient: ItemizeRedisClient;
  private domain: string;
  private knex: Knex;
  private storageClients: IStorageProvidersObject;
  private root: Root;
  private serverData: IServerDataType;
  private listener: Listener;
  private sensitiveConfig: ISensitiveConfigRawJSONDataType;
  private memoryCache: {
    [key: string]: {
      value: ISQLTableRowValue
    };
  } = {};

  /**
   * Builds a new cache instance, before the cache is ready
   * it needs to be able to access the listener as well, but due
   * to the fact that the listener depends on the cache as well
   * it is instantiaded by te listener at the same time
   *
   * @param redisClient the redis client that is used for storing values
   * @param knex the knex instance
   * @param root the root of itemize
   */
  constructor(
    redisClient: ItemizeRedisClient,
    knex: Knex,
    sensitiveConfig: ISensitiveConfigRawJSONDataType,
    storageClients: IStorageProvidersObject,
    domain: string,
    root: Root,
    initialServerData: IServerDataType
  ) {
    this.redisClient = redisClient;
    this.knex = knex;
    this.root = root;
    this.storageClients = storageClients;
    this.serverData = initialServerData;
    this.sensitiveConfig = sensitiveConfig;
    this.domain = domain;
  }
  /**
   * Sets the listener for the remote interaction with the clients
   * that are connected, this listener is what informs the client of updates
   * the listener is highly related to the cache as it uses pubsub that
   * comes from redis
   * @param listener the listener
   */
  public setListener(listener: Listener) {
    this.listener = listener;
  }

  /**
   * Provides a cached value from its identifier
   * @param key the identifier
   * @returns a promise with the value
   */
  public async getRaw<T>(
    key: string,
  ): Promise<{ value: T }> {
    CAN_LOG_DEBUG && logger.debug(
      "Cache.getRaw: requesting " + key,
    );
    // we build the promise
    // and call redis, note how we never reject
    try {
      const value = await this.redisClient.get(key);
      if (value === null) {
        return null;
      }
      try {
        return ({
          value: JSON.parse(value) as T,
        });
        // and poke the cache to reset the clock for expiration
        this.pokeCache(key);
      } catch (err) {
        logger.error(
          "Cache.getRaw: could not JSON parse value from cache in " + key,
          value,
        );
      }
    } catch (error) {
      logger.error(
        "Cache.getRaw: could not retrieve value from redis cache client for " + key + " with error",
        {
          errStack: error.stack,
          errMessage: error.message,
        },
      );
      return null;
    }
  }

  public async setRaw(key: string, value: any) {
    CAN_LOG_DEBUG && logger.debug(
      "Cache.setRaw: setting " + key,
    );
    try {
      await this.redisClient.set(key, JSON.stringify(value));
      this.pokeCache(key);
    } catch (error) {
      logger.error(
        "Cache.forceCacheInto: could not set value for " + key + " with error",
        {
          errStack: error.stack,
          errMessage: error.message,
        },
      );
    }
  }

  /**
   * Resets the expiration clock of a given identifier
   * @param keyIdentifier the identifier
   */
  private async pokeCache(keyIdentifier: string) {
    CAN_LOG_DEBUG && logger.debug(
      "Cache.pokeCache: poking " + keyIdentifier,
    );
    try {
      await this.redisClient.expire(keyIdentifier, CACHE_EXPIRES_DAYS * 86400);
    } catch (err) {
      logger.error(
        "Cache.pokeCache: could not poke " + keyIdentifier + " with error",
        err.stack ? err.stack : err.message,
      );
    }
  }

  /**
   * forces a cached value for a given item definition table in an id and version
   * @param idefTable the item definition table or its qualified name
   * @param id the id
   * @param version the version or null
   * @param value the value to store
   */
  private forceCacheInto(idefTable: string, id: string, version: string, value: ISQLTableRowValue) {
    const idefQueryIdentifier = "IDEFQUERY:" + idefTable + "." + id.toString() + "." + (version || "");
    CAN_LOG_DEBUG && logger.debug(
      "Cache.forceCacheInto: setting new cache value for " + idefQueryIdentifier,
    );
    CAN_LOG_SILLY && logger.silly(
      "Cache.forceCacheInto: value is",
      value,
    );
    this.listener.registerSS({
      itemDefinition: idefTable,
      id: id,
      version: version || null,
    });
    return this.setRaw(idefQueryIdentifier, value);
  }

  public triggerSearchListenersFor(
    itemDefinition: ItemDefinition,
    createdBy: string,
    parent: {
      type: string,
      id: string,
      version: string,
    },
    record: IGQLSearchRecord,
    location: "new" | "lost" | "modified",
  ) {
    const newRecordArr = [record];
    const idefQualifiedPathName = itemDefinition.getQualifiedPathName();
    const modQualifiedPathName = itemDefinition.getParentModule().getQualifiedPathName();
    const itemDefinitionBasedOwnedEvent: IOwnedSearchRecordsEvent = {
      qualifiedPathName: idefQualifiedPathName,
      createdBy: itemDefinition.isOwnerObjectId() ? record.id : createdBy,
      newRecords: location === "new" ? newRecordArr : [],
      lostRecords: location === "lost" ? newRecordArr : [],
      modifiedRecords: location === "modified" ? newRecordArr : [],
      newLastModified: record.last_modified,
    };

    CAN_LOG_DEBUG && logger.debug(
      "Cache.requestCreation (detached): built and triggering search result and event for active searches (item definition)",
      itemDefinitionBasedOwnedEvent,
    );
    this.listener.triggerOwnedSearchListeners(
      itemDefinitionBasedOwnedEvent,
      null, // TODO add the listener uuid, maybe?
    );

    const moduleBasedOwnedEvent: IOwnedSearchRecordsEvent = {
      ...itemDefinitionBasedOwnedEvent,
      qualifiedPathName: modQualifiedPathName,
    };

    CAN_LOG_DEBUG && logger.debug(
      "Cache.requestCreation (detached): built and triggering search result and event for active searches (module)",
      moduleBasedOwnedEvent,
    );
    this.listener.triggerOwnedSearchListeners(
      moduleBasedOwnedEvent,
      null, // TODO add the listener uuid, maybe?
    );

    if (parent) {
      const itemDefinitionBasedParentedEvent: IParentedSearchRecordsEvent = {
        qualifiedPathName: idefQualifiedPathName,
        parentId: parent.id,
        parentVersion: parent.version || null,
        parentType: parent.type,
        newRecords: location === "new" ? newRecordArr : [],
        lostRecords: location === "lost" ? newRecordArr : [],
        modifiedRecords: location === "modified" ? newRecordArr : [],
        newLastModified: record.last_modified,
      };
      CAN_LOG_DEBUG && logger.debug(
        "Cache.requestCreation (detached): built and triggering search result and event for parented active searches (item definition)",
        itemDefinitionBasedParentedEvent,
      );
      this.listener.triggerParentedSearchListeners(
        itemDefinitionBasedParentedEvent,
        null, // TODO add the listener uuid, maybe?
      );

      const moduleBasedParentedEvent: IParentedSearchRecordsEvent = {
        ...itemDefinitionBasedParentedEvent,
        qualifiedPathName: modQualifiedPathName,
      };
      CAN_LOG_DEBUG && logger.debug(
        "Cache.requestCreation (detached): built and triggering search result and event for parented active searches (module)",
        moduleBasedParentedEvent,
      );
      this.listener.triggerParentedSearchListeners(
        moduleBasedParentedEvent,
        null, // TODO add the listener uuid, maybe?
      );
    }
  }

  /**
   * Request the creation of a new item definition value for an specific item definition
   * @param itemDefinition the item definition we refer to
   * @param forId an optional (or null) value for the id that is meant to be created for, when
   * forId is used the item should exist, note that the cache doesn't check for any of this
   * @param version an optional (or null) version for the item definition
   * @param value the value to create, the value can be partial
   * @param createdBy the creator of this item, it can be null, in which case the creator would be left unspecified
   * @param dictionary the dictionary to use, this can be left null as well when no text field is present but it is
   * recommended to be set, represents a postgresql dictionary for building text indexes
   * @param parent the parent of this item, can be left null, note that no checks for parenting are done it will
   * just execute
   * @param parent.id the parent id
   * @param parent.version the parent version
   * @param parent.type the parent type
   * @param listenerUUID the listener uuid
   * @returns a total sql combined row value that can be converted into grapqhl
   */
  public async requestCreation(
    itemDefinition: ItemDefinition,
    forId: string,
    version: string,
    value: IGQLArgs,
    createdBy: string,
    dictionary: string,
    containerId: string,
    parent: {
      id: string,
      version: string,
      type: string,
    },
    listenerUUID: string,
  ): Promise<ISQLTableRowValue> {
    const selfTable = itemDefinition.getQualifiedPathName();
    const moduleTable = itemDefinition.getParentModule().getQualifiedPathName();

    CAN_LOG_DEBUG && logger.debug(
      "Cache.requestCreation: requesting creation for " + selfTable + " at module " +
      moduleTable + " for id " + forId + " and version " + version + " created by " + createdBy + " using dictionary " + dictionary,
    );

    const containerExists = containerId && this.storageClients[containerId];

    // now we extract the SQL information for both item definition table
    // and the module table, this value is database ready, and hence needs
    // knex and the dictionary to convert fields that need it
    const sqlIdefDataComposed: ISQLStreamComposedTableRowValue = convertGQLValueToSQLValueForItemDefinition(
      this.knex,
      this.serverData,
      itemDefinition,
      value,
      null,
      containerExists ? this.storageClients[containerId] : null,
      this.domain,
      dictionary,
    );
    const sqlModDataComposed: ISQLStreamComposedTableRowValue = convertGQLValueToSQLValueForModule(
      this.knex,
      this.serverData,
      itemDefinition.getParentModule(),
      value,
      null,
      containerExists ? this.storageClients[containerId] : null,
      this.domain,
      dictionary,
    );
    const sqlModData: ISQLTableRowValue = sqlModDataComposed.value;
    const sqlIdefData: ISQLTableRowValue = sqlIdefDataComposed.value;

    // this data is added every time when creating
    sqlModData.type = itemDefinition.getQualifiedPathName();
    sqlModData.created_at = this.knex.fn.now();
    sqlModData.last_modified = this.knex.fn.now();
    sqlModData.created_by = createdBy || UNSPECIFIED_OWNER;
    sqlModData.version = version || "";
    sqlModData.container_id = containerId;

    if (!forId && version) {
      throw new EndpointError({
        message: "You can't specify a version without a standard for_id value",
        code: ENDPOINT_ERRORS.FORBIDDEN,
      });
    } else if (forId) {
      // now this is important
      sqlModData.id = forId;

      // let's find if such a value exists already
      const currentValue = await this.requestValue(
        itemDefinition,
        forId,
        version,
      );

      // if there's one it's a forbidden action
      if (currentValue) {
        throw new EndpointError({
          message: "You can't override an existant value by requesting creation on top of it",
          code: ENDPOINT_ERRORS.FORBIDDEN,
        });
      }

      if (version) {
        // otherwise let's find the unversioned value if a version was specified
        const unversionedValue = await this.requestValue(
          itemDefinition,
          forId,
          null,
        );

        // if no such value of any version exists
        if (!unversionedValue) {
          throw new EndpointError({
            message: "Theres no unversioned value for this version creation",
            code: ENDPOINT_ERRORS.FORBIDDEN,
          });
        }
      }
    }

    if (parent) {
      CAN_LOG_DEBUG && logger.debug(
        "Cache.requestCreation: parent specified is id " + parent.id + " with version " + parent.version + " and type " + parent.type,
      );
      sqlModData.parent_id = parent.id;
      // the version can never be null, so we must cast it into the invalid
      // empty string value
      sqlModData.parent_version = parent.version || "";
      sqlModData.parent_type = parent.type;
    }

    CAN_LOG_DEBUG && logger.debug(
      "Cache.requestCreation: finalizing SQL data with module data",
      {
        ...sqlModData,
        created_at: "[this.knex.fn.now()]",
        last_modified: "[this.knex.fn.now()]",
      },
    );

    CAN_LOG_DEBUG && logger.debug(
      "Cache.requestCreation: finalizing SQL data with item definition data",
      sqlIdefData,
    );

    // now let's build the transaction for the insert query which requires
    // two tables to be modified, and it always does so, as item definition information
    // must be added because create requires so
    let sqlValue: ISQLTableRowValue;

    try {
      sqlValue = convertVersionsIntoNullsWhenNecessary(
        await this.knex.transaction(async (transactionKnex) => {
          // so we insert in the module, this is very simple
          // we use the transaction in the module table
          // insert the sql data that we got ready, and return
          // the requested columns in sql, there's always at least 1
          // because we always need the id
          const insertQueryValueMod = await transactionKnex(moduleTable)
            .insert(sqlModData).returning("*");

          // so with that in mind, we add the foreign key column value
          // for combining both and keeping them joined togeher
          sqlIdefData[CONNECTOR_SQL_COLUMN_ID_FK_NAME] = insertQueryValueMod[0].id;
          sqlIdefData[CONNECTOR_SQL_COLUMN_VERSION_FK_NAME] = insertQueryValueMod[0].version;

          // so now we create the insert query
          const insertQueryIdef = transactionKnex(selfTable).insert(sqlIdefData).returning("*");
          // so we call the qery
          const insertQueryValueIdef = await insertQueryIdef;

          // and we return the joined result
          return {
            ...insertQueryValueMod[0],
            ...insertQueryValueIdef[0],
          };
        }),
      );
    } catch (err) {
      logger.error(
        "Cache.requestCreation [SERIOUS]: intercepted database insert error with error information",
        {
          errMessage: err.message,
          errStack: err.stack,
          selfTable,
          moduleTable,
          forId,
          version,
          sqlIdefData,
          sqlModData,
        }
      );
      throw err;
    }

    CAN_LOG_DEBUG && logger.debug(
      "Cache.requestCreation: consuming binary information streams",
    );

    try {
      await sqlIdefDataComposed.consumeStreams(sqlValue.id + "." + (sqlValue.version || ""));
    } catch (err) {
      logger.error(
        "Cache.requestCreation [SERIOUS]: could not consume item definition streams, data is corrupted",
        {
          errMessage: err.message,
          errStack: err.stack,
          selfTable,
          moduleTable,
          forId,
          version,
        }
      );
    }
    try {
      await sqlModDataComposed.consumeStreams(sqlValue.id + "." + (sqlValue.version || ""));
    } catch (err) {
      logger.error(
        "Cache.requestCreation [SERIOUS]: could not consume module streams, data is corrupted",
        {
          errMessage: err.message,
          errStack: err.stack,
          selfTable,
          moduleTable,
          forId,
          version,
        }
      );
    }

    (async () => {
      CAN_LOG_DEBUG && logger.debug(
        "Cache.requestCreation (detached): storing cache value from the action",
      );
      await this.forceCacheInto(selfTable, sqlValue.id, sqlValue.version, sqlValue);
      const changeEvent: IChangedFeedbackEvent = {
        itemDefinition: selfTable,
        id: sqlValue.id,
        version: version || null,
        type: "created",
        lastModified: null,
      };

      CAN_LOG_DEBUG && logger.debug(
        "Cache.requestCreation (detached): built and triggering created change event",
        changeEvent,
      );
      this.listener.triggerChangedListeners(
        changeEvent,
        sqlValue,
        listenerUUID,
      );

      const searchResultForThisValue: IGQLSearchRecord = {
        id: sqlValue.id,
        version: sqlValue.version || null,
        type: selfTable,
        last_modified: sqlValue.last_modified,
      };

      this.triggerSearchListenersFor(
        itemDefinition,
        createdBy,
        parent,
        searchResultForThisValue,
        "new",
      );
    })();

    return sqlValue;
  }

  /**
   * Requests an update for an item definition in a simple way
   * this might have more overhead than the normal request update
   * @param itemDefinition the item definition in question
   * @param id 
   * @param version 
   * @param update 
   * @param dictionary 
   */
  public async requestUpdateSimple(
    itemDefinition: ItemDefinition,
    id: string,
    version: string,
    update: IGQLArgs,
    dictionary: string,
  ) {
    const currentValue = await this.requestValue(itemDefinition, id, version);
    const currentValueAsGQL = convertSQLValueToGQLValueForItemDefinition(
      this.knex,
      this.serverData,
      itemDefinition,
      currentValue,
    );
    await this.requestUpdate(
      itemDefinition,
      id,
      version,
      update,
      currentValueAsGQL,
      null,
      dictionary,
      currentValue.container_id,
      null,
    );
  }

  /**
   * Requests an update for an item definition where new values are set for this existent item
   * definition value, these are taken as instructions and no checks are done on it
   * @param itemDefinition the item definition in question
   * @param id the id to update
   * @param version the version of that id to update
   * @param update the update in question (partial values are allowed)
   * @param currentValue a current value as graphql, the current value can be requested from the
   * cache itself, and then converted into graphql, but this is expensive, while for the edit process
   * this is done anyway because of checks, if you are running this manually you might not need to pass these
   * the reason current value are necessary is in order to perform a diffing operation and remove orphan files
   * if your update process doesn't leave orphan files, as in you are not updating any file field, you can
   * pass null to the current value 
   * @param editedBy the editor id, this causes the edited_at and edited_by field to change, however you can pass
   * null to this value in order to mark it as computer edited rather than edited by an user
   * @param dictionary the dictionary to use, just like the current value this is only relevant if you are
   * updating full text search enabled fields, if that is not the case, you can pass null to the dictionary, but
   * be careful
   * @param containerId the container id where this item is stored, please when using update ensure to select the same
   * container that the item is already created otherwise this will break the uploads and make them unreachable
   * if you are passing no uploads it's safe to leave as null
   * @param listenerUUID the listener uuid, from the listener, this ensures that the executor of this action doesn't
   * get a notification, you can pass null for this if this is a computer operation and let every listener to be informed
   * while it doesn't hurt to keep listenerUUID as null, it is expensive to send messages when they will be of no use the
   * listener uuid ensures only those that needs updates will get them
   * @returns a total combined table row value that can be converted into graphql
   */
  public async requestUpdate(
    itemDefinition: ItemDefinition,
    id: string,
    version: string,
    update: IGQLArgs,
    currentValue: IGQLValue,
    editedBy: string,
    dictionary: string,
    containerId: string,
    listenerUUID: string,
  ): Promise<ISQLTableRowValue> {
    const selfTable = itemDefinition.getQualifiedPathName();
    const moduleTable = itemDefinition.getParentModule().getQualifiedPathName();

    CAN_LOG_DEBUG && logger.debug(
      "Cache.requestUpdate: requesting update for " + selfTable + " at module " +
      moduleTable + " for id " + id + " and version " + version + " edited by " + editedBy + " using dictionary " + dictionary + " and " +
      "container id " + containerId,
    );

    // We get only the fields that we expect to be updated
    // in the definition
    const partialUpdateFields: IGQLArgs = {};
    Object.keys(update).map(async (arg) => {
      if (
        itemDefinition.hasPropertyDefinitionFor(arg, true) ||
        (
          arg.startsWith(INCLUDE_PREFIX) &&
          itemDefinition.hasIncludeFor(arg.replace(INCLUDE_PREFIX, "").replace(EXCLUSION_STATE_SUFFIX, ""))
        )
      ) {
        partialUpdateFields[arg] = update[arg];
      }
    });

    const containerExists = containerId && this.storageClients[containerId];

    // and we now build both queries for updating
    // we are telling by setting the partialFields variable
    // that we only want the editingFields to be returned
    // into the SQL value, this is valid in here because
    // we don't want things to be defaulted in the query
    const sqlIdefDataComposed = convertGQLValueToSQLValueForItemDefinition(
      this.knex,
      this.serverData,
      itemDefinition,
      update,
      currentValue,
      containerExists ? this.storageClients[containerId] : null,
      this.domain,
      dictionary,
      partialUpdateFields,
    );
    const sqlModDataComposed = convertGQLValueToSQLValueForModule(
      this.knex,
      this.serverData,
      itemDefinition.getParentModule(),
      update,
      currentValue,
      containerExists ? this.storageClients[containerId] : null,
      this.domain,
      dictionary,
      partialUpdateFields,
    );
    const sqlModData: ISQLTableRowValue = sqlModDataComposed.value;
    const sqlIdefData: ISQLTableRowValue = sqlIdefDataComposed.value;

    // now we check if we are updating anything at all
    if (
      Object.keys(sqlIdefData).length === 0 &&
      Object.keys(sqlModData).length === 0
    ) {
      throw new EndpointError({
        message: "You are not updating anything whatsoever",
        code: ENDPOINT_ERRORS.NOTHING_TO_UPDATE,
      });
    }

    // update when it was edited
    if (editedBy) {
      sqlModData.edited_at = this.knex.fn.now();
      sqlModData.edited_by = editedBy;
    }
    sqlModData.last_modified = this.knex.fn.now();

    CAN_LOG_DEBUG && logger.debug(
      "Cache.requestUpdate: finalizing SQL data with module data",
      sqlModData.edited_at ? {
        ...sqlModData,
        edited_at: "[this.knex.fn.now()]",
        last_modified: "[this.knex.fn.now()]",
      } : {
          ...sqlModData,
          last_modified: "[this.knex.fn.now()]",
        },
    );

    CAN_LOG_DEBUG && logger.debug(
      "Cache.requestUpdate: finalizing SQL data with item definition data",
      sqlIdefData,
    );

    // we build the transaction for the action
    let sqlValue: ISQLTableRowValue;
    try {
      sqlValue = convertVersionsIntoNullsWhenNecessary(
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
    } catch (err) {
      logger.error(
        "Cache.requestUpdate [SERIOUS]: intercepted database update error with error information",
        {
          errMessage: err.message,
          errStack: err.stack,
          selfTable,
          moduleTable,
          id,
          version,
          sqlIdefData,
          sqlModData,
        }
      );
      throw err;
    }

    CAN_LOG_DEBUG && logger.debug(
      "Cache.requestUpdate: consuming binary information streams",
    );

    try {
      await sqlIdefDataComposed.consumeStreams(sqlValue.id + "." + (sqlValue.version || ""));
    } catch (err) {
      logger.error(
        "Cache.requestCreation [SERIOUS]: could not consume item definition streams, data is corrupted",
        {
          errMessage: err.message,
          errStack: err.stack,
          selfTable,
          moduleTable,
          id,
          version,
        }
      );
    }
    try {
      await sqlModDataComposed.consumeStreams(sqlValue.id + "." + (sqlValue.version || ""));
    } catch (err) {
      logger.error(
        "Cache.requestCreation [SERIOUS]: could not consume module streams, data is corrupted",
        {
          errMessage: err.message,
          errStack: err.stack,
          selfTable,
          moduleTable,
          id,
          version,
        }
      );
    }

    // we return and this executes after it returns
    (async () => {
      CAN_LOG_DEBUG && logger.debug(
        "Cache.requestUpdate (detached): storing cache value from the action",
      );
      await this.forceCacheInto(selfTable, id, version, sqlValue);
      const changeEvent: IChangedFeedbackEvent = {
        itemDefinition: selfTable,
        id,
        version: version || null,
        type: "modified",
        lastModified: null,
      };
      CAN_LOG_DEBUG && logger.debug(
        "Cache.requestUpdate (detached): built and triggering updated change event",
        changeEvent,
      );
      this.listener.triggerChangedListeners(
        changeEvent,
        sqlValue,
        listenerUUID || null,
      );

      const searchRecord: IGQLSearchRecord = {
        id,
        version: version || null,
        type: selfTable,
        last_modified: sqlValue.last_modified,
      };

      this.triggerSearchListenersFor(
        itemDefinition,
        sqlValue.created_by || null,
        (
          sqlValue.parent_id ? {
            id: sqlValue.parent_id,
            version: sqlValue.parent_version || null,
            type: sqlValue.parent_type,
          } : null
        ),
        searchRecord,
        "modified",
      );
    })();

    return sqlValue;
  }

  /**
  * This function analyzes an item definition to check for a possible
  * parent and returns true if there's any parent rule within itself, including
  * its children that matches the possible parent
  * @param possibleParent the possible parent
  * @param idef the item definition in question
  * @returns a simple boolean
  */
  private analyzeIdefForPossibleParent(possibleParent: ItemDefinition, idef: ItemDefinition): boolean {
    const canBeParented = idef.checkCanBeParentedBy(possibleParent, false);
    if (canBeParented) {
      return true;
    }

    return idef.getChildDefinitions().some(this.analyzeIdefForPossibleParent.bind(this, possibleParent));
  }

  /**
  * This function finds modules for a given module, including its children
  * that do match a possible parent rule
  * @param possibleParent the possible parent
  * @param module the current module to analyze
  * @returns a list of modules
  */
  private analyzeModuleForPossibleParent(possibleParent: ItemDefinition, module: Module): Module[] {
    // first we set up the modules we have collected, nothing yet
    let collectedModules: Module[] = [];
    // now we check if at least one of the item definitions within this module
    // can be set as child of the given possible parent
    const canAtLeastOneIdefBeChildOf = module.getAllChildItemDefinitions().some(this.analyzeIdefForPossibleParent.bind(this, possibleParent));
    // if that's the case we add this same module to the list
    if (canAtLeastOneIdefBeChildOf) {
      collectedModules.push(module);
    }

    // now we need to check the child modules, for that we run this function recursively
    const childModules = module.getAllModules().map(this.analyzeModuleForPossibleParent.bind(this, possibleParent)) as Module[];
    // and now we check if we got anything, if we did
    if (childModules.length) {
      // we concat the result
      collectedModules = collectedModules.concat(childModules);
    }

    // and return that
    return collectedModules;
  }

  /**
 * Deletes all the possible children that might have been set as parent of the deleted
 * item definition value
 * @param itemDefinition 
 * @param id 
 * @param version 
 */
  private async deletePossibleChildrenOf(
    itemDefinition: ItemDefinition,
    id: string,
    version: string,
  ) {
    // first we need to find if there is even such a rule and in which modules so we can
    // query the database
    const modulesThatMightBeSetAsChildOf: Module[] =
      this.root.getAllModules().map(this.analyzeModuleForPossibleParent.bind(this, itemDefinition)).flat() as Module[];

    // if such is the case
    if (modulesThatMightBeSetAsChildOf.length) {
      // we get this is our current deleted item qualified name, and it's our parent type
      const idefQualified = itemDefinition.getQualifiedPathName();

      // now we can loop in these modules
      await Promise.all(modulesThatMightBeSetAsChildOf.map(async (mod) => {
        // and ask for results from the module table, where parents do match this
        let results: ISQLTableRowValue[];
        try {
          results = await this.knex.select(["id", "version", "type", "container_id"]).from(mod.getQualifiedPathName()).where({
            parent_id: id,
            parent_version: version || "",
            parent_type: idefQualified,
          });
        } catch (err) {
          logger.error(
            "Cache.deletePossibleChildrenOf (MAYBE-ORPHANED): Failed to attempt to find orphans for deleting",
            {
              errMessage: err.message,
              errStack: err.stack,
              parentItemDefinition: itemDefinition.getQualifiedPathName(),
              parentId: id,
              parentVersion: version,
              moduleChildCheck: mod.getQualifiedPathName(),
            },
          );
          return;
        }

        // if we got results
        if (results.length) {
          // then we need to delete each, one by one
          await Promise.all(results.map(async (r) => {
            // we use the registry to get the proper item definition that represented
            // that module item
            const deleteItemDefinition = this.root.registry[r.type] as ItemDefinition;
            try {
              // and request a delete on it
              await this.requestDelete(
                deleteItemDefinition,
                r.id,
                r.version || null,
                false,
                r.container_id,
                null,
              );
            } catch (err) {
              logger.error(
                "Cache.deletePossibleChildrenOf (ORPHANED): Failed to delete an orphan",
                {
                  errMessage: err.message,
                  errStack: err.stack,
                  orphanItemDefinition: deleteItemDefinition.getQualifiedPathName(),
                  orphanId: r.id,
                  orphanVersion: r.version || null,
                },
              );
            }
          }));
        }
      }));
    }
  }

  /**
   * Request the deletition of an item definition value
   * @param itemDefinition the item definition to delete a value for
   * @param id the id to delete for
   * @param version the version to delete for
   * @param dropAllVersions whether to drop all versions
   * @param containerId the container id where these files are currently stored, ensure to pass the exact same one
   * unsafe not to pass so it's required
   * @param listenerUUID the listener uuid, from the listener, this ensures that the executor of this action doesn't
   * get a notification, you can pass null for this if this is a computer operation and let every listener to be informed
   * while it doesn't hurt to keep listenerUUID as null, it is expensive to send messages when they will be of no use the
   * listener uuid ensures only those that needs updates will get them
   */
  public async requestDelete(
    itemDefinition: ItemDefinition,
    id: string,
    version: string,
    dropAllVersions: boolean,
    containerId: string,
    listenerUUID: string,
  ): Promise<void> {
    // so first we need to get these two
    const selfTable = itemDefinition.getQualifiedPathName();
    const moduleTable = itemDefinition.getParentModule().getQualifiedPathName();

    CAN_LOG_DEBUG && logger.debug(
      "Cache.requestDelete: requesting delete for " + selfTable + " at module " +
      moduleTable + " for id " + id + " and version " + version + " drop all versions is " + dropAllVersions,
    );

    // whether we have a container for this
    const containerExists = containerId && this.storageClients[containerId];

    // this helper function will allow us to delete all the files
    // for a given version, if we are dropping all version this is useful
    // we want to delete files
    const deleteFilesInContainer = async (specifiedVersion: string) => {
      // first we need to find if we have any file type in either the property
      // definitions of the prop extensions, any will do
      const someFilesInItemDef = itemDefinition.getAllPropertyDefinitions()
        .some((pdef) => pdef.getPropertyDefinitionDescription().gqlAddFileToFields);
      const someFilesInModule = itemDefinition.getParentModule().getAllPropExtensions()
        .some((pdef) => pdef.getPropertyDefinitionDescription().gqlAddFileToFields);

      // for item definition found files
      if (someFilesInItemDef) {
        // we need to ensure the container exists and is some value
        if (containerExists) {
          // and now we can try to delete everything in there
          // for our given domain and with the handle mysite.com/MOD_x__IDEF_y/id.version
          // that will delete literally everything for the given id.version combo
          try {
            await deleteEverythingInFilesContainerId(
              this.domain,
              this.storageClients[containerId],
              itemDefinition,
              id + "." + (specifiedVersion || null),
            );
          } catch (err) {
            logger.error(
              "Cache.requestDelete [SERIOUS]: Could not remove all the files for item definition storage",
              {
                domain: this.domain,
                containerId,
                itemDefinition: itemDefinition.getQualifiedPathName(),
                id,
                version: specifiedVersion || null,
              }
            );
          }
        } else {
          logger.warn(
            "Cache.requestDelete: Item for " + selfTable + " contains a file field but no container id for data storage is available",
            {
              containerId,
            }
          );
        }
      }

      // this is doing exactly the same but for the module
      if (someFilesInModule) {
        if (containerExists) {
          try {
            await deleteEverythingInFilesContainerId(
              this.domain,
              this.storageClients[containerId],
              itemDefinition.getParentModule(),
              id + "." + (specifiedVersion || null),
            );
          } catch (err) {
            logger.error(
              "Cache.requestDelete [SERIOUS]: Could not remove all the files for module storage",
              {
                domain: this.domain,
                containerId,
                module: itemDefinition.getParentModule().getQualifiedPathName(),
                id,
                version: specifiedVersion || null,
              }
            );
          }
        } else {
          logger.warn(
            "Cache.requestDelete: Item for " + selfTable + " at module contains a file field but no container id for data storage is available",
            {
              containerId,
            }
          );
        }
      }
    }

    // performs the proper deletetition of whatever is in there
    // it takes the record that represents what we are deleting, the parent (or null) and the creator
    const performProperDeleteOf = async (record: IGQLSearchRecord, parent: { id: string; version: string; type: string }, createdBy: string) => {
      // got to cascade and delete all the children, this method should be able to execute after
      this.deletePossibleChildrenOf(itemDefinition, id, record.version);
      // got to trigger the search listeners saying we have just lost an item
      this.triggerSearchListenersFor(itemDefinition, createdBy, parent, record, "lost");

      try {
        // update the cache with the new value
        await this.forceCacheInto(selfTable, id, record.version, null);
        // trigger the change event informing of the update
        const changeEvent: IChangedFeedbackEvent = {
          itemDefinition: selfTable,
          id,
          version: record.version,
          type: "not_found",
          lastModified: null,
        };
        this.listener.triggerChangedListeners(
          changeEvent,
          null,
          listenerUUID || null,
        );
        // we don't await for this delete to happen
        deleteFilesInContainer(record.version);
      } catch (err) {
        logger.error(
          "Cache.requestDelete: Could not force cache into new value",
          {
            errMessage: err.message,
            errStack: err.stack,
          }
        );
      }
    }

    // now time to do this and actually do the dropping
    try {
      // dropping all versions is a tricky process, first we need to drop everything
      if (dropAllVersions) {
        // for that we run a transaction
        const allVersionsDropped: ISQLTableRowValue[] = await this.knex.transaction(async (transactionKnex) => {
          // and we delete based on id and type
          const allVersionsDroppedInternal: ISQLTableRowValue[] = await transactionKnex(moduleTable).delete().where({
            id,
            type: selfTable,
          }).returning(["version", "parent_id", "parent_type", "parent_version", "created_by"]);
          // but yet we return the version to see what we dropped, and well parenting and creator

          // and now we need to store the fact we have lost these records in the deleted registry
          const trasactionTimes = await Promise.all(allVersionsDroppedInternal.map(async (row) => {
            const insertQueryValue = await transactionKnex(DELETED_REGISTRY_IDENTIFIER).insert({
              id,
              version: version || "",
              type: selfTable,
              module: moduleTable,
              created_by: row.created_by || null,
              parenting_id: row.parent_id ? (row.parent_type + "." + row.parent_id + "." + row.parent_version || "") : null,
              transaction_time: transactionKnex.fn.now(),
            }).returning("transaction_time");

            // but we need the transaction time for each as the new record
            // last_modified is that transaction time
            return insertQueryValue[0].transaction_time as string;
          }));

          // now we return these rows we got with version, parent_id, parent_type, parent_version and created_by
          // but we add last_modified based on the insert query
          return allVersionsDroppedInternal.map((row, index) => ({
            ...row,
            last_modified: trasactionTimes[index],
          }));
        });

        // and now we can see all what we have dropped
        allVersionsDropped.forEach((row) => {
          // this version can be null (aka empty string)
          // we need to construct the record
          // the last modified is the transaction time of the deletition
          const record: IGQLSearchRecord = {
            id,
            version: row.version || null,
            last_modified: row.last_modified,
            type: selfTable,
          };
          // build the parent
          const parent = row.parent_id ? {
            id: row.parent_id,
            type: row.parent_type,
            version: row.parent_version || null,
          } : null;
          const createdBy = row.created_by;

          // and now we can perform the proper delete where
          // we update the caches
          // we do this without awaiting, as for all it concerns
          // our action is done and only events will need to fire
          performProperDeleteOf(record, parent, createdBy);
        });
      } else {
        // otherwise if we are deleting a specific version
        const row = await this.knex.transaction(async (transactionKnex) => {
          // we run this
          // because the index in the item definition cascades
          const internalDroppedRows = await transactionKnex(moduleTable).delete().where({
            id,
            version: version || "",
            type: selfTable,
          }).returning(["parent_id", "parent_type", "parent_version", "created_by"]);

          // now we got the row we have dropped, it's the first one
          const interalDroppedRow = internalDroppedRows[0];

          // and now we got to insert that row into the deleted registry
          // and retrieve the transaction time
          const insertQueryValue = await transactionKnex(DELETED_REGISTRY_IDENTIFIER).insert({
            id,
            version: version || "",
            type: selfTable,
            module: moduleTable,
            created_by: interalDroppedRow.created_by || null,
            parenting_id: interalDroppedRow.parent_id ?
              (interalDroppedRow.parent_type + "." + interalDroppedRow.parent_id + "." + interalDroppedRow.parent_version || "") :
              null,
            transaction_time: transactionKnex.fn.now(),
          }).returning("transaction_time");

          // and we set it as last modified
          return {
            ...interalDroppedRow,
            last_modified: insertQueryValue[0].transaction_time,
          };
        });

        // now we can build our search record
        const record: IGQLSearchRecord = {
          id,
          version: version || null,
          last_modified: row.last_modified,
          type: selfTable,
        };
        // the parent
        const parent = row.parent_id ? {
          id: row.parent_id,
          type: row.parent_type,
          version: row.parent_version || null,
        } : null;
        const createdBy = row.created_by;
        // we don't want to await any of this
        performProperDeleteOf(record, parent, createdBy);
      }
    } catch (err) {
      logger.error(
        "Cache.requestDelete [SERIOUS]: intercepted database delete error with error information",
        {
          errMessage: err.message,
          errStack: err.stack,
          selfTable,
          moduleTable,
          id,
          version,
          dropAllVersions,
        }
      );
      throw err;
    }
  }

  /**
   * Provides a valid token for a given
   * user, you might not really want to use this method
   * unless you are fairly sure as these are permanent tokens
   * for users for their given session id, normally you would use
   * these tokens for redirected logins
   * @param id the user id
   */
  public async requestToken(
    id: string,
  ) {
    const user = await this.requestValue("MOD_users__IDEF_user", id, null);
    if (!user) {
      throw new EndpointError({
        message: "User does not exist",
        code: ENDPOINT_ERRORS.USER_REMOVED,
      });
    } else if (user.blocked_at) {
      throw new EndpointError({
        message: "User has been banned",
        code: ENDPOINT_ERRORS.USER_BLOCKED,
      });
    }

    return await jwtSign({
      id: user.id,
      role: user.role,
      sessionId: user.session_id || 0,
    }, this.sensitiveConfig.jwtKey);
  }

  /**
   * Requests a value from the cache
   * @param itemDefinitionOrQualifiedName the item definition or a qualified name
   * @param id the id to request for
   * @param version the version
   * @param options.refresh whether to skip the cache and request directly from the database and update the cache
   * @param options.useMemoryCache a total opposite of refresh, (do not use together as refresh beats this one)
   * which will use a 1 second memory cache to retrieve values and store them, use this if you think the value
   * might be used consecutively and you don't care about accuraccy that much
   * @returns a whole sql value that can be converted into graphql if necessary
   */
  public async requestValue(
    itemDefinitionOrQualifiedName: ItemDefinition | string,
    id: string,
    version: string,
    options?: {
      refresh?: boolean,
      useMemoryCache?: boolean,
    },
  ): Promise<ISQLTableRowValue> {
    const refresh = options && options.refresh;
    const memCache = options && options.useMemoryCache;

    const itemDefinition = typeof itemDefinitionOrQualifiedName === "string" ?
      this.root.registry[itemDefinitionOrQualifiedName] as ItemDefinition :
      itemDefinitionOrQualifiedName;

    const idefTable = itemDefinition.getQualifiedPathName();
    const moduleTable = itemDefinition.getParentModule().getQualifiedPathName();

    CAN_LOG_DEBUG && logger.debug(
      "Cache.requestValue: requesting value for " + idefTable + " at module " +
      moduleTable + " for id " + id + " and version " + version + " with refresh " + !!refresh,
    );

    if (!refresh) {
      const idefQueryIdentifier = "IDEFQUERY:" + idefTable + "." + id.toString() + "." + (version || "");
      if (memCache && this.memoryCache[idefQueryIdentifier]) {
        return this.memoryCache[idefQueryIdentifier].value;
      }
      const currentValue = await this.getRaw<ISQLTableRowValue>(idefQueryIdentifier);
      if (currentValue) {
        if (memCache) {
          this.memoryCache[idefQueryIdentifier] = currentValue;
          setTimeout(() => {
            delete this.memoryCache[idefQueryIdentifier];
          }, MEMCACHE_EXPIRES_MS);
        }
        return currentValue.value;
      }
    }

    CAN_LOG_DEBUG && logger.debug(
      "Cache.requestValue: not found in memory or refresh expected, requesting database",
    );

    try {
      const queryValue: ISQLTableRowValue = convertVersionsIntoNullsWhenNecessary(
        // let's remember versions as null do not exist in the database, instead it uses
        // the invalid empty string "" value
        await this.knex.first("*").from(moduleTable)
          .where("id", id).andWhere("version", version || "").join(idefTable, (clause) => {
            clause.on(CONNECTOR_SQL_COLUMN_ID_FK_NAME, "=", "id");
            clause.on(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "=", "version");
          }) || null);
      // we don't wait for this
      this.forceCacheInto(idefTable, id, version, queryValue);

      if (memCache) {
        const idefQueryIdentifier = "IDEFQUERY:" + idefTable + "." + id.toString() + "." + (version || "");
        this.memoryCache[idefQueryIdentifier] = {
          value: queryValue,
        };
        setTimeout(() => {
          delete this.memoryCache[idefQueryIdentifier];
        }, MEMCACHE_EXPIRES_MS);
      }

      return queryValue;
    } catch (err) {
      logger.error(
        "Cache.requestValue [SERIOUS]: intercepted database request error with error information",
        {
          errMessage: err.message,
          errStack: err.stack,
          idefTable,
          moduleTable,
          id,
          version,
        }
      );
      throw err;
    }
  }

  /**
   * TODO Optimize this, right now it retrieves the list one by one
   * Requests a whole list of search results
   * @param records the records to request for
   * @returns a list of whole sql combined table row values
   */
  public async requestListCache(records: IGQLSearchRecord[]): Promise<ISQLTableRowValue[]> {
    const resultValues = await Promise.all(records.map((recordContainer) => {
      const itemDefinition = this.root.registry[recordContainer.type] as ItemDefinition;
      return this.requestValue(itemDefinition, recordContainer.id, recordContainer.version);
    }));
    return resultValues;
  }

  /**
   * Provides the current server data
   */
  public getServerData() {
    return this.serverData;
  }

  /**
   * This function is called once new server data was informed by a redis event
   * @param newData the new server data that redis is giving
   */
  public onServerDataChangeInformed(newData: IServerDataType) {
    CAN_LOG_DEBUG && logger.debug(
      "Cache.onServerDataChangeInformed: new server data has been informed",
    );
    this.serverData = newData;
  }

  /**
   * This function triggers once the remote listener has detected a change that has been done by
   * another server instance to a value that we are supposedly currently holding in memory 
   * @param itemDefinition the item definition qualified name
   * @param id the id of such
   * @param version the version or null
   * @param data the entire SQL result
   * @returns a void promise when done
   */
  public async onChangeInformed(itemDefinition: string, id: string, version: string, data?: ISQLTableRowValue) {
    const idefQueryIdentifier = "IDEFQUERY:" + itemDefinition + "." + id.toString() + "." + (version || "");
    try {
      const value = await this.redisClient.exists(idefQueryIdentifier);
      if (value) {
        if (typeof data === "undefined") {
          await this.requestValue(
            this.root.registry[itemDefinition] as ItemDefinition,
            id,
            version,
            {
              refresh: true,
            },
          );
        } else {
          // if we have such a value we want to update it
          await this.forceCacheInto(itemDefinition, id, version, data);
        }
      } else {
        // it's done, the value has just expired and it's not hold in
        // memory, we are done updating the redis database, we don't do anything
        // we don't need to worry about this value unless it's further requested
        // down the line

        // we simply unregister the event, if a client requests it later
        // it will be re registered and value fetched and repopulated
        this.listener.unregisterSS({
          itemDefinition,
          id,
          version,
        });
      }
    } catch (error) {
      logger.error(
        "Cache.onChangeInformed: could not retrieve existance for " + idefQueryIdentifier,
        {
          errStack: error.stack,
          errMessage: error.message,
        },
      );
    }
  }

  /**
   * wipes the cache, usually executed on edge cases during connectivity issues
   * with clusters and nodes, once the connection is restablished with redis
   * the cache is wiped by the cluster manager which handles the cache
   */
  public async wipe() {
    const serverDataStr = await this.redisClient.get(SERVER_DATA_IDENTIFIER) || null;
    const currencyFactorsCachedResponseRestore = await this.redisClient.get(CACHED_CURRENCY_RESPONSE) || null;
    await this.redisClient.flushall();
    if (serverDataStr) {
      await this.redisClient.set(SERVER_DATA_IDENTIFIER, serverDataStr);
    }
    if (currencyFactorsCachedResponseRestore) {
      await this.redisClient.set(CACHED_CURRENCY_RESPONSE, currencyFactorsCachedResponseRestore);
    }
  }

  public async onChangeInformedNoData(itemDefinition: string, id: string, version: string) {
    await this.onChangeInformed(itemDefinition, id, version, undefined);
  }
}
