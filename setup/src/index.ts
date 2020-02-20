import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import { confirm, fieldRequest } from "../read";
import path from "path";
import { IConfigRawJSONDataType } from "../../config";

interface IOptionsForProcessingCode {
  useSpaces: boolean,
  spacesSize: number,
  nextLineOnBrackets: boolean,
};

async function copyAndProcessDirectoryLevelFor(
  config: IConfigRawJSONDataType,
  options: IOptionsForProcessingCode,
  pathname: string,
  constructedPath: string,
) {
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
      await fsAsync.mkdir(path.join(constructedPath, fileNameInDirectory));
  
      // and copy that directory level as well
      return copyAndProcessDirectoryLevelFor(
        config,
        options,
        currentTotalFilePathName,
        path.join(constructedPath, fileNameInDirectory),
      );
    }

    // so we get the content of the file
    const readAsUtf8 = currentTotalFilePathName.endsWith(".code") ||
      currentTotalFilePathName.endsWith(".js");
    let finalFileName: string = fileNameInDirectory;
    let utf8Content: string;

    if (readAsUtf8) {
      utf8Content = await fsAsync.readFile(currentTotalFilePathName, "utf8");
      if (currentTotalFilePathName.endsWith(".code")) {
        if (options.nextLineOnBrackets) {
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
        finalFileName = fileNameInDirectory.replace(".code", "");
      } else if (currentTotalFilePathName.endsWith(".js")) {
        utf8Content = Function("config", "options", utf8Content)(config, options);
        finalFileName = fileNameInDirectory.replace(".js", "");
      }

      if (options.useSpaces) {
        utf8Content = utf8Content.replace(/\t/g, " ".repeat(options.spacesSize));
      }
    }

    // let's export the file in the directory
    const exportedFileName = path.join(constructedPath, finalFileName);
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
  // TODO add missing resource files with itemize logo
  await copyAllFilesFor(
    arg,
    "resources",
    "resource-files",
    options,
  )
  return arg;
}
