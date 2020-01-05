import { PREFIXED_CONCAT } from "../../../../../constants";
import { GraphQLString, GraphQLNonNull, GraphQLInputObjectType, GraphQLObjectType } from "graphql";
import {
  getGQLFieldsDefinitionForProperty,
} from "../PropertyDefinition/gql";
import Include from ".";
import { IGQLFieldsDefinitionType } from "../../../gql";

/**
 * Provides the graphql definition that will be required to store
 * this include bit
 * @param include the include
 * @param options.propertiesAsInput if it's in input mode to get
 * graphql input fields instead
 */
export function getGQLFieldsDefinitionForInclude(
  include: Include,
  options: {
    propertiesAsInput: boolean,
    optionalForm: boolean,
  },
): IGQLFieldsDefinitionType {
  // the exclusion state needs to be stored in the schema bit
  let includeFields = {};
  // we need all the sinking properties and those are the
  // ones added to the schema bit
  include.getSinkingProperties().forEach((sinkingProperty) => {
    includeFields = {
      ...includeFields,
      ...getGQLFieldsDefinitionForProperty(sinkingProperty, {
        ...options,
        prefix: "",
      }),
    };
  });

  // if we are in the input mode
  // we need to check out the element we have created
  // for the fields both for input and output, as the object
  // itself is just an input type because an include can be whole
  // null
  let storedObjLocation = "_gql";
  let includeGQLName = PREFIXED_CONCAT(
    include.getItemDefinition().getQualifiedPathName(),
    include.getQualifiedIdentifier(),
  );
  if (options.propertiesAsInput) {
    storedObjLocation += "InObj";
    includeGQLName += "_In";
  } else {
    includeGQLName += "_Out";
    storedObjLocation += "OutObj";
  }
  if (options.optionalForm) {
    includeGQLName += "_Opt";
    storedObjLocation += "Opt";
  }
  if (!include[storedObjLocation]) {
    // and depending if it's in or out
    if (options.propertiesAsInput) {
      include[storedObjLocation] = new GraphQLInputObjectType({
        name: includeGQLName,
        fields: includeFields,
      });
    } else {
      include[storedObjLocation] = new GraphQLObjectType({
        name: includeGQLName,
        fields: includeFields,
      });
    }
  }

  const description = include.getI18nDataFor("en").name ||
    include.getItemDefinition().getI18nDataFor("en").name;

  // now we add the exclusion state, and the graphql object, depending to
  // what we have
  return {
    [include.getQualifiedExclusionStateIdentifier()]: {
      type: GraphQLNonNull(GraphQLString),
      description: description + " - exclusion state",
    },
    [include.getQualifiedIdentifier()]: {
      type: include[storedObjLocation],
      description,
    },
  };
}
