/**
 * Contains the single file type description
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { getStandardSQLFnFor, stardardSQLInWithJSONStringifyFn, standardSQLOutWithJSONParseFn } from "../sql";
import { CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N } from "../../../../../../constants";
import { IGQLFile } from "../../../../../../gql-querier";

export type PropertyDefinitionSupportedFileType = IGQLFile;

/**
 * The type value represents the behaviour of files in the app
 */
const typeValue: IPropertyDefinitionSupportedType = {
  gql: "PROPERTY_TYPE__File",
  gqlFields: {},
  gqlAddFileToFields: true,
  gqlList: false,

  searchable: false,
  specialProperties: [
    {
      name: "accept",
      type: "string",
    },
    {
      name: "imageUploader",
      type: "boolean",
    },
    {
      name: "dimensions",
      type: "string",
    },
    {
      name: "smallDimension",
      type: "string",
    },
    {
      name: "mediumDimension",
      type: "string",
    },
    {
      name: "largeDimension",
      type: "string",
    },
  ],
  sql: getStandardSQLFnFor && getStandardSQLFnFor("text"),
  sqlIn: stardardSQLInWithJSONStringifyFn,
  sqlOut: standardSQLOutWithJSONParseFn,
  sqlSearch: () => {
    throw new Error("Attempted to search within a file");
  },
  localSearch: () => {
    throw new Error("Attempted to search within a file locally");
  },
  sqlEqual: () => {
    throw new Error("Attempted to equal within a file");
  },
  sqlLocalEqual: () => {
    throw new Error("Attempted to local equal within a file");
  },
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    tooLargeErrorInclude: true,
  },
};
export default typeValue;
