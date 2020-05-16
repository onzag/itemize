"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read_1 = require("../read");
async function redisConfigSetup(version, currentConfig, referenceConfig, packageJSON) {
    const extractDataRedis = [
        {
            variableName: "host",
            message: "The host where redis is running",
            defaultValue: "127.0.0.1",
            nullifyFalseValues: true,
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
            nullifyFalseValues: true,
        },
        {
            variableName: "db",
            message: "If set, client will run Redis select command on connect",
            defaultValue: 0,
            validate: (v) => !isNaN(v),
            nullifyFalseValues: true,
        },
        {
            variableName: "password",
            message: "If set, client will run Redis auth command on connect",
            defaultValue: "",
            hidden: true,
            nullifyFalseValues: true,
        }
    ];
    const usedConfig = currentConfig || referenceConfig;
    const newConfig = await read_1.configRequest(usedConfig, "Redis configuration (" + version + ")", [
        {
            variableName: "global",
            type: "config",
            defaultValue: null,
            message: "Cache configuration that is used for the global volatile memory that is shared between instances",
            extractData: extractDataRedis,
        },
        {
            variableName: "cache",
            type: "config",
            defaultValue: null,
            message: "Cache configuration that is used for the internal service cache",
            extractData: extractDataRedis,
        },
        {
            variableName: "pubSub",
            type: "config",
            defaultValue: null,
            message: "Pubsub redis instance that is used for notifying variable changes and other notifications",
            extractData: extractDataRedis,
        },
    ]);
    return newConfig;
}
exports.redisConfigSetup = redisConfigSetup;
