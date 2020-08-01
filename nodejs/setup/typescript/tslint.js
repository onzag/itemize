"use strict";
/**
 * Setups the tslint with the default itemize configuration
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    extends: ["tslint:recommended", "tslint-react"],
    rules: {
        "object-literal-sort-keys": false,
        "ordered-imports": false,
        "no-console": false,
        "no-var-requires": false,
        "jsx-no-multiline-js": false,
        "max-classes-per-file": false,
        "jsx-key": false,
    },
};
