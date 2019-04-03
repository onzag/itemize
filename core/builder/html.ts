import { escapeStringRegexp } from "../util";
import { checkExists } from "./util";
import * as colors from "colors/safe";

import * as fs from "fs";
import * as path from "path";
const fsAsync = fs.promises;

export async function buildHTML(rawConfig: any) {
  if (!await checkExists(path.join("dist", "data"))) {
    await fsAsync.mkdir(path.join("dist", "data"));
  }

  let baseHTML = await fsAsync.readFile(path.join("core", "client", "index.html"), "utf8");
  Object.keys(rawConfig).forEach((key) => {
    baseHTML = baseHTML.replace(
      new RegExp(escapeStringRegexp("%{" + key + "}"), "g"),
      Array.isArray(rawConfig[key]) ? rawConfig[key].join(",") : rawConfig[key],
    );
  });

  baseHTML = baseHTML.replace(
    new RegExp(escapeStringRegexp("%{BUILD_NUMBER}"), "g"),
    (new Date()).getTime().toString(),
  );

  const fileName = path.join("dist", "data", "index.html");
  console.log("emiting " + colors.green(fileName));
  await fsAsync.writeFile(fileName, baseHTML);
}
