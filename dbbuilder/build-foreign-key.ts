/**
 * This file is in charge of building the foreign keys of an stablished current database
 * so that references can be respected
 *
 * @module
 */

import colors from "colors/safe";

import { ISQLSchemaDefinitionType } from "../base/Root/sql";
import { continueOrKill, showErrorStackAndLogMessage, yesno } from ".";
import { DatabaseConnection } from "../database";
import uuidv5 from "uuid/v5";

const potentialForeignKeyActions = [
  "no action",
  "restrict",
  "cascade",
  "set null",
  "set default",
];

interface IProcessedForeignKeyColumn {
  level: number;
  columnName: string;
  referencesColumn: string;
}

interface IProcessedForeignKeys {
  [id: string]: {
    targetTable: string;
    deleteAction: string;
    updateAction: string;
    columns: IProcessedForeignKeyColumn[];
  };
}

function parseColumns(
  k: string,
  betweenA: string,
  betweenB: string,
): string[] {
  let columnsStr = k.split(betweenA)[1].split(betweenB)[0].trim();

  const indexOfPharentesis = columnsStr.indexOf("(");
  columnsStr = columnsStr.substring(indexOfPharentesis + 1).trimStart();
  if (columnsStr[columnsStr.length - 1] === ")") {
    columnsStr = columnsStr.substring(0, columnsStr.length - 1).trimEnd();
  }

  return columnsStr.split(",").map((v) => {
    const trimmed = v.trim();
    if (trimmed.startsWith("\"")) {
      return JSON.parse(trimmed);
    } else {
      return trimmed;
    }
  });
}

function findActionFor(
  k: string,
  name: string,
) {
  // FOREIGN KEY ("MODULE_ID", "MODULE_VERSION") REFERENCES "MOD_course"(id, version) ON UPDATE CASCADE ON DELETE CASCADE
  const afterSplit = k.split(name)[1];
  if (!afterSplit) {
    return "no action";
  }
  const strEnd = afterSplit.trimStart().toLowerCase();

  if (!strEnd) {
    return "no action";
  }

  return potentialForeignKeyActions.find((v) => {
    return strEnd.startsWith(v);
  }) || "no action";
}

const NAMESPACE = "23ab4609-df49-4fdf-921b-4704adb284f3";
export function makeIdOutOf(str: string) {
  return "FKX" + uuidv5(str, NAMESPACE).replace(/-/g, "");
}
export const MAX_PG_FK_SIZE = 60;

/**
 * Builds all the foreign keys
 * @param databaseConnection the database instance
 * @param currentDatabaseSchema the current database schema
 * @param newDatabaseSchema the new database schema as requested
 * @returns the resulting database schema and the new current
 */
export async function buildForeignKeys(
  databaseConnection: DatabaseConnection,
  newDatabaseSchema: ISQLSchemaDefinitionType,
): Promise<void> {
  const allTablesInDb = await databaseConnection.queryRows(
    "SELECT table_name FROM information_schema.tables WHERE " +
    "table_schema = $1 AND table_type = 'BASE TABLE'",
    [
      "public",
    ],
  );

  let allForeignKeysInPublic = await databaseConnection.queryRows(
    "SELECT conrelid::regclass AS table_from, conname, pg_get_constraintdef(oid) FROM pg_constraint WHERE contype='f' AND " +
    "connamespace = 'public'::regnamespace ORDER  BY conrelid::regclass::text, contype DESC"
  );
  allForeignKeysInPublic = allForeignKeysInPublic.map((v) => (
    {
      ...v,
      // for some weird reason it comes quoted
      table_from: JSON.parse(v.table_from),
    }
  ));

  // Now we want to check for foreign keys we start over, add foreign keys
  // later because we don't know what order were tables added
  // So we want to loop into each table
  for (const tableInfo of allTablesInDb) {
    const tableName = tableInfo.table_name as string;

    if (!tableName.startsWith("MOD_") || !newDatabaseSchema[tableName]) {
      continue;
    }

    // the result table schema for that specific table
    const newTableSchema = newDatabaseSchema[tableName];

    // so now we check the indexes for that we need to gather them
    // in the proper form
    const newTableForeignKeys: IProcessedForeignKeys = {};
    const currentTableForeignKeys: IProcessedForeignKeys = {};

    const foreignKeysForTable = allForeignKeysInPublic.filter((v) => v.table_from === tableName);

    // first we grab all the foreign keys for that given table
    foreignKeysForTable.forEach((k) => {
      // this is the foreign key name
      const foreignKeyName = k.conname;

      // get the columns that it affects, for example
      // FOREIGN KEY ("MODULE_ID", "MODULE_VERSION") REFERENCES "MOD_course"(id, version) ON UPDATE CASCADE ON DELETE CASCADE
      // and yes it will always be uppercase, so we want between FOREIGN KEY and ) since REFERENCES could be in our id somehow
      const columnsBase = parseColumns(k.pg_get_constraintdef, "FOREIGN KEY", ")");
      const columnsReferrenced = parseColumns(k.pg_get_constraintdef.split(")")[1], "REFERENCES", ")");

      // now we want the target table
      let targetTable = (k.pg_get_constraintdef as string).split(")")[1].split("REFERENCES")[1].split("(")[0].trim();
      if (targetTable.startsWith("\"")) {
        targetTable = JSON.parse(targetTable);
      }

      // now we grab the actions
      const deleteAction = findActionFor(k.pg_get_constraintdef, "ON DELETE");
      const updateAction = findActionFor(k.pg_get_constraintdef, "ON UPDATE");

      // and can set the foreign key that was generated
      currentTableForeignKeys[foreignKeyName] = {
        columns: columnsBase.map((v, index) => {
          return ({
            columnName: v,
            level: index,
            referencesColumn: columnsReferrenced[index],
          })
        }),
        targetTable,
        deleteAction,
        updateAction,
      }
    });

    // so we loop in each column to see in an foreign key has been specified
    // at this point both newTableSchema and currentTableSchema should have
    // the same columns so we expect to get both from this
    for (const columnName of Object.keys(newTableSchema)) {
      // this way
      const newColumnSchema = newTableSchema[columnName];

      // now let's check the new does it have a foreign key
      if (newColumnSchema.foreignKey) {

        let actualId = tableName + "__" + newColumnSchema.foreignKey.id;
        if (actualId.length > MAX_PG_FK_SIZE) {
          actualId = makeIdOutOf(actualId);
          console.log(colors.yellow(
            `Foreign key for '${tableName + "__" + newColumnSchema.foreignKey.id}' is too long` +
            ` so it is renamed to ${actualId} this is consistent and as so nothing has to be done`,
          ));
        }

        // if it has not yet been stored
        if (!newTableForeignKeys[actualId]) {
          // create one new with only that columm
          newTableForeignKeys[actualId] = {
            targetTable: newColumnSchema.foreignKey.table,
            deleteAction: newColumnSchema.foreignKey.deleteAction,
            updateAction: newColumnSchema.foreignKey.updateAction,
            columns: [{
              level: newColumnSchema.foreignKey.level,
              columnName,
              referencesColumn: newColumnSchema.foreignKey.column,
            }],
          };
        } else {
          // otherwise add the column
          newTableForeignKeys[actualId].columns.push({
            level: newColumnSchema.foreignKey.level,
            columnName,
            referencesColumn: newColumnSchema.foreignKey.column,
          });

          // let's check that the table is congrugent
          if (
            newColumnSchema.foreignKey.table !==
            newTableForeignKeys[actualId].targetTable
          ) {
            console.log(colors.red(
              `Foreign key with id ${newColumnSchema.foreignKey.id} in new schema` +
              `schema has unmatching tables ${newColumnSchema.foreignKey.table} over stored ` +
              `${newTableForeignKeys[actualId].targetTable}`,
            ));

            await continueOrKill();
          }

          // now let's check if the delete action is congrugent
          if (
            newColumnSchema.foreignKey.deleteAction !==
            newTableForeignKeys[actualId].deleteAction
          ) {
            console.log(colors.red(
              `Foreign key with id ${newColumnSchema.foreignKey.id} in new schema` +
              `schema has unmatching delete actions ${newColumnSchema.foreignKey.deleteAction} over stored ` +
              `${newTableForeignKeys[actualId].deleteAction}`,
            ));

            await continueOrKill();
          }

          // now let's check if the update action is congrugent
          if (
            newColumnSchema.foreignKey.updateAction !==
            newTableForeignKeys[actualId].updateAction
          ) {
            console.log(colors.red(
              `Foreign key with id ${newColumnSchema.foreignKey.id} in new schema` +
              `schema has unmatching update actions ${newColumnSchema.foreignKey.updateAction} over stored ` +
              `${newTableForeignKeys[actualId].updateAction}`,
            ));

            await continueOrKill();
          }
        }
      }
    }

    // now we build a set of all foreign keys, these might not be equal, but might collide, so we get
    // a list of all the unique ids
    const allForeignKeys = new Set(Object.keys(newTableForeignKeys).concat(Object.keys(currentTableForeignKeys)));

    for (const foreignKeyId of allForeignKeys) {
      // either of these might be undefined
      const newForeignKey = newTableForeignKeys[foreignKeyId];
      const currentForeignKey = currentTableForeignKeys[foreignKeyId];

      const newForeignKeyColumnsSorted = newForeignKey && newForeignKey.columns.sort((a, b) => {
        return a.level - b.level;
      });

      const newForeignKeySourceColumnsStored = newForeignKeyColumnsSorted &&
        newForeignKeyColumnsSorted.map((m) => m.columnName);

      const newForeignKeyReferenceColumnsStored = newForeignKeyColumnsSorted &&
        newForeignKeyColumnsSorted.map((m) => m.referencesColumn);

      const currentForeignKeyColumnsSorted = currentForeignKey && currentForeignKey.columns.sort((a, b) => {
        return a.level - b.level;
      });

      const currentForeignKeySourceColumnsStored = currentForeignKeyColumnsSorted &&
        currentForeignKeyColumnsSorted.map((m) => m.columnName);

      const currentForeignKeyReferenceColumnsStored = currentForeignKeyColumnsSorted &&
        currentForeignKeyColumnsSorted.map((m) => m.referencesColumn);

      // this variable is a helper, basically we cannot over
      // set indexes, so we need to drop the current if there
      // is one
      let wasSupposedToDropCurrentForeignKeyButDidnt = false;

      // so if we have a current foreign key
      // and such foreign key doesn't match our new foreign key
      if (
        // so if we have a current foreign key
        currentForeignKey &&
        (
          // and there's no new foreign key or
          !newForeignKey ||
          (
            // the foreign key signature does not match
            newForeignKey.targetTable !== currentForeignKey.targetTable ||
            newForeignKey.deleteAction.toLowerCase() !== currentForeignKey.deleteAction ||
            newForeignKey.updateAction.toLowerCase() !== currentForeignKey.updateAction ||
            newForeignKeySourceColumnsStored.join(",") !== currentForeignKeySourceColumnsStored.join(",") ||
            newForeignKeyReferenceColumnsStored.join(",") !== currentForeignKeyReferenceColumnsStored.join(",")
          )
        )
      ) {
        // show a proper message, update or removed
        if (newForeignKey) {
          console.log(colors.yellow(
            `Foreign key '${foreignKeyId}' has been changed, ` +
            `the current foreign key needs to be dropped, current is ` +
            `${JSON.stringify(currentForeignKey)} while new is ${JSON.stringify(newForeignKey)}`,
          ));
        } else {
          console.log(colors.yellow(
            `Foreign key '${foreignKeyId}' has been dropped`,
          ));
        }

        // ask if we want the index to be dropped
        if (await yesno(
          "drop the foreign key?",
        )) {
          // we drop the index
          try {
            let actualId = tableName + "__" + foreignKeyId;
            if (actualId.length > MAX_PG_FK_SIZE) {
              actualId = makeIdOutOf(actualId);
            }
            await databaseConnection.query(
              `ALTER TABLE ${JSON.stringify(tableName)} DROP CONSTRAINT ${JSON.stringify(actualId)}`,
            );
          } catch (err) {
            await showErrorStackAndLogMessage(err);
            wasSupposedToDropCurrentForeignKeyButDidnt = true;
          }
        } else {
          wasSupposedToDropCurrentForeignKeyButDidnt = true;
        }
      }

      // so now if we have a new foreign type which is not equal to the old
      // and we actually dropped the old foreign key (if there was any)
      if (
        // if we have the new foreign key
        newForeignKey &&
        // and if we didn't cancel dropping (if we were requested)
        !wasSupposedToDropCurrentForeignKeyButDidnt &&
        (
          // if we do have an entirely new index, as in it's not an update
          // of a previous index or
          (
            !currentForeignKey
          ) ||
          // this is an update
          (
            // the foreign key signature does not match
            newForeignKey.targetTable !== currentForeignKey.targetTable ||
            newForeignKey.deleteAction !== currentForeignKey.deleteAction ||
            newForeignKeySourceColumnsStored.join(",") !== currentForeignKeySourceColumnsStored.join(",") ||
            newForeignKeyReferenceColumnsStored.join(",") !== currentForeignKeyReferenceColumnsStored.join(",")
          )
        )
      ) {
        // show the message that the foreign key needs to be created
        console.log(colors.yellow(
          `Foreign key '${foreignKeyId}' must now be created, ` +
          `with relationship ${newForeignKeySourceColumnsStored.join(", ")} ` +
          `on table ${tableName} relating to the columns ` +
          `${newForeignKeyReferenceColumnsStored.join(", ")} on table ${newForeignKey.targetTable}`,
        ));

        // ask on whether we create the index
        if (await yesno(
          "create the foreign key?",
        )) {
          try {

            await databaseConnection.query(
              `ALTER TABLE ${JSON.stringify(tableName)} ADD CONSTRAINT ${JSON.stringify(foreignKeyId)} ` +
              `FOREIGN KEY (${newForeignKeySourceColumnsStored.map((c) => JSON.stringify(c)).join(",")}) ` +
              `REFERENCES ${JSON.stringify(newForeignKey.targetTable)} ` +
              `(${newForeignKeyReferenceColumnsStored.map((c) => JSON.stringify(c)).join(",")}) ` +
              `ON DELETE ${newForeignKey.deleteAction} ON UPDATE ${newForeignKey.updateAction}`
            );
          } catch (err) {
            await showErrorStackAndLogMessage(err);
          }
        }
      }
    }
  }
}
