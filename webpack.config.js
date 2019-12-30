const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: {
    "service-worker": ["babel-polyfill", "./itemize/client/workers/service.worker.ts"],
    "cache-worker": ["babel-polyfill", "./itemize/client/workers/cache.worker.ts"],
    "build": ["babel-polyfill", "./src/client/index.tsx"],
  },
  devtool: 'inline-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: "build.development.css",
      chunkFilename: "build.development.css"
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.mjs']
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
        test: path.resolve(__dirname, "itemize/base/Root/Module/ItemDefinition/Item/sql.ts"),
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
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
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
    filename: '[name].development.js',
    path: path.resolve(__dirname, 'dist/data')
  }
};
