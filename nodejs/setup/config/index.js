"use strict";
/**
 * Setups the configuration basically modifies the configuration in place
 * this setup is supposed to build
 *
 * @packageDocumentation
 */
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
const dump_1 = require("./dump");
const fsAsync = fs_1.default.promises;
/**
 * the configuration setup step that builds the config files themselves
 * @param arg the config it's supposed to modify
 */
async function configSetup(arg) {
    console.log(colors_1.default.bgGreen("CONFIGURATION SETUP"));
    // we need our package json information
    const packageJSON = JSON.parse(await fsAsync.readFile("package.json", "utf-8"));
    // and we build our new configuration
    const newArg = {
        ...arg,
    };
    // if we have already setup
    if (newArg.standardConfig &&
        newArg.sensitiveConfigDevelopment &&
        newArg.sensitiveConfigProduction &&
        newArg.redisConfigDevelopment &&
        newArg.redisConfigProduction &&
        newArg.dbConfigDevelopment &&
        newArg.dbConfigProduction &&
        !(await read_1.confirm("Would you like to setup the configuration files?"))) {
        // we ask and confirm for it
        return arg;
    }
    if (!newArg.standardConfig ||
        await read_1.confirm("Would you like to modify the standard configuration?")) {
        newArg.standardConfig = await standard_1.standardConfigSetup(newArg.standardConfig, packageJSON);
    }
    if (!newArg.sensitiveConfigDevelopment ||
        await read_1.confirm("Would you like to modify the sensitive development configuration?")) {
        // basically there's nothing as a reference for our development configuration
        newArg.sensitiveConfigDevelopment = await sensitive_1.sensitiveConfigSetup("development", newArg.sensitiveConfigDevelopment, null);
    }
    if (!newArg.sensitiveConfigProduction ||
        await read_1.confirm("Would you like to modify the sensitive production configuration?")) {
        // but we can use our development configuration as reference for production
        newArg.sensitiveConfigProduction = await sensitive_1.sensitiveConfigSetup("production", newArg.sensitiveConfigProduction, newArg.sensitiveConfigDevelopment);
    }
    if (!newArg.redisConfigDevelopment ||
        await read_1.confirm("Would you like to modify the redis development configuration?")) {
        // same with redis
        newArg.redisConfigDevelopment = await redis_1.redisConfigSetup("development", newArg.redisConfigDevelopment, null);
    }
    if (!newArg.redisConfigProduction ||
        await read_1.confirm("Would you like to modify the redis production configuration?")) {
        newArg.redisConfigProduction = await redis_1.redisConfigSetup("production", newArg.redisConfigProduction, newArg.redisConfigDevelopment);
    }
    if (!newArg.dbConfigDevelopment ||
        await read_1.confirm("Would you like to modify the posrgreSQL development configuration?")) {
        newArg.dbConfigDevelopment = await db_1.dbConfigSetup("development", newArg.dbConfigDevelopment, null, packageJSON);
    }
    if (!newArg.dbConfigProduction ||
        await read_1.confirm("Would you like to modify the posrgreSQL production configuration?")) {
        newArg.dbConfigProduction = await db_1.dbConfigSetup("production", newArg.dbConfigProduction, newArg.dbConfigDevelopment, packageJSON);
    }
    newArg.dumpConfig = dump_1.dumpConfigRequest(newArg.dumpConfig, newArg.sensitiveConfigDevelopment);
    return newArg;
}
exports.default = configSetup;
