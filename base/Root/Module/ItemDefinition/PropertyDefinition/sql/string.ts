/**
 * This file contains the sql server side functions for the string type
 * 
 * @packageDocumentation
 */

import { ISQLSearchInfo, ISQLStrSearchInfo } from "../types";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import { exactStringSearchSubtypes } from "../types/string";

/**
 * The string sql search functionality
 * @param arg the sql search arg info
 * @returns a boolean on whether it was searched by it
 */
export function stringSQLSearch(arg: ISQLSearchInfo): boolean {
  // first we analyze and get the search name
  const searchName = PropertyDefinitionSearchInterfacesPrefixes.SEARCH + arg.prefix + arg.id;

  // now we see if we have an argument for it
  if (typeof arg.args[searchName] !== "undefined" && arg.args[searchName] !== null) {
    // and we check it...
    if (exactStringSearchSubtypes.includes(arg.property.getSubtype())) {
      arg.knexBuilder.andWhere(
        arg.prefix + arg.id,
        (arg.args[searchName] as string),
      );
    } else {
      arg.knexBuilder.andWhereRaw(
        "?? ilike ? escape ?",
        [
          arg.prefix + arg.id,
          "%" + (arg.args[searchName] as string).replace(/\%/g, "\\%").replace(/\_/g, "\\_") + "%",
          "\\",
        ],
      );
    }

    return true;
  }

  return false;
}

/**
 * The string FTS search functionality from the search field
 * @param arg the sql str search argument
 * @returns a boolean on whether it was searched by it
 */
export function stringSQLStrSearch(arg: ISQLStrSearchInfo) {
  // this is due to knex shenanigans, we need to check it
  // it's a limitation
  if (arg.knexBuilder) {
    // so we check it
    if (exactStringSearchSubtypes.includes(arg.property.getSubtype())) {
      arg.knexBuilder.andWhere(
        arg.prefix + arg.id,
        arg.search,
      );
    } else {
      arg.knexBuilder.andWhereRaw(
        "?? ilike ? escape ?",
        [
          arg.prefix + arg.id,
          "%" + arg.search.replace(/\%/g, "\\%").replace(/\_/g, "\\_") + "%",
          "\\",
        ],
      );
    }
  }

  return true;
}