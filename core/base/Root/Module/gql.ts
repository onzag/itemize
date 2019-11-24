import {
  RESERVED_BASE_PROPERTIES,
  PREFIX_SEARCH,
  RESERVED_SEARCH_PROPERTIES,
  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
  ID_CONTAINER_GQL,
  PREFIX_GET_LIST,
  RESERVED_GETTER_LIST_PROPERTIES,
} from "../../../constants";
import { GraphQLInterfaceType, GraphQLList, GraphQLObjectType } from "graphql";
import Module from ".";
import { getGQLFieldsDefinitionForProperty } from "./ItemDefinition/PropertyDefinition/gql";
import { getGQLQueryFieldsForItemDefinition, getGQLMutationFieldsForItemDefinition } from "./ItemDefinition/gql";
import { IGQLFieldsDefinitionType, IGraphQLResolversType, IGQLQueryFieldsDefinitionType } from "../gql";
import { ItemDefinitionIOActions } from "./ItemDefinition";
import { GraphQLDataInputError } from "../../errors";

/**
 * Provides the fields definition for the module itself, and for all
 * items inside the module which extend these fields, modules by default
 * contain called base properties, which every element has
 * @param mod the module in question
 * @param options.retrievalMode whether it is in retrieval mode
 * @param options.excludeBase whether to exclude the base properties, like created_at, etc..
 * @param options.propertiesAsInput if the properties should be in input form
 * @param options.optionalForm makes all the parameters optional, that is nullable
 */
export function getGQLFieldsDefinitionForModule(
  mod: Module,
  options: {
    retrievalMode: boolean,
    excludeBase: boolean,
    propertiesAsInput: boolean,
    optionalForm: boolean,
  },
): IGQLFieldsDefinitionType {
  // first create the base considering on whether we exclude or include
  // the base properties
  let resultFieldsSchema: IGQLFieldsDefinitionType = options.excludeBase ? {} : {
    ...RESERVED_BASE_PROPERTIES,
  };
  // now we get all prop extensions of this module
  mod.getAllPropExtensions().forEach((propExtension) => {
    if (options.retrievalMode && propExtension.isRetrievalDisabled()) {
      return;
    }
    // and basically get the fields for that property
    resultFieldsSchema = {
      ...resultFieldsSchema,
      ...getGQLFieldsDefinitionForProperty(propExtension, {
        propertiesAsInput: options.propertiesAsInput,
        optionalForm: options.optionalForm,
        prefix: "",
      }),
    };
  });
  // return that
  return resultFieldsSchema;
}

/**
 * Provides the type (for modules an interface)
 * that represents this module data
 * @param mod the module in question
 */
export function getGQLInterfaceForModule(mod: Module): GraphQLInterfaceType {
  // if we don't have already created the module for this
  // instance, we actually reuse, and this is important
  // if we are using this same item in the same schema
  // when calling via the parent
  if (!mod._gqlObj) {
    // we create that object with the data
    mod._gqlObj = new GraphQLInterfaceType({
      name: mod.getQualifiedPathName(),
      fields: getGQLFieldsDefinitionForModule(mod, {
        retrievalMode: true,
        excludeBase: false,
        propertiesAsInput: false,
        optionalForm: false,
      }),
      description: "READ ACCESS: " + mod.getRolesWithAccessTo(ItemDefinitionIOActions.READ).join(", "),
    });
  }
  // we return it
  return mod._gqlObj;
}

export function getGQLQueryOutputForModule(mod: Module): GraphQLObjectType {
  if (!mod._gqlQueryObj) {
    const modInterface = getGQLInterfaceForModule(mod);

    const fields = {
      DATA: {
        type: modInterface,
      },
    };

    EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((property) => {
      fields[property] = RESERVED_BASE_PROPERTIES[property];
    });

    mod._gqlQueryObj = new GraphQLObjectType({
      name: mod.getQualifiedPathName() + "__QUERY_OBJECT",
      fields,
      description: "READ ACCESS: " + mod.getRolesWithAccessTo(ItemDefinitionIOActions.READ).join(", "),
    });
  }

  return mod._gqlQueryObj;
}

async function resolveGenericFunction(
  resolveToUse: string,
  mod: Module,
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
      }, mod);
    } catch (err) {
      if (err instanceof GraphQLDataInputError) {
        throw err;
      }
      console.error(err.stack);
      throw new Error(
        "Internal server error",
      );
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
 */
export function getGQLQueryFieldsForModule(
  mod: Module,
  resolvers?: IGraphQLResolversType,
): IGQLQueryFieldsDefinitionType {
  // This module might be a search module, and search modules are well, not what we use
  // to retrieve fields, they are to define arguments
  if (mod.isInSearchMode()) {
    throw new Error("Modules in search mode has no graphql queries");
  }

  const gOuput = getGQLQueryOutputForModule(mod);

  // now we setup the fields for the query
  let fields: IGQLQueryFieldsDefinitionType = {
    [PREFIX_SEARCH + mod.getQualifiedPathName()]: {
      type: ID_CONTAINER_GQL,
      args: {
        ...RESERVED_SEARCH_PROPERTIES,
        // as you can realize the arguments exclude the base and make it into input mode
        // that means no RESERVED_BASE_PROPERTIES
        ...getGQLFieldsDefinitionForModule(mod.getSearchModule(), {
          retrievalMode: false,
          excludeBase: true,
          propertiesAsInput: true,
          optionalForm: true,
        }),
      },
      resolve: resolveGenericFunction.bind(null, "searchModule", mod),
    },
    [PREFIX_GET_LIST + mod.getQualifiedPathName()]: {
      type: GraphQLList(gOuput),
      args: RESERVED_GETTER_LIST_PROPERTIES,
      resolve: resolveGenericFunction.bind(null, "getModuleList", mod, resolvers),
    },
  };

  // now we get all child definitions and add the query
  // fields for each of them
  mod.getAllChildItemDefinitions().forEach((cIdef) => {
    fields = {
      ...fields,
      ...getGQLQueryFieldsForItemDefinition(cIdef, resolvers),
    };
  });
  return fields;
}

/**
 * Because modules have no mutations, it provides all the mutation
 * fields of the item definitions the module contains
 * @param mod the module in question
 * @param resolvers the resolvers that will be used to resolve the query,
 * these are the generic resolvers that are consumed
 */
export function getGQLMutationFieldsForModule(
  mod: Module,
  resolvers?: IGraphQLResolversType,
): IGQLQueryFieldsDefinitionType {
  if (mod.isInSearchMode()) {
    throw new Error("Modules in search mode don't have graphql mutations");
  }

  // we make the fields, it's empty starting with because
  // the module has no mutations
  let fields: IGQLQueryFieldsDefinitionType = {};
  // now we add the mutations of each one of the children
  mod.getAllChildItemDefinitions().forEach((cIdef) => {
    fields = {
      ...fields,
      ...getGQLMutationFieldsForItemDefinition(cIdef, resolvers),
    };
  });
  return fields;
}