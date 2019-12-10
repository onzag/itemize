import { PropertyDefinitionSupportedType } from "./types";
import PropertyDefinition from "../PropertyDefinition";
import { CONNECTOR_SQL_COLUMN_FK_NAME } from "../../../../../constants";
import Knex from "knex";
import Autocomplete from "../../../../Autocomplete";

export async function serverSideIndexChecker(
  knex: Knex,
  property: PropertyDefinition,
  value: PropertyDefinitionSupportedType,
  id: number,
) {
  if (value === null) {
    return true;
  }
  const moduleIDColumn = property.checkIfIsExtension() ? "id" : CONNECTOR_SQL_COLUMN_FK_NAME;
  const qualifiedParentName = property.checkIfIsExtension() ?
    property.getParentModule().getQualifiedPathName() :
    property.getParentItemDefinition().getQualifiedPathName();
  const query = knex.select(
    moduleIDColumn,
  ).from(qualifiedParentName)
  .where(
    property.getPropertyDefinitionDescription().sqlEqual(value, "", property.getId(), knex),
  );
  if (id !== null) {
    query.andWhere(moduleIDColumn, "!=", id);
  }
  const result = await query;
  return !result.length;
}

export function serverSideAutocompleteChecker(
  autocompletes: Autocomplete[],
  property: PropertyDefinition,
  value: PropertyDefinitionSupportedType,
  id: number,
) {
  if (value === null) {
    return true;
  }

  const filters = property.getAutocompletePopulatedFiltersFor(id);
  const autocomplete = autocompletes.find((a) => a.getName() === property.getAutocompleteId());
  if (!autocomplete) {
    return false;
  }

  return !!autocomplete.findExactValueFor(value.toString(), filters);
}
