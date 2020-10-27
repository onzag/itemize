/**
 * Contains the files type description
 * 
 * @packageDocumentation
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { getStandardSQLFnFor, stardardSQLInWithJSONStringifyFn, standardSQLOutWithJSONParseFn } from "../sql";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import { MAX_FILES_PER_PROPERTY, CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N } from "../../../../../../constants";
import { IGQLFile } from "../../../../../../gql-querier";
import { standardLocalEqual } from "../local-sql";

// tslint:disable-next-line: no-empty-interface
export interface IPropertyDefinitionSupportedSingleFilesType extends IGQLFile {
}

/**
 * The type of a files type is an array of single files that itself are of type IGQLFile as they use
 * the gqlFields and the gqlAddFileToFields which adds file functionality
 */
export type PropertyDefinitionSupportedFilesType = IPropertyDefinitionSupportedSingleFilesType[];

/**
 * The type value represents the behaviour of files in the app
 */
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
    throw new Error("Attempted to search within files");
  },
  sqlStrSearch: null,
  localStrSearch: null,
  sqlOrderBy: null,
  localOrderBy: null,
  localSearch: () => {
    throw new Error("Attempted to search within files locally");
  },
  sqlEqual: () => {
    throw new Error("Attempted to equal within files");
  },
  sqlSSCacheEqual: () => {
    throw new Error("Attempted to local equal within files");
  },
  sqlBtreeIndexable: () => {
    throw new Error("Attempted to btree index files, this might mean a files value is in request limiters, don't do that");
  },
  sqlMantenience: null,
  localEqual: standardLocalEqual,

  allowsMinMaxLengthDefined: true,
  validate: (l: PropertyDefinitionSupportedFilesType) => {
    if (l.length > MAX_FILES_PER_PROPERTY) {
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
