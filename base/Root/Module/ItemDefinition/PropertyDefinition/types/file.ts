/**
 * Contains the single file type description
 * 
 * @module
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { getStandardSQLFnFor, stardardSQLInWithJSONStringifyFn, standardSQLOutWithJSONParseFn, standardSQLSelect, standardSQLElasticInFn, getStandardElasticFor } from "../sql";
import { CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N } from "../../../../../../constants";
import { IGQLFile } from "../../../../../../gql-querier";
import { standardLocalEqual } from "../local-sql";

export type PropertyDefinitionSupportedFileType = IGQLFile;

const fakefile: PropertyDefinitionSupportedFileType = {
  id: null,
  metadata: null,
  name: null,
  size: 0,
  type: "",
  url: "",
}

/**
 * The type value represents the behaviour of files in the app
 */
const typeValue: IPropertyDefinitionSupportedType<PropertyDefinitionSupportedFileType> = {
  gql: "PROPERTY_TYPE__File",
  gqlFields: {},
  gqlAddFileToFields: true,
  gqlList: false,

  searchable: false,
  configOptions: [
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
  elastic: getStandardElasticFor && getStandardElasticFor("keyword", "null", null, true),
  sqlSelect: standardSQLSelect,
  sqlIn: stardardSQLInWithJSONStringifyFn,
  sqlOut: standardSQLOutWithJSONParseFn && standardSQLOutWithJSONParseFn.bind(null, fakefile),
  sqlElasticIn: standardSQLElasticInFn,
  sqlSearch: () => {
    throw new Error("Attempted to search within a file");
  },
  elasticSearch: () => {
    throw new Error("Attempted to elastic search within a file");
  },
  sqlStrSearch: null,
  elasticStrSearch: null,
  localStrSearch: null,
  sqlOrderBy: null,
  elasticSort: null,
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
