/**
 * Contains all the graphql functions that are used and generated for and within
 * the module, refer to this file for the graphql generation side of things
 *
 * @packageDocumentation
 */
import { GraphQLObjectType } from "graphql";
import Module from ".";
import { IGQLFieldsDefinitionType, IGraphQLResolversType, IGQLQueryFieldsDefinitionType } from "../gql";
/**
 * Provides the fields definition for the module itself, and for all
 * items inside the module which extend these fields, modules by default
 * contain called base properties, which every element has
 * @param mod the module in question
 * @param options.retrievalMode whether it is in retrieval mode
 * @param options.excludeBase whether to exclude the base properties, like created_at, etc..
 * @param options.propertiesAsInput if the properties should be in input form
 * @param options.optionalForm makes all the parameters optional, that is nullable
 * @returns all the fields definition for the module
 */
export declare function getGQLFieldsDefinitionForModule(mod: Module, options: {
    retrievalMode: boolean;
    excludeBase: boolean;
    propertiesAsInput: boolean;
    optionalForm: boolean;
}): IGQLFieldsDefinitionType;
/**
 * Provides the type for the module
 * that represents this module data
 * @param mod the module in question
 * @returns the module type this module refers to (it is cached)
 */
export declare function getGQLTypeForModule(mod: Module): GraphQLObjectType;
/**
 * Provides the object that represents this module data in
 * its not flattened form with external properties available
 * @param mod the module in question
 */
export declare function getGQLQueryOutputForModule(mod: Module): GraphQLObjectType;
/**
 * Provides the query fields in order to create the query
 * for a given module, the only query fields you have access to
 * for modules are search, modules do not support id searches
 * because they only represent items, but would allow you to perform
 * a whole level search into all the items it contains
 * @param mod the module in question
 * @param resolvers the resolvers that will be used to resolve the query,
 * these are the generic resolvers that are consumed
 * @returns the fields for the main query object to do GET_LIST and SEARCH
 */
export declare function getGQLQueryFieldsForModule(mod: Module, resolvers?: IGraphQLResolversType): IGQLQueryFieldsDefinitionType;
/**
 * Because modules have no mutations, it provides all the mutation
 * fields of the item definitions the module contains
 * @param mod the module in question
 * @param resolvers the resolvers that will be used to resolve the query,
 * these are the generic resolvers that are consumed
 * @returns a query fields definition type for all the sub definitions
 */
export declare function getGQLMutationFieldsForModule(mod: Module, resolvers?: IGraphQLResolversType): IGQLQueryFieldsDefinitionType;
