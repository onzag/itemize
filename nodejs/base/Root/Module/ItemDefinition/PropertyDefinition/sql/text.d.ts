/**
 * Provides the sql functions for use with the text type
 *
 * @packageDocumentation
 */
import { ISQLArgInfo, ISQLInInfo, ISQLSearchInfo, ISQLOrderByInfo, ISQLStrSearchInfo } from "../types";
/**
 * Provides the sql form for the text type
 * @param arg the sql arg info
 * @returns a partial row definition
 */
export declare function textSQL(arg: ISQLArgInfo): {
    [x: string]: {
        type: string;
        index?: undefined;
    } | {
        type: string;
        index: {
            type: string;
            id: string;
            level: number;
        };
    };
};
/**
 * Provides the sql in functionality for the text type
 * @param arg the sql in arg info
 * @returns a partial row value
 */
export declare function textSQLIn(arg: ISQLInInfo): {
    [x: string]: string | import("knex").Raw<any>;
};
/**
 * Provides the text sql search functionality
 * @param arg the sql search arg info
 * @returns a boolean on whether it was searched by it, and a complementary column order by in case it needs it
 */
export declare function textSQLSearch(arg: ISQLSearchInfo): boolean | [string, any[]];
/**
 * Provides the text FTS str sql search functionality
 * @param arg the sql str search arg info
 * @returns a boolean on whether it was searched by it, and a complementary column order by in case it needs it
 */
export declare function textSQLStrSearch(arg: ISQLStrSearchInfo): boolean | [string, any[]];
/**
 * Provides the order by rule form
 * @param arg the sql order by arg info
 * @returns the order by rule string array (or null) if not possible to order
 */
export declare function textSQLOrderBy(arg: ISQLOrderByInfo): [string, string, string];
/**
 * Provides the btree indexable function for text type
 */
export declare function textSQLBtreeIndexable(): string[];
