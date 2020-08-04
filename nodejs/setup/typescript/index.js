"use strict";
/**
 * Setups typescript and the tsc compiler
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const fs_1 = __importDefault(require("fs"));
const fsAsync = fs_1.default.promises;
const tsconfig_1 = __importDefault(require("./tsconfig"));
const tslint_1 = __importDefault(require("./tslint"));
const read_1 = require("../read");
/**
 * runs the typescript setup part
 * @param arg the setup arg
 * @returns the same arg
 */
async function typescriptSetup(arg) {
    console.log(colors_1.default.bgGreen("TYPESCRIPT SETUP"));
    // first we need to ensure our tsconfig.json file
    let tsconfigExists = true;
    let tsconfigContent = null;
    try {
        tsconfigContent = await fsAsync.readFile("tsconfig.json", "utf-8");
    }
    catch (e) {
        tsconfigExists = false;
    }
    // if it doesn't exist we use the value from our tsconfig.ts source
    const newContent = JSON.stringify(tsconfig_1.default, null, 2);
    if (!tsconfigExists) {
        console.log("emiting " + colors_1.default.green("tsconfig.json"));
        await fsAsync.writeFile("tsconfig.json", newContent);
    }
    else if (tsconfigContent !== newContent) {
        if (await read_1.confirm("tsconfig is non-standard, would you like to emit the default?")) {
            console.log("emiting " + colors_1.default.green("tsconfig.json"));
            await fsAsync.writeFile("tsconfig.json", newContent);
            await fsAsync.writeFile("tsconfig.old.json", tsconfigContent);
        }
    }
    // same for tslint
    let tslintExists = true;
    try {
        await fsAsync.access("tslint.json", fs_1.default.constants.F_OK);
    }
    catch (e) {
        tslintExists = false;
    }
    // an we emit such
    if (!tslintExists) {
        console.log("emiting " + colors_1.default.green("tslint.json"));
        await fsAsync.writeFile("tslint.json", JSON.stringify(tslint_1.default, null, 2));
    }
    // return the same arg, unmodified
    return arg;
}
exports.default = typescriptSetup;
