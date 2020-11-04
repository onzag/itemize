/**
 * PostgreSQL does not support versions as being null, but technically versions are null
 * so empty string is used in such a case, but we need to clear that up after parsed
 * @packageDocumentation
 */

import { ISQLTableRowValue } from "../base/Root/sql";

/**
 * Modifies the value in place to remove empty string version values
 * which are invalid to nulls
 * @param value the value in question
 * @returns the same value, this function modifies the value in place
 */
export function convertVersionsIntoNullsWhenNecessary(value: ISQLTableRowValue) {
  if (value === null) {
    return value;
  }

  if (typeof value.version !== "undefined" && !value.version) {
    value.version = null;
  }
  if (typeof value.parent_version !== "undefined" && !value.parent_version) {
    value.parent_version = null;
  }
  return value;
}
