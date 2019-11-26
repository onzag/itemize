import colors from "colors/safe";

import fs from "fs";
import path from "path";
const fsAsync = fs.promises;

export async function buildConfig(rawConfig: any) {
  const fileName = path.join("dist", "config.json");
  console.log("emiting " + colors.green(fileName));

  await fsAsync.writeFile(fileName, JSON.stringify(rawConfig));
}
