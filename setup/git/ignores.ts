/**
 * These are the default ignores
 * @module
 */

export default [
  // dist folder that itemize generates on esbuild build
  "/dist",
  // the itemize folder used to be there some time ago and sometimes used
  // during development
  "/itemize",
  // standard node modules
  "/node_modules",
  // the dev environment that is created when docker is launched for dev mode
  "/devenv",
  // the deployments folder for when the get-deployable script is created
  "/deployments",
  // uploads folder
  "/uploads",
  // logs folder
  "/logs",
  // the nom token itself
  ".npm-token",
  // the npm debug log
  "npm-debug.log",
  // some status files generated when running build-database
  "db-status.json",
  "db-status.optimal.json",
  "db-status.corruption.json",
];
