import colors from "colors";
import dockerSetup from "./docker";
import { IConfigRawJSONDataType, IDBConfigRawJSONDataType, IRedisConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../config";
import fs from "fs";
import path from "path";
import configSetup from "./config";
const fsAsync = fs.promises;

export interface ISetupConfigType {
  standardConfig: IConfigRawJSONDataType;
  sensitiveConfigDevelopment: ISensitiveConfigRawJSONDataType;
  dbConfigDevelopment: IDBConfigRawJSONDataType;
  redisConfigDevelopment: IRedisConfigRawJSONDataType;
  sensitiveConfigStaging: ISensitiveConfigRawJSONDataType;
  dbConfigStaging: IDBConfigRawJSONDataType;
  redisConfigStaging: IRedisConfigRawJSONDataType;
  sensitiveConfigProduction: ISensitiveConfigRawJSONDataType;
  dbConfigProduction: IDBConfigRawJSONDataType;
  redisConfigProduction: IRedisConfigRawJSONDataType;
}

const stepsInOrder: Array<(arg: ISetupConfigType) => Promise<ISetupConfigType>> = [
  dockerSetup,
  configSetup,
];

export default async function setup() {
  console.log(colors.green("Initializing Setup"));
  await ensureConfigDirectory();

  const standardConfig: IConfigRawJSONDataType = await readConfigFile("index.json");
  const sensitiveConfigDevelopment: ISensitiveConfigRawJSONDataType = await readConfigFile("index.sensitive.json");
  const dbConfigDevelopment: IDBConfigRawJSONDataType = await readConfigFile("db.sensitive.json");
  const redisConfigDevelopment: IRedisConfigRawJSONDataType = await readConfigFile("redis.sensitive.json");
  const sensitiveConfigStaging: ISensitiveConfigRawJSONDataType = await readConfigFile("index.sensitive.staging.json");
  const dbConfigStaging: IDBConfigRawJSONDataType = await readConfigFile("db.sensitive.staging.json");
  const redisConfigStaging: IRedisConfigRawJSONDataType = await readConfigFile("redis.sensitive.staging.json");
  const sensitiveConfigProduction: ISensitiveConfigRawJSONDataType = await readConfigFile("index.sensitive.production.json");
  const dbConfigProduction: IDBConfigRawJSONDataType = await readConfigFile("db.sensitive.production.json");
  const redisConfigProduction: IRedisConfigRawJSONDataType = await readConfigFile("redis.sensitive.production.json");

  let arg: ISetupConfigType = {
    standardConfig,
    sensitiveConfigDevelopment,
    dbConfigDevelopment,
    redisConfigDevelopment,
    sensitiveConfigStaging,
    dbConfigStaging,
    redisConfigStaging,
    sensitiveConfigProduction,
    dbConfigProduction,
    redisConfigProduction,
  };

  let failed = false;
  for (const step of stepsInOrder) {
    try {
      arg = await step(arg);
    } catch (err) {
      failed = true;
      console.log(colors.red(err.toString()));
      break;
    }
  }

  if (!failed) {
    console.log(colors.green("Setup succesful!"));
    // TODO write the files to disc
  }
}

async function ensureConfigDirectory() {
  let exists = true;
  try {
    await fsAsync.access("config", fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }
  if (!exists) {
    // let the error be free
    await fsAsync.mkdir("config");
  }

  const stat = await fsAsync.stat("config");

  if (!stat.isDirectory()) {
    throw new Error("config folder cannot be created because a file already exist with its same name");
  }
}

async function readConfigFile(fileName: string) {
  let exists = true;
  try {
    await fsAsync.access(path.join("config", fileName), fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }

  if (!exists) {
    return null;
  }

  console.log(colors.green("reading ") + path.join("config", fileName));
  const content = await fsAsync.readFile(path.join("config", fileName), "utf-8");

  return JSON.parse(content);
}
