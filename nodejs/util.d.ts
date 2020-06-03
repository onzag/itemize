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
export declare function getNormalizedDateTimeFormat(value: string): string;
/**
 * TODO looks wrong check what is wrong
 */
export declare function getLocalizedTimeFormat(normalize: boolean): any;
/**
 * TODO looks wrong check what is wrong
 */
export declare function getLocalizedDateFormat(normalize: boolean): any;
/**
 * TODO looks wrong check what is wrong
 */
export declare function getLocalizedDateTimeFormat(normalize: boolean): string;
/**
 * Converts a file to its absolute URL counterpart
 * @param containerHostnamePrefixes
 * @param file
 * @param itemDefinition
 * @param id
 * @param version
 * @param containerId
 * @param include
 * @param property
 */
export declare function fileURLAbsoluter(containerHostnamePrefixes: {
    [key: string]: string;
}, file: IGQLFile, itemDefinition: ItemDefinition, id: number, version: string, containerId: string, include: Include, property: PropertyDefinition): IGQLFile;
export declare function fileArrayURLAbsoluter(containerHostnamePrefixes: {
    [key: string]: string;
}, files: IGQLFile[], itemDefinition: ItemDefinition, id: number, version: string, containerId: string, include: Include, property: PropertyDefinition): IGQLFile[];
export declare const DOMWindow: import("jsdom").DOMWindow | (Window & typeof globalThis);
export declare const DOMPurify: createDOMPurify.DOMPurifyI;
