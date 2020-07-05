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
import { ReadStream } from "fs";
import path from "path";
import { FILE_SUPPORTED_IMAGE_TYPES } from "../../../../../constants";
import { runImageConversions } from "./image-conversions";
import { IGQLFile } from "../../../../../gql-querier";
import pkgcloud from "pkgcloud";
import { ConsumeStreamsFnType } from "../../../sql";
import sharp from "sharp";
import { logger } from "../../../../../server";
import Module from "../..";
import https from "https";

/**
 * Processes an extended list based
 * file value
 * @param newValues the new values as a list
 * @param oldValues the old values that this came from
 * @param filesContainerId a transitory id on where to store the files (can be changed later)
 * @param itemDefinitionOrModule the item definition or module (for prop extension) these values are related to
 * @param include the include this values are related to
 * @param propertyDefinition the property (must be of type file)
 * @returns a promise with the new list with the new values
 */
export function processFileListFor(
  newValues: IGQLFile[],
  oldValues: IGQLFile[],
  uploadsContainer: pkgcloud.storage.Container,
  uploadsPrefix: string,
  itemDefinitionOrModule: ItemDefinition | Module,
  include: Include,
  propertyDefinition: PropertyDefinition,
): {
  value: IGQLFile[],
  consumeStreams: ConsumeStreamsFnType;
} {
  // the values might be null so let's ensure them
  const actualNewValues = newValues || [];
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
    return processOneFileAndItsSameIDReplacement(
      newValue,
      relativeOldValue,
      uploadsContainer,
      uploadsPrefix,
      itemDefinitionOrModule,
      include,
      propertyDefinition,
    );
  }).concat(removedFiles.map((removedValue) => {
    // for the removed it's the same but the new value
    // is null
    return processOneFileAndItsSameIDReplacement(
      null,
      removedValue,
      uploadsContainer,
      uploadsPrefix,
      itemDefinitionOrModule,
      include,
      propertyDefinition,
    );
  }))

  // let's filter the nulls
  let filteredNewValues = allNewValues.map((v) => v.value).filter((newValue) => newValue !== null);
  if (filteredNewValues.length === 0) {
    // if it's emmpty then it is null
    filteredNewValues = null;
  }

  // return what we've got
  return {
    value: filteredNewValues,
    consumeStreams: async (containerId: string) => {
      await Promise.all(allNewValues.map(fn => fn.consumeStreams(containerId)));
    }
  }
}

/**
 * Processes a single file, and either gives
 * null or the output, the file, and its possible replacement
 * should be of different id
 * @param newValue the new value
 * @param oldValue the old value
 * @param itemDefinitionOrModule the item definition or module these values are related to
 * @param include the include this values are related to
 * @param propertyDefinition the property (must be of type file)
 * @returns a promise for the new file value
 */
export function processSingleFileFor(
  newValue: IGQLFile,
  oldValue: IGQLFile,
  uploadsContainer: pkgcloud.storage.Container,
  uploadsPrefix: string,
  itemDefinitionOrModule: ItemDefinition | Module,
  include: Include,
  propertyDefinition: PropertyDefinition,
): {
  value: IGQLFile,
  consumeStreams: ConsumeStreamsFnType;
} {
  if (oldValue && oldValue.id === newValue.id) {
    return processOneFileAndItsSameIDReplacement(
      newValue,
      oldValue,
      uploadsContainer,
      uploadsPrefix,
      itemDefinitionOrModule,
      include,
      propertyDefinition,
    );
  } else {
    // basically we run this asa two step process
    // first we drop the old value, by using the same id
    // function giving no new value
    const initialStepOutput = processOneFileAndItsSameIDReplacement(
      null,
      oldValue,
      uploadsContainer,
      uploadsPrefix,
      itemDefinitionOrModule,
      include,
      propertyDefinition,
    );
    // and return with the same id but no old value, create it
    const secondStepOutput = processOneFileAndItsSameIDReplacement(
      newValue,
      null,
      uploadsContainer,
      uploadsPrefix,
      itemDefinitionOrModule,
      include,
      propertyDefinition,
    );

    return {
      value: secondStepOutput.value,
      consumeStreams: async (containerId: string) => {
        await Promise.all([initialStepOutput, secondStepOutput].map(fn => fn.consumeStreams(containerId)));
      }
    }
  }
}

/**
 * Processes a single file
 * @param newVersion the new version of the file with the same id (or null, removes)
 * @param oldVersion the old version of the file with the same id (or null, creates)
 * @param itemDefinitionOrModule the item definition or module (for prop extensions) this field is related to
 * @param include the include (or null)
 * @param propertyDefinition the property
 * @returns a promise for the new the new file value
 */
function processOneFileAndItsSameIDReplacement(
  newVersion: IGQLFile,
  oldVersion: IGQLFile,
  uploadsContainer: pkgcloud.storage.Container,
  uploadsPrefix: string,
  itemDefinitionOrModule: ItemDefinition | Module,
  include: Include,
  propertyDefinition: PropertyDefinition,
): {
  value: IGQLFile,
  consumeStreams: ConsumeStreamsFnType;
} {
  // if the new version is null, this means that the old file
  // is meant to be removed
  if (newVersion === null) {
    return {
      value: null,
      consumeStreams: async (containerId: string) => {
        // however we must still check
        // is there an old version actually?
        if (oldVersion) {
          // and let's remove that folder, note how we don't
          // really wait for this, we detatch this function
          await (async () => {
            const idefOrModLocationPath = itemDefinitionOrModule.getQualifiedPathName();
            const transitoryLocationPath = path.join(idefOrModLocationPath, containerId);
            const includeLocationPath = include ?
              path.join(transitoryLocationPath, include.getQualifiedIdentifier()) : transitoryLocationPath;
            const propertyLocationPath = path.join(includeLocationPath, propertyDefinition.getId());
            const fileLocationPath = path.join(propertyLocationPath, oldVersion.id);
            try {
              await removeFolderFor(uploadsContainer, fileLocationPath);
            } catch (err) {
              logger.error(
                "processOneFileAndItsSameIDReplacement: could not remove folder at container " + uploadsContainer + " in " + fileLocationPath,
                {
                  errStack: err.stack,
                  errMessage: err.message,
                },
              );
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

  const curatedFileName = newVersion.name.replace(/\s/g, "_").replace(/\-/g,"_").replace(/[^A-Za-z0-9_\.]/g, "x");

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
    consumeStreams: async (containerId: string) => {
      // we calculate the paths where we are saving this
      // /MOD_module__idefOrMod_item_definition/:id.:version/ITEM_etc/property...
      const idefOrModLocationPath = itemDefinitionOrModule.getQualifiedPathName();
      const transitoryLocationPath = path.join(idefOrModLocationPath, containerId);
      const includeLocationPath = include ?
        path.join(transitoryLocationPath, include.getQualifiedIdentifier()) : transitoryLocationPath;
      const propertyLocationPath = path.join(includeLocationPath, propertyDefinition.getId());

      // the file path is a directory where the files are contained
      // the reason why it's a directory is because the file can have
      // different variations in the case of media types
      const filePath = path.join(propertyLocationPath, newVersion.id);

      // we pass the file with the stream property in it
      await addFileFor(
        filePath,
        curatedFileName,
        uploadsContainer,
        uploadsPrefix,
        valueWithStream,
        propertyDefinition,
      )
    }
  }
}

/**
 * Deletes the folder that contains all
 * the file data
 * @param uploadsContainer the container that contains the file
 * @param itemDefinitionOrModule the item definition or module in question
 * @param filesContainerId the transitory id to drop
 * @returns a void promise from when this is done
 */
export function deleteEverythingInFilesContainerId(
  uploadsContainer: pkgcloud.storage.Container,
  itemDefinitionOrModule: ItemDefinition | Module,
  filesContainerId: string,
): Promise<void> {
  // find the transitory location path
  const idefOrModLocationPath = itemDefinitionOrModule.getQualifiedPathName();
  const filesContainerPath = path.join(idefOrModLocationPath, filesContainerId);

  return removeFolderFor(uploadsContainer, filesContainerPath);
}

export async function removeFolderFor(
  uploadsContainer: pkgcloud.storage.Container,
  mainPath: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    logger.debug("removeFolderFor: Deleting folder for", {mainPath});

    (uploadsContainer as any).getFiles({
      prefix: mainPath,
    }, (err: pkgcloud.ClientError, files: pkgcloud.storage.File[]) => {
      if (err) {
        reject(err);
      } else if (files && files.length) {
        logger.debug("removeFolderFor: Bulk deleting", {files});
        (uploadsContainer.client as any).bulkDelete(uploadsContainer, files, (err: pkgcloud.ClientError) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } else {
        logger.debug("removeFolderFor: Could not find any files");
        resolve();
      }
    });
  });
}

/**
 * Adds the file and pass the attributes to the processes
 * in order to build the media info
 * @param mainFilePath the file path where all is to be stored
 * @param standardURLPath the url that should be generated
 * @param value the value that we are storing (this value contains a stream)
 * @param propertyDefinition the property definition
 * @returns a promise that contains the url and the file type that was taken from the stream
 */
async function addFileFor(
  mainFilePath: string,
  curatedFileName: string,
  uploadsContainer: pkgcloud.storage.Container,
  uploadsPrefix: string,
  value: IGQLFile,
  propertyDefinition: PropertyDefinition,
): Promise<void> {
  const { createReadStream } = await value.src;

  const stream: ReadStream = createReadStream();
  const isImage = FILE_SUPPORTED_IMAGE_TYPES.includes(value.type);
  const needsImageProcessing = isImage && !value.type.startsWith("image/svg");
  if (needsImageProcessing) {
    await runImageConversions(
      stream,
      mainFilePath,
      curatedFileName,
      value.type,
      uploadsContainer,
      uploadsPrefix,
      propertyDefinition,
    );
  } else {
    await sqlUploadPipeFile(
      uploadsContainer,
      uploadsPrefix,
      stream,
      path.join(mainFilePath, curatedFileName),
    );
  }
}

export async function sqlUploadPipeFile(
  uploadsContainer: pkgcloud.storage.Container,
  uploadsPrefix: string,
  readStream: ReadStream | sharp.Sharp,
  remote: string,
): Promise<void> {
  logger.debug("sqlUploadPipeFile: Uploading", {remote});

  const writeStream = uploadsContainer.client.upload({
    container: uploadsContainer as any,
    remote,
  });
  readStream.pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      logger.debug("sqlUploadPipeFile: Finished uploading", {remote});
      verifyResourceIsReady(
        new URL(uploadsPrefix + remote),
        resolve,
      );
    });
    writeStream.on("error", reject);
  });
}

function verifyResourceIsReady(url: URL, done: () => void) {
  const strURL = url.toString();
  logger.debug("verifyResourceIsReady: Verifying readiness of " + strURL);
  https.get({
    method: "HEAD",
    host: url.host,
    path: url.pathname,
  }, (resp) => {
    if (resp.statusCode === 200 || resp.statusCode === 0) {
      logger.debug("verifyResourceIsReady: Verification succeed " + strURL);
      done();
    } else {
      logger.debug("verifyResourceIsReady: Resource is not yet ready " + strURL);
      setTimeout(verifyResourceIsReady.bind(null, url, done), 100);
    }
  });
}