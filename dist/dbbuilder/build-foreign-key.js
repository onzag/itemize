"use strict";
/**
 * This file is in charge of building the foreign keys of an stablished current database
 * so that references can be respected
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const safe_1 = __importDefault(require("colors/safe"));
const _1 = require(".");
/**
 * Builds all the foreign keys
 * @param knex the knex instance
 * @param currentDatabaseSchema the current database schema
 * @param newDatabaseSchema the new database schema as requested
 * @returns the resulting database schema and the new current
 */
async function buildForeignKeys(knex, currentDatabaseSchema, newDatabaseSchema) {
    // foreign key creation requires a current database schema
    // this is because the buildTables should have ran first
    if (!currentDatabaseSchema) {
        throw new Error("A current database schema should exist");
    }
    // we make a copy of our current schema
    const finalSchema = {
        ...currentDatabaseSchema,
    };
    // Now we want to check for foreign keys we start over, add foreign keys
    // later because we don't know what order were tables added
    for (const tableName of Object.keys(newDatabaseSchema)) {
        // the result table schema for that specific table
        const newTableSchema = newDatabaseSchema[tableName];
        const currentTableSchema = currentDatabaseSchema[tableName];
        // we cannot operate unless there's a current table schema this could
        // mean a table was not added or something
        if (!currentTableSchema) {
            continue;
        }
        // now we copy the current table schema
        finalSchema[tableName] = { ...currentTableSchema };
        // so now we check the indexes for that we need to gather them
        // in the proper form
        const newTableForeignKeys = {};
        const currentTableForeignKeys = {};
        // so we loop in each column to see in an foreign key has been specified
        // at this point both newTableSchema and currentTableSchema should have
        // the same columns so we expect to get both from this
        for (const columnName of Object.keys(newTableSchema)) {
            // this way
            const newColumnSchema = newTableSchema[columnName];
            const currentColumnSchema = currentTableSchema[columnName];
            // if the current has an index specified
            if (currentColumnSchema.foreignKey) {
                // we need to check if we have one index with the same id, if we don't
                if (!currentTableForeignKeys[currentColumnSchema.foreignKey.id]) {
                    // we create this new index with only that column
                    currentTableForeignKeys[currentColumnSchema.foreignKey.id] = {
                        targetTable: currentColumnSchema.foreignKey.table,
                        deleteAction: currentColumnSchema.foreignKey.deleteAction,
                        updateAction: currentColumnSchema.foreignKey.updateAction,
                        columns: [{
                                level: currentColumnSchema.foreignKey.level,
                                columnName,
                                referencesColumn: currentColumnSchema.foreignKey.column,
                            }],
                    };
                }
                else {
                    // if we do we push the column
                    currentTableForeignKeys[currentColumnSchema.foreignKey.id].columns.push({
                        level: currentColumnSchema.foreignKey.level,
                        columnName,
                        referencesColumn: currentColumnSchema.foreignKey.column,
                    });
                    // let's check that the table is congrugent
                    if (currentColumnSchema.foreignKey.table !==
                        currentTableForeignKeys[currentColumnSchema.foreignKey.id].targetTable) {
                        console.log(safe_1.default.red(`Foreign key with id ${currentColumnSchema.foreignKey.id} in current schema` +
                            `schema has unmatching tables ${currentColumnSchema.foreignKey.table} over stored ` +
                            `${currentTableForeignKeys[currentColumnSchema.foreignKey.id].targetTable}`));
                    }
                    // now let's check if the delete action is congrugent
                    if (currentColumnSchema.foreignKey.deleteAction !==
                        currentTableForeignKeys[currentColumnSchema.foreignKey.id].deleteAction) {
                        console.log(safe_1.default.red(`Foreign key with id ${currentColumnSchema.foreignKey.id} in current schema` +
                            `schema has unmatching delete actions ${currentColumnSchema.foreignKey.deleteAction} over stored ` +
                            `${currentTableForeignKeys[currentColumnSchema.foreignKey.id].deleteAction}`));
                    }
                    // now let's check if the update action is congrugent
                    if (currentColumnSchema.foreignKey.updateAction !==
                        currentTableForeignKeys[currentColumnSchema.foreignKey.id].updateAction) {
                        console.log(safe_1.default.red(`Foreign key with id ${currentColumnSchema.foreignKey.id} in current schema` +
                            `schema has unmatching update actions ${currentColumnSchema.foreignKey.updateAction} over stored ` +
                            `${currentTableForeignKeys[currentColumnSchema.foreignKey.id].updateAction}`));
                    }
                }
            }
            // now let's check the new does it have a foreign key
            if (newColumnSchema.foreignKey) {
                // if it has not yet been stored
                if (!newTableForeignKeys[newColumnSchema.foreignKey.id]) {
                    // create one new with only that columm
                    newTableForeignKeys[newColumnSchema.foreignKey.id] = {
                        targetTable: newColumnSchema.foreignKey.table,
                        deleteAction: newColumnSchema.foreignKey.deleteAction,
                        updateAction: newColumnSchema.foreignKey.updateAction,
                        columns: [{
                                level: newColumnSchema.foreignKey.level,
                                columnName,
                                referencesColumn: newColumnSchema.foreignKey.column,
                            }],
                    };
                }
                else {
                    // otherwise add the column
                    newTableForeignKeys[newColumnSchema.foreignKey.id].columns.push({
                        level: newColumnSchema.foreignKey.level,
                        columnName,
                        referencesColumn: newColumnSchema.foreignKey.column,
                    });
                    // let's check that the table is congrugent
                    if (newColumnSchema.foreignKey.table !==
                        newTableForeignKeys[newColumnSchema.foreignKey.id].targetTable) {
                        console.log(safe_1.default.red(`Foreign key with id ${newColumnSchema.foreignKey.id} in new schema` +
                            `schema has unmatching tables ${newColumnSchema.foreignKey.table} over stored ` +
                            `${newTableForeignKeys[newColumnSchema.foreignKey.id].targetTable}`));
                    }
                    // now let's check if the delete action is congrugent
                    if (newColumnSchema.foreignKey.deleteAction !==
                        newTableForeignKeys[newColumnSchema.foreignKey.id].deleteAction) {
                        console.log(safe_1.default.red(`Foreign key with id ${newColumnSchema.foreignKey.id} in new schema` +
                            `schema has unmatching delete actions ${newColumnSchema.foreignKey.deleteAction} over stored ` +
                            `${newTableForeignKeys[newColumnSchema.foreignKey.id].deleteAction}`));
                    }
                    // now let's check if the update action is congrugent
                    if (newColumnSchema.foreignKey.updateAction !==
                        newTableForeignKeys[newColumnSchema.foreignKey.id].updateAction) {
                        console.log(safe_1.default.red(`Foreign key with id ${newColumnSchema.foreignKey.id} in new schema` +
                            `schema has unmatching update actions ${newColumnSchema.foreignKey.updateAction} over stored ` +
                            `${newTableForeignKeys[newColumnSchema.foreignKey.id].updateAction}`));
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
                        newForeignKey.deleteAction !== currentForeignKey.deleteAction ||
                        newForeignKeySourceColumnsStored.join(",") !== currentForeignKeySourceColumnsStored.join(",") ||
                        newForeignKeyReferenceColumnsStored.join(",") !== currentForeignKeyReferenceColumnsStored.join(",")))) {
                // show a proper message, update or removed
                if (newForeignKey) {
                    console.log(safe_1.default.yellow(`Foreign key '${foreignKeyId}' has been changed, ` +
                        `the current foreign key needs to be dropped`));
                }
                else {
                    console.log(safe_1.default.yellow(`Foreign key '${foreignKeyId}' has been dropped`));
                }
                // ask if we want the index to be dropped
                if (await _1.yesno("drop the foreign key?")) {
                    // we drop the index
                    try {
                        await knex.schema.withSchema("public").alterTable(tableName, (t) => {
                            t.dropForeign(currentForeignKeySourceColumnsStored, tableName + "__" + foreignKeyId);
                        });
                        // now we need to update each column affected
                        currentForeignKeySourceColumnsStored.forEach((columnName) => {
                            // copy the column information to reflect the update
                            finalSchema[tableName][columnName] = {
                                ...currentDatabaseSchema[tableName][columnName],
                            };
                            // and now delete the foreign key
                            delete finalSchema[tableName][columnName].foreignKey;
                        });
                    }
                    catch (err) {
                        _1.showErrorStackAndLogMessage(err);
                        wasSupposedToDropCurrentForeignKeyButDidnt = true;
                    }
                }
                else {
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
                (!currentForeignKey) ||
                    // this is an update
                    (
                    // the foreign key signature does not match
                    newForeignKey.targetTable !== currentForeignKey.targetTable ||
                        newForeignKey.deleteAction !== currentForeignKey.deleteAction ||
                        newForeignKeySourceColumnsStored.join(",") !== currentForeignKeySourceColumnsStored.join(",") ||
                        newForeignKeyReferenceColumnsStored.join(",") !== currentForeignKeyReferenceColumnsStored.join(",")))) {
                // show the message that the foreign key needs to be created
                console.log(safe_1.default.yellow(`Foreign key '${foreignKeyId}' must now be created, ` +
                    `with relationship ${newForeignKeySourceColumnsStored.join(", ")} ` +
                    `on table ${tableName} relating to the columns ` +
                    `${newForeignKeyReferenceColumnsStored.join(", ")} on table ${newForeignKey.targetTable}`));
                // ask on whether we create the index
                if (await _1.yesno("create the foreign key?")) {
                    try {
                        await knex.schema.withSchema("public").alterTable(tableName, (t) => {
                            t.foreign(newForeignKeySourceColumnsStored, tableName + "__" + foreignKeyId)
                                .references(newForeignKeyReferenceColumnsStored).inTable(newForeignKey.targetTable)
                                .onDelete(newForeignKey.deleteAction).onUpdate(newForeignKey.updateAction);
                        });
                        // now we need to update each affected column
                        newForeignKeySourceColumnsStored.forEach((columnName, index) => {
                            // copy the column information to reflect the update
                            finalSchema[tableName][columnName] = {
                                ...currentDatabaseSchema[tableName][columnName],
                            };
                            // and now set the index
                            finalSchema[tableName][columnName].foreignKey = {
                                id: foreignKeyId,
                                table: newForeignKey.targetTable,
                                level: index,
                                column: newForeignKeyReferenceColumnsStored[index],
                                deleteAction: newForeignKey.deleteAction,
                                updateAction: newForeignKey.updateAction,
                            };
                        });
                    }
                    catch (err) {
                        _1.showErrorStackAndLogMessage(err);
                    }
                }
            }
        }
    }
    return finalSchema;
}
exports.buildForeignKeys = buildForeignKeys;
