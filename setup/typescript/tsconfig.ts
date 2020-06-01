export default {
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "*": [
        "types/*",
      ],
    },
    target: "esnext",
    module: "commonjs",
    moduleResolution: "node",
    sourceMap: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    removeComments: false,
    noImplicitAny: true,
    suppressImplicitAnyIndexErrors: true,
    rootDir: "src",
    outDir: "dist",
    esModuleInterop: true,
    resolveJsonModule: true,
    skipLibCheck: true,
    jsx: "react",
  },
  compileOnSave: true,
  exclude: [
    "node_modules",
  ],
  include: [
    "**/*.ts",
    "**/*.tsx",
  ],
};
