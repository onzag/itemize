/**
 * This file copies the necessary moment files that are used for data displaying
 * in all the different languages that are meant to be supported
 *
 * @module
 */

import fs from "fs";
import path from "path";
import colors from "colors/safe";
import { IBuilderBasicConfigType } from "./config";
const fsAsync = fs.promises;

/**
 * Copies the compiled moment files that exist within the node_modules
 * for async usage as they are deemed necessary on the fly
 * @param rawConfig the raw configuration
 * @returns a void promise
 */
export async function copyMomentFiles(
  rawConfig: IBuilderBasicConfigType,
) {
  await Promise.all(rawConfig.standard.supportedLanguages.map(async (lang) => {
    if (lang === "en") {
      return;
    }
    const outputFile = path.join("dist", "data", lang + ".moment.js");
    console.log("emiting " + colors.green(outputFile));
    try {
      await fsAsync.copyFile(
        path.join("node_modules", "moment", "locale", lang.toLowerCase() + ".js"),
        outputFile,
      );
    } catch {
      await fsAsync.copyFile(
        path.join("node_modules", "itemize", "node_modules", "moment", "locale", lang.toLowerCase() + ".js"),
        outputFile,
      );
    }
  }));
}
