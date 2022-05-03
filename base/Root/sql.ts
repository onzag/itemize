/**
 * Basically just contains types and the function that specifies how the whole
 * database for the itemize project should be described
 *
 * @module
 */

import { getElasticSchemaForModule, getSQLTablesSchemaForModule } from "./Module/sql";
import Root from ".";
import {
  CREATED_BY_INDEX, CURRENCY_FACTORS_IDENTIFIER,
  DELETED_REGISTRY_IDENTIFIER, PARENT_INDEX, REGISTRY_IDENTIFIER,
  LOGS_IDENTIFIER
} from "../../constants";

export interface ISQLTableIndexType {
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
}

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
  /**
   * An index definition
   */
  index?: ISQLTableIndexType;
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

export interface IElasticIndexDefinitionType {
  properties: {
    [propertyName: string]: any;
  };
  runtime?: {
    [propertyName: string]: any;
  };
};

export interface IElasticSchemaDefinitionType {
  [indexName: string]: IElasticIndexDefinitionType;
}

export type ConsumeStreamsFnType = (propertyLocationId: string) => Promise<void>;

/**
 * A sql composed row value
 */
export interface ISQLStreamComposedTableRowValue {
  value: ISQLTableRowValue,
  consumeStreams: ConsumeStreamsFnType,
}

export function getElasticSchemaForRoot(root: Root, serverData: any): IElasticSchemaDefinitionType {
  let resultSchema: IElasticSchemaDefinitionType = {};

  root.getAllModules().forEach((cModule) => {
    // add together the schemas of all the modules
    resultSchema = { ...resultSchema, ...getElasticSchemaForModule(cModule, serverData) };
  });

  return resultSchema;
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
        type: "TEXT",
        index: {
          id: "code_index",
          type: "primary",
          level: 1,
        },
      },
      factor: {
        type: "DECIMAL"
      }
    },
    [DELETED_REGISTRY_IDENTIFIER]: {
      reg_id: {
        type: "serial",
        notNull: true,
        index: {
          id: "PRIMARY_KEY",
          type: "primary",
          level: 0,
        },
      },
      id: {
        type: "TEXT",
        notNull: true,
      },
      version: {
        type: "TEXT",
        notNull: true,
      },
      module: {
        type: "TEXT",
        notNull: true
      },
      type: {
        type: "TEXT",
        notNull: true
      },
      created_by: {
        type: "TEXT",
        index: {
          id: CREATED_BY_INDEX,
          level: 0,
          type: "btree",
        }
      },
      parenting_id: {
        type: "TEXT",
        index: {
          id: PARENT_INDEX,
          level: 0,
          type: "btree",
        }
      },
      transaction_time: {
        type: "TIMESTAMPTZ",
      },
    },
    [REGISTRY_IDENTIFIER]: {
      id: {
        type: "SERIAL",
        notNull: true,
        index: {
          id: "PRIMARY_KEY",
          type: "primary",
          level: 0,
        },
      },
      pkey: {
        type: "TEXT",
        notNull: true,
        index: {
          id: "UNIQUE_REGISTRY_COMBINATION",
          type: "unique",
          level: 0,
        },
      },
      skey: {
        type: "TEXT",
        notNull: true,
        index: {
          id: "UNIQUE_REGISTRY_COMBINATION",
          type: "unique",
          level: 1,
        },
      },
      value: {
        type: "TEXT",
      },
      created_at: {
        type: "TIMESTAMPTZ",
        notNull: true,
      },
      last_modified: {
        type: "TIMESTAMPTZ",
        notNull: true,
      },
    },
  };
  root.getAllModules().forEach((cModule) => {
    // add together the schemas of all the modules
    resultSchema = { ...resultSchema, ...getSQLTablesSchemaForModule(cModule) };
  });
  // return that
  return resultSchema;
}
