/**
 * Contains the functionality that makes it so that when files come from graphql
 * streams and are to be stored in the database the files are sent somewhere else
 * and the url is actually what it's stored
 *
 * @packageDocumentation
 */
/// <reference types="node" />
import PropertyDefinition from "..";
import ItemDefinition from "../..";
import Include from "../../Include";
import { ReadStream } from "fs";
import { IGQLFile } from "../../../../../../gql-querier";
import { ConsumeStreamsFnType } from "../../../../sql";
import sharp from "sharp";
import Module from "../../..";
import { CloudClient } from "../../../../../../server/cloud";
/**
 * Processes an extended list based
 * file value
 * @param newValues the new values as a list
 * @param oldValues the old values that this came from
 * @param uploadsClient the uploads client
 * @param itemDefinitionOrModule the item definition or module (for prop extension) these values are related to
 * @param include the include this values are related to
 * @param propertyDefinition the property (must be of type file)
 * @returns the new values and the consume streams function that will actually consume the
 * streams to store in the remote storage solution
 */
export declare function processFileListFor(newValues: IGQLFile[], oldValues: IGQLFile[], uploadsClient: CloudClient, domain: string, itemDefinitionOrModule: ItemDefinition | Module, include: Include, propertyDefinition: PropertyDefinition): {
    value: IGQLFile[];
    consumeStreams: ConsumeStreamsFnType;
};
/**
 * Processes a single file, and either gives
 * null or the output, the file, and its possible replacement
 * should be of different id
 * @param newValue the new value
 * @param oldValue the old value
 * @param uploadsContainer the upload container to uploads file for or delete for
 * @param uploadsPrefix the uploads prefix of such container
 * @param domain the domain we are storing for
 * @param itemDefinitionOrModule the item definition or module these values are related to
 * @param include the include this values are related to
 * @param propertyDefinition the property (must be of type file)
 * @returns the new value (or null) consume streams function that will actually consume the
 * streams to store in the remote storage solution
 */
export declare function processSingleFileFor(newValue: IGQLFile, oldValue: IGQLFile, uploadsClient: CloudClient, domain: string, itemDefinitionOrModule: ItemDefinition | Module, include: Include, propertyDefinition: PropertyDefinition): {
    value: IGQLFile;
    consumeStreams: ConsumeStreamsFnType;
};
/**
 * Deletes the folder that contains all
 * the file data
 * @param domain the domain we are working with
 * @param uploadsClient the uploads client
 * @param itemDefinitionOrModule the item definition or module in question
 * @param idVersionId the transitory id to drop
 * @returns a void promise from when this is done
 */
export declare function deleteEverythingInFilesContainerId(domain: string, uploadsClient: CloudClient, itemDefinitionOrModule: ItemDefinition | Module, idVersionId: string): Promise<void>;
/**
 * Uploads a file in a given upload container
 * @param uploadsClient the uploads client
 * @param readStream the read stream of the file
 * @param remote the remote name this file is uploaded as, it's whole path
 * @returns a void promise
 */
export declare function sqlUploadPipeFile(uploadsClient: CloudClient, readStream: ReadStream | sharp.Sharp, domain: string, remote: string): Promise<void>;
