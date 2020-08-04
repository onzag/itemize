/**
 * Contains the standard webpack config
 * as a string
 * @packageDocumentation
 */
declare const _default: "const path = require('path');\nconst webpack = require(\"webpack\");\nconst fs = require(\"fs\");\nconst MiniCssExtractPlugin = require(\"mini-css-extract-plugin\");\nconst BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;\nconst WorkerInjectorGeneratorPlugin = require(\"worker-injector-generator-plugin\");\n\nconst isDevelopment = process.env.NODE_ENV === \"development\";\nconst mode = isDevelopment ? \"development\" : \"production\";\n\nconst config = fs.readFileSync(\"./config/index.json\", \"utf-8\");\n\nconst plugins = [\n  // minifying CSS\n  new MiniCssExtractPlugin({\n    filename: \"[name].\" + mode + \".css\",\n    chunkFilename: \"[name].\" + mode + \".css\"\n  }),\n\n  // ignore locales and moment locales files in the build, they are imported\n  // dinamically and take too much space otherwise\n  new webpack.IgnorePlugin(/^\\.\\/locale$/, /moment$/),\n\n  // define the variable config for injecting the configuration\n  new webpack.DefinePlugin({\n    CONFIG: JSON.stringify(config),\n  }),\n\n  // worker generator plugin to share information between\n  // the worker and the standard build\n  new WorkerInjectorGeneratorPlugin({\n    name: \"cache-worker.injector.\" + mode + \".js\",\n    importScripts: [\n      \"commons.\" + mode + \".js\",\n      \"cache-worker.\" + mode + \".js\",\n    ],\n    isAsync: false,\n  }),\n]\n\n// bundle analyze if requested\nif (process.env.BUNDLE_ANALYZE) {\n  plugins.push(new BundleAnalyzerPlugin());\n}\n\nmodule.exports = {\n  mode,\n  entry: {\n    \"service-worker\": [\"./node_modules/@onzag/itemize/client/internal/workers/service/service.worker.ts\"],\n    \"cache-worker\": [\"./node_modules/@onzag/itemize/client/internal/workers/cache/cache.worker.ts\"],\n    \"build\": [\"./src/client/index.tsx\"],\n    \"polyfills\": [\"./node_modules/@onzag/itemize/client/internal/polyfills.ts\"],\n  },\n  devtool: isDevelopment ? 'inline-source-map' : false,\n  plugins,\n  resolve: {\n    extensions: ['.ts', '.tsx', '.js', '.mjs']\n  },\n  optimization: {\n    splitChunks: {\n      chunks(chunk) {\n        // service worker is self contained\n        // and should not depend on other chunks\n        return chunk.name !== \"service-worker\";\n      },\n      cacheGroups: {\n        // node modules goes to the vendor chunk\n        vendors: {\n          test: /[\\/]node_modules[\\/]/,\n          priority: -10,\n          chunks(chunk) {\n            // except for cache-worker that should have all its node\n            // modules within itself because it only truly uses comlink\n            // and idb library, which are not used in the standard app\n            // so it doesn't need vendors\n            return chunk.name !== \"cache-worker\" && chunk.name !== \"service-worker\";\n          },\n        },\n        // commons is for the itemize base\n        commons: {\n          name: 'commons',\n          minChunks: 2,\n        },\n      }\n    }\n  },\n  module: {\n    rules: [\n      // do not load streams, because of polyfill functionality\n      // and since we use readable-stream on the server side\n      // the client tries to load these\n      {\n        test: /stream-browserify/,\n        use: \"null-loader\"\n      },\n      {\n        test: /readable-stream/,\n        use: \"null-loader\"\n      },\n\n      // we do not need graphql in the client side either\n      {\n        test: /graphql/,\n        use: \"null-loader\"\n      },\n\n      // jsdom is unnecessary\n      {\n        test: /jsdom\\/lib\\/api.js/,\n        use: \"null-loader\"\n      },\n\n      // knex is for database usage so it should not\n      // be bundled\n      {\n        test: /knex/,\n        use: \"null-loader\"\n      },\n\n      // node-fetch is fetch for node, it isn't\n      // even a polyfill, it's just that we use this library\n      // to run fetch requests standalone when creating custom\n      // clients\n      {\n        test: /node\\-fetch\\/lib\\/index\\.js/,\n        use: \"null-loader\"\n      },\n\n      // form data is a well for these custom clients and it's\n      // unnecessary in the browsers, it's used for creating\n      // custom form data for upstream\n      {\n        test: /form_data\\.js/,\n        use: \"null-loader\"\n      },\n\n      // bcrypt is used in the server side for hot validating passwords\n      // but it's unecessary in the client side, in fact\n      // it wouldn't even work\n      {\n        test: /bcrypt\\.js/,\n        use: \"null-loader\"\n      },\n\n      // SQL handling files are unecessary as well\n      {\n        test: /itemize\\/[a-zA-Z0-9_\\/]+\\/sql\\.ts/,\n        use: \"null-loader\"\n      },\n      {\n        test: /itemize\\/[a-zA-Z0-9_\\/]+\\/sql\\/[a-zA-Z0-9_-]+\\.ts/,\n        use: \"null-loader\"\n      },\n\n      // and these are the classical loaders\n      {\n        test: /\\.tsx?$/,\n        use: {\n          loader: \"babel-loader\"\n        },\n      },\n      {\n        test: /\\.s?css$/,\n        use: [\n          {\n            loader: MiniCssExtractPlugin.loader\n          },\n          {\n            loader: \"css-loader\"\n          },\n          {\n            loader: \"sass-loader\"\n          }\n        ]\n      },\n      {\n        test: /\\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,\n        loader: 'url-loader',\n        options: {\n          limit: 10000,\n        },\n      },\n      {\n        test: /\\.mjs$/,\n        include: /node_modules/,\n        type: 'javascript/auto'\n      }\n    ]\n  },\n  output: {\n    filename: \"[name].\" + mode + \".js\",\n    path: path.resolve(path.join(\"dist\", \"data\")),\n    publicPath: \"/rest/resource\",\n  }\n};\n";
export default _default;
