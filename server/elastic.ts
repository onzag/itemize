import type { Client } from "@elastic/elasticsearch";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import type Module from "../base/Root/Module";
import type { ItemizeRawDB } from "./raw-db";
import type Root from "../base/Root";
import { getElasticSchemaForRoot, IElasticIndexDefinitionType, IElasticSchemaDefinitionType, ISQLTableRowValue } from "../base/Root/sql";
import { logger } from "./logger";
import equals from "deep-equal";
import { convertSQLValueToElasticSQLValueForModule } from "../base/Root/Module/sql";
import { convertSQLValueToElasticSQLValueForItemDefinition } from "../base/Root/Module/ItemDefinition/sql";

interface ILangAnalyzers {
  [key: string]: string;
}

class NotReadyError extends Error {
  constructor(message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotReadyError.prototype);
  }
}

/**
 * This function specifies whether two mappings are compatible, the mappings are however
 * the elastic server has setup a certain index
 * @param server the server way that the index mapping has been set
 * @param expected whatever we are expecting to be
 * @returns an object where general means that if they are compatible in general, and scripts ignored means
 * if they are compatible if the scripts have been ignored regarding runtime properties, this is important because
 * they may be incompatible but only due to scripts, and scripts in itemize are designed to vary because of the
 * currency factors are injected as a runtime value via a script, so the script will vary
 */
function mappingsAreCompatible(server: IElasticIndexDefinitionType, expected: IElasticIndexDefinitionType) {
  // so first we compare the standard properties
  // note how we compare based on the expected
  const propertiesEqual = Object.keys(expected.properties).every((p) => {
    const expectedValue = expected.properties[p];
    const serverValue = server.properties[p];

    return equals(expectedValue, serverValue, { strict: true });
  });

  // if they are not equal, then we can assume none of them are
  if (!propertiesEqual) {
    return {
      general: false,
      scriptsIgnored: false,
    };
  }

  // otherwise let's calculate, we are defaulting to true
  // we already know that the properties are equal, so let's assume true
  // and let's find falseness
  let general: boolean = true;
  let scriptsIgnored: boolean = true;

  // so this only matters if we have runtime, otherwise indeed
  // properties are equal so they are equal in general
  // if the server doesn't have runtime fields then they are compatible
  if (expected.runtime) {
    // now we begin to loop in these runtime properties
    Object.keys(expected.runtime).every((p) => {
      if (!general && !scriptsIgnored) {
        // short circuit both of them are already false
        return false;
      }

      // the expected and the server value
      const expectedValue = expected.runtime[p];
      const serverValue = server.runtime && server.runtime[p];

      // for our scripts ignored
      const expectedValueScriptsIgnored = {
        ...expectedValue,
        script: null,
      };
      const serverValueScriptsIgnored = {
        ...serverValue,
        script: null,
      };

      // check for equality between these two
      const isEqualWithScriptsIgnored = equals(expectedValueScriptsIgnored, serverValueScriptsIgnored, { strict: true });
      const isEqualGeneral = equals(expectedValue, serverValue, { strict: true });

      // and then falsify the booleans
      if (!isEqualWithScriptsIgnored) {
        scriptsIgnored = false;
      }

      if (!isEqualGeneral) {
        general = false;
      }

      // we may return true to keep going with the loop
      return true;
    });
  }

  // now we return whatever we got
  return {
    general,
    scriptsIgnored,
  };
}

/**
 * @ignore
 * @param ms 
 * @returns 
 */
function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * A simple elastic information type that is stored
 * regarding the schemas and whenever they had been last modified
 */
interface IElasticIndexInformationType {
  lastConsisencyCheck: string;
  sinceLimiter: number;
}

/**
 * This is the elastic client that is used in the global manager to keep
 * things up to date in the global service as well as in the standard servers
 * to perform queries against elastic
 */
export class ItemizeElasticClient {
  public elasticClient: Client;
  private rawDB: ItemizeRawDB;
  private root: Root;
  private rootSchema: IElasticSchemaDefinitionType;
  private langAnalyzers: ILangAnalyzers;
  private serverData: any;
  private lastFailedWaitMultiplied: number = 0;

  private serverDataPromise: Promise<void>;
  private serverDataPromiseResolve: () => void;

  private prepareInstancePromise: Promise<void>;
  private prepareInstancePromiseResolve: () => void;

  constructor(
    root: Root,
    rawDB: ItemizeRawDB,
    elasticClient: Client,
    langAnalyzers: ILangAnalyzers,
  ) {
    this.root = root;
    this.rootSchema = null;
    this.rawDB = rawDB;
    this.rawDB.setupElastic(this);
    this.elasticClient = elasticClient;
    this.langAnalyzers = langAnalyzers;
    this.serverData = null;

    // let's setup this promise for the server data
    this.serverDataPromise = new Promise((r) => {
      this.serverDataPromiseResolve = r;
    });

    // and the prepare instance is set to null
    // because we don't want to block functions that
    // may rely on this function when nothing
    // is to be prepared, for example the confirm
    // instance readiness may be called after the prepare instance
    // in absolute mode, when both are called, so it will block it
    // in extended mode where prepare instance is never called
    this.prepareInstancePromise = null;
  }

  /**
   * This function is automatically called by the global manager when new server
   * data has been obtained, you should not use it by yourself
   * @param serverData the server data that has changed
   */
  public async informNewServerData(serverData: any) {
    // first we check wether we should resolve the server data promise
    // that comes when our first server data has arrived
    const shouldResolvePrmomise = !this.serverData;
    this.serverData = serverData;
    this.rootSchema = getElasticSchemaForRoot(this.root, this.serverData);

    if (shouldResolvePrmomise) {
      this.serverDataPromiseResolve();
    }

    // now that the server data is ready, the prepare instace may run properly
    // because this function only runs in the global manager, we may now
    // update all our mappings due to new server data

    // if the promise is missing otherwise it is pointless as preparing will
    // ensure that our server data is used
    if (!this.prepareInstancePromise) {
      // we now want our indexes to be rebuilt based on the new information
      // we have received
      await this._rebuildAllIndexes();
    };
  }

  /**
   * A function used within this class in order to wait for the server
   * data to be ready
   * @returns a void promise
   */
  private async waitForServerData() {
    if (this.serverData) {
      return;
    }

    await this.serverDataPromise;
  }

  /**
   * Prepares the itemize instance so that all the necessary meta indexes are contained
   * and checks wether existant indexes match the shape, this can take a very long time
   * this function is called automatically by the global manager
   * @returns a void promise
   */
  public async prepareInstance(): Promise<void> {
    // prepare the promise for preparing the instance
    this.prepareInstancePromise = new Promise((r) => {
      this.prepareInstancePromiseResolve = r;
    });

    // now we can try to prepare it until it succeeds
    try {
      await this._prepareInstance();
      this.lastFailedWaitMultiplied = 0;
    } catch (err) {
      this.lastFailedWaitMultiplied++;

      let secondsToWait = 2 ** this.lastFailedWaitMultiplied;
      if (secondsToWait >= 60) {
        secondsToWait = 60;
      }

      const timeToWait = 1000 * secondsToWait;
      logger.error(
        "ItemizeElasticClient.prepareInstance [SERIOUS]: could not prepare elastic instance waiting " + secondsToWait + "s",
        {
          errStack: err.stack,
          errMessage: err.message,
        }
      );

      await wait(timeToWait);

      await this.prepareInstance();
    }

    // now we can resolve the promise
    this.prepareInstancePromiseResolve();
    this.prepareInstancePromise = null;
  }

  private async _rebuildAllIndexes(): Promise<string[]> {
    // now we can begin qeuing the indexes that we want created
    const modsQueued: Module[] = [];
    const listOfAll: string[] = [];

    // first we await for all the modules that we have in root
    await Promise.all(this.root.getAllModules().map(async (rootMod) => {
      // we add that into the list of everything we have got
      listOfAll.push(rootMod.getQualifiedPathName());
      // and if it's search engine enabled we add it to mods
      if (rootMod.isSearchEngineEnabled()) {
        modsQueued.push(rootMod);
      }

      // and now we get all the child item definitions inside that mod
      return await Promise.all(
        rootMod.getAllChildDefinitionsRecursive().map(async (cIdef) => {
          // add that t the list of all
          listOfAll.push(cIdef.getQualifiedPathName());
          // and get the parent module
          const parentMod = cIdef.getParentModule();
          // push that too
          listOfAll.push(parentMod.getQualifiedPathName());
          // and if that parent module is enabled and we haven't queued it yet
          if (parentMod.isSearchEngineEnabled() && !modsQueued.includes(parentMod)) {
            modsQueued.push(rootMod);
          }
          // and if the item itself is search engine enabled
          if (cIdef.isSearchEngineEnabled()) {
            await this.rebuildIndexes(cIdef);
          }
        })
      );
    }));

    // now we can build all the modules
    await Promise.all(modsQueued.map(async (mod) => {
      await this.rebuildIndexes(mod);
    }));

    return listOfAll;
  }

  /**
   * Used internally for preparing the instance
   * 
   * this function may fail and throw an error, causing the instance to retry again,
   * and again, and again, until it succeeds
   * 
   * @ignore
   */
  private async _prepareInstance(): Promise<void> {
    // first we create or update the status
    // index that we use internally for index information
    // and metadata
    await this.createOrUpdateSimpleIndex(
      "status",
      {
        properties: {
          lastConsisencyCheck: {
            type: "date",
          },
          sinceLimiter: {
            type: "integer",
          },
        }
      }
    );

    // we call this
    const listOfAll = await this._rebuildAllIndexes();

    // and now let's get our remaining elements that are just special elements added by the schema
    const simpleIds = Object.keys(this.rootSchema).filter((key) => !listOfAll.includes(key));

    // and now we can build those too
    await Promise.all(simpleIds.map((r) => this.createOrUpdateSimpleIndex(r, this.rootSchema[r])));
  }

  /**
   * Returns when it believes elastic has been built and is ready
   * use in other than the global manager
   * 
   * this function is called automatically before the server starts
   * note that if the elastic schema and the instance schema differ, it will consider
   * itself not ready until they do match, this means your server will simply, wait forever
   * 
   * @returns a void promise once it's done
   */
  public async confirmInstanceReadiness(): Promise<void> {
    // we wait for the instance to be prepared
    // this only truly is of use in ABSOLUTE mode
    await this.prepareInstancePromise;

    try {
      await this._confirmInstanceReadiness();
      this.lastFailedWaitMultiplied = 0;
    } catch (err) {
      this.lastFailedWaitMultiplied++;

      let secondsToWait = 2 ** this.lastFailedWaitMultiplied;
      if (secondsToWait >= 60) {
        secondsToWait = 60;
      }
      const timeToWait = 1000 * secondsToWait;

      // an specific not ready error, we rather don't log to eror
      // as it's not a real error
      if (err instanceof NotReadyError) {
        logger.info(
          "ItemizeElasticClient.confirmInstanceReadiness: not ready, waiting " + secondsToWait + "s",
          {
            message: err.message,
          }
        );
      } else {
        logger.error(
          "ItemizeElasticClient.confirmInstanceReadiness [SERIOUS]: could not confirm the elastic instance waiting " + secondsToWait + "s",
          {
            errStack: err.stack,
            errMessage: err.message,
          }
        );
      }

      await wait(timeToWait);

      await this.confirmInstanceReadiness();
    }
  }

  /**
   * @ignore
   * The actual function called to confirm that is ready
   * it returns an error if it fails somehow, aka, not ready
   */
  private async _confirmInstanceReadiness(): Promise<void> {
    // this is similar to the prepare function but we do not update
    // anything, just ensure that everything is compatible
    const modsQueued: Module[] = [];
    const listOfAll: string[] = [];

    // now we can do the same and loop on these
    await Promise.all(this.root.getAllModules().map(async (rootMod) => {
      listOfAll.push(rootMod.getQualifiedPathName());
      // add to the mods queued
      if (rootMod.isSearchEngineEnabled()) {
        modsQueued.push(rootMod);
      }

      // add to the child item definitions checkup
      return await Promise.all(
        rootMod.getAllChildDefinitionsRecursive().map(async (cIdef) => {
          listOfAll.push(cIdef.getQualifiedPathName());
          const parentMod = cIdef.getParentModule();
          listOfAll.push(parentMod.getQualifiedPathName());
          if (parentMod.isSearchEngineEnabled() && !modsQueued.includes(parentMod)) {
            modsQueued.push(rootMod);
          }
          // ensure the item
          if (cIdef.isSearchEngineEnabled()) {
            await this.ensureIndexes(cIdef, true);
          }
        })
      );
    }));

    // and ensure all the mods we qeued
    await Promise.all(modsQueued.map(async (mod) => {
      await this.ensureIndexes(mod, true);
    }));

    // and now let's get our remaining elements that are just special elements added by the schema
    const simpleIds = Object.keys(this.rootSchema).filter((key) => !listOfAll.includes(key));

    // and now we can check those too
    await Promise.all(simpleIds.map((r) => this.ensureSimpleIndex(r, this.rootSchema[r], true)));
  }

  /**
   * For a given index, either itself or wildcard form it will
   * return all the mappings that it knows to have, if no mapping
   * are found it will return null
   * @param indexName the index name to check
   * @returns whatever it finds, or null if the index does not exist
   */
  private async retrieveCurrentSchemaDefinition(
    indexName: string,
  ) {
    const doesExist = await this.elasticClient.indices.exists({
      index: indexName,
      allow_no_indices: false,
    });
    if (doesExist) {
      const currentMapping = await this.elasticClient.indices.getMapping({
        index: indexName,
        allow_no_indices: false,
      });
      return currentMapping;
    } else {
      return null;
    }
  }

  /**
   * Updates the index status info for a given index or group
   * of indexes given its qualified name
   * @param qualifiedName 
   * @param value 
   */
  private async setIndexStatusInfo(
    qualifiedName: string,
    value: IElasticIndexInformationType,
  ) {
    await this.elasticClient.update({
      id: qualifiedName,
      index: "status",
      doc: value,
      doc_as_upsert: true,
    });
  }

  /**
   * retrieves the status information for a given index, also uses cahing to ensure
   * consistency
   * 
   * @param qualifiedName 
   * @returns 
   */
  private async retrieveIndexStatusInfo(
    qualifiedName: string,
  ): Promise<IElasticIndexInformationType> {
    const results = await this.elasticClient.search({
      index: "status",
      query: {
        bool: {
          filter: {
            term: {
              _id: qualifiedName,
            },
          },
        },
      },
      allow_no_indices: true,
    });

    if (!results.hits.hits.length) {
      return null;
    } else {
      const rs = results.hits.hits[0]._source as any;
      return rs;
    }
  }

  private async createOrUpdateSimpleIndex(
    id: string,
    value: IElasticIndexDefinitionType,
  ) {
    logger.info(
      "ItemizeElasticClient.createOrUpdateSimpleIndex: ensuring index for " + id,
    );

    const analyzer = this.langAnalyzers["en"] || this.langAnalyzers["*"] || "standard";
    const analyzerLow = analyzer.toLowerCase();

    const indexName = id.toLowerCase();

    const currentMapping = await this.retrieveCurrentSchemaDefinition(indexName);

    if (currentMapping) {
      const mappings = currentMapping[indexName].mappings;
      const isCompatible = mappingsAreCompatible(
        {
          properties: { ...mappings.properties },
          runtime: { ...mappings.runtime },
        },
        value,
      ).general;
      if (!isCompatible) {
        logger.info(
          "ItemizeElasticClient.createOrUpdateSimpleIndex: index for " + id + " to be updated",
        );
        await this.elasticClient.indices.putMapping({
          index: indexName,
          properties: value.properties,
          runtime: value.runtime || {},
        });
      } else {
        logger.info(
          "ItemizeElasticClient.createOrUpdateSimpleIndex: index for " + id + " deemed compatible",
        );
      }
    } else {
      logger.info(
        "ItemizeElasticClient.createOrUpdateSimpleIndex: index for " + id + " to be created",
      );
      await this.elasticClient.indices.create({
        index: indexName,
        mappings: {
          properties: value.properties,
          runtime: value.runtime || {},
        },
        settings: {
          analysis: {
            analyzer: {
              default: (analyzerLow === "standard" || analyzerLow === "simple") ? {
                type: analyzerLow,
              } : {
                type: analyzerLow as any,
              }
            }
          }
        }
      });
    }
  }

  private async createIndexForLanguage(
    qualifiedName: string,
    value: IElasticIndexDefinitionType,
    lang: string,
  ) {

  }

  /**
   * This function is used to internally rebuild an index
   * @param qualifiedName 
   * @param value 
   * @param sinceLimiter 
   */
  private async _rebuildIndexGroup(
    qualifiedName: string,
    value: IElasticIndexDefinitionType,
    sinceLimiter: number,
  ) {
    logger.info(
      "ItemizeElasticClient._rebuildIndexGroup: ensuring index validity for " + qualifiedName,
    );
    const indexInfo = await this.retrieveIndexStatusInfo(qualifiedName);

    const wildcardName = qualifiedName.toLowerCase() + "_*";
    const currentMapping = await this.retrieveCurrentSchemaDefinition(wildcardName);
    const allIndexNames = currentMapping && Object.keys(currentMapping);

    if (!indexInfo) {
      logger.info(
        "ItemizeElasticClient._rebuildIndexGroup: index group for " + qualifiedName + " status to be created",
      );

      await this.setIndexStatusInfo(
        qualifiedName,
        {
          sinceLimiter,
          lastConsisencyCheck: null,
        }
      );

      if (currentMapping) {
        logger.info(
          "ItemizeElasticClient._rebuildIndexGroup: index group for " + qualifiedName + " deemed missing, but mapping found, destructive actions taken",
        );

        const indexNames = allIndexNames.join(",");
        await this.elasticClient.indices.delete({
          index: indexNames,
        })
      }
    }

    // it has mappings this is an update operation
    if (currentMapping) {
      const firstMapping = currentMapping[allIndexNames[0]].mappings;

      const mappingAsElasticIndex = {
        properties: { ...firstMapping.properties },
        runtime: { ...firstMapping.runtime },
      };

      const compatibilityCheck = mappingsAreCompatible(mappingAsElasticIndex, value);

      // if our scripts ignored check makes it so that the index is invalid
      // then this means that the index has changed shape and all the data that we have retrieved
      // is invalid and must be re-retrieved once again
      if (!compatibilityCheck.scriptsIgnored) {
        logger.info(
          "ItemizeElasticClient._rebuildIndexGroup: index group for " + qualifiedName + " deemed incompatible, destructive actions taken",
        );
        await this.setIndexStatusInfo(
          qualifiedName,
          {
            sinceLimiter,
            lastConsisencyCheck: null,
          }
        );
        const indexNames = allIndexNames.join(",");
        await this.elasticClient.indices.delete({
          index: indexNames,
        })
      } else if (!compatibilityCheck.general) {
        logger.info(
          "ItemizeElasticClient._rebuildIndexGroup: index group for " + qualifiedName + " to be updated",
        );
        await this.elasticClient.indices.putMapping({
          index: wildcardName,
          properties: value.properties,
          runtime: value.runtime || {},
        });
      } else {
        logger.info(
          "ItemizeElasticClient._rebuildIndexGroup: index group for " + qualifiedName + " deemed compatible",
        );
      }
    } else {
      logger.info(
        "ItemizeElasticClient._rebuildIndexGroup: index group for " + qualifiedName + " deemed empty (compatible)",
      );
    }
  }

  /**
   * Builds an index from scratch if this is found not to match
   * the given schema, this function is ran automatically and you are not
   * supposed to use it
   */
  public async rebuildIndexes(
    itemDefinitionOrModule: string | ItemDefinition | Module,
  ): Promise<void> {
    await this.waitForServerData();

    const idefOrMod = typeof itemDefinitionOrModule === "string" ? this.root.registry[itemDefinitionOrModule] : itemDefinitionOrModule;

    const limiters = idefOrMod.getRequestLimiters();
    const sinceLimiter = (limiters && limiters.since) || null;
    const qualifiedName = idefOrMod.getQualifiedPathName();

    const schemaToBuild = this.rootSchema[qualifiedName];

    await this._rebuildIndexGroup(
      qualifiedName,
      schemaToBuild,
      sinceLimiter,
    );
  }

  public async ensureSimpleIndex(
    id: string,
    schema: IElasticIndexDefinitionType,
    throwError?: boolean,
  ) {
    await this.waitForServerData();

    logger.info(
      "ItemizeElasticClient.ensureSimpleIndex: ensuring index validity for " + id,
    );

    const indexName = id.toLowerCase();
    const currentMapping = await this.retrieveCurrentSchemaDefinition(indexName);

    // because it doesn't exist we can consider it not ready, this is unlike the other index type
    if (!currentMapping) {
      if (throwError) {
        throw new NotReadyError("Index for " + id + " is not ready because it is missing");
      }
      return false;
    }

    const allIndexNames = currentMapping && Object.keys(currentMapping);
    const firstMapping = currentMapping[allIndexNames[0]].mappings;

    const mappingAsElasticIndex = {
      properties: { ...firstMapping.properties },
      runtime: { ...firstMapping.runtime },
    };

    const compatibilityCheck = mappingsAreCompatible(mappingAsElasticIndex, schema);
    // we are using the general because our simple indexes do not care about scripts
    // to consider their compatibility, because they do not contain runtime prices that
    // are managed by itemize
    if (!compatibilityCheck.general && throwError) {
      throw new NotReadyError("Index for " + id + " does not have the right shape");
    }

    return compatibilityCheck.general;
  }

  public async ensureIndexes(
    itemDefinitionOrModule: string | ItemDefinition | Module,
    throwError?: boolean,
  ) {
    await this.waitForServerData();

    const idefOrMod = typeof itemDefinitionOrModule === "string" ? this.root.registry[itemDefinitionOrModule] : itemDefinitionOrModule;
    const qualifiedName = idefOrMod.getQualifiedPathName();
    const schemaToBuild = this.rootSchema[qualifiedName];

    logger.info(
      "ItemizeElasticClient.ensureIndexes: ensuring index validity for " + qualifiedName,
    );

    const indexInfo = await this.retrieveIndexStatusInfo(qualifiedName);

    if (!indexInfo) {
      logger.info(
        "ItemizeElasticClient.ensureIndexes: entire data for index " + qualifiedName + " is missing",
      );
      if (throwError) {
        throw new NotReadyError("Index for " + qualifiedName + " is not ready because the info itself is missing");
      }
      return false;
    }

    const wildcardName = qualifiedName.toLowerCase() + "_*";
    const currentMapping = await this.retrieveCurrentSchemaDefinition(wildcardName);
    const allIndexNames = currentMapping && Object.keys(currentMapping);

    // because it doesn't exist we can consider it ready
    // this is because our item indexes is stored accross many indices so having nothing to look for
    // means that the index will be created the moment it is to be used in the right language
    // and it will have the right expected shape
    if (!currentMapping) {
      logger.info(
        "ItemizeElasticClient.ensureIndexes: index for " + qualifiedName + " deemed empty (compatible)",
      );
      return true;
    }

    // otherwise we get the first mapping of such shape retrieval
    const firstMapping = currentMapping[allIndexNames[0]].mappings;

    // and now we can convert them to our internal form
    const mappingAsElasticIndex = {
      properties: { ...firstMapping.properties },
      runtime: { ...firstMapping.runtime },
    };

    // and run a compatibility check
    const compatibilityCheck = mappingsAreCompatible(mappingAsElasticIndex, schemaToBuild);
    if (!compatibilityCheck.scriptsIgnored) {
      logger.info(
        "ItemizeElasticClient.ensureIndexes: index for " + qualifiedName + " does not have the right shape",
      );
      if (throwError) {
        throw new NotReadyError("Index for " + qualifiedName + " does not have the right shape");
      }
    } else {
      logger.info(
        "ItemizeElasticClient.ensureIndexes: index for " + qualifiedName + " deemed compatible",
      );
    }

    return compatibilityCheck.scriptsIgnored;
  }

  /**
   * An alias for running a consistency check
   * 
   * this function can actually be ran from within a cluster, or extended instance
   * if it believes it is doing something that warrants that mechanism
   */
  public updateIndices() {
    return this.runConsistencyCheck();
  }

  /**
   * This is a fairly redundant function used to manually repopulate the indexes based on the last time
   * they were manually repopulated, this is a redundant function because most of the time those records
   * will be deemed to be already in the index, but sometimes they will be found to have a missing index
   * when a missing index is found because it doesn't match the signature then it will be created, modified or
   * deleted manually.
   * 
   * This function asks the master database for a record of what changed since the last time it was dormant,
   * and it will give a list of records created, records modified, and records deleted since that time
   * 
   * Then the function will requests all the documents since that transaction time, created, or modified.
   * 
   * eg. let's give an index with inconsistencies, where, document 1 is missing, it was added but somehow
   * it was missed in the index, the function will check if this document exists, and when found not to it will
   * request that to be added, an inconsistency was found.
   * 
   * document 2 was modified but it didn't match, once the last modified signature doesn't match, docuent 2 will
   * be requested to be added just like document 1, from the database
   * 
   * document 3 still is there, but it doesn't come in the result because it is old, but it's dangling somewhere
   * in the index, for that we need to find an document for the given id and version, of all the deleted documents,
   * if we find some of them, we shall delete them.
   * 
   * If any of these consistency checks fails because they can't fix the inconsistency then the last consistency check doesn't
   * change and the next consistency check will be ran against the same data
   * 
   * If a consistency check has never ran before, then it will request these records since the beggining of time (or as the since
   * limiter restricts to do) and will populate everything it finds, this basically builds the index from scratch
   * and may be expensive on first try, you may get errors
   * 
   * This function is run automatically with the elastic consistency checker that runs in the global manager in elastic mode or
   * in absolute mode, you may want to run a manual consistency check but it is unecessary check the server consistency check
   * regarding how often these consistency checks are ran regarding SERVER_ELASTIC_CLEANUP_TIME
   * 
   * Will also flush old records that do not respect the since limiter
   * 
   * Will also find duplicates in some cases that are not in the right language, as it tries to find and check against
   * all the records that match given ids on the list, if it finds two of those, one of those must be invalid
   */
  public async runConsistencyCheck() {
    // TODO
  }

  private async generateMissingIndexInGroup(
    indexName: string,
    language: string,
    value: IElasticIndexDefinitionType,
  ) {
    const analyzer = this.langAnalyzers[language || "*"] || this.langAnalyzers["*"] || "standard";
    const analyzerLow = analyzer.toLowerCase();

    logger.info(
      "ItemizeElasticClient.generateMissingIndexInGroup: index " + indexName + " to be created",
    );

    await this.elasticClient.indices.create({
      index: indexName,
      mappings: {
        properties: value.properties,
        runtime: value.runtime || {},
      },
      settings: {
        analysis: {
          analyzer: {
            default: (analyzerLow === "standard" || analyzerLow === "simple") ? {
              type: analyzerLow,
            } : {
              type: analyzerLow as any,
            }
          }
        }
      }
    });
  }

  public async deleteDocumentUnknownLanguage(
    itemDefinition: string | ItemDefinition,
    id: string,
    version: string,
  ) {
    const idef = typeof itemDefinition === "string" ? this.root.registry[itemDefinition] : itemDefinition;
    const mod = idef.getParentModule();

    if (!idef.isSearchEngineEnabled()) {
      return;
    }

    const qualifiedNameItem = idef.getQualifiedPathName();
    const qualifiedNameMod = mod.getQualifiedPathName();

    const indexNameIdef = qualifiedNameItem.toLowerCase() + "_*";
    const indexNameMod = qualifiedNameMod.toLowerCase() + "_*";

    let finalIndex: string = "";
    if (mod.isSearchEngineEnabled()) {
      finalIndex = indexNameMod;
    }
    if (idef.isSearchEngineEnabled()) {
      if (finalIndex) {
        finalIndex += ","
      }
      finalIndex += indexNameIdef;
    }

    const mergedId = id + "." + (version || "");

    // basically we will run a blanket delete
    // we are hoping to delete, 1 or 2, or whatever
    // maybe nothing, we don't care just blow everything
    // up that has the same id
    await this.elasticClient.deleteByQuery({
      index: finalIndex,
      query: {
        match: {
          _id: mergedId,
        }
      },
      allow_no_indices: true,
    });
  }

  public async deleteDocument(
    itemDefinition: string | ItemDefinition,
    language: string,
    id: string,
    version: string,
  ) {
    const idef = typeof itemDefinition === "string" ? this.root.registry[itemDefinition] : itemDefinition;
    const mod = idef.getParentModule();

    if (!idef.isSearchEngineEnabled()) {
      return;
    }

    const qualifiedNameItem = idef.getQualifiedPathName();
    const qualifiedNameMod = mod.getQualifiedPathName();

    const indexNameIdef = qualifiedNameItem.toLowerCase() + "_" + (language || "none");
    const indexNameMod = qualifiedNameMod.toLowerCase() + "_" + (language || "none");

    const givenID = id + "." + (version || "");

    if (idef.isSearchEngineEnabled()) {
      try {
        await this.elasticClient.delete({
          id: givenID,
          index: indexNameIdef,
        });
      } catch (err) {
        // if index_not_found or not_found isn't the case
        if (err.meta.statusCode !== 404) {
          logger.error(
            "ItemizeElasticClient.deleteDocument [SERIOUS]: could not delete document for " + givenID + " at " + indexNameIdef,
            {
              errStack: err.stack,
              errMessage: err.message,
            }
          );
        }
      }
    }

    if (mod.isSearchEngineEnabled()) {
      try {
        await this.elasticClient.delete({
          id: givenID,
          index: indexNameMod,
        });
      } catch (err) {
        if (err.meta.statusCode !== 404) {
          logger.error(
            "ItemizeElasticClient.deleteDocument [SERIOUS]: could not delete document for " + givenID + " at " + indexNameMod,
            {
              errStack: err.stack,
              errMessage: err.message,
            }
          );
        }
      }
    }
  }

  public async createDocumentUnknownEverything(
    itemDefinition: string | ItemDefinition,
    id: string,
    version: string,
  ) {
    const idef = (typeof itemDefinition === "string" ? this.root.registry[itemDefinition] : itemDefinition) as ItemDefinition;

    if (!idef.isSearchEngineEnabled()) {
      return;
    }

    const value = (await this.rawDB.performRawDBSelect(
      idef,
      (b) => b.selectAll().whereBuilder.andWhereColumn("id", id).andWhereColumn("version", version || "")
    ))[0] || null;

    if (value) {
      const language = idef.getSearchEngineMainLanguageFromRow(value);
      // now we are ready to call the update to the document
      // and we do just like a creation
      await this.createDocument(itemDefinition, language, id, version, value);
    }
  }

  public async updateDocumentUnknownEverything(
    itemDefinition: string | ItemDefinition,
    id: string,
    version: string,
  ) {
    const idef = (typeof itemDefinition === "string" ? this.root.registry[itemDefinition] : itemDefinition) as ItemDefinition;

    if (!idef.isSearchEngineEnabled()) {
      return;
    }

    const value = (await this.rawDB.performRawDBSelect(
      idef,
      (b) => b.selectAll().whereBuilder.andWhereColumn("id", id).andWhereColumn("version", version || "")
    ))[0] || null;

    await this.deleteDocumentUnknownLanguage(itemDefinition, id, version);

    if (value) {
      const language = idef.getSearchEngineMainLanguageFromRow(value);
      // now we are ready to call the update to the document
      // and we do just like a creation
      await this.createDocument(itemDefinition, language, id, version, value);
    }
  }

  public async updateDocumentUnknownOriginalLanguage(
    itemDefinition: string | ItemDefinition,
    language: string,
    id: string,
    version: string,
    value?: ISQLTableRowValue,
  ) {
    await this.deleteDocumentUnknownLanguage(itemDefinition, id, version);
    // now we are ready to call the update to the document
    // and we do just like a creation
    await this.createDocument(itemDefinition, language, id, version, value);
  }

  /**
   * Updates a document for a given index
   * if the index does not exist the whole operation is ingored and instead
   * a rebuild operation is launched for the given index (which should fetch everything up to date)
   */
  public async updateDocument(
    itemDefinition: string | ItemDefinition,
    originalLanguage: string,
    language: string,
    id: string,
    version: string,
    value?: ISQLTableRowValue,
  ): Promise<void> {
    const idef = (typeof itemDefinition === "string" ? this.root.registry[itemDefinition] : itemDefinition) as ItemDefinition;
    const mod = idef.getParentModule();

    if (!idef.isSearchEngineEnabled()) {
      return;
    }

    if (originalLanguage !== language) {
      await this.deleteDocument(itemDefinition, originalLanguage, id, version);
    }
    const newValue = value || ((await this.rawDB.performRawDBSelect(
      itemDefinition,
      (b) => b.selectAll().whereBuilder.andWhereColumn("id", id).andWhereColumn("version", version || "")
    ))[0] || null);

    // database did not find anything for this
    if (!newValue) {
      return;
    }

    const mergedId = id + "." + (version || "");
    if (mod.isSearchEngineEnabled()) {
      const elasticFormMod = convertSQLValueToElasticSQLValueForModule(
        this.serverData,
        mod,
        newValue,
      );
      const qualifiedNameMod = mod.getQualifiedPathName();
      const indexName = qualifiedNameMod.toLowerCase() + "_" + (language || "none");

      const updateAction = {
        id: mergedId,
        index: indexName,
        doc: elasticFormMod,
        doc_as_upsert: true,
      };

      try {
        try {
          await this.elasticClient.update(updateAction);
        } catch (err) {
          if (err.meta.statusCode === 404) {
            await this.generateMissingIndexInGroup(indexName, language, this.rootSchema[qualifiedNameMod]);
            await this.elasticClient.update(updateAction);
          } else {
            throw err;
          }
        }
      } catch (err) {
        logger.error(
          "ItemizeElasticClient.deleteDocument [SERIOUS]: could not create an elastic document for " + mergedId + " at " + indexName,
          {
            errStack: err.stack,
            errMessage: err.message,
          }
        );
      }
    }

    if (idef.isSearchEngineEnabled()) {
      const elasticFormIdef = convertSQLValueToElasticSQLValueForItemDefinition(
        this.serverData,
        idef,
        newValue,
      );

      const qualifiedNameIdef = idef.getQualifiedPathName();
      const indexName = qualifiedNameIdef.toLowerCase() + "_" + (language || "none");

      const updateAction = {
        id: mergedId,
        index: indexName,
        doc: elasticFormIdef,
        doc_as_upsert: true,
      };

      try {
        try {
          await this.elasticClient.update(updateAction);
        } catch (err) {
          if (err.meta.statusCode === 404) {
            await this.generateMissingIndexInGroup(indexName, language, this.rootSchema[qualifiedNameIdef]);
            await this.elasticClient.update(updateAction);
          } else {
            throw err;
          }
        }
      } catch (err) {
        logger.error(
          "ItemizeElasticClient.deleteDocument [SERIOUS]: could not create an elastic document for " + mergedId + " at " + indexName,
          {
            errStack: err.stack,
            errMessage: err.message,
          }
        );
      }
    }
  }

  public createDocument(
    itemDefinition: string | ItemDefinition,
    language: string,
    id: string,
    version: string,
    value?: ISQLTableRowValue,
  ) {
    // we cheat and pass the same as the original and target language
    // so that the old version is not checked for whatever it is
    return this.updateDocument(itemDefinition, language, language, id, version, value);
  }

  /**
   * Performs an elastic search
   * 
   * This is the function you use
   * 
   * @param itemDefinitionOrModule 
   * @param selecter 
   * @param language 
   * @returns 
   */
  public async performElasticSelect(
    itemDefinitionOrModule: string | ItemDefinition | Module,
    selecter: (builder: any) => void,
    language?: string,
  ): Promise<ISQLTableRowValue[]> {
    return null;
  }
}