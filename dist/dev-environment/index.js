"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const fsAsync = fs_1.default.promises;
const path_1 = __importDefault(require("path"));
const setup_1 = require("../setup");
const setup_2 = require("../setup");
const colors_1 = __importDefault(require("colors"));
const exec_1 = require("../setup/exec");
async function start() {
    await setup_1.ensureConfigDirectory();
    const standardConfig = await setup_2.readConfigFile("index.json");
    const dockerprefixer = standardConfig.appName.replace(/\s/g, "_").toLowerCase();
    const dbConfigDevelopment = await setup_2.readConfigFile("db.sensitive.json");
    const redisConfigDevelopment = await setup_2.readConfigFile("redis.sensitive.json");
    let devEnvFolderExists = true;
    try {
        await fsAsync.access("devenv", fs_1.default.constants.F_OK);
    }
    catch (e) {
        devEnvFolderExists = false;
    }
    if (!devEnvFolderExists) {
        await fsAsync.mkdir("devenv");
    }
    let pgDataFolderExists = true;
    try {
        await fsAsync.access(path_1.default.join("devenv", "pgdata"), fs_1.default.constants.F_OK);
    }
    catch (e) {
        pgDataFolderExists = false;
    }
    if (!pgDataFolderExists) {
        await fsAsync.mkdir(path_1.default.join("devenv", "pgdata"));
    }
    if (dbConfigDevelopment.host !== "localhost" &&
        dbConfigDevelopment.host !== "127.0.0.1") {
        console.log(colors_1.default.red("Development environment database is not set to localhost but to ") + dbConfigDevelopment.host);
        console.log(colors_1.default.red("As so it cannot be executed"));
    }
    else {
        console.log(colors_1.default.yellow("Please allow Itemize to create a docker container for the database"));
        console.log(colors_1.default.yellow("The execution might take a while, please wait..."));
        try {
            await exec_1.execSudo(`docker run --name ${dockerprefixer}_devdb -e POSTGRES_PASSWORD=${dbConfigDevelopment.password} ` +
                `-e POSTGRES_USER=${dbConfigDevelopment.user} -e POSTGRES_DB=${dbConfigDevelopment.database} ` +
                `-v "$PWD/devenv/pgdata":/var/lib/postgresql/data ` +
                `-p ${dbConfigDevelopment.port}:5432 -d postgres`, "Itemize Docker Contained PGSQL Database");
        }
        catch (err) {
            console.log(colors_1.default.red(err.message));
            console.log(colors_1.default.yellow("Something went wrong please allow for cleanup..."));
            await exec_1.execSudo(`docker rm ${dockerprefixer}_devdb`, "Itemize Docker Contained PGSQL Database");
            throw err;
        }
    }
    if (redisConfigDevelopment.host !== "localhost" &&
        redisConfigDevelopment.host !== "127.0.0.1") {
        console.log(colors_1.default.red("Development environment redis is not set to localhost but to ") + redisConfigDevelopment.host);
        console.log(colors_1.default.red("As so it cannot be executed"));
    }
    else if (redisConfigDevelopment.password) {
        console.log(colors_1.default.red("Development environment with redis is set with a password protection"));
        console.log(colors_1.default.red("As so it cannot be executed"));
    }
    else if (redisConfigDevelopment.path) {
        console.log(colors_1.default.red("Development environment with redis is set with an unix socket"));
        console.log(colors_1.default.red("As so it cannot be executed"));
    }
    else {
        console.log(colors_1.default.yellow("Please allow Itemize to create a docker container for redis"));
        console.log(colors_1.default.yellow("The execution might take a while, please wait..."));
        try {
            await exec_1.execSudo(`docker run --name ${dockerprefixer}_devredis ` +
                `-p ${redisConfigDevelopment.port}:6379 -d redis`, "Itemize Docker Contained REDIS Database");
        }
        catch (err) {
            console.log(colors_1.default.red(err.message));
            console.log(colors_1.default.yellow("Something went wrong please allow for cleanup..."));
            await exec_1.execSudo(`docker rm ${dockerprefixer}_devredis`, "Itemize Docker Contained REDIS Database");
            throw err;
        }
    }
}
exports.start = start;
async function stop() {
    const standardConfig = await setup_2.readConfigFile("index.json");
    const dockerprefixer = standardConfig.appName.replace(/\s/g, "_").toLowerCase();
    const dbConfigDevelopment = await setup_2.readConfigFile("db.sensitive.json");
    const redisConfigDevelopment = await setup_2.readConfigFile("redis.sensitive.json");
    if (dbConfigDevelopment.host === "localhost" ||
        dbConfigDevelopment.host === "127.0.0.1") {
        try {
            console.log(colors_1.default.yellow("Please allow Itemize to stop the PGSQL docker container"));
            await exec_1.execSudo(`docker stop ${dockerprefixer}_devdb`, "Itemize Docker Contained PGSQL Database");
            console.log(colors_1.default.yellow("Now we attempt to remove the PGSQL docker container"));
            await exec_1.execSudo(`docker rm ${dockerprefixer}_devdb`, "Itemize Docker Contained PGSQL Database");
        }
        catch (err) {
        }
    }
    if ((redisConfigDevelopment.host === "localhost" ||
        redisConfigDevelopment.host === "127.0.0.1") &&
        !redisConfigDevelopment.password &&
        !redisConfigDevelopment.path) {
        try {
            console.log(colors_1.default.yellow("Please allow Itemize to stop the REDIS docker container"));
            await exec_1.execSudo(`docker stop ${dockerprefixer}_devredis`, "Itemize Docker Contained REDIS Database");
            console.log(colors_1.default.yellow("Now we attempt to remove the REDIS docker container"));
            await exec_1.execSudo(`docker rm ${dockerprefixer}_devredis`, "Itemize Docker Contained REDIS Database");
        }
        catch (err) {
        }
    }
}
exports.stop = stop;
