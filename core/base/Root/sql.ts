import { getSQLTablesSchemaForModule } from "./Module/sql";
import Root from ".";

export interface ISQLColumnDefinitionType {
  type: string;
  notNull?: boolean;
  fkTable?: string;
  fkCol?: string;
  fkAction?: string;
}

export interface ISQLTableDefinitionType {
  [columnName: string]: ISQLColumnDefinitionType;
}

export interface ISQLSchemaDefinitionType {
  [tableName: string]: ISQLTableDefinitionType;
}

export interface ISQLTableRowValue {
  [columnName: string]: any;
}

/**
 * Provides the whole schema that is necessary to populate
 * in order for all the items contained within this root
 * to function in the database
 * @param root The root in question
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
