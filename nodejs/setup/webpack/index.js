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
    try {
        await fsAsync.access("webpack.config.js", fs_1.default.constants.F_OK);
    }
    catch (e) {
        exists = false;
    }
    // and if it doesn't exist we build it in
    if (!exists) {
        console.log("emiting " + colors_1.default.green("webpack.config.js"));
        await fsAsync.writeFile("webpack.config.js", config_1.default);
    }
    // return the same arg
    return arg;
}
exports.default = webpackSetup;
