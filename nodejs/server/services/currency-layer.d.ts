import { RedisClient } from "redis";
interface CurrencyLayerItemizeSpecificResponse {
    [key: string]: number;
}
export declare class CurrencyLayer {
    private apiKey;
    private httpsEnabled;
    private globalCache;
    constructor(apiKey: string, globalCache: RedisClient, httpsEnabled: boolean);
    private requestInfo;
    requestCurrencyFactors(): Promise<CurrencyLayerItemizeSpecificResponse>;
}
export declare function setupCurrencyLayer(apiKey: string, globalCache: RedisClient, httpsEnabled: boolean): CurrencyLayer;
export {};
