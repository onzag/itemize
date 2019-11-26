import fs from "fs";
import path from "path";
import colors from "colors/safe";

const fsAsync = fs.promises;

export async function copyMomentFiles(
  rawConfig: {supportedLanguages: string[]},
) {
  await Promise.all(rawConfig.supportedLanguages.map((lang) => {
    if (lang === "en") {
      return;
    }
    const outputFile = path.join("dist", "data", lang + ".moment.js");
    console.log("emiting " + colors.green(outputFile));
    return fsAsync.copyFile(
      path.join("node_modules", "moment", "locale", lang.toLowerCase() + ".js"),
      outputFile,
    );
  }));
}
