/**
 * Setups esbuild for the project
 * @module
 */

import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import config from "./config";
import { confirm } from "../read";

/**
 * Runs the esbuild setup step that builds the esbuild config
 * 
 * @param arg the setup arg
 * @returns the same arg
 */
export default async function esbuildSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("ESBUILD SETUP"));

  // basically we just check for the file
  let exists = true;
  let content: string = null;
  try {
    content = await fsAsync.readFile("esbuild.js", "utf-8");
  } catch (e) {
    exists = false;
  }

  // and if it doesn't exist we build it in
  if (!exists) {
    console.log("emiting " + colors.green("esbuild.js"));
    await fsAsync.writeFile("esbuild.js", config);
  } else if (content !== config) {
    if (await confirm("Esbuild config is non-standard, would you like to emit the default?")) {
      console.log("emiting " + colors.green("esbuild.js"));
      await fsAsync.writeFile("esbuild.js", config);
      await fsAsync.writeFile("esbuild.old.js", content);
    }
  }

  // return the same arg
  return arg;
}
