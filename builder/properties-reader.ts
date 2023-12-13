/**
 * @module
 * Custom properties reader written after the original properties reader from npm registry
 * proved to be a failure as it keeps changing like everything from NodeJS dependency hell
 */

import fs from "fs";
const fsAsync = fs.promises;

/**
 * Reads the properties file and converts it to JSON
 * @param pathToFile 
 */
export async function propertiesReader(pathToFile: string) {
  // first read the content
  const content = await fsAsync.readFile(pathToFile, "utf-8");

  // split by lines
  const splittedLines = content.split("\n");

  // this will be our result
  const rs = {};

  // the main key that is supposed to be the language
  let currentMainKey: string = null;

  // now we loop over the lines
  for (let line of splittedLines) {
    let trimmed = line.trim();

    // ignore
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    // remove potential comments at the end
    trimmed = trimmed.split("#")[0].trim();

    // now we find a header
    if (trimmed.startsWith("[")) {
      // cant parse
      if (!trimmed.endsWith("]")) {
        throw new Error("Could not parse " + pathToFile + " as the header at init " + trimmed + " could not be understood");
      }

      // set the main key
      currentMainKey = trimmed.substring(1, trimmed.length - 1).trim();
      continue;
    }

    // we split by the equal sign
    const splitted = trimmed.split("=");
    // shhift and get the key
    const key = splitted.shift().trim();
    // the value is what's left
    const value = splitted.join("=").trim();

    // no value no good
    if (!value) {
      throw new Error("Could not process key " + JSON.stringify(key) + (currentMainKey ? (" at " + currentMainKey + " ") : "") +
        "because it is missing its value, at file " + pathToFile);
    }

    // now we can split this key
    const keySplitted = key.split(".");

    // and set our storage location
    let storageLocation = rs;
    if (currentMainKey) {
      // if we have a main key we set by it
      if (!rs[currentMainKey]) {
        rs[currentMainKey] = {};
      }
      storageLocation = rs[currentMainKey];
    }
    // now we can loop
    keySplitted.forEach((keyBit, index) => {
      // if it's last we must set the value
      const isLast = index === (keySplitted.length - 1);

      // if it's last but it's already set throw an error
      if (isLast && storageLocation[keyBit]) {
        throw new Error(
          "Could not set value on top of another with key " + key + " setting value " +
          JSON.stringify(value) + " overlapping " + JSON.stringify(storageLocation[keyBit]) + (currentMainKey ? (" at " + currentMainKey + ",") : ",") +
          " at file " + pathToFile
        );
      } else if (isLast) {
        // otherwise set the value
        storageLocation[keyBit] = value;
      } else {
        // otherwise update the object and set the new storage location
        storageLocation[keyBit] = storageLocation[keyBit] || {};
        storageLocation = storageLocation[keyBit];
      }
    });
  }

  return rs;
}