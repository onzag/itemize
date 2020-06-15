import colors from "colors";
import { ISetupConfigType } from "..";
import { standardConfigSetup } from "./standard";
import { confirm } from "../read";
import { sensitiveConfigSetup } from "./sensitive";
import { redisConfigSetup } from "./redis";
import { dbConfigSetup } from "./db";
import fs from "fs";
const fsAsync = fs.promises;

export default async function configSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("CONFIGURATION SETUP"));

  const packageJSON = JSON.parse(await fsAsync.readFile("package.json", "utf-8"));

  const newArg: ISetupConfigType = {
    ...arg,
  }

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
    return arg;
  }

  if (
    !newArg.standardConfig ||
    await confirm("Would you like to modify the standard configuration?")
  ) {
    console.log(colors.yellow("Could not find standard configuration file"));
    newArg.standardConfig = await standardConfigSetup(newArg.standardConfig, packageJSON);
  }

  if (
    !newArg.sensitiveConfigDevelopment ||
    await confirm("Would you like to modify the sensitive development configuration?")
  ) {
    newArg.sensitiveConfigDevelopment = await sensitiveConfigSetup(
      "development",
      newArg.sensitiveConfigDevelopment,
      null,
      packageJSON,
    );
  }

  if (
    !newArg.sensitiveConfigProduction ||
    await confirm("Would you like to modify the sensitive production configuration?")
  ) {
    newArg.sensitiveConfigProduction = await sensitiveConfigSetup(
      "production",
      newArg.sensitiveConfigProduction,
      newArg.sensitiveConfigDevelopment,
      packageJSON,
    );
  }

  if (
    !newArg.redisConfigDevelopment ||
    await confirm("Would you like to modify the redis development configuration?")
  ) {
    newArg.redisConfigDevelopment = await redisConfigSetup(
      "development",
      newArg.redisConfigDevelopment,
      null,
      packageJSON,
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
      packageJSON,
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

  return newArg;
}
