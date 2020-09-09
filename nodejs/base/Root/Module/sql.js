"use strict";
/**
 * This file contains the sql functionaly that is used within modules in order to perform
 * queries within the module itself as well as to define the parent module table that is
 * to be used in the item definition for properties in common
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const sql_1 = require("./ItemDefinition/PropertyDefinition/sql");
const sql_2 = require("./ItemDefinition/sql");
/**
 * Provides the table that is necesary to include this module and all
 * its children child definitions into it
 * @param knex the knex instance
 * @param mod the module in question
 * @returns a whole table schema for the module table
 */
function getSQLTableDefinitionForModule(knex, mod) {
    // first we need to calculate the initial combined and added indexes
    // these are the indexes that get added to the standard module fields
    // we don't want indexes that won't be used in search so we want to check
    // what the rules are regarding the added indexes in the limiters
    const initialCombinedIndexes = [];
    const initialAddedIndexes = [];
    // so we recieve the limiters from the module itself
    const limiters = mod.getRequestLimiters();
    // now we need to check if we have an AND type limiter, which creates
    // combined indexes
    if (limiters && limiters.condition === "AND") {
        // if the limiter has a created at factor
        if (limiters.since) {
            // we request a combined index on it, created_at goes first
            initialCombinedIndexes.push("created_at");
        }
        // if the limitr has a created_by
        if (limiters.createdBy) {
            initialCombinedIndexes.push("created_by");
        }
        // for the partent that one comes last
        if (limiters.parenting) {
            initialCombinedIndexes.push("parent_id");
            initialCombinedIndexes.push("parent_version");
            initialCombinedIndexes.push("parent_type");
        }
    }
    else if (limiters) {
        // now we add OR type limiters, these are basically
        // independent so the order doesn't really matter that
        // we are adding these
        if (limiters.since) {
            initialAddedIndexes.push("created_at");
        }
        if (limiters.createdBy) {
            initialAddedIndexes.push("created_by");
        }
        if (limiters.parenting) {
            initialAddedIndexes.push("parent_id");
            initialAddedIndexes.push("parent_version");
            initialAddedIndexes.push("parent_type");
        }
    }
    // add all the standard fields
    const resultTableSchema = {
        ...constants_1.RESERVED_BASE_PROPERTIES_SQL(initialCombinedIndexes, initialAddedIndexes),
    };
    // now we loop thru every property (they will all become columns)
    mod.getAllPropExtensions().forEach((pd) => {
        Object.assign(resultTableSchema, sql_1.getSQLTableDefinitionForProperty(knex, null, null, pd));
    });
    // now we need to add indexes to custom rules
    if (limiters && limiters.custom) {
        // if we have a powerful AND limiter
        if (limiters.condition === "AND") {
            // we need to offset to the index that we have currently added
            // these might be zero
            let indexCombinedOffset = initialCombinedIndexes.length;
            // now we loop over the rows we plan to index
            limiters.custom.forEach((propertyId) => {
                // we get the property
                const property = mod.getPropExtensionFor(propertyId);
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
                            id: mod.getQualifiedPathName() + "__" + constants_1.COMBINED_INDEX,
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
                const property = mod.getPropExtensionFor(propertyId);
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
exports.getSQLTableDefinitionForModule = getSQLTableDefinitionForModule;
/**
 * Provides the SQL table schemas that are contained
 * within this module, you expect one schema per item definition
 * it contains
 * @param knex the knex instance
 * @param mod the module in question
 * @returns a partial database schema for the module itself, all the child modules, and the item definition
 */
function getSQLTablesSchemaForModule(knex, mod) {
    // this is where it will be contained
    const resultSchema = {
        [mod.getQualifiedPathName()]: getSQLTableDefinitionForModule(knex, mod),
    };
    mod.getAllModules().forEach((cModule) => {
        // first with child modules
        Object.assign(resultSchema, getSQLTablesSchemaForModule(knex, cModule));
    });
    // then with child item definitions
    mod.getAllChildItemDefinitions().forEach((cIdef) => {
        Object.assign(resultSchema, sql_2.getSQLTablesSchemaForItemDefinition(knex, cIdef));
    });
    return resultSchema;
}
exports.getSQLTablesSchemaForModule = getSQLTablesSchemaForModule;
/**
 * Converts a graphql value, with all its items and everything it
 * has into a SQL row data value for this specific module
 * @param knex the knex instance
 * @param mod the module in question
 * @param data the graphql data
 * @param oldData the old stored value for this module
 * @param uploadsContainer the uploads container from openstack
 * @param uploadsPrefix the uploads prefix of the container
 * @param dictionary the postgresql dictionary
 * @param partialFields fields to make a partial value rather than a total
 * value, note that we don't recommend using partial fields in order to create
 * because some properties might treat nulls in a fancy way, when creating
 * all the table rows should be set, only when updating you should use
 * partial fields; for example, if you have a field that has a property
 * that is nullable but it's forced into some value it will be ignored
 * in a partial field value, don't use partial fields to create
 * @returns the composed row value with the consume streams function
 */
function convertGQLValueToSQLValueForModule(knex, serverData, mod, data, oldData, uploadsContainer, uploadsPrefix, domain, dictionary, partialFields) {
    // first we create the row value
    const result = {};
    const consumeStreamsFns = [];
    mod.getAllPropExtensions().forEach((pd) => {
        // we only add if partialFields allows it, or we don't have
        // partialFields set
        if ((partialFields && typeof partialFields[pd.getId()] !== "undefined") ||
            !partialFields) {
            const addedFieldsByProperty = sql_1.convertGQLValueToSQLValueForProperty(knex, serverData, mod, null, null, pd, data, oldData, uploadsContainer, uploadsPrefix, domain, dictionary);
            Object.assign(result, addedFieldsByProperty.value);
            consumeStreamsFns.push(addedFieldsByProperty.consumeStreams);
        }
    });
    return {
        value: result,
        consumeStreams: async (containerId) => {
            await Promise.all(consumeStreamsFns.map(fn => fn(containerId)));
        }
    };
}
exports.convertGQLValueToSQLValueForModule = convertGQLValueToSQLValueForModule;
/**
 * Converts a SQL value directly coming from the database as it is
 * to a graphql value for this specific module, this
 * only includes prop extensions and standard properties
 * and excludes everything else
 * @param knex the knex instance
 * @param serverData the server data information
 * @param mod the module in question
 * @param row the row value, with all the columns it has; the row
 * can be overblown with other field data, this will extract only the
 * data required for this module
 * @param graphqlFields contains the only properties that are required
 * in the request provided by grapql fields,
 * eg {id: {}, name: {}}
 * @returns a graphql value
 */
function convertSQLValueToGQLValueForModule(knex, serverData, mod, row, graphqlFields) {
    // first we create the graphql result
    const result = {};
    // now we take all the base properties that we have
    // in the graphql model
    Object.keys(constants_1.RESERVED_BASE_PROPERTIES).forEach((basePropertyKey) => {
        result[basePropertyKey] = row[basePropertyKey] || null;
    });
    // we also take all the property definitions we have
    // in this item definitions, and convert them one by one
    // with the row data, this basically also gives graphql value
    // in the key:value format
    mod.getAllPropExtensions().filter((property) => graphqlFields[property.getId()]).forEach((pd) => {
        Object.assign(result, sql_1.convertSQLValueToGQLValueForProperty(knex, serverData, null, null, pd, row));
    });
    return result;
}
exports.convertSQLValueToGQLValueForModule = convertSQLValueToGQLValueForModule;
/**
 * Builds a sql query specific for this module to search
 * within itself in the database
 * @param knex the knex instance
 * @param serverData the server data
 * @param mod the module in question
 * @param args the args for the query from graphql
 * @param knexBuilder the knex builder
 * @param dictionary the dictionary used
 * @param search the search
 * @param orderBy the order by rule
 */
function buildSQLQueryForModule(knex, serverData, mod, args, knexBuilder, dictionary, search, orderBy) {
    const includedInSearchProperties = [];
    const includedInStrSearchProperties = [];
    const addedSelectFields = [];
    mod.getAllPropExtensions().forEach((pd) => {
        if (!pd.isSearchable()) {
            return;
        }
        const isOrderedByIt = !!(orderBy && orderBy[pd.getId()]);
        const wasSearchedBy = sql_1.buildSQLQueryForProperty(knex, serverData, null, null, pd, args, knexBuilder, dictionary, isOrderedByIt);
        if (wasSearchedBy) {
            if (Array.isArray(wasSearchedBy)) {
                addedSelectFields.push(wasSearchedBy);
            }
            includedInSearchProperties.push(pd.getId());
        }
        ;
    });
    if (search) {
        // same doing this twice
        mod.getAllPropExtensions().forEach((pd) => {
            if (!pd.isSearchable()) {
                return;
            }
            const isOrderedByIt = !!(orderBy && orderBy[pd.getId()]);
            const wasStrSearchedBy = sql_1.buildSQLStrSearchQueryForProperty(knex, serverData, null, null, pd, args, search, null, dictionary, isOrderedByIt);
            if (wasStrSearchedBy) {
                if (Array.isArray(wasStrSearchedBy)) {
                    addedSelectFields.push(wasStrSearchedBy);
                }
                includedInStrSearchProperties.push(pd.getId());
            }
            ;
        });
        knexBuilder.andWhere((builder) => {
            mod.getAllPropExtensions().forEach((pd) => {
                if (!pd.isSearchable()) {
                    return;
                }
                const isOrderedByIt = !!(orderBy && orderBy[pd.getId()]);
                builder.orWhere((orBuilder) => {
                    sql_1.buildSQLStrSearchQueryForProperty(knex, serverData, null, null, pd, args, search, orBuilder, dictionary, isOrderedByIt);
                });
            });
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
            if (!mod.hasPropExtensionFor(pSet.property)) {
                sql_1.buildSQLOrderByForInternalRequiredProperty(knex, null, pSet.property, knexBuilder, pSet.direction, pSet.nulls);
                return;
            }
            const pd = mod.getPropExtensionFor(pSet.property);
            const wasIncludedInSearch = includedInSearchProperties.includes(pSet.property);
            const wasIncludedInStrSearch = includedInStrSearchProperties.includes(pSet.property);
            sql_1.buildSQLOrderByForProperty(knex, serverData, null, null, pd, knexBuilder, pSet.direction, pSet.nulls, wasIncludedInSearch, wasIncludedInStrSearch);
        });
    }
    return addedSelectFields;
}
exports.buildSQLQueryForModule = buildSQLQueryForModule;
