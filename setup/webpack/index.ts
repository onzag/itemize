/**
 * Setups webpack for the project
 * @module
 */

import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import config from "./config";
import { confirm } from "../read";

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
  let content: string = null;
  try {
    content = await fsAsync.readFile("webpack.config.js", "utf-8");
  } catch (e) {
    exists = false;
  }

  // and if it doesn't exist we build it in
  if (!exists) {
    console.log("emiting " + colors.green("webpack.config.js"));
    await fsAsync.writeFile("webpack.config.js", config);
  } else if (content !== config)  {
    if (await confirm("Webpack config is non-standard, would you like to emit the default?")) {
      console.log("emiting " + colors.green("webpack.config.js"));
      await fsAsync.writeFile("webpack.config.js", config);
      await fsAsync.writeFile("webpack.config.old.js", content);
    }
  }

  // return the same arg
  return arg;
}
