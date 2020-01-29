/**
 * This file collect the functions that build the autocomplete from the schema definitions
 * that are unprocessed in the data file
 *
 * @packageDocumentation
 */

import { checkExists } from "./util";
import fs from "fs";
import Traceback from "./Traceback";
import { IAutocompleteRawJSONDataType, IFileAutocompleteRawJSONDataType } from "../base/Autocomplete";
import CheckUpError from "./Error";
import { ajvCheck, checkAutocompleteSchemaValidate } from "./schemaChecks";
import path from "path";
import { checkAutocompleteFilterAndValues } from "./checkers";
const jsonMap = require("json-source-map");
const fsAsync = fs.promises;

/**
 * Async function to build a single autocomplete file based on an autocomplete source
 * note that the autocompletes json file that is built is a collection of the output
 * of this function
 * @param source the source path
 * @param supportedLanguages the supported languages that are expected for autocompletes with i18n support
 * @param traceback the traceback object
 * @returns a single autocomplete object
 */
export async function buildAutocomplete(source: string, supportedLanguages: string[], traceback: Traceback) {
  // first we check that the source exists at all
  await checkExists(source, traceback);

  // now we get the file content
  const fileContent = await fsAsync.readFile(source, "utf8");

  // and build a traceback to this source
  const internalTraceback = traceback.newTraceToLocation(source);

  // get the file data from the json map function
  let fileData: {
    data: IFileAutocompleteRawJSONDataType;
    pointers: any;
  };
  try {
    fileData = jsonMap.parse(fileContent);
  } catch (err) {
    throw new CheckUpError(
      err.message,
      internalTraceback,
    );
  }

  // and setup the pointers
  internalTraceback.setupPointers(fileData.pointers, fileContent);

  // now we run the check of the schema using ajv check
  ajvCheck(
    checkAutocompleteSchemaValidate,
    fileData.data,
    internalTraceback,
  );

  // and this is the resulting autocomplete
  const resultAutocomplete: IAutocompleteRawJSONDataType = {
    type: "autocomplete",
    // we add the name
    name: path.basename(source).split(".")[0],
    filters: fileData.data.filters,
    values: fileData.data.values,
  };

  // if we have values in the result
  if (resultAutocomplete.values) {
    // we run the checker
    checkAutocompleteFilterAndValues(
      resultAutocomplete.values,
      supportedLanguages,
      internalTraceback.newTraceToBit("values"),
    );
  }

  // if we have filters on it
  if (resultAutocomplete.filters) {
    // do the same thing
    checkAutocompleteFilterAndValues(
      resultAutocomplete.filters,
      supportedLanguages,
      internalTraceback.newTraceToBit("filters"),
    );
  }

  return resultAutocomplete;
}
