/**
 * Builds and requests the necessary resources either the required
 * ones as well as whatever else the programmer adds and it even optimizes
 * these by running some optimizers
 *
 * @module
 */

import fs from "fs";
import path from "path";
import colors from "colors/safe";
import htmlMinifier from "html-minifier";
import Svgo from "svgo";
import { checkExists } from "./util";
import { IBuilderBasicConfigType } from "./config";
const svgo = new Svgo();
const fsAsync = fs.promises;

/**
 * These are the required resources in order
 * to create a proper manifest file
 */
const REQUIRED_RESOURCES = [
  /**
   * Image that shows when an image has failed to load due to no internet
   * Do not use transparency, make it so that it can fit any dimension
   */
  "image-fail.svg",
  /**
   * Icon for the chrome installable app 64x64
   * Allows transparency, android icons are free
   */
  "icons/android-chrome-64x64.png",
  /**
   * Icon for the chrome installable app 192x192
   * Allows transparency, android icons are free
   */
  "icons/android-chrome-192x192.png",
  /**
   * Icon for the chrome installable app 512x512
   * Allows transparency, android icons are free
   */
  "icons/android-chrome-512x512.png",
  /**
   * Apple touch icon without transparency, make it white or black
   * Do not allow transparency, the entire icon should have no alpha
   */
  "icons/apple-touch-icon-no-transparency-180x180.png",
  /**
   * The favicon icon
   * Allows transparency
   */
  "icons/favicon.ico",
  /**
   * The favicon as png in 16x16 form
   * Allows transparency
   */
  "icons/favicon-16x16.png",
  /**
   * The favicon as png in 32x32 form
   * Allows transparency
   */
  "icons/favicon-32x32.png",
  /**
   * The metro microsoft edge tile in 70x70 form
   * allow transparency, the color of the background of the tile
   * is setup in the manifest config
   */
  "icons/mstile-square-70x70.png",
  /**
   * The metro microsoft edge tile in 150x150 form
   * allow transparency, the color of the background of the tile
   * is setup in the manifest config
   */
  "icons/mstile-square-150x150.png",
  /**
   * The metro microsoft edge tile in 310x150 form
   * allow transparency, the color of the background of the tile
   * is setup in the manifest config
   */
  "icons/mstile-wide-310x150.png",
  /**
   * The metro microsoft edge icon tile in 310x310 form
   * allow transparency, the color of the background of the tile
   * is setup in the manifest config
   */
  "icons/mstile-square-310x310.png",
  /**
   * A monochrome, black and white icon, for use in the safari app where
   * safari choses its color
   */
  "icons/macos-safari-monochrome-icon.svg",
];

/**
 * Required resources which require localization in some form
 */
const REQUIRED_LOCALIZED_RESOURCES: string[] = [
  // "privacy-policy/$.html",
  // "terms-and-conditions/$.html",
  // "contact/$.html",
];

/**
 * Given a path copies the entire directory level file by file and stores
 * the content into the constructed path inside the data directory
 * @param pathname the path name to copy
 * @param constructedPath the constructed path that has been built
 */
async function copyOneDirectoryLevel(pathname: string, constructedPath: string) {
  const filesInDirectory = await fsAsync.readdir(pathname);

  // for every file in the directory
  await Promise.all(filesInDirectory.map(async (fileNameInDirectory) => {
    // let's get the path name
    const currentTotalFilePathName = path.join(pathname, fileNameInDirectory);

    // and let's check what type it is
    const stat = await fsAsync.lstat(currentTotalFilePathName);
    // if we have a directory
    if (stat.isDirectory()) {
      // build the folder for that directory
      if (!await checkExists(path.join(constructedPath, fileNameInDirectory))) {
        await fsAsync.mkdir(path.join(constructedPath, fileNameInDirectory));
      }
      // and copy that directory level as well
      return copyOneDirectoryLevel(
        currentTotalFilePathName,
        path.join(constructedPath, fileNameInDirectory),
      );
    }

    // and we check if we can optimize it
    let minified: string;
    let optimizer: string = "NONE";
    // if we have a json file
    if (fileNameInDirectory.endsWith(".json")) {
      // we use this trick
      try {
        minified = JSON.stringify(JSON.parse(await fsAsync.readFile(currentTotalFilePathName, "utf8")));
        optimizer = "JSON PARSE/STRINGIFY";
      } catch (err) {
        console.log("failed to JSON minify " + colors.red(currentTotalFilePathName));
      }
    } else if (fileNameInDirectory.endsWith(".html")) {
      // for an html file we use the html minifier
      try {
        minified = htmlMinifier.minify(
          await fsAsync.readFile(currentTotalFilePathName, "utf8"),
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
        optimizer = "HTML Minified";
      } catch (err) {
        console.log("failed to HTML minify " + colors.red(currentTotalFilePathName));
      }
    } else if (fileNameInDirectory.endsWith(".svg")) {
      // for svg images we use svgo
      try {
        minified = (await svgo.optimize(await fsAsync.readFile(currentTotalFilePathName, "utf8"))).data;
        optimizer = "SVGO";
      } catch (err) {
        console.log("failed to SVG minify " + colors.red(currentTotalFilePathName));
      }
    }
    // let's export the file in the directory
    const exportedFileName = path.join(constructedPath, fileNameInDirectory);
    // and emit it
    console.log("emiting " + colors.green(exportedFileName) + " OPTIMIZER: " + colors.yellow(optimizer));
    await (
      minified ?
      fsAsync.writeFile(exportedFileName, minified) :
      fsAsync.copyFile(currentTotalFilePathName, exportedFileName)
    );
  }));
}

/**
 * Builds all the resources in the resources directory and optimizes if
 * possible
 * @param rawConfig the raw config
 * @returns a void promise
 */
export async function buildResources(rawConfig: IBuilderBasicConfigType) {
  const actualRequiredResources = REQUIRED_RESOURCES;
  REQUIRED_LOCALIZED_RESOURCES.forEach((rr) => {
    rawConfig.standard.supportedLanguages.forEach((sl) => {
      actualRequiredResources.push(rr.replace("$", sl));
    });
  });

  // now let's check for the required resources to see if they are there
  await Promise.all(actualRequiredResources.map(async (requiredResource) => {
    if (!await checkExists(path.join("resources", requiredResource))) {
      console.log("Missing resource file: " + colors.red(requiredResource));
    }
  }));
  return copyOneDirectoryLevel("resources", path.join("dist", "data"));
}
