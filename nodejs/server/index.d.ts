import express from "express";
import Root from "../base/Root";
import { IGQLQueryFieldsDefinitionType } from "../base/Root/gql";
import Knex from "knex";
import Autocomplete from "../base/Autocomplete";
import { Listener } from "./listener";
import { RedisClient } from "redis";
import { Cache } from "./cache";
import { ICustomTokensType } from "./custom-graphql";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../config";
import { ITriggerRegistry } from "./resolvers/triggers";
import { IPStack } from "./services/ipstack";
import Mailgun from "mailgun-js";
export interface IAppDataType {
    root: Root;
    autocompletes: Autocomplete[];
    indexDevelopment: string;
    indexProduction: string;
    config: IConfigRawJSONDataType;
    sensitiveConfig: ISensitiveConfigRawJSONDataType;
    knex: Knex;
    listener: Listener;
    cache: Cache;
    redis: RedisClient;
    redisPub: RedisClient;
    redisSub: RedisClient;
    buildnumber: string;
    triggers: ITriggerRegistry;
    ipStack: IPStack;
    mailgun: Mailgun.Mailgun;
}
export interface IServerCustomizationDataType {
    customGQLQueries?: (appData: IAppDataType) => IGQLQueryFieldsDefinitionType;
    customTokenGQLQueries?: ICustomTokensType;
    customGQLMutations?: (appData: IAppDataType) => IGQLQueryFieldsDefinitionType;
    customRouterEndpoint?: string;
    customRouter?: (appData: IAppDataType) => express.Router;
    customTriggers?: ITriggerRegistry;
}
/**
 * Initializes the itemize server with its custom configuration
 * @param custom the customization details
 * @param custom.customGQLQueries custom graphql queries
 * @param custom.customTokenGQLQueries custom token graphql queries for generating custom tokens
 * while customGQLQueries can be used for the same purpose, this makes it easier and compliant
 * @param custom.customGQLMutations custom graphql mutations
 * @param custom.customRouterEndpoint an endpoint to add a custom router, otherwise it gets
 * attached to the root
 * @param custom.customRouter a custom router to attach to the rest endpoint
 * @param custom.customTriggers a registry for custom triggers
 */
export declare function initializeServer(custom?: IServerCustomizationDataType): Promise<void>;
