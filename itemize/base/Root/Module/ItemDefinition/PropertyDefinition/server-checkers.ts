/**
 * This file contains the functionality that is required to perform checks
 * in the server side, they are done against the database rather than
 * using fetch requests that ultimately end up running these functions
 *
 * @packageDocumentation
 */

import { PropertyDefinitionSupportedType } from "./types";
import PropertyDefinition from "../PropertyDefinition";
import { CONNECTOR_SQL_COLUMN_FK_NAME } from "../../../../../constants";
import Knex from "knex";
import Autocomplete from "../../../../Autocomplete";

/**
 * The server side index checker checks for unique indexes within properties
 * @param knex the Knex instance
 * @param property the property in question
 * @param value the value of that property as requested to check
 * @param id the slot id
 * @returns a boolean on whether the unique index is valid
 */
export async function serverSideIndexChecker(
  knex: Knex,
  property: PropertyDefinition,
  value: PropertyDefinitionSupportedType,
  id: number,
) {
  // if the value is null then it's valid
  if (value === null) {
    return true;
  }

  // now we need to get the table this property is in
  const moduleIDColumn = property.isExtension() ? "id" : CONNECTOR_SQL_COLUMN_FK_NAME;

  // so the qualified represents the table
  const qualifiedParentName = property.isExtension() ?
    property.getParentModule().getQualifiedPathName() :
    property.getParentItemDefinition().getQualifiedPathName();

  // now the query
  const query = knex.select(
    moduleIDColumn,
  ).from(qualifiedParentName).where(
    property.getPropertyDefinitionDescription().sqlEqual(value, "", property.getId(), knex),
  );

  // if the id is not null, it might be null to do whole check
  // or an id specified so that we exclude that id in the search
  // because it will match, eg. we check for usernames but our own username
  // would match everyt ime
  if (id !== null) {
    query.andWhere(moduleIDColumn, "!=", id);
  }

  // run the query
  const result = await query;

  // return whether we found results
  return !result.length;
}

/**
 * Checks for an autocomplete value as it coming from the given autocomplete
 * @param autocompletes the list of autocompletes from memory
 * @param property the property in question
 * @param value the value to check
 * @param id the slot id, if any
 * @returns a boolean on whether the autocomplete is valid or not
 */
export function serverSideAutocompleteChecker(
  autocompletes: Autocomplete[],
  property: PropertyDefinition,
  value: PropertyDefinitionSupportedType,
  id: number,
) {
  // if the value is null it's valid
  if (value === null) {
    return true;
  }

  // otherwise let's ask the given autocomplete
  const filters = property.getAutocompletePopulatedFiltersFor(id);
  const autocomplete = autocompletes.find((a) => a.getName() === property.getAutocompleteId());

  // if there's no autocomplete, it's invalid
  if (!autocomplete) {
    return false;
  }

  // return whether we found that exact value
  return !!autocomplete.findExactValueFor(value.toString(), filters);
}
