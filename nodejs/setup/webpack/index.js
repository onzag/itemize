"use strict";
/**
 * Setups webpack for the project
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const fs_1 = __importDefault(require("fs"));
const fsAsync = fs_1.default.promises;
const config_1 = __importDefault(require("./config"));
const read_1 = require("../read");
/**
 * Runs the webpack setup step that builds the webpack config
 *
 * @param arg the setup arg
 * @returns the same arg
 */
async function webpackSetup(arg) {
    console.log(colors_1.default.bgGreen("WEBPACK SETUP"));
    // basically we just check for the file
    let exists = true;
    let content = null;
    try {
        content = await fsAsync.readFile("webpack.config.js", "utf-8");
    }
    catch (e) {
        exists = false;
    }
    // and if it doesn't exist we build it in
    if (!exists) {
        console.log("emiting " + colors_1.default.green("webpack.config.js"));
        await fsAsync.writeFile("webpack.config.js", config_1.default);
    }
    else if (content !== config_1.default) {
        if (await read_1.confirm("Webpack config is non-standard, would you like to emit the default?")) {
            console.log("emiting " + colors_1.default.green("webpack.config.js"));
            await fsAsync.writeFile("webpack.config.js", config_1.default);
            await fsAsync.writeFile("webpack.config.old.js", content);
        }
    }
    // return the same arg
    return arg;
}
exports.default = webpackSetup;
