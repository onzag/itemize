import { IPropertyDefinitionSupportedType } from "../types";
import { getStandardSQLFnFor, stardardSQLInWithJSONStringifyFn, standardSQLOutWithJSONParseFn } from "../sql";
import { PropertyInvalidReason, IPropertyDefinitionIncludedFileInfoType } from "../../PropertyDefinition";
import { MAX_FILE_BATCH_COUNT, CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N } from "../../../../../../constants";

// tslint:disable-next-line: no-empty-interface
export interface IPropertyDefinitionSupportedSingleFilesType extends IPropertyDefinitionIncludedFileInfoType {
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
      name: "sizes",
      type: "string",
    },
  ],
  sql: getStandardSQLFnFor("text"),
  sqlIn: stardardSQLInWithJSONStringifyFn,
  sqlOut: standardSQLOutWithJSONParseFn,
  sqlSearch: () => {
    throw new Error("Attempted to search within files");
  },
  sqlEqual: () => {
    throw new Error("Attempted to equal within files");
  },
  sqlLocalEqual: () => {
    throw new Error("Attempted to local equal within files");
  },

  allowsMinMaxLengthDefined: true,
  validate: (l: PropertyDefinitionSupportedFilesType) => {
    if (!Array.isArray(l)) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    if (l.length > MAX_FILE_BATCH_COUNT) {
      return PropertyInvalidReason.TOO_LARGE;
    }

    return PropertyInvalidReason.INVALID_VALUE;
  },
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    tooLargeErrorInclude: true,
  },
};
export default typeValue;
