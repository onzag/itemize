import { IAppDataType, logger } from "..";
import express from "express";
import { ITriggerRegistry } from "../resolvers/triggers";
import Knex from "knex";
import { RegistryService } from "./registry";
import { ItemizeRedisClient } from "../redis";
import Root from "../../base/Root";
import { ItemizeRawDB } from "../raw-db";

const LOG_LEVEL = process.env.LOG_LEVEL;
const CAN_LOG_DEBUG = LOG_LEVEL === "debug" || LOG_LEVEL === "silly" || (!LOG_LEVEL && process.env.NODE_ENV !== "production");

const wait = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export class ServiceProvider<T> {
  private lastRan: number;

  public config: T;
  public registry: RegistryService;

  public globalKnex: Knex;
  public globalRedisPub: ItemizeRedisClient;
  public globalRedis: ItemizeRedisClient;
  public globalRawDB: ItemizeRawDB;
  public globalRoot: Root;

  public instanceName: string;

  constructor(config: T, registry: RegistryService) {
    this.config = config;
    this.registry = registry;
  }

  public setInstanceName(n: string) {
    this.instanceName = n;
  }

  public getInstanceName() {
    return this.instanceName;
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

  public setupGlobalResources(knex: Knex, globalClient: ItemizeRedisClient, globalPub: ItemizeRedisClient, root: Root) {
    this.globalKnex = knex;
    this.globalRedis = globalClient;
    this.globalRedisPub = globalPub;
    this.globalRoot = root;
    this.globalRawDB = new ItemizeRawDB(globalPub, this.globalKnex, this.globalRoot);
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
  public static isGlobal() {
    return false;
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
  new(config: T, registry: RegistryService): ServiceProvider<T>;
  getRouter: (appData: IAppDataType) => express.Router | Promise<express.Router>;
  getTriggerRegistry: () => ITriggerRegistry | Promise<ITriggerRegistry>;
  isGlobal: () => boolean;
}
