/**
 * Contains the standard tsconfig, as well as the paths for importing
 * note that this configuration requires of tspaths-register so that they do
 * indeed work on the execution mode
 * @packageDocumentation
 */
declare const _default: {
    compilerOptions: {
        baseUrl: string;
        paths: {
            "@onzag/itemize/*": string[];
        };
        target: string;
        module: string;
        moduleResolution: string;
        sourceMap: boolean;
        emitDecoratorMetadata: boolean;
        experimentalDecorators: boolean;
        removeComments: boolean;
        noImplicitAny: boolean;
        suppressImplicitAnyIndexErrors: boolean;
        rootDir: string;
        outDir: string;
        esModuleInterop: boolean;
        resolveJsonModule: boolean;
        skipLibCheck: boolean;
        jsx: string;
    };
    compileOnSave: boolean;
    exclude: string[];
    include: string[];
};
export default _default;
