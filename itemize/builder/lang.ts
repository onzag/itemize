import Traceback from "./Traceback";
import { ILocaleLangDataType } from ".";
import { checkExists } from "./util";
import { LOCALE_I18N, ROOT_REQUIRED_LOCALE_I18N } from "../constants";
import PropertiesReader from "properties-reader";
import CheckUpError from "./Error";

function getAllKeyNames(obj: any, prefix: string) {
  let result: string[] = [];
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (typeof value === "string") {
      result.push(prefix + key);
    } else {
      result = result.concat(getAllKeyNames(value, prefix + key + "."));
    }
  });
  return result;
}

/**
 * Build the core language data that holds information
 * about the language itself and other localizables
 * @param supportedLanguages the array of supported languages
 * @param actualRootLocation the root location that sets these languages
 * @param traceback the traceback in the location
 */
export async function buildLang(
  supportedLanguages: string[],
  actualRootLocation: string,
  i18nBaseFileLocation: string,
  traceback: Traceback,
): Promise<ILocaleLangDataType> {
  const languageFileLocation = actualRootLocation
    .replace(".json", ".properties");
  const baseFileLocation = i18nBaseFileLocation;

  const internalTracebackBaseFile = traceback.newTraceToLocation(i18nBaseFileLocation);
  const internalTracebackRootFile = traceback.newTraceToLocation(languageFileLocation);

  // this is the root of the index.properties that is used to extend
  // the base
  await checkExists(
    languageFileLocation,
    traceback,
  );

  await checkExists(
    i18nBaseFileLocation,
    traceback,
  );

  const propertiesBase = PropertiesReader(baseFileLocation).path();
  const propertiesRoot = PropertiesReader(languageFileLocation).path();
  const result: ILocaleLangDataType = {
    locales: {},
  };

  const extraGatheredProperties: {
    [locale: string]: string[];
  } = {};

  // and start to loop
  supportedLanguages.forEach((locale) => {

    if (!propertiesBase[locale]) {
      throw new CheckUpError(
        "File does not include language data for '" + locale + "'",
        internalTracebackBaseFile,
      );
    }

    result.locales[locale] = {};

    const propertiesToRequest: Array<{base: boolean, property: string}> =
      LOCALE_I18N.map((property) => ({base: true, property}))
      .concat(ROOT_REQUIRED_LOCALE_I18N.map((property) => ({base: false, property})));

    // we gather all the properties that were added in the root file, just to ensure
    // we have matching property values
    extraGatheredProperties[locale] = getAllKeyNames(propertiesRoot[locale], "");

    propertiesToRequest.forEach((propertyToRequestObject) => {
      const property = propertyToRequestObject.property;
      const propertySplitted = property.split(".");
      const internalTraceback = propertyToRequestObject.base ? internalTracebackBaseFile : internalTracebackRootFile;
      let propertyResult = propertiesBase[locale];
      if (!propertyToRequestObject.base) {
        propertyResult = propertiesRoot[locale];
      }
      if (!propertyResult) {
        throw new CheckUpError(
          "File does not include data for locale '" + locale + "'",
          internalTraceback,
        );
      }

      let propKey: string;
      // try to find it
      for (propKey of propertySplitted) {
        propertyResult = propertyResult[propKey];
        if (!propertyResult) {
          break;
        }
      }
      if (!propertyResult) {
        throw new CheckUpError(
          "File does not include data for '" + locale + "' in '" + property + "'",
          internalTraceback,
        );
      } else if (typeof propertyResult !== "string") {
        throw new CheckUpError(
          "File has an invalid type for '" + locale + "' in '" + property + "'",
          internalTraceback,
        );
      }

      propertyResult = propertyResult.trim();

      let whereToSet: any = result.locales[locale];
      // by looping on the splitted value
      propertySplitted.forEach((keyValue, index) => {
        // on the last one we set it as the value
        if (index === propertySplitted.length - 1) {
          whereToSet[keyValue] = propertyResult;
          return;
        }

        // otherwise we try to get deeper
        whereToSet[keyValue] = whereToSet[keyValue] || {};
        whereToSet = whereToSet[keyValue];
      });
    });

    result.locales[locale] = {...result.locales[locale], ...propertiesRoot[locale]};
  });

  Object.keys(extraGatheredProperties).forEach((locale) => {
    const propertiesInLocale = extraGatheredProperties[locale];
    Object.keys(extraGatheredProperties).forEach((locale2) => {
      const propertiesInSecondLocale = extraGatheredProperties[locale2];

      propertiesInLocale.forEach((property) => {
        if (!propertiesInSecondLocale.find((p) => p === property)) {
          throw new CheckUpError(
            "File mismatch in locale '" + locale + "' and locale '" + locale2 +
            "' where a locale key '" + property + "' exists in the first but not in the later",
            internalTracebackRootFile,
          );
        }
      });
    });
  });

  return result;
}

export function clearLang(
  rawData: ILocaleLangDataType,
) {
  const nRawData: ILocaleLangDataType = {locales: {}};
  Object.keys(rawData.locales).forEach((locale) => {
    nRawData.locales[locale] = {name: rawData.locales[locale].name};
  });

  return nRawData;
}
