"use strict";
/**
 * Contains the functionality for executing the development environment based on some config
 *
 * @packageDocumentation
 */
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
/**
 * this function is triggered by the main.ts file and passes its argument
 * its configuration is there, check the main.ts file for modification on how
 * this function is triggered and what parameters it needs
 *
 * @param version the version param
 */
async function start(version) {
    // first we ensure the config directory exists
    await setup_1.ensureConfigDirectory();
    // now we need our standard generic config
    const standardConfig = await setup_2.readConfigFile("index.json");
    // we will use our app name for docker prefixing
    const dockerprefixer = standardConfig.appName.replace(/\s/g, "_").toLowerCase();
    // we need database and redis configuration
    const dbConfig = await setup_2.readConfigFile(version === "development" ? "db.sensitive.json" : `db.${version}.sensitive.json`);
    const redisConfig = await setup_2.readConfigFile(version === "development" ? "redis.sensitive.json" : `redis.${version}.sensitive.json`);
    // now we check if the devenv folder exist
    let devEnvFolderExists = true;
    try {
        await fsAsync.access("devenv", fs_1.default.constants.F_OK);
    }
    catch (e) {
        devEnvFolderExists = false;
    }
    // and if not we create it
    if (!devEnvFolderExists) {
        await fsAsync.mkdir("devenv");
    }
    // and the pgdata folder within it
    let pgDataFolderExists = true;
    try {
        await fsAsync.access(path_1.default.join("devenv", "pgdata"), fs_1.default.constants.F_OK);
    }
    catch (e) {
        pgDataFolderExists = false;
    }
    // we need to ensure it as well
    if (!pgDataFolderExists) {
        await fsAsync.mkdir(path_1.default.join("devenv", "pgdata"));
    }
    // so because this is a devenv the config in order to make sense
    // should be in localhost
    if (dbConfig.host !== "localhost" &&
        dbConfig.host !== "127.0.0.1") {
        // otherwise we log this can't work
        console.log(colors_1.default.red("Development environment database is not set to localhost but to ") + dbConfig.host);
        console.log(colors_1.default.red("As so it cannot be executed"));
    }
    else {
        // otherwise yes we can do itt
        console.log(colors_1.default.yellow("Please allow Itemize to create a docker container for the database"));
        console.log(colors_1.default.yellow("The execution might take a while, please wait..."));
        // and for such we need to first know where we are, we need an absolute path for all this
        try {
            // and the path is inside pgqsql postgis as we will need postgis
            const absPath = path_1.default.resolve("./node_modules/@onzag/itemize/dev-environment/pgsqlpostgis");
            // now we call to buld such thing as pgsqlpostgis
            await exec_1.execSudo(`docker build -t pgsqlpostgis ${absPath}`, "Itemize Docker Contained PGSQL Postgis Enabled Database");
            // and we execute this command with the configuration
            // it will execute for localhost of course
            await exec_1.execSudo(`docker run --name ${dockerprefixer}_devdb -e POSTGRES_PASSWORD=${dbConfig.password} ` +
                `-e POSTGRES_USER=${dbConfig.user} -e POSTGRES_DB=${dbConfig.database} ` +
                `-v "$PWD/devenv/pgdata":/var/lib/postgresql/data ` +
                `-p ${dbConfig.port}:5432 -d pgsqlpostgis`, "Itemize Docker Contained PGSQL Postgis Enabled Database");
        }
        catch (err) {
            // if something fails show a message
            console.log(colors_1.default.red(err.message));
            console.log(colors_1.default.yellow("Something went wrong please allow for cleanup..."));
            try {
                await exec_1.execSudo(`docker rm ${dockerprefixer}_devdb`, "Itemize Docker Contained PGSQL Postgis Enabled Database");
            }
            catch {
            }
            throw err;
        }
    }
    // now we need to check fr this, we have global, pubsub and local cache
    // which we all need, for development, we should usually use a single instance
    // the devenv uses the global as reference
    // so if the local doesn't equal something's odd
    if (!deep_equal_1.default(redisConfig.cache, redisConfig.global)) {
        console.log(colors_1.default.red("The dev environment uses a single redis instance (the global), yet cache and global do not match, this will cause issues"));
    }
    // if the pubsub doesn't equal it's also odd for a development environment
    if (!deep_equal_1.default(redisConfig.pubSub, redisConfig.global)) {
        console.log(colors_1.default.red("The dev environment uses a single redis instance (the global), yet pubSub and global do not match, this will cause issues"));
    }
    // so we use the global as a reference
    // but if it's not localhost there's no much we can do about it
    if (redisConfig.global.host !== "localhost" &&
        redisConfig.global.host !== "127.0.0.1") {
        // so we show the message
        console.log(colors_1.default.red("Development environment redis is not set to localhost but to ") + redisConfig.global.host);
        console.log(colors_1.default.red("As so it cannot be executed"));
    }
    else if (redisConfig.global.password) {
        // password protection is also not supported for the development environment
        console.log(colors_1.default.red("Development environment with redis is set with a password protection"));
        console.log(colors_1.default.red("As so it cannot be executed"));
    }
    else if (redisConfig.global.path) {
        // path, not supported as well
        console.log(colors_1.default.red("Development environment with redis is set with an unix socket"));
        console.log(colors_1.default.red("As so it cannot be executed"));
    }
    else {
        // otherwise we are good to go
        console.log(colors_1.default.yellow("Please allow Itemize to create a docker container for redis"));
        console.log(colors_1.default.yellow("The execution might take a while, please wait..."));
        // and we attempt to execute
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
/**
 * This function is what is used to stop the development environment
 * check the main.ts file to see how this is called
 *
 * @param version the version to stop for
 */
async function stop(version) {
    // we read all this information just like in start
    const standardConfig = await setup_2.readConfigFile("index.json");
    const dockerprefixer = standardConfig.appName.replace(/\s/g, "_").toLowerCase();
    // the dbconfig and redis
    const dbConfig = await setup_2.readConfigFile(version === "development" ? "db.sensitive.json" : `db.${version}.sensitive.json`);
    const redisConfig = await setup_2.readConfigFile(version === "development" ? "redis.sensitive.json" : `redis.${version}.sensitive.json`);
    // we can only stop for localhost
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
    // same for redis
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
