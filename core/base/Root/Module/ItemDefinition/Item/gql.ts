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
 * @param options.propertiesAsInput if it's in input mode to get
 * graphql input fields instead
 */
export function getGQLFieldsDefinitionForItem(
  item: Item,
  options: {
    propertiesAsInput: boolean,
    optionalForm: boolean,
  },
): IGQLFieldsDefinitionType {
  // the exclusion state needs to be stored in the schema bit
  let itemFields = {};
  // we need all the sinking properties and those are the
  // ones added to the schema bit
  item.getSinkingProperties().forEach((sinkingProperty) => {
    itemFields = {
      ...itemFields,
      ...getGQLFieldsDefinitionForProperty(sinkingProperty, options),
    };
  });

  // if we are in the input mode
  // we need to check out the element we have created
  // for the fields both for input and output, as the object
  // itself is just an input type because an item can be whole
  // null
  let storedObjLocation = "_gql";
  let itemGQLName = PREFIXED_CONCAT(
    item.getItemDefinition().getQualifiedPathName(),
    ITEM_PREFIX + item.getId(),
  );
  if (options.propertiesAsInput) {
    storedObjLocation += "InObj";
    itemGQLName += "_In";
  } else {
    itemGQLName += "_Out";
    storedObjLocation += "OutObj";
  }
  if (options.optionalForm) {
    itemGQLName += "_Opt";
    storedObjLocation += "Opt";
  }
  if (!item[storedObjLocation]) {
    // and depending if it's in or out
    if (options.propertiesAsInput) {
      item[storedObjLocation] = new GraphQLInputObjectType({
        name: itemGQLName,
        fields: itemFields,
      });
    } else {
      item[storedObjLocation] = new GraphQLObjectType({
        name: itemGQLName,
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
      type: item[storedObjLocation],
      description,
    },
  };
}
