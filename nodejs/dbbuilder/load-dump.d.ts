/**
 * Performs the loading of the dumps that are presents in the dump folder
 *
 * @packageDocumentation
 */
import Knex from "knex";
import Root from "../base/Root";
import { CloudClient } from "../server/cloud";
/**
 * Copy the local files from the dump into the container by sending
 * them via the cloud client
 * @param uploadClient the cloud client
 * @param localPath the local path we are currently working with, must be a folder
 * @param remotePath the remote path we are expected to copy at
 */
export declare function copyFilesFor(uploadClient: CloudClient, localPath: string, remotePath: string): Promise<void>;
/**
 * Performs the dump loading
 * @param configVersion either development or production
 * @param knex the knex database connection
 * @param root the root
 */
export default function loadDump(configVersion: string, knex: Knex, root: Root): Promise<void>;
