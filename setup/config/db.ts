/**
 * Configuration bit for the database
 * 
 * @module
 */

import { IDBConfigRawJSONDataType } from "../../config";
import { configRequest } from "../read";

/**
 * Will ask for information about the database sensitive file
 * in order to build the db configuration json file
 * 
 * @param version the version, development or production
 * @param currentConfig the current file content
 * @param referenceConfig the reference content to use instead as base
 * @param packageJSON the package json parsed file
 */
export async function dbConfigSetup(
  version: string,
  currentConfig: IDBConfigRawJSONDataType,
  referenceConfig: IDBConfigRawJSONDataType,
  packageJSON: any,
): Promise<IDBConfigRawJSONDataType> {
  const newConfig = await configRequest(
    currentConfig || referenceConfig,
    "PostgreSQL configuration (" + version + ")",
    [
      {
        variableName: "host",
        message: "The host where postgresql is running",
        defaultValue: "localhost",
      },
      {
        variableName: "port",
        type: "integer",
        message: "The postgresql port",
        defaultValue: 5432,
        validate: (v) => !isNaN(v),
      },
      {
        variableName: "user",
        message: "The user that runs the database",
        defaultValue: packageJSON.name + "_user",
        validate: (v) => v.replace(/\s/g, "") === v,
      },
      {
        variableName: "password",
        message: "The passsword to use to connect to the database",
        defaultValue: packageJSON.name + "_password",
        hidden: true,
      },
      {
        variableName: "database",
        message: "The database name to use",
        defaultValue: packageJSON.name,
      },
      {
        variableName: "dictionaries",
        type: "strobject",
        message: "Now you need to specify the dictionaries, the dictionaries use simple ISO codes without regions; " +
        "these are used for full text search, and you should have all languages you aim to support FTS. " +
        "You may not want to modify this, this is the default for a standard postgreSQL installation",
        defaultValue: {
          "*": "simple",
          "ar": "arabic",
          "da": "danish",
          "nl": "dutch",
          "en": "english",
          "fi": "finnish",
          "fr": "french",
          "de": "german",
          "el": "greek",
          "hu": "hungarian",
          "id": "indonesian",
          "ir": "irish",
          "it": "italian",
          "li": "lithuanian",
          "ne": "nepali",
          "no": "norwegian",
          "pt": "portuguese",
          "ro": "romanian",
          "ru": "russian",
          "es": "spanish",
          "se": "swedish",
          "ta": "tamil",
          "tu": "turkish",
        },
      },
    ],
  );

  return newConfig;
}
