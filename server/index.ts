import express from "express";
import graphqlHTTP from "express-graphql";
import http from "http";
import path from "path";
import fs from "fs";
import Root, { IRootRawJSONDataType } from "../base/Root";
import resolvers from "./resolvers";
import { getGQLSchemaForRoot, IGQLQueryFieldsDefinitionType, IGQLFieldsDefinitionType } from "../base/Root/gql";
import Knex from "knex";
import { types } from "pg";
import { MAX_FILE_TOTAL_BATCH_COUNT, MAX_FILE_SIZE, MAX_FIELD_SIZE, ENDPOINT_ERRORS } from "../constants";
import { GraphQLError } from "graphql";
import { EndpointError, EndpointErrorType } from "../base/errors";
import PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import { serverSideIndexChecker, serverSideAutocompleteChecker } from "../base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers";
import restServices from "./rest";
import { customUserQueries } from "./user/queries";
import { customUserMutations } from "./user/mutations";
import Autocomplete, { IAutocompleteRawJSONDataType } from "../base/Autocomplete";
import { Listener } from "./listener";
import redis, { RedisClient } from "redis";
import { Cache } from "./cache";
import { graphqlUploadExpress } from "graphql-upload";
import { buildCustomTokenQueries } from "./custom-token";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType, IDBConfigRawJSONDataType, IRedisConfigRawJSONDataType } from "../config";

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
  autocompletes: Autocomplete[];
  index: string;
  config: IConfigRawJSONDataType;
  sensitiveConfig: ISensitiveConfigRawJSONDataType;
  knex: Knex;
  listener: Listener;
  cache: Cache;
  redis: RedisClient;
  redisPub: RedisClient;
  redisSub: RedisClient;
  buildnumber: string;
}

export interface IReferredTokenStructure {
  onBehalfOf?: number;
  withRole: string;
  expiresIn?: string;
  error?: string;
}

export interface ICustomTokenGQLQueryDefinition {
  resolve: (appData: IAppDataType, args: {
    source: any;
    args: any;
    context: any;
    info: any;
  }) => IReferredTokenStructure | Promise<IReferredTokenStructure>;
  args?: IGQLFieldsDefinitionType;
}

export interface ICustomTokensType {
  [name: string]: ICustomTokenGQLQueryDefinition;
}

export interface IServerCustomizationDataType {
  customGQLQueries?: (appData: IAppDataType) => IGQLQueryFieldsDefinitionType;
  customTokenGQLQueries?: ICustomTokensType;
  customGQLMutations?: (appData: IAppDataType) => IGQLQueryFieldsDefinitionType;
  customRouterEndpoint?: string;
  customRouter?: (appData: IAppDataType) => express.Router;
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

  if (custom.customRouterEndpoint) {
    app.use(custom.customRouterEndpoint, custom.customRouter(appData));
  } else if (custom.customRouter) {
    app.use(custom.customRouter(appData));
  }

  app.get("/sw.development.js", (req, res) => {
    res.sendFile(path.resolve(path.join("dist", "data", "service-worker.development.js")));
  });
  app.get("/sw.production.js", (req, res) => {
    res.sendFile(path.resolve(path.join("dist", "data", "service-worker.production.js")));
  });

  app.get("*", (req, res) => {
    res.setHeader("content-type", "text/html; charset=utf-8");
    res.end(appData.index);
  });
}

export async function initializeServer(custom: IServerCustomizationDataType = {}) {
  let rawBuild: string;
  let rawConfig: string;
  let rawSensitiveConfig: string;
  let rawRedisConfig: string;
  let rawDbConfig: string;
  let index: string;
  let rawAutocompleteSource: string;
  let buildnumber: string;
  [
    rawConfig,
    rawSensitiveConfig,
    rawRedisConfig,
    rawDbConfig,
    index,
    rawBuild,
    rawAutocompleteSource,
    buildnumber,
  ] = await Promise.all([
    fsAsync.readFile(path.join("dist", "config.json"), "utf8"),
    fsAsync.readFile(path.join("dist", "sensitive.json"), "utf8"),
    fsAsync.readFile(path.join("dist", "redis.json"), "utf8"),
    fsAsync.readFile(path.join("dist", "db.json"), "utf8"),
    fsAsync.readFile(path.join("dist", "data", "index.html"), "utf8"),
    fsAsync.readFile(path.join("dist", "data", "build.all.json"), "utf8"),
    fsAsync.readFile(path.join("dist", "autocomplete.json"), "utf8"),
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
  const autocompletes = JSON.parse(rawAutocompleteSource)
    .map((s: IAutocompleteRawJSONDataType) => (new Autocomplete(s)));

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
  PropertyDefinition.autocompleteChecker = serverSideAutocompleteChecker.bind(null, autocompletes);

  const cache = new Cache(redisClient, knex);

  const server = http.createServer(app);
  server.listen(config.port, () => {
    console.log("listening at", config.port);
    console.log("build number is", buildnumber);
  });

  const listener = new Listener(
    buildnumber,
    redisSub,
    redisPub,
    root,
    cache,
    knex,
    server,
  );

  const appData: IAppDataType = {
    root,
    autocompletes,
    index,
    config,
    sensitiveConfig,
    knex,
    listener,
    redis: redisClient,
    redisSub,
    redisPub,
    cache,
    buildnumber,
  };

  initializeApp(appData, custom);
}
