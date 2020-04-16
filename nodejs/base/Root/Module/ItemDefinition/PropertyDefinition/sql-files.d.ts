/**
 * Contains the functionality that makes it so that when files come from graphql
 * streams and are to be stored in the database the files are sent somewhere else
 * and the url is actually what it's stored
 *
 * @packageDocumentation
 */
/// <reference types="node" />
import PropertyDefinition from ".";
import ItemDefinition from "..";
import Include from "../Include";
import { ReadStream } from "fs";
import { IGQLFile } from "../../../../../gql-querier";
import pkgcloud from "pkgcloud";
import { ConsumeStreamsFnType } from "../../../sql";
import sharp from "sharp";
/**
 * Processes an extended list based
 * file value
 * @param newValues the new values as a list
 * @param oldValues the old values that this came from
 * @param filesContainerId a transitory id on where to store the files (can be changed later)
 * @param itemDefinition the item definition these values are related to
 * @param include the include this values are related to
 * @param propertyDefinition the property (must be of type file)
 * @returns a promise with the new list with the new values
 */
export declare function processFileListFor(newValues: IGQLFile[], oldValues: IGQLFile[], uploadsContainer: pkgcloud.storage.Container, itemDefinition: ItemDefinition, include: Include, propertyDefinition: PropertyDefinition): {
    value: IGQLFile[];
    consumeStreams: ConsumeStreamsFnType;
};
/**
 * Processes a single file, and either gives
 * null or the output, the file, and its possible replacement
 * should be of different id
 * @param newValue the new value
 * @param oldValue the old value
 * @param itemDefinition the item definition these values are related to
 * @param include the include this values are related to
 * @param propertyDefinition the property (must be of type file)
 * @returns a promise for the new file value
 */
export declare function processSingleFileFor(newValue: IGQLFile, oldValue: IGQLFile, uploadsContainer: pkgcloud.storage.Container, itemDefinition: ItemDefinition, include: Include, propertyDefinition: PropertyDefinition): {
    value: IGQLFile;
    consumeStreams: ConsumeStreamsFnType;
};
/**
 * Deletes the folder that contains all
 * the file data
 * @param uploadsContainer the container that contains the file
 * @param itemDefinition the item definition in question
 * @param filesContainerId the transitory id to drop
 * @returns a void promise from when this is done
 */
export declare function deleteEverythingInFilesContainerId(uploadsContainer: pkgcloud.storage.Container, itemDefinition: ItemDefinition, filesContainerId: string): Promise<void>;
export declare function sqlUploadPipeFile(uploadsContainer: pkgcloud.storage.Container, readStream: ReadStream | sharp.Sharp, remote: string): Promise<void>;
