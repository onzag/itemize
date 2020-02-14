/**
 * This file contains all the graphql functions that need to be used to request
 * and process an item definition, from the definition to how it must be queried
 *
 * @packageDocumentation
 */
import { GraphQLOutputType, GraphQLObjectType } from "graphql";
import ItemDefinition from ".";
import { IGQLFieldsDefinitionType, IGraphQLResolversType, IGQLQueryFieldsDefinitionType } from "../../gql";
/**
 * Provides all the graphql fields that this item definition contains as well as its
 * includes, but only of this specific item definition and does not include its children item
 * definition, this includes all extended properties
 * @param itemDefinition the item definition in question
 * @param options.retrievalMode whether it is in retrieval mode
 * @param options.excludeBase whether to exclude the base properties, like created_at, etc..
 * @param options.propertiesAsInput if the properties should be in input form
 * @param options.optionalForm makes all the parameters optional, that is nullable
 * @param options.includePolicy whether to include the policies in the result, this is a string
 * that specifies the policy type that is to be included, eg "edit", "delete", "read" and "parent"
 * @returns a fields definition object that represents the whole item definition as it was specified
 */
export declare function getGQLFieldsDefinitionForItemDefinition(itemDefinition: ItemDefinition, options: {
    retrievalMode: boolean;
    excludeBase: boolean;
    propertiesAsInput: boolean;
    optionalForm: boolean;
    includePolicy: string | string[];
}): IGQLFieldsDefinitionType;
/**
 * Provides the fields that are required to include policy data for property
 * definitions
 * @param itemDefinition the item definition in question
 * @param options.policy the policy type that should be included, eg "edit", "delete", "read" and "parent"
 * @param options.propertiesAsInput if the properties should be in input form
 * @returns a partial graphql fields definition that only contains the policies
 */
export declare function getGQLFieldsDefinitionForItemDefinitionPolicies(itemDefinition: ItemDefinition, options: {
    policy: string;
    propertiesAsInput: boolean;
}): IGQLFieldsDefinitionType;
/**
 * Provides the graphql type for the given item definition which
 * extends the interface of its parent module already
 * @param itemDefinition the item definition in question
 * @returns the graphql type that should be used to refer to this item definition, it is always
 * the same as it's cached once it's first retrieved
 */
export declare function getGQLTypeForItemDefinition(itemDefinition: ItemDefinition): GraphQLOutputType;
/**
 * Provides the query output, that is what a GET_ query provides in an item
 * being so that the DATA attributes are there and the external attributes
 * as well, the non flattened form, this is because of blocked rules
 * @param itemDefinition the item definition in question
 * @returns the graphql query object that shows its not flattened form it is always
 * the same as it's flattened
 */
export declare function getGQLQueryOutputForItemDefinition(itemDefinition: ItemDefinition): GraphQLObjectType;
/**
 * Provides all the GET, GET_LIST and SEARCH query fields for the given item definition, including
 * all the search queries of the children item definitions as well
 * @param itemDefinition the item definition that we should retrieve these from
 * @param resolvers the resolvers object that will be used to populate the resolvers
 * of the query fields
 * @returns the fields for the main query object to do GET, GET_LIST and SEARCH
 */
export declare function getGQLQueryFieldsForItemDefinition(itemDefinition: ItemDefinition, resolvers?: IGraphQLResolversType): IGQLQueryFieldsDefinitionType;
/**
 * Provides all the fields for the mutations that are required to take
 * place in order to ADD, EDIT and DELETE item definition values, this
 * also goes through all the children
 * @param itemDefinition the item definition in question
 * @param resolvers the resolvers for the graphql mutations to populate
 * @returns the mutation fields for the mutation object to do ADD, EDIT and DELETE
 */
export declare function getGQLMutationFieldsForItemDefinition(itemDefinition: ItemDefinition, resolvers?: IGraphQLResolversType): IGQLQueryFieldsDefinitionType;
