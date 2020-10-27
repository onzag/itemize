/**
 * Setups itemize config for the project
 * @packageDocumentation
 */

import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import config from "./config";
import { confirm } from "../read";

/**
 * Runs the itemize config setup step that builds the itemize config
 * 
 * @param arg the setup arg
 * @returns the same arg
 */
export default async function itemizeConfigSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("ITEMIZE CONFIG SETUP"));

  // basically we just check for the file
  let exists = true;
  let content: string = null;
  try {
    content = await fsAsync.readFile("itemize.config.js", "utf-8");
  } catch (e) {
    exists = false;
  }

  // and if it doesn't exist we build it in
  if (!exists) {
    console.log("emiting " + colors.green("itemize.config.js"));
    await fsAsync.writeFile("itemize.config.js", config);
  } else if (content !== config)  {
    if (await confirm("Itemize config config is non-standard, would you like to emit the default?")) {
      console.log("emiting " + colors.green("itemize.config.js"));
      await fsAsync.writeFile("itemize.config.js", config);
      await fsAsync.writeFile("itemize.config.old.js", content);
    }
  }

  // return the same arg
  return arg;
}
