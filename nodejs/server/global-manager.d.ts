import Knex from "knex";
import { RedisClient } from "redis";
import Root from "../base/Root";
import { ISensitiveConfigRawJSONDataType, IConfigRawJSONDataType } from "../config";
export declare class GlobalManager {
    private root;
    private knex;
    private globalCache;
    private redisPub;
    private idefNeedsMantenience;
    private modNeedsMantenience;
    private serverData;
    private serverDataLastUpdated;
    private currencyLayer;
    private sensitiveConfig;
    private config;
    constructor(root: Root, knex: Knex, globalCache: RedisClient, redisPub: RedisClient, config: IConfigRawJSONDataType, sensitiveConfig: ISensitiveConfigRawJSONDataType);
    private addAdminUserIfMissing;
    private processModule;
    private processIdef;
    run(): Promise<void>;
    private runOnce;
    private runForModule;
    private runForIdef;
    private runFor;
    private calculateServerData;
    private informNewServerData;
}
