import express from "express";
import graphqlHTTP from "express-graphql";
import http from "http";
import path from "path";
import fs from "fs";
import Root from "../base/Root";
import resolvers from "./resolvers";
import { getGQLSchemaForRoot, IGQLQueryFieldsDefinitionType } from "../base/Root/gql";
import Knex from "knex";
import { types } from "pg";
import Moment from "moment";
import { DATETIME_FORMAT, TIME_FORMAT, DATE_FORMAT } from "../constants";
import { GraphQLError } from "graphql";
import { GraphQLEndpointError, GraphQLEndpointErrorType } from "../base/errors";
import PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import { serverSideIndexChecker, serverSideAutocompleteChecker } from "../base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers";
import restServices from "./rest";
import { customUserQueries } from "./user/queries";
import { customUserMutations } from "./user/mutations";
import Autocomplete, { IAutocompleteRawJSONDataType } from "../base/Autocomplete";
import ioMain from "socket.io";
import { Listener } from "./listener";

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
const DB_TIME_FORMAT = "HH:mm:ss";
const DATE_OID = 1082;
const DB_DATE_FORMAT = "YYYY-MM-DD";
types.setTypeParser(TIMESTAMP_OID, (val) => Moment(val).utc().format(DATETIME_FORMAT));
types.setTypeParser(TIMESTAMPTZ_OID, (val) => Moment(val).utc().format(DATETIME_FORMAT));
types.setTypeParser(TIME_OID, (val) => Moment(val, DB_TIME_FORMAT).format(TIME_FORMAT));
types.setTypeParser(DATE_OID, (val) => Moment(val, DB_DATE_FORMAT).format(DATE_FORMAT));

const fsAsync = fs.promises;

const app = express();

export interface IAppDataType {
  root: Root;
  autocompletes: Autocomplete[];
  index: string;
  config: any;
  knex: Knex;
  listener: Listener;
}

export interface IServerCustomizationDataType {
  customGQLQueries?: (appData: IAppDataType) => IGQLQueryFieldsDefinitionType;
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

  let extensions: GraphQLEndpointErrorType;
  switch (constructor) {
    case GraphQLEndpointError:
      const gqlDataInputError = error.originalError as GraphQLEndpointError;
      extensions = gqlDataInputError.data;
      break;
    default:
      extensions = {
        message: "Unspecified Error while parsing data",
        code: "UNSPECIFIED",
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
    if (err instanceof GraphQLEndpointError) {
      throw err;
    }
    console.error(err.stack);
    throw new GraphQLEndpointError({
      message: "Internal Server Error",
      code: "INTERNAL_SERVER_ERROR",
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
    ...custom.customGQLQueries && custom.customGQLQueries(appData),
  };

  const allCustomMutations = {
    ...customUserMutations(appData),
    ...custom.customGQLMutations && custom.customGQLMutations(appData),
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

  app.use("/graphql", graphqlHTTP({
    schema: getGQLSchemaForRoot(
      appData.root,
      finalAllCustomQueries,
      finalAllCustomMutations,
      resolvers(appData),
    ),
    graphiql: true,
    customFormatErrorFn,
  }));

  if (custom.customRouterEndpoint) {
    app.use(custom.customRouterEndpoint, custom.customRouter(appData));
  } else if (custom.customRouter) {
    app.use(custom.customRouter(appData));
  }

  app.get("*", (req, res) => {
    res.setHeader("content-type", "text/html; charset=utf-8");
    res.end(appData.index);
  });
}

export async function initializeServer(custom: IServerCustomizationDataType = {}) {
  let rawBuild: string;
  let config: any;
  let index: any;
  let build: any;
  let root: any;
  let autocompleteSource: string;
  [config, index, rawBuild, autocompleteSource] = await Promise.all([
    fsAsync.readFile("./dist/config.json", "utf8"),
    fsAsync.readFile("./dist/data/index.html", "utf8"),
    fsAsync.readFile("./dist/data/build.en.json", "utf8"),
    fsAsync.readFile("./dist/autocomplete.json", "utf8"),
  ]);
  config = JSON.parse(config);
  build = JSON.parse(rawBuild);

  root = new Root(build.root);

  const autocompletes = JSON.parse(autocompleteSource)
    .map((s: IAutocompleteRawJSONDataType) => (new Autocomplete(s)));

  // Retrieve the config for the database
  const dbConfig = JSON.parse(await fsAsync.readFile(
    path.join("config", "db.sensitive.json"),
    "utf8",
  ));

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

  PropertyDefinition.indexChecker = serverSideIndexChecker.bind(null, knex);
  PropertyDefinition.autocompleteChecker = serverSideAutocompleteChecker.bind(null, autocompletes);

  const appData: IAppDataType = {
    root,
    autocompletes,
    index,
    config,
    knex,
    listener: null,
  };

  appData.listener = new Listener(appData);

  initializeApp(appData, custom);

  const server = http.createServer(app);
  server.listen(config.port, () => {
    console.log("listening at", config.port);
  });
  const io = ioMain(server);
  io.on("connection", (socket) => {
    socket.on("register", (modulePath: string, itemDefinitionPath: string, id: number) => {
      appData.listener.addListener(socket, modulePath, itemDefinitionPath, id);
    });
    socket.on("identify", (uuid: string) => {
      appData.listener.setUUID(socket, uuid);
    });
    socket.on("feedback", (modulePath: string, itemDefinitionPath: string, id: number) => {
      appData.listener.requestFeedback(socket, modulePath, itemDefinitionPath, id);
    });
    socket.on("unregister", (modulePath: string, itemDefinitionPath: string, id: number) => {
      appData.listener.removeListener(socket, modulePath, itemDefinitionPath, id);
    });
    socket.on("disconnect", () => {
      appData.listener.removeSocket(socket);
    });
  });
}
