/**
 * This file specifies how schema checks are ran against json sources
 * in order to validate schemas using ajv
 *
 * @packageDocumentation
 */
import Ajv from "ajv";
import Traceback from "./Traceback";
import "source-map-support/register";
/**
 * Checks a root schema
 */
export declare const checkRootSchemaValidate: Ajv.ValidateFunction;
/**
 * Checks an item definition schema
 */
export declare const checkItemDefinitionSchemaValidate: Ajv.ValidateFunction;
/**
 * Checks a property definition array schema
 */
export declare const checkPropertyDefinitionArraySchemaValidate: Ajv.ValidateFunction;
export declare const checkSpecialPropertyValueSetSchemaValidate: Ajv.ValidateFunction;
/**
 * Checks a module
 */
export declare const checkModuleSchemaValidate: Ajv.ValidateFunction;
/**
 * Check the partial sensitive configuration
 */
export declare const checkSensitiveConfig: Ajv.ValidateFunction;
/**
 * Check the partial config (non-sensitive)
 */
export declare const checkConfig: Ajv.ValidateFunction;
/**
 * Check raw database config
 */
export declare const checkDBConfig: Ajv.ValidateFunction;
/**
 * Check raw dump config
 */
export declare const checkDumpConfig: Ajv.ValidateFunction;
/**
 * Check redis config
 */
export declare const checkRedisConfig: Ajv.ValidateFunction;
/**
 * Runs a given ajv check function of the ones avaliable
 * in this list against a schema and ensures to populate traceback
 * values
 * @param fn the function to run
 * @param rawData the raw data to validate against
 * @param traceback the traceback to throw errors to
 */
export declare function ajvCheck(fn: Ajv.ValidateFunction, rawData: any, traceback: Traceback): void;
