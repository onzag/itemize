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
 * @param knex a knex instance
 * @param itemDefinition the item definition in question
 * @returns a complete table definition type
 */
function getSQLTableDefinitionForItemDefinition(knex, itemDefinition) {
    // add all the standard fields
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
        Object.assign(resultTableSchema, sql_1.getSQLTableDefinitionForProperty(knex, itemDefinition, null, pd));
    });
    // now we loop over the child items
    itemDefinition.getAllIncludes().forEach((i) => {
        Object.assign(resultTableSchema, sql_2.getSQLTableDefinitionForInclude(knex, itemDefinition, i));
    });
    const limiters = itemDefinition.getRequestLimiters();
    // now we need to add indexes to custom rules
    if (limiters && limiters.custom) {
        // if we have a powerful AND limiter
        if (limiters.condition === "AND") {
            // the combined offset is zero
            let indexCombinedOffset = 0;
            // now we loop over the rows we plan to index
            limiters.custom.forEach((propertyId) => {
                // we get the property
                const property = itemDefinition.getPropertyDefinitionFor(propertyId, true);
                // avoid extensions
                if (property.isExtension()) {
                    return;
                }
                // and the columns that are expected to be added to the combined index
                const columnsToAddLimiter = property.getPropertyDefinitionDescription().sqlBtreeIndexable({
                    knex,
                    serverData: null,
                    id: propertyId,
                    prefix: "",
                    property,
                    itemDefinition: null,
                });
                if (columnsToAddLimiter) {
                    columnsToAddLimiter.forEach((columnName, index) => {
                        resultTableSchema[columnName].index = {
                            id: itemDefinition.getQualifiedPathName() + "__" + constants_1.COMBINED_INDEX,
                            type: "btree",
                            level: indexCombinedOffset + index,
                        };
                    });
                    indexCombinedOffset += columnsToAddLimiter.length;
                }
            });
        }
        else {
            // otherwise if it's an OR we add these custom singular indexes
            limiters.custom.forEach((propertyId) => {
                // we get the property
                const property = itemDefinition.getPropertyDefinitionFor(propertyId, true);
                // avoid extensions
                if (property.isExtension()) {
                    return;
                }
                const columnsToAddLimiter = property.getPropertyDefinitionDescription().sqlBtreeIndexable({
                    knex,
                    serverData: null,
                    id: propertyId,
                    prefix: "",
                    property,
                    itemDefinition: null,
                });
                if (columnsToAddLimiter) {
                    columnsToAddLimiter.forEach((columnName, index) => {
                        resultTableSchema[columnName].index = {
                            id: propertyId + "_CUSTOM_INDEX",
                            type: "btree",
                            level: index,
                        };
                    });
                }
            });
        }
    }
    return resultTableSchema;
}
exports.getSQLTableDefinitionForItemDefinition = getSQLTableDefinitionForItemDefinition;
/**
 * Provides all the schema of all the items, self and its children
 * that are included within this item definition and all the table names
 * that should be used using the qualified name
 * @param knex the knex instance
 * @param itemDefinition the item definition in question
 * @returns a partial sql schema definition for the whole database (adds tables)
 */
function getSQLTablesSchemaForItemDefinition(knex, itemDefinition) {
    // we add self
    const result = {
        [itemDefinition.getQualifiedPathName()]: getSQLTableDefinitionForItemDefinition(knex, itemDefinition),
    };
    // loop over the children and add each one of them and whatever they have
    itemDefinition.getChildDefinitions().forEach((cIdef) => {
        Object.assign(result, getSQLTablesSchemaForItemDefinition(knex, cIdef));
    });
    // return that
    return result;
}
exports.getSQLTablesSchemaForItemDefinition = getSQLTablesSchemaForItemDefinition;
/**
 * Converts a SQL value directly coming from the database as it is
 * to a graphql value for this specific item definition,
 * this includes the prop extensions and the reserved base properties
 * This value is FLATTENED
 * @param knex the knex instance
 * @param serverData the server data we are working with
 * @param itemDefinition the item definition in question
 * @param row the row value, with all the columns it has; the row
 * can be overblown with other field data, this will extract only the
 * data required for this item definition
 * @param graphqlFields contains the only properties that are required
 * in the request provided by grapql fields,
 * eg {id: {}, name: {}, ITEM_kitten: {purrs: {}}}
 * @returns a graphql value
 */
function convertSQLValueToGQLValueForItemDefinition(knex, serverData, itemDefinition, row, graphqlFields) {
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
        Object.assign(result, sql_1.convertSQLValueToGQLValueForProperty(knex, serverData, itemDefinition, null, pd, row));
    });
    // now we do the same for the items
    itemDefinition.getAllIncludes().filter((include) => !graphqlFields ? true : graphqlFields[include.getQualifiedIdentifier()]).forEach((include) => {
        Object.assign(result, sql_2.convertSQLValueToGQLValueForInclude(knex, serverData, itemDefinition, include, row, !graphqlFields ? null : graphqlFields[include.getQualifiedIdentifier()]));
    });
    return result;
}
exports.convertSQLValueToGQLValueForItemDefinition = convertSQLValueToGQLValueForItemDefinition;
/**
 * Converts a graphql value, with all its items and everything it
 * has into a SQL row data value for this specific item definition
 * it doesn't include its prop extensions
 * @param knex the knex instance
 * @param serverData the server data
 * @param itemDefinition the item definition in question
 * @param data the graphql data
 * @param knex the knex instance
 * @param uploadsContainer the uploads container from openstack
 * @param uploadsPrefix the uploads prefix of the container
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
function convertGQLValueToSQLValueForItemDefinition(knex, serverData, itemDefinition, data, oldData, uploadsContainer, uploadsPrefix, dictionary, partialFields) {
    // first we create the row value
    const result = {};
    const consumeStreamsFns = [];
    itemDefinition.getAllPropertyDefinitions().forEach((pd) => {
        // we only add if partialFields allows it, or we don't have
        // partialFields set
        if ((partialFields && typeof partialFields[pd.getId()] !== "undefined") ||
            !partialFields) {
            const addedFieldsByProperty = sql_1.convertGQLValueToSQLValueForProperty(knex, serverData, itemDefinition.getParentModule(), itemDefinition, null, pd, data, oldData, uploadsContainer, uploadsPrefix, dictionary);
            Object.assign(result, addedFieldsByProperty.value);
            consumeStreamsFns.push(addedFieldsByProperty.consumeStreams);
        }
    });
    // also with the items
    itemDefinition.getAllIncludes().forEach((include) => {
        // we only add if partialFields allows it, or we don't have
        // partialFields set
        const includeNameInPartialFields = include.getQualifiedIdentifier();
        if ((partialFields && typeof partialFields[includeNameInPartialFields] !== "undefined") ||
            !partialFields) {
            const innerPartialFields = !partialFields ? null : partialFields[includeNameInPartialFields];
            const addedFieldsByInclude = sql_2.convertGQLValueToSQLValueForInclude(knex, serverData, itemDefinition, include, data, oldData, uploadsContainer, uploadsPrefix, dictionary, innerPartialFields);
            Object.assign(result, addedFieldsByInclude.value);
            consumeStreamsFns.push(addedFieldsByInclude.consumeStreams);
        }
    });
    return {
        value: result,
        consumeStreams: async (containerId) => {
            await Promise.all(consumeStreamsFns.map(fn => fn(containerId)));
        }
    };
}
exports.convertGQLValueToSQLValueForItemDefinition = convertGQLValueToSQLValueForItemDefinition;
/**
 * Builds a sql query for an item definition so that it can be
 * queried for searches
 * @param knex the knex instance
 * @param serverData the server data
 * @param itemDefinition the item definition that is being requested (normal form)
 * @param args the args from the search mode
 * @param knexBuilder the knex builder instance
 * @param dictionary the dictionary being used
 * @param search the search arg value
 * @param orderBy the order by rules
 */
function buildSQLQueryForItemDefinition(knex, serverData, itemDefinition, args, knexBuilder, dictionary, search, orderBy) {
    const includedInSearchProperties = [];
    const includedInStrSearchProperties = [];
    const addedSelectFields = [];
    // first we need to get all the prop and extensions and build their query
    itemDefinition.getAllPropertyDefinitionsAndExtensions().forEach((pd) => {
        if (!pd.isSearchable()) {
            return;
        }
        const isOrderedByIt = !!(orderBy && orderBy[pd.getId()]);
        const wasSearchedBy = sql_1.buildSQLQueryForProperty(knex, serverData, itemDefinition, null, pd, args, knexBuilder, dictionary, isOrderedByIt);
        if (wasSearchedBy) {
            if (Array.isArray(wasSearchedBy)) {
                addedSelectFields.push(wasSearchedBy);
            }
            includedInSearchProperties.push(pd.getId());
        }
        ;
    });
    // then we ned to add all the includes
    itemDefinition.getAllIncludes().forEach((include) => {
        sql_2.buildSQLQueryForInclude(knex, serverData, itemDefinition, include, args, knexBuilder, dictionary);
    });
    if (search) {
        // for technical reasons we need to do this twice and use a fake builder
        // just to know if it needs extra fields
        itemDefinition.getAllPropertyDefinitionsAndExtensions().forEach((pd) => {
            if (!pd.isSearchable()) {
                return;
            }
            const isOrderedByIt = !!(orderBy && orderBy[pd.getId()]);
            const wasStrSearchedBy = sql_1.buildSQLStrSearchQueryForProperty(knex, serverData, itemDefinition, null, pd, args, search, null, // note knex builder being null
            dictionary, isOrderedByIt);
            if (wasStrSearchedBy) {
                if (Array.isArray(wasStrSearchedBy)) {
                    addedSelectFields.push(wasStrSearchedBy);
                }
                includedInStrSearchProperties.push(pd.getId());
            }
            ;
        });
        // because these don't happen in the main, they don't get immediately executed but rather
        // during the await time
        knexBuilder.andWhere((builder) => {
            itemDefinition.getAllPropertyDefinitionsAndExtensions().forEach((pd) => {
                if (!pd.isSearchable()) {
                    return;
                }
                const isOrderedByIt = !!(orderBy && orderBy[pd.getId()]);
                builder.orWhere((orBuilder) => {
                    sql_1.buildSQLStrSearchQueryForProperty(knex, serverData, itemDefinition, null, pd, args, search, orBuilder, dictionary, isOrderedByIt);
                });
            });
            //TODO add includes in the search
        });
    }
    if (orderBy) {
        const orderBySorted = Object.keys(orderBy).map((orderByProperty) => {
            return {
                property: orderByProperty,
                priority: orderBy[orderByProperty].priority,
                nulls: orderBy[orderByProperty].nulls,
                direction: orderBy[orderByProperty].direction,
            };
        }).sort((a, b) => a.priority - b.priority);
        orderBySorted.forEach((pSet) => {
            if (!itemDefinition.hasPropertyDefinitionFor(pSet.property, true)) {
                sql_1.buildSQLOrderByForInternalRequiredProperty(knex, itemDefinition, pSet.property, knexBuilder, pSet.direction, pSet.nulls);
                return;
            }
            const pd = itemDefinition.getPropertyDefinitionFor(pSet.property, true);
            const wasIncludedInSearch = includedInSearchProperties.includes(pSet.property);
            const wasIncludedInStrSearch = includedInStrSearchProperties.includes(pSet.property);
            sql_1.buildSQLOrderByForProperty(knex, serverData, itemDefinition, null, pd, knexBuilder, pSet.direction, pSet.nulls, wasIncludedInSearch, wasIncludedInStrSearch);
        });
    }
    return addedSelectFields;
}
exports.buildSQLQueryForItemDefinition = buildSQLQueryForItemDefinition;
