const path = require('path');

module.exports = {
  mode: 'production',
  entry: './core/client/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      }
    ]
  },
  output: {
    filename: 'build.production.js',
    path: path.resolve(__dirname, 'dist/data')
  }
};
