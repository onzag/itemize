"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const fs_1 = __importDefault(require("fs"));
const fsAsync = fs_1.default.promises;
const exec_1 = require("../exec");
const dependencies_1 = __importDefault(require("./dependencies"));
const dev_dependencies_1 = __importDefault(require("./dev-dependencies"));
const scripts_1 = __importDefault(require("./scripts"));
async function packageSetup(arg) {
    console.log(colors_1.default.bgGreen("PACKAGE SETUP"));
    const packageJSON = JSON.parse(await fsAsync.readFile("package.json", "utf-8"));
    const dependenciesToInstall = [];
    Object.keys(dependencies_1.default).forEach((dependency) => {
        if (!packageJSON.dependencies || !packageJSON.dependencies[dependency]) {
            dependenciesToInstall.push(dependency + "@" + dependencies_1.default[dependency]);
        }
    });
    if (dependenciesToInstall.length) {
        console.log(colors_1.default.yellow("Installing npm dependencies please wait..."));
        await exec_1.execAsync("npm install --save " + dependenciesToInstall.join(" "));
    }
    const devDependenciesToInstall = [];
    Object.keys(dev_dependencies_1.default).forEach((devDependency) => {
        if (!packageJSON.devDependencies || !packageJSON.devDependencies[devDependency]) {
            devDependenciesToInstall.push(devDependency + "@" + dev_dependencies_1.default[devDependency]);
        }
    });
    if (devDependenciesToInstall.length) {
        console.log(colors_1.default.yellow("Installing npm developing dependencies please wait...."));
        await exec_1.execAsync("npm install --save-dev " + devDependenciesToInstall.join(" "));
    }
    const newPackageJSON = JSON.parse(await fsAsync.readFile("package.json", "utf-8"));
    if (!newPackageJSON.scripts) {
        newPackageJSON.scripts = {};
    }
    const newScripts = {
        ...newPackageJSON.scripts,
        ...scripts_1.default,
    };
    if (Object.keys(newScripts).sort().join(",") !== Object.keys(newPackageJSON.scripts).sort().join(",")) {
        newPackageJSON.scripts = newScripts;
        console.log("emiting " + colors_1.default.green("package.json"));
        await fsAsync.writeFile("package.json", JSON.stringify(newPackageJSON, null, 2));
    }
    return arg;
}
exports.default = packageSetup;
