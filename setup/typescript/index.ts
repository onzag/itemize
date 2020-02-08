import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import tsconfig from "./tsconfig";
import tslint from "./tslint";

export default async function githubSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("GITHUB SETUP"));

  let exists = true;
  try {
    await fsAsync.access("tsconfig.json", fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }
  if (!exists) {
    console.log("emiting " + colors.green("tsconfig.json"));
    await fsAsync.writeFile("tsconfig.json", JSON.stringify(tsconfig));
  }

  exists = true;
  try {
    await fsAsync.access("tslint.json", fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }
  if (!exists) {
    console.log("emiting " + colors.green("tslint.json"));
    await fsAsync.writeFile("tslint.json", JSON.stringify(tslint));
  }
  return arg;
}
