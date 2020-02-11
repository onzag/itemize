"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "install": "itemize setup run src && tsc && NODE_ENV=development webpack && NODE_ENV=production webpack",
    "tsc": "tsc",
    "hard-tsc": "tsc -p node_modules/itemize && itemize setup run src && tsc",
    "webpack": "NODE_ENV=production webpack",
    "webpack-dev": "NODE_ENV=development webpack",
    "hard-webpack-dev": "itemize setup run src && NODE_ENV=development webpack",
    "webpack-analyze": "NODE_ENV=production BUNDLE_ANALYZE=true webpack",
    "build": "NODE_ENV=development webpack && NODE_ENV=production webpack",
    "run-development-server": "NODE_ENV=development node ./dist/src/server.js",
    "run-production-server": "NODE_ENV=production node ./dist/src/server.js",
    "setup": "itemize setup",
    "build-data": "itemize build-data",
    "build-development-database": "itemize build-development-database",
    "build-staging-database": "itemize build-staging-database",
    "build-production-database": "itemize build-production-database",
    "get-development-deployable": "itemize get-development-deployable",
    "get-staging-deployable": "itemize get-staging-deployable",
    "get-production-deployable": "itemize get-production-deployable",
    "start-development-environment": "itemize start-development-environment",
    "stop-development-environment": "itemize stop-development-environment",
};
