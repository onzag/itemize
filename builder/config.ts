/**
 * Doesn't do much other than save and store the config file for
 * dist purposes
 *
 * @packageDocumentation
 */

import fs from "fs";
import path from "path";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType, IRedisConfigRawJSONDataType, IDBConfigRawJSONDataType } from "../config";
import Traceback from "./Traceback";
import CheckUpError from "./Error";
import { ajvCheck, checkConfig, checkSensitiveConfig, checkDBConfig, checkRedisConfig } from "./schema-checks";
import { countries, currencies } from "../imported-resources";
import jsonMap from "json-source-map";
import Ajv from "ajv";
const fsAsync = fs.promises;

export interface IBuilderBasicConfigType {
  standard: IConfigRawJSONDataType,
  sensitive: ISensitiveConfigRawJSONDataType,
  redis: IRedisConfigRawJSONDataType,
  db: IDBConfigRawJSONDataType,
  buildnumber: number,
};

export async function extractOneConfig<T>(
  validator: Ajv.ValidateFunction,
  mainName: string,
  version: string,
  isSensitive: boolean,
  cb?: (data: T, tb: Traceback) => void,
): Promise<T> {
  const configTraceback = new Traceback("BUILDER");
  const rawDataConfigLocation = path.join(
    "config",
    `${mainName}${version ? "." + version : ""}${isSensitive ? ".sensitive" : ""}.json`,
  );
  let rawDataConfigBaseFileData: {
    data: T,
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
    validator,
    rawDataConfigBase,
    rawDataConfigTraceback,
  );

  cb && cb(rawDataConfigBase, rawDataConfigTraceback);

  return rawDataConfigBase;
}

/**
 * Extracts the configuration from the files where it should be located
 * and does data checks on the json files
 */
export async function extractConfigAndBuildNumber(): Promise<IBuilderBasicConfigType> {
  // index.json CHECKING /////////////////////////
  let standardConfigCheckerCallback = (data: IConfigRawJSONDataType, traceback: Traceback) => {
    // let's check the fallback values, first if the country is a valid country
    if (!countries[data.fallbackCountryCode]) {
      throw new CheckUpError(
        "Invalid fallback country code",
        traceback.newTraceToBit("fallbackCountryCode"),
      );
    }

    // now if the currency is a valid currency
    if (!currencies[data.fallbackCurrency]) {
      throw new CheckUpError(
        "Invalid fallback currency code",
        traceback.newTraceToBit("fallbackCurrency"),
      );
    }

    // and if the language is a valid language from the supported list in the config
    // itself
    if (!data.supportedLanguages.includes(data.fallbackLanguage)) {
      throw new CheckUpError(
        "Invalid fallback language which is not in the list of supported",
        traceback.newTraceToBit("fallbackLanguage"),
      );
    }
  };
  const standardConfig = await extractOneConfig<IConfigRawJSONDataType>(
    checkConfig, "index", null, false, standardConfigCheckerCallback,
  );

  const sensitiveConfig = await extractOneConfig<ISensitiveConfigRawJSONDataType>(
    checkSensitiveConfig, "index", null, true,
  );
  await extractOneConfig(
    checkSensitiveConfig, "index", "production", true,
  );

  const redisConfig = await extractOneConfig<IRedisConfigRawJSONDataType>(
    checkRedisConfig, "redis", null, true,
  );
  await extractOneConfig(
    checkRedisConfig, "redis", "production", true,
  );

  const dbConfig = await extractOneConfig<IDBConfigRawJSONDataType>(
    checkDBConfig, "db", null, true,
  );
  await extractOneConfig(
    checkDBConfig, "db", "production", true,
  );

  return {
    standard: standardConfig,
    sensitive: sensitiveConfig,
    redis: redisConfig,
    db: dbConfig,
    buildnumber: (new Date()).getTime(),
  };
}
