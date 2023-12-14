/**
 * This file contains all the rq related helper functions that are used in order to
 * retrieve and set the values of properties, it doesn't contain the conversion functions
 * sql.ts does
 *
 * @module
 */

import PropertyDefinition from "../PropertyDefinition";
import { ItemDefinitionIOActions } from "..";
import { RQField } from "../../../rq";

export function validateRQShape(
  schema: RQField,
  value: any,
  options: {
    ignoreArray?: boolean
  } = {},
): boolean {
  if (
    (
      value === null ||
      typeof value === "undefined"
    )
  ) {
    if (schema.required) {
      return false;
    } else {
      return true;
    }
  }
  if (schema.array && !options.ignoreArray) {
    if (!Array.isArray(value)) {
      return false;
    } else {
      return value.every((v) => validateRQShape(schema, v, { ignoreArray: true }))
    }
  } else {
    switch (schema.type) {
      case "any":
        return true;
      case "binary":
        const isBinary = (value as Promise<any>).then ||
          // or check that the source is a file
          (
            typeof File !== "undefined" &&
            value instanceof File
          ) ||
          // or check that the source is a blob
          (
            typeof Blob !== "undefined" &&
            value instanceof Blob
          );
        return !!isBinary;
      case "boolean":
        return typeof value === "boolean";
      case "integer":
        return typeof value === "number" && Number.isInteger(value);
      case "integer-positive":
        return typeof value === "number" && Number.isInteger(value) && value >= 0;
      case "number":
        return typeof value === "number";
      case "string":
        return typeof value === "string";
      case "object":
        if (typeof value !== "object" || value === null) {
          return false;
        }
        return (schema.stdFields ? Object.keys(schema.stdFields).every((k) => {
          return validateRQShape(schema.stdFields[k], value[k]);
        }) : true) && (schema.ownFields ? Object.keys(schema.ownFields).every((k) => {
          return validateRQShape(schema.ownFields[k], value[k]);
        }) : true);
      default:
        return false;
    }
  }
}

/**
 * Provides all the schema bit that is necessary to include or query
 * this property alone, that is a schema bit
 * @param propertyDefinition the property definition in question
 * @param options.propertiesAsInput if the property should be as an input object, for use within args
 * @param options.optionalForm makes all the properties optional, nullable
 * @param options.prefix a prefix to prefix the fields by, usually the include prefix if exists
 * @returns the partial rq fields definition for the property
 */
export function getRQDefinitionForProperty(
  propertyDefinition: PropertyDefinition,
  options: {
    optionalForm: boolean,
    prefix: string,
    retrievalMode: boolean,
  },
): { [id: string]: RQField } {
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

  if (options.retrievalMode && propDescr.rqRepresentsFile) {
    const descCopy = { ...propDescr.rq };
    if (descCopy.ownFields.src) {
      descCopy.ownFields = { ...descCopy.ownFields };
      delete descCopy.ownFields.src;

      if (Object.keys(descCopy.ownFields).length === 0) {
        delete descCopy.ownFields;
      }
    } else if (descCopy.stdFields.src) {
      descCopy.stdFields = { ...descCopy.stdFields };
      delete descCopy.stdFields.src;

      if (Object.keys(descCopy.stdFields).length === 0) {
        delete descCopy.stdFields;
      }
    }
    // return it
    return {
      [options.prefix + propertyDefinition.getId()]: {
        ...descCopy,
        required: options.optionalForm ? false : !propertyDefinition.isNullable(),
        description,
      }
    };
  } else {
    // return it
    return {
      [options.prefix + propertyDefinition.getId()]: {
        ...propDescr.rq,
        required: options.optionalForm ? false : !propertyDefinition.isNullable(),
        description,
      }
    };
  }
}
