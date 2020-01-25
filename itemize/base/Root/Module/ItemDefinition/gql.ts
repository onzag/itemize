import { GraphQLOutputType, GraphQLObjectType, GraphQLList } from "graphql";
import {
  PREFIX_GET,
  RESERVED_GETTER_PROPERTIES,
  PREFIX_SEARCH,
  RESERVED_SEARCH_PROPERTIES,
  PREFIX_ADD,
  RESERVED_ADD_PROPERTIES,
  PREFIX_EDIT,
  PREFIX_DELETE,
  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
  RESERVED_BASE_PROPERTIES,
  ID_CONTAINER_GQL,
  PREFIX_GET_LIST,
  RESERVED_GETTER_LIST_PROPERTIES,
  POLICY_PREFIXES,
  PREFIX_BUILD,
  RESERVED_CHANGE_PROPERTIES,
} from "../../../../constants";
import ItemDefinition, { ItemDefinitionIOActions } from ".";
import { getGQLFieldsDefinitionForProperty } from "./PropertyDefinition/gql";
import { getGQLFieldsDefinitionForInclude } from "./Include/gql";
import { getGQLFieldsDefinitionForModule } from "../gql";
import { IGQLFieldsDefinitionType, IGraphQLResolversType, IGQLQueryFieldsDefinitionType } from "../../gql";
import { EndpointError } from "../../../errors";

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
 */
export function getGQLFieldsDefinitionForItemDefinition(
  itemDefinition: ItemDefinition,
  options: {
    retrievalMode: boolean,
    excludeBase: boolean,
    propertiesAsInput: boolean,
    optionalForm: boolean,
    includePolicy: string | string[];
  },
): IGQLFieldsDefinitionType {
  // the fields result in graphql field form
  let fieldsResult: IGQLFieldsDefinitionType =
    getGQLFieldsDefinitionForModule(itemDefinition.getParentModule(), options);

  // We get all the properties that this item definition contains
  itemDefinition.getAllPropertyDefinitions().forEach((pd) => {
    // we deny adding those whose retrieval is disabled
    if (pd.isRetrievalDisabled() && options.retrievalMode) {
      return;
    }

    // and we add them progressively
    fieldsResult = {
      ...fieldsResult,
      ...getGQLFieldsDefinitionForProperty(pd, {
        propertiesAsInput: options.propertiesAsInput,
        optionalForm: options.optionalForm,
        prefix: "",
      }),
    };
  });

  // We do the same with the includes
  itemDefinition.getAllIncludes().forEach((i) => {
    fieldsResult = {
      ...fieldsResult,
      ...getGQLFieldsDefinitionForInclude(i, {
        propertiesAsInput: options.propertiesAsInput,
        optionalForm: options.optionalForm,
      }),
    };
  });

  // return that
  if (!options.includePolicy) {
    return fieldsResult;
  } else if (Array.isArray(options.includePolicy)) {
    options.includePolicy.forEach((policyToInclude) => {
      fieldsResult = {
        ...fieldsResult,
        ...getGQLFieldsDefinitionForItemDefinitionPolicies(itemDefinition, {
          propertiesAsInput: options.propertiesAsInput,
          policy: policyToInclude,
        }),
      };
    });
    return fieldsResult;
  } else {
    return {
      ...fieldsResult,
      ...getGQLFieldsDefinitionForItemDefinitionPolicies(itemDefinition, {
        propertiesAsInput: options.propertiesAsInput,
        policy: options.includePolicy,
      }),
    };
  }
}

/**
 * Provides the fields that are required to include policy data for property
 * definitions
 * @param itemDefinition the item definition in question
 * @param options.policy the policy type that should be included, eg "edit", "delete", "read" and "parent"
 * @param options.propertiesAsInput if the properties should be in input form
 */
export function getGQLFieldsDefinitionForItemDefinitionPolicies(
  itemDefinition: ItemDefinition,
  options: {
    policy: string,
    propertiesAsInput: boolean,
  },
): IGQLFieldsDefinitionType {
  // TODO implement parent policy properly according to type
  let fieldsResult: IGQLFieldsDefinitionType = {};
  itemDefinition.getPolicyNamesFor(options.policy).forEach((policyName) => {
    itemDefinition.getPropertiesForPolicy(options.policy, policyName).forEach((pd) => {
      fieldsResult = {
        ...getGQLFieldsDefinitionForProperty(pd, {
          propertiesAsInput: options.propertiesAsInput,
          optionalForm: true,
          prefix: PREFIX_BUILD(POLICY_PREFIXES[options.policy] + policyName),
        }),
      };
    });
  });
  return fieldsResult;
}

/**
 * Provides the graphql type for the given item definition which
 * extends the interface of its parent module already
 * @param itemDefinition the item definition in question
 */
export function getGQLTypeForItemDefinition(itemDefinition: ItemDefinition): GraphQLOutputType {
  // we check if we have an object cached already
  if (!itemDefinition._gqlObj) {
    // we set the object value
    itemDefinition._gqlObj = new GraphQLObjectType({
      name: itemDefinition.getQualifiedPathName(),
      fields: getGQLFieldsDefinitionForItemDefinition(itemDefinition, {
        retrievalMode: true,
        excludeBase: false,
        propertiesAsInput: false,
        optionalForm: false,
        includePolicy: null,
      }),
      description:
        "CREATE ACCESS: " + itemDefinition.getRolesWithAccessTo(ItemDefinitionIOActions.CREATE).join(", ") + " - " +
        "READ ACCESS: " + itemDefinition.getRolesWithAccessTo(ItemDefinitionIOActions.READ).join(", ") + " - " +
        "EDIT ACCESS: " + itemDefinition.getRolesWithAccessTo(ItemDefinitionIOActions.EDIT).join(", ") + " - " +
        "DELETE ACCESS: " + itemDefinition.getRolesWithAccessTo(ItemDefinitionIOActions.DELETE).join(", ") + " - ",
    });
  }

  // return that
  return itemDefinition._gqlObj;
}

/**
 * Provides the query output, that is what a GET_ query provides in an item
 * being so that the DATA attributes are there and the external attributes
 * as well, the non flattened form, this is because of blocked rules
 * @param itemDefinition the item definition in question
 */
export function getGQLQueryOutputForItemDefinition(itemDefinition: ItemDefinition): GraphQLObjectType {
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
    EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((property) => {
      fields[property] = RESERVED_BASE_PROPERTIES[property];
    });

    // now we define the query object
    itemDefinition._gqlQueryObj = new GraphQLObjectType({
      name: itemDefinition.getQualifiedPathName() + "__QUERY_OBJECT",
      fields,
      description:
        "CREATE ACCESS: " + itemDefinition.getRolesWithAccessTo(ItemDefinitionIOActions.CREATE).join(", ") + " - " +
        "READ ACCESS: " + itemDefinition.getRolesWithAccessTo(ItemDefinitionIOActions.READ).join(", ") + " - " +
        "EDIT ACCESS: " + itemDefinition.getRolesWithAccessTo(ItemDefinitionIOActions.EDIT).join(", ") + " - " +
        "DELETE ACCESS: " + itemDefinition.getRolesWithAccessTo(ItemDefinitionIOActions.DELETE).join(", ") + " - ",
    });
  }

  // return the query object
  return itemDefinition._gqlQueryObj;
}

/**
 * A generic function to bind in the
 * server side to resolve in a way that
 * this catches errors
 * @param resolveToUse which resolve to use
 * @param itemDefinition the item definition in question
 * @param resolvers the resolvers object
 * @param source parameter source obtained from graphql
 * @param args obtained from graphql as well
 * @param context same
 * @param info also
 */
async function resolveGenericFunction(
  resolveToUse: string,
  itemDefinition: ItemDefinition,
  resolvers: IGraphQLResolversType,
  source: any,
  args: any,
  context: any,
  info: any,
): Promise<any> {
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
    } catch (err) {
      // if we catch an error, we check
      // if it's an expected error the user should see
      if (err instanceof EndpointError) {
        throw err;
      }
      // otherwise this is an internal server error
      // the user shouldn't receive that
      console.error(err.stack);
      throw new EndpointError({
        message: "Internal Server Error",
        code: "INTERNAL_SERVER_ERROR",
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
 */
export function getGQLQueryFieldsForItemDefinition(
  itemDefinition: ItemDefinition,
  resolvers?: IGraphQLResolversType,
): IGQLQueryFieldsDefinitionType {
  // of course you don't have a graphql query in search mode
  if (itemDefinition.isInSearchMode()) {
    throw new Error("Modules in search mode has no graphql queries");
  }

  // so we use the query output, the one that includes DATA and external fields
  // as the output because that's what we expect
  const type = getGQLQueryOutputForItemDefinition(itemDefinition);

  // now we add the queries
  let fields: IGQLQueryFieldsDefinitionType = {
    // basic get query to get an item given an id
    [PREFIX_GET + itemDefinition.getQualifiedPathName()]: {
      type,
      args: {
        ...RESERVED_GETTER_PROPERTIES,
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

    const listTypeForThisRetrieval = new GraphQLObjectType({
      name: "LIST__" + itemDefinition.getQualifiedPathName(),
      fields: {
        results: {
          type: GraphQLList(type),
        },
      },
      description: "An useless container that graphql requests because graphql doesn't like arrays",
    });

    // for the list we just make a list of our basic externalized output with DATA type
    fields[PREFIX_GET_LIST + itemDefinition.getQualifiedPathName()] = {
      type: listTypeForThisRetrieval,
      args: RESERVED_GETTER_LIST_PROPERTIES,
      resolve: resolveGenericFunction.bind(null, "getItemDefinitionList", itemDefinition, resolvers),
    },
    // now this is the search query, note how we use the search mode counterpart
    // retrieval mode is false, properties are meant to be in input mode for the args,
    // we exclude the base properties, eg. id, type, etc... make all the fields optional,
    // and don't include any policy (there are no policies in search mode anyway)
    fields[PREFIX_SEARCH + itemDefinition.getSearchModeCounterpart().getQualifiedPathName()] = {
      type: ID_CONTAINER_GQL,
      args: {
        ...RESERVED_SEARCH_PROPERTIES,
        ...getGQLFieldsDefinitionForItemDefinition(searchModeCounterpart, {
          retrievalMode: false,
          propertiesAsInput: true,
          excludeBase: true,
          optionalForm: true,
          includePolicy: null,
        }),
      },
      resolve: resolveGenericFunction.bind(null, "searchItemDefinition", itemDefinition, resolvers),
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

/**
 * Provides all the fields for the mutations that are required to take
 * place in order to ADD, EDIT and DELETE item definition values, this
 * also goes through all the children
 * @param itemDefinition the item definition in question
 * @param resolvers the resolvers for the graphql mutations to populate
 */
export function getGQLMutationFieldsForItemDefinition(
  itemDefinition: ItemDefinition,
  resolvers?: IGraphQLResolversType,
): IGQLQueryFieldsDefinitionType {
  // same as before not available in search mode
  if (itemDefinition.isInSearchMode()) {
    throw new Error("Modules in search mode has no graphql mutations");
  }

  // we get the basic type as well
  const type = getGQLQueryOutputForItemDefinition(itemDefinition);

  // now we populate the fields as we need to
  let fields: IGQLQueryFieldsDefinitionType = {
    // the add function works to create a new item definition
    // instance for this specific item definition, so we
    // mix the add properties fields, the parent module fields,
    // excluding the base, and as input, because it's args,
    // and then we get our own fields
    [PREFIX_ADD + itemDefinition.getQualifiedPathName()]: {
      type,
      args: {
        ...RESERVED_ADD_PROPERTIES,
        ...getGQLFieldsDefinitionForItemDefinition(itemDefinition, {
          retrievalMode: false,
          propertiesAsInput: true,
          excludeBase: true,
          optionalForm: true,
          includePolicy: "parent",
        }),
      },
      resolve: resolveGenericFunction.bind(null, "addItemDefinition", itemDefinition, resolvers),
    },
    // The edition uses the standard getter properties to fetch
    // an item definition instance given its id and then
    // uses the same idea of adding in order to modify the data
    // that is in there
    [PREFIX_EDIT + itemDefinition.getQualifiedPathName()]: {
      type,
      args: {
        ...RESERVED_CHANGE_PROPERTIES,
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
    [PREFIX_DELETE + itemDefinition.getQualifiedPathName()]: {
      type,
      args: {
        ...RESERVED_CHANGE_PROPERTIES,
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
