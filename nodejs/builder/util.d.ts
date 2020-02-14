/**
 * Some utilities used during the building process, mostly for file
 * management
 *
 * @packageDocumentation
 */
import Traceback from "./Traceback";
import "source-map-support/register";
/**
 * Checks whether a file exists and throws an error if it doesn't
 * and it's specified to throw an error or otherwise returns false
 * @param location the file location
 * @param traceback an optional traceback to trace
 * @returns a boolean
 */
export declare function checkExists(location: string, traceback?: Traceback): Promise<boolean>;
/**
 * Checks whether a location is a directory,
 * throws an error if it doesn't exist
 *
 * @param  location  the location in question
 * @param  traceback a traceback object
 * @returns           a boolean
 */
export declare function checkIsDirectory(location: string, traceback: Traceback): Promise<boolean>;
/**
 * Gets the actual file location of a related path
 * eg. /data/module can either be /data/module.json or
 * can be /data/module/index.json this function tells which
 * one it is
 *
 * @param  partialLocation  the location in question without the ending
 * @param  traceback        a traceback object, this fn throws an error if it
 *                          does not exist
 * @param extension the extension it resolves to by default it's json
 * @returns                  a string with the right location
 */
export declare function getActualFileLocation(partialUnjoinedLocation: [string, string], traceback: Traceback, extension?: string): Promise<string>;
/**
 * gets the identifier of a location
 * for example an /this/module/index.json is identified as
 * module and the same is true for /this/module.json
 *
 * @param  location the file location in question
 * @returns          the name
 */
export declare function getActualFileIdentifier(location: string, traceback: Traceback): Promise<string>;
