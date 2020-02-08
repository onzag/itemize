export default `const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WorkerInjectorGeneratorPlugin = require("worker-injector-generator-plugin");

const isDevelopment = process.env.NODE_ENV = "development";
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
  },
  devtool: isDevelopment ? 'inline-source-map' : null,
  plugins,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.mjs']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          minChunks: 2,
          chunks(chunk) {
            return chunk.name !== "service-worker";
          },
        },
      }
    }
  },
  module: {
    rules: [
      {
        test: path.resolve(__dirname, "node_modules/jsdom/lib/api.js"),
        use: "null-loader"
      },
      {
        test: path.resolve(__dirname, "node_modules/knex/index.js"),
        use: "null-loader"
      },
      {
        test: path.resolve(__dirname, "node_modules/node-fetch/lib/index.js"),
        use: "null-loader"
      },
      {
        test: path.resolve(__dirname, "node_modules/form-data/lib/form_data.js"),
        use: "null-loader"
      },
      {
        test: path.resolve(__dirname, "node_modules/bcrypt/bcrypt.js"),
        use: "null-loader"
      },
      {
        test: path.resolve(__dirname, "itemize/base/Root/Module/sql.ts"),
        use: "null-loader"
      },
      {
        test: path.resolve(__dirname, "itemize/base/Root/Module/ItemDefinition/sql.ts"),
        use: "null-loader"
      },
      {
        test: path.resolve(__dirname, "itemize/base/Root/Module/ItemDefinition/PropertyDefinition/sql.ts"),
        use: "null-loader"
      },
      {
        test: path.resolve(__dirname, "itemize/base/Root/Module/ItemDefinition/Include/sql.ts"),
        use: "null-loader"
      },
      {
        test: /\.worker.\ts$/,
        use: "null-loader"
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.s?css$/,
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
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }
    ]
  },
  output: {
    filename: "[name]." + mode + ".js",
    path: path.resolve(__dirname, 'dist/data')
  }
};
`;
