"use strict";
/**
 * Contains the standard tsconfig, as well as the paths for importing
 * note that this configuration requires of tspaths-register so that they do
 * indeed work on the execution mode
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    compilerOptions: {
        baseUrl: ".",
        paths: {
            "@onzag/itemize/*": [
                "./node_modules/@onzag/itemize/nodejs/*",
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
