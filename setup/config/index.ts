import colors from "colors";
import { ISetupConfigType } from "..";
import { standardConfigSetup } from "./standard";
import { confirm } from "../read";
import { sensitiveConfigSetup } from "./sensitive";
import { redisConfigSetup } from "./redis";
import { dbConfigSetup } from "./db";

export default async function configSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("CONFIGURATION SETUP"));

  const newArg: ISetupConfigType = {
    ...arg,
  }

  if (
    newArg.standardConfig &&
    newArg.sensitiveConfigDevelopment &&
    newArg.sensitiveConfigStaging &&
    newArg.sensitiveConfigProduction &&
    newArg.redisConfigDevelopment &&
    newArg.redisConfigProduction &&
    newArg.redisConfigStaging &&
    newArg.dbConfigDevelopment &&
    newArg.dbConfigProduction &&
    newArg.dbConfigStaging &&
    !(await confirm("Would you like to setup the configuration files?"))
  ) {
    return arg;
  }

  if (
    !newArg.standardConfig ||
    await confirm("Would you like to modify the standard configuration?")
  ) {
    console.log(colors.yellow("Could not find standard configuration file"));
    newArg.standardConfig = await standardConfigSetup(newArg.standardConfig);
  }

  if (
    !newArg.sensitiveConfigDevelopment ||
    await confirm("Would you like to modify the sensitive development configuration?")
  ) {
    newArg.sensitiveConfigDevelopment = await sensitiveConfigSetup(
      "development",
      newArg.sensitiveConfigDevelopment,
      null,
    );
  }

  if (
    !newArg.sensitiveConfigStaging ||
    await confirm("Would you like to modify the sensitive staging configuration?")
  ) {
    newArg.sensitiveConfigStaging = await sensitiveConfigSetup(
      "staging",
      newArg.sensitiveConfigStaging,
      newArg.sensitiveConfigDevelopment,
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
    );
  }

  if (
    !newArg.redisConfigStaging ||
    await confirm("Would you like to modify the redis staging configuration?")
  ) {
    newArg.redisConfigStaging = await redisConfigSetup(
      "staging",
      newArg.redisConfigStaging,
      newArg.redisConfigDevelopment,
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
    );
  }

  if (
    !newArg.dbConfigStaging ||
    await confirm("Would you like to modify the posrgreSQL staging configuration?")
  ) {
    newArg.dbConfigStaging = await dbConfigSetup(
      "staging",
      newArg.dbConfigStaging,
      newArg.dbConfigDevelopment,
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
    );
  }

  return newArg;
}
