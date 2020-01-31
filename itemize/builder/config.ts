/**
 * Doesn't do much other than save and store the config file for
 * dist purposes
 *
 * @packageDocumentation
 */

import colors from "colors/safe";

import fs from "fs";
import path from "path";
import { IConfigRawJSONDataType } from "../config";
const fsAsync = fs.promises;

/**
 * Stores the config file in the dist
 * directory
 * @param rawConfig the config as parsed
 */
export async function buildConfig(rawConfig: IConfigRawJSONDataType) {
  const fileName = path.join("dist", "config.json");
  console.log("emiting " + colors.green(fileName));

  await fsAsync.writeFile(fileName, JSON.stringify(rawConfig));
}
