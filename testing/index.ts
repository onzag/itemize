import fs from "fs";
import path from "path";
import { ServerTester } from "./server";
import Root, { IRootRawJSONDataType, ILangLocalesType } from "../base/Root";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType, IDBConfigRawJSONDataType, IRedisConfigRawJSONDataType } from "../config";
import { before } from "mocha";

const fsAsync = fs.promises;

const NODE_ENV = process.env.NODE_ENV;

export interface ITestingInfoType {
  root: Root;
  config: IConfigRawJSONDataType;
  sensitiveConfig: ISensitiveConfigRawJSONDataType;
  dbConfig: IDBConfigRawJSONDataType;
  redisConfig: IRedisConfigRawJSONDataType;
  langLocales: ILangLocalesType;
  buildnumber: string;
}

export class Tester {
  private https: boolean;
  private host: string;
  private port: number | string;

  constructor(https: boolean, host: string, port: number | string) {
    this.host = host;
    this.port = port;
    this.https = https;
  }

  run() {
    const https = this.https;
    const host = this.host;
    const port = this.port;

    describe("Itemize Testing", function () {
      const serverTester = new ServerTester(
        https,
        host,
        port,
      );

      before(async function () {
        // first let's read all the configurations
        let rawBuild: string;
        let rawConfig: string;
        let rawSensitiveConfig: string;
        let rawRedisConfig: string;
        let rawDbConfig: string;
        let buildnumber: string;
        let rawLangLocales: string

        [
          rawConfig,
          rawSensitiveConfig,
          rawRedisConfig,
          rawDbConfig,
          rawBuild,
          rawLangLocales,
          buildnumber,
        ] = await Promise.all([
          fsAsync.readFile(path.join("config", "index.json"), "utf8"),
          fsAsync.readFile(path.join("config", NODE_ENV === "development" ? "index.sensitive.json" : `index.${NODE_ENV}.sensitive.json`), "utf8"),
          fsAsync.readFile(path.join("config", NODE_ENV === "development" ? "redis.sensitive.json" : `redis.${NODE_ENV}.sensitive.json`), "utf8"),
          fsAsync.readFile(path.join("config", NODE_ENV === "development" ? "db.sensitive.json" : `db.${NODE_ENV}.sensitive.json`), "utf8"),
          fsAsync.readFile(path.join("dist", "data", "index.html"), "utf8"),
          fsAsync.readFile(path.join("dist", "data", "build.all.json"), "utf8"),
          fsAsync.readFile(path.join("dist", "data", "lang.json"), "utf8"),
          fsAsync.readFile(path.join("dist", "buildnumber"), "utf8"),
        ]);

        const config: IConfigRawJSONDataType = JSON.parse(rawConfig);
        const sensitiveConfig: ISensitiveConfigRawJSONDataType = JSON.parse(rawSensitiveConfig);
        const dbConfig: IDBConfigRawJSONDataType = JSON.parse(rawDbConfig);
        const redisConfig: IRedisConfigRawJSONDataType = JSON.parse(rawRedisConfig);
        const build: IRootRawJSONDataType = JSON.parse(rawBuild);
        const langLocales: ILangLocalesType = JSON.parse(rawLangLocales);

        const root = new Root(build);

        const testingInfo: ITestingInfoType = {
          root,
          config,
          sensitiveConfig,
          redisConfig,
          langLocales,
          dbConfig,
          buildnumber,
        }

        serverTester.setup(testingInfo);
      })

      serverTester.describe();
    });
  }
}