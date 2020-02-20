"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const server_checkers_1 = require("../base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers");
const body_parser_1 = __importDefault(require("body-parser"));
const imported_resources_1 = require("../imported-resources");
const constants_1 = require("../constants");
const mode_1 = require("./mode");
// TODO comment and document
/**
 * this function contains and build all the rest services
 * by returning a router that holds them inside the
 * /rest/ endpoint
 * @param appData the app data that it passes
 */
function restServices(appData) {
    // we create the router
    const router = express_1.default.Router();
    // and the body parser of json type, non strict
    // to allow for simple single json values such as null, false,
    // etc...
    const bodyParserJSON = body_parser_1.default.json({
        strict: false,
    });
    // now we use the body parse router
    router.use((req, res, next) => {
        bodyParserJSON(req, res, (err) => {
            if (err) {
                res.status(400);
                res.end("Malformed JSON");
            }
            else {
                next();
            }
        });
    });
    /**
     * this is the function that represents the index checker
     * @param property the property that is being used
     * @param req the request
     * @param res and response
     */
    async function routerIndexChecker(property, req, res) {
        // so we get the value that has been parsed from the body
        const value = req.body.value;
        // we get the id
        const id = req.body.id;
        // we get the version
        const version = req.body.version;
        // check that they are valid
        if (typeof id !== "number" && id !== null) {
            res.status(400);
            res.end("Invalid Input on id");
            return;
        }
        if (typeof version !== "string" && version !== null) {
            res.status(400);
            res.end("Invalid Input on version");
            return;
        }
        // get get the definition description
        const definition = property.getPropertyDefinitionDescription();
        // if the definition has a json and the value of not of that type
        if (definition.json && typeof value !== definition.json) {
            res.status(400);
            res.end("Invalid Input on value");
            return;
        }
        // let's pass it over the validate function
        if (definition.validate) {
            const invalidReason = definition.validate(value, property.getSubtype());
            // if the property definition complains
            if (invalidReason) {
                res.status(400);
                res.end("Invalid Input");
                return;
            }
        }
        // now we are ready to return
        res.setHeader("content-type", "application/json; charset=utf-8");
        // we use the server side index checker
        const isValid = await server_checkers_1.serverSideIndexChecker(appData.knex, property, value, id, version);
        res.end(JSON.stringify(isValid));
    }
    /**
     * Builds all the routes for a property, basically only index checks for now
     * autocomplete checks have nothing to do with properties themselves
     * @param qualifiedPath the qualified path of the item definition
     * @param property the property itself
     */
    function buildRouteForProperty(qualifiedPath, property) {
        // if the property is unique
        if (property.isUnique()) {
            // we actually add it
            router.post("/index-check/" + qualifiedPath + "/" + property.getId(), routerIndexChecker.bind(null, property));
        }
    }
    /**
     * Builds all the routes for an item definition
     * basically creates all the necessary index-check functions
     * @param idef the item definition in question
     */
    function buildRouteForItemDefinition(idef) {
        idef.getAllPropertyDefinitions().forEach((pd) => {
            buildRouteForProperty(idef.getQualifiedPathName(), pd);
        });
        idef.getChildDefinitions().forEach(buildRouteForItemDefinition);
    }
    /**
     * Builds all the routes for a module
     * basically just obtains all the item definitions and
     * runs it
     * @param mod the module
     */
    function buildRouteForModule(mod) {
        mod.getAllPropExtensions().forEach((pe) => {
            buildRouteForProperty(mod.getQualifiedPathName(), pe);
        });
        mod.getAllModules().forEach(buildRouteForModule);
        mod.getAllChildItemDefinitions().forEach(buildRouteForItemDefinition);
    }
    // now in order to get the country at /rest/util/country
    // which guesses in which country we are
    router.get("/util/country", (req, res) => {
        res.setHeader("content-type", "application/json; charset=utf-8");
        const standardAPIResponse = JSON.stringify({
            country: appData.config.fallbackCountryCode,
            currency: appData.config.fallbackCurrency,
            language: appData.config.fallbackLanguage,
        });
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        // This only occurs during development
        if (ip === "127.0.0.1" ||
            ip === "::1" ||
            ip === "::ffff:127.0.0.1" ||
            !appData.sensitiveConfig.ipStackAccessKey) {
            res.end(standardAPIResponse);
            return;
        }
        http_1.default.get(`http://api.ipstack.com/${ip}?access_key=${appData.sensitiveConfig.ipStackAccessKey}`, (resp) => {
            // let's get the response from the stream
            let data = "";
            resp.on("data", (chunk) => {
                data += chunk;
            });
            resp.on("error", (err) => {
                console.error(err.message);
                res.end(standardAPIResponse);
            });
            resp.on("end", () => {
                // now that we got the answer, let's use our guess
                try {
                    const parsedData = JSON.parse(data);
                    res.end(JSON.stringify({
                        country: parsedData.country_code,
                        currency: imported_resources_1.countries[parsedData.country_code] ? imported_resources_1.countries[parsedData.country_code].currency || "EUR" : "EUR",
                        language: parsedData.languages[0] ? parsedData.languages[0].code :
                            (imported_resources_1.countries[parsedData.country_code] ? imported_resources_1.countries[parsedData.country_code].languages[0] || "en" : "en"),
                    }));
                }
                catch (err) {
                    console.error(err.message);
                    res.end(standardAPIResponse);
                }
            });
        }).on("error", (err) => {
            console.error(err.message);
            res.end(standardAPIResponse);
        });
    });
    // add the static resources
    router.use("/resource", (req, res, next) => {
        const isProtectedResource = constants_1.PROTECTED_RESOURCES.includes(req.path);
        if (isProtectedResource) {
            const mode = mode_1.getMode(appData, req);
            if (mode !== "development") {
                res.status(403).end("Forbidden you need a devkey to access this resource");
            }
        }
        return express_1.default.static(path_1.default.resolve(path_1.default.join("dist", "data")))(req, res, next);
    });
    router.use("/uploads", express_1.default.static(path_1.default.resolve(path_1.default.join("dist", "uploads"))));
    // now let's get all modules
    appData.root.getAllModules().forEach(buildRouteForModule);
    // now let's get all the autocompletes that we loaded in our application
    appData.autocompletes.forEach((autocomplete) => {
        // and add a get request that is used to check them
        // you might wonder why a get request and not a post request
        // this is because autocomplete requests should be able to be cached
        router.get("/autocomplete/" + autocomplete.getName() + "/", (req, res) => {
            let body;
            try {
                body = JSON.parse(req.query.body);
            }
            catch {
                res.status(400);
                res.end("Malformed JSON");
                return;
            }
            // get the language that is used from the request body
            const languageLocale = body.lang;
            const query = body.query;
            const filters = body.filters || {};
            // check it all
            if (typeof languageLocale !== "string" && typeof languageLocale !== "undefined" && languageLocale !== null) {
                res.status(400);
                res.end("Invalid Input on lang");
                return;
            }
            if (typeof query !== "string") {
                res.status(400);
                res.end("Invalid Input on query");
                return;
            }
            // and run the autocomplete
            let results;
            if (languageLocale) {
                results = autocomplete.findI18nRecommendations(query, languageLocale, filters);
            }
            else {
                results = autocomplete.findRecommendations(query, filters);
            }
            // send the results
            res.setHeader("content-type", "application/json; charset=utf-8");
            res.end(JSON.stringify(results));
        });
        // to check an autocomplete value as well, also a get request
        // as well because we need it to be cacheable
        router.get("/autocomplete-check/" + autocomplete.getName() + "/", (req, res) => {
            let body;
            try {
                body = JSON.parse(req.query.body);
            }
            catch {
                res.status(400);
                res.end("Malformed JSON");
                return;
            }
            const value = body.value;
            const filters = body.filters || {};
            if (typeof value !== "string") {
                res.status(400);
                res.end("Invalid Input on query");
                return;
            }
            res.setHeader("content-type", "application/json; charset=utf-8");
            const isValid = !!autocomplete.findExactValueFor(value, filters);
            res.end(JSON.stringify(isValid));
        });
    });
    router.get("/buildnumber", (req, res) => {
        res.setHeader("content-type", "application/json; charset=utf-8");
        res.end(appData.buildnumber.toString());
    });
    // now we add a 404
    router.use((req, res) => {
        res.status(404);
        res.end("Unknown Endpoint");
    });
    // return the router
    return router;
}
exports.default = restServices;
