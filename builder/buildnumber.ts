/**
 * Builds the builnumber file
 *
 * @packageDocumentation
 */

import fs from "fs";
import path from "path";
import { IBuilderBasicConfigType } from "./config";
import colors from "colors";
const fsAsync = fs.promises;

/**
 * Creates the buildnumber file
 * @param rawConfig the configuration that is being used
 */
export async function buildBuildNumber(rawConfig: IBuilderBasicConfigType) {
  // emit the build number file
  const buildNumberFileName = path.join("dist", "buildnumber");
  console.log("emiting " + colors.green(buildNumberFileName));
  await fsAsync.writeFile(buildNumberFileName, rawConfig.buildnumber.toString());
}
