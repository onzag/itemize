import { IPropertyDefinitionSupportedType } from "../types";

import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";

import { stardardSQLInFn, standardSQLOutFn } from "../sql";

import { PropertyInvalidReason } from "../../PropertyDefinition";

import { MAX_FILE_BATCH_COUNT, CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N } from "../../../../../../constants";

export type PropertyDefinitionSupportedFilesType = string[];
const typeValue: IPropertyDefinitionSupportedType = {
  gql: GraphQLList(GraphQLNonNull(GraphQLString)),
  searchable: false,
  supportsIcons: true,
  specialProperties: [
    {
      name: "accept",
      type: "string",
    },
  ],
  sql: "text[]",
  sqlIn: stardardSQLInFn,
  sqlOut: standardSQLOutFn,
  sqlSearch: () => {
    throw new Error("Attempted to search within files");
  },

  allowsMinMaxLengthDefined: true,
  validate: (l: PropertyDefinitionSupportedFilesType) => {
    if (!Array.isArray(l) || l.some((v) => typeof v !== "string")) {
      return PropertyInvalidReason.UNSPECIFIED;
    }

    if (l.length > MAX_FILE_BATCH_COUNT) {
      return PropertyInvalidReason.TOO_LARGE;
    }

    if (l.toString().indexOf("blob:") === 0) {
      return null;
    }

    if (l.toString().indexOf("/files/") === 0) {
      return null;
    }

    return PropertyInvalidReason.UNSPECIFIED;
  },
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
  },
};
export default typeValue;
