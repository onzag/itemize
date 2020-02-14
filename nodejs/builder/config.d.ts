/**
 * Doesn't do much other than save and store the config file for
 * dist purposes
 *
 * @packageDocumentation
 */
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType, IRedisConfigRawJSONDataType, IDBConfigRawJSONDataType } from "../config";
import Traceback from "./Traceback";
import Ajv from "ajv";
export interface IBuilderBasicConfigType {
    standard: IConfigRawJSONDataType;
    sensitive: ISensitiveConfigRawJSONDataType;
    redis: IRedisConfigRawJSONDataType;
    db: IDBConfigRawJSONDataType;
    buildnumber: number;
}
/**
 * Stores the config file in the dist
 * directory
 * @param rawConfig the config as parsed
 */
export declare function buildConfig(rawConfig: IBuilderBasicConfigType): Promise<void>;
export declare function extractOneConfig<T>(validator: Ajv.ValidateFunction, mainName: string, version: string, isSensitive: boolean, cb?: (data: T, tb: Traceback) => void): Promise<T>;
/**
 * Extracts the configuration from the files where it should be located
 * and does data checks on the json files
 */
export declare function extractConfigAndBuildNumber(): Promise<IBuilderBasicConfigType>;
