"use strict";
/**
 * Configuration bit for the database
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const read_1 = require("../read");
/**
 * Will ask for information about the database sensitive file
 * in order to build the db configuration json file
 *
 * @param version the version, development or production
 * @param currentConfig the current file content
 * @param referenceConfig the reference content to use instead as base
 * @param packageJSON the package json parsed file
 */
async function dbConfigSetup(version, currentConfig, referenceConfig, packageJSON) {
    const newConfig = await read_1.configRequest(currentConfig || referenceConfig, "PostgreSQL configuration (" + version + ")", [
        {
            variableName: "host",
            message: "The host where postgresql is running",
            defaultValue: "localhost",
        },
        {
            variableName: "port",
            type: "integer",
            message: "The postgresql port",
            defaultValue: 5432,
            validate: (v) => !isNaN(v),
        },
        {
            variableName: "user",
            message: "The user that runs the database",
            defaultValue: packageJSON.name + "_user",
            validate: (v) => v.replace(/\s/g, "") === v,
        },
        {
            variableName: "password",
            message: "The passsword to use to connect to the database",
            defaultValue: packageJSON.name + "_password",
            hidden: true,
        },
        {
            variableName: "database",
            message: "The database name to use",
            defaultValue: packageJSON.name,
        },
    ]);
    return newConfig;
}
exports.dbConfigSetup = dbConfigSetup;
