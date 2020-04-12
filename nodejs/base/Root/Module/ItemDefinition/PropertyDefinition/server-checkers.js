"use strict";
/**
 * This file contains the functionality that is required to perform checks
 * in the server side, they are done against the database rather than
 * using fetch requests that ultimately end up running these functions
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../../../constants");
/**
 * The server side index checker checks for unique indexes within properties
 * @param knex the Knex instance
 * @param property the property in question
 * @param value the value of that property as requested to check
 * @param id the slot id
 * @param version the slot version
 * @returns a boolean on whether the unique index is valid
 */
async function serverSideIndexChecker(knex, property, value, id, version) {
    // if the value is null then it's valid
    if (value === null) {
        return true;
    }
    // now we need to get the table this property is in
    const moduleIDColumn = property.isExtension() ? "id" : constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME;
    const moduleVersionColumn = property.isExtension() ? "version" : constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME;
    // so the qualified represents the table
    const qualifiedParentName = property.isExtension() ?
        property.getParentModule().getQualifiedPathName() :
        property.getParentItemDefinition().getQualifiedPathName();
    // for case insensitive unique checks
    const isCaseInsensitive = property.isNonCaseSensitiveUnique();
    // now the query
    const query = knex.select(moduleIDColumn, moduleVersionColumn).from(qualifiedParentName).where(property.getPropertyDefinitionDescription().sqlEqual(value, "", property.getId(), isCaseInsensitive, knex));
    // if the id is not null, it might be null to do whole check
    // or an id specified so that we exclude that id in the search
    // because it will match, eg. we check for usernames but our own username
    // would match everyt ime
    if (id !== null) {
        query.andWhere(moduleIDColumn, "!=", id);
        query.andWhere(moduleVersionColumn, "!=", version);
    }
    // run the query
    const result = await query;
    // return whether we found results
    return !result.length;
}
exports.serverSideIndexChecker = serverSideIndexChecker;
/**
 * Checks for an autocomplete value as it coming from the given autocomplete
 * @param autocompletes the list of autocompletes from memory
 * @param property the property in question
 * @param value the value to check
 * @param id the slot id, if any
 * @param version the slot version, if any
 * @returns a boolean on whether the autocomplete is valid or not
 */
function serverSideAutocompleteChecker(autocompletes, property, value, id, version) {
    // if the value is null it's valid
    if (value === null) {
        return true;
    }
    // otherwise let's ask the given autocomplete
    const filters = property.getAutocompletePopulatedFiltersFor(id, version);
    const autocomplete = autocompletes.find((a) => a.getName() === property.getAutocompleteId());
    // if there's no autocomplete, it's invalid
    if (!autocomplete) {
        return false;
    }
    // return whether we found that exact value
    return !!autocomplete.findExactValueFor(value.toString(), filters);
}
exports.serverSideAutocompleteChecker = serverSideAutocompleteChecker;
