/**
 * This is a very important class that contains the whole redis
 * wrapping that basically keeps everything synchronized, all the servers
 * and tells the clients that are connected to this specific instance, it provides
 * functionality to update, create and delete item definition values
 *
 * @module
 */

import {
  CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME,
  UNSPECIFIED_OWNER, ENDPOINT_ERRORS, INCLUDE_PREFIX, EXCLUSION_STATE_SUFFIX, DELETED_REGISTRY_IDENTIFIER, CACHED_CURRENCY_RESPONSE, SERVER_DATA_IDENTIFIER, RESERVED_BASE_PROPERTIES_RQ, TRACKERS_REGISTRY_IDENTIFIER, JWT_KEY
} from "../constants";
import { ISQLTableRowValue, ISQLStreamComposedTableRowValue, ConsumeStreamsFnType } from "../base/Root/sql";
import { IRQSearchRecord, IRQArgs, IRQValue } from "../rq-querier";
import { convertVersionsIntoNullsWhenNecessary } from "./version-null-value";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import { Listener } from "./listener";
import Root from "../base/Root";
import { convertRQValueToSQLValueForItemDefinition, convertSQLValueToRQValueForItemDefinition } from "../base/Root/Module/ItemDefinition/sql";
import { convertRQValueToSQLValueForModule } from "../base/Root/Module/sql";
import { deleteEverythingInFilesContainerId } from "../base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management";
import { IOwnedParentedSearchRecordsEvent, IOwnedSearchRecordsEvent, IParentedSearchRecordsEvent, IPropertySearchRecordsEvent } from "../base/remote-protocol";
import { IChangedFeedbackEvent } from "../base/remote-protocol";
import { EndpointError } from "../base/errors";
import { IServerDataType, IAppDataType } from ".";
import { logger } from "./logger";
import { jwtSign } from "./token";
import { ISensitiveConfigRawJSONDataType } from "../config";
import { IStorageProvidersObject } from "./services/base/StorageProvider";
import { ItemizeRedisClient } from "./redis";
import Module from "../base/Root/Module";
import { DatabaseConnection } from "../database";
import { IManyValueType } from "../database/base";
import { WithBuilder } from "../database/WithBuilder";
import { UpdateBuilder } from "../database/UpdateBuilder";
import { SelectBuilder } from "../database/SelectBuilder";
import { convertSQLValueToRQValueForProperty } from "../base/Root/Module/ItemDefinition/PropertyDefinition/sql";
import type PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";

import {
  CAN_LOG_DEBUG,
} from "./environment";
import type { ItemizeElasticClient } from "./elastic";
import type { ItemizeRawDB } from "./raw-db";
import { NanoSecondComposedDate } from "../nanodate";
import { MAX_PG_INDEX_SIZE, makeIdOutOf } from "../dbbuilder/build-index";

const CACHE_EXPIRES_DAYS = 14;
const MEMCACHE_EXPIRES_MS = 1000;

interface IPropertyMapElement {
  id: string,
  newValue: string,
  originalValue: string,
}

interface IPropertyMapElementPointer {
  newValue: string[],
  originalValue: string[],
  sourceProperty: PropertyDefinition;
  targetIdef: ItemDefinition;
  targetProperty: PropertyDefinition;
}

export interface IBasicOptions {
  indexing?: "wait_for" | "wait_for_all" | "detached";
  listenerUUID?: string;
  ignorePreSideEffects?: boolean;
  ignoreSideEffects?: boolean;
}

export interface IDeleteOptions {
  ignoreSideEffects?: boolean;
  indexing?: "wait_for" | "wait_for_all" | "detached";
  listenerUUID?: string;
  fetchDeletedChildTree?: boolean;
}

export interface IDeletedElement {
  type: string;
  id: string;
  version: string;
  parent_id: string;
  parent_type: string;
  parent_version: string;
  created_by: string;
}

export interface IWritingOptions extends IBasicOptions {
  /**
   * prevents an already existing value from throwing an error
   */
  ignoreAlreadyExists?: boolean;
  /**
   * ignore already exists must be set, and specifies what to return
   * in that case
   */
  ifAlreadyExistsReturn?: "null" | "current";
  /**
   * ignore already exists must be set and it's a callback that occurs
   * with the value
   * @param v 
   * @returns 
   */
  ifAlreadyExistsCall?: (v: ISQLTableRowValue) => void;
  /**
   * Dangerous, optimization option to use not to check for the deleted
   * registry can actually corrupt the database, use this if you are 100% sure
   * the ids are unique every time
   */
  doNotCheckForDeletedRegistry?: boolean;
}

export interface ICreationOptions extends IWritingOptions {
  forId?: string;
  version?: string;
  createdBy?: string;
  language: string;
  dictionary: string;
  containerId: string;
  parent?: {
    id: string,
    version: string,
    type: string,
  };
}

export interface ICopyOptions<T = ISQLTableRowValue> extends IWritingOptions {
  targetId?: string;
  targetVersion?: string;
  targetContainerId?: string;
  targetCreatedBy?: string;
  targetParent?: {
    id: string;
    type: string;
    version: string;
  },
  targetOverrides?: Partial<T>;
  currentRawValueSQL?: T;
}

export interface IUpdateOptions extends IBasicOptions {
  currentSQLValue?: ISQLTableRowValue;
  currentrqValue?: IRQValue;
  editedBy?: string;
  language: string;
  dictionary: string;
  containerId?: string;
  reparent?: {
    id: string,
    version: string,
    type: string,
  };
  blocking?: {
    status: boolean,
    reason: string,
    until: string,
  };
}

/**
  * This function finds modules for a given module, including its children
  * that do match a possible parent rule
  * @param possibleParent the possible parent
  * @param module the current module to analyze
  * @returns a list of modules
  */
export function analyzeModuleForPossibleParent(possibleParent: ItemDefinition, module: Module): Module[] {
  // first we set up the modules we have collected, nothing yet
  let collectedModules: Module[] = [];
  // now we check if at least one of the item definitions within this module
  // can be set as child of the given possible parent
  const canAtLeastOneIdefBeChildOf = module.getAllChildItemDefinitions().some(analyzeIdefForPossibleParent.bind(this, possibleParent));
  // if that's the case we add this same module to the list
  if (canAtLeastOneIdefBeChildOf) {
    collectedModules.push(module);
  }

  // now we need to check the child modules, for that we run this function recursively
  const childModules = module.getAllModules().map(analyzeModuleForPossibleParent.bind(this, possibleParent)) as Module[];
  // and now we check if we got anything, if we did
  if (childModules.length) {
    // we concat the result
    collectedModules = collectedModules.concat(childModules);
  }

  // and return that
  return collectedModules;
}

/**
  * This function analyzes an item definition to check for a possible
  * parent and returns true if there's any parent rule within itself, including
  * its children that matches the possible parent
  * @param possibleParent the possible parent
  * @param idef the item definition in question
  * @returns a simple boolean
  */
export function analyzeIdefForPossibleParent(possibleParent: ItemDefinition, idef: ItemDefinition): boolean {
  const canBeParented = idef.checkCanBeParentedBy(possibleParent, false);
  if (canBeParented) {
    return true;
  }

  return idef.getChildDefinitions().some(analyzeIdefForPossibleParent.bind(this, possibleParent));
}

/**
 * The cache class that provides all the functionality that is
 * specified for the cache package, the cache is more than what
 * it name implies because it contains redis and it's the same in
 * all the servers
 */
export class Cache {
  private redisClient: ItemizeRedisClient;
  private databaseConnection: DatabaseConnection;
  private elastic: ItemizeElasticClient;
  private domain: string;
  private storageClients: IStorageProvidersObject;
  private root: Root;
  private serverData: IServerDataType;
  private listener: Listener;
  private sensitiveConfig: ISensitiveConfigRawJSONDataType;

  /**
   * The memory cache is used to hold a value for a certain amount
   * of milliseconds after a query is executed and resolve
   * any subsequent values to that if memory cache has been enabled
   */
  private memoryCache: {
    [key: string]: {
      value: ISQLTableRowValue
    };
  } = {};

  /**
   * The combine cache is used for when requests are running
   * to fetch a value and many requests going through the cache
   * run at the same time to fetch the same value
   * 
   * this will mean they will be combined and resolve all at the 
   * same time with the same value
   */
  private combineCache: {
    [key: string]: Promise<ISQLTableRowValue>,
  } = {};
  private appData: IAppDataType;
  private currentlySetting: {
    [id: string]:
    {
      valueBeingSet: any;
      replacement: any;
    }
  } = {};

  /**
   * Builds a new cache instance, before the cache is ready
   * it needs to be able to access the listener as well, but due
   * to the fact that the listener depends on the cache as well
   * it is instantiaded by te listener at the same time
   *
   * @param redisClient the redis client that is used for storing values
   * @param root the root of itemize
   */
  constructor(
    redisClient: ItemizeRedisClient,
    databaseConnection: DatabaseConnection,
    elastic: ItemizeElasticClient,
    sensitiveConfig: ISensitiveConfigRawJSONDataType,
    storageClients: IStorageProvidersObject,
    domain: string,
    root: Root,
    initialServerData: IServerDataType
  ) {
    this.redisClient = redisClient;
    this.elastic = elastic;
    this.databaseConnection = databaseConnection;
    this.root = root;
    this.storageClients = storageClients;
    this.serverData = initialServerData;
    this.sensitiveConfig = sensitiveConfig;
    this.domain = domain;

    // we inform of new server data here in the cache
    // to the elastic client
    this.elastic && this.elastic.informNewServerData(initialServerData);
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
      {
        className: "Cache",
        methodName: "getRaw",
        message: "Requesting " + key,
      },
    );
    // we build the promise
    // and call redis, note how we never reject
    try {
      const value = await this.redisClient.get(key);
      if (value === null) {
        return null;
      }
      try {
        // and poke the cache to reset the clock for expiration
        this.pokeCache(key);
        return ({
          value: JSON.parse(value) as T,
        });
      } catch (err) {
        logger.error(
          {
            className: "Cache",
            methodName: "getRaw",
            message: "Could not JSON parse value from cache in " + key,
          },
        );
      }
    } catch (err) {
      logger.error(
        {
          className: "Cache",
          methodName: "getRaw",
          message: "Could not retrieve value from redis cache client for " + key + " with error",
          err,
        },
      );
      return null;
    }
  }

  public async setRaw(key: string, value: any, onConflict: (value: any) => boolean) {
    CAN_LOG_DEBUG && logger.debug(
      {
        className: "Cache",
        methodName: "setRaw",
        message: "Setting " + key,
      },
    );

    // if we are currently setting
    if (this.currentlySetting[key]) {
      // we got to compare against what we are checking, if we have a replacement
      // that's the one to beat, if not it's the value being set
      const valueToCheckAgainst = typeof this.currentlySetting[key].replacement !== "undefined" ?
        this.currentlySetting[key].replacement : this.currentlySetting[key].valueBeingSet;
      // if we should replace that
      const shouldReplace = onConflict(valueToCheckAgainst);

      // if we do then we indicate that so that it's done
      if (shouldReplace) {
        this.currentlySetting[key].replacement = value;
      }

      return;
    }

    try {
      this.currentlySetting[key] = { valueBeingSet: value, replacement: undefined };
      await this.redisClient.set(key, JSON.stringify(value));
      while (typeof this.currentlySetting[key].replacement !== "undefined") {
        const replacement = this.currentlySetting[key].replacement;
        this.currentlySetting[key].valueBeingSet = replacement;
        this.currentlySetting[key].replacement = undefined;
        await this.redisClient.set(key, JSON.stringify(replacement));
      }
      delete this.currentlySetting[key];
      this.pokeCache(key);
    } catch (err) {
      logger.error(
        {
          className: "Cache",
          methodName: "setRaw",
          message: "Could not set value for " + key + " with error",
          err,
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
      {
        className: "Cache",
        methodName: "pokeCache",
        message: "Poking " + keyIdentifier,
      },
    );
    try {
      await this.redisClient.expire(keyIdentifier, CACHE_EXPIRES_DAYS * 86400);
    } catch (err) {
      logger.error(
        {
          className: "Cache",
          methodName: "pokeCache",
          message: "Could not poke " + keyIdentifier + " with error",
          err,
        },
      );
    }
  }

  /**
   * forces a cached value for a given item definition table in an id and version
   * @param idefTable the item definition table or its qualified name
   * @param id the id
   * @param version the version or null
   * @param value the value to store
   * @param ensure if true does not trust the value right away and checks it against the current value last modified signature
   * and will only set it if it's older (newer)
   */
  private async forceCacheInto(idefTable: string, id: string, version: string, value: ISQLTableRowValue, ensure: boolean) {
    const idefQueryIdentifier = "IDEFQUERY:" + idefTable + "." + id.toString() + "." + (version || "");
    CAN_LOG_DEBUG && logger.debug(
      {
        className: "Cache",
        methodName: "forceCacheInto",
        message: "Setting new cache value for " + idefQueryIdentifier,
      },
    );

    let newLastModified: NanoSecondComposedDate;
    if (ensure && value !== null) {
      const currentValue = await this.getRaw<ISQLTableRowValue>(idefQueryIdentifier);
      if (currentValue && currentValue.value) {
        const currentLastModified = new NanoSecondComposedDate(currentValue.value.last_modified);
        newLastModified = new NanoSecondComposedDate(value.last_modified);

        // do not modify
        if (currentLastModified.greaterThanEqual(newLastModified)) {
          return;
        }
      }

      const idef = this.root.registry[idefTable] as ItemDefinition;
      const mod = idef.getParentModule();

      const currentLastModifiedFromDb = await this.databaseConnection.queryRows(
        `SELECT "last_modified" FROM ${JSON.stringify(mod.getQualifiedPathName())} WHERE ` +
        `id = $1 AND version = $2 LIMIT 1`,
        [
          id,
          version || "",
        ]
      );

      // well it's been deleted
      if (!currentLastModifiedFromDb.length) {
        this.listener.unregisterSS({
          itemDefinition: idefTable,
          id,
          version,
        });
        return;
      }

      const valueOfLastModifiedFromDB = currentLastModifiedFromDb[0].last_modified;

      // does not match source of truth, it will therefore not add
      if (value.last_modified !== valueOfLastModifiedFromDB) {
        return;
      }
    }

    this.listener.registerSS({
      itemDefinition: idefTable,
      id: id,
      version: version || null,
    });
    return this.setRaw(idefQueryIdentifier, value, (otherValue: any) => {
      if (!otherValue) {
        return false;
      }
      newLastModified = newLastModified || new NanoSecondComposedDate(value.last_modified);
      const otherLastModified = new NanoSecondComposedDate(otherValue.last_modified);

      // do not modify
      if (otherLastModified.greaterThanEqual(newLastModified)) {
        return false;
      }

      return true;
    });
  }

  public triggerSearchListenersFor(
    itemDefinition: ItemDefinition,
    createdBy: string,
    newParent: {
      type: string,
      id: string,
      version: string,
    },
    originalParent: {
      type: string,
      id: string,
      version: string,
    },
    propertyMap: IPropertyMapElement[],
    record: IRQSearchRecord,
    location: "new" | "deleted" | "modified",
  ) {
    const newRecordArr = [record];
    const idefQualifiedPathName = itemDefinition.getQualifiedPathName();
    const modQualifiedPathName = itemDefinition.getParentModule().getQualifiedPathName();

    if (createdBy) {
      const itemDefinitionBasedOwnedEvent: IOwnedSearchRecordsEvent = {
        qualifiedPathName: idefQualifiedPathName,
        createdBy: itemDefinition.isOwnerObjectId() ? record.id : createdBy,
        newRecords: [],
        createdRecords: location === "new" ? newRecordArr : [],
        lostRecords: [],
        deletedRecords: location === "deleted" ? newRecordArr : [],
        modifiedRecords: location === "modified" ? newRecordArr : [],
        newLastModified: record.last_modified,
      };

      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Cache",
          methodName: "triggerSearchListenersFor (detached)",
          message: "Built and triggering search result and event for active searches (item definition)",
          data: {
            event: itemDefinitionBasedOwnedEvent,
          },
        },
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
        {
          className: "Cache",
          methodName: "triggerSearchListenersFor (detached)",
          message: "Built and triggering search result and event for active searches (module)",
          data: {
            event: moduleBasedOwnedEvent,
          },
        },
      );
      this.listener.triggerOwnedSearchListeners(
        moduleBasedOwnedEvent,
        null, // TODO add the listener uuid, maybe?
      );
    }

    if (newParent) {
      const isReparent =
        location === "modified" &&
        originalParent &&
        (
          originalParent.id !== newParent.id ||
          originalParent.version !== newParent.version ||
          originalParent.type !== newParent.type
        );

      if (!isReparent) {
        const itemDefinitionBasedParentedEvent: IParentedSearchRecordsEvent = {
          qualifiedPathName: idefQualifiedPathName,
          parentId: newParent.id,
          parentVersion: newParent.version || null,
          parentType: newParent.type,
          newRecords: [],
          createdRecords: location === "new" ? newRecordArr : [],
          lostRecords: [],
          deletedRecords: location === "deleted" ? newRecordArr : [],
          modifiedRecords: location === "modified" ? newRecordArr : [],
          newLastModified: record.last_modified,
        };
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "triggerSearchListenersFor (detached)",
            message: "Built and triggering search result and event for parented active searches (item definition)",
            data: {
              event: itemDefinitionBasedParentedEvent,
            },
          },
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
          {
            className: "Cache",
            methodName: "triggerSearchListenersFor (detached)",
            message: "Built and triggering search result and event for parented active searches (module)",
            data: {
              event: moduleBasedParentedEvent,
            },
          },
        );
        this.listener.triggerParentedSearchListeners(
          moduleBasedParentedEvent,
          null, // TODO add the listener uuid, maybe?
        );
      } else {
        const itemDefinitionBasedParentedEventForNewParent: IParentedSearchRecordsEvent = {
          qualifiedPathName: idefQualifiedPathName,
          parentId: newParent.id,
          parentVersion: newParent.version || null,
          parentType: newParent.type,
          newRecords: newRecordArr,
          lostRecords: [],
          modifiedRecords: [],
          createdRecords: [],
          deletedRecords: [],
          newLastModified: record.last_modified,
        };
        const itemDefinitionBasedParentedEventForOldParent: IParentedSearchRecordsEvent = {
          qualifiedPathName: idefQualifiedPathName,
          parentId: originalParent.id,
          parentVersion: originalParent.version || null,
          parentType: originalParent.type,
          newRecords: [],
          lostRecords: newRecordArr,
          modifiedRecords: [],
          createdRecords: [],
          deletedRecords: [],
          newLastModified: record.last_modified,
        };
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "triggerSearchListenersFor (detached)",
            message: "Built and triggering search result and event for parented active searches (item definition)",
            data: {
              event: itemDefinitionBasedParentedEventForNewParent,
            },
          },
        );
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "triggerSearchListenersFor (detached)",
            message: "Built and triggering search result and event for parented active searches (item definition)",
            data: {
              event: itemDefinitionBasedParentedEventForOldParent,
            },
          },
        );
        this.listener.triggerParentedSearchListeners(
          itemDefinitionBasedParentedEventForNewParent,
          null, // TODO add the listener uuid, maybe?
        );
        this.listener.triggerParentedSearchListeners(
          itemDefinitionBasedParentedEventForOldParent,
          null, // TODO add the listener uuid, maybe?
        );

        const moduleBasedParentedEventForNewParent: IParentedSearchRecordsEvent = {
          ...itemDefinitionBasedParentedEventForNewParent,
          qualifiedPathName: modQualifiedPathName,
        };
        const moduleBasedParentedEventForOldParent: IParentedSearchRecordsEvent = {
          ...itemDefinitionBasedParentedEventForOldParent,
          qualifiedPathName: modQualifiedPathName,
        };
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "triggerSearchListenersFor (detached)",
            message: "Built and triggering search result and event for parented active searches (module)",
            data: {
              event: moduleBasedParentedEventForNewParent,
            },
          },
        );
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "triggerSearchListenersFor (detached)",
            message: "Built and triggering search result and event for parented active searches (module)",
            data: {
              event: moduleBasedParentedEventForOldParent,
            },
          },
        );
        this.listener.triggerParentedSearchListeners(
          moduleBasedParentedEventForNewParent,
          null, // TODO add the listener uuid, maybe?
        );
        this.listener.triggerParentedSearchListeners(
          moduleBasedParentedEventForOldParent,
          null, // TODO add the listener uuid, maybe?
        );
      }
    }

    if (newParent && createdBy) {
      const isReparent =
        location === "modified" &&
        originalParent &&
        (
          originalParent.id !== newParent.id ||
          originalParent.version !== newParent.version ||
          originalParent.type !== newParent.type
        );

      if (!isReparent) {
        const itemDefinitionBasedOwnedParentedEvent: IOwnedParentedSearchRecordsEvent = {
          qualifiedPathName: idefQualifiedPathName,
          createdBy: createdBy,
          parentId: newParent.id,
          parentVersion: newParent.version || null,
          parentType: newParent.type,
          newRecords: [],
          createdRecords: location === "new" ? newRecordArr : [],
          lostRecords: [],
          deletedRecords: location === "deleted" ? newRecordArr : [],
          modifiedRecords: location === "modified" ? newRecordArr : [],
          newLastModified: record.last_modified,
        };
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "triggerSearchListenersFor (detached)",
            message: "Built and triggering search result and event for parented and owned active searches (item definition)",
            data: {
              event: itemDefinitionBasedOwnedParentedEvent,
            },
          },
        );
        this.listener.triggerOwnedParentedSearchListeners(
          itemDefinitionBasedOwnedParentedEvent,
          null, // TODO add the listener uuid, maybe?
        );

        const moduleBasedOwnedParentedEvent: IOwnedParentedSearchRecordsEvent = {
          ...itemDefinitionBasedOwnedParentedEvent,
          qualifiedPathName: modQualifiedPathName,
        };
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "triggerSearchListenersFor (detached)",
            message: "Built and triggering search result and event for parented and owned active searches (module)",
            data: {
              event: moduleBasedOwnedParentedEvent,
            },
          },
        );
        this.listener.triggerOwnedParentedSearchListeners(
          moduleBasedOwnedParentedEvent,
          null, // TODO add the listener uuid, maybe?
        );
      } else {
        const itemDefinitionBasedOwnedParentedEventForNewParent: IOwnedParentedSearchRecordsEvent = {
          qualifiedPathName: idefQualifiedPathName,
          createdBy: createdBy,
          parentId: newParent.id,
          parentVersion: newParent.version || null,
          parentType: newParent.type,
          newRecords: newRecordArr,
          lostRecords: [],
          modifiedRecords: [],
          createdRecords: [],
          deletedRecords: [],
          newLastModified: record.last_modified,
        };
        const itemDefinitionBasedOwnedParentedEventForOldParent: IOwnedParentedSearchRecordsEvent = {
          qualifiedPathName: idefQualifiedPathName,
          createdBy: createdBy,
          parentId: originalParent.id,
          parentVersion: originalParent.version || null,
          parentType: originalParent.type,
          newRecords: [],
          lostRecords: newRecordArr,
          modifiedRecords: [],
          createdRecords: [],
          deletedRecords: [],
          newLastModified: record.last_modified,
        };
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "triggerSearchListenersFor (detached)",
            message: "Built and triggering search result and event for parented and owned active searches (item definition)",
            data: {
              event: itemDefinitionBasedOwnedParentedEventForNewParent,
            },
          },
        );
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "triggerSearchListenersFor (detached)",
            message: "Built and triggering search result and event for parented and owned active searches (item definition)",
            data: {
              event: itemDefinitionBasedOwnedParentedEventForOldParent,
            },
          },
        );
        this.listener.triggerOwnedParentedSearchListeners(
          itemDefinitionBasedOwnedParentedEventForNewParent,
          null, // TODO add the listener uuid, maybe?
        );
        this.listener.triggerOwnedParentedSearchListeners(
          itemDefinitionBasedOwnedParentedEventForOldParent,
          null, // TODO add the listener uuid, maybe?
        );

        const moduleBasedOwnedParentedEventForNewParent: IOwnedParentedSearchRecordsEvent = {
          ...itemDefinitionBasedOwnedParentedEventForNewParent,
          qualifiedPathName: modQualifiedPathName,
        };
        const moduleBasedOwnedParentedEventForOldParent: IOwnedParentedSearchRecordsEvent = {
          ...itemDefinitionBasedOwnedParentedEventForOldParent,
          qualifiedPathName: modQualifiedPathName,
        };
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "triggerSearchListenersFor (detached)",
            message: "Built and triggering search result and event for parented and owned active searches (module)",
            data: {
              event: moduleBasedOwnedParentedEventForNewParent,
            },
          },
        );
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "triggerSearchListenersFor (detached)",
            message: "Built and triggering search result and event for parented and owned active searches (module)",
            data: {
              event: moduleBasedOwnedParentedEventForOldParent,
            },
          },
        );
        this.listener.triggerOwnedParentedSearchListeners(
          moduleBasedOwnedParentedEventForNewParent,
          null, // TODO add the listener uuid, maybe?
        );
        this.listener.triggerOwnedParentedSearchListeners(
          moduleBasedOwnedParentedEventForOldParent,
          null, // TODO add the listener uuid, maybe?
        );
      }
    }

    propertyMap.forEach((p) => {
      const isRepropertize = location === "modified" && p.originalValue !== p.newValue;

      if (!isRepropertize) {
        const itemDefinitionBasedPropertyEvent: IPropertySearchRecordsEvent = {
          qualifiedPathName: idefQualifiedPathName,
          propertyId: p.id,
          propertyValue: p.newValue,
          newRecords: [],
          createdRecords: location === "new" ? newRecordArr : [],
          lostRecords: [],
          deletedRecords: location === "deleted" ? newRecordArr : [],
          modifiedRecords: location === "modified" ? newRecordArr : [],
          newLastModified: record.last_modified,
        };

        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "triggerSearchListenersFor (detached)",
            message: "Built and triggering search result and event for property searches (item definition)",
            data: {
              event: itemDefinitionBasedPropertyEvent,
            },
          },
        );

        this.listener.triggerPropertySearchListeners(
          itemDefinitionBasedPropertyEvent,
          null, // TODO add the listener uuid, maybe?
        );
        const moduleBasedPropertyEvent: IPropertySearchRecordsEvent = {
          ...itemDefinitionBasedPropertyEvent,
          qualifiedPathName: modQualifiedPathName,
        };

        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "triggerSearchListenersFor (detached)",
            message: "Built and triggering search result and event for property searches (module)",
            data: {
              event: moduleBasedPropertyEvent,
            },
          },
        );

        this.listener.triggerPropertySearchListeners(
          moduleBasedPropertyEvent,
          null, // TODO add the listener uuid, maybe?
        );
      } else {
        const itemDefinitionBasedPropertyEventForNewPropertyValue: IPropertySearchRecordsEvent = {
          qualifiedPathName: idefQualifiedPathName,
          propertyId: p.id,
          propertyValue: p.newValue,
          newRecords: newRecordArr,
          lostRecords: [],
          modifiedRecords: [],
          createdRecords: [],
          deletedRecords: [],
          newLastModified: record.last_modified,
        };

        const itemDefinitionBasedPropertyEventForOldPropertyValue: IPropertySearchRecordsEvent = {
          qualifiedPathName: idefQualifiedPathName,
          propertyId: p.id,
          propertyValue: p.originalValue,
          newRecords: newRecordArr,
          lostRecords: [],
          modifiedRecords: [],
          createdRecords: [],
          deletedRecords: [],
          newLastModified: record.last_modified,
        };


        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "triggerSearchListenersFor (detached)",
            message: "Built and triggering search result and event for property searches (item definition)",
            data: {
              event: itemDefinitionBasedPropertyEventForNewPropertyValue,
            },
          },
        );

        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "triggerSearchListenersFor (detached)",
            message: "Built and triggering search result and event for property searches (item definition)",
            data: {
              event: itemDefinitionBasedPropertyEventForOldPropertyValue,
            },
          },
        );

        this.listener.triggerPropertySearchListeners(
          itemDefinitionBasedPropertyEventForNewPropertyValue,
          null, // TODO add the listener uuid, maybe?
        );

        this.listener.triggerPropertySearchListeners(
          itemDefinitionBasedPropertyEventForOldPropertyValue,
          null, // TODO add the listener uuid, maybe?
        );

        const moduleBasedPropertyEventForNewPropertyValue: IPropertySearchRecordsEvent = {
          ...itemDefinitionBasedPropertyEventForNewPropertyValue,
          qualifiedPathName: modQualifiedPathName,
        };

        const moduleBasedPropertyEventForOldPropertyValue: IPropertySearchRecordsEvent = {
          ...itemDefinitionBasedPropertyEventForOldPropertyValue,
          qualifiedPathName: modQualifiedPathName,
        };

        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "triggerSearchListenersFor (detached)",
            message: "Built and triggering search result and event for property searches (module)",
            data: {
              event: moduleBasedPropertyEventForNewPropertyValue,
            },
          },
        );

        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "triggerSearchListenersFor (detached)",
            message: "Built and triggering search result and event for property searches (module)",
            data: {
              event: moduleBasedPropertyEventForOldPropertyValue,
            },
          },
        );

        this.listener.triggerPropertySearchListeners(
          moduleBasedPropertyEventForNewPropertyValue,
          null, // TODO add the listener uuid, maybe?
        );

        this.listener.triggerPropertySearchListeners(
          moduleBasedPropertyEventForOldPropertyValue,
          null, // TODO add the listener uuid, maybe?
        );
      }
    });
  }

  /**
   * Request the creation of a new item definition value for an specific item definition
   * @param itemDefinition the item definition we refer to
   * @param value the value to create, the value can be partial
   * @param options options as to create, some options are required
   */
  public async requestCreation<T = ISQLTableRowValue>(
    itemDefinition: ItemDefinition,
    value: IRQArgs | IRQValue | ISQLTableRowValue,
    options: ICreationOptions,
  ): Promise<T> {
    const selfTable = itemDefinition.getQualifiedPathName();
    const moduleTable = itemDefinition.getParentModule().getQualifiedPathName();

    CAN_LOG_DEBUG && logger.debug(
      {
        className: "Cache",
        methodName: "requestCreation",
        message: "Requesting creation for " + selfTable + " at module " +
          moduleTable + " for id " + options.forId + " and version " + options.version +
          " created by " + options.createdBy + " using dictionary " + options.dictionary,
      },
    );

    if (options.forId && !options.doNotCheckForDeletedRegistry) {
      try {
        const deletedResult = await this.databaseConnection.queryRows(
          `SELECT "id" FROM ${JSON.stringify(DELETED_REGISTRY_IDENTIFIER)} ` +
          `WHERE "type" = $1 AND "id" = $2 AND "version" = $3 LIMIT 1`,
          [
            itemDefinition.getQualifiedPathName(),
            options.forId,
            options.version || "",
          ],
        );
        if (deletedResult && deletedResult.length) {
          throw new EndpointError({
            message: "The item for " + itemDefinition.getQualifiedPathName() + " for the id " + options.forId +
              " and version " + (options.version || "null") +
              " has already been deleted before",
            code: ENDPOINT_ERRORS.FORBIDDEN,
          });
        }
      } catch (err) {
        logger.error(
          {
            className: "Cache",
            methodName: "requestCreation",
            serious: true,
            message: "Failed to request from deleted registry",
            err,
            data: {
              itemDefinition: itemDefinition.getQualifiedPathName(),
              id: options.forId,
              version: options.version || null,
            },
          },
        );
        return;
      }
    }

    const isSQLType = !!(value as ISQLTableRowValue).MODULE_ID;

    const rqValue = isSQLType ? (
      convertSQLValueToRQValueForItemDefinition(
        this.serverData,
        this.appData,
        itemDefinition,
        value,
      )
    ) : value;

    const propertyMap: IPropertyMapElement[] = [];
    itemDefinition.getAllPropertyDefinitionsAndExtensions().forEach((pDef) => {
      if (pDef.isTracked()) {
        propertyMap.push({
          id: pDef.getId(),
          newValue: typeof value[pDef.getId()] === "undefined" ? null : value[pDef.getId()],
          originalValue: null,
        });
      }
    });

    const pointerMap: IPropertyMapElementPointer[] = [];
    itemDefinition.getAllPropertyDefinitionsAndExtensions().forEach((pDef) => {
      if (pDef.isPointer() || pDef.isPointerList()) {
        let newValue: string[] = typeof value[pDef.getId()] === "undefined" ? null : (value[pDef.getId()] || null);
        if (Array.isArray(newValue)) {
          newValue = newValue.sort().filter((element, index, arr) => {
            return arr.indexOf(element) === index;
          });
        } else if (typeof newValue === "string") {
          newValue = [newValue];
        } else if (!newValue) {
          newValue = [];
        }

        if (newValue && newValue.length) {
          pointerMap.push({
            newValue,
            originalValue: [],
            sourceProperty: pDef,
            targetIdef: pDef.getPointerTargetItem(),
            targetProperty: pDef.getPointerSynchronizationProperty(),
          });
        }
      }
    });

    if (!options.ignorePreSideEffects) {
      const preSideEffected = itemDefinition.getAllSideEffectedProperties(true);
      // looop into them
      await Promise.all(preSideEffected.map(async (preSideEffectedProperty) => {
        const description = preSideEffectedProperty.property.getPropertyDefinitionDescription();
        const preSideEffectFn = description.sqlPreSideEffect;

        // now we can get this new value
        let newValue: any;
        if (preSideEffectedProperty.include) {
          const includeValue = rqValue[preSideEffectedProperty.include.getQualifiedIdentifier()];
          newValue = includeValue && includeValue[preSideEffectedProperty.property.getId()];
        } else {
          newValue = rqValue[preSideEffectedProperty.property.getId()];
        }

        if (typeof newValue !== "undefined") {
          const returnError = await preSideEffectFn({
            appData: this.appData,
            id: preSideEffectedProperty.property.getId(),
            itemDefinition,
            newRowValue: null,
            originalValue: null,
            originalRowValue: null,
            prefix: preSideEffectedProperty.include ? preSideEffectedProperty.include.getPrefixedQualifiedIdentifier() : "",
            property: preSideEffectedProperty.property,
            newValue,
            rowId: options.forId || null,
            rowVersion: options.version || null,
            include: preSideEffectedProperty.include,
          });

          if (returnError) {
            throw new EndpointError({
              message: typeof returnError === "string" ? returnError : "The pre side effect function has forbid this action",
              code: ENDPOINT_ERRORS.FORBIDDEN,
            });
          }
        }
      }));
    }

    const containerExists = options.containerId && this.storageClients[options.containerId];

    // now we extract the SQL information for both item definition table
    // and the module table, this value is database ready
    const sqlIdefDataComposed: ISQLStreamComposedTableRowValue = convertRQValueToSQLValueForItemDefinition(
      this.serverData,
      this.appData,
      itemDefinition,
      rqValue as IRQArgs, // when this is a SQL type it gets converted into the rq type so it can be processed here
      null,
      containerExists ? this.storageClients[options.containerId] : null,
      this.domain,
      // if this is a copy that is passing a SQL value and not specifying a language
      // then use what is found in the sql row and copy it
      options.language ? options.language : (isSQLType ? value as ISQLTableRowValue : null),
      options.dictionary ? options.dictionary : (isSQLType ? value as ISQLTableRowValue : null),
    );
    const sqlModDataComposed: ISQLStreamComposedTableRowValue = convertRQValueToSQLValueForModule(
      this.serverData,
      this.appData,
      itemDefinition.getParentModule(),
      rqValue as IRQArgs, // when this is a SQL type it gets converted into the rq type so it can be processed here
      null,
      containerExists ? this.storageClients[options.containerId] : null,
      this.domain,
      options.language ? options.language : (isSQLType ? value as ISQLTableRowValue : null),
      options.dictionary ? options.dictionary : (isSQLType ? value as ISQLTableRowValue : null),
    );
    const sqlModData = sqlModDataComposed.value;
    const sqlIdefData = sqlIdefDataComposed.value;
    const consumeModStreams = sqlModDataComposed.consumeStreams;
    const consumeIdefStreams = sqlIdefDataComposed.consumeStreams;

    // this data is added every time when creating
    sqlModData.type = itemDefinition.getQualifiedPathName();
    sqlModData.created_at = [
      "NOW()",
      [],
    ];
    sqlModData.last_modified = [
      "NOW()",
      [],
    ];
    sqlModData.created_by = options.createdBy || UNSPECIFIED_OWNER;
    sqlModData.version = options.version || "";
    sqlModData.container_id = options.containerId;

    if (!options.forId && options.version) {
      throw new EndpointError({
        message: "You can't specify a version without a standard for_id value",
        code: ENDPOINT_ERRORS.FORBIDDEN,
      });
    } else if (options.forId) {
      // now this is important
      sqlModData.id = options.forId;

      // let's find if such a value exists already

      // optimize, if ignoreAlreadyExists is set and ifAlreadyExistsCall does not
      // exist, we shouldn't use the cache, we could use doNotEnsure and doNotFallbackToDb
      // and if not we run through the database and get the non-unique constraint fail
      const doesNeedCurrentValue = options.ignoreAlreadyExists && (options.ifAlreadyExistsCall || options.ifAlreadyExistsReturn === "current");

      const currentValue = await this.requestValue(
        itemDefinition,
        options.forId,
        options.version || null,
        {
          // we do not need to ensure or fallback to db if we do not need the current
          // value to continue
          doNotEnsure: !doesNeedCurrentValue,
          doNotFallbackToDb: !doesNeedCurrentValue,
        }
      );

      // if there's one it's a forbidden action

      // note that the value may be missing
      if (currentValue) {
        if (options.ignoreAlreadyExists) {
          if (options.ifAlreadyExistsCall) {
            options.ifAlreadyExistsCall(currentValue);
          }
          if (options.ifAlreadyExistsReturn === "current") {
            return currentValue as T;
          }
          return null;
        }
        throw new EndpointError({
          message: "You can't override an existant value by requesting creation on top of it",
          code: ENDPOINT_ERRORS.FORBIDDEN,
        });
      }

      if (options.version) {
        // otherwise let's find the unversioned value if a version was specified
        const unversionedValue = await this.requestValue(
          itemDefinition,
          options.forId,
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

    const parent = options.parent;
    if (parent) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Cache",
          methodName: "requestCreation",
          message: "Parent specified is id " + parent.id + " with version " + parent.version + " and type " + parent.type,
        },
      );
      sqlModData.parent_id = parent.id;
      // the version can never be null, so we must cast it into the invalid
      // empty string value
      sqlModData.parent_version = parent.version || "";
      sqlModData.parent_type = parent.type;
    }

    CAN_LOG_DEBUG && logger.debug(
      {
        className: "Cache",
        methodName: "requestCreation",
        message: "Finalizing SQL creation",
      },
    );

    // now let's build the transaction for the insert query which requires
    // two tables to be modified, and it always does so, as item definition information
    // must be added because create requires so
    let sqlValue: ISQLTableRowValue;
    let potentialTransactingRawDB: ItemizeRawDB = null;

    try {
      sqlValue = convertVersionsIntoNullsWhenNecessary(
        await this.databaseConnection.startTransaction(async (transactingDatabase) => {
          // so we insert in the module, this is very simple
          // we use the transaction in the module table
          // insert the sql data that we got ready, and return
          // the requested columns in sql, there's always at least 1
          // because we always need the id
          const insertQuery = transactingDatabase.getInsertBuilder().table(moduleTable);
          insertQuery.insert(sqlModData).returningBuilder.returningAll();

          const insertQueryValueMod = await transactingDatabase.queryFirst(insertQuery);

          // so with that in mind, we add the foreign key column value
          // for combining both and keeping them joined togeher
          sqlIdefData[CONNECTOR_SQL_COLUMN_ID_FK_NAME] = insertQueryValueMod.id;
          sqlIdefData[CONNECTOR_SQL_COLUMN_VERSION_FK_NAME] = insertQueryValueMod.version;

          // so now we create the insert query
          const insertQueryIdef = transactingDatabase.getInsertBuilder().table(selfTable);
          insertQueryIdef.insert(sqlIdefData).returningBuilder.returningAll();
          // so we call the qery
          const insertQueryValueIdef = await transactingDatabase.queryFirst(insertQueryIdef);

          if (pointerMap.length) {
            potentialTransactingRawDB =
              await this.updatePointerMap(transactingDatabase, itemDefinition, insertQueryValueMod.id, insertQueryValueMod.version || null, pointerMap);
          }

          // and we return the joined result
          return {
            ...insertQueryValueMod,
            ...insertQueryValueIdef,
          };
        }),
      );
    } catch (err) {

      // check that it's about id and version constraint
      if (
        options.ignoreAlreadyExists &&
        err.code === "23505"
      ) {
        // build the constraint name based on the naming rules
        let constraintName = moduleTable + "_PRIMARY_KEY";
        if (constraintName.length > MAX_PG_INDEX_SIZE) {
          constraintName = makeIdOutOf(constraintName);
        }

        // check that it's our primary key constraint
        if (err.constraint === constraintName) {
          if (options.ifAlreadyExistsCall || options.ifAlreadyExistsReturn === "current") {
            const value = await this.requestValue(
              itemDefinition,
              options.forId,
              options.version || null,
            );
            options.ifAlreadyExistsCall && options.ifAlreadyExistsCall(value);
            return value as T;
          }
          return null;
        }
      }

      logger.error(
        {
          className: "Cache",
          methodName: "requestCreation",
          message: "Intercepted database insert error with error information",
          serious: true,
          err,
          data: {
            selfTable,
            moduleTable,
            forId: options.forId,
            version: options.version,
            sqlIdefData,
            sqlModData,
          },
        }
      );
      throw err;
    }

    CAN_LOG_DEBUG && logger.debug(
      {
        className: "Cache",
        methodName: "requestCreation",
        message: "Consuming binary information streams",
      },
    );

    try {
      await consumeIdefStreams(sqlValue.id + "." + (sqlValue.version || ""));
    } catch (err) {
      logger.error(
        {
          className: "Cache",
          methodName: "requestCreation",
          message: "Could not consume item definition streams; data is corrupted",
          serious: true,
          err,
          data: {
            selfTable,
            moduleTable,
            forId: options.forId,
            version: options.version,
          },
        }
      );
    }
    try {
      await consumeModStreams(sqlValue.id + "." + (sqlValue.version || ""));
    } catch (err) {
      logger.error(
        {
          className: "Cache",
          methodName: "requestCreation",
          message: "Could not consume module streams; data is corrupted",
          serious: true,
          err,
          data: {
            selfTable,
            moduleTable,
            forId: options.forId,
            version: options.version,
          },
        }
      );
    }

    if (potentialTransactingRawDB) {
      (async () => {
        try {
          await potentialTransactingRawDB.consumeEventQueue();
        } catch (err) {
          logger.error(
            {
              className: "Cache",
              methodName: "requestCreation",
              message: "Could not call consumeEventQueue to call the updates on pointers",
              serious: true,
              err,
              data: {
                selfTable,
                moduleTable,
                forId: options.forId,
                version: options.version,
              },
            }
          );
        }
      })();
    }

    (async () => {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Cache",
          methodName: "requestCreation",
          message: "Storing cache value from the action",
        },
      );
      await this.forceCacheInto(selfTable, sqlValue.id, sqlValue.version, sqlValue, false);
    })();

    const indexingFn = async () => {
      const changeEvent: IChangedFeedbackEvent = {
        itemDefinition: selfTable,
        id: sqlValue.id,
        version: options.version || null,
        type: "created",
        lastModified: null,
      };

      if (this.elastic) {
        const language = itemDefinition.getSearchEngineMainLanguageFromRow(sqlValue);
        try {
          await this.elastic.createDocument(selfTable, language, sqlValue.id, sqlValue.version, sqlValue);
        } catch (err) {
          logger.error(
            {
              className: "Cache",
              methodName: "requestCreation (detached)",
              message: "Could not update value to elastic",
              serious: true,
              err,
              data: {
                selfTable,
                moduleTable,
                forId: options.forId,
                version: options.version,
              },
            }
          );
        }
      }

      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Cache",
          methodName: "requestCreation",
          message: "Built and triggering created change event",
          data: {
            event: changeEvent,
          },
        },
      );
      this.listener.triggerChangedListeners(
        changeEvent,
        sqlValue,
        options.listenerUUID,
      );

      const searchResultForThisValue: IRQSearchRecord = {
        id: sqlValue.id,
        version: sqlValue.version || null,
        type: selfTable,
        last_modified: sqlValue.last_modified,
      };

      this.triggerSearchListenersFor(
        itemDefinition,
        options.createdBy,
        parent,
        null,
        propertyMap,
        searchResultForThisValue,
        "new",
      );
    };

    if (options.indexing === "wait_for" || options.indexing === "wait_for_all") {
      await indexingFn();
    } else {
      indexingFn();
    }

    // Execute side effects of modification according
    // to the given side effected types
    !options.ignoreSideEffects ? (async () => {
      // let's find all of them
      const sideEffected = itemDefinition.getAllSideEffectedProperties();
      // looop into them
      sideEffected.forEach((sideEffectedProperty) => {
        const description = sideEffectedProperty.property.getPropertyDefinitionDescription();
        const sideEffectFn = description.sqlSideEffect;

        // now we can get this new value
        const newValue = convertSQLValueToRQValueForProperty(
          this.getServerData(),
          this.appData,
          itemDefinition,
          sideEffectedProperty.include,
          sideEffectedProperty.property,
          sqlValue,
        )[sideEffectedProperty.property.getId()] as any;

        // and try to execute
        try {
          sideEffectFn({
            appData: this.appData,
            id: sideEffectedProperty.property.getId(),
            itemDefinition,
            newRowValue: sqlValue,
            originalValue: null,
            originalRowValue: null,
            prefix: sideEffectedProperty.include ? sideEffectedProperty.include.getPrefixedQualifiedIdentifier() : "",
            property: sideEffectedProperty.property,
            newValue,
            rowId: sqlValue.id,
            rowVersion: sqlValue.version,
            include: sideEffectedProperty.include,
          });
        } catch (err) {
          logger.error(
            {
              className: "Cache",
              methodName: "requestCreation (detached)",
              message: "Could not execute side effect function",
              serious: true,
              err,
              data: {
                selfTable,
                moduleTable,
                forId: options.forId,
                version: options.version,
              },
            },
          );
        }
      });
    })() : null;

    return sqlValue as T;
  }

  /**
   * Given an item that needs to be copied it will create a new copy for it
   * with all its files and everything
   * 
   * @param item the item to copy from
   * @param id the id to copy from
   * @param version the version to copy from
   * @param targetId the target id to copy at (or null to create one)
   * @param targetVersion the target version to copy at
   * @param targetContainerId the target container id to use (if not specified will use the same)
   * @param targetCreatedBy the target creator to use (if not specified will use the same)
   * @param targetParent the target parent to use (if not specified will use the same as the original)
   * @param currentRawValueSQL the current known value for this source item (if not specified will find it)
   * @param options some options for side effects as this calls the request creation function
   */
  public async requestCopy<T = ISQLTableRowValue>(
    item: ItemDefinition | string,
    id: string,
    version: string,
    options: ICopyOptions<T> = {},
  ): Promise<T> {
    const itemDefinition = typeof item === "string" ?
      this.root.registry[item] as ItemDefinition :
      item;

    const currentValueSrc: ISQLTableRowValue = options.currentRawValueSQL || await this.requestValue(itemDefinition, id, version);
    const valueToStore = options.targetOverrides ? {
      ...currentValueSrc,
      ...options.targetOverrides,
    } : currentValueSrc;

    const allModuleFilesLocation = `${this.domain}/${itemDefinition.getParentModule().getQualifiedPathName()}/${id}.${version || ""}`;
    const allItemFilesLocation = `${this.domain}/${itemDefinition.getQualifiedPathName()}/${id}.${version || ""}`;

    const currentContainerId = (valueToStore as ISQLTableRowValue).container_id;
    const currentStorageClient = this.storageClients[currentContainerId];
    const targetStorageClient = this.storageClients[options.targetContainerId || currentContainerId];

    const hasModuleFiles = await currentStorageClient.exists(allModuleFilesLocation);
    const hasIdefFiles = await currentStorageClient.exists(allItemFilesLocation);

    let storedModuleFiles = false;
    let storedIdefFiles = false;
    let targetModuleFilesLocation: string;
    let targetItemFilesLocation: string;

    try {
      const value = await this.requestCreation(
        itemDefinition,
        valueToStore,
        {
          ...options,
          containerId: options.targetContainerId || currentContainerId,
          dictionary: null,
          language: null,
          forId: options.targetId,
          version: options.targetVersion,
          createdBy: options.targetCreatedBy || currentValueSrc.created_by,
          parent: options.targetParent || (currentValueSrc.parent_id ? {
            id: currentValueSrc.parent_id,
            type: currentValueSrc.parent_type,
            version: currentValueSrc.parent_version || null,
          } : null),
        },
      );

      targetModuleFilesLocation = `${this.domain}/${itemDefinition.getParentModule().getQualifiedPathName()}/${value.id}.${value.version || ""}`;
      targetItemFilesLocation = `${this.domain}/${itemDefinition.getQualifiedPathName()}/${value.id}.${value.version || ""}`;

      if (hasModuleFiles) {
        await currentStorageClient.copyFolder(allModuleFilesLocation, targetModuleFilesLocation, targetStorageClient);
        storedModuleFiles = true;
      }

      if (hasIdefFiles) {
        await currentStorageClient.copyFolder(allItemFilesLocation, targetItemFilesLocation, targetStorageClient);
        storedIdefFiles = true;
      }

      return value as T;
    } catch (err) {
      if (storedModuleFiles) {
        (async () => {
          try {
            await targetStorageClient.removeFolder(targetModuleFilesLocation);
          } catch (err2) {
            logger.error(
              {
                className: "Cache",
                methodName: "requestCopy",
                message: "Could not remove orphaned folder",
                orphan: true,
                err: err2,
                data: {
                  targetModuleFilesLocation,
                  targetContainerId: options.targetContainerId,
                },
              }
            );
          }
        })();
      }

      if (storedIdefFiles) {
        (async () => {
          try {
            await targetStorageClient.removeFolder(targetItemFilesLocation);
          } catch (err2) {
            logger.error(
              {
                className: "Cache",
                methodName: "requestCopy",
                message: "Could not remove orphaned folder",
                orphan: true,
                err: err2,
                data: {
                  targetItemFilesLocation,
                  targetContainerId: options.targetContainerId,
                },
              }
            );
          }
        })();
      }

      logger.error(
        {
          className: "Cache",
          methodName: "requestCopy",
          message: "Could not copy item",
          serious: true,
          err,
          data: {
            targetItemFilesLocation,
            targetModuleFilesLocation,
            targetContainerId: options.targetContainerId,
            id,
            version,
            targetId: options.targetId,
            targetVersion: options.targetVersion,
          },
        }
      );

      throw err;
    }
  }

  /**
   * Requests an update for an item definition where new values are set for this existent item
   * definition value, these are taken as instructions and no checks are done on it
   * @param item the item definition in question
   * @param id the id to update
   * @param version the version of that id to update
   * @param update the update in question (partial values are allowed)
   * @param currentSQLValue the same value but as the raw row
   * @param currentValue a current value as rq, the current value can be requested from the
   * cache itself, and then converted into rq, but this is expensive, while for the edit process
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
   * @returns a total combined table row value that can be converted into rq
   */
  public async requestUpdate<T = ISQLTableRowValue>(
    item: ItemDefinition | string,
    id: string,
    version: string,
    update: IRQArgs,
    options: IUpdateOptions,
  ): Promise<T> {
    const itemDefinition = item instanceof ItemDefinition ? item : this.root.registry[item] as ItemDefinition;

    const selfTable = itemDefinition.getQualifiedPathName();
    const moduleTable = itemDefinition.getParentModule().getQualifiedPathName();

    if (!id) {
      const err = new Error("Requested an update with an invalid id");
      logger.error(
        {
          className: "Cache",
          methodName: "requestUpdate",
          message: "Requested an update with a missing id",
          serious: true,
          err,
          data: {
            selfTable,
            moduleTable,
            id,
            version,
          },
        }
      );
      throw err;
    }

    const currentSQLValue = options.currentSQLValue || await this.requestValue(itemDefinition, id, version);
    const editedBy = options.editedBy || UNSPECIFIED_OWNER;
    const currentValueAsRQ = options.currentrqValue || convertSQLValueToRQValueForItemDefinition(
      this.serverData,
      this.appData,
      itemDefinition,
      currentSQLValue,
    );

    const propertyMap: IPropertyMapElement[] = [];
    itemDefinition.getAllPropertyDefinitionsAndExtensions().forEach((pDef) => {
      if (pDef.isTracked()) {
        const currentValue = typeof currentSQLValue[pDef.getId()] === "undefined" ? null : currentSQLValue[pDef.getId()];
        propertyMap.push({
          id: pDef.getId(),
          newValue: typeof update[pDef.getId()] as string === "undefined" ? currentValue : update[pDef.getId()],
          originalValue: currentValue,
        });
      }
    });

    const pointerMap: IPropertyMapElementPointer[] = [];
    itemDefinition.getAllPropertyDefinitionsAndExtensions().forEach((pDef) => {
      if (pDef.isPointer() || pDef.isPointerList()) {
        let currentValue: string[] = typeof currentSQLValue[pDef.getId()] === "undefined" ? null : currentSQLValue[pDef.getId()];
        let newValue: string[] = typeof update[pDef.getId()] === "undefined" ? null : (update[pDef.getId()] as any) || null;

        if (Array.isArray(currentValue)) {
          currentValue = currentValue.sort().filter((element, index, arr) => {
            return arr.indexOf(element) === index;
          });
        } else if (typeof currentValue === "string") {
          currentValue = [currentValue];
        } else if (!currentValue) {
          currentValue = [];
        }

        if (Array.isArray(newValue)) {
          newValue = newValue.sort().filter((element, index, arr) => {
            return arr.indexOf(element) === index;
          });
        } else if (typeof newValue === "string") {
          newValue = [newValue];
        } else if (!newValue) {
          newValue = [];
        }

        if (
          (newValue.length !== currentValue.length) ||
          (!newValue.every((v, index) => currentValue[index] === v))
        ) {
          pointerMap.push({
            newValue,
            originalValue: currentValue,
            sourceProperty: pDef,
            targetIdef: pDef.getPointerTargetItem(),
            targetProperty: pDef.getPointerSynchronizationProperty(),
          });
        }
      }
    });

    CAN_LOG_DEBUG && logger.debug(
      {
        className: "Cache",
        methodName: "requestUpdate",
        message: "Requesting update for " + selfTable + " at module " +
          moduleTable + " for id " + id + " and version " + version + " edited by " + editedBy + " using dictionary " + options.dictionary + " and " +
          "container id " + options.containerId,
      },
    );

    if (!options.ignorePreSideEffects) {
      const preSideEffected = itemDefinition.getAllSideEffectedProperties(true);
      // looop into them
      await Promise.all(preSideEffected.map(async (preSideEffectedProperty) => {
        const description = preSideEffectedProperty.property.getPropertyDefinitionDescription();
        const preSideEffectFn = description.sqlPreSideEffect;

        // now we can get this new value
        let newValue: any;
        if (preSideEffectedProperty.include) {
          const includeValue = update[preSideEffectedProperty.include.getQualifiedIdentifier()];
          newValue = includeValue && includeValue[preSideEffectedProperty.property.getId()];
        } else {
          newValue = update[preSideEffectedProperty.property.getId()];
        }

        const originalValue = convertSQLValueToRQValueForProperty(
          this.getServerData(),
          this.appData,
          itemDefinition,
          preSideEffectedProperty.include,
          preSideEffectedProperty.property,
          currentSQLValue,
        )[preSideEffectedProperty.property.getId()] as any;

        if (typeof newValue !== "undefined") {
          const value = await preSideEffectFn({
            appData: this.appData,
            id: preSideEffectedProperty.property.getId(),
            itemDefinition,
            newRowValue: null,
            originalValue: originalValue,
            originalRowValue: currentSQLValue,
            prefix: preSideEffectedProperty.include ? preSideEffectedProperty.include.getPrefixedQualifiedIdentifier() : "",
            property: preSideEffectedProperty.property,
            newValue,
            rowId: id,
            rowVersion: version,
            include: preSideEffectedProperty.include,
          });

          if (value) {
            throw new EndpointError({
              message: typeof value === "string" ? value : "The pre side effect function has forbid this action",
              code: ENDPOINT_ERRORS.FORBIDDEN,
            });
          }
        }
      }));
    }

    // We get only the fields that we expect to be updated
    // in the definition
    const partialUpdateFields: IRQArgs = {};
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

    const containerExists = options.containerId && this.storageClients[options.containerId];

    // and we now build both queries for updating
    // we are telling by setting the partialFields variable
    // that we only want the editingFields to be returned
    // into the SQL value, this is valid in here because
    // we don't want things to be defaulted in the query
    const sqlIdefDataComposed = convertRQValueToSQLValueForItemDefinition(
      this.serverData,
      this.appData,
      itemDefinition,
      update,
      currentValueAsRQ,
      containerExists ? this.storageClients[options.containerId] : null,
      this.domain,
      options.language,
      options.dictionary,
      partialUpdateFields,
    );
    const sqlModDataComposed = convertRQValueToSQLValueForModule(
      this.serverData,
      this.appData,
      itemDefinition.getParentModule(),
      update,
      currentValueAsRQ,
      containerExists ? this.storageClients[options.containerId] : null,
      this.domain,
      options.language,
      options.dictionary,
      partialUpdateFields,
    );
    const sqlModData: IManyValueType = sqlModDataComposed.value;
    const sqlIdefData: IManyValueType = sqlIdefDataComposed.value;

    let actualReparent = options.reparent;
    if (actualReparent) {
      const currentParent = {
        id: currentSQLValue.parent_id || null,
        version: currentSQLValue.parent_version || null,
        type: currentSQLValue.parent_type || null,
      };

      if (
        actualReparent.id === currentParent.id &&
        actualReparent.version === currentParent.version &&
        actualReparent.type === currentParent.type
      ) {
        actualReparent = null;
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "requestUpdate",
            message: "Re-parent specified but ignored because it's the same parent as now",
          },
        );
      }
    }

    if (actualReparent) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Cache",
          methodName: "requestUpdate",
          message: "Re-parent specified is id " + options.reparent.id + " with version " + options.reparent.version + " and type " + options.reparent.type,
        },
      );
      sqlModData.parent_id = options.reparent.id;
      // the version can never be null, so we must cast it into the invalid
      // empty string value
      sqlModData.parent_version = options.reparent.version || "";
      sqlModData.parent_type = options.reparent.type;
    }

    if (options.blocking) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Cache",
          methodName: "requestUpdate",
          message: "Blocking for resource specified as " + options.blocking.status,
        },
      );

      if (options.blocking.status) {
        sqlModData.blocked_at = [
          "NOW()",
          [],
        ];
        sqlModData.blocked_by = editedBy;
        if (options.blocking.reason) {
          sqlModData.blocked_reason = options.blocking.reason;
        }
        if (options.blocking.until) {
          sqlModData.blocked_until = options.blocking.until;
        }
      } else {
        sqlModData.blocked_at = null;
        sqlModData.blocked_by = null;
        sqlModData.blocked_reason = null;
        sqlModData.blocked_until = null;
      }
    }

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
      sqlModData.edited_at = [
        "NOW()",
        [],
      ];
      sqlModData.edited_by = editedBy;
    }
    sqlModData.last_modified = [
      "NOW()",
      [],
    ];

    CAN_LOG_DEBUG && logger.debug(
      {
        className: "Cache",
        methodName: "requestUpdate",
        message: "Finalizing SQL data update",
      },
    );

    const withQuery = new WithBuilder();

    const moduleUpdateQuery = new UpdateBuilder();
    moduleUpdateQuery.table(moduleTable);
    // here we will update our last modified
    moduleUpdateQuery.setBuilder.setMany(sqlModData);
    // and join it on id and version match
    moduleUpdateQuery.whereBuilder.andWhereColumn("id", id);
    moduleUpdateQuery.whereBuilder.andWhereColumn("version", version || "");

    // returning only the module table information
    moduleUpdateQuery.returningBuilder.returningAll();

    withQuery.with("MTABLE", moduleUpdateQuery);

    if (Object.keys(sqlIdefData).length) {
      const itemUpdateQuery = new UpdateBuilder();
      itemUpdateQuery.table(selfTable);
      // here we will update our last modified
      itemUpdateQuery.setBuilder.setMany(sqlIdefData);
      // and join it on id and version match
      itemUpdateQuery.whereBuilder.andWhereColumn(
        CONNECTOR_SQL_COLUMN_ID_FK_NAME,
        id,
      ).andWhereColumn(
        CONNECTOR_SQL_COLUMN_VERSION_FK_NAME,
        version || "",
      );

      // returning only the module table information
      itemUpdateQuery.returningBuilder.returningAll();

      withQuery.with("ITABLE", itemUpdateQuery);
    } else {
      const itemSelectQuery = new SelectBuilder();
      itemSelectQuery.fromBuilder.from(selfTable);
      itemSelectQuery.selectAll().whereBuilder.andWhereColumn(
        CONNECTOR_SQL_COLUMN_ID_FK_NAME,
        id,
      ).andWhereColumn(
        CONNECTOR_SQL_COLUMN_VERSION_FK_NAME,
        version || "",
      );

      withQuery.with("ITABLE", itemSelectQuery);
    }

    const selectQuery = new SelectBuilder();
    selectQuery.fromBuilder.from("MTABLE");
    selectQuery.selectAll().limit(1).joinBuilder.join("ITABLE", (rule) => {
      rule.onColumnEquals(CONNECTOR_SQL_COLUMN_ID_FK_NAME, "id");
      rule.onColumnEquals(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "version");
    });

    withQuery.do(selectQuery);

    // we build the transaction for the action
    let sqlValue: ISQLTableRowValue;
    let potentialTransactingRawDB: ItemizeRawDB = null;

    try {
      const changedPropertyMap = propertyMap.filter((v) => v.newValue !== v.originalValue);

      sqlValue = (actualReparent || changedPropertyMap.length || pointerMap.length) ? (
        await this.databaseConnection.startTransaction(async (transactingDatabase) => {
          const internalSQLValue = convertVersionsIntoNullsWhenNecessary(
            await transactingDatabase.queryFirst(withQuery),
          );

          if (actualReparent || changedPropertyMap.length) {
            const insertQueryBuilder = transactingDatabase.getInsertBuilder();
            insertQueryBuilder.table(TRACKERS_REGISTRY_IDENTIFIER);

            if (actualReparent) {
              const originalParent = {
                id: currentSQLValue.parent_id,
                version: currentSQLValue.parent_version || null,
                type: currentSQLValue.parent_type,
              };

              if (actualReparent.id) {
                // store the new parenting
                insertQueryBuilder.insert({
                  id,
                  version: version || "",
                  type: selfTable,
                  module: moduleTable,
                  property: "PARENT",
                  value: actualReparent.type + "." + actualReparent.id + "." + (actualReparent.version || ""),
                  status: true,
                  transaction_time: [
                    "NOW()",
                    [],
                  ],
                });
                insertQueryBuilder.insert({
                  id,
                  version: version || "",
                  type: selfTable,
                  module: moduleTable,
                  property: "OWNER+PARENT",
                  value: currentSQLValue.created_by + "+" + actualReparent.type + "." + actualReparent.id + "." + (actualReparent.version || ""),
                  status: true,
                  transaction_time: [
                    "NOW()",
                    [],
                  ],
                });
              }
              if (originalParent.id) {
                insertQueryBuilder.insert({
                  id,
                  version: version || "",
                  type: selfTable,
                  module: moduleTable,
                  property: "PARENT",
                  value: originalParent.type + "." + originalParent.id + "." + (originalParent.version || ""),
                  status: false,
                  transaction_time: [
                    "NOW()",
                    [],
                  ],
                });
                insertQueryBuilder.insert({
                  id,
                  version: version || "",
                  type: selfTable,
                  module: moduleTable,
                  property: "OWNER+PARENT",
                  value: currentSQLValue.created_by + "+" + originalParent.type + "." + originalParent.id + "." + (originalParent.version || ""),
                  status: false,
                  transaction_time: [
                    "NOW()",
                    [],
                  ],
                });
              }
            }

            changedPropertyMap.forEach((v) => {
              if (v.originalValue) {
                insertQueryBuilder.insert({
                  id,
                  version: version || "",
                  type: selfTable,
                  module: moduleTable,
                  property: v.id,
                  value: v.originalValue,
                  status: false,
                  transaction_time: [
                    "NOW()",
                    [],
                  ],
                });
              }
              if (v.newValue) {
                insertQueryBuilder.insert({
                  id,
                  version: version || "",
                  type: selfTable,
                  module: moduleTable,
                  property: v.id,
                  value: v.newValue,
                  status: true,
                  transaction_time: [
                    "NOW()",
                    [],
                  ],
                });
              }
            });

            // there can only be one property tracker in the trackers table on whether
            // the given property id, property value, id, version, type combo; whether
            // it was lost or gained, as all other info is irrelevant, this uniqueness constrain
            // will be abused to ensure updates and to keep the tracking database small
            insertQueryBuilder.onConflict("UPDATE", (setBlder) => {
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
          }

          if (pointerMap.length) {
            potentialTransactingRawDB =
              await this.updatePointerMap(transactingDatabase, itemDefinition, internalSQLValue.id, internalSQLValue.version || null, pointerMap);
          }

          return internalSQLValue;
        })
      ) : (
        convertVersionsIntoNullsWhenNecessary(
          await this.databaseConnection.queryFirst(withQuery),
        )
      );

    } catch (err) {
      logger.error(
        {
          className: "Cache",
          methodName: "requestUpdate",
          message: "Intercepted database update error with error information",
          serious: true,
          err,
          data: {
            selfTable,
            moduleTable,
            id,
            version,
            sqlIdefData,
            sqlModData,
          },
        }
      );
      throw err;
    }

    CAN_LOG_DEBUG && logger.debug(
      {
        className: "Cache",
        methodName: "requestUpdate",
        message: "Consuming binary information streams",
      },
    );

    try {
      await sqlIdefDataComposed.consumeStreams(sqlValue.id + "." + (sqlValue.version || ""));
    } catch (err) {
      logger.error(
        {
          className: "Cache",
          methodName: "requestUpdate",
          message: "Could not consume item definition streams; data is corrupted",
          serious: true,
          err,
          data: {
            selfTable,
            moduleTable,
            id,
            version,
          },
        }
      );
    }
    try {
      await sqlModDataComposed.consumeStreams(sqlValue.id + "." + (sqlValue.version || ""));
    } catch (err) {
      logger.error(
        {
          className: "Cache",
          methodName: "requestUpdate",
          message: "Could not consume module streams; data is corrupted",
          serious: true,
          err,
          data: {
            selfTable,
            moduleTable,
            id,
            version,
          },
        }
      );
    }

    if (potentialTransactingRawDB) {
      (async () => {
        try {
          await potentialTransactingRawDB.consumeEventQueue();
        } catch (err) {
          logger.error(
            {
              className: "Cache",
              methodName: "requestUpdate",
              message: "Could not call consumeEventQueue to call the updates on pointers",
              serious: true,
              err,
              data: {
                selfTable,
                moduleTable,
                id,
                version,
              },
            }
          );
        }
      })();
    }

    const indexingFn = async () => {
      if (this.elastic) {
        const language = itemDefinition.getSearchEngineMainLanguageFromRow(sqlValue);
        try {
          await this.elastic.updateDocument(selfTable, language, sqlValue.id, sqlValue.version, sqlValue);
        } catch (err) {
          logger.error(
            {
              className: "Cache",
              methodName: "requestUpdate",
              message: "Could not update value to elastic",
              serious: true,
              err,
              data: {
                selfTable,
                moduleTable,
                id,
                version,
              },
            }
          );
        }
      }
    }

    // we return and this executes after it returns
    const storeInCacheAndSendEvents = (async () => {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Cache",
          methodName: "requestUpdate",
          message: "Storing cache value from the action",
        },
      );
      await this.forceCacheInto(selfTable, id, version, sqlValue, false);

      const changeEvent: IChangedFeedbackEvent = {
        itemDefinition: selfTable,
        id,
        version: version || null,
        type: "modified",
        lastModified: null,
      };
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Cache",
          methodName: "requestUpdate (detached)",
          message: "Built and triggering updated change event",
          data: {
            event: changeEvent,
          },
        },
      );
      this.listener.triggerChangedListeners(
        changeEvent,
        sqlValue,
        options.listenerUUID || null,
      );

      const searchRecord: IRQSearchRecord = {
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
        {
          id: currentSQLValue.parent_id,
          version: currentSQLValue.parent_version || null,
          type: currentSQLValue.parent_type,
        },
        propertyMap,
        searchRecord,
        "modified",
      );
    });

    // Execute side effects of modification according
    // to the given side effected types
    const triggerSideEffects = !options.ignoreSideEffects ? (async () => {
      // let's find all of them
      const sideEffected = itemDefinition.getAllSideEffectedProperties();
      // looop into them
      sideEffected.forEach((sideEffectedProperty) => {
        const description = sideEffectedProperty.property.getPropertyDefinitionDescription();
        const sideEffectFn = description.sqlSideEffect;

        // now we can get this new value
        const newValue = convertSQLValueToRQValueForProperty(
          this.getServerData(),
          this.appData,
          itemDefinition,
          sideEffectedProperty.include,
          sideEffectedProperty.property,
          sqlValue,
        )[sideEffectedProperty.property.getId()] as any;

        // get the original value
        const originalValue = convertSQLValueToRQValueForProperty(
          this.getServerData(),
          this.appData,
          itemDefinition,
          sideEffectedProperty.include,
          sideEffectedProperty.property,
          currentSQLValue,
        )[sideEffectedProperty.property.getId()] as any;

        // and try to execute
        try {
          sideEffectFn({
            appData: this.appData,
            id: sideEffectedProperty.property.getId(),
            itemDefinition,
            newRowValue: sqlValue,
            originalValue: originalValue,
            originalRowValue: currentSQLValue,
            prefix: sideEffectedProperty.include ? sideEffectedProperty.include.getPrefixedQualifiedIdentifier() : "",
            property: sideEffectedProperty.property,
            newValue,
            rowId: sqlValue.id,
            rowVersion: sqlValue.version,
            include: sideEffectedProperty.include,
          });
        } catch (err) {
          logger.error(
            {
              className: "Cache",
              methodName: "requestUpdate",
              message: "Could not execute side effect",
              serious: true,
              err,
              data: {
                selfTable,
                moduleTable,
                id: sqlValue.id,
                version: sqlValue.version,
              },
            }
          );
        }
      });
    }) : null;

    if (options.indexing === "wait_for" || options.indexing === "wait_for_all") {
      await indexingFn();
      storeInCacheAndSendEvents();
      triggerSideEffects();
    } else {
      (async () => {
        await indexingFn();
        storeInCacheAndSendEvents();
        triggerSideEffects();
      })();
    }

    return sqlValue as T;
  }

  /**
 * Deletes all the possible children that might have been set as parent of the deleted
 * item definition value
 * @param itemDefinition 
 * @param id 
 * @param version 
 */
  public async deletePossibleChildrenOf(
    itemDefinition: ItemDefinition,
    id: string,
    version: string,
    options: IDeleteOptions = {},
  ): Promise<IDeletedElement[]> {
    // first we need to find if there is even such a rule and in which modules so we can
    // query the database
    const modulesThatMightBeSetAsChildOf: Module[] =
      this.root.getAllModules().map(analyzeModuleForPossibleParent.bind(this, itemDefinition)).flat() as Module[];

    // if such is the case
    if (modulesThatMightBeSetAsChildOf.length) {
      // we get this is our current deleted item qualified name, and it's our parent type
      const idefQualified = itemDefinition.getQualifiedPathName();

      // now we can loop in these modules
      const evenMoreFinalResult = await Promise.all(modulesThatMightBeSetAsChildOf.map(async (mod) => {
        // and ask for results from the module table, where parents do match this
        let results: ISQLTableRowValue[];
        try {
          results = await this.databaseConnection.queryRows(
            `SELECT "id", "version", "type", "container_id" FROM ${JSON.stringify(mod.getQualifiedPathName())} WHERE ` +
            `parent_id = $1 AND parent_version = $2 AND parent_type = $3`,
            [
              id,
              version || "",
              idefQualified,
            ]
          );
        } catch (err) {
          logger.error(
            {
              className: "Cache",
              methodName: "deletePossibleChildrenOf",
              orphan: true,
              message: "Failed to attempt to find orphans for deleting",
              err,
              data: {
                parentItemDefinition: itemDefinition.getQualifiedPathName(),
                parentId: id,
                parentVersion: version,
                moduleChildCheck: mod.getQualifiedPathName(),
              },
            },
          );
          return [] as IDeletedElement[];
        }

        // if we got results
        if (results.length) {
          // then we need to delete each, one by one
          const finalValue = await Promise.all(results.map(async (r) => {
            // we use the registry to get the proper item definition that represented
            // that module item
            const deleteItemDefinition = this.root.registry[r.type] as ItemDefinition;
            if (r.version) {
              const isDestroyedByUnversionedParent = results.find((r2) => r2.id === r.id && !r2.version);

              // an unversioned parent will do a delete all versions that applies to this version
              // as well
              if (isDestroyedByUnversionedParent) {
                return [] as IDeletedElement[];
              }
            }

            try {
              // and request a delete on it
              return (await this.requestDelete(
                deleteItemDefinition,
                r.id,
                r.version || null,
                options,
              )).deleted;
            } catch (err) {
              logger.error(
                {
                  className: "Cache",
                  methodName: "deletePossibleChildrenOf",
                  message: "Failed to delete an orphan",
                  orphan: true,
                  err,
                  data: {
                    orphanItemDefinition: deleteItemDefinition.getQualifiedPathName(),
                    orphanId: r.id,
                    orphanVersion: r.version || null,
                  },
                },
              );
            }
          }));

          return finalValue.flat();
        } else {
          return [] as IDeletedElement[];
        }
      }));

      return evenMoreFinalResult.flat();
    }

    return [];
  }

  /**
   * Request the deletition of an item definition value
   * @param item the item definition to delete a value for
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
    item: ItemDefinition | string,
    id: string,
    version: string,
    options: IDeleteOptions = {},
  ): Promise<{
    deleted: IDeletedElement[]
  }> {
    const deleted: IDeletedElement[] = [];

    const itemDefinition = typeof item === "string" ?
      this.root.registry[item] as ItemDefinition :
      item;

    // so first we need to get these two
    const selfTable = itemDefinition.getQualifiedPathName();
    const moduleTable = itemDefinition.getParentModule().getQualifiedPathName();

    const dropAllVersions = !version;

    CAN_LOG_DEBUG && logger.debug(
      {
        className: "Cache",
        methodName: "requestDelete",
        message: "Requesting delete for " + selfTable + " at module " +
          moduleTable + " for id " + id + " and version " + version + " drop all versions is " + dropAllVersions,
      },
    );

    // this helper function will allow us to delete all the files
    // for a given version, if we are dropping all version this is useful
    // we want to delete files
    const deleteFilesInContainer = async (containerId: string, specifiedVersion: string) => {
      // first we need to find if we have any file type in either the property
      // definitions of the prop extensions, any will do
      const someFilesInItemDef = itemDefinition.getAllPropertyDefinitions()
        .some((pdef) => pdef.getPropertyDefinitionDescription().rqRepresentsFile);
      const someFilesInModule = itemDefinition.getParentModule().getAllPropExtensions()
        .some((pdef) => pdef.getPropertyDefinitionDescription().rqRepresentsFile);

      const containerExists = this.storageClients && this.storageClients[containerId];

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
              {
                className: "Cache",
                methodName: "requestDelete",
                message: "Could not remove all the files for item definition storage",
                serious: true,
                err,
                data: {
                  domain: this.domain,
                  containerId,
                  itemDefinition: itemDefinition.getQualifiedPathName(),
                  id,
                  version: specifiedVersion || null,
                },
              }
            );
          }
        } else {
          logger.error(
            {
              className: "Cache",
              methodName: "requestDelete",
              message: "Item for " + selfTable + " contains a file field but no container id for data storage is available",
              data: {
                containerId,
              },
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
              {
                className: "Cache",
                methodName: "requestDelete",
                message: "Could not remove all the files for module storage",
                serious: true,
                err,
                data: {
                  domain: this.domain,
                  containerId,
                  module: itemDefinition.getParentModule().getQualifiedPathName(),
                  id,
                  version: specifiedVersion || null,
                },
              }
            );
          }
        } else {
          logger.error(
            {
              className: "Cache",
              methodName: "requestDelete",
              message: "Item for " + selfTable + " at module contains a file field but no container id for data storage is available",
              data: {
                containerId,
              },
            }
          );
        }
      }
    }

    // performs the proper deletetition of whatever is in there
    // it takes the record that represents what we are deleting, the parent (or null) and the creator
    const performProperDeleteOf1 = async (
      record: IRQSearchRecord,
    ) => {
      // got to cascade and delete all the children, this method should be able to execute after
      return this.deletePossibleChildrenOf(itemDefinition, record.id, record.version, options);
    }
    const performProperDeleteOf2 = async (
      row: ISQLTableRowValue,
      record: IRQSearchRecord,
      parent: { id: string; version: string; type: string },
      createdBy: string,
      trackedProperties: string[],
    ) => {
      if (this.elastic) {
        try {
          const language = itemDefinition.getSearchEngineMainLanguageFromRow(row);
          await this.elastic.deleteDocument(itemDefinition, language, record.id, record.version);
        } catch (err) {
          logger.error(
            {
              className: "Cache",
              methodName: "requestDelete",
              message: "Could not delete the value in elasticsearch",
              err,
            }
          );
        }
      }

      const propertyMap: IPropertyMapElement[] = [];
      trackedProperties.forEach((pId) => {
        const currentValue = row[pId] || null;
        propertyMap.push({
          id: pId,
          newValue: currentValue,
          originalValue: currentValue,
        });
      });

      // got to trigger the search listeners saying we have just lost an item
      this.triggerSearchListenersFor(itemDefinition, createdBy, parent, parent, propertyMap, record, "deleted");

      try {
        // update the cache with the new value
        await this.forceCacheInto(selfTable, record.id, record.version, null, false);
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
          options.listenerUUID || null,
        );
        // we don't await for this delete to happen
        deleteFilesInContainer(row.container_id, record.version);
      } catch (err) {
        logger.error(
          {
            className: "Cache",
            methodName: "requestDelete",
            message: "Could not force cache into new value",
            err,
          }
        );
      }
    }
    // PERFORM PROPER DELETE OF

    // now time to do this and actually do the dropping
    // NOTE this code is quite copy pasted in raw db delete
    // if any bug is found here it will likely also exist in raw db
    try {
      let rowsToPerformDeleteSideEffects: ISQLTableRowValue[] = null;

      const searchEngineEnabled = itemDefinition.isSearchEngineEnabled();

      // we are going to see what extra stuff we need due to the language info
      // and elastic cache and whatnot
      let extraLanguageColumnModule = "";
      let extraLanguageColumnIdef = "";
      // only if we are search engine enabled
      if (searchEngineEnabled) {
        // let's get the extra column we use (if any)
        const searchEngineLanguageColumn = itemDefinition.getSearchEngineDynamicMainLanguageColumn();
        // and if there is one
        if (searchEngineLanguageColumn) {
          // is it in the module or item definition
          if (itemDefinition.isSearchEngineDynamicMainLanguageColumnInModule()) {
            extraLanguageColumnModule = ", " + JSON.stringify(searchEngineLanguageColumn);
          } else {
            extraLanguageColumnIdef = ", " + JSON.stringify(searchEngineLanguageColumn);
          }
        }
      }

      // now we check for side effects if we have side effect (basically currency stuff)
      // we would need all the data of what we just have dropped to be processsed
      // eg. that happens in the case of payments
      const sideEffectedProperties = itemDefinition.getAllSideEffectedProperties();
      const needSideEffects = sideEffectedProperties.length !== 0;

      const trackedPropertiesIdef = itemDefinition.getAllPropertyDefinitions()
        .filter((p) => p.isTracked());
      const trackedPropertiesIdefStr = trackedPropertiesIdef.length ? "," + trackedPropertiesIdef.map((p) => {
        return JSON.stringify(p.getId());
      }).join(",") : "";
      const trackedPropertiesMod = itemDefinition.getParentModule().getAllPropExtensions()
        .filter((p) => p.isTracked());
      const trackedPropertiesModStr = trackedPropertiesMod.length ? "," + trackedPropertiesMod.map((p) => {
        return JSON.stringify(p.getId());
      }).join(",") : "";
      const trackedProperties = trackedPropertiesIdef.concat(trackedPropertiesMod).map((p) => p.getId());

      const hasPotentialTrackers = trackedProperties.length || itemDefinition.canBeReparentedEnabled();

      // now we see what we are going to return if we got side effects, everything, otherwise
      // it's just some basic stuff with that extra row
      const returningElementsIdef = needSideEffects ?
        "*" :
        `${JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME)},${JSON.stringify(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME)}${trackedPropertiesIdefStr}${extraLanguageColumnIdef}`;
      // but we only truly add those elements if we either need an idef join wether we have
      // side effects, and want all the data, or we have that extra column we want
      const needsIdefJoin = needSideEffects || trackedPropertiesIdefStr || extraLanguageColumnIdef;
      // as for the module, this is always going to be retrieved
      const returningElementsModule = needSideEffects ?
        "*" :
        `"id","version","parent_id","parent_type","parent_version","container_id","created_by"${trackedPropertiesModStr}${extraLanguageColumnModule}`;

      // dropping all versions is a tricky process, first we need to drop everything
      if (dropAllVersions) {
        const deleteQueryBase = `DELETE FROM ${JSON.stringify(moduleTable)} WHERE "id" = $1 AND "type" = $2 RETURNING ${returningElementsModule}`;
        const deleteQuery = needsIdefJoin ?
          `WITH "ITABLE" AS (SELECT ${returningElementsIdef} FROM ${JSON.stringify(selfTable)
          } WHERE ${JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME)
          } = $1), "MTABLE" AS (${deleteQueryBase
          }) ` +
          `SELECT * FROM "ITABLE" join "MTABLE" ON ${JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME)}="id" AND ` +
          `${JSON.stringify(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME)}="version"` :
          deleteQueryBase;

        const deleteAllTrackers = `DELETE FROM ${JSON.stringify(TRACKERS_REGISTRY_IDENTIFIER)} WHERE "id" = $1 AND "type" = $2`;

        // for that we run a transaction
        const allVersionsDropped: ISQLTableRowValue[] = await this.databaseConnection.startTransaction(async (transactingDatabase) => {
          // and we delete based on id and type
          const allVersionsDroppedInternal: ISQLTableRowValue[] = await transactingDatabase.queryRows(
            deleteQuery,
            [
              id,
              selfTable,
            ]
          );

          // delete all outdated trackers
          if (hasPotentialTrackers) {
            await transactingDatabase.queryRows(deleteAllTrackers, [id, selfTable]);
          }

          rowsToPerformDeleteSideEffects = needSideEffects ? allVersionsDroppedInternal : null;
          // but yet we return the version to see what we dropped, and well parenting and creator

          // and now we need to store the fact we have lost these records in the deleted registry

          let trasactionTimes: string[] = []
          if (allVersionsDroppedInternal.length) {
            const insertQueryBuilder = transactingDatabase.getInsertBuilder();
            insertQueryBuilder.table(DELETED_REGISTRY_IDENTIFIER);

            allVersionsDroppedInternal.forEach(async (row) => {

              const trackers: { [key: string]: string } = trackedProperties ? {} : null;
              trackedProperties.forEach((pId) => {
                const currentValue = row[pId] || null;
                if (currentValue) {
                  trackers[pId] = currentValue;
                }
              });

              insertQueryBuilder.insert({
                id: row.id,
                version: row.version || "",
                type: selfTable,
                module: moduleTable,
                created_by: row.created_by || null,
                parenting_id: row.parent_id ? (row.parent_type + "." + row.parent_id + "." + row.parent_version || "") : null,
                transaction_time: [
                  "NOW()",
                  [],
                ],
                trackers: trackers ? JSON.stringify(trackers) : null,
              });
            });

            // but we need the transaction time for each as the new record
            // last_modified is that transaction time
            insertQueryBuilder.returningBuilder.returningColumn("transaction_time");

            const queryResult = await transactingDatabase.queryRows(insertQueryBuilder);
            trasactionTimes = queryResult.map((r) => r.transaction_time);
          }

          // now we return these rows we got with version, parent_id, parent_type, parent_version and created_by
          // but we add last_modified based on the insert query
          return allVersionsDroppedInternal.map((row, index) => ({
            ...row,
            last_modified: trasactionTimes[index],
          }));
        });

        // and now we can see all what we have dropped
        await Promise.all(allVersionsDropped.map(async (row) => {
          // this version can be null (aka empty string)
          // we need to construct the record
          // the last modified is the transaction time of the deletition
          const record: IRQSearchRecord = {
            id: row.id,
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

          deleted.push({
            id: row.id,
            type: selfTable,
            version: row.version || null,
            parent_id: row.parent_id,
            parent_type: row.parent_type,
            parent_version: row.parent_version || null,
            created_by: createdBy,
          });

          await Promise.all([
            (
              async () => {
                if (options.fetchDeletedChildTree || options.indexing === "wait_for_all") {
                  const moreDeleted = await performProperDeleteOf1(record);
                  if (options.fetchDeletedChildTree) {
                    moreDeleted.forEach((v) => deleted.push(v));
                  }
                  return;
                } else {
                  // no awaiting, no collecting
                  performProperDeleteOf1(record);
                  return;
                }
              }
            )(),
            (
              async () => {
                if (options.indexing === "wait_for" || options.indexing === "wait_for_all") {
                  await performProperDeleteOf2(row, record, parent, createdBy, trackedProperties);
                  return;
                } else {
                  performProperDeleteOf2(row, record, parent, createdBy, trackedProperties);
                  return;
                }
              }
            )(),
          ])

        }));
      } else {
        const deleteQueryBase = `DELETE FROM ${JSON.stringify(moduleTable)} WHERE ` +
          `"id" = $1 AND "version" = $2 AND "type" = $3 RETURNING ${returningElementsModule}`;
        const deleteQuery = needsIdefJoin ?
          `WITH "ITABLE" AS (SELECT ${returningElementsIdef} FROM ${JSON.stringify(selfTable)
          } WHERE ${JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME)
          } = $1 AND ${JSON.stringify(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME)
          } = $2), "MTABLE" AS (${deleteQueryBase
          }) ` +
          `SELECT * FROM "ITABLE" join "MTABLE" ON ${JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME)}="id" AND ` +
          `${JSON.stringify(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME)}="version"` :
          deleteQueryBase;

        const deleteAllTrackers = `DELETE FROM ${JSON.stringify(TRACKERS_REGISTRY_IDENTIFIER)} WHERE "id" = $1 AND "version" = $2 AND "type" = $3`;

        // otherwise if we are deleting a specific version
        const row = await this.databaseConnection.startTransaction(async (transactingDatabase) => {
          // we run this
          // because the index in the item definition cascades
          const interalDroppedRow: ISQLTableRowValue = await transactingDatabase.queryFirst(
            deleteQuery,
            [
              id,
              version || "",
              selfTable,
            ]
          );

          // delete all outdated trackers
          if (hasPotentialTrackers) {
            await transactingDatabase.queryRows(deleteAllTrackers, [id, version || "", selfTable]);
          }

          const trackers: { [key: string]: string } = trackedProperties ? {} : null;
          trackedProperties.forEach((pId) => {
            const currentValue = interalDroppedRow[pId] || null;
            if (currentValue) {
              trackers[pId] = currentValue;
            }
          });

          rowsToPerformDeleteSideEffects = needSideEffects ? [interalDroppedRow] : null;

          const insertQueryBuilder = transactingDatabase.getInsertBuilder();
          insertQueryBuilder.table(DELETED_REGISTRY_IDENTIFIER);
          insertQueryBuilder.insert({
            id: interalDroppedRow.id,
            version: interalDroppedRow.version || "",
            type: selfTable,
            module: moduleTable,
            created_by: interalDroppedRow.created_by || null,
            parenting_id: interalDroppedRow.parent_id ?
              (interalDroppedRow.parent_type + "." + interalDroppedRow.parent_id + "." + interalDroppedRow.parent_version || "") :
              null,
            transaction_time: [
              "NOW()",
              [],
            ],
            trackers: trackers ? JSON.stringify(trackers) : null,
          })

          insertQueryBuilder.returningBuilder.returningColumn("transaction_time");

          // and now we got to insert that row into the deleted registry
          // and retrieve the transaction time
          const insertQueryValue = await transactingDatabase.queryFirst(insertQueryBuilder);

          // and we set it as last modified
          return {
            ...interalDroppedRow,
            last_modified: insertQueryValue.transaction_time,
          };
        });

        // now we can build our search record
        const record: IRQSearchRecord = {
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

        deleted.push({
          id: row.id,
          type: selfTable,
          version: row.version || null,
          parent_id: row.parent_id,
          parent_type: row.parent_type,
          parent_version: row.parent_version || null,
          created_by: createdBy,
        });

        await Promise.all([
          (
            async () => {
              if (options.fetchDeletedChildTree || options.indexing === "wait_for_all") {
                const moreDeleted = await performProperDeleteOf1(record);
                if (options.fetchDeletedChildTree) {
                  moreDeleted.forEach((v) => deleted.push(v));
                }
                return;
              } else {
                // no awaiting, no collecting
                performProperDeleteOf1(record);
                return;
              }
            }
          )(),
          (
            async () => {
              if (options.indexing === "wait_for" || options.indexing === "wait_for_all") {
                await performProperDeleteOf2(row, record, parent, createdBy, trackedProperties);
                return;
              } else {
                performProperDeleteOf2(row, record, parent, createdBy, trackedProperties);
                return;
              }
            }
          )(),
        ]);
      }

      if (rowsToPerformDeleteSideEffects && rowsToPerformDeleteSideEffects.length) {
        // Execute side effects of modification according
        // to the given side effected types
        !options.ignoreSideEffects ? (async () => {
          // looop into them
          sideEffectedProperties.forEach((sideEffectedProperty) => {
            const description = sideEffectedProperty.property.getPropertyDefinitionDescription();
            const sideEffectFn = description.sqlSideEffect;

            rowsToPerformDeleteSideEffects.forEach((sqlValue) => {
              // now we can get this new value
              const originalValue = convertSQLValueToRQValueForProperty(
                this.getServerData(),
                this.appData,
                itemDefinition,
                sideEffectedProperty.include,
                sideEffectedProperty.property,
                sqlValue,
              )[sideEffectedProperty.property.getId()] as any;

              // and try to execute
              try {
                sideEffectFn({
                  appData: this.appData,
                  id: sideEffectedProperty.property.getId(),
                  itemDefinition,
                  newRowValue: null,
                  originalValue,
                  originalRowValue: sqlValue,
                  prefix: sideEffectedProperty.include ? sideEffectedProperty.include.getPrefixedQualifiedIdentifier() : "",
                  property: sideEffectedProperty.property,
                  newValue: null,
                  rowId: sqlValue.id,
                  rowVersion: sqlValue.version,
                  include: sideEffectedProperty.include,
                });
              } catch (err) {
                logger.error(
                  {
                    className: "Cache",
                    methodName: "requestDelete",
                    message: "Could not execute side effect function",
                    serious: true,
                    err,
                    data: {
                      selfTable,
                      moduleTable,
                      id: sqlValue.id,
                      version: sqlValue.version,
                      dropAllVersions,
                    },
                  }
                );
              }
            });
          });
        })() : null;
      }

      return { deleted };
    } catch (err) {
      logger.error(
        {
          className: "Cache",
          methodName: "requestDelete",
          message: "Intercepted database delete error with error information",
          serious: true,
          err,
          data: {
            selfTable,
            moduleTable,
            id,
            version,
            dropAllVersions,
          },
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
    }, await this.appData.registry.getJWTSecretFor(JWT_KEY));
  }

  /**
   * Requests a value from the cache
   * @param item the item definition or a qualified name
   * @param id the id to request for
   * @param version the version
   * @param options.useMemoryCache a total opposite of refresh, (do not use together as refresh beats this one)
   * which will use a 1 second memory cache to retrieve values and store them, use this if you think the value
   * might be used consecutively and you don't care about accuraccy that much
   * @returns a whole sql value that can be converted into rq if necessary
   */
  public async requestValue<T = ISQLTableRowValue>(
    item: ItemDefinition | string,
    id: string,
    version: string,
    options: {
      doNotCombine?: boolean,
      useMemoryCache?: boolean,
      useMemoryCacheMs?: number,
      doNotEnsure?: boolean,
      forceRefresh?: boolean,
      doNotFallbackToDb?: boolean,
      onNotFallenBackToDbAndNotFound?: () => void,
    } = {},
  ): Promise<T> {
    if (options.forceRefresh && options.doNotFallbackToDb) {
      throw new Error("forceRefresh and doNotFallback to db cannot be used at the same time since they are contradictory");
    }

    const memCache = options.useMemoryCache;

    const itemDefinition = typeof item === "string" ?
      this.root.registry[item] as ItemDefinition :
      item;

    const idefTable = itemDefinition.getQualifiedPathName();
    const moduleTable = itemDefinition.getParentModule().getQualifiedPathName();

    CAN_LOG_DEBUG && logger.debug(
      {
        className: "Cache",
        methodName: "requestValue",
        message: "Requesting value for " + idefTable + " at module " +
          moduleTable + " for id " + id + " and version " + version + " with doNotRecheck " + !!options.doNotEnsure,
      },
    );

    const idefQueryIdentifier = "IDEFQUERY:" + idefTable + "." + id.toString() + "." + (version || "");
    if (memCache && this.memoryCache[idefQueryIdentifier]) {
      return this.memoryCache[idefQueryIdentifier].value as T;
    }

    // what requests can be combined with others currently
    // running, well if do not combine is active
    // then we dont combine, otherwise things like doNotEnsure
    // are mean for efficiency purposes
    // but a combination is more effective than anything
    // doNotFallbackToDB may seem like a good one too
    // but if the other succeeds then it's like it
    // is in the cache
    const cantCombine =
      options.doNotCombine;

    // if we are allowed to combine with a running
    // request for the same item
    if (!cantCombine && this.combineCache[idefQueryIdentifier]) {
      // we try
      try {
        // await for the promise that should be there still
        const value = await this.combineCache[idefQueryIdentifier];

        // now we can store in the memory cache if we are meant to
        // maybe the other one also uses memory cache
        // in any case it doesn't hurt
        if (memCache) {
          const idefQueryIdentifier = "IDEFQUERY:" + idefTable + "." + id.toString() + "." + (version || "");
          this.memoryCache[idefQueryIdentifier] = {
            value,
          };
          setTimeout(() => {
            delete this.memoryCache[idefQueryIdentifier];
          }, typeof options.useMemoryCacheMs !== "undefined" ? options.useMemoryCacheMs : MEMCACHE_EXPIRES_MS);
        }

        // now we can return the value
        return value as T;
      } catch (err) {
        // otherwise the other method call for the same
        // object failed, log the error and throw it
        logger.error(
          {
            className: "Cache",
            methodName: "requestValue",
            message: "Received error while waiting for combination cache response",
            serious: true,
            err,
            data: {
              idefTable,
              moduleTable,
              id,
              version,
            },
          }
        );
        throw err;
      }
    }

    // this is however what we do to determine
    // whether we create a combination point
    const cantCreateCombinationPoint =
      options.doNotFallbackToDb ||
      options.doNotEnsure ||
      // the combination point already exists
      // by someone else
      this.combineCache[idefQueryIdentifier];

    let resolveCombinationPoint: (r: ISQLTableRowValue) => void = null;
    let rejectCombinationPoint: (err: Error) => void = null;
    if (!cantCreateCombinationPoint) {
      this.combineCache[idefQueryIdentifier] = new Promise((resolve, reject) => {
        resolveCombinationPoint = resolve;
        rejectCombinationPoint = reject;
      });
    }

    try {
      // whether we need to refresh
      let refresh = false;
      let refreshWasDeleted = false;

      if (!options.forceRefresh) {
        let currentValue = await this.getRaw<ISQLTableRowValue>(idefQueryIdentifier);
        // we do not need to refresh the value
        if (currentValue && !options.doNotEnsure) {
          const rowResultLastMod: ISQLTableRowValue = convertVersionsIntoNullsWhenNecessary(
            // let's remember versions as null do not exist in the database, instead it uses
            // the invalid empty string "" value
            await this.databaseConnection.queryFirst(
              `SELECT "last_modified" FROM ${JSON.stringify(moduleTable)} WHERE "id" = $1 AND "version" = $2 ` +
              `LIMIT 1`,
              [
                id,
                version || "",
              ],
            ),
          );

          // it's there but does it match our redis
          if (rowResultLastMod) {
            // well it does not, redis says it's gone
            if (!currentValue.value) {
              // refresh please
              refresh = true;
            } else if (currentValue.value.last_modified !== rowResultLastMod.last_modified) {
              refresh = true;
            }
            // it's not there
          } else {
            // but this says it does
            if (currentValue.value) {
              // we refresh but also say that we know it was deleted
              refresh = true;
              refreshWasDeleted = true;
            }
          }
        } else if (!currentValue) {
          // I mean we need to refresh if we got no value
          refresh = true;
        }
        // otherwise we got a value and we do not use the recheck
        // so we are going to go with that

        // if we are not refreshing or it was deleted
        if (!refresh || refreshWasDeleted) {
          // if it was deleted
          if (refreshWasDeleted) {
            // force the damn thing
            this.forceCacheInto(idefTable, id, version, null, false);
            currentValue = {
              value: null,
            }
          }

          // store in memcache
          if (memCache) {
            this.memoryCache[idefQueryIdentifier] = currentValue;
            setTimeout(() => {
              delete this.memoryCache[idefQueryIdentifier];
            }, typeof options.useMemoryCacheMs !== "undefined" ? options.useMemoryCacheMs : MEMCACHE_EXPIRES_MS);
          }

          // if we can and have created a combination point
          if (!cantCreateCombinationPoint) {
            // delete it so none else sees it anymore
            delete this.combineCache[idefQueryIdentifier];
            // resolve it
            resolveCombinationPoint && resolveCombinationPoint(currentValue.value);
          }
          return currentValue.value as T
        }
      } else {
        refresh = true;
      }

      // we do not fall back to DB
      if (options.doNotFallbackToDb) {
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Cache",
            methodName: "requestValue",
            message: "Not found in memory or refresh expected; but doNotFallbackToDb is set",
          },
        );

        options.onNotFallenBackToDbAndNotFound && options.onNotFallenBackToDbAndNotFound();

        // THIS CANT CREATE A COMBINATION POINT NOT WORTH CHECKING
        return null;
      }

      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Cache",
          methodName: "requestValue",
          message: "Not found in memory or refresh expected; requesting database",
        },
      );

      try {
        const queryValue: ISQLTableRowValue = convertVersionsIntoNullsWhenNecessary(
          // let's remember versions as null do not exist in the database, instead it uses
          // the invalid empty string "" value
          await this.databaseConnection.queryFirst(
            `SELECT * FROM ${JSON.stringify(moduleTable)} JOIN ${JSON.stringify(idefTable)} ` +
            `ON ${JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME)} = "id" AND ${JSON.stringify(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME)} = "version" ` +
            `WHERE "id" = $1 AND "version" = $2 ` +
            `LIMIT 1`,
            [
              id,
              version || "",
            ],
          ),
        );
        // we don't wait for this
        this.forceCacheInto(idefTable, id, version, queryValue, false);

        if (memCache) {
          const idefQueryIdentifier = "IDEFQUERY:" + idefTable + "." + id.toString() + "." + (version || "");
          this.memoryCache[idefQueryIdentifier] = {
            value: queryValue,
          };
          setTimeout(() => {
            delete this.memoryCache[idefQueryIdentifier];
          }, typeof options.useMemoryCacheMs !== "undefined" ? options.useMemoryCacheMs : MEMCACHE_EXPIRES_MS);
        }

        // again if we can create it
        if (!cantCreateCombinationPoint) {
          // delete it since we are done
          delete this.combineCache[idefQueryIdentifier];
          // resolve it so the others catch the value
          resolveCombinationPoint && resolveCombinationPoint(queryValue);
        }
        return queryValue as T;
      } catch (err) {
        logger.error(
          {
            className: "Cache",
            methodName: "requestValue",
            message: "Intercepted database request error with error information",
            serious: true,
            err,
            data: {
              idefTable,
              moduleTable,
              id,
              version,
            },
          }
        );
        throw err;
      }
    } catch (err) {
      if (!cantCreateCombinationPoint) {
        // delete it so none else sees it anymore
        delete this.combineCache[idefQueryIdentifier];
        // reject it, we have failed
        rejectCombinationPoint && rejectCombinationPoint(err);
      }
      throw err;
    }
  }

  /**
   * TODO Optimize this, right now it retrieves the list one by one
   * Requests a whole list of search results
   * @param records the records to request for
   * @returns a list of whole sql combined table row values
   */
  public async requestListCache<T = ISQLTableRowValue>(records: IRQSearchRecord[]): Promise<T[]> {
    const resultValues = await Promise.all(records.map((recordContainer) => {
      const itemDefinition = this.root.registry[recordContainer.type] as ItemDefinition;
      return this.requestValue(itemDefinition, recordContainer.id, recordContainer.version);
    }));
    return resultValues as T[];
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
    logger.info(
      {
        className: "Cache",
        methodName: "onServerDataChangeInformed",
        message: "New server data has been informed",
      },
    );
    this.serverData = newData;
    this.elastic && this.elastic.informNewServerData(newData);
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
              forceRefresh: true,
            },
          );
        } else {
          // if we have such a value we want to update it
          await this.forceCacheInto(itemDefinition, id, version, data, true);
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
    } catch (err) {
      logger.error(
        {
          className: "Cache",
          methodName: "onChangeInformed",
          message: "Could not retrieve existance for " + idefQueryIdentifier,
          err,
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

  /**
   * When a change has been informed from the cluster that other cluster has made
   * but it provides no data about what has changed and it needs to be
   * manually fetched
   * @param itemDefinition 
   * @param id 
   * @param version 
   */
  public async onChangeInformedNoData(itemDefinition: string, id: string, version: string) {
    await this.onChangeInformed(itemDefinition, id, version, undefined);
  }

  /**
   * Allows to set the app data in the server side
   * where this app is contained
   * @param appData the app data
   */
  public setAppData(appData: IAppDataType) {
    this.appData = appData;
  }

  private async updatePointerMap(
    transactingDatabase: DatabaseConnection,
    itemDefinition: ItemDefinition,
    id: string,
    version: string,
    pointerMap: IPropertyMapElementPointer[],
  ) {
    // so first we grab a new raw db to those those pesky pointer updates
    // so that the events are equeued, we build hook this transaction into the raw
    // db, and tell it that it's transacting so that events don't execute immediately
    const newRawDB = this.appData.rawDB.hookInto(transactingDatabase, { transacting: true });

    // and these is our own, self id/version combo
    const idVersionToAddOrRemove = id + (version ? "." + version : "");

    // now we start looking into that pointer map
    await Promise.all(pointerMap.map(async (pointer) => {
      // so this is whatever it was pointing at that is now not anymore
      const whereThisWasRemoved = pointer.originalValue.filter((value) => !pointer.newValue.includes(value));
      // and the opposite these is where is newly pointing at
      const whereThisWasAdded = pointer.newValue.filter((value) => !pointer.originalValue.includes(value));

      // now we gonna check if our target property is a taglist or whatever
      const targetPropertyIsArray = pointer.targetProperty.getType() === "taglist";
      const targetPropertyId = pointer.targetProperty.getId();

      // and now we loop for both where we add and where we remove
      await Promise.all([whereThisWasAdded, whereThisWasRemoved].map(async (whereToDealWith, index) => {
        // only the first is add
        const isAdd = index === 0;
        // and we deal with it if we have something to deal with
        if (whereToDealWith.length) {
          // we split the id.version complex
          const whereToDealWithComplex = whereToDealWith.map((v) => v.split("."))
          // and check if they are all unversioned
          const isAllNullVersions = whereToDealWithComplex.every((idVersion) => !idVersion[1]);

          // now we update
          await newRawDB.performBatchRawDBUpdate(
            // at the target item definition
            pointer.targetIdef,
            {
              // we check if it's a extension to know if it's moduleTableUpdate or itemTableUpdate
              [pointer.targetProperty.isExtension() ? "moduleTableUpdate" : "itemTableUpdate"]: {
                // and now we can update that one property that luckily because it's one of those
                // pointers the sql is the same as its id
                [targetPropertyId]: targetPropertyIsArray ? [
                  // if it's array then we got to give this array_add and array_remove thing
                  (isAdd ? "array_append" : "array_remove") + "(" + JSON.stringify(targetPropertyId) + ", ?)",
                  [idVersionToAddOrRemove],
                  // otherwise we set the value or remove it altogether since
                  // we are not pointing at it anymore
                ] : (isAdd ? idVersionToAddOrRemove : null)
              },
              whereCriteriaSelector: (whereBuilder) => {
                // now this is where we select where
                if (isAllNullVersions) {
                  // for all null versions we use the ANY trick
                  whereBuilder.andWhere(
                    "\"id\" = ANY(ARRAY[" + whereToDealWithComplex.map(() => "?").join(",") + "]::TEXT[])",
                    whereToDealWithComplex.map((v) => v[0]),
                  ).andWhereColumn("version", "");
                } else {
                  // otherwise this annoying selector one by one
                  whereToDealWithComplex.forEach((idVersion) => {
                    whereBuilder.orWhere((subBuilder) => {
                      subBuilder.andWhereColumn("id", idVersion[0]);
                      subBuilder.andWhereColumn("version", idVersion[1] || "");
                    });
                  });
                }
              },

              // our target property may also be a pointer we allow it to be updated
              dangerousForceUpdatePointers: true,
            },
          )
        }
      }))
    }));

    // and this should do it, note that this does not trigger the events in the queue because this
    // is happening in a transaction that we just hooked into, so we gotta consume the events
    // later on once we have succeeded
    return newRawDB;
  }
}
