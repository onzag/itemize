"use strict";
/**
 * This file collect the functions that build the autocomplete from the schema definitions
 * that are unprocessed in the data file
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const fs_1 = __importDefault(require("fs"));
const Error_1 = __importDefault(require("./Error"));
const schema_checks_1 = require("./schema-checks");
const path_1 = __importDefault(require("path"));
const checkers_1 = require("./checkers");
const jsonMap = require("json-source-map");
const fsAsync = fs_1.default.promises;
/**
 * Async function to build a single autocomplete file based on an autocomplete source
 * note that the autocompletes json file that is built is a collection of the output
 * of this function
 * @param rawDataConfig the raw config
 * @param source the source path
 * @param traceback the traceback object
 * @returns a single autocomplete object
 */
async function buildAutocomplete(rawDataConfig, source, traceback) {
    // first we check that the source exists at all
    await util_1.checkExists(source, traceback);
    // now we get the file content
    const fileContent = await fsAsync.readFile(source, "utf8");
    // and build a traceback to this source
    const internalTraceback = traceback.newTraceToLocation(source);
    // get the file data from the json map function
    let fileData;
    try {
        fileData = jsonMap.parse(fileContent);
    }
    catch (err) {
        throw new Error_1.default(err.message, internalTraceback);
    }
    // and setup the pointers
    internalTraceback.setupPointers(fileData.pointers, fileContent);
    // now we run the check of the schema using ajv check
    schema_checks_1.ajvCheck(schema_checks_1.checkAutocompleteSchemaValidate, fileData.data, internalTraceback);
    // and this is the resulting autocomplete
    const resultAutocomplete = {
        type: "autocomplete",
        // we add the name
        name: path_1.default.basename(source).split(".")[0],
        filters: fileData.data.filters,
        values: fileData.data.values,
    };
    // if we have values in the result
    if (resultAutocomplete.values) {
        // we run the checker
        checkers_1.checkAutocompleteFilterAndValues(rawDataConfig, resultAutocomplete.values, internalTraceback.newTraceToBit("values"));
    }
    // if we have filters on it
    if (resultAutocomplete.filters) {
        // do the same thing
        checkers_1.checkAutocompleteFilterAndValues(rawDataConfig, resultAutocomplete.filters, internalTraceback.newTraceToBit("filters"));
    }
    return resultAutocomplete;
}
exports.buildAutocomplete = buildAutocomplete;
