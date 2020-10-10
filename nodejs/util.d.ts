/**
 * Contains general utility functions to be used within the itemize app
 *
 * @packageDocumentation
 */
import createDOMPurify from "dompurify";
import { IGQLFile } from "./gql-querier";
import ItemDefinition from "./base/Root/Module/ItemDefinition";
import Include from "./base/Root/Module/ItemDefinition/Include";
import PropertyDefinition from "./base/Root/Module/ItemDefinition/PropertyDefinition";
declare type TimedExecutedFn = () => void;
/**
 * Delays the execution of a function by given milliseconds
 * ensure these do not stack together
 * @param fn the function in question
 * @param id the id to use
 * @param ms the milliseconds delay before submitting
 * @returns a function without parameters
 */
export declare function delayedExecutionFn(fn: any, id: string, ms: number): TimedExecutedFn;
/**
 * capitalizes a string
 * @param str the string to capitalize
 */
export declare function capitalize(str: string): string;
/**
 * Escapes a string into a regex
 * @param str the string to escape
 * @returns a string that is regex ready
 */
export declare function escapeStringRegexp(str: string): string;
export declare function processAccepts(accept: string, isExpectingImages?: boolean): string;
/**
 * Checks whether the file type exists in the accept property
 * @param fileType the file.type
 * @param accept the accept property
 */
export declare function checkFileInAccepts(fileType: string, accept: string): boolean;
/**
 * Converts a mime type to an extension using a known extension list
 * @param str the string that represents the mime type
 * @returns an extension or txt if it doesn't know
 */
export declare function mimeTypeToExtension(str: string): any;
/**
 * Replaces a string to another for locale usage
 * eg. `"hello {0} world {1}"` with `["foo", "bar"]` become
 * `"hello foo world bar"`
 * @param str the string
 * @param args the args to pass
 * @returns a string
 */
export declare function localeReplacer(str: string, ...args: any[]): string;
/**
 * Replaces a string to an array of whatever it was sent
 * for locale usage
 * eg. `"hello {0} world {1}"` with `[<span>foo</span>, <span>bar</span>]` become
 * `["hello ",<span>foo</span>," world ",<span>bar</span>]`
 * @param str the string
 * @param args the args to pass
 * @returns a an array
 */
export declare function localeReplacerToArray(str: string, ...args: any[]): any[];
/**
 * gets the actual format given a string format
 * this is basically only used to avoid inconsistencies
 * regarding input to create a mask, and it only happens with
 * time basically, but here we can override masks
 * @param value the format string
 * @returns the normalized form
 */
export declare function getLocalizedTimeFormat(): any;
export declare function getLocalizedDateFormat(): any;
export declare function getLocalizedDateTimeFormat(): string;
/**
 * Converts a file to its absolute URL counterpart
 * @param domain the domain that is being used according to the env
 * @param containerHostnamePrefixes the containers hostnames prefixes that allow
 * to identify the url prefix to access a given container
 * @param file the file to convert
 * @param itemDefinition the item definition this file is in and stored as, it is required even
 * for prop extensions, because every stored value has an item definition attached to it
 * @param id the id
 * @param version the version
 * @param containerId the container id this file was found to be in
 * @param include the include (or null)
 * @param property the property it came from
 * @param cacheable whether the resulting url should be cached
 * @returns a new IGQLFile but absolute
 */
export declare function fileURLAbsoluter(domain: string, containerHostnamePrefixes: {
    [key: string]: string;
}, file: IGQLFile, itemDefinition: ItemDefinition, id: number, version: string, containerId: string, include: Include, property: PropertyDefinition, cacheable: boolean): IGQLFile;
/**
 * Converts an array of files to its absolute url counterpart
 * @param domain the domain that is being used according to the env
 * @param containerHostnamePrefixes the containers hostnames prefixes that allow
 * to identify the url prefix to access a given container
 * @param files the array of files to convert
 * @param itemDefinition the item definition this file is in and stored as, it is required even
 * for prop extensions, because every stored value has an item definition attached to it
 * @param id the id
 * @param version the version
 * @param containerId the container id this file was found to be in
 * @param include the include (or null)
 * @param property the property it came from
 * @param cacheable whether the resulting urls should be cacheable
 * @returns a new array of files
 */
export declare function fileArrayURLAbsoluter(domain: string, containerHostnamePrefixes: {
    [key: string]: string;
}, files: IGQLFile[], itemDefinition: ItemDefinition, id: number, version: string, containerId: string, include: Include, property: PropertyDefinition, cacheable: boolean): IGQLFile[];
export declare const DOMWindow: import("jsdom").DOMWindow | (Window & typeof globalThis);
export declare const DOMPurify: createDOMPurify.DOMPurifyI;
/**
 * Processes the intialization of a template, by processing
 * the child nodes of a given node
 * @param node the node we are working with
 * @param disableHTMLTemplating whether to disable data-html
 * @param templateArgsContext the template args we are currently working with
 * @param rootTemplateArgs the template args of the root
 * @param templateArgsPath the template args of the path
 */
export declare function processTemplateInitialization(node: HTMLElement, disableHTMLTemplating: boolean, templateArgsContext: any, rootTemplateArgs: any, templateArgsPath: string[]): void;
/**
 * Performs a simple template rendering
 * from a string based HTML template based on the text specs
 * of itemize, there's no sanitization, no processing of files
 * simple and raw templating process
 *
 * @param template the template in question
 * @param args the arguments
 */
export declare function renderTemplate(template: string, args: any): string;
export {};
