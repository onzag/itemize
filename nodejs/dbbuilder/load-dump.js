"use strict";
/**
 * Performs the loading of the dumps that are presents in the dump folder
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const safe_1 = __importDefault(require("colors/safe"));
const _1 = require(".");
const server_1 = require("../server");
const sql_1 = require("../base/Root/Module/sql");
const constants_1 = require("../constants");
const fsAsync = fs_1.default.promises;
/**
 * Removes a folder from the given openstack container
 * @param uploadsContainer the container in question
 * @param mainPath the path we are deleting for
 */
async function removeFolderFor(uploadsContainer, mainPath) {
    console.log("Deleting existing files for: " + mainPath);
    // we return a promise for this
    return new Promise((resolve, reject) => {
        // need to get all the files
        uploadsContainer.getFiles({
            prefix: mainPath,
        }, (err, files) => {
            // if we get an error
            if (err) {
                reject(err);
            }
            else if (files && files.length) {
                // now we can delete the files in bulk
                console.log("bulk deleting " + files.length + " files");
                // by calling this
                uploadsContainer.client.bulkDelete(uploadsContainer, files, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
            else {
                console.log("No files found");
                resolve();
            }
        });
    });
}
exports.removeFolderFor = removeFolderFor;
/**
 * Copy the local files from the dump into the container by sending
 * them via openstack client
 * @param uploadsContainer the container
 * @param localPath the local path we are currently working with, must be a folder
 * @param remotePath the remote path we are expected to copy at
 */
async function copyFilesFor(uploadsContainer, localPath, remotePath) {
    // now we try to read the directory, note how we use try
    // the reason is that our directory might not exist as all
    // because this function might be requested with copying files for eg.
    // MOD_cms__IDEF_fragment/1.
    // but it might have no files at all, and as such, there will not be any folder
    try {
        const files = await fsAsync.readdir(localPath);
        // now we loop in the files, yes we don't do it in parallel, we don't know how big the
        // dump is and it's not like we are in a hurry, this is nicer not to overwhelm the server
        for (const file of files) {
            // so this is the file path in the local
            const localFilePath = path_1.default.join(localPath, file);
            // and in the remote
            const remoteFilePath = path_1.default.join(remotePath, file);
            // now we need to check if that file is an actual file or a directory
            const stat = await fsAsync.lstat(localFilePath);
            // if it's a directory
            if (stat.isDirectory()) {
                // Recurse
                await copyFilesFor(uploadsContainer, localFilePath, remoteFilePath);
            }
            else {
                // otherwise we have found a file, we need a write stream for the remote
                const writeStream = uploadsContainer.client.upload({
                    container: uploadsContainer,
                    remote: remoteFilePath,
                });
                // and a read stream for our local
                const readStream = fs_1.default.createReadStream(localPath);
                // and we pipe it!
                readStream.pipe(writeStream);
                // now we can return this promise
                return new Promise((resolve, reject) => {
                    writeStream.on("finish", () => {
                        console.log("Wrote: " + remoteFilePath);
                        resolve();
                    });
                    writeStream.on("error", reject);
                });
            }
        }
    }
    catch {
        // no such file or directory, we don't have files for it
    }
}
exports.copyFilesFor = copyFilesFor;
/**
 * We use this to cache schemas, they aren't expensive, but
 * we don't want to warm up our processors too much by wasting cycles
 * @ignore
 */
const CACHED_SCHEMAS = {};
/**
 * Performs the dump loading
 * @param version either development or production
 * @param knex the knex database connection
 * @param root the root
 */
async function loadDump(version, knex, root) {
    // we need these configurations
    const sensitiveConfig = JSON.parse(await fsAsync.readFile(path_1.default.join("config", version === "development" ? "index.sensitive.json" : `index.${version}.sensitive.json`), "utf8"));
    const config = JSON.parse(await fsAsync.readFile(path_1.default.join("config", "index.json"), "utf8"));
    const dumpConfig = JSON.parse(await fsAsync.readFile(path_1.default.join("config", "dump.json"), "utf8"));
    // and the upload containers
    const { pkgcloudUploadContainers } = await server_1.getPkgCloudContainers(config, sensitiveConfig);
    // inform the users
    console.log(`Loaded ${Object.keys(pkgcloudUploadContainers).length} storage containers: ` +
        safe_1.default.yellow(Object.keys(pkgcloudUploadContainers).join(", ")));
    // now we need to find our dump
    let dumpContents = null;
    try {
        dumpContents = await fsAsync.readFile(path_1.default.join("dump", "dump.json"), "utf-8");
    }
    catch {
        // there was no dump
        console.log("There is no existant dump");
        return;
    }
    // okay now we need to parse this dump
    const dump = JSON.parse(dumpContents).sort((a, b) => {
        // we sort it just to be nice to the database, and add them in order, we might skip some numbers anyway
        // but it's better than bouncing around
        return a.id - b.id;
    });
    // now we try this
    try {
        // and loop each row
        for (const row of dump) {
            // we need the item definition that this row belogns to
            const idef = root.registry[row.type];
            // and then the module for it
            const mod = idef.getParentModule();
            // these are the id and version we expect
            const id = row.id;
            const version = row.version;
            // inform the user we are loading this row
            console.log("loading dump for: " + row.type + " " + row.id + " " + row.version);
            // this is where we are going to store our files
            // by default same as the row specifies
            let targetContainerId = row.container_id;
            // so if we have a load config
            if (dumpConfig.load) {
                // now if our current target container is not in our
                // supported list, and we have a primary container that is
                if (!pkgcloudUploadContainers[targetContainerId] &&
                    dumpConfig.load.primaryContainerId &&
                    pkgcloudUploadContainers[dumpConfig.load.primaryContainerId]) {
                    // use that one
                    targetContainerId = dumpConfig.load.primaryContainerId;
                }
                // now let's go to the version mapper which has priority over that
                if (dumpConfig.load.versionMapper && dumpConfig.load.versionMapper[version]) {
                    // and we will try to find in the array in order an available container id
                    const originalContainerId = targetContainerId;
                    targetContainerId = dumpConfig.load.versionMapper[version].find((c) => {
                        return !!pkgcloudUploadContainers[c];
                    }) || originalContainerId;
                }
                // this is the same but for the previous container id
                if (dumpConfig.load.previousContainerIdMapper && dumpConfig.load.previousContainerIdMapper[row.container_id]) {
                    const originalContainerId = targetContainerId;
                    targetContainerId = dumpConfig.load.previousContainerIdMapper[row.container_id].find((c) => {
                        return !!pkgcloudUploadContainers[c];
                    }) || originalContainerId;
                }
            }
            // and now we try to see if the row already exists
            const result = await knex.first("type", "created_by", "created_at", "edited_by", "container_id").from(mod.getQualifiedPathName()).where({
                id,
                version,
            });
            // and store that in this variable
            const exists = !!result.length;
            // now by default it will insert files if it doesn't exist
            // as that means this script will not ask questions, overriding is however
            // another situation
            let shouldInsertFiles = !exists;
            // now we got to set the container id where we found this thing if any
            let foundContainerId = exists ? result.container_id : null;
            // we got to do some special checks
            if (exists) {
                // if the obtained type
                const obtainedType = result.type;
                const differs = obtainedType !== row.type;
                let needsRecreation = false;
                // is not the same as our own type, this is dangerous, but it might just be
                // a simple case that the type has changed, this will however lead to an
                // orphaned child on the item definition table
                if (differs) {
                    // now we got to check if there's actually a children that is linked to that module already
                    // in our target item definition, this is because we have entered conflict territory
                    const result = await knex.first(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME).from(idef.getQualifiedPathName()).where({
                        CONNECTOR_SQL_COLUMN_ID_FK_NAME: id,
                        CONNECTOR_SQL_COLUMN_VERSION_FK_NAME: version,
                    });
                    // if there's none
                    if (!result) {
                        // then we need to create such children
                        needsRecreation = true;
                    }
                    // inform the user that we are forcing this
                    console.log(safe_1.default.yellow("Attention, the types of the row do not match, the dump specifies " +
                        row.type +
                        " but the current database specifies " +
                        obtainedType +
                        " a force method will be used"));
                }
                // now we ask if we truly want to override the values
                if (await _1.yesno("Please ensure you want to override this value")) {
                    // so we got to extract the data
                    const moduleRows = {};
                    const idefRows = {};
                    // for that we need the database schema
                    const schema = CACHED_SCHEMAS[mod.getQualifiedPathName()] || sql_1.getSQLTableDefinitionForModule(knex, mod);
                    CACHED_SCHEMAS[mod.getQualifiedPathName()] = schema;
                    // and now we loop to see where each column goes, the module, or item definition table
                    Object.keys(row).forEach((key) => {
                        if (schema[key]) {
                            moduleRows[key] = row[key];
                        }
                        else {
                            idefRows[key] = row[key];
                        }
                    });
                    // we change these in the module row, the container always changes to the target
                    moduleRows.container_id = targetContainerId;
                    // last modified has to change
                    moduleRows.last_modified = knex.fn.now();
                    // created at is kept to the original or otherwise it's now
                    moduleRows.created_at = result.created_at || knex.fn.now();
                    // the creator is kept to the one in the database or it's unspecified
                    moduleRows.created_by = result.created_by || constants_1.UNSPECIFIED_OWNER;
                    // same for the editor
                    moduleRows.edited_by = result.edited_by || result.created_by || constants_1.UNSPECIFIED_OWNER;
                    // and now we run the transaction
                    await knex.transaction(async (transactionKnex) => {
                        // the module is always an update kind
                        await transactionKnex.update(moduleRows).from(mod.getQualifiedPathName()).where({
                            id,
                            version,
                        });
                        // now we need to see if we are forcing this
                        if (needsRecreation) {
                            // if we are we got to create the missing item definition row
                            await transactionKnex(idef.getQualifiedPathName()).insert(idefRows);
                        }
                        else {
                            // otherwise as standard we update
                            delete idefRows[constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME];
                            delete idefRows[constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME];
                            await transactionKnex.update(idefRows).from(idef.getQualifiedPathName()).where({
                                [constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME]: id,
                                [constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME]: version,
                            });
                        }
                    });
                    // and yes, we are inserting files because we approved this modification
                    shouldInsertFiles = true;
                }
                ;
            }
            else {
                // now for the natural process
                const moduleRows = {};
                const idefRows = {};
                // get the schema
                const schema = CACHED_SCHEMAS[mod.getQualifiedPathName()] || sql_1.getSQLTableDefinitionForModule(knex, mod);
                CACHED_SCHEMAS[mod.getQualifiedPathName()] = schema;
                // do the same
                Object.keys(row).forEach((key) => {
                    if (schema[key]) {
                        moduleRows[key] = row[key];
                    }
                    else {
                        idefRows[key] = row[key];
                    }
                });
                // note the difference, the creator is always uspecified
                moduleRows.container_id = targetContainerId;
                moduleRows.last_modified = knex.fn.now();
                moduleRows.created_at = knex.fn.now();
                moduleRows.created_by = constants_1.UNSPECIFIED_OWNER;
                moduleRows.edited_by = null;
                // now we run the transaction
                await knex.transaction(async (transactionKnex) => {
                    await transactionKnex(mod.getQualifiedPathName()).insert(moduleRows);
                    await transactionKnex(idef.getQualifiedPathName()).insert(idefRows);
                });
            }
            // and now for the files
            if (shouldInsertFiles) {
                // we got to get the hostname
                const hostname = version === "development" ? config.developmentHostname : config.productionHostname;
                // this is the path where things are meant to be
                const resultIdefBasePath = path_1.default.join(idef.getQualifiedPathName(), row.id + "." + (row.version || ""));
                const resultModBasePath = path_1.default.join(mod.getQualifiedPathName(), row.id + "." + (row.version || ""));
                // and this is where we are meant to store them, almost the same, other than for the hostname
                const resultRemoteIdefPath = path_1.default.join(hostname, resultIdefBasePath);
                const resultRemoteModPath = path_1.default.join(hostname, resultModBasePath);
                // if there's a container id where this information is already stored
                if (foundContainerId) {
                    // we got to get that container
                    const container = pkgcloudUploadContainers[foundContainerId];
                    // maybe?
                    if (!container) {
                        console.log("Could not retrieve a container for: " + safe_1.default.yellow(foundContainerId));
                    }
                    else {
                        // and delete everything in the remote, just in case, as there might be conflicts
                        await removeFolderFor(container.container, resultRemoteIdefPath);
                        await removeFolderFor(container.container, resultRemoteModPath);
                    }
                }
                // otherwise we have to store the files
                if (targetContainerId) {
                    // and now we go in
                    const targetContainer = pkgcloudUploadContainers[targetContainerId];
                    if (!targetContainer) {
                        console.log("Could not retrieve a container for: " + safe_1.default.yellow(targetContainerId));
                    }
                    else {
                        // and copy the files
                        await copyFilesFor(targetContainer.container, resultIdefBasePath, resultRemoteIdefPath);
                        await copyFilesFor(targetContainer.container, resultModBasePath, resultRemoteModPath);
                    }
                }
            }
        }
        // close the database connection
        knex.destroy();
        // say it's all done
        console.log(safe_1.default.green("All done..."));
    }
    catch (err) {
        // we messed up something
        console.log(safe_1.default.red(err.stack));
    }
}
exports.default = loadDump;
