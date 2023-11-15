/**
 * This file contains all the graphql related helper functions that are used in order to
 * retrieve and set the values of properties, it doesn't contain the conversion functions
 * sql.ts does
 *
 * @module
 */

import PropertyDefinition from "../PropertyDefinition";
import { ItemDefinitionIOActions } from "..";
import { RQField } from "../../../rq";

/**
 * Provides all the schema bit that is necessary to include or query
 * this property alone, that is a schema bit
 * @param propertyDefinition the property definition in question
 * @param options.propertiesAsInput if the property should be as an input object, for use within args
 * @param options.optionalForm makes all the properties optional, nullable
 * @param options.prefix a prefix to prefix the fields by, usually the include prefix if exists
 * @returns the partial graphql fields definition for the property
 */
export function getRQDefinitionForProperty(
  propertyDefinition: PropertyDefinition,
  options: {
    optionalForm: boolean,
    prefix: string,
  },
): {[id: string]: RQField} {
  // for documentation purposes
  const englishData = propertyDefinition.getI18nDataFor("en");
  // for the description
  const baseDescription = englishData && englishData.description ||
    englishData && englishData.label ||
    "no description supplied";

  const description = baseDescription + " - " +
    "CREATE ACCESS: " + propertyDefinition.getRolesWithAccessTo(ItemDefinitionIOActions.CREATE).join(", ") + " - " +
    "READ ACCESS: " + propertyDefinition.getRolesWithAccessTo(ItemDefinitionIOActions.READ).join(", ") + " - " +
    "EDIT ACCESS: " + propertyDefinition.getRolesWithAccessTo(ItemDefinitionIOActions.EDIT).join(", ") + " - ";

  const propDescr = propertyDefinition.getPropertyDefinitionDescription();

  // return it
  return {
    [options.prefix + propertyDefinition.getId()]: {
      ...propDescr.rq,
      required: !options.optionalForm,
      description,
    }
  };
}
