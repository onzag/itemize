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
const deep_equal_1 = __importDefault(require("deep-equal"));
async function start(version) {
    await setup_1.ensureConfigDirectory();
    const standardConfig = await setup_2.readConfigFile("index.json");
    const dockerprefixer = standardConfig.appName.replace(/\s/g, "_").toLowerCase();
    const dbConfig = await setup_2.readConfigFile(version === "development" ? "db.sensitive.json" : `db.${version}.sensitive.json`);
    const redisConfig = await setup_2.readConfigFile(version === "development" ? "redis.sensitive.json" : `redis.${version}.sensitive.json`);
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
    if (dbConfig.host !== "localhost" &&
        dbConfig.host !== "127.0.0.1") {
        console.log(colors_1.default.red("Development environment database is not set to localhost but to ") + dbConfig.host);
        console.log(colors_1.default.red("As so it cannot be executed"));
    }
    else {
        console.log(colors_1.default.yellow("Please allow Itemize to create a docker container for the database"));
        console.log(colors_1.default.yellow("The execution might take a while, please wait..."));
        try {
            const absPath = path_1.default.resolve("./node_modules/itemize/dev-environment/pgsqlpostgis");
            await exec_1.execSudo(`docker build -t pgsqlpostgis ${absPath}`, "Itemize Docker Contained PGSQL Postgis Enabled Database");
            await exec_1.execSudo(`docker run --name ${dockerprefixer}_devdb -e POSTGRES_PASSWORD=${dbConfig.password} ` +
                `-e POSTGRES_USER=${dbConfig.user} -e POSTGRES_DB=${dbConfig.database} ` +
                `-v "$PWD/devenv/pgdata":/var/lib/postgresql/data ` +
                `-p ${dbConfig.port}:5432 -d pgsqlpostgis`, "Itemize Docker Contained PGSQL Postgis Enabled Database");
        }
        catch (err) {
            console.log(colors_1.default.red(err.message));
            console.log(colors_1.default.yellow("Something went wrong please allow for cleanup..."));
            await exec_1.execSudo(`docker rm ${dockerprefixer}_devdb`, "Itemize Docker Contained PGSQL Postgis Enabled Database");
            throw err;
        }
    }
    if (!deep_equal_1.default(redisConfig.cache, redisConfig.global)) {
        console.log(colors_1.default.red("The dev environment uses a single redis instance (the global), yet cache and global do not match, this will cause issues"));
    }
    if (!deep_equal_1.default(redisConfig.pubSub, redisConfig.global)) {
        console.log(colors_1.default.red("The dev environment uses a single redis instance (the global), yet pubSub and global do not match, this will cause issues"));
    }
    if (redisConfig.global.host !== "localhost" &&
        redisConfig.global.host !== "127.0.0.1") {
        console.log(colors_1.default.red("Development environment redis is not set to localhost but to ") + redisConfig.global.host);
        console.log(colors_1.default.red("As so it cannot be executed"));
    }
    else if (redisConfig.global.password) {
        console.log(colors_1.default.red("Development environment with redis is set with a password protection"));
        console.log(colors_1.default.red("As so it cannot be executed"));
    }
    else if (redisConfig.global.path) {
        console.log(colors_1.default.red("Development environment with redis is set with an unix socket"));
        console.log(colors_1.default.red("As so it cannot be executed"));
    }
    else {
        console.log(colors_1.default.yellow("Please allow Itemize to create a docker container for redis"));
        console.log(colors_1.default.yellow("The execution might take a while, please wait..."));
        try {
            await exec_1.execSudo(`docker run --name ${dockerprefixer}_devredis ` +
                `-p ${redisConfig.global.port}:6379 -d redis`, "Itemize Docker Contained REDIS Database");
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
async function stop(version) {
    const standardConfig = await setup_2.readConfigFile("index.json");
    const dockerprefixer = standardConfig.appName.replace(/\s/g, "_").toLowerCase();
    const dbConfig = await setup_2.readConfigFile(version === "development" ? "db.sensitive.json" : `db.${version}.sensitive.json`);
    const redisConfig = await setup_2.readConfigFile(version === "development" ? "redis.sensitive.json" : `reddis.${version}.sensitive.json`);
    if (dbConfig.host === "localhost" ||
        dbConfig.host === "127.0.0.1") {
        try {
            console.log(colors_1.default.yellow("Please allow Itemize to stop the PGSQL docker container"));
            await exec_1.execSudo(`docker stop ${dockerprefixer}_devdb`, "Itemize Docker Contained PGSQL Database");
            console.log(colors_1.default.yellow("Now we attempt to remove the PGSQL docker container"));
            await exec_1.execSudo(`docker rm ${dockerprefixer}_devdb`, "Itemize Docker Contained PGSQL Database");
        }
        catch (err) {
        }
    }
    if ((redisConfig.global.host === "localhost" ||
        redisConfig.global.host === "127.0.0.1") &&
        !redisConfig.global.password &&
        !redisConfig.global.path) {
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
