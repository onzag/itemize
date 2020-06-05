import Knex from "knex";
import { RedisClient } from "redis";
import Root from "../base/Root";
import { ISensitiveConfigRawJSONDataType } from "../config";
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
    constructor(root: Root, knex: Knex, globalCache: RedisClient, redisPub: RedisClient, sensitiveConfig: ISensitiveConfigRawJSONDataType);
    private processModule;
    private processIdef;
    run(): Promise<void>;
    private runOnce;
    private runForModule;
    private runForIdef;
    private runFor;
    private calculateServerData;
    private informNewServerData;
    private informUpdatesFor;
}
