/**
 * This file contains the utilities for the id type to be handled inside
 * the tables
 * @module
 */

import { DatabaseConnection } from "../database";
import { ISQLSchemaDefinitionType } from "../base/Root/sql";

// based on https://blog.andyet.com/2016/02/23/generating-shortids-in-postgres/
const ID_TRIGGER = `CREATE OR REPLACE FUNCTION id12()
RETURNS TRIGGER AS $$
DECLARE
  key TEXT;
  partial_query TEXT;
  found TEXT;
BEGIN
  IF NEW.id IS NOT NULL THEN
    RETURN NEW;
  END IF;

  partial_query := 'SELECT id FROM ' || quote_ident(TG_TABLE_NAME) || ' WHERE id=';
  
  LOOP
    key := encode(gen_random_bytes(12), 'base64');
    key := replace(key, '/', '_');
    key := replace(key, '+', '-');

    EXECUTE partial_query || quote_literal(key) INTO found;

    IF found IS NULL THEN
      EXIT;
    END IF;
  END LOOP;

  NEW.id = key;
  RETURN NEW;
END;
$$ language 'plpgsql'
`;

/**
 * Prepares the id trigger as it is required
 * @param databaseConnection the database instance
 */
export async function prepareIdTrigger(
  databaseConnection: DatabaseConnection,
): Promise<void> {
  await databaseConnection.query(ID_TRIGGER);
}

/**
 * Processes the triggers that are required in the tables that hold an id
 * @param databaseConnection the database instance
 * @param currentDatabaseSchema the database schema as requested
 */
export async function postprocessIdTriggers(
  databaseConnection: DatabaseConnection,
  currentDatabaseSchema: ISQLSchemaDefinitionType,
): Promise<void> {
  const gatheredIdTriggeredTables: string[] = [];
  Object.keys(currentDatabaseSchema).forEach((tableName) => {
    const tableSchema = currentDatabaseSchema[tableName];
    const isIdTable = Object.keys(tableSchema).some((columnName) => {
      const columnSchema = tableSchema[columnName];
      return columnSchema.type === "ID" && columnName === "id";
    });
    if (isIdTable) {
      gatheredIdTriggeredTables.push(tableName);
    }
  });

  await Promise.all(gatheredIdTriggeredTables.map(async (idTableName) => {
    await databaseConnection.query(
      `DROP TRIGGER IF EXISTS ${JSON.stringify(idTableName + "_TRIGGER")} ON ${JSON.stringify(idTableName)}`,
    );
    await databaseConnection.query(
      `CREATE TRIGGER ${JSON.stringify(idTableName + "_TRIGGER")} BEFORE INSERT ON ${JSON.stringify(idTableName)} ` +
      `FOR EACH ROW EXECUTE PROCEDURE id12()`,
    );
  }));
}
