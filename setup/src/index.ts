import colors from "colors";
import fs from "fs";
const fsAsync = fs.promises;
import { ISetupConfigType } from "..";
import { confirm, fieldRequest } from "../read";
import path from "path";

async function copyAndProcessDirectoryLevelForSource(
  options: {
    useSpaces: boolean,
    spacesSize: number,
    nextLineOnBrackets: boolean,
  },
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
      await fsAsync.mkdir(path.join("src", constructedPath, fileNameInDirectory));
  
      // and copy that directory level as well
      return copyAndProcessDirectoryLevelForSource(
        options,
        currentTotalFilePathName,
        path.join(constructedPath, fileNameInDirectory),
      );
    }

    // so we get the content of the file
    let content = await fsAsync.readFile(currentTotalFilePathName, "utf8");
    if (options.nextLineOnBrackets) {
      content = content.replace(/\<(\d+)\>\{/g, (match, digit) => {
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
      content = content.replace(/\<(\d+)\>\{/g, " {");
    }

    if (options.useSpaces) {
      content = content.replace(/\t/g, " ".repeat(options.spacesSize));
    }

    const finalFileName = fileNameInDirectory.replace(".txt", "");
    // let's export the file in the directory
    const exportedFileName = path.join("src", constructedPath, finalFileName);
    // and emit it
    console.log("emiting " + colors.green(exportedFileName));
    await fsAsync.writeFile(exportedFileName, content);
  }));
}

async function copyDirectoryLevel(
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
      return copyDirectoryLevel(
        currentTotalFilePathName,
        path.join(constructedPath, fileNameInDirectory),
      );
    }

    await fsAsync.copyFile(currentTotalFilePathName, path.join(constructedPath, fileNameInDirectory));
  }));
}

export default async function srcSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  console.log(colors.bgGreen("SOURCE SETUP"));

  try {
    await fsAsync.access("itemize", fs.constants.F_OK);
    await fsAsync.rmdir("itemize", {recursive: true});
  } catch (e) {
  }

  console.log("emiting " + colors.green("itemize"));
  await fsAsync.mkdir("itemize");
  await Promise.all(["base", "client", "data", "imported-resources", "server"].map(async (dirtoCopy) => {
    await fsAsync.mkdir(path.join("itemize", dirtoCopy));
    await copyDirectoryLevel(
      path.join(__dirname, "..", "..", "..", dirtoCopy),
      path.join("itemize", dirtoCopy),
    );
  }));
  await Promise.all(["constants.ts", "index.ts", "gql-querier.ts", "gql-util.ts", "util.ts", "config.ts"].map(async (fileToCopy) => {
    await fsAsync.copyFile(
      path.join(__dirname, "..", "..", "..", fileToCopy),
      path.join("itemize", fileToCopy),
    );
  }));

  let exists = true;
  try {
    await fsAsync.access("src", fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }
  if (!exists) {
    console.log(colors.yellow("A source hasn't been determined"));
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

    await fsAsync.mkdir("src");
    copyAndProcessDirectoryLevelForSource(
      {
        useSpaces,
        spacesSize,
        nextLineOnBrackets,
      },
      path.join(__dirname, "..", "..", "..", "setup", "src", "files"),
      ""
    );
  }
  return arg;
}
