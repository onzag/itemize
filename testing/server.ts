import fetchNode from "node-fetch";
import { expect } from "chai";
import { describe, it, before } from "mocha";
import { ITestingInfoType } from ".";
import Knex from "knex";
import redis, { RedisClient } from "redis";

export class ServerTester {
  private info: ITestingInfoType;
  private host: string;
  private port: string | number;
  private https: boolean;
  constructor(https: boolean, host: string, port: string | number) {
  }
  setup(testingInfo: ITestingInfoType) {
    this.info = testingInfo;
  }
  public describe() {
    const testingInfo = this.info;
    const dbConnectionKnexConfig = {
      host: this.info.dbConfig.host,
      port: this.info.dbConfig.port,
      user: this.info.dbConfig.user,
      password: this.info.dbConfig.password,
      database: this.info.dbConfig.database,
    };
    const fullHost = (this.https ? "https://" : "http://") + this.host + (this.port ? ":" + this.port : "");

    describe("Server", function () {
      let knex: Knex;
      let redisPub: RedisClient;
      let redisSub: RedisClient;
      let redisLocalPub: RedisClient;
      let redisLocalSub: RedisClient;
      let redisClient: RedisClient;
      let redisGlobalClient: RedisClient;

      before(async function () {
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
          async function() {
            const request = await fetchNode(fullHost + "/rest/buildnumber");
            const buildnumber = (await request.text()).trim();
            expect(testingInfo.buildnumber).to.equal(buildnumber);
          }
        );
      });

      after(function () {
        knex.destroy();
        redisPub.end();
        redisSub.end();
        redisLocalPub.end();
        redisLocalSub.end();
        redisClient.end();
        redisGlobalClient.end();
      })
    });
  }
}