import { ISQLTableRowValue } from "../base/Root/sql";
/**
 * Modifies the value in place to remove empty string version values
 * which are invalid to nulls
 * @param value the value in question
 * @returns the same value, this function modifies the value in place
 */
export declare function convertVersionsIntoNullsWhenNecessary(value: ISQLTableRowValue): ISQLTableRowValue;
