import fetchNode from "node-fetch";
import { ITestingInfoType } from ".";
import Knex from "knex";
import redis, { RedisClient } from "redis";
import { strict as assert } from "assert";

export class ServerTester {
  private info: ITestingInfoType;
  private host: string;
  private port: string | number;
  private https: boolean;
  constructor(https: boolean, host: string, port: string | number) {
    this.host = host;
    this.https = https;
    this.port = port;

    this.setup = this.setup.bind(this);
  }
  setup(testingInfo: ITestingInfoType) {
    this.info = testingInfo;
  }
  public describe(__self__: ServerTester) {
    describe("Server", function () {
      let knex: Knex;
      let redisPub: RedisClient;
      let redisSub: RedisClient;
      let redisLocalPub: RedisClient;
      let redisLocalSub: RedisClient;
      let redisClient: RedisClient;
      let redisGlobalClient: RedisClient;

      let fullHost: string;
      let testingInfo: ITestingInfoType;
      
      before(async function () {
        testingInfo = __self__.info;
        const dbConnectionKnexConfig = {
          host: __self__.info.dbConfig.host,
          port: __self__.info.dbConfig.port,
          user: __self__.info.dbConfig.user,
          password: __self__.info.dbConfig.password,
          database: __self__.info.dbConfig.database,
        };
        fullHost = (__self__.https ? "https://" : "http://") + __self__.host + (__self__.port ? ":" + __self__.port : "");

        knex = Knex({
          client: "pg",
          debug: process.env.NODE_ENV !== "production",
          connection: dbConnectionKnexConfig,
        });

        redisPub = redis.createClient(testingInfo.redisConfig.pubSub);
        redisSub = redis.createClient(testingInfo.redisConfig.pubSub);
        redisLocalPub = redis.createClient(testingInfo.redisConfig.cache);
        redisLocalSub = redis.createClient(testingInfo.redisConfig.cache);
        redisClient = redis.createClient(testingInfo.redisConfig.cache);
        redisGlobalClient = redis.createClient(testingInfo.redisConfig.global);
      });

      describe("General tests", function () {
        it(
          "Should return the right buildnumber",
          async function () {
            const request = await fetchNode(fullHost + "/rest/buildnumber");
            const buildnumber = (await request.text()).trim();
            assert.strictEqual(buildnumber, testingInfo.buildnumber, "Buildnumber mismatch");
          }
        );
      });

      after(function () {
        knex.destroy();
        redisPub.quit();
        redisSub.quit();
        redisLocalPub.quit();
        redisLocalSub.quit();
        redisClient.quit();
        redisGlobalClient.quit();
      })
    });
  }
}