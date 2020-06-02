import "./internal/theme/base.scss";
import React from "react";
import { ILocaleContextType } from "./internal/app";
import { IRendererContext } from "./providers/renderer";
import { ISSRContextType } from "./internal/providers/ssr-provider";
import { IConfigRawJSONDataType } from "../config";
import Root, { ILangLocalesType } from "../base/Root";
export declare const history: import("history").History<{}>;
/**
 * This function imports a file given a url
 * @param src the source url
 */
export declare function importScript(src: string): Promise<unknown>;
export interface ICollectorType {
    collect: (app: React.ReactElement) => {
        node: React.ReactNode;
        id: string;
    };
    retrieve: (id: string) => string;
}
export declare function initializeItemizeApp(rendererContext: IRendererContext, mainComponent: React.ReactElement, options?: {
    appWrapper?: (app: React.ReactElement, config: IConfigRawJSONDataType) => React.ReactElement;
    mainWrapper?: (mainComponet: React.ReactElement, localeContext: ILocaleContextType) => React.ReactElement;
    serverMode?: {
        collector?: ICollectorType;
        config: IConfigRawJSONDataType;
        ssrContext: ISSRContextType;
        pathname: string;
        clientDetails: {
            lang: string;
            currency: string;
            country: string;
            guessedData: string;
        };
        langLocales: ILangLocalesType;
        root: Root;
        req: any;
        ipStack: any;
    };
}): Promise<{
    node: React.ReactNode;
    id: string;
}>;
