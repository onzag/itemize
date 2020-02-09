export default {
  // general utilities used in fullstack fashion
  "moment": "^2.24.0",            // it's moment
  "deep-equal": "^1.1.1",         // used all the way though the app
  "convert-units": "^2.3.4",      // used by the unit type
  "diacritics": "^1.3.0",         // used to remove diacritics
  "dompurify": "^2.0.7",          // used to avoid XSS attack for text types
  "pretty-bytes": "^5.3.0",       // display bytes prettily
  "uuid": "^3.3.3",               // uuid

  // server only utilities
  "bcrypt": "^3.0.7",
  "body-parser": "^1.19.0",
  "debug": "^4.1.1",
  "express": "^4.17.1",
  "express-graphql": "^0.9.0",
  "graphql": "^14.5.8",
  "graphql-fields": "^2.0.3",
  "graphql-upload": "^9.0.0",
  "jsonwebtoken": "^8.5.1",
  "jsdom": "^15.2.1",
  "knex": "^0.16.5",
  "pg": "^7.15.1",
  "redis": "^2.8.0",
  "sharp": "^0.23.4",             // image loading
  "socket.io": "^2.3.0",

  // client only utilities
  "@date-io/moment": "^1.3.13",   // to connect moment to some react components
  "history": "^4.10.1",           // history api
  "react": "^16.12.0",
  "react-dom": "^16.12.0",
  "react-router-dom": "^5.1.2",
  "idb": "^4.0.5",                // indexed db wrapper
  "comlink": "^4.2.0",
  "socket.io-client": "^2.3.0",

  // non-browser client utilities
  "form-data": "^3.0.0",          // FormData outside the browser
  "node-fetch": "^2.6.0",         // fetch outside the browser

  // client side polyfills
  "core-js": "^3.6.4",
  "regenerator-runtime": "^0.13.3",

  // client side material ui prototyping
  "@material-ui/core": "^4.8.0",
  "@material-ui/icons": "^4.5.1",
  "@material-ui/pickers": "^3.2.8",

  // client side general prototyping
  "react-autosuggest": "^9.4.3",
  "autosuggest-highlight": "^3.1.1",
  "react-dropzone": "^10.2.1",
  "react-leaflet": "^2.6.1",
  "leaflet": "^1.6.0",
  "react-quill": "^1.3.3",

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

  // tslint
  "tslint": "^5.20.1",
  "tslint-react": "^3.6.0",
};
