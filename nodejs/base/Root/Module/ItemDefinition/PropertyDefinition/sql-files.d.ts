/**
 * Contains the functionality that makes it so that when files come from graphql
 * streams and are to be stored in the database the files are sent somewhere else
 * and the url is actually what it's stored
 *
 * @packageDocumentation
 */
import PropertyDefinition from ".";
import ItemDefinition from "..";
import Include from "../Include";
import { IGQLFile } from "../../../../../gql-querier";
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
export declare function processFileListFor(newValues: IGQLFile[], oldValues: IGQLFile[], filesContainerId: string, itemDefinition: ItemDefinition, include: Include, propertyDefinition: PropertyDefinition): Promise<{
    url: string;
    name: string;
    type: string;
    id: string;
    size: number;
    src?: File | Promise<any>;
}[]>;
/**
 * Processes a single file, and either gives
 * null or the output, the file, and its possible replacement
 * should be of different id
 * @param newValue the new value
 * @param oldValue the old value
 * @param filesContainerId an id on where to store the files (can be changed later)
 * @param itemDefinition the item definition these values are related to
 * @param include the include this values are related to
 * @param propertyDefinition the property (must be of type file)
 * @returns a promise for the new file value
 */
export declare function processSingleFileFor(newValue: IGQLFile, oldValue: IGQLFile, filesContainerId: string, itemDefinition: ItemDefinition, include: Include, propertyDefinition: PropertyDefinition): Promise<{
    url: string;
    name: string;
    type: string;
    id: string;
    size: number;
    src?: File | Promise<any>;
}>;
/**
 * Updates a transitory id for an item definition
 * that is /dist/uploads/MOD_module__IDEF_item/:id
 * and changes it to something else so that it belongs
 * to that element
 * @param itemDefinition the item defintion in question
 * @param originalId the original id that was used
 * @param newId the new id
 * @returns a void promise for when it's done
 */
export declare function updateTransitoryIdIfExists(itemDefinition: ItemDefinition, originalId: string, newId: string): Promise<void>;
/**
 * Deletes the folder that contains all
 * the file data
 * @param itemDefinition the item definition in question
 * @param transitoryId the transitory id to drop
 * @returns a void promise from when this is done
 */
export declare function deleteEverythingInTransitoryId(itemDefinition: ItemDefinition, transitoryId: string): Promise<void>;
