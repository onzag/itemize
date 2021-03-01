/**
 * Contains the standard webpack config
 * as a string
 * @module
 */

export default `const path = require('path');
const webpack = require("webpack");
const fs = require("fs");
const itemizeConfig = require("./itemize.config");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WorkerInjectorGeneratorPlugin = require("worker-injector-generator-plugin");

const isDevelopment = process.env.NODE_ENV === "development";
const mode = isDevelopment ? "development" : "production";

const config = fs.readFileSync("./config/index.json", "utf-8");

const plugins = [
  // minifying CSS
  new MiniCssExtractPlugin({
    filename: "[name]." + mode + ".css",
    chunkFilename: "[name]." + mode + ".css"
  }),

  // ignore locales and moment locales files in the build, they are imported
  // dinamically and take too much space otherwise
  new webpack.IgnorePlugin(/^\\.\\/locale$/, /moment$/),

  // define the variable config for injecting the configuration
  new webpack.DefinePlugin({
    CONFIG: JSON.stringify(config),
  }),
  
  // define itemize config to be injected
  new webpack.DefinePlugin({
    ITEMIZE_CONSTANTS_CONFIG: JSON.stringify(itemizeConfig.constants),
  }),

  // worker generator plugin to share information between
  // the worker and the standard build
  new WorkerInjectorGeneratorPlugin({
    name: "cache-worker.injector." + mode + ".js",
    importScripts: [
      "commons." + mode + ".js",
      "cache-worker." + mode + ".js",
    ],
    isAsync: false,
  }),
]

// bundle analyze if requested
if (process.env.BUNDLE_ANALYZE) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  mode,
  entry: {
    "service-worker": ["./node_modules/@onzag/itemize/client/internal/workers/service/service.worker.ts"],
    "cache-worker": ["./node_modules/@onzag/itemize/client/internal/workers/cache/cache.worker.ts"],
    "build": ["./src/client/index.tsx"],
    "polyfills": ["./node_modules/@onzag/itemize/client/internal/polyfills.ts"],
  },
  devtool: isDevelopment ? 'inline-source-map' : false,
  plugins,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.mjs']
  },
  optimization: {
    splitChunks: {
      chunks(chunk) {
        // service worker is self contained
        // and should not depend on other chunks
        return chunk.name !== "service-worker";
      },
      cacheGroups: {
        // node modules goes to the vendor chunk
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks(chunk) {
            // except for cache-worker that should have all its node
            // modules within itself because it only truly uses comlink
            // and idb library, which are not used in the standard app
            // so it doesn't need vendors
            return chunk.name !== "cache-worker" && chunk.name !== "service-worker";
          },
        },
        // commons is for the itemize base
        commons: {
          name: 'commons',
          minChunks: 2,
        },
      }
    }
  },
  module: {
    rules: [
      // do not load streams, because of polyfill functionality
      // and since we use readable-stream on the server side
      // the client tries to load these
      {
        test: /stream-browserify/,
        use: "null-loader"
      },
      {
        test: /readable-stream/,
        use: "null-loader"
      },

      // we do not need graphql in the client side either
      {
        test: /graphql/,
        use: "null-loader"
      },

      // jsdom is unnecessary
      {
        test: /jsdom\\/lib\\/api\.js/,
        use: "null-loader"
      },

      // pg is for database usage so it should not
      // be bundled
      {
        test: /pg/,
        use: "null-loader"
      },

      // node-fetch is fetch for node, it isn't
      // even a polyfill, it's just that we use this library
      // to run fetch requests standalone when creating custom
      // clients
      {
        test: /node\\-fetch\\/lib\\/index\\.js/,
        use: "null-loader"
      },

      // form data is a well for these custom clients and it's
      // unnecessary in the browsers, it's used for creating
      // custom form data for upstream
      {
        test: /form_data\\.js/,
        use: "null-loader"
      },

      // bcrypt is used in the server side for hot validating passwords
      // but it's unecessary in the client side, in fact
      // it wouldn't even work
      {
        test: /bcrypt\\.js/,
        use: "null-loader"
      },

      // SQL handling files are unecessary as well
      {
        test: /itemize\\/[a-zA-Z0-9_\\/]+\\/sql\\.ts/,
        use: "null-loader"
      },
      {
        test: /itemize\\/database\\/*\\.ts/,
        use: "null-loader"
      },
      {
        test: /itemize\\/[a-zA-Z0-9_\\/]+\\/sql\\/[a-zA-Z0-9_-]+\\.ts/,
        use: "null-loader"
      },

      // and these are the classical loaders
      {
        test: /\\.tsx?$/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }
    ]
  },
  output: {
    filename: "[name]." + mode + ".js",
    path: path.resolve(path.join("dist", "data")),
    publicPath: "/rest/resource",
  }
};
`;
