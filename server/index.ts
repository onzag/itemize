import express from "express";
import http from "http";
import path from "path";
import fs from "fs";
import Root, { IRootRawJSONDataType, ILangLocalesType } from "../base/Root";
import { IGQLQueryFieldsDefinitionType } from "../base/Root/gql";
import Knex from "knex";
import { types } from "pg";
import { SERVER_DATA_IDENTIFIER, CACHED_CURRENCY_RESPONSE } from "../constants";
import PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import { serverSideIndexChecker } from "../base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers";
import { Listener } from "./listener";
import redis, { RedisClient } from "redis";
import { Cache } from "./cache";
import { ICustomTokensType } from "./custom-graphql";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType, IDBConfigRawJSONDataType, IRedisConfigRawJSONDataType } from "../config";
import { ITriggerRegistry, mergeTriggerRegistries } from "./resolvers/triggers";
import { customUserTriggers } from "./user/triggers";
import { promisify } from "util";

import winston from "winston";
import "winston-daily-rotate-file";
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
import { MailProvider, IStorageProvidersObject, IStorageProviderClassType, IMailProviderClassType, IUserLocalizationProviderClassType, ICurrencyFactorsProviderClassType, ILocationSearchProviderClassType, StorageProvider, UserLocalizationProvider, LocationSearchProvider, IServiceProviderClassType, ServiceProvider } from "./services";
import { LocalStorageService } from "./services/local";
import { OpenstackService } from "./services/openstack";
import { IPStackService } from "./services/ipstack";
import { MailgunService } from "./services/mailgun";
import { HereMapsService } from "./services/here";
import { CurrencyLayerService } from "./services/currency-layer";
import { FakeMailService } from "./services/fake-mail";

// load the custom services configuration
const serviceFileSrc = require(path.join(path.resolve("."), "dist", "server", "services"));
const serviceCustom: IServiceCustomizationType = serviceFileSrc.default;

// get the environment in order to be able to set it up
const NODE_ENV = process.env.NODE_ENV;
const LOG_LEVEL = process.env.LOG_LEVEL;
const PORT = process.env.PORT || 8000;
const INSTANCE_GROUP_ID = process.env.INSTANCE_GROUP_ID || "UNIDENTIFIED";
const INSTANCE_MODE: "CLUSTER_MANAGER" | "GLOBAL_MANAGER" | "ABSOLUTE" | "EXTENDED" | "BUILD_DATABASE" | "LOAD_DATABASE_DUMP" | "CLEAN_STORAGE" | "CLEAN_SITEMAPS" = process.env.INSTANCE_MODE || "ABSOLUTE" as any;
const USING_DOCKER = JSON.parse(process.env.USING_DOCKER || "false");
const PING_GOOGLE = JSON.parse(process.env.PING_GOOGLE || "false");

// building the logger
export const logger: winston.Logger = (
  INSTANCE_MODE === "BUILD_DATABASE" ||
  INSTANCE_MODE === "LOAD_DATABASE_DUMP"
) ? null : winston.createLogger({
  level: LOG_LEVEL || (NODE_ENV !== "production" ? "debug" : "info"),
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.DailyRotateFile({ filename: `logs/error.${INSTANCE_MODE}.log`, level: "error" }),
    new winston.transports.DailyRotateFile({ filename: `logs/info.${INSTANCE_MODE}.log`, level: "info" })
  ]
});

// if not production add a console.log
if (NODE_ENV !== "production" && logger) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

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
  knex: Knex;
  listener: Listener;
  cache: Cache;
  redis: RedisClient;
  redisGlobal: RedisClient;
  redisPub: RedisClient;
  redisSub: RedisClient;
  redisLocalPub: RedisClient;
  redisLocalSub: RedisClient;
  buildnumber: string;
  triggers: ITriggerRegistry;
  storage: IStorageProvidersObject;
  customUserTokenQuery: any;
  logger: winston.Logger;
  mailService: MailProvider<any>;
  userLocalizationService: UserLocalizationProvider<any>;
  locationSearchService: LocationSearchProvider<any>;
  customServices: {
    [name: string]: ServiceProvider<any>;
  };
}

export interface IServerDataType {
  CURRENCY_FACTORS: {
    [usdto: string]: number;
  }
}

export interface IStorageProviders {
  [type: string]: IStorageProviderClassType<any>;
}

export interface IServiceCustomizationType {
  storageServiceProviders?: IStorageProviders;
  mailServiceProvider?: IMailProviderClassType<any>;
  userLocalizationProvider?: IUserLocalizationProviderClassType<any>;
  currencyFactorsProvider?: ICurrencyFactorsProviderClassType<any>;
  locationSearchProvider?: ILocationSearchProviderClassType<any>;
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
}

export async function getStorageProviders(
  config: IConfigRawJSONDataType,
  sensitiveConfig: ISensitiveConfigRawJSONDataType,
  storageServiceProviders: IStorageProviders,
): Promise<{
  cloudClients: IStorageProvidersObject;
  instancesUsed: StorageProvider<any>[];
  classesUsed: IStorageProviderClassType<any>[];
}> {
  const finalOutput = {
    instancesUsed: [] as StorageProvider<any>[],
    classesUsed: [] as IStorageProviderClassType<any>[],
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
    const localClient = new LocalStorageService(null, sensitiveConfig.localContainer, prefix);
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
      const ServiceClass = (storageServiceProviders && storageServiceProviders[type]) || OpenstackService;

      const client = new ServiceClass(containerData.config, containerIdX, prefix);
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
    const redisPub: RedisClient = redis.createClient(redisConfig.pubSub);
    const redisSub: RedisClient = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : redis.createClient(redisConfig.pubSub);

    // so every other instance mode will end up setting up a local pub/sub for the local cache, however not the global manager
    // because it only talks to the global redis by publishing server data, and it shouldn't have anything to do with
    // the local redis
    if (INSTANCE_MODE !== "GLOBAL_MANAGER") {
      logger.info(
        "initializeServer: initializing local redis pub/sub client",
      );
    }
    const redisLocalPub: RedisClient = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : redis.createClient(redisConfig.cache);
    const redisLocalSub: RedisClient = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : redis.createClient(redisConfig.cache);

    // same for this, for the cache, as the cache is the same that is used for local pub/sub
    if (INSTANCE_MODE !== "GLOBAL_MANAGER") {
      logger.info(
        "initializeServer: initializing redis cache client",
      );
    }
    const redisClient: RedisClient = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : redis.createClient(redisConfig.cache);

    // now for the cluster manager, which manages a specific cluster, it goes here, and it doesn't
    // go futher, the job of the cluster manager is to mantain the cluster redis database
    // up to date, and handle the requests for these up to date requests, it basically
    // listens to the register requests that are given by other instances and then listens to
    // changed events of the same type the client uses to update the redis database
    if (INSTANCE_MODE === "CLUSTER_MANAGER") {
      // as such 
      const cache = new Cache(redisClient, null, null, null, null, null, null);
      logger.info(
        "initializeServer: server initialized in cluster manager exclusive mode flushing redis",
      );

      // in case both the global and local cluster are the same
      const getPromisified = promisify(redisClient.get).bind(redisClient);
      const setPromisified = promisify(redisClient.set).bind(redisClient);

      const serverDataStr = await getPromisified(SERVER_DATA_IDENTIFIER) || null;
      const currencyLayerCachedResponseRestore = await getPromisified(CACHED_CURRENCY_RESPONSE) || null;
      const flushAllPromisified = promisify(redisClient.flushall).bind(redisClient);
      await flushAllPromisified();
      if (serverDataStr) {
        await setPromisified(SERVER_DATA_IDENTIFIER, serverDataStr);
      }
      if (currencyLayerCachedResponseRestore) {
        await setPromisified(CACHED_CURRENCY_RESPONSE, currencyLayerCachedResponseRestore);
      }
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
        sensitiveConfig,
      );
      listener.informClusterManagerReset();
      return;
    }

    logger.info(
      "initializeServer: initializing redis global cache client",
    );
    const redisGlobalClient: RedisClient = redis.createClient(redisConfig.global);

    logger.info(
      "initializeServer: initializing itemize server root",
    );
    const root = new Root(build);

    // Create the connection string
    const dbConnectionKnexConfig = {
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
    const knex = Knex({
      client: "pg",
      debug: process.env.NODE_ENV !== "production",
      connection: dbConnectionKnexConfig,
    });

    const domain = NODE_ENV === "production" ? config.productionHostname : config.developmentHostname;

    if (INSTANCE_MODE === "GLOBAL_MANAGER" || INSTANCE_MODE === "ABSOLUTE") {
      logger.info(
        "initializeServer: setting up global manager",
      );
      const CurrencyFactorsClass = (serviceCustom && serviceCustom.currencyFactorsProvider) || CurrencyLayerService;
      const currencyFactorsService = sensitiveConfig.currencyFactors ?
        new CurrencyFactorsClass(sensitiveConfig.currencyFactors, redisGlobalClient) :
        null;
      currencyFactorsService && await currencyFactorsService.initialize();
      const manager: GlobalManager = new GlobalManager(
        root,
        knex,
        redisGlobalClient,
        redisPub,
        config,
        sensitiveConfig,
        currencyFactorsService,
      );

      if (serviceCustom && serviceCustom.customServices) {
        await Promise.all(
          Object.keys(serviceCustom.customServices).map(async (keyName) => {
            const CustomServiceClass = serviceCustom.customServices[keyName];
  
            if (!CustomServiceClass.isGlobal()) {
              return;
            }
  
            const configData = {
              ...(sensitiveConfig.custom && sensitiveConfig.custom[keyName]),
              ...(config.custom && config.custom[keyName]),
            };
            const customGlobalService = new CustomServiceClass(configData);
            await manager.installGlobalService(customGlobalService);
          })
        );
      }

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
            storageClient = new LocalStorageService(null, sensitiveConfig.seoContainerID, prefix);
          } else {
            const type = seoContainerData.type;
            const ServiceClass = (serviceCustom && serviceCustom.storageServiceProviders[type]) || OpenstackService;
            storageClient = new ServiceClass(seoContainerData.config, sensitiveConfig.seoContainerID, prefix);
          }

          await storageClient.initialize();

          const seoGenerator = new SEOGenerator(
            seoConfig.seoRules,
            storageClient,
            knex,
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

    const storageClients = await getStorageProviders(config, sensitiveConfig, serviceCustom && serviceCustom.storageServiceProviders);

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
    const getPromisified = promisify(redisGlobalClient.get).bind(redisGlobalClient);
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
      const serverDataStr = await getPromisified(SERVER_DATA_IDENTIFIER) || null;
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
    const cache = new Cache(redisClient, knex, sensitiveConfig, storageClients.cloudClients, domain, root, serverData);
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
      knex,
      server,
      sensitiveConfig,
    );

    if (sensitiveConfig.userLocalization) {
      logger.info(
        "initializeServer: initializing user localization service",
      );
    }
    const UserLocalizationServiceClass = (serviceCustom && serviceCustom.userLocalizationProvider) || IPStackService;
    const userLocalizationService = sensitiveConfig.userLocalization ?
      new UserLocalizationServiceClass(sensitiveConfig.userLocalization) :
      null;
    userLocalizationService && await userLocalizationService.initialize();

    if (sensitiveConfig.mail) {
      logger.info(
        "initializeServer: initializing mail service",
      );
    }
    let MailServiceClass = (serviceCustom && serviceCustom.mailServiceProvider) || MailgunService;
    if (process.env.FAKE_EMAILS === "true") {
      logger.info(
        "initializeServer: using fake email service",
      );
      // typescript messes the types again
      MailServiceClass = FakeMailService as any;
    }
    const mailService = sensitiveConfig.mail ?
      new MailServiceClass(
        sensitiveConfig.mail,
        cache,
        root,
        config,
        sensitiveConfig,
      ) : null;
    mailService && await mailService.initialize();

    if (sensitiveConfig.locationSearch) {
      logger.info(
        "initializeServer: initializing location search service",
      );
    }
    const LocationSearchClass = (serviceCustom && serviceCustom.locationSearchProvider) || HereMapsService;
    const locationSearchService = sensitiveConfig.locationSearch ?
      new LocationSearchClass(sensitiveConfig.locationSearch) : null;
    locationSearchService && await locationSearchService.initialize();

    const customServices: {
      [name: string]: ServiceProvider<any>,
    } = {};

    const customServicesInstances: ServiceProvider<any>[] = [];
    const customServiceClassesUsed: IServiceProviderClassType<any>[] = [];

    if (serviceCustom && serviceCustom.customServices) {
      await Promise.all(
        Object.keys(serviceCustom.customServices).map(async (keyName) => {
          const CustomServiceClass = serviceCustom.customServices[keyName];

          if (CustomServiceClass.isGlobal()) {
            return;
          }

          const configData = {
            ...(sensitiveConfig.custom && sensitiveConfig.custom[keyName]),
            ...(config.custom && config.custom[keyName]),
          };
          customServices[keyName] = new CustomServiceClass(configData);
          await customServices[keyName].initialize();

          customServicesInstances.push(customServices[keyName]);
          if (!customServiceClassesUsed.includes(CustomServiceClass)) {
            customServiceClassesUsed.push(CustomServiceClass);
          }
        })
      );
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
      knex,
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
      mailService,
      storage: storageClients.cloudClients,
      logger,
      customServices,
      // assigned later during rest setup
      customUserTokenQuery: null,
    };

    // we setup the index checker now that we have the server data
    PropertyDefinition.indexChecker = serverSideIndexChecker.bind(null, appData);

    logger.info(
      "initializeServer: INSTANCE_GROUP_ID is " + INSTANCE_GROUP_ID,
    );

    if (INSTANCE_MODE === "ABSOLUTE") {
      logger.info(
        "initializeServer: server initialized in absolute mode flushing redis",
      );

      const flushAllPromisified = promisify(appData.redis.flushall).bind(appData.redis);
      const getPromisified = promisify(appData.redis.get).bind(appData.redis);
      const setPromisified = promisify(appData.redis.set).bind(appData.redis);
      const currencyCachedResponseRestore = await getPromisified(CACHED_CURRENCY_RESPONSE);
      const serverDataCachedRestore = await getPromisified(SERVER_DATA_IDENTIFIER);
      await flushAllPromisified();
      // this cached data is intended for the global,
      // but the global and the local might be set to the same redis
      // database, which is not really optimal, but what can you do
      // but it might be the same, I need to restore it in order
      // to avoid draining the currency layer api
      if (currencyCachedResponseRestore) {
        await setPromisified(CACHED_CURRENCY_RESPONSE, currencyCachedResponseRestore);
      }
      if (serverDataCachedRestore) {
        await setPromisified(SERVER_DATA_IDENTIFIER, serverDataCachedRestore);
      }
    } else {
      logger.info(
        "initializeServer: server initialized in standard mode, not flushing redis",
      );
    }

    logger.info(
      "initializeServer: setting execution of all service providers",
    );
    userLocalizationService && userLocalizationService.execute();
    mailService && mailService.execute();
    locationSearchService && locationSearchService.execute();
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
