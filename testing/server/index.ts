import fetchNode from "node-fetch";
import { Test } from "..";
import Knex from "knex";
import redis, { RedisClient } from "redis";
import { strict as assert } from "assert";
import { ITestingInfoType } from "../itemize";
import type { Browser } from "puppeteer";
import { RobotsTest } from "./robots";
import { GraphqlTest } from "./graphql";

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
    ).quitOnFail();

    this.it(
      "Should be able to fetch a SSR disabled instance when using noredirect",
      async () => {
        const response = await fetchNode(this.fullHost + "?noredirect", {
          method: "HEAD",
        });

        assert.strictEqual(response.status, 200, "Did not return 200 OK");

        const hasSSRHeader = response.headers.has("x-ssr");

        if (hasSSRHeader) {
          assert.fail("The host provided a SSR enabled link when using noredirect");
        }
      }
    );

    this.it(
      "Should redirect to a supported language when a base URL is specified",
      async () => {
        const response = await fetchNode(this.fullHost, {
          method: "HEAD",
          redirect: "manual",
        });

        assert.strictEqual(response.status, 302, "Did not return a redirect");

        const redirectTo = new URL(response.headers.get("location"));
        const lang = redirectTo.pathname.split("/")[1];

        if (!this.info.config.supportedLanguages.includes(lang)) {
          assert.fail("Redirected to " + redirectTo + " but " + lang +
            " is not a supported language: " + this.info.config.supportedLanguages.join(","))
        }
      }
    );

    this.it(
      "Should handle etags",
      async () => {
        const language = this.info.config.fallbackLanguage;
        const response = await fetchNode(this.fullHost + "/" + language, {
          method: "HEAD",
          redirect: "manual",
        });

        assert.strictEqual(response.status, 200, "Did not return 200 OK");

        const etag = response.headers.get("etag");
        if (!etag) {
          assert.fail("Did not provide an etag");
        }

        const responseAgain = await fetchNode(this.fullHost + "/" + language, {
          method: "HEAD",
          redirect: "manual",
          headers: {
            "if-none-match": etag,
          },
        });

        assert.strictEqual(responseAgain.status, 304, "Second request did not return 304");
      }
    );

    this.info.config.supportedLanguages.forEach((lang) => {
      this.it(
        "Should provide results in language " + lang,
        async () => {
          const response = await fetchNode(this.fullHost + "/" + lang, {
            method: "HEAD",
          });

          assert.strictEqual(response.status, 200, "Did not return 200 OK");

          const headerLang = response.headers.get("content-language");
          if (!headerLang) {
            assert.fail("Did not provide a Content-Language header, this means this language is not supported by the server");
          } else if (headerLang !== lang) {
            assert.fail("The content language is not equal, expected " + lang + " but got " + headerLang);
          }

          const ssrHeader = response.headers.get("x-ssr");
          if (!ssrHeader) {
            return "The server informed that it did not use SSR for this render"
          }
        }
      );
    });

    this.define(
      "Graphql test",
      new GraphqlTest(this.fullHost, this.info),
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