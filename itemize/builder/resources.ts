import fs from "fs";
import path from "path";
import colors from "colors/safe";
import htmlMinifier from "html-minifier";
import Svgo from "svgo";
import { checkExists } from "./util";
const svgo = new Svgo();
const fsAsync = fs.promises;

const REQUIRED_RESOURCES = [
  "image-fail.svg",
  "icons/android-chrome-64x64.png",
  "icons/android-chrome-192x192.png",
  "icons/android-chrome-512x512.png",
  "icons/apple-touch-icon-no-transparency-180x180.png",
  "icons/favicon.ico",
  "icons/favicon-16x16.png",
  "icons/favicon-32x32.png",
  "icons/mstile-square-70x70.png",
  "icons/mstile-square-150x150.png",
  "icons/mstile-square-70x70.png",
  "icons/mstile-wide-310x150.png",
  "icons/mstile-square-310x310.png",
  "icons/macos-safari-monochrome-icon.svg",
];

async function copyOneDirectoryLevel(pathname: string, constructedPath: string) {
  const filesInDirectory = await fsAsync.readdir(pathname);

  if (!await checkExists(path.join("dist", "uploads"))) {
    await fsAsync.mkdir(path.join("dist", "uploads"));
  }

  await Promise.all(filesInDirectory.map(async (fileNameInDirectory) => {
    const currentTotalFilePathName = path.join(pathname, fileNameInDirectory);

    const stat = await fsAsync.lstat(currentTotalFilePathName);
    if (stat.isDirectory()) {
      if (!await checkExists(path.join("dist", "data", constructedPath, fileNameInDirectory))) {
        await fsAsync.mkdir(path.join("dist", "data", constructedPath, fileNameInDirectory));
      }
      return copyOneDirectoryLevel(
        currentTotalFilePathName,
        path.join(constructedPath, fileNameInDirectory),
      );
    }

    const content = await fsAsync.readFile(currentTotalFilePathName, "utf8");

    let minified: string;
    let optimizer: string = "NONE";
    if (fileNameInDirectory.endsWith(".json")) {
      try {
        minified = JSON.stringify(JSON.parse(content));
        optimizer = "JSON PARSE/STRINGIFY";
      } catch (err) {
        console.log("failed to JSON minify " + colors.red(currentTotalFilePathName));
      }
    } else if (fileNameInDirectory.endsWith(".html")) {
      try {
        minified = htmlMinifier.minify(
          content,
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
      try {
        minified = (await svgo.optimize(content)).data;
        optimizer = "SVGO";
      } catch (err) {
        console.log("failed to SVG minify " + colors.red(currentTotalFilePathName));
      }
    } else {
      minified = content;
    }
    const exportedFileName = path.join("dist", "data", constructedPath, fileNameInDirectory);
    console.log("emiting " + colors.green(exportedFileName) + " OPTIMIZER: " + colors.yellow(optimizer));
    await fsAsync.writeFile(exportedFileName, minified);
  }));
}

export async function buildResources(rawConfig: any) {
  if (!await checkExists(path.join("dist", "data"))) {
    await fsAsync.mkdir(path.join("dist", "data"));
  }
  await Promise.all(REQUIRED_RESOURCES.map(async (requiredResource) => {
    if (!await checkExists(path.join("resources", requiredResource))) {
      console.log("Missing resource file: " + colors.red(requiredResource));
    }
  }));
  return copyOneDirectoryLevel("resources", "");
}
