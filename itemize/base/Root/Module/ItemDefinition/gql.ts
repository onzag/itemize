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
} from "../../../../constants";
import ItemDefinition, { ItemDefinitionIOActions } from ".";
import { getGQLFieldsDefinitionForProperty } from "./PropertyDefinition/gql";
import { getGQLFieldsDefinitionForItem } from "./Item/gql";
import { getGQLFieldsDefinitionForModule, getGQLInterfaceForModule } from "../gql";
import { IGQLFieldsDefinitionType, IGraphQLResolversType, IGQLQueryFieldsDefinitionType } from "../../gql";
import { GraphQLEndpointError } from "../../../errors";

/**
 * Provides all the graphql fields that this item definition contains as well as its
 * items, but only of this specific item definition and does not include its children item
 * definition, this includes all extended properties
 * @param itemDefinition the item definition in question
 * @param options.retrievalMode whether it is in retrieval mode
 * @param options.excludeBase whether to exclude the base properties, like created_at, etc..
 * @param options.propertiesAsInput if the properties should be in input form
 * @param options.optionalForm makes all the parameters optional, that is nullable
 */
export function getGQLFieldsDefinitionForItemDefinition(
  itemDefinition: ItemDefinition,
  options: {
    retrievalMode: boolean,
    excludeBase: boolean,
    propertiesAsInput: boolean,
    optionalForm: boolean,
    includePolicy: string;
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

  // We do the same with the items
  itemDefinition.getAllItems().forEach((i) => {
    fieldsResult = {
      ...fieldsResult,
      ...getGQLFieldsDefinitionForItem(i, {
        propertiesAsInput: options.propertiesAsInput,
        optionalForm: options.optionalForm,
      }),
    };
  });

  // return that
  if (!options.includePolicy) {
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
 * @param options.propertiesAsInput if the properties should be in input form
 * @param options.optionalForm makes all the parameters optional, that is nullable
 */
export function getGQLFieldsDefinitionForItemDefinitionPolicies(
  itemDefinition: ItemDefinition,
  options: {
    policy: string,
    propertiesAsInput: boolean,
  },
): IGQLFieldsDefinitionType {
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
      interfaces: [getGQLInterfaceForModule(itemDefinition.getParentModule())],
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

export function getGQLQueryOutputForItemDefinition(itemDefinition: ItemDefinition): GraphQLObjectType {
  if (!itemDefinition._gqlQueryObj) {
    const itemDefinitionObj = getGQLTypeForItemDefinition(itemDefinition);

    const fields = {
      DATA: {
        type: itemDefinitionObj,
      },
    };

    EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((property) => {
      fields[property] = RESERVED_BASE_PROPERTIES[property];
    });

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

  return itemDefinition._gqlQueryObj;
}

async function resolveGenericFunction(
  resolveToUse: string,
  itemDefinition: ItemDefinition,
  resolvers: IGraphQLResolversType,
  source: any,
  args: any,
  context: any,
  info: any,
): Promise<any> {
  let value = null;
  if (resolvers) {
    try {
      value = await resolvers[resolveToUse]({
        source,
        args,
        context,
        info,
      }, itemDefinition);
    } catch (err) {
      if (err instanceof GraphQLEndpointError) {
        throw err;
      }
      console.error(err.stack);
      throw new GraphQLEndpointError({
        message: "Internal Server Error",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }
  return value;
}

/**
 * Provides all the query fields for the given item definition, including all
 * the children item definitions that are included within this item definition
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

  // but we need that specific search mode counterpart to populate the arguments
  // for our query
  const searchModeCounterpart = itemDefinition.getSearchModeCounterpart();

  const type = getGQLQueryOutputForItemDefinition(itemDefinition);

  // now we add the queries
  let fields: IGQLQueryFieldsDefinitionType = {
    // basic get query to get an item given an id
    [PREFIX_GET + itemDefinition.getQualifiedPathName()]: {
      type,
      args: {
        ...RESERVED_GETTER_PROPERTIES,
      },
      // we just pipe the arguments out of the resolver
      resolve: resolveGenericFunction.bind(null, "getItemDefinition", itemDefinition, resolvers),
    },
    [PREFIX_GET_LIST + itemDefinition.getQualifiedPathName()]: {
      type: GraphQLList(type),
      args: RESERVED_GETTER_LIST_PROPERTIES,
      resolve: resolveGenericFunction.bind(null, "getItemDefinitionList", itemDefinition, resolvers),
    },
    // now this is the search query
    [PREFIX_SEARCH + itemDefinition.getQualifiedPathName()]: {
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
    },
  };

  // add the child definitions to the queries by adding theirs
  itemDefinition.getChildDefinitions().forEach((cIdef) => {
    fields = {
      ...fields,
      ...getGQLQueryFieldsForItemDefinition(cIdef),
    };
  });

  return fields;
}

/**
 * Provides all the fields for the mutations that are required to take
 * place in order to ADD, EDIT and DELETE item definition values
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
          includePolicy: null,
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
        ...RESERVED_GETTER_PROPERTIES,
        ...getGQLFieldsDefinitionForItemDefinition(itemDefinition, {
          retrievalMode: false,
          propertiesAsInput: true,
          excludeBase: true,
          optionalForm: true,
          includePolicy: "edit",
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
        ...RESERVED_GETTER_PROPERTIES,
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
