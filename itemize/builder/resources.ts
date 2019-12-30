import fs from "fs";
import path from "path";
import colors from "colors/safe";
import htmlMinifier from "html-minifier";
import Svgo from "svgo";
import { checkExists } from "./util";
const svgo = new Svgo();
const fsAsync = fs.promises;

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
  return copyOneDirectoryLevel("resources", "");
}
