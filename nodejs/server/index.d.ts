import express from "express";
import Root from "../base/Root";
import { IGQLQueryFieldsDefinitionType, IGQLFieldsDefinitionType } from "../base/Root/gql";
import Knex from "knex";
import Autocomplete from "../base/Autocomplete";
import { Listener } from "./listener";
import { RedisClient } from "redis";
import { Cache } from "./cache";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../config";
export interface IAppDataType {
    root: Root;
    autocompletes: Autocomplete[];
    index: string;
    config: IConfigRawJSONDataType;
    sensitiveConfig: ISensitiveConfigRawJSONDataType;
    knex: Knex;
    listener: Listener;
    cache: Cache;
    redis: RedisClient;
    redisPub: RedisClient;
    redisSub: RedisClient;
    buildnumber: string;
}
export interface IReferredTokenStructure {
    onBehalfOf?: number;
    withRole: string;
    expiresIn?: string;
    error?: string;
}
export interface ICustomTokenGQLQueryDefinition {
    resolve: (appData: IAppDataType, args: {
        source: any;
        args: any;
        context: any;
        info: any;
    }) => IReferredTokenStructure | Promise<IReferredTokenStructure>;
    args?: IGQLFieldsDefinitionType;
}
export interface ICustomTokensType {
    [name: string]: ICustomTokenGQLQueryDefinition;
}
export interface IServerCustomizationDataType {
    customGQLQueries?: (appData: IAppDataType) => IGQLQueryFieldsDefinitionType;
    customTokenGQLQueries?: ICustomTokensType;
    customGQLMutations?: (appData: IAppDataType) => IGQLQueryFieldsDefinitionType;
    customRouterEndpoint?: string;
    customRouter?: (appData: IAppDataType) => express.Router;
}
export declare function initializeServer(custom?: IServerCustomizationDataType): Promise<void>;
