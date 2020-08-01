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
    try {
        await fsAsync.access("Dockerfile", fs_1.default.constants.F_OK);
    }
    catch (e) {
        dockerFileExists = false;
    }
    // and if not we create one
    if (!dockerFileExists) {
        console.log("emiting " + colors_1.default.green("Dockerfile"));
        let fileContent = await fsAsync.readFile(path_1.default.join(__dirname, "..", "..", "..", "setup", "docker", "Dockerfile"), "utf-8");
        fileContent = fileContent
            .replace("SETUP_APP_NAME", arg.standardConfig.appName.replace(/\s/g, "_").toLowerCase());
        await fsAsync.writeFile("Dockerfile", fileContent);
    }
    // check .dockerignore exists
    let dockerIgnoreExists = true;
    try {
        await fsAsync.access(".dockerignore", fs_1.default.constants.F_OK);
    }
    catch (e) {
        dockerIgnoreExists = false;
    }
    // and if not we create it with the content of our file
    if (!dockerIgnoreExists) {
        console.log("emiting " + colors_1.default.green(".dockerignore"));
        await fsAsync.copyFile(path_1.default.join(__dirname, "..", "..", "..", "setup", "docker", ".dockerignore"), ".dockerignore");
    }
    // check now for the dockercompose
    let dockerComposeExists = true;
    try {
        await fsAsync.access("docker-compose.yml", fs_1.default.constants.F_OK);
    }
    catch (e) {
        dockerComposeExists = false;
    }
    // same thing we copy it
    if (!dockerComposeExists) {
        console.log("emiting " + colors_1.default.green("docker-compose.yml"));
        await fsAsync.copyFile(path_1.default.join(__dirname, "..", "..", "..", "setup", "docker", "docker-compose.yml"), "docker-compose.yml");
    }
    // now for the nginx file used in nginx inside docker
    let nginxExists = true;
    try {
        await fsAsync.access("nginx.conf", fs_1.default.constants.F_OK);
    }
    catch (e) {
        nginxExists = false;
    }
    // we copy as well
    if (!nginxExists) {
        console.log("emiting " + colors_1.default.green("nginx.conf"));
        await fsAsync.copyFile(path_1.default.join(__dirname, "..", "..", "..", "setup", "docker", "nginx.conf"), "nginx.conf");
    }
    // and the start script that initializes docker
    let startExists = true;
    try {
        await fsAsync.access("start.sh", fs_1.default.constants.F_OK);
    }
    catch (e) {
        startExists = false;
    }
    // create as well
    if (!startExists) {
        console.log("emiting " + colors_1.default.green("start.sh"));
        await fsAsync.copyFile(path_1.default.join(__dirname, "..", "..", "..", "setup", "docker", "start.sh"), "start.sh");
    }
    // the npm rc is required in order to be able to validate the npm request using the npm token
    let npmRcExists = true;
    try {
        await fsAsync.access(".npmrc-docker", fs_1.default.constants.F_OK);
    }
    catch (e) {
        npmRcExists = false;
    }
    // and we copy it there
    if (!npmRcExists) {
        console.log("emiting " + colors_1.default.green(".npmrc-docker"));
        await fsAsync.copyFile(path_1.default.join(__dirname, "..", "..", "..", "setup", "docker", ".npmrc-docker"), ".npmrc-docker");
    }
    // returns the same config as it does nothing to it
    return arg;
}
exports.default = dockerSetup;
