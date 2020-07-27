/**
 * This file provides the sql functionality for the unit type
 *
 * @packageDocumentation
 */
import { ISQLArgInfo, ISQLInInfo, ISQLOutInfo, ISQLSearchInfo, ISQLOrderByInfo, ISQLBtreeIndexableInfo, ISQLEqualInfo, ISQLSSCacheEqualInfo } from "../types";
import { IPropertyDefinitionSupportedUnitType } from "../types/unit";
/**
 * The unit sql function that specifies the schema
 * @param arg the sql arg info
 * @returns a patial row definition
 */
export declare function unitSQL(arg: ISQLArgInfo): {
    [x: string]: {
        type: string;
    };
};
/**
 * Specifies how units are to be sql in
 * @param arg the sql in arg info
 * @returns a partial row value
 */
export declare function unitSQLIn(arg: ISQLInInfo): {
    [x: string]: string | number;
};
/**
 * Specifies how units are to be outputted from a raw row
 * @param arg the sql out arg info
 * @returns a supported unit type (or null)
 */
export declare function unitSQLOut(arg: ISQLOutInfo): IPropertyDefinitionSupportedUnitType;
/**
 * Specifies how units are to be searched by
 * @param arg the sql search arg info
 * @returns a boolean on whether it was searched by it
 */
export declare function unitSQLSearch(arg: ISQLSearchInfo): boolean;
/**
 * Specifies how units are to be ordered by
 * @param arg the sql order by info arg
 * @returns the three string order by rule
 */
export declare function unitSQLOrderBy(arg: ISQLOrderByInfo): [string, string, string];
/**
 * Specifies how units are to be btree indexed to accelerate searches
 * @param arg the sql btree indexable info arg
 * @returns the rows to be btree indexed
 */
export declare function unitSQLBtreeIndexable(arg: ISQLBtreeIndexableInfo): string[];
/**
 * Specifies how units are to be compared for equality in the database
 * @param arg the sql equal arg info
 * @returns a partial row comparison
 */
export declare function unitSQLEqual(arg: ISQLEqualInfo): {
    [x: string]: string | number;
};
/**
 * Specifies how units are to be compared for equality in the cache
 * @param arg the sql ss equal arg info
 * @returns a boolean on whether the equality succeed or not
 */
export declare function unitSQLSSCacheEqual(arg: ISQLSSCacheEqualInfo): boolean;
