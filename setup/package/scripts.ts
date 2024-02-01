/**
 * These scripts are injected to the package json
 * @module
 */

export default {
  "install": "tsc",
  "tsc": "tsc",
  "esbuild": "NODE_ENV=production node esbuild.js",
  "esbuild-dev": "NODE_ENV=development node esbuild.js",
  "build": "node -r tsconfig-paths/register ./node_modules/@onzag/itemize/nodejs/main.js build-data && tsc && NODE_ENV=development node esbuild.js && NODE_ENV=production node esbuild.js",
  "start-silly-server": "LOG_LEVEL=silly NODE_ENV=development node -r tsconfig-paths/register ./dist/server/index.js",
  "start-dev-server": "NODE_ENV=development node -r tsconfig-paths/register ./dist/server/index.js",
  "test-development": "NODE_ENV=development node -r tsconfig-paths/register ./tests/index.js",
  "test-production": "NODE_ENV=production node -r tsconfig-paths/register ./tests/index.js",
  "start-production-server": "NODE_ENV=production node -r tsconfig-paths/register ./dist/server/index.js",

  "setup": "node -r tsconfig-paths/register ./node_modules/@onzag/itemize/nodejs/main.js setup",
  "build-data": "node -r tsconfig-paths/register ./node_modules/@onzag/itemize/nodejs/main.js build-data",
  "build-database": "INSTANCE_MODE=BUILD_DATABASE node -r tsconfig-paths/register ./node_modules/@onzag/itemize/nodejs/main.js build-database",
  "get-deployable": "node -r tsconfig-paths/register ./node_modules/@onzag/itemize/nodejs/main.js get-deployable",
  "start-dev-environment": "node -r tsconfig-paths/register ./node_modules/@onzag/itemize/nodejs/main.js start-dev-environment",
  "stop-dev-environment": "node -r tsconfig-paths/register ./node_modules/@onzag/itemize/nodejs/main.js stop-dev-environment",
}