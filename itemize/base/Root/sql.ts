/**
 * Basically just contains types and the function that specifies how the whole
 * database for the itemize project should be described
 *
 * @packageDocumentation
 */

import { getSQLTablesSchemaForModule } from "./Module/sql";
import Root from ".";

/**
 * How a column is to be defined in sql, this is the SQL schema
 */
export interface ISQLColumnDefinitionType {
  /**
   * Postgresql type
   */
  type: string;
  /**
   * Whether it is not null, it is recommended not to use
   * this very often
   */
  notNull?: boolean;
  /**
   * A foreign key table
   */
  fkTable?: string;
  /**
   * A foreign key column
   */
  fkCol?: string;
  /**
   * A foreign key action
   */
  fkAction?: string;
  /**
   * an index type
   */
  index?: string;
}

/**
 * How a table is to be defined, this works for total and
 * partial definitions as they can be merged together
 */
export interface ISQLTableDefinitionType {
  [columnName: string]: ISQLColumnDefinitionType;
}

/**
 * How a whole SQL database schema is to be defined as a collection
 * of tables with their respective names
 */
export interface ISQLSchemaDefinitionType {
  [tableName: string]: ISQLTableDefinitionType;
}

/**
 * A sql row value when queried, the value can be anything
 * as we do not know
 */
export interface ISQLTableRowValue {
  [columnName: string]: any;
}

/**
 * Provides the whole schema that is necessary to populate
 * in order for all the items contained within this root
 * to function in the database
 * @param root The root in question
 * @returns a total database schema
 */
export function getSQLTablesSchemaForRoot(root: Root): ISQLSchemaDefinitionType {
  let resultSchema = {};
  root.getAllModules().forEach((cModule) => {
    // add together the schemas of all the modules
    resultSchema = { ...resultSchema, ...getSQLTablesSchemaForModule(cModule) };
  });
  // return that
  return resultSchema;
}
