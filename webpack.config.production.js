const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  entry: ["babel-polyfill", './core/client/index.tsx'],
  plugins: [
    new MiniCssExtractPlugin({
      filename: "build.production.css",
      chunkFilename: "build.production.css"
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
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
      }
    ]
  },
  output: {
    filename: 'build.production.js',
    path: path.resolve(__dirname, 'dist/data')
  }
};
