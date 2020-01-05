import { escapeStringRegexp } from "../util";
import { checkExists } from "./util";
import colors from "colors/safe";
import htmlMinifier from "html-minifier";

import fs from "fs";
import path from "path";
const fsAsync = fs.promises;

function replaceHTMLKeys(html: string, obj: any, prefix: string): string {
  let newHTML = html;
  Object.keys(obj).forEach((key) => {
    if (Array.isArray(obj[key]) || typeof obj[key] !== "object" || obj[key] === null) {
      newHTML = newHTML.replace(
        new RegExp(escapeStringRegexp("%{" + prefix + key + "}"), "g"),
        Array.isArray(obj[key]) ? obj[key].join(",") : obj[key],
      );
    } else {
      newHTML = replaceHTMLKeys(newHTML, obj[key], prefix + key + ".");
    }
  });
  return newHTML;
}

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
  const buildNumber = (new Date()).getTime().toString();
  baseHTML = replaceHTMLKeys(baseHTML, {
    ...rawConfig,
    BUILD_NUMBER: buildNumber,
  }, "");

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

  const buildNumberFileName = path.join("dist", "buildnumber");
  console.log("emiting " + colors.green(buildNumberFileName));
  await fsAsync.writeFile(buildNumberFileName, buildNumber.toString());
}
