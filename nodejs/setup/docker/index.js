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
    let dockerComposeExists = true;
    try {
        await fsAsync.access("docker-compose.yml", fs_1.default.constants.F_OK);
    }
    catch (e) {
        dockerComposeExists = false;
    }
    if (!dockerComposeExists) {
        console.log("emiting " + colors_1.default.green("docker-compose.yml"));
        let fileContent = await fsAsync.readFile(path_1.default.join(__dirname, "..", "..", "..", "setup", "docker", "docker-compose.yml"), "utf-8");
        fileContent = fileContent
            .replace(/SETUP_APP_NAME/g, arg.standardConfig.appName.replace(/\s/g, "_").toLowerCase())
            .replace("SETUP_REDIS_PORT", (arg.redisConfigProduction.cache.port || 6379).toString());
        await fsAsync.writeFile("docker-compose.yml", fileContent);
    }
    let dockerComposeFullExists = true;
    try {
        await fsAsync.access("docker-compose-full.yml", fs_1.default.constants.F_OK);
    }
    catch (e) {
        dockerComposeFullExists = false;
    }
    if (!dockerComposeFullExists) {
        console.log("emiting " + colors_1.default.green("docker-compose-full.yml"));
        let fileContent = await fsAsync.readFile(path_1.default.join(__dirname, "..", "..", "..", "setup", "docker", "docker-compose-full.yml"), "utf-8");
        fileContent = fileContent
            .replace(/SETUP_APP_NAME/g, arg.standardConfig.appName.replace(/\s/g, "_").toLowerCase())
            .replace("SETUP_REDIS_PORT", (arg.redisConfigProduction.cache.port || 6379).toString())
            .replace("SETUP_DB_PORT", arg.dbConfigProduction.port.toString())
            .replace("SETUP_DB_USER", arg.dbConfigProduction.user)
            .replace("SETUP_DB_DB", arg.dbConfigProduction.database);
        await fsAsync.writeFile("docker-compose.yml", fileContent);
    }
    let nginxExists = true;
    try {
        await fsAsync.access("nginx.conf", fs_1.default.constants.F_OK);
    }
    catch (e) {
        nginxExists = false;
    }
    if (!nginxExists) {
        console.log("emiting " + colors_1.default.green("nginx.conf"));
        await fsAsync.copyFile(path_1.default.join(__dirname, "..", "..", "..", "setup", "docker", "nginx.conf"), "nginx.conf");
    }
    return arg;
}
exports.default = dockerSetup;
