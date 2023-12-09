/**
 * This file contains the graphql utility functions for managing
 * Includes that exist within item definitions, it doesn't contain
 * the conversion function sql.ts does
 *
 * @module
 */

import Include from ".";
import { RQField } from "../../../rq";
import { getRQDefinitionForProperty } from "../PropertyDefinition/rq";

/**
 * Provides the graphql definition that will be required to store
 * this include bit
 * @param include the include
 * @param options.propertiesAsInput if it's in input mode to get
 * graphql input fields instead
 * @param options.optionalForm makes all the field of the include optional
 * so they can be decided
 * @returns a list of field definitions that represent the include in graphql form
 * for use within the graphql description
 */
export function getRQDefinitionForInclude(
  include: Include,
  options: {
    optionalForm: boolean,
    retrievalMode: boolean,
  },
): {[id: string]: RQField} {
  // the exclusion state needs to be stored in the schema bit
  const propertyFields: {[id: string]: RQField} = {};
  // we need all the sinking properties and those are the
  // ones added to the schema bit
  include.getSinkingProperties().forEach((sinkingProperty) => {
    const propRField = getRQDefinitionForProperty(sinkingProperty, {
      ...options,
      prefix: "",
    });
    Object.assign(propertyFields, propRField);
  });

  const description = include.getI18nDataFor("en").name ||
    include.getItemDefinition().getI18nDataFor("en").name;

  // now we add the exclusion state, and the graphql object, depending to
  // what we have
  return {
    [include.getQualifiedExclusionStateIdentifier()]: {
      type: "string",
      required: !options.optionalForm,
      description: description + " - exclusion state",
    },
    [include.getQualifiedIdentifier()]: {
      type: "object",
      required: !options.optionalForm,
      stdFields: propertyFields,
      description,
    },
  };
}
