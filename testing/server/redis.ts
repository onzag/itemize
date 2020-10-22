import { Test } from "..";
import { strict as assert } from "assert";
import { ITestingInfoType } from "../itemize";
import Knex from "knex";
import redis, { RedisClient } from "redis";
import { SERVER_DATA_IDENTIFIER } from "../../constants";
import { promisify } from "util";
import equals from "deep-equal";
import { IUserInfoAndTokensForTesting } from ".";
import fetchNode from "node-fetch";

export class RedisTest extends Test {
  private testingInfo: ITestingInfoType;
  private testingUserInfo: IUserInfoAndTokensForTesting;
  private fullHost: string;

  private knex: Knex;
  private redisPub: RedisClient;
  private redisSub: RedisClient;
  private redisLocalPub: RedisClient;
  private redisLocalSub: RedisClient;
  private redisClient: RedisClient;
  private redisGlobalClient: RedisClient;

  constructor(knex: Knex, testingInfo: ITestingInfoType, testingUserInfo: IUserInfoAndTokensForTesting, fullHost: string) {
    super();

    this.knex = knex;
    this.testingInfo = testingInfo;
    this.fullHost = fullHost;
    this.testingUserInfo = testingUserInfo;
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

    this.it(
      "Should be able to cache when graphql requested",
      async () => {
        const delPromisified = promisify(this.redisClient.del).bind(this.redisClient);
        const getPromisified = promisify(this.redisClient.get).bind(this.redisClient);

        const userIdef = this.testingInfo.root.getModuleFor(["users"]).getItemDefinitionFor(["user"]);
        const idefQueryIdentifier = "IDEFQUERY:" +
          userIdef.getQualifiedPathName() +
          "." +
          this.testingUserInfo.testUser.id.toString() +
          "." +
          (this.testingUserInfo.testUser.version || "");
        // delete the user cache entry from the cluster registry
        // bit hacky but okey
        await delPromisified(idefQueryIdentifier);

        // we will use the token request as that will cause a request via graphql
        const response = await fetchNode(this.fullHost + "/graphql", {
          method: "POST",
          body: JSON.stringify({ query: "query{token(token: " + JSON.stringify(this.testingUserInfo.testToken) + "){token,}}", variables: null }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        assert.strictEqual(response.status, 200, "Graphql did not return 200 OK");

        // fetch the new value from the redis cache, there should be a new one
        const value = await getPromisified(idefQueryIdentifier);

        // there should be a value
        if (!value) {
          assert.fail("Caching failed by the server");
        }

        // we expect the cache to equal what we have here, this was gotten
        // directly from postgresql
        assert.deepStrictEqual(JSON.parse(value), this.testingUserInfo.testUser);
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