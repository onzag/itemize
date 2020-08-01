/**
 * Setups typescript and the tsc compiler
 * @packageDocumentation
 */

import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import tsconfig from "./tsconfig";
import tslint from "./tslint";

/**
 * runs the typescript setup part
 * @param arg the setup arg
 * @returns the same arg
 */
export default async function typescriptSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("TYPESCRIPT SETUP"));

  // first we need to ensure our tsconfig.json file
  let tsconfigExists = true;
  try {
    await fsAsync.access("tsconfig.json", fs.constants.F_OK);
  } catch (e) {
    tsconfigExists = false;
  }
  // if it doesn't exist we use the value from our tsconfig.ts source
  if (!tsconfigExists) {
    console.log("emiting " + colors.green("tsconfig.json"));
    await fsAsync.writeFile("tsconfig.json", JSON.stringify(tsconfig, null, 2));
  }

  // same for tslint
  let tslintExists = true;
  try {
    await fsAsync.access("tslint.json", fs.constants.F_OK);
  } catch (e) {
    tslintExists = false;
  }

  // an we emit such
  if (!tslintExists) {
    console.log("emiting " + colors.green("tslint.json"));
    await fsAsync.writeFile("tslint.json", JSON.stringify(tslint, null, 2));
  }

  // return the same arg, unmodified
  return arg;
}
