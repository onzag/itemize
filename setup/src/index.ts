/**
 * This file generates some basic source so that the prokect works
 * out of the box
 */

import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import { confirm, fieldRequest } from "../read";
import path from "path";
import { IConfigRawJSONDataType } from "../../config";

/**
 * User preferences for this code
 */
interface IOptionsForProcessingCode {
  /**
   * use spaces
   */
  useSpaces: boolean,
  /**
   * if true which size these spaces should have
   */
  spacesSize: number,
  /**
   * And whether they want a next line on {
   */
  nextLineOnBrackets: boolean,
};

/**
 * This function copies an entire directory into the target
 * @param config the configuration we are working with
 * @param options the code options
 * @param sourcePath the path we are copying
 * @param targetPath the path we are targeting 
 */
async function copyAndProcessDirectoryLevelFor(
  config: IConfigRawJSONDataType,
  options: IOptionsForProcessingCode,
  sourcePath: string,
  targetPath: string,
) {
  // so now we get each file there
  const filesInDirectory = await fsAsync.readdir(sourcePath);

  // for every file in the directory
  await Promise.all(filesInDirectory.map(async (fileNameInDirectory) => {
    // let's get the path name
    const currentTotalFilePathName = path.join(sourcePath, fileNameInDirectory);

    // and let's check what type it is
    const stat = await fsAsync.lstat(currentTotalFilePathName);
    // if we have a directory
    if (stat.isDirectory()) {
      // build the folder for that directory
      await fsAsync.mkdir(path.join(targetPath, fileNameInDirectory));
  
      // and copy that directory level as well
      return copyAndProcessDirectoryLevelFor(
        config,
        options,
        currentTotalFilePathName,
        path.join(targetPath, fileNameInDirectory),
      );
    }

    // so we get the content of the file, for code and js files
    // we are asked to use utf8 encoding
    const readAsUtf8 = currentTotalFilePathName.endsWith(".code") ||
      currentTotalFilePathName.endsWith(".js");
    // and the final filename we are going to use, by default the same
    let finalFileName: string = fileNameInDirectory;
    // and the utf8 read content
    let utf8Content: string;

    // if we are reading as utf8
    if (readAsUtf8) {
      // and we can read such content
      utf8Content = await fsAsync.readFile(currentTotalFilePathName, "utf8");

      // now if we are using a code files
      if (currentTotalFilePathName.endsWith(".code")) {
        // we can apply these options to format the code
        if (options.nextLineOnBrackets) {
          // and keep replacing the utf8 content to match these options
          utf8Content = utf8Content.replace(/\<(\d+)\>\{/g, (match, digit) => {
            const digitInQuestion = parseInt(digit);
            let finalStr = "\n";
            if (options.useSpaces) {
              finalStr += " ".repeat(options.spacesSize * digitInQuestion)
            } else {
              finalStr += "\t".repeat(digitInQuestion);
            }
            finalStr += "{";
            return finalStr;
          });
        } else {
          utf8Content = utf8Content.replace(/\<(\d+)\>\{/g, " {");
        }

        // and we remove the code ending
        finalFileName = fileNameInDirectory.replace(".code", "");
      } else if (currentTotalFilePathName.endsWith(".js")) {
        // similar to js in the case of js we execute, we pass both config
        // and options inside the context
        utf8Content = Function("config", "options", utf8Content)(config, options);
        finalFileName = fileNameInDirectory.replace(".js", "");
      }

      // and if we use spaces
      if (options.useSpaces) {
        // our code always uses tabs
        utf8Content = utf8Content.replace(/\t/g, " ".repeat(options.spacesSize));
      }
    }

    // let's export the file in the directory
    const exportedFileName = path.join(targetPath, finalFileName);
    // and emit it
    console.log("emiting " + colors.green(exportedFileName));
    await (utf8Content ?
      fsAsync.writeFile(exportedFileName, utf8Content) :
      fsAsync.copyFile(currentTotalFilePathName, exportedFileName));
  }));
}

async function copyAllFilesFor(
  arg: ISetupConfigType,
  target: string,
  source: string,
  previousOptions: IOptionsForProcessingCode,
  onceDone?: () => Promise<void>,
) : Promise<IOptionsForProcessingCode> {
  let exists = true;
  try {
    await fsAsync.access(target, fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }
  
  let options: IOptionsForProcessingCode = previousOptions;
  if (!exists) {
    console.log(colors.yellow(`A ${target} folder hasn't been determined`));
    if (!options) {
      const useSpaces = await confirm("Would you like to use spaces instead of tabs?");
      let spacesSize = null;
      if (useSpaces) {
        spacesSize = await fieldRequest(
          "integer",
          "How many spaces?",
          "spaces",
          null,
          2,
          false,
          (v) => !isNaN(v),
        );
      }

      const nextLineOnBrackets = !(await confirm("Are you a `function() {` same line kind of gal/guy?"));

      options = {
        useSpaces,
        spacesSize,
        nextLineOnBrackets,
      };
    }
    await fsAsync.mkdir(target, {recursive: true});
    await copyAndProcessDirectoryLevelFor(
      arg.standardConfig,
      options,
      path.join(__dirname, "..", "..", "..", "setup", "src", source),
      target,
    );
    if (onceDone) {
      await onceDone();
    }
  }

  return options;
}
export default async function srcSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("SOURCE SETUP"));
  let options = await copyAllFilesFor(
    arg,
    "src",
    "ts-files",
    null,
  )
  options = await copyAllFilesFor(
    arg,
    path.dirname(arg.standardConfig.entry),
    "schema-files",
    options,
    async () => {
      if (
        !arg.standardConfig.entry.endsWith("/root") &&
        !arg.standardConfig.entry.endsWith("/root.json")
      ) {
        let newRootFileName = path.basename(arg.standardConfig.entry);
        if (!newRootFileName.endsWith(".json")) {
          newRootFileName += ".json";
        }
        const newPropertiesFileName = newRootFileName.replace(".json", ".properties");
        await fsAsync.rename(
          path.join(path.dirname(arg.standardConfig.entry), "root.json"),
          path.join(path.dirname(arg.standardConfig.entry), newRootFileName),
        );
        await fsAsync.rename(
          path.join(path.dirname(arg.standardConfig.entry), "root.properties"),
          path.join(path.dirname(arg.standardConfig.entry), newPropertiesFileName),
        );
      }
    }
  );
  await copyAllFilesFor(
    arg,
    "resources",
    "resource-files",
    options,
  )
  return arg;
}
