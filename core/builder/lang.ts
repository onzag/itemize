import Traceback from "./Traceback";
import { ILocaleLangDataType } from ".";
import { checkExists } from "./util";
import { LOCALE_I18N } from "../constants";
import * as PropertiesReader from "properties-reader";
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
  traceback: Traceback,
): Promise<ILocaleLangDataType> {
  const languageFileLocation = actualRootLocation
    .replace(".json", ".properties");

  await checkExists(
    languageFileLocation,
    traceback,
  );

  const properties = PropertiesReader(languageFileLocation).path();
  const result: ILocaleLangDataType = {
    locales: {},
  };

  // and start to loop
  supportedLanguages.forEach((locale, index) => {
    const internalTraceback = traceback.newTraceToBit(index);

    if (!properties[locale]) {
      throw new CheckUpError(
        "File does not include language data for '" + locale + "'",
        internalTraceback,
      );
    }

    result.locales[locale] = {};

    LOCALE_I18N.forEach((property) => {
      if (!properties[locale][property]) {
        throw new CheckUpError(
          "File does not include data for '" + locale + "' in '" + property + "'",
          internalTraceback,
        );
      }

      result.locales[locale][property] = properties[locale][property];
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
