/**
 * This file contains the utilities for the id type to be handled inside
 * the tables
 * @module
 */

import { DatabaseConnection } from "../database";
import colors from "colors/safe";

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
): Promise<void> {
  const gatheredIdTriggeredTables: string[] = [];

  const allIdColumns = await databaseConnection.queryRows("SELECT table_name FROM " +
    "information_schema.columns WHERE table_schema = $1 AND column_name = $2",
    [
      "public",
      "id",
    ]
  );

  for (const tableInfo of allIdColumns) {
    const tableName = tableInfo.table_name;

    if (tableName.startsWith("MOD_")) {
      gatheredIdTriggeredTables.push(tableName);
    }
  }

  await Promise.all(gatheredIdTriggeredTables.map(async (idTableName) => {
    const expectedTriggerName = idTableName + "_TRIGGER";
    const checkIfExists = await databaseConnection.queryRows(
      "SELECT trigger_name, action_statement FROM information_schema.triggers WHERE event_manipulation = 'INSERT' AND " +
      "action_timing = 'BEFORE' AND event_object_table = $1",
      [
        idTableName,
      ]
    );
    const functionWithTheSameName = checkIfExists.find((r) => r.trigger_name === expectedTriggerName);
    const functionWithTheSameFunction = checkIfExists.find((r) => r.action_statement === "EXECUTE FUNCTION id12()");
    
    if (functionWithTheSameFunction) {
      if (functionWithTheSameFunction !== functionWithTheSameName) {
        console.log(colors.red("Note, the function for id12 procedure has been taken" +
          " by another method or otherwise duplicated on table " + JSON.stringify(idTableName) + " our function exists in " +
        JSON.stringify(functionWithTheSameFunction.trigger_name)))
      }
      return;
    }
    
    // somehow the function has changed and we are using something else I guess id11 or id6 who knows
    // maybe one day we change id12
    if (functionWithTheSameName && functionWithTheSameName.action_statement !== "EXECUTE FUNCTION id12()") {
      await databaseConnection.query(
        `DROP TRIGGER IF EXISTS ${JSON.stringify(idTableName + "_TRIGGER")} ON ${JSON.stringify(idTableName)}`,
      );
    }

    // now we can create the trigger because it must not exist
    await databaseConnection.query(
      `CREATE TRIGGER ${JSON.stringify(idTableName + "_TRIGGER")} BEFORE INSERT ON ${JSON.stringify(idTableName)} ` +
      `FOR EACH ROW EXECUTE PROCEDURE id12()`,
    );
  }));
}
