const path = require('path');

module.exports = {
  entry: './core/client/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
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
      }
    ]
  },
  output: {
    filename: 'client.build.js',
    path: path.resolve(__dirname, 'dist')
  }
};
