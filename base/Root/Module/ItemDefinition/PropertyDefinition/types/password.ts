/**
 * Contains the password type description
 *
 * @module
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLString } from "graphql";
import { standardSQLOutFn, getStandardSQLFnFor, standardSQLSelect } from "../sql";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import { MAX_STRING_LENGTH, CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N } from "../../../../../../constants";
import { passwordSQLIn, passwordSQLEqual, passwordSQLSSEqual, passwordSQLSearch } from "../sql/password";

/**
 * A password type is described by a string
 */
export type PropertyDefinitionSupportedPasswordType = string;

/**
 * The behaviour of passwords is specified by this type
 */
const typeValue: IPropertyDefinitionSupportedType<PropertyDefinitionSupportedPasswordType> = {
  gql: GraphQLString,
  nullableDefault: "",
  sql: getStandardSQLFnFor && getStandardSQLFnFor("TEXT", "pgcrypto"),
  sqlSelect: standardSQLSelect,
  sqlIn: passwordSQLIn,
  sqlOut: standardSQLOutFn,
  sqlSearch: passwordSQLSearch,
  sqlStrSearch: null,
  localStrSearch: null,
  sqlOrderBy: null,
  localOrderBy: null,
  localSearch: () => {
    throw new Error(
      "Attempted to local search by password",
    );
  },
  localEqual: () => {
    throw new Error(
      "Attempted to local equal a password",
    );
  },
  sqlEqual: passwordSQLEqual,
  sqlSSCacheEqual: passwordSQLSSEqual,
  sqlBtreeIndexable: () => {
    throw new Error("Attempted to btree index a password, this might mean a files value is in request limiters, don't do that");
  },
  sqlMantenience: null,
  // validates just the length
  validate: (s: PropertyDefinitionSupportedPasswordType) => {
    if (typeof s !== "string") {
      return PropertyInvalidReason.INVALID_VALUE;
    } else if (s.length > MAX_STRING_LENGTH) {
      return PropertyInvalidReason.TOO_LARGE;
    }

    return null;
  },
  searchable: false,
  // i18n attributes required
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    tooLargeErrorInclude: true,
  },
};
export default typeValue;
