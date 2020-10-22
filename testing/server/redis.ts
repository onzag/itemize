import { Test } from "..";
import { strict as assert } from "assert";
import { ITestingInfoType } from "../itemize";
import Knex from "knex";
import redis, { RedisClient } from "redis";
import { SERVER_DATA_IDENTIFIER } from "../../constants";
import { promisify } from "util";
import equals from "deep-equal";

export class RedisTest extends Test {
  private testingInfo: ITestingInfoType;
  private fullHost: string;

  private knex: Knex;
  private redisPub: RedisClient;
  private redisSub: RedisClient;
  private redisLocalPub: RedisClient;
  private redisLocalSub: RedisClient;
  private redisClient: RedisClient;
  private redisGlobalClient: RedisClient;

  constructor(knex: Knex, testingInfo: ITestingInfoType, fullHost: string) {
    super();

    this.knex = knex;
    this.testingInfo = testingInfo;
    this.fullHost = fullHost;
  }

  public async before() {
    this.redisPub = redis.createClient(this.testingInfo.redisConfig.pubSub);
    this.redisSub = redis.createClient(this.testingInfo.redisConfig.pubSub);
    this.redisLocalPub = redis.createClient(this.testingInfo.redisConfig.cache);
    this.redisLocalSub = redis.createClient(this.testingInfo.redisConfig.cache);
    this.redisClient = redis.createClient(this.testingInfo.redisConfig.cache);
    this.redisGlobalClient = redis.createClient(this.testingInfo.redisConfig.global);
  }

  public describe() {
    const getGlobalPromisified = promisify(this.redisGlobalClient.get).bind(this.redisGlobalClient);
    const publishPromisified = promisify(this.redisPub.publish).bind(this.redisPub);

    if (equals(this.testingInfo.redisConfig.cache, this.testingInfo.redisConfig.global)) {
      this.warn("Your local and your global redis servers are the same, this is not recommended for multicluster builds");
    }

    if (
      equals(this.testingInfo.redisConfig.pubSub, this.testingInfo.redisConfig.cache)
    ) {
      this.warn("Your pubsub and your local redis are the same, this is not recommended for multicluster builds");
    }

    this.it(
      "Should have cached server information within the global registry",
      async () => {
        const result = await getGlobalPromisified(SERVER_DATA_IDENTIFIER);
        if (!result) {
          assert.fail("Could not find a stored key for " + SERVER_DATA_IDENTIFIER)
        }
      }
    );

    this.it(
      "Should be able to communicate between the pub and sub global client",
      () => {
        return new Promise((resolve, reject) => {
          let status = "WAIT";
          this.redisSub.on("message", () => {
            if (status === "WAIT") {
              status = "SUCCESS";
              this.redisSub.unsubscribe("TEST");
              resolve();
            }
          });
          this.redisSub.subscribe("TEST");
          this.redisPub.publish("TEST", "VALUE");

          setTimeout(() => {
            status = "FAIL";
            reject();
          }, 300);
        });
      }
    );

    this.it(
      "Should be able to communicate between the pub and sub local client",
      () => {
        return new Promise((resolve, reject) => {
          let status = "WAIT";
          this.redisLocalSub.on("message", () => {
            if (status === "WAIT") {
              status = "SUCCESS";
              this.redisLocalSub.unsubscribe("TEST");
              resolve();
            }
          });
          this.redisLocalSub.subscribe("TEST");
          this.redisLocalPub.publish("TEST", "VALUE");

          setTimeout(() => {
            status = "FAIL";
            reject();
          }, 300);
        });
      }
    );
  }

  public after() {
    this.redisPub.quit();
    this.redisSub.quit();
    this.redisLocalPub.quit();
    this.redisLocalSub.quit();
    this.redisClient.quit();
    this.redisGlobalClient.quit();
  }
}