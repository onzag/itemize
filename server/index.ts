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
import { SERVER_DATA_IDENTIFIER, CACHED_CURRENCY_RESPONSE } from "../constants";
import PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import { serverSideIndexChecker } from "../base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers";
import { Listener } from "./listener";
import { Cache } from "./cache";
import { ICustomTokensType } from "./custom-graphql";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType, IDBConfigRawJSONDataType, IRedisConfigRawJSONDataType } from "../config";
import { ITriggerRegistry, mergeTriggerRegistries } from "./resolvers/triggers";
import { customUserTriggers } from "./user/triggers";
import type winston from "winston";

import build from "../dbbuilder";
import { GlobalManager } from "./global-manager";
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
import StorageProvider, { IStorageProvidersObject } from "./services/base/StorageProvider";
import UserLocalizationProvider from "./services/base/UserLocalizationProvider";
import { RegistryService } from "./services/registry";
import { ItemizeRedisClient, setupRedisClient } from "./redis";
import { ICustomRoleType } from "./resolvers/roles";
import { ItemizeRawDB } from "./raw-db";
import CurrencyFactorsProvider from "./services/base/CurrencyFactorsProvider";
import { DatabaseConnection } from "../database";
import PaymentProvider from "./services/base/PaymentProvider";
import { logger } from "./logger";

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

// get the environment in order to be able to set it up
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 8000;
const INSTANCE_GROUP_ID = process.env.INSTANCE_GROUP_ID || "UNIDENTIFIED";
const INSTANCE_MODE: "CLUSTER_MANAGER" | "GLOBAL_MANAGER" | "ABSOLUTE" | "EXTENDED" | "BUILD_DATABASE" | "LOAD_DATABASE_DUMP" | "CLEAN_STORAGE" | "CLEAN_SITEMAPS" = process.env.INSTANCE_MODE || "ABSOLUTE" as any;
const USING_DOCKER = JSON.parse(process.env.USING_DOCKER || "false");
const PING_GOOGLE = JSON.parse(process.env.PING_GOOGLE || "false");

// Setting the parsers, postgresql comes with
// its own way to return this data but we don't want it
// we want raw strings
const TIMESTAMP_OID = 1114;
const TIMESTAMPTZ_OID = 1184;
const TIME_OID = 1083;
const DATE_OID = 1082;
types.setTypeParser(TIMESTAMP_OID, (val) => val);
types.setTypeParser(TIMESTAMPTZ_OID, (val) => val);
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
  rendererContext: IRendererContext,
  mainComponent: React.ReactElement,
  appWrapper?: (app: React.ReactElement, config: IConfigRawJSONDataType) => React.ReactElement;
  mainWrapper?: (mainComponet: React.ReactElement, config: IConfigRawJSONDataType, localeContext: ILocaleContextType) => React.ReactElement;
  collector?: ICollectorType;
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
  logger: winston.Logger;
  mailService: MailProvider<any>;
  paymentService: PaymentProvider<any>;
  userLocalizationService: UserLocalizationProvider<any>;
  locationSearchService: LocationSearchProvider<any>;
  registry: RegistryService;
  customServices: {
    [name: string]: ServiceProvider<any>;
  };
  customRoles: ICustomRoleType[];
  rawDB: ItemizeRawDB;
}

export interface IServerDataType {
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
  userLocalizationProvider?: IServiceProviderClassType<any>;
  currencyFactorsProvider?: IServiceProviderClassType<any>;
  locationSearchProvider?: IServiceProviderClassType<any>;
  paymentProvider?: IServiceProviderClassType<any>;
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
}

export async function getStorageProviders(
  config: IConfigRawJSONDataType,
  sensitiveConfig: ISensitiveConfigRawJSONDataType,
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

  if (sensitiveConfig.localContainer) {
    let prefix = config.containersHostnamePrefixes[sensitiveConfig.localContainer];
    if (!prefix) {
      logger && logger.error(
        "initializeServer [SERIOUS]: Could not find prefix for local container '" + sensitiveConfig.localContainer + "'",
      );
      throw new Error("Could not find prefix for local container " + sensitiveConfig.localContainer);
    }
    if (prefix.indexOf("/") !== 0) {
      prefix = "https://" + prefix;
    }
    const localClient = new LocalStorageService(null, registry, config, sensitiveConfig);
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
          "initializeServer [SERIOUS]: Could not find prefix for container in '" + containerIdX + "'",
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

      const client: StorageProvider<any> = (new ServiceClass(containerData.config, registry, config, sensitiveConfig)) as any;
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
      "initializeServer: reading configuration data"
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
    const dbConfig: IDBConfigRawJSONDataType = JSON.parse(rawDbConfig);
    const redisConfig: IRedisConfigRawJSONDataType = JSON.parse(rawRedisConfig);
    const build: IRootRawJSONDataType = JSON.parse(rawBuild);
    const langLocales: ILangLocalesType = JSON.parse(rawLangLocales);

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
      "initializeServer: using docker " + USING_DOCKER,
    );
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
    }

    // this shouldn't be necessary but we do it anyway
    buildnumber = buildnumber.replace("\n", "").trim();
    logger.info(
      "initializeServer: buildnumber is " + buildnumber,
    );

    logger.info(
      "initializeServer: INSTANCE_MODE is " + INSTANCE_MODE,
    );

    // now we create the pub sub clients or only the pub client
    // if we are the global manager as the global manager only needs
    // to publish and never subscribes because the global manager
    // needs to inform of new server data, absolute mode will also do
    // this
    logger.info(
      INSTANCE_MODE === "GLOBAL_MANAGER" ?
        "initializeServer: initializing redis global pub client" :
        "initializeServer: initializing redis global pub/sub client",
    );
    const redisPub: ItemizeRedisClient = await setupRedisClient("pub", redisConfig.pubSub);
    const redisSub: ItemizeRedisClient = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : await setupRedisClient("sub", redisConfig.pubSub);

    // so every other instance mode will end up setting up a local pub/sub for the local cache, however not the global manager
    // because it only talks to the global redis by publishing server data, and it shouldn't have anything to do with
    // the local redis
    if (INSTANCE_MODE !== "GLOBAL_MANAGER") {
      logger.info(
        "initializeServer: initializing local redis pub/sub client",
      );
    }
    const redisLocalPub: ItemizeRedisClient = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : await setupRedisClient("local pub", redisConfig.cache);
    const redisLocalSub: ItemizeRedisClient = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : await setupRedisClient("local sub", redisConfig.cache);

    // same for this, for the cache, as the cache is the same that is used for local pub/sub
    if (INSTANCE_MODE !== "GLOBAL_MANAGER") {
      logger.info(
        "initializeServer: initializing redis cache client",
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
                "initializeServer: server initialized in cluster manager/absolute mode flushing redis",
              );
            } else {
              logger.info(
                "initializeServer: server re-initialized in cluster manager/absolute mode flushing redis",
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

    // now for the cluster manager, which manages a specific cluster, it goes here, and it doesn't
    // go futher, the job of the cluster manager is to mantain the cluster redis database
    // up to date, and handle the requests for these up to date requests, it basically
    // listens to the register requests that are given by other instances and then listens to
    // changed events of the same type the client uses to update the redis database
    if (INSTANCE_MODE === "CLUSTER_MANAGER") {
      // as such 
      const cache = new Cache(redisClient, null, null, null, null, null, null);
      const listener = new Listener(
        buildnumber,
        redisSub,
        redisPub,
        redisLocalSub,
        redisLocalPub,
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
      return;
    }

    logger.info(
      "initializeServer: initializing redis global cache client",
    );
    const redisGlobalClient: ItemizeRedisClient = await setupRedisClient("global", redisConfig.global);

    logger.info(
      "initializeServer: initializing itemize server root",
    );
    const root = new Root(build);

    // Create the connection string
    const dbConnectionConfig = {
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
    };

    logger.info(
      "initializeServer: setting up database connection to " + dbConfig.host,
    );

    // we only need one client instance
    const databaseConnection = new DatabaseConnection(dbConnectionConfig);
    const rawDB = new ItemizeRawDB(
      redisPub,
      databaseConnection,
      root,
    )

    const domain = NODE_ENV === "production" ? config.productionHostname : config.developmentHostname;

    logger.info(
      "initializeServer: initializing registry",
    );
    const registry = new RegistryService({
      databaseConnection,
    }, null, config, sensitiveConfig);
    await registry.initialize();

    if (INSTANCE_MODE === "GLOBAL_MANAGER" || INSTANCE_MODE === "ABSOLUTE") {
      logger.info(
        "initializeServer: setting up global manager",
      );
      const CurrencyFactorsClass = (serviceCustom && serviceCustom.currencyFactorsProvider) || CurrencyLayerService;
      if (CurrencyFactorsClass.getType() !== ServiceProviderType.GLOBAL) {
        throw new Error("Currency factors custom provider class is not a global type");
      }
      const currencyFactorsService: CurrencyFactorsProvider<any> = (sensitiveConfig.currencyFactors ?
        new CurrencyFactorsClass(sensitiveConfig.currencyFactors, registry, config, sensitiveConfig) :
        null) as any;

      if (sensitiveConfig.mail) {
        logger.info(
          "initializeServer: initializing global mail service",
        );
      }
      let MailServiceClass = (serviceCustom && serviceCustom.mailServiceProvider) || MailgunService;
      if (MailServiceClass.getType() !== ServiceProviderType.HYBRID) {
        throw new Error("The mail service class is not a hybrid type, and that's not allowed");
      }

      const usesFakeMail = process.env.FAKE_EMAILS === "true";
      if (usesFakeMail) {
        logger.info(
          "initializeServer: using fake email service",
        );
        // typescript messes the types again
        MailServiceClass = FakeMailService as any;
      }
      const mailService: MailProvider<any> = ((sensitiveConfig.mail || usesFakeMail) ?
        new MailServiceClass(
          sensitiveConfig.mail,
          registry,
          config,
          sensitiveConfig,
        ) : null) as any;

      const manager: GlobalManager = new GlobalManager(
        root,
        databaseConnection,
        redisGlobalClient,
        redisPub,
        config,
        sensitiveConfig,
        currencyFactorsService,
        mailService,
        registry,
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
          const customGlobalService = new CustomServiceClass(configData, registry, config, sensitiveConfig);
          customGlobalService.setInstanceName(keyName);
          manager.installGlobalService(customGlobalService);
        });
      }

      await manager.initializeServices();

      if (seoConfig && sensitiveConfig.seoContainerID) {
        logger.info(
          "initializeServer: initializing SEO configuration",
        );
        const seoContainerData = sensitiveConfig.containers &&
          sensitiveConfig.containers[sensitiveConfig.seoContainerID];
        const isLocalInstead = sensitiveConfig.seoContainerID === sensitiveConfig.localContainer;
        if (!seoContainerData && !isLocalInstead) {
          logger.error(
            "initializeServer [SERIOUS]: Invalid seo container id for the container '" + sensitiveConfig.seoContainerID + "'",
          );
        } else {
          let prefix = config.containersHostnamePrefixes[sensitiveConfig.seoContainerID];
          if (!prefix) {
            logger.error(
              "initializeServer [SERIOUS]: Could not find prefix for SEO in '" + sensitiveConfig.seoContainerID + "'",
            );
            return;
          }
          if (prefix.indexOf("/") !== 0) {
            prefix = "https://" + prefix;
          }

          let storageClient: StorageProvider<any>;
          if (isLocalInstead) {
            storageClient = new LocalStorageService(null, registry, config, sensitiveConfig);
          } else {
            const type = seoContainerData.type;
            const ServiceClass = (serviceCustom && serviceCustom.storageServiceProviders[type]) || OpenstackService;
            storageClient = (new ServiceClass(seoContainerData.config, registry, config, sensitiveConfig)) as any;
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
      "initializeServer: initializing cloud clients",
    );

    const storageClients = await getStorageProviders(
      config,
      sensitiveConfig,
      serviceCustom && serviceCustom.storageServiceProviders,
      registry,
    );

    if (INSTANCE_MODE === "CLEAN_STORAGE" || INSTANCE_MODE === "CLEAN_SITEMAPS") {
      logger.info(
        "initializeServer: cleaning storage",
      );

      await Promise.all(Object.keys(storageClients.cloudClients).map(async (containerId) => {
        if (INSTANCE_MODE === "CLEAN_SITEMAPS") {
          logger.info(
            "initializeServer: cleaning " + containerId + " sitemaps for " + domain,
          );
          const client = storageClients.cloudClients[containerId];
          await client.removeFolder("sitemaps/" + domain);
        } else {
          logger.info(
            "initializeServer: cleaning " + containerId + " data for " + domain,
          );
          const client = storageClients.cloudClients[containerId];
          await client.removeFolder(domain);
        }
      }));

      process.exit(0);
    }

    // RETRIEVING INITIAL SERVER DATA
    logger.info(
      "initializeServer: attempting to retrieve server data",
    );
    const wait = (time: number) => {
      return new Promise((resolve) => {
        setTimeout(resolve, time);
      });
    }
    let serverData: IServerDataType = null;
    while (serverData === null) {
      logger.info(
        "initializeServer: waiting one second",
      );
      await wait(1000);
      const serverDataStr = await redisGlobalClient.get(SERVER_DATA_IDENTIFIER) || null;
      if (!serverDataStr) {
        logger.info(
          "initializeServer: server data not available, is global cache and global manager running?",
        );
      } else {
        serverData = JSON.parse(serverDataStr);
      }
    }

    logger.info(
      "initializeServer: initializing cache instance",
    );
    const cache = new Cache(redisClient, databaseConnection, sensitiveConfig, storageClients.cloudClients, domain, root, serverData);
    logger.info(
      "initializeServer: creating server",
    );
    const server = http.createServer(app);

    logger.info(
      "initializeServer: setting up websocket socket.io listener",
    );
    const listener = new Listener(
      buildnumber,
      redisSub,
      redisPub,
      redisLocalSub,
      redisLocalPub,
      root,
      cache,
      rawDB,
      server,
      custom.customRoles || [],
      sensitiveConfig,
    );

    if (sensitiveConfig.userLocalization) {
      logger.info(
        "initializeServer: initializing user localization service",
      );
    }
    const UserLocalizationServiceClass = (serviceCustom && serviceCustom.userLocalizationProvider) || IPStackService;
    if (UserLocalizationServiceClass.getType() !== ServiceProviderType.LOCAL) {
      throw new Error("The user localization service class is not a local type, and that's not allowed");
    }
    const userLocalizationService: UserLocalizationProvider<any> = (sensitiveConfig.userLocalization ?
      new UserLocalizationServiceClass(sensitiveConfig.userLocalization, registry, config, sensitiveConfig) :
      null) as any;

    if (sensitiveConfig.mail) {
      logger.info(
        "initializeServer: initializing mail service",
      );
    }
    let MailServiceClass = (serviceCustom && serviceCustom.mailServiceProvider) || MailgunService;
    if (MailServiceClass.getType() !== ServiceProviderType.HYBRID) {
      throw new Error("The mail service class is not a hybrid type, and that's not allowed");
    }

    const usesFakeMail = process.env.FAKE_EMAILS === "true";
    if (usesFakeMail) {
      logger.info(
        "initializeServer: using fake email service",
      );
      // typescript messes the types again
      MailServiceClass = FakeMailService as any;
    }
    const mailService: MailProvider<any> = ((sensitiveConfig.mail || usesFakeMail) ?
      new MailServiceClass(
        sensitiveConfig.mail,
        registry,
        config,
        sensitiveConfig,
      ) : null) as any;

    if (sensitiveConfig.locationSearch) {
      logger.info(
        "initializeServer: initializing location search service",
      );
    }
    const LocationSearchClass = (serviceCustom && serviceCustom.locationSearchProvider) || HereMapsService;
    if (LocationSearchClass.getType() !== ServiceProviderType.LOCAL) {
      throw new Error("The location search service class is not a local type, and that's not allowed");
    }
    const locationSearchService: LocationSearchProvider<any> = (sensitiveConfig.locationSearch ?
      new LocationSearchClass(sensitiveConfig.locationSearch, registry, config, sensitiveConfig) : null) as any;

    if (sensitiveConfig.payment) {
      logger.info(
        "initializeServer: initializing payment service",
      );
    }

    // TODOPAYMENT default stripe, use fake?
    const PaymentClass = (serviceCustom && serviceCustom.paymentProvider) || null;
    if (PaymentClass.getType() !== ServiceProviderType.LOCAL) {
      throw new Error("The payment service class is not a local type, and that's not allowed");
    }
    const paymentService: PaymentProvider<any> = (sensitiveConfig.payment ?
      new PaymentProvider(sensitiveConfig.payment, registry, config, sensitiveConfig) : null) as any;

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
        customServices[keyName] = new CustomServiceClass(configData, registry, config, sensitiveConfig);
        customServices[keyName].setInstanceName(keyName);

        customServicesInstances.push(customServices[keyName]);
        if (!customServiceClassesUsed.includes(CustomServiceClass)) {
          customServiceClassesUsed.push(CustomServiceClass);
        }
      });
    }

    logger.info(
      "initializeServer: extracting triggers from all the providers",
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
      listener,
      redis: redisClient,
      redisGlobal: redisGlobalClient,
      redisSub,
      redisPub,
      redisLocalPub,
      redisLocalSub,
      cache,
      buildnumber,
      triggers: mergeTriggerRegistries(
        customUserTriggers,
        custom.customTriggers,
        ...triggers,
      ),
      userLocalizationService,
      locationSearchService,
      paymentService,
      mailService,
      storage: storageClients.cloudClients,
      logger,
      customServices,
      registry,
      customRoles: custom.customRoles || [],
      rawDB,
      // assigned later during rest setup
      customUserTokenQuery: null,
    };

    // inform the cache about this app data
    cache.setAppData(appData);

    // we setup the index checker now that we have the server data
    PropertyDefinition.indexChecker = serverSideIndexChecker.bind(null, appData);

    logger.info(
      "initializeServer: INSTANCE_GROUP_ID is " + INSTANCE_GROUP_ID,
    );

    logger.info(
      "initializeServer: setting local environment of all service providers",
    );
    userLocalizationService && userLocalizationService.setupLocalResources(appData);
    mailService && mailService.setupLocalResources(appData);
    locationSearchService && locationSearchService.setupLocalResources(appData);
    paymentService && paymentService.setupLocalResources(appData);
    storageClients.instancesUsed.forEach((i) => i.setupLocalResources(appData));
    customServicesInstances.forEach((i) => i.setupLocalResources(appData));

    logger.info(
      "initializeServer: initializing all the providers",
    );
    userLocalizationService && await userLocalizationService.initialize();
    mailService && await mailService.initialize();
    locationSearchService && await locationSearchService.initialize();
    paymentService && await paymentService.initialize();
    // the storage clients are a none type and initialize immediately
    await Promise.all(customServicesInstances.map((i) => i.initialize()));

    logger.info(
      "initializeServer: setting execution of all service providers",
    );
    userLocalizationService && userLocalizationService.execute();
    mailService && mailService.execute();
    locationSearchService && locationSearchService.execute();
    paymentService && paymentService.execute();
    storageClients.instancesUsed.forEach((i) => i.execute());
    customServicesInstances.forEach((i) => i.execute());

    logger.info(
      "initializeServer: extracting routers of all the providers",
    );
    const userLocalizationInstanceRouter = userLocalizationService && await userLocalizationService.getRouter(appData);
    const userLocalizationClassRouter = userLocalizationService && await UserLocalizationServiceClass.getRouter(appData);
    const mailServiceInstanceRouter = mailService && await mailService.getRouter(appData);
    const mailServiceClassRouter = mailService && await MailServiceClass.getRouter(appData);
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
      locationSearchServiceInstanceRouter,
      locationSearchServiceClassRouter,
      paymentServiceInstanceRouter,
      paymentServiceClassRouter,
    ].filter((r) => !!r);

    logger.info(
      "initializeServer: setting up endpoints",
    );
    initializeApp(appData, custom, routers);

    logger.info(
      "initializeServer: attempting to listen at " + PORT,
    );
    server.listen(PORT, () => {
      logger.info(
        "initializeServer: listening at " + PORT,
      );
    });
  } catch (err) {
    logger.error(
      "initializeServer: Failed to initialize server due to error",
      {
        errMessage: err.message,
        errStack: err.stack,
      }
    );
    process.exit(1);
  }
}
