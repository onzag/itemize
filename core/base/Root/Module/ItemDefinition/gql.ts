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
} from "../../../../constants";
import ItemDefinition from ".";
import { getGQLFieldsDefinitionForProperty } from "./PropertyDefinition/gql";
import { getGQLFieldsDefinitionForItem } from "./Item/gql";
import { getGQLFieldsDefinitionForModule, getGQLInterfaceForModule } from "../gql";
import { IGQLFieldsDefinitionType, IGraphQLResolversType, IGQLQueryFieldsDefinitionType } from "../../gql";

/**
 * Provides all the graphql fields that this item definition contains as well as its
 * items, but only of this specific item definition and does not include its children item
 * definition, this includes all extended properties
 * @param itemDefinition the item definition in question
 * @param excludeBase whether to exclude the base properties, like created_at, etc..
 * @param propertiesAsInput if the properties should be in input form
 */
export function getGQLFieldsDefinitionForItemDefinition(
  itemDefinition: ItemDefinition,
  excludeBase?: boolean,
  propertiesAsInput?: boolean,
): IGQLFieldsDefinitionType {
  // the fields result in graphql field form
  let fieldsResult: IGQLFieldsDefinitionType =
    getGQLFieldsDefinitionForModule(itemDefinition.getParentModule(), excludeBase, propertiesAsInput);

  // We get all the properties that this item definition contains
  itemDefinition.getAllPropertyDefinitions().forEach((pd) => {
    // we deny adding those whose retrieval is disabled
    if (pd.isRetrievalDisabled()) {
      return;
    }

    // and we add them progressively
    fieldsResult = {
      ...fieldsResult,
      ...getGQLFieldsDefinitionForProperty(pd, propertiesAsInput),
    };
  });

  // We do the same with the items
  itemDefinition.getAllItems().forEach((i) => {
    fieldsResult = {
      ...fieldsResult,
      ...getGQLFieldsDefinitionForItem(i, propertiesAsInput),
    };
  });

  // return that
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
      fields: getGQLFieldsDefinitionForItemDefinition(itemDefinition),
      interfaces: [getGQLInterfaceForModule(itemDefinition.getParentModule())],
    });
  }

  // return that
  return itemDefinition._gqlObj;
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

  const type = getGQLTypeForItemDefinition(itemDefinition);

  // now we add the queries
  let fields: IGQLQueryFieldsDefinitionType = {
    // basic get query to get an item given an id
    [PREFIX_GET + itemDefinition.getQualifiedPathName()]: {
      type,
      args: {
        ...RESERVED_GETTER_PROPERTIES,
      },
      // we just pipe the arguments out of the resolver
      resolve: (source: any, args: any, context: any, info: any) => {
        if (resolvers) {
          return resolvers.getItemDefinition({
            source,
            args,
            context,
            info,
          }, this);
        }
      },
    },
    // now this is the search query
    [PREFIX_SEARCH + itemDefinition.getQualifiedPathName()]: {
      type: GraphQLList(type),
      args: {
        ...RESERVED_SEARCH_PROPERTIES,
        ...getGQLFieldsDefinitionForItemDefinition(searchModeCounterpart, true, true),
      },
      resolve: (source: any, args: any, context: any, info: any) => {
        if (resolvers) {
          return resolvers.searchItemDefinition({
            source,
            args,
            context,
            info,
          }, this);
        }
      },
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

  const type = getGQLTypeForItemDefinition(itemDefinition);

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
        ...getGQLFieldsDefinitionForItemDefinition(itemDefinition, true, true),
      },
      resolve: (source: any, args: any, context: any, info: any) => {
        if (resolvers) {
          return resolvers.addItemDefinition({
            source,
            args,
            context,
            info,
          }, this);
        }
      },
    },
    // The edition uses the standard getter properties to fetch
    // an item definition instance given its id and then
    // uses the same idea of adding in order to modify the data
    // that is in there
    [PREFIX_EDIT + itemDefinition.getQualifiedPathName()]: {
      type,
      args: {
        ...RESERVED_GETTER_PROPERTIES,
        ...getGQLFieldsDefinitionForItemDefinition(itemDefinition, true, true),
      },
      resolve: (source: any, args: any, context: any, info: any) => {
        if (resolvers) {
          return resolvers.editItemDefinition({
            source,
            args,
            context,
            info,
          }, this);
        }
      },
    },
    // The delete uses the standard getter properties to fetch
    // the item definition instance, and basically deletes it
    // instead of retrieving anything, well, it retrieves
    // the deleted element itself
    [PREFIX_DELETE + itemDefinition.getQualifiedPathName()]: {
      type,
      args: RESERVED_GETTER_PROPERTIES,
      resolve: (source: any, args: any, context: any, info: any) => {
        if (resolvers) {
          return resolvers.deleteItemDefinition({
            source,
            args,
            context,
            info,
          }, this);
        }
      },
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
