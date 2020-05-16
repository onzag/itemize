import express from "express";
import graphqlHTTP from "express-graphql";
import http from "http";
import path from "path";
import fs from "fs";
import Root, { IRootRawJSONDataType } from "../base/Root";
import resolvers from "./resolvers";
import { getGQLSchemaForRoot, IGQLQueryFieldsDefinitionType } from "../base/Root/gql";
import Knex from "knex";
import { types } from "pg";
import { MAX_FILE_TOTAL_BATCH_COUNT, MAX_FILE_SIZE, MAX_FIELD_SIZE, ENDPOINT_ERRORS } from "../constants";
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

// building the logger
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV !== "production" ? "debug" : "info"),
  format: winston.format.json(),
  transports: [
    new winston.transports.DailyRotateFile({ filename: "logs/error.log", level: "error" }),
    new winston.transports.DailyRotateFile({ filename: "logs/info.log", level: "info" })
  ]
});

// if not production add a console.log
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

// Setting the parsers, postgresql comes with
// its own way to return this data and I want it
// to keep it in sync with all the data that we are
// currently using, first we set all the timezones to
// utc and then format it into what the client expects
// also do the same with time and date
const TIMESTAMP_OID = 1114;
const TIMESTAMPTZ_OID = 1184;
const TIME_OID = 1083;
const DATE_OID = 1082;
types.setTypeParser(TIMESTAMP_OID, (val) => val);
types.setTypeParser(TIMESTAMPTZ_OID, (val) => val);
types.setTypeParser(TIME_OID, (val) => val);
types.setTypeParser(DATE_OID, (val) => val);

const fsAsync = fs.promises;

const app = express();

export interface IAppDataType {
  root: Root;
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
  buildnumber: string;
  triggers: ITriggerRegistry;
  ipStack: IPStack,
  here: Here,
  mailgun: Mailgun.Mailgun;
  pkgcloudStorageClient: pkgcloud.storage.Client,
  pkgcloudUploadsContainer: pkgcloud.storage.Container;
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
          errMessage: error.originalError.message,
          errStack: error.originalError.stack,
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

  // custom graphql queries combined
  const allCustomQueries = {
    ...customUserQueries(appData),
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

  // and now the main index setup
  app.get("*", (req, res) => {
    res.setHeader("content-type", "text/html; charset=utf-8");
    const mode = getMode(appData, req);
    if (mode === "development") {
      res.end(appData.indexDevelopment);
    } else {
      res.end(appData.indexProduction);
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
export async function initializeServer(custom: IServerCustomizationDataType = {}) {
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
    [
      rawConfig,
      rawSensitiveConfig,
      rawRedisConfig,
      rawDbConfig,
      index,
      rawBuild,
      buildnumber,
    ] = await Promise.all([
      fsAsync.readFile(path.join("dist", "config.json"), "utf8"),
      fsAsync.readFile(path.join("dist", "sensitive.json"), "utf8"),
      fsAsync.readFile(path.join("dist", "redis.json"), "utf8"),
      fsAsync.readFile(path.join("dist", "db.json"), "utf8"),
      fsAsync.readFile(path.join("dist", "data", "index.html"), "utf8"),
      fsAsync.readFile(path.join("dist", "data", "build.all.json"), "utf8"),
      fsAsync.readFile(path.join("dist", "buildnumber"), "utf8"),
    ]);
    const config: IConfigRawJSONDataType = JSON.parse(rawConfig);
    const sensitiveConfig: ISensitiveConfigRawJSONDataType = JSON.parse(rawSensitiveConfig);
    const dbConfig: IDBConfigRawJSONDataType = JSON.parse(rawDbConfig);
    const redisConfig: IRedisConfigRawJSONDataType = JSON.parse(rawRedisConfig);
    const build: IRootRawJSONDataType = JSON.parse(rawBuild);

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

    // this shouldn't be necessary but we do it anyway
    buildnumber = buildnumber.replace("\n", "").trim();
    logger.info(
      "initializeServer: buildnumber is " + buildnumber,
    );

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

    logger.info(
      "initializeServer: initializing redis cache client",
    );
    const redisClient: RedisClient = redis.createClient(redisConfig.cache);
    logger.info(
      "initializeServer: initializing redis global cache client",
    );
    const redisGlobalClient: RedisClient = redis.createClient(redisConfig.global);

    logger.info(
      "initializeServer: initializing redis pub/sub client",
    );
    const redisPub: RedisClient = redis.createClient(redisConfig.pubSub);
    const redisSub: RedisClient = redis.createClient(redisConfig.pubSub);

    PropertyDefinition.indexChecker = serverSideIndexChecker.bind(null, knex);

    // due to a bug in the types the create client function is missing
    // domainId and domainName
    logger.info(
      "initializeServer: initializing openstack pkgcloud objectstorage client",
    );
    const pkgcloudStorageClient = pkgcloud.storage.createClient({
      provider: "openstack",
      username: sensitiveConfig.openStackUsername,
      keystoneAuthVersion: 'v3',
      region: sensitiveConfig.openStackRegion,
      domainId: "default",
      domainName: sensitiveConfig.openStackDomainName,
      password: sensitiveConfig.openStackPassword,
      authUrl: sensitiveConfig.openStackAuthUrl,
    } as any);

    logger.info(
      "initializeServer: retrieving container " + sensitiveConfig.openStackUploadsContainerName,
    );
    const pkgcloudUploadsContainer =
      await getContainerPromisified(pkgcloudStorageClient, sensitiveConfig.openStackUploadsContainerName);

    logger.info(
      "initializeServer: initializing cache instance",
    );
    const cache = new Cache(redisClient, knex, pkgcloudUploadsContainer, root);
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
      root,
      cache,
      knex,
      server,
    );

    if (sensitiveConfig.ipStackAccessKey) {
      logger.info(
        "initializeServer: initializing ipstack connection",
      );
    }
    const ipStack = sensitiveConfig.ipStackAccessKey ?
      setupIPStack(sensitiveConfig.ipStackAccessKey) :
      null;

    if (sensitiveConfig.mailgunAPIKey && sensitiveConfig.mailgunDomain) {
      logger.info(
        "initializeServer: initializing mailgun connection",
      );
    }
    const mailgun = sensitiveConfig.mailgunAPIKey && sensitiveConfig.mailgunDomain ?
      setupMailgun({
        apiKey: sensitiveConfig.mailgunAPIKey,
        domain: sensitiveConfig.mailgunDomain,
      }) : null;

    if (sensitiveConfig.hereAppID && sensitiveConfig.hereAppCode) {
      logger.info(
        "initializeServer: initializing here maps",
      );
    }
    const here = sensitiveConfig.hereAppID && sensitiveConfig.hereAppCode ?
      setupHere(sensitiveConfig.hereAppID, sensitiveConfig.hereAppCode) : null;

    logger.info(
      "initializeServer: configuring app data build",
    );
    const appData: IAppDataType = {
      root,
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
      pkgcloudStorageClient,
      pkgcloudUploadsContainer,
    };

    const getPromisified = promisify(appData.redis.get).bind(appData.redis);
    const setPromisified = promisify(appData.redis.set).bind(appData.redis);
    const flushAllPromisified = promisify(appData.redis.flushall).bind(appData.redis);

    logger.info(
      "initializeServer: checking redis data integrity",
    );
    const buildnumberRedis: string = await getPromisified("buildnumber");
    if (buildnumberRedis !== buildnumber) {
      logger.info(
        "initializeServer: buildnumber is mismatched expecting " + buildnumber + " found " + buildnumberRedis,
      );
      logger.info(
        "initializeServer: flushing redis",
      );
      await flushAllPromisified();
      logger.info(
        "initializeServer: storing new buildnumber",
      );
      await setPromisified("buildnumber", buildnumber);
    }

    logger.info(
      "initializeServer: setting up endpoints",
    );
    initializeApp(appData, custom);

    logger.info(
      "initializeServer: attempting to listen",
    );
    server.listen(config.port, () => {
      logger.info(
        "initializeServer: listening at " + config.port,
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
