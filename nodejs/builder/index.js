"use strict";
/**
 * Bundles up and creates all the build files that are used as the schema
 * to generate everything in itemize, from the SQL database, to the endpoints
 * using the raw unprocessed data into some multiple per language files
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PropertyDefinition_1 = __importDefault(require("../base/Root/Module/ItemDefinition/PropertyDefinition"));
const search_interfaces_1 = require("../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces");
const Error_1 = __importDefault(require("./Error"));
const Traceback_1 = __importDefault(require("./Traceback"));
const util_1 = require("./util");
const schema_checks_1 = require("./schema-checks");
const checkers_1 = require("./checkers");
const processer_1 = require("./processer");
const lang_1 = require("./lang");
const resources_1 = require("./resources");
const html_1 = require("./html");
const config_1 = require("./config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const properties_reader_1 = __importDefault(require("properties-reader"));
const safe_1 = __importDefault(require("colors/safe"));
const json_source_map_1 = __importDefault(require("json-source-map"));
const fsAsync = fs_1.default.promises;
// registering source maps, this one is useful for
// debugging and since the builder is a development file
// it's ok this is here
require("source-map-support/register");
const moment_1 = require("./moment");
const constants_1 = require("../constants");
const evaler_1 = require("./evaler");
const buildnumber_1 = require("./buildnumber");
const manifest_1 = require("./manifest");
// Refuse to run in production mode
if (process.env.NODE_ENV === "production") {
    throw new Error("This script cannot run in production mode");
}
async function build() {
    try {
        const rawDataConfig = await config_1.extractConfigAndBuildNumber();
        // ensure the dist directory
        if (!await util_1.checkExists("dist")) {
            await fsAsync.mkdir("dist");
        }
        if (!await util_1.checkExists(path_1.default.join("dist", "data"))) {
            await fsAsync.mkdir(path_1.default.join("dist", "data"));
        }
        // we run all the build steps
        const [rawRoot] = await Promise.all([
            buildData(rawDataConfig),
            config_1.buildConfig(rawDataConfig),
            html_1.buildHTML(rawDataConfig),
            buildnumber_1.buildBuildNumber(rawDataConfig),
            resources_1.buildResources(rawDataConfig),
            moment_1.copyMomentFiles(rawDataConfig),
        ]);
        await manifest_1.buildManifest(rawDataConfig, rawRoot);
    }
    catch (err) {
        // display an error if it's part of a checkup error
        if (err instanceof Error_1.default) {
            err.display();
        }
        // log the stack
        console.log(err.stack);
    }
}
exports.default = build;
;
/**
 * Builds the base data for the root tree
 * in order to create the build files
 * @param rawDataConfig the configuration
 */
async function buildData(rawDataConfig) {
    const entryPoint = rawDataConfig.standard.entry;
    // lets get the actual location of the item, lets assume first
    // it is the given location
    const actualLocation = await util_1.getActualFileLocation(["", entryPoint], new Traceback_1.default("BUILDER"));
    // lets create the traceback for this file
    const traceback = new Traceback_1.default(actualLocation);
    // lets read the file, let it fail if it fails
    const fileContent = await fsAsync.readFile(actualLocation, "utf8");
    // lets get the file data
    let fileData;
    try {
        fileData = json_source_map_1.default.parse(fileContent);
    }
    catch (err) {
        throw new Error_1.default(err.message, traceback);
    }
    // Setup the pointers for the pointer data
    // to be able to trace to bit
    // ajv checks require pointers for diving in
    // the invalid properties
    traceback.setupPointers(fileData.pointers, fileContent);
    // it all should start in the root element
    schema_checks_1.ajvCheck(schema_checks_1.checkRootSchemaValidate, fileData.data, traceback);
    // now let's build the i18n supported languages
    // data which contains all the supported languges
    const i18nData = await lang_1.buildLang(rawDataConfig, actualLocation, fileData.data.i18n, traceback);
    // and make the result JSON
    const resultJSON = {
        type: "root",
        location: actualLocation,
        pointers: fileData.pointers,
        i18nData,
        children: fileData.data.children ?
            (await buildChildrenItemDefinitionsOrModules(rawDataConfig, path_1.default.dirname(actualLocation), path_1.default.dirname(actualLocation), fileData.data.children, "module", traceback.newTraceToBit("children"))) : [],
    };
    // check and run the checkers
    checkers_1.checkRoot(resultJSON);
    // and let's emit such file tht only contains the language name
    console.log("emiting " + safe_1.default.green(path_1.default.join("dist", "data", "lang.json")));
    await fsAsync.writeFile(path_1.default.join("dist", "data", "lang.json"), JSON.stringify(lang_1.clearLang(i18nData, rawDataConfig)));
    // now let's produce the build for every language
    const resultBuilds = rawDataConfig.standard.supportedLanguages.map((lang) => {
        return processer_1.processRoot(resultJSON, lang);
    });
    // let's process the result for the main output so we remove
    // unecessary data for the build
    const mainResultBuild = processer_1.processRoot(resultJSON);
    // now let's output the build
    const allBuildFileName = path_1.default.join("dist", "data", `build.all.json`);
    console.log("emiting " + safe_1.default.green(allBuildFileName));
    await fsAsync.writeFile(allBuildFileName, JSON.stringify(mainResultBuild));
    // and now let's output clean builds for every language that is supported
    await Promise.all(rawDataConfig.standard.supportedLanguages.map(async (sl, index) => {
        // so we get a resulting build for the given language
        const resultingBuild = resultBuilds[index];
        // and let's emit such file
        const fileName = path_1.default.join("dist", "data", `build.${sl}.json`);
        console.log("emiting " + safe_1.default.green(fileName));
        await fsAsync.writeFile(fileName, JSON.stringify(resultingBuild));
    }));
    return resultJSON;
}
/**
 * this processes all the included files
 * whether modules or items
 * @param rawDataConfig the raw configuration
 * @param parentFolder the parent folder where this is located
 * @param lastModuleDirectory the module we are currently in in order
 * to be able to perform checks for imported paths (not children)
 * @param children the children to add as string
 * @param childrenMustBeOfType pass null not to specify or a string
 * @param traceback the traceback of the current children
 */
async function buildChildrenItemDefinitionsOrModules(rawDataConfig, parentFolder, lastModuleDirectory, children, childrenMustBeOfType, traceback) {
    // this will be the resulting array, either modules or items
    // in the case of items, it can only have items as children
    const result = [];
    // to loop
    let child;
    let childIndex = -1;
    // so we loop over the includes
    for (child of children) {
        childIndex++;
        const specificIncludeTraceback = traceback.newTraceToBit(childIndex);
        // so the actual location is the parent folder and the include name
        const actualLocation = await util_1.getActualFileLocation([parentFolder, child], specificIncludeTraceback);
        const externalSpecificIncludeTraceback = specificIncludeTraceback.newTraceToLocation(actualLocation);
        // now the file content is read
        const fileContent = await fsAsync.readFile(actualLocation, "utf8");
        // and the data parsed
        let fileData;
        try {
            fileData = json_source_map_1.default.parse(fileContent);
        }
        catch (err) {
            throw new Error_1.default(err.message, externalSpecificIncludeTraceback);
        }
        externalSpecificIncludeTraceback.setupPointers(fileData.pointers, fileContent);
        // check the type
        if (childrenMustBeOfType && childrenMustBeOfType !== fileData.data.type) {
            throw new Error_1.default("Invalid type to be a children of '" +
                fileData.data.type + "' expected '" + childrenMustBeOfType, externalSpecificIncludeTraceback);
        }
        // now we check the type to see whether we got a module or a item
        if (fileData.data.type === "module") {
            // we would process a module
            result.push(await buildModule(rawDataConfig, actualLocation, fileData.data, fileData.pointers, fileContent, externalSpecificIncludeTraceback));
        }
        else if (fileData.data.type === "item") {
            // we would process an item
            result.push(await buildItemDefinition(rawDataConfig, actualLocation, lastModuleDirectory, fileData.data, fileData.pointers, fileContent, externalSpecificIncludeTraceback));
        }
        else if (fileData.type === "root") {
            throw new Error_1.default("Root found as children", externalSpecificIncludeTraceback);
        }
    }
    // return the result
    return result;
}
/**
 * Processes a module
 * @param rawDataConfig the raw config
 * @param actualLocation the location of the file  we are working on
 * for the module
 * @param fileData the data that file contains
 * @param pointers the file pointers
 * @param raw the raw content of the file
 * @param traceback the traceback object
 * @returns a raw module
 */
async function buildModule(rawDataConfig, actualLocation, fileData, pointers, raw, traceback) {
    const actualEvaledFileData = evaler_1.evalRawJSON(rawDataConfig, fileData);
    schema_checks_1.ajvCheck(schema_checks_1.checkModuleSchemaValidate, actualEvaledFileData, traceback);
    const actualName = await util_1.getActualFileIdentifier(actualLocation, traceback);
    const i18nDataLocation = actualLocation.replace(".json", ".properties");
    const i18nData = await getI18nData(rawDataConfig, typeof actualEvaledFileData.searchable !== "undefined" ? actualEvaledFileData.searchable : true, i18nDataLocation, null, traceback);
    // lets find prop extensions if they are available
    const propExtLocation = actualLocation.replace(".json", ".propext.json");
    // let's check if the file exists
    const propExtExists = await util_1.checkExists(propExtLocation);
    // and the final value is created
    const actualLocationDirectory = path_1.default.dirname(actualLocation);
    const finalValue = {
        type: "module",
        name: actualName,
        i18nData: i18nData,
        location: actualLocation,
        i18nDataLocation,
        pointers,
        raw,
        children: actualEvaledFileData.children ? await buildChildrenItemDefinitionsOrModules(rawDataConfig, actualLocationDirectory, actualLocationDirectory, actualEvaledFileData.children, null, traceback.newTraceToBit("children")) : [],
    };
    // propextensions is declared
    let propExtensions;
    let propExtRaw;
    let propExtPointers;
    if (propExtExists) {
        // they are set if the file exists
        const propExtTraceback = traceback.newTraceToLocation(propExtLocation);
        let internalFileData;
        propExtRaw = await fsAsync.readFile(propExtLocation, "utf8");
        try {
            internalFileData = json_source_map_1.default.parse(propExtRaw);
        }
        catch (err) {
            throw new Error_1.default(err.message, propExtTraceback);
        }
        propExtTraceback.setupPointers(internalFileData.pointers, propExtRaw);
        propExtPointers = internalFileData.pointers;
        schema_checks_1.ajvCheck(schema_checks_1.checkPropertyDefinitionArraySchemaValidate, internalFileData.data, propExtTraceback);
        // modules being searchable and items being searchable can vary and for that reason
        // we must check whether we need the searchable properties for the properties to displace data
        let searchableProperties = typeof actualEvaledFileData.searchable !== "undefined" ? actualEvaledFileData.searchable : true;
        if (!searchableProperties) {
            const checkAtLeastOneIsSearchable = (idef) => {
                if (searchableProperties) {
                    return;
                }
                else if (typeof idef.searchable === "undefined" || idef.searchable) {
                    searchableProperties = true;
                    return;
                }
                else if (idef.childDefinitions) {
                    idef.childDefinitions.forEach((cd) => {
                        checkAtLeastOneIsSearchable(idef);
                    });
                }
            };
            finalValue.children.forEach((c) => {
                if (c.type === "item") {
                    checkAtLeastOneIsSearchable(c);
                }
            });
        }
        propExtensions =
            await Promise.all(internalFileData.data.map((pd, index) => {
                const specificPropertyTraceback = propExtTraceback.newTraceToBit(index);
                return getI18nPropertyData(rawDataConfig, actualLocation, pd, searchableProperties, specificPropertyTraceback);
            }));
    }
    if (typeof actualEvaledFileData.searchable !== "undefined") {
        finalValue.searchable = actualEvaledFileData.searchable;
    }
    // we add the propExtensions if necessary
    if (propExtensions) {
        finalValue.propExtensions = propExtensions;
        finalValue.propExtRaw = propExtRaw;
        finalValue.propExtPointers = propExtPointers;
        finalValue.propExtLocation = propExtLocation;
    }
    if (actualEvaledFileData.readRoleAccess) {
        finalValue.readRoleAccess = actualEvaledFileData.readRoleAccess;
    }
    // and return the final value
    return finalValue;
}
/**
 * Processes an item
 * @param rawDataConfig the raw config
 * @param actualLocation the location path for the item
 * @param lastModuleDirectory the last module directory
 * @param fileData the file data raw and untreated
 * @param pointers the pointers of the file for traceback usage
 * @param raw the raw content of the file
 * @param traceback the traceback
 * @returns a raw treated item definition
 */
async function buildItemDefinition(rawDataConfig, actualLocation, lastModuleDirectory, fileData, pointers, raw, traceback) {
    const actualEvaledFileData = evaler_1.evalRawJSON(rawDataConfig, fileData);
    schema_checks_1.ajvCheck(schema_checks_1.checkItemDefinitionSchemaValidate, actualEvaledFileData, traceback);
    const actualName = await util_1.getActualFileIdentifier(actualLocation, traceback);
    const i18nDataLocation = actualLocation.replace(".json", ".properties");
    const i18nData = await getI18nData(rawDataConfig, typeof actualEvaledFileData.searchable !== "undefined" ? actualEvaledFileData.searchable : true, i18nDataLocation, actualEvaledFileData.policies, traceback);
    // lets get the file definitions that are imported that exist
    await Promise.all((actualEvaledFileData.imports || []).map((imp, index) => {
        return util_1.getActualFileLocation([lastModuleDirectory, imp], traceback.newTraceToBit("imports").newTraceToBit(index));
    }));
    // lets get the file definitions that are imported
    // as an array for use by the browser
    const importedChildDefinitions = (actualEvaledFileData.imports || [])
        .map((l) => l.split("/"));
    // and now lets build the child definitions that are included within
    let childDefinitions = [];
    // if the name is index there might be child definitions in the same
    // folder, either files or folders themselves, an item might be made of
    // several smaller sub items
    if (path_1.default.basename(actualLocation) === "index.json") {
        childDefinitions = actualEvaledFileData.children ?
            (await buildChildrenItemDefinitionsOrModules(rawDataConfig, path_1.default.dirname(actualLocation), lastModuleDirectory, actualEvaledFileData.children, "item", traceback.newTraceToBit("children"))) : [];
    }
    const finalValue = {
        i18nData: i18nData,
        name: actualName,
        location: actualLocation,
        i18nDataLocation,
        pointers,
        raw,
        includes: actualEvaledFileData.includes,
        properties: actualEvaledFileData.properties,
        type: actualEvaledFileData.type,
        policies: actualEvaledFileData.policies,
    };
    if (typeof actualEvaledFileData.searchable !== "undefined") {
        finalValue.searchable = actualEvaledFileData.searchable;
    }
    if (actualEvaledFileData.readRoleAccess) {
        finalValue.readRoleAccess = actualEvaledFileData.readRoleAccess;
    }
    if (actualEvaledFileData.createRoleAccess) {
        finalValue.createRoleAccess = actualEvaledFileData.createRoleAccess;
    }
    if (actualEvaledFileData.editRoleAccess) {
        finalValue.editRoleAccess = actualEvaledFileData.editRoleAccess;
    }
    if (actualEvaledFileData.deleteRoleAccess) {
        finalValue.deleteRoleAccess = actualEvaledFileData.deleteRoleAccess;
    }
    if (actualEvaledFileData.ownerIsObjectId) {
        finalValue.ownerIsObjectId = actualEvaledFileData.ownerIsObjectId;
    }
    if (actualEvaledFileData.enableVersioning) {
        finalValue.enableVersioning = actualEvaledFileData.enableVersioning;
        if (actualEvaledFileData.versionIsCountry) {
            finalValue.versionIsCountry = actualEvaledFileData.versionIsCountry;
        }
        if (actualEvaledFileData.versionIsLanguage) {
            finalValue.versionIsLanguage = actualEvaledFileData.versionIsLanguage;
        }
        if (actualEvaledFileData.versionIsLanguageAndCountry) {
            finalValue.versionIsLanguageAndCountry = actualEvaledFileData.versionIsLanguageAndCountry;
        }
    }
    if (!finalValue.includes ||
        (Array.isArray(finalValue.includes) && !finalValue.includes.length)) {
        delete finalValue.includes;
    }
    if (!finalValue.properties ||
        (Array.isArray(finalValue.properties) && !finalValue.properties.length)) {
        delete finalValue.properties;
    }
    if (importedChildDefinitions.length) {
        finalValue.importedChildDefinitions = importedChildDefinitions;
    }
    if (childDefinitions.length) {
        finalValue.childDefinitions = childDefinitions;
    }
    if (finalValue.properties) {
        const propertiesTraceback = traceback.newTraceToBit("properties");
        finalValue.properties = await Promise.all(finalValue.properties.map((pd, index) => {
            const specificPropertyTraceback = propertiesTraceback.newTraceToBit(index);
            return getI18nPropertyData(rawDataConfig, actualLocation, pd, typeof finalValue.searchable === "undefined" ? true : finalValue.searchable, specificPropertyTraceback);
        }));
    }
    if (finalValue.includes) {
        const fnCheckExists = async (include, iTraceback) => {
            if (importedChildDefinitions) {
                // if we find such imported definition
                if (importedChildDefinitions.find((idef) => {
                    const lastName = idef[idef.length - 1];
                    return (lastName === include.definition ||
                        idef.join("/") === include.definition);
                })) {
                    // we return and assume it is valid
                    return;
                }
            }
            // otherwise if we don't find any and we know for sure
            // it is meant to be an imported definition
            if (include.definition.indexOf("/") !== -1) {
                throw new Error_1.default("Missing imported item definition for " + include, iTraceback.newTraceToBit("name"));
            }
            // Otherwise we try to get the actual location
            // it will throw an error otherwise
            await util_1.getActualFileLocation([path_1.default.dirname(actualLocation), include.definition], iTraceback.newTraceToBit("name"));
        };
        const tracebackIncludes = traceback.newTraceToBit("includes");
        await Promise.all(finalValue.includes.map((include, index) => {
            return fnCheckExists(include, tracebackIncludes.newTraceToBit(index));
        }));
        finalValue.includes = await Promise.all(finalValue.includes.map((include, index) => {
            return getI18nIncludeData(rawDataConfig, actualLocation, include, tracebackIncludes.newTraceToBit(index));
        }));
    }
    return finalValue;
}
/**
 * Provides the i18name as given by the language file
 * @param rawDataConfig the raw config
 * @param languageFileLocation the location of the properties file
 * @param policies the polcies that are expected to be requested
 * @param traceback the traceback object
 * @returns the right structure for a i18nName attribute
 */
async function getI18nData(rawDataConfig, isSearchable, languageFileLocation, policies, traceback) {
    // we check whether it exists
    await util_1.checkExists(languageFileLocation, traceback);
    // and then we use the properties reader on it
    const properties = properties_reader_1.default(languageFileLocation).path();
    const i18nData = {};
    // the traceback for such file
    const localeFileTraceback = traceback.newTraceToLocation(languageFileLocation);
    // now we loop over each lanaguage we support
    rawDataConfig.standard.supportedLanguages.forEach((locale) => {
        // if we find nothing we throw an error
        if (!properties[locale]) {
            throw new Error_1.default("File does not include language data for locale " + locale, localeFileTraceback);
        }
        // otherwise set the locale data to empty
        i18nData[locale] = {
            name: null,
            fts_search_field_label: null,
            fts_search_field_placeholder: null,
        };
        // for every locale key we have that we need either for item definition
        // or module as defined by the constants
        constants_1.MODULE_AND_ITEM_DEF_I18N.forEach((localeKey) => {
            if (!properties[locale][localeKey]) {
                throw new Error_1.default("File does not include language data for key '" + localeKey + "' for locale " + locale, localeFileTraceback);
            }
            i18nData[locale][localeKey] = properties[locale][localeKey].trim();
        });
        if (isSearchable) {
            constants_1.MODULE_AND_ITEM_DEF_I18N_SEARCHABLE.forEach((localeKey) => {
                if (!properties[locale][localeKey]) {
                    throw new Error_1.default("File does not include language data for searchable key '" + localeKey + "' for locale " + locale, localeFileTraceback);
                }
                i18nData[locale][localeKey] = properties[locale][localeKey].trim();
            });
        }
        // if we have policies defined
        if (policies) {
            // we check if we have it setup in the properties
            if (!properties[locale].policies) {
                throw new Error_1.default("File does not include language data for policies in " + locale, localeFileTraceback);
            }
            // add it to the i18n data for that locale
            i18nData[locale].policies = {};
            // now we check which policies we have available, per key
            Object.keys(policies).forEach((policyType) => {
                // and we check that we have language data for such policy type, either read or delete
                if (!properties[locale].policies[policyType]) {
                    throw new Error_1.default("File does not include language data for policy '" + policyType + "' in " + locale, localeFileTraceback);
                }
                // now we add such policy in the policy list as empty
                i18nData[locale].policies[policyType] = {};
                // then we start adding up the policy rules, these are the policy names
                // eg. REQUIRES_PASSWORD_CONFIRMATION and whatnot
                Object.keys(policies[policyType]).forEach((policyName) => {
                    if (!properties[locale].policies[policyType][policyName]) {
                        throw new Error_1.default("File does not include language data for policy '" + policyType + "' in " +
                            locale + " for rule '" + policyName + "'", localeFileTraceback);
                    }
                    i18nData[locale].policies[policyType][policyName] = {};
                    constants_1.POLICY_REQUIRED_I18N.forEach((policyReqiredI18nKey) => {
                        if (!properties[locale].policies[policyType][policyName][policyReqiredI18nKey]) {
                            throw new Error_1.default("File does not include language data for policy '" + policyType + "' in " +
                                locale + " for rule '" + policyName + "' in '" + policyReqiredI18nKey + "'", localeFileTraceback);
                        }
                        i18nData[locale].policies[policyType][policyName][policyReqiredI18nKey] =
                            properties[locale].policies[policyType][policyName][policyReqiredI18nKey].trim();
                    });
                    constants_1.POLICY_OPTIONAL_I18N.forEach((policyOptionalI18nKey) => {
                        if (!properties[locale].policies[policyType][policyName][policyOptionalI18nKey]) {
                            return;
                        }
                        i18nData[locale].policies[policyType][policyName][policyOptionalI18nKey] =
                            properties[locale].policies[policyType][policyName][policyOptionalI18nKey].trim();
                    });
                });
            });
        }
        if (properties[locale][constants_1.MODULE_AND_ITEM_DEF_CUSTOM_I18N_KEY]) {
            i18nData[locale][constants_1.MODULE_AND_ITEM_DEF_CUSTOM_I18N_KEY] = {};
            Object.keys(properties[locale][constants_1.MODULE_AND_ITEM_DEF_CUSTOM_I18N_KEY]).forEach((customPropertyInCustomKey) => {
                if (typeof properties[locale][constants_1.MODULE_AND_ITEM_DEF_CUSTOM_I18N_KEY][customPropertyInCustomKey] !== "string") {
                    throw new Error_1.default("Custom key '" + customPropertyInCustomKey + "' in locale " + locale + " is not a string", localeFileTraceback);
                }
                i18nData[locale].custom[customPropertyInCustomKey] =
                    properties[locale][constants_1.MODULE_AND_ITEM_DEF_CUSTOM_I18N_KEY][customPropertyInCustomKey];
            });
        }
    });
    return i18nData;
}
/**
 * Process an item group or item specific id to give
 * it specific item name for i18n data, this function is destructive
 * @param rawDataConfig the raw config
 * @param actualLocation the location that the item is being worked on
 * @param include the include itself
 * @param traceback the traceback object
 * @returns the item modified
 */
async function getI18nIncludeData(rawDataConfig, actualLocation, include, traceback) {
    // get the language location
    const languageFileLocation = actualLocation.replace(".json", ".properties");
    // check that it exists
    await util_1.checkExists(languageFileLocation, traceback);
    // get the properties
    const properties = properties_reader_1.default(languageFileLocation).path();
    const i18nData = {};
    const localeFileTraceback = traceback.newTraceToBit("id").newTraceToLocation(languageFileLocation);
    const expectedProperties = constants_1.ITEM_OPTIONAL_I18N
        .map((b) => ({ key: b, required: false }))
        .concat((include.canUserExclude || include.canUserExcludeIf ? constants_1.ITEM_CAN_BE_EXCLUDED_I18N : [])
        .map((b) => ({ key: b, required: true })))
        .concat((include.exclusionIsCallout ? constants_1.ITEM_CALLOUT_EXCLUDED_I18N : [])
        .map((b) => ({ key: b, required: true })));
    const localeDataIsRequired = expectedProperties.filter((p) => p.required).length >= 1;
    // use the same technique we used before to get the name
    rawDataConfig.standard.supportedLanguages.forEach((locale) => {
        i18nData[locale] = {};
        if (!properties[locale]) {
            if (localeDataIsRequired) {
                throw new Error_1.default("File does not include language data for '" + locale + "'", localeFileTraceback);
            }
            return;
        }
        else if (!properties[locale].includes) {
            if (localeDataIsRequired) {
                throw new Error_1.default("File does not include 'includes' data for '" + locale + "'", localeFileTraceback);
            }
            return;
        }
        else if (!properties[locale].includes[include.id]) {
            if (localeDataIsRequired) {
                throw new Error_1.default("Does not include 'includes' data for '" + locale + "' in '" +
                    include.id + "'", localeFileTraceback);
            }
            return;
        }
        expectedProperties.forEach((expectedProperty) => {
            const result = properties[locale].includes[include.id][expectedProperty.key];
            // if we don't find it and it's not required not a big deal
            if (!result && !expectedProperty.required) {
                return;
            }
            else if (!result && expectedProperty.required) {
                // otherwise we throw an error
                throw new Error_1.default("File " + languageFileLocation +
                    " has missing items data for include id '" + include.id +
                    "' in '" + expectedProperty.key + "' in locale " + locale, localeFileTraceback);
            }
            else if (typeof result !== "string") {
                // also throw an error if it's invalid
                throw new Error_1.default("File " + languageFileLocation +
                    " has invalid items data for include id '" + include.id +
                    "' in '" + expectedProperty.key + "' in locale " + locale, localeFileTraceback);
            }
            i18nData[locale][expectedProperty.key] = result.trim();
        });
    });
    // set it and return the item itself
    include.i18nData = i18nData;
    return include;
}
/**
 * Processes a property to give it the i18n data as
 * defined by the constants for its type
 * this function is destructive
 * @param rawDataConfig the raw config
 * @param actualLocation the location that the item is being worked on
 * @param property the property itself
 * @param traceback the traceback object
 * @returns the property itself
 */
async function getI18nPropertyData(rawDataConfig, actualLocation, property, searchable, traceback) {
    // if it's always hidden
    // it is pointless to request the data
    if (property.hidden) {
        return property;
    }
    // lets get the language location by using the property location
    const languageFileLocation = actualLocation.replace(".json", ".properties");
    // check that the file exists
    // throws an error if otherwise
    await util_1.checkExists(languageFileLocation, traceback);
    const i18nData = {};
    // get the properties and the definition
    const properties = properties_reader_1.default(languageFileLocation).path();
    const definition = PropertyDefinition_1.default.supportedTypesStandard[property.type];
    if (!definition) {
        throw new Error_1.default(`Unknown type '${property.type}'`, traceback.newTraceToBit("type"));
    }
    const localeFileTraceback = traceback.newTraceToBit("id").newTraceToLocation(languageFileLocation);
    const searchIsDisabled = !searchable ||
        (typeof property.searchable !== "undefined" && !property.searchable);
    let expectedProperties = definition.i18n.base
        .map((b) => ({ key: b, required: true }))
        // concat to optional properties
        .concat((definition.i18n.optional || [])
        .map((b) => ({ key: b, required: false })))
        // concat to search range properties only if necessary
        .concat((property.disableRangedSearch || searchIsDisabled ?
        [] : definition.i18n.searchRange || [])
        .map((b) => ({ key: b, required: true })))
        .concat((property.disableRangedSearch || searchIsDisabled ?
        [] : definition.i18n.searchRangeOptional || [])
        .map((b) => ({ key: b, required: false })))
        // concat to search properties only if necessary
        .concat((searchIsDisabled || (definition.searchInterface === search_interfaces_1.PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE &&
        !property.disableRangedSearch) ?
        [] : definition.i18n.searchBase || [])
        .map((b) => ({ key: b, required: true })))
        .concat((searchIsDisabled || (definition.searchInterface === search_interfaces_1.PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE &&
        !property.disableRangedSearch) ?
        [] : definition.i18n.searchOptional || [])
        .map((b) => ({ key: b, required: false })))
        // request for the values if supported
        .concat((property.values || [])
        .map((b) => ({
        key: "values." + b.toString().replace(/\./g, "_dot_").replace("/\s/g", "_"),
        required: true,
        actualFinalKeyValue: b.toString(),
    })))
        .concat((property.values ? ["null_value"] : [])
        .map((b) => ({ key: b, required: true })))
        .concat((property.invalidIf && !property.hidden ? property.invalidIf.map((ii) => ii.error) : [])
        .map((b) => ({ key: "error." + b, required: true })));
    const errorRequiredProperties = [];
    if (!property.nullable && property.type !== "boolean") {
        errorRequiredProperties.push("error.NOT_NULLABLE");
    }
    if (property.unique) {
        errorRequiredProperties.push("error.NOT_UNIQUE");
    }
    if (definition.i18n.tooLargeErrorInclude &&
        !property.values) {
        errorRequiredProperties.push("error.TOO_LARGE");
    }
    if (definition.supportedSubtypes && property.subtype && property.type === "string") {
        errorRequiredProperties.push("error.INVALID_SUBTYPE_VALUE");
    }
    if ((property.type === "date" ||
        property.type === "datetime" ||
        property.type === "time" ||
        property.type === "number" ||
        property.type === "currency" ||
        property.type === "integer" ||
        property.type === "year" ||
        property.type === "unit") && !property.values) {
        errorRequiredProperties.push("error.INVALID_VALUE");
    }
    if ((typeof property.minLength !== "undefined" || definition.i18n.tooSmallErrorInclude) &&
        !property.values) {
        errorRequiredProperties.push("error.TOO_SMALL");
    }
    if (definition.i18n.tooManyDecimalsErrorInclude && !property.values) {
        errorRequiredProperties.push("error.TOO_MANY_DECIMALS");
    }
    if (typeof property.minDecimalCount !== "undefined" && !property.values) {
        errorRequiredProperties.push("error.TOO_FEW_DECIMALS");
    }
    if (definition.searchInterface === search_interfaces_1.PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE &&
        !property.disableRangedSearch &&
        (typeof property.searchable === "undefined" ||
            property.searchable)) {
        errorRequiredProperties.push("error.FROM_LARGER_THAN_TO");
        errorRequiredProperties.push("error.TO_SMALLER_THAN_FROM");
    }
    expectedProperties = expectedProperties.concat(errorRequiredProperties
        .map((b) => ({ key: b, required: true })));
    // and start to loop
    rawDataConfig.standard.supportedLanguages.forEach((locale) => {
        // do some checks
        if (!properties[locale]) {
            throw new Error_1.default("File does not include language data for '" + locale + "'", localeFileTraceback);
        }
        else if (!properties[locale].properties) {
            throw new Error_1.default("File does not include 'properties' data for '" + locale + "'", localeFileTraceback);
        }
        else if (!properties[locale].properties[property.id]) {
            throw new Error_1.default("Does not include 'properties' data for '" + locale + "' in '" +
                property.id + "'", localeFileTraceback);
        }
        // start initializing the data in the property itself
        i18nData[locale] = {};
        const propertyData = properties[locale].properties[property.id];
        // run the expected properties and start running them
        expectedProperties.forEach((expectedProperty) => {
            // split the names
            const splitted = expectedProperty.key.split(".");
            let result = propertyData;
            let propKey;
            // try to find it
            for (propKey of splitted) {
                result = result[propKey];
                if (!result) {
                    break;
                }
            }
            // if we don't find it and it's not required not a big deal
            if (!result && !expectedProperty.required) {
                return;
            }
            else if (!result && expectedProperty.required) {
                // otherwise we throw an error
                throw new Error_1.default("File " + languageFileLocation +
                    " has missing property data for property id '" + property.id +
                    "' in '" + expectedProperty.key + "' required by type '" +
                    property.type + "' in locale " + locale, localeFileTraceback);
            }
            else if (typeof result !== "string") {
                // also throw an error if it's invalid
                throw new Error_1.default("File " + languageFileLocation +
                    " has invalid property data for property id '" + property.id +
                    "' in '" + expectedProperty.key + "' required by type '" +
                    property.type + "' in locale " + locale, localeFileTraceback);
            }
            // Trim the result
            result = result.trim();
            // now we search where the property has to be set
            let whereToSet = i18nData[locale];
            // by looping on the splitted value
            splitted.forEach((keyValue, index) => {
                // on the last one we set it as the value
                if (index === splitted.length - 1) {
                    whereToSet[expectedProperty.actualFinalKeyValue || keyValue] = result;
                    return;
                }
                // otherwise we try to get deeper
                whereToSet[keyValue] = whereToSet[keyValue] || {};
                whereToSet = whereToSet[keyValue];
            });
        });
    });
    property.i18nData = i18nData;
    // return the property
    return property;
}
