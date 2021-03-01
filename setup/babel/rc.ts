/**
 * Contains the standard file for babel.config.json
 * @module
 */

export default {
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
