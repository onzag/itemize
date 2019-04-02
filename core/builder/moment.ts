import * as fs from "fs";
import * as path from "path";
import * as colors from "colors/safe";

const fsAsync = fs.promises;

export async function copyMomentFiles(
  supportedLanguages: string[],
) {
  await Promise.all(supportedLanguages.map((lang) => {
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
