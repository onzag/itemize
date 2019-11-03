const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: ["babel-polyfill", './core/client/index.tsx'],
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
        test: path.resolve(__dirname, "node_modules/fast-html-parser/index.js"),
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
    filename: 'build.development.js',
    path: path.resolve(__dirname, 'dist/data')
  }
};
