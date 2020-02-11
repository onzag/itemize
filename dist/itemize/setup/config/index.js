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
async function configSetup(arg) {
    console.log(colors_1.default.bgGreen("CONFIGURATION SETUP"));
    const newArg = {
        ...arg,
    };
    if (newArg.standardConfig &&
        newArg.sensitiveConfigDevelopment &&
        newArg.sensitiveConfigStaging &&
        newArg.sensitiveConfigProduction &&
        newArg.redisConfigDevelopment &&
        newArg.redisConfigProduction &&
        newArg.redisConfigStaging &&
        newArg.dbConfigDevelopment &&
        newArg.dbConfigProduction &&
        newArg.dbConfigStaging &&
        !(await read_1.confirm("Would you like to setup the configuration files?"))) {
        return arg;
    }
    if (!newArg.standardConfig ||
        await read_1.confirm("Would you like to modify the standard configuration?")) {
        console.log(colors_1.default.yellow("Could not find standard configuration file"));
        newArg.standardConfig = await standard_1.standardConfigSetup(newArg.standardConfig);
    }
    if (!newArg.sensitiveConfigDevelopment ||
        await read_1.confirm("Would you like to modify the sensitive development configuration?")) {
        newArg.sensitiveConfigDevelopment = await sensitive_1.sensitiveConfigSetup("development", newArg.sensitiveConfigDevelopment, null);
    }
    if (!newArg.sensitiveConfigStaging ||
        await read_1.confirm("Would you like to modify the sensitive staging configuration?")) {
        newArg.sensitiveConfigStaging = await sensitive_1.sensitiveConfigSetup("staging", newArg.sensitiveConfigStaging, newArg.sensitiveConfigDevelopment);
    }
    if (!newArg.sensitiveConfigProduction ||
        await read_1.confirm("Would you like to modify the sensitive production configuration?")) {
        newArg.sensitiveConfigProduction = await sensitive_1.sensitiveConfigSetup("production", newArg.sensitiveConfigProduction, newArg.sensitiveConfigDevelopment);
    }
    if (!newArg.redisConfigDevelopment ||
        await read_1.confirm("Would you like to modify the redis development configuration?")) {
        newArg.redisConfigDevelopment = await redis_1.redisConfigSetup("development", newArg.redisConfigDevelopment, null);
    }
    if (!newArg.redisConfigStaging ||
        await read_1.confirm("Would you like to modify the redis staging configuration?")) {
        newArg.redisConfigStaging = await redis_1.redisConfigSetup("staging", newArg.redisConfigStaging, newArg.redisConfigDevelopment);
    }
    if (!newArg.redisConfigProduction ||
        await read_1.confirm("Would you like to modify the redis production configuration?")) {
        newArg.redisConfigProduction = await redis_1.redisConfigSetup("production", newArg.redisConfigProduction, newArg.redisConfigDevelopment);
    }
    if (!newArg.dbConfigDevelopment ||
        await read_1.confirm("Would you like to modify the posrgreSQL development configuration?")) {
        newArg.dbConfigDevelopment = await db_1.dbConfigSetup("development", newArg.dbConfigDevelopment, null);
    }
    if (!newArg.dbConfigStaging ||
        await read_1.confirm("Would you like to modify the posrgreSQL staging configuration?")) {
        newArg.dbConfigStaging = await db_1.dbConfigSetup("staging", newArg.dbConfigStaging, newArg.dbConfigDevelopment);
    }
    if (!newArg.dbConfigProduction ||
        await read_1.confirm("Would you like to modify the posrgreSQL production configuration?")) {
        newArg.dbConfigProduction = await db_1.dbConfigSetup("production", newArg.dbConfigProduction, newArg.dbConfigDevelopment);
    }
    return newArg;
}
exports.default = configSetup;
