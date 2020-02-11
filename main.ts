#!/usr/bin/env node

import setup from "./setup";
import { start, stop } from "./dev-environment";
import colors from "colors";
import build from "./builder";

const action = process.argv[2];
const toRun = process.argv[3] === "run";
const remainingArgs = process.argv.slice(4);

const actionRegistry: {
  [fn: string]: {
    fn: (remainingArgs?: string[]) => Promise<void>;
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
  "build-schema": {
    fn: build,
    description: "Processes the itemize resources and initializes a new build number",
  },
  "build-developemnt-database": {
    fn: null,
    description: "Builds the development database (warning you must run build-schema before this) " +
    "if using a development environment, remember to run start-development-environment"
  },
  "build-staging-database": {
    fn: null,
    description: "Builds the staging database (warning you must run build-schema before this)",
  },
  "build-production-database": {
    fn: null,
    description: "Builds the development database (warning you must run build-schema before this)"
  },
};

(async () => {
  if (actionRegistry[action]) {
    if (toRun) {
      try {
        await actionRegistry[action].fn(remainingArgs);
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
