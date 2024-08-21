import { Test } from "..";
import { strict as assert } from "assert";
import { ITestingInfoType } from "../itemize";
import { RobotsTest } from "./robots";
import { RQTest } from "./rq";
import { DatabaseTest } from "./database";
import { RedisTest } from "./redis";
import { CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, JWT_KEY, REGISTRY_IDENTIFIER } from "../../constants";
import { jwtSign } from "../../server/token";
import { TokenTest } from "./token";
import { convertVersionsIntoNullsWhenNecessary } from "../../server/version-null-value";
import { DatabaseConnection } from "../../database";

const NODE_ENV = process.env.NODE_ENV;

export interface IUserInfoAndTokensForTesting {
  testUser: any;
  testToken: string;
  malformedTestToken: string;
  invalidSessionIdTestToken: string;
  invalidSignatureTestToken: string;
  invalidRoleTestToken: string;
  garbageMadeUpToken: string;
}

export class ServerTest extends Test {
  private testingInfo: ITestingInfoType;
  private host: string;
  private port: string | number;
  private https: boolean;

  private databaseConnection: DatabaseConnection;
  private fullHost: string;

  private testingUserInfo: IUserInfoAndTokensForTesting;

  constructor(https: boolean, host: string, port: string | number, testingInfo: ITestingInfoType) {
    super();

    this.host = host;
    this.https = https;
    this.port = port;
    this.testingInfo = testingInfo;
  }
  public async before() {
    this.fullHost = (this.https ? "https://" : "http://") + this.host + (this.port ? ":" + this.port : "");

    const dbConnectionConfig = {
      host: this.testingInfo.dbConfig.host,
      port: this.testingInfo.dbConfig.port,
      user: this.testingInfo.dbConfig.user,
      password: this.testingInfo.dbConfig.password,
      database: this.testingInfo.dbConfig.database,
    };

    this.databaseConnection = new DatabaseConnection(dbConnectionConfig);
    this.databaseConnection.suppressLogging();

    const userMod = this.testingInfo.root.getModuleFor(["users"]);
    const userIdef = userMod.getItemDefinitionFor(["user"]);

    // This will normally pick the admin user
    // but who knows it can happen otherwise
    const testUser = convertVersionsIntoNullsWhenNecessary(
      await this.databaseConnection.queryFirst(
        `SELECT * FROM ${JSON.stringify(userMod.getTableName())} JOIN ${JSON.stringify(userIdef.getTableName())} ` +
        `ON ${JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME)} = "id" AND ` +
        `${JSON.stringify(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME)} = "version" WHERE "role" = 'ADMIN' ` + 
        `ORDER BY "created_at" ASC LIMIT 1`
      ),
    );

    const jwtKey = JSON.parse((await this.databaseConnection.queryFirst(
      `SELECT "value" FROM ${JSON.stringify(REGISTRY_IDENTIFIER)} WHERE "pkey" = $1 AND "skey" = $2`,
      [
        JWT_KEY,
        "",
      ]
    )).value);

    const testToken = await jwtSign(
      {
        id: testUser.id,
        role: testUser.role,
        sessionId: testUser.session_id || 0,
      },
      jwtKey,
    );

    const malformedTestToken = await jwtSign(
      {
        id: 1,
        role: testUser.role,
        sessionId: (testUser.session_id || 0).toString(),
      },
      jwtKey,
    );

    const invalidSessionIdTestToken = await jwtSign(
      {
        id: testUser.id,
        role: testUser.role,
        sessionId: (testUser.session_id || 0) + 1,
      },
      jwtKey,
    );

    const allRoles = this.testingInfo.config.roles;
    const rolesWithoutSelf = allRoles.filter((r) => r !== testUser.role);
    const invalidRoleTestToken = await jwtSign(
      {
        id: testUser.id,
        role: rolesWithoutSelf[0] || "MADE_UP_ROLE",
        sessionId: testUser.session_id || 0,
      },
      jwtKey,
    );

    const invalidSignatureTestToken = await jwtSign(
      {
        id: testUser.id,
        role: rolesWithoutSelf[0],
        sessionId: testUser.session_id || 0,
      },
      "123456",
    );

    const garbageMadeUpToken = "THIS_IS_NOT_A_REAL_TOKEN";

    this.info("Test user chosen: " + testUser.username);

    this.testingUserInfo = {
      testUser,
      testToken,
      malformedTestToken,
      invalidSessionIdTestToken,
      invalidRoleTestToken,
      invalidSignatureTestToken,
      garbageMadeUpToken,
    }

    if (testUser.role !== "ADMIN") {
      this.warn("For some reason the test user is not an admin user but " + testUser.role);
    }
  }
  public describe() {
    // this.it(
    //   "Should return the right buildnumber",
    //   async () => {
    //     if (NODE_ENV === "production") {
    //       this.warn("Cannot check the buildnumber against a production build because it's not guaranteed");
    //       return;
    //     }
    //     const response = await fetchNode(this.fullHost + "/rest/buildnumber");
    //     assert.strictEqual(response.status, 200, "Did not return 200 OK");
    //     const buildnumber = (await response.text()).trim();
    //     assert.strictEqual(buildnumber, this.testingInfo.buildnumber);
    //   }
    // ).quitOnFail();

    this.it(
      "Should have at least one user",
      async () => {
        const userMod = this.testingInfo.root.getModuleFor(["users"]);
        const oneUser = await this.databaseConnection.queryFirst(
          `SELECT "id" FROM ${JSON.stringify(userMod.getTableName())} LIMIT 1`
        );
        if (!oneUser) {
          assert.fail("Could not even get a single user");
        }
      }
    ).quitOnFail();

    // this.it(
    //   "Should be able to fetch a SSR disabled instance when using noredirect",
    //   async () => {
    //     const response = await fetchNode(this.fullHost + "?noredirect", {
    //       method: "HEAD",
    //     });

    //     assert.strictEqual(response.status, 200, "Did not return 200 OK");

    //     const hasSSRHeader = response.headers.has("x-ssr");

    //     if (hasSSRHeader) {
    //       assert.fail("The host provided a SSR enabled link when using noredirect");
    //     }
    //   }
    // );

    // this.it(
    //   "Should redirect to a supported language when a base URL is specified",
    //   async () => {
    //     const response = await fetchNode(this.fullHost, {
    //       method: "HEAD",
    //       redirect: "manual",
    //     });

    //     assert.strictEqual(response.status, 302, "Did not return a redirect");

    //     const redirectTo = new URL(response.headers.get("location"));
    //     const lang = redirectTo.pathname.split("/")[1];

    //     if (!this.testingInfo.config.supportedLanguages.includes(lang)) {
    //       assert.fail("Redirected to " + redirectTo + " but " + lang +
    //         " is not a supported language: " + this.testingInfo.config.supportedLanguages.join(","))
    //     }
    //   }
    // );

    // this.it(
    //   "Should handle etags",
    //   async () => {
    //     const language = this.testingInfo.config.fallbackLanguage;
    //     const response = await fetchNode(this.fullHost + "/" + language, {
    //       method: "HEAD",
    //       redirect: "manual",
    //     });

    //     assert.strictEqual(response.status, 200, "Did not return 200 OK");

    //     const etag = response.headers.get("etag");
    //     if (!etag) {
    //       assert.fail("Did not provide an etag");
    //     }

    //     const responseAgain = await fetchNode(this.fullHost + "/" + language, {
    //       method: "HEAD",
    //       redirect: "manual",
    //       headers: {
    //         "if-none-match": etag,
    //       },
    //     });

    //     assert.strictEqual(responseAgain.status, 304, "Second request did not return 304");
    //   }
    // );

    // this.testingInfo.config.supportedLanguages.forEach((lang) => {
    //   this.it(
    //     "Should provide results in language " + lang,
    //     async () => {
    //       const response = await fetchNode(this.fullHost + "/" + lang, {
    //         method: "HEAD",
    //       });

    //       assert.strictEqual(response.status, 200, "Did not return 200 OK");

    //       const headerLang = response.headers.get("content-language");
    //       if (!headerLang) {
    //         assert.fail("Did not provide a Content-Language header, this means this language is not supported by the server");
    //       } else if (headerLang !== lang) {
    //         assert.fail("The content language is not equal, expected " + lang + " but got " + headerLang);
    //       }

    //       const ssrHeader = response.headers.get("x-ssr");
    //       if (!ssrHeader) {
    //         this.warn("The server informed that it did not use SSR for this render");
    //       }
    //     }
    //   );
    // });

    this.define(
      "RQ test",
      new RQTest(this.fullHost, this.testingInfo),
    );

    this.define(
      "Token test",
      new TokenTest(this.fullHost, this.testingUserInfo),
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
      new DatabaseTest(this.databaseConnection, this.testingInfo),
    );

    this.define(
      "Redis test",
      new RedisTest(this.databaseConnection, this.testingInfo, this.testingUserInfo, this.fullHost),
    );
  }
}