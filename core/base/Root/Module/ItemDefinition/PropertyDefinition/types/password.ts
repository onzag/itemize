import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLString } from "graphql";
import { standardSQLOutFn, getStandardSQLFnFor } from "../sql";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import { MAX_STRING_LENGTH, CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N } from "../../../../../../constants";

export type PropertyDefinitionSupportedPasswordType = string;

const typeValue: IPropertyDefinitionSupportedType = {
  gql: GraphQLString,
  nullableDefault: "",
  sql: getStandardSQLFnFor("text"),
  sqlIn: (value: PropertyDefinitionSupportedPasswordType, id, property, knex) => {
    if (value === null) {
      return  {
        [id]: null,
      };
    }
    return  {
      [id]: knex.raw("crypt(?, gen_salt('bf',10))", value),
    };
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
  sqlEqual: (
    value: PropertyDefinitionSupportedPasswordType,
    sqlPrefix: string,
    id: string,
    columnName: string,
    knex: any,
  ) => {
    return knex.raw(
      "?? = crypt(?, ??) AS ??",
      [
        sqlPrefix + id,
        value,
        sqlPrefix + id,
        columnName,
      ],
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