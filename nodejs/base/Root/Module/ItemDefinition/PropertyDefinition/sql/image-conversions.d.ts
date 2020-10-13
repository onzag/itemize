/**
 * This file contains the utility functions that take images as input and
 * transform it into all the different sizes that have been specified by the property
 * this is the case for files when a image type is detected
 *
 * @packageDocumentation
 */
/// <reference types="node" />
import PropertyDefinition from "..";
import { ReadStream } from "fs";
import { CloudClient } from "../../../../../../server/cloud";
/**
 * Runs the image conversions and stores them in the specified location
 * @param imageStream the read stream that contains the image
 * @param filePath entire path, idef id and all where the file is to be stored
 * @param fileName the name of the file, curated as it is to be stored
 * @param fileMimeType the mime type that has been retreived of the stream
 * @param uploadsContainer the container where the image is tobe uploaded
 * @param uploadsPrefix the prefix of the container
 * @param propDef the property definition that this refers to
 * @returns a void promise for when this is done
 */
export declare function runImageConversions(imageStream: ReadStream, filePath: string, fileName: string, fileMimeType: string, uploadsClient: CloudClient, domain: string, propDef: PropertyDefinition): Promise<void>;
