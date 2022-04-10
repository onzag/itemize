/**
 * This file specifies a base for creating a phone provider
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

export interface ILogsRecord {
  data: any;
  createdAt: string;
}

export interface ILogsResult {
  instanceId: string;
  level: "info" | "error";
  records: ILogsRecord[];
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

  public logDebug(str: string, extra?: any): void {
    // prevent infinite loops
    return;
  }

  public logError(str: string, extra?: any): void {
    // prevent infinite loops
    return;
  }

  public logInfo(str: string, extra?: any): void {
    // prevent infinite loops
    return;
  }

  public async logToFallback(err: Error, instanceId: string, level: "info" | "error", data: any) {
    const streamSource: WriteStream = level === "info" ? this.fallbackInfoStream : this.fallbackErrorStream;
    const streamReady = level === "info" ? this.infoStreamReady : this.errorStreamReady;

    data.fallbackErrorStack = err.stack;
    data.fallbackErrorMessage = err.message;

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

  private storeFallbackLog(stream: WriteStream, data: any) {
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
  public async log(instanceId: string, level: "info" | "error", data: any) {

  }

  public async getLogsInstanceIds(): Promise<string[]> {
    return null;
  }

  public async clearLogsOf(instanceId: string): Promise<"OK" | "ERROR" | "NOT_AUTHORIZED"> {
    return "ERROR";
  }

  public async getLogsOf(instanceId: string, level: "info" | "error", fromDate: Date, toDate: Date): Promise<ILogsResult> {
    return null;
  }
}