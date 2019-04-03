import * as colors from "colors/safe";

import * as fs from "fs";
import * as path from "path";
const fsAsync = fs.promises;

export async function buildConfig(rawConfig: any) {
  const extraData = JSON.parse(await fsAsync.readFile(
    path.join("config", "index.json"),
    "utf8",
  ));

  const fileName = path.join("dist", "config.json");
  console.log("emiting " + colors.green(fileName));

  await fsAsync.writeFile(fileName, JSON.stringify({
    ...rawConfig,
    ...extraData,
  }));
}
