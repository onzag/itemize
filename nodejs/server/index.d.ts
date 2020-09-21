/// <reference types="react" />
import express from "express";
import Root, { ILangLocalesType } from "../base/Root";
import { IGQLQueryFieldsDefinitionType } from "../base/Root/gql";
import Knex from "knex";
import { Listener } from "./listener";
import { RedisClient } from "redis";
import { Cache } from "./cache";
import { ICustomTokensType } from "./custom-graphql";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../config";
import { ITriggerRegistry } from "./resolvers/triggers";
import { IPStack } from "./services/ipstack";
import Mailgun from "mailgun-js";
import pkgcloud from "pkgcloud";
import { Here } from "./services/here";
import winston from "winston";
import "winston-daily-rotate-file";
import { ISSRRuleSet } from "./ssr";
import { IRendererContext } from "../client/providers/renderer";
import { ILocaleContextType } from "../client/internal/providers/locale-provider";
import { ICollectorType } from "../client";
import { Pool } from "tarn";
import { ISEORuleSet } from "./seo";
export declare const logger: winston.Logger;
export declare const app: import("express-serve-static-core").Express;
/**
 * Contains all the pkgcloud clients connection for every container id
 */
export declare type PkgCloudClients = {
    [containerId: string]: pkgcloud.storage.Client;
};
/**
 * Contains all the pkgcloud containers for every container id
 */
export declare type PkgCloudContainers = {
    [containerId: string]: {
        prefix: string;
        container: pkgcloud.storage.Container;
    };
};
/**
 * Specifies the SSR configuration for the multiple pages
 */
export interface ISSRConfig {
    ssrRules: ISSRRuleSet;
    rendererContext: IRendererContext;
    mainComponent: React.ReactElement;
    appWrapper?: (app: React.ReactElement, config: IConfigRawJSONDataType) => React.ReactElement;
    mainWrapper?: (mainComponet: React.ReactElement, config: IConfigRawJSONDataType, localeContext: ILocaleContextType) => React.ReactElement;
    collector?: ICollectorType;
}
export interface ISEOConfig {
    seoRules: ISEORuleSet;
}
export interface IAppDataType {
    root: Root;
    rootPool: Pool<Root>;
    langLocales: ILangLocalesType;
    ssrConfig: ISSRConfig;
    seoConfig: ISEOConfig;
    indexDevelopment: string;
    indexProduction: string;
    config: IConfigRawJSONDataType;
    sensitiveConfig: ISensitiveConfigRawJSONDataType;
    knex: Knex;
    listener: Listener;
    cache: Cache;
    redis: RedisClient;
    redisGlobal: RedisClient;
    redisPub: RedisClient;
    redisSub: RedisClient;
    redisLocalPub: RedisClient;
    redisLocalSub: RedisClient;
    buildnumber: string;
    triggers: ITriggerRegistry;
    ipStack: IPStack;
    here: Here;
    mailgun: Mailgun.Mailgun;
    pkgcloudStorageClients: PkgCloudClients;
    pkgcloudUploadContainers: PkgCloudContainers;
    customUserTokenQuery: any;
    logger: winston.Logger;
}
export interface IServerDataType {
    CURRENCY_FACTORS: {
        [usdto: string]: number;
    };
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
 * Provides the pkgloud client container from ovh
 * @param client the client to use
 * @param containerName the container name
 */
export declare function getContainerPromisified(client: pkgcloud.storage.Client, containerName: string): Promise<pkgcloud.storage.Container>;
export declare function getPkgCloudContainers(config: IConfigRawJSONDataType, sensitiveConfig: ISensitiveConfigRawJSONDataType): Promise<{
    pkgcloudStorageClients: PkgCloudClients;
    pkgcloudUploadContainers: PkgCloudContainers;
}>;
/**
 * Initializes the itemize server with its custom configuration
 * @param ssrConfig the server side rendering rules
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
export declare function initializeServer(ssrConfig: ISSRConfig, seoConfig: ISEOConfig, custom?: IServerCustomizationDataType): Promise<void>;
