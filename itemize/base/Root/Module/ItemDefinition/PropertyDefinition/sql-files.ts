import PropertyDefinition, { IPropertyDefinitionIncludedFileInfoType } from ".";
import ItemDefinition from "..";
import Item from "../Item";
import fs, { ReadStream } from "fs";
import path from "path";
import { FILE_SUPPORTED_IMAGE_TYPES } from "../../../../../constants";
import { runImageConversions } from "./image-conversions";
const fsAsync = fs.promises;

/**
 * Processes an extended list based
 * file value
 * @param newValues the new values as a list
 * @param oldValues the old values that this came from
 * @param transitoryId a transitory id on where to store the files (can be changed later)
 * @param itemDefinition the item definition these values are related to
 * @param item the item this values are related to
 * @param propertyDefinition the property (must be of type file)
 */
export async function processFileListFor(
  newValues: IPropertyDefinitionIncludedFileInfoType[],
  oldValues: IPropertyDefinitionIncludedFileInfoType[],
  transitoryId: string,
  itemDefinition: ItemDefinition,
  item: Item,
  propertyDefinition: PropertyDefinition,
) {
  // the values might be null so let's ensure them
  const actualNewValues = newValues || [];
  const actualOldValues = oldValues || [];

  // now let's get a list of the removed files
  // from the ensured values
  const removedFiles = actualOldValues.filter((oldValue) => {
    return actualNewValues.findIndex((newValue) => newValue.id === oldValue.id) === -1;
  });

  // and now using the promise let's extract
  // all this stuff
  const allNewValues = await Promise.all(
    // first let's process each file that was
    // either modified or added
    actualNewValues.map((newValue) => {
      // let's pass it to the function that does that
      // job, pick the old value, if exists
      const relativeOldValue = actualOldValues.find((oldValue) => oldValue.id === newValue.id) || null;
      return processOneFileAndItsSameIDReplacement(
        newValue,
        relativeOldValue,
        transitoryId,
        itemDefinition,
        item,
        propertyDefinition,
      );
    }).concat(removedFiles.map((removedValue) => {
      // for the removed it's the same but the new value
      // is null
      return processOneFileAndItsSameIDReplacement(
        null,
        removedValue,
        transitoryId,
        itemDefinition,
        item,
        propertyDefinition,
      );
    })),
  );

  // let's filter the nulls
  const filteredNewValues = allNewValues.filter((newValue) => newValue !== null);
  if (filteredNewValues.length === 0) {
    // if it's emmpty then return null
    return null;
  }

  // return what we've got
  return filteredNewValues;
}

/**
 * Processes a single file, and either gives
 * null or the output, the file, and its possible replacement
 * should be of different id
 * @param newValue the new value
 * @param oldValue the old value
 * @param transitoryId a transitory id on where to store the files (can be changed later)
 * @param itemDefinition the item definition these values are related to
 * @param item the item this values are related to
 * @param propertyDefinition the property (must be of type file)
 */
export async function processSingleFileFor(
  newValue: IPropertyDefinitionIncludedFileInfoType,
  oldValue: IPropertyDefinitionIncludedFileInfoType,
  transitoryId: string,
  itemDefinition: ItemDefinition,
  item: Item,
  propertyDefinition: PropertyDefinition,
) {
  // basically we run this asa two step process
  // first we drop the old value, by using the same id
  // function giving no new value
  await processOneFileAndItsSameIDReplacement(
    null,
    oldValue,
    transitoryId,
    itemDefinition,
    item,
    propertyDefinition,
  );
  // and return with the same id but no old value, create it
  return await processOneFileAndItsSameIDReplacement(
    newValue,
    null,
    transitoryId,
    itemDefinition,
    item,
    propertyDefinition,
  );
}

/**
 * Processes a single file
 * @param newVersion the new version of the file with the same id (or null, removes)
 * @param oldVersion the old version of the file with the same id (or null, creates)
 * @param transitoryId the transitory identifier
 * @param itemDefinition the item definition
 * @param item the item (or null)
 * @param propertyDefinition the property
 */
async function processOneFileAndItsSameIDReplacement(
  newVersion: IPropertyDefinitionIncludedFileInfoType,
  oldVersion: IPropertyDefinitionIncludedFileInfoType,
  transitoryId: string,
  itemDefinition: ItemDefinition,
  item: Item,
  propertyDefinition: PropertyDefinition,
) {
  // we calculate the paths where we are saving this
  // /dist/uploads/MOD_module__IDEF_item_definition/:id/ITEM_etc/property...
  const idefLocationPath = path.join("dist", "uploads", itemDefinition.getQualifiedPathName());
  const transitoryLocationPath = path.join(idefLocationPath, transitoryId);
  const itemLocationPath = item ?
    path.join(transitoryLocationPath, item.getQualifiedIdentifier()) : transitoryLocationPath;
  const propertyLocationPath = path.join(itemLocationPath, propertyDefinition.getId());

  // if the new version is null, this means that the old file
  // is meant to be removed
  if (newVersion === null) {
    // however we must still check
    // is there an old version actually?
    if (
      oldVersion &&
      // check that the entire location where its folder is supposed
      // to be exists
      await checkEntireComboExists(
        idefLocationPath,
        transitoryLocationPath,
        itemLocationPath,
        propertyLocationPath,
        path.join(propertyLocationPath, oldVersion.id),
      )
    ) {
      // and let's remove that folder
      removeFilesFor(
        path.join(propertyLocationPath, oldVersion.id),
      );
    }
    return null;
  }

  // if we don't provide a data
  // stream, assume this is either changing
  // things like filename and whatnot
  if (!newVersion.src) {
    // if there is no old value, as in
    // this is a bad update, as this isn't
    // allowed, because this means you are trying
    // to set a url by hand which could be a vulnerability
    // as only trusted local files are allowed
    if (!newVersion) {
      // we remove the url and trust the rest of the data
      // the link will be broken, we don't store anything
      return {
        ...newVersion,
        url: "",
      };
    }
    // otherwise if we had an old value, we reject
    // any url change, and use the old url
    return {
      ...newVersion,
      url: oldVersion.url,
    };
  }

  // if the new value has a source but there
  // is an old vale, this isn't allowed as well
  // as files should have an unique identifier
  // so we reject the data stream
  if (newVersion.src && oldVersion) {
    return {
      ...newVersion,
      url: oldVersion.url,
    };
  }

  // the file path is a directory where the files are contained
  // the reason why it's a directory is because the file can have
  // different variations in the case of media types
  const filePath = path.join(propertyLocationPath, newVersion.id);
  // we get the standard url, basically it's like the path, but without
  // anything to it regarding the folder structure
  let standardURLPath = path.join(
    itemDefinition.getQualifiedPathName(),
    transitoryId,
  );
  if (item) {
    standardURLPath = path.join(standardURLPath, item.getQualifiedIdentifier());
  }
  standardURLPath = path.join(standardURLPath, propertyDefinition.getId(), newVersion.id);

  // now we ensure the file path, basically,
  // make folders and folder if they don't exist
  // until we have our file folder
  try {
    await ensureEntireComboExists(
      idefLocationPath,
      transitoryLocationPath,
      itemLocationPath,
      propertyLocationPath,
      filePath,
    );

    // and now we call the function
    // that actually adds the file
    const {
      url,
    } = await addFileFor(
      filePath,
      standardURLPath,
      newVersion,
      propertyDefinition,
    );
    // replace the url with that
    const appliedValue = {
      ...newVersion,
      url,
    };
    // delete the stream
    delete appliedValue.src;
    return appliedValue;
  } catch (err) {
    console.error(err);
    // build a fallback without an url
    // as it failed to upload
    const appliedFallbackValue = {
      ...newVersion,
      url: "",
    };
    delete appliedFallbackValue.src;
    return appliedFallbackValue;
  }
}

/**
 * Updates a transitory id for an item definition
 * that is /dist/uploads/MOD_module__IDEF_item/:id
 * and changes it to something else so that it belongs
 * to that element
 * @param itemDefinition the item defintion in question
 * @param originalId the original id that was used
 * @param newId the new id
 */
export async function updateTransitoryIdIfExists(
  itemDefinition: ItemDefinition,
  originalId: string,
  newId: string,
): Promise<void> {
  // we basically just rename that folder
  const idefLocationPath = path.join("dist", "uploads", itemDefinition.getQualifiedPathName());
  const originalTransitoryLocation = path.join(idefLocationPath, originalId);
  const newTransitoryLocation = path.join(idefLocationPath, newId);

  if (await checkExists(originalTransitoryLocation)) {
    await fsAsync.rename(originalTransitoryLocation, newTransitoryLocation);
  }
}

/**
 * Deletes the folder that contains all
 * the file data
 * @param itemDefinition the item definition in question
 * @param transitoryId the transitory id to drop
 */
export async function deleteEverythingInTransitoryId(
  itemDefinition: ItemDefinition,
  transitoryId: string,
): Promise<void> {
  // find the transitory location path
  const idefLocationPath = path.join("dist", "uploads", itemDefinition.getQualifiedPathName());
  const transitoryLocationPath = path.join(idefLocationPath, transitoryId);

  // check that it exists
  if (await checkExists(idefLocationPath) && await checkExists(transitoryLocationPath)) {
    // and remove it
    try {
      await fsAsync.rmdir(transitoryLocationPath, {recursive: true});
    } catch (err) {
      console.error(err);
      // ignore errors, leave an orphaned folder
    }
  }
}

/**
 * does the same as the previous function but does not check
 * @param mainFilePath the path to drop
 */
function removeFilesFor(
  mainFilePath: string,
) {
  fsAsync.rmdir(mainFilePath, {recursive: true});
}

/**
 * Adds the file and pass the attributes to the processes
 * in order to build the media info
 * @param mainFilePath the file path where all is to be stored
 * @param standardURLPath the url that should be generated
 * @param value the value that we are storing (this value contains a stream)
 * @param propertyDefinition the property definition
 */
async function addFileFor(
  mainFilePath: string,
  standardURLPath: string,
  value: IPropertyDefinitionIncludedFileInfoType,
  propertyDefinition: PropertyDefinition,
): Promise<{
  url: string,
  type: string,
}> {
  const { filename, mimetype, createReadStream } = await value.src;

  const storedPath = path.join(mainFilePath, filename);
  const stream: ReadStream = createReadStream();
  const writeStream = fs.createWriteStream(storedPath);
  stream.pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      resolve({
        url: path.join("/rest/uploads", path.join(standardURLPath, filename)),
        type: mimetype.toString(),
      });

      const isImage = FILE_SUPPORTED_IMAGE_TYPES.includes(value.type);
      if (isImage && !value.type.startsWith("svg")) {
        runImageConversions(
          filename,
          storedPath,
          propertyDefinition,
        );
      }
    });
    writeStream.on("error", reject);
  });
}

/**
 * Checks that all these folders exists
 * @param idefLocationPath eg /dist/uploads/MOD_module__IDEF_item
 * @param transitoryLocationPath eg /dist/uploads/MOD_module__IDEF_item/1
 * @param itemLocationPath eg /dist/uploads/MOD_module__IDEF_item/1/ITEM_item
 * @param propertyLocationPath eg /dist/uploads/MOD_module__IDEF_item/1/property
 * @param filePath eg /dist/uploads/MOD_module__IDEF_item/1/property/FILE0000001
 */
async function checkEntireComboExists(
  idefLocationPath: string,
  transitoryLocationPath: string,
  itemLocationPath: string,
  propertyLocationPath: string,
  filePath: string,
) {
  return (
    await checkExists(idefLocationPath) &&
    await checkExists(transitoryLocationPath) &&
    (transitoryLocationPath === itemLocationPath || await checkExists(itemLocationPath)) &&
    await checkExists(propertyLocationPath) &&
    await checkExists(filePath)
  );
}

/**
 * Builds all these directories if they don't exist
 * @param idefLocationPath eg /dist/uploads/MOD_module__IDEF_item
 * @param transitoryLocationPath eg /dist/uploads/MOD_module__IDEF_item/1
 * @param itemLocationPath eg /dist/uploads/MOD_module__IDEF_item/1/ITEM_item
 * @param propertyLocationPath eg /dist/uploads/MOD_module__IDEF_item/1/property
 * @param filePath eg /dist/uploads/MOD_module__IDEF_item/1/property/FILE0000001
 */
async function ensureEntireComboExists(
  idefLocationPath: string,
  transitoryLocationPath: string,
  itemLocationPath: string,
  propertyLocationPath: string,
  filePath: string,
) {
  if (await checkExists(filePath)) {
    return;
  }

  if (!await checkExists(idefLocationPath)) {
    await fsAsync.mkdir(idefLocationPath);
  }
  if (!await checkExists(transitoryLocationPath)) {
    await fsAsync.mkdir(transitoryLocationPath);
  }
  if (
    transitoryLocationPath !== itemLocationPath &&
    !await checkExists(itemLocationPath)
  ) {
    await fsAsync.mkdir(itemLocationPath);
  }
  if (!await checkExists(propertyLocationPath)) {
    await fsAsync.mkdir(propertyLocationPath);
  }

  await fsAsync.mkdir(filePath);
}

/**
 * checks if a file exists
 * @param location the path
 */
async function checkExists(
  location: string,
) {
  let exists = true;
  try {
    await fsAsync.access(location, fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }
  return exists;
}
