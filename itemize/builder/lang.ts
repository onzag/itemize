import Traceback from "./Traceback";
import { ILocaleLangDataType } from ".";
import { checkExists } from "./util";
import { LOCALE_I18N } from "../constants";
import PropertiesReader from "properties-reader";
import CheckUpError from "./Error";

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

  await checkExists(
    languageFileLocation,
    traceback,
  );

  await checkExists(
    i18nBaseFileLocation,
    traceback,
  );

  const propertiesBase = PropertiesReader(baseFileLocation).path();
  const propertiesExtra = PropertiesReader(languageFileLocation).path();
  const result: ILocaleLangDataType = {
    locales: {},
  };

  // and start to loop
  supportedLanguages.forEach((locale) => {

    if (!propertiesBase[locale]) {
      throw new CheckUpError(
        "File does not include language data for '" + locale + "'",
        internalTracebackBaseFile,
      );
    }

    result.locales[locale] = {};

    LOCALE_I18N.forEach((property) => {
      const propertySplitted = property.split(".");
      let propertyResult = propertiesBase[locale];
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
          internalTracebackBaseFile,
        );
      } else if (typeof propertyResult !== "string") {
        throw new CheckUpError(
          "File has an invalid type for '" + locale + "' in '" + property + "'",
          internalTracebackBaseFile,
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

    if (propertiesExtra[locale]) {
      result.locales[locale] = {...result.locales[locale], ...propertiesExtra[locale]};
    }
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
