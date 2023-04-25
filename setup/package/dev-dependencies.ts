/**
 * Contains the dev dependencies that the parent project
 * should have, these are for building the project with webpack
 * @module
 */

export default {
  // builder babel and presets
  "@babel/core": "7.14.6",
  "@babel/plugin-proposal-class-properties": "7.14.5",
  "@babel/plugin-transform-regenerator": "7.14.5",
  "@babel/preset-env": "7.14.7",
  "@babel/preset-react": "7.14.5",
  "@babel/preset-typescript": "7.14.5",
  "babel-core": "6.26.3",
  "babel-loader": "8.2.2",
  "babel-preset-env": "1.7.0",
  "babel-preset-react": "6.24.1",

  // builder webpack loaders
  "css-loader": "2.1.1",                 // used to load css
  "mini-css-extract-plugin": "0.5.0",    // used to extract css
  "node-sass": "4.14.1",                 // used to parse sass
  "null-loader": "0.1.1",                // used to skip includes
  "sass-loader": "7.3.1",                // used to load sass
  "source-map-loader": "0.2.4",          // used to create source maps
  "url-loader": "1.1.2",                 // used to load via urls

  // builder webpack
  "webpack": "4.46.0",
  "webpack-cli": "3.3.12",
  "worker-injector-generator-plugin": "^1.0.4",

  // tslint
  "tslint": "5.20.1",
  "tslint-react": "3.6.0",

  // analyze final bundles
  "webpack-bundle-analyzer": "3.9.0",

  // puppeteer for testing
  "@types/puppeteer": "^3.0.2",
  "puppeteer": "^5.3.1",
};
