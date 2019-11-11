import Root from ".";
import Module from "./Module";
import ItemDefinition from "./Module/ItemDefinition";
import { GraphQLSchema, GraphQLObjectType, GraphQLOutputType } from "graphql";
import { getGQLQueryFieldsForModule, getGQLMutationFieldsForModule } from "./Module/gql";

interface IGraphQLIdefResolverArgs {
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
  searchItemDefinition: FGraphQLIdefResolverType;
  searchModule: FGraphQLModResolverType;
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
 * @param resolvers the resolvers that will resolve the GET, SEARCH, ADD, EDIT and REMOVE requests
 */
export function getGQLSchemaForRoot(root: Root, resolvers?: IGraphQLResolversType): GraphQLSchema {
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
