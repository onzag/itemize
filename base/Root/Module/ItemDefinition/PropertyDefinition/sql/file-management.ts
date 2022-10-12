/**
 * Contains the functionality that makes it so that when files come from graphql
 * streams and are to be stored in the database the files are sent somewhere else
 * and the url is actually what it's stored
 *
 * @module
 */

import PropertyDefinition from "..";
import ItemDefinition from "../..";
import Include from "../../Include";
import { ReadStream } from "fs";
import path from "path";
import { FILE_SUPPORTED_IMAGE_TYPES } from "../../../../../../constants";
import { runImageConversions } from "./image-conversions";
import { IGQLFile } from "../../../../../../gql-querier";
import { ConsumeStreamsFnType } from "../../../../sql";
import sharp from "sharp";
import { logger } from "../../../../../../server/logger";
import Module from "../../..";
import StorageProvider from "../../../../../../server/services/base/StorageProvider";
import {
  CAN_LOG_DEBUG
} from "../../../../../../server/environment";

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
export function processFileListFor(
  newValues: IGQLFile[],
  oldValues: IGQLFile[],
  uploadsClient: StorageProvider<any>,
  domain: string,
  itemDefinitionOrModule: ItemDefinition | Module,
  include: Include,
  propertyDefinition: PropertyDefinition,
): {
  value: IGQLFile[],
  consumeStreams: ConsumeStreamsFnType;
} {
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
    return processOneFileAndItsSameIDReplacement(
      newValue,
      relativeOldValue,
      uploadsClient,
      domain,
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
      uploadsClient,
      domain,
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
    consumeStreams: async (propertyLocationId: string) => {
      await Promise.all(allNewValues.map(fn => fn.consumeStreams(propertyLocationId)));
    }
  }
}

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
export function processSingleFileFor(
  newValue: IGQLFile,
  oldValue: IGQLFile,
  uploadsClient: StorageProvider<any>,
  domain: string,
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
      uploadsClient,
      domain,
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
      uploadsClient,
      domain,
      itemDefinitionOrModule,
      include,
      propertyDefinition,
    );
    // and return with the same id but no old value, create it
    const secondStepOutput = processOneFileAndItsSameIDReplacement(
      newValue,
      null,
      uploadsClient,
      domain,
      itemDefinitionOrModule,
      include,
      propertyDefinition,
    );

    return {
      value: secondStepOutput.value,
      consumeStreams: async (propertyLocationId: string) => {
        await Promise.all([initialStepOutput, secondStepOutput].map(fn => fn.consumeStreams(propertyLocationId)));
      }
    }
  }
}

/**
 * Processes a single file that is to be changed, that is, their ids is equal
 * @param newVersion the new version of the file with the same id (or null, removes)
 * @param oldVersion the old version of the file with the same id (or null, creates)
 * @param uploadsClient the upload client
 * @param itemDefinitionOrModule the item definition or module (for prop extensions) this field is related to
 * @param include the include (or null)
 * @param propertyDefinition the property
 * @returns the new value (or null) and the consume streams function that will actually consume the
 * streams to store in the remote storage solution
 */
function processOneFileAndItsSameIDReplacement(
  newVersion: IGQLFile,
  oldVersion: IGQLFile,
  uploadsClient: StorageProvider<any>,
  domain: string,
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
      consumeStreams: async (propertyLocationId: string) => {
        // however we must still check
        // is there an old version actually?
        if (oldVersion) {
          if (!uploadsClient) {
            logger.error(
              {
                functionName: "processOneFileAndItsSameIDReplacement",
                message: "A file container is unavailable yet a file change has been attempted",
              },
            );
            return;
          }
          // and let's remove that folder, note how we don't
          // really wait for this, we detatch this function
          await (async () => {
            const idefOrModLocationPath = itemDefinitionOrModule.getQualifiedPathName();
            const transitoryLocationPath = path.join(idefOrModLocationPath, propertyLocationId);
            const includeLocationPath = include ?
              path.join(transitoryLocationPath, include.getQualifiedIdentifier()) : transitoryLocationPath;
            const propertyLocationPath = path.join(includeLocationPath, propertyDefinition.getId());
            const fileLocationPath = path.join(domain, propertyLocationPath, oldVersion.id);
            try {
              await uploadsClient.removeFolder(fileLocationPath);
            } catch (err) {
              logger.error(
                {
                  functionName: "processOneFileAndItsSameIDReplacement",
                  message: "Could not remove folder at in " + fileLocationPath,
                  err,
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

  const curatedFileName = newVersion.name.replace(/\s/g, "_").replace(/\-/g, "_").replace(/[^A-Za-z0-9_\.]/g, "x");

  const value = {
    ...newVersionWithoutSrc,
    url: curatedFileName,
  };

  // now we check if it's an image
  const isImage = FILE_SUPPORTED_IMAGE_TYPES.includes(value.type);
  // and we check if we are going to process such image
  const needsImageProcessing = isImage && !value.type.startsWith("image/svg");

  // let's check the image metadata
  if (isImage && needsImageProcessing) {
    const expectedMetadataDimensions = (
      propertyDefinition.getSpecialProperty("dimensions") as string || ""
    ).split(";").map((v) => v.split(" ")[0].trim()).join(",");

    // no metadata... this isn't good
    if (!value.metadata) {
      // we cannot calculate width and height but at least
      // we can add the missing dimensions that will be added and are missing
      // so that source sets work, kinda
      value.metadata = ";" + expectedMetadataDimensions + ";";
    } else {
      const metadataSplitted = value.metadata.split(";");
      // the dimensions are stored in the 0 index
      // the sizes are stored in the 1 index
      // extra arbitrary info comes later
      if (metadataSplitted[1] !== expectedMetadataDimensions) {
        // repair metadata dimensions
        // this can happen when for example the server
        // and the client don't match, or when
        // handling emails
        metadataSplitted[0] = metadataSplitted[0] || "";
        metadataSplitted[1] = expectedMetadataDimensions;
        metadataSplitted[2] = metadataSplitted[2] || "";
        // ensure they are not undefined just in case
        value.metadata = metadataSplitted.join(";");
      }
    }
  }

  const valueWithStream = {
    ...newVersion,
    url: curatedFileName,
  };
  return {
    value,
    consumeStreams: async (propertyLocationId: string) => {
      if (!uploadsClient) {
        logger.error(
          {
            functionName: "processOneFileAndItsSameIDReplacement",
            message: "A file container is unavailable yet a file change has been attempted",
          },
        );
        return;
      }

      // we calculate the paths where we are saving this
      // /MOD_module__idefOrMod_item_definition/:id.:version/ITEM_etc/property...
      const idefOrModLocationPath = itemDefinitionOrModule.getQualifiedPathName();
      const transitoryLocationPath = path.join(idefOrModLocationPath, propertyLocationId);
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
        uploadsClient,
        domain,
        valueWithStream,
        propertyDefinition,
      );
    }
  }
}

/**
 * Deletes the folder that contains all
 * the file data
 * @param domain the domain we are working with
 * @param uploadsClient the uploads client
 * @param itemDefinitionOrModule the item definition or module in question
 * @param idVersionId the transitory id to drop
 * @returns a void promise from when this is done
 */
export function deleteEverythingInFilesContainerId(
  domain: string,
  uploadsClient: StorageProvider<any>,
  itemDefinitionOrModule: ItemDefinition | Module,
  idVersionId: string,
): Promise<void> {
  // find the transitory location path
  const idefOrModLocationPath = itemDefinitionOrModule.getQualifiedPathName();
  const filesContainerPath = path.join(domain, idefOrModLocationPath, idVersionId);

  return uploadsClient.removeFolder(filesContainerPath);
}

/**
 * Adds the file and pass the attributes to the processes
 * in order to build the media info
 * @param mainFilePath the file path where all is to be stored, that is the entire path
 * all the way to the property definition id, module, etc...
 * @param curatedFileName the file name that is being used currently for the file, with all
 * special invalid characters escaped
 * @param uploadsClient the uploads client
 * @param value the value that we are storing (this value must contain a stream)
 * @param propertyDefinition the property definition for this
 * @returns a void promise
 */
async function addFileFor(
  mainFilePath: string,
  curatedFileName: string,
  uploadsClient: StorageProvider<any>,
  domain: string,
  value: IGQLFile,
  propertyDefinition: PropertyDefinition,
): Promise<void> {
  // first we get the createReadStream function from the source gql file
  let stream: ReadStream = null;

  if (value.src instanceof Promise) {
    const { createReadStream } = await value.src;
    // we get it
    stream = createReadStream();
  } else if (value.src instanceof ReadStream) {
    stream = value.src;
  } else {
    throw new Error(
      "Passed a blob/buffer to the file source, the server side only supports streams for " + value.name,
    );
  }
  // now we check if it's an image
  const isImage = FILE_SUPPORTED_IMAGE_TYPES.includes(value.type);
  // and we check if we are going to process such image
  const needsImageProcessing = isImage && !value.type.startsWith("image/svg");
  // if we do we call the image conversions
  // algorithm located in the image-conversions.ts file in this same
  // folder
  if (needsImageProcessing) {
    await runImageConversions(
      stream,
      mainFilePath,
      curatedFileName,
      value.type,
      uploadsClient,
      domain,
      propertyDefinition,
    );
  } else {
    // otherwise we just pipe the file
    await sqlUploadPipeFile(
      uploadsClient,
      stream,
      domain,
      path.join(mainFilePath, curatedFileName),
    );
  }
}

/**
 * Uploads a file in a given upload container
 * @param uploadsClient the uploads client
 * @param readStream the read stream of the file
 * @param remote the remote name this file is uploaded as, it's whole path
 * @returns a void promise
 */
export async function sqlUploadPipeFile(
  uploadsClient: StorageProvider<any>,
  readStream: ReadStream | sharp.Sharp,
  domain: string,
  remote: string,
): Promise<void> {
  const finalLocation = domain + "/" + remote;

  CAN_LOG_DEBUG && logger.debug({
    functionName: "sqlUploadPipeFile",
    message: "Uploading",
    data: { path: finalLocation },
  });

  await uploadsClient.upload(finalLocation, readStream, true);
}