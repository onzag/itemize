import { PREFIX_BUILD, ITEM_PREFIX, EXCLUSION_STATE_SUFFIX, PREFIXED_CONCAT } from "../../../../../constants";
import { GraphQLString, GraphQLNonNull, GraphQLInputObjectType, GraphQLObjectType } from "graphql";
import {
  getGQLFieldsDefinitionForProperty,
} from "../PropertyDefinition/gql";
import Item from "../Item";
import { IGQLFieldsDefinitionType } from "../../../gql";

/**
 * Provides the graphql definition that will be required to store
 * this item bit
 * @param propertiesAsInput if it's in input mode to get
 * graphql input fields instead
 */
export function getGQLFieldsDefinitionForItem(item: Item, propertiesAsInput?: boolean): IGQLFieldsDefinitionType {
  // the exclusion state needs to be stored in the schema bit
  let itemFields = {};
  // we need all the sinking properties and those are the
  // ones added to the schema bit
  item.getSinkingProperties().forEach((sinkingProperty) => {
    itemFields = {
      ...itemFields,
      ...getGQLFieldsDefinitionForProperty(sinkingProperty, propertiesAsInput),
    };
  });

  // if we are in the input mode
  // we need to check out the element we have created
  // for the fields both for input and output, as the object
  // itself is just an input type because an item can be whole
  // null
  if (
    (propertiesAsInput && !item._gqlInObj) ||
    (!propertiesAsInput && !item._gqlOutObj)
  ) {
    // we need to create it depending on the rule
    // whether output or input, we create a GQL name
    // just for this functionality that doesn't collide
    // and is specific for this item instance
    const itemGQLName = PREFIXED_CONCAT(
      item.getItemDefinition().getQualifiedPathName(),
      ITEM_PREFIX + item.getId(),
    );

    // and depending if it's in or out
    if (propertiesAsInput) {
      item._gqlInObj = new GraphQLInputObjectType({
        name: itemGQLName + "_In",
        fields: itemFields,
      });
    } else {
      item._gqlOutObj = new GraphQLObjectType({
        name: itemGQLName + "_Out",
        fields: itemFields,
      });
    }
  }

  const description = item.getI18nDataFor("en").name ||
    item.getItemDefinition().getI18nDataFor("en").name;

  // now we add the exclusion state, and the graphql object, depending to
  // what we have
  return {
    [PREFIX_BUILD(ITEM_PREFIX + item.getId()) + EXCLUSION_STATE_SUFFIX]: {
      type: GraphQLNonNull(GraphQLString),
      description: description + " - exclusion state",
    },
    [ITEM_PREFIX + item.getId()]: {
      type: propertiesAsInput ? item._gqlInObj : item._gqlOutObj,
      description,
    },
  };
}
