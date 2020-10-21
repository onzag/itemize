import fetchNode from "node-fetch";
import { Test } from "..";
import Knex from "knex";
import redis, { RedisClient } from "redis";
import { strict as assert } from "assert";
import FormDataNode from "form-data";
import { ITestingInfoType } from "../itemize";
import type { Browser } from "puppeteer";
import { RobotsTest } from "./robots";

export class ServerTest extends Test {
  private info: ITestingInfoType;
  private host: string;
  private port: string | number;
  private https: boolean;
  private puppet: Browser;

  private knex: Knex;
  private redisPub: RedisClient;
  private redisSub: RedisClient;
  private redisLocalPub: RedisClient;
  private redisLocalSub: RedisClient;
  private redisClient: RedisClient;
  private redisGlobalClient: RedisClient;

  private fullHost: string;

  constructor(https: boolean, host: string, port: string | number, info: ITestingInfoType, puppet: Browser) {
    super();

    this.host = host;
    this.https = https;
    this.port = port;
    this.info = info;
    this.puppet = puppet;
  }
  public async before() {
    const dbConnectionKnexConfig = {
      host: this.info.dbConfig.host,
      port: this.info.dbConfig.port,
      user: this.info.dbConfig.user,
      password: this.info.dbConfig.password,
      database: this.info.dbConfig.database,
    };
    this.fullHost = (this.https ? "https://" : "http://") + this.host + (this.port ? ":" + this.port : "");

    this.knex = Knex({
      client: "pg",
      debug: process.env.NODE_ENV !== "production",
      connection: dbConnectionKnexConfig,
    });

    this.redisPub = redis.createClient(this.info.redisConfig.pubSub);
    this.redisSub = redis.createClient(this.info.redisConfig.pubSub);
    this.redisLocalPub = redis.createClient(this.info.redisConfig.cache);
    this.redisLocalSub = redis.createClient(this.info.redisConfig.cache);
    this.redisClient = redis.createClient(this.info.redisConfig.cache);
    this.redisGlobalClient = redis.createClient(this.info.redisConfig.global);
  }
  public describe() {
    this.it(
      "Should return the right buildnumber",
      async () => {
        const response = await fetchNode(this.fullHost + "/rest/buildnumber");
        assert.strictEqual(response.status, 200, "Did not return 200 OK");
        const buildnumber = (await response.text()).trim();
        assert.strictEqual(buildnumber, this.info.buildnumber);
      }
    );

    this.it(
      "Should have a graphql endpoint",
      async () => {
        const response = await fetchNode(this.fullHost + "/graphql", {
          method: "POST",
          body: JSON.stringify({ query: "query{__schema{queryType{name}}}", variables: null }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        assert.strictEqual(response.status, 200, "Did not return 200 OK");

        const gqlAnswer = await response.json();

        assert.deepStrictEqual(gqlAnswer, {
          data: {
            __schema: {
              queryType: {
                name: "ROOT_QUERY",
              },
            },
          },
        }, "Did not return a ROOT_QUERY");
      }
    );

    this.it(
      "Should support formdata protocol in graphql",
      async () => {

        // building the form data
        const formData = new FormDataNode();
        // append this stuff to the form data
        formData.append("operations", JSON.stringify({ query: "query{__schema{queryType{name}}}", variables: null }));
        formData.append("map", "{}");

        const response = await fetchNode(this.fullHost + "/graphql", {
          method: "POST",
          body: formData,
        });

        assert.strictEqual(response.status, 200, "Did not return 200 OK");

        const gqlAnswer = await response.json();

        assert.deepStrictEqual(gqlAnswer, {
          data: {
            __schema: {
              queryType: {
                name: "ROOT_QUERY",
              },
            },
          },
        }, "Did not return a ROOT_QUERY");
      }
    );

    this.define(
      "Robots test",
      new RobotsTest(this.https, this.host, this.port, this.fullHost, this.info),
    );
  }

  public after() {
    this.knex.destroy();
    this.redisPub.quit();
    this.redisSub.quit();
    this.redisLocalPub.quit();
    this.redisLocalSub.quit();
    this.redisClient.quit();
    this.redisGlobalClient.quit();
  }
}