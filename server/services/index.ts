import { IPropertyDefinitionSupportedLocationType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
import type { ReadStream } from "fs";
import type { RedisClient } from "redis";
import { IAppDataType, logger } from "..";
import uuidv5 from "uuid/v5";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../../config";
import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import PropertyDefinition from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { ISQLTableRowValue } from "../../base/Root/sql";
import { renderTemplate } from "../../util";
import { Cache } from "../cache";
import type { Readable } from "stream";
import { IGQLValue } from "../../gql-querier";
import Root from "../../base/Root";
import { jwtSign } from "../token";
import { IUnsubscribeUserTokenDataType } from "../user/rest";
import express from "express";
import { ITriggerRegistry } from "../resolvers/triggers";
import Knex from "knex";

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

  public globalKnex: Knex;
  public globalRedisPub: RedisClient;
  public globalRedis: RedisClient;

  constructor(config: T) {
    this.config = config;
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

  public expressRouter(options?: express.RouterOptions) {
    return express.Router(options);
  }

  public setupGlobalResources(knex: Knex, globalClient: RedisClient, globalPub: RedisClient) {
    this.globalKnex = knex;
    this.globalRedis = globalClient;
    this.globalRedisPub = globalPub;
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
        const timeItPassedSinceSeoGenRan = nowTime - this.lastRan;
        const timeUntilItNeedsToRun = cycleTime - timeItPassedSinceSeoGenRan;
  
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
  public getTriggerRegistry(): ITriggerRegistry | Promise<ITriggerRegistry> {
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
  public static getTriggerRegistry(): ITriggerRegistry | Promise<ITriggerRegistry> {
    return null;
  }
}

export interface IServiceProviderClassType<T> {
  new(config: T): ServiceProvider<T>;
  getRouter: (appData: IAppDataType) => express.Router | Promise<express.Router>;
  getTriggerRegistry: () => ITriggerRegistry | Promise<ITriggerRegistry>;
  isGlobal: () => boolean;
}

export interface IUnsubscribeURL {
  redirected: string;
  noRedirected: string;
}

export interface ISendEmailData {
  from: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  unsubscribeURLs: {
    [email: string]: IUnsubscribeURL;
  };
}

export interface IMailProviderClassType<T> extends IServiceProviderClassType<T> {
  new(config: T, cache: Cache, root: Root, internalConfig: IConfigRawJSONDataType, sensitiveConfig: ISensitiveConfigRawJSONDataType): MailProvider<T>;
}

export class MailProvider<T> extends ServiceProvider<T> {
  public internalConfig: IConfigRawJSONDataType;
  public cache: Cache;
  public root: Root;
  private userIdef: ItemDefinition;
  public sensitiveConfig: ISensitiveConfigRawJSONDataType;

  constructor(config: T, cache: Cache, root: Root, internalConfig: IConfigRawJSONDataType, sensitiveConfig: ISensitiveConfigRawJSONDataType) {
    super(config);

    this.internalConfig = internalConfig;
    this.root = root;
    this.cache = cache;
    this.sensitiveConfig = sensitiveConfig;
    this.userIdef = this.root.getModuleFor(["users"]).getItemDefinitionFor(["user"]);
  }

  public async sendUnverifiedTemplateEmail(
    arg: {
      fromUsername: string,
      fromEmailHandle: string,
      to: string | string[];
      subject: string;
      itemDefinition: ItemDefinition;
      property: PropertyDefinition;
      id: number;
      version?: string;
      args: any;
      unsubscribeURLs?: {
        [email: string]: IUnsubscribeURL;
      },
    }
  ) {
    let templateValue: ISQLTableRowValue = null;
    let parsedTemplateValue: string = null;
    let textValue: string = null;

    if (arg.id) {
      try {
        templateValue = await this.cache.requestValue(arg.itemDefinition, arg.id, arg.version || null);

        if (!templateValue && arg.version) {
          templateValue = await this.cache.requestValue(arg.itemDefinition, arg.id, null);
        }

        if (templateValue && templateValue.content) {
          parsedTemplateValue = renderTemplate(
            templateValue.content,
            arg.args,
          );
        }
      } catch (err) {
        this.logError(
          "MailProvider.sendUnverifiedTemplateEmail [SERIOUS]: failed to retrieve item definition",
          {
            errMessage: err.message,
            errStack: err.stack,
            itemDefinition: arg.itemDefinition.getQualifiedPathName(),
            id: arg.id,
            version: arg.version,
          },
        );
        throw err;
      }
    }

    if (!parsedTemplateValue) {
      textValue = "You do not have a template fragment setup for " +
        arg.itemDefinition.getQualifiedPathName() + "." + arg.id + "." + (arg.version || "");
      textValue += "\n\n" + JSON.stringify(arg.args, null, 2) + "\n";
    }

    const from = `${arg.fromUsername} <${arg.fromEmailHandle}@${this.sensitiveConfig.mailDomain}>`;

    const args: ISendEmailData = {
      from,
      to: arg.to,
      subject: arg.subject,
      unsubscribeURLs: arg.unsubscribeURLs || {},
    }

    if (textValue) {
      args.text = textValue;
    } else {
      args.html = parsedTemplateValue;
    }

    if (args.to === null || (Array.isArray(args.to) && args.to.length === 0)) {
      logger && logger.warn(
        "MailProvider.sendUnverifiedTemplateEmail: Attempted to send an email without recepient",
        {
          args,
        },
      );
      return;
    }

    try {
      await this.sendEmail(args);
    } catch (err) {
      this.logError(
        "MailProvider.sendUnverifiedTemplateEmail [SERIOUS]: API failed to deliver an email",
        {
          errMessage: err.message,
          errStack: err.stack,
          args,
        },
      );
      throw err;
    }
  }

  public async sendTemplateEmail(
    arg: {
      fromUsername: string,
      fromEmailHandle: string,
      to: number | IGQLValue | ISQLTableRowValue | Array<number | IGQLValue | ISQLTableRowValue>;
      subject: string;
      itemDefinition: ItemDefinition;
      property: PropertyDefinition;
      id: number;
      version?: string;
      args: any;
      canUnsubscribe: boolean;
      ignoreUnsubscribe: boolean;
      subscribeProperty: string;
      emailProperty?: string;
    }
  ) {
    const emailPropertyUsed = arg.emailProperty || "email";
    if (!this.userIdef.hasPropertyDefinitionFor(emailPropertyUsed, true)) {
      this.logError(
        "MailProvider.sendTemplateEmail [SERIOUS]: there is no " + emailPropertyUsed + " property in the item definition for user",
        {
          subject: arg.subject,
          itemDefinition: arg.itemDefinition.getQualifiedPathName(),
          id: arg.id,
          version: arg.version,
        },
      );
      throw new Error("There is no " + emailPropertyUsed + " property in the item definition for user");
    }

    let actualUsersToSend: any[] = Array.isArray(arg.to) ? arg.to : [arg.to];
    let actualUsersEmailsToSend: string[] = null;
    let unsubscribeURLs: {
      [email: string]: IUnsubscribeURL;
    } = {};
    actualUsersEmailsToSend = await Promise.all(actualUsersToSend.map(async (u) => {
      let userData: ISQLTableRowValue | IGQLValue = u;
      if (typeof userData === "number") {
        userData = await this.cache.requestValue(
          this.userIdef,
          userData as number,
          null,
        );
      }

      if (!userData) {
        return null;
      }

      const email = userData.DATA ? userData.DATA[emailPropertyUsed] : userData[emailPropertyUsed];
      // we are subscribed to this if we have an email
      // otherwise we cannot even send such email
      let isSubscribed = !!email;
      if (email && !arg.ignoreUnsubscribe && arg.subscribeProperty) {
        if (userData.DATA) {
          isSubscribed = !!userData.DATA[arg.subscribeProperty];
        } else {
          isSubscribed = !!userData[arg.subscribeProperty];
        }
      }

      if (!isSubscribed) {
        return null;
      }

      if (email && arg.canUnsubscribe && arg.subscribeProperty && isSubscribed) {
        const tokenData: IUnsubscribeUserTokenDataType = {
          unsubscribeUserId: userData.id,
          unsubscribeProperty: arg.subscribeProperty,
        }
        const hostname = process.env.NODE_ENV === "development" ?
          this.internalConfig.developmentHostname :
          this.internalConfig.productionHostname;
        const token = await jwtSign(tokenData, this.sensitiveConfig.secondaryJwtKey);
        const url = "https://" + hostname + "/rest/user/unsubscribe?userid=" + userData.id + "&token=" + encodeURIComponent(token);
        unsubscribeURLs[email] = {
          redirected: url,
          noRedirected: url + "&noredirect"
        };
      }

      return email;
    }));
    actualUsersToSend = actualUsersToSend.filter((u) => {
      return (u !== null);
    });

    if (!actualUsersToSend.length) {
      return;
    }

    await this.sendUnverifiedTemplateEmail({
      fromUsername: arg.fromUsername,
      fromEmailHandle: arg.fromEmailHandle,
      to: actualUsersToSend,
      subject: arg.subject,
      itemDefinition: arg.itemDefinition,
      property: arg.property,
      id: arg.id,
      version: arg.version,
      args: arg.args,
      unsubscribeURLs,
    });
  }

  /**
   * This function is executed when the service
   * needs to send an email
   * @override
   */
  public async sendEmail(data: ISendEmailData): Promise<void> {
    this.logError(
      "MailProvider.sendEmail [SERIOUS]: Attempted to send an email with a raw provider, there's no API available to complete this action",
      data,
    );
  }
}

export interface IStorageProvidersObject {
  [id: string]: StorageProvider<any>,
}

export interface IStorageProviderClassType<T> extends IServiceProviderClassType<T> {
  new(config: T, id: string, prefix: string): StorageProvider<T>
}

export class StorageProvider<T> extends ServiceProvider<T> {
  public prefix: string;
  public id: string;

  constructor(config: T, id: string, prefix: string) {
    super(config);

    this.prefix = prefix;
    this.id = id;
  }

  public getPrefix() {
    return this.prefix;
  }

  public getId() {
    return this.id;
  }

  /**
   * This function is executed when the service
   * uploading a read stream
   * @param at the remote file to use
   * @param readStream the stream to read from
   * @param mustBeVerified a boolean that specifies whether the resouce must
   * be verified and return a 200 when requested
   * @override
   */
  public async upload(at: string, readStream: ReadStream | Readable, mustBeVerified: boolean): Promise<void> {

  }

  /**
   * This function is executed once a folder
   * removal is requested
   * @param at the remote folder to remove
   * @override
   */
  public async removeFolder(at: string): Promise<void> {

  }

  /**
   * This function is executed once an entire folder
   * is requested to be downloaded locally in the given
   * local path
   * @param remotePath the remote path
   * @param localPath the local path
   * @override
   */
  public async dumpFolder(remotePath: string, localPath: string): Promise<void> {

  }

  /**
   * It's executed to verify whether a given remote resource
   * exists
   * @param at the resource to check for
   * @override
   */
  public async exists(at: string): Promise<boolean> {
    return false;
  }

  /**
   * It's executed to read files
   * @param at the file to read
   * @override
   */
  public async read(at: string): Promise<string> {
    return "";
  }
}

// this id can be whatever just to ensure lat and long produce the same id no matter what
// basically a combination for location, this way we are not tied to any API
const NAMESPACE = "d27dba52-42ef-4649-81d2-568f9ba341ff";

export interface ILocationSearchProviderClassType<T> extends IServiceProviderClassType<T> {
  new(config: T): LocationSearchProvider<T>
}

export class LocationSearchProvider<T> extends ServiceProvider<T> {
  constructor(config: T) {
    super(config);
  }

  public makeIdOutOf(lat: number, lng: number) {
    return "L" + uuidv5(lat.toString() + lng.toString(), NAMESPACE).replace(/-/g, "");
  }

  /**
   * This function is executed once the user requests a geocode
   * for a given location
   * @param lat the latitude the geocode is requested for
   * @param lng the longitude the geocode is requested for
   * @param query a query text (what is written in the search box while this is clicked)
   * @param lang the language of the user
   * @param sep the word separarator, usually a comma is here
   * @returns a promise for a location
   * @override
   */
  public async requestGeocodeFor(
    lat: string | number,
    lng: string | number,
    query: string,
    lang: string,
    sep: string,
  ): Promise<IPropertyDefinitionSupportedLocationType> {
    return null;
  }

  /**
   * This function is executed once the user requests a search
   * for a given location
   * @param lat the latitude where results should be nearby for
   * @param lng the longitude where results should be nearby for
   * @param query a query of what we are searching for
   * @param lang the language of the user
   * @param sep the word separarator, usually a comma is here
   * @returns a promise for a location array
   * @override
   */
  public async requestSearchFor(
    lat: string | number,
    lng: string | number,
    query: string,
    lang: string,
    sep: string,
  ): Promise<IPropertyDefinitionSupportedLocationType[]> {
    return null;
  }

  /**
   * Similar to search, but should return fewer results, and maybe
   * less accurate, these are used for autocompletition
   * @param lat the latitude where results should be nearby for
   * @param lng the longitude where results should be nearby for
   * @param query a query of what we are searching for
   * @param lang the language of the user
   * @param sep the word separarator, usually a comma is here
   * @returns a promise for a location array
   * @override
   */
  public async requestAutocompleteFor(
    lat: string | number,
    lng: string | number,
    query: string,
    lang: string,
    sep: string,
  ): Promise<IPropertyDefinitionSupportedLocationType[]> {
    return null;
  }
}

export interface ICurrencyFactors {
  [key: string]: number,
}

export interface ICurrencyFactorsProviderClassType<T> extends IServiceProviderClassType<T> {
  new(config: T, globalCache: RedisClient): CurrencyFactorsProvider<T>
}

export class CurrencyFactorsProvider<T> extends ServiceProvider<T> {
  public globalCache: RedisClient;

  constructor(config: T, globalCache: RedisClient) {
    super(config);
    this.globalCache = globalCache;
  }

  /**
   * Should provide the currency factors
   * @override
   */
  public async getFactors(): Promise<ICurrencyFactors> {
    return null;
  }
}

export interface IUserLocalizationType {
  country: string;
  currency: string;
  language: string;
}

export interface IUserLocalizationProviderClassType<T> extends IServiceProviderClassType<T> {
  new(config: T): UserLocalizationProvider<T>
}

export class UserLocalizationProvider<T> extends ServiceProvider<T> {
  constructor(config: T) {
    super(config);
  }

  /**
   * Should provide the localization for the user
   * @param ip the ip address
   * @override
   */
  public async getLocalizationFor(ip: string, fallback: IUserLocalizationType): Promise<IUserLocalizationType> {
    return null;
  }
}
