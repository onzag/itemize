"use strict";
/**
 * This file specifies how schema checks are ran against json sources
 * in order to validate schemas using ajv
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const schema_1 = __importDefault(require("../base/Root/schema"));
const schema_2 = __importDefault(require("../base/Root/Module/ItemDefinition/schema"));
const schema_3 = __importDefault(require("../base/Root/Module/schema"));
const Error_1 = __importDefault(require("./Error"));
const schema_4 = require("../base/Root/Module/ItemDefinition/PropertyDefinition/schema");
require("source-map-support/register");
const config_1 = require("../config");
const ajv = new ajv_1.default();
/**
 * Checks a root schema
 */
exports.checkRootSchemaValidate = ajv.compile(schema_1.default);
/**
 * Checks an item definition schema
 */
exports.checkItemDefinitionSchemaValidate = ajv.compile(schema_2.default);
/**
 * Checks a property definition array schema
 */
exports.checkPropertyDefinitionArraySchemaValidate = ajv.compile({
    type: "array",
    items: {
        $ref: "ItemDefinition#/definitions/PropertyDefinition",
    },
});
exports.checkSpecialPropertyValueSetSchemaValidate = ajv.compile(schema_4.SpecialPropertyValueSetSchema);
/**
 * Checks a module
 */
exports.checkModuleSchemaValidate = ajv.compile(schema_3.default);
/**
 * Check the partial sensitive configuration
 */
exports.checkSensitiveConfig = ajv.compile(config_1.rawSensitiveConfigSchema);
/**
 * Check the partial config (non-sensitive)
 */
exports.checkConfig = ajv.compile(config_1.rawConfigSchema);
/**
 * Check raw database config
 */
exports.checkDBConfig = ajv.compile(config_1.rawDBConfigSchema);
/**
 * Check redis config
 */
exports.checkRedisConfig = ajv.compile(config_1.rawRedisConfigSchema);
/**
 * Runs a given ajv check function of the ones avaliable
 * in this list against a schema and ensures to populate traceback
 * values
 * @param fn the function to run
 * @param rawData the raw data to validate against
 * @param traceback the traceback to throw errors to
 */
function ajvCheck(fn, rawData, traceback) {
    // let's check if it's valid
    const valid = fn(rawData);
    // if not valid throw the errors
    if (!valid) {
        // let's use only the first error
        const firstError = fn.errors[0];
        // and now try to find where it messed up
        let actualTraceback = traceback;
        // if we have a data path
        if (firstError.dataPath) {
            // then let's split it using this magic schema, basically
            // we want to get rid of all the [0][1].hello[2].stuff[1].kinda and
            // turn it into [0.1.hello.2.stuff.1.kinda since ajv consistently
            // returns numbers into brackets, note how the first bracket isn't removed
            const splittedPath = firstError.dataPath
                .replace(/\]\.|\]\[|\]$/g, ".").split(/\[|\./g);
            // so now we get in
            let pathLocation;
            // and start looping
            for (pathLocation of splittedPath) {
                // if there's no path location aka empty string
                if (!pathLocation) {
                    // continue, this happens with the lone bracket
                    continue;
                }
                // otherwise let's check if it's a valid type
                if ((/^[a-zA-Z0-9_-]+$/).test(pathLocation)) {
                    // and trace
                    actualTraceback = actualTraceback.newTraceToBit(pathLocation);
                }
                else if (pathLocation.startsWith("'")) {
                    // this is one of those 'EXAMPLE_LOCATION' that is somehow inside a bracket and it's not a number
                    // we need to parse it for that we are going to convert it to valid json
                    try {
                        const validJSON = pathLocation.replace(/"/g, "__-QUOT-__").replace(/'/g, "\"");
                        const result = JSON.parse(validJSON).replace(/\_\_\-QUOT\-\_\_/g, "\"");
                        actualTraceback = actualTraceback.newTraceToBit(result);
                    }
                    catch {
                        // otherwise return, something has messed up
                        break;
                    }
                }
                else {
                    // otherwise return, something has messed up
                    break;
                }
            }
        }
        // now we get in here for additional properties if there is one ajv returns
        // an additional property sometimes
        const additionalProperty = firstError.params.additionalProperty;
        // and we trace to it
        if (additionalProperty) {
            actualTraceback =
                actualTraceback.newTraceToBit(additionalProperty);
        }
        // throw the error
        throw new Error_1.default("Schema check fail, " + firstError.message, actualTraceback);
    }
}
exports.ajvCheck = ajvCheck;
