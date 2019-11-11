import { IPropertyDefinitionSupportedType } from "../types";

import { GraphQLString } from "graphql";

import { standardSQLOutFn } from "../sql";

import { PropertyInvalidReason } from "../../PropertyDefinition";

import { MAX_STRING_LENGTH, CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N } from "../../../../../../constants";

export type PropertyDefinitionSupportedPasswordType = string;

const typeValue: IPropertyDefinitionSupportedType = {
  gql: GraphQLString,
  nullableDefault: "",
  sql: "text",
  sqlIn: (value: PropertyDefinitionSupportedPasswordType, id, property, raw) => {
    const obj = {};
    obj[id] = raw("crypt(?, gen_salt('bf',10))", value);
    return obj;
  },
  sqlOut: standardSQLOutFn,
  sqlSearch: () => {
    // This should never happen,
    // first off the searchable is false so it should never trigger a sql search
    // EXACT_password will never exist in the search module
    // however passwords can be retrieved, its hash, they have to be explicitly set
    // disable retrieval to true, in the document definition itself, not doing so
    // is a leak, but should be obvious when checking /graphql

    // we throw an error still
    throw new Error(
      "Attempted to search user by password",
    );
  },
  // validates just the length
  validate: (s: PropertyDefinitionSupportedPasswordType) => {
    if (typeof s !== "string") {
      return PropertyInvalidReason.UNSPECIFIED;
    } else if (s.length > MAX_STRING_LENGTH) {
      return PropertyInvalidReason.TOO_LARGE;
    }

    return null;
  },
  searchable: false,
  supportsIcons: false,
  // i18n attributes required
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    tooLargeErrorInclude: true,
  },
};
export default typeValue;
