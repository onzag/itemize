/**
 * This file contains the password server side sql functionality
 * 
 * @packageDocumentation
 */

import { ISQLInInfo, ISQLEqualInfo, ISQLSSCacheEqualInfo } from "../types";
import bcyrpt from "bcrypt";

/**
 * Specifies how to SQL in the password
 * @param arg the sql in info arg
 * @eturns a partial row
 */
export function passwordSQLIn(arg: ISQLInInfo) {
  if (arg.value === null) {
    return  {
      [arg.prefix + arg.id]: null,
    };
  }
  return  {
    [arg.prefix + arg.id]: arg.knex.raw("crypt(?, gen_salt('bf',10))", arg.value as string),
  };
}

/**
 * Provides the equality function as run in the database
 * @param arg the sql equal arg info
 * @returns a knex raw execution query
 */
export function passwordSQLEqual(arg: ISQLEqualInfo) {
  return arg.knex.raw(
    "?? = crypt(?, ??)",
    [
      arg.prefix + arg.id,
      arg.value as string,
      arg.prefix + arg.id,
    ],
  );
}

/**
 * Provides the equality function as run in a cached row
 * @param arg the sql ss cache equal arg info
 * @returns a boolean
 */
export function passwordSQLSSEqual(arg: ISQLSSCacheEqualInfo) {
  // if the value is null, we check for both null
  if (arg.value === null) {
    // like this from the row itself
    return arg.row[arg.prefix + arg.id] === null;
  // if the row itself is null
  } else if (!arg.row[arg.prefix + arg.id]) {
    // it's false 
    return false;
  }

  try {
    // postgresql uses bcrypt, so this actually works to compare
    // the value properly
    return bcyrpt.compareSync(arg.value, arg.row[arg.prefix + arg.id]);
  } catch (err) {
    return false;
  }
}

/**
 * Provides the password sql search functionality
 * @returns nothing, it just throws an error
 */
export function passwordSQLSearch(): any {
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
}