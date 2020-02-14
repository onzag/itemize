"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read_1 = require("../read");
async function redisConfigSetup(version, currentConfig, referenceConfig, packageJSON) {
    const newConfig = await read_1.configRequest(currentConfig || referenceConfig, "Redis configuration (" + version + ")", [
        {
            variableName: "host",
            message: "The host where redis is running",
            defaultValue: "127.0.0.1",
        },
        {
            variableName: "port",
            type: "integer",
            message: "The redis port",
            defaultValue: 6379,
            validate: (v) => !isNaN(v),
        },
        {
            variableName: "path",
            message: "The UNIX socket string of the Redis server, you can leave it blank",
            defaultValue: "",
        },
        {
            variableName: "db",
            message: "If set, client will run Redis select command on connect",
            defaultValue: 0,
            validate: (v) => !isNaN(v),
        },
        {
            variableName: "password",
            message: "If set, client will run Redis auth command on connect",
            defaultValue: "",
            hidden: true,
        },
    ]);
    return newConfig;
}
exports.redisConfigSetup = redisConfigSetup;
