import { IBuilderBasicConfigType } from "./config";
/**
 * This file exists as a necessity in order to create dynamic json from config
 * fields in the data
 *
 * @packageDocumentation
 */
/**
 * Evaluates javascript using new Function, it's okay this is a building
 * process that developers execute, it is not meant for clients and it only executes
 * once in json fields that exist within the schema that use the $CONFIG: syntax
 * what comes after that is javascript and will replace itself with the return of that
 * @param config the configuration
 * @param rawJSON the raw json of whatever it is to be evaled
 * @returns that same json with evaled fields replaced
 */
export declare function evalRawJSON<T>(config: IBuilderBasicConfigType, rawJSON: T): T;
