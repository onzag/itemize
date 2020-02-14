"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    presets: [
        "@babel/react",
        "@babel/typescript",
        [
            "@babel/env",
            {
                modules: false,
                useBuiltIns: "entry",
                corejs: 3,
                targets: "last 2 versions, not dead"
            },
        ],
    ],
    plugins: [
        "@babel/plugin-transform-regenerator",
        "@babel/plugin-proposal-class-properties",
    ],
};
