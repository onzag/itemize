/**
 * This is a very important class that contains the whole redis
 * wrapping that basically keeps everything synchronized, all the servers
 * and tells the clients that are connected to this specific instance, it provides
 * functionality to update, create and delete item definition values
 *
 * @packageDocumentation
 */

import { RedisClient } from "redis";
import Knex from "knex";
import { CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME,
  UNSPECIFIED_OWNER, ENDPOINT_ERRORS, INCLUDE_PREFIX, EXCLUSION_STATE_SUFFIX } from "../constants";
import { ISQLTableRowValue, ISQLStreamComposedTableRowValue } from "../base/Root/sql";
import { IGQLSearchRecord, IGQLArgs, IGQLValue } from "../gql-querier";
import { convertVersionsIntoNullsWhenNecessary } from "./version-null-value";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import { Listener } from "./listener";
import Root from "../base/Root";
import { convertGQLValueToSQLValueForItemDefinition } from "../base/Root/Module/ItemDefinition/sql";
import { convertGQLValueToSQLValueForModule } from "../base/Root/Module/sql";
import { deleteEverythingInFilesContainerId } from "../base/Root/Module/ItemDefinition/PropertyDefinition/sql-files";
import { IOwnedSearchRecordsAddedEvent, IParentedSearchRecordsAddedEvent } from "../base/remote-protocol";
import { IChangedFeedbackEvent } from "../base/remote-protocol";
import { EndpointError } from "../base/errors";
import { logger, PkgCloudContainers, IServerDataType } from ".";

const CACHE_EXPIRES_DAYS = 14;

/**
 * The cache class that provides all the functionality that is
 * specified for the cache package, the cache is more than what
 * it name implies because it contains redis and it's the same in
 * all the servers
 */
export class Cache {
  private redisClient: RedisClient;
  private knex: Knex;
  private uploadsContainers: PkgCloudContainers;
  private root: Root;
  private serverData: IServerDataType;
  private listener: Listener;

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
  constructor(redisClient: RedisClient, knex: Knex, uploadsContainers: PkgCloudContainers, root: Root, initialServerData: IServerDataType) {
    this.redisClient = redisClient;
    this.knex = knex;
    this.root = root;
    this.uploadsContainers = uploadsContainers;
    this.serverData = initialServerData;
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
  public getRaw<T>(
    key: string,
  ): Promise<{value: T}> {
    logger.debug(
      "Cache.getRaw: requesting " + key,
    );
    // we build the promise
    return new Promise((resolve) => {
      // and call redis, note how we never reject
      this.redisClient.get(key, (error, value) => {
        // we just resolve to null if we have to
        if (value === null) {
          resolve(null);
        }
        // if we don't have any error
        if (!error) {
          // we try to resolve to the parsed json value
          try {
            resolve({
              value: JSON.parse(value),
            });
            // and poke the cache to reset the clock for expiration
            this.pokeCache(key);
          } catch (err) {
            logger.error(
              "Cache.getRaw: could not JSON parse value from cache in " + key,
              value,
            );
            // resolve it to null in case of problem
            resolve(null);
          }
        } else {
          logger.error(
            "Cache.getRaw: could not retrieve value from redis cache client for " + key + " with error",
            {
              errStack: error.stack,
              errMessage: error.message,
            },
          );
          // also here
          resolve(null);
        }
      });
    });
  }

  public setRaw(key: string, value: any) {
    logger.debug(
      "Cache.setRaw: setting " + key,
    );
    return new Promise((resolve) => {
      this.redisClient.set(key, JSON.stringify(value), (error) => {
        resolve(value);
        if (!error) {
          this.pokeCache(key);
        } else {
          logger.error(
            "Cache.forceCacheInto: could not set value for " + key + " with error",
            {
              errStack: error.stack,
              errMessage: error.message,
            },
          );
        }
      });
    });
  }
  /**
   * Resets the expiration clock of a given identifier
   * @param keyIdentifier the identifier
   */
  private pokeCache(keyIdentifier: string) {
    logger.debug(
      "Cache.pokeCache: poking " + keyIdentifier,
    );
    this.redisClient.expire(keyIdentifier, CACHE_EXPIRES_DAYS * 86400, (err) => {
      if (err) {
        logger.error(
          "Cache.pokeCache: could not poke " + keyIdentifier + " with error",
          err.stack ? err.stack : err.message,
        );
      }
    });
  }

  /**
   * forces a cached value for a given item definition table in an id and version
   * @param idefTable the item definition table or its qualified name
   * @param id the id
   * @param version the version or null
   * @param value the value to store
   */
  private forceCacheInto(idefTable: string, id: number, version: string, value: ISQLTableRowValue) {
    const idefQueryIdentifier = "IDEFQUERY:" + idefTable + "." + id.toString() + "." + (version || "");
    logger.debug(
      "Cache.forceCacheInto: setting new cache value for " + idefQueryIdentifier,
    );
    logger.silly(
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
   * @returns a total sql combined row value that can be converted into grapqhl
   */
  public async requestCreation(
    itemDefinition: ItemDefinition,
    forId: number,
    version: string,
    value: IGQLArgs,
    createdBy: number,
    dictionary: string,
    containerId: string,
    parent: {
      id: number,
      version: string,
      type: string,
    }
  ): Promise<ISQLTableRowValue> {
    const selfTable = itemDefinition.getQualifiedPathName();
    const moduleTable = itemDefinition.getParentModule().getQualifiedPathName();

    logger.debug(
      "Cache.requestCreation: requesting creation for " + selfTable + " at module " +
        moduleTable + " for id " + forId + " and version " + version + " created by " + createdBy + " using dictionary " + dictionary,
    );
    // now we extract the SQL information for both item definition table
    // and the module table, this value is database ready, and hence needs
    // knex and the dictionary to convert fields that need it
    const sqlIdefDataComposed: ISQLStreamComposedTableRowValue = convertGQLValueToSQLValueForItemDefinition(
      this.knex,
      this.serverData,
      itemDefinition,
      value,
      null,
      this.uploadsContainers[containerId].container,
      this.uploadsContainers[containerId].prefix,
      dictionary,
    );
    const sqlModDataComposed: ISQLStreamComposedTableRowValue = convertGQLValueToSQLValueForModule(
      this.knex,
      this.serverData,
      itemDefinition.getParentModule(),
      value,
      null,
      this.uploadsContainers[containerId].container,
      this.uploadsContainers[containerId].prefix,
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

    if (forId && version === null) {
      throw new EndpointError({
        message: "You can't specify your own id for values without version",
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

      // otherwise let's find the unversioned value
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

    if (parent) {
      logger.debug(
        "Cache.requestCreation: parent specified is id " + parent.id + " with version " + parent.version + " and type " + parent.type,
      );
      sqlModData.parent_id = parent.id;
      // the version can never be null, so we must cast it into the invalid
      // empty string value
      sqlModData.parent_version = parent.version || "";
      sqlModData.parent_type = parent.type;
    }

    logger.debug(
      "Cache.requestCreation: finalizing SQL data with module data",
      sqlModData,
    );

    logger.debug(
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

    logger.debug(
      "Cache.requestCreation: consuming binary information streams",
    );
    await sqlIdefDataComposed.consumeStreams(sqlValue.id + "." + (sqlValue.version || ""));
    await sqlModDataComposed.consumeStreams(sqlValue.id + "." + (sqlValue.version || ""));

    (async () => {
      logger.debug(
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

      logger.debug(
        "Cache.requestCreation (detached): built and triggering created change event",
        changeEvent,
      );
      this.listener.triggerChangedListeners(
        changeEvent,
        sqlValue,
        null,
      );

      const searchResultForThisValue: IGQLSearchRecord = {
        id: sqlValue.id,
        version: sqlValue.version || null,
        type: selfTable,
        created_at: sqlValue.created_at,
      };
    
      const itemDefinitionBasedOwnedEvent: IOwnedSearchRecordsAddedEvent = {
        qualifiedPathName: selfTable,
        createdBy: itemDefinition.isOwnerObjectId() ? sqlValue.id : sqlModData.created_by,
        newRecords: [
          searchResultForThisValue,
        ],
        newLastRecordDate: searchResultForThisValue.created_at,
      };
  
      logger.debug(
        "Cache.requestCreation (detached): built and triggering search result and event for active searches (item definition)",
        itemDefinitionBasedOwnedEvent,
      );
      this.listener.triggerOwnedSearchListeners(
        itemDefinitionBasedOwnedEvent,
        null, // TODO add the listener uuid, maybe?
      );
    
      const moduleBasedOwnedEvent: IOwnedSearchRecordsAddedEvent = {
        ...itemDefinitionBasedOwnedEvent,
        qualifiedPathName: moduleTable,
      };
  
      logger.debug(
        "Cache.requestCreation (detached): built and triggering search result and event for active searches (module)",
        moduleBasedOwnedEvent,
      );
      this.listener.triggerOwnedSearchListeners(
        moduleBasedOwnedEvent,
        null, // TODO add the listener uuid, maybe?
      );
    
      if (parent) {
        const itemDefinitionBasedParentedEvent: IParentedSearchRecordsAddedEvent = {
          qualifiedPathName: selfTable,
          parentId: parent.id,
          parentVersion: parent.version || null,
          parentType: parent.type,
          newRecords: [
            searchResultForThisValue,
          ],
          newLastRecordDate: searchResultForThisValue.created_at,
        };
        logger.debug(
          "Cache.requestCreation (detached): built and triggering search result and event for parented active searches (item definition)",
          itemDefinitionBasedParentedEvent,
        );
        this.listener.triggerParentedSearchListeners(
          itemDefinitionBasedParentedEvent,
          null, // TODO add the listener uuid, maybe?
        );
    
        const moduleBasedParentedEvent: IParentedSearchRecordsAddedEvent = {
          ...itemDefinitionBasedParentedEvent,
          qualifiedPathName: moduleTable,
        };
        logger.debug(
          "Cache.requestCreation (detached): built and triggering search result and event for parented active searches (module)",
          moduleBasedParentedEvent,
        );
        this.listener.triggerParentedSearchListeners(
          moduleBasedParentedEvent,
          null, // TODO add the listener uuid, maybe?
        );
      }
    })();

    return sqlValue;
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
    id: number,
    version: string,
    update: IGQLArgs,
    currentValue: IGQLValue,
    editedBy: number,
    dictionary: string,
    containerId: string,
    listenerUUID: string,
  ): Promise<ISQLTableRowValue> {
    const selfTable = itemDefinition.getQualifiedPathName();
    const moduleTable = itemDefinition.getParentModule().getQualifiedPathName();

    logger.debug(
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
      containerId ? this.uploadsContainers[containerId].container : null,
      containerId ? this.uploadsContainers[containerId].prefix : null,
      dictionary,
      partialUpdateFields,
    );
    const sqlModDataComposed = convertGQLValueToSQLValueForModule(
      this.knex,
      this.serverData,
      itemDefinition.getParentModule(),
      update,
      currentValue,
      containerId ? this.uploadsContainers[containerId].container : null,
      containerId ? this.uploadsContainers[containerId].prefix : null,
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

    logger.debug(
      "Cache.requestUpdate: finalizing SQL data with module data",
      sqlModData,
    );

    logger.debug(
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

    logger.debug(
      "Cache.requestUpdate: consuming binary information streams",
    );
    await sqlIdefDataComposed.consumeStreams(sqlValue.id + "." + (sqlValue.version || ""));
    await sqlModDataComposed.consumeStreams(sqlValue.id + "." + (sqlValue.version || ""));

    // we return and this executes after it returns
    (async () => {
      logger.debug(
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
      logger.debug(
        "Cache.requestUpdate (detached): built and triggering created change event",
        changeEvent,
      );
      this.listener.triggerChangedListeners(
        changeEvent,
        sqlValue,
        listenerUUID || null,
      );
    })();

    return sqlValue;
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
    id: number,
    version: string,
    dropAllVersions: boolean,
    containerId: string,
    listenerUUID: string,
  ): Promise<void> {
    const selfTable = itemDefinition.getQualifiedPathName();
    const moduleTable = itemDefinition.getParentModule().getQualifiedPathName();

    logger.debug(
      "Cache.requestDelete: requesting delete for " + selfTable + " at module " +
        moduleTable + " for id " + id + " and version " + version + " drop all versions is " + dropAllVersions,
    );

    let deleteFilesInContainer = async (specifiedVersion: string) => {
      const someFilesInItemDef = itemDefinition.getAllPropertyDefinitions()
        .some((pdef) => pdef.getPropertyDefinitionDescription().gqlAddFileToFields);
      const someFilesInModule = itemDefinition.getParentModule().getAllPropExtensions()
        .some((pdef) => pdef.getPropertyDefinitionDescription().gqlAddFileToFields);
      if (someFilesInItemDef) {
        await deleteEverythingInFilesContainerId(
          this.uploadsContainers[containerId].container,
          itemDefinition,
          id + "." + (specifiedVersion || null),
        );
      }
      if (someFilesInModule) {
        await deleteEverythingInFilesContainerId(
          this.uploadsContainers[containerId].container,
          itemDefinition.getParentModule(),
          id + "." + (specifiedVersion || null),
        );
      }
    }

    let runDetachedEvents = async (specifiedVersion: string) => {
      await this.forceCacheInto(selfTable, id, specifiedVersion || null, null);
      const changeEvent: IChangedFeedbackEvent = {
        itemDefinition: selfTable,
        id,
        version: specifiedVersion || null,
        type: "not_found",
        lastModified: null,
      };
      this.listener.triggerChangedListeners(
        changeEvent,
        null,
        listenerUUID || null,
      );
    }

    try {
      if (dropAllVersions) {
        const allVersionsDropped: ISQLTableRowValue[] = await this.knex(moduleTable).delete().where({
          id,
          type: selfTable,
        }).returning("version");
        allVersionsDropped.forEach((row) => {
          // this version can be null (aka empty string)
          const retrievedVersion = row.version || null;
          deleteFilesInContainer(retrievedVersion);
          runDetachedEvents(retrievedVersion);
        });
      } else {
        // we run this, not even required to do it as a transaction
        // because the index in the item definition cascades
        await this.knex(moduleTable).delete().where({
          id,
          version: version || "",
          type: selfTable,
        });
        // we don't want to await any of this
        deleteFilesInContainer(version);
        runDetachedEvents(version);
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
   * Requests a value from the cache
   * @param itemDefinition the item definition or a [qualifiedItemDefinitionName, qualifiedModuleName] combo
   * @param id the id to request for
   * @param version the version
   * @param refresh whether to skip the cache and request directly from the database and update the cache
   * @returns a whole sql value that can be converted into graphql if necessary
   */
  public async requestValue(
    itemDefinition: ItemDefinition | [string, string],
    id: number,
    version: string,
    refresh?: boolean,
  ): Promise<ISQLTableRowValue> {
    const idefTable = Array.isArray(itemDefinition) ?
      itemDefinition[0] : itemDefinition.getQualifiedPathName();
    const moduleTable = Array.isArray(itemDefinition) ?
      itemDefinition[1] : itemDefinition.getParentModule().getQualifiedPathName();

    logger.debug(
      "Cache.requestValue: requesting value for " + idefTable + " at module " +
        moduleTable + " for id " + id + " and version " + version + " with refresh " + !!refresh,
    );

    if (!refresh) {
      const idefQueryIdentifier = "IDEFQUERY:" + idefTable + "." + id.toString() + "." + (version || "");
      const currentValue = await this.getRaw<ISQLTableRowValue>(idefQueryIdentifier);
      if (currentValue) {
        return currentValue.value;
      }
    }

    logger.debug(
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

  public getServerData() {
    return this.serverData;
  }

  public onServerDataChangeInformed(newData: IServerDataType) {
    logger.debug(
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
   */
  public onChangeInformed(itemDefinition: string, id: number, version: string, data: ISQLTableRowValue) {
    const idefQueryIdentifier = "IDEFQUERY:" + itemDefinition + "." + id.toString() + "." + (version || "");
    // first we need to check that we hold such key, while we are listening to this, the values in redis are volatile
    // and expire and as so we only want to update values that exist already there
    this.redisClient.exists(idefQueryIdentifier, (error, value) => {
      // if we have an error log it
      if (error) {
        logger.error(
          "Cache.onChangeInformed: could not retrieve existance for " + idefQueryIdentifier,
          {
            errStack: error.stack,
            errMessage: error.message,
          },
        );
      } else if (value) {
        if (typeof data === "undefined") {
          this.requestValue(
            this.root.registry[itemDefinition] as ItemDefinition,
            id,
            version,
            true,
          );
        } else {
          // if we have such a value we want to update it
          this.forceCacheInto(itemDefinition, id, version, data);
        }
      } else if (!value) {
        // otherwise we ignore everything and simply unregister the event
        this.listener.unregisterSS({
          itemDefinition,
          id,
          version,
        });
      }
    });
  }

  public onChangeInformedNoData(itemDefinition: string, id: number, version: string) {
    this.onChangeInformed(itemDefinition, id, version, undefined);
  }
}
