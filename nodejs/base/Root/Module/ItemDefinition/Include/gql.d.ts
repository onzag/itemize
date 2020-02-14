/**
 * This file contains the graphql utility functions for managing
 * Includes that exist within item definitions, it doesn't contain
 * the conversion function sql.ts does
 *
 * @packageDocumentation
 */
import Include from ".";
import { IGQLFieldsDefinitionType } from "../../../gql";
/**
 * Provides the graphql definition that will be required to store
 * this include bit
 * @param include the include
 * @param options.propertiesAsInput if it's in input mode to get
 * graphql input fields instead
 * @returns a list of field definitions that represent the include in graphql form
 * for use within the graphql description
 */
export declare function getGQLFieldsDefinitionForInclude(include: Include, options: {
    propertiesAsInput: boolean;
    optionalForm: boolean;
}): IGQLFieldsDefinitionType;
