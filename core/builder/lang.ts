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
  supportedLanguages.forEach((locale, index) => {

    if (!propertiesBase[locale]) {
      throw new CheckUpError(
        "File does not include language data for '" + locale + "'",
        internalTracebackBaseFile,
      );
    }

    result.locales[locale] = {};

    LOCALE_I18N.forEach((property) => {
      if (!propertiesBase[locale][property]) {
        throw new CheckUpError(
          "File does not include data for '" + locale + "' in '" + property + "'",
          internalTracebackBaseFile,
        );
      }

      result.locales[locale][property] = propertiesBase[locale][property];
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
