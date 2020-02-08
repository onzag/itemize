import colors from "colors";
import { ISetupConfigType } from "..";
import { standardConfigSetup } from "./standard";
import { confirm } from "../read";

export default async function configSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  const newArg: ISetupConfigType = {
    ...arg,
  }
  if (
    !newArg.standardConfig ||
    await confirm("Would you like to modify the standard configuration?")
  ) {
    console.log(colors.yellow("Could not find standard configuration file"));
    newArg.standardConfig = await standardConfigSetup(newArg.standardConfig);
  }

  return newArg;
}
