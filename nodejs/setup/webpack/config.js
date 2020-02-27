"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WorkerInjectorGeneratorPlugin = require("worker-injector-generator-plugin");

const isDevelopment = process.env.NODE_ENV === "development";
const mode = isDevelopment ? "development" : "production";

const plugins = [
  new MiniCssExtractPlugin({
    filename: "build." + mode + ".css",
    chunkFilename: "build." + mode + ".css"
  }),
  new webpack.IgnorePlugin(/^\\.\\/locale$/, /moment$/),
  new WorkerInjectorGeneratorPlugin({
    name: "cache-worker.injector." + mode + ".js",
    importScripts: [
      "commons." + mode + ".js",
      "cache-worker." + mode + ".js",
    ],
    isAsync: !isDevelopment,
  }),
]

if (process.env.BUNDLE_ANALYZE) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  mode,
  entry: {
    "service-worker": ["./node_modules/itemize/client/internal/workers/service/service.worker.ts"],
    "cache-worker": ["./node_modules/itemize/client/internal/workers/cache/cache.worker.ts"],
    "build": ["./src/client/index.tsx"],
    "polyfills": ["./node_modules/itemize/client/internal/polyfills.ts"],
  },
  devtool: isDevelopment ? 'inline-source-map' : false,
  plugins,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.mjs']
  },
  optimization: {
    splitChunks: {
      chunks(chunk) {
        return chunk.name !== "service-worker";
      },
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks(chunk) {
            return chunk.name !== "cache-worker" && chunk.name !== "service-worker";
          },
        },
        commons: {
          name: 'commons',
          minChunks: 2,
        },
      }
    }
  },
  module: {
    rules: [
      {
        test: /stream-browserify/,
        use: "null-loader"
      },
      {
        test: /readable-stream/,
        use: "null-loader"
      },
      {
        test: /graphql/,
        use: "null-loader"
      },
      {
        test: /jsdom\\/lib\\/api\.js/,
        use: "null-loader"
      },
      {
        test: /knex/,
        use: "null-loader"
      },
      {
        test: /node\\-fetch\\/lib\\/index\\.js/,
        use: "null-loader"
      },
      {
        test: /form_data\\.js/,
        use: "null-loader"
      },
      {
        test: /bcrypt\\.js/,
        use: "null-loader"
      },
      {
        test: /itemize\\/[a-zA-Z0-9_\\/]+\\/sql\\.ts/,
        use: "null-loader"
      },
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
