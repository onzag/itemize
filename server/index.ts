/**
 * This is the root server file and does the initialization
 * of the server side of things
 * @module
 */

import express from "express";
import http from "http";
import path from "path";
import fs from "fs";
import Root, { IRootRawJSONDataType, ILangLocalesType } from "../base/Root";
import { IGQLQueryFieldsDefinitionType } from "../base/Root/gql";
import { types } from "pg";
import { SERVER_DATA_IDENTIFIER, CACHED_CURRENCY_RESPONSE, PING_DATA_IDENTIFIER, PING_STATUS_IDENTIFIER } from "../constants";
import PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import { serverSideIndexChecker } from "../base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers";
import { Listener } from "./listener";
import { Cache } from "./cache";
import { ICustomTokensType } from "./custom-graphql";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType, IDBConfigRawJSONDataType, IRedisConfigRawJSONDataType } from "../config";
import { ITriggerRegistry, mergeTriggerRegistries } from "./resolvers/triggers";
import { customUserTriggers } from "./user/triggers";

import build from "../dbbuilder";
import { GlobalManager, InitialExecutionServerDataFn } from "./global-manager";
import { IRendererContext } from "../client/providers/renderer";
import { ILocaleContextType } from "../client/internal/providers/locale-provider";
import { ICollectorType } from "../client";
import { Pool } from "tarn";
import { retrieveRootPool } from "./rootpool";
import { ISEORuleSet } from "./seo";
import { SEOGenerator } from "./seo/generator";
import { initializeApp } from "./initialize";
import { LocalStorageService } from "./services/local-storage";
import { OpenstackService } from "./services/openstack";
import { IPStackService } from "./services/ipstack";
import { MailgunService } from "./services/mailgun";
import { HereMapsService } from "./services/here";
import { CurrencyLayerService } from "./services/currency-layer";
import { FakeMailService } from "./services/fake-mail";
import { ServiceProvider, IServiceProviderClassType, ServiceProviderType } from "./services";
import LocationSearchProvider from "./services/base/LocationSearchProvider";
import MailProvider from "./services/base/MailProvider";
import PhoneProvider from "./services/base/PhoneProvider";
import type LoggingProvider from "./services/base/LoggingProvider";
import StorageProvider, { IStorageProvidersObject } from "./services/base/StorageProvider";
import UserLocalizationProvider from "./services/base/UserLocalizationProvider";
import { RegistryService } from "./services/registry";
import { ItemizeRedisClient, setupRedisClient } from "./redis";
import { ICustomRoleType } from "./resolvers/roles";
import { ItemizeRawDB } from "./raw-db";
import CurrencyFactorsProvider from "./services/base/CurrencyFactorsProvider";
import { DatabaseConnection } from "../database";
import PaymentProvider from "./services/base/PaymentProvider";
import { extendLoggerWith, ILoggerType, logger } from "./logger";
import { ManualPaymentService } from "./services/manual-payment";
import { TwilioService } from "./services/twilio";
import { FakeSMSService } from "./services/fake-sms";
import {
  INSTANCE_MODE,
  NODE_ENV,
  USING_DOCKER,
  PING_GOOGLE,
  FAKE_EMAILS,
  FAKE_SMS,
  PORT,
  buildEnvironmentInfo,
  FAKE_USSD,
} from "./environment";
import USSDProvider from "./services/base/USSDProvider";
import { FakeUSSDService } from "./services/fake-ussd";
import { Client } from "@elastic/elasticsearch";
import { ItemizeElasticClient } from "./elastic";
import { ElasticLoggerService } from "./services/elastic-logger";
import { ElasticLocationService } from "./services/elastic-location";

// load the custom services configuration
let serviceCustom: IServiceCustomizationType = {};
try {
  const itemizeConfig = require(path.join(path.resolve("."), "itemize.config"));
  if (itemizeConfig.services) {
    serviceCustom = require(path.resolve(itemizeConfig.services));
    if ((serviceCustom as any).default) {
      serviceCustom = (serviceCustom as any).default;
    }
  }
} catch {
}

// Setting the parsers, postgresql comes with
// its own way to return this data but we don't want it
// we want raw strings
const TIMESTAMP_OID = 1114;
const TIMESTAMPTZ_OID = 1184;
const TIME_OID = 1083;
const DATE_OID = 1082;
types.setTypeParser(TIMESTAMP_OID, (val) => val);
types.setTypeParser(
  TIMESTAMPTZ_OID,
  (val) => {
    // postgreSQL time is not normalized, we are trying here
    // first by splitting the value from the timezone bit
    let splitted = val.split("+");
    let symbol = "+";
    if (splitted.length === 1) {
      splitted = val.split("-");
      symbol = "-";
    }

    // now we need both bits
    let [timePart, zonePart] = splitted;

    // if there's no zone information then it's 0
    if (!zonePart) {
      zonePart = "00:00";
    } else {
      // otherwise we add the missing extra time info
      zonePart += ":00";
    }

    // now we can do this cheaply by having the len
    let len = timePart.length;
    while (len < 26) {
      // if it's 19, basically the shortest it can be
      // then we need to add a dot to add the 6 mising decimals
      if (len === 19) {
        timePart += ".";
      } else {
        // and here we add such decimals
        timePart += "0";
      }
      // and we have just increased the lenght
      len++;
    }

    // once we hit 26 we are done
    return timePart + symbol + zonePart;
  }
);
types.setTypeParser(TIME_OID, (val) => val);
types.setTypeParser(DATE_OID, (val) => val);

// we need the async fs
const fsAsync = fs.promises;

// now in order to build the database in the cheat mode, we don't need express
export const app =
  INSTANCE_MODE === "BUILD_DATABASE" ||
    INSTANCE_MODE === "LOAD_DATABASE_DUMP" ||
    INSTANCE_MODE === "CLEAN_STORAGE" ? null : express();

/**
 * Specifies the SSR configuration for the multiple pages
 */
export interface ISSRConfig {
  rendererContext: IRendererContext;
  mainComponent: React.ReactElement;
  appWrapper?: (app: React.ReactElement, config: IConfigRawJSONDataType) => React.ReactElement;
  mainWrapper?: (mainComponet: React.ReactElement, config: IConfigRawJSONDataType, localeContext: ILocaleContextType) => React.ReactElement;
  collector?: ICollectorType;
  ussdConfig?: {
    rendererContext: IRendererContext;
    mainComponent: React.ReactElement;
    appWrapper?: (app: React.ReactElement, config: IConfigRawJSONDataType) => React.ReactElement;
    mainWrapper?: (mainComponet: React.ReactElement, config: IConfigRawJSONDataType, localeContext: ILocaleContextType) => React.ReactElement;
  },
}

export interface ISEOConfig {
  seoRules: ISEORuleSet;
}

export interface IAppDataType {
  root: Root;
  rootPool: Pool<Root>,
  langLocales: ILangLocalesType;
  ssrConfig: ISSRConfig;
  seoConfig: ISEOConfig;
  indexDevelopment: string;
  indexProduction: string;
  config: IConfigRawJSONDataType;
  sensitiveConfig: ISensitiveConfigRawJSONDataType;
  databaseConfig: IDBConfigRawJSONDataType;
  databaseConnection: DatabaseConnection,
  listener: Listener;
  cache: Cache;
  redis: ItemizeRedisClient;
  redisGlobal: ItemizeRedisClient;
  redisPub: ItemizeRedisClient;
  redisSub: ItemizeRedisClient;
  redisLocalPub: ItemizeRedisClient;
  redisLocalSub: ItemizeRedisClient;
  buildnumber: string;
  triggers: ITriggerRegistry;
  storage: IStorageProvidersObject;
  customUserTokenQuery: any;
  logger: ILoggerType;
  mailService: MailProvider<any>;
  phoneService: PhoneProvider<any>;
  paymentService: PaymentProvider<any>;
  loggingService: LoggingProvider<any>;
  userLocalizationService: UserLocalizationProvider<any>;
  locationSearchService: LocationSearchProvider<any>;
  ussdService: USSDProvider<any>;
  registry: RegistryService;
  customServices: {
    [name: string]: ServiceProvider<any>;
  };
  express: typeof express,
  customRoles: ICustomRoleType[];
  rawDB: ItemizeRawDB;
  elastic: ItemizeElasticClient,
}

export interface IServerDataType {
  BUILDNUMBER: string;
  CURRENCY_FACTORS: {
    [usdto: string]: number;
  }
}

export interface IStorageProviders {
  [type: string]: IServiceProviderClassType<any>;
}

export interface IServiceCustomizationType {
  storageServiceProviders?: IStorageProviders;
  mailServiceProvider?: IServiceProviderClassType<any>;
  phoneServiceProvider?: IServiceProviderClassType<any>;
  ussdServiceProvider?: IServiceProviderClassType<any>;
  userLocalizationProvider?: IServiceProviderClassType<any>;
  currencyFactorsProvider?: IServiceProviderClassType<any>;
  locationSearchProvider?: IServiceProviderClassType<any>;
  paymentProvider?: IServiceProviderClassType<any>;
  loggingServiceProvider?: IServiceProviderClassType<any>;
  customServices?: {
    [name: string]: IServiceProviderClassType<any>,
  };
}

export interface IServerCustomizationDataType {
  customGQLQueries?: (appData: IAppDataType) => IGQLQueryFieldsDefinitionType;
  customTokenGQLQueries?: ICustomTokensType;
  customGQLMutations?: (appData: IAppDataType) => IGQLQueryFieldsDefinitionType;
  customRouterEndpoint?: string;
  customRouter?: (appData: IAppDataType) => express.Router;
  customTriggers?: ITriggerRegistry;
  customRoles?: ICustomRoleType[];
  callback?: (appData: IAppDataType) => void | Promise<void>;

  globalManagerInitialServerDataFunction?: InitialExecutionServerDataFn,
}

export async function getStorageProviders(
  config: IConfigRawJSONDataType,
  sensitiveConfig: ISensitiveConfigRawJSONDataType,
  dbConfig: IDBConfigRawJSONDataType,
  redisConfig: IRedisConfigRawJSONDataType,
  storageServiceProviders: IStorageProviders,
  registry: RegistryService,
): Promise<{
  cloudClients: IStorageProvidersObject;
  instancesUsed: StorageProvider<any>[];
  classesUsed: IServiceProviderClassType<any>[];
}> {
  const finalOutput = {
    instancesUsed: [] as StorageProvider<any>[],
    classesUsed: [] as IServiceProviderClassType<any>[],
    cloudClients: {} as IStorageProvidersObject,
  };

  const configsObj = {
    config,
    sensitiveConfig,
    dbConfig,
    redisConfig,
  };

  if (sensitiveConfig.localContainer) {
    let prefix = config.containersHostnamePrefixes[sensitiveConfig.localContainer];
    if (!prefix) {
      logger && logger.error(
        {
          functionName: "initializeServer",
          message: "Could not find prefix for local container '" + sensitiveConfig.localContainer + "'",
          serious: true,
        },
      );
      throw new Error("Could not find prefix for local container " + sensitiveConfig.localContainer);
    }
    if (prefix.indexOf("/") !== 0) {
      prefix = "https://" + prefix;
    }
    const localClient = new LocalStorageService(null, registry, configsObj);
    localClient.setPrefix(prefix);
    localClient.setId(sensitiveConfig.localContainer);

    await localClient.initialize();
    finalOutput.instancesUsed.push(localClient);
    // typescript for some reason misses the types
    if (!finalOutput.classesUsed.includes(LocalStorageService as any)) {
      finalOutput.classesUsed.push(LocalStorageService as any);
    }
    finalOutput.cloudClients[sensitiveConfig.localContainer] = localClient;
  }

  if (sensitiveConfig.containers) {
    await Promise.all(Object.keys(sensitiveConfig.containers).map(async (containerIdX) => {
      const containerData = sensitiveConfig.containers[containerIdX];
      let prefix = config.containersHostnamePrefixes[containerIdX];
      if (!prefix) {
        logger && logger.error(
          {
            functionName: "initializeServer",
            message: "Could not find prefix for container in '" + containerIdX + "'",
            serious: true,
          },
        );
        throw new Error("Could not find prefix for container in " + containerIdX);
      }
      if (prefix.indexOf("/") !== 0) {
        prefix = "https://" + prefix;
      }

      const type = containerData.type;
      const ServiceClass: IServiceProviderClassType<any> = (storageServiceProviders && storageServiceProviders[type]) || OpenstackService;

      if (ServiceClass.getType() !== ServiceProviderType.NONE) {
        throw new Error("The service class for storage is not of type NONE");
      }

      const client: StorageProvider<any> = (new ServiceClass(containerData.config, registry, configsObj)) as any;
      client.setPrefix(prefix);
      client.setId(containerIdX);
      await client.initialize();
      finalOutput.instancesUsed.push(client);
      // typescript misses the types
      if (!finalOutput.classesUsed.includes(ServiceClass as any)) {
        finalOutput.classesUsed.push(ServiceClass as any);
      }
      finalOutput.cloudClients[containerIdX] = client;
    }));
  }

  return finalOutput;
}

/**
 * Initializes the itemize server with its custom configuration
 * @param ssrConfig the server side rendering rules
 * @param custom the customization details
 * @param custom.customGQLQueries custom graphql queries
 * @param custom.customTokenGQLQueries custom token graphql queries for generating custom tokens
 * while customGQLQueries can be used for the same purpose, this makes it easier and compliant
 * @param custom.customGQLMutations custom graphql mutations
 * @param custom.customRouterEndpoint an endpoint to add a custom router, otherwise it gets
 * attached to the root
 * @param custom.customRouter a custom router to attach to the rest endpoint
 * @param custom.customTriggers a registry for custom triggers
 */
export async function initializeServer(
  ssrConfig: ISSRConfig,
  seoConfig: ISEOConfig,
  custom: IServerCustomizationDataType = {},
) {
  // for build database we just build the database
  if (INSTANCE_MODE === "BUILD_DATABASE" || INSTANCE_MODE === "LOAD_DATABASE_DUMP") {
    build(NODE_ENV, INSTANCE_MODE === "BUILD_DATABASE" ? "build" : "load-dump");
    return;
  }

  // now we try to read the basic configuration
  try {
    logger.info(
      {
        functionName: "initializeServer",
        message: "Reading configuration data",
      },
    );

    // first let's read all the configurations
    let rawBuild: string;
    let rawConfig: string;
    let rawSensitiveConfig: string;
    let rawRedisConfig: string;
    let rawDbConfig: string;
    let index: string;
    let buildnumber: string;
    let rawLangLocales: string
    [
      rawConfig,
      rawSensitiveConfig,
      rawRedisConfig,
      rawDbConfig,
      index,
      rawBuild,
      rawLangLocales,
      buildnumber,
    ] = await Promise.all([
      fsAsync.readFile(path.join("config", "index.json"), "utf8"),
      fsAsync.readFile(path.join("config", NODE_ENV === "development" ? "index.sensitive.json" : `index.${NODE_ENV}.sensitive.json`), "utf8"),
      fsAsync.readFile(path.join("config", NODE_ENV === "development" ? "redis.sensitive.json" : `redis.${NODE_ENV}.sensitive.json`), "utf8"),
      fsAsync.readFile(path.join("config", NODE_ENV === "development" ? "db.sensitive.json" : `db.${NODE_ENV}.sensitive.json`), "utf8"),
      fsAsync.readFile(path.join("dist", "data", "index.html"), "utf8"),
      fsAsync.readFile(path.join("dist", "data", "build.all.json"), "utf8"),
      fsAsync.readFile(path.join("dist", "data", "lang.json"), "utf8"),
      fsAsync.readFile(path.join("dist", "buildnumber"), "utf8"),
    ]);
    const config: IConfigRawJSONDataType = JSON.parse(rawConfig);
    const sensitiveConfig: ISensitiveConfigRawJSONDataType = JSON.parse(rawSensitiveConfig);

    const shared = {
      ...config.shared,
      ...sensitiveConfig.shared,
    };

    config.shared = shared;
    sensitiveConfig.shared = shared;

    const dbConfig: IDBConfigRawJSONDataType = JSON.parse(rawDbConfig);
    const redisConfig: IRedisConfigRawJSONDataType = JSON.parse(rawRedisConfig);
    const build: IRootRawJSONDataType = JSON.parse(rawBuild);
    const langLocales: ILangLocalesType = JSON.parse(rawLangLocales);

    const configsObj = {
      config,
      sensitiveConfig,
      dbConfig,
      redisConfig,
    };

        // We change the hosts depending to whether we are using docker or not
    // and if our hosts are set to the local
    if (USING_DOCKER) {
      if (redisConfig.cache.host === "127.0.0.1" || redisConfig.cache.host === "localhost") {
        redisConfig.cache.host = "redis";
      }
      if (redisConfig.pubSub.host === "127.0.0.1" || redisConfig.pubSub.host === "localhost") {
        redisConfig.pubSub.host = "redis";
      }
      if (redisConfig.global.host === "127.0.0.1" || redisConfig.global.host === "localhost") {
        redisConfig.global.host = "redis";
      }
      if (dbConfig.host === "127.0.0.1" || dbConfig.host === "localhost") {
        dbConfig.host = "pgsql";
      }
      if (
        dbConfig.elastic &&
        dbConfig.elastic.node &&
        (
          dbConfig.elastic.node.includes("localhost") ||
          dbConfig.elastic.node.includes("127.0.0.1")
        )
      ) {
        dbConfig.elastic.node = dbConfig.elastic.node.replace("localhost", "elastic").replace("127.0.0.1", "elastic");
      }
    }

    const mayUseLoggerService =
      INSTANCE_MODE !== "CLEAN_SITEMAPS" &&
      INSTANCE_MODE !== "CLEAN_STORAGE";

    const LoggingServiceClass = mayUseLoggerService ? (serviceCustom && serviceCustom.loggingServiceProvider) || (
      dbConfig.elastic ? ElasticLoggerService : null
    ) : null;
    const loggingService: LoggingProvider<any> = LoggingServiceClass ? new LoggingServiceClass(
      sensitiveConfig.logging,
      null,
      configsObj,
    ) as any : null;
    loggingService && await loggingService.initialize();
    loggingService && extendLoggerWith(loggingService);

    // redis configuration despite instructions actually tries to use null
    // values as it checks for undefined so we need to strip these if null
    Object.keys(redisConfig.cache).forEach((key) => {
      if (redisConfig.cache[key] === null) {
        delete redisConfig.cache[key];
      }
    });
    Object.keys(redisConfig.pubSub).forEach((key) => {
      if (redisConfig.pubSub[key] === null) {
        delete redisConfig.pubSub[key];
      }
    });
    Object.keys(redisConfig.global).forEach((key) => {
      if (redisConfig.global[key] === null) {
        delete redisConfig.global[key];
      }
    });

    logger.info(
      {
        functionName: "initializeServer",
        message: "Using docker " + USING_DOCKER,
      },
    );

    // this shouldn't be necessary but we do it anyway
    buildnumber = buildnumber.replace("\n", "").trim();
    logger.info(
      {
        functionName: "initializeServer",
        message: "Buildnumber is " + buildnumber,
      },
    );

    logger.info(
      {
        functionName: "initializeServer",
        message: "INSTANCE_MODE is " + INSTANCE_MODE,
      },
    );

    // now we create the pub sub clients or only the pub client
    // if we are the global manager as the global manager only needs
    // to publish and never subscribes because the global manager
    // needs to inform of new server data, absolute mode will also do
    // this
    logger.info(
      {
        functionName: "initializeServer",
        message: INSTANCE_MODE === "GLOBAL_MANAGER" ?
          "initializeServer: initializing redis global pub client" :
          "initializeServer: initializing redis global pub/sub client"
      },
    );
    const redisPub: ItemizeRedisClient = await setupRedisClient("pub", redisConfig.pubSub);
    const redisSub: ItemizeRedisClient = await setupRedisClient("sub", redisConfig.pubSub);

    // so every other instance mode will end up setting up a local pub/sub for the local cache, however not the global manager
    // because it only talks to the global redis by publishing server data, and it shouldn't have anything to do with
    // the local redis
    if (INSTANCE_MODE !== "GLOBAL_MANAGER") {
      logger.info(
        {
          functionName: "initializeServer",
          message: "Initializing local redis pub/sub client",
        },
      );
    }
    const redisLocalPub: ItemizeRedisClient = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : await setupRedisClient("local pub", redisConfig.cache);
    const redisLocalSub: ItemizeRedisClient = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : await setupRedisClient("local sub", redisConfig.cache);

    // same for this, for the cache, as the cache is the same that is used for local pub/sub
    if (INSTANCE_MODE !== "GLOBAL_MANAGER") {
      logger.info(
        {
          functionName: "initializeServer",
          message: "Initializing redis cache client",
        },
      );
    }
    const redisClient: ItemizeRedisClient =
      INSTANCE_MODE === "GLOBAL_MANAGER" ?
        null :
        await setupRedisClient("local", redisConfig.cache, async (client: ItemizeRedisClient, isReconnect: boolean) => {
          // when we reconnect or connect for the first time and we are a cluster manager
          // we need to wipe the cache as we don't know if we have gone out of sync
          // and our cache is stale
          // https://github.com/onzag/itemize/issues/23
          if (INSTANCE_MODE === "CLUSTER_MANAGER" || INSTANCE_MODE === "ABSOLUTE") {
            if (!isReconnect) {
              logger.info(
                {
                  functionName: "initializeServer",
                  message: "Server initialized in cluster manager/absolute mode flushing redis",
                },
              );
            } else {
              logger.info(
                {
                  functionName: "initializeServer",
                  message: "Server re-initialized in cluster manager/absolute mode flushing redis",
                },
              );
            }

            // however in many situations the global and the local are literally the
            // same redis server, not optimal but this is allowed so we restore
            // these attributes from the redis server, server data, and the cached response
            // from the currency factors, and so we flush all
            const serverDataStr = await client.get(SERVER_DATA_IDENTIFIER) || null;
            const currencyFactorsCachedResponseRestore = await client.get(CACHED_CURRENCY_RESPONSE) || null;
            await client.flushall();
            if (serverDataStr) {
              await client.set(SERVER_DATA_IDENTIFIER, serverDataStr);
            }
            if (currencyFactorsCachedResponseRestore) {
              await client.set(CACHED_CURRENCY_RESPONSE, currencyFactorsCachedResponseRestore);
            }
          }
        });

    let redisGlobalClient: ItemizeRedisClient;

    if (INSTANCE_MODE !== "CLEAN_SITEMAPS" && INSTANCE_MODE !== "CLEAN_STORAGE") {
      logger.info(
        {
          functionName: "initializeServer",
          message: "Initializing redis global cache client",
        },
      );
      redisGlobalClient = await setupRedisClient("global", redisConfig.global);
    }

    const domain = NODE_ENV === "production" ? config.productionHostname : config.developmentHostname;

    logger.info(
      {
        functionName: "initializeServer",
        message: "Initializing itemize server root",
      },
    );
    const root = new Root(build);

    // now for the cluster manager, which manages a specific cluster, it goes here, and it doesn't
    // go futher, the job of the cluster manager is to mantain the cluster redis database
    // up to date, and handle the requests for these up to date requests, it basically
    // listens to the register requests that are given by other instances and then listens to
    // changed events of the same type the client uses to update the redis database
    if (INSTANCE_MODE === "CLUSTER_MANAGER") {
      // as such 
      const cache = new Cache(
        redisClient,
        null,
        null,
        sensitiveConfig,
        null,
        domain,
        root,
        null,
      );
      const listener = new Listener(
        buildnumber,
        redisSub,
        redisPub,
        redisLocalSub,
        redisLocalPub,
        // the registry and the root are only used
        // in direct communication with the client
        // so we are going to be cheap here
        // and dont let it be
        null,
        null,
        cache,
        null,
        null,
        [],
        sensitiveConfig,
      );
      // we need to inform that the cluster manager has been reset
      // the extended nodes come after the cluster manager
      // but if the cluster manager dies for some reason, a reset ought
      // to be informed

      // cluster manager shouldn't ever ever die but if it does there is a
      // chance that the client caches have now gone stale as they
      // were using non-updates cache references, now that the cache is clear
      // as the cache is cleared whenever the cluster manager starts then
      // we need to ensure clients that are connected to the extended nodes
      // are updated as well, so what the cluster manager reset does under the hood
      // is kick all the clients so they are forced to reconnect and ask for feedback
      // a non-optimal situation, and a non-optimal solution, but this is an edge
      // case scenario, because the cluster manager, shouldn't ever die

      // the whole action on its own should repopulate the cache but again
      // the cluster manager shouldn't die
      listener.informClusterManagerReset();

      logger.info(
        {
          functionName: "initializeServer",
          message: "Cluster manager sucessfully setup",
        },
      );
      return;
    }

    // we only need one client instance
    // Create the connection string
    const dbConnectionConfig = {
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
    };

    logger.info(
      {
        functionName: "initializeServer",
        message: "Setting up database connection to " + dbConfig.host,
      },
    );
    const databaseConnection = new DatabaseConnection(dbConnectionConfig);
    const rawDB = new ItemizeRawDB(
      redisGlobalClient,
      redisPub,
      redisSub,

      databaseConnection,
      root,
    );

    if (dbConfig.elastic) {
      logger.info(
        {
          functionName: "initializeServer",
          message: "Setting up elastic connection",
        },
      );
    }
    const elasticConnection = dbConfig.elastic ? new Client(dbConfig.elastic) : null;
    const elastic = dbConfig.elastic ? new ItemizeElasticClient(
      root,
      rawDB,
      elasticConnection,
      dbConfig.elasticLangAnalyzers,
    ) : null;

    if (elastic) {
      const envInfo = buildEnvironmentInfo(
        buildnumber,
        redisConfig,
        dbConfig,
      );

      elastic.createPing({
        data: envInfo,
        dataIndex: PING_DATA_IDENTIFIER,
        statusIndex: PING_STATUS_IDENTIFIER,
        statusRetriever: () => {
          return {
            cpuUsage: process.cpuUsage(),
            memoryUsage: process.memoryUsage(),
          }
        }
      })
    }

    logger.info(
      {
        functionName: "initializeServer",
        message: "Initializing registry",
      },
    );
    const registry = new RegistryService({
      databaseConnection,
    }, null, configsObj);
    await registry.initialize();

    if (INSTANCE_MODE === "GLOBAL_MANAGER" || INSTANCE_MODE === "ABSOLUTE") {
      logger.info(
        {
          functionName: "initializeServer",
          message: "Setting up global manager",
        },
      );

      const CurrencyFactorsClass = (serviceCustom && serviceCustom.currencyFactorsProvider) || CurrencyLayerService;
      if (CurrencyFactorsClass.getType() !== ServiceProviderType.GLOBAL) {
        throw new Error("Currency factors custom provider class is not a global type");
      }
      const currencyFactorsService: CurrencyFactorsProvider<any> = (sensitiveConfig.currencyFactors ?
        new CurrencyFactorsClass(sensitiveConfig.currencyFactors, registry, configsObj) :
        null) as any;

      if (sensitiveConfig.mail) {
        logger.info(
          {
            functionName: "initializeServer",
            message: "Initializing global mail service",
          },
        );
      }
      let MailServiceClass = (serviceCustom && serviceCustom.mailServiceProvider) || MailgunService;
      if (MailServiceClass.getType() !== ServiceProviderType.HYBRID) {
        throw new Error("The mail service class is not a hybrid type, and that's not allowed");
      }

      if (FAKE_EMAILS) {
        logger.info(
          {
            functionName: "initializeServer",
            message: "Using fake email service",
          },
        );
        // typescript messes the types again
        MailServiceClass = FakeMailService as any;
      }
      const mailService: MailProvider<any> = ((sensitiveConfig.mail || FAKE_EMAILS) ?
        new MailServiceClass(
          sensitiveConfig.mail,
          registry,
          configsObj,
        ) : null) as any;

      let PhoneServiceClass = (serviceCustom && serviceCustom.phoneServiceProvider) || TwilioService;
      if (PhoneServiceClass.getType() !== ServiceProviderType.HYBRID) {
        throw new Error("The phone service class is not a hybrid type, and that's not allowed");
      }

      if (FAKE_SMS) {
        logger.info(
          {
            functionName: "initializeServer",
            message: "Using fake sms service",
          },
        );
        // typescript messes the types again
        PhoneServiceClass = FakeSMSService as any;
      }

      const phoneService: PhoneProvider<any> = ((sensitiveConfig.phone || FAKE_SMS) ?
        new PhoneServiceClass(
          sensitiveConfig.phone,
          registry,
          configsObj,
        ) : null) as any;

      const manager: GlobalManager = new GlobalManager(
        buildnumber,
        root,
        databaseConnection,
        rawDB,
        elastic,
        redisGlobalClient,
        redisPub,
        redisSub,
        config,
        sensitiveConfig,
        currencyFactorsService,
        mailService,
        phoneService,
        registry,
        custom.globalManagerInitialServerDataFunction,
      );

      if (serviceCustom && serviceCustom.customServices) {
        Object.keys(serviceCustom.customServices).map(async (keyName) => {
          const CustomServiceClass = serviceCustom.customServices[keyName];

          const type = CustomServiceClass.getType();
          if (type !== ServiceProviderType.GLOBAL && type !== ServiceProviderType.HYBRID) {
            return;
          }

          const configData = {
            ...(sensitiveConfig.custom && sensitiveConfig.custom[keyName]),
            ...(config.custom && config.custom[keyName]),
          };
          const customGlobalService = new CustomServiceClass(configData, registry, configsObj);
          customGlobalService.setInstanceName(keyName);
          manager.installGlobalService(customGlobalService);
        });
      }

      await manager.initializeServices();

      if (seoConfig && sensitiveConfig.seoContainerID) {
        logger.info(
          {
            functionName: "initializeServer",
            message: "Initializing SEO configuration",
          },
        );
        const seoContainerData = sensitiveConfig.containers &&
          sensitiveConfig.containers[sensitiveConfig.seoContainerID];
        const isLocalInstead = sensitiveConfig.seoContainerID === sensitiveConfig.localContainer;
        if (!seoContainerData && !isLocalInstead) {
          logger.error(
            {
              functionName: "initializeServer",
              message: "Invalid seo container id for the container '" + sensitiveConfig.seoContainerID + "'",
              serious: true,
            },
          );
        } else {
          let prefix = config.containersHostnamePrefixes[sensitiveConfig.seoContainerID];
          if (!prefix) {
            logger.error(
              {
                functionName: "initializeServer",
                message: "Could not find prefix for SEO in '" + sensitiveConfig.seoContainerID + "'",
                serious: true,
              },
            );
            return;
          }
          if (prefix.indexOf("/") !== 0) {
            prefix = "https://" + prefix;
          }

          let storageClient: StorageProvider<any>;
          if (isLocalInstead) {
            storageClient = new LocalStorageService(null, registry, configsObj);
          } else {
            const type = seoContainerData.type;
            const ServiceClass = (serviceCustom && serviceCustom.storageServiceProviders[type]) || OpenstackService;
            storageClient = (new ServiceClass(seoContainerData.config, registry, configsObj)) as any;
          }

          storageClient.setId(sensitiveConfig.seoContainerID);
          storageClient.setPrefix(prefix);

          await storageClient.initialize();

          const seoGenerator = new SEOGenerator(
            seoConfig.seoRules,
            storageClient,
            rawDB,
            root,
            config.supportedLanguages,
            domain,
            PING_GOOGLE,
          );
          manager.setSEOGenerator(seoGenerator);
        }
      }
      manager.run();
      if (INSTANCE_MODE === "GLOBAL_MANAGER") {
        return;
      }
    }

    // due to a bug in the types the create client function is missing
    // domainId and domainName
    logger.info(
      {
        functionName: "initializeServer",
        message: "Initializing cloud clients",
      },
    );

    const storageClients = await getStorageProviders(
      config,
      sensitiveConfig,
      dbConfig,
      redisConfig,
      serviceCustom && serviceCustom.storageServiceProviders,
      registry,
    );

    if (INSTANCE_MODE === "CLEAN_STORAGE" || INSTANCE_MODE === "CLEAN_SITEMAPS") {
      logger.info(
        {
          functionName: "initializeServer",
          message: "Cleaning storage",
        },
      );

      await Promise.all(Object.keys(storageClients.cloudClients).map(async (containerId) => {
        if (INSTANCE_MODE === "CLEAN_SITEMAPS") {
          logger.info(
            {
              functionName: "initializeServer",
              message: "Cleaning " + containerId + " sitemaps for " + domain,
            },
          );
          const client = storageClients.cloudClients[containerId];
          await client.removeFolder("sitemaps/" + domain);
        } else {
          logger.info(
            {
              functionName: "initializeServer",
              message: "Cleaning " + containerId + " data for " + domain,
            },
          );
          const client = storageClients.cloudClients[containerId];
          await client.removeFolder(domain);
        }
      }));

      process.exit(0);
    }

    // RETRIEVING INITIAL SERVER DATA
    logger.info(
      {
        functionName: "initializeServer",
        message: "Attempting to retrieve server data",
      },
    );

    let serverData: IServerDataType = null;
    while (serverData === null) {
      logger.info(
        {
          functionName: "initializeServer",
          message: "Waiting one second",
        },
      );
      await wait(1000);
      const serverDataStr = await redisGlobalClient.get(SERVER_DATA_IDENTIFIER) || null;
      if (!serverDataStr) {
        logger.info(
          {
            functionName: "initializeServer",
            message: "Server data not available; is global cache and global manager running?",
          },
        );
      } else {
        serverData = JSON.parse(serverDataStr);
      }
    }

    logger.info(
      {
        functionName: "initializeServer",
        message: "Initializing cache instance",
      },
    );
    const cache = new Cache(redisClient, databaseConnection, elastic, sensitiveConfig, storageClients.cloudClients, domain, root, serverData);
    logger.info(
      {
        functionName: "initializeServer",
        message: "Creating server",
      },
    );
    const server = http.createServer(app);

    logger.info(
      {
        functionName: "initializeServer",
        message: "Setting up websocket socket.io listener",
      },
    );
    const listener = new Listener(
      buildnumber,
      redisSub,
      redisPub,
      redisLocalSub,
      redisLocalPub,
      registry,
      root,
      cache,
      rawDB,
      server,
      custom.customRoles || [],
      sensitiveConfig,
    );

    if (sensitiveConfig.userLocalization) {
      logger.info(
        {
          functionName: "initializeServer",
          message: "Initializing user localization service",
        },
      );
    }
    const UserLocalizationServiceClass = (serviceCustom && serviceCustom.userLocalizationProvider) || (
      elastic ? ElasticLocationService : IPStackService
    );
    if (UserLocalizationServiceClass.getType() !== ServiceProviderType.LOCAL) {
      throw new Error("The user localization service class is not a local type, and that's not allowed");
    }
    const userLocalizationService: UserLocalizationProvider<any> = (
      (
        sensitiveConfig.userLocalization ||
        UserLocalizationServiceClass === ElasticLocationService
      ) ?
      new UserLocalizationServiceClass(sensitiveConfig.userLocalization, registry, configsObj) :
      null) as any;

    if (sensitiveConfig.mail) {
      logger.info(
        {
          functionName: "initializeServer",
          message: "Initializing mail service",
        },
      );
    }
    let MailServiceClass = (serviceCustom && serviceCustom.mailServiceProvider) || MailgunService;
    if (MailServiceClass.getType() !== ServiceProviderType.HYBRID) {
      throw new Error("The mail service class is not a hybrid type, and that's not allowed");
    }

    if (FAKE_EMAILS) {
      logger.info(
        {
          functionName: "initializeServer",
          message: "Using fake email service",
        },
      );
      // typescript messes the types again
      MailServiceClass = FakeMailService as any;
    }
    const mailService: MailProvider<any> = ((sensitiveConfig.mail || FAKE_EMAILS) ?
      new MailServiceClass(
        sensitiveConfig.mail,
        registry,
        configsObj,
      ) : null) as any;

    let PhoneServiceClass = (serviceCustom && serviceCustom.phoneServiceProvider) || TwilioService;
    if (PhoneServiceClass.getType() !== ServiceProviderType.HYBRID) {
      throw new Error("The phone service class is not a hybrid type, and that's not allowed");
    }

    if (FAKE_SMS) {
      logger.info(
        {
          functionName: "initializeServer",
          message: "Using fake sms service",
        },
      );
      // typescript messes the types again
      PhoneServiceClass = FakeSMSService as any;
    }
    const phoneService: PhoneProvider<any> = ((sensitiveConfig.phone || FAKE_SMS) ?
      new PhoneServiceClass(
        sensitiveConfig.phone,
        registry,
        configsObj,
      ) : null) as any;

    let USSDServiceClass = (serviceCustom && serviceCustom.ussdServiceProvider as any) || null;
    if (USSDServiceClass && USSDServiceClass.getType() !== ServiceProviderType.LOCAL) {
      throw new Error("The ussd service class is not a local type, and that's not allowed");
    }
    if (FAKE_USSD) {
      logger.info(
        {
          functionName: "initializeServer",
          message: "Using fake ussd service",
        },
      );
      USSDServiceClass = FakeUSSDService as any;
    }
    const ussdService: USSDProvider<any> = (sensitiveConfig.ussd || FAKE_USSD) ? (
      new USSDServiceClass(sensitiveConfig.ussd, registry, configsObj)
    ) : null;

    if (sensitiveConfig.locationSearch) {
      logger.info(
        {
          functionName: "initializeServer",
          message: "Initializing location search service",
        },
      );
    }
    const LocationSearchClass = (serviceCustom && serviceCustom.locationSearchProvider) || HereMapsService;
    if (LocationSearchClass.getType() !== ServiceProviderType.LOCAL) {
      throw new Error("The location search service class is not a local type, and that's not allowed");
    }
    const locationSearchService: LocationSearchProvider<any> = (sensitiveConfig.locationSearch ?
      new LocationSearchClass(sensitiveConfig.locationSearch, registry, configsObj) : null) as any;

    if (sensitiveConfig.payment) {
      logger.info(
        {
          functionName: "initializeServer",
          message: "Initializing payment service",
        },
      );
    }

    // TODOPAYMENT put the default stripe instead of manual
    const PaymentClass = (serviceCustom && serviceCustom.paymentProvider) || (
      sensitiveConfig.payment ? null : ManualPaymentService
    );
    if (PaymentClass.getType() !== ServiceProviderType.LOCAL) {
      throw new Error("The payment service class is not a local type, and that's not allowed");
    }
    const paymentService: PaymentProvider<any> = new PaymentClass(sensitiveConfig.payment, registry, configsObj) as any;

    const customServices: {
      [name: string]: ServiceProvider<any>,
    } = {};

    const customServicesInstances: ServiceProvider<any>[] = [];
    const customServiceClassesUsed: IServiceProviderClassType<any>[] = [];

    if (serviceCustom && serviceCustom.customServices) {
      Object.keys(serviceCustom.customServices).map(async (keyName) => {
        const CustomServiceClass = serviceCustom.customServices[keyName];

        const type = CustomServiceClass.getType();
        if (type !== ServiceProviderType.LOCAL && type !== ServiceProviderType.HYBRID) {
          return;
        }

        const configData = {
          ...(sensitiveConfig.custom && sensitiveConfig.custom[keyName]),
          ...(config.custom && config.custom[keyName]),
        };
        customServices[keyName] = new CustomServiceClass(configData, registry, configsObj);
        customServices[keyName].setInstanceName(keyName);

        customServicesInstances.push(customServices[keyName]);
        if (!customServiceClassesUsed.includes(CustomServiceClass)) {
          customServiceClassesUsed.push(CustomServiceClass);
        }
      });
    }

    const appData: IAppDataType = {
      root,
      rootPool: retrieveRootPool(root.rawData),
      langLocales,
      ssrConfig,
      seoConfig,
      indexDevelopment: index.replace(/\$MODE/g, "development"),
      indexProduction: index.replace(/\$MODE/g, "production"),
      config,
      sensitiveConfig,
      databaseConnection,
      databaseConfig: dbConfig,
      listener,
      redis: redisClient,
      redisGlobal: redisGlobalClient,
      redisSub,
      redisPub,
      redisLocalPub,
      redisLocalSub,
      cache,
      buildnumber,
      // assigned later during setup
      triggers: null,
      userLocalizationService,
      locationSearchService,
      paymentService,
      mailService,
      phoneService,
      ussdService,
      storage: storageClients.cloudClients,
      logger,
      loggingService,
      customServices,
      registry,
      customRoles: custom.customRoles || [],
      rawDB,
      elastic,
      express,
      // assigned later during rest setup
      customUserTokenQuery: null,
    };

    // inform the cache about this app data
    cache.setAppData(appData);

    // we setup the index checker now that we have the server data
    PropertyDefinition.indexChecker = serverSideIndexChecker.bind(null, appData);

    logger.info(
      {
        functionName: "initializeServer",
        message: "Setting local environment of all service providers",
      },
    );
    userLocalizationService && userLocalizationService.setupLocalResources(appData);
    mailService && mailService.setupLocalResources(appData);
    phoneService && phoneService.setupLocalResources(appData);
    ussdService && ussdService.setupLocalResources(appData);
    locationSearchService && locationSearchService.setupLocalResources(appData);
    paymentService && paymentService.setupLocalResources(appData);
    storageClients.instancesUsed.forEach((i) => i.setupLocalResources(appData));
    customServicesInstances.forEach((i) => i.setupLocalResources(appData));

    logger.info(
      {
        functionName: "initializeServer",
        message: "Initializing all the providers",
      },
    );
    userLocalizationService && await userLocalizationService.initialize();
    mailService && await mailService.initialize();
    phoneService && await phoneService.initialize();
    ussdService && await ussdService.initialize();
    locationSearchService && await locationSearchService.initialize();
    paymentService && await paymentService.initialize();
    // the storage clients are a none type and initialize immediately
    await Promise.all(customServicesInstances.map((i) => i.initialize()));

    logger.info(
      {
        functionName: "initializeServer",
        message: "Setting execution of all service providers",
      },
    );
    userLocalizationService && userLocalizationService.execute();
    mailService && mailService.execute();
    phoneService && phoneService.execute();
    locationSearchService && locationSearchService.execute();
    paymentService && paymentService.execute();
    storageClients.instancesUsed.forEach((i) => i.execute());
    customServicesInstances.forEach((i) => i.execute());

    logger.info(
      {
        functionName: "initializeServer",
        message: "Extracting triggers from all the providers",
      },
    );
    const userLocalizationInstanceTrigger = userLocalizationService && await userLocalizationService.getTriggerRegistry();
    const userLocalizationClassTrigger = userLocalizationService && await UserLocalizationServiceClass.getTriggerRegistry();
    const mailServiceInstanceTrigger = mailService && await mailService.getTriggerRegistry();
    const mailServiceClassTrigger = mailService && await MailServiceClass.getTriggerRegistry();
    const locationSearchServiceInstanceTrigger = locationSearchService && await locationSearchService.getTriggerRegistry();
    const locationSearchServiceClassTrigger = locationSearchService && await LocationSearchClass.getTriggerRegistry();
    const paymentServiceInstanceTrigger = paymentService && await paymentService.getTriggerRegistry();
    const paymentServiceClassTrigger = paymentService && await PaymentClass.getTriggerRegistry();
    const instanceTriggers = await Promise.all(storageClients.instancesUsed.map((i) => i.getTriggerRegistry()));
    const classTriggers = await Promise.all(storageClients.classesUsed.map((c) => c.getTriggerRegistry()));
    const instaceTriggersCustom = await Promise.all(customServicesInstances.map((i) => i.getTriggerRegistry()));
    const classTriggersCustom = await Promise.all(customServiceClassesUsed.map((c) => c.getTriggerRegistry()));
    const triggers = [
      ...instanceTriggers,
      ...classTriggers,
      ...instaceTriggersCustom,
      ...classTriggersCustom,
      userLocalizationInstanceTrigger,
      userLocalizationClassTrigger,
      mailServiceInstanceTrigger,
      mailServiceClassTrigger,
      locationSearchServiceInstanceTrigger,
      locationSearchServiceClassTrigger,
      paymentServiceInstanceTrigger,
      paymentServiceClassTrigger,
    ].filter((r) => !!r);

    // now setting up the triggers
    appData.triggers = mergeTriggerRegistries(
      customUserTriggers,
      custom.customTriggers,
      ...triggers,
    );

    logger.info(
      {
        functionName: "initializeServer",
        message: "Extracting routers of all the providers",
      },
    );
    const userLocalizationInstanceRouter = userLocalizationService && await userLocalizationService.getRouter(appData);
    const userLocalizationClassRouter = userLocalizationService && await UserLocalizationServiceClass.getRouter(appData);
    const mailServiceInstanceRouter = mailService && await mailService.getRouter(appData);
    const mailServiceClassRouter = mailService && await MailServiceClass.getRouter(appData);
    const phoneServiceInstanceRouter = phoneService && await phoneService.getRouter(appData);
    const phoneServiceClassRouter = phoneService && await PhoneServiceClass.getRouter(appData);
    const ussdServiceInstanceRouter = ussdService && await ussdService.getRouter(appData);
    const ussdServiceClassRouter = ussdService && await USSDProvider.getRouter(appData);
    const locationSearchServiceInstanceRouter = locationSearchService && await locationSearchService.getRouter(appData);
    const locationSearchServiceClassRouter = locationSearchService && await LocationSearchClass.getRouter(appData);
    const paymentServiceInstanceRouter = paymentService && await paymentService.getRouter(appData);
    const paymentServiceClassRouter = paymentService && await PaymentClass.getRouter(appData);
    const instanceRouters = await Promise.all(storageClients.instancesUsed.map((i) => i.getRouter(appData)));
    const classRouters = await Promise.all(storageClients.classesUsed.map((c) => c.getRouter(appData)));
    const instaceRoutersCustom = await Promise.all(customServicesInstances.map((i) => i.getRouter(appData)));
    const classRoutersCustom = await Promise.all(customServiceClassesUsed.map((c) => c.getRouter(appData)));
    const routers = [
      ...instanceRouters,
      ...classRouters,
      ...instaceRoutersCustom,
      ...classRoutersCustom,
      userLocalizationInstanceRouter,
      userLocalizationClassRouter,
      mailServiceInstanceRouter,
      mailServiceClassRouter,
      phoneServiceInstanceRouter,
      phoneServiceClassRouter,
      locationSearchServiceInstanceRouter,
      locationSearchServiceClassRouter,
      paymentServiceInstanceRouter,
      paymentServiceClassRouter,
      ussdServiceInstanceRouter,
      ussdServiceClassRouter,
    ].filter((r) => !!r);

    if (custom.callback) {
      logger.info(
        {
          functionName: "initializeServer",
          message: "Calling callback",
        },
      );

      await custom.callback(appData);
    }

    logger.info(
      {
        functionName: "initializeServer",
        message: "Setting up endpoints",
      },
    );
    initializeApp(appData, custom, routers);

    logger.info(
      {
        functionName: "initializeServer",
        message: "Attempting to listen at " + PORT,
      }
    );
    server.listen(PORT, () => {
      logger.info(
        {
          functionName: "initializeServer",
          message: "Listening at " + PORT,
        },
      );
    });
  } catch (err) {
    logger.error(
      {
        functionName: "initializeServer",
        message: "Failed to initialize server due to error",
        err,
      }
    );
    process.exitCode = 1;

    // sometimes it simply won't exit
    await wait(1000);
    process.exit(1);
  }
}

const wait = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};