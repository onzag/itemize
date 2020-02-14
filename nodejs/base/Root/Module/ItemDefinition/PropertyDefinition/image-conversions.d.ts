/**
 * This file contains the utility functions that take images as input and
 * transform it into all the different sizes that have been specified by the property
 * this is the case for files when a image type is detected
 *
 * @packageDocumentation
 */
import PropertyDefinition from ".";
/**
 * Runs the image conversions and stores them in the specified location
 * @param fileName the file name that is currently in use in the server side
 * @param filePath the file path that is currently in use in the server side with the file name
 * @param propDef the property definition
 * @returns a void promise for when this is done
 */
export declare function runImageConversions(fileName: string, filePath: string, propDef: PropertyDefinition): Promise<void>;
