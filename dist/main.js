#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = __importDefault(require("./setup"));
const dev_environment_1 = require("./dev-environment");
const colors_1 = __importDefault(require("colors"));
const builder_1 = __importDefault(require("./builder"));
const dbbuilder_1 = __importDefault(require("./dbbuilder"));
const action = process.argv[2];
const toRun = process.argv[3] === "run";
const remainingArgs = process.argv.slice(4);
const actionRegistry = {
    "setup": {
        fn: setup_1.default,
        description: "run the initial setup, you can run this utility over again to re-setup"
    },
    "get-development-deployable": {
        fn: null,
        description: "Provides the development docker deployable based on the config"
    },
    "get-staging-deployable": {
        fn: null,
        description: "Provides the staging docker deployable based on the config"
    },
    "get-production-deployable": {
        fn: null,
        description: "Provides the production docker deployable based on the config"
    },
    "start-development-environment": {
        fn: dev_environment_1.start,
        description: "Starts the development environment, as configured"
    },
    "stop-development-environment": {
        fn: dev_environment_1.stop,
        description: "Stops the development environment",
    },
    "build-data": {
        fn: builder_1.default,
        description: "Processes the itemize resources and initializes a new build number",
    },
    "build-database": {
        fn: dbbuilder_1.default,
        description: "Builds the database (warning you must run build-data before this) " +
            "pass the argument development, staging or production in order to specify which config to use " +
            "if using a development environment, remember to run start-development-environment"
    },
};
(async () => {
    if (actionRegistry[action]) {
        if (toRun) {
            try {
                await actionRegistry[action].fn(...remainingArgs);
            }
            catch (err) {
                console.log(colors_1.default.red(err.stack));
                process.exit(1);
            }
        }
        else {
            console.log("use " + colors_1.default.yellow(action + " run ") + "to execute");
            console.log(actionRegistry[action].description);
        }
    }
    else {
        console.log(colors_1.default.green("Welcome to itemize build tool"));
        Object.keys(actionRegistry).forEach((action) => {
            console.log(colors_1.default.yellow(action) + "\n\t" + actionRegistry[action].description);
        });
    }
})();
