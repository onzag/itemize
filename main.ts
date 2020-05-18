#!/usr/bin/env node

import setup from "./setup";
import { start, stop } from "./dev-environment";
import colors from "colors";
import buildData from "./builder";
import buildDatabase from "./dbbuilder";

const action = process.argv[2];
const wantsSpecificHelp = process.argv[3] === "--help";
const remainingArgs = process.argv.slice(3);

const actionRegistry: {
  [fn: string]: {
    fn: (...remainingArgs: string[]) => Promise<void>;
    description: string;
    usage: string;
  }
} = {
  "setup": {
    fn: setup,
    description: "run the initial setup, you can run this utility over again to re-setup",
    usage: "itemize setup (step)",
  },
  "get-deployable": {
    fn: null,
    description: "Provides the full docker deployable based on the config",
    usage: "itemize get-deployable [development|staging|production] [dev-env|prod-env] [(portlist)] [build-name]"
  },
  "start-dev-environment": {
    fn: start,
    description: "Starts the development environment, as configured",
    usage: "itemize start-dev-environment [development|staging|production]",
  },
  "stop-dev-environment": {
    fn: stop,
    description: "Stops the development environment",
    usage: "itemize stop-dev-environment [development|staging|production]",
  },
  "build-data": {
    fn: buildData,
    description: "Processes the itemize resources and initializes a new build number",
    usage: "itemize build-data",
  },
  "build-database": {
    fn: buildDatabase,
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
    } else {
      try {
        await actionRegistry[action].fn(...remainingArgs);
      } catch (err) {
        console.log(colors.red(err.stack));
        process.exit(1);
      }
    }
  } else {
    console.log(colors.green("Welcome to itemize build tool"));
    Object.keys(actionRegistry).forEach((action) => {
      console.log(colors.yellow(action) + "\n\t" + actionRegistry[action].description);
    });
  }
})();
