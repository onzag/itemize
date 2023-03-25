import type { ITriggerRegistry } from "../resolvers/triggers";
import type { RegistryService } from "./registry";
import type { ItemizeRedisClient } from "../redis";
import type MailProvider from "./base/MailProvider";
import type Root from "../../base/Root";
import type { DatabaseConnection } from "../../database";

import { ItemizeRawDB } from "../raw-db";
import { IAppDataType } from "..";
import { IItemizeLoggingErrorStructure, IItemizeLoggingStructure, logger } from "../logger";
import express from "express";
import { IConfigRawJSONDataType, IDBConfigRawJSONDataType, IRedisConfigRawJSONDataType } from "../../config";
import { ISensitiveConfigRawJSONDataType } from "../../config";
import PhoneProvider from "./base/PhoneProvider";
import { CAN_LOG_DEBUG } from "../environment";

const wait = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export enum ServiceProviderType {
  GLOBAL = "GLOBAL",
  LOCAL = "LOCAL",
  HYBRID = "HYBRID",
  NONE = "NONE",
}

export class ServiceProvider<T> {
  private lastRan: number;

  public config: T;
  public registry: RegistryService;
  public appConfig: IConfigRawJSONDataType;
  public appSensitiveConfig: ISensitiveConfigRawJSONDataType;
  public appDbConfig: IDBConfigRawJSONDataType;
  public appRedisConfig: IRedisConfigRawJSONDataType;

  public globalDatabaseConnection: DatabaseConnection;
  public globalRedisPub: ItemizeRedisClient;
  public globalRedisSub: ItemizeRedisClient;
  public globalRedis: ItemizeRedisClient;
  public globalRawDB: ItemizeRawDB;
  public globalRoot: Root;
  public globalMailProvider: MailProvider<any>;
  public globalPhoneProvider: PhoneProvider<any>;
  public globalCustomServices: {
    [name: string]: ServiceProvider<any>,
  };

  public localAppData: IAppDataType;

  public instanceName: string;
  public globalInstance: boolean = false;
  public localInstance: boolean = false;

  constructor(
    config: T,
    registry: RegistryService,
    configs: {
      config: IConfigRawJSONDataType,
      sensitiveConfig: ISensitiveConfigRawJSONDataType,
      redisConfig: IRedisConfigRawJSONDataType,
      dbConfig: IDBConfigRawJSONDataType,
    }
  ) {
    this.config = config;
    this.registry = registry;
    this.appConfig = configs.config;
    this.appSensitiveConfig = configs.sensitiveConfig;
    this.appDbConfig = configs.dbConfig;
    this.appRedisConfig = configs.redisConfig;
  }

  public setInstanceName(n: string) {
    this.instanceName = n;
  }

  public getInstanceName() {
    return this.instanceName;
  }

  public isInstanceGlobal() {
    return this.globalInstance;
  }

  public isInstanceLocal() {
    return this.localInstance;
  }

  public logInfo<T>(data: IItemizeLoggingStructure<T>) {
    logger && logger.info(data);
  }

  public logDebug<T>(data: IItemizeLoggingStructure<T>) {
    CAN_LOG_DEBUG && logger && logger.debug(data);
  }

  public logError<T>(data: IItemizeLoggingErrorStructure<T>) {
    logger && logger.error(data);
  }

  public static logInfo<T>(data: IItemizeLoggingStructure<T>) {
    logger && logger.info(data);
  }

  public static logDebug<T>(data: IItemizeLoggingStructure<T>) {
    CAN_LOG_DEBUG && logger && logger.info(data);
  }

  public static logError<T>(data: IItemizeLoggingErrorStructure<T>) {
    logger && logger.error(data);
  }

  public expressRouter(options?: express.RouterOptions) {
    return express.Router(options);
  }

  public static expressRouter(options?: express.RouterOptions) {
    return express.Router(options);
  }

  public setupGlobalResources(
    globalDatabaseConnection: DatabaseConnection,
    globalClient: ItemizeRedisClient,
    globalPub: ItemizeRedisClient,
    globalSub: ItemizeRedisClient,
    globalMailProvider: MailProvider<any>,
    globalPhoneProvider: PhoneProvider<any>,
    globalCustomServices: {
      [name: string]: ServiceProvider<any>,
    },
    root: Root,
  ) {
    this.globalInstance = true;
    this.globalDatabaseConnection = globalDatabaseConnection;
    this.globalRedis = globalClient;
    this.globalRedisPub = globalPub;
    this.globalRedisSub = globalSub;
    this.globalRoot = root;
    this.globalRawDB = new ItemizeRawDB(globalClient, globalPub, globalSub, this.globalDatabaseConnection, this.globalRoot);
    this.globalCustomServices = globalCustomServices;
    this.globalMailProvider = globalMailProvider;
    this.globalPhoneProvider = globalPhoneProvider;
  }

  public setupLocalResources(appData: IAppDataType) {
    this.localInstance = true;
    this.localAppData = appData;
  }

  /**
   * Specifies whether the current service is a global service
   * if true global services will only execute initialize and a router
   * will not be extracted from them
   * 
   * it will instead have access to the global resources
   * 
   * @override
   */
  public static getType(): ServiceProviderType {
    return ServiceProviderType.LOCAL;
  }

  /**
   * Performs the execution of the service, basically
   * it will do the run function and then re-run as specified
   */
  public execute() {
    (async () => {
      while (true) {
        this.lastRan = (new Date()).getTime();

        try {
          await this.run();
        } catch (err) {
          logger.error(
            {
              className: "ServiceManager",
              methodName: "run",
              message: "A service crashed during running " + this.constructor.name,
              serious: true,
              err,
              data: {
                config: this.config,
              },
            }
          );
        }

        const cycleTime = this.getRunCycleTime();

        if (!cycleTime) {
          break;
        }

        const nowTime = (new Date()).getTime();
        const timeItPassedSinceRan = nowTime - this.lastRan;
        const timeUntilItNeedsToRun = cycleTime - timeItPassedSinceRan;

        if (timeUntilItNeedsToRun <= 0) {
          logger.error(
            {
              className: "ServiceManager",
              methodName: "run",
              message: "A service took so long to run " + this.constructor.name,
              serious: true,
              data: {
                timeUntilItNeedsToRun,
              },
            }
          );
        } else {
          await wait(timeUntilItNeedsToRun);
        }
      }
    })();
  }

  /**
   * This function is executed during
   * the initialization of the service
   * 
   * If your service is a global service you will
   * have access to the global resources while
   * this function executes
   * @override
   */
  public initialize(): Promise<void> | void {

  }

  /**
   * Determines whether the run function
   * should run over again
   * @override
   */
  public getRunCycleTime(): number {
    return null;
  }

  /**
   * Executes some code
   * @override
   */
  public run(): Promise<void> | void {

  }

  /**
   * Provides a router endpoint, the router endpoint
   * will exist directly under the rest services
   * this enables to create webhooks and other subservices
   * that are attached to this service
   * 
   * If the service provider if executed on a global environment
   * the endpoint does not get created, this means that in the global
   * manager this won't be executed, or anything that is meant
   * for the global manager
   * 
   * The router gets attached to /rest/service
   * 
   * @override
   */
  public getRouter(appData: IAppDataType): express.Router | Promise<express.Router> {
    return null;
  }

  /**
   * Provides a router endpoint, but this method
   * is static, which means it only gets added once
   * 
   * If the service provider if executed on a global environment
   * the endpoint does not get created, this means that in the global
   * manager this won't be executed, or anything that is meant
   * for the global manager
   * 
   * the router gets attached to /rest/service
   * 
   * @override
   */
  public static getRouter(appData: IAppDataType): express.Router | Promise<express.Router> {
    return null;
  }

  /**
   * Allows to setup trigger registries via the service
   * so that they trigger just as normal trigger will do
   * 
   * @override
   */
  public getTriggerRegistry(): ITriggerRegistry | Promise<ITriggerRegistry> {
    return null;
  }

  /**
   * Allows to setup trigger registries via the service
   * so that they trigger just as normal trigger will do
   * 
   * This gets attached if a class is used rather than per instance
   * 
   * @override
   */
  public static getTriggerRegistry(): ITriggerRegistry | Promise<ITriggerRegistry> {
    return null;
  }
}

export interface IServiceProviderClassType<T> {
  new(
    config: T,
    registry: RegistryService,
    configs: {
      config: IConfigRawJSONDataType,
      sensitiveConfig: ISensitiveConfigRawJSONDataType,
      redisConfig: IRedisConfigRawJSONDataType,
      dbConfig: IDBConfigRawJSONDataType,
    }
  ): ServiceProvider<T>;
  getRouter: (appData: IAppDataType) => express.Router | Promise<express.Router>;
  getTriggerRegistry: () => ITriggerRegistry | Promise<ITriggerRegistry>;
  getType: () => ServiceProviderType;
}
