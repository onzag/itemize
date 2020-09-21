"use strict";
/**
 * Contains the functionality that makes it so that when files come from graphql
 * streams and are to be stored in the database the files are sent somewhere else
 * and the url is actually what it's stored
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const constants_1 = require("../../../../../../constants");
const image_conversions_1 = require("./image-conversions");
const server_1 = require("../../../../../../server");
const https_1 = __importDefault(require("https"));
// Used to optimize, it is found out that passing unecessary logs to the transport
// can slow the logger down even if it won't display
const LOG_LEVEL = process.env.LOG_LEVEL;
const CAN_LOG_DEBUG = LOG_LEVEL === "debug" || LOG_LEVEL === "silly" || (!LOG_LEVEL && process.env.NODE_ENV !== "production");
/**
 * Processes an extended list based
 * file value
 * @param newValues the new values as a list
 * @param oldValues the old values that this came from
 * @param uploadsContainer the upload container to uploads file for, or delete for
 * @param uploadsPrefix the uploads prefix of such container
 * @param itemDefinitionOrModule the item definition or module (for prop extension) these values are related to
 * @param include the include this values are related to
 * @param propertyDefinition the property (must be of type file)
 * @returns the new values and the consume streams function that will actually consume the
 * streams to store in the remote storage solution
 */
function processFileListFor(newValues, oldValues, uploadsContainer, uploadsPrefix, domain, itemDefinitionOrModule, include, propertyDefinition) {
    // the values might be null so let's ensure them
    const actualNewValues = newValues || [];
    const actualOldValues = oldValues || [];
    // now let's get a list of the removed files
    // from the ensured values
    const removedFiles = actualOldValues.filter((oldValue) => {
        return actualNewValues.findIndex((newValue) => newValue.id === oldValue.id) === -1;
    });
    // first let's process each file that was
    // either modified or added
    const allNewValues = actualNewValues.map((newValue) => {
        // let's pass it to the function that does that
        // job, pick the old value, if exists
        const relativeOldValue = actualOldValues.find((oldValue) => oldValue.id === newValue.id) || null;
        return processOneFileAndItsSameIDReplacement(newValue, relativeOldValue, uploadsContainer, uploadsPrefix, domain, itemDefinitionOrModule, include, propertyDefinition);
    }).concat(removedFiles.map((removedValue) => {
        // for the removed it's the same but the new value
        // is null
        return processOneFileAndItsSameIDReplacement(null, removedValue, uploadsContainer, uploadsPrefix, domain, itemDefinitionOrModule, include, propertyDefinition);
    }));
    // let's filter the nulls
    let filteredNewValues = allNewValues.map((v) => v.value).filter((newValue) => newValue !== null);
    if (filteredNewValues.length === 0) {
        // if it's emmpty then it is null
        filteredNewValues = null;
    }
    // return what we've got
    return {
        value: filteredNewValues,
        consumeStreams: async (propertyLocationId) => {
            await Promise.all(allNewValues.map(fn => fn.consumeStreams(propertyLocationId)));
        }
    };
}
exports.processFileListFor = processFileListFor;
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
function processSingleFileFor(newValue, oldValue, uploadsContainer, uploadsPrefix, domain, itemDefinitionOrModule, include, propertyDefinition) {
    if (oldValue && oldValue.id === newValue.id) {
        return processOneFileAndItsSameIDReplacement(newValue, oldValue, uploadsContainer, uploadsPrefix, domain, itemDefinitionOrModule, include, propertyDefinition);
    }
    else {
        // basically we run this asa two step process
        // first we drop the old value, by using the same id
        // function giving no new value
        const initialStepOutput = processOneFileAndItsSameIDReplacement(null, oldValue, uploadsContainer, uploadsPrefix, domain, itemDefinitionOrModule, include, propertyDefinition);
        // and return with the same id but no old value, create it
        const secondStepOutput = processOneFileAndItsSameIDReplacement(newValue, null, uploadsContainer, uploadsPrefix, domain, itemDefinitionOrModule, include, propertyDefinition);
        return {
            value: secondStepOutput.value,
            consumeStreams: async (propertyLocationId) => {
                await Promise.all([initialStepOutput, secondStepOutput].map(fn => fn.consumeStreams(propertyLocationId)));
            }
        };
    }
}
exports.processSingleFileFor = processSingleFileFor;
/**
 * Processes a single file that is to be changed, that is, their ids is equal
 * @param newVersion the new version of the file with the same id (or null, removes)
 * @param oldVersion the old version of the file with the same id (or null, creates)
 * @param uploadsContainer the upload container to uploads file for or delete for
 * @param uploadsPrefix the uploads prefix of such container
 * @param itemDefinitionOrModule the item definition or module (for prop extensions) this field is related to
 * @param include the include (or null)
 * @param propertyDefinition the property
 * @returns the new value (or null) and the consume streams function that will actually consume the
 * streams to store in the remote storage solution
 */
function processOneFileAndItsSameIDReplacement(newVersion, oldVersion, uploadsContainer, uploadsPrefix, domain, itemDefinitionOrModule, include, propertyDefinition) {
    // if the new version is null, this means that the old file
    // is meant to be removed
    if (newVersion === null) {
        return {
            value: null,
            consumeStreams: async (propertyLocationId) => {
                // however we must still check
                // is there an old version actually?
                if (oldVersion) {
                    if (!uploadsContainer) {
                        server_1.logger.warn("processOneFileAndItsSameIDReplacement: a file container is unavailable yet a file change has been attempted");
                        return;
                    }
                    // and let's remove that folder, note how we don't
                    // really wait for this, we detatch this function
                    await (async () => {
                        const idefOrModLocationPath = itemDefinitionOrModule.getQualifiedPathName();
                        const transitoryLocationPath = path_1.default.join(idefOrModLocationPath, propertyLocationId);
                        const includeLocationPath = include ?
                            path_1.default.join(transitoryLocationPath, include.getQualifiedIdentifier()) : transitoryLocationPath;
                        const propertyLocationPath = path_1.default.join(includeLocationPath, propertyDefinition.getId());
                        const fileLocationPath = path_1.default.join(propertyLocationPath, oldVersion.id);
                        try {
                            await removeFolderFor(uploadsContainer, fileLocationPath);
                        }
                        catch (err) {
                            server_1.logger.error("processOneFileAndItsSameIDReplacement: could not remove folder at in " + fileLocationPath, {
                                errStack: err.stack,
                                errMessage: err.message,
                            });
                        }
                    })();
                }
            }
        };
    }
    // given src can be null or undefined
    // we ensure this it doesn't contain any
    // just for consistency
    const newVersionWithoutSrc = {
        ...newVersion,
    };
    delete newVersionWithoutSrc.src;
    // if we don't provide a data
    // stream, assume this is either changing
    // things like filename and whatnot
    if (!newVersion.src) {
        // if there is no old value, as in
        // this is a bad update, as this isn't
        // allowed, because this means you are trying
        // to set a url by hand which could be a vulnerability
        // as only trusted local files are allowed
        if (!oldVersion) {
            // we remove the url and trust the rest of the data
            // the link will be broken, we don't store anything
            return {
                value: {
                    ...newVersionWithoutSrc,
                    url: "",
                },
                consumeStreams: () => null,
            };
        }
        // otherwise if we had an old value, we reject
        // any url change, and use the old url
        return {
            value: {
                ...newVersionWithoutSrc,
                url: oldVersion.url,
            },
            consumeStreams: () => null,
        };
    }
    // if the new value has a source but there
    // is an old vale, this isn't allowed as well
    // as files should have an unique identifier
    // so we reject the data stream
    if (newVersion.src && oldVersion) {
        return {
            value: {
                ...newVersionWithoutSrc,
                url: oldVersion.url,
            },
            consumeStreams: () => null,
        };
    }
    const curatedFileName = newVersion.name.replace(/\s/g, "_").replace(/\-/g, "_").replace(/[^A-Za-z0-9_\.]/g, "x");
    const value = {
        ...newVersionWithoutSrc,
        url: curatedFileName,
    };
    const valueWithStream = {
        ...newVersion,
        url: curatedFileName,
    };
    return {
        value,
        consumeStreams: async (propertyLocationId) => {
            if (!uploadsContainer) {
                server_1.logger.warn("processOneFileAndItsSameIDReplacement: a file container is unavailable yet a file change has been attempted");
                return;
            }
            // we calculate the paths where we are saving this
            // /MOD_module__idefOrMod_item_definition/:id.:version/ITEM_etc/property...
            const idefOrModLocationPath = itemDefinitionOrModule.getQualifiedPathName();
            const transitoryLocationPath = path_1.default.join(idefOrModLocationPath, propertyLocationId);
            const includeLocationPath = include ?
                path_1.default.join(transitoryLocationPath, include.getQualifiedIdentifier()) : transitoryLocationPath;
            const propertyLocationPath = path_1.default.join(includeLocationPath, propertyDefinition.getId());
            // the file path is a directory where the files are contained
            // the reason why it's a directory is because the file can have
            // different variations in the case of media types
            const filePath = path_1.default.join(propertyLocationPath, newVersion.id);
            // we pass the file with the stream property in it
            await addFileFor(filePath, curatedFileName, uploadsContainer, uploadsPrefix, domain, valueWithStream, propertyDefinition);
        }
    };
}
/**
 * Deletes the folder that contains all
 * the file data
 * @param uploadsContainer the container that contains the file
 * @param itemDefinitionOrModule the item definition or module in question
 * @param filesContainerId the transitory id to drop
 * @returns a void promise from when this is done
 */
function deleteEverythingInFilesContainerId(uploadsContainer, itemDefinitionOrModule, filesContainerId) {
    // find the transitory location path
    const idefOrModLocationPath = itemDefinitionOrModule.getQualifiedPathName();
    const filesContainerPath = path_1.default.join(idefOrModLocationPath, filesContainerId);
    return removeFolderFor(uploadsContainer, filesContainerPath);
}
exports.deleteEverythingInFilesContainerId = deleteEverythingInFilesContainerId;
async function removeFolderFor(uploadsContainer, mainPath) {
    return new Promise((resolve, reject) => {
        CAN_LOG_DEBUG && server_1.logger.debug("removeFolderFor: Deleting folder for", { mainPath });
        uploadsContainer.getFiles({
            prefix: mainPath,
        }, (err, files) => {
            if (err) {
                reject(err);
            }
            else if (files && files.length) {
                CAN_LOG_DEBUG && server_1.logger.debug("removeFolderFor: Bulk deleting", { files });
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
                CAN_LOG_DEBUG && server_1.logger.debug("removeFolderFor: Could not find any files");
                resolve();
            }
        });
    });
}
exports.removeFolderFor = removeFolderFor;
/**
 * Adds the file and pass the attributes to the processes
 * in order to build the media info
 * @param mainFilePath the file path where all is to be stored, that is the entire path
 * all the way to the property definition id, module, etc...
 * @param curatedFileName the file name that is being used currently for the file, with all
 * special invalid characters escaped
 * @param uploadsContainer the upload container to uploads file for
 * @param uploadsPrefix the uploads prefix of such container
 * @param value the value that we are storing (this value must contain a stream)
 * @param propertyDefinition the property definition for this
 * @returns a void promise
 */
async function addFileFor(mainFilePath, curatedFileName, uploadsContainer, uploadsPrefix, domain, value, propertyDefinition) {
    // first we get the createReadStream function from the source gql file
    const { createReadStream } = await value.src;
    // we get it
    const stream = createReadStream();
    // now we check if it's an image
    const isImage = constants_1.FILE_SUPPORTED_IMAGE_TYPES.includes(value.type);
    // and we check if we are going to process such image
    const needsImageProcessing = isImage && !value.type.startsWith("image/svg");
    // if we do we call the image conversions
    // algorithm located in the image-conversions.ts file in this same
    // folder
    if (needsImageProcessing) {
        await image_conversions_1.runImageConversions(stream, mainFilePath, curatedFileName, value.type, uploadsContainer, uploadsPrefix, domain, propertyDefinition);
    }
    else {
        // otherwise we just pipe the file
        await sqlUploadPipeFile(uploadsContainer, uploadsPrefix, stream, domain, path_1.default.join(mainFilePath, curatedFileName));
    }
}
/**
 * Uploads a file in a given upload container
 * @param uploadsContainer the uploads container
 * @param uploadsPrefix the uploads prefix of this container
 * @param readStream the read stream of the file
 * @param remote the remote name this file is uploaded as, it's whole path
 * @returns a void promise
 */
async function sqlUploadPipeFile(uploadsContainer, uploadsPrefix, readStream, domain, remote) {
    const finalLocation = domain + "/" + remote;
    CAN_LOG_DEBUG && server_1.logger.debug("sqlUploadPipeFile: Uploading", { path: finalLocation });
    // we make a write stream to the uploads container
    const writeStream = uploadsContainer.client.upload({
        container: uploadsContainer,
        remote: finalLocation,
    });
    // and pipe our read stream
    readStream.pipe(writeStream);
    // return a promise for it
    return new Promise((resolve, reject) => {
        writeStream.on("finish", () => {
            CAN_LOG_DEBUG && server_1.logger.debug("sqlUploadPipeFile: Finished uploading", { path: finalLocation });
            // we call the verify resource is ready function
            verifyResourceIsReady(new URL(uploadsPrefix + finalLocation), resolve);
        });
        writeStream.on("error", reject);
    });
}
exports.sqlUploadPipeFile = sqlUploadPipeFile;
/**
 * Verifies whether a given uploaded resource is actually ready, as
 * containers, might have been done uploading but are not ready to serve
 * the file itself
 * @param url the url to verify
 * @param done the callback once it's done
 */
function verifyResourceIsReady(url, done) {
    // so we get the url string value, for debugging purposes
    const strURL = url.toString();
    CAN_LOG_DEBUG && server_1.logger.debug("verifyResourceIsReady: Verifying readiness of " + strURL);
    // now we use https to call and do a head request to check the status
    https_1.default.get({
        method: "HEAD",
        host: url.host,
        path: url.pathname,
    }, (resp) => {
        // status is succesful
        if (resp.statusCode === 200 || resp.statusCode === 0) {
            CAN_LOG_DEBUG && server_1.logger.debug("verifyResourceIsReady: Verification succeed " + strURL);
            done();
        }
        else {
            // otherwise we wait 100 milliseconds, and recursively execute until it's ready
            CAN_LOG_DEBUG && server_1.logger.debug("verifyResourceIsReady: Resource is not yet ready " + strURL);
            setTimeout(verifyResourceIsReady.bind(null, url, done), 100);
        }
    });
}
