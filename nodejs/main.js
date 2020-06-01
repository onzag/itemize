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
const getdeployable_1 = __importDefault(require("./getdeployable"));
const action = process.argv[2];
const wantsSpecificHelp = process.argv[3] === "--help";
const remainingArgs = process.argv.slice(3);
const actionRegistry = {
    "setup": {
        fn: setup_1.default,
        description: "run the initial setup, you can run this utility over again to re-setup",
        usage: "itemize setup (step)",
    },
    "get-deployable": {
        fn: getdeployable_1.default,
        description: "Provides the full docker compose deployable based on the config, ensure to run `npm run build` before this step " +
            "your server should work already locally before you attempt to get the deployable",
        usage: "itemize get-deployable [development|staging|production] [build-name] [full|standard|slim|(comma-separated-services)]"
    },
    "start-dev-environment": {
        fn: dev_environment_1.start,
        description: "Starts the development environment, as configured",
        usage: "itemize start-dev-environment [development|staging|production]",
    },
    "stop-dev-environment": {
        fn: dev_environment_1.stop,
        description: "Stops the development environment",
        usage: "itemize stop-dev-environment [development|staging|production]",
    },
    "build-data": {
        fn: builder_1.default,
        description: "Processes the itemize resources and initializes a new build number",
        usage: "itemize build-data",
    },
    "build-database": {
        fn: dbbuilder_1.default,
        description: "Builds the database (warning you must run build-data before this) " +
            "pass the argument development, staging or production in order to specify which config to use " +
            "if using a development environment, remember to run start-development-environment",
        usage: "itemize build-database [development|staging|production]",
    },
};
(async () => {
    if (actionRegistry[action]) {
        if (wantsSpecificHelp) {
            console.log(actionRegistry[action].description);
        }
        else {
            try {
                await actionRegistry[action].fn(...remainingArgs);
            }
            catch (err) {
                console.log(colors_1.default.red(err.stack));
                process.exit(1);
            }
        }
    }
    else {
        console.log(colors_1.default.green("Welcome to itemize build tool"));
        Object.keys(actionRegistry).forEach((action) => {
            console.log(colors_1.default.yellow(action) + "\n\t" + actionRegistry[action].description);
        });
    }
})();
