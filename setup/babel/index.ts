/**
 * Babel RC configurator
 * 
 * @packageDocumentation
 */

import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import rc from "./rc";

/**
 * Runs the babel setup step
 * @param arg the setup configuration information
 */
export default async function babelSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("BABEL SETUP"));

  let exists = true;
  try {
    await fsAsync.access("babel.config.json", fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }

  // we basically add babel.config.json if it doesn't exist
  if (!exists) {
    console.log("emiting " + colors.green("babel.config.json"));
    await fsAsync.writeFile("babel.config.json", JSON.stringify(rc, null, 2));
  }

  // return what we did to the config, nothing
  return arg;
}
