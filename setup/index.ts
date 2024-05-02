/**
 * This file is in charge of running all the steps for the setup of an itemize app
 * 
 * @module
 */

import colors from "colors";
import deploymentSetup from "./deployment";
import { IConfigRawJSONDataType, IDBConfigRawJSONDataType, IDumpConfigRawJSONDataType, IRedisConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../config";
import fs from "fs";
import path from "path";
import configSetup from "./config";
import equals from "deep-equal";
import gitSetup from "./git";
import packageSetup from "./package";
import esbuildSetup from "./esbuild";
import itemizeConfigSetup from "./itemize";
import srcSetup from "./src";
import typescriptSetup from "./typescript";
const fsAsync = fs.promises;

/**
 * Contains all the configuration file information in a single
 * area for utility reasons
 */
export interface ISetupConfigType {
  standardConfig: IConfigRawJSONDataType;
  sensitiveConfigDevelopment: ISensitiveConfigRawJSONDataType;
  dbConfigDevelopment: IDBConfigRawJSONDataType;
  redisConfigDevelopment: IRedisConfigRawJSONDataType;
  sensitiveConfigProduction: ISensitiveConfigRawJSONDataType;
  dbConfigProduction: IDBConfigRawJSONDataType;
  redisConfigProduction: IRedisConfigRawJSONDataType;
  dumpConfig: IDumpConfigRawJSONDataType;
}

/**
 * every step is comprised of
 */
interface IStepType {
  /**
   * a function that is going to run that takes
   * @param arg an arg that is this config
   * @returns these same arg, as it has modified it
   */
  fn: (arg: ISetupConfigType) => Promise<ISetupConfigType>,
  /**
   * The name of this step
   */
  name: string,
}

/**
 * All the steps in the order that they are meant
 * to be executed
 */
const stepsInOrder: IStepType[] = [
  {
    fn: configSetup,
    name: "config",
  },
  {
    fn: deploymentSetup,
    name: "deployment",
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
    fn: typescriptSetup,
    name: "typescript",
  },
  {
    fn: esbuildSetup,
    name: "esbuild",
  },
  {
    fn: itemizeConfigSetup,
    name: "itemize",
  },
  {
    fn: srcSetup,
    name: "src",
  }
];

/**
 * Runs the setup, check out the main.ts function to see
 * how this is meant to be called
 * @param onlyNames the names that are supposed to be called
 */
export default async function setup(...onlyNames: string[]) {
  console.log(colors.bgGreen("INITIALIZING SETUP"));
  await ensureConfigDirectory();

  const standardConfig: IConfigRawJSONDataType = await readConfigFile("index.json");
  const dumpConfig: IDumpConfigRawJSONDataType = await readConfigFile("dump.json");
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
    dumpConfig,
  };

  for (const step of stepsInOrder) {
    if (onlyNames.length && !onlyNames.includes(step.name)) {
      continue;
    }
    arg = await step.fn(arg);
  }

  await writeConfigFile("index.json", arg.standardConfig, standardConfig);
  await writeConfigFile("dump.json", arg.dumpConfig, dumpConfig);
  await writeConfigFile("index.sensitive.json", arg.sensitiveConfigDevelopment, sensitiveConfigDevelopment);
  await writeConfigFile("db.sensitive.json", arg.dbConfigDevelopment, dbConfigDevelopment);
  await writeConfigFile("redis.sensitive.json", arg.redisConfigDevelopment, redisConfigDevelopment);
  await writeConfigFile("index.production.sensitive.json", arg.sensitiveConfigProduction, sensitiveConfigProduction);
  await writeConfigFile("db.production.sensitive.json", arg.dbConfigProduction, dbConfigProduction);
  await writeConfigFile("redis.production.sensitive.json", arg.redisConfigProduction, redisConfigProduction);
}

/**
 * Ensures that the configuration directory exists
 */
export async function ensureConfigDirectory() {
  // so we check it
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

  // also we add the .gitignore file for this
  // configuration directory to ensure that sensitive config
  // does not leak
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

/**
 * Reads a config file
 * @param fileName the filename we are reading
 * @returns the parsed content, or otherwise null if it doesn't exist
 */
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

/**
 * writes a configuration file only if it differs from what is currently written
 * according to the last arg
 * 
 * @param fileName the filename we are writting
 * @param data the data we are writting
 * @param original the original data, to check it against for differences
 */
export async function writeConfigFile(fileName: string, data: any, original: any) {
  if (!equals(data, original, {strict: true})) {
    console.log("emiting " + colors.green(path.join("config", fileName)));
    await fsAsync.writeFile(path.join("config", fileName), JSON.stringify(data, null, 2));
  }
}
