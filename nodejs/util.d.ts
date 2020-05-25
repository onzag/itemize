/**
 * Contains general utility functions to be used within the itemize app
 *
 * @packageDocumentation
 */
import createDOMPurify from "dompurify";
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
export declare class NanoSecondComposedDate {
    date: Date;
    original: string;
    remainder: number;
    time: number;
    constructor(str: string);
    greaterThan(otherDate: NanoSecondComposedDate): boolean;
    greaterThanEqual(otherDate: NanoSecondComposedDate): boolean;
    lessThan(otherDate: NanoSecondComposedDate): boolean;
    lessThanEqual(otherDate: NanoSecondComposedDate): boolean;
    equal(otherDate: NanoSecondComposedDate): boolean;
    notEqual(otherDate: NanoSecondComposedDate): boolean;
}
export declare const DOMWindow: import("jsdom").DOMWindow | (Window & typeof globalThis);
export declare const DOMPurify: createDOMPurify.DOMPurifyI;
