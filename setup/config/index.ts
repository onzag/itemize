/**
 * Setups the configuration basically modifies the configuration in place
 * this setup is supposed to build
 * 
 * @packageDocumentation
 */

import colors from "colors";
import { ISetupConfigType } from "..";
import { standardConfigSetup } from "./standard";
import { confirm } from "../read";
import { sensitiveConfigSetup } from "./sensitive";
import { redisConfigSetup } from "./redis";
import { dbConfigSetup } from "./db";
import fs from "fs";
import { dumpConfigRequest } from "./dump";
const fsAsync = fs.promises;

/**
 * the configuration setup step that builds the config files themselves
 * @param arg the config it's supposed to modify
 */
export default async function configSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("CONFIGURATION SETUP"));

  // we need our package json information
  const packageJSON = JSON.parse(await fsAsync.readFile("package.json", "utf-8"));

  // and we build our new configuration
  const newArg: ISetupConfigType = {
    ...arg,
  }

  // if we have already setup
  if (
    newArg.standardConfig &&
    newArg.sensitiveConfigDevelopment &&
    newArg.sensitiveConfigProduction &&
    newArg.redisConfigDevelopment &&
    newArg.redisConfigProduction &&
    newArg.dbConfigDevelopment &&
    newArg.dbConfigProduction &&
    !(await confirm("Would you like to setup the configuration files?"))
  ) {
    // we ask and confirm for it
    return arg;
  }

  if (
    !newArg.standardConfig ||
    await confirm("Would you like to modify the standard configuration?")
  ) {
    newArg.standardConfig = await standardConfigSetup(newArg.standardConfig, packageJSON);
  }

  if (
    !newArg.sensitiveConfigDevelopment ||
    await confirm("Would you like to modify the sensitive development configuration?")
  ) {
    // basically there's nothing as a reference for our development configuration
    newArg.sensitiveConfigDevelopment = await sensitiveConfigSetup(
      "development",
      newArg.sensitiveConfigDevelopment,
      null,
    );
  }

  if (
    !newArg.sensitiveConfigProduction ||
    await confirm("Would you like to modify the sensitive production configuration?")
  ) {
    // but we can use our development configuration as reference for production
    newArg.sensitiveConfigProduction = await sensitiveConfigSetup(
      "production",
      newArg.sensitiveConfigProduction,
      newArg.sensitiveConfigDevelopment,
    );
  }

  if (
    !newArg.redisConfigDevelopment ||
    await confirm("Would you like to modify the redis development configuration?")
  ) {
    // same with redis
    newArg.redisConfigDevelopment = await redisConfigSetup(
      "development",
      newArg.redisConfigDevelopment,
      null,
    );
  }

  if (
    !newArg.redisConfigProduction ||
    await confirm("Would you like to modify the redis production configuration?")
  ) {
    newArg.redisConfigProduction = await redisConfigSetup(
      "production",
      newArg.redisConfigProduction,
      newArg.redisConfigDevelopment,
    );
  }

  if (
    !newArg.dbConfigDevelopment ||
    await confirm("Would you like to modify the posrgreSQL development configuration?")
  ) {
    newArg.dbConfigDevelopment = await dbConfigSetup(
      "development",
      newArg.dbConfigDevelopment,
      null,
      packageJSON,
    );
  }

  if (
    !newArg.dbConfigProduction ||
    await confirm("Would you like to modify the posrgreSQL production configuration?")
  ) {
    newArg.dbConfigProduction = await dbConfigSetup(
      "production",
      newArg.dbConfigProduction,
      newArg.dbConfigDevelopment,
      packageJSON,
    );
  }

  newArg.dumpConfig = dumpConfigRequest(
    newArg.dumpConfig,
    newArg.sensitiveConfigDevelopment,
  );

  return newArg;
}
