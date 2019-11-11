import { RESERVED_BASE_PROPERTIES, PREFIX_SEARCH, RESERVED_SEARCH_PROPERTIES } from "../../../constants";
import { GraphQLInterfaceType, GraphQLList } from "graphql";
import Module from ".";
import { getGQLFieldsDefinitionForProperty } from "./ItemDefinition/PropertyDefinition/gql";
import { getGQLQueryFieldsForItemDefinition, getGQLMutationFieldsForItemDefinition } from "./ItemDefinition/gql";
import { IGQLFieldsDefinitionType, IGraphQLResolversType, IGQLQueryFieldsDefinitionType } from "../gql";

/**
 * Provides the fields definition for the module itself, and for all
 * items inside the module which extend these fields, modules by default
 * contain called base properties, which every element has
 * @param mod the module in question
 * @param excludeBase exclude the base properties and only include prop extensions
 * @param propertiesAsInput if the properties must be in input mode
 */
export function getGQLFieldsDefinitionForModule(
  mod: Module,
  excludeBase?: boolean,
  propertiesAsInput?: boolean,
): IGQLFieldsDefinitionType {
  // first create the base considering on whether we exclude or include
  // the base properties
  let resultFieldsSchema: IGQLFieldsDefinitionType = excludeBase ? {} : {
    ...RESERVED_BASE_PROPERTIES,
  };
  // now we get all prop extensions of this module
  mod.getAllPropExtensions().forEach((propExtension) => {
    // and basically get the fields for that property
    resultFieldsSchema = {
      ...resultFieldsSchema,
      ...getGQLFieldsDefinitionForProperty(propExtension, propertiesAsInput),
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
      fields: getGQLFieldsDefinitionForModule(mod),
    });
  }
  // we return it
  return mod._gqlObj;
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

  const gInterface = getGQLInterfaceForModule(mod);

  // now we setup the fields for the query
  let fields: IGQLQueryFieldsDefinitionType = {
    [PREFIX_SEARCH + mod.getQualifiedPathName()]: {
      type: GraphQLList(gInterface),
      args: {
        ...RESERVED_SEARCH_PROPERTIES,
        // as you can realize the arguments exclude the base and make it into input mode
        // that means no RESERVED_BASE_PROPERTIES
        ...getGQLFieldsDefinitionForModule(mod.getSearchModule(), true, true),
      },
      resolve: (source: any, args: any, context: any, info: any) => {
        if (resolvers) {
          return resolvers.searchModule({
            source,
            args,
            context,
            info,
          }, this);
        }
      },
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
    throw new Error("Modules in search mode has no graphql mutations");
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
