import { IRedisConfigRawJSONDataType } from "../../config";
export declare function redisConfigSetup(version: string, currentConfig: IRedisConfigRawJSONDataType, referenceConfig: IRedisConfigRawJSONDataType, packageJSON: any): Promise<IRedisConfigRawJSONDataType>;
