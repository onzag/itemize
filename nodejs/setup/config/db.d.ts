/**
 * Configuration bit for the database
 *
 * @packageDocumentation
 */
import { IDBConfigRawJSONDataType } from "../../config";
/**
 * Will ask for information about the database sensitive file
 * in order to build the db configuration json file
 *
 * @param version the version, development or production
 * @param currentConfig the current file content
 * @param referenceConfig the reference content to use instead as base
 * @param packageJSON the package json parsed file
 */
export declare function dbConfigSetup(version: string, currentConfig: IDBConfigRawJSONDataType, referenceConfig: IDBConfigRawJSONDataType, packageJSON: any): Promise<IDBConfigRawJSONDataType>;
