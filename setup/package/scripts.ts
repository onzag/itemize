/**
 * These scripts are injected to the package json
 * @module
 */

export default {
  "install": "tsc",
  "tsc": "tsc",
  "esbuild": "NODE_ENV=production node esbuild.js",
  "esbuild-dev": "NODE_ENV=development node esbuild.js",
  "build": "itemize build-data && tsc && NODE_ENV=development node esbuild.js && NODE_ENV=production node esbuild.js",
  "start-silly-server": "LOG_LEVEL=silly NODE_ENV=development node -r ./node_modules/@onzag/itemize/server-resolve.js ./dist/server/index.js",
  "start-dev-server": "NODE_ENV=development node -r ./node_modules/@onzag/itemize/server-resolve.js ./dist/server/index.js",
  "test-development": "NODE_ENV=development node -r ./node_modules/@onzag/itemize/server-resolve.js ./tests/index.js",
  "test-production": "NODE_ENV=production node -r ./node_modules/@onzag/itemize/server-resolve.js ./tests/index.js",
  "start-production-server": "NODE_ENV=production node -r ./node_modules/@onzag/itemize/server-resolve.js ./dist/server/index.js",
  "connection-test": "itemize connection-test",

  "setup": "itemize setup",
  "build-data": "itemize build-data",
  "build-database": "itemize build-database",
  "get-deployable": "itemize get-deployable",
  "start-dev-environment": "itemize start-dev-environment",
  "stop-dev-environment": "itemize stop-dev-environment",
}