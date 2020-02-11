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
async function copyAndProcessDirectoryLevelForSource(options, pathname, constructedPath) {
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
            await fsAsync.mkdir(path_1.default.join("src", constructedPath, fileNameInDirectory));
            // and copy that directory level as well
            return copyAndProcessDirectoryLevelForSource(options, currentTotalFilePathName, path_1.default.join(constructedPath, fileNameInDirectory));
        }
        // so we get the content of the file
        let content = await fsAsync.readFile(currentTotalFilePathName, "utf8");
        if (options.nextLineOnBrackets) {
            content = content.replace(/\<(\d+)\>\{/g, (match, digit) => {
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
            content = content.replace(/\<(\d+)\>\{/g, " {");
        }
        if (options.useSpaces) {
            content = content.replace(/\t/g, " ".repeat(options.spacesSize));
        }
        const finalFileName = fileNameInDirectory.replace(".txt", "");
        // let's export the file in the directory
        const exportedFileName = path_1.default.join("src", constructedPath, finalFileName);
        // and emit it
        console.log("emiting " + colors_1.default.green(exportedFileName));
        await fsAsync.writeFile(exportedFileName, content);
    }));
}
async function copyDirectoryLevel(pathname, constructedPath) {
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
            return copyDirectoryLevel(currentTotalFilePathName, path_1.default.join(constructedPath, fileNameInDirectory));
        }
        await fsAsync.copyFile(currentTotalFilePathName, path_1.default.join(constructedPath, fileNameInDirectory));
    }));
}
async function srcSetup(arg) {
    console.log(colors_1.default.bgGreen("SOURCE SETUP"));
    let exists = true;
    try {
        await fsAsync.access("src", fs_1.default.constants.F_OK);
    }
    catch (e) {
        exists = false;
    }
    if (!exists) {
        console.log(colors_1.default.yellow("A source hasn't been determined"));
        const useSpaces = await read_1.confirm("Would you like to use spaces instead of tabs?");
        let spacesSize = null;
        if (useSpaces) {
            spacesSize = await read_1.fieldRequest("integer", "How many spaces?", "spaces", null, 2, false, (v) => !isNaN(v));
        }
        const nextLineOnBrackets = !(await read_1.confirm("Are you a `function() {` same line kind of gal/guy?"));
        await fsAsync.mkdir("src");
        copyAndProcessDirectoryLevelForSource({
            useSpaces,
            spacesSize,
            nextLineOnBrackets,
        }, path_1.default.join(__dirname, "..", "..", "..", "setup", "src", "files"), "");
    }
    return arg;
}
exports.default = srcSetup;
