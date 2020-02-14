"use strict";
/**
 * This file specifies all the sql executions functions that are used in order
 * to query item definitions from the postgresql database, refer to this file
 * once you need to figure out how resources are requested
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../../constants");
const sql_1 = require("./PropertyDefinition/sql");
const sql_2 = require("./Include/sql");
/**
 * Provides the table that is necesary to include this item definition as a whole
 * that is, this represents a whole table, that is necessary for this item to
 * be saved when populated, it basically adds up all the table bits
 * from all the properties and all the items, this does not include
 * prop extensions nor module level properties, nor base
 * @param itemDefinition the item definition in question
 * @returns a complete table definition type
 */
function getSQLTableDefinitionForItemDefinition(itemDefinition) {
    // add all the standard fields
    // TODO fix this to use the new foreignKey and build the key
    // as the double of the primary key, similar to how indexes are done
    const tableToConnect = itemDefinition.getParentModule().getQualifiedPathName();
    const resultTableSchema = {
        [constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME]: {
            type: "integer",
            notNull: true,
            foreignKey: {
                id: "ITEM_TO_MODULE_CONNECTION",
                table: tableToConnect,
                column: "id",
                deleteAction: "cascade",
                updateAction: "cascade",
                level: 0,
            },
        },
        [constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME]: {
            type: "string",
            notNull: true,
            foreignKey: {
                id: "ITEM_TO_MODULE_CONNECTION",
                table: tableToConnect,
                column: "version",
                deleteAction: "cascade",
                updateAction: "cascade",
                level: 1,
            },
        },
    };
    // now we loop thru every property (they will all become columns)
    itemDefinition.getAllPropertyDefinitions().forEach((pd) => {
        Object.assign(resultTableSchema, sql_1.getSQLTableDefinitionForProperty(pd));
    });
    // now we loop over the child items
    itemDefinition.getAllIncludes().forEach((i) => {
        Object.assign(resultTableSchema, sql_2.getSQLTableDefinitionForInclude(i));
    });
    return resultTableSchema;
}
exports.getSQLTableDefinitionForItemDefinition = getSQLTableDefinitionForItemDefinition;
/**
 * Provides all the schema of all the items, self and its children
 * that are included within this item definition and all the table names
 * that should be used using the qualified name
 * @param itemDefinition the item definition in question
 * @returns a partial sql schema definition for the whole database (adds tables)
 */
function getSQLTablesSchemaForItemDefinition(itemDefinition) {
    // we add self
    const result = {
        [itemDefinition.getQualifiedPathName()]: getSQLTableDefinitionForItemDefinition(itemDefinition),
    };
    // loop over the children and add each one of them and whatever they have
    itemDefinition.getChildDefinitions().forEach((cIdef) => {
        Object.assign(result, getSQLTablesSchemaForItemDefinition(cIdef));
    });
    // return that
    return result;
}
exports.getSQLTablesSchemaForItemDefinition = getSQLTablesSchemaForItemDefinition;
/**
 * Converts a SQL value directly coming from the database as it is
 * to a graphql value for this specific item definition,
 * this includes the prop extensions and the reserved base properties
 * @param itemDefinition the item definition in question
 * @param row the row value, with all the columns it has; the row
 * can be overblown with other field data, this will extract only the
 * data required for this item definition
 * @param graphqlFields contains the only properties that are required
 * in the request provided by grapql fields,
 * eg {id: {}, name: {}, ITEM_kitten: {purrs: {}}}
 * @returns a graphql value
 */
function convertSQLValueToGQLValueForItemDefinition(itemDefinition, row, graphqlFields) {
    // first we create the graphql result
    const result = {};
    // now we take all the base properties that we have
    // in the graphql model
    Object.keys(constants_1.RESERVED_BASE_PROPERTIES).filter((baseProperty) => !graphqlFields ? true : graphqlFields[baseProperty]).forEach((basePropertyKey) => {
        result[basePropertyKey] = row[basePropertyKey] || null;
    });
    // we also take all the property definitions we have
    // in this item definitions, and convert them one by one
    // with the row data, this basically also gives graphql value
    // in the key:value format
    itemDefinition.getParentModule().getAllPropExtensions().filter((property) => !graphqlFields ? true : graphqlFields[property.getId()]).concat(itemDefinition.getAllPropertyDefinitions().filter((property) => !graphqlFields ? true : graphqlFields[property.getId()])).forEach((pd) => {
        Object.assign(result, sql_1.convertSQLValueToGQLValueForProperty(pd, row));
    });
    // now we do the same for the items
    itemDefinition.getAllIncludes().filter((include) => !graphqlFields ? true : graphqlFields[include.getQualifiedIdentifier()]).forEach((include) => {
        Object.assign(result, sql_2.convertSQLValueToGQLValueForInclude(include, row, !graphqlFields ? null : graphqlFields[include.getQualifiedIdentifier()]));
    });
    return result;
}
exports.convertSQLValueToGQLValueForItemDefinition = convertSQLValueToGQLValueForItemDefinition;
/**
 * Converts a graphql value, with all its items and everything it
 * has into a SQL row data value for this specific item definition
 * it doesn't include its prop extensions
 * @param itemDefinition the item definition in question
 * @param data the graphql data
 * @param knex the knex instance
 * @param dictionary the dictionary to use in full text search mode
 * @param partialFields fields to make a partial value rather than a total
 * value, note that we don't recommend using partial fields in order to create
 * because some properties might treat nulls in a fancy way, when creating
 * all the table rows should be set, only when updating you should use
 * partial fields; for example, if you have a field that has a property
 * that is nullable but it's forced into some value it will be ignored
 * in a partial field value, don't use partial fields to create
 * @returns a sql value
 */
async function convertGQLValueToSQLValueForItemDefinition(transitoryId, itemDefinition, data, oldData, knex, dictionary, partialFields) {
    // first we create the row value
    const result = {};
    await Promise.all([
        // now we get all the property definitions and do the same
        // that we did in the SQLtoGQL but in reverse
        Promise.all(itemDefinition.getAllPropertyDefinitions().map(async (pd) => {
            // we only add if partialFields allows it, or we don't have
            // partialFields set
            if ((partialFields && typeof partialFields[pd.getId()] !== "undefined") ||
                !partialFields) {
                const addedFieldsByProperty = await sql_1.convertGQLValueToSQLValueForProperty(transitoryId, itemDefinition, null, pd, data, oldData, knex, dictionary, "");
                Object.assign(result, addedFieldsByProperty);
            }
        })),
        // also with the items
        Promise.all(itemDefinition.getAllIncludes().map(async (include) => {
            // we only add if partialFields allows it, or we don't have
            // partialFields set
            const includeNameInPartialFields = include.getQualifiedIdentifier();
            if ((partialFields && typeof partialFields[includeNameInPartialFields] !== "undefined") ||
                !partialFields) {
                const innerPartialFields = !partialFields ? null : partialFields[includeNameInPartialFields];
                const addedFieldsByInclude = await sql_2.convertGQLValueToSQLValueForInclude(transitoryId, itemDefinition, include, data, oldData, knex, dictionary, innerPartialFields);
                Object.assign(result, addedFieldsByInclude);
            }
        })),
    ]);
    return result;
}
exports.convertGQLValueToSQLValueForItemDefinition = convertGQLValueToSQLValueForItemDefinition;
/**
 * Builds a sql query for an item definition so that it can be
 * queried for searches
 * @param itemDefinition the item definition that is being requested (normal form)
 * @param args the args from the search mode
 * @param knexBuilder the knex builder instance
 * @param dictionary the dictionary being used
 */
function buildSQLQueryForItemDefinition(itemDefinition, args, knexBuilder, dictionary) {
    // first we need to get all the prop and extensions and build their query
    itemDefinition.getAllPropertyDefinitionsAndExtensions().forEach((pd) => {
        if (!pd.isSearchable()) {
            return;
        }
        sql_1.buildSQLQueryForProperty(pd, args, "", knexBuilder, dictionary);
    });
    // then we ned to add all the includes
    itemDefinition.getAllIncludes().forEach((include) => {
        sql_2.buildSQLQueryForInclude(include, args, knexBuilder, dictionary);
    });
}
exports.buildSQLQueryForItemDefinition = buildSQLQueryForItemDefinition;
