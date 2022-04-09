/**
 * Provides the itemize redis client class
 * the itemize redis client differs a little bit from the standard client
 * @module
 */

import { ISingleRedisConfigRawJSONDataType } from "../config";
import redis, { RedisClient } from "redis";
import { logger } from "./logger";
import { promisify } from "util";

export interface IRedisPing<T> {
  tkey: string;
  dataKey: string;
  data: T;
}

interface IRedisPingSetter<T, N> extends IRedisPing<T> {
  statusRetriever: () => N;
}

export interface IPingEvent {
  event: "CONNECT" | "DISCONNECT" | "RECONNECT";
  time: number;
}

export interface IPingInfo<T, N> extends IRedisPing<T> {
  lastStatus: N;
  lastPing: number;
  events: IPingEvent[];

  assumeDead: boolean;
  isDead: boolean;
  isCorrupted: boolean;
  isPinging: boolean;
}

const PING_TIME = 5000;

/**
 * The itemize redis client is different from the standard client
 * for once it contains some quality get, set, etc... functions that are
 * already async, and secondly it fails more than the standard redis
 * eg. if it loses connection, so it avoids queueing
 */
export class ItemizeRedisClient {
  private isReconnecting: boolean = false;
  private isConnected: boolean = false;

  private pings: IRedisPingSetter<any, any>[] = [];
  private pingTimeout: any = null;

  public name: string;
  public redisClient: RedisClient;
  public get: (key: string) => Promise<string>;
  public hget: (tkey: string, key: string) => Promise<string>;
  public hgetall: (tkey: string) => Promise<{[k: string]: string}>;
  public set: (key: string, value: string) => Promise<void>;
  public hset: (tkey: string, key: string, value: string) => Promise<void>;
  public del: (key: string) => Promise<void>;
  public hdel: (tkey: string, key: string) => Promise<void>;
  public flushall: () => Promise<void>;
  public expire: (key: string, seconds: number) => Promise<void>;
  public exists: (key: string) => Promise<number>;
  public hexists: (tkey: string, key: string) => Promise<number>;

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
    this.hget = this.callFn(promisify(this.redisClient.hget).bind(this.redisClient));
    this.hgetall = this.callFn(promisify(this.redisClient.hgetall).bind(this.redisClient));
    this.exists = this.callFn(promisify(this.redisClient.exists).bind(this.redisClient));
    this.hexists = this.callFn(promisify(this.redisClient.hexists).bind(this.redisClient));

    this.set = promisify(this.redisClient.set).bind(this.redisClient);
    this.hset = promisify(this.redisClient.hset).bind(this.redisClient);
    this.flushall = promisify(this.redisClient.flushall).bind(this.redisClient);
    this.expire = promisify(this.redisClient.expire).bind(this.redisClient);
    this.del = promisify(this.redisClient.del).bind(this.redisClient);
    this.hdel = promisify(this.redisClient.hdel).bind(this.redisClient);

    this.setupPing = this.setupPing.bind(this);
    this.createPing = this.createPing.bind(this);
    this.stopPinging = this.stopPinging.bind(this);
    this.setupPings = this.setupPings.bind(this);
    this.ping = this.ping.bind(this);
  }

  public async deletePingFor(tkey: string, key: string): Promise<"NOT_FOUND" | "NOT_DEAD" | "OK"> {
    const allPings = (await this.hgetall(tkey)) || {};
    if (!allPings[key]) {
      return "NOT_FOUND";
    }

    const lastPingTime = parseInt(allPings[key + "_LASTPING"]) || 0;
    const diff = (new Date()).getTime() - lastPingTime;
    const isAssumedDead = diff >= (PING_TIME * 2);

    if (!isAssumedDead) {
      return "NOT_DEAD";
    }

    await this.hdel(tkey, key);
    await this.hdel(tkey, key + "_LASTPING");
    await this.hdel(tkey, key + "_LASTSTATUS");

    await this.del(tkey + "_" + key);

    return "OK";
  }

  public async getAllStoredPings<T, N>(tkey: string): Promise<IPingInfo<T, N>[]> {
    const allPings = (await this.hgetall(tkey)) || {};

    return await Promise.all(Object.keys(allPings).filter((pingKey) => {
      return (!pingKey.endsWith("_LASTPING") && !pingKey.endsWith("_LASTSTATUS"));
    }).map(async (dataKey) => {
      let pingData: T = null;
      try {
        pingData = JSON.parse(allPings[dataKey]);
      } catch {
      }

      const pingLastPing = parseInt(allPings[dataKey + "_LASTPING"]) || null;
      
      let pingLastStatus: N = null;
      try {
        pingLastStatus = JSON.parse(allPings[dataKey + "_LASTSTATUS"]);
      } catch {
      }

      const pingInfo: IPingInfo<T, N> = {
        tkey,
        dataKey,
        data: pingData,
        events: [],
        lastPing: pingLastPing,
        lastStatus: pingLastStatus,
        
        isPinging: false,
        isDead: false,
        isCorrupted: false,
        assumeDead: false,
      };

      const pingEvents = (await this.hgetall(tkey + "_" + dataKey)) || {};
      pingInfo.events = Object.keys(pingEvents).map((timeKey) => {
        const timeValue = parseInt(timeKey) || 0;
        const event = pingEvents[timeKey] as any;

        if (event === "ENDPING") {
          pingInfo.isDead = true;
        }

        return {
          time: timeValue,
          event,
        }
      }).sort((a, b) => b.time - a.time);

      pingInfo.isCorrupted = !pingInfo.events.some((e) => e.event === "CONNECT");

      if (!pingInfo.isDead) {
        const lastPingTime = pingInfo.lastPing;
        const diff = (new Date()).getTime() - lastPingTime;
  
        // twice the time has passed of the normal ping time
        // and it hasn't pinged
        pingInfo.assumeDead = diff >= (PING_TIME * 2);
      }

      pingInfo.isPinging = !pingInfo.isDead && !pingInfo.assumeDead;

      return pingInfo;
    }));
  }

  public async restorePings<T, N>(pings: IPingInfo<T, N>[]): Promise<void> {
    await Promise.all(pings.map(async (ping) => {
      await this.hset(ping.tkey, ping.dataKey, JSON.stringify(ping.data));
      await this.hset(ping.tkey, ping.dataKey + "_LASTPING", (new Date()).getTime().toString());
      await this.hset(ping.tkey, ping.dataKey + "_LASTSTATUS", JSON.stringify(ping.lastStatus));

      for (const event of ping.events) {
        await this.hset(ping.tkey + "_" + ping.dataKey, event.time.toString(), event.event);
      }
    }));
  }

  public createPing<T, N>(ping: IRedisPingSetter<T, N>) {
    if (this.isConnected) {
      this.setupPing(ping, true);
    }
    this.pings.push(ping);
  }

  public async stopPinging() {
    this.endPings();

    await Promise.all(this.pings.map(async (ping) => {
      await this.hset(ping.tkey + "_" + ping.dataKey, (new Date()).getTime().toString(), "DISCONNECT");
    }));
  }

  private setupPing<T, N>(ping: IRedisPingSetter<T, N>, markAsConnected: boolean) {
    this.hset(ping.tkey, ping.dataKey, JSON.stringify(ping.data));
    this.hset(ping.tkey, ping.dataKey + "_LASTPING", (new Date()).getTime().toString());
    this.hset(ping.tkey, ping.dataKey + "_LASTSTATUS", JSON.stringify(ping.statusRetriever()));
  
    if (markAsConnected) {
      this.hset(ping.tkey + "_" + ping.dataKey,  (new Date()).getTime().toString(), "CONNECT");
    } else {
      this.hset(ping.tkey + "_" + ping.dataKey, (new Date()).getTime().toString(), "RECONNECT");
    }
  }

  private setupPings(wasARecconect: boolean) {
    this.pings.forEach(this.setupPing.bind(this, !wasARecconect));
    this.pingTimeout = setInterval(this.ping, PING_TIME);
  }

  private ping() {
    if (!this.isConnected) {
      return;
    }

    this.pings.forEach((ping) => {
      this.hset(ping.tkey, ping.dataKey + "_LASTPING", (new Date()).getTime().toString());
      this.hset(ping.tkey, ping.dataKey + "_LASTSTATUS", JSON.stringify(ping.statusRetriever()));
    });
  }

  private endPings() {
    clearInterval(this.pingTimeout);
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
          this.isConnected = true;
          
          logger && logger.info("ItemizeRedisClient.setup: Redis client " + this.name + " succesfully connected");
          this.setupPings(wasAReconnect);

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
          this.isConnected = false;
          this.endPings();
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
          this.isConnected = false;
          this.endPings();
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