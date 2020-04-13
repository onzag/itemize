"use strict";
/**
 * Contains SQL helper functions to be used within the property definition in order
 * to be able to perform searches of them in the database
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const search_interfaces_1 = require("./search-interfaces");
const sql_files_1 = require("./sql-files");
const constants_1 = require("../../../../../constants");
/**
 * Provides the sql function that defines the schema that is used to build
 * the partial table definition
 * @param type the postgresql type
 * @param ext a extension to require for this type
 * @returns a function that returns the partial table definition object with the given type
 */
function getStandardSQLFnFor(type, ext = null) {
    // so we return the function
    return (sqlPrefix, id, property) => ({
        // the sql prefix defined plus the id, eg for includes
        [sqlPrefix + id]: {
            // the type is defined
            type,
            // and we add an unique index if this property is deemed unique
            index: property.isUnique() ? {
                type: "unique",
                id: constants_1.SQL_CONSTRAINT_PREFIX + sqlPrefix + id,
                level: 0,
            } : null,
            ext,
        },
    });
}
exports.getStandardSQLFnFor = getStandardSQLFnFor;
/**
 * The standard sql in function that specifies how a property inputs its value
 * into a table
 * @param value the value of the property
 * @param sqlPrefix the sql prefix, eg. for Includes
 * @param id the id of the property
 * @returns the partial row value
 */
function stardardSQLInFn(value, sqlPrefix, id) {
    // as simple as this
    return {
        [sqlPrefix + id]: value,
    };
}
exports.stardardSQLInFn = stardardSQLInFn;
/**
 * The standard sql in function that inputs its value but
 * uses JSON stringify as a serialization tool
 * @param value the value of the property
 * @param sqlPrefix the sql prefix, eg. for Includes
 * @param id the id of the property
 * @returns the partial row value
 */
function stardardSQLInWithJSONStringifyFn(value, sqlPrefix, id) {
    if (value === null) {
        return {
            [sqlPrefix + id]: null,
        };
    }
    return {
        [sqlPrefix + id]: JSON.stringify(value),
    };
}
exports.stardardSQLInWithJSONStringifyFn = stardardSQLInWithJSONStringifyFn;
/**
 * The standard sql out function that defines
 * how a value for a property is extracted from a given
 * row
 * @param row the entire row value
 * @param sqlPrefix the sql prefix eg. for Includes
 * @param id the property id
 * @returns the property value out
 */
function standardSQLOutFn(row, sqlPrefix, id) {
    return row[sqlPrefix + id];
}
exports.standardSQLOutFn = standardSQLOutFn;
/**
 * The standard sql out function that deserializes values
 * as they are expected to be stored serialized
 * @param row the entire row value
 * @param sqlPrefix the sql prefix eg. for Includes
 * @param id the property id
 */
function standardSQLOutWithJSONParseFn(row, sqlPrefix, id) {
    if (row[sqlPrefix + id] === null) {
        return null;
    }
    try {
        return JSON.parse(row[sqlPrefix + id]);
    }
    catch {
        return null;
    }
}
exports.standardSQLOutWithJSONParseFn = standardSQLOutWithJSONParseFn;
/**
 * The standard function that build queries for the property
 * @param args the partial args (if within an include, these are the args within the include)
 * @param sqlPrefix the sql prefix
 * @param id the id of the property
 * @param knexBuilder the query that is being stiched together
 */
function standardSQLSearchFnExactAndRange(args, sqlPrefix, id, knexBuilder) {
    const fromName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.FROM + id;
    const toName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.TO + id;
    const exactName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.EXACT + id;
    if (typeof args[exactName] !== "undefined") {
        knexBuilder.andWhere(sqlPrefix + id, args[exactName]);
    }
    if (typeof args[fromName] !== "undefined" && args[fromName] !== null) {
        knexBuilder.andWhere(sqlPrefix + id, ">=", args[fromName]);
    }
    if (typeof args[toName] !== "undefined" && args[toName] !== null) {
        knexBuilder.andWhere(sqlPrefix + id, "<=", args[toName]);
    }
}
exports.standardSQLSearchFnExactAndRange = standardSQLSearchFnExactAndRange;
/**
 * The standard function that perfoms equality checks within the database
 * @param value the value of the property
 * @param sqlPrefix the sql prefix used
 * @param id the id of the property
 * @param isCaseInsensitive whether the check is done in a case insensitive way
 * @param knex knex itself
 * @param columnName an optional column name to name this equality check as
 * @returns a knex valid search or select query object
 */
function standardSQLEqualFn(value, sqlPrefix, id, isCaseInsensitive, knex, columnName) {
    if (isCaseInsensitive) {
        if (!columnName) {
            return knex.raw("LOWER(??) = LOWER(?)", [
                sqlPrefix + id,
                value,
            ]);
        }
        return knex.raw("LOWER(??) = LOWER(?) AS ??", [
            sqlPrefix + id,
            value,
            columnName,
        ]);
    }
    if (!columnName) {
        return {
            [sqlPrefix + id]: value,
        };
    }
    return knex.raw("?? = ? AS ??", [
        sqlPrefix + id,
        value,
        columnName,
    ]);
}
exports.standardSQLEqualFn = standardSQLEqualFn;
/**
 * Provides the table bit that is necessary to include this property and
 * this property alone, that is a table bit
 * @param propertyDefinition the property definition in question
 * @param prefix a prefix to prefix the table row names, this is
 * used to prefix item specific properties that are sinked in from
 * the parent in the item
 * @returns the partial sql table definition for the property
 */
function getSQLTableDefinitionForProperty(propertyDefinition, prefix) {
    const actualPrefix = prefix ? prefix : "";
    // get the sql def based on the property definition
    const sqlDef = propertyDefinition.getPropertyDefinitionDescription().sql;
    // let's get it based on the function it is
    return sqlDef(actualPrefix, propertyDefinition.getId(), propertyDefinition);
}
exports.getSQLTableDefinitionForProperty = getSQLTableDefinitionForProperty;
/**
 * Takes row data information that is in the SQL form and converts
 * it into a graphql form, only for this specific property
 * @param propertyDefinition the property definition in question
 * @param row the row that we want to extract information from
 * @param prefix the prefix, if the information happens to be prefixed
 * @returns the graphql value for the property
 */
function convertSQLValueToGQLValueForProperty(propertyDefinition, row, prefix) {
    // we get an actual prefix, because it's an optional attribute
    const actualPrefix = prefix ? prefix : "";
    // we get the column name we are supposed to extract the data
    // from, usually properties in sql are stored as their raw id, eg.
    // "distance", "size", etc... but they might be prefixed
    // usually when they happen to be for an item ITEM_wheel_size
    // the prefix is now passed to the sqlOut function
    // now we need to extract the sql data, we try to get a sqlOut
    // function which extracts data from rows for a given property
    const sqlOut = propertyDefinition.getPropertyDefinitionDescription().sqlOut;
    // if the function to extract the data is not defined, this means the value is
    // just a plain value, so we just do a 1:1 extraction
    // we pass the data for the row, with the column name where the data
    // SHOULD be, this might do a complex conversion, like in currency types that
    // need 2 rows to store the field data, the currency, and the value
    // eg. ITEM_wheel_price might become ITEM_wheel_price_CURRENCY and ITEM_wheel_price_VALUE
    // which will in turn once extracted with sqlOut become {currency: ..., value: ...}
    let colValue = sqlOut(row, actualPrefix, propertyDefinition.getId(), this);
    // we check for null coersion, while this shouldn't really
    // happen, because it should have never saved nulls in the
    // database to begin with, we might have such a case where
    // the value is null, for example, after an update, this will
    // ensure coercion keeps on
    if (propertyDefinition.isCoercedIntoDefaultWhenNull() &&
        colValue === null) {
        colValue = propertyDefinition.getDefaultValue();
    }
    // because we are returning from graphql, the information
    // is not prefixed and is rather returned in plain form
    // so the id is all what you get for the property, remember
    // properties are always in its singular name in graphql form
    // the only prefixed things are ITEM_
    // and the properties are into its own object if they
    // happen to be sinking properties
    return {
        [propertyDefinition.getId()]: colValue,
    };
}
exports.convertSQLValueToGQLValueForProperty = convertSQLValueToGQLValueForProperty;
/**
 * Converts a graphql value into a sql value, that is graphql data into row
 * data to be immediately added to the database as it is
 * @param filesContainerId a folder that will contain the files for this item definition
 * @param itemDefinition the item definition in question
 * @param include an include if exist where the property resides
 * @param propertyDefinition the property definition in question
 * @param data the graphql data
 * @param knex the knex instance
 * @param dictionary the dictionary to use in full text search mode
 * @param prefix the prefix, if we need the SQL values to be prefixed, usually
 * used within items, because item properties need to be prefixed
 * @returns a promise with the partial sql row value to be inputted, note
 * that this is a promise because data streams need to be processed
 */
async function convertGQLValueToSQLValueForProperty(filesContainerId, itemDefinition, include, propertyDefinition, data, oldData, knex, dictionary, prefix) {
    // and this is the value of the property, again, properties
    // are not prefixed, they are either in their own object
    // or in the root
    let gqlPropertyValue = data[propertyDefinition.getId()];
    // we treat undefined as null, and set it to default
    // if it is coerced into null
    if (propertyDefinition.isCoercedIntoDefaultWhenNull() &&
        (gqlPropertyValue === null ||
            typeof gqlPropertyValue === "undefined")) {
        gqlPropertyValue = propertyDefinition.getDefaultValue();
    }
    // we also got to set to null any undefined value
    if (typeof gqlPropertyValue === "undefined") {
        gqlPropertyValue = null;
    }
    const description = propertyDefinition.getPropertyDefinitionDescription();
    if (description.gqlAddFileToFields) {
        const oldValue = (oldData && oldData[propertyDefinition.getId()]) || null;
        const newValue = gqlPropertyValue;
        if (description.gqlList) {
            gqlPropertyValue = await sql_files_1.processFileListFor(newValue, oldValue, filesContainerId, itemDefinition, include, propertyDefinition);
        }
        else {
            gqlPropertyValue = await sql_files_1.processSingleFileFor(newValue, oldValue, filesContainerId, itemDefinition, include, propertyDefinition);
        }
    }
    // so we need the sql in function, from the property description
    const sqlIn = propertyDefinition.getPropertyDefinitionDescription().sqlIn;
    // we return as it is
    return sqlIn(gqlPropertyValue, prefix, propertyDefinition.getId(), propertyDefinition, knex, dictionary);
}
exports.convertGQLValueToSQLValueForProperty = convertGQLValueToSQLValueForProperty;
/**
 * Builds a sql search query from a given property definition, the data
 * coming from the search module, a sql prefix to use, and the knex builder
 * @param propertyDefinition the property definition in question
 * @param args the args coming from the search module in such format
 * @param sqlPrefix a sql prefix to append say if we refer to an item
 * @param knexBuilder the knex building instance
 */
function buildSQLQueryForProperty(propertyDefinition, args, sqlPrefix, knexBuilder, dictionary) {
    const sqlSearchFn = propertyDefinition.getPropertyDefinitionDescription().sqlSearch;
    sqlSearchFn(args, sqlPrefix, propertyDefinition.getId(), knexBuilder, dictionary);
}
exports.buildSQLQueryForProperty = buildSQLQueryForProperty;
