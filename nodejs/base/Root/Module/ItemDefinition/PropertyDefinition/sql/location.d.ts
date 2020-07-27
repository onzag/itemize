/**
 * This file contains the sql functionality to be used with the location type
 *
 * @packageDocumentation
 */
import { ISQLArgInfo, ISQLInInfo, ISQLOutInfo, ISQLSearchInfo, ISQLOrderByInfo, ISQLEqualInfo, ISQLSSCacheEqualInfo } from "../types";
import { IPropertyDefinitionSupportedLocationType } from "../types/location";
/**
 * provides the SQL form for the location type
 * @param arg the arg info
 * @returns a partial row definition
 */
export declare function locationSQL(arg: ISQLArgInfo): {
    [x: string]: {
        type: string;
        ext: string;
        index: {
            type: string;
            id: string;
            level: number;
        };
    } | {
        type: string;
        ext?: undefined;
        index?: undefined;
    };
};
/**
 * Provides the functionality for sql in of data into
 * the row
 * @param arg the sql in arg info
 * @returns a partial row
 */
export declare function locationSQLIn(arg: ISQLInInfo): {
    [x: string]: string | number | import("knex").Raw<any>;
};
/**
 * Provides the functionality to analyze a row value and
 * output the location type
 * @param arg the sql out info
 * @returns a property definition supported location type, or null
 */
export declare function locationSQLOut(arg: ISQLOutInfo): IPropertyDefinitionSupportedLocationType;
/**
 * Provides the search functionality for the location type
 * @param arg the sql search info arg
 * @returns a boolean on whether it was searched by it, or an order by rule (also when it was searched by it)
 */
export declare function locationSQLSearch(arg: ISQLSearchInfo): boolean | [string, any[]];
/**
 * Provides the functionality on how to order by
 * @param arg the order by rule info
 * @returns the order by rule string array
 */
export declare function locationSQLOrderBy(arg: ISQLOrderByInfo): [string, string, string];
/**
 * Checks for equality within the database
 * @param arg the equal arg info
 * @returns a partial row match
 */
export declare function locationSQLEqual(arg: ISQLEqualInfo): {
    [x: string]: string;
};
/**
 * Checks for equality within the cache
 * @param arg the ss cache equal info
 * @returns a boolean
 */
export declare function locationSQLSSCacheEqual(arg: ISQLSSCacheEqualInfo): boolean;
/**
 * Provides the btree indexable functionality
 */
export declare function locationSQLBtreeIndexable(): string[];
