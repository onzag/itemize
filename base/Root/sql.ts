/**
 * Basically just contains types and the function that specifies how the whole
 * database for the itemize project should be described
 *
 * @packageDocumentation
 */

import { getSQLTablesSchemaForModule } from "./Module/sql";
import Root from ".";
import { CURRENCY_FACTORS_IDENTIFIER } from "../../constants";

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
   * A value to make it be default to for this column
   */
  defaultTo?: any;
  /**
   * A foreign key
   */
  foreignKey?: {
    /**
     * The id of the foreign key relationship being created
     * so it can relate to others of the same table
     */
    id: string;
    /**
     * The other table it relates to (this column specifically)
     */
    table: string;
    /**
     * The other column it relates to (this column specifically)
     */
    column: string;
    /**
     * The action to take once the relationship is dropped
     */
    deleteAction: string;
    /**
     * The action to take once the relationship is updated
     */
    updateAction: string;
    /**
     * The level and ordering of the foreign key
     */
    level: number;
  };
  index?: {
    /**
     * The id of the index in order to perform double table indexes
     */
    id: string,
    /**
     * The type of the index, unique, gin, btree...
     */
    type: string,
    /**
     * The index level a numeric value to sort it as, the level
     * makes the order of columns in the key which might have
     * performance effects
     */
    level: number,
  };
  /**
   * An optional extension that is required for this
   * type in order to function properly
   */
  ext?: string;
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

export type ConsumeStreamsFnType = (containerId: string) => Promise<void>;

/**
 * A sql composed row value
 */
export interface ISQLStreamComposedTableRowValue {
  value: ISQLTableRowValue,
  consumeStreams: ConsumeStreamsFnType,
}

/**
 * Provides the whole schema that is necessary to populate
 * in order for all the items contained within this root
 * to function in the database
 * @param root The root in question
 * @returns a total database schema
 */
export function getSQLTablesSchemaForRoot(root: Root): ISQLSchemaDefinitionType {
  let resultSchema: ISQLSchemaDefinitionType = {
    [CURRENCY_FACTORS_IDENTIFIER]: {
      code: {
        type: "text",
        index: {
          id: "code_index",
          type: "primary",
          level: 1,
        },
      },
      factor: {
        type: "float"
      }
    }
  };
  root.getAllModules().forEach((cModule) => {
    // add together the schemas of all the modules
    resultSchema = { ...resultSchema, ...getSQLTablesSchemaForModule(cModule) };
  });
  // return that
  return resultSchema;
}
