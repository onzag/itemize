/**
 * Contains the files type description
 * 
 * @module
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { getStandardSQLFnFor, stardardSQLInWithJSONStringifyFn, standardSQLOutWithJSONParseFn, standardSQLSelect, standardSQLElasticInFn, getStandardElasticFor } from "../sql";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import { MAX_FILES_PER_PROPERTY, CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N } from "../../../../../../constants";
import { IRQFile } from "../../../../../../rq-querier";
import { standardLocalEqual } from "../local-sql";

// tslint:disable-next-line: no-empty-interface
export interface IPropertyDefinitionSupportedSingleFilesType extends IRQFile {
}

/**
 * The type of a files type is an array of single files that itself are of type IRQFile as they use
 * the rqFields and the rqAddFileToFields which adds file functionality
 */
export type PropertyDefinitionSupportedFilesType = IPropertyDefinitionSupportedSingleFilesType[];

/**
 * The type value represents the behaviour of files in the app
 */
const typeValue: IPropertyDefinitionSupportedType<PropertyDefinitionSupportedFilesType> = {
  rq: {
    type: "object",
    array: true,
    stdFields: {
      id: {
        type: "string",
        required: true,
      },
      metadata: {
        type: "string",
      },
      name: {
        type: "string",
        required: true,
      },
      size: {
        type: "integer-positive",
        required: true,
      },
      type: {
        type: "string",
        required: true,
      },
      url: {
        type: "string",
        required: true,
      },
      cluster: {
        type: "string",
      },
    },
    ownFields: {
      src: {
        type: "binary",
      },
    }
  },
  rqRepresentsFile: true,

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
  sqlOut: standardSQLOutWithJSONParseFn && standardSQLOutWithJSONParseFn.bind(null, []),
  sqlElasticIn: standardSQLElasticInFn,
  sqlSearch: () => {
    throw new Error("Attempted to search within files");
  },
  elasticSearch: () => {
    throw new Error("Attempted to elastic search within files");
  },
  sqlStrSearch: null,
  elasticStrSearch: null,
  localStrSearch: null,
  sqlOrderBy: null,
  elasticSort: null,
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
  validate: (l: PropertyDefinitionSupportedFilesType, p) => {
    // only too large if max lenght is not defined
    // as per the max files per property
    if (typeof p.maxLength !== "number" && l.length > MAX_FILES_PER_PROPERTY) {
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
