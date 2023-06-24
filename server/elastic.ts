import type { Client } from "@elastic/elasticsearch";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import Module from "../base/Root/Module";
import type { ItemizeRawDB } from "./raw-db";
import type Root from "../base/Root";
import { getElasticSchemaForRoot, IElasticIndexDefinitionType, IElasticSchemaDefinitionType, ISQLTableRowValue } from "../base/Root/sql";
import { logger } from "./logger";
import equals from "deep-equal";
import { convertSQLValueToElasticSQLValueForItemDefinition } from "../base/Root/Module/ItemDefinition/sql";
import { DELETED_REGISTRY_IDENTIFIER, SERVER_ELASTIC_PING_INTERVAL_TIME } from "../constants";
import { CAN_LOG_DEBUG, INSTANCE_UUID } from "./environment";
import { NanoSecondComposedDate } from "../nanodate";
import { AggregationsAggregationContainer, FieldValue, QueryDslMatchPhraseQuery, QueryDslMatchQuery, QueryDslQueryContainer, QueryDslTermQuery, QueryDslTermsQuery, SearchRequest } from "@elastic/elasticsearch/lib/api/types";
import { setInterval } from "timers";
import type { IElasticHighlightReply } from "../base/Root/Module/ItemDefinition/PropertyDefinition/types";

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
  ignoresDoNotApplyToAggregations?: boolean;
};

export interface IElasticPing<N> {
  statusIndex: string;
  dataIndex: string;
  data: N;
}

interface IElasticPingSetter<N, T> extends IElasticPing<N> {
  statusRetriever: () => T;
}

export interface IPingEvent<N, T> extends IElasticPing<N> {
  status: T;
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

  private pings: IElasticPingSetter<any, any>[] = [];
  private pingsInitialDataSet: boolean[] = [];

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

    setInterval(this.executePings.bind(this), SERVER_ELASTIC_PING_INTERVAL_TIME);
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
    if (!this.prepareInstancePromise) {
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
              await this._rebuildIndexGroup(r, shemaInfo);
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
    }

    if (!indexInfo) {
      logger.info(
        {
          className: "ItemizeElasticClient",
          methodName: "_rebuildIndexGroup",
          message: "Index group for " + qualifiedName + " status to be created",
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
            message: "Index group for " + qualifiedName + " deemed missing, but mapping found, destructive actions taken",
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
        await this._runConsistencyCheck(actualOnElement, new Date(), 0, null, {});
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
    const limiters = idef.getSearchLimiters(true);

    // check that the status matches the correct signature during the first batch
    if (batchNumber === 0) {
      let currentSignature: any = null;
      try {
        currentSignature = statusInfo ? JSON.parse(statusInfo.signature) : null;
      } catch {
      }
      const expectedSignature = {
        limiters,
      }

      const equalSignature = equals(expectedSignature, currentSignature);

      // it doesn't rebuild it up
      if (!statusInfo || !equalSignature) {
        await this._rebuildIndexGroup(
          qualifiedPathName,
          this.rootSchema[qualifiedPathName],
        );
        statusInfo = {
          lastConsistencyCheck: null,
          signature: JSON.stringify(expectedSignature),
        }
      }
    }

    const baseIndexPrefix = qualifiedPathName.toLowerCase() + "_";
    const wildcardIndexName = baseIndexPrefix + "*";

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
      const documentsDeletedSinceLastRan = await this.rawDB.databaseConnection.queryRows(
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

    const expectedLanguageColumn = idef.getSearchEngineDynamicMainLanguageColumn();
    const limitedColumns = idef.getSearchEngineLimitedColumns(limiters);

    // no last consistency check then we gotta retrieve the whole thing because
    // we want whole data this one round
    const useModuleOnly = limitedColumns.idef.length || statusInfo.lastConsistencyCheck === null ? false : (
      // otherwise it depends if we got a language column, it will depend on wether such column
      // is in the module, otherwise we can be free to use module only
      expectedLanguageColumn ? idef.isSearchEngineDynamicMainLanguageColumnInModule() : true
    );

    // now we can do the select
    // we only select 100 as limit when doing a initial consistency check
    // that we have never done before because of the reason below in the comment
    // we are getting more data
    const limit = statusInfo.lastConsistencyCheck === null ? 100 : 1000;
    const offset = batchNumber * limit;
    const documentsCreatedOrModifiedSinceLastRan = await this.rawDB.performRawDBSelect(
      useModuleOnly ? idef.getParentModule() : idef,
      (selecter) => {
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
          // otherwise we assume our data isn't corrupted, and just select what
          // we need making a minimal query
          selecter.select(...columnsToSelect);
        }

        // now we can decide what we select for
        // maybe it is everything, kind of scary
        const whereBuilder = selecter.whereBuilder;
        if (statusInfo.lastConsistencyCheck) {
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

        // TODO change limit offset to cursor, limit offset is wasteful
        // it would nevertheless work to keep consistency
        selecter.limit(limit).offset(offset);
        selecter.orderByBuilder.orderByColumn("created_at", "ASC", "FIRST");
      }
    );
    const hasNextBatch = documentsCreatedOrModifiedSinceLastRan.length === limit;
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
          isSearchLimited: idef.shouldRowBeIncludedInSearchEngine(r, limiters),
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
        size: arrayOfIds.length,
      });

      const baseIndexPrefixLen = baseIndexPrefix.length;
      const missingFromResults: string[] = [];
      const extraAtResults: string[] = [];
      arrayOfIds.forEach((id) => {
        if (resultObj[id].isSearchLimited) {
          const isThere = (
            comparativeResults.hits.hits.some((hit) => {
              return hit._id === id;
            })
          )
          if (isThere) {
            extraAtResults.push(id);
          }
        } else {
          const isMissing = (
            !comparativeResults.hits.hits.some((hit) => {
              const isSameId = hit._id === id;

              if (!isSameId) {
                return false;
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

              // the old value will be removed by notMissingButOutdated
              // check for isInTheWrongLanguage for that check that comes just next
              return isSameLanguage;
            })
          );

          if (isMissing) {
            missingFromResults.push(id);
          }
        }
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
        const isOutdated = corruptRecord ? true : objectInfo.lastModified.notEqual(lastModified);

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
            {
              className: "ItemizeElasticClient",
              methodName: "runConsistencyCheck",
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
          notMissingButOutdated.push(hit._id);
        }
      });

      // extra documents that shouldn't be there
      if (extraAtResults.length) {
        // these are disrespecting the limiters and shouldn't be there anymore to begin with
        await this.deleteDocumentsUnknownLanguage(
          idef,
          extraAtResults,
        );
      }

      // if we have any of these mising or missing but outdated
      if (missingFromResults.length + notMissingButOutdated.length) {
        // we are going to loop over both
        const operations = (await Promise.all(missingFromResults.concat(notMissingButOutdated).map(async (id) => {
          // let's get the info we got from our database
          const objectInfo = resultObj[id];
          // and now let's get the value for this row, if the last consistency check is null
          // this means that is cheekily stored in the object info already because
          // we did a strong select with everything
          const knownValue = statusInfo.lastConsistencyCheck === null ? objectInfo.r : (
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
            null,
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
            {
              className: "ItemizeElasticClient",
              methodName: "runConsistencyCheck",
              message: "Operation for " + qualifiedPathName + " has been added",
              data: {
                operation: isOutdated ? "update" : "create",
                index: indexItWillBelongTo,
                id,
              },
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
          {
            className: "ItemizeElasticClient",
            methodName: "runConsistencyCheck",
            message: "Did not recieve any new documents (that are missing or outdated in elastic) for " + qualifiedPathName,
          },
        );
      }

      if (bulkOperations.length) {
        logger.info(
          {
            className: "ItemizeElasticClient",
            methodName: "runConsistencyCheck",
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
                methodName: "runConsistencyCheck",
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
                const error = (o.create && o.create.error && o.create.status !== 409 && o.create.error) ||
                  (o.update && o.update.error) ||
                  (o.delete && o.delete.error && o.delete.status !== 404 && o.delete.error);

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
              methodName: "runConsistencyCheck",
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
            methodName: "runConsistencyCheck",
            message: "Did not recieve any bulk operations for " + qualifiedPathName,
          },
        );
      }
    } else if (CAN_LOG_DEBUG) {
      logger.debug(
        {
          className: "ItemizeElasticClient",
          methodName: "runConsistencyCheck",
          message: "Did not recieve any new documents since nothing has changed since last check for " + qualifiedPathName,
        },
      );
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

      // this will throw the error that occured in this layer
      // but will allow to keep processing the other batches
      // whatever happened hopefully will fix itself on the next
      // consistency check round, but we tried to update and fix
      // as many records as possible
      if (error) {
        throw error;
      }
    }

    // we can update our timestamp if we are the initial and not some batch
    // this wil not occur if an error is triggered
    // causing it to retry from the same point
    if (batchNumber === 0) {
      await this.setIndexStatusInfo(
        qualifiedPathName,
        {
          lastConsistencyCheck: timeRan.toISOString(),
          signature: JSON.stringify({
            limiters: limiters,
          })
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
   * 
   * The execution will not do a thing if
   * 1. the item itself is not search engine enabled
   * 2. it's determined that it doesn't pass the specified limiter
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
      {
        className: "ItemizeElasticClient",
        methodName: "updateDocument",
        message: "Document for " + idef.getQualifiedPathName() + " to be updated with new data",
        data: {
          id,
          version,
          language,
          originalLanguage,
        },
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

    // CHECKING LIMITERS
    const combinedLimiters = idef.getSearchLimiters(true);
    const shouldBeIncluded = idef.shouldRowBeIncludedInSearchEngine(newValue, combinedLimiters, true);

    if (!shouldBeIncluded) {
      // denied to limiters however it could just have been a change
      // where it is now limited, and we will safely try to remove any potential value
      // there is for this row, this is a bit crazy because this means that every time the user
      // creates or updates something and it will not be included in the search engine
      // because it is request limited, it will launch a delete query, but what other option we have here?
      // we don't know the current value in elasticsearch!... we can't check if it's there or not without doing
      // a request, so telling it to delete is just cheaper than checking if it's there and then delete, that's two
      // request, vs one request to delete
      await this.deleteDocument(itemDefinition, language, id, version);
      return;
    }

    const mergedId = id + "." + (version || "");
    const elasticFormIdef = convertSQLValueToElasticSQLValueForItemDefinition(
      this.serverData,
      null,
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
      refresh: "wait_for" as any,
    };

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
    if (idefOrMod instanceof Module) {
      // these types should have been checked by the search function already
      // and so we can assume they are safe
      let typesToReadFrom = types || idefOrMod.getAllChildItemDefinitions();
      indexToUse = typesToReadFrom.map((t) => {
        const v = typeof t === "string" ? this.root.registry[t] as ItemDefinition : t;
        if (!v.isSearchEngineEnabled()) {
          return null;
        }
        return v.getQualifiedPathName().toLowerCase() + "_" + (language || "*");
      }).filter((v) => v).join(",");
    } else if (idefOrMod instanceof ItemDefinition) {
      indexToUse = idefOrMod.getQualifiedPathName().toLowerCase() + "_" + (language || "*");
    }

    const builder = new ElasticQueryBuilder({
      index: indexToUse,
    });

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

  // ping functionality
  public createPing<N, T>(setter: IElasticPingSetter<N, T>) {
    if (setter.dataIndex.startsWith("mod_")) {
      throw new Error("Index name for a ping cannot start with 'mod_' as in " + setter.dataIndex);
    } else if (setter.statusIndex.startsWith("mod_")) {
      throw new Error("Index status name for a ping cannot start with 'mod_' as in " + setter.statusIndex);
    } else if (setter.dataIndex === "status" || setter.dataIndex === "logs") {
      throw new Error("Index name for a ping cannot be " + setter.dataIndex);
    } else if (setter.statusIndex === "status" || setter.statusIndex === "logs") {
      throw new Error("Index status name for a ping cannot be " + setter.dataIndex);
    }
    this.pings.push(setter);
    this.pingsInitialDataSet.push(false);
  }

  private async executePing(index: number) {
    const setter = this.pings[index];
    const initialDataSet = this.pingsInitialDataSet[index];

    if (!initialDataSet) {
      const initialData = { ...setter.data };
      initialData.timestamp = (new Date()).toISOString();

      try {
        await this.elasticClient.index({
          index: setter.dataIndex,
          id: INSTANCE_UUID,
          document: initialData,
        });
        this.pingsInitialDataSet[index] = true;
      } catch (err) {
        logger.error(
          {
            className: "ItemizeElasticClient",
            methodName: "executePing",
            message: "Could not execute a given ping initial data",
            serious: true,
            err,
          }
        );
      }
    }

    try {
      const status = setter.statusRetriever();
      status.instanceId = INSTANCE_UUID;
      status.timestamp = (new Date()).toISOString();

      await this.elasticClient.index({
        index: setter.statusIndex,
        document: status,
      });
    } catch (err) {
      logger.error(
        {
          className: "ItemizeElasticClient",
          methodName: "executePing",
          message: "Could not execute a ping",
          serious: true,
          err,
        }
      );
    }
  }

  private async executePings() {
    await Promise.all(this.pings.map((p, index) => this.executePing(index)));
  }

  public async getAllStoredPingsAt<N>(dataIndex: string) {
    const allResults = await this.elasticClient.search<N>({
      index: dataIndex,
    });

    const resultKeyd: { [key: string]: N } = {};

    allResults.hits.hits.forEach((hit) => {
      resultKeyd[hit._id] = hit._source;
    });

    return resultKeyd;
  }

  public async deletePingsFor(dataIndex: string, statusIndex: string, instanceId: string): Promise<"NOT_DEAD" | "OK"> {
    const lastStatusGiven = await this.elasticClient.search({
      index: statusIndex,
      size: 1,
      _source: false,
      query: {
        match: {
          instanceId,
        }
      },
      fields: [
        "timestamp",
      ],
      sort: [
        {
          timestamp: {
            order: "desc",
          }
        } as any,
      ]
    });

    if (lastStatusGiven.hits.total !== 0) {
      const now = (new Date()).getTime();
      const timestamp = (new Date(lastStatusGiven.hits[0].fields.timestamp[0])).getTime();

      const diff = timestamp - now;
      // can't assume dead until 30 seconds have passed
      if (diff <= 30000) {
        return "NOT_DEAD";
      }

      await this.elasticClient.deleteByQuery({
        index: statusIndex,
        query: {
          match: {
            instanceId,
          }
        },
      });
    }

    await this.elasticClient.deleteByQuery({
      index: dataIndex,
      query: {
        term: {
          _id: instanceId,
        }
      },
    });

    return "OK";
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

type SubBuilderFn = (sb: ElasticQueryBuilder) => void;

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
        resultRequest.highlight.fields[highlightKey] = {
          fragment_size: 1,
          pre_tags: "",
          post_tags: ""
        } as any;
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
      q(child);
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

    // if (!this.request.query.bool) {
    //   this.request.query.bool = {};
    // }
    // if (!this.request.query.bool.must) {
    //   this.request.query.bool[type] = [];
    // }

    // let queryToUse = q;
    // if (typeof options.boost === "number") {
    //   queryToUse = {
    //     bool: {
    //       must: q,
    //       boost: options.boost,
    //     }
    //   }
    // }

    // (this.request.query.bool[type] as QueryDslQueryContainer[]).push(queryToUse);
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

  public getAllChildrenWithPropertyId(options: { but?: string, noAgg?: boolean, noQuery?: boolean } = {}) {
    return this.children.filter((r) =>
      !!r.propertyId && (options.but ? r.propertyId !== options.but : true) &&
      (options.noAgg ? !r.agg : true) && (options.noQuery ? !!r.agg : true));
  }

  public getAllChildrenWithGroupId(options: { but?: string, noAgg?: boolean, noQuery?: boolean } = {}) {
    return this.children.filter((r) =>
      !!r.groupId && (options.but ? r.groupId !== options.but : true) &&
      (options.noAgg ? !r.agg : true) && (options.noQuery ? !!r.agg : true));
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