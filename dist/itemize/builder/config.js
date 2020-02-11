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
const safe_1 = __importDefault(require("colors/safe"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Traceback_1 = __importDefault(require("./Traceback"));
const Error_1 = __importDefault(require("./Error"));
const schema_checks_1 = require("./schema-checks");
const imported_resources_1 = require("../imported-resources");
const json_source_map_1 = __importDefault(require("json-source-map"));
const fsAsync = fs_1.default.promises;
// TODO this must be totally redone...
// it is wrong because of new configuration
/**
 * Stores the config file in the dist
 * directory
 * @param rawConfig the config as parsed
 */
async function buildConfig(rawConfig) {
    const fileName = path_1.default.join("dist", "config.json");
    console.log("emiting " + safe_1.default.green(fileName));
    await fsAsync.writeFile(fileName, JSON.stringify(rawConfig));
}
exports.buildConfig = buildConfig;
/**
 * Extracts the configuration from the files where it should be located
 * and does data checks on the json files
 */
async function extractConfig() {
    const configTraceback = new Traceback_1.default("BUILDER");
    // index.json CHECKING /////////////////////////
    // first we read the base config that contains no sensitive data,
    // by getting the path
    const rawDataConfigLocation = path_1.default.join("config", "index.json");
    // extract with json
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
    schema_checks_1.ajvCheck(schema_checks_1.checkConfig, rawDataConfigBase, rawDataConfigTraceback);
    // let's check the fallback values, first if the country is a valid country
    if (!imported_resources_1.countries[rawDataConfigBase.fallbackCountryCode]) {
        throw new Error_1.default("Invalid fallback country code", rawDataConfigTraceback.newTraceToBit("fallbackCountryCode"));
    }
    // now if the currency is a valid currency
    if (!imported_resources_1.currencies[rawDataConfigBase.fallbackCurrency]) {
        throw new Error_1.default("Invalid fallback currency code", rawDataConfigTraceback.newTraceToBit("fallbackCurrency"));
    }
    // and if the language is a valid language from the supported list in the config
    // itself
    if (!rawDataConfigBase.supportedLanguages.includes(rawDataConfigBase.fallbackLanguage)) {
        throw new Error_1.default("Invalid fallback language which is not in the list of supported", rawDataConfigTraceback.newTraceToBit("fallbackLanguage"));
    }
    // index.sensitive.json CHECKING ////////////////
    // check the sensitive data
    const rawDataSensitiveConfigLocation = path_1.default.join("config", "index.sensitive.json");
    // extract with json
    let rawDataSensitiveConfigBaseFileData;
    let rawDataSensitiveConfigBaseFileContent;
    try {
        // the content and the file data
        rawDataSensitiveConfigBaseFileContent = await fsAsync.readFile(rawDataSensitiveConfigLocation, "utf8");
        rawDataSensitiveConfigBaseFileData = json_source_map_1.default.parse(rawDataSensitiveConfigBaseFileContent);
    }
    catch (err) {
        throw new Error_1.default(err.message, configTraceback);
    }
    // and the sensitive config
    const sensitiveConfigExtra = rawDataSensitiveConfigBaseFileData.data;
    // build the traceback for this specific file and check it with the schema checker
    const rawDataSensitiveConfigTraceback = configTraceback.newTraceToLocation(rawDataSensitiveConfigLocation);
    rawDataSensitiveConfigTraceback.setupPointers(rawDataSensitiveConfigBaseFileData.pointers, rawDataSensitiveConfigBaseFileContent);
    schema_checks_1.ajvCheck(schema_checks_1.checkSensitiveConfig, sensitiveConfigExtra, rawDataSensitiveConfigTraceback);
    // and we merge them together
    const rawDataConfig = {
        ...rawDataConfigBase,
        ...sensitiveConfigExtra,
    };
    // db.sensitive.json CHECKING ///////////////////
    // check the database
    const rawDBConfigLocation = path_1.default.join("config", "db.sensitive.json");
    // extract with json
    let rawDBConfigFileData;
    let rawDBConfigFileContent;
    try {
        // the content and the file data
        rawDBConfigFileContent = await fsAsync.readFile(rawDBConfigLocation, "utf8");
        rawDBConfigFileData = json_source_map_1.default.parse(rawDBConfigFileContent);
    }
    catch (err) {
        throw new Error_1.default(err.message, configTraceback);
    }
    // build the traceback for this specific file and check it with the schema checker
    const rawDBConfigTraceback = configTraceback.newTraceToLocation(rawDBConfigLocation);
    rawDBConfigTraceback.setupPointers(rawDBConfigFileData.pointers, rawDBConfigFileContent);
    schema_checks_1.ajvCheck(schema_checks_1.checkDBConfig, rawDBConfigFileData.data, rawDBConfigTraceback);
    // redis.sensitive.json CHECKING ///////////////////////
    // check the database
    const rawRedisConfigLocation = path_1.default.join("config", "redis.sensitive.json");
    // extract with json
    let rawRedisConfigFileData;
    let rawRedisConfigFileContent;
    try {
        // the content and the file data
        rawRedisConfigFileContent = await fsAsync.readFile(rawRedisConfigLocation, "utf8");
        rawRedisConfigFileData = json_source_map_1.default.parse(rawRedisConfigFileContent);
    }
    catch (err) {
        throw new Error_1.default(err.message, configTraceback);
    }
    // build the traceback for this specific file and check it with the schema checker
    const rawRedisConfigTraceback = configTraceback.newTraceToLocation(rawRedisConfigLocation);
    rawRedisConfigTraceback.setupPointers(rawRedisConfigFileData.pointers, rawRedisConfigFileContent);
    schema_checks_1.ajvCheck(schema_checks_1.checkRedisConfig, rawRedisConfigFileData.data, rawRedisConfigTraceback);
    return rawDataConfig;
}
exports.extractConfig = extractConfig;
