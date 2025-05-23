/**
 * @module
 * Custom properties reader written after the original properties reader from npm registry
 * proved to be a failure as it keeps changing like everything from NodeJS dependency hell
 */

import fs from "fs";
const fsAsync = fs.promises;
import colors from "colors";

const propertiesValidValueRegex = /^[a-zA-Z0-9-_&]+$/;

/**
 * Reads the properties file and converts it to JSON
 * @param pathToFile 
 */
export async function propertiesReader(pathToFile: string) {
  const inheritMap: {[key: string]: string} = {};

  // first read the content
  const content = await fsAsync.readFile(pathToFile, "utf-8");

  // split by lines
  const splittedLines = content.split("\n");

  // this will be our result
  const rs = {};

  // the main key that is supposed to be the language
  let currentMainKey: string = null;
  let currentMainKeyInheritsFrom: string = null;

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

      if (currentMainKey.includes("|")) {
        const splitted = currentMainKey.split("|");

        if (splitted.length > 2) {
          throw new Error("Could not parse " + pathToFile + " as the header at key for " + currentMainKey + " contains multiple inherits");
        }

        currentMainKey = splitted[0].trim();
        currentMainKeyInheritsFrom = splitted[1].trim();
        inheritMap[currentMainKey] = currentMainKeyInheritsFrom;
      }

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

      if (!propertiesValidValueRegex.test(keyBit)) {
        throw new Error(
          "Invalid value in " + key + " due to " +
          JSON.stringify(keyBit) + " containing invalid characters" +
          " at file " + pathToFile
        );
      }

      if (!isLast && keyBit.includes("&")) {
        throw new Error(
          "Invalid value in " + key + " due to " +
          JSON.stringify(keyBit) + " as variations using '&' sign are only allowed at the end bit" +
          " at file " + pathToFile
        );
      }

      const [base, variation] = keyBit.split("&");

      if (keyBit.includes("&")) {
        if (!variation) {
          throw new Error(
            "Invalid value in " + key + " due to " +
            JSON.stringify(keyBit) + " having a countable variation, yet not providing a value to count for" +
            " at file " + pathToFile
          );
        }
        if (variation !== "n") {
          if (variation.includes("-")) {
            const [variationA, variationB] = variation.split("-");
            const variationAAsInt = parseInt(variationA);
            const variationBAsInt = parseInt(variationB);
            if (
              isNaN(variationAAsInt) ||
              variationAAsInt.toString() !== variationA ||
              isNaN(variationBAsInt) ||
              variationBAsInt.toString() !== variationB
            ) {
              throw new Error(
                "Invalid value in " + key + " due to " +
                JSON.stringify(keyBit) + " not having a variation of 'n' or an integer or an integer range but instead " + JSON.stringify(variation) +
                " at file " + pathToFile
              );
            }

            if (variationBAsInt <= variationAAsInt) {
              throw new Error(
                "Invalid value in " + key + " due to " +
                JSON.stringify(keyBit) + " variation integer being smaller or equal than end variation " + JSON.stringify(variation) +
                " at file " + pathToFile
              );
            }
          } else {
            const variationAsInt = parseInt(variation);
            if (isNaN(variationAsInt) || variationAsInt.toString() !== variation) {
              throw new Error(
                "Invalid value in " + key + " due to " +
                JSON.stringify(keyBit) + " not having a variation of 'n' or an integer or am integer range but instead " + JSON.stringify(variation) +
                " at file " + pathToFile
              );
            }
          }
        }
      }

      // if it's last but it's already set throw an error
      if (isLast && !variation && storageLocation[base]) {
        throw new Error(
          "Could not set value on top of another with key " + key + " setting value " +
          JSON.stringify(base) + " overlapping " + JSON.stringify(storageLocation[base]) + (currentMainKey ? (" at " + currentMainKey + ",") : ",") +
          " at file " + pathToFile
        );
      } else if (isLast && !variation) {
        // otherwise set the value
        storageLocation[base] = value;
      } else if (isLast && variation && storageLocation[base] && storageLocation[base][variation]) {
        throw new Error(
          "Could not set value on top of another with key " + key + " setting value " +
          JSON.stringify(keyBit) + " overlapping " + JSON.stringify(storageLocation[base][variation]) + (currentMainKey ? (" at " + currentMainKey + ",") : ",") +
          " at file " + pathToFile
        );
      } else if (isLast && variation) {
        if (!storageLocation[base]) {
          storageLocation[base] = {
            // represents a variations object
            "&": "t",
          };

          if (variation !== "n") {
            throw new Error(
              "Invalid value in " + key + " due to " +
              JSON.stringify(keyBit) + " as the first variation must always be the 'n' variation followed by numeric ones" +
              " at file " + pathToFile
            );
          }
        }

        storageLocation[base][variation] = value;
      } else {
        // otherwise update the object and set the new storage location
        storageLocation[base] = storageLocation[base] || {};
        storageLocation = storageLocation[base];
      }
    });
  }

  Object.keys(inheritMap).forEach((inheritMainKey) => {
    const inheritsFromKey = inheritMap[inheritMainKey];

    if (!rs[inheritMainKey] && rs[inheritsFromKey]) {
      rs[inheritMainKey] = {};
    };

    applyMergeProperties(pathToFile, rs[inheritMainKey], rs[inheritsFromKey], inheritMainKey, inheritsFromKey);
  });

  return rs;
}

function applyMergeProperties(fileName: string, applyTo: any, applyFrom: any, keyTo: string, keyFrom: string) {
  if (!applyFrom) {
    return;
  }

  Object.keys(applyFrom).forEach((applyFromKey) => {
    // variations are not allowed to be filled
    if (applyFromKey.includes("&")) {
      return;
    }
    const newKeyFrom = keyFrom + "." + applyFromKey;
    const newKeyTo = keyTo + "." + applyFromKey;
    if (typeof applyFrom[applyFromKey] === "object") {
      if (!applyTo[applyFromKey]) {
        applyTo[applyFromKey] = {};
      }

      applyMergeProperties(fileName, applyTo[applyFromKey], applyFrom[applyFromKey], newKeyTo, newKeyFrom);
    } else if (typeof applyTo[applyFromKey] === "undefined") {
      console.warn(colors.yellow(fileName + ": Key at " + newKeyTo + " was filled with information from " + newKeyFrom));
      applyTo[applyFromKey] = applyFrom[applyFromKey];
    }
  });
}