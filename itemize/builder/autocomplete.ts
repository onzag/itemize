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

export async function buildAutocomplete(source: string, supportedLanguages: string[], traceback: Traceback) {
  await checkExists(source, traceback);

  const fileContent = await fsAsync.readFile(source, "utf8");

  const internalTraceback = traceback.newTraceToLocation(source);

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

  internalTraceback.setupPointers(fileData.pointers, fileContent);

  ajvCheck(
    checkAutocompleteSchemaValidate,
    fileData.data,
    internalTraceback,
  );

  const resultAutocomplete: IAutocompleteRawJSONDataType = {
    type: "autocomplete",
    name: path.basename(source).split(".")[0],
    filters: fileData.data.filters,
    values: fileData.data.values,
  };

  if (resultAutocomplete.values) {
    checkAutocompleteFilterAndValues(
      resultAutocomplete.values,
      supportedLanguages,
      internalTraceback.newTraceToBit("values"),
    );
  }

  if (resultAutocomplete.filters) {
    checkAutocompleteFilterAndValues(
      resultAutocomplete.filters,
      supportedLanguages,
      internalTraceback.newTraceToBit("filters"),
    );
  }

  return resultAutocomplete;
}
