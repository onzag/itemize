import { ISingleRedisConfigRawJSONDataType } from "../config";
import redis, { RedisClient } from "redis";
import { logger } from "."
import { promisify } from "util";

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

  constructor(name: string, redisClient: RedisClient) {
    this.name = name;
    this.redisClient = redisClient;

    this.callFn = this.callFn.bind(this);

    this.get = this.callFn(promisify(this.redisClient.get).bind(this.redisClient));
    this.set = this.callFn(promisify(this.redisClient.set).bind(this.redisClient));
    this.flushall = this.callFn(promisify(this.redisClient.flushall).bind(this.redisClient));
    this.expire = this.callFn(promisify(this.redisClient.expire).bind(this.redisClient));
    this.exists = this.callFn(promisify(this.redisClient.exists).bind(this.redisClient));
    this.del = this.callFn(promisify(this.redisClient.del).bind(this.redisClient));
  }

  public setup(onConnect?: (client: ItemizeRedisClient, isReconnect: boolean) => Promise<void>): Promise<ItemizeRedisClient> {
    return new Promise((resolve) => {
      this.redisClient.on(
        "connect",
        async () => {
          const wasAReconnect = this.isReconnecting;
          this.isReconnecting = false;
          
          logger && logger.info("ItemizeRedisClient.setup: Redis client " + this.name + " succesfully connected");

          if (onConnect) {
            await onConnect(this, wasAReconnect);
          }

          resolve(this);
        }
      );
  
      this.redisClient.on(
        "reconnecting",
        () => {
          logger && logger.info("ItemizeRedisClient.setup: Redis client " + this.name + " is attempting reconnect");
          this.isReconnecting = true;
        }
      );
  
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
  
      this.redisClient.on(
        "end",
        () => {
          logger && logger.error("ItemizeRedisClient.setup [SERIOUS]: Redis client " + this.name + " has ended its connection");
        }
      );
    });
  }

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

export async function setupRedisClient(
  name: string,
  config: ISingleRedisConfigRawJSONDataType,
  onConnect?: (client: ItemizeRedisClient, isReconnect: boolean) => Promise<void>,
): Promise<ItemizeRedisClient> {
  logger && logger.info("setupRedisClient: Initializing " + name + " redis client");

  const client = redis.createClient(config);
  const itemizeClient = new ItemizeRedisClient(name, client);
  return itemizeClient.setup(onConnect);
}