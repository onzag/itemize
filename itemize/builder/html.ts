import { escapeStringRegexp } from "../util";
import { checkExists } from "./util";
import colors from "colors/safe";
import htmlMinifier from "html-minifier";

import fs from "fs";
import path from "path";
const fsAsync = fs.promises;

export async function buildHTML(rawConfig: any) {
  if (!await checkExists(path.join("dist", "data"))) {
    await fsAsync.mkdir(path.join("dist", "data"));
  }

  let baseHTML: string;
  try {
    baseHTML = await fsAsync.readFile(path.join("itemize", "client", "internal", "index.html"), "utf8");
  } catch (err) {
    baseHTML = await fsAsync.readFile(path.join("node_modules", "itemize", "client", "internal", "index.html"), "utf8");
  }
  Object.keys(rawConfig).forEach((key) => {
    baseHTML = baseHTML.replace(
      new RegExp(escapeStringRegexp("%{" + key + "}"), "g"),
      Array.isArray(rawConfig[key]) ? rawConfig[key].join(",") : rawConfig[key],
    );
  });

  const buildNumber = (new Date()).getTime().toString();
  baseHTML = baseHTML.replace(
    new RegExp(escapeStringRegexp("%{BUILD_NUMBER}"), "g"),
    buildNumber,
  );

  baseHTML = htmlMinifier.minify(
    baseHTML,
    {
      collapseBooleanAttributes: true,
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
    },
  );

  const fileName = path.join("dist", "data", "index.html");
  console.log("emiting " + colors.green(fileName), "BUILD_NUMBER:", colors.yellow(buildNumber));
  await fsAsync.writeFile(fileName, baseHTML);
}
