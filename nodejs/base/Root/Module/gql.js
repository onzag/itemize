"use strict";
/**
 * Contains all the graphql functions that are used and generated for and within
 * the module, refer to this file for the graphql generation side of things
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const graphql_1 = require("graphql");
const gql_1 = require("./ItemDefinition/PropertyDefinition/gql");
const gql_2 = require("./ItemDefinition/gql");
const ItemDefinition_1 = require("./ItemDefinition");
const errors_1 = require("../../errors");
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
function getGQLFieldsDefinitionForModule(mod, options) {
    // first create the base considering on whether we exclude or include
    // the base properties
    let resultFieldsSchema = options.excludeBase ? {} : {
        ...constants_1.RESERVED_BASE_PROPERTIES,
    };
    // now we get all prop extensions of this module
    mod.getAllPropExtensions().forEach((propExtension) => {
        if (options.retrievalMode && propExtension.isRetrievalDisabled()) {
            return;
        }
        // and basically get the fields for that property
        resultFieldsSchema = {
            ...resultFieldsSchema,
            ...gql_1.getGQLFieldsDefinitionForProperty(propExtension, {
                propertiesAsInput: options.propertiesAsInput,
                optionalForm: options.optionalForm,
                prefix: "",
            }),
        };
    });
    // return that
    return resultFieldsSchema;
}
exports.getGQLFieldsDefinitionForModule = getGQLFieldsDefinitionForModule;
/**
 * Provides the type for the module
 * that represents this module data
 * @param mod the module in question
 * @returns the module type this module refers to (it is cached)
 */
function getGQLTypeForModule(mod) {
    // if we don't have already created the module for this
    // instance, we actually reuse, and this is important
    // if we are using this same item in the same schema
    // when calling via the parent
    if (!mod._gqlObj) {
        // we create that object with the data
        mod._gqlObj = new graphql_1.GraphQLObjectType({
            name: mod.getQualifiedPathName(),
            fields: getGQLFieldsDefinitionForModule(mod, {
                retrievalMode: true,
                excludeBase: false,
                propertiesAsInput: false,
                optionalForm: false,
            }),
            description: "READ ACCESS: " + mod.getRolesWithAccessTo(ItemDefinition_1.ItemDefinitionIOActions.READ).join(", "),
        });
    }
    // we return it
    return mod._gqlObj;
}
exports.getGQLTypeForModule = getGQLTypeForModule;
/**
 * Provides the object that represents this module data in
 * its not flattened form with external properties available
 * @param mod the module in question
 */
function getGQLQueryOutputForModule(mod) {
    if (!mod._gqlQueryObj) {
        const moduleType = getGQLTypeForModule(mod);
        const fields = {
            DATA: {
                type: moduleType,
            },
        };
        constants_1.EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((property) => {
            fields[property] = constants_1.RESERVED_BASE_PROPERTIES[property];
        });
        mod._gqlQueryObj = new graphql_1.GraphQLObjectType({
            name: mod.getQualifiedPathName() + "__QUERY_OBJECT",
            fields,
            description: "READ ACCESS: " + mod.getRolesWithAccessTo(ItemDefinition_1.ItemDefinitionIOActions.READ).join(", "),
        });
    }
    return mod._gqlQueryObj;
}
exports.getGQLQueryOutputForModule = getGQLQueryOutputForModule;
/**
 * A generic function that is used for the resolver in the
 * graphql endpoint in order to specify which resolve to
 * be used and catch errors, this is what the client
 * actually recieves, all processing should be done here
 * this however only affects the generic processing of these
 * basic resolvers and not the custom ones
 * @param resolveToUse which resolve to use
 * @param itemDefinition the item definition in question
 * @param resolvers the resolvers object
 * @param source parameter source obtained from graphql
 * @param args obtained from graphql as well
 * @param context same
 * @param info also
 * @returns a promise that returns whatever the resolvers return
 */
async function resolveGenericFunction(resolveToUse, mod, resolvers, source, args, context, info) {
    let value = null;
    if (resolvers) {
        try {
            value = await resolvers[resolveToUse]({
                source,
                args,
                context,
                info,
            }, mod);
        }
        catch (err) {
            if (err instanceof errors_1.EndpointError) {
                throw err;
            }
            console.error(err.stack);
            throw new errors_1.EndpointError({
                message: "Internal Server Error",
                code: constants_1.ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
            });
        }
    }
    return value;
}
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
function getGQLQueryFieldsForModule(mod, resolvers) {
    // This module might be a search module, and search modules are well, not what we use
    // to retrieve fields, they are to define arguments
    if (mod.isInSearchMode()) {
        throw new Error("Modules in search mode has no graphql queries");
    }
    const gOuput = getGQLQueryOutputForModule(mod);
    // now we setup the fields for the query
    let fields = {};
    if (mod.isSearchable()) {
        const listTypeForThisRetrieval = new graphql_1.GraphQLObjectType({
            name: "LIST__" + mod.getQualifiedPathName(),
            fields: {
                results: {
                    type: graphql_1.GraphQLList(gOuput),
                },
            },
            description: "An array of results for the result list",
        });
        const listTypeForThisRetrievalWithSearchData = new graphql_1.GraphQLObjectType({
            name: "TLIST__" + mod.getQualifiedPathName(),
            fields: {
                results: {
                    type: graphql_1.GraphQLList(gOuput),
                },
                count: {
                    type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
                },
                limit: {
                    type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
                },
                offset: {
                    type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
                },
            },
            description: "A traditional array of results for the result list with search data",
        });
        const searchArgs = {
            ...constants_1.RESERVED_SEARCH_PROPERTIES,
            // as you can realize the arguments exclude the base and make it into input mode
            // that means no RESERVED_BASE_PROPERTIES
            ...getGQLFieldsDefinitionForModule(mod.getSearchModule(), {
                retrievalMode: false,
                excludeBase: true,
                propertiesAsInput: true,
                optionalForm: true,
            }),
        };
        fields = {
            [constants_1.PREFIX_SEARCH + mod.getSearchModule().getQualifiedPathName()]: {
                type: constants_1.SEARCH_RESULTS_CONTAINER_GQL,
                args: searchArgs,
                resolve: resolveGenericFunction.bind(null, "searchModule", mod, resolvers),
            },
            [constants_1.PREFIX_TRADITIONAL_SEARCH + mod.getSearchModule().getQualifiedPathName()]: {
                type: listTypeForThisRetrievalWithSearchData,
                args: searchArgs,
                resolve: resolveGenericFunction.bind(null, "searchModuleTraditional", mod, resolvers),
            },
            [constants_1.PREFIX_GET_LIST + mod.getQualifiedPathName()]: {
                type: listTypeForThisRetrieval,
                args: constants_1.RESERVED_GETTER_LIST_PROPERTIES,
                resolve: resolveGenericFunction.bind(null, "getModuleList", mod, resolvers),
            },
        };
    }
    // now we get all child definitions and add the query
    // fields for each of them
    mod.getAllChildItemDefinitions().forEach((cIdef) => {
        fields = {
            ...fields,
            ...gql_2.getGQLQueryFieldsForItemDefinition(cIdef, resolvers),
        };
    });
    mod.getAllModules().forEach((cMod) => {
        fields = {
            ...fields,
            ...getGQLQueryFieldsForModule(cMod, resolvers),
        };
    });
    return fields;
}
exports.getGQLQueryFieldsForModule = getGQLQueryFieldsForModule;
/**
 * Because modules have no mutations, it provides all the mutation
 * fields of the item definitions the module contains
 * @param mod the module in question
 * @param resolvers the resolvers that will be used to resolve the query,
 * these are the generic resolvers that are consumed
 * @returns a query fields definition type for all the sub definitions
 */
function getGQLMutationFieldsForModule(mod, resolvers) {
    if (mod.isInSearchMode()) {
        throw new Error("Modules in search mode don't have graphql mutations");
    }
    // we make the fields, it's empty starting with because
    // the module has no mutations
    let fields = {};
    // now we add the mutations of each one of the children
    mod.getAllChildItemDefinitions().forEach((cIdef) => {
        fields = {
            ...fields,
            ...gql_2.getGQLMutationFieldsForItemDefinition(cIdef, resolvers),
        };
    });
    mod.getAllModules().forEach((cMod) => {
        fields = {
            ...fields,
            ...getGQLMutationFieldsForModule(cMod, resolvers),
        };
    });
    return fields;
}
exports.getGQLMutationFieldsForModule = getGQLMutationFieldsForModule;
