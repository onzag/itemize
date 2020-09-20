"use strict";
/**
 * This file contains the root level graphql functions to be used in order to
 * build all the root level resolvers and all the containing modules, this file
 * exists out of consideration but contains mostly types and the combination
 * of functions
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGQLSchemaForRoot = void 0;
const graphql_1 = require("graphql");
const gql_1 = require("./Module/gql");
/**
 * Retrieves the whole structure of the current loaded instance
 * of the schema into a valid graphql schema
 * @param root the Root of he schema
 * @param customQueries custom queries that are added to the root query
 * @param customMutations custom mutations that are added to the root mutation
 * @param resolvers the resolvers
 * @returns a graphql schema with all the resolvers applied
 */
function getGQLSchemaForRoot(root, customQueries, customMutations, resolvers) {
    // the mutation fields for the mutation query
    let mutationFields = {};
    // the query fields for the query
    let queryFields = {};
    // now we get all the modules stored on root
    root.getAllModules().forEach((mod) => {
        // and per module we extend the query and mutation fields
        queryFields = {
            ...queryFields,
            ...gql_1.getGQLQueryFieldsForModule(mod, resolvers),
        };
        mutationFields = {
            ...mutationFields,
            ...gql_1.getGQLMutationFieldsForModule(mod, resolvers),
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
    const query = new graphql_1.GraphQLObjectType({
        name: "ROOT_QUERY",
        fields: queryFields,
        description: "The root query of the application which contains functions for GET and SEARCH",
    });
    // same for mutation they are object types
    const mutation = new graphql_1.GraphQLObjectType({
        name: "ROOT_MUTATIONS",
        fields: mutationFields,
        description: "The root mutation of the application which contains functions for CREATE, EDIT and DELETE",
    });
    // now we return the shchema
    return new graphql_1.GraphQLSchema({
        query,
        mutation,
    });
}
exports.getGQLSchemaForRoot = getGQLSchemaForRoot;
