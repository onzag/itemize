/**
 * This file contains all the graphql related helper functions that are used in order to
 * retrieve and set the values of properties, it doesn't contain the conversion functions
 * sql.ts does
 *
 * @packageDocumentation
 */
import PropertyDefinition from "../PropertyDefinition";
import { IGQLFieldsDefinitionType } from "../../../gql";
/**
 * Provides all the schema bit that is necessary to include or query
 * this property alone, that is a schema bit
 * @param propertyDefinition the property definition in question
 * @param options.propertiesAsInput if the property should be as an input object, for use within args
 * @param options.optionalForm makes all the properties optional, nullable
 * @param options.prefix a prefix to prefix the fields by, usually the include prefix if exists
 * @returns the partial graphql fields definition for the property
 */
export declare function getGQLFieldsDefinitionForProperty(propertyDefinition: PropertyDefinition, options: {
    propertiesAsInput: boolean;
    optionalForm: boolean;
    prefix: string;
}): IGQLFieldsDefinitionType;
