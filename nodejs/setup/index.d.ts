/**
 * This file is in charge of running all the steps for the setup of an itemize app
 *
 * @packageDocumentation
 */
import { IConfigRawJSONDataType, IDBConfigRawJSONDataType, IDumpConfigRawJSONDataType, IRedisConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../config";
/**
 * Contains all the configuration file information in a single
 * area for utility reasons
 */
export interface ISetupConfigType {
    standardConfig: IConfigRawJSONDataType;
    sensitiveConfigDevelopment: ISensitiveConfigRawJSONDataType;
    dbConfigDevelopment: IDBConfigRawJSONDataType;
    redisConfigDevelopment: IRedisConfigRawJSONDataType;
    sensitiveConfigProduction: ISensitiveConfigRawJSONDataType;
    dbConfigProduction: IDBConfigRawJSONDataType;
    redisConfigProduction: IRedisConfigRawJSONDataType;
    dumpConfig: IDumpConfigRawJSONDataType;
}
/**
 * Runs the setup, check out the main.ts function to see
 * how this is meant to be called
 * @param onlyNames the names that are supposed to be called
 */
export default function setup(...onlyNames: string[]): Promise<void>;
/**
 * Ensures that the configuration directory exists
 */
export declare function ensureConfigDirectory(): Promise<void>;
/**
 * Reads a config file
 * @param fileName the filename we are reading
 * @returns the parsed content, or otherwise null if it doesn't exist
 */
export declare function readConfigFile(fileName: string): Promise<any>;
/**
 * writes a configuration file only if it differs from what is currently written
 * according to the last arg
 *
 * @param fileName the filename we are writting
 * @param data the data we are writting
 * @param original the original data, to check it against for differences
 */
export declare function writeConfigFile(fileName: string, data: any, original: any): Promise<void>;
