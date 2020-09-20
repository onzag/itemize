"use strict";
/**
 * Contains SQL helper functions to be used within the property definition in order
 * to be able to perform searches of them in the database
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSQLOrderByForInternalRequiredProperty = exports.buildSQLOrderByForProperty = exports.buildSQLStrSearchQueryForProperty = exports.buildSQLQueryForProperty = exports.convertGQLValueToSQLValueForProperty = exports.convertSQLValueToGQLValueForProperty = exports.getSQLTableDefinitionForProperty = exports.standardSQLBtreeIndexable = exports.standardSQLEqualFn = exports.standardSQLSearchFnExactAndRange = exports.standardSQLOutWithJSONParseFn = exports.standardSQLOutFn = exports.stardardSQLInWithJSONStringifyFn = exports.stardardSQLInFn = exports.standardSQLOrderBy = exports.getStandardSQLFnFor = void 0;
const search_interfaces_1 = require("../search-interfaces");
const file_management_1 = require("./file-management");
const constants_1 = require("../../../../../../constants");
/**
 * Provides the sql function that defines the schema that is used to build
 * the partial table definition
 * @param type the postgresql type
 * @param ext a extension to require for this type
 * @param indexCalculator an function to decide how to build an index for this type
 * @returns a function that returns the partial table definition object with the given type
 */
function getStandardSQLFnFor(type, ext = null, indexCalculator) {
    // so we return the function
    return (arg) => {
        const subtype = arg.property.getSubtype();
        return {
            // the sql prefix defined plus the id, eg for includes
            [arg.prefix + arg.id]: {
                // the type is defined
                type,
                // and we add an unique index if this property is deemed unique
                index: arg.property.isUnique() ? {
                    type: "unique",
                    id: constants_1.SQL_CONSTRAINT_PREFIX + arg.prefix + arg.id,
                    level: 0,
                } : (indexCalculator ? indexCalculator(subtype, arg.prefix, arg.id) : null),
                ext,
            },
        };
    };
}
exports.getStandardSQLFnFor = getStandardSQLFnFor;
/**
 * the standard order by functionality
 * @param arg the orer by info arg
 * @returns an array of string with the order by
 */
function standardSQLOrderBy(arg) {
    return [arg.prefix + arg.id, arg.direction, arg.nulls];
}
exports.standardSQLOrderBy = standardSQLOrderBy;
/**
 * The standard sql in function that specifies how a property inputs its value
 * into a table
 * @param arg the in arg
 * @returns the partial row value
 */
function stardardSQLInFn(arg) {
    // as simple as this
    return {
        [arg.prefix + arg.id]: arg.value,
    };
}
exports.stardardSQLInFn = stardardSQLInFn;
/**
 * The standard sql in function that inputs its value but
 * uses JSON stringify as a serialization tool
 * @param arg the in arg
 * @returns the partial row value
 */
function stardardSQLInWithJSONStringifyFn(arg) {
    if (arg.value === null) {
        return {
            [arg.prefix + arg.id]: null,
        };
    }
    return {
        [arg.prefix + arg.id]: JSON.stringify(arg.value),
    };
}
exports.stardardSQLInWithJSONStringifyFn = stardardSQLInWithJSONStringifyFn;
/**
 * The standard sql out function that defines
 * how a value for a property is extracted from a given
 * row
 * @param arg the out arg info
 * @returns the property value out
 */
function standardSQLOutFn(arg) {
    return arg.row[arg.prefix + arg.id];
}
exports.standardSQLOutFn = standardSQLOutFn;
/**
 * The standard sql out function that deserializes values
 * as they are expected to be stored serialized
 * @param arg the sql out info arg
 * @returns the supported type json parsed
 */
function standardSQLOutWithJSONParseFn(arg) {
    if (arg.row[arg.prefix + arg.id] === null) {
        return null;
    }
    try {
        return JSON.parse(arg.row[arg.prefix + arg.id]);
    }
    catch {
        return null;
    }
}
exports.standardSQLOutWithJSONParseFn = standardSQLOutWithJSONParseFn;
/**
 * The standard function that build queries for the property
 * @param arg the search info arg
 * @returns a boolean on whether it was searched by it
 */
function standardSQLSearchFnExactAndRange(arg) {
    const fromName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
    const toName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
    const exactName = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;
    let searchedByIt = false;
    if (typeof arg.args[exactName] !== "undefined" && arg.args[exactName] !== null) {
        arg.knexBuilder.andWhere(arg.prefix + arg.id, arg.args[exactName]);
        searchedByIt = true;
    }
    if (typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null) {
        arg.knexBuilder.andWhere(arg.prefix + arg.id, ">=", arg.args[fromName]);
        searchedByIt = true;
    }
    if (typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null) {
        arg.knexBuilder.andWhere(arg.prefix + arg.id, "<=", arg.args[toName]);
        searchedByIt = true;
    }
    return searchedByIt;
}
exports.standardSQLSearchFnExactAndRange = standardSQLSearchFnExactAndRange;
/**
 * The standard function that perfoms equality checks within the database
 * @param arg the equal info arg
 * @returns a knex valid search or select query object
 */
function standardSQLEqualFn(arg) {
    if (arg.ignoreCase && typeof arg.value === "string") {
        return arg.knex.raw("LOWER(??) = ?", [
            arg.prefix + arg.id,
            arg.value.toLowerCase(),
        ]);
    }
    return {
        [arg.prefix + arg.id]: arg.value,
    };
}
exports.standardSQLEqualFn = standardSQLEqualFn;
/**
 * The standard btree indexable column builder
 * @param arg the sql btree indexable arg
 * @returns an array of the columns to index
 */
function standardSQLBtreeIndexable(arg) {
    return [arg.prefix + arg.id];
}
exports.standardSQLBtreeIndexable = standardSQLBtreeIndexable;
/**
 * Provides the table bit that is necessary to include this property and
 * this property alone, that is a table bit
 * @param knex the knex instance
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @returns the partial sql table definition for the property
 */
function getSQLTableDefinitionForProperty(knex, itemDefinition, include, propertyDefinition) {
    // get the sql def based on the property definition
    const sqlDef = propertyDefinition.getPropertyDefinitionDescription().sql;
    // let's get it based on the function it is
    return sqlDef({
        prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
        id: propertyDefinition.getId(),
        property: propertyDefinition,
        knex,
        itemDefinition,
        include,
        // server data unavailable
        serverData: null,
    });
}
exports.getSQLTableDefinitionForProperty = getSQLTableDefinitionForProperty;
/**
 * Takes row data information that is in the SQL form and converts
 * it into a graphql form, only for this specific property
 * @param knex the knex instance
 * @param serverData the server data
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @param row the row that we want to extract information from
 * @returns the graphql value for the property
 */
function convertSQLValueToGQLValueForProperty(knex, serverData, itemDefinition, include, propertyDefinition, row) {
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
    let colValue = sqlOut({
        row,
        prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
        knex,
        serverData,
        itemDefinition,
        include,
        property: propertyDefinition,
        id: propertyDefinition.getId(),
    });
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
 * @param knex the knex instance
 * @param serverData the server data
 * @param mod the module
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @param data the graphql data
 * @param oldData the old graphql data
 * @param uploadsContainer the uploads container that is to be used (to manage files)
 * @param uploadsPrefix the uploads prefix of such container
 * @param dictionary the dictionary to use in full text search mode
 * @returns a composed value with a partial row value and the consume streams functionality
 * included in it
 */
function convertGQLValueToSQLValueForProperty(knex, serverData, mod, itemDefinition, include, propertyDefinition, data, oldData, uploadsContainer, uploadsPrefix, domain, dictionary) {
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
    let consumeStreams;
    const description = propertyDefinition.getPropertyDefinitionDescription();
    if (description.gqlAddFileToFields) {
        const oldValue = (oldData && oldData[propertyDefinition.getId()]) || null;
        const newValue = gqlPropertyValue;
        if (description.gqlList) {
            const processedValue = file_management_1.processFileListFor(newValue, oldValue, uploadsContainer, uploadsPrefix, domain, itemDefinition || mod, include, propertyDefinition);
            gqlPropertyValue = processedValue.value;
            consumeStreams = processedValue.consumeStreams;
        }
        else {
            const processedValue = file_management_1.processSingleFileFor(newValue, oldValue, uploadsContainer, uploadsPrefix, domain, itemDefinition || mod, include, propertyDefinition);
            gqlPropertyValue = processedValue.value;
            consumeStreams = processedValue.consumeStreams;
        }
    }
    else {
        consumeStreams = () => null;
    }
    // so we need the sql in function, from the property description
    const sqlIn = propertyDefinition.getPropertyDefinitionDescription().sqlIn;
    // we return as it is
    return {
        value: sqlIn({
            value: gqlPropertyValue,
            prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
            knex,
            serverData,
            itemDefinition,
            include,
            property: propertyDefinition,
            id: propertyDefinition.getId(),
            dictionary,
        }),
        consumeStreams,
    };
}
exports.convertGQLValueToSQLValueForProperty = convertGQLValueToSQLValueForProperty;
/**
 * Builds a sql search query from a given property definition, the data
 * coming from the search module, a sql prefix to use, and the knex builder
 * @param knex the knex instance
 * @param serverData the server data
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @param args the args coming from the search module in such format
 * @param knexBuilder the knex building instance
 * @param dictionary the dictionary that is being used
 * @param isOrderedByIt whether there will be a subsequent order by request
 */
function buildSQLQueryForProperty(knex, serverData, itemDefinition, include, propertyDefinition, args, knexBuilder, dictionary, isOrderedByIt) {
    const sqlSearchFn = propertyDefinition.getPropertyDefinitionDescription().sqlSearch;
    return sqlSearchFn({
        knex,
        serverData,
        itemDefinition,
        args,
        prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
        id: propertyDefinition.getId(),
        knexBuilder,
        dictionary,
        isOrderedByIt,
        property: propertyDefinition,
    });
}
exports.buildSQLQueryForProperty = buildSQLQueryForProperty;
/**
 * Builds a sql str FTS search query from a given property definition, the data
 * coming from the search module, a sql prefix to use, and the knex builder
 * @param knex the knex instance
 * @param serverData the server data
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @param args the args coming from the search module in such format
 * @param search the search string that is being used
 * @param knexBuilder the knex building instance
 * @param dictionary the dictionary that is being used
 * @param isOrderedByIt whether there will be a subsequent order by request
 */
function buildSQLStrSearchQueryForProperty(knex, serverData, itemDefinition, include, propertyDefinition, args, search, knexBuilder, dictionary, isOrderedByIt) {
    const sqlStrSearchFn = propertyDefinition.getPropertyDefinitionDescription().sqlStrSearch;
    if (sqlStrSearchFn) {
        return sqlStrSearchFn({
            knex,
            serverData,
            itemDefinition,
            search,
            prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
            id: propertyDefinition.getId(),
            knexBuilder,
            dictionary,
            isOrderedByIt,
            property: propertyDefinition,
        });
    }
    return false;
}
exports.buildSQLStrSearchQueryForProperty = buildSQLStrSearchQueryForProperty;
// Just in case to avoid sql injection
// if for some reason the gql security is taken
// remember that the direction variable, and nulls, comes directly
// from the graphql query
const actualDirection = {
    "asc": "ASC",
    "desc": "DESC",
};
const actualNulls = {
    "first": "FIRST",
    "last": "LAST",
};
/**
 * Builds an order by query for a given property
 * @param knex the knex instance
 * @param serverData the server data that is being used
 * @param itemDefinition the item definition in question
 * @param include the include (or null)
 * @param propertyDefinition the property in question
 * @param knexBuilder the knex builder that is currently building the query
 * @param direction the direction to be accounted for
 * @param nulls the nulls (first or last)
 * @param wasIncludedInSearch whether this property was included in search
 * @param wasIncludedInStrSearch whether this property was included in the str FTS search
 */
function buildSQLOrderByForProperty(knex, serverData, itemDefinition, include, propertyDefinition, knexBuilder, direction, nulls, wasIncludedInSearch, wasIncludedInStrSearch) {
    // first we need to check whether there's even a sql order by function
    const sqlOrderByFn = propertyDefinition.getPropertyDefinitionDescription().sqlOrderBy;
    // if we have one
    if (sqlOrderByFn) {
        // we call it
        const result = sqlOrderByFn({
            knex,
            serverData,
            itemDefinition,
            include,
            property: propertyDefinition,
            id: propertyDefinition.getId(),
            prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
            direction,
            nulls,
            wasIncludedInSearch,
            wasIncludedInStrSearch,
        });
        // if we have a result at all
        if (result) {
            // then we add it
            knexBuilder.orderByRaw(`?? ${actualDirection[result[1].toLowerCase()] || "ASC"} NULLS ${actualNulls[result[2].toLowerCase()] || "LAST"}`, [result[0]]);
        }
    }
}
exports.buildSQLOrderByForProperty = buildSQLOrderByForProperty;
/**
 * Builds the order by functionality for the internal properties, such as
 * created_at, edited_at, etc...
 * @param knex the knex instance
 * @param itemDefinition the item definition
 * @param which basically the column name
 * @param knexBuilder the knex builder
 * @param direction the direction of the order by rule
 * @param nulls whether nulls are first or last
 */
function buildSQLOrderByForInternalRequiredProperty(knex, itemDefinition, which, knexBuilder, direction, nulls) {
    // so we call our standard function
    const result = standardSQLOrderBy({
        prefix: "",
        id: which,
        property: null,
        include: null,
        itemDefinition,
        direction,
        nulls,
        wasIncludedInSearch: null,
        wasIncludedInStrSearch: null,
        knex,
        serverData: null,
    });
    // if we have a result, we add it (we should have one, but who knows)
    if (result) {
        knexBuilder.orderByRaw(`?? ${actualDirection[result[1].toLowerCase()] || "ASC"} NULLS ${actualNulls[result[2].toLowerCase()] || "LAST"}`, [result[0]]);
    }
}
exports.buildSQLOrderByForInternalRequiredProperty = buildSQLOrderByForInternalRequiredProperty;
