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
import { ISQLTableRowValue } from "../base/Root/sql";
import { IGQLSearchResult, IGQLArgs, IGQLValue } from "../gql-querier";
import { convertVersionsIntoNullsWhenNecessary } from "./version-null-value";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import { Listener } from "./listener";
import Root from "../base/Root";
import uuid from "uuid";
import { convertGQLValueToSQLValueForItemDefinition } from "../base/Root/Module/ItemDefinition/sql";
import { convertGQLValueToSQLValueForModule } from "../base/Root/Module/sql";
import { updateTransitoryIdIfExists, deleteEverythingInTransitoryId } from "../base/Root/Module/ItemDefinition/PropertyDefinition/sql-files";
import { IOwnedSearchRecordsAddedEvent, IParentedSearchRecordsAddedEvent } from "../base/remote-protocol";
import { IChangedFeedbackEvent } from "../base/remote-protocol";
import { EndpointError } from "../base/errors";

const CACHE_EXPIRES_DAYS = 2;

/**
 * The cache class that provides all the functionality that is
 * specified for the cache package, the cache is more than what
 * it name implies because it contains redis and it's the same in
 * all the servers
 */
export class Cache {
  private redisClient: RedisClient;
  private knex: Knex;
  private root: Root;
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
  constructor(redisClient: RedisClient, knex: Knex, root: Root) {
    this.redisClient = redisClient;
    this.knex = knex;
    this.root = root;
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
   * A private function that provides a cached value from its identifier
   * @param idefQueryIdentifier the identifier
   * @returns a promise with the sql value
   */
  private getIdefCachedValue(
    idefQueryIdentifier: string,
  ): Promise<{value: ISQLTableRowValue}> {
    // we build the promise
    return new Promise((resolve) => {
      // and call redis, note how we never reject
      this.redisClient.get(idefQueryIdentifier, (error, value) => {
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
            this.pokeCache(idefQueryIdentifier);
          } catch {
            // resolve it to null in case of problem
            resolve(null);
          }
        } else {
          // also here
          resolve(null);
        }
      });
    });
  }
  /**
   * Resets the expiration clock of a given identifier
   * @param keyIdentifier the identifier
   */
  private pokeCache(keyIdentifier: string) {
    this.redisClient.expire(keyIdentifier, CACHE_EXPIRES_DAYS * 86400);
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
    return new Promise((resolve) => {
      this.redisClient.set(idefQueryIdentifier, JSON.stringify(value), (error) => {
        resolve(value);
        if (!error) {
          this.pokeCache(idefQueryIdentifier);
        }
      });
    });
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
    parent: {
      id: number,
      version: string,
      type: string,
    }
  ): Promise<ISQLTableRowValue> {
    // we create the transitory id that is used to build the folder
    // structure for where files will be saved
    const transitoryId = "TEMP" + uuid.v4().replace(/-/g, "");

    // now we extract the SQL information for both item definition table
    // and the module table, this value is database ready, and hence needs
    // knex and the dictionary to convert fields that need it
    const sqlIdefData: any = await convertGQLValueToSQLValueForItemDefinition(
      transitoryId,
      itemDefinition,
      value,
      null,
      this.knex,
      dictionary,
    );
    const sqlModData: any = await convertGQLValueToSQLValueForModule(
      transitoryId,
      itemDefinition.getParentModule(),
      itemDefinition,
      value,
      null,
      this.knex,
      dictionary,
    );

    // this data is added every time when creating
    sqlModData.type = itemDefinition.getQualifiedPathName();
    sqlModData.created_at = this.knex.fn.now();
    sqlModData.last_modified = this.knex.fn.now();
    sqlModData.created_by = createdBy || UNSPECIFIED_OWNER;

    if (parent) {
      sqlModData.parent_id = parent.id;
      // the version can never be null, so we must cast it into the invalid
      // empty string value
      sqlModData.parent_version = parent.version || "";
      sqlModData.parent_type = parent.type;
    }

    const selfTable = itemDefinition.getQualifiedPathName();
    const moduleTable = itemDefinition.getParentModule().getQualifiedPathName();

    // now let's build the transaction for the insert query which requires
    // two tables to be modified, and it always does so, as item definition information
    // must be added because create requires so
    const sqlValue: ISQLTableRowValue = convertVersionsIntoNullsWhenNecessary(
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

    this.forceCacheInto(selfTable, sqlValue.id, sqlValue.version, sqlValue);

    await updateTransitoryIdIfExists(
      itemDefinition,
      transitoryId,
      sqlValue.id.toString(),
    );

    const searchResultForThisValue: IGQLSearchResult = {
      id: sqlValue.id,
      version: sqlValue.version || null,
      type: selfTable,
      created_at: sqlValue.created_at,
    };
  
    const itemDefinitionBasedOwnedEvent: IOwnedSearchRecordsAddedEvent = {
      qualifiedPathName: selfTable,
      createdBy: itemDefinition.isOwnerObjectId() ? sqlValue.id : sqlModData.created_by,
      newIds: [
        searchResultForThisValue,
      ],
      newLastRecord: searchResultForThisValue,
    };
    this.listener.triggerOwnedSearchListeners(
      itemDefinitionBasedOwnedEvent,
      null, // TODO add the listener uuid, maybe?
    );
  
    const moduleBasedOwnedEvent: IOwnedSearchRecordsAddedEvent = {
      ...itemDefinitionBasedOwnedEvent,
      qualifiedPathName: moduleTable,
    };
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
        newIds: [
          searchResultForThisValue,
        ],
        newLastRecord: searchResultForThisValue,
      };
      this.listener.triggerParentedSearchListeners(
        itemDefinitionBasedParentedEvent,
        null, // TODO add the listener uuid, maybe?
      );
  
      const moduleBasedParentedEvent: IParentedSearchRecordsAddedEvent = {
        ...itemDefinitionBasedParentedEvent,
        qualifiedPathName: moduleTable,
      };
      this.listener.triggerParentedSearchListeners(
        moduleBasedParentedEvent,
        null, // TODO add the listener uuid, maybe?
      );
    }

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
    listenerUUID: string,
  ): Promise<ISQLTableRowValue> {
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
    const sqlIdefData: any = await convertGQLValueToSQLValueForItemDefinition(
      id.toString(),
      itemDefinition,
      update,
      currentValue,
      this.knex,
      dictionary,
      partialUpdateFields,
    );
    const sqlModData: any = await convertGQLValueToSQLValueForModule(
      id.toString(),
      itemDefinition.getParentModule(),
      itemDefinition,
      update,
      currentValue,
      this.knex,
      dictionary,
      partialUpdateFields,
    );

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

    const selfTable = itemDefinition.getQualifiedPathName();
    const moduleTable = itemDefinition.getParentModule().getQualifiedPathName();

    // we build the transaction for the action
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

    // we return and this executes after it returns
    (async () => {
      await this.forceCacheInto(selfTable, id, version, sqlValue);
      const changeEvent: IChangedFeedbackEvent = {
        itemDefinition: selfTable,
        id,
        version: version || null,
        type: "modified",
        lastModified: null,
      };
      this.listener.triggerListeners(
        changeEvent,
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
    listenerUUID: string,
  ): Promise<void> {
    const selfTable = itemDefinition.getQualifiedPathName();
    const moduleTable = itemDefinition.getParentModule().getQualifiedPathName();
    // we run this, not even required to do it as a transaction
    // because the index in the item definition cascades
    // TODO drop all versions
    await this.knex(moduleTable).delete().where({
      id,
      version: version || "",
      type: selfTable,
    });

    // we don't want to await any of this
    deleteEverythingInTransitoryId(
      itemDefinition,
      id.toString(),
    );
    (async () => {
      await this.forceCacheInto(selfTable, id, version || null, null);
      const changeEvent: IChangedFeedbackEvent = {
        itemDefinition: selfTable,
        id,
        version: version || null,
        type: "not_found",
        lastModified: null,
      };
      this.listener.triggerListeners(
        changeEvent,
        listenerUUID || null,
      );
    })();
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

    console.log("requested", idefTable, moduleTable, id);
    const idefQueryIdentifier = "IDEFQUERY:" + idefTable + "." + id.toString() + "." + (version || "");
    if (!refresh) {
      const currentValue = await this.getIdefCachedValue(idefQueryIdentifier);
      if (currentValue) {
        return currentValue.value;
      }
    }
    const queryValue: ISQLTableRowValue = convertVersionsIntoNullsWhenNecessary(
      // let's remember versions as null do not exist in the database, instead it uses
      // the invalid empty string "" value
      await this.knex.first("*").from(moduleTable)
        .where("id", id).andWhere("version", version || "").join(idefTable, (clause) => {
      clause.on(CONNECTOR_SQL_COLUMN_ID_FK_NAME, "=", "id");
      clause.on(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "=", "version");
    }) || null);
    this.redisClient.set(idefQueryIdentifier, JSON.stringify(queryValue), (error) => {
      if (!error) {
        this.pokeCache(idefQueryIdentifier);
      }
    });
    return queryValue;
  }

  /**
   * Requests a whole list of search results
   * @param ids the ids to request for
   * @returns a list of whole sql combined table row values
   */
  public async requestListCache(ids: IGQLSearchResult[]): Promise<ISQLTableRowValue[]> {
    const resultValues = await Promise.all(ids.map((idContainer) => {
      const itemDefinition = this.root.registry[idContainer.type] as ItemDefinition;
      return this.requestValue(itemDefinition, idContainer.id, idContainer.version);
    }));
    return resultValues;
  }
}
