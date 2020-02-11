"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const fs_1 = __importDefault(require("fs"));
const fsAsync = fs_1.default.promises;
const config_1 = __importDefault(require("./config"));
async function webpackSetup(arg) {
    console.log(colors_1.default.bgGreen("WEBPACK SETUP"));
    let exists = true;
    try {
        await fsAsync.access("webpack.config.js", fs_1.default.constants.F_OK);
    }
    catch (e) {
        exists = false;
    }
    if (!exists) {
        console.log("emiting " + colors_1.default.green("webpack.config.js"));
        await fsAsync.writeFile("webpack.config.js", config_1.default);
    }
    return arg;
}
exports.default = webpackSetup;
