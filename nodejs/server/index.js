"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Root_1 = __importDefault(require("../base/Root"));
const resolvers_1 = __importDefault(require("./resolvers"));
const gql_1 = require("../base/Root/gql");
const knex_1 = __importDefault(require("knex"));
const pg_1 = require("pg");
const constants_1 = require("../constants");
const errors_1 = require("../base/errors");
const PropertyDefinition_1 = __importDefault(require("../base/Root/Module/ItemDefinition/PropertyDefinition"));
const server_checkers_1 = require("../base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers");
const rest_1 = __importDefault(require("./rest"));
const queries_1 = require("./user/queries");
const mutations_1 = require("./user/mutations");
const Autocomplete_1 = __importDefault(require("../base/Autocomplete"));
const listener_1 = require("./listener");
const redis_1 = __importDefault(require("redis"));
const cache_1 = require("./cache");
const graphql_upload_1 = require("graphql-upload");
const custom_graphql_1 = require("./custom-graphql");
const mode_1 = require("./mode");
const triggers_1 = require("./user/triggers");
const ipstack_1 = require("./services/ipstack");
const mailgun_1 = require("./services/mailgun");
const rest_2 = require("./user/rest");
const pkgcloud_1 = __importDefault(require("pkgcloud"));
const here_1 = require("./services/here");
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
pg_1.types.setTypeParser(TIMESTAMP_OID, (val) => val);
pg_1.types.setTypeParser(TIMESTAMPTZ_OID, (val) => val);
pg_1.types.setTypeParser(TIME_OID, (val) => val);
pg_1.types.setTypeParser(DATE_OID, (val) => val);
const fsAsync = fs_1.default.promises;
const app = express_1.default();
const customFormatErrorFn = (error) => {
    const originalError = error.originalError;
    let constructor = null;
    if (originalError) {
        constructor = originalError.constructor;
    }
    let extensions;
    switch (constructor) {
        case errors_1.EndpointError:
            const gqlDataInputError = error.originalError;
            extensions = gqlDataInputError.data;
            break;
        default:
            extensions = {
                message: "Unspecified Error while parsing data",
                code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
            };
    }
    return {
        extensions,
        ...error,
    };
};
async function customResolveWrapper(fn, source, args, context, info) {
    try {
        return await fn(source, args, context, info);
    }
    catch (err) {
        if (err instanceof errors_1.EndpointError) {
            throw err;
        }
        console.error(err.stack);
        throw new errors_1.EndpointError({
            message: "Internal Server Error",
            code: constants_1.ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
        });
    }
}
function initializeApp(appData, custom) {
    app.use((req, res, next) => {
        res.removeHeader("X-Powered-By");
        next();
    });
    if (custom.customRouterEndpoint) {
        app.use(custom.customRouterEndpoint, custom.customRouter(appData));
    }
    else if (custom.customRouter) {
        app.use(custom.customRouter(appData));
    }
    app.use("/rest/user", rest_2.userRestServices(appData));
    app.use("/rest", rest_1.default(appData));
    const allCustomQueries = {
        ...queries_1.customUserQueries(appData),
        ...(custom.customGQLQueries && custom.customGQLQueries(appData)),
        ...(custom.customTokenGQLQueries && custom_graphql_1.buildCustomTokenQueries(appData, custom.customTokenGQLQueries)),
    };
    const allCustomMutations = {
        ...mutations_1.customUserMutations(appData),
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
    app.use("/graphql", graphql_upload_1.graphqlUploadExpress({
        maxFileSize: constants_1.MAX_FILE_SIZE,
        maxFiles: constants_1.MAX_FILE_TOTAL_BATCH_COUNT,
        maxFieldSize: constants_1.MAX_FIELD_SIZE,
    }), express_graphql_1.default({
        schema: gql_1.getGQLSchemaForRoot(appData.root, finalAllCustomQueries, finalAllCustomMutations, resolvers_1.default(appData)),
        graphiql: true,
        customFormatErrorFn,
    }));
    app.get("/sw.development.js", (req, res) => {
        res.sendFile(path_1.default.resolve(path_1.default.join("dist", "data", "service-worker.development.js")));
    });
    app.get("/sw.production.js", (req, res) => {
        res.sendFile(path_1.default.resolve(path_1.default.join("dist", "data", "service-worker.production.js")));
    });
    app.get("*", (req, res) => {
        res.setHeader("content-type", "text/html; charset=utf-8");
        const mode = mode_1.getMode(appData, req);
        if (mode === "development") {
            res.end(appData.indexDevelopment);
        }
        else {
            res.end(appData.indexProduction);
        }
    });
}
function getContainerPromisified(client, containerName) {
    return new Promise((resolve, reject) => {
        client.getContainer(containerName, (err, container) => {
            if (err) {
                reject(err);
            }
            else {
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
async function initializeServer(custom = {}) {
    // first let's read all the configurations
    let rawBuild;
    let rawConfig;
    let rawSensitiveConfig;
    let rawRedisConfig;
    let rawDbConfig;
    let index;
    let rawAutocompleteSource;
    let buildnumber;
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
        fsAsync.readFile(path_1.default.join("dist", "config.json"), "utf8"),
        fsAsync.readFile(path_1.default.join("dist", "sensitive.json"), "utf8"),
        fsAsync.readFile(path_1.default.join("dist", "redis.json"), "utf8"),
        fsAsync.readFile(path_1.default.join("dist", "db.json"), "utf8"),
        fsAsync.readFile(path_1.default.join("dist", "data", "index.html"), "utf8"),
        fsAsync.readFile(path_1.default.join("dist", "data", "build.all.json"), "utf8"),
        fsAsync.readFile(path_1.default.join("dist", "autocomplete.json"), "utf8"),
        fsAsync.readFile(path_1.default.join("dist", "buildnumber"), "utf8"),
    ]);
    const config = JSON.parse(rawConfig);
    const sensitiveConfig = JSON.parse(rawSensitiveConfig);
    const dbConfig = JSON.parse(rawDbConfig);
    const redisConfig = JSON.parse(rawRedisConfig);
    const build = JSON.parse(rawBuild);
    // redis configuration despite instructions actually tries to use null
    // values as it checks for undefined so we need to strip these if null
    Object.keys(redisConfig).forEach((key) => {
        if (redisConfig[key] === null) {
            delete redisConfig[key];
        }
    });
    // this shouldn't be necessary but we do it anyway
    buildnumber = buildnumber.replace("\n", "").trim();
    const root = new Root_1.default(build);
    const autocompletes = JSON.parse(rawAutocompleteSource)
        .map((s) => (new Autocomplete_1.default(s)));
    // Create the connection string
    const dbConnectionKnexConfig = {
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
    };
    // we only need one client instance
    const knex = knex_1.default({
        client: "pg",
        debug: process.env.NODE_ENV !== "production",
        connection: dbConnectionKnexConfig,
    });
    const redisClient = redis_1.default.createClient(redisConfig);
    const redisPub = redis_1.default.createClient(redisConfig);
    const redisSub = redis_1.default.createClient(redisConfig);
    PropertyDefinition_1.default.indexChecker = server_checkers_1.serverSideIndexChecker.bind(null, knex);
    PropertyDefinition_1.default.autocompleteChecker = server_checkers_1.serverSideAutocompleteChecker.bind(null, autocompletes);
    // due to a bug in the types the create client function is missing
    // domainId and domainName
    const pkgcloudStorageClient = pkgcloud_1.default.storage.createClient({
        provider: "openstack",
        username: sensitiveConfig.openStackUsername,
        keystoneAuthVersion: 'v3',
        region: sensitiveConfig.openStackRegion,
        domainId: "default",
        domainName: sensitiveConfig.openStackDomainName,
        password: sensitiveConfig.openStackPassword,
        authUrl: sensitiveConfig.openStackAuthUrl,
    });
    const pkgcloudUploadsContainer = await getContainerPromisified(pkgcloudStorageClient, sensitiveConfig.openStackUploadsContainerName);
    const cache = new cache_1.Cache(redisClient, knex, pkgcloudUploadsContainer, root);
    const server = http_1.default.createServer(app);
    const listener = new listener_1.Listener(buildnumber, redisSub, redisPub, root, cache, knex, server);
    server.listen(config.port, () => {
        console.log("listening at", config.port);
        console.log("build number is", buildnumber);
    });
    const ipStack = sensitiveConfig.ipStackAccessKey ?
        ipstack_1.setupIPStack(sensitiveConfig.ipStackAccessKey) :
        null;
    const mailgun = sensitiveConfig.mailgunAPIKey && sensitiveConfig.mailgunDomain ?
        mailgun_1.setupMailgun({
            apiKey: sensitiveConfig.mailgunAPIKey,
            domain: sensitiveConfig.mailgunDomain,
        }) : null;
    const here = sensitiveConfig.hereAppID && sensitiveConfig.hereAppCode ?
        here_1.setupHere(sensitiveConfig.hereAppID, sensitiveConfig.hereAppCode) : null;
    const appData = {
        root,
        autocompletes,
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
            ...triggers_1.customUserTriggers,
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
exports.initializeServer = initializeServer;
