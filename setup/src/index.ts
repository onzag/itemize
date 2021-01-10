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
): Promise<IOptionsForProcessingCode> {
  // so now we get each file there
  const filesInDirectory = await fsAsync.readdir(sourcePath);

  let currentOptions = options;

  // for every file in the directory
  for (const fileNameInDirectory of filesInDirectory) {
    // let's get the path name
    const currentTotalFilePathName = path.join(sourcePath, fileNameInDirectory);

    // and let's check what type it is
    const stat = await fsAsync.lstat(currentTotalFilePathName);
    // if we have a directory
    if (stat.isDirectory()) {
      currentOptions = await copyAllFilesFor(
        config,
        path.join(targetPath, fileNameInDirectory),
        currentTotalFilePathName,
        currentOptions,
        null,
      );
      continue;
    }

    // so we get the content of the file, for code and js files
    // we are asked to use utf8 encoding
    const readAsUtf8 = currentTotalFilePathName.endsWith(".code") ||
      currentTotalFilePathName.endsWith(".js");
    // and the final filename we are going to use, by default the same
    let finalFileName: string = fileNameInDirectory;
    if (readAsUtf8) {
      if (fileNameInDirectory.endsWith(".js.code")) {
        finalFileName = fileNameInDirectory.replace(/\.code$/, "");
      } else {
        finalFileName = fileNameInDirectory.replace(/\.code$/, "").replace(/\.js$/, "");
      }
    }
  
    // and the utf8 read content
    let content: string | Buffer = null;
    let currentTargetContent: string | Buffer = null;

    // let's export the file in the directory
    const exportedFileName = path.join(targetPath, finalFileName);

    // if we are reading as utf8
    if (readAsUtf8) {
      // and we can read such content
      content = await fsAsync.readFile(currentTotalFilePathName, "utf8");

      // now if we are using a code files
      if (currentTotalFilePathName.endsWith(".code")) {

        if (!currentOptions) {
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
    
          currentOptions = {
            useSpaces,
            spacesSize,
            nextLineOnBrackets,
          };
        }

        // we can apply these options to format the code
        if (currentOptions.nextLineOnBrackets) {
          // and keep replacing the utf8 content to match these options
          content = content.replace(/\<(\d+)\>\{/g, (match, digit) => {
            const digitInQuestion = parseInt(digit);
            let finalStr = "\n";
            if (currentOptions.useSpaces) {
              finalStr += " ".repeat(currentOptions.spacesSize * digitInQuestion)
            } else {
              finalStr += "\t".repeat(digitInQuestion);
            }
            finalStr += "{";
            return finalStr;
          });
        } else {
          content = content.replace(/\<(\d+)\>\{/g, " {");
        }
      } else if (currentTotalFilePathName.endsWith(".js")) {
        // similar to js in the case of js we execute, we pass both config
        // and options inside the context
        content = Function("config", "options", content)(config, options);
      }

      // and if we use spaces
      if (currentOptions.useSpaces) {
        // our code always uses tabs
        content = (content as string).replace(/\t/g, " ".repeat(currentOptions.spacesSize));
      }

      try {
        currentTargetContent = await fsAsync.readFile(exportedFileName, "utf-8");
      } catch (err) {
      }
    } else {
      content = await fsAsync.readFile(currentTotalFilePathName);
      try {
        currentTargetContent = await fsAsync.readFile(exportedFileName);
      } catch (err) {
      }
    }

    let isContentEquals: boolean;
    if (!currentTargetContent) {
      isContentEquals = false;
    } else if (readAsUtf8) {
      isContentEquals = currentTargetContent === content;
    } else {
      isContentEquals = Buffer.compare(currentTargetContent as Buffer, content as Buffer) === 0;
    }

    let isOverwrite = currentTargetContent !== null;
    let writeFile = !isContentEquals;
    if (
      writeFile &&
      isOverwrite
    ) {
      writeFile = await confirm(exportedFileName + " is non standard would you like to overwrite?");
    }

    if (writeFile) {
      if (isOverwrite) {
        await fsAsync.copyFile(exportedFileName, exportedFileName + ".old");
      }
      console.log("emiting " + colors.green(exportedFileName));
      await fsAsync.writeFile(exportedFileName, content);
    }
  };

  return currentOptions;
}

async function copyAllFilesFor(
  config: IConfigRawJSONDataType,
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
  
  if (!exists) {
    console.log(colors.yellow(`A ${target} folder hasn't been determined`));
    
    await fsAsync.mkdir(target, {recursive: true});
  }

  const options = await copyAndProcessDirectoryLevelFor(
    config,
    previousOptions,
    source,
    target,
  );

  if (onceDone) {
    await onceDone();
  }
  return options;
}
export default async function srcSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("SOURCE SETUP"));

  let exists = true;
  try {
    await fsAsync.access("src", fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }

  let options: IOptionsForProcessingCode = null;
  if (!exists || (await confirm("Would you like to re-setup the sources?"))) {
    options = await copyAllFilesFor(
      arg.standardConfig,
      "src",
      path.join(__dirname, "..", "..", "..", "setup", "src", "ts-files"),
      options,
    )
    options = await copyAllFilesFor(
      arg.standardConfig,
      path.dirname(arg.standardConfig.entry),
      path.join(__dirname, "..", "..", "..", "setup", "src", "schema-files"),
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
      arg.standardConfig,
      "resources",
      path.join(__dirname, "..", "..", "..", "setup", "src", "resource-files"),
      options,
    )
  }

  let testsExists = true;
  try {
    await fsAsync.access("tests", fs.constants.F_OK);
  } catch (e) {
    testsExists = false;
  }

  if (!testsExists || (await confirm("Would you like to re-setup the tests sources?"))) {
    options = await copyAllFilesFor(
      arg.standardConfig,
      "tests",
      path.join(__dirname, "..", "..", "..", "setup", "src", "js-tests-files"),
      options,
    );
  }

  return arg;
}
