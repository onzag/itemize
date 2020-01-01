import Root from ".";
import Module from "./Module";
import ItemDefinition from "./Module/ItemDefinition";
import { GraphQLSchema, GraphQLObjectType, GraphQLOutputType } from "graphql";
import { getGQLQueryFieldsForModule, getGQLMutationFieldsForModule } from "./Module/gql";

export interface IGraphQLIdefResolverArgs {
  source: any;
  args: any;
  context: any;
  info: any;
}

export type FGraphQLIdefResolverType = (
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
) => any;

export type FGraphQLModResolverType = (
  resolverArgs: IGraphQLIdefResolverArgs,
  module: Module,
) => any;

export interface IGraphQLResolversType {
  getItemDefinition: FGraphQLIdefResolverType;
  getItemDefinitionList: FGraphQLIdefResolverType;
  searchItemDefinition: FGraphQLIdefResolverType;
  searchModule: FGraphQLModResolverType;
  getModuleList: FGraphQLModResolverType;
  addItemDefinition: FGraphQLIdefResolverType;
  editItemDefinition: FGraphQLIdefResolverType;
  deleteItemDefinition: FGraphQLIdefResolverType;
}

export interface IGQLSingleQueryFieldDefinitionType {
  type: GraphQLOutputType;
  args: IGQLFieldsDefinitionType;
  resolve: any;
}
export interface IGQLSingleFieldDefinitionType {
  type: GraphQLOutputType;
  description?: string;
}
export interface IGQLQueryFieldsDefinitionType {
  [fieldName: string]: IGQLSingleQueryFieldDefinitionType;
}
export interface IGQLFieldsDefinitionType {
  [fieldName: string]: IGQLSingleFieldDefinitionType;
}

export interface IGQLValue {
  [key: string]: any;
}

/**
 * Retrieves the whole structure of the current loaded instance
 * of the schema into a valid graphql schema
 * @param root the Root of he schema
 * @param customQueries custom queries that are added to the root query
 * @param customMutations custom mutations that are added to the root mutation
 * @param resolvers the resolvers
 */
export function getGQLSchemaForRoot(
  root: Root,
  customQueries: IGQLQueryFieldsDefinitionType,
  customMutations: IGQLQueryFieldsDefinitionType,
  resolvers?: IGraphQLResolversType,
): GraphQLSchema {
  // the mutation fields for the mutation query
  let mutationFields = {};
  // the query fields for the query
  let queryFields = {};

  // now we get all the modules stored on root
  root.getAllModules().forEach((mod) => {
    // and per module we extend the query and mutation fields
    queryFields = {
      ...queryFields,
      ...getGQLQueryFieldsForModule(mod, resolvers),
    };
    mutationFields = {
      ...mutationFields,
      ...getGQLMutationFieldsForModule(mod, resolvers),
    };
  });

  queryFields = {
    ...customQueries,
    ...queryFields,
  };

  mutationFields = {
    ...customMutations,
    ...mutationFields,
  };

  // now we create those queries who happen to be object types
  const query = new GraphQLObjectType({
    name: "ROOT_QUERY",
    fields: queryFields,
    description: "The root query of the application which contains functions for GET and SEARCH",
  });

  // same for mutation they are object types
  const mutation = new GraphQLObjectType({
    name: "ROOT_MUTATIONS",
    fields: mutationFields,
    description: "The root mutation of the application which contains functions for CREATE, EDIT and DELETE",
  });

  // now we return the shchema
  return new GraphQLSchema({
    query,
    mutation,
  });
}
