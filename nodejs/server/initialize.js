"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeApp = void 0;
const _1 = require(".");
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const path_1 = __importDefault(require("path"));
const resolvers_1 = __importDefault(require("./resolvers"));
const gql_1 = require("../base/Root/gql");
const constants_1 = require("../constants");
const errors_1 = require("../base/errors");
const rest_1 = __importDefault(require("./rest"));
const queries_1 = require("./user/queries");
const mutations_1 = require("./user/mutations");
const graphql_upload_1 = require("graphql-upload");
const custom_graphql_1 = require("./custom-graphql");
const mode_1 = require("./mode");
const rest_2 = require("./user/rest");
const generator_1 = require("./ssr/generator");
const NODE_ENV = process.env.NODE_ENV;
const NO_SEO = process.env.NO_SEO === "true";
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
            _1.logger.error("customFormatErrorFn: Caught unexpected error from graphql parsing", {
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
        _1.logger.error("customResolveWrapper: Found internal server error", {
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
    _1.app.use((req, res, next) => {
        res.removeHeader("X-Powered-By");
        next();
    });
    // if we have a custom router and custom router endpoint rather than the standard
    if (custom.customRouterEndpoint) {
        _1.app.use(custom.customRouterEndpoint, custom.customRouter(appData));
    }
    else if (custom.customRouter) {
        _1.app.use(custom.customRouter(appData));
    }
    // adding rest services
    _1.app.use("/rest/user", rest_2.userRestServices(appData));
    _1.app.use("/rest", rest_1.default(appData));
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
    _1.app.use("/graphql", graphql_upload_1.graphqlUploadExpress({
        maxFileSize: constants_1.MAX_FILE_SIZE,
        maxFiles: constants_1.MAX_FILE_TOTAL_BATCH_COUNT,
        maxFieldSize: constants_1.MAX_FIELD_SIZE,
    }), express_graphql_1.default({
        schema: gql_1.getGQLSchemaForRoot(appData.root, finalAllCustomQueries, finalAllCustomMutations, resolvers_1.default(appData)),
        graphiql: true,
        customFormatErrorFn,
    }));
    // service worker setup
    _1.app.get("/sw.development.js", (req, res) => {
        res.sendFile(path_1.default.resolve(path_1.default.join("dist", "data", "service-worker.development.js")));
    });
    _1.app.get("/sw.production.js", (req, res) => {
        res.sendFile(path_1.default.resolve(path_1.default.join("dist", "data", "service-worker.production.js")));
    });
    if (appData.sensitiveConfig.localContainer) {
        _1.logger.warn("initializeApp: Initializing an uploads endpoint for the cluster");
        _1.app.use("/uploads", express_1.default.static("uploads", {
            cacheControl: true,
            maxAge: 0,
            immutable: true,
            etag: true,
            dotfiles: "allow",
            lastModified: true,
            index: false,
        }));
    }
    const hostname = NODE_ENV === "production" ? appData.config.productionHostname : appData.config.developmentHostname;
    _1.app.get("/robots.txt", (req, res) => {
        res.setHeader("content-type", "text/plain; charset=utf-8");
        if (NO_SEO) {
            res.end("user-agent = *\ndisallow: /\n");
            return;
        }
        let result = "user-agent: *\ndisallow: /rest/util/*\ndisallow: /rest/index-check/*\n" +
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
            const prefix = appData.cloudClients[appData.sensitiveConfig.seoContainerID].getPrefix();
            let host = "";
            if (prefix.startsWith("/")) {
                host = "https://" +
                    (process.env.NODE_ENV === "production" ?
                        appData.config.productionHostname :
                        appData.config.developmentHostname);
            }
            result += "Sitemap: " + host +
                prefix + (prefix.endsWith("/") ? "" : "/") +
                "sitemaps/" + hostname + "/index.xml";
        }
        res.end(result);
    });
    if (!NO_SEO) {
        const prefix = appData.cloudClients[appData.sensitiveConfig.seoContainerID].getPrefix();
        _1.app.get("/sitemap.xml", (req, res) => {
            res.redirect(prefix + (prefix.endsWith("/") ? "" : "/") + "sitemaps/" + hostname + "/index.xml");
        });
    }
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
    _1.app.use("/:lang", (req, res, next) => {
        if (req.params.lang.length !== 2) {
            next();
            return;
        }
        router(req, res, next);
    });
    // and now the main index setup
    _1.app.get("*", (req, res) => {
        const mode = mode_1.getMode(appData, req);
        if (mode === "development") {
            // because null is a valid rule, it means do not use SSR, we need to
            // pass undefined instead to tell it to use the default rule
            generator_1.ssrGenerator(req, res, appData.indexDevelopment, appData, mode, undefined);
        }
        else {
            generator_1.ssrGenerator(req, res, appData.indexProduction, appData, mode, undefined);
        }
    });
}
exports.initializeApp = initializeApp;
