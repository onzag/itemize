import fetchNode from "node-fetch";
import { Test } from "..";
import Knex from "knex";
import { strict as assert } from "assert";
import { ITestingInfoType } from "../itemize";
import { RobotsTest } from "./robots";
import { GraphqlTest } from "./graphql";
import { DatabaseTest } from "./database";
import { RedisTest } from "./redis";

const NODE_ENV = process.env.NODE_ENV;

export class ServerTest extends Test {
  private testingInfo: ITestingInfoType;
  private host: string;
  private port: string | number;
  private https: boolean;

  private knex: Knex;
  private fullHost: string;

  constructor(https: boolean, host: string, port: string | number, testingInfo: ITestingInfoType) {
    super();

    this.host = host;
    this.https = https;
    this.port = port;
    this.testingInfo = testingInfo;
  }
  public async before() {
    if (NODE_ENV !== "production") {
      const dbConnectionKnexConfig = {
        host: this.testingInfo.dbConfig.host,
        port: this.testingInfo.dbConfig.port,
        user: this.testingInfo.dbConfig.user,
        password: this.testingInfo.dbConfig.password,
        database: this.testingInfo.dbConfig.database,
      };
      this.fullHost = (this.https ? "https://" : "http://") + this.host + (this.port ? ":" + this.port : "");

      this.knex = Knex({
        client: "pg",
        debug: false,
        connection: dbConnectionKnexConfig,
      });
    }
  }
  public describe() {
    if (this.testingInfo.sensitiveConfig.localContainer) {
      this.warn(
        "You are using a local container named " +
        this.testingInfo.sensitiveConfig.localContainer +
        " local containers will not work on multicluster builds"
      );
    }

    this.it(
      "Should return the right buildnumber",
      async () => {
        if (NODE_ENV === "production") {
          this.warn("Cannot check the buildnumber against a production build because it's not guaranteed");
          return;
        }
        const response = await fetchNode(this.fullHost + "/rest/buildnumber");
        assert.strictEqual(response.status, 200, "Did not return 200 OK");
        const buildnumber = (await response.text()).trim();
        assert.strictEqual(buildnumber, this.testingInfo.buildnumber);
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

        if (!this.testingInfo.config.supportedLanguages.includes(lang)) {
          assert.fail("Redirected to " + redirectTo + " but " + lang +
            " is not a supported language: " + this.testingInfo.config.supportedLanguages.join(","))
        }
      }
    );

    this.it(
      "Should handle etags",
      async () => {
        const language = this.testingInfo.config.fallbackLanguage;
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

    this.testingInfo.config.supportedLanguages.forEach((lang) => {
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
            this.warn("The server informed that it did not use SSR for this render"); 
          }
        }
      );
    });

    this.define(
      "Graphql test",
      new GraphqlTest(this.fullHost, this.testingInfo),
    );

    // The following tests will not be good for a
    // production environment
    if (NODE_ENV === "production") {
      this.skipLayer();
    }

    this.define(
      "Robots test",
      new RobotsTest(this.https, this.host, this.port, this.fullHost, this.testingInfo),
    );

    this.define(
      "Database test",
      new DatabaseTest(this.knex, this.testingInfo),
    );

    this.define(
      "Redis test",
      new RedisTest(this.knex, this.testingInfo, this.fullHost),
    );
  }

  public after() {
    if (NODE_ENV !== "production") {
      this.knex.destroy();
    }
  }
}