import type { Client } from "@elastic/elasticsearch";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import Module from "../base/Root/Module";
import type { ItemizeRawDB } from "./raw-db";
import type Root from "../base/Root";
import { getElasticSchemaForRoot, IElasticIndexDefinitionType, IElasticSchemaDefinitionType, ISQLTableRowValue } from "../base/Root/sql";
import { logger } from "./logger";
import equals from "deep-equal";
import { convertSQLValueToElasticSQLValueForItemDefinition } from "../base/Root/Module/ItemDefinition/sql";
import { DELETED_REGISTRY_IDENTIFIER } from "../constants";
import { CAN_LOG_DEBUG } from "./environment";
import { NanoSecondComposedDate } from "../nanodate";
import { FieldValue, QueryDslMatchPhraseQuery, QueryDslMatchQuery, QueryDslQueryContainer, QueryDslTermQuery, QueryDslTermsQuery, SearchRequest } from "@elastic/elasticsearch/lib/api/types";

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

  let generalFalseReason: string = "";
  let scriptsIgnoredFalseReason: string = "";
  const propertiesEqual = Object.keys(expected.properties).every((p) => {
    let expectedValue = expected.properties[p];
    if (expectedValue.enabled === false && !expectedValue.type) {
      expectedValue = {
        ...expectedValue,
        type: "object",
      }
    } else if (expectedValue.type === "geo_point" && Array.isArray(expectedValue.null_value)) {
      expectedValue = {
        ...expectedValue,
        null_value: {
          lon: expectedValue.null_value[0],
          lat: expectedValue.null_value[1],
        },
      };
    }
    const serverValue = server.properties[p];

    const isEqual = equals(expectedValue, serverValue, { strict: true });

    if (!isEqual) {
      generalFalseReason = "property " + p + " is " + (!serverValue ? "missing" : "unequal");
      if (serverValue) {
        generalFalseReason += " expected: " + JSON.stringify(expectedValue) + " found: " + JSON.stringify(serverValue)
      }
      scriptsIgnoredFalseReason = generalFalseReason;
    }

    return isEqual;
  });

  // if they are not equal, then we can assume none of them are
  if (!propertiesEqual) {
    return {
      general: false,
      scriptsIgnored: false,
      generalFalseReason,
      scriptsIgnoredFalseReason,
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
        scriptsIgnoredFalseReason = "runtime property " + p + " is " + (!serverValue ? "missing" : "unequal") + " with scripts ignored";
        if (serverValue) {
          scriptsIgnoredFalseReason += "; expected: " + JSON.stringify(expectedValue) + " found: " + JSON.stringify(serverValue)
        }
        scriptsIgnored = false;
      }

      if (!isEqualGeneral) {
        generalFalseReason = "runtime property " + p + " is " + (!serverValue ? "missing" : "unequal");
        if (serverValue) {
          generalFalseReason += "; expected: " + JSON.stringify(expectedValue) + " found: " + JSON.stringify(serverValue)
        }
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
    generalFalseReason,
    scriptsIgnoredFalseReason,
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

  private currentlyEnsuringIndexInGroup: { [n: string]: Promise<boolean> } = {};

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

    let wasPrepared: boolean = false;

    // now we can try to prepare it until it succeeds
    while (true) {
      try {
        if (!wasPrepared) {
          await this._prepareInstance();
          wasPrepared = true;
        }
        await this.runConsistencyCheck();
        this.lastFailedWaitMultiplied = 0;
        break;
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
      }
    }

    // now we can resolve the promise
    this.prepareInstancePromiseResolve();
    this.prepareInstancePromiseResolve = null;
    this.prepareInstancePromise = null;
  }

  private async _rebuildAllIndexes(): Promise<string[]> {
    // now we can begin qeuing the indexes that we want created
    const listOfAll: string[] = [];

    // first we await for all the modules that we have in root
    await Promise.all(this.root.getAllModules().map(async (rootMod) => {
      // and now we get all the child item definitions inside that mod
      return await Promise.all(
        rootMod.getAllChildDefinitionsRecursive().map(async (cIdef) => {
          // add that t the list of all
          listOfAll.push(cIdef.getQualifiedPathName());
          // and if the item itself is search engine enabled
          if (cIdef.isSearchEngineEnabled()) {
            await this.rebuildIndexes(cIdef);
          }
        })
      );
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
    if (this.prepareInstancePromise) {
      await this.prepareInstancePromise;
      logger.info(
        "ItemizeElasticClient.confirmInstanceReadiness: instance was launched with preparation and confirmation at once, waiting for preparation",
      );
    } else {
      logger.info(
        "ItemizeElasticClient.confirmInstanceReadiness: instance was launched withoout known preparation, confirming immediately",
      );
    }

    while (true) {
      try {
        await this._confirmInstanceReadiness();
        this.lastFailedWaitMultiplied = 0;
        break;
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
      }
    }

    logger.info(
      "ItemizeElasticClient.confirmInstanceReadiness: confirmation has been successful, ending block",
    );
  }

  /**
   * @ignore
   * The actual function called to confirm that is ready
   * it returns an error if it fails somehow, aka, not ready
   */
  private async _confirmInstanceReadiness(): Promise<void> {
    logger.info(
      "ItemizeElasticClient._confirmInstanceReadiness: now confirming",
    );

    // this is similar to the prepare function but we do not update
    // anything, just ensure that everything is compatible
    const listOfAll: string[] = [];

    // now we can do the same and loop on these
    await Promise.all(this.root.getAllModules().map(async (rootMod) => {
      // add to the child item definitions checkup
      return await Promise.all(
        rootMod.getAllChildDefinitionsRecursive().map(async (cIdef) => {
          listOfAll.push(cIdef.getQualifiedPathName());
          // ensure the item
          if (cIdef.isSearchEngineEnabled()) {
            await this.ensureIndexes(cIdef, true);
          }
        })
      );
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
      const compCheck = mappingsAreCompatible(
        {
          properties: { ...mappings.properties },
          runtime: { ...mappings.runtime },
        },
        value,
      );
      const isCompatible = compCheck.general;
      if (!isCompatible) {
        logger.info(
          "ItemizeElasticClient.createOrUpdateSimpleIndex: index for " + id + " to be updated: " + compCheck.generalFalseReason,
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

  /**
   * This function is used to internally rebuild an index
   * @param qualifiedName 
   * @param value
   */
  private async _rebuildIndexGroup(
    qualifiedName: string,
    value: IElasticIndexDefinitionType,
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
        });
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
          "ItemizeElasticClient._rebuildIndexGroup: index group for " +
          qualifiedName +
          " deemed incompatible, destructive actions taken: " +
          compatibilityCheck.scriptsIgnoredFalseReason,
        );
        await this.setIndexStatusInfo(
          qualifiedName,
          {
            lastConsisencyCheck: null,
          }
        );
        const indexNames = allIndexNames.join(",");
        await this.elasticClient.indices.delete({
          index: indexNames,
        })
      } else if (!compatibilityCheck.general) {
        logger.info(
          "ItemizeElasticClient._rebuildIndexGroup: index group for " +
          qualifiedName +
          " to be updated: " +
          compatibilityCheck.generalFalseReason,
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

    if (idefOrMod instanceof Module) {
      await Promise.all(idefOrMod.getAllChildDefinitionsRecursive().map((v) => this.rebuildIndexes(v)));
      return;
    }

    const qualifiedName = idefOrMod.getQualifiedPathName();

    const schemaToBuild = this.rootSchema[qualifiedName];

    await this._rebuildIndexGroup(
      qualifiedName,
      schemaToBuild,
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
      throw new NotReadyError("Index for " + id + " does not have the right shape: " + compatibilityCheck.generalFalseReason);
    }

    return compatibilityCheck.general;
  }

  public async ensureIndexes(
    itemDefinitionOrModule: string | ItemDefinition | Module,
    throwError?: boolean,
  ): Promise<boolean> {
    await this.waitForServerData();

    const idefOrMod = typeof itemDefinitionOrModule === "string" ? this.root.registry[itemDefinitionOrModule] : itemDefinitionOrModule;

    if (idefOrMod instanceof Module) {
      return (await Promise.all(idefOrMod.getAllChildDefinitionsRecursive().map((v) => this.ensureIndexes(v, throwError)))).every((v) => v);
    }

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
      const infoMsg = (
        "ItemizeElasticClient.ensureIndexes: index for " +
        qualifiedName +
        " does not have the right shape: " +
        compatibilityCheck.scriptsIgnoredFalseReason
      );
      logger.info(infoMsg);
      if (throwError) {
        throw new NotReadyError(infoMsg);
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
  public updateIndices(onElement?: Module | ItemDefinition | string) {
    return this.runConsistencyCheck(onElement);
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
  public async runConsistencyCheck(
    onElement?: Module | ItemDefinition | string,
  ) {
    const actualOnElement = typeof onElement === "string" ? this.root.registry[onElement] : onElement;

    if (!actualOnElement) {
      for (const rootMod of this.root.getAllModules()) {
        await this.runConsistencyCheck(rootMod);
      }
    } else if (actualOnElement instanceof Module) {
      for (const item of actualOnElement.getAllChildDefinitionsRecursive()) {
        await this.runConsistencyCheck(item);
      }
    } else if (actualOnElement instanceof ItemDefinition) {
      await this._runConsistencyCheck(actualOnElement, new Date(), 0, null, {});
    }
  }

  private async _runConsistencyCheck(
    idef: ItemDefinition,
    timeRan: Date,
    batchNumber: number,
    knownStatusInfo: IElasticIndexInformationType,
    ensuranceCache: any,
  ) {
    const parentModule = idef.getParentModule();
    const parentModuleEnabled = parentModule.isSearchEngineEnabled();

    const selfEnabled = idef.isSearchEngineEnabled();

    if (!selfEnabled) {
      return;
    }

    const qualifiedPathName = idef.getQualifiedPathName();
    CAN_LOG_DEBUG && logger.debug(
      "ItemizeElasticClient._runConsistencyCheck: index for " + qualifiedPathName + " to be checked for",
      {
        batchNumber,
        timeRan,
      }
    );

    let statusInfo = knownStatusInfo || await this.retrieveIndexStatusInfo(qualifiedPathName);
    if (!statusInfo) {
      await this._rebuildIndexGroup(
        qualifiedPathName,
        this.rootSchema[qualifiedPathName],
      );
      statusInfo = {
        lastConsisencyCheck: null,
      }
    }

    const baseIndexPrefix = qualifiedPathName.toLowerCase() + "_";
    const wildcardIndexName = baseIndexPrefix + "*";

    const limitersModule = parentModuleEnabled && parentModule.getRequestLimiters();
    const limitersSelf = selfEnabled && idef.getRequestLimiters();

    const sinceModule = (limitersModule && limitersModule.condition === "AND" && limitersModule.since) || null;
    const sinceSelf = (limitersSelf && limitersModule.condition === "AND" && limitersSelf.since) || null;

    let maximumLimiter: number = null;
    if (parentModuleEnabled && !selfEnabled) {
      maximumLimiter = sinceModule;
    } else if (selfEnabled && !parentModuleEnabled) {
      maximumLimiter = sinceSelf;
      // if one of them is null it means no limit
    } else if (sinceModule !== null && sinceSelf !== null) {
      maximumLimiter = sinceSelf > sinceModule ? sinceSelf : sinceModule;
    }

    let minimumCreatedAt: string = null;
    if (maximumLimiter) {
      // cannot retrieve anything before this date, we do not need any older records
      const minimumCreatedAtAsDate = new Date(timeRan.getTime() - maximumLimiter);
      minimumCreatedAt = minimumCreatedAtAsDate.toISOString();

      if (batchNumber === 0) {
        CAN_LOG_DEBUG && logger.debug(
          "ItemizeElasticClient._runConsistencyCheck: removing all documents for " + qualifiedPathName + " older than " + minimumCreatedAt,
        );

        await this.elasticClient.deleteByQuery({
          index: wildcardIndexName,
          query: {
            range: {
              created_at: {
                lt: minimumCreatedAt,
              }
            }
          },
          allow_no_indices: true,
        });
      }
    } else if (CAN_LOG_DEBUG && batchNumber === 0) {
      logger.debug(
        "ItemizeElasticClient._runConsistencyCheck: " + qualifiedPathName + " does not have any since limiter",
      );
    }

    if (batchNumber === 0) {
      // let's first destroy all the documents that should be deleted
      // and not exist if they happen to do so
      const documentsDeletedSinceLastRan = await this.rawDB.databaseConnection.queryRows(
        `SELECT "id", "version" FROM ${JSON.stringify(DELETED_REGISTRY_IDENTIFIER)} ` +
        `WHERE "type" = ?` + (
          statusInfo.lastConsisencyCheck ? `AND "transaction_time" >= ?` : ""
        ),
        [
          qualifiedPathName,
          statusInfo.lastConsisencyCheck,
        ].filter((v) => !!v),
        true,
      );

      if (documentsDeletedSinceLastRan.length) {
        CAN_LOG_DEBUG && logger.debug(
          "ItemizeElasticClient._runConsistencyCheck: removing all documents found (they most likely already have been deleted) for " + qualifiedPathName,
          {
            documentsDeletedSinceLastRan,
          }
        );
        await this.deleteDocumentsUnknownLanguage(
          idef,
          documentsDeletedSinceLastRan,
        );
      } else if (CAN_LOG_DEBUG) {
        logger.debug(
          "ItemizeElasticClient.runConsistencyCheck: did not recieve any documents to delete for " + qualifiedPathName,
        );
      }
    }

    const expectedLanguageColumn = idef.getSearchEngineDynamicMainLanguageColumn();

    // no last consistency check then we gotta retrieve the whole thing because
    // we want whole data this one round
    const useModuleOnly = statusInfo.lastConsisencyCheck === null ? false : (
      // otherwise it depends if we got a language column, it will depend on wether such column
      // is in the module, otherwise we can be free to use module only
      expectedLanguageColumn ? idef.isSearchEngineDynamicMainLanguageColumnInModule() : true
    );

    // now we can do the select
    const limit = statusInfo.lastConsisencyCheck === null ? 100 : 1000;
    const offset = batchNumber * limit;
    const documentsCreatedOrModifiedSinceLastRan = await this.rawDB.performRawDBSelect(
      useModuleOnly ? idef.getParentModule() : idef,
      (selecter) => {
        // if our last consistency check is null, this means that we had never ran
        // consistency before, we will likely have missing data that we need to fill voids for
        // so we rather do just that and select everything rather than expecting
        // holes not to be common
        if (statusInfo.lastConsisencyCheck === null) {
          // this is why we were using whole 2 tables
          selecter.selectAll();
        } else {
          if (expectedLanguageColumn) {
            // otherwise we assume our data isn't corrupted, and just select what
            // we need making a minimal query
            selecter.select("id", "version", "last_modified", expectedLanguageColumn);
          } else {
            selecter.select("id", "version", "last_modified");
          }
        }

        // now we can decide what we select for
        // maybe it is everything, kind of scary
        const whereBuilder = selecter.whereBuilder;
        if (minimumCreatedAt) {
          whereBuilder.andWhereColumn("created_at", ">=", minimumCreatedAt);
        }
        if (statusInfo.lastConsisencyCheck) {
          whereBuilder.andWhereColumn("last_modified", ">", statusInfo.lastConsisencyCheck);
        }

        // ensure consistency, because we are pulling in batches we want to ensure we are not checking
        // stuff that has been suddenly added while we are pulling these batches, but only pull what
        // hasn't been pulled before, so we use the time we have ran this consistency check at not to pull
        // anything newer than that
        whereBuilder.andWhereColumn("created_at", "<=", timeRan.toISOString());

        selecter.limit(limit).offset(offset);
        selecter.orderByBuilder.orderByColumn("created_at", "ASC", "FIRST");
      }
    );
    const hasNextBatch = documentsCreatedOrModifiedSinceLastRan.length === limit;

    // cheap interface here
    /**
     * @ignore
     */
    interface IComparativeResult {
      [mergedId: string]: {
        r: {
          id: string,
          version: string,
          last_modified: string,
          [others: string]: any,
        },
        language: string,
        lastModified: NanoSecondComposedDate,
      }
    };

    // now if we got some documents from there
    // in our SQL information
    if (documentsCreatedOrModifiedSinceLastRan.length) {
      // we can now build this helper object
      const resultObj: IComparativeResult = {};
      documentsCreatedOrModifiedSinceLastRan.forEach((r) => {
        const mergedId = r.id + "." + (r.version || "");
        resultObj[mergedId] = {
          r: r as any,
          language: idef.getSearchEngineMainLanguageFromRow(r),
          lastModified: new NanoSecondComposedDate(r.last_modified),
        }
      });

      // and now the array of ids we got from there
      // these are merged ids that will match those in elastic
      const arrayOfIds = Object.keys(resultObj);

      // now we get from all our wildcard indexes
      const comparativeResults = await this.elasticClient.search({
        index: wildcardIndexName,
        query: {
          terms: {
            _id: arrayOfIds,
          }
        },
        fields: [
          "last_modified",
        ],
        _source: false,
        allow_no_indices: true,
      });

      const baseIndexPrefixLen = baseIndexPrefix.length;
      const missingFromResults = arrayOfIds.filter((id) => {
        return !comparativeResults.hits.hits.some((hit) => hit._id === id);
      });
      const notMissingButOutdated: string[] = [];

      let bulkOperations: any[][] = [];
      let bulkOperationCurrentIndex: number = 0;
      let bulkOperationCurrentIndexSize: number = 0;
      const bulkOperationMaxSize = 20;

      // we must ensure indexes but we are very lazy and want to avoid ensuring
      // whatever already exists because it is pointless, we will be doing so shortly
      // so let's populate the cache for ensurance checking later (if we do)
      // the ensuranceCache does that

      // now we loop over our results
      comparativeResults.hits.hits.forEach((hit) => {
        const objectInfo = resultObj[hit._id];
        const language = hit._index.substring(baseIndexPrefixLen);
        const lasModifiedStr = hit.fields.last_modified[0];

        if (!lasModifiedStr) {
          // this is rather corrupted
          throw new Error(
            "Missing last modified date in corrupt record " + hit._id + " at " + hit._index
          );
        }

        const lastModified = new NanoSecondComposedDate(lasModifiedStr);

        // this will delete duplicated values simply because one of them will
        // be in the wrong language by default because they don't occupy the same index
        // so the language will differ, if both of them are invalid they will also go away
        // for different reasons
        const isInTheWrongLanguage = objectInfo.language !== language;
        const isOutdated = objectInfo.lastModified.notEqual(lastModified);

        // we basically have confirmed these index exist
        // so we don't have to later
        // we are lazy and efficient
        // check the function later for ensurance and this basically
        // makes it more efficient
        ensuranceCache[hit._index] = true;

        // so if it's in the wrong language
        if (isInTheWrongLanguage) {
          // it goes away by the bulk operations
          if (!bulkOperations[bulkOperationCurrentIndex]) {
            bulkOperations[bulkOperationCurrentIndex] = [];
            bulkOperationCurrentIndexSize = 0;
          }
          bulkOperations[bulkOperationCurrentIndex].push({
            delete: {
              _index: hit._index,
              _id: hit._id,
            }
          });
          bulkOperationCurrentIndexSize++;
          if (bulkOperationCurrentIndexSize >= bulkOperationMaxSize) {
            bulkOperationCurrentIndex++;
          }

          CAN_LOG_DEBUG && logger.debug(
            "ItemizeElasticClient.runConsistencyCheck: operation for " + qualifiedPathName + " has been added (wrong language)",
            {
              operation: "delete",
              index: hit._index,
              id: hit._id,
            }
          );

        } else if (isOutdated) {
          // if it's outdated then we add it to this list
          // where the value will be fetched
          notMissingButOutdated.push(hit._id);
        }
      });

      // if we have any of these mising or missing but outdated
      if (missingFromResults.length + notMissingButOutdated.length) {
        // we are going to loop over both
        const operations = (await Promise.all(missingFromResults.concat(notMissingButOutdated).map(async (id) => {
          // let's get the info we got from our database
          const objectInfo = resultObj[id];
          // and now let's get the value for this row, if the last consistency check is null
          // this means that is cheekily stored in the object info already because
          // we did a strong select with everything
          const knownValue = statusInfo.lastConsisencyCheck === null ? objectInfo.r : (
            await
              this.rawDB.performRawDBSelect(
                idef,
                (s) =>
                  s.selectAll().whereBuilder
                    .andWhereColumn("id", objectInfo.r.id).andWhereColumn("version", objectInfo.r.version || "")
              )
          )[0];

          // we lost the value while doing our operation
          // an edge case scenario, that now implies the value has been deleted
          // during this time, hence we don't do anything, the next check
          // will take care of that
          if (!knownValue) {
            return null;
          }

          const convertedSQL = convertSQLValueToElasticSQLValueForItemDefinition(
            this.serverData,
            idef,
            knownValue,
          );

          const isOutdated = notMissingButOutdated.includes(id);

          const indexItWillBelongTo = baseIndexPrefix + (objectInfo.language || "none");

          // if it's missing then we gotta be sure the index where it will be added
          // is there, just in case
          if (!isOutdated) {
            // if this doesn't find that our index exists
            // then it will create it for our later operations
            await this.ensureIndexInGroup(
              indexItWillBelongTo,
              objectInfo.language,
              this.rootSchema[qualifiedPathName],
              // here we are passing our ensurance cache
              // it will be modified by this function so we don't
              // double ask elastic for the same
              ensuranceCache,
            );
          }

          CAN_LOG_DEBUG && logger.debug(
            "ItemizeElasticClient.runConsistencyCheck: operation for " + qualifiedPathName + " has been added",
            {
              operation: isOutdated ? "update" : "create",
              index: indexItWillBelongTo,
              id,
            }
          );

          return [
            {
              [isOutdated ? "update" : "create"]: {
                _index: indexItWillBelongTo,
                _id: id,
              }
            },
            convertedSQL,
          ]
        }))) as any[][];

        operations.forEach((oGroup) => {
          // edge case operation
          if (oGroup === null) {
            return;
          }

          if (!bulkOperations[bulkOperationCurrentIndex]) {
            bulkOperations[bulkOperationCurrentIndex] = [];
            bulkOperationCurrentIndexSize = 0;
          }
          bulkOperations[bulkOperationCurrentIndex].push(oGroup[0], oGroup[1]);
          bulkOperationCurrentIndexSize++;
          if (bulkOperationCurrentIndexSize >= bulkOperationMaxSize) {
            bulkOperationCurrentIndex++;
          }
        });
      } else if (CAN_LOG_DEBUG) {
        logger.debug(
          "ItemizeElasticClient.runConsistencyCheck: did not recieve any new documents (that are missing or outdated in elastic) for " + qualifiedPathName,
        );
      }

      if (bulkOperations.length) {
        CAN_LOG_DEBUG && logger.debug(
          "ItemizeElasticClient.runConsistencyCheck: " +
          bulkOperations.length +
          " bulk operations have been created for batch " +
          (batchNumber + 1) +
          " of " +
          qualifiedPathName,
        );
        // we are done
        try {
          // the operation chunk size is 20 fixes at once, this is smaller than the selection
          // but we are not sure how big our http requests can get, we will now split
          // as some of these elastic servers can really take very tiny payloads
          // this will ensure a rather constant stream of data
          await Promise.all(bulkOperations.map(async (bulkOp, index) => {
            CAN_LOG_DEBUG && logger.debug(
              "ItemizeElasticClient.runConsistencyCheck: executing bulk number " +
              (index + 1) +
              "/" +
              bulkOperations.length +
              " for batch " +
              (batchNumber + 1) +
              " of " +
              qualifiedPathName,
            );

            const operations = await this.elasticClient.bulk({
              operations: bulkOp,
            });

            // bulk fails silently but we must not accept this because this means
            // invalid consistency and we must ensure consistency
            if (operations.errors) {
              operations.items.forEach((o) => {
                const error = (o.create && o.create.error) ||
                  (o.update && o.update.error && o.update.error) ||
                  (o.delete && o.delete.error && o.delete.status !== 404 && o.delete.error);

                // ignoring race conditions where for some incredible reason of the gods
                // somehow the record got deleted, say by another instance
                // while we are trying to apply consistency, this is incredibly unlikely
                // but who knows, we ignore those cases

                // as for update, we can't be sure why the document dissapeared
                if (error) {
                  throw new Error(
                    JSON.stringify(error),
                  );
                }
              });
            }
          }));
        } catch (err) {
          logger.error(
            "ItemizeElasticClient.runConsistencyCheck [SERIOUS]: bulk operations failed for " + qualifiedPathName,
            {
              errMessage: err.message,
              errStack: err.stack,
            }
          );
          throw err;
        }
      } else if (CAN_LOG_DEBUG) {
        logger.debug(
          "ItemizeElasticClient.runConsistencyCheck: did not recieve any bulk operations for " + qualifiedPathName,
        );
      }
    }

    // if we have another batch then we should consume such batch
    if (hasNextBatch) {
      await this._runConsistencyCheck(
        idef,
        timeRan,
        batchNumber + 1,
        statusInfo,
        ensuranceCache,
      );
    }

    // we can update our timestamp if we are the initial and not some batch
    if (batchNumber === 0) {
      await this.setIndexStatusInfo(
        qualifiedPathName,
        {
          lastConsisencyCheck: timeRan.toISOString(),
        }
      );
    }
  }

  private async ensureIndexInGroup(
    indexName: string,
    language: string,
    value: IElasticIndexDefinitionType,
    cache?: any,
  ) {
    if (cache && cache[indexName]) {
      return cache[indexName];
    }

    if (this.currentlyEnsuringIndexInGroup[indexName]) {
      return await this.currentlyEnsuringIndexInGroup[indexName];
    }

    this.currentlyEnsuringIndexInGroup[indexName] = new Promise(async (resolve, reject) => {
      try {
        const doesExist = await this.elasticClient.indices.exists({
          index: indexName,
          allow_no_indices: false,
        });

        if (!doesExist) {
          await this.generateMissingIndexInGroup(indexName, language, value);
        }
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });

    await this.currentlyEnsuringIndexInGroup[indexName];

    if (cache) {
      cache[indexName] = true;
    }
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

  public async deleteDocumentsUnknownLanguage(
    itemDefinition: string | ItemDefinition,
    ids: Array<{
      id: string;
      version: string;
    }>
  ) {
    const idef = typeof itemDefinition === "string" ? this.root.registry[itemDefinition] : itemDefinition;

    if (!idef.isSearchEngineEnabled()) {
      return;
    }

    const qualifiedNameItem = idef.getQualifiedPathName();
    const indexNameIdef = qualifiedNameItem.toLowerCase() + "_*";
    const mergedIds = ids.map((r) => r.id + "." + (r.version || ""));

    // basically we will run a blanket delete
    // we are hoping to delete, 1 or 2, or whatever
    // maybe nothing, we don't care just blow everything
    // up that has the same id
    await this.elasticClient.deleteByQuery({
      index: indexNameIdef,
      query: {
        terms: {
          _id: mergedIds,
        }
      },
      allow_no_indices: true,
    });
  }

  public async deleteDocumentUnknownLanguage(
    itemDefinition: string | ItemDefinition,
    id: string,
    version: string,
  ) {
    this.deleteDocumentsUnknownLanguage(
      itemDefinition,
      [
        {
          id,
          version,
        }
      ]
    );
  }

  public async deleteDocument(
    itemDefinition: string | ItemDefinition,
    language: string,
    id: string,
    version: string,
  ) {
    const idef = typeof itemDefinition === "string" ? this.root.registry[itemDefinition] : itemDefinition;

    if (!idef.isSearchEngineEnabled()) {
      return;
    }

    const qualifiedNameItem = idef.getQualifiedPathName();
    const indexNameIdef = qualifiedNameItem.toLowerCase() + "_" + (language || "none");
    const givenID = id + "." + (version || "");

    CAN_LOG_DEBUG && logger.debug(
      "ItemizeElasticClient.deleteDocument: document for " + qualifiedNameItem + " to be deleted",
      {
        id,
        version,
        language,
      }
    );

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

    if (!idef.isSearchEngineEnabled()) {
      return;
    }

    CAN_LOG_DEBUG && logger.debug(
      "ItemizeElasticClient.updateDocument: document for " + idef.getQualifiedPathName() + " to be updated with new data",
      {
        id,
        version,
        language,
        originalLanguage,
      }
    );

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
          // relying on an error makes it more effective, because this will only truly occur once
          // if the index is missing it will crash and be added here then do it again
          // otherwise we would always check for this index existance which is 2 requests all the time
          // hence worse, this 3 request process is more expensive, but only occurs once
          await this.generateMissingIndexInGroup(indexName, language, this.rootSchema[qualifiedNameIdef]);
          await this.elasticClient.update(updateAction);
        } else {
          // some other weird error
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
    selecter: (builder: ElasticQueryBuilder) => void,
    language?: string,
  ) {
    const builder = this.getSelectBuilder(itemDefinitionOrModule, language);
    selecter(builder);
    return await this.executeQuery(builder);
  }

  public getSelectBuilder(
    itemDefinitionOrModule: string | ItemDefinition | Module,
    language?: string,
    types?: (string | ItemDefinition)[],
  ) {
    const idefOrMod = typeof itemDefinitionOrModule === "string" ? this.root.registry[itemDefinitionOrModule] : itemDefinitionOrModule;
    let indexToUse: string;
    if (types && idefOrMod instanceof Module) {
      // these types should have been checked by the search function already
      // and so we can assume they are safe
      indexToUse = types.map((t) => {
        const v = typeof t === "string" ? this.root.registry[t] as ItemDefinition : t;
        if (!v.isSearchEngineEnabled()) {
          return null;
        }
        return v.getQualifiedPathName().toLowerCase() + "_" + (language || "*");
      }).filter((v) => v).join(",");
    } else if (idefOrMod instanceof ItemDefinition) {
      indexToUse = idefOrMod.getQualifiedPathName().toLowerCase() + "_" + (language || "*");
    } else if (language) {
      indexToUse = idefOrMod.getQualifiedPathName().toLowerCase() + "_*_" + language;
    } else {
      indexToUse = idefOrMod.getQualifiedPathName().toLowerCase() + "_*";
    }

    const builder = new ElasticQueryBuilder({
      index: indexToUse,
    });

    return builder;
  }

  public async executeQuery(elasticQuery: ElasticQueryBuilder) {
    const request = elasticQuery.getRequest();
    if (process.env.NODE_ENV === "development") {
      console.log(JSON.stringify(request, null, 2));
    }
    const response = await this.elasticClient.search<ISQLTableRowValue>(request);
    return response;
  }

  public async executeCountQuery(elasticQuery: ElasticQueryBuilder) {
    const request = elasticQuery.getRequest();
    if (process.env.NODE_ENV === "development") {
      console.log(JSON.stringify(request, null, 2));
    }
    const response = await this.elasticClient.count(request);
    return response;
  }
}

type SubBuilderFn = (sb: ElasticQueryBuilder) => void;

export class ElasticQueryBuilder {
  private request: SearchRequest;
  private children: Array<
    {
      type: string;
      builder: ElasticQueryBuilder;
    }
  > = [];

  constructor(request: SearchRequest) {
    this.request = request;
    if (!this.request.query) {
      this.request.query = {};
    }
  }

  public getRequest() {
    if (!this.children.length) {
      return this.request;
    }

    const resultRequest = {
      ...this.request,
      query: {
        ...this.request.query,
      }
    };

    if (!resultRequest.query.bool) {
      resultRequest.query.bool = {};
    }

    this.children.forEach((c) => {
      const cRequest = c.builder.getRequest();

      if (cRequest.query) {
        if (!resultRequest.query.bool[c.type]) {
          resultRequest.query.bool[c.type] = [];
        }
        resultRequest.query.bool[c.type].push(cRequest.query);
      }
    });

    return resultRequest;
  }

  private _q(q: QueryDslQueryContainer | SubBuilderFn, boost: number, r: string) {
    if (typeof q === "function") {
      const child = new ElasticQueryBuilder({});
      this.children.push({
        builder: child,
        type: r,
      });
      return;
    }

    if (!this.request.query.bool) {
      this.request.query.bool = {};
    }
    if (!this.request.query.bool.must) {
      this.request.query.bool[r] = [];
    }

    let queryToUse = q;
    if (typeof boost === "number") {
      queryToUse = {
        bool: {
          must: q,
          boost,
        }
      }
    }

    (this.request.query.bool[r] as QueryDslQueryContainer[]).push(queryToUse);
  }

  public must(q: QueryDslQueryContainer | SubBuilderFn, boost?: number) {
    this._q(q, boost, "must");
  }

  public mustNot(q: QueryDslQueryContainer | SubBuilderFn, boost?: number) {
    this._q(q, boost, "must_not");
  }

  public should(q: QueryDslQueryContainer | SubBuilderFn, boost?: number) {
    this._q(q, boost, "should");
  }

  public shouldNot(q: QueryDslQueryContainer | SubBuilderFn, boost?: number) {
    this._q(q, boost, "should_not");
  }

  public mustTerm(termRule: Partial<Record<string, QueryDslTermQuery | FieldValue>>, boost?: number) {
    const query: QueryDslQueryContainer = {
      term: termRule,
    };

    this.must(query, boost);
  }

  public mustNotTerm(termRule: Partial<Record<string, QueryDslTermQuery | FieldValue>>, boost?: number) {
    const query: QueryDslQueryContainer = {
      term: termRule,
    };
    this.mustNot(query, boost);
  }

  public mustTerms(termsRule: QueryDslTermsQuery, boost?: number) {
    const query: QueryDslQueryContainer = {
      terms: termsRule,
    };
    this.must(query, boost);
  }

  public mustNotTerms(termsRule: QueryDslTermsQuery, boost?: number) {
    const query: QueryDslQueryContainer = {
      terms: termsRule,
    };
    this.mustNot(query, boost);
  }

  public mustMatch(matchRule: Partial<Record<string, string | number | boolean | QueryDslMatchQuery>>, boost?: number) {
    const query: QueryDslQueryContainer = {
      match: matchRule,
    };
    this.must(query, boost);
  }

  public mustNotMatch(matchRule: Partial<Record<string, string | number | boolean | QueryDslMatchQuery>>, boost?: number) {
    const query: QueryDslQueryContainer = {
      match: matchRule,
    };
    this.mustNot(query, boost);
  }

  public mustMatchPhrase(matchRule: Partial<Record<string, string | QueryDslMatchPhraseQuery>>, boost?: number) {
    const query: QueryDslQueryContainer = {
      match_phrase: matchRule,
    };
    this.must(query, boost);
  }

  public mustNotMatchPhrase(matchRule: Partial<Record<string, string | QueryDslMatchPhraseQuery>>, boost?: number) {
    const query: QueryDslQueryContainer = {
      match_phrase: matchRule,
    };
    this.mustNot(query, boost);
  }

  public mustMatchPhrasePrefix(matchRule: Partial<Record<string, string | QueryDslMatchPhraseQuery>>, boost?: number) {
    const query: QueryDslQueryContainer = {
      match_phrase_prefix: matchRule,
    };
    this.must(query, boost);
  }

  public mustNotMatchPhrasePrefix(matchRule: Partial<Record<string, string | QueryDslMatchPhraseQuery>>, boost?: number) {
    const query: QueryDslQueryContainer = {
      match_phrase_prefix: matchRule,
    };
    this.mustNot(query, boost);
  }

  public shouldTerm(termRule: Partial<Record<string, QueryDslTermQuery | FieldValue>>, boost?: number) {
    const query: QueryDslQueryContainer = {
      term: termRule,
    };

    this.should(query, boost);
  }

  public shouldNotTerm(termRule: Partial<Record<string, QueryDslTermQuery | FieldValue>>, boost?: number) {
    const query: QueryDslQueryContainer = {
      term: termRule,
    };
    this.shouldNot(query, boost);
  }

  public shouldTerms(termsRule: QueryDslTermsQuery, boost?: number) {
    const query: QueryDslQueryContainer = {
      terms: termsRule,
    };
    this.should(query, boost);
  }

  public shouldNotTerms(termsRule: QueryDslTermsQuery, boost?: number) {
    const query: QueryDslQueryContainer = {
      terms: termsRule,
    };
    this.shouldNot(query, boost);
  }

  public shouldMatch(matchRule: Partial<Record<string, string | number | boolean | QueryDslMatchQuery>>, boost?: number) {
    const query: QueryDslQueryContainer = {
      match: matchRule,
    };
    this.should(query, boost);
  }

  public shouldNotMatch(matchRule: Partial<Record<string, string | number | boolean | QueryDslMatchQuery>>, boost?: number) {
    const query: QueryDslQueryContainer = {
      match: matchRule,
    };
    this.shouldNot(query, boost);
  }

  public shouldMatchPhrase(matchRule: Partial<Record<string, string | QueryDslMatchPhraseQuery>>, boost?: number) {
    const query: QueryDslQueryContainer = {
      match_phrase: matchRule,
    };
    this.should(query, boost);
  }

  public shouldNotMatchPhrase(matchRule: Partial<Record<string, string | QueryDslMatchPhraseQuery>>, boost?: number) {
    const query: QueryDslQueryContainer = {
      match_phrase: matchRule,
    };
    this.shouldNot(query, boost);
  }

  public shouldMatchPhrasePrefix(matchRule: Partial<Record<string, string | QueryDslMatchPhraseQuery>>, boost?: number) {
    const query: QueryDslQueryContainer = {
      match_phrase_prefix: matchRule,
    };
    this.should(query, boost);
  }

  public shouldNotMatchPhrasePrefix(matchRule: Partial<Record<string, string | QueryDslMatchPhraseQuery>>, boost?: number) {
    const query: QueryDslQueryContainer = {
      match_phrase_prefix: matchRule,
    };
    this.shouldNot(query, boost);
  }

  public setSourceIncludes(list: string[]) {
    this.request._source = list;
  }

  public sortBy(v: any) {
    this.request.sort = v;
  }

  public setSize(size: number) {
    this.request.size = size;
  }
}