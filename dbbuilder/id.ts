/**
 * This file contains the utilities for the id type to be handled inside
 * the tables
 * @packageDocumentation
 */

import Knex from "knex";
import { ISQLSchemaDefinitionType } from "../base/Root/sql";

// based on https://blog.andyet.com/2016/02/23/generating-shortids-in-postgres/
const ID_TRIGGER = `CREATE OR REPLACE FUNCTION id12()
RETURNS TRIGGER AS $$
DECLARE
  key TEXT
  partial_query TEXT
  found TEXT
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
 * @param knex the knex instance
 */
export async function prepareIdTrigger(
  knex: Knex,
): Promise<void> {
  await knex.raw(ID_TRIGGER);
}

/**
 * Processes the triggers that are required in the tables that hold an id
 * @param knex the knex instance
 * @param currentDatabaseSchema the database schema as requested
 */
export async function postprocessIdTriggers(
  knex: Knex,
  currentDatabaseSchema: ISQLSchemaDefinitionType,
): Promise<void> {
  const gatheredIdTriggeredTables: string[] = [];
  Object.keys(currentDatabaseSchema).forEach((tableName) => {
    const tableSchema = currentDatabaseSchema[tableName];
    const isIdTable = Object.keys(tableSchema).some((columnName) => {
      const columnSchema = tableSchema[columnName];
      return columnSchema.type === "id" && columnName === "id";
    });
    if (isIdTable) {
      gatheredIdTriggeredTables.push(tableName);
    }
  });

  await Promise.all(gatheredIdTriggeredTables.map(async (idTableName) => {
    await knex.raw(
      "DROP TRIGGER IF EXISTS ?? ON ??",
      [idTableName + "_TRIGGER", idTableName],
    );
    await knex.raw(
      "CREATE TRIGGER ?? BEFORE INSERT ON ?? FOR EACH ROW EXECUTE PROCEDURE id12()",
      [idTableName + "_TRIGGER", idTableName],
    );
  }));
}
