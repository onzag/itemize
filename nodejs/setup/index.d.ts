/**
 * This file is in charge of running all the steps for the setup of an itemize app
 *
 * @packageDocumentation
 */
import { IConfigRawJSONDataType, IDBConfigRawJSONDataType, IRedisConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../config";
export interface ISetupConfigType {
    standardConfig: IConfigRawJSONDataType;
    sensitiveConfigDevelopment: ISensitiveConfigRawJSONDataType;
    dbConfigDevelopment: IDBConfigRawJSONDataType;
    redisConfigDevelopment: IRedisConfigRawJSONDataType;
    sensitiveConfigStaging: ISensitiveConfigRawJSONDataType;
    dbConfigStaging: IDBConfigRawJSONDataType;
    redisConfigStaging: IRedisConfigRawJSONDataType;
    sensitiveConfigProduction: ISensitiveConfigRawJSONDataType;
    dbConfigProduction: IDBConfigRawJSONDataType;
    redisConfigProduction: IRedisConfigRawJSONDataType;
}
export default function setup(...onlyNames: string[]): Promise<void>;
export declare function ensureConfigDirectory(): Promise<void>;
export declare function readConfigFile(fileName: string): Promise<any>;
export declare function writeConfigFile(fileName: string, data: any, original: any): Promise<void>;
