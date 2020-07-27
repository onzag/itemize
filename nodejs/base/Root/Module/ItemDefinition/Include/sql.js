"use strict";
/**
 * This file contains utility functionality that is necessary in order to
 * setup includes into and out of the postgresql database as well
 * as how to build the definition for the tables
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../../../constants");
const sql_1 = require("../PropertyDefinition/sql");
const Include_1 = require("../Include");
/**
 * Provides the table bit that is necessary to store include data
 * for this include when included from the parent definition
 * @param kenx the current knex instance
 * @param itemDefinition the item definition that contains the include (not the referred)
 * @param include the include in question
 * @returns the partial table definition schema for the include, prefixed and with the exclusion state
 */
function getSQLTableDefinitionForInclude(knex, itemDefinition, include) {
    // the exclusion state needs to be stored in the table bit
    // so we basically need to get a prefix for this item definition
    // this is usually INCLUDE_ the include prefix, and the id of the include
    // eg INCLUDE_wheel, we build a prefix as INCLUDE_wheel_
    const prefix = include.getPrefixedQualifiedIdentifier();
    // the result table schema contains the table definition of all
    // the columns, the first column we add is the exclusion state
    // because the exclusion state uses a suffix it is defined as
    // ITEM_wheel_ + _EXCLUSION_STATE
    let resultTableSchema = {
        [prefix + constants_1.EXCLUSION_STATE_SUFFIX]: {
            type: "string",
            notNull: true,
        },
    };
    // we need all the sinking properties and those are the
    // ones added to the table
    include.getSinkingProperties().forEach((sinkingProperty) => {
        resultTableSchema = {
            ...resultTableSchema,
            ...sql_1.getSQLTableDefinitionForProperty(knex, itemDefinition, include, sinkingProperty),
        };
    });
    // we return the resulting schema
    return resultTableSchema;
}
exports.getSQLTableDefinitionForInclude = getSQLTableDefinitionForInclude;
/**
 * Given a SQL row it converts the value of the data contained
 * within that row into the valid graphql output
 * @param knex the knex instance
 * @param serverData the server data that is currently in use
 * @param include the include in question
 * @param row the row sql data
 * @param graphqlFields (optional) contains the only properties that are required
 * in the request provided by grapql fields,
 * eg {id: {}, name: {}}
 * @returns a partial graphql value
 */
function convertSQLValueToGQLValueForInclude(knex, serverData, itemDefinition, include, row, graphqlFields) {
    // now this is the result, of the graphql parent field because this is
    // an object that contains an object, the item sinking properties
    // are contained within that prefix, for example if the sql is
    // ITEM_wheel__EXCLUSION_STATE, ITEM_wheel_bolt, ITEM_wheel_rubber
    // the output should be
    // ITEM_wheel__EXCLUSION_STATE: ..., ITEM_wheel: {bolt: ... rubber: ...}
    // this gqlParentResult represents what is in ITEM_wheel
    let gqlParentResult = {};
    // for that we need all the sinking properties
    include.getSinkingProperties().filter((property) => !graphqlFields ? true : graphqlFields[property.getId()]).forEach((sinkingProperty) => {
        // and we add them for the row data, notice how we add the prefix
        // telling the property definition that its properties are prefixed in
        // the sql data with ITEM_wheel_
        gqlParentResult = {
            ...gqlParentResult,
            ...sql_1.convertSQLValueToGQLValueForProperty(knex, serverData, itemDefinition, include, sinkingProperty, row),
        };
    });
    // now we return both info, the exclusion state, and the item data
    // prefixed as necessary
    return {
        [include.getQualifiedExclusionStateIdentifier()]: row[include.getQualifiedExclusionStateIdentifier()],
        [include.getQualifiedIdentifier()]: gqlParentResult,
    };
}
exports.convertSQLValueToGQLValueForInclude = convertSQLValueToGQLValueForInclude;
/**
 * Converts a GraphQL value into a SQL row data, it takes apart a complex
 * graphql value and converts it into a serializable sql form
 * @param knex the knex instance
 * @param serverData the server data
 * @param itemDefinition the item definition in question
 * @param include the include in question
 * @param data the graphql data value
 * @param oldData the old graphql data value that used to be stored for that include
 * @param uploadsContainer the uploads container that is used to store data for this
 * include
 * @param uploadsPrefix the prefix of the uploads container that is used to do
 * https requests given a path
 * @param dictionary the dictionary to use in full text search mode
 * @param partialFields fields to make a partial value rather than a total
 * value, note that we don't recommend using partial fields in order to create
 * because some properties might treat nulls in a fancy way, when creating
 * all the table rows should be set, only when updating you should use
 * partial fields; for example, if you have a field that has a property
 * that is nullable but it's forced into some value it will be ignored
 * in a partial field value, don't use partial fields to create
 * @returns the partial sql result to be added into the table
 */
function convertGQLValueToSQLValueForInclude(knex, serverData, itemDefinition, include, data, oldData, uploadsContainer, uploadsPrefix, dictionary, partialFields) {
    // the exclusion state in the graphql information should be included in
    // the root data as ITEM_wheel__EXCLUSION_STATE so we extract it
    const exclusionStateAccordingToGQL = data[include.getQualifiedExclusionStateIdentifier()];
    // we add that data to the sql result
    let result = {
        [include.getQualifiedExclusionStateIdentifier()]: exclusionStateAccordingToGQL,
    };
    const consumeStreamsFns = [];
    // now the information that is specific about the sql value is only
    // necessary if the state is not excluded, excluded means it should be
    // null, even if the info is there, it will be ignored
    if (exclusionStateAccordingToGQL !== Include_1.IncludeExclusionState.EXCLUDED) {
        // so we get the sinking properties
        include.getSinkingProperties().forEach((sinkingProperty) => {
            // partial fields checkup
            if ((partialFields && partialFields[sinkingProperty.getId()]) ||
                !partialFields) {
                // and start adding them, in this case, instead of giving
                // the root data, we are passing the specific item data, remember
                // it will be stored in a place like ITEM_wheel where all the properties
                // are an object within there, we pass that, as all the info should be
                // there, the prefix then represents the fact, we want all the added properties
                // to be prefixed with what we are giving, in this case ITEM_wheel_
                const addedFieldsByProperty = sql_1.convertGQLValueToSQLValueForProperty(knex, serverData, itemDefinition.getParentModule(), itemDefinition, include, sinkingProperty, data[include.getQualifiedIdentifier()], (oldData && oldData[include.getQualifiedIdentifier()]) || null, uploadsContainer, uploadsPrefix, dictionary);
                Object.assign(result, addedFieldsByProperty.value);
                consumeStreamsFns.push(addedFieldsByProperty.consumeStreams);
            }
        });
    }
    // we return that
    return {
        value: result,
        consumeStreams: async (containerId) => {
            await Promise.all(consumeStreamsFns.map(fn => fn(containerId)));
        }
    };
}
exports.convertGQLValueToSQLValueForInclude = convertGQLValueToSQLValueForInclude;
/**
 * Builds a sql query for an include
 * @param knex the knex instance
 * @param serverData the server data information
 * @param itemDefinition the item definition that contains the include
 * @param include the include in question
 * @param args the args as they come from the search module, specific for this item (not nested)
 * @param knexBuilder the knex query builder
 * @param dictionary the dictionary to use to build the search
 */
function buildSQLQueryForInclude(knex, serverData, itemDefinition, include, args, knexBuilder, dictionary) {
    // we need all these prefixes
    const prefix = include.getPrefixedQualifiedIdentifier();
    const exclusionStateQualifiedId = include.getQualifiedExclusionStateIdentifier();
    const expectedExclusionState = args[exclusionStateQualifiedId];
    // if the expected exclusion state is to be excluded
    if (expectedExclusionState === Include_1.IncludeExclusionState.EXCLUDED) {
        // we tell knex that is to be the case
        knexBuilder.andWhere(exclusionStateQualifiedId, Include_1.IncludeExclusionState.EXCLUDED);
    }
    else {
        // otherwise if we are expecting something else like ANY and INCLUDED
        knexBuilder.andWhere((builder) => {
            // we extract a subquery builder
            builder.andWhere((secondBuilder) => {
                // and make a where query for all the properties
                secondBuilder.where(exclusionStateQualifiedId, Include_1.IncludeExclusionState.INCLUDED);
                // get the args for that specific include
                const includeArgs = args[include.getQualifiedIdentifier()];
                // and apply the search for all the sinking properties
                include.getSinkingProperties().forEach((pd) => {
                    if (!pd.isSearchable()) {
                        return;
                    }
                    sql_1.buildSQLQueryForProperty(knex, serverData, itemDefinition, include, pd, includeArgs, secondBuilder, dictionary, false);
                });
            });
            // if we have an specific exclusion state that can be ANY
            if (expectedExclusionState === Include_1.IncludeExclusionState.ANY) {
                // then we add the excluded state to the subquery
                builder.orWhere(prefix + constants_1.EXCLUSION_STATE_SUFFIX, Include_1.IncludeExclusionState.EXCLUDED);
            }
        });
    }
}
exports.buildSQLQueryForInclude = buildSQLQueryForInclude;
