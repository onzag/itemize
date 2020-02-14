"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const fs_1 = __importDefault(require("fs"));
const fsAsync = fs_1.default.promises;
const tsconfig_1 = __importDefault(require("./tsconfig"));
const tslint_1 = __importDefault(require("./tslint"));
async function typescriptSetup(arg) {
    console.log(colors_1.default.bgGreen("GITHUB SETUP"));
    let tsconfigExists = true;
    try {
        await fsAsync.access("tsconfig.json", fs_1.default.constants.F_OK);
    }
    catch (e) {
        tsconfigExists = false;
    }
    if (!tsconfigExists) {
        console.log("emiting " + colors_1.default.green("tsconfig.json"));
        await fsAsync.writeFile("tsconfig.json", JSON.stringify(tsconfig_1.default, null, 2));
    }
    let tslintExists = true;
    try {
        await fsAsync.access("tslint.json", fs_1.default.constants.F_OK);
    }
    catch (e) {
        tslintExists = false;
    }
    if (!tslintExists) {
        console.log("emiting " + colors_1.default.green("tslint.json"));
        await fsAsync.writeFile("tslint.json", JSON.stringify(tslint_1.default, null, 2));
    }
    return arg;
}
exports.default = typescriptSetup;
