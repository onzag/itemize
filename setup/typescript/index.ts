import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import tsconfig from "./tsconfig";
import tslint from "./tslint";

export default async function typescriptSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("TYPESCRIPT SETUP"));

  let tsconfigExists = true;
  try {
    await fsAsync.access("tsconfig.json", fs.constants.F_OK);
  } catch (e) {
    tsconfigExists = false;
  }
  if (!tsconfigExists) {
    console.log("emiting " + colors.green("tsconfig.json"));
    await fsAsync.writeFile("tsconfig.json", JSON.stringify(tsconfig, null, 2));
  }

  let tslintExists = true;
  try {
    await fsAsync.access("tslint.json", fs.constants.F_OK);
  } catch (e) {
    tslintExists = false;
  }
  if (!tslintExists) {
    console.log("emiting " + colors.green("tslint.json"));
    await fsAsync.writeFile("tslint.json", JSON.stringify(tslint, null, 2));
  }
  return arg;
}
