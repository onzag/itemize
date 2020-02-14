/**
 * Contains general utility functions to be used within the itemize app
 *
 * @packageDocumentation
 */
import createDOMPurify from "dompurify";
import ItemDefinition from "./base/Root/Module/ItemDefinition";
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
 * Provides the fields and args for an item definition in order
 * to create a query
 * @param options.includeArgs whether to include the args at all
 * @param options.includeFields whether to include fields at all
 * @param options.onlyIncludeProperties what properties to include in fields
 * @param options.onlyIncludeIncludes what includes to include in the fields
 * @param options.onlyIncludePropertiesForArgs what properties to include in args
 * @param options.onlyIncludeIncludesForArgs what includes to include in args
 * @param options.onlyIncludeArgsIfDiffersFromAppliedValue only includes something in args if it differs from the
 * applied value
 * @param appliedOwner the owner that owns this item
 * @param userRole the role of the user
 * @param userId the id of the user
 * @param itemDefinitionInstance the item definition
 * @param forId the slot id if any
 * @param forVersion the version if any
 */
export declare function getFieldsAndArgs(options: {
    includeArgs: boolean;
    includeFields: boolean;
    onlyIncludeProperties?: string[];
    onlyIncludeIncludes?: string[];
    onlyIncludePropertiesForArgs?: string[];
    onlyIncludeIncludesForArgs?: string[];
    onlyIncludeArgsIfDiffersFromAppliedValue?: boolean;
    appliedOwner?: number;
    userRole: string;
    userId: number;
    itemDefinitionInstance: ItemDefinition;
    forId: number;
    forVersion: string;
}): {
    requestFields: any;
    argumentsForQuery: any;
};
export declare const DOMWindow: import("jsdom").DOMWindow | (Window & typeof globalThis);
export declare const DOMPurify: createDOMPurify.DOMPurifyI;
