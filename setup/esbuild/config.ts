/**
 * Contains the standard esbuild config
 * as a string
 * @module
 */

export default `const path = require('path');
const esbuild = require('esbuild');
const itemizeConfig = require('./itemize.config');
const fs = require("fs");

// sass plugin for processing sass files
const {sassPlugin} = require("esbuild-sass-plugin");

// the mode
const isDevelopment = process.env.NODE_ENV === 'development';
const mode = isDevelopment ? 'development' : 'production';

// the tsconfig to use in here will be slightly modified the reason is that we want
// to affect the typescript compiler not to import from nodejs folders
const tsConfig = JSON.parse(fs.readFileSync("./tsconfig.json", "utf-8"));
delete tsConfig.compilerOptions.paths;
tsConfig.compilerOptions.target = "es5";
tsConfig.compilerOptions.module = "commonjs";
tsConfig.compilerOptions.esModuleInterop = true;

// we use this to monkeypatch an issue with the global value used in the commons import
const GLOBAL_UUID = "$8a5c6e45304947ab980e35f38bfbb085";
const GLOBAL_UUID_REGEXP = /\$8a5c6e45304947ab980e35f38bfbb085/g;

// this function patches a given file for the actual global value
function patchFile(location) {
  const fileContent = fs.readFileSync(location, "utf-8");
  const fixedContent = fileContent
    .replace(GLOBAL_UUID_REGEXP, '(typeof window !== "undefined" ? window : {})');
  fs.writeFileSync(location, fixedContent);
}

// imports to ignore in the build
const IGNORES = [
  {
    resourceRegExp: /^path$/,
  },
  {
    resourceRegExp: /^stream$/,
  },
  {
    resourceRegExp: /^fs$/,
  },
  {
    resourceRegExp: /^jsdom$/,
  },
  {
    resourceRegExp: /^bcrypt$/,
  },
  {
    resourceRegExp: /stream-browserify/,
  },
  {
    resourceRegExp: /readable-stream/,
  },
  {
    resourceRegExp: /^pg$/,
  },
  {
    resourceRegExp: /^pg-native$/,
  },
  {
    resourceRegExp: /^form-data$/,
  },
  {
    resourceRegExp: /database.ts$/,
    contextRegExp: /node_modules\/@onzag\/itemize/
  },
  {
    resourceRegExp: /\/sql/,
    contextRegExp: /node_modules\/@onzag\/itemize/,
  },
  {
    resourceRegExp: /^\.\/server\/request$/
  },
];

// process to build the service worker
const serviceWorkerBuild = esbuild.build({
  // the entry point is the worker file
  entryPoints: [
    './node_modules/@onzag/itemize/client/internal/workers/service/service.worker.ts'
  ],
  sourcemap: isDevelopment ? 'inline' : false,
  entryNames: "[name]." + mode,
  minify: !isDevelopment,
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
  bundle: true,
  outdir: path.resolve(path.join('dist', 'data')),
  logLevel: "info",
  format: "esm",
  target: ['chrome60', 'firefox60', 'safari11', 'edge18'],
});

// process to build the cache worker and the main app
const build = esbuild.build({
  entryPoints: [
    './node_modules/@onzag/itemize/client/internal/workers/cache/cache.worker.ts',
    './src/client/index.tsx',
  ],
  entryNames: "[name]." + mode,
  sourcemap: isDevelopment ? 'inline' : false,
  minify: !isDevelopment,
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    ITEMIZE_CONSTANTS_CONFIG: JSON.stringify(itemizeConfig.constants),
    global: GLOBAL_UUID,
    window: GLOBAL_UUID,
  },
  bundle: true,
  outdir: path.resolve(path.join('dist', 'data')),
  publicPath: '/rest/resource',
  logLevel: "info",
  splitting: true,
  format: "esm",
  loader: {
    '.png': 'dataurl',
    '.jpg': 'dataurl',
    '.svg': 'text',
    '.css': 'css',
    '.ts': 'ts',
    '.tsx': "tsx",
  },
  // commons file name
  chunkNames: 'commons.' + mode,
  target: ['chrome60', 'firefox60', 'safari11', 'edge18'],
  // modified tsconfig
  tsconfigRaw: JSON.stringify(tsConfig),
  plugins: [
    sassPlugin(),
    // based on https://github.com/Knowre-Dev/esbuild-plugin-ignore/blob/main/index.js
    {
      name: 'ignore',
      setup (build) {
        build.onResolve({ filter: /.*/, namespace: 'ignore' }, args => ({
          path: args.path,
          namespace: 'ignore'
        }))
        for (const ignorePattern of IGNORES) {
          build.onResolve({ filter: ignorePattern.resourceRegExp }, args => {
            if (args.resolveDir.match(ignorePattern.contextRegExp)) {
              return {
                path: args.path, namespace: 'ignore'
              }
            } else {
              return {
                path: args.path
              }
            }
          })
        }
    
        build.onLoad({ filter: /.*/, namespace: 'ignore' }, () => ({
          contents: ''
        }))
      }
    }
  ]
});

// first let's build the service worker
serviceWorkerBuild.then(() => {

  // after we are done we can try to build the primary build
  build.then(() => {
    // fix commons file due to missing functionality in esbuild
    patchFile(path.resolve(path.join('dist', 'data', 'commons.' + mode + '.js')));
    patchFile(path.resolve(path.join('dist', 'data', 'index.' + mode + '.js')));
  }).catch((err) => console.error(err.stack));

}).catch((err) => console.error(err.stack));
`;
