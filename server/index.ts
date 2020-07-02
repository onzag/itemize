import express from "express";
import graphqlHTTP from "express-graphql";
import http from "http";
import path from "path";
import fs from "fs";
import Root, { IRootRawJSONDataType, ILangLocalesType } from "../base/Root";
import resolvers from "./resolvers";
import { getGQLSchemaForRoot, IGQLQueryFieldsDefinitionType } from "../base/Root/gql";
import Knex from "knex";
import { types } from "pg";
import { MAX_FILE_TOTAL_BATCH_COUNT, MAX_FILE_SIZE, MAX_FIELD_SIZE, ENDPOINT_ERRORS, SERVER_DATA_IDENTIFIER, CACHED_CURRENCY_LAYER_RESPONSE } from "../constants";
import { GraphQLError } from "graphql";
import { EndpointError, EndpointErrorType } from "../base/errors";
import PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import { serverSideIndexChecker } from "../base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers";
import restServices from "./rest";
import { customUserQueries } from "./user/queries";
import { customUserMutations } from "./user/mutations";
import { Listener } from "./listener";
import redis, { RedisClient } from "redis";
import { Cache } from "./cache";
import { graphqlUploadExpress } from "graphql-upload";
import { buildCustomTokenQueries, ICustomTokensType } from "./custom-graphql";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType, IDBConfigRawJSONDataType, IRedisConfigRawJSONDataType } from "../config";
import { getMode } from "./mode";
import { ITriggerRegistry } from "./resolvers/triggers";
import { customUserTriggers } from "./user/triggers";
import { setupIPStack, IPStack } from "./services/ipstack";
import { setupMailgun } from "./services/mailgun";
import Mailgun from "mailgun-js";
import { userRestServices } from "./user/rest";
import pkgcloud from "pkgcloud";
import { setupHere, Here } from "./services/here";
import { promisify } from "util";

import winston from "winston";
import "winston-daily-rotate-file";
import build from "../dbbuilder";
import { GlobalManager } from "./global-manager";
import { ISSRRuleSet } from "./ssr";
import { ssrGenerator } from "./ssr/generator";
import { IRendererContext } from "../client/providers/renderer";
import { ILocaleContextType } from "../client/internal/app";
import { ICollectorType } from "../client";
import { Pool } from "tarn";
import { retrieveRootPool } from "./rootpool";
import { removeFolderFor } from "../base/Root/Module/ItemDefinition/PropertyDefinition/sql-files";

// get the environment in order to be able to set it up
const NODE_ENV = process.env.NODE_ENV;
const LOG_LEVEL = process.env.LOG_LEVEL;
const PORT = process.env.PORT || 8000;
const INSTANCE_GROUP_ID = process.env.INSTANCE_GROUP_ID || "UNIDENTIFIED";
const INSTANCE_MODE: "CLUSTER_MANAGER" | "GLOBAL_MANAGER" | "ABSOLUTE" | "EXTENDED" | "BUILD_DATABASE" | "CLEAN_STORAGE" = process.env.INSTANCE_MODE || "ABSOLUTE" as any;
const USING_DOCKER = JSON.parse(process.env.USING_DOCKER || "false");

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
const app = INSTANCE_MODE === "BUILD_DATABASE" || INSTANCE_MODE === "CLEAN_STORAGE" ? null : express();

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
  mainWrapper?: (mainComponet: React.ReactElement, localeContext: ILocaleContextType) => React.ReactElement;
  collector?: ICollectorType;
}

export interface ISEORobotsConfig {
  [userAgent: string]: string[]
}

export interface ISEOConfig {
  robots: {

  }
}

export interface IAppDataType {
  root: Root;
  rootPool: Pool<Root>,
  langLocales: ILangLocalesType;
  ssrConfig: ISSRConfig;
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
 * This is the function that catches the errors that are thrown
 * within graphql
 * @param error the error that is thrown
 */
const customFormatErrorFn = (error: GraphQLError) => {
  const originalError = error.originalError;
  let constructor = null;
  if (originalError) {
    constructor = originalError.constructor;
  }

  let extensions: EndpointErrorType;
  switch (constructor) {
    case EndpointError:
      const gqlDataInputError = error.originalError as EndpointError;
      extensions = gqlDataInputError.data;
      break;
    default:
      logger.error(
        "customFormatErrorFn: Caught unexpected error from graphql parsing",
        {
          errMessage: error.message,
          errStack: error.stack,
        },
      );
      extensions = {
        message: "Unspecified Error while parsing data",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      };
  }

  return {
    extensions,
    ...error,
  };
};

/**
 * The resolve wrappers that wraps every resolve function
 * from graphql
 * @param fn the function that is supposed to run
 * @param source graphql source
 * @param args grapql args
 * @param context grapql context
 * @param info graphql info
 */
async function customResolveWrapper(
  fn: any,
  source: any,
  args: any,
  context: any,
  info: any,
): Promise<any> {
  try {
    return await fn(source, args, context, info);
  } catch (err) {
    if (err instanceof EndpointError) {
      throw err;
    }
    logger.error(
      "customResolveWrapper: Found internal server error",
      {
        errStack: err.stack,
        errMessage: err.message,
      }
    );
    throw new EndpointError({
      message: "Internal Server Error",
      code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
    });
  }
}

/**
 * Initializes the server application with its configuration
 * @param appData the application data to use
 * @param custom the custom config that has been passed
 */
function initializeApp(appData: IAppDataType, custom: IServerCustomizationDataType) {
  // removing the powered by header
  app.use((req, res, next) => {
    res.removeHeader("X-Powered-By");
    next();
  });

  // if we have a custom router and custom router endpoint rather than the standard
  if (custom.customRouterEndpoint) {
    app.use(custom.customRouterEndpoint, custom.customRouter(appData));
  } else if (custom.customRouter) {
    app.use(custom.customRouter(appData));
  }

  // adding rest services
  app.use("/rest/user", userRestServices(appData));
  app.use("/rest", restServices(appData));

  const customUserQueriesProcessed = customUserQueries(appData);
  appData.customUserTokenQuery = customUserQueriesProcessed.token.resolve;

  // custom graphql queries combined
  const allCustomQueries = {
    ...customUserQueriesProcessed,
    ...(custom.customGQLQueries && custom.customGQLQueries(appData)),
    ...(custom.customTokenGQLQueries && buildCustomTokenQueries(appData, custom.customTokenGQLQueries)),
  };

  // custom mutations combined
  const allCustomMutations = {
    ...customUserMutations(appData),
    ...(custom.customGQLMutations && custom.customGQLMutations(appData)),
  };

  // now we need to combine such queries with the resolvers
  const finalAllCustomQueries = {};
  Object.keys(allCustomQueries).forEach((customQueryKey) => {
    finalAllCustomQueries[customQueryKey] = {
      ...allCustomQueries[customQueryKey],
      resolve: customResolveWrapper.bind(null, allCustomQueries[customQueryKey].resolve),
    };
  });

  // do the same with the mutations
  const finalAllCustomMutations = {};
  Object.keys(allCustomMutations).forEach((customMutationKey) => {
    finalAllCustomMutations[customMutationKey] = {
      ...allCustomMutations[customMutationKey],
      resolve: customResolveWrapper.bind(null, allCustomMutations[customMutationKey].resolve),
    };
  });

  // now weadd the graphql endpoint
  app.use(
    "/graphql",
    graphqlUploadExpress({
      maxFileSize: MAX_FILE_SIZE,
      maxFiles: MAX_FILE_TOTAL_BATCH_COUNT,
      maxFieldSize: MAX_FIELD_SIZE,
    }),
    graphqlHTTP({
      schema: getGQLSchemaForRoot(
        appData.root,
        finalAllCustomQueries,
        finalAllCustomMutations,
        resolvers(appData),
      ),
      graphiql: true,
      customFormatErrorFn,
    }),
  );

  // service worker setup
  app.get("/sw.development.js", (req, res) => {
    res.sendFile(path.resolve(path.join("dist", "data", "service-worker.development.js")));
  });
  app.get("/sw.production.js", (req, res) => {
    res.sendFile(path.resolve(path.join("dist", "data", "service-worker.production.js")));
  });

  const router = express.Router();
  Object.keys(appData.ssrConfig.ssrRules).forEach((urlCombo) => {
    const rule = appData.ssrConfig.ssrRules[urlCombo];
    urlCombo.split(",").forEach((url) => {
      const actualURL = url.startsWith("/") ? url : "/" + url;
      router.get(actualURL, (req, res) => {
        const mode = getMode(appData, req);
        if (mode === "development") {
          ssrGenerator(req, res, appData.indexDevelopment, appData, mode, rule)
        } else {
          ssrGenerator(req, res, appData.indexProduction, appData, mode, rule);
        }
      });
    });
  });
  
  // TODO root with redirect for homepage that doesn't rely on the client for it /
  app.use("/:lang", (req, res, next) => {
    if (req.params.lang.length !== 2) {
      next();
      return;
    }
      
    router(req, res, next);
  });

  // and now the main index setup
  app.get("*", (req, res) => {
    const mode = getMode(appData, req);
    if (mode === "development") {
      ssrGenerator(req, res, appData.indexDevelopment, appData, mode, null)
    } else {
      ssrGenerator(req, res, appData.indexProduction, appData, mode, null);
    }
  });
}

/**
 * Provides the pkgloud client container from ovh
 * @param client the client to use
 * @param containerName the container name
 */
function getContainerPromisified(client: pkgcloud.storage.Client, containerName: string): Promise<pkgcloud.storage.Container> {
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
 * @param ssrRules the server side rendering rules
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
export async function initializeServer(ssrConfig: ISSRConfig, custom: IServerCustomizationDataType = {}) {
  if (INSTANCE_MODE === "BUILD_DATABASE") {
    build(NODE_ENV);
    return;
  }

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
    if (USING_DOCKER) {
      if (redisConfig.cache.host === "127.0.0.1") {
        redisConfig.cache.host = "redis";
      }
      if (redisConfig.pubSub.host === "127.0.0.1") {
        redisConfig.pubSub.host = "redis";
      }
      if (redisConfig.global.host === "127.0.0.1") {
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

    logger.info(
      INSTANCE_MODE === "GLOBAL_MANAGER" ?
        "initializeServer: initializing redis global pub client" :
        "initializeServer: initializing redis global pub/sub client",
    );
    const redisPub: RedisClient = redis.createClient(redisConfig.pubSub);
    const redisSub: RedisClient = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : redis.createClient(redisConfig.pubSub);

    if (INSTANCE_MODE !== "GLOBAL_MANAGER") {
      logger.info(
        "initializeServer: initializing local redis pub/sub client",
      );
    }
    const redisLocalPub: RedisClient = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : redis.createClient(redisConfig.cache);
    const redisLocalSub: RedisClient = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : redis.createClient(redisConfig.cache);

    if (INSTANCE_MODE !== "GLOBAL_MANAGER") {
      logger.info(
        "initializeServer: initializing redis cache client",
      );
    }
    const redisClient: RedisClient = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : redis.createClient(redisConfig.cache);

    if (INSTANCE_MODE === "CLUSTER_MANAGER") {
      const cache = new Cache(redisClient, null, null, null, null);
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
      new Listener(
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

    if (INSTANCE_MODE === "GLOBAL_MANAGER" || INSTANCE_MODE === "ABSOLUTE") {
      logger.info(
        "initializeServer: setting up global manager",
      );
      const manager = new GlobalManager(root, knex, redisGlobalClient, redisPub, config, sensitiveConfig);
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
      if (prefix.indexOf("/") !== 0) {
        prefix = "https://" + prefix;
      }
      pkgcloudUploadContainers[containerIdX] = {
        prefix,
        container: await getContainerPromisified(pkgcloudStorageClients[containerIdX], containerData.containerName),
      };
    }));

    if (INSTANCE_MODE === "CLEAN_STORAGE") {
      logger.info(
        "initializeServer: cleaning storage",
      );

      await Promise.all(Object.keys(pkgcloudUploadContainers).map(async (containerId) => {
        logger.info(
          "initializeServer: cleaning " + containerId,
        );
        const container = pkgcloudUploadContainers[containerId];
        await removeFolderFor(container.container, "");
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
    const cache = new Cache(redisClient, knex, pkgcloudUploadContainers, root, serverData);
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
      triggers: {
        module: {},
        itemDefinition: {},

        ...customUserTriggers,
        ...custom.customTriggers,
      },
      ipStack,
      here,
      mailgun,
      pkgcloudStorageClients,
      pkgcloudUploadContainers,

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
