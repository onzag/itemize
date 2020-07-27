/**
 * This file contains the password server side sql functionality
 *
 * @packageDocumentation
 */
import { ISQLInInfo, ISQLEqualInfo, ISQLSSCacheEqualInfo } from "../types";
/**
 * Specifies how to SQL in the password
 * @param arg the sql in info arg
 * @eturns a partial row
 */
export declare function passwordSQLIn(arg: ISQLInInfo): {
    [x: string]: import("knex").Raw<any>;
};
/**
 * Provides the equality function as run in the database
 * @param arg the sql equal arg info
 * @returns a knex raw execution query
 */
export declare function passwordSQLEqual(arg: ISQLEqualInfo): import("knex").Raw<any>;
/**
 * Provides the equality function as run in a cached row
 * @param arg the sql ss cache equal arg info
 * @returns a boolean
 */
export declare function passwordSQLSSEqual(arg: ISQLSSCacheEqualInfo): boolean;
/**
 * Provides the password sql search functionality
 * @returns nothing, it just throws an error
 */
export declare function passwordSQLSearch(): any;
