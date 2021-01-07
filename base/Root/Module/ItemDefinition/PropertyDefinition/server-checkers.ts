/**
 * This file contains the functionality that is required to perform checks
 * in the server side, they are done against the database rather than
 * using fetch requests that ultimately end up running these functions
 *
 * @packageDocumentation
 */

import { PropertyDefinitionSupportedType } from "./types";
import PropertyDefinition from "../PropertyDefinition";
import { CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME } from "../../../../../constants";
import ItemDefinition from "..";
import Include from "../Include";
import { IAppDataType } from "../../../../../server";

/**
 * The server side index checker checks for unique indexes within properties
 * @param knex the Knex instance
 * @param itemDefinition item definition
 * @param include the include where the property resides (or null)
 * @param property the property in question
 * @param value the value of that property as requested to check
 * @param id the slot id
 * @param version the slot version
 * @returns a boolean on whether the unique index is valid
 */
export async function serverSideIndexChecker(
  appData: IAppDataType,
  itemDefinition: ItemDefinition,
  include: Include,
  property: PropertyDefinition,
  value: PropertyDefinitionSupportedType,
  id: string,
  version: string,
) {
  // if the value is null then it's valid
  if (value === null) {
    return true;
  }

  // if we are in search mode we allow the index to be valid
  if (property.getParentItemDefinition().isInSearchMode()) {
    return true;
  }

  // now we need to get the table this property is in
  const moduleIDColumn = property.isExtension() ? "id" : CONNECTOR_SQL_COLUMN_ID_FK_NAME;
  const moduleVersionColumn = property.isExtension() ? "version" : CONNECTOR_SQL_COLUMN_VERSION_FK_NAME;

  // so the qualified represents the table
  const qualifiedParentName = property.isExtension() ?
    property.getParentModule().getQualifiedPathName() :
    property.getParentItemDefinition().getQualifiedPathName();

  // for case insensitive unique checks
  const isCaseInsensitive = property.isNonCaseSensitiveUnique();

  // now the query
  const query = appData.knex.select(
    moduleIDColumn,
    moduleVersionColumn,
  ).from(qualifiedParentName).where(
    property.getPropertyDefinitionDescription().sqlEqual({
      knex: appData.knex,
      serverData: appData.cache.getServerData(),
      value,
      ignoreCase: isCaseInsensitive,
      id: property.getId(),
      include,
      itemDefinition,
      prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
      property,
    }),
  );

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
