"use strict";
/**
 * Babel RC configurator
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const fs_1 = __importDefault(require("fs"));
const fsAsync = fs_1.default.promises;
const rc_1 = __importDefault(require("./rc"));
/**
 * Runs the babel setup step
 * @param arg the setup configuration information
 */
async function babelSetup(arg) {
    console.log(colors_1.default.bgGreen("BABEL SETUP"));
    let exists = true;
    try {
        await fsAsync.access("babel.config.json", fs_1.default.constants.F_OK);
    }
    catch (e) {
        exists = false;
    }
    // we basically add babel.config.json if it doesn't exist
    if (!exists) {
        console.log("emiting " + colors_1.default.green("babel.config.json"));
        await fsAsync.writeFile("babel.config.json", JSON.stringify(rc_1.default, null, 2));
    }
    // return what we did to the config, nothing
    return arg;
}
exports.default = babelSetup;
