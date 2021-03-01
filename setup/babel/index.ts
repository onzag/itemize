/**
 * Babel RC configurator
 * 
 * @module
 */

import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import rc from "./rc";
import { confirm } from "../read";

/**
 * Runs the babel setup step
 * @param arg the setup configuration information
 */
export default async function babelSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("BABEL SETUP"));

  let exists = true;
  let content: string = null;
  try {
    content = await fsAsync.readFile("babel.config.json", "utf-8");
  } catch (e) {
    exists = false;
  }

  const newContent = JSON.stringify(rc, null, 2);

  // we basically add babel.config.json if it doesn't exist
  if (!exists) {
    console.log("emiting " + colors.green("babel.config.json"));
    await fsAsync.writeFile("babel.config.json", newContent);
  } else if (content !== newContent) {
    if (await confirm("babel config file is non-standard, would you like to emit the default?")) {
      console.log("emiting " + colors.green("babel.config.json"));
      await fsAsync.writeFile("babel.config.json", newContent);
      await fsAsync.writeFile("babel.config.old.json", content);
    }
  }

  // return what we did to the config, nothing
  return arg;
}
