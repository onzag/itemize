import { IAppDataType, logger } from "..";
import express from "express";
import { ITriggerRegistry } from "../resolvers/triggers";
import { RegistryService } from "./registry";
import { ItemizeRedisClient } from "../redis";
import Root from "../../base/Root";
import { ItemizeRawDB } from "../raw-db";
import MailProvider from "./base/MailProvider";
import { IConfigRawJSONDataType } from "../../config";
import { ISensitiveConfigRawJSONDataType } from "../../config";
import { DatabaseConnection } from "../../database";

const LOG_LEVEL = process.env.LOG_LEVEL;
const CAN_LOG_DEBUG = LOG_LEVEL === "debug" || LOG_LEVEL === "silly" || (!LOG_LEVEL && process.env.NODE_ENV !== "production");

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

  public globalDatabaseConnection: DatabaseConnection;
  public globalRedisPub: ItemizeRedisClient;
  public globalRedis: ItemizeRedisClient;
  public globalRawDB: ItemizeRawDB;
  public globalRoot: Root;
  public globalMailProvider: MailProvider<any>;
  public globalCustomServices: {
    [name: string]: ServiceProvider<any>,
  };

  public localAppData: IAppDataType;

  public instanceName: string;
  public globalInstance: boolean;
  public localInstance: boolean;

  constructor(
    config: T,
    registry: RegistryService,
    appConfig: IConfigRawJSONDataType,
    appSensitiveConfig: ISensitiveConfigRawJSONDataType,
  ) {
    this.config = config;
    this.registry = registry;
    this.appConfig = appConfig;
    this.appSensitiveConfig = appSensitiveConfig;
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

  public logInfo(str: string, extra?: any) {
    logger && logger.info(str, extra);
  }

  public logDebug(str: string, extra?: any) {
    CAN_LOG_DEBUG && logger && logger.info(str, extra);
  }

  public logError(str: string, extra?: any) {
    logger && logger.error(str, extra);
  }

  public static logInfo(str: string, extra?: any) {
    logger && logger.info(str, extra);
  }

  public static logDebug(str: string, extra?: any) {
    CAN_LOG_DEBUG && logger && logger.info(str, extra);
  }

  public static logError(str: string, extra?: any) {
    logger && logger.error(str, extra);
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
    globalMailProvider: MailProvider<any>,
    globalCustomServices: {
      [name: string]: ServiceProvider<any>,
    },
    root: Root,
  ) {
    this.globalInstance = true;
    this.globalDatabaseConnection = globalDatabaseConnection;
    this.globalRedis = globalClient;
    this.globalRedisPub = globalPub;
    this.globalRoot = root;
    this.globalRawDB = new ItemizeRawDB(globalPub, this.globalDatabaseConnection, this.globalRoot);
    this.globalCustomServices = globalCustomServices;
    this.globalMailProvider = globalMailProvider;
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
            "ServiceManager.run [SERIOUS]: a service crashed during running " + this.constructor.name,
            {
              errStack: err.stack,
              errMessage: err.message,
              config: this.config,
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
            "ServiceManager.run [SERIOUS]: a service took so long to run " + this.constructor.name,
            {
              timeUntilItNeedsToRun,
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
    appConfig: IConfigRawJSONDataType,
    appSensitiveConfig: ISensitiveConfigRawJSONDataType,
  ): ServiceProvider<T>;
  getRouter: (appData: IAppDataType) => express.Router | Promise<express.Router>;
  getTriggerRegistry: () => ITriggerRegistry | Promise<ITriggerRegistry>;
  getType: () => ServiceProviderType;
}
