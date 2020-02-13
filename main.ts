#!/usr/bin/env node

import setup from "./setup";
import { start, stop } from "./dev-environment";
import colors from "colors";
import buildData from "./builder";
import buildDatabase from "./dbbuilder";

const action = process.argv[2];
const toRun = process.argv[3] === "run";
const remainingArgs = process.argv.slice(4);

const actionRegistry: {
  [fn: string]: {
    fn: (...remainingArgs: string[]) => Promise<void>;
    description: string;
  }
} = {
  "setup": {
    fn: setup,
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
    fn: start,
    description: "Starts the development environment, as configured"
  },
  "stop-development-environment": {
    fn: stop,
    description: "Stops the development environment",
  },
  "build-data": {
    fn: buildData,
    description: "Processes the itemize resources and initializes a new build number",
  },
  "build-database": {
    fn: buildDatabase,
    description: "Builds the database (warning you must run build-data before this) " +
    "pass the argument development, staging or production in order to specify which config to use " +
    "if using a development environment, remember to run start-development-environment"
  },
};

(async () => {
  if (actionRegistry[action]) {
    if (toRun) {
      try {
        await actionRegistry[action].fn(...remainingArgs);
      } catch (err) {
        console.log(colors.red(err.stack));
        process.exit(1);
      }
    } else {
      console.log("use " + colors.yellow(action + " run ") + "to execute");
      console.log(actionRegistry[action].description);
    }
  } else {
    console.log(colors.green("Welcome to itemize build tool"));
    Object.keys(actionRegistry).forEach((action) => {
      console.log(colors.yellow(action) + "\n\t" + actionRegistry[action].description);
    });
  }
})();
