"use strict";
/**
 * Contains a setup step that modifies the package documentation
 * either by installing stuff or by adding scripts onto it
 */
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
/**
 * modifies the package documentation either by installing stuff or by adding scripts onto it
 * @param arg the setup arg
 */
async function packageSetup(arg) {
    console.log(colors_1.default.bgGreen("PACKAGE SETUP"));
    // first we read our package.json
    const packageJSON = JSON.parse(await fsAsync.readFile("package.json", "utf-8"));
    // now we want to see these dependencies
    const dependenciesToInstall = [];
    // and if we don't find it, then we need to install these
    Object.keys(dependencies_1.default).forEach((dependency) => {
        if (!packageJSON.dependencies || !packageJSON.dependencies[dependency]) {
            dependenciesToInstall.push(dependency + "@" + dependencies_1.default[dependency]);
        }
    });
    // if we have some
    if (dependenciesToInstall.length) {
        console.log(colors_1.default.yellow("Installing npm dependencies please wait..."));
        // we run the exec command with npm install save
        await exec_1.execAsync("npm install --save " + dependenciesToInstall.join(" "));
    }
    // now we do the same with dev dependencies
    const devDependenciesToInstall = [];
    Object.keys(dev_dependencies_1.default).forEach((devDependency) => {
        if (!packageJSON.devDependencies || !packageJSON.devDependencies[devDependency]) {
            devDependenciesToInstall.push(devDependency + "@" + dev_dependencies_1.default[devDependency]);
        }
    });
    // and if we have some of those too
    if (devDependenciesToInstall.length) {
        console.log(colors_1.default.yellow("Installing npm developing dependencies please wait...."));
        // same running exec
        await exec_1.execAsync("npm install --save-dev " + devDependenciesToInstall.join(" "));
    }
    // we still need to modify this package json, we re-read as certainly
    // either dependencies or dev dependencies installation process
    // might have changed them
    const newPackageJSON = JSON.parse(await fsAsync.readFile("package.json", "utf-8"));
    // and we need to install these scripts, first we ensure the scripts
    // structure exists
    if (!newPackageJSON.scripts) {
        newPackageJSON.scripts = {};
    }
    // and then add our scripts onto it
    const newScripts = {
        ...newPackageJSON.scripts,
        ...scripts_1.default,
    };
    // if something differs about these scripts
    if (Object.keys(newScripts).sort().join(",") !== Object.keys(newPackageJSON.scripts).sort().join(",")) {
        // we change and rewrite the file
        newPackageJSON.scripts = newScripts;
        console.log("emiting " + colors_1.default.green("package.json"));
        await fsAsync.writeFile("package.json", JSON.stringify(newPackageJSON, null, 2));
    }
    // return the same arg
    return arg;
}
exports.default = packageSetup;
