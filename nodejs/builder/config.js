"use strict";
/**
 * Doesn't do much other than save and store the config file for
 * dist purposes
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Traceback_1 = __importDefault(require("./Traceback"));
const Error_1 = __importDefault(require("./Error"));
const schema_checks_1 = require("./schema-checks");
const imported_resources_1 = require("../imported-resources");
const json_source_map_1 = __importDefault(require("json-source-map"));
const fsAsync = fs_1.default.promises;
;
async function extractOneConfig(validator, mainName, version, isSensitive, cb) {
    const configTraceback = new Traceback_1.default("BUILDER");
    const rawDataConfigLocation = path_1.default.join("config", `${mainName}${version ? "." + version : ""}${isSensitive ? ".sensitive" : ""}.json`);
    let rawDataConfigBaseFileData;
    let rawDataConfigBaseFileContent;
    try {
        // the content and the file data
        rawDataConfigBaseFileContent = await fsAsync.readFile(rawDataConfigLocation, "utf8");
        rawDataConfigBaseFileData = json_source_map_1.default.parse(rawDataConfigBaseFileContent);
    }
    catch (err) {
        throw new Error_1.default(err.message, configTraceback);
    }
    // now we can set the result
    const rawDataConfigBase = rawDataConfigBaseFileData.data;
    // build the traceback for this specific file and check it with the schema checker
    const rawDataConfigTraceback = configTraceback.newTraceToLocation(rawDataConfigLocation);
    rawDataConfigTraceback.setupPointers(rawDataConfigBaseFileData.pointers, rawDataConfigBaseFileContent);
    schema_checks_1.ajvCheck(validator, rawDataConfigBase, rawDataConfigTraceback);
    cb && cb(rawDataConfigBase, rawDataConfigTraceback);
    return rawDataConfigBase;
}
exports.extractOneConfig = extractOneConfig;
/**
 * Extracts the configuration from the files where it should be located
 * and does data checks on the json files
 */
async function extractConfigAndBuildNumber() {
    // index.json CHECKING /////////////////////////
    const standardConfigCheckerCallback = (data, traceback) => {
        // let's check the fallback values, first if the country is a valid country
        if (!imported_resources_1.countries[data.fallbackCountryCode]) {
            throw new Error_1.default("Invalid fallback country code", traceback.newTraceToBit("fallbackCountryCode"));
        }
        // now if the currency is a valid currency
        if (!imported_resources_1.currencies[data.fallbackCurrency]) {
            throw new Error_1.default("Invalid fallback currency code", traceback.newTraceToBit("fallbackCurrency"));
        }
        // and if the language is a valid language from the supported list in the config
        // itself
        if (!data.supportedLanguages.includes(data.fallbackLanguage)) {
            throw new Error_1.default("Invalid fallback language which is not in the list of supported", traceback.newTraceToBit("fallbackLanguage"));
        }
        if (!data.containersRegionMappers["*"]) {
            throw new Error_1.default("The containers regions mappers is missing the asterisk (*) property", traceback.newTraceToBit("containersRegionMappers"));
        }
        Object.keys(data.containersRegionMappers).forEach((regions) => {
            const target = data.containersRegionMappers[regions];
            if (regions !== "*") {
                const countriesForRegion = regions.split(",").map((c) => c.trim());
                countriesForRegion.forEach((c) => {
                    if (!imported_resources_1.countries[c]) {
                        throw new Error_1.default("Invalid country code " + c, traceback.newTraceToBit("containersRegionMappers").newTraceToBit(regions));
                    }
                });
            }
            if (!data.containersHostnamePrefixes[target]) {
                console.warn("There's no container hostname prefix specified for " + target +
                    " but it's mentioned in regions " + regions +
                    " as such file support is unavailable for such container");
            }
            else {
                if (data.containersHostnamePrefixes[target].startsWith("http") ||
                    data.containersHostnamePrefixes[target].startsWith("//:")) {
                    throw new Error_1.default("Invalid container hostname prefix, a protocol shouldn't be provided, https assumed", traceback.newTraceToBit("containersHostnamePrefixes").newTraceToBit(target));
                }
            }
        });
    };
    const standardConfig = await extractOneConfig(schema_checks_1.checkConfig, "index", null, false, standardConfigCheckerCallback);
    const sensitiveConfigCheckerCallback = (data, traceback) => {
        Object.keys(standardConfig.containersHostnamePrefixes).forEach((containerId) => {
            if (!data.openstackContainers[containerId] && data.localContainer !== containerId) {
                throw new Error_1.default("Could not find container information for container " + containerId + " in sensitive config", traceback.newTraceToBit("openstackContainers"));
            }
        });
    };
    const sensitiveConfig = await extractOneConfig(schema_checks_1.checkSensitiveConfig, "index", null, true, sensitiveConfigCheckerCallback);
    await extractOneConfig(schema_checks_1.checkSensitiveConfig, "index", "production", true, sensitiveConfigCheckerCallback);
    const redisConfig = await extractOneConfig(schema_checks_1.checkRedisConfig, "redis", null, true);
    await extractOneConfig(schema_checks_1.checkRedisConfig, "redis", "production", true);
    const dbConfig = await extractOneConfig(schema_checks_1.checkDBConfig, "db", null, true);
    await extractOneConfig(schema_checks_1.checkDBConfig, "db", "production", true);
    await extractOneConfig(schema_checks_1.checkDumpConfig, "dump", null, false);
    return {
        standard: standardConfig,
        sensitive: sensitiveConfig,
        redis: redisConfig,
        db: dbConfig,
        buildnumber: (new Date()).getTime(),
    };
}
exports.extractConfigAndBuildNumber = extractConfigAndBuildNumber;
