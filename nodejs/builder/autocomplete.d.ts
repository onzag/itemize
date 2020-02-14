/**
 * This file collect the functions that build the autocomplete from the schema definitions
 * that are unprocessed in the data file
 *
 * @packageDocumentation
 */
import Traceback from "./Traceback";
import { IAutocompleteRawJSONDataType } from "../base/Autocomplete";
import { IBuilderBasicConfigType } from "./config";
/**
 * Async function to build a single autocomplete file based on an autocomplete source
 * note that the autocompletes json file that is built is a collection of the output
 * of this function
 * @param rawDataConfig the raw config
 * @param source the source path
 * @param traceback the traceback object
 * @returns a single autocomplete object
 */
export declare function buildAutocomplete(rawDataConfig: IBuilderBasicConfigType, source: string, traceback: Traceback): Promise<IAutocompleteRawJSONDataType>;
