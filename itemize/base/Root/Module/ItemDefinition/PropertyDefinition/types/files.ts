/**
 * Contains the files type description
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { getStandardSQLFnFor, stardardSQLInWithJSONStringifyFn, standardSQLOutWithJSONParseFn } from "../sql";
import { PropertyInvalidReason, PropertyDefinitionIncludedFileInfoType } from "../../PropertyDefinition";
import { MAX_FILE_BATCH_COUNT, CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N } from "../../../../../../constants";

// tslint:disable-next-line: no-empty-interface
export interface IPropertyDefinitionSupportedSingleFilesType extends PropertyDefinitionIncludedFileInfoType {
}

export type PropertyDefinitionSupportedFilesType = IPropertyDefinitionSupportedSingleFilesType[];
const typeValue: IPropertyDefinitionSupportedType = {
  gql: "PROPERTY_TYPE__Files",
  gqlFields: {},
  gqlAddFileToFields: true,
  gqlList: true,

  searchable: false,
  specialProperties: [
    {
      name: "accept",
      type: "string",
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
    throw new Error("Attempted to search within files");
  },
  sqlLocalSearch: () => {
    throw new Error("Attempted to search within files locally");
  },
  sqlEqual: () => {
    throw new Error("Attempted to equal within files");
  },
  sqlLocalEqual: () => {
    throw new Error("Attempted to local equal within files");
  },

  allowsMinMaxLengthDefined: true,
  validate: (l: PropertyDefinitionSupportedFilesType) => {
    if (l.length > MAX_FILE_BATCH_COUNT) {
      return PropertyInvalidReason.TOO_LARGE;
    }

    return null;
  },
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    tooLargeErrorInclude: true,
  },
};
export default typeValue;
