/**
 * This file contains the root level graphql functions to be used in order to
 * build all the root level resolvers and all the containing modules, this file
 * exists out of consideration but contains mostly types and the combination
 * of functions
 *
 * @packageDocumentation
 */
import Root from ".";
import Module from "./Module";
import ItemDefinition from "./Module/ItemDefinition";
import { GraphQLSchema, GraphQLOutputType } from "graphql";
/**
 * This is how we path the resolver args to the function
 * rather than passing four args
 */
export interface IGraphQLIdefResolverArgs {
    source: any;
    args: any;
    context: any;
    info: any;
}
/**
 * This is how a item definition resolver is supposed to
 * be defined
 */
export declare type FGraphQLIdefResolverType = (resolverArgs: IGraphQLIdefResolverArgs, itemDefinition: ItemDefinition) => any;
/**
 * This is how a module resolver is supposed to be defined
 */
export declare type FGraphQLModResolverType = (resolverArgs: IGraphQLIdefResolverArgs, module: Module) => any;
/**
 * This is all the base resolvers we are expecting out off itemize
 */
export interface IGraphQLResolversType {
    getItemDefinition: FGraphQLIdefResolverType;
    getItemDefinitionList: FGraphQLIdefResolverType;
    searchItemDefinition: FGraphQLIdefResolverType;
    searchItemDefinitionTraditional: FGraphQLIdefResolverType;
    searchModule: FGraphQLModResolverType;
    searchModuleTraditional: FGraphQLModResolverType;
    getModuleList: FGraphQLModResolverType;
    addItemDefinition: FGraphQLIdefResolverType;
    editItemDefinition: FGraphQLIdefResolverType;
    deleteItemDefinition: FGraphQLIdefResolverType;
}
/**
 * This is what we expect out of the graphql functions
 * as they suppose to define a single field for types
 * this is what Graphql expects in the Object constructor
 * per field
 */
export interface IGQLSingleFieldDefinitionType {
    type: GraphQLOutputType;
    description?: string;
}
/**
 * This is basically a list of fields in an object
 */
export interface IGQLFieldsDefinitionType {
    [fieldName: string]: IGQLSingleFieldDefinitionType;
}
/**
 * This is what we expect to be defined from one of these gql.ts functions
 * that define an entry point in the query for it to be a graphql query
 */
export interface IGQLSingleQueryFieldDefinitionType {
    type: GraphQLOutputType;
    args: IGQLFieldsDefinitionType;
    resolve: any;
}
/**
 * This is what we expect out off the entire Mutation and Query
 */
export interface IGQLQueryFieldsDefinitionType {
    [fieldName: string]: IGQLSingleQueryFieldDefinitionType;
}
/**
 * Retrieves the whole structure of the current loaded instance
 * of the schema into a valid graphql schema
 * @param root the Root of he schema
 * @param customQueries custom queries that are added to the root query
 * @param customMutations custom mutations that are added to the root mutation
 * @param resolvers the resolvers
 * @returns a graphql schema with all the resolvers applied
 */
export declare function getGQLSchemaForRoot(root: Root, customQueries: IGQLQueryFieldsDefinitionType, customMutations: IGQLQueryFieldsDefinitionType, resolvers?: IGraphQLResolversType): GraphQLSchema;
