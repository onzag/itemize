/**
 * Setup step to take care of git configuration
 * @packageDocumentation
 */

import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import ignores from "./ignores";
import { confirm } from "../read";

/**
 * Will simply setup git
 * @param arg the setup arg
 * @returns the same arg
 */
export default async function gitSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("GIT SETUP"));

  // we write both gitignore if it doesn't exist
  let exists = true;
  let content: string = null;
  try {
    content = await fsAsync.readFile(".gitignore", "utf-8");
  } catch (e) {
    exists = false;
  }
  if (!exists) {
    console.log("emiting " + colors.green(".gitignore"));
    await fsAsync.writeFile(".gitignore", ignores.join("\n"));
  } else if (content !== ignores.join("\n")) {
    if (await confirm("gitignore file is non-standard, would you like to emit the default?")) {
      console.log("emiting " + colors.green(".gitignore"));
      await fsAsync.writeFile(".gitignore", ignores.join("\n"));
      await fsAsync.writeFile(".gitignore.old", content);
    }
  }

  // retun the same arg
  return arg;
}
