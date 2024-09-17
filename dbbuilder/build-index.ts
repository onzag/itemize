/**
 * This file is in charge of building the postgresql indexes on the database
 * for speeding up things and setting up unique constraints
 *
 * @module
 */

import colors from "colors/safe";
import uuidv5 from "uuid/v5";

import { ISQLSchemaDefinitionType } from "../base/Root/sql";
import { continueOrKill, showErrorStackAndLogMessage, yesno } from ".";
import { DatabaseConnection } from "../database";

const NAMESPACE = "23ab5609-df49-4fdf-921b-4604ada284f3";
export function makeIdOutOf(str: string) {
  return "IDX" + uuidv5(str, NAMESPACE).replace(/-/g, "");
}
export const MAX_PG_INDEX_SIZE = 60;

interface IProcessedIndexColumn {
  level: number;
  columnName: string;
}

interface IProcessedIndexes {
  [id: string]: {
    type: string,
    columns: IProcessedIndexColumn[],
  };
}

/**
 * Builds all the indexes
 * @param databaseConnection the database instance
 * @param currentDatabaseSchema the current database schema
 * @param newDatabaseSchema the new database schema as requested
 * @returns the resulting database schema and the new current
 */
export async function buildIndexes(
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

  // So we want to loop into each table
  for (const tableInfo of allTablesInDb) {
    const tableName = tableInfo.table_name as string;

    if (!newDatabaseSchema[tableName]) {
      continue;
    }

    // the result table schema for that specific table
    const newTableSchema = newDatabaseSchema[tableName];;

    // so now we check the indexes for that we need to gather them
    // in the proper form
    const newTableIndexes: IProcessedIndexes = {};
    const currentTableIndexes: IProcessedIndexes = {};

    // well I just copied this from ChadGPT because I can't
    // fathom how this works, modified it a little but I have no clue how this works
    // and I won't bother to unpack this code
    const allIndexesInTableInformation = await databaseConnection.queryRows("SELECT i.relname AS index_name," +
      " a.attname AS column_name, am.amname AS index_type, ix.indisunique AS is_unique, ix.indisprimary AS is_primary, k.ordinality AS column_position" +
      " FROM pg_class t JOIN pg_index ix ON t.oid = ix.indrelid JOIN pg_class i ON i.oid = ix.indexrelid JOIN pg_attribute a ON a.attrelid = t.oid JOIN" +
      " pg_am am ON am.oid = i.relam JOIN unnest(ix.indkey) WITH ORDINALITY AS k(attnum, ordinality) ON a.attnum = k.attnum WHERE" +
      " t.relkind = 'r' AND t.relname = $1", [tableName]);

    // example output for MOD_users
    //        index_name         |  column_name   | index_type | is_unique | is_primary | column_position 
    //----------------------------+----------------+------------+-----------+------------+-----------------
    //MOD_users_PRIMARY_KEY      | id             | btree      | t         | t          |               1
    //MOD_users_PRIMARY_KEY      | version        | btree      | t         | t          |               2
    //MOD_users_PARENT_INDEX     | parent_id      | btree      | f         | f          |               1
    //MOD_users_PARENT_INDEX     | parent_version | btree      | f         | f          |               2
    //MOD_users_PARENT_INDEX     | parent_type    | btree      | f         | f          |               3
    //MOD_users_CREATED_BY_INDEX | created_by     | btree      | f         | f          |               1
    allIndexesInTableInformation.forEach((indexInfo) => {
      if (!currentTableIndexes[indexInfo.index_name]) {
        currentTableIndexes[indexInfo.index_name] = {
          columns: [],
          type: (indexInfo.is_primary ? "primary" : (indexInfo.is_unique ? "unique" : indexInfo.index_type.toLowerCase())),
        }
      }
      // we set the array by position
      currentTableIndexes[indexInfo.index_name].columns.push({
        columnName: indexInfo.column_name,
        level: indexInfo.column_position,
      });
    });

    // so we loop in each column to see in an index has been specified
    // at this point both newTableSchema and currentTableSchema should have
    // the same columns so we expect to get both from this
    for (const columnName of Object.keys(newTableSchema)) {
      // this way
      const newColumnSchema = newTableSchema[columnName];

      // now let's check the new does it have an index?
      if (newColumnSchema.index) {
        // pg indexes however cannot be longer than 63 characters, so we crop then
        // this thing is safe so we ensure to crop at 60 characters
        const indexId = tableName + "_" + newColumnSchema.index.id;
        
        let pgIndexName = indexId;
        if (pgIndexName.length > MAX_PG_INDEX_SIZE) {
          pgIndexName = makeIdOutOf(indexId);
          console.log(colors.yellow(
            `Index '${indexId}' is too long` +
            ` so it is renamed to ${pgIndexName} this is consistent and as so nothing has to be done`,
          ));
        }

        // if it has not yet been stored
        if (!newTableIndexes[pgIndexName]) {
          // create one new with only that columm
          newTableIndexes[pgIndexName] = {
            type: newColumnSchema.index.type,
            columns: [{
              level: newColumnSchema.index.level,
              columnName,
            }],
          };
        } else {
          // otherwise add the column
          newTableIndexes[pgIndexName].columns.push({
            level: newColumnSchema.index.level,
            columnName,
          });
          // notify if there's a mismatch
          if (newColumnSchema.index.type !== newTableIndexes[pgIndexName].type) {
            console.log(colors.red(
              `Index with id ${indexId} in new schema ` +
              `has unmatching types ${newColumnSchema.index.type} over stored ` +
              `${newTableIndexes[pgIndexName].type} on columns ` +
              `${newTableIndexes[pgIndexName].columns.join(", ")}`,
            ));

            await continueOrKill();
          }
        }
      }
    }

    // now we build a set of all indexes, these might not be equal, but might collide, so we get
    // a list of all the unique ids
    const allIndexes = new Set(Object.keys(newTableIndexes).concat(Object.keys(currentTableIndexes)));
    // so now we loop in each
    for (const pgIndexId of allIndexes) {
      // either of these might be undefined
      const newIndex = newTableIndexes[pgIndexId];
      // the current index is named by the pgIndexName
      const currentIndex = currentTableIndexes[pgIndexId];

      const newIndexColumnsSorted = newIndex && newIndex.columns.sort((a, b) => {
        return a.level - b.level;
      }).map((c) => c.columnName);

      const currentIndexColumnsSorted = currentIndex && currentIndex.columns.sort((a, b) => {
        return a.level - b.level;
      }).map((c) => c.columnName);

      const joinedNewColumns = newIndexColumnsSorted && newIndexColumnsSorted.join(",");
      const joinedCurrentColumns = currentIndexColumnsSorted && currentIndexColumnsSorted.join(",");

      // this variable is a helper, basically we cannot over
      // set indexes, so we need to drop the current if there
      // is one
      let wasSupposedToDropCurrentIndexButDidnt = false;

      // so if we have a current index for that index
      // and such an index doesn't match our new index
      if (
        // so if we have a current index
        currentIndex &&
        (
          // and there's no new index or
          !newIndex ||
          (
            // the index signature does not match
            currentIndex.type !== newIndex.type ||
            joinedCurrentColumns !== joinedNewColumns
          )
        )
      ) {
        // show a proper message, update or removed
        if (newIndex) {
          console.log(colors.yellow(
            `Index '${pgIndexId}' of type ${currentIndex.type} on columns ${joinedCurrentColumns} has` +
            ` changed, the current index needs to be dropped to fit ` + JSON.stringify(newIndex),
          ));
        } else {
          console.log(colors.yellow(
            `Index '${pgIndexId}' of type ${currentIndex.type} on columns ${joinedCurrentColumns} has` +
            ` been dropped`,
          ));
        }

        // ask if we want the index to be dropped
        if (await yesno(
          "drop the index?",
        )) {
          // we drop the index
          try {
            if (currentIndex.type !== "primary") {
              await databaseConnection.query(
                `DROP INDEX IF EXISTS ${JSON.stringify(pgIndexId)}`,
              );
            } else {
              await databaseConnection.query(
                `ALTER TABLE ${JSON.stringify(tableName)} DROP CONSTRAINT ${JSON.stringify(pgIndexId)}`,
              );
            }
          } catch (err) {
            await showErrorStackAndLogMessage(err);
            wasSupposedToDropCurrentIndexButDidnt = true;
          }
        } else {
          wasSupposedToDropCurrentIndexButDidnt = true;
        }
      }

      // so now if we have a new index type which is not equal to the old
      // and we actually dropped the old index (if there was any)
      if (
        // if we have the new index
        newIndex &&
        // and if we didn't cancel dropping (if we were requested)
        !wasSupposedToDropCurrentIndexButDidnt &&
        (
          // if we do have an entirely new index, as in it's not an update
          // of a previous index or
          (
            !currentIndex
          ) ||
          // this is an update
          (
            newIndex.type !== currentIndex.type ||
            joinedCurrentColumns !== joinedNewColumns
          )
        )
      ) {
        // show the message that the index needs to be created
        console.log(colors.yellow(
          `Index '${pgIndexId}' of type ${newIndex.type} ` +
          ` must now be created which affects columns ${joinedNewColumns} to fit ${JSON.stringify(newIndex)}`,
        ));

        // ask on whether we create the index
        if (await yesno(
          "create the index?",
        )) {
          try {
            if (newIndex.type === "primary") {
              await databaseConnection.query(
                `ALTER TABLE ${JSON.stringify(tableName)} ADD CONSTRAINT ` +
                `${JSON.stringify(pgIndexId)} PRIMARY KEY (${newIndexColumnsSorted.map((c) => JSON.stringify(c)).join(", ")})`
              );
            } else if (newIndex.type === "unique") {
              await databaseConnection.query(
                `CREATE UNIQUE INDEX ${JSON.stringify(pgIndexId)} ON ` +
                `${JSON.stringify(tableName)} (${newIndexColumnsSorted.map((c) => JSON.stringify(c)).join(", ")})`
              );
            } else {
              await databaseConnection.query(
                `CREATE INDEX ${JSON.stringify(pgIndexId)} ON ` +
                `${JSON.stringify(tableName)} USING ${newIndex.type}(${newIndexColumnsSorted.map((c) => JSON.stringify(c)).join(", ")})`
              );
            }
          } catch (err) {
            await showErrorStackAndLogMessage(err);
          }
        }
      }
    }
  }
}
