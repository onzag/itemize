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
const util_1 = require("util");
const winston_1 = __importDefault(require("winston"));
require("winston-daily-rotate-file");
const dbbuilder_1 = __importDefault(require("../dbbuilder"));
const global_manager_1 = require("./global-manager");
const generator_1 = require("./ssr/generator");
const rootpool_1 = require("./rootpool");
const sql_files_1 = require("../base/Root/Module/ItemDefinition/PropertyDefinition/sql-files");
const generator_2 = require("./seo/generator");
// get the environment in order to be able to set it up
const NODE_ENV = process.env.NODE_ENV;
const LOG_LEVEL = process.env.LOG_LEVEL;
const PORT = process.env.PORT || 8000;
const INSTANCE_GROUP_ID = process.env.INSTANCE_GROUP_ID || "UNIDENTIFIED";
const INSTANCE_MODE = process.env.INSTANCE_MODE || "ABSOLUTE";
const USING_DOCKER = JSON.parse(process.env.USING_DOCKER || "false");
// building the logger
exports.logger = INSTANCE_MODE === "BUILD_DATABASE" ? null : winston_1.default.createLogger({
    level: LOG_LEVEL || (NODE_ENV !== "production" ? "debug" : "info"),
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.DailyRotateFile({ filename: `logs/error.${INSTANCE_MODE}.log`, level: "error" }),
        new winston_1.default.transports.DailyRotateFile({ filename: `logs/info.${INSTANCE_MODE}.log`, level: "info" })
    ]
});
// if not production add a console.log
if (NODE_ENV !== "production" && exports.logger) {
    exports.logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple()
    }));
}
// Setting the parsers, postgresql comes with
// its own way to return this data but we don't want it
// we want raw strings
const TIMESTAMP_OID = 1114;
const TIMESTAMPTZ_OID = 1184;
const TIME_OID = 1083;
const DATE_OID = 1082;
pg_1.types.setTypeParser(TIMESTAMP_OID, (val) => val);
pg_1.types.setTypeParser(TIMESTAMPTZ_OID, (val) => val);
pg_1.types.setTypeParser(TIME_OID, (val) => val);
pg_1.types.setTypeParser(DATE_OID, (val) => val);
// we need the async fs
const fsAsync = fs_1.default.promises;
// now in order to build the database in the cheat mode, we don't need express
const app = INSTANCE_MODE === "BUILD_DATABASE" || INSTANCE_MODE === "CLEAN_STORAGE" ? null : express_1.default();
/**
 * This is the function that catches the errors that are thrown
 * within graphql
 * @param error the error that is thrown
 */
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
            exports.logger.error("customFormatErrorFn: Caught unexpected error from graphql parsing", {
                errMessage: error.message,
                errStack: error.stack,
            });
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
/**
 * The resolve wrappers that wraps every resolve function
 * from graphql
 * @param fn the function that is supposed to run
 * @param source graphql source
 * @param args grapql args
 * @param context grapql context
 * @param info graphql info
 */
async function customResolveWrapper(fn, source, args, context, info) {
    try {
        return await fn(source, args, context, info);
    }
    catch (err) {
        if (err instanceof errors_1.EndpointError) {
            throw err;
        }
        exports.logger.error("customResolveWrapper: Found internal server error", {
            errStack: err.stack,
            errMessage: err.message,
        });
        throw new errors_1.EndpointError({
            message: "Internal Server Error",
            code: constants_1.ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
        });
    }
}
/**
 * Initializes the server application with its configuration
 * @param appData the application data to use
 * @param custom the custom config that has been passed
 */
function initializeApp(appData, custom) {
    // removing the powered by header
    app.use((req, res, next) => {
        res.removeHeader("X-Powered-By");
        next();
    });
    // if we have a custom router and custom router endpoint rather than the standard
    if (custom.customRouterEndpoint) {
        app.use(custom.customRouterEndpoint, custom.customRouter(appData));
    }
    else if (custom.customRouter) {
        app.use(custom.customRouter(appData));
    }
    // adding rest services
    app.use("/rest/user", rest_2.userRestServices(appData));
    app.use("/rest", rest_1.default(appData));
    const customUserQueriesProcessed = queries_1.customUserQueries(appData);
    appData.customUserTokenQuery = customUserQueriesProcessed.token.resolve;
    // custom graphql queries combined
    const allCustomQueries = {
        ...customUserQueriesProcessed,
        ...(custom.customGQLQueries && custom.customGQLQueries(appData)),
        ...(custom.customTokenGQLQueries && custom_graphql_1.buildCustomTokenQueries(appData, custom.customTokenGQLQueries)),
    };
    // custom mutations combined
    const allCustomMutations = {
        ...mutations_1.customUserMutations(appData),
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
    app.use("/graphql", graphql_upload_1.graphqlUploadExpress({
        maxFileSize: constants_1.MAX_FILE_SIZE,
        maxFiles: constants_1.MAX_FILE_TOTAL_BATCH_COUNT,
        maxFieldSize: constants_1.MAX_FIELD_SIZE,
    }), express_graphql_1.default({
        schema: gql_1.getGQLSchemaForRoot(appData.root, finalAllCustomQueries, finalAllCustomMutations, resolvers_1.default(appData)),
        graphiql: true,
        customFormatErrorFn,
    }));
    // service worker setup
    app.get("/sw.development.js", (req, res) => {
        res.sendFile(path_1.default.resolve(path_1.default.join("dist", "data", "service-worker.development.js")));
    });
    app.get("/sw.production.js", (req, res) => {
        res.sendFile(path_1.default.resolve(path_1.default.join("dist", "data", "service-worker.production.js")));
    });
    app.get("/robots.txt", (req, res) => {
        res.setHeader("content-type", "text/plain; charset=utf-8");
        let result = "user-agent = *\ndisallow: /rest/util/*\ndisallow: /rest/index-check/*\n" +
            "disallow: /rest/currency-factors\ndisallow: /graphql\n";
        if (appData.seoConfig) {
            Object.keys(appData.seoConfig.seoRules).forEach((urlSet) => {
                const rule = appData.seoConfig.seoRules[urlSet];
                if (!rule.crawable) {
                    const splittedSet = urlSet.replace(/^:[A-Za-z_-]+/g, "*").split(",");
                    appData.config.supportedLanguages.forEach((supportedLanguage) => {
                        splittedSet.forEach((denyURL) => {
                            result += "disallow: /" + supportedLanguage;
                            if (!denyURL.startsWith("/")) {
                                result += "/";
                            }
                            result += denyURL;
                        });
                    });
                }
            });
            const hostname = NODE_ENV === "production" ? appData.config.productionHostname : appData.config.developmentHostname;
            result += "Sitemap: " +
                appData.pkgcloudUploadContainers[appData.seoConfig.seoContainerId].prefix +
                "sitemaps/" + hostname + "/index.xml";
        }
        res.end(result);
    });
    const router = express_1.default.Router();
    Object.keys(appData.ssrConfig.ssrRules).forEach((urlCombo) => {
        const rule = appData.ssrConfig.ssrRules[urlCombo];
        urlCombo.split(",").forEach((url) => {
            const actualURL = url.startsWith("/") ? url : "/" + url;
            router.get(actualURL, (req, res) => {
                const mode = mode_1.getMode(appData, req);
                if (mode === "development") {
                    generator_1.ssrGenerator(req, res, appData.indexDevelopment, appData, mode, rule);
                }
                else {
                    generator_1.ssrGenerator(req, res, appData.indexProduction, appData, mode, rule);
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
        const mode = mode_1.getMode(appData, req);
        if (mode === "development") {
            generator_1.ssrGenerator(req, res, appData.indexDevelopment, appData, mode, null);
        }
        else {
            generator_1.ssrGenerator(req, res, appData.indexProduction, appData, mode, null);
        }
    });
}
/**
 * Provides the pkgloud client container from ovh
 * @param client the client to use
 * @param containerName the container name
 */
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
async function initializeServer(ssrConfig, seoConfig, custom = {}) {
    if (INSTANCE_MODE === "BUILD_DATABASE") {
        dbbuilder_1.default(NODE_ENV);
        return;
    }
    try {
        exports.logger.info("initializeServer: reading configuration data");
        // first let's read all the configurations
        let rawBuild;
        let rawConfig;
        let rawSensitiveConfig;
        let rawRedisConfig;
        let rawDbConfig;
        let index;
        let buildnumber;
        let rawLangLocales;
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
            fsAsync.readFile(path_1.default.join("config", "index.json"), "utf8"),
            fsAsync.readFile(path_1.default.join("config", NODE_ENV === "development" ? "index.sensitive.json" : `index.${NODE_ENV}.sensitive.json`), "utf8"),
            fsAsync.readFile(path_1.default.join("config", NODE_ENV === "development" ? "redis.sensitive.json" : `redis.${NODE_ENV}.sensitive.json`), "utf8"),
            fsAsync.readFile(path_1.default.join("config", NODE_ENV === "development" ? "db.sensitive.json" : `db.${NODE_ENV}.sensitive.json`), "utf8"),
            fsAsync.readFile(path_1.default.join("dist", "data", "index.html"), "utf8"),
            fsAsync.readFile(path_1.default.join("dist", "data", "build.all.json"), "utf8"),
            fsAsync.readFile(path_1.default.join("dist", "data", "lang.json"), "utf8"),
            fsAsync.readFile(path_1.default.join("dist", "buildnumber"), "utf8"),
        ]);
        const config = JSON.parse(rawConfig);
        const sensitiveConfig = JSON.parse(rawSensitiveConfig);
        const dbConfig = JSON.parse(rawDbConfig);
        const redisConfig = JSON.parse(rawRedisConfig);
        const build = JSON.parse(rawBuild);
        const langLocales = JSON.parse(rawLangLocales);
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
        exports.logger.info("initializeServer: using docker " + USING_DOCKER);
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
        exports.logger.info("initializeServer: buildnumber is " + buildnumber);
        exports.logger.info("initializeServer: INSTANCE_MODE is " + INSTANCE_MODE);
        exports.logger.info(INSTANCE_MODE === "GLOBAL_MANAGER" ?
            "initializeServer: initializing redis global pub client" :
            "initializeServer: initializing redis global pub/sub client");
        const redisPub = redis_1.default.createClient(redisConfig.pubSub);
        const redisSub = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : redis_1.default.createClient(redisConfig.pubSub);
        if (INSTANCE_MODE !== "GLOBAL_MANAGER") {
            exports.logger.info("initializeServer: initializing local redis pub/sub client");
        }
        const redisLocalPub = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : redis_1.default.createClient(redisConfig.cache);
        const redisLocalSub = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : redis_1.default.createClient(redisConfig.cache);
        if (INSTANCE_MODE !== "GLOBAL_MANAGER") {
            exports.logger.info("initializeServer: initializing redis cache client");
        }
        const redisClient = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : redis_1.default.createClient(redisConfig.cache);
        if (INSTANCE_MODE === "CLUSTER_MANAGER") {
            const cache = new cache_1.Cache(redisClient, null, null, null, null);
            exports.logger.info("initializeServer: server initialized in cluster manager exclusive mode flushing redis");
            // in case both the global and local cluster are the same
            const getPromisified = util_1.promisify(redisClient.get).bind(redisClient);
            const setPromisified = util_1.promisify(redisClient.set).bind(redisClient);
            const serverDataStr = await getPromisified(constants_1.SERVER_DATA_IDENTIFIER) || null;
            const currencyLayerCachedResponseRestore = await getPromisified(constants_1.CACHED_CURRENCY_LAYER_RESPONSE) || null;
            const flushAllPromisified = util_1.promisify(redisClient.flushall).bind(redisClient);
            await flushAllPromisified();
            if (serverDataStr) {
                await setPromisified(constants_1.SERVER_DATA_IDENTIFIER, serverDataStr);
            }
            if (currencyLayerCachedResponseRestore) {
                await setPromisified(constants_1.CACHED_CURRENCY_LAYER_RESPONSE, currencyLayerCachedResponseRestore);
            }
            new listener_1.Listener(buildnumber, redisSub, redisPub, redisLocalSub, redisLocalPub, null, cache, null, null, sensitiveConfig);
            return;
        }
        exports.logger.info("initializeServer: initializing redis global cache client");
        const redisGlobalClient = redis_1.default.createClient(redisConfig.global);
        exports.logger.info("initializeServer: initializing itemize server root");
        const root = new Root_1.default(build);
        // Create the connection string
        const dbConnectionKnexConfig = {
            host: dbConfig.host,
            port: dbConfig.port,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database,
        };
        exports.logger.info("initializeServer: setting up database connection to " + dbConfig.host);
        // we only need one client instance
        const knex = knex_1.default({
            client: "pg",
            debug: process.env.NODE_ENV !== "production",
            connection: dbConnectionKnexConfig,
        });
        if (INSTANCE_MODE === "GLOBAL_MANAGER" || INSTANCE_MODE === "ABSOLUTE") {
            exports.logger.info("initializeServer: setting up global manager");
            const manager = new global_manager_1.GlobalManager(root, knex, redisGlobalClient, redisPub, config, sensitiveConfig);
            if (seoConfig) {
                exports.logger.info("initializeServer: initializing SEO configuration");
                const seoContainerData = sensitiveConfig.openstackContainers[seoConfig.seoContainerId];
                const seoContainerClient = pkgcloud_1.default.storage.createClient({
                    provider: "openstack",
                    username: seoContainerData.username,
                    keystoneAuthVersion: 'v3',
                    region: seoContainerData.region,
                    domainId: seoContainerData.domainId,
                    domainName: seoContainerData.domainName,
                    password: seoContainerData.password,
                    authUrl: seoContainerData.authUrl,
                });
                let prefix = config.containersHostnamePrefixes[seoConfig.seoContainerId];
                if (prefix.indexOf("/") !== 0) {
                    prefix = "https://" + prefix;
                }
                const seoContainer = await getContainerPromisified(seoContainerClient, seoContainerData.containerName);
                const seoGenerator = new generator_2.SEOGenerator(seoConfig.seoRules, seoContainer, knex, root, prefix, config.supportedLanguages, NODE_ENV === "production" ? config.productionHostname : config.developmentHostname);
                manager.setSEOGenerator(seoGenerator);
            }
            manager.run();
            if (INSTANCE_MODE === "GLOBAL_MANAGER") {
                return;
            }
        }
        // due to a bug in the types the create client function is missing
        // domainId and domainName
        exports.logger.info("initializeServer: initializing openstack pkgcloud objectstorage clients");
        const pkgcloudStorageClients = {};
        const pkgcloudUploadContainers = {};
        await Promise.all(Object.keys(sensitiveConfig.openstackContainers).map(async (containerIdX) => {
            const containerData = sensitiveConfig.openstackContainers[containerIdX];
            pkgcloudStorageClients[containerIdX] = pkgcloud_1.default.storage.createClient({
                provider: "openstack",
                username: containerData.username,
                keystoneAuthVersion: 'v3',
                region: containerData.region,
                domainId: containerData.domainId,
                domainName: containerData.domainName,
                password: containerData.password,
                authUrl: containerData.authUrl,
            });
            exports.logger.info("initializeServer: retrieving container " + containerData.containerName + " in container id " + containerIdX);
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
            exports.logger.info("initializeServer: cleaning storage");
            await Promise.all(Object.keys(pkgcloudUploadContainers).map(async (containerId) => {
                exports.logger.info("initializeServer: cleaning " + containerId);
                const container = pkgcloudUploadContainers[containerId];
                await sql_files_1.removeFolderFor(container.container, "");
            }));
            process.exit(0);
        }
        // RETRIEVING INITIAL SERVER DATA
        exports.logger.info("initializeServer: attempting to retrieve server data");
        const getPromisified = util_1.promisify(redisGlobalClient.get).bind(redisGlobalClient);
        const wait = (time) => {
            return new Promise((resolve) => {
                setTimeout(resolve, time);
            });
        };
        let serverData = null;
        while (serverData === null) {
            exports.logger.info("initializeServer: waiting one second");
            await wait(1000);
            const serverDataStr = await getPromisified(constants_1.SERVER_DATA_IDENTIFIER) || null;
            if (!serverDataStr) {
                exports.logger.info("initializeServer: server data not available, is global cache and global manager running?");
            }
            else {
                serverData = JSON.parse(serverDataStr);
            }
        }
        exports.logger.info("initializeServer: initializing cache instance");
        const cache = new cache_1.Cache(redisClient, knex, pkgcloudUploadContainers, root, serverData);
        exports.logger.info("initializeServer: creating server");
        const server = http_1.default.createServer(app);
        exports.logger.info("initializeServer: setting up websocket socket.io listener");
        const listener = new listener_1.Listener(buildnumber, redisSub, redisPub, redisLocalSub, redisLocalPub, root, cache, knex, server, sensitiveConfig);
        if (sensitiveConfig.ipStackAccessKey) {
            exports.logger.info("initializeServer: initializing ipstack connection");
        }
        const ipStack = sensitiveConfig.ipStackAccessKey ?
            ipstack_1.setupIPStack(sensitiveConfig.ipStackAccessKey, !!sensitiveConfig.ipStackHttpsEnabled) :
            null;
        if (sensitiveConfig.mailgunAPIKey && sensitiveConfig.mailgunDomain && sensitiveConfig.mailgunAPIHost) {
            exports.logger.info("initializeServer: initializing mailgun connection");
        }
        const mailgun = sensitiveConfig.mailgunAPIKey && sensitiveConfig.mailgunDomain && sensitiveConfig.mailgunAPIHost ?
            mailgun_1.setupMailgun({
                apiKey: sensitiveConfig.mailgunAPIKey,
                domain: sensitiveConfig.mailgunDomain,
                host: sensitiveConfig.mailgunAPIHost,
            }) : null;
        if (sensitiveConfig.hereApiKey) {
            exports.logger.info("initializeServer: initializing here maps");
        }
        const here = sensitiveConfig.hereApiKey ?
            here_1.setupHere(sensitiveConfig.hereApiKey) : null;
        exports.logger.info("initializeServer: configuring app data build");
        const appData = {
            root,
            rootPool: rootpool_1.retrieveRootPool(root.rawData),
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
            triggers: {
                module: {},
                itemDefinition: {},
                ...triggers_1.customUserTriggers,
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
        PropertyDefinition_1.default.indexChecker = server_checkers_1.serverSideIndexChecker.bind(null, appData);
        exports.logger.info("initializeServer: INSTANCE_GROUP_ID is " + INSTANCE_GROUP_ID);
        if (INSTANCE_MODE === "ABSOLUTE") {
            exports.logger.info("initializeServer: server initialized in absolute mode flushing redis");
            const flushAllPromisified = util_1.promisify(appData.redis.flushall).bind(appData.redis);
            const getPromisified = util_1.promisify(appData.redis.get).bind(appData.redis);
            const setPromisified = util_1.promisify(appData.redis.set).bind(appData.redis);
            const currencyLayerCachedResponseRestore = await getPromisified(constants_1.CACHED_CURRENCY_LAYER_RESPONSE);
            await flushAllPromisified();
            // this cached data is intended for the global, but it might be the same, I need to restore it in order
            // to avoid draining the currency layer api
            if (currencyLayerCachedResponseRestore) {
                await setPromisified(constants_1.CACHED_CURRENCY_LAYER_RESPONSE, currencyLayerCachedResponseRestore);
            }
        }
        else {
            exports.logger.info("initializeServer: server initialized in standard mode, not flushing redis");
        }
        exports.logger.info("initializeServer: setting up endpoints");
        initializeApp(appData, custom);
        exports.logger.info("initializeServer: attempting to listen at " + PORT);
        server.listen(PORT, () => {
            exports.logger.info("initializeServer: listening at " + PORT);
        });
    }
    catch (err) {
        exports.logger.error("initializeServer: Failed to initialize server due to error", {
            errMessage: err.message,
            errStack: err.stack,
        });
        process.exit(1);
    }
}
exports.initializeServer = initializeServer;
