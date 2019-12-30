import PropertyDefinition, { IPropertyDefinitionIncludedFileInfoType } from ".";
import ItemDefinition from "..";
import Item from "../Item";
import fs from "fs";
import path from "path";
import { FILE_SUPPORTED_IMAGE_TYPES } from "../../../../../constants";
const fsAsync = fs.promises;

export async function processFileListFor(
  newValues: IPropertyDefinitionIncludedFileInfoType[],
  oldValues: IPropertyDefinitionIncludedFileInfoType[],
  transitoryId: string,
  itemDefinition: ItemDefinition,
  item: Item,
  propertyDefinition: PropertyDefinition,
) {
  const actualNewValues = newValues || [];
  const actualOldValues = oldValues || [];
  const removedFiles = actualOldValues.filter((oldValue) => {
    return actualNewValues.findIndex((newValue) => newValue.id === oldValue.id) === -1;
  });
  const allNewValues = await Promise.all(
    actualNewValues.map((newValue) => {
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

  const filteredNewValues = allNewValues.filter((newValue) => newValue !== null);
  if (filteredNewValues.length === 0) {
    return null;
  }

  return filteredNewValues;
}

export async function processSingleFileFor(
  newValue: IPropertyDefinitionIncludedFileInfoType,
  oldValue: IPropertyDefinitionIncludedFileInfoType,
  transitoryId: string,
  itemDefinition: ItemDefinition,
  item: Item,
  propertyDefinition: PropertyDefinition,
) {
  await processOneFileAndItsSameIDReplacement(
    null,
    oldValue,
    transitoryId,
    itemDefinition,
    item,
    propertyDefinition,
  );
  return await processOneFileAndItsSameIDReplacement(
    newValue,
    null,
    transitoryId,
    itemDefinition,
    item,
    propertyDefinition,
  );
}

async function processOneFileAndItsSameIDReplacement(
  newValue: IPropertyDefinitionIncludedFileInfoType,
  oldValue: IPropertyDefinitionIncludedFileInfoType,
  transitoryId: string,
  itemDefinition: ItemDefinition,
  item: Item,
  propertyDefinition: PropertyDefinition,
) {
  const idefLocationPath = path.join("dist", "data", "uploads", itemDefinition.getQualifiedPathName());
  const transitoryLocationPath = path.join(idefLocationPath, transitoryId);
  const itemLocationPath = item ?
    path.join(transitoryLocationPath, item.getQualifiedIdentifier()) : transitoryLocationPath;
  const propertyLocationPath = path.join(itemLocationPath, propertyDefinition.getId());

  if (newValue === null) {
    if (
      oldValue &&
      await checkEntireComboExists(
        idefLocationPath,
        transitoryLocationPath,
        itemLocationPath,
        propertyLocationPath,
        path.join(propertyLocationPath, oldValue.id),
      )
    ) {
      removeFilesFor(
        path.join(propertyLocationPath, oldValue.id),
      );
    }
    return null;
  }

  // if we don't provide a data
  // stream, assume this is either changing
  // things like filename and whatnot
  if (!newValue.src) {
    // if there is no old value, as in
    // this is a bad update, as this isn't
    // allowed, because this means you are trying
    // to set a url by hand which could be a vulnerability
    // as only trusted local files are allowed
    if (!oldValue) {
      // we remove the url and trust the rest of the data
      // the link will be broken, we don't store anything
      return {
        ...newValue,
        url: "",
      };
    }
    // otherwise if we had an old value, we reject
    // any url change, and use the old url
    return {
      ...newValue,
      url: oldValue.url,
    };
  }

  // if the new value has a source but there
  // is an old vale, this isn't allowed as well
  // as files should have an unique identifier
  // so we reject the data stream
  if (newValue.src && oldValue) {
    return {
      ...newValue,
      url: oldValue.url,
    };
  }

  const filePath = path.join(propertyLocationPath, newValue.id);
  let standardURLPath = path.join(
    "uploads",
    itemDefinition.getQualifiedPathName(),
    transitoryId,
  );
  if (item) {
    standardURLPath = path.join(standardURLPath, item.getQualifiedIdentifier());
  }
  standardURLPath = path.join(standardURLPath, propertyDefinition.getId(), newValue.id);

  try {
    await ensureEntireComboExists(
      idefLocationPath,
      transitoryLocationPath,
      itemLocationPath,
      propertyLocationPath,
      filePath,
    );

    const {
      url,
    } = await addFileFor(
      filePath,
      standardURLPath,
      newValue,
      propertyDefinition,
    );
    const appliedValue = {
      ...newValue,
      url,
    };
    delete appliedValue.src;
    return appliedValue;
  } catch (err) {
    console.error(err);
    const appliedFallbackValue = {
      ...newValue,
      url: "",
    };
    delete appliedFallbackValue.src;
    return appliedFallbackValue;
  }
}

export async function updateTransitoryId(
  itemDefinition: ItemDefinition,
  originalId: string,
  newId: string,
): Promise<void> {
  const idefLocationPath = path.join("dist", "data", "uploads", itemDefinition.getQualifiedPathName());
  const originalTransitoryLocation = path.join(idefLocationPath, originalId);
  const newTransitoryLocation = path.join(idefLocationPath, newId);

  await fsAsync.rename(originalTransitoryLocation, newTransitoryLocation);
}

export async function deleteEverythingInTransitoryId(
  itemDefinition: ItemDefinition,
  transitoryId: string,
): Promise<void> {
  const idefLocationPath = path.join("dist", "data", "uploads", itemDefinition.getQualifiedPathName());
  const transitoryLocationPath = path.join(idefLocationPath, transitoryId);

  if (await checkExists(idefLocationPath) && await checkExists(transitoryLocationPath)) {
    try {
      await fsAsync.rmdir(transitoryLocationPath, {recursive: true});
    } catch (err) {
      console.error(err);
      // ignore errors, leave an orphaned folder
    }
  }
}

function removeFilesFor(
  mainFilePath: string,
) {
  fsAsync.rmdir(mainFilePath, {recursive: true});
}

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
  // if (
  //   value.type.startsWith("image/") &&
  //   FILE_SUPPORTED_IMAGE_TYPES.includes(value.type)
  // ) {
  //   fsAsync.unlink(mainFilePath + "_SMALL");
  //   fsAsync.unlink(mainFilePath + "_MEDIUM");
  //   fsAsync.unlink(mainFilePath + "_LARGE");
  // }
  // const filenamesplitted: string[] = filename.split(".");
  // const originalExtension = filenamesplitted[filenamesplitted.length - 1].toLowerCase();

  const stream = createReadStream();
  const writeStream = fs.createWriteStream(path.join(mainFilePath, filename));
  stream.pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      resolve({
        url: path.join("/rest/resource", path.join(standardURLPath, filename)),
        type: mimetype.toString(),
      });
    });
    writeStream.on("error", reject);
  });
}

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
