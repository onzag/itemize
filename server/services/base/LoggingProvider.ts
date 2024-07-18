/**
 * This file specifies a base for creating a logging provider
 * and phone providers as, they contain functions that are
 * necessary and shouldn't be touched and others that should
 * be overriden into what is a standard service
 * 
 * @module
 */

import { WriteStream } from "fs";
import { ServiceProvider, ServiceProviderType } from "..";
import fs from "fs";
import { INSTANCE_LOG_FILE, INSTANCE_LOG_ERROR_FILE, NODE_ENV } from "../../../server/environment";
import { IConfigRawJSONDataType, IDBConfigRawJSONDataType, IRedisConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../../../config";
import { RegistryService } from "../registry";
import { IItemizeFinalLoggingObject, IItemizePingObjectGenerator } from "../../logger";

export interface ILogsRecord<S> {
  data: S;
  createdAt: string;
  level: "info" | "error";
}

export interface ILogsResult {
  instanceId: string;
  level: "info" | "error" | "any";
  records: ILogsRecord<IItemizeFinalLoggingObject>[];
}

export interface IPingsResult<S> {
  instanceId: string;
  pings: ILogsRecord<S>[];
}

/**
 * The PhoneProvider class is a service that provides SMS
 * functionality to the itemize server side app
 * 
 * The LoggingProvider class is a special class, and does not support
 * global mode, even if specified
 */
export default class LoggingProvider<T> extends ServiceProvider<T> {
  private fallbackInfoStream: WriteStream = fs.createWriteStream(INSTANCE_LOG_FILE);
  private fallbackErrorStream: WriteStream = fs.createWriteStream(INSTANCE_LOG_ERROR_FILE);

  private logsInfoQueued: any[] = [];
  private logsErrorQueued: any[] = [];

  private infoStreamReady: boolean = false;
  private errorStreamReady: boolean = false;

  private logDataDestroyedListeners: Array<(instanceId: string) => Promise<void>> = [];

  public static getType() {
    return ServiceProviderType.NONE;
  }

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
    super(config, registry, configs);

    this.fallbackInfoStream.once("open", this.onStreamReady.bind(this, "info"));
    this.fallbackErrorStream.once("open", this.onStreamReady.bind(this, "error"));
  }

  public logDebug(): void {
    // prevent infinite loops
    return;
  }

  public logError(): void {
    // prevent infinite loops
    return;
  }

  public logInfo(): void {
    // prevent infinite loops
    return;
  }

  public static logDebug(): void {
    // prevent infinite loops
    return;
  }

  public static logError(): void {
    // prevent infinite loops
    return;
  }

  public static logInfo(): void {
    // prevent infinite loops
    return;
  }

  public async logToFallback(err: Error, instanceId: string, level: "info" | "error", data: IItemizeFinalLoggingObject) {
    const streamSource: WriteStream = level === "info" ? this.fallbackInfoStream : this.fallbackErrorStream;
    const streamReady = level === "info" ? this.infoStreamReady : this.errorStreamReady;

    (data as any).fallbackErrorStack = err.stack;
    (data as any).fallbackErrorMessage = err.message;

    if (NODE_ENV === "development") {
      console.error(
        "Storing log to fallback due to",
        {
          errMessage: err.message,
          errStack: err.stack,
        }
      );
    }

    if (!streamReady) {
      (level === "info" ? this.logsInfoQueued : this.logsErrorQueued).push(data);
    } else {
      this.storeFallbackLog(streamSource, data);
    }
  }

  private onStreamReady(level: "info" | "error") {
    const streamSource: WriteStream = level === "info" ? this.fallbackInfoStream : this.fallbackErrorStream;
    const streamQueue = level === "info" ? this.logsInfoQueued : this.logsErrorQueued;

    streamQueue.forEach((v) => this.storeFallbackLog(streamSource, v));

    if (level === "info") {
      this.infoStreamReady = true;
      delete this.logsInfoQueued;
    } else {
      this.errorStreamReady = true;
      delete this.logsErrorQueued;
    }
  }

  private storeFallbackLog(stream: WriteStream, data: IItemizeFinalLoggingObject) {
    stream.write(JSON.stringify(data) + "\n");
  }

  /**
   * The function that is executed to log the messages
   * 
   * This function is allowed to return an error in case it failed to log
   * as when done so the fallback file will be used until the connection
   * is restored
   * 
   * @param instanceId 
   * @param level 
   * @param data 
   * @override
   */
  public async log(instanceId: string, level: "info" | "error", data: IItemizeFinalLoggingObject) {

  }

  /**
   * @override used to create logged pings to get instance specific information
   * for example statistics of memory usage
   * 
   * when you create a ping you may want to add an event listener to onInstanceLogDataDestroyed to also
   * destroy ping information you may have manually created
   * 
   * @param data 
   */
  public createPing<D, S>(instanceId: string, data: IItemizePingObjectGenerator<D, S>) {
    return null;
  }

  /**
   * @override to provide the ping data for a given ping with an id
   * @param instanceId 
   * @param pingId 
   */
  public async getPingDataOf<D>(instanceId: string, pingId: string): Promise<{data: D, timestamp: string}> {
    return null;
  }

  /**
   * @override to provide the ping data for a given ping with an id
   * @param instanceId 
   * @param pingId 
   * @param fromDate
   * @param toDate
   */
  public async getPingsOf<S>(instanceId: string, pingId: string, fromDate: Date, toDate: Date): Promise<IPingsResult<S>> {
    return null;
  }

  /**
   * @override to provide the functionality
   * @param instanceId 
   * @param pingId 
   * @returns 
   */
  public async isPingAlive(instanceId: string, pingId: string): Promise<{alive: boolean, lastHeard: string}> {
    return null;
  }

  /**
   * @override return the instance ids that called the given ping with that id
   * @returns 
   */
  public async getPingInstanceIds(pingId: string): Promise<string[]> {
    return null;
  }

  /**
   * @override return the instance ids that called the given ping with their id and data
   * @returns 
   */
  public async getPingsWithData<D>(pingId: string): Promise<Array<{instanceId: string, data: D, timestamp: string}>> {
    return null;
  }

  /**
   * @override
   * 
   * remember to call triggerLogDataDestroyedListeners at the end
   * 
   * @param instanceId 
   * @returns 
   */
  public async clearLogsOf(instanceId: string): Promise<void> {
    return null;
  }

  public async clearPingsOf(instanceId: string, pingId: string): Promise<void> {
    return null;
  }

  public async getLogsOf(instanceId: string, level: "info" | "error" | "any", fromDate: Date, toDate: Date): Promise<ILogsResult> {
    return null;
  }

  /**
   * Streams the logs of a given writable response
   * 
   * it should write and append lines of valid json to this response with the given logs
   * 
   * @param instanceId 
   * @param write 
   */
  public async streamLogsOf(instanceId: string, write: (chunk: string) => void): Promise<void> {
    return null;
  }

  /**
   * Streams the logs of a given writable response
   * 
   * it should write and append lines of valid json to this response with the given logs
   * 
   * @param instanceId 
   * @param write 
   */
  public async streamPingsOf(instanceId: string, pingId: string, write: (chunk: string) => void): Promise<void> {
    return null;
  }

  public async addLogDataDestroyedListener(listener: (instanceId: string) => Promise<void>) {
    this.logDataDestroyedListeners.push(listener);
  }

  public async removeLogDataDestroyedListener(listener: (instanceId: string) => Promise<void>) {
    const index = this.logDataDestroyedListeners.indexOf(listener);
    if (index !== -1) {
      this.logDataDestroyedListeners.splice(index, 1);
    }
  }

  public async triggerLogDataDestroyedListeners(instanceId: string): Promise<void> {
    await Promise.all(this.logDataDestroyedListeners.map((v) => v(instanceId)));
  }
}