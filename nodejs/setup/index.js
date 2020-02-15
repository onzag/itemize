"use strict";
/**
 * This file is in charge of running all the steps for the setup of an itemize app
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const docker_1 = __importDefault(require("./docker"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./config"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const git_1 = __importDefault(require("./git"));
const package_1 = __importDefault(require("./package"));
const babel_1 = __importDefault(require("./babel"));
const webpack_1 = __importDefault(require("./webpack"));
const src_1 = __importDefault(require("./src"));
const typescript_1 = __importDefault(require("./typescript"));
const fsAsync = fs_1.default.promises;
const stepsInOrder = [
    {
        fn: config_1.default,
        name: "config",
    },
    {
        fn: docker_1.default,
        name: "docker",
    },
    {
        fn: git_1.default,
        name: "git",
    },
    {
        fn: package_1.default,
        name: "package",
    },
    {
        fn: babel_1.default,
        name: "babel",
    },
    {
        fn: typescript_1.default,
        name: "typescript",
    },
    {
        fn: webpack_1.default,
        name: "webpack",
    },
    {
        fn: src_1.default,
        name: "src",
    }
];
async function setup(...onlyNames) {
    console.log(colors_1.default.bgGreen("INITIALIZING SETUP"));
    await ensureConfigDirectory();
    const standardConfig = await readConfigFile("index.json");
    const sensitiveConfigDevelopment = await readConfigFile("index.sensitive.json");
    const dbConfigDevelopment = await readConfigFile("db.sensitive.json");
    const redisConfigDevelopment = await readConfigFile("redis.sensitive.json");
    const sensitiveConfigStaging = await readConfigFile("index.staging.sensitive.json");
    const dbConfigStaging = await readConfigFile("db.staging.sensitive.json");
    const redisConfigStaging = await readConfigFile("redis.staging.sensitive.json");
    const sensitiveConfigProduction = await readConfigFile("index.production.sensitive.json");
    const dbConfigProduction = await readConfigFile("db.production.sensitive.json");
    const redisConfigProduction = await readConfigFile("redis.production.sensitive.json");
    let arg = {
        standardConfig,
        sensitiveConfigDevelopment,
        dbConfigDevelopment,
        redisConfigDevelopment,
        sensitiveConfigStaging,
        dbConfigStaging,
        redisConfigStaging,
        sensitiveConfigProduction,
        dbConfigProduction,
        redisConfigProduction,
    };
    for (const step of stepsInOrder) {
        if (onlyNames.length && !onlyNames.includes(step.name)) {
            continue;
        }
        arg = await step.fn(arg);
    }
    await writeConfigFile("index.json", arg.standardConfig, standardConfig);
    await writeConfigFile("index.sensitive.json", arg.sensitiveConfigDevelopment, sensitiveConfigDevelopment);
    await writeConfigFile("db.sensitive.json", arg.dbConfigDevelopment, dbConfigDevelopment);
    await writeConfigFile("redis.sensitive.json", arg.redisConfigDevelopment, redisConfigDevelopment);
    await writeConfigFile("index.staging.sensitive.json", arg.sensitiveConfigStaging, sensitiveConfigStaging);
    await writeConfigFile("db.staging.sensitive.json", arg.dbConfigStaging, dbConfigStaging);
    await writeConfigFile("redis.staging.sensitive.json", arg.redisConfigStaging, redisConfigStaging);
    await writeConfigFile("index.production.sensitive.json", arg.sensitiveConfigProduction, sensitiveConfigProduction);
    await writeConfigFile("db.production.sensitive.json", arg.dbConfigProduction, dbConfigProduction);
    await writeConfigFile("redis.production.sensitive.json", arg.redisConfigProduction, redisConfigProduction);
}
exports.default = setup;
async function ensureConfigDirectory() {
    let exists = true;
    try {
        await fsAsync.access("config", fs_1.default.constants.F_OK);
    }
    catch (e) {
        exists = false;
    }
    if (!exists) {
        // let the error be free
        await fsAsync.mkdir("config");
    }
    let gitignoreExists = true;
    try {
        await fsAsync.access(path_1.default.join("config", ".gitignore"), fs_1.default.constants.F_OK);
    }
    catch (e) {
        gitignoreExists = false;
    }
    if (!gitignoreExists) {
        console.log("emiting " + colors_1.default.green(".gitignore"));
        await fsAsync.writeFile(path_1.default.join("config", ".gitignore"), "*.sensitive.json");
    }
}
exports.ensureConfigDirectory = ensureConfigDirectory;
async function readConfigFile(fileName) {
    let exists = true;
    try {
        await fsAsync.access(path_1.default.join("config", fileName), fs_1.default.constants.F_OK);
    }
    catch (e) {
        exists = false;
    }
    if (!exists) {
        return null;
    }
    console.log("reading " + colors_1.default.green(path_1.default.join("config", fileName)));
    const content = await fsAsync.readFile(path_1.default.join("config", fileName), "utf-8");
    return JSON.parse(content);
}
exports.readConfigFile = readConfigFile;
async function writeConfigFile(fileName, data, original) {
    if (!deep_equal_1.default(data, original)) {
        console.log("emiting " + colors_1.default.green(path_1.default.join("config", fileName)));
        await fsAsync.writeFile(path_1.default.join("config", fileName), JSON.stringify(data, null, 2));
    }
}
exports.writeConfigFile = writeConfigFile;
