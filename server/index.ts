import express from "express";
import http from "http";
import path from "path";
import fs from "fs";
import Root, { IRootRawJSONDataType, ILangLocalesType } from "../base/Root";
import { IGQLQueryFieldsDefinitionType } from "../base/Root/gql";
import Knex from "knex";
import { types } from "pg";
import { SERVER_DATA_IDENTIFIER, CACHED_CURRENCY_LAYER_RESPONSE } from "../constants";
import PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import { serverSideIndexChecker } from "../base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers";
import { Listener } from "./listener";
import redis, { RedisClient } from "redis";
import { Cache } from "./cache";
import { ICustomTokensType } from "./custom-graphql";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType, IDBConfigRawJSONDataType, IRedisConfigRawJSONDataType } from "../config";
import { ITriggerRegistry, mergeTriggerRegistries } from "./resolvers/triggers";
import { customUserTriggers } from "./user/triggers";
import { setupIPStack, IPStack } from "./services/ipstack";
import { setupMailgun } from "./services/mailgun";
import Mailgun from "mailgun-js";
import pkgcloud from "pkgcloud";
import { setupHere, Here } from "./services/here";
import { promisify } from "util";

import winston from "winston";
import "winston-daily-rotate-file";
import build from "../dbbuilder";
import { GlobalManager } from "./global-manager";
import { ISSRRuleSet } from "./ssr";
import { IRendererContext } from "../client/providers/renderer";
import { ILocaleContextType } from "../client/internal/providers/locale-provider";
import { ICollectorType } from "../client";
import { Pool } from "tarn";
import { retrieveRootPool } from "./rootpool";
import { removeFolderFor } from "../base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management";
import { ISEORuleSet } from "./seo";
import { SEOGenerator } from "./seo/generator";
import { initializeApp } from "./initialize";

// get the environment in order to be able to set it up
const NODE_ENV = process.env.NODE_ENV;
const LOG_LEVEL = process.env.LOG_LEVEL;
const PORT = process.env.PORT || 8000;
const INSTANCE_GROUP_ID = process.env.INSTANCE_GROUP_ID || "UNIDENTIFIED";
const INSTANCE_MODE: "CLUSTER_MANAGER" | "GLOBAL_MANAGER" | "ABSOLUTE" | "EXTENDED" | "BUILD_DATABASE" | "CLEAN_STORAGE" | "CLEAN_SITEMAPS" = process.env.INSTANCE_MODE || "ABSOLUTE" as any;
const USING_DOCKER = JSON.parse(process.env.USING_DOCKER || "false");
const PING_GOOGLE = JSON.parse(process.env.PING_GOOGLE || "false");

// building the logger
export const logger: winston.Logger = INSTANCE_MODE === "BUILD_DATABASE" ? null : winston.createLogger({
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
export const app = INSTANCE_MODE === "BUILD_DATABASE" || INSTANCE_MODE === "CLEAN_STORAGE" ? null : express();

/**
 * Contains all the pkgcloud clients connection for every container id
 */
export type PkgCloudClients = {[containerId: string]: pkgcloud.storage.Client};
/**
 * Contains all the pkgcloud containers for every container id
 */
export type PkgCloudContainers = {
  [containerId: string]: {
    prefix: string,
    container: pkgcloud.storage.Container,
  }
};

/**
 * Specifies the SSR configuration for the multiple pages
 */
export interface ISSRConfig {
  ssrRules: ISSRRuleSet,
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
  ipStack: IPStack,
  here: Here,
  mailgun: Mailgun.Mailgun;
  pkgcloudStorageClients: PkgCloudClients;
  pkgcloudUploadContainers: PkgCloudContainers;
  customUserTokenQuery: any;
  logger: winston.Logger;
}

export interface IServerDataType {
  CURRENCY_FACTORS: {
    [usdto: string]: number;
  }
}

export interface IServerCustomizationDataType {
  customGQLQueries?: (appData: IAppDataType) => IGQLQueryFieldsDefinitionType;
  customTokenGQLQueries?: ICustomTokensType;
  customGQLMutations?: (appData: IAppDataType) => IGQLQueryFieldsDefinitionType;
  customRouterEndpoint?: string;
  customRouter?: (appData: IAppDataType) => express.Router;
  customTriggers?: ITriggerRegistry;
}

/**
 * Provides the pkgloud client container from ovh
 * @param client the client to use
 * @param containerName the container name
 */
export function getContainerPromisified(client: pkgcloud.storage.Client, containerName: string): Promise<pkgcloud.storage.Container> {
  return new Promise((resolve, reject) => {
    client.getContainer(containerName, (err, container) => {
      if (err) {
        reject(err);
      } else {
        resolve(container);
      }
    });
  });
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
  if (INSTANCE_MODE === "BUILD_DATABASE") {
    build(NODE_ENV);
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
      const currencyLayerCachedResponseRestore = await getPromisified(CACHED_CURRENCY_LAYER_RESPONSE) || null;
      const flushAllPromisified = promisify(redisClient.flushall).bind(redisClient);
      await flushAllPromisified();
      if (serverDataStr) {
        await setPromisified(SERVER_DATA_IDENTIFIER, serverDataStr);
      }
      if (currencyLayerCachedResponseRestore) {
        await setPromisified(CACHED_CURRENCY_LAYER_RESPONSE, currencyLayerCachedResponseRestore);
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
      const manager: GlobalManager = new GlobalManager(root, knex, redisGlobalClient, redisPub, config, sensitiveConfig);
      if (seoConfig && sensitiveConfig.seoContainerID) {
        logger.info(
          "initializeServer: initializing SEO configuration",
        );
        const seoContainerData = sensitiveConfig.openstackContainers[sensitiveConfig.seoContainerID];
        if (!seoContainerData) {
          logger.error(
            "initializeServer [SERIOUS]: Invalid seo container id for the openstack container '" + sensitiveConfig.seoContainerID + "'",
          );
        } else {
          const seoContainerClient = pkgcloud.storage.createClient({
            provider: "openstack",
            username: seoContainerData.username,
            keystoneAuthVersion: 'v3',
            region: seoContainerData.region,
            domainId: seoContainerData.domainId, //default
            domainName: seoContainerData.domainName,
            password: seoContainerData.password,
            authUrl: seoContainerData.authUrl,
          } as any);
    
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
          const seoContainer = await getContainerPromisified(seoContainerClient, seoContainerData.containerName);
          const seoGenerator = new SEOGenerator(
            seoConfig.seoRules,
            seoContainer,
            knex,
            root,
            prefix,
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
      "initializeServer: initializing openstack pkgcloud objectstorage clients",
    );

    const pkgcloudStorageClients: PkgCloudClients = {};
    const pkgcloudUploadContainers: PkgCloudContainers = {};
    if (sensitiveConfig.openstackContainers) {
      await Promise.all(Object.keys(sensitiveConfig.openstackContainers).map(async (containerIdX) => {
        const containerData = sensitiveConfig.openstackContainers[containerIdX];
        pkgcloudStorageClients[containerIdX] = pkgcloud.storage.createClient({
          provider: "openstack",
          username: containerData.username,
          keystoneAuthVersion: 'v3',
          region: containerData.region,
          domainId: containerData.domainId, //default
          domainName: containerData.domainName,
          password: containerData.password,
          authUrl: containerData.authUrl,
        } as any);

        logger.info(
          "initializeServer: retrieving container " + containerData.containerName + " in container id " + containerIdX,
        );
        let prefix = config.containersHostnamePrefixes[containerIdX];
        if (!prefix) {
          logger.error(
            "initializeServer [SERIOUS]: Could not find prefix for SEO in '" + containerIdX + "'",
          );
          process.exit(1);
        }
        if (prefix.indexOf("/") !== 0) {
          prefix = "https://" + prefix;
        }
        pkgcloudUploadContainers[containerIdX] = {
          prefix,
          container: await getContainerPromisified(pkgcloudStorageClients[containerIdX], containerData.containerName),
        };
      }));
    }

    if (INSTANCE_MODE === "CLEAN_STORAGE" || INSTANCE_MODE === "CLEAN_SITEMAPS") {
      logger.info(
        "initializeServer: cleaning storage",
      );

      await Promise.all(Object.keys(pkgcloudUploadContainers).map(async (containerId) => {
        if (INSTANCE_MODE === "CLEAN_SITEMAPS") {
          logger.info(
            "initializeServer: cleaning " + containerId + " sitemaps for " + domain,
          );
          const container = pkgcloudUploadContainers[containerId];
          await removeFolderFor(container.container, "sitemaps/" + domain);
        } else {
          logger.info(
            "initializeServer: cleaning " + containerId + " data for " + domain,
          );
          const container = pkgcloudUploadContainers[containerId];
          await removeFolderFor(container.container, domain);
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
    const cache = new Cache(redisClient, knex, sensitiveConfig, pkgcloudUploadContainers, domain, root, serverData);
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

    if (sensitiveConfig.ipStackAccessKey) {
      logger.info(
        "initializeServer: initializing ipstack connection",
      );
    }
    const ipStack = sensitiveConfig.ipStackAccessKey ?
      setupIPStack(sensitiveConfig.ipStackAccessKey, !!sensitiveConfig.ipStackHttpsEnabled) :
      null;

    if (sensitiveConfig.mailgunAPIKey && sensitiveConfig.mailgunDomain && sensitiveConfig.mailgunAPIHost) {
      logger.info(
        "initializeServer: initializing mailgun connection",
      );
    }
    const mailgun = sensitiveConfig.mailgunAPIKey && sensitiveConfig.mailgunDomain && sensitiveConfig.mailgunAPIHost ?
      setupMailgun({
        apiKey: sensitiveConfig.mailgunAPIKey,
        domain: sensitiveConfig.mailgunDomain,
        host: sensitiveConfig.mailgunAPIHost,
      }) : null;

    if (sensitiveConfig.hereApiKey) {
      logger.info(
        "initializeServer: initializing here maps",
      );
    }
    const here = sensitiveConfig.hereApiKey ?
      setupHere(sensitiveConfig.hereApiKey) : null;

    logger.info(
      "initializeServer: configuring app data build",
    );

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
      ),
      ipStack,
      here,
      mailgun,
      pkgcloudStorageClients,
      pkgcloudUploadContainers,

      logger,

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
      const currencyLayerCachedResponseRestore = await getPromisified(CACHED_CURRENCY_LAYER_RESPONSE);
      await flushAllPromisified();
      // this cached data is intended for the global, but it might be the same, I need to restore it in order
      // to avoid draining the currency layer api
      if (currencyLayerCachedResponseRestore) {
        await setPromisified(CACHED_CURRENCY_LAYER_RESPONSE, currencyLayerCachedResponseRestore);
      }
    } else {
      logger.info(
        "initializeServer: server initialized in standard mode, not flushing redis",
      );
    }

    logger.info(
      "initializeServer: setting up endpoints",
    );
    initializeApp(appData, custom);

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
