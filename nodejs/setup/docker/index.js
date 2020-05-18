"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const exec_1 = require("../exec");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fsAsync = fs_1.default.promises;
async function dockerSetup(arg) {
    console.log(colors_1.default.bgGreen("DOCKER CHECK"));
    try {
        await exec_1.execAsync("docker --version");
    }
    catch (err) {
        throw new Error("Docker not found, please visit https://docs.docker.com/install/ for instructions");
    }
    let dockerFileExists = true;
    try {
        await fsAsync.access("Dockerfile", fs_1.default.constants.F_OK);
    }
    catch (e) {
        dockerFileExists = false;
    }
    if (!dockerFileExists) {
        console.log("emiting " + colors_1.default.green("Dockerfile"));
        let fileContent = await fsAsync.readFile(path_1.default.join(__dirname, "..", "..", "..", "setup", "docker", "Dockerfile"), "utf-8");
        fileContent = fileContent
            .replace("SETUP_APP_NAME", arg.standardConfig.appName.replace(/\s/g, "_").toLowerCase());
        await fsAsync.writeFile("Dockerfile", fileContent);
    }
    let dockerIgnoreExists = true;
    try {
        await fsAsync.access(".dockerignore", fs_1.default.constants.F_OK);
    }
    catch (e) {
        dockerIgnoreExists = false;
    }
    if (!dockerIgnoreExists) {
        console.log("emiting " + colors_1.default.green(".dockerignore"));
        await fsAsync.copyFile(path_1.default.join(__dirname, "..", "..", "..", "setup", "docker", ".dockerignore"), ".dockerignore");
    }
    return arg;
}
exports.default = dockerSetup;
