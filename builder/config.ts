/**
 * Doesn't do much other than save and store the config file for
 * dist purposes
 *
 * @packageDocumentation
 */

import colors from "colors/safe";

import fs from "fs";
import path from "path";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../config";
import Traceback from "./Traceback";
import CheckUpError from "./Error";
import { ajvCheck, checkConfig, checkSensitiveConfig, checkDBConfig, checkRedisConfig } from "./schema-checks";
import { countries, currencies } from "../imported-resources";
import jsonMap from "json-source-map";
const fsAsync = fs.promises;

// TODO this must be totally redone...
// it is wrong because of new configuration

/**
 * Stores the config file in the dist
 * directory
 * @param rawConfig the config as parsed
 */
export async function buildConfig(rawConfig: IConfigRawJSONDataType) {
  const fileName = path.join("dist", "config.json");
  console.log("emiting " + colors.green(fileName));

  await fsAsync.writeFile(fileName, JSON.stringify(rawConfig));
}

/**
 * Extracts the configuration from the files where it should be located
 * and does data checks on the json files
 */
export async function extractConfig(): Promise<IConfigRawJSONDataType> {
  const configTraceback = new Traceback("BUILDER");

  // index.json CHECKING /////////////////////////

  // first we read the base config that contains no sensitive data,
  // by getting the path
  const rawDataConfigLocation = path.join("config", "index.json");
  // extract with json
  let rawDataConfigBaseFileData: {
    data: IConfigRawJSONDataType,
    pointers: any,
  };
  let rawDataConfigBaseFileContent: string;
  try {
    // the content and the file data
    rawDataConfigBaseFileContent = await fsAsync.readFile(rawDataConfigLocation, "utf8");
    rawDataConfigBaseFileData = jsonMap.parse(rawDataConfigBaseFileContent);
  } catch (err) {
    throw new CheckUpError(
      err.message,
      configTraceback,
    );
  }

  // now we can set the result
  const rawDataConfigBase = rawDataConfigBaseFileData.data;

  // build the traceback for this specific file and check it with the schema checker
  const rawDataConfigTraceback = configTraceback.newTraceToLocation(rawDataConfigLocation);
  rawDataConfigTraceback.setupPointers(rawDataConfigBaseFileData.pointers, rawDataConfigBaseFileContent);
  ajvCheck(
    checkConfig,
    rawDataConfigBase,
    rawDataConfigTraceback,
  );

  // let's check the fallback values, first if the country is a valid country
  if (!countries[rawDataConfigBase.fallbackCountryCode]) {
    throw new CheckUpError(
      "Invalid fallback country code",
      rawDataConfigTraceback.newTraceToBit("fallbackCountryCode"),
    );
  }

  // now if the currency is a valid currency
  if (!currencies[rawDataConfigBase.fallbackCurrency]) {
    throw new CheckUpError(
      "Invalid fallback currency code",
      rawDataConfigTraceback.newTraceToBit("fallbackCurrency"),
    );
  }

  // and if the language is a valid language from the supported list in the config
  // itself
  if (!rawDataConfigBase.supportedLanguages.includes(rawDataConfigBase.fallbackLanguage)) {
    throw new CheckUpError(
      "Invalid fallback language which is not in the list of supported",
      rawDataConfigTraceback.newTraceToBit("fallbackLanguage"),
    );
  }

  // index.sensitive.json CHECKING ////////////////

  // check the sensitive data
  const rawDataSensitiveConfigLocation = path.join("config", "index.sensitive.json");
  // extract with json
  let rawDataSensitiveConfigBaseFileData: {
    data: ISensitiveConfigRawJSONDataType,
    pointers: any,
  };
  let rawDataSensitiveConfigBaseFileContent: string;
  try {
    // the content and the file data
    rawDataSensitiveConfigBaseFileContent = await fsAsync.readFile(rawDataSensitiveConfigLocation, "utf8");
    rawDataSensitiveConfigBaseFileData = jsonMap.parse(rawDataSensitiveConfigBaseFileContent);
  } catch (err) {
    throw new CheckUpError(
      err.message,
      configTraceback,
    );
  }

  // and the sensitive config
  const sensitiveConfigExtra = rawDataSensitiveConfigBaseFileData.data;

  // build the traceback for this specific file and check it with the schema checker
  const rawDataSensitiveConfigTraceback = configTraceback.newTraceToLocation(rawDataSensitiveConfigLocation);
  rawDataSensitiveConfigTraceback.setupPointers(
    rawDataSensitiveConfigBaseFileData.pointers,
    rawDataSensitiveConfigBaseFileContent,
  );
  ajvCheck(
    checkSensitiveConfig,
    sensitiveConfigExtra,
    rawDataSensitiveConfigTraceback,
  );

  // and we merge them together
  const rawDataConfig: IConfigRawJSONDataType = {
    ...rawDataConfigBase,
    ...sensitiveConfigExtra,
  };

  // db.sensitive.json CHECKING ///////////////////

  // check the database
  const rawDBConfigLocation = path.join("config", "db.sensitive.json");
  // extract with json
  let rawDBConfigFileData: {
    data: IConfigRawJSONDataType,
    pointers: any,
  };
  let rawDBConfigFileContent: string;
  try {
    // the content and the file data
    rawDBConfigFileContent = await fsAsync.readFile(rawDBConfigLocation, "utf8");
    rawDBConfigFileData = jsonMap.parse(rawDBConfigFileContent);
  } catch (err) {
    throw new CheckUpError(
      err.message,
      configTraceback,
    );
  }

  // build the traceback for this specific file and check it with the schema checker
  const rawDBConfigTraceback = configTraceback.newTraceToLocation(rawDBConfigLocation);
  rawDBConfigTraceback.setupPointers(
    rawDBConfigFileData.pointers,
    rawDBConfigFileContent,
  );
  ajvCheck(
    checkDBConfig,
    rawDBConfigFileData.data,
    rawDBConfigTraceback,
  );

  // redis.sensitive.json CHECKING ///////////////////////

  // check the database
  const rawRedisConfigLocation = path.join("config", "redis.sensitive.json");
  // extract with json
  let rawRedisConfigFileData: {
    data: IConfigRawJSONDataType,
    pointers: any,
  };
  let rawRedisConfigFileContent: string;
  try {
    // the content and the file data
    rawRedisConfigFileContent = await fsAsync.readFile(rawRedisConfigLocation, "utf8");
    rawRedisConfigFileData = jsonMap.parse(rawRedisConfigFileContent);
  } catch (err) {
    throw new CheckUpError(
      err.message,
      configTraceback,
    );
  }

  // build the traceback for this specific file and check it with the schema checker
  const rawRedisConfigTraceback = configTraceback.newTraceToLocation(rawRedisConfigLocation);
  rawRedisConfigTraceback.setupPointers(
    rawRedisConfigFileData.pointers,
    rawRedisConfigFileContent,
  );
  ajvCheck(
    checkRedisConfig,
    rawRedisConfigFileData.data,
    rawRedisConfigTraceback,
  );

  return rawDataConfig;
}
