import { IDBConfigRawJSONDataType } from "../../config";
export declare function dbConfigSetup(version: string, currentConfig: IDBConfigRawJSONDataType, referenceConfig: IDBConfigRawJSONDataType, packageJSON: any): Promise<IDBConfigRawJSONDataType>;
