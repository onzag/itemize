import {
  ISQLTableRowValue,
} from "../../../../sql";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import { ISQLEqualInfo, ISQLInInfo, ISQLSearchInfo, ISQLSSCacheEqualInfo } from "../types";

/**
 * The standard sql in function that specifies how a property inputs its value
 * into a table
 * @param arg the in arg
 * @returns the partial row value
 */
export function taglistSQLIn(arg: ISQLInInfo): ISQLTableRowValue {
  if (arg.value === null) {
    return {
      [arg.prefix + arg.id]: null,
    }; 
  }

  const valueArray = (arg.value as Array<any>).map((v) => "?").join(",");
  // as simple as this
  return {
    [arg.prefix + arg.id]: [
      "ARRAY[" + valueArray + "]::TEXT[]",
      arg.value,
    ],
  };
}

/**
 * The taglist sql search functionality
 * @param arg the sql search arg info
 * @returns a boolean on whether it was searched by it
 */
 export function taglistSQLSearch(arg: ISQLSearchInfo): boolean {
  // first we analyze and get the search name
  const searchName = PropertyDefinitionSearchInterfacesPrefixes.SEARCH + arg.prefix + arg.id;

  // now we see if we have an argument for it
  if (typeof arg.args[searchName] !== "undefined" && arg.args[searchName] !== null) {
    const tagCompareCheck = arg.args[searchName] as string[];

    // and we check it... we are using the includes containment
    // where we ensure that all the provided tags are included
    // into this search
    arg.whereBuilder.andWhere(
      JSON.stringify(arg.prefix + arg.id) + " @> ARRAY[" + tagCompareCheck.map(() => "?").join(",") + "]::TEXT[]",
      tagCompareCheck,
    );

    return true;
  } else if (arg.args[searchName] === null) {
    arg.whereBuilder.andWhereColumnNull(arg.prefix + arg.id);
    return true;
  }

  return false;
}

/**
 * The standard function that perfoms equality checks within the database
 * @param arg the equal info arg
 * @returns a valid args to use in the where expression or an object
 * for where many
 */
 export function taglistSQLEqualFn(arg: ISQLEqualInfo) {
  if (arg.value === null) {
    arg.whereBuilder.andWhereColumn(
      arg.prefix + arg.id,
      null,
    );
  } else {
    const tagCompareCheck = arg.value as any as string[];
    arg.whereBuilder.andWhere(
      JSON.stringify(arg.prefix + arg.id) + " @> ARRAY[" + tagCompareCheck.map(() => "?").join(",") + "]::TEXT",
      tagCompareCheck,
    ).andWhere(
      JSON.stringify(arg.prefix + arg.id) + " <@ ARRAY[" + tagCompareCheck.map(() => "?").join(",") + "]::TEXT",
      tagCompareCheck,
    );
  }
}

/**
 * This function represents the standard way an equality check
 * is performed locally in the cache when equality between properties is requests
 * this local equal is ran against SQL cached properties, that is redis cache
 * it is used for check for policies
 * @param arg the sql ss cache equal info
 * @returns a boolean on whether it equals
 */
 export function taglistSQLSSCacheEqualFn(arg: ISQLSSCacheEqualInfo): boolean {
  const valueA = arg.row[arg.prefix + arg.id] as string[];
  const valueB = arg.value as any as string[];

  if (valueA === null || valueB === null) {
    return valueB === valueA;
  }

  return valueA.every((v) => valueB.includes(v)) && valueB.every((v) => valueA.includes(v));
}