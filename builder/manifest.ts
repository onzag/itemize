/**
 * This file generates the manifest files based on the config and the root
 *
 * @module
 */

import fs from "fs";
import path from "path";
import colors from "colors/safe";
import { IBuilderBasicConfigType } from "./config";
import { IRootRawJSONDataType } from "../base/Root";
const fsAsync = fs.promises;

/**
 * Builds the different manifest files that are necessary
 * @param rawConfig the raw configuration
 * @param rawRoot the root in raw form
 * @returns a void promise
 */
export async function buildManifest(
  rawConfig: IBuilderBasicConfigType,
  rawRoot: IRootRawJSONDataType,
) {
  await Promise.all(rawConfig.standard.supportedLanguages.map(async (lang) => {
    const outputFile = path.join("dist", "data", "manifest." + lang + ".json");
    console.log("emiting " + colors.green(outputFile));

    const manifest = {
      lang,
      dir: rawConfig.standard.rtlLanguages.includes(lang) ? "rtl" : "ltr",
      name: rawRoot.i18nData[lang].app_name,
      description: rawRoot.i18nData[lang].app_description,
      short_name: rawRoot.i18nData[lang].app_short_name,
      icons: [{
        src: "/rest/resource/icons/android-chrome-64x64.png",
        sizes: "64x64",
        type: "image/png",
      }, {
        src: "/rest/resource/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      }, {
        src: "/rest/resource/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      }],
      scope: "/",
      start_url: "/" + lang,
      display: rawConfig.standard.manifest.display,
      orientation: rawConfig.standard.manifest.orientation,
      theme_color: rawConfig.standard.manifest.themeColor,
      background_color: rawConfig.standard.manifest.backgroundColor,
    }

    await fsAsync.writeFile(outputFile, JSON.stringify(manifest));
  }));
}
