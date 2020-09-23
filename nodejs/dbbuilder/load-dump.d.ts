/**
 * Performs the loading of the dumps that are presents in the dump folder
 *
 * @packageDocumentation
 */
import Knex from "knex";
import Root from "../base/Root";
import pkgcloud from "pkgcloud";
/**
 * Removes a folder from the given openstack container
 * @param uploadsContainer the container in question
 * @param mainPath the path we are deleting for
 */
export declare function removeFolderFor(uploadsContainer: pkgcloud.storage.Container, mainPath: string): Promise<void>;
/**
 * Copy the local files from the dump into the container by sending
 * them via openstack client
 * @param uploadsContainer the container
 * @param localPath the local path we are currently working with, must be a folder
 * @param remotePath the remote path we are expected to copy at
 */
export declare function copyFilesFor(uploadsContainer: pkgcloud.storage.Container, localPath: string, remotePath: string): Promise<void>;
/**
 * Performs the dump loading
 * @param configVersion either development or production
 * @param knex the knex database connection
 * @param root the root
 */
export default function loadDump(configVersion: string, knex: Knex, root: Root): Promise<void>;
