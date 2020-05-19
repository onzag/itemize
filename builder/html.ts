/**
 * Builds the HTML file that is used as the index entry for the itemize
 * application
 *
 * @packageDocumentation
 */

import { escapeStringRegexp } from "../util";
import colors from "colors/safe";
import htmlMinifier from "html-minifier";

import fs from "fs";
import path from "path";
import { IBuilderBasicConfigType } from "./config";
const fsAsync = fs.promises;

/**
 * Replaces html keys that exist as some sort of template from the html
 * file in order to create the final output for the html
 * @param html the html in question
 * @param obj the object that is used to replace keys from (normally this is the config)
 * @param prefix the prefix to expect things prefixed as, this is for complex types eg. key.key...
 * @returns a string that represents the built html
 */
function replaceHTMLKeys(html: string, obj: any, prefix: string): string {
  // so we make the new html
  let newHTML = html;
  // and loop per key
  Object.keys(obj).forEach((key) => {
    // if we have an array, not an object, or null
    if (typeof obj[key] !== "object" || obj[key] === null) {
      // then we replace that for the value using our prefix
      newHTML = newHTML.replace(
        new RegExp(escapeStringRegexp("%{" + prefix + key + "}"), "g"),
        // for null we want empty string
        obj[key] === null ? "" : obj[key].toString(),
      );
    } else {
      // then we replace that for the value using our prefix
      newHTML = newHTML.replace(
        new RegExp(escapeStringRegexp("\"%{" + prefix + key + "}\""), "g"),
        JSON.stringify(obj[key]),
      );

      if (!Array.isArray(obj[key])) {
        // otherwise we just prefix from the prefix and the key to recurse inside
        newHTML = replaceHTMLKeys(newHTML, obj[key], prefix + key + ".");
      }
    }
  });
  // return it
  return newHTML;
}

/**
 * Builds and stores the html file in the dist directory from the source
 * for the itemize app, this file also makes for the buildnumber as the buildnumber
 * is synchronized within the html file
 * @param rawConfig the configuration that is being used
 */
export async function buildHTML(rawConfig: IBuilderBasicConfigType) {
  // the base html as we read it from either node_modules or an itemize folder
  let baseHTML: string =
    await fsAsync.readFile(path.join("node_modules", "@onzag", "itemize", "client", "internal", "index.html"), "utf8");

  // we need to make a build number
  baseHTML = replaceHTMLKeys(baseHTML, {
    ...rawConfig.standard,
    BUILD_NUMBER: rawConfig.buildnumber.toString(),
  }, "");

  // and we minify the html
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

  // emit the html file
  const fileName = path.join("dist", "data", "index.html");
  console.log("emiting " + colors.green(fileName), "BUILD_NUMBER:", colors.yellow(rawConfig.buildnumber.toString()));
  await fsAsync.writeFile(fileName, baseHTML);
}
