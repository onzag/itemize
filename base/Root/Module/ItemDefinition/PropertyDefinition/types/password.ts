/**
 * Contains the password type description
 *
 * @packageDocumentation
 */

import { IPropertyDefinitionSupportedType } from "../types";
import { GraphQLString } from "graphql";
import { standardSQLOutFn, getStandardSQLFnFor } from "../sql";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import { MAX_STRING_LENGTH, CLASSIC_BASE_I18N, CLASSIC_OPTIONAL_I18N } from "../../../../../../constants";
import Knex from "knex";
import { ISQLTableRowValue } from "../../../../sql";
import bcyrpt from "bcrypt";

/**
 * A password type is described by a string
 */
export type PropertyDefinitionSupportedPasswordType = string;

/**
 * The behaviour of passwords is specified by this type
 */
const typeValue: IPropertyDefinitionSupportedType = {
  gql: GraphQLString,
  nullableDefault: "",
  sql: getStandardSQLFnFor && getStandardSQLFnFor("text", "pgcrypto"),
  sqlIn: (value: PropertyDefinitionSupportedPasswordType, sqlPrefix, id, property, knex) => {
    if (value === null) {
      return  {
        [sqlPrefix + id]: null,
      };
    }
    return  {
      [sqlPrefix + id]: knex.raw("crypt(?, gen_salt('bf',10))", value),
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
      "Attempted to search by password",
    );
  },
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
  sqlEqual: (
    value: PropertyDefinitionSupportedPasswordType,
    sqlPrefix: string,
    id: string,
    isCaseInsensitive: boolean,
    knex: Knex,
    columnName?: string,
  ) => {
    if (!columnName) {
      return knex.raw(
        "?? = crypt(?, ??)",
        [
          sqlPrefix + id,
          value,
          sqlPrefix + id,
        ],
      );
    }
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
  sqlLocalEqual: (
    value: PropertyDefinitionSupportedPasswordType,
    sqlPrefix: string,
    id: string,
    data: ISQLTableRowValue,
  ) => {
    if (value === null) {
      return data[sqlPrefix + id] === null;
    } else if (!data[sqlPrefix + id]) {
      return false;
    }
    return bcyrpt.compareSync(value, data[sqlPrefix + id]);
  },
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
