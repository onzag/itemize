"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const fs_1 = __importDefault(require("fs"));
const fsAsync = fs_1.default.promises;
const read_1 = require("../read");
const path_1 = __importDefault(require("path"));
;
async function copyAndProcessDirectoryLevelFor(config, options, pathname, constructedPath) {
    const filesInDirectory = await fsAsync.readdir(pathname);
    // for every file in the directory
    await Promise.all(filesInDirectory.map(async (fileNameInDirectory) => {
        // let's get the path name
        const currentTotalFilePathName = path_1.default.join(pathname, fileNameInDirectory);
        // and let's check what type it is
        const stat = await fsAsync.lstat(currentTotalFilePathName);
        // if we have a directory
        if (stat.isDirectory()) {
            // build the folder for that directory
            await fsAsync.mkdir(path_1.default.join(constructedPath, fileNameInDirectory));
            // and copy that directory level as well
            return copyAndProcessDirectoryLevelFor(config, options, currentTotalFilePathName, path_1.default.join(constructedPath, fileNameInDirectory));
        }
        // so we get the content of the file
        const readAsUtf8 = currentTotalFilePathName.endsWith(".code") ||
            currentTotalFilePathName.endsWith(".js");
        let finalFileName = fileNameInDirectory;
        let utf8Content;
        if (readAsUtf8) {
            utf8Content = await fsAsync.readFile(currentTotalFilePathName, "utf8");
            if (currentTotalFilePathName.endsWith(".code")) {
                if (options.nextLineOnBrackets) {
                    utf8Content = utf8Content.replace(/\<(\d+)\>\{/g, (match, digit) => {
                        const digitInQuestion = parseInt(digit);
                        let finalStr = "\n";
                        if (options.useSpaces) {
                            finalStr += " ".repeat(options.spacesSize * digitInQuestion);
                        }
                        else {
                            finalStr += "\t".repeat(digitInQuestion);
                        }
                        finalStr += "{";
                        return finalStr;
                    });
                }
                else {
                    utf8Content = utf8Content.replace(/\<(\d+)\>\{/g, " {");
                }
                finalFileName = fileNameInDirectory.replace(".code", "");
            }
            else if (currentTotalFilePathName.endsWith(".js")) {
                utf8Content = Function("config", "options", utf8Content)(config, options);
                finalFileName = fileNameInDirectory.replace(".js", "");
            }
            if (options.useSpaces) {
                utf8Content = utf8Content.replace(/\t/g, " ".repeat(options.spacesSize));
            }
        }
        // let's export the file in the directory
        const exportedFileName = path_1.default.join(constructedPath, finalFileName);
        // and emit it
        console.log("emiting " + colors_1.default.green(exportedFileName));
        await (utf8Content ?
            fsAsync.writeFile(exportedFileName, utf8Content) :
            fsAsync.copyFile(currentTotalFilePathName, exportedFileName));
    }));
}
async function copyAllFilesFor(arg, target, source, previousOptions, onceDone) {
    let exists = true;
    try {
        await fsAsync.access(target, fs_1.default.constants.F_OK);
    }
    catch (e) {
        exists = false;
    }
    let options = previousOptions;
    if (!exists) {
        console.log(colors_1.default.yellow(`A ${target} folder hasn't been determined`));
        if (!options) {
            const useSpaces = await read_1.confirm("Would you like to use spaces instead of tabs?");
            let spacesSize = null;
            if (useSpaces) {
                spacesSize = await read_1.fieldRequest("integer", "How many spaces?", "spaces", null, 2, false, (v) => !isNaN(v));
            }
            const nextLineOnBrackets = !(await read_1.confirm("Are you a `function() {` same line kind of gal/guy?"));
            options = {
                useSpaces,
                spacesSize,
                nextLineOnBrackets,
            };
        }
        await fsAsync.mkdir(target, { recursive: true });
        await copyAndProcessDirectoryLevelFor(arg.standardConfig, options, path_1.default.join(__dirname, "..", "..", "..", "setup", "src", source), target);
        if (onceDone) {
            await onceDone();
        }
    }
    return options;
}
async function srcSetup(arg) {
    console.log(colors_1.default.bgGreen("SOURCE SETUP"));
    let options = await copyAllFilesFor(arg, "src", "ts-files", null);
    options = await copyAllFilesFor(arg, path_1.default.dirname(arg.standardConfig.entry), "schema-files", options, async () => {
        if (!arg.standardConfig.entry.endsWith("/root") &&
            !arg.standardConfig.entry.endsWith("/root.json")) {
            let newRootFileName = path_1.default.basename(arg.standardConfig.entry);
            if (!newRootFileName.endsWith(".json")) {
                newRootFileName += ".json";
            }
            const newPropertiesFileName = newRootFileName.replace(".json", ".properties");
            await fsAsync.rename(path_1.default.join(path_1.default.dirname(arg.standardConfig.entry), "root.json"), path_1.default.join(path_1.default.dirname(arg.standardConfig.entry), newRootFileName));
            await fsAsync.rename(path_1.default.join(path_1.default.dirname(arg.standardConfig.entry), "root.properties"), path_1.default.join(path_1.default.dirname(arg.standardConfig.entry), newPropertiesFileName));
        }
    });
    await copyAllFilesFor(arg, "resources", "resource-files", options);
    return arg;
}
exports.default = srcSetup;
