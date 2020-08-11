/**
 * Contains the internal initialization function for initializing itemize app
 * @packageDocumentation
 */
import "./internal/theme/base.scss";
import React from "react";
import { ILocaleContextType } from "./internal/providers/locale-provider";
import { IRendererContext } from "./providers/renderer";
import { ISSRContextType } from "./internal/providers/ssr-provider";
import { IConfigRawJSONDataType } from "../config";
import Root, { ILangLocalesType } from "../base/Root";
/**
 * when cookies expire
 * @ignore
 */
export declare const COOKIE_EXPIRATION_DATE: string;
/**
 * Provides a single cookie based on a name, this function
 * is used heavily in order to retrieve the session values
 * @param name the name of the cookie to provide
 * @returns the value of the cookie as a string or null
 */
export declare function getCookie(name: string): string;
export declare const history: import("history").History<{}>;
/**
 * This function imports a file given a url
 * @param src the source url
 */
export declare function importScript(src: string): Promise<unknown>;
/**
 * Defines a collector, the collector will collect normally styles or other
 * data as it's feed the application and provide back the node to render (Which should contain the app)
 * as well as an id
 */
export interface ICollectorType {
    /**
     * This is the collection function
     * @param app the app itself that is fed to the collector
     * @returns a node and an id for the collection action in order to retrieve
     * the collection results
     */
    collect: (app: React.ReactElement) => {
        node: React.ReactNode;
        id: string;
    };
    /**
     * Retrieves the collection results based on the id previously given
     * @returns a string, this string is added as the value of the <SSRHEAD> to the index.html template
     */
    retrieve: (id: string) => string;
}
/**
 * The main function that initializes the itemize app, it's meant both to work
 * on the server and the client side, however it's optimized for client side functionality
 * and SSR is secondary
 *
 * @param rendererContext the renderer context to use, specifies how both entries and view should be renderer
 * based on these instructions, and it's static and provided to all the app, the renderer context can be replaced
 * to give a different look and feel, check out the fast prototyping renderer context for the default context which
 * uses material ui as this. Secondary renderers can be used and injected along the app by passing the renderer arg
 * to the react Entry or View component to use a different renderer
 * @param mainComponent the main application component this is basically the user custom App component that defines
 * the entire app, this is where the developer decides what to do, and uses components mainly out of the client/components
 * in order to build its app, with navigation and all, but also can use fast prototyping components which in term
 * use those components as base
 * @param options optional options, very useful in many circumstances
 * @param options.appWrapper a function that wraps the application itself, and executes only once over the initialization
 * of the app, it acts like a react component that should return a react element, allows to put static things in the app
 * on top of it that are required (likely by the renderers or other custom components) such as providers, eg. for fast prototyping
 * the app wrapper will add the material UI theme provider as well as the CSS baseline. NOTE that the app wrapper despite being
 * wrapping the app, the app itself (and as such this wrapper) sits under the config provider, ssr provider, route provider,
 * and the renderer context provider so it's totally possible for the app wrapper to access these, even when it's absolutely not recommended.
 * @param options.mainWrapper a function that wraps the main component that was given, the main component sits under the true application
 * under the locale context provider and the token provider, it provides as arguments the config and the locale context; the main wrapper
 * can execute several times any time the main component top context changes, as such ensure that it's effective enough, the mainWrapper
 * is only truly expected to execute these several times during login/out events and any localization change; this is then where you put
 * localization sensitive provider, eg. in the case of fast prototyping the moment utils provider which is locale sensitive is passed
 * here
 * @param options.serverMode options for doing SSR, not required and shouldn't be provided when doing SSR, when server mode is set
 * instead of doing a render, it will return a node, and an id; where id might be null, depending to the collection rules; this returned
 * react node will not contain a router
 * @param options.serverMode.collector a collector (eg. a JSS styles collector) that is fed the entire application all the way to the
 * main providers, however the router is still expected to sit on top for technical reasons, the collector is fed this application
 * and should return a node and an id (to get the results of the collection), the results of the collection are obtained in generator.tsx
 * and replaced the <SSRHEAD> tag with that
 * @param options.serverMode.config the configuration used, standard, normally the config is injected into the app source as a global
 * this global is named CONFIG, but this is not available to SSR mode, so it need to access it another way
 * @param options.serverMode.ssrContext the ssr context itself, normally this is injected into the app via the SSR global, but this
 * isn't available, the SSR contains all the injected collected queries, collected resources, the current user context and the currency
 * factors as well
 * @param options.serverMode.clientDetails some client details that are stored in the client in order to setup things lie initial
 * localization, they must be matched in the server side when doing SSR, normally these details are stored in a cookie
 * so they are accessible to both and should render equal
 * @param options.serverMode.clientDetails.lang the language that is being used
 * @param options.serverMode.clientDetails.currency the currency that is being last used by the client
 * @param options.serverMode.clientDetails.country the country that is being last used by the client
 * @param options.serverMode.clientDetails.guessedData a guess for lang, currency and country that was launched for this client and got stored
 * @param options.serverMode.langLocales the supported language locales
 * @param options.serverMode.root the root object to recycle since the root cannot be obtained via a fetch request,
 * it should be using the all version with all the languages loaded, note that this might pollute the root,
 * so ensure to use an unique all root instance and clean it afterwards, you should have a pool of root to choose from
 * @param options.serverMode.req the server request, this is used to build the static router that will choose what to render, since it
 * needs the original url
 * @param options.serverMode.res the server response, this is used to do the redirect, when no language is specified to the language
 * that was either guessed or was set by the user, or otherwise to change the url using a redirect to the actual language
 * that the user is supposed to speak, so that if the user picks a url on another language, switch it to his language
 * @param options.serverMode.ipStack when no lang, currency, country are set an we have no guessed data indeed, then we need to run a guess
 * in the client side this is used by fetching the util/country which does use ipstack under the hood, but this will perform
 * such check in place since we have no fetch chances
 */
export declare function initializeItemizeApp(rendererContext: IRendererContext, mainComponent: React.ReactElement, options?: {
    appWrapper?: (app: React.ReactElement, config: IConfigRawJSONDataType) => React.ReactElement;
    mainWrapper?: (mainComponet: React.ReactElement, config: IConfigRawJSONDataType, localeContext: ILocaleContextType) => React.ReactElement;
    serverMode?: {
        collector?: ICollectorType;
        config: IConfigRawJSONDataType;
        ssrContext: ISSRContextType;
        clientDetails: {
            lang: string;
            currency: string;
            country: string;
            guessedData: string;
        };
        langLocales: ILangLocalesType;
        root: Root;
        req: any;
        res: any;
        ipStack: any;
    };
}): Promise<{
    node: React.ReactNode;
    id: string;
}>;
