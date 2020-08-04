"use strict";
/**
 * Setup step to take care of git configuration
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const fs_1 = __importDefault(require("fs"));
const fsAsync = fs_1.default.promises;
const ignores_1 = __importDefault(require("./ignores"));
const read_1 = require("../read");
/**
 * Will simply setup git
 * @param arg the setup arg
 * @returns the same arg
 */
async function gitSetup(arg) {
    console.log(colors_1.default.bgGreen("GIT SETUP"));
    // we write both gitignore if it doesn't exist
    let exists = true;
    let content = null;
    try {
        content = await fsAsync.readFile(".gitignore", "utf-8");
    }
    catch (e) {
        exists = false;
    }
    if (!exists) {
        console.log("emiting " + colors_1.default.green(".gitignore"));
        await fsAsync.writeFile(".gitignore", ignores_1.default.join("\n"));
    }
    else if (content !== ignores_1.default.join("\n")) {
        if (await read_1.confirm("gitignore file is non-standard, would you like to emit the default?")) {
            console.log("emiting " + colors_1.default.green(".gitignore"));
            await fsAsync.writeFile(".gitignore", ignores_1.default.join("\n"));
            await fsAsync.writeFile(".gitignore.old", content);
        }
    }
    // retun the same arg
    return arg;
}
exports.default = gitSetup;
