"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read_1 = require("../read");
async function dbConfigSetup(version, currentConfig, referenceConfig) {
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
            defaultValue: "itemize_user",
            validate: (v) => v.replace(/\s/g, "") === v,
        },
        {
            variableName: "password",
            message: "The passsword to use to connect to the database",
            defaultValue: "itemize_password",
            hidden: true,
        },
        {
            variableName: "database",
            message: "The database name to use",
            defaultValue: "itemize",
        },
    ]);
    return newConfig;
}
exports.dbConfigSetup = dbConfigSetup;
