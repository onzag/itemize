export default {
  // peer dependencies
  "@types/react": "^16.9.17",
  "@types/react-dom": "^16.9.4",
  "react": "^16.12.0",
  "react-dom": "^16.12.0",
  "deep-equal": "^1.1.1",

  // builder babel and presets
  "@babel/core": "^7.7.7",
  "@babel/plugin-proposal-class-properties": "^7.7.4",
  "@babel/plugin-transform-regenerator": "^7.7.5",
  "@babel/preset-env": "^7.7.7",
  "@babel/preset-react": "^7.7.4",
  "@babel/preset-typescript": "^7.7.7",
  "babel-core": "^6.26.3",
  "babel-loader": "^8.0.6",
  "babel-preset-env": "^1.7.0",
  "babel-preset-react": "^6.24.1",

  // builder webpack loaders
  "css-loader": "^2.1.1",                 // used to load css
  "mini-css-extract-plugin": "^0.5.0",    // used to extract css
  "node-sass": "^4.13.1",                 // used to parse sass
  "null-loader": "^0.1.1",                // used to skip includes
  "sass-loader": "^7.3.1",                // used to load sass
  "source-map-loader": "^0.2.4",          // used to create source maps
  "url-loader": "^1.1.2",                 // used to load via urls

  // builder webpack
  "webpack": "^4.41.4",
  "webpack-cli": "^3.3.10",
  "worker-injector-generator-plugin": "^1.0.1",

  // builder typescript
  "typescript": "^3.7.4",

  // tslint
  "tslint": "^5.20.1",
  "tslint-react": "^3.6.0",

  // analyze final bundles
  "webpack-bundle-analyzer": "^3.6.0",
};
