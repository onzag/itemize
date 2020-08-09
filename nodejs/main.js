#!/usr/bin/env node
"use strict";
/**
 * Main entry file for itemize
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = __importDefault(require("./setup"));
const dev_environment_1 = require("./dev-environment");
const colors_1 = __importDefault(require("colors"));
const builder_1 = __importDefault(require("./builder"));
const dbbuilder_1 = __importDefault(require("./dbbuilder"));
const getdeployable_1 = __importDefault(require("./getdeployable"));
// the action we are asked to execute is the thrird argument 0 is node, 1 is itemize
const action = process.argv[2];
// if this argument is help for the specific process
const wantsSpecificHelp = process.argv[3] === "--help" || process.argv[3] === "help";
// the remaining args
const remainingArgs = process.argv.slice(3);
// now this is our action registry for the actions we want to execute
const actionRegistry = {
    "setup": {
        fn: setup_1.default,
        description: "run the initial setup, you can run this utility over again to re-setup",
        usage: "itemize setup (step)",
        needsArgs: 0,
        arbitraryArgs: true,
    },
    "get-deployable": {
        fn: getdeployable_1.default,
        description: "Provides the full docker compose deployable based on the config",
        usage: "itemize get-deployable [development|production] [build-name] [full|standard|slim|(comma-separated-services)]",
        needsArgs: 3,
    },
    "start-dev-environment": {
        fn: dev_environment_1.start,
        description: "Starts the development environment, as configured",
        usage: "itemize start-dev-environment [development|production]",
        needsArgs: 1,
    },
    "stop-dev-environment": {
        fn: dev_environment_1.stop,
        description: "Stops the development environment",
        usage: "itemize stop-dev-environment [development|production]",
        needsArgs: 1,
    },
    "build-data": {
        fn: builder_1.default,
        description: "Processes the itemize resources and initializes a new build number",
        usage: "itemize build-data",
        needsArgs: 0,
    },
    "build-database": {
        fn: dbbuilder_1.default,
        description: "Builds the database (warning you must run build-data before this) " +
            "pass the argument development or production in order to specify which config to use " +
            "if using a development environment, remember to run start-development-environment",
        usage: "itemize build-database [development|production]",
        needsArgs: 1,
    },
};
// and we trigger these in an async function
(async () => {
    // so if our action is registered
    if (actionRegistry[action]) {
        // if we are tasked with getting specific help, or if the amount of args we need do not match
        if (wantsSpecificHelp ||
            (actionRegistry[action].needsArgs !== remainingArgs.length &&
                !actionRegistry[action].arbitraryArgs)) {
            // we show the specific usage
            console.log(actionRegistry[action].description);
            console.log("usage: " + colors_1.default.yellow(actionRegistry[action].usage));
        }
        else {
            // otherwise we try to execute
            try {
                await actionRegistry[action].fn(...remainingArgs);
            }
            catch (err) {
                // if something failed during the process we show the error stack and exit with status 1
                console.log(colors_1.default.red(err.stack));
                process.exit(1);
            }
        }
    }
    else {
        // otherwise we just show the help information
        console.log(colors_1.default.green("Welcome to itemize build tool"));
        // we get into the action registry
        Object.keys(actionRegistry).forEach((action) => {
            // and explain each action
            console.log(colors_1.default.yellow(action) + "\n\t" + actionRegistry[action].description);
        });
    }
})();
