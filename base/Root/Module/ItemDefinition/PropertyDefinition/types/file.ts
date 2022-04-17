/**
 * Contains the single file type description
 * 
 * @module
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { getStandardSQLFnFor, stardardSQLInWithJSONStringifyFn, standardSQLOutWithJSONParseFn, standardSQLSelect, standardSQLElasticInFn } from "../sql";
import { CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N } from "../../../../../../constants";
import { IGQLFile } from "../../../../../../gql-querier";
import { standardLocalEqual } from "../local-sql";

export type PropertyDefinitionSupportedFileType = IGQLFile;

/**
 * The type value represents the behaviour of files in the app
 */
const typeValue: IPropertyDefinitionSupportedType<PropertyDefinitionSupportedFileType> = {
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
  sql: getStandardSQLFnFor && getStandardSQLFnFor("TEXT"),
  sqlSelect: standardSQLSelect,
  sqlIn: stardardSQLInWithJSONStringifyFn,
  sqlOut: standardSQLOutWithJSONParseFn,
  sqlElasticIn: standardSQLElasticInFn,
  sqlSearch: () => {
    throw new Error("Attempted to search within a file");
  },
  elasticSearch: () => {
    throw new Error("Attempted to elastic search within a file");
  },
  sqlStrSearch: null,
  localStrSearch: null,
  sqlOrderBy: null,
  localOrderBy: null,
  localSearch: () => {
    throw new Error("Attempted to search within a file locally");
  },
  sqlEqual: () => {
    throw new Error("Attempted to equal within a file");
  },
  sqlSSCacheEqual: () => {
    throw new Error("Attempted to local equal within a file");
  },
  sqlBtreeIndexable: () => {
    throw new Error("Attempted to btree index a file, this might mean a file value is in request limiters, don't do that");
  },
  sqlMantenience: null,
  localEqual: standardLocalEqual,
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
  },
};
export default typeValue;
