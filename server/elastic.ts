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
import { CAN_LOG_DEBUG, ELASTIC_EXECUTE_CONSISTENCY_CHECKS_FROM_SCRATCH_AT, EMULATE_ELASTIC_SYNC_FAILURE_AT, EMULATE_SILENT_ELASTIC_SYNC_FAILURE_AT, FORCE_ELASTIC_REBUILD, GLOBAL_MANAGER_MODE, INSTANCE_MODE, INSTANCE_UUID } from "./environment";
import { NanoSecondComposedDate } from "../nanodate";
import { AggregationsAggregationContainer, FieldValue, GetResponse, QueryDslMatchPhraseQuery, QueryDslMatchQuery, QueryDslQueryContainer, QueryDslTermQuery, QueryDslTermsQuery, SearchHit, SearchRequest, SearchResponse, UpdateRequest } from "@elastic/elasticsearch/lib/api/types";
import { setInterval } from "timers";
import type { IElasticHighlightReply } from "../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { ISearchLimitersType } from "../base/Root";
import type { SelectBuilder } from "../database/SelectBuilder";

interface ElasticRequestOptions {
  ignoreAllInGroup?: boolean | string | string[];
  ignoreAllInPropertyId?: boolean | string | string[];
  ignoreAllInGroupOnlyQuery?: boolean | string | string[];
  ignoreAllInPropertyIdOnlyQuery?: boolean | string | string[];
  ignoreAllInGroupOnlyAggs?: boolean | string | string[];
  ignoreAllInPropertyIdOnlyAggs?: boolean | string | string[];
  ignoreUniqueId?: boolean | string | string[];
  onlyAggregations?: boolean;
  noHighlights?: boolean;
  fullHighlights?: number;
  ignoresDoNotApplyToAggregations?: boolean;
};

interface IDocumentBasicInfo { lastModified: NanoSecondComposedDate, index: string, language: string, id: string };
interface IDocumentSeqNoInfo { info: { seqNo: number, primaryTerm: number, lastModified: NanoSecondComposedDate }, indexNotFound: boolean, notFound: boolean };

export interface IElasticSelectBuilderArg {
  itemOrModule: string | ItemDefinition | Module;
  language?: string;
  types?: (string | ItemDefinition)[];
  boost?: number;
}

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
  /**
   * last date where the consistency check was ran
   */
  lastConsistencyCheck: string;
  /**
   * signature usually created by the listeners
   */
  signature: string;
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
  private runningConsistencyCheckOn: { [key: string]: Promise<void> } = {};

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
    this.prepareInstancePromiseResolve = null;
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

    if (!this.serverData || !equals(this.serverData, serverData)) {
      this.serverData = serverData;
      this.rootSchema = getElasticSchemaForRoot(this.root, this.serverData, null);
    }

    // this is our first server data so we resolve it
    // so it can continue
    if (shouldResolvePrmomise) {
      this.serverDataPromiseResolve();
    }

    // if it's not preparing then we should assume
    // we need to handle this ourselves in this function
    // and update the runtime indexes that contain
    // currency information
    if (!this.prepareInstancePromise && (
      INSTANCE_MODE === "ABSOLUTE" || (
        INSTANCE_MODE === "GLOBAL_MANAGER" && (GLOBAL_MANAGER_MODE === "ABSOLUTE" || GLOBAL_MANAGER_MODE === "ELASTIC")
      )
    )) {
      // this is new server data that was given to us and we should update
      // the related 
      // now we can begin qeuing the indexes that we want created
      const listOfItemDefOnly: string[] = [];

      // first we await for all the modules that we have in root
      this.root.getAllModules().forEach((rootMod) => {
        // and now we get all the child item definitions inside that mod
        rootMod.getAllChildDefinitionsRecursive().forEach((cIdef) => {
          // add that t the list of all
          if (cIdef.isSearchEngineEnabled()) {
            listOfItemDefOnly.push(cIdef.getQualifiedPathName());
          }
        });
      });

      const simpleIds = Object.keys(this.rootSchema).filter((key) => listOfItemDefOnly.includes(key));

      // and now we can rebuild those indexes
      // that have specific runtime properties
      await Promise.all(simpleIds.map(async (r) => {
        const shemaInfo = this.rootSchema[r];
        // we only care about these everything else
        // is wasted, as runtime properties are the only ones
        // that can update during runtime
        if (shemaInfo.runtime) {
          let attempts = 0;
          while (attempts <= 3) {
            attempts++;
            try {
              await this._rebuildIndexGroup(r, shemaInfo, false);
              break;
            } catch (err) {
              await wait(1000);

              logger.error(
                {
                  className: "ItemizeElasticClient",
                  methodName: "informNewServerData",
                  message: "Could not create or update the runtime index " + r + " after " + attempts + " attempts",
                  serious: true,
                  err,
                  data: {
                    attempts,
                    gaveUp: attempts > 3,
                  }
                }
              );
            }
          }
        }
      }));
    }
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
        // we are passing the force flag to ensure this runs
        // and not get stuck in an infinite loop as the run consistency
        // check function usually waits for preparation, if there is any
        // so with this, we avoid a scenario of this non-ending
        await this.runConsistencyCheck(null, true);
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
          {
            className: "ItemizeElasticClient",
            methodName: "prepareInstance",
            message: "Could not prepare elastic instance waiting " + secondsToWait + "s",
            serious: true,
            err,
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
          // and if the item itself is search engine enabled
          listOfAll.push(cIdef.getQualifiedPathName());
          if (cIdef.isSearchEngineEnabled()) {
            // rebuild it
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
   * @ignore
   */
  private async _prepareInstance(): Promise<void> {
    await this.elasticClient.cluster.putSettings({
      persistent: {
        // disable auto create index for mod to ensure we get an error
        // when pushing for upserts because the guessed types are wrong
        // basically when documents are being created and indexed they first
        // have to be defined types manually by the type system based in our schema
        // and if we let elastic choose it will pick the wrong mappings
        "action.auto_create_index": "-mod_*,-status,-logs,*",
      }
    });
    // first we create or update the status
    // index that we use internally for index information
    // and metadata
    await this.createOrUpdateSimpleIndex(
      "status",
      {
        properties: {
          lastConsistencyCheck: {
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
      refresh: "wait_for",
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
      {
        className: "ItemizeElasticClient",
        methodName: "createOrUpdateSimpleIndex",
        message: "Ensuring index for " + id,
      },
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
          {
            className: "ItemizeElasticClient",
            methodName: "createOrUpdateSimpleIndex",
            message: "Index for " + id + " to be updated: " + compCheck.generalFalseReason,
          },
        );
        await this.elasticClient.indices.putMapping({
          index: indexName,
          properties: value.properties,
          runtime: value.runtime || {},
        });
      } else {
        logger.info(
          {
            className: "ItemizeElasticClient",
            methodName: "createOrUpdateSimpleIndex",
            message: "Index for " + id + " deemed compatible",
          },
        );
      }
    } else {
      logger.info(
        {
          className: "ItemizeElasticClient",
          methodName: "createOrUpdateSimpleIndex",
          message: "Index for " + id + " to be created",
        },
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
    isInitialRebuildIndexes: boolean,
    forceRebuild?: boolean,
  ) {
    logger.info(
      {
        className: "ItemizeElasticClient",
        methodName: "_rebuildIndexGroup",
        message: "Ensuring index validity for " + qualifiedName,
      },
    );
    const indexInfo = await this.retrieveIndexStatusInfo(qualifiedName);

    const wildcardName = qualifiedName.toLowerCase() + "_*";
    let currentMapping = await this.retrieveCurrentSchemaDefinition(wildcardName);
    const allIndexNames = currentMapping && Object.keys(currentMapping);

    const idef = this.root.registry[qualifiedName] as ItemDefinition;
    const signature = {
      limiters: idef.getSearchLimiters(true),
      customFnLimiterId: idef.customSearchEngineLimiterFnId || null,
    }

    let currentSignature: any = null;
    try {
      currentSignature = indexInfo ? JSON.parse(indexInfo.signature) : null;
    } catch {
    }

    const equalSignature = equals(signature, currentSignature, { strict: true });

    const force = forceRebuild || (isInitialRebuildIndexes ? FORCE_ELASTIC_REBUILD : false);

    if (!indexInfo || force || !equalSignature) {
      logger.info(
        {
          className: "ItemizeElasticClient",
          methodName: "_rebuildIndexGroup",
          message: "Index group for " + qualifiedName + " status to be created",
          data: {
            force,
          }
        },
      );

      await this.setIndexStatusInfo(
        qualifiedName,
        {
          lastConsistencyCheck: null,
          signature: JSON.stringify(signature),
        }
      );

      if (currentMapping) {
        logger.info(
          {
            className: "ItemizeElasticClient",
            methodName: "_rebuildIndexGroup",
            message: "Index group for " + qualifiedName +
              (forceRebuild ? " exists but it's being manually forced to rebuild, destructive actions taken" : (
                FORCE_ELASTIC_REBUILD ?
                  " exists but FORCE_ELASTIC_REBUILD is set to true, destructive actions taken" :
                  (!equalSignature && indexInfo ?
                    " exists but the signature of the index is deemed incompatible, destructive actions taken" :
                    " deemed missing, but mapping found, destructive actions taken")
              )
              ),
            data: {
              currentSignature,
              signature,
              force,
            }
          },
        );

        const indexNames = allIndexNames.join(",");
        await this.elasticClient.indices.delete({
          index: indexNames,
        });
        currentMapping = null;
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
          {
            className: "ItemizeElasticClient",
            methodName: "_rebuildIndexGroup",
            message: "Index group for " +
              qualifiedName +
              " deemed incompatible; destructive actions taken: " +
              compatibilityCheck.scriptsIgnoredFalseReason,
          },
        );
        await this.setIndexStatusInfo(
          qualifiedName,
          {
            lastConsistencyCheck: null,
            signature: JSON.stringify(signature),
          }
        );
        const indexNames = allIndexNames.join(",");
        await this.elasticClient.indices.delete({
          index: indexNames,
        });
        currentMapping = null;
      } else if (!compatibilityCheck.general) {
        logger.info(
          {
            className: "ItemizeElasticClient",
            methodName: "_rebuildIndexGroup",
            message: "Index group for " +
              qualifiedName +
              " to be updated: " +
              compatibilityCheck.generalFalseReason,
          },
        );
        await this.elasticClient.indices.putMapping({
          index: wildcardName,
          properties: value.properties,
          runtime: value.runtime || {},
        });
      } else {
        logger.info(
          {
            className: "ItemizeElasticClient",
            methodName: "_rebuildIndexGroup",
            message: "Index group for " + qualifiedName + " deemed compatible",
          },
        );
      }
    } else {
      logger.info(
        {
          className: "ItemizeElasticClient",
          methodName: "_rebuildIndexGroup",
          message: "Index group for " + qualifiedName + " deemed empty (compatible)",
        },
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
    force?: boolean,
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
      true,
      force,
    );
  }

  public async ensureSimpleIndex(
    id: string,
    schema: IElasticIndexDefinitionType,
    throwError?: boolean,
  ) {
    await this.waitForServerData();

    logger.info(
      {
        className: "ItemizeElasticClient",
        methodName: "ensureSimpleIndex",
        message: "Ensuring index validity for " + id,
      },
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
    await this.waitForServerData();
    const schemaToBuild = this.rootSchema[qualifiedName];

    logger.info(
      {
        className: "ItemizeElasticClient",
        methodName: "ensureIndexes",
        message: "Ensuring index validity for " + qualifiedName,
      },
    );

    const indexInfo = await this.retrieveIndexStatusInfo(qualifiedName);

    if (!indexInfo) {
      logger.info(
        {
          className: "ItemizeElasticClient",
          methodName: "ensureIndexes",
          message: "Entire data for index " + qualifiedName + " is missing",
        },
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
        {
          className: "ItemizeElasticClient",
          methodName: "ensureIndexes",
          message: "Index for " + qualifiedName + " deemed empty (compatible)",
        },
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
        "Index for " +
        qualifiedName +
        " does not have the right shape: " +
        compatibilityCheck.scriptsIgnoredFalseReason
      );
      logger.info({
        className: "ItemizeElasticClient",
        methodName: "ensureIndexes",
        message: infoMsg,
      });
      if (throwError) {
        throw new NotReadyError(infoMsg);
      }
    } else {
      logger.info(
        {
          className: "ItemizeElasticClient",
          methodName: "ensureIndexes",
          message: "Index for " + qualifiedName + " deemed compatible",
        },
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
  public updateIndices(onElement?: Module | ItemDefinition | string, force?: boolean) {
    return this.runConsistencyCheck(onElement, force);
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
   * 
   * @param onElement the element to run the consistency check on, if none specified will run it on everything
   * @param force by default the consistency will wait for preparation and will not overlap other consistency checks, use this
   * to just run it right away regardless regardless of anything
   */
  public async runConsistencyCheck(
    onElement?: Module | ItemDefinition | string,
    force?: boolean,
  ) {
    const actualOnElement = typeof onElement === "string" ? this.root.registry[onElement] : onElement;
    const qPathName = (actualOnElement && actualOnElement.getQualifiedPathName()) || "null";

    let pResolve: any = null;
    let pReject: any = null;

    if (!force) {
      if (this.runningConsistencyCheckOn[qPathName]) {
        logger.info({
          className: "ItemizeElasticClient",
          methodName: "runConsistencyCheck",
          message: "A consistency check for " + qPathName + " is running already, reusing that",
        });
        return await this.runningConsistencyCheckOn[qPathName];
      }
      this.runningConsistencyCheckOn[qPathName] = new Promise((resolve, reject) => {
        pResolve = resolve;
        pReject = reject;
      });
      await this.prepareInstancePromise;
    }

    try {
      if (!actualOnElement) {
        for (const rootMod of this.root.getAllModules()) {
          await this.runConsistencyCheck(rootMod, force);
        }
      } else if (actualOnElement instanceof Module) {
        for (const item of actualOnElement.getAllChildDefinitionsRecursive()) {
          await this.runConsistencyCheck(item, force);
        }
      } else if (actualOnElement instanceof ItemDefinition) {
        await this.rawDB.startSingleClientOperation(async (rawDBClient) => {
          // sometimes the consistency check doesn't manage to be effective and it's not due to an error
          // but because there may have been so many inconsistencies or race conditions occurred during
          // the consistency check in such cases we try again
          // to run the consistency check to keep adding consistency until it is effective or until
          // we stop trying
          let wasEffective = false;
          let tries = 0;
          while (!wasEffective && tries < 3) {
            wasEffective = await this._runConsistencyCheck(rawDBClient, actualOnElement, new Date(), 0, null, null, {});
            tries++;
          }
        });
      }
      pResolve && pResolve();
      delete this.runningConsistencyCheckOn[qPathName];
    } catch (err) {
      pReject && pReject(err);
      delete this.runningConsistencyCheckOn[qPathName];
      throw err;
    }
  }

  public isRunningConsistencyCheck(onElement?: Module | ItemDefinition | string) {
    const actualOnElement = typeof onElement === "string" ? this.root.registry[onElement] : onElement;
    const qPathName = (actualOnElement && actualOnElement.getQualifiedPathName()) || "null";
    return !!this.runningConsistencyCheckOn[qPathName];
  }

  private async _runConsistencyCheck(
    rawDBClient: ItemizeRawDB,
    idef: ItemDefinition,
    timeRan: Date,
    batchNumber: number,
    knownStatusInfo: IElasticIndexInformationType,
    knownLimiters: ISearchLimitersType,
    ensuranceCache: any,
  ) {
    let cursorIsOpen: boolean = batchNumber !== 0;
    const cursorName = idef.getQualifiedPathName().toLowerCase() + "_elastic_cursor";

    try {
      let wasIneffective: boolean = false;

      const parentModule = idef.getParentModule();
      const parentModuleEnabled = parentModule.isSearchEngineEnabled();

      const selfEnabled = idef.isSearchEngineEnabled();

      if (!selfEnabled && !parentModuleEnabled) {
        return;
      }

      const qualifiedPathName = idef.getQualifiedPathName();
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "ItemizeElasticClient",
          methodName: "_runConsistencyCheck",
          message: "Index for " + qualifiedPathName + " to be checked for",
          data: {
            batchNumber,
            timeRan,
          },
        }
      );

      let statusInfo = knownStatusInfo || await this.retrieveIndexStatusInfo(qualifiedPathName);
      const limiters = knownLimiters || idef.getSearchLimiters(true);
      const customFnLimiterId = idef.customSearchEngineLimiterFnId || null;

      const baseIndexPrefix = qualifiedPathName.toLowerCase() + "_";
      const wildcardIndexName = baseIndexPrefix + "*";

      const willForceConsistencyCheckFromScratch = ELASTIC_EXECUTE_CONSISTENCY_CHECKS_FROM_SCRATCH_AT &&
        ELASTIC_EXECUTE_CONSISTENCY_CHECKS_FROM_SCRATCH_AT === idef.getQualifiedPathName();

      let minimumCreatedAt: string = null;
      if (limiters && limiters.since && batchNumber === 0) {
        // cannot retrieve anything before this date, we do not need any older records
        const minimumCreatedAtAsDate = new Date(timeRan.getTime() - limiters.since);
        minimumCreatedAt = minimumCreatedAtAsDate.toISOString();

        if (batchNumber === 0) {
          CAN_LOG_DEBUG && logger.debug(
            {
              className: "ItemizeElasticClient",
              methodName: "_runConsistencyCheck",
              message: "Removing all documents for " + qualifiedPathName + " older than " + minimumCreatedAt,
            },
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
          {
            className: "ItemizeElasticClient",
            methodName: "_runConsistencyCheck",
            message: "" + qualifiedPathName + " does not have any since limiter",
          },
        );
      }

      if (batchNumber === 0) {
        // let's first destroy all the documents that should be deleted
        // and not exist if they happen to do so
        const documentsDeletedSinceLastRan = await rawDBClient.databaseConnection.queryRows(
          `SELECT "id", "version" FROM ${JSON.stringify(DELETED_REGISTRY_IDENTIFIER)} ` +
          `WHERE "type" = ?` + (
            statusInfo.lastConsistencyCheck ? ` AND "transaction_time" >= ?` : ""
          ),
          [
            qualifiedPathName,
            statusInfo.lastConsistencyCheck,
          ].filter((v) => !!v),
          true,
        );

        if (documentsDeletedSinceLastRan.length) {
          CAN_LOG_DEBUG && logger.debug(
            {
              className: "ItemizeElasticClient",
              methodName: "_runConsistencyCheck",
              message: "Removing all documents found (they most likely already have been deleted) for " + qualifiedPathName,
              data: {
                documentsDeletedSinceLastRan,
              },
            }
          );
          await this.deleteDocumentsUnknownLanguage(
            idef,
            documentsDeletedSinceLastRan,
          );
        } else if (CAN_LOG_DEBUG) {
          logger.debug(
            {
              className: "ItemizeElasticClient",
              methodName: "runConsistencyCheck",
              message: "Did not recieve any documents to delete for " + qualifiedPathName,
            },
          );
        }
      }

      let hasSomeDuplicateCorruptionAndMayHaveMore = false;
      if (batchNumber === 0) {
        const expectedLanguageColumn = idef.getSearchEngineDynamicMainLanguageColumn();
        const limitedColumns = idef.getSearchEngineLimitedColumns(limiters);
        const relevantColumns = idef.customSearchEngineLimiterFnColumns;

        // now we can do the select
        // we only select 100 as limit when doing a initial consistency check
        // that we have never done before because of the reason below in the comment
        // we are getting more data
        // const limit = statusInfo.lastConsistencyCheck === null ? 100 : 1000;
        // const offset = batchNumber * limit;

        // no last consistency check then we gotta retrieve the whole thing because
        // we want whole data this one round
        const useModuleOnly = limitedColumns.idef.length || statusInfo.lastConsistencyCheck === null || relevantColumns?.length ? false : (
          // otherwise it depends if we got a language column, it will depend on wether such column
          // is in the module, otherwise we can be free to use module only
          expectedLanguageColumn ? idef.isSearchEngineDynamicMainLanguageColumnInModule() : true
        );

        const selectBuilder = (selecter: SelectBuilder) => {
          // if our last consistency check is null, this means that we had never ran
          // consistency before, we will likely have missing data that we need to fill voids for
          // so we rather do just that and select everything rather than expecting
          // holes not to be common
          if (statusInfo.lastConsistencyCheck === null) {
            // this is why we were using whole 2 tables
            selecter.selectAll();
          } else {
            let columnsToSelect: string[] = ["id", "version", "last_modified"];
            if (expectedLanguageColumn) {
              columnsToSelect.push(expectedLanguageColumn);
            }
            if (limitedColumns.idef) {
              limitedColumns.idef.forEach((p) => columnsToSelect.push(p));
            }
            if (limitedColumns.mod) {
              limitedColumns.mod.forEach((p) => columnsToSelect.push(p));
            }
            if (relevantColumns) {
              relevantColumns.forEach((c) => columnsToSelect.push(c));
            }
            // otherwise we assume our data isn't corrupted, and just select what
            // we need making a minimal query
            selecter.select(...columnsToSelect);
          }

          // now we can decide what we select for
          // maybe it is everything, kind of scary
          const whereBuilder = selecter.whereBuilder;
          if (statusInfo.lastConsistencyCheck && !willForceConsistencyCheckFromScratch) {
            whereBuilder.andWhereColumn("last_modified", ">", statusInfo.lastConsistencyCheck);
          }

          // if we only use the module we must ensure we are getting
          // the right type and not something else entirely
          if (useModuleOnly) {
            whereBuilder.andWhereColumn("type", qualifiedPathName);
          }

          // ensure consistency, because we are pulling in batches we want to ensure we are not checking
          // stuff that has been suddenly added while we are pulling these batches, but only pull what
          // hasn't been pulled before, so we use the time we have ran this consistency check at not to pull
          // anything newer than that
          whereBuilder.andWhereColumn("created_at", "<=", timeRan.toISOString());

          // because it's the first time and our index is empty we want to only retrieve
          // the values that will ultimately populate the elastic index, we don't need to check
          // for older values that should be deleted because they don't fit the criteria
          // because that's just unnecessary when there's no data there
          if (statusInfo.lastConsistencyCheck === null) {
            if (limiters && limiters.parenting) {
              whereBuilder.andWhereColumnNotNull("parent_id");
            }

            // limiting so that it's only for the given values for the properties
            // of the search limiter
            if (limiters && limiters.properties) {
              limiters.properties.forEach((p) => {
                let valuesToFilterFor = p.values;
                if (!p.values || !p.values.length) {
                  // can't do anything the values is empty
                  logger.error(
                    {
                      className: "ItemizeElasticClient",
                      methodName: "_runConsistencyCheck",
                      message: "The values array is empty for a given limiter",
                      data: {
                        batchNumber,
                        limiters,
                      }
                    }
                  );
                  valuesToFilterFor = [];
                }

                whereBuilder.andWhere(
                  JSON.stringify(p.id) + " = ANY(ARRAY[" + valuesToFilterFor.map(() => "?").join(",") + "])",
                  valuesToFilterFor as any,
                );
              });
            }
          }

          // we always select the minimum created at if we have it
          // unlike other limiters because we can easily delete older records than this
          // as we have done before, so they will be of no confict, unlike corrupted records
          // that did not delete when their value updated outside the limiter scope
          if (minimumCreatedAt) {
            whereBuilder.andWhereColumn("created_at", ">=", minimumCreatedAt);
          }

          // it would nevertheless work to keep consistency
          // limit offset has been removed in favour of cursors
          // selecter.limit(limit).offset(offset);
          selecter.orderByBuilder.orderByColumn("created_at", "ASC", "FIRST");
        }

        try {
          // declare the cursor
          await rawDBClient.declareRawDBCursorSelect(
            useModuleOnly ? idef.getParentModule() : idef,
            cursorName,
            selectBuilder,
            {
              // important for performance as we are only getting consecutive results
              noScroll: true,
              // important because we want to run straight into the db
              // and hold it there
              withHold: true,
            }
          );
          cursorIsOpen = true;
        } catch (err) {
          // oops
          logger.error(
            {
              className: "ItemizeElasticClient",
              methodName: "_runConsistencyCheck",
              message: "Could not declare a pgSQL cursor for " + idef.getQualifiedPathName() + " assuming it's open already",
              err,
            }
          );

          throw err;
        }
      }

      const totalExpected = statusInfo.lastConsistencyCheck === null ? 100 : 1000;
      const documentsCreatedOrModifiedSinceLastRan = await rawDBClient.fetchFromRawDBCursor(cursorName, (f) => {
        // select forward a number of records
        f.forward(totalExpected);
      });
      const hasNextBatch = documentsCreatedOrModifiedSinceLastRan.length === totalExpected;
      let error: Error = null;

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
          isSearchLimited: boolean,
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
            isSearchLimited: !idef.shouldRowBeIncludedInSearchEngine(r, limiters),
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
          // we try to catch at least 5 potential duplicates
          // in languages where they may not belong
          size: arrayOfIds.length + 5,
        });

        // check for duplication corruption where we got more results
        // we wil have to run our check again towards the same last modified date
        // after this
        hasSomeDuplicateCorruptionAndMayHaveMore = comparativeResults.hits.hits.length === arrayOfIds.length + 5;

        const baseIndexPrefixLen = baseIndexPrefix.length;
        const missingFromResults: string[] = [];
        const extraAtResults: SearchHit[] = [];
        arrayOfIds.forEach((id) => {
          if (resultObj[id].isSearchLimited) {
            comparativeResults.hits.hits.forEach((hit) => {
              if (hit._id === id) {
                extraAtResults.push(hit);
              }
            });
          } else {
            const isMissing = !comparativeResults.hits.hits.some((hit) => {
              const isSameId = hit._id === id;

              if (!isSameId) {
                return;
              }

              let language = hit._index.substring(baseIndexPrefixLen);
              if (language === "none") {
                language = null;
              }
              const objInfo = resultObj[hit._id];
              const isSameLanguage = objInfo.language === language;

              // exists with the same id and the same language
              // so it is in the right index, otherwise
              // it is considered missing

              // the old value (or values) will be removed by notMissingButOutdated
              // check for isInTheWrongLanguage for that check that comes just next
              return isSameLanguage;
            })

            if (isMissing && !hasSomeDuplicateCorruptionAndMayHaveMore) {
              // we check for this because the reason we may have not found our record
              // from the list is because we are limiting to the amount of results
              // so we don't know if that occurred because of having duplicates
              // that filled our list so we don't want to potentially add again
              // the consistency needs to be ran again

              // because hasSomeDuplicate... is true if this doesn't occur when it should
              // the consistency will return false, meaning it was not effective
              missingFromResults.push(id);
            }
          }
        });
        const notMissingButOutdated: SearchHit[] = [];

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
          let language = hit._index.substring(baseIndexPrefixLen);
          if (language === "none") {
            language = null;
          }
          const lasModifiedStr = hit.fields.last_modified[0];

          // lack of last modified means it's a corrupt record
          const lastModified = !lasModifiedStr ? null : new NanoSecondComposedDate(lasModifiedStr);
          const corruptRecord = !lastModified || lastModified.isInvalid();

          // this will delete duplicated values simply because one of them will
          // be in the wrong language by default because they don't occupy the same index
          // so the language will differ, if both of them are invalid they will also go away
          // for different reasons
          const isInTheWrongLanguage = objectInfo.language !== language;
          const isOutdated = corruptRecord ? true : objectInfo.lastModified.greaterThan(lastModified);

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
                // if_seq_no: hit._seq_no,
              }
            });
            bulkOperationCurrentIndexSize++;
            if (bulkOperationCurrentIndexSize >= bulkOperationMaxSize) {
              bulkOperationCurrentIndex++;
            }

            CAN_LOG_DEBUG && logger.debug(
              {
                className: "ItemizeElasticClient",
                methodName: "_runConsistencyCheck",
                message: "Operation for " + qualifiedPathName + " has been added (wrong language)",
                data: {
                  operation: "delete",
                  index: hit._index,
                  id: hit._id,
                },
              }
            );

          } else if (isOutdated) {
            // if it's outdated then we add it to this list
            // where the value will be fetched
            notMissingButOutdated.push(hit);
          }
        });

        // extra documents that shouldn't be there
        if (extraAtResults.length) {
          // these are disrespecting the limiters and shouldn't be there anymore to begin with
          extraAtResults.forEach((hit) => {
            // it goes away by the bulk operations
            if (!bulkOperations[bulkOperationCurrentIndex]) {
              bulkOperations[bulkOperationCurrentIndex] = [];
              bulkOperationCurrentIndexSize = 0;
            }
            bulkOperations[bulkOperationCurrentIndex].push({
              delete: {
                _index: hit._index,
                _id: hit._id,
                // if_seq_no: hit._seq_no,
              }
            });
            bulkOperationCurrentIndexSize++;
            if (bulkOperationCurrentIndexSize >= bulkOperationMaxSize) {
              bulkOperationCurrentIndex++;
            }
          });
        }

        // if we have any of these mising or missing but outdated
        if (missingFromResults.length + notMissingButOutdated.length) {
          // we are going to loop over both
          const operations = (await Promise.all(missingFromResults.concat(notMissingButOutdated.map((v) => v._id)).map(async (id) => {
            // let's get the info we got from our database
            const objectInfo = resultObj[id];
            // and now let's get the value for this row, if the last consistency check is null
            // this means that is cheekily stored in the object info already because
            // we did a strong select with everything
            let knownValue = statusInfo.lastConsistencyCheck === null ? objectInfo.r : (
              await
                rawDBClient.performRawDBSelect(
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
              null,
              idef,
              knownValue,
            );

            let outdatedValue = notMissingButOutdated.find((r) => r._id === id);

            const indexItWillBelongTo = baseIndexPrefix + (objectInfo.language || "none");

            // if it's missing then we gotta be sure the index where it will be added
            // is there, just in case
            if (!outdatedValue) {
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

            // due to elasticsearch not providing primary term
            // information because their "reasons", we are forced
            // to retrieve the primary term manually per update
            // and check it against the current just in case
            let seqNoInfo: IDocumentSeqNoInfo = null;
            if (outdatedValue) {
              seqNoInfo = await this.getSeqNoInfo({
                id: outdatedValue._id,
                index: outdatedValue._index,
                language: null,
                lastModified: null,
              });

              // somehow was deleted during this operation
              // assuming that is because it was indeed deleted from db
              // and another elasticseach call deleted the value, lets confirm
              if (seqNoInfo.notFound) {
                knownValue = await
                  rawDBClient.performRawDBSelect(
                    idef,
                    (s) =>
                      s.selectAll().whereBuilder
                        .andWhereColumn("id", objectInfo.r.id).andWhereColumn("version", objectInfo.r.version || "")
                  );

                // it was not deleted, what happened? why is it gone?
                if (knownValue) {
                  // it will have to be created again
                  outdatedValue = null;

                  // guess it was legit gone, we are good
                } else {
                  return null;
                }
              }

              // we got our seq info but it's greater than our database value
              // somehow it got updated in the meantime
              if (seqNoInfo && seqNoInfo.info.lastModified.greaterThanEqual(objectInfo.lastModified)) {
                // we do nothing it was updaed by something else
                return null;
              }
            }

            const operation = outdatedValue ? "update" : "create";

            CAN_LOG_DEBUG && logger.debug(
              {
                className: "ItemizeElasticClient",
                methodName: "_runConsistencyCheck",
                message: "Operation for " + qualifiedPathName + " has been added",
                data: {
                  operation,
                  index: indexItWillBelongTo,
                  id,
                },
              }
            );

            return [
              {
                [operation]: outdatedValue ? {
                  _index: outdatedValue._index,
                  _id: outdatedValue._id,
                  if_seq_no: seqNoInfo.info.seqNo,
                  if_primary_term: seqNoInfo.info.primaryTerm,
                } : {
                  _index: indexItWillBelongTo,
                  _id: id,
                }
              },
              outdatedValue ? { doc: convertedSQL } : convertedSQL,
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
            {
              className: "ItemizeElasticClient",
              methodName: "_runConsistencyCheck",
              message: "Did not recieve any new documents (that are missing or outdated in elastic) for " + qualifiedPathName,
            },
          );
        }

        if (bulkOperations.length) {
          logger.info(
            {
              className: "ItemizeElasticClient",
              methodName: "_runConsistencyCheck",
              message: bulkOperations.length +
                " bulk operations have been created for batch " +
                (batchNumber + 1) +
                " of " +
                qualifiedPathName,
            },
          );
          // we are done
          try {
            // the operation chunk size is 20 fixes at once, this is smaller than the selection
            // but we are not sure how big our http requests can get, we will now split
            // as some of these elastic servers can really take very tiny payloads
            // this will ensure a rather constant stream of data
            await Promise.all(bulkOperations.map(async (bulkOp, index) => {
              logger.info(
                {
                  className: "ItemizeElasticClient",
                  methodName: "_runConsistencyCheck",
                  message: "Executing bulk number " +
                    (index + 1) +
                    "/" +
                    bulkOperations.length +
                    " for batch " +
                    (batchNumber + 1) +
                    " of " +
                    qualifiedPathName,
                },
              );

              const operations = await this.elasticClient.bulk({
                operations: bulkOp,
              });

              // bulk fails silently but we must not accept this because this means
              // invalid consistency and we must ensure consistency
              if (operations.errors) {
                const errored = operations.items.map((o) => {
                  // avoid reporting version conflict engine exceptions as the values have been created
                  // potential errors be like (1. the create failed because it was created while it was trying)
                  // we ignore that
                  const error = (o.create && o.create.error && o.create.status !== 409 && o.create.error) ||
                    // we take in the errors where we updated and the version engine exception occurred
                    // as well as any other errors, if it really fixed itself somehow
                    // then the next loop will not find that problem

                    // potential errors are like (1. the update failed because the value changed 409 while it was being done)
                    // 2. the update failed because the value was deleted 404 while it was being done
                    // because we don't know if it was updated correctly we store this error
                    // and check again
                    (o.update && o.update.error && o.update.status !== 409 && o.update.status !== 404 && o.update.error) ||
                    // was deleted already, 2. was recreated? wtf?...
                    (o.delete && o.delete.error && o.delete.status !== 404 && o.delete.status !== 404 && o.delete.error);

                  if (!error) {
                    const ineffective = (o.create && o.create.error && o.create.status !== 409 && o.create.error) ||
                      // all update errors mark it as ineffective
                      (o.update && o.update.error) ||
                      // avoid reporting delete exceptions when the value have been deleted already
                      (o.delete && o.delete.error && o.delete.status !== 404 && o.delete.error);

                    if (ineffective) {
                      wasIneffective = true;
                    }
                  }

                  // ignoring race conditions where for some incredible reason of the gods
                  // somehow the record got deleted, say by another instance
                  // while we are trying to apply consistency, this is incredibly unlikely
                  // but who knows, we ignore those cases

                  // as for update, we can't be sure why the document dissapeared

                  return error || null;
                }).filter((e) => !!e);

                if (errored.length) {
                  throw new Error(
                    JSON.stringify(errored),
                  );
                }
              }
            }));
          } catch (err) {
            logger.error(
              {
                className: "ItemizeElasticClient",
                methodName: "_runConsistencyCheck",
                message: "Some bulk operations failed for " + qualifiedPathName,
                serious: true,
                err,
                data: {
                  batchNumber,
                }
              }
            );
            // we consume the error and allow the function to recurse
            error = err;
          }
        } else if (CAN_LOG_DEBUG) {
          logger.debug(
            {
              className: "ItemizeElasticClient",
              methodName: "_runConsistencyCheck",
              message: "Did not recieve any bulk operations for " + qualifiedPathName,
            },
          );
        }
      } else if (CAN_LOG_DEBUG) {
        logger.debug(
          {
            className: "ItemizeElasticClient",
            methodName: "_runConsistencyCheck",
            message: "Did not recieve any new documents since nothing has changed since last check for " + qualifiedPathName,
          },
        );
      }

      // if we have another batch then we should consume such batch
      if (hasNextBatch) {
        // all the layers run their operations (all they can)
        // before throwing an error so they are guaranteed to
        // do all they can, one of their errors may come here
        // too, but we have already ran our own operations
        // (whether we failed or succeeded)
        const wasNextBatchEffective = await this._runConsistencyCheck(
          rawDBClient,
          idef,
          timeRan,
          batchNumber + 1,
          statusInfo,
          limiters,
          ensuranceCache,
        );

        // mark us as ineffective too because our next batch
        // was not effective
        if (!wasNextBatchEffective) {
          wasIneffective = true;
        }

        // this will throw the error that occured in this layer
        // but will allow to keep processing the other batches
        // whatever happened hopefully will fix itself on the next
        // consistency check round, but we tried to update and fix
        // as many records as possible
        if (error) {
          // the cursor will still be closed because we catch
          // all errors at the bottom to close the cursor
          throw error;
        }
      } else {
        // no next batch so we need to close the cursor
        try {
          await rawDBClient.closeRawDBCursor(cursorName);
        } catch (err) {
          logger.error(
            {
              className: "ItemizeElasticClient",
              methodName: "_runConsistencyCheck",
              message: "Failed to close cursor for " + cursorName + " when ending",
              serious: true,
              err,
              data: {
                batchNumber,
                cursorName,
              }
            }
          );
        }

        // throwing the error too that ocurred in this layer
        // will prevent setting the index status info
        if (error) {
          throw error;
        }
      }

      // we can update our timestamp if we are the initial and not some batch
      // this wil not occur if an error is triggered
      // causing it to retry from the same point
      if (batchNumber === 0) {
        // so this exists in batch 0, we checked for everything and we have succeeded
        // if we made it here, but we also received more records than we bargained for and
        // hit the limit, this means we cannot be 100% sure we correctly
        // did the consistency, plus records are not created when this duplicate corruption
        // happens the consistency check needs to be ran again
        if (!hasSomeDuplicateCorruptionAndMayHaveMore && !wasIneffective) {
          await this.setIndexStatusInfo(
            qualifiedPathName,
            {
              lastConsistencyCheck: timeRan.toISOString(),
              signature: JSON.stringify({
                limiters: limiters,
                customFnLimiterId,
              })
            }
          );
          // was effective
          return true;
        }

        // was not effective
        return false;
      } else {
        return !wasIneffective;
      }
    } catch (err) {
      if (cursorIsOpen) {
        try {
          await rawDBClient.closeRawDBCursor(cursorName);
        } catch (err2) {
          logger.error(
            {
              className: "ItemizeElasticClient",
              methodName: "_runConsistencyCheck",
              message: "Failed to close cursor for " + cursorName + " during error handling",
              serious: true,
              err: err2,
              data: {
                batchNumber,
                cursorName,
              }
            }
          );
        }
      }

      throw err;
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
      const rs = await this.currentlyEnsuringIndexInGroup[indexName];
      if (cache) {
        cache[indexName] = true;
      }
      return rs;
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

        if (cache) {
          cache[indexName] = true;
        }

        delete this.currentlyEnsuringIndexInGroup[indexName];
        resolve(true);
      } catch (err) {
        delete this.currentlyEnsuringIndexInGroup[indexName];
        reject(err);
      }
    });

    await this.currentlyEnsuringIndexInGroup[indexName];
  }

  private async generateMissingIndexInGroup(
    indexName: string,
    language: string,
    value: IElasticIndexDefinitionType,
  ) {
    const analyzer = this.langAnalyzers[language || "*"] || this.langAnalyzers["*"] || "standard";
    const analyzerLow = analyzer.toLowerCase();

    logger.info(
      {
        className: "ItemizeElasticClient",
        methodName: "generateMissingIndexInGroup",
        message: "Index " + indexName + " to be created",
      },
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

  public async getSeqNoInfo(
    info: IDocumentBasicInfo,
  ): Promise<IDocumentSeqNoInfo> {
    let value: GetResponse;
    try {
      value = await this.elasticClient.get({
        index: info.index,
        id: info.id,
        _source: ["last_modified"],
        stored_fields: [],
      });
    } catch (err) {
      if (err.meta.statusCode === 404) {
        return {
          indexNotFound: true,
          notFound: true,
          info: null,
        };
      } else {
        throw err;
      }
    }

    if (!value || !value.found) {
      return {
        indexNotFound: false,
        notFound: true,
        info: null,
      };
    }

    return {
      info: {
        lastModified: new NanoSecondComposedDate((value._source as any).last_modified),
        seqNo: value._seq_no,
        primaryTerm: value._primary_term,
      },
      indexNotFound: false,
      notFound: false,
    }
  }

  public async getDocumentBasicInfo(
    itemDefinition: string | ItemDefinition,
    id: string,
    version: string,
  ): Promise<IDocumentBasicInfo[]> {
    const idef = typeof itemDefinition === "string" ? this.root.registry[itemDefinition] : itemDefinition;

    const qualifiedNameItem = idef.getQualifiedPathName();
    const indexNameIdef = qualifiedNameItem.toLowerCase() + "_*";
    const _id = id + "." + (version || "");

    let values: SearchResponse;
    try {
      values = await this.elasticClient.search({
        index: indexNameIdef,
        query: {
          terms: {
            _id: [_id],
          }
        },
        allow_no_indices: true,
        // not allowed to have wait_for here
        _source: ["last_modified"],
        stored_fields: [],
      });
    } catch (err) {
      if (err.meta.statusCode === 404) {
        return null;
      } else {
        throw err;
      }
    }

    if (!values || !values.hits || !values.hits.hits.length) {
      return null;
    }

    const indexNameUnlanguaged = qualifiedNameItem.toLowerCase() + "_";

    return values.hits.hits.map((value) => ({
      lastModified: new NanoSecondComposedDate((value._source as any).last_modified),
      index: value._index,
      language: value._index.replace(indexNameUnlanguaged, ""),
      id: _id,
    }));
  }

  public async deleteDocumentsUnknownLanguage(
    itemDefinition: string | ItemDefinition,
    ids: Array<{
      id: string;
      version: string;
    } | string>,
  ) {
    const idef = typeof itemDefinition === "string" ? this.root.registry[itemDefinition] : itemDefinition;

    if (!idef.isSearchEngineEnabled()) {
      return;
    }

    const qualifiedNameItem = idef.getQualifiedPathName();
    const indexNameIdef = qualifiedNameItem.toLowerCase() + "_*";
    const mergedIds = ids.map((r) => typeof r === "string" ? r : r.id + "." + (r.version || ""));

    CAN_LOG_DEBUG && logger.debug(
      {
        className: "ItemizeElasticClient",
        methodName: "deleteDocumentsUnknownLanguage",
        message: "Document for " + idef.getQualifiedPathName() + " to be deleted",
        data: {
          ids: mergedIds,
        },
      }
    );

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
      // not allowed to have wait_for here
      refresh: true,
    });
  }

  public async deleteDocumentUnknownLanguage(
    itemDefinition: string | ItemDefinition,
    id: string,
    version: string,
  ) {
    return this.deleteDocumentsUnknownLanguage(
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
      {
        className: "ItemizeElasticClient",
        methodName: "deleteDocument",
        message: "Document for " + qualifiedNameItem + " to be deleted",
        data: {
          id,
          version,
          language,
        },
      }
    );

    try {
      await this.elasticClient.delete({
        id: givenID,
        index: indexNameIdef,
        refresh: "wait_for",
      });
    } catch (err) {
      // if index_not_found or not_found isn't the case
      if (err.meta.statusCode !== 404) {
        logger.error(
          {
            className: "ItemizeElasticClient",
            methodName: "deleteDocument",
            message: "Could not delete document for " + givenID + " at " + indexNameIdef,
            serious: true,
            err,
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

    if (EMULATE_ELASTIC_SYNC_FAILURE_AT && EMULATE_ELASTIC_SYNC_FAILURE_AT === idef.getQualifiedPathName()) {
      throw new Error("EMULATE_ELASTIC_SYNC_FAILURE_AT is enabled for " + EMULATE_ELASTIC_SYNC_FAILURE_AT);
    }

    if (EMULATE_SILENT_ELASTIC_SYNC_FAILURE_AT && EMULATE_SILENT_ELASTIC_SYNC_FAILURE_AT === idef.getQualifiedPathName()) {
      logger.info(
        {
          className: "ItemizeElasticClient",
          methodName: "createDocumentUnknownEverything",
          message: "EMULATE_SILENT_ELASTIC_SYNC_FAILURE_AT is enabled for " + EMULATE_SILENT_ELASTIC_SYNC_FAILURE_AT,
        }
      );
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

    if (EMULATE_ELASTIC_SYNC_FAILURE_AT && EMULATE_ELASTIC_SYNC_FAILURE_AT === idef.getQualifiedPathName()) {
      throw new Error("EMULATE_ELASTIC_SYNC_FAILURE_AT is enabled for " + EMULATE_ELASTIC_SYNC_FAILURE_AT);
    }

    if (EMULATE_SILENT_ELASTIC_SYNC_FAILURE_AT && EMULATE_SILENT_ELASTIC_SYNC_FAILURE_AT === idef.getQualifiedPathName()) {
      logger.info(
        {
          className: "ItemizeElasticClient",
          methodName: "updateDocumentUnknownEverything",
          message: "EMULATE_SILENT_ELASTIC_SYNC_FAILURE_AT is enabled for " + EMULATE_SILENT_ELASTIC_SYNC_FAILURE_AT,
        }
      );
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
   * 
   * The execution will not do a thing if
   * 1. the item itself is not search engine enabled
   * 2. it's determined that it doesn't pass the specified limiter
   */
  public async updateDocument(
    itemDefinition: string | ItemDefinition,
    language: string,
    id: string,
    version: string,
    value?: ISQLTableRowValue,
  ): Promise<void> {
    const idef = (typeof itemDefinition === "string" ? this.root.registry[itemDefinition] : itemDefinition) as ItemDefinition;

    if (!idef.isSearchEngineEnabled()) {
      return;
    }

    if (EMULATE_ELASTIC_SYNC_FAILURE_AT && EMULATE_ELASTIC_SYNC_FAILURE_AT === idef.getQualifiedPathName()) {
      throw new Error("EMULATE_ELASTIC_SYNC_FAILURE_AT is enabled for " + EMULATE_ELASTIC_SYNC_FAILURE_AT);
    }

    if (EMULATE_SILENT_ELASTIC_SYNC_FAILURE_AT && EMULATE_SILENT_ELASTIC_SYNC_FAILURE_AT === idef.getQualifiedPathName()) {
      logger.info(
        {
          className: "ItemizeElasticClient",
          methodName: "updateDocument",
          message: "EMULATE_SILENT_ELASTIC_SYNC_FAILURE_AT is enabled for " + EMULATE_SILENT_ELASTIC_SYNC_FAILURE_AT,
        }
      );
      return;
    }

    CAN_LOG_DEBUG && logger.debug(
      {
        className: "ItemizeElasticClient",
        methodName: "updateDocument",
        message: "Document for " + idef.getQualifiedPathName() + " to be updated with new data",
        data: {
          id,
          version,
          language,
        },
      }
    );

    const newValue = value || ((await this.rawDB.performRawDBSelect(
      itemDefinition,
      (b) => b.selectAll().whereBuilder.andWhereColumn("id", id).andWhereColumn("version", version || "")
    ))[0] || null);

    // database did not find anything for this
    if (!newValue) {
      return;
    }

    // CHECKING LIMITERS
    const combinedLimiters = idef.getSearchLimiters(true);
    const shouldBeIncluded = idef.shouldRowBeIncludedInSearchEngine(newValue, combinedLimiters, true);

    // we get our current document info which provides
    // info about every document that has that id version for that idef
    // with the potential to find corrupt records with duplicate
    // data as it gives an array
    let currentDocumentInfo = await this.getDocumentBasicInfo(
      idef,
      id,
      version,
    );

    // should not be included but we have matches
    if (!shouldBeIncluded && currentDocumentInfo) {
      // denied to limiters however it could just have been a change
      // where it is now limited, and we will safely try to remove any potential value
      await Promise.all(currentDocumentInfo.map(async (v) => {
        try {
          await this.deleteDocument(itemDefinition, v.language, id, version);
        } catch (err) {
          logger.error(
            {
              className: "ItemizeElasticClient",
              methodName: "updateDocument",
              message: "Could not delete an invalid search limited document for " + mergedId + " at " + v.index,
              serious: true,
              err,
            }
          );
        }
      }));
      return;
    }

    const updateLastModified = new NanoSecondComposedDate(newValue.last_modified);

    // now we are going to check those documents we have got to see if we have got any
    let greaterCurrentDocumentInfo: IDocumentBasicInfo = null;
    if (currentDocumentInfo) {
      // let's find the greater document that is more up to date
      greaterCurrentDocumentInfo = currentDocumentInfo.length === 1 ? currentDocumentInfo[0] : currentDocumentInfo.reduce((v1, v2) => {
        // denied because the current value has a greater signature
        if (v1.lastModified.greaterThanEqual(v2.lastModified)) {
          return v1;
        }

        return v2;
      });

      // and check it against our update
      const greaterValueIsMoreOrEqualToUs = greaterCurrentDocumentInfo.lastModified.greaterThanEqual(updateLastModified);

      // need to delete anything that is not our greater value just for the sake of consistency
      // these are duplicates that shall not exist but for some reason do
      // TODO ignore errors
      await Promise.all(currentDocumentInfo.map(async (v) => {
        if (v !== greaterCurrentDocumentInfo) {
          try {
            await this.deleteDocument(itemDefinition, v.language, id, version);
          } catch (err) {
            logger.error(
              {
                className: "ItemizeElasticClient",
                methodName: "updateDocument",
                message: "Could not delete an invalid duplicate document for " + mergedId + " at " + v.index,
                serious: true,
                err,
              }
            );
          }
        }
      }));

      // if the values in elastic are somehow greater than us, well then that
      // is the real value and this update is flawed
      if (greaterValueIsMoreOrEqualToUs) {
        return;
      }
    }

    // if it doesn't match the language then we must delete the old one
    // because this document should be in the correct language and the right index
    if (greaterCurrentDocumentInfo && greaterCurrentDocumentInfo.language !== language) {
      // deleting because it doesn't match the language but otherwise proceeding
      // with the update
      // TODO ignore errors
      await this.deleteDocument(itemDefinition, greaterCurrentDocumentInfo.language, id, version);
      greaterCurrentDocumentInfo = null;
    }

    // we proceed
    const mergedId = id + "." + (version || "");
    const elasticFormIdef = convertSQLValueToElasticSQLValueForItemDefinition(
      this.serverData,
      null,
      idef,
      newValue,
    );

    const qualifiedNameIdef = idef.getQualifiedPathName();
    const indexName = qualifiedNameIdef.toLowerCase() + "_" + (language || "none");

    const updateAction: UpdateRequest = {
      id: mergedId,
      index: indexName,
      doc: elasticFormIdef,
      doc_as_upsert: true,
      refresh: "wait_for" as any,
    };

    if (greaterCurrentDocumentInfo) {
      const seqNoInfo = await this.getSeqNoInfo(greaterCurrentDocumentInfo);
      // was deleted somehow while we were doing this
      if (seqNoInfo.notFound) {

      } else {
        // somehow the document itself changed and was updated while we weren't looking
        // and trying to get this seq no info
        if (seqNoInfo.info.lastModified.greaterThanEqual(updateLastModified)) {
          // cancel it like before
          return;
        }

        // proceed with the update
        delete updateAction.doc_as_upsert;
        updateAction.if_seq_no = seqNoInfo.info.seqNo;
        updateAction.if_primary_term = seqNoInfo.info.primaryTerm;
      }
    }

    try {
      try {
        if (process.env.NODE_ENV === "development") {
          console.log(JSON.stringify(updateAction, null, 2));
        }
        await this.elasticClient.update(updateAction);
      } catch (err) {
        if (err.meta.statusCode === 404) {
          // relying on an error makes it more effective, because this will only truly occur once
          // if the index is missing it will crash and be added here then do it again
          // otherwise we would always check for this index existance which is 2 requests all the time
          // hence worse, this 3 request process is more expensive, but only occurs once
          await this.waitForServerData();
          await this.generateMissingIndexInGroup(indexName, language, this.rootSchema[qualifiedNameIdef]);
          await this.elasticClient.update(updateAction);
        } else if (err.meta.statusCode === 409) {
          CAN_LOG_DEBUG && logger.debug(
            {
              className: "ItemizeElasticClient",
              methodName: "updateDocument",
              message: "Race condition at " + idef.getQualifiedPathName() + " detected",
              data: {
                id,
                version,
                language,
              },
            }
          );
          // so we got an error that we ran into a race condition
          // likely it got updated by something so the seqno didn't match, but was that something newer
          // than us? we will have to check again!
          await this.updateDocument(idef, language, id, version, newValue);
        } else {
          // some other weird error
          throw err;
        }
      }
    } catch (err) {
      logger.error(
        {
          className: "ItemizeElasticClient",
          methodName: "updateDocument",
          message: "Could not create an elastic document for " + mergedId + " at " + indexName,
          serious: true,
          err,
        }
      );
    }
  }

  /**
   * 
   * @param itemDefinition 
   * @param language 
   * @param id 
   * @param version 
   * @param value 
   * @returns 
   */
  public createDocument(
    itemDefinition: string | ItemDefinition,
    language: string,
    id: string,
    version: string,
    value?: ISQLTableRowValue,
  ) {
    // we cheat and pass the same as the original and target language
    // so that the old version is not checked for whatever it is
    return this.updateDocument(itemDefinition, language, id, version, value);
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
    itemDefinitionOrModule: string | ItemDefinition | Module | Array<string | ItemDefinition | Module | IElasticSelectBuilderArg>,
    selecter: (builder: ElasticQueryBuilder) => void,
    language?: string,
  ) {
    if (!Array.isArray(itemDefinitionOrModule)) {
      const builder = this.getSelectBuilder({
        itemOrModule: itemDefinitionOrModule,
        language,
      });
      selecter(builder);
      return await this.executeQuery(builder);
    } else {
      const builder = this.getSelectBuilder(...itemDefinitionOrModule.map((v) => (
        typeof (v as IElasticSelectBuilderArg).itemOrModule !== "undefined" ? (v as IElasticSelectBuilderArg) : {
          itemOrModule: v as any,
          language,
        }
      )));
      selecter(builder);
      return await this.executeQuery(builder);
    }
  }

  public getSelectBuilder(...selects: Array<IElasticSelectBuilderArg | string>) {
    let indexToUse: string = "";
    let indices_boost: any = null;

    selects.forEach((s) => {
      const idefOrMod = typeof s === "string" ? this.root.registry[s] :
        (typeof s.itemOrModule === "string" ? this.root.registry[s.itemOrModule] : s.itemOrModule);
      const language = typeof s === "string" ? "*" : (s.language || "*");

      let foundIndexes: string[] = [];

      if (idefOrMod instanceof Module) {
        // these types should have been checked by the search function already
        // and so we can assume they are safe
        let typesToReadFrom = typeof s !== "string" ? (s.types || idefOrMod.getAllChildItemDefinitions()) : idefOrMod.getAllChildItemDefinitions();
        if (indexToUse) {
          indexToUse += ",";
        }
        foundIndexes = typesToReadFrom.map((t) => {
          const v = typeof t === "string" ? this.root.registry[t] as ItemDefinition : t;
          if (!v.isSearchEngineEnabled()) {
            return null;
          }
          return v.getQualifiedPathName().toLowerCase() + "_" + language;
        }).filter((v) => v);
        indexToUse += foundIndexes.join(",");
      } else if (idefOrMod instanceof ItemDefinition) {
        if (indexToUse) {
          indexToUse += ",";
        }
        foundIndexes = [idefOrMod.getQualifiedPathName().toLowerCase() + "_" + language];
        indexToUse += foundIndexes[0];
      } else {
        throw new Error("Unknown item or module being selected at elasticsearch query");
      }

      if (typeof s !== "string" && typeof s.boost === "number") {
        if (!indices_boost) {
          indices_boost = [];
        }
        foundIndexes.forEach((i) => {
          indices_boost.push({
            [i]: s.boost,
          });
        });
      }
    });

    const builder = new ElasticQueryBuilder({
      index: indexToUse,
    });

    if (indices_boost) {
      builder.request.indices_boost = indices_boost;
    }

    return builder;
  }

  public async executeQuery(elasticQuery: ElasticQueryBuilder, options: ElasticRequestOptions = {}) {
    const request = elasticQuery.getRequest(options);
    if (process.env.NODE_ENV === "development") {
      console.log(JSON.stringify(request, null, 2));
    }
    const response = await this.elasticClient.search<ISQLTableRowValue>(request);
    return response;
  }

  public async executeCountQuery(elasticQuery: ElasticQueryBuilder, options: ElasticRequestOptions = {}) {
    const request = elasticQuery.getRequest(options);
    if (process.env.NODE_ENV === "development") {
      console.log(JSON.stringify(request, null, 2));
    }
    const response = await this.elasticClient.count(request);
    return response;
  }

  public async guessGeoIpFor(ip: string): Promise<{
    continent_name?: string,
    region_iso_code?: string,
    city_name?: string,
    country_iso_code?: string,
    country_name?: string,
    region_name?: string,
    location?: {
      lon: number,
      lat: number,
    },
  }> {
    const response = await this.elasticClient.ingest.simulate({
      pipeline: {
        processors: [
          {
            geoip: {
              field: "ip",
            } as any,
          },
        ],
      },
      docs: [
        {
          _source: {
            ip: ip,
          }
        }
      ]
    });

    const doc =
      response.docs &&
      response.docs[0] &&
      response.docs[0].doc &&
      response.docs[0].doc._source &&
      response.docs[0].doc._source.geoip;

    return doc || null;
  }

  public async guessLanguageFor(text: string): Promise<{
    prediction_score: string,
    model_id: string,
    prediction_probability: string,
    predicted_value: string
  }> {
    if (!text || text.length < 10) {
      return null;
    }

    const srcToUse = text.length > 300 ? text.substring(0, 300) : text;

    const response = await this.elasticClient.ingest.simulate({
      pipeline: {
        processors: [
          {
            inference: {
              model_id: "lang_ident_model_1"
            }
          } as any
        ],
      },
      docs: [
        {
          _source: {
            text: srcToUse,
          }
        }
      ]
    });

    const doc =
      response.docs &&
      response.docs[0] &&
      response.docs[0].doc &&
      response.docs[0].doc._source &&
      response.docs[0].doc._source.ml &&
      response.docs[0].doc._source.ml.inference;

    // can happen for cases eg. when adding symbols and nothing of content
    // for a language to be interpreted from
    if (!doc || doc.predicted_value === "zxx") {
      return null;
    }

    return doc;
  }
}

/**
 * The subbuilder function
 * return a boolean value (specifically false)
 * to prevent adding itself to the children list
 * 
 * this will prevent the element for existing as a child
 */
type SubBuilderFn = (sb: ElasticQueryBuilder) => boolean | void;

interface IElasticBasicOptions {
  boost?: number;

  // identifier
  groupId?: string;
  propertyId?: string;
  uniqueId?: string;
}

export interface IElasticChildrenRule {
  type: string;
  builder: ElasticQueryBuilder;
  q: QueryDslQueryContainer;
  groupId: string;
  propertyId: string;
  uniqueId: string;
  boost: number;
  agg: {
    [aggId: string]: AggregationsAggregationContainer
  };
  aggId: string;
};

function ignoreChecker(c: IElasticChildrenRule, options: ElasticRequestOptions, rule: string, matchRule: string, onlyAggs: boolean, noAggs: boolean): boolean {
  return (
    // must have been specified
    options[rule] &&
    (onlyAggs ? c.agg : (noAggs ? !c.agg : true)) &&
    // if it's array check if included within the array
    (Array.isArray(options[rule]) ? options[rule].includes(c[matchRule]) : (
      // if it's boolean check that it simply exists
      // otherwise check the value matches exact
      options[rule] === true ? !!c[matchRule] : (options[rule] === c[matchRule])
    ))
  );
}

export class ElasticQueryBuilder {
  public request: SearchRequest;
  private children: IElasticChildrenRule[] = [];
  private highlights: IElasticHighlightReply = {};

  constructor(request: SearchRequest) {
    this.request = request;
    if (!this.request.query) {
      this.request.query = {};
    }
  }

  public getRequest(options: ElasticRequestOptions = {}) {
    let resultRequest: SearchRequest = {
      ...this.request,
      query: {
        ...this.request.query,
      }
    };

    if (!resultRequest.query.bool) {
      resultRequest.query.bool = {};
    }

    if (!this.children.length) {
      return resultRequest;
    }

    this.children.forEach((c) => {
      if (
        ignoreChecker(c, options, "ignoreAllInGroup", "groupId", false, false) ||
        ignoreChecker(c, options, "ignoreAllInPropertyId", "propertyId", false, false) ||
        ignoreChecker(c, options, "ignoreUniqueId", "uniqueId", false, false) ||
        ignoreChecker(c, options, "ignoreAllInGroupOnlyAggs", "groupId", true, false) ||
        ignoreChecker(c, options, "ignoreAllInPropertyIdOnlyAggs", "propertyId", true, false) ||
        ignoreChecker(c, options, "ignoreAllInGroupOnlyQuery", "groupId", false, true) ||
        ignoreChecker(c, options, "ignoreAllInPropertyIdOnlyQuery", "propertyId", false, true)
      ) {
        return;
      }

      if (c.type !== "agg") {
        if (!resultRequest.query.bool[c.type]) {
          resultRequest.query.bool[c.type] = [];
        }

        if (c.builder) {
          const cRequest = c.builder.getRequest(options);

          if (cRequest.query && Object.keys(cRequest.query).length !== 0) {
            resultRequest.query.bool[c.type].push(cRequest.query);
          }

          if (!options.noHighlights && cRequest.highlight && cRequest.highlight.fields) {
            resultRequest.highlight = resultRequest.highlight || {
              fields: {},
            }
            Object.keys(cRequest.highlight.fields).forEach((highlightKey) => {
              resultRequest.highlight.fields[highlightKey] = cRequest.highlight.fields[highlightKey];
            });
          }
        } else {
          let queryToUse = c.q;
          if (typeof c.boost === "number") {
            queryToUse = {
              bool: {
                must: c.q,
                boost: c.boost,
              }
            }
          }

          (resultRequest.query.bool[c.type] as QueryDslQueryContainer[]).push(queryToUse);
        }
      } else {
        if (!resultRequest.aggs) {
          resultRequest.aggs = {};
        }

        if (c.q) {
          resultRequest.aggs[c.aggId] = {
            filter: c.q,
            aggs: c.agg,
          }
        } else if (c.builder) {
          const cRequest = c.builder.getRequest(options.ignoresDoNotApplyToAggregations ? {} : options);

          if (cRequest.query && Object.keys(cRequest.query).length !== 0) {
            resultRequest.aggs[c.aggId] = {
              filter: cRequest.query,
              aggs: c.agg,
            }
          } else {
            Object.keys(c.agg).forEach((k) => {
              resultRequest.aggs[k] = c.agg[k];
            });
          }
        } else {
          Object.keys(c.agg).forEach((k) => {
            resultRequest.aggs[k] = c.agg[k];
          });
        }
      }
    });

    if (!options.noHighlights && this.highlights && Object.keys(this.highlights).length !== 0) {
      resultRequest.highlight = resultRequest.highlight || {
        fields: {},
      }
      Object.keys(this.highlights).forEach((highlightKey) => {
        if (options.fullHighlights) {
          resultRequest.highlight.fields[highlightKey] = {
            fragment_size: options.fullHighlights,
            pre_tags: "<b>",
            post_tags: "</b>"
          } as any;
        } else {
          resultRequest.highlight.fields[highlightKey] = {
            fragment_size: 1,
            pre_tags: "",
            post_tags: ""
          } as any;
        }
      });
    }

    if (options.onlyAggregations) {
      resultRequest.size = 0;
      resultRequest._source = [];
      resultRequest.sort = [];
    }

    return resultRequest;
  }

  private _q(q: QueryDslQueryContainer | SubBuilderFn, type: string, options: IElasticBasicOptions = {}) {
    if (typeof q === "function") {
      const child = new ElasticQueryBuilder({});
      const shouldAdd = q(child);
      if (shouldAdd === false) {
        return;
      }
      this.children.push({
        builder: child,
        q: null,
        type,
        groupId: options.groupId || null,
        propertyId: options.propertyId || null,
        uniqueId: options.uniqueId || null,
        boost: options.boost,
        agg: null,
        aggId: null,
      });
    } else {
      this.children.push({
        type,
        q,
        builder: null,
        groupId: options.groupId || null,
        propertyId: options.propertyId || null,
        uniqueId: options.uniqueId || null,
        boost: options.boost,
        agg: null,
        aggId: null,
      });
    }
  }

  public must(q: QueryDslQueryContainer | SubBuilderFn, options: IElasticBasicOptions = {}) {
    this._q(q, "must", options);
  }

  public mustNot(q: QueryDslQueryContainer | SubBuilderFn, options: IElasticBasicOptions = {}) {
    this._q(q, "must_not", options);
  }

  public should(q: QueryDslQueryContainer | SubBuilderFn, options: IElasticBasicOptions = {}) {
    this._q(q, "should", options);
  }

  public shouldNot(q: QueryDslQueryContainer | SubBuilderFn, options: IElasticBasicOptions = {}) {
    this._q(q, "should_not", options);
  }

  public mustTerm(termRule: Partial<Record<string, QueryDslTermQuery | FieldValue>>, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      term: termRule,
    };

    this.must(query, options);
  }

  public mustNotTerm(termRule: Partial<Record<string, QueryDslTermQuery | FieldValue>>, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      term: termRule,
    };
    this.mustNot(query, options);
  }

  public mustTerms(termsRule: QueryDslTermsQuery, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      terms: termsRule,
    };
    this.must(query, options);
  }

  public mustNotTerms(termsRule: QueryDslTermsQuery, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      terms: termsRule,
    };
    this.mustNot(query, options);
  }

  public mustMatch(matchRule: Partial<Record<string, string | number | boolean | QueryDslMatchQuery>>, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      match: matchRule,
    };
    this.must(query, options);
  }

  public mustNotMatch(matchRule: Partial<Record<string, string | number | boolean | QueryDslMatchQuery>>, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      match: matchRule,
    };
    this.mustNot(query, options);
  }

  public mustMatchPhrase(matchRule: Partial<Record<string, string | QueryDslMatchPhraseQuery>>, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      match_phrase: matchRule,
    };
    this.must(query, options);
  }

  public mustNotMatchPhrase(matchRule: Partial<Record<string, string | QueryDslMatchPhraseQuery>>, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      match_phrase: matchRule,
    };
    this.mustNot(query, options);
  }

  public mustMatchPhrasePrefix(matchRule: Partial<Record<string, string | QueryDslMatchPhraseQuery>>, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      match_phrase_prefix: matchRule,
    };
    this.must(query, options);
  }

  public mustNotMatchPhrasePrefix(matchRule: Partial<Record<string, string | QueryDslMatchPhraseQuery>>, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      match_phrase_prefix: matchRule,
    };
    this.mustNot(query, options);
  }

  public shouldTerm(termRule: Partial<Record<string, QueryDslTermQuery | FieldValue>>, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      term: termRule,
    };

    this.should(query, options);
  }

  public shouldNotTerm(termRule: Partial<Record<string, QueryDslTermQuery | FieldValue>>, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      term: termRule,
    };
    this.shouldNot(query, options);
  }

  public shouldTerms(termsRule: QueryDslTermsQuery, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      terms: termsRule,
    };
    this.should(query, options);
  }

  public shouldNotTerms(termsRule: QueryDslTermsQuery, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      terms: termsRule,
    };
    this.shouldNot(query, options);
  }

  public shouldMatch(matchRule: Partial<Record<string, string | number | boolean | QueryDslMatchQuery>>, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      match: matchRule,
    };
    this.should(query, options);
  }

  public shouldNotMatch(matchRule: Partial<Record<string, string | number | boolean | QueryDslMatchQuery>>, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      match: matchRule,
    };
    this.shouldNot(query, options);
  }

  public shouldMatchPhrase(matchRule: Partial<Record<string, string | QueryDslMatchPhraseQuery>>, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      match_phrase: matchRule,
    };
    this.should(query, options);
  }

  public shouldNotMatchPhrase(matchRule: Partial<Record<string, string | QueryDslMatchPhraseQuery>>, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      match_phrase: matchRule,
    };
    this.shouldNot(query, options);
  }

  public shouldMatchPhrasePrefix(matchRule: Partial<Record<string, string | QueryDslMatchPhraseQuery>>, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      match_phrase_prefix: matchRule,
    };
    this.should(query, options);
  }

  public shouldNotMatchPhrasePrefix(matchRule: Partial<Record<string, string | QueryDslMatchPhraseQuery>>, options: IElasticBasicOptions = {}) {
    const query: QueryDslQueryContainer = {
      match_phrase_prefix: matchRule,
    };
    this.shouldNot(query, options);
  }

  public mustNotBeBlocked() {
    this.mustTerm({
      "blocked_by": "?NULL",
    });
  }

  public mustBeCreatedBy(userid: string) {
    this.mustTerm({
      "created_by": userid,
    });
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

  public setFrom(from: number) {
    if (from !== 0) {
      this.request.from = from;
    }
  }

  public setHighlightsOn(reply: IElasticHighlightReply) {
    const fields = Object.keys(reply);
    if (fields && fields.length) {
      fields.forEach((f) => {
        this.highlights[f] = reply[f];
      });
    }
  }

  public getHighlightInfo(options: ElasticRequestOptions = {}) {
    if (options.noHighlights) {
      return {};
    }

    const baseHighlights = { ...this.highlights };

    this.children && this.children.forEach((c) => {
      if (
        ignoreChecker(c, options, "ignoreAllInGroup", "groupId", false, false) ||
        ignoreChecker(c, options, "ignoreAllInPropertyId", "propertyId", false, false) ||
        ignoreChecker(c, options, "ignoreUniqueId", "uniqueId", false, false) ||
        ignoreChecker(c, options, "ignoreAllInGroupOnlyAggs", "groupId", true, false) ||
        ignoreChecker(c, options, "ignoreAllInPropertyIdOnlyAggs", "propertyId", true, false) ||
        ignoreChecker(c, options, "ignoreAllInGroupOnlyQuery", "groupId", false, true) ||
        ignoreChecker(c, options, "ignoreAllInPropertyIdOnlyQuery", "propertyId", false, true)
      ) {
        return;
      }

      if (!c.agg && c.builder) {
        const addedHighlights = c.builder.getHighlightInfo(options);
        Object.assign(baseHighlights, addedHighlights);
      }
    });

    return baseHighlights;
  }

  public getAllChildrenForGroupId(id: string): IElasticChildrenRule[] {
    return this.children.filter((r) => r.groupId === id);
  }

  public getAllChildrenForPropertyId(id: string): IElasticChildrenRule[] {
    return this.children.filter((r) => r.propertyId === id);
  }

  public getChildForUniqueId(id: string): IElasticChildrenRule {
    return this.children.find((r) => r.uniqueId === id) || null;
  }

  public removeAllChildrenForGroupId(id: string) {
    this.children = this.children.filter((r) => r.groupId !== id);
  }

  public removeAllChildrenForPropertyId(id: string) {
    this.children = this.children.filter((r) => r.propertyId !== id);
  }

  public removeChildForUniqueId(id: string) {
    this.children = this.children.filter((r) => r.uniqueId !== id);
  }

  public removeChild(q: QueryDslQueryContainer | ElasticQueryBuilder) {
    this.children = this.children.filter((r) => r.q !== q && r.builder !== q);
  }

  public getAllChildrenWithPropertyId(options: { but?: string | string[], noAgg?: boolean, noQuery?: boolean, includeWithoutPropertyId?: boolean } = {}) {
    return this.children.filter((r) => {
      if (!r.propertyId && options.includeWithoutPropertyId) {
        return true;
      }

      return (
        !!r.propertyId && (options.but ? (Array.isArray(options.but) ? !options.but.includes(r.propertyId) : r.propertyId !== options.but) : true) &&
        (options.noAgg ? !r.agg : true) && (options.noQuery ? !!r.agg : true)
      );
    });
  }

  public getAllChildrenWithGroupId(options: { but?: string | string[], noAgg?: boolean, noQuery?: boolean, includeWithoutGroupId?: boolean } = {}) {
    return this.children.filter((r) => {
      if (!r.groupId && options.includeWithoutGroupId) {
        return true;
      }
      return (
        !!r.groupId && (options.but ? (Array.isArray(options.but) ? !options.but.includes(r.groupId) : r.groupId !== options.but) : true) &&
        (options.noAgg ? !r.agg : true) && (options.noQuery ? !!r.agg : true)
      )
    });
  }

  public getAllChildrenWithUniqueId() {
    return this.children.filter((r) => !!r.uniqueId);
  }

  public addChildren(c: IElasticChildrenRule | IElasticChildrenRule[]) {
    if (Array.isArray(c)) {
      c.forEach((sb) => this.children.push(sb));
    } else {
      this.children.push(c);
    }
  }

  public addAggregations(
    id: string,
    agg: Record<string, AggregationsAggregationContainer>,
    filter?: QueryDslQueryContainer | SubBuilderFn,
    options: IElasticBasicOptions = {},
  ) {
    if (!filter || typeof filter !== "function") {
      this.children.push({
        agg,
        boost: null,
        builder: null,
        q: filter as QueryDslQueryContainer || null,
        aggId: id,
        groupId: options.groupId || null,
        propertyId: options.propertyId || null,
        type: "agg",
        uniqueId: options.uniqueId || null,
      });
      return;
    }

    const builder = new ElasticQueryBuilder({});
    filter(builder);

    this.children.push({
      agg,
      boost: null,
      builder,
      q: null,
      aggId: id,
      groupId: options.groupId || null,
      propertyId: options.propertyId || null,
      type: "agg",
      uniqueId: options.uniqueId || null,
    });
  }

  public addAggregation(
    id: string,
    agg: AggregationsAggregationContainer,
    filter?: QueryDslQueryContainer | SubBuilderFn,
    options: IElasticBasicOptions = {},
  ) {
    return this.addAggregations(id, {
      [filter ? "result" : id]: agg,
    }, filter, options);
  }

  public removeAggregation(id: string) {
    this.children = this.children.filter((f) => f.agg && f.aggId === id);
  }

  public removeAggregations() {
    this.children = this.children.filter((f) => !f.agg);
  }

  public removeHighlights() {
    this.highlights = {};
  }

  public clone(): ElasticQueryBuilder {
    const r = new ElasticQueryBuilder(copy(this.request));
    r.children = [...this.children];
    r.highlights = this.highlights;
    return r;
  }
}

function copy(element: any): any {
  if (typeof element !== 'object') {
    return element
  }
  if (Array.isArray(element)) {
    return [...element].map(copy)
  }
  const copyObj = {};
  for (const prop in element) {
    copyObj[prop] = copy(element[prop]);
  }
  return copyObj
}