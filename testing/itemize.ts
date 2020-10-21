import fs from "fs";
import path from "path";
import { ServerTest } from "./server";
import Root, { IRootRawJSONDataType, ILangLocalesType } from "../base/Root";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType, IDBConfigRawJSONDataType, IRedisConfigRawJSONDataType } from "../config";
import { Test } from ".";
import type { Browser } from "puppeteer";

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

export class ItemizeTest extends Test {
  private https: boolean;
  private host: string;
  private port: number | string;
  private testingInfo: ITestingInfoType;
  private puppet: Browser;

  constructor(https: boolean, host: string, port: number | string, puppet: Browser) {
    super();

    this.host = host;
    this.port = port;
    this.https = https;
    this.puppet = puppet;
  }

  public async before() {
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

    Object.keys(redisConfig.cache).forEach((key) => {
      if (redisConfig.cache[key] === null) {
        delete redisConfig.cache[key];
      }
    });
    Object.keys(redisConfig.pubSub).forEach((key) => {
      if (redisConfig.pubSub[key] === null) {
        delete redisConfig.pubSub[key];
      }
    });
    Object.keys(redisConfig.global).forEach((key) => {
      if (redisConfig.global[key] === null) {
        delete redisConfig.global[key];
      }
    });

    const root = new Root(build);

    this.testingInfo = {
      root,
      config,
      sensitiveConfig,
      redisConfig,
      langLocales,
      dbConfig,
      buildnumber,
    }
  }

  public describe() {
    this.define("Server Tests", new ServerTest(this.https, this.host, this.port, this.testingInfo, this.puppet));
  }
}