/**
 * Setup step to take care of git configuration
 * @packageDocumentation
 */

import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import ignores from "./ignores";

/**
 * Will simply setup git
 * @param arg the setup arg
 * @returns the same arg
 */
export default async function gitSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("GIT SETUP"));

  // we write both gitignore if it doesn't exist
  let exists = true;
  try {
    await fsAsync.access(".gitignore", fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }
  if (!exists) {
    console.log("emiting " + colors.green(".gitignore"));
    await fsAsync.writeFile(".gitignore", ignores.join("\n"));
  }

  // retun the same arg
  return arg;
}
