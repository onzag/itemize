/**
 * This file is in charge of running all the steps for the setup of an itemize app
 * 
 * @packageDocumentation
 */

import colors from "colors";
import dockerSetup from "./docker";
import { IConfigRawJSONDataType, IDBConfigRawJSONDataType, IRedisConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../config";
import fs from "fs";
import path from "path";
import configSetup from "./config";
import equals from "deep-equal";
import gitSetup from "./git";
import packageSetup from "./package";
import babelSetup from "./babel";
import webpackSetup from "./webpack";
import srcSetup from "./src";
import typescriptSetup from "./typescript";
const fsAsync = fs.promises;

export interface ISetupConfigType {
  standardConfig: IConfigRawJSONDataType;
  sensitiveConfigDevelopment: ISensitiveConfigRawJSONDataType;
  dbConfigDevelopment: IDBConfigRawJSONDataType;
  redisConfigDevelopment: IRedisConfigRawJSONDataType;
  sensitiveConfigProduction: ISensitiveConfigRawJSONDataType;
  dbConfigProduction: IDBConfigRawJSONDataType;
  redisConfigProduction: IRedisConfigRawJSONDataType;
}

interface IStepType {
  fn: (arg: ISetupConfigType) => Promise<ISetupConfigType>,
  name: string,
}

const stepsInOrder: IStepType[] = [
  {
    fn: configSetup,
    name: "config",
  },
  {
    fn: dockerSetup,
    name: "docker",
  },
  {
    fn: gitSetup,
    name: "git",
  },
  {
    fn: packageSetup,
    name: "package",
  },
  {
    fn: babelSetup,
    name: "babel",
  },
  {
    fn: typescriptSetup,
    name: "typescript",
  },
  {
    fn: webpackSetup,
    name: "webpack",
  },
  {
    fn: srcSetup,
    name: "src",
  }
];

export default async function setup(...onlyNames: string[]) {
  console.log(colors.bgGreen("INITIALIZING SETUP"));
  await ensureConfigDirectory();

  const standardConfig: IConfigRawJSONDataType = await readConfigFile("index.json");
  const sensitiveConfigDevelopment: ISensitiveConfigRawJSONDataType = await readConfigFile("index.sensitive.json");
  const dbConfigDevelopment: IDBConfigRawJSONDataType = await readConfigFile("db.sensitive.json");
  const redisConfigDevelopment: IRedisConfigRawJSONDataType = await readConfigFile("redis.sensitive.json");
  const sensitiveConfigProduction: ISensitiveConfigRawJSONDataType = await readConfigFile("index.production.sensitive.json");
  const dbConfigProduction: IDBConfigRawJSONDataType = await readConfigFile("db.production.sensitive.json");
  const redisConfigProduction: IRedisConfigRawJSONDataType = await readConfigFile("redis.production.sensitive.json");

  let arg: ISetupConfigType = {
    standardConfig,
    sensitiveConfigDevelopment,
    dbConfigDevelopment,
    redisConfigDevelopment,
    sensitiveConfigProduction,
    dbConfigProduction,
    redisConfigProduction,
  };

  for (const step of stepsInOrder) {
    if (onlyNames.length && !onlyNames.includes(step.name)) {
      continue;
    }
    arg = await step.fn(arg);
  }

  await writeConfigFile("index.json", arg.standardConfig, standardConfig);
  await writeConfigFile("index.sensitive.json", arg.sensitiveConfigDevelopment, sensitiveConfigDevelopment);
  await writeConfigFile("db.sensitive.json", arg.dbConfigDevelopment, dbConfigDevelopment);
  await writeConfigFile("redis.sensitive.json", arg.redisConfigDevelopment, redisConfigDevelopment);
  await writeConfigFile("index.production.sensitive.json", arg.sensitiveConfigProduction, sensitiveConfigProduction);
  await writeConfigFile("db.production.sensitive.json", arg.dbConfigProduction, dbConfigProduction);
  await writeConfigFile("redis.production.sensitive.json", arg.redisConfigProduction, redisConfigProduction);
}

export async function ensureConfigDirectory() {
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

  let gitignoreExists = true;
  try {
    await fsAsync.access(path.join("config", ".gitignore"), fs.constants.F_OK);
  } catch (e) {
    gitignoreExists = false;
  }
  if (!gitignoreExists) {
    console.log("emiting " + colors.green(".gitignore"));
    await fsAsync.writeFile(path.join("config", ".gitignore"), "*.sensitive.json");
  }
}

export async function readConfigFile(fileName: string) {
  let exists = true;
  try {
    await fsAsync.access(path.join("config", fileName), fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }

  if (!exists) {
    return null;
  }

  console.log("reading " + colors.green(path.join("config", fileName)));
  const content = await fsAsync.readFile(path.join("config", fileName), "utf-8");

  return JSON.parse(content);
}

export async function writeConfigFile(fileName: string, data: any, original: any) {
  if (!equals(data, original)) {
    console.log("emiting " + colors.green(path.join("config", fileName)));
    await fsAsync.writeFile(path.join("config", fileName), JSON.stringify(data, null, 2));
  }
}