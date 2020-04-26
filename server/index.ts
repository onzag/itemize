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

// TODO comment and document

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
    console.error(err.stack);
    throw new EndpointError({
      message: "Internal Server Error",
      code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
    });
  }
}

function initializeApp(appData: IAppDataType, custom: IServerCustomizationDataType) {
  app.use((req, res, next) => {
    res.removeHeader("X-Powered-By");
    next();
  });

  if (custom.customRouterEndpoint) {
    app.use(custom.customRouterEndpoint, custom.customRouter(appData));
  } else if (custom.customRouter) {
    app.use(custom.customRouter(appData));
  }
  app.use("/rest/user", userRestServices(appData));
  app.use("/rest", restServices(appData));

  const allCustomQueries = {
    ...customUserQueries(appData),
    ...(custom.customGQLQueries && custom.customGQLQueries(appData)),
    ...(custom.customTokenGQLQueries && buildCustomTokenQueries(appData, custom.customTokenGQLQueries)),
  };

  const allCustomMutations = {
    ...customUserMutations(appData),
    ...(custom.customGQLMutations && custom.customGQLMutations(appData)),
  };

  const finalAllCustomQueries = {};
  Object.keys(allCustomQueries).forEach((customQueryKey) => {
    finalAllCustomQueries[customQueryKey] = {
      ...allCustomQueries[customQueryKey],
      resolve: customResolveWrapper.bind(null, allCustomQueries[customQueryKey].resolve),
    };
  });

  const finalAllCustomMutations = {};
  Object.keys(allCustomMutations).forEach((customMutationKey) => {
    finalAllCustomMutations[customMutationKey] = {
      ...allCustomMutations[customMutationKey],
      resolve: customResolveWrapper.bind(null, allCustomMutations[customMutationKey].resolve),
    };
  });

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

  app.get("/sw.development.js", (req, res) => {
    res.sendFile(path.resolve(path.join("dist", "data", "service-worker.development.js")));
  });
  app.get("/sw.production.js", (req, res) => {
    res.sendFile(path.resolve(path.join("dist", "data", "service-worker.production.js")));
  });

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
  Object.keys(redisConfig).forEach((key) => {
    if (redisConfig[key] === null) {
      delete redisConfig[key];
    }
  });

  // this shouldn't be necessary but we do it anyway
  buildnumber = buildnumber.replace("\n", "").trim();
  const root = new Root(build);

  // Create the connection string
  const dbConnectionKnexConfig = {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  };

  // we only need one client instance
  const knex = Knex({
    client: "pg",
    debug: process.env.NODE_ENV !== "production",
    connection: dbConnectionKnexConfig,
  });

  const redisClient: RedisClient = redis.createClient(redisConfig);
  const redisPub: RedisClient = redis.createClient(redisConfig);
  const redisSub: RedisClient = redis.createClient(redisConfig);

  PropertyDefinition.indexChecker = serverSideIndexChecker.bind(null, knex);

  // due to a bug in the types the create client function is missing
  // domainId and domainName
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

  const pkgcloudUploadsContainer =
    await getContainerPromisified(pkgcloudStorageClient, sensitiveConfig.openStackUploadsContainerName);

  const cache = new Cache(redisClient, knex, pkgcloudUploadsContainer, root);

  const server = http.createServer(app);

  const listener = new Listener(
    buildnumber,
    redisSub,
    redisPub,
    root,
    cache,
    knex,
    server,
  );

  server.listen(config.port, () => {
    console.log("listening at", config.port);
    console.log("build number is", buildnumber);
  });

  const ipStack = sensitiveConfig.ipStackAccessKey ?
    setupIPStack(sensitiveConfig.ipStackAccessKey) :
    null;

  const mailgun = sensitiveConfig.mailgunAPIKey && sensitiveConfig.mailgunDomain ?
    setupMailgun({
      apiKey: sensitiveConfig.mailgunAPIKey,
      domain: sensitiveConfig.mailgunDomain,
    }) : null;

  const here = sensitiveConfig.hereAppID && sensitiveConfig.hereAppCode ?
    setupHere(sensitiveConfig.hereAppID, sensitiveConfig.hereAppCode) : null;

  const appData: IAppDataType = {
    root,
    indexDevelopment: index.replace(/\$MODE/g, "development"),
    indexProduction: index.replace(/\$MODE/g, "production"),
    config,
    sensitiveConfig,
    knex,
    listener,
    redis: redisClient,
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

  initializeApp(appData, custom);
}
