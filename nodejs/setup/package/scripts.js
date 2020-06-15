"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "install": "tsc",
    "tsc": "tsc",
    "webpack": "NODE_ENV=production webpack",
    "webpack-dev": "NODE_ENV=development webpack",
    "webpack-analyze": "NODE_ENV=production BUNDLE_ANALYZE=true webpack",
    "build": "itemize build-data && tsc && NODE_ENV=development webpack && NODE_ENV=production webpack",
    "start-silly-server": "LOG_LEVEL=silly NODE_ENV=development node -r tsconfig-paths/register ./dist/server/index.js",
    "start-dev-server": "NODE_ENV=development node -r tsconfig-paths/register ./dist/server/index.js",
    "start-production-server": "NODE_ENV=production node -r tsconfig-paths/register ./dist/server/index.js",
    "setup": "itemize setup",
    "build-data": "itemize build-data",
    "build-database": "itemize build-database",
    "get-deployable": "itemize get-deployable",
    "start-dev-environment": "itemize start-dev-environment",
    "stop-dev-environment": "itemize stop-dev-environment",
};
