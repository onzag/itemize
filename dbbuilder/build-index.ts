// /**
//  * This file is in charge of building the postgresql indexes on the database
//  * for speeding up things and setting up unique constraints
//  *
//  * @packageDocumentation
//  */

// import colors from "colors/safe";
// import Knex from "@onzag/knex";
// import uuidv5 from "uuid/v5";

// import { ISQLSchemaDefinitionType } from "../base/Root/sql";
// import { showErrorStackAndLogMessage, yesno } from ".";

// const NAMESPACE = "23ab5609-df49-4fdf-921b-4604ada284f3";
// function makeIdOutOf(str: string) {
//   return "IDX" + uuidv5(str, NAMESPACE).replace(/-/g, "");
// }
// const MAX_PG_INDEX_SIZE = 60;

// interface IProcessedIndexColumn {
//   level: number;
//   columnName: string;
// }

// interface IProcessedIndexes {
//   [id: string]: {
//     type: string,
//     columns: IProcessedIndexColumn[],
//   };
// }

// /**
//  * Builds all the indexes
//  * @param knex the knex instance
//  * @param currentDatabaseSchema the current database schema
//  * @param newDatabaseSchema the new database schema as requested
//  * @returns the resulting database schema and the new current
//  */
// export async function buildIndexes(
//   knex: Knex,
//   currentDatabaseSchema: ISQLSchemaDefinitionType,
//   newDatabaseSchema: ISQLSchemaDefinitionType,
// ): Promise<ISQLSchemaDefinitionType> {
//   // index creation requires a current database schema
//   // this is because the buildTables should have ran first
//   if (!currentDatabaseSchema) {
//     throw new Error("A current database schema should exist");
//   }

//   // we make a copy of our current schema
//   const finalSchema: ISQLSchemaDefinitionType = {
//     ...currentDatabaseSchema,
//   };

//   // So we want to loop into each table
//   for (const tableName of Object.keys(newDatabaseSchema)) {
//     // the result table schema for that specific table
//     const newTableSchema = newDatabaseSchema[tableName];
//     const currentTableSchema = currentDatabaseSchema[tableName];

//     // we cannot operate unless there's a current table schema this could
//     // mean a table was not added or something
//     if (!currentTableSchema) {
//       console.log(colors.red("Can't add indexes at " + tableName));
//       continue;
//     }

//     // now we copy the current table schema
//     finalSchema[tableName] = {...currentTableSchema};

//     // so now we check the indexes for that we need to gather them
//     // in the proper form
//     const newTableIndexes: IProcessedIndexes  = {};
//     const currentTableIndexes: IProcessedIndexes = {};

//     // so we loop in each column to see in an index has been specified
//     // at this point both newTableSchema and currentTableSchema should have
//     // the same columns so we expect to get both from this
//     for (const columnName of Object.keys(newTableSchema)) {
//       // this way
//       const newColumnSchema = newTableSchema[columnName];
//       const currentColumnSchema = currentTableSchema[columnName];

//       if (!currentColumnSchema) {
//         // this column failed at some point during the process
//         console.log(colors.red("Can't add index at " + tableName + " at " + columnName));
//         continue;
//       }

//       // if the current has an index specified
//       if (currentColumnSchema.index) {
//         // we need to check if we have one index with the same id, if we don't
//         if (!currentTableIndexes[currentColumnSchema.index.id]) {
//           // we create this new index with only that column
//           currentTableIndexes[currentColumnSchema.index.id] = {
//             type: currentColumnSchema.index.type,
//             columns: [{
//               level: currentColumnSchema.index.level,
//               columnName,
//             }],
//           };
//         } else {
//           // if we do we push the column
//           currentTableIndexes[currentColumnSchema.index.id].columns.push({
//             level: currentColumnSchema.index.level,
//             columnName,
//           });
//           // let's check that the type is congrugent
//           if (currentColumnSchema.index.type !== currentTableIndexes[currentColumnSchema.index.id].type) {
//             console.log(colors.red(
//               `Index with id ${currentColumnSchema.index.id} in current schema` +
//               `schema has unmatching types ${currentColumnSchema.index.type} over stored ` +
//               `${currentTableIndexes[currentColumnSchema.index.id].type} on columns ` +
//               `${currentTableIndexes[currentColumnSchema.index.id].columns.join(", ")}`,
//             ));
//           }
//         }
//       }

//       // now let's check the new does it have an index?
//       if (newColumnSchema.index) {
//         // if it has not yet been stored
//         if (!newTableIndexes[newColumnSchema.index.id]) {
//           // create one new with only that columm
//           newTableIndexes[newColumnSchema.index.id] = {
//             type: newColumnSchema.index.type,
//             columns: [{
//               level: newColumnSchema.index.level,
//               columnName,
//             }],
//           };
//         } else {
//           // otherwise add the column
//           newTableIndexes[newColumnSchema.index.id].columns.push({
//             level: newColumnSchema.index.level,
//             columnName,
//           });
//           // notify if there's a mismatch
//           if (newColumnSchema.index.type !== newTableIndexes[newColumnSchema.index.id].type) {
//             console.log(colors.red(
//               `Index with id ${newColumnSchema.index.id} in new schema ` +
//               `schema has unmatching types ${newColumnSchema.index.type} over stored ` +
//               `${newTableIndexes[newColumnSchema.index.id].type} on columns ` +
//               `${newTableIndexes[newColumnSchema.index.id].columns.join(", ")}`,
//             ));
//           }
//         }
//       }
//     }

//     // now we build a set of all indexes, these might not be equal, but might collide, so we get
//     // a list of all the unique ids
//     const allIndexes = new Set(Object.keys(newTableIndexes).concat(Object.keys(currentTableIndexes)));
//     // so now we loop in each
//     for (const indexId of allIndexes) {
//       // either of these might be undefined
//       const newIndex = newTableIndexes[indexId];
//       const currentIndex = currentTableIndexes[indexId];

//       // pg indexes however cannot be longer than 63 characters, so we crop then
//       // this thing is safe so we ensure to crop at 60 characters
//       let pgIndexName = tableName + "_" + indexId;
//       if (pgIndexName.length > MAX_PG_INDEX_SIZE) {
//         pgIndexName = makeIdOutOf(pgIndexName);
//         console.log(colors.yellow(
//           `Index '${indexId}' of type ${currentIndex.type} is too long` +
//           ` so it is renamed to ${pgIndexName} this is consistent and as so nothing has to be done`,
//         ));
//       }

//       const newIndexColumnsSorted = newIndex && newIndex.columns.sort((a, b) => {
//         return a.level - b.level;
//       }).map((c) => c.columnName);

//       const currentIndexColumnsSorted = currentIndex && currentIndex.columns.sort((a, b) => {
//         return a.level - b.level;
//       }).map((c) => c.columnName);

//       // this variable is a helper, basically we cannot over
//       // set indexes, so we need to drop the current if there
//       // is one
//       let wasSupposedToDropCurrentIndexButDidnt = false;

//       // so if we have a current index for that index
//       // and such an index doesn't match our new index
//       if (
//         // so if we have a current index
//         currentIndex &&
//         (
//           // and there's no new index or
//           !newIndex ||
//           (
//             // the index signature does not match
//             currentIndex.type !== newIndex.type ||
//             currentIndexColumnsSorted.join(",") !== newIndexColumnsSorted.join(",")
//           )
//         )
//       ) {
//         // show a proper message, update or removed
//         if (newIndex) {
//           console.log(colors.yellow(
//             `Index '${indexId}' of type ${currentIndex.type} has` +
//             ` been changed, the current index needs to be dropped`,
//           ));
//         } else {
//           console.log(colors.yellow(
//             `Index '${indexId}' of type ${currentIndex.type} has` +
//             ` been dropped`,
//           ));
//         }

//         // ask if we want the index to be dropped
//         if (await yesno(
//           "drop the index?",
//         )) {
//           // we drop the index
//           try {
//             await knex.schema.withSchema("public").alterTable(tableName, (t) => {
//               if (currentIndex.type === "unique") {
//                 t.dropUnique(currentIndexColumnsSorted);
//               } else if (currentIndex.type === "primary") {
//                 t.dropPrimary(pgIndexName);
//               } else {
//                 t.dropIndex(currentIndexColumnsSorted, pgIndexName);
//               }
//             });

//             // now we need to update each column affected
//             currentIndexColumnsSorted.forEach((columnName) => {
//               // copy the column information to reflect the update
//               finalSchema[tableName][columnName] = {
//                 ...currentDatabaseSchema[tableName][columnName],
//               };
//               // and now delete the index
//               delete finalSchema[tableName][columnName].index;
//             });

//           } catch (err) {
//             showErrorStackAndLogMessage(err);
//             wasSupposedToDropCurrentIndexButDidnt = true;
//           }
//         } else {
//           wasSupposedToDropCurrentIndexButDidnt = true;
//         }
//       }

//       // so now if we have a new index type which is not equal to the old
//       // and we actually dropped the old index (if there was any)
//       if (
//         // if we have the new index
//         newIndex &&
//         // and if we didn't cancel dropping (if we were requested)
//         !wasSupposedToDropCurrentIndexButDidnt &&
//         (
//           // if we do have an entirely new index, as in it's not an update
//           // of a previous index or
//           (
//             !currentIndex
//           ) ||
//           // this is an update
//           (
//             newIndex.type !== currentIndex.type ||
//             currentIndexColumnsSorted.join(",") !== newIndexColumnsSorted.join(",")
//           )
//         )
//       ) {
//         // show the message that the index needs to be created
//         console.log(colors.yellow(
//           `Index '${indexId}' of type ${newIndex.type} ` +
//           ` must now be created which affects columns ${newIndexColumnsSorted.join(", ")}`,
//         ));

//         // ask on whether we create the index
//         if (await yesno(
//           "create the index?",
//         )) {
//           try {
//             await knex.schema.withSchema("public").alterTable(tableName, (t) => {
//               if (newIndex.type === "unique") {
//                 t.unique(newIndexColumnsSorted, pgIndexName);
//               } else if (newIndex.type === "primary") {
//                 t.primary(newIndexColumnsSorted, pgIndexName);
//               } else {
//                 t.index(newIndexColumnsSorted, pgIndexName, newIndex.type);
//               }
//             });

//             // now we need to update each affected column
//             newIndexColumnsSorted.forEach((columnName, index) => {
//               // copy the column information to reflect the update
//               finalSchema[tableName][columnName] = {
//                 ...currentDatabaseSchema[tableName][columnName],
//               };
//               // and now set the index
//               finalSchema[tableName][columnName].index = {
//                 id: indexId,
//                 type: newIndex.type,
//                 level: index,
//               };
//             });

//           } catch (err) {
//             showErrorStackAndLogMessage(err);
//           }
//         }
//       }
//     }
//   }

//   return finalSchema;
// }
