/**
 * This file contains the language utilities that build the primary language
 * information for the main language file that belongs to the root as well
 * as for the lang.json file
 *
 * @packageDocumentation
 */
import Traceback from "./Traceback";
import { Ii18NType, ILangLocalesType } from "../base/Root";
import { IBuilderBasicConfigType } from "./config";
/**
 * Build the core language data that holds information
 * about the language itself and other localizables
 * @param supportedLanguages the array of supported languages
 * @param actualRootLocation the root location that sets these languages
 * @param traceback the traceback in the location
 * @retuns a promise for locale language data
 */
export declare function buildLang(rawDataConfig: IBuilderBasicConfigType, actualRootLocation: string, i18nBaseFileLocation: string, traceback: Traceback): Promise<Ii18NType>;
/**
 * Clears language data in such a way that it leaves only the name
 * and the supported locales
 * @param rawData the raw locale language data
 * @param rawDataConfig the raw data config
 * @returns the new locale language data with only names
 */
export declare function clearLang(rawData: Ii18NType, rawDataConfig: IBuilderBasicConfigType): ILangLocalesType;
