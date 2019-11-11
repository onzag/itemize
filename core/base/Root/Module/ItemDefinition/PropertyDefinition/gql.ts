import { GraphQLInputObjectType, GraphQLObjectType, GraphQLNonNull } from "graphql";
import PropertyDefinition from "../PropertyDefinition";
import { IGQLFieldsDefinitionType } from "../../../gql";

const PROPERTY_TYPE_GQL_POOL = {};

/**
 * Provides all the schema bit that is necessary to include or query
 * this property alone, that is a schema bit
 * @param propertyDefinition the property definition in question
 * @param propertiesAsInput if the property should be as an input object, for use within args
 */
export function getGQLFieldsDefinitionForProperty(
  propertyDefinition: PropertyDefinition,
  propertiesAsInput ?: boolean,
): IGQLFieldsDefinitionType {
  // These are the resulting fields as we will store them here
  const resultFieldsSchema: IGQLFieldsDefinitionType = {};
  // we need the description of this property type, to get some general info
  const propertyDescription = propertyDefinition.getPropertyDefinitionDescription();
  // now we extract the gql defintiion, this is a graphql type, or a string,
  // in case there's no standard graphql type available
  const gqlDef = propertyDescription.gql;

  // now we need to get the resulting definition based on that graphql result
  let gqlResult;
  // if we get a string, meaning it's a complex type, or a graphql object
  // we need to extract its fields
  if (typeof gqlDef === "string") {
    // so the name is going to depend on whether it's going to be
    // an input or output type, we do this by attaching in or out
    let defName = gqlDef;
    if (propertiesAsInput) {
      defName += "_In";
    } else {
      defName += "_Out";
    }

    // now we have to use the pool, since property types are constant
    // and the graphql schema only allows for a single definition once
    if (!PROPERTY_TYPE_GQL_POOL[defName]) {
      const payload = {
        name: defName,
        fields: propertyDescription.gqlFields as any,
      };
      if (propertiesAsInput) {
        PROPERTY_TYPE_GQL_POOL[defName] = new GraphQLInputObjectType(payload);
      } else {
        PROPERTY_TYPE_GQL_POOL[defName] = new GraphQLObjectType(payload);
      }
    }
    gqlResult = PROPERTY_TYPE_GQL_POOL[defName];
  } else {
    gqlResult = gqlDef;
  }

  if (!propertyDefinition.isNullable()) {
    gqlResult = GraphQLNonNull(gqlResult);
  }

  resultFieldsSchema[propertyDefinition.getId()] = {
    type: gqlResult,
  };
  return resultFieldsSchema;
}
