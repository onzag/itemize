"use strict";
/**
 * Allows to setup the docker container that will at the end contain
 * the app once it's containerized
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const exec_1 = require("../exec");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fsAsync = fs_1.default.promises;
const read_1 = require("../read");
/**
 * All the files that we are going to confirm
 * as equals to what is stored
 */
const filesToConfirm = [
    ".dockerignore",
    ".npmrc-docker",
    "docker-compose.yml",
    "nginx.conf",
    "nginx-ssl.conf",
    "run.sh",
    "start.sh",
    "start-ssl.sh",
];
/**
 * To setup docker step and its files, it takes the setup config type
 * @param arg the setup config that contains all the config
 * @returns the same arg
 */
async function dockerSetup(arg) {
    console.log(colors_1.default.bgGreen("DOCKER CHECK"));
    // check we have docker
    try {
        await exec_1.execAsync("docker --version");
    }
    catch (err) {
        throw new Error("Docker not found, please visit https://docs.docker.com/install/ for instructions");
    }
    // check we have a dockerfile
    let dockerFileExists = true;
    let dockerFileContent = null;
    try {
        dockerFileContent = await fsAsync.readFile("Dockerfile", "utf-8");
    }
    catch (e) {
        dockerFileExists = false;
    }
    let newDockerFile = await fsAsync.readFile(path_1.default.join(__dirname, "..", "..", "..", "setup", "docker", "Dockerfile"), "utf-8");
    newDockerFile = newDockerFile
        .replace("SETUP_APP_NAME", arg.standardConfig.appName.replace(/\s/g, "_").toLowerCase());
    // and if not we create one
    if (!dockerFileExists) {
        console.log("emiting " + colors_1.default.green("Dockerfile"));
        await fsAsync.writeFile("Dockerfile", newDockerFile);
    }
    else if (newDockerFile !== dockerFileContent) {
        if (await read_1.confirm("Dockerfile is non-standard, would you like to emit the default?")) {
            console.log("emiting " + colors_1.default.green("Dockerfile"));
            await fsAsync.writeFile("Dockerfile", newDockerFile);
            await fsAsync.writeFile("Dockerfile.old", dockerFileContent);
        }
    }
    for (const fileToConfim of filesToConfirm) {
        // check .dockerignore exists
        let suchExists = true;
        let suchContent = null;
        try {
            suchContent = await fsAsync.readFile(fileToConfim, "utf-8");
        }
        catch (e) {
            suchExists = false;
        }
        const newContent = await fsAsync.readFile(path_1.default.join(__dirname, "..", "..", "..", "setup", "docker", fileToConfim), "utf-8");
        if (!suchExists) {
            console.log("emiting " + colors_1.default.green(fileToConfim));
            await fsAsync.writeFile(fileToConfim, newContent);
        }
        else if (suchContent !== newContent) {
            if (await read_1.confirm(fileToConfim + " is non-standard, would you like to emit the default?")) {
                console.log("emiting " + colors_1.default.green(fileToConfim));
                await fsAsync.writeFile(fileToConfim, newContent);
                const parsed = path_1.default.parse(fileToConfim);
                const oldName = parsed.name + ".old" + parsed.ext;
                await fsAsync.writeFile(oldName, suchContent);
            }
        }
    }
    // returns the same config as it does nothing to it
    return arg;
}
exports.default = dockerSetup;
