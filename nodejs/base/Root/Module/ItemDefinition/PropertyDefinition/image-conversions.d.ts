/**
 * This file contains the utility functions that take images as input and
 * transform it into all the different sizes that have been specified by the property
 * this is the case for files when a image type is detected
 *
 * @packageDocumentation
 */
/// <reference types="node" />
import PropertyDefinition from ".";
import { ReadStream } from "fs";
import pkgcloud from "pkgcloud";
/**
 * Runs the image conversions and stores them in the specified location
 * @returns a void promise for when this is done
 */
export declare function runImageConversions(imageStream: ReadStream, filePath: string, fileName: string, uploadsContainer: pkgcloud.storage.Container, propDef: PropertyDefinition): Promise<void>;
