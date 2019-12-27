import { IPropertyDefinitionSupportedType } from "../types";

import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";

import { stardardSQLInFn, standardSQLOutFn, getStandardSQLFnFor } from "../sql";

import { PropertyInvalidReason } from "../../PropertyDefinition";

import { MAX_FILE_BATCH_COUNT, CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N } from "../../../../../../constants";

export type PropertyDefinitionSupportedFilesType = string[];
const typeValue: IPropertyDefinitionSupportedType = {
  gql: GraphQLList(GraphQLNonNull(GraphQLString)),
  searchable: false,
  specialProperties: [
    {
      name: "accept",
      type: "string",
    },
  ],
  sql: getStandardSQLFnFor("text[]"),
  sqlIn: stardardSQLInFn,
  sqlOut: standardSQLOutFn,
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
    if (!Array.isArray(l) || l.some((v) => typeof v !== "string")) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    if (l.length > MAX_FILE_BATCH_COUNT) {
      return PropertyInvalidReason.TOO_LARGE;
    }

    if (l.toString().indexOf("blob:") === 0) {
      return null;
    }

    if (l.toString().indexOf("/rest/files/") === 0) {
      return null;
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
