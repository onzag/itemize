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
import { confirm } from "../read";

/**
 * runs the typescript setup part
 * @param arg the setup arg
 * @returns the same arg
 */
export default async function typescriptSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("TYPESCRIPT SETUP"));

  // first we need to ensure our tsconfig.json file
  let tsconfigExists = true;
  let tsconfigContent: string = null;
  try {
    tsconfigContent = await fsAsync.readFile("tsconfig.json", "utf-8");
  } catch (e) {
    tsconfigExists = false;
  }
  // if it doesn't exist we use the value from our tsconfig.ts source
  const newContent = JSON.stringify(tsconfig, null, 2);
  if (!tsconfigExists) {
    console.log("emiting " + colors.green("tsconfig.json"));
    await fsAsync.writeFile("tsconfig.json", newContent);
  } else if (tsconfigContent !== newContent) {
    if (await confirm("tsconfig is non-standard, would you like to emit the default?")) {
      console.log("emiting " + colors.green("tsconfig.json"));
      await fsAsync.writeFile("tsconfig.json", newContent);
      await fsAsync.writeFile("tsconfig.old.json", tsconfigContent);
    }
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
