"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const fs_1 = __importDefault(require("fs"));
const fsAsync = fs_1.default.promises;
const ignores_1 = __importDefault(require("./ignores"));
async function gitSetup(arg) {
    console.log(colors_1.default.bgGreen("GIT SETUP"));
    let exists = true;
    try {
        await fsAsync.access(".gitignore", fs_1.default.constants.F_OK);
    }
    catch (e) {
        exists = false;
    }
    if (!exists) {
        console.log("emiting " + colors_1.default.green(".gitignore"));
        await fsAsync.writeFile(".gitignore", ignores_1.default.join("\n"));
    }
    return arg;
}
exports.default = gitSetup;
