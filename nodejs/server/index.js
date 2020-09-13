"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Root_1 = __importDefault(require("../base/Root"));
const knex_1 = __importDefault(require("knex"));
const pg_1 = require("pg");
const constants_1 = require("../constants");
const PropertyDefinition_1 = __importDefault(require("../base/Root/Module/ItemDefinition/PropertyDefinition"));
const server_checkers_1 = require("../base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers");
const listener_1 = require("./listener");
const redis_1 = __importDefault(require("redis"));
const cache_1 = require("./cache");
const triggers_1 = require("./resolvers/triggers");
const triggers_2 = require("./user/triggers");
const ipstack_1 = require("./services/ipstack");
const mailgun_1 = require("./services/mailgun");
const pkgcloud_1 = __importDefault(require("pkgcloud"));
const here_1 = require("./services/here");
const util_1 = require("util");
const winston_1 = __importDefault(require("winston"));
require("winston-daily-rotate-file");
const dbbuilder_1 = __importDefault(require("../dbbuilder"));
const global_manager_1 = require("./global-manager");
const rootpool_1 = require("./rootpool");
const file_management_1 = require("../base/Root/Module/ItemDefinition/PropertyDefinition/sql/file-management");
const generator_1 = require("./seo/generator");
const initialize_1 = require("./initialize");
// get the environment in order to be able to set it up
const NODE_ENV = process.env.NODE_ENV;
const LOG_LEVEL = process.env.LOG_LEVEL;
const PORT = process.env.PORT || 8000;
const INSTANCE_GROUP_ID = process.env.INSTANCE_GROUP_ID || "UNIDENTIFIED";
const INSTANCE_MODE = process.env.INSTANCE_MODE || "ABSOLUTE";
const USING_DOCKER = JSON.parse(process.env.USING_DOCKER || "false");
const PING_GOOGLE = JSON.parse(process.env.PING_GOOGLE || "false");
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
exports.app = INSTANCE_MODE === "BUILD_DATABASE" || INSTANCE_MODE === "CLEAN_STORAGE" ? null : express_1.default();
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
    // for build database we just build the database
    if (INSTANCE_MODE === "BUILD_DATABASE") {
        dbbuilder_1.default(NODE_ENV);
        return;
    }
    // now we try to read the basic configuration
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
        exports.logger.info("initializeServer: buildnumber is " + buildnumber);
        exports.logger.info("initializeServer: INSTANCE_MODE is " + INSTANCE_MODE);
        // now we create the pub sub clients or only the pub client
        // if we are the global manager as the global manager only needs
        // to publish and never subscribes because the global manager
        // needs to inform of new server data, absolute mode will also do
        // this
        exports.logger.info(INSTANCE_MODE === "GLOBAL_MANAGER" ?
            "initializeServer: initializing redis global pub client" :
            "initializeServer: initializing redis global pub/sub client");
        const redisPub = redis_1.default.createClient(redisConfig.pubSub);
        const redisSub = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : redis_1.default.createClient(redisConfig.pubSub);
        // so every other instance mode will end up setting up a local pub/sub for the local cache, however not the global manager
        // because it only talks to the global redis by publishing server data, and it shouldn't have anything to do with
        // the local redis
        if (INSTANCE_MODE !== "GLOBAL_MANAGER") {
            exports.logger.info("initializeServer: initializing local redis pub/sub client");
        }
        const redisLocalPub = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : redis_1.default.createClient(redisConfig.cache);
        const redisLocalSub = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : redis_1.default.createClient(redisConfig.cache);
        // same for this, for the cache, as the cache is the same that is used for local pub/sub
        if (INSTANCE_MODE !== "GLOBAL_MANAGER") {
            exports.logger.info("initializeServer: initializing redis cache client");
        }
        const redisClient = INSTANCE_MODE === "GLOBAL_MANAGER" ? null : redis_1.default.createClient(redisConfig.cache);
        // now for the cluster manager, which manages a specific cluster, it goes here, and it doesn't
        // go futher, the job of the cluster manager is to mantain the cluster redis database
        // up to date, and handle the requests for these up to date requests, it basically
        // listens to the register requests that are given by other instances and then listens to
        // changed events of the same type the client uses to update the redis database
        if (INSTANCE_MODE === "CLUSTER_MANAGER") {
            // as such 
            const cache = new cache_1.Cache(redisClient, null, null, null, null, null, null);
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
            const listener = new listener_1.Listener(buildnumber, redisSub, redisPub, redisLocalSub, redisLocalPub, null, cache, null, null, sensitiveConfig);
            listener.informClusterManagerReset();
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
        const domain = NODE_ENV === "production" ? config.productionHostname : config.developmentHostname;
        if (INSTANCE_MODE === "GLOBAL_MANAGER" || INSTANCE_MODE === "ABSOLUTE") {
            exports.logger.info("initializeServer: setting up global manager");
            const manager = new global_manager_1.GlobalManager(root, knex, redisGlobalClient, redisPub, config, sensitiveConfig);
            if (seoConfig && sensitiveConfig.seoContainerID) {
                exports.logger.info("initializeServer: initializing SEO configuration");
                const seoContainerData = sensitiveConfig.openstackContainers[sensitiveConfig.seoContainerID];
                if (!seoContainerData) {
                    exports.logger.error("initializeServer [SERIOUS]: Invalid seo container id for the openstack container '" + sensitiveConfig.seoContainerID + "'");
                }
                else {
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
                    let prefix = config.containersHostnamePrefixes[sensitiveConfig.seoContainerID];
                    if (prefix.indexOf("/") !== 0) {
                        prefix = "https://" + prefix;
                    }
                    const seoContainer = await getContainerPromisified(seoContainerClient, seoContainerData.containerName);
                    const seoGenerator = new generator_1.SEOGenerator(seoConfig.seoRules, seoContainer, knex, root, prefix, config.supportedLanguages, domain, PING_GOOGLE);
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
        exports.logger.info("initializeServer: initializing openstack pkgcloud objectstorage clients");
        const pkgcloudStorageClients = {};
        const pkgcloudUploadContainers = {};
        if (sensitiveConfig.openstackContainers) {
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
        }
        if (INSTANCE_MODE === "CLEAN_STORAGE" || INSTANCE_MODE === "CLEAN_SITEMAPS") {
            exports.logger.info("initializeServer: cleaning storage");
            await Promise.all(Object.keys(pkgcloudUploadContainers).map(async (containerId) => {
                if (INSTANCE_MODE === "CLEAN_SITEMAPS") {
                    exports.logger.info("initializeServer: cleaning " + containerId + " sitemaps for " + domain);
                    const container = pkgcloudUploadContainers[containerId];
                    await file_management_1.removeFolderFor(container.container, "sitemaps/" + domain);
                }
                else {
                    exports.logger.info("initializeServer: cleaning " + containerId + " data for " + domain);
                    const container = pkgcloudUploadContainers[containerId];
                    await file_management_1.removeFolderFor(container.container, domain);
                }
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
        const cache = new cache_1.Cache(redisClient, knex, sensitiveConfig, pkgcloudUploadContainers, domain, root, serverData);
        exports.logger.info("initializeServer: creating server");
        const server = http_1.default.createServer(exports.app);
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
            triggers: triggers_1.mergeTriggerRegistries(triggers_2.customUserTriggers, custom.customTriggers),
            ipStack,
            here,
            mailgun,
            pkgcloudStorageClients,
            pkgcloudUploadContainers,
            logger: exports.logger,
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
        initialize_1.initializeApp(appData, custom);
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
