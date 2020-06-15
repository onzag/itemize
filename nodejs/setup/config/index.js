"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const standard_1 = require("./standard");
const read_1 = require("../read");
const sensitive_1 = require("./sensitive");
const redis_1 = require("./redis");
const db_1 = require("./db");
const fs_1 = __importDefault(require("fs"));
const fsAsync = fs_1.default.promises;
async function configSetup(arg) {
    console.log(colors_1.default.bgGreen("CONFIGURATION SETUP"));
    const packageJSON = JSON.parse(await fsAsync.readFile("package.json", "utf-8"));
    const newArg = {
        ...arg,
    };
    if (newArg.standardConfig &&
        newArg.sensitiveConfigDevelopment &&
        newArg.sensitiveConfigProduction &&
        newArg.redisConfigDevelopment &&
        newArg.redisConfigProduction &&
        newArg.dbConfigDevelopment &&
        newArg.dbConfigProduction &&
        !(await read_1.confirm("Would you like to setup the configuration files?"))) {
        return arg;
    }
    if (!newArg.standardConfig ||
        await read_1.confirm("Would you like to modify the standard configuration?")) {
        console.log(colors_1.default.yellow("Could not find standard configuration file"));
        newArg.standardConfig = await standard_1.standardConfigSetup(newArg.standardConfig, packageJSON);
    }
    if (!newArg.sensitiveConfigDevelopment ||
        await read_1.confirm("Would you like to modify the sensitive development configuration?")) {
        newArg.sensitiveConfigDevelopment = await sensitive_1.sensitiveConfigSetup("development", newArg.sensitiveConfigDevelopment, null, packageJSON);
    }
    if (!newArg.sensitiveConfigProduction ||
        await read_1.confirm("Would you like to modify the sensitive production configuration?")) {
        newArg.sensitiveConfigProduction = await sensitive_1.sensitiveConfigSetup("production", newArg.sensitiveConfigProduction, newArg.sensitiveConfigDevelopment, packageJSON);
    }
    if (!newArg.redisConfigDevelopment ||
        await read_1.confirm("Would you like to modify the redis development configuration?")) {
        newArg.redisConfigDevelopment = await redis_1.redisConfigSetup("development", newArg.redisConfigDevelopment, null, packageJSON);
    }
    if (!newArg.redisConfigProduction ||
        await read_1.confirm("Would you like to modify the redis production configuration?")) {
        newArg.redisConfigProduction = await redis_1.redisConfigSetup("production", newArg.redisConfigProduction, newArg.redisConfigDevelopment, packageJSON);
    }
    if (!newArg.dbConfigDevelopment ||
        await read_1.confirm("Would you like to modify the posrgreSQL development configuration?")) {
        newArg.dbConfigDevelopment = await db_1.dbConfigSetup("development", newArg.dbConfigDevelopment, null, packageJSON);
    }
    if (!newArg.dbConfigProduction ||
        await read_1.confirm("Would you like to modify the posrgreSQL production configuration?")) {
        newArg.dbConfigProduction = await db_1.dbConfigSetup("production", newArg.dbConfigProduction, newArg.dbConfigDevelopment, packageJSON);
    }
    return newArg;
}
exports.default = configSetup;
