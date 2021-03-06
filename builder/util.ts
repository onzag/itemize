/**
 * Some utilities used during the building process, mostly for file
 * management
 *
 * @module
 */

import path from "path";
import fs from "fs";

import CheckUpError from "./Error";
import Traceback from "./Traceback";
import "source-map-support/register";

const fsAsync = fs.promises;

/**
 * Checks whether a file exists and throws an error if it doesn't
 * and it's specified to throw an error or otherwise returns false
 * @param location the file location
 * @param traceback an optional traceback to trace
 * @returns a boolean
 */
export async function checkExists(
  location: string,
  traceback?: Traceback,
) {
  let exists = true;
  try {
    await fsAsync.access(location, fs.constants.F_OK);
  } catch (e) {
    exists = false;
  }
  if (traceback && !exists) {
    throw new CheckUpError("Required file " +
      location + " does not exist", traceback);
  }
  return exists;
}

/**
 * Checks whether a location is a directory,
 * throws an error if it doesn't exist
 *
 * @param  location  the location in question
 * @param  traceback a traceback object
 * @returns           a boolean
 */
export async function checkIsDirectory(
  location: string,
  traceback: Traceback,
) {
  checkExists(location, traceback);
  const stat = await fsAsync.lstat(location);
  return stat.isDirectory();
}

/**
 * Gets the actual file location of a related path
 * eg. /data/module can either be /data/module.json or
 * can be /data/module/index.json this function tells which
 * one it is
 *
 * @param  partialLocation  the location in question without the ending
 * @param  traceback        a traceback object, this fn throws an error if it
 *                          does not exist
 * @param extension the extension it resolves to by default it's json
 * @returns                  a string with the right location
 */
export async function getActualFileLocation(
  partialUnjoinedLocation: [string, string],
  traceback: Traceback,
  extension: string = "json",
): Promise<string> {
  const partialLocation = path.join(...partialUnjoinedLocation);
  let actualFileLocation = partialLocation;
  // a possible node modules location
  const possibleNodeModulesLocation = partialUnjoinedLocation[1].replace(
    /^([a-zA-Z1-9_-]+)\//g,
    "." + path.sep + path.join("node_modules", "$1") + path.sep,
  );
  // whether we can get into a node module
  const canBeReplacedByNodeModule = partialUnjoinedLocation[1] !== possibleNodeModulesLocation;
  // check if exists without throwing an error
  const exists = await checkExists(
    actualFileLocation,
  );
  // if it exists we must check if it's the right type
  if (exists) {
    // it must be a directory
    const isDirectory = await checkIsDirectory(
      actualFileLocation,
      traceback,
    );

    // if it's a directory as it should add the index.extension
    if (isDirectory) {
      actualFileLocation = path.join(actualFileLocation, "index." + extension);
    }
  }
  
  // the location is always expected to end up in extension
  // even if it was a valid directory
  if (!actualFileLocation.endsWith("." + extension)) {
    // otherwise add the extension ending
    actualFileLocation += "." + extension;
  }

  // check that it exists or throw an error
  // the error is only throw if it cannot be replaced by
  // a node module
  const localExists = await checkExists(
    actualFileLocation,
    !canBeReplacedByNodeModule ? traceback : null,
  );

  // local exists might be false if it can be replaced by a node module
  // as errors would have been disabled only if it could have been
  // replaced by a node module
  if (!localExists) {
    let actualNodeModulesLocation = possibleNodeModulesLocation;
    const nodeModuleLocationExists = await checkExists(
      actualNodeModulesLocation,
    );

    // if it exists we must check if it's the right type
    if (nodeModuleLocationExists) {
      // it must be a directory
      const isDirectory = await checkIsDirectory(
        actualNodeModulesLocation,
        traceback,
      );

      // if it's a directory as it should add the index.extension
      if (isDirectory) {
        actualNodeModulesLocation = path.join(actualNodeModulesLocation, "index." + extension);
      }
    }
    
    // the location is always expected to end up in extension
    // even if it was a valid directory
    if (!actualNodeModulesLocation.endsWith("." + extension)) {
      // otherwise add the extension ending
      actualNodeModulesLocation += "." + extension;
    }

    // check that it exists or throw an error
    // the error is only throw if it cannot be replaced by
    // a node module
    await checkExists(
      actualNodeModulesLocation,
      traceback,
    );

    return actualNodeModulesLocation;
  }

  return actualFileLocation;
}

/**
 * gets the identifier of a location
 * for example an /this/module/index.json is identified as
 * module and the same is true for /this/module.json
 *
 * @param  location the file location in question
 * @returns          the name
 */
export async function getActualFileIdentifier(
  location: string,
  traceback: Traceback,
) {
  // we split the location in its components
  const locationSplitted = location.replace(".json", "").split(path.sep);
  // let's get the name of the file
  let name: string = locationSplitted.pop();
  // and we need the actual real name for the item
  // by default is the name of the file
  // however index isn't an acceptable name, because
  // it means its just a container for the parent folder
  if (name === "index") {
    // so we use the name of the parent folder
    name = locationSplitted.pop();
  }

  if (!(/^[a-z_]+$/g).test(name)) {
    throw new CheckUpError(`Invalid resulting file name '${name}' only a-z and _ allowed`, traceback);
  }

  return name;
}
