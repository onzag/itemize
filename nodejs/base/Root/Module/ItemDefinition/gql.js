"use strict";
/**
 * This file contains all the graphql functions that need to be used to request
 * and process an item definition, from the definition to how it must be queried
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const constants_1 = require("../../../../constants");
const _1 = require(".");
const gql_1 = require("./PropertyDefinition/gql");
const gql_2 = require("./Include/gql");
const gql_3 = require("../gql");
const errors_1 = require("../../../errors");
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
function getGQLFieldsDefinitionForItemDefinition(itemDefinition, options) {
    // the fields result in graphql field form
    const fieldsResult = gql_3.getGQLFieldsDefinitionForModule(itemDefinition.getParentModule(), options);
    // We get all the properties that this item definition contains
    itemDefinition.getAllPropertyDefinitions().forEach((pd) => {
        // we deny adding those whose retrieval is disabled
        if (pd.isRetrievalDisabled() && options.retrievalMode) {
            return;
        }
        // and we add them progressively
        Object.assign(fieldsResult, gql_1.getGQLFieldsDefinitionForProperty(pd, {
            propertiesAsInput: options.propertiesAsInput,
            optionalForm: options.optionalForm,
            prefix: "",
        }));
    });
    // We do the same with the includes
    itemDefinition.getAllIncludes().forEach((i) => {
        Object.assign(fieldsResult, gql_2.getGQLFieldsDefinitionForInclude(i, {
            propertiesAsInput: options.propertiesAsInput,
            optionalForm: options.optionalForm,
        }));
    });
    // return that
    if (!options.includePolicy) {
        return fieldsResult;
    }
    else if (Array.isArray(options.includePolicy)) {
        options.includePolicy.forEach((policyToInclude) => {
            Object.assign(fieldsResult, getGQLFieldsDefinitionForItemDefinitionPolicies(itemDefinition, {
                propertiesAsInput: options.propertiesAsInput,
                policy: policyToInclude,
            }));
        });
        return fieldsResult;
    }
    else {
        Object.assign(fieldsResult, getGQLFieldsDefinitionForItemDefinitionPolicies(itemDefinition, {
            propertiesAsInput: options.propertiesAsInput,
            policy: options.includePolicy,
        }));
        return fieldsResult;
    }
}
exports.getGQLFieldsDefinitionForItemDefinition = getGQLFieldsDefinitionForItemDefinition;
/**
 * Provides the fields that are required to include policy data for property
 * definitions
 * @param itemDefinition the item definition in question
 * @param options.policy the policy type that should be included, eg "edit", "delete", "read" and "parent"
 * @param options.propertiesAsInput if the properties should be in input form
 * @returns a partial graphql fields definition that only contains the policies
 */
function getGQLFieldsDefinitionForItemDefinitionPolicies(itemDefinition, options) {
    // building the fields result
    const fieldsResult = {};
    // get all the policy names for it
    itemDefinition.getPolicyNamesFor(options.policy).forEach((policyName) => {
        // get all the properties for that policy
        itemDefinition.getPropertiesForPolicy(options.policy, policyName).forEach((pd) => {
            // and add them
            Object.assign(fieldsResult, gql_1.getGQLFieldsDefinitionForProperty(pd, {
                propertiesAsInput: options.propertiesAsInput,
                optionalForm: true,
                prefix: constants_1.PREFIX_BUILD(constants_1.POLICY_PREFIXES[options.policy] + policyName),
            }));
        });
    });
    return fieldsResult;
}
exports.getGQLFieldsDefinitionForItemDefinitionPolicies = getGQLFieldsDefinitionForItemDefinitionPolicies;
/**
 * Provides the graphql type for the given item definition which
 * extends the interface of its parent module already
 * @param itemDefinition the item definition in question
 * @returns the graphql type that should be used to refer to this item definition, it is always
 * the same as it's cached once it's first retrieved
 */
function getGQLTypeForItemDefinition(itemDefinition) {
    // we check if we have an object cached already
    if (!itemDefinition._gqlObj) {
        // we set the object value
        itemDefinition._gqlObj = new graphql_1.GraphQLObjectType({
            name: itemDefinition.getQualifiedPathName(),
            fields: getGQLFieldsDefinitionForItemDefinition(itemDefinition, {
                retrievalMode: true,
                excludeBase: false,
                propertiesAsInput: false,
                optionalForm: false,
                includePolicy: null,
            }),
            description: "CREATE ACCESS: " + itemDefinition.getRolesWithAccessTo(_1.ItemDefinitionIOActions.CREATE).join(", ") + " - " +
                "READ ACCESS: " + itemDefinition.getRolesWithAccessTo(_1.ItemDefinitionIOActions.READ).join(", ") + " - " +
                "EDIT ACCESS: " + itemDefinition.getRolesWithAccessTo(_1.ItemDefinitionIOActions.EDIT).join(", ") + " - " +
                "DELETE ACCESS: " + itemDefinition.getRolesWithAccessTo(_1.ItemDefinitionIOActions.DELETE).join(", ") + " - ",
        });
    }
    // return that
    return itemDefinition._gqlObj;
}
exports.getGQLTypeForItemDefinition = getGQLTypeForItemDefinition;
/**
 * Provides the query output, that is what a GET_ query provides in an item
 * being so that the DATA attributes are there and the external attributes
 * as well, the non flattened form, this is because of blocked rules
 * @param itemDefinition the item definition in question
 * @returns the graphql query object that shows its not flattened form it is always
 * the same as it's flattened
 */
function getGQLQueryOutputForItemDefinition(itemDefinition) {
    // first we check if we haven't done it before
    if (!itemDefinition._gqlQueryObj) {
        // now we get the type, the basic type
        const itemDefinitionObj = getGQLTypeForItemDefinition(itemDefinition);
        // add the fields
        const fields = {
            DATA: {
                type: itemDefinitionObj,
            },
        };
        // add the externally accessible fields nby hand, using the graphql
        // definition that those externally accessible fields have
        constants_1.EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((property) => {
            fields[property] = constants_1.RESERVED_BASE_PROPERTIES[property];
        });
        // now we define the query object
        itemDefinition._gqlQueryObj = new graphql_1.GraphQLObjectType({
            name: itemDefinition.getQualifiedPathName() + "__QUERY_OBJECT",
            fields,
            description: "CREATE ACCESS: " + itemDefinition.getRolesWithAccessTo(_1.ItemDefinitionIOActions.CREATE).join(", ") + " - " +
                "READ ACCESS: " + itemDefinition.getRolesWithAccessTo(_1.ItemDefinitionIOActions.READ).join(", ") + " - " +
                "EDIT ACCESS: " + itemDefinition.getRolesWithAccessTo(_1.ItemDefinitionIOActions.EDIT).join(", ") + " - " +
                "DELETE ACCESS: " + itemDefinition.getRolesWithAccessTo(_1.ItemDefinitionIOActions.DELETE).join(", ") + " - ",
        });
    }
    // return the query object
    return itemDefinition._gqlQueryObj;
}
exports.getGQLQueryOutputForItemDefinition = getGQLQueryOutputForItemDefinition;
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
async function resolveGenericFunction(resolveToUse, itemDefinition, resolvers, source, args, context, info) {
    // so firstly the value is null
    let value = null;
    // if we have a resolvers
    if (resolvers) {
        // we try to get the value, resolvers
        // are expected to be async functions
        try {
            value = await resolvers[resolveToUse]({
                source,
                args,
                context,
                info,
            }, itemDefinition);
        }
        catch (err) {
            // if we catch an error, we check
            // if it's an expected error the user should see
            if (err instanceof errors_1.EndpointError) {
                throw err;
            }
            // otherwise this is an internal server error
            // the user shouldn't receive that
            console.error(err.stack);
            throw new errors_1.EndpointError({
                message: "Internal Server Error",
                code: constants_1.ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
            });
        }
    }
    // return the value we got
    return value;
}
/**
 * Provides all the GET, GET_LIST and SEARCH query fields for the given item definition, including
 * all the search queries of the children item definitions as well
 * @param itemDefinition the item definition that we should retrieve these from
 * @param resolvers the resolvers object that will be used to populate the resolvers
 * of the query fields
 * @returns the fields for the main query object to do GET, GET_LIST and SEARCH
 */
function getGQLQueryFieldsForItemDefinition(itemDefinition, resolvers) {
    // of course you don't have a graphql query in search mode
    if (itemDefinition.isInSearchMode()) {
        throw new Error("Modules in search mode has no graphql queries");
    }
    // so we use the query output, the one that includes DATA and external fields
    // as the output because that's what we expect
    const type = getGQLQueryOutputForItemDefinition(itemDefinition);
    // now we add the queries
    let fields = {
        // basic get query to get an item given an id and optional version
        [constants_1.PREFIX_GET + itemDefinition.getQualifiedPathName()]: {
            type,
            args: {
                ...constants_1.RESERVED_GETTER_PROPERTIES,
                ...getGQLFieldsDefinitionForItemDefinitionPolicies(itemDefinition, {
                    propertiesAsInput: true,
                    policy: "read",
                }),
            },
            // we just pipe the arguments out of the resolver
            resolve: resolveGenericFunction.bind(null, "getItemDefinition", itemDefinition, resolvers),
        },
    };
    if (itemDefinition.isSearchable()) {
        // but we need that specific search mode counterpart to populate the arguments
        // for our query
        const searchModeCounterpart = itemDefinition.getSearchModeCounterpart();
        const listTypeForThisRetrieval = new graphql_1.GraphQLObjectType({
            name: "LIST__" + itemDefinition.getQualifiedPathName(),
            fields: {
                results: {
                    type: graphql_1.GraphQLList(type),
                },
            },
            description: "An array of results for the result list",
        });
        const listTypeForThisRetrievalWithSearchData = new graphql_1.GraphQLObjectType({
            name: "TLIST__" + itemDefinition.getQualifiedPathName(),
            fields: {
                results: {
                    type: graphql_1.GraphQLList(type),
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
        const orderByRuleFields = {
            created_at: {
                type: constants_1.ORDERBY_RULE,
            },
            edited_at: {
                type: constants_1.ORDERBY_RULE,
            },
        };
        itemDefinition.getAllPropertyDefinitionsAndExtensions().forEach((p) => {
            if (!p.isExtension()) {
                return;
            }
            const description = p.getPropertyDefinitionDescription();
            if (!description.sqlOrderBy) {
                return;
            }
            orderByRuleFields[p.getId()] = {
                type: constants_1.ORDERBY_RULE,
            };
        });
        const orderByRule = new graphql_1.GraphQLInputObjectType({
            name: "ORDERBY_RULE__" + itemDefinition.getQualifiedPathName(),
            fields: orderByRuleFields,
            description: "This object can be ordered by using these rules",
        });
        const searchArgs = {
            ...constants_1.RESERVED_IDEF_SEARCH_PROPERTIES(orderByRule),
            ...getGQLFieldsDefinitionForItemDefinition(searchModeCounterpart, {
                retrievalMode: false,
                propertiesAsInput: true,
                excludeBase: true,
                optionalForm: true,
                includePolicy: null,
            }),
        };
        // for the list we just make a list of our basic externalized output with DATA type
        fields[constants_1.PREFIX_GET_LIST + itemDefinition.getQualifiedPathName()] = {
            type: listTypeForThisRetrieval,
            args: constants_1.RESERVED_GETTER_LIST_PROPERTIES,
            resolve: resolveGenericFunction.bind(null, "getItemDefinitionList", itemDefinition, resolvers),
        },
            // now this is the search query, note how we use the search mode counterpart
            // retrieval mode is false, properties are meant to be in input mode for the args,
            // we exclude the base properties, eg. id, version, type, etc... make all the fields optional,
            // and don't include any policy (there are no policies in search mode anyway)
            fields[constants_1.PREFIX_SEARCH + itemDefinition.getSearchModeCounterpart().getQualifiedPathName()] = {
                type: constants_1.SEARCH_RECORDS_CONTAINER_GQL,
                args: searchArgs,
                resolve: resolveGenericFunction.bind(null, "searchItemDefinition", itemDefinition, resolvers),
            };
        fields[constants_1.PREFIX_TRADITIONAL_SEARCH + itemDefinition.getSearchModeCounterpart().getQualifiedPathName()] = {
            type: listTypeForThisRetrievalWithSearchData,
            args: searchArgs,
            resolve: resolveGenericFunction.bind(null, "searchItemDefinitionTraditional", itemDefinition, resolvers),
        };
    }
    // add the child definitions to the queries by adding theirs
    itemDefinition.getChildDefinitions().forEach((cIdef) => {
        fields = {
            ...fields,
            ...getGQLQueryFieldsForItemDefinition(cIdef),
        };
    });
    // return that
    return fields;
}
exports.getGQLQueryFieldsForItemDefinition = getGQLQueryFieldsForItemDefinition;
/**
 * Provides all the fields for the mutations that are required to take
 * place in order to ADD, EDIT and DELETE item definition values, this
 * also goes through all the children
 * @param itemDefinition the item definition in question
 * @param resolvers the resolvers for the graphql mutations to populate
 * @returns the mutation fields for the mutation object to do ADD, EDIT and DELETE
 */
function getGQLMutationFieldsForItemDefinition(itemDefinition, resolvers) {
    // same as before not available in search mode
    if (itemDefinition.isInSearchMode()) {
        throw new Error("Modules in search mode has no graphql mutations");
    }
    // we get the basic type as well
    const type = getGQLQueryOutputForItemDefinition(itemDefinition);
    // now we populate the fields as we need to
    let fields = {
        // the add function works to create a new item definition
        // instance for this specific item definition, so we
        // mix the add properties fields, the parent module fields,
        // excluding the base, and as input, because it's args,
        // and then we get our own fields
        [constants_1.PREFIX_ADD + itemDefinition.getQualifiedPathName()]: {
            type,
            args: {
                ...constants_1.RESERVED_ADD_PROPERTIES,
                ...getGQLFieldsDefinitionForItemDefinition(itemDefinition, {
                    retrievalMode: false,
                    propertiesAsInput: true,
                    excludeBase: true,
                    optionalForm: false,
                    includePolicy: "parent",
                }),
            },
            resolve: resolveGenericFunction.bind(null, "addItemDefinition", itemDefinition, resolvers),
        },
        // The edition uses the standard getter properties to fetch
        // an item definition instance given its id, version and then
        // uses the same idea of adding in order to modify the data
        // that is in there
        [constants_1.PREFIX_EDIT + itemDefinition.getQualifiedPathName()]: {
            type,
            args: {
                ...constants_1.RESERVED_CHANGE_PROPERTIES,
                ...getGQLFieldsDefinitionForItemDefinition(itemDefinition, {
                    retrievalMode: false,
                    propertiesAsInput: true,
                    excludeBase: true,
                    optionalForm: true,
                    includePolicy: ["edit", "read"],
                }),
            },
            resolve: resolveGenericFunction.bind(null, "editItemDefinition", itemDefinition, resolvers),
        },
        // The delete uses the standard getter properties to fetch
        // the item definition instance, and basically deletes it
        // instead of retrieving anything, well, it retrieves
        // the deleted element itself
        [constants_1.PREFIX_DELETE + itemDefinition.getQualifiedPathName()]: {
            type,
            args: {
                ...constants_1.RESERVED_CHANGE_PROPERTIES,
                ...getGQLFieldsDefinitionForItemDefinitionPolicies(itemDefinition, {
                    propertiesAsInput: true,
                    policy: "delete",
                }),
            },
            resolve: resolveGenericFunction.bind(null, "deleteItemDefinition", itemDefinition, resolvers),
        },
    };
    // we repeat this process for all the item child definitions
    // that are added in here
    itemDefinition.getChildDefinitions().forEach((cIdef) => {
        fields = {
            ...fields,
            ...getGQLMutationFieldsForItemDefinition(cIdef),
        };
    });
    // return that
    return fields;
}
exports.getGQLMutationFieldsForItemDefinition = getGQLMutationFieldsForItemDefinition;
