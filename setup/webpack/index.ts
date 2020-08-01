/**
 * Setups webpack for the project
 * @packageDocumentation
 */

import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import config from "./config";

/**
 * Runs the webpack setup step that builds the webpack config
 * 
 * @param arg the setup arg
 * @returns the same arg
 */
export default async function webpackSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("WEBPACK SETUP"));

  // basically we just check for the file
  let exists = true;
  try {
    await fsAsync.access("webpack.config.js", fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }

  // and if it doesn't exist we build it in
  if (!exists) {
    console.log("emiting " + colors.green("webpack.config.js"));
    await fsAsync.writeFile("webpack.config.js", config);
  }

  // return the same arg
  return arg;
}
