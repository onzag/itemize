"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Modifies the value in place to remove empty string version values
 * which are invalid to nulls
 * @param value the value in question
 * @returns the same value, this function modifies the value in place
 */
function convertVersionsIntoNullsWhenNecessary(value) {
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
exports.convertVersionsIntoNullsWhenNecessary = convertVersionsIntoNullsWhenNecessary;
