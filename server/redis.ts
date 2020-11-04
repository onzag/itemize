/**
 * Provides the itemize redis client class
 * the itemize redis client differs a little bit from the standard client
 * @packageDocumentation
 */

import { ISingleRedisConfigRawJSONDataType } from "../config";
import redis, { RedisClient } from "redis";
import { logger } from "."
import { promisify } from "util";

/**
 * The itemize redis client is different from the standard client
 * for once it contains some quality get, set, etc... functions that are
 * already async, and secondly it fails more than the standard redis
 * eg. if it loses connection, so it avoids queueing
 */
export class ItemizeRedisClient {
  private isReconnecting: boolean = false;

  public name: string;
  public redisClient: RedisClient;
  public get: (key: string) => Promise<string>;
  public set: (key: string, value: string) => Promise<void>;
  public del: (key: string) => Promise<void>;
  public flushall: () => Promise<void>;
  public expire: (key: string, seconds: number) => Promise<void>;
  public exists: (key: string) => Promise<number>;

  /**
   * Construct a new itemize redis client
   * @param name a name, not very relevant, used for debugging
   * @param redisClient the redis client in question
   */
  constructor(name: string, redisClient: RedisClient) {
    this.name = name;
    this.redisClient = redisClient;

    this.callFn = this.callFn.bind(this);

    this.get = this.callFn(promisify(this.redisClient.get).bind(this.redisClient));
    this.exists = this.callFn(promisify(this.redisClient.exists).bind(this.redisClient));

    this.set = promisify(this.redisClient.set).bind(this.redisClient);
    this.flushall = promisify(this.redisClient.flushall).bind(this.redisClient);
    this.expire = promisify(this.redisClient.expire).bind(this.redisClient);
    this.del = promisify(this.redisClient.del).bind(this.redisClient);
  }

  /**
   * Setup a client, should be called just right after construction
   * @param onConnect a function to call after connecting happened
   * @returns the client itself, once it has been done and the connect function has ran, considering itself ready
   * to take on connections
   */
  public setup(onConnect?: (client: ItemizeRedisClient, isReconnect: boolean) => Promise<void>): Promise<ItemizeRedisClient> {
    // we return a promise
    return new Promise((resolve) => {

      // so on connect we want to call the on connect function
      this.redisClient.on(
        "connect",
        async () => {
          const wasAReconnect = this.isReconnecting;
          this.isReconnecting = false;
          
          logger && logger.info("ItemizeRedisClient.setup: Redis client " + this.name + " succesfully connected");

          // here as we do
          if (onConnect) {
            // and specify whether we were reconnecting
            // because this onconnect function can do calls to redis itself and redis calls
            // will fail if the this.isReconnecting function is true, we need to
            // toggle the variable before, mark it as false, and just send the old value
            await onConnect(this, wasAReconnect);
          }

          resolve(this);
        }
      );
  
      // on reconnecting we just mark the reconnecting as true
      // our client has died and we don't want to approve any requests
      // the redis client will queue but we simply don't want that
      // the website should still work even without redis, and we don't want to
      // wait for redis, the cache should fallback to postgres if it's unable to find redis
      this.redisClient.on(
        "reconnecting",
        () => {
          logger && logger.info("ItemizeRedisClient.setup: Redis client " + this.name + " is attempting reconnect");
          this.isReconnecting = true;
        }
      );
  
      // when we get an error we are going to log it
      // this usually happens during connection issues
      this.redisClient.on(
        "error",
        (err) => {
          logger && logger.error(
            "ItemizeRedisClient.setup [SERIOUS]: Redis client " + this.name + " has encountered an error",
            {
              errMessage: err.message,
              errStack: err.stack,
            }
          );
        }
      );
  
      // our redis client has died for some reason
      this.redisClient.on(
        "end",
        () => {
          logger && logger.error("ItemizeRedisClient.setup [SERIOUS]: Redis client " + this.name + " has ended its connection");
        }
      );
    });
  }

  /**
   * Just wrap the standard promise function so that it won't execute when redis is dead
   * @param fn the function to wrap
   */
  private callFn(fn: (...args: any[]) => Promise<any>): (...args: any[]) => Promise<any> {
    // typescript is funky again got to make everyhting any
    return (...args: any[]) => {
      if (this.isReconnecting) {
        throw new Error("Redis has lost the connection and cannot be relied upon");
      } else {
        return fn(...args);
      }
    };
  }
}

/**
 * Setups a redis client to be an itemize redis client
 * @param name the name we want to give it
 * @param config the configuration for redis client
 * @param onConnect a function to run on connect
 */
export function setupRedisClient(
  name: string,
  config: ISingleRedisConfigRawJSONDataType,
  onConnect?: (client: ItemizeRedisClient, isReconnect: boolean) => Promise<void>,
): Promise<ItemizeRedisClient> {
  logger && logger.info("setupRedisClient: Initializing " + name + " redis client");

  const client = redis.createClient(config);
  const itemizeClient = new ItemizeRedisClient(name, client);
  return itemizeClient.setup(onConnect);
}