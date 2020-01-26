/**
 * This file contains all the graphql related helper functions that are used in order to
 * retrieve and set the values of properties, it doesn't contain the conversion functions
 * sql.ts does
 */

import { GraphQLInputObjectType, GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLInt } from "graphql";
import PropertyDefinition from "../PropertyDefinition";
import { IGQLFieldsDefinitionType } from "../../../gql";
import { ItemDefinitionIOActions } from "..";
import { GraphQLUpload } from "graphql-upload";

// this stores the _In and _Out of the property types
// that do not fit a basic type, like number or string
const PROPERTY_TYPE_GQL_POOL = {};

/**
 * Provides all the schema bit that is necessary to include or query
 * this property alone, that is a schema bit
 * @param propertyDefinition the property definition in question
 * @param options.propertiesAsInput if the property should be as an input object, for use within args
 * @param options.optionalForm makes all the properties optional, nullable
 */
export function getGQLFieldsDefinitionForProperty(
  propertyDefinition: PropertyDefinition,
  options: {
    propertiesAsInput: boolean,
    optionalForm: boolean,
    prefix: string,
  },
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
    if (options.propertiesAsInput) {
      defName += "_IN";
    } else {
      defName += "_OUT";
    }

    // now we have to use the pool, since property types are constant
    // and the graphql schema only allows for a single definition once
    if (!PROPERTY_TYPE_GQL_POOL[defName]) {
      const fields: any = {
        ...propertyDescription.gqlFields,
      };

      // so now we add the file to the fields if it's required
      if (propertyDescription.gqlAddFileToFields) {

        // so these are all standard
        fields.id = {
          type: GraphQLNonNull(GraphQLString),
        };
        fields.name = {
          type: GraphQLNonNull(GraphQLString),
        };
        fields.type = {
          type: GraphQLNonNull(GraphQLString),
        };
        fields.size = {
          type: GraphQLNonNull(GraphQLInt),
        };

        // however if we are inputting, we are required
        // either a url or a src on _IN
        if (options.propertiesAsInput) {
          fields.url = {
            type: GraphQLString,
          };
          fields.src = {
            type: GraphQLUpload,
          };
        } else {
          // and if that's not the case, we are always returning
          // an url on _OUT
          fields.url = {
            type: GraphQLNonNull(GraphQLString),
          };
        }
      }

      // we build the payload for this graphql object type
      const payload = {
        name: defName,
        fields,
      };

      // and create the result
      let result: any;
      if (options.propertiesAsInput) {
        result = new GraphQLInputObjectType(payload);
      } else {
        result = new GraphQLObjectType(payload);
      }

      // if it's a list, then we add it as so to the type
      // pool
      if (propertyDescription.gqlList) {
        PROPERTY_TYPE_GQL_POOL[defName] = GraphQLList(
          GraphQLNonNull(result),
        );
      } else {
        // otherwise it's simple
        PROPERTY_TYPE_GQL_POOL[defName] = result;
      }
    }
    gqlResult = PROPERTY_TYPE_GQL_POOL[defName];
  } else {
    gqlResult = gqlDef;
  }

  // if it's not nullable and we are not demanding the optional
  // form then we make it not null
  if (!propertyDefinition.isNullable() && !options.optionalForm) {
    gqlResult = GraphQLNonNull(gqlResult);
  }

  // for documentation purposes
  const englishData = propertyDefinition.getI18nDataFor("en");
  // for the description
  const baseDescription = englishData && englishData.description ||
    englishData && englishData.label ||
    "no description supplied";

  const description = baseDescription + " - " +
    "CREATE ACCESS: " + propertyDefinition.getRolesWithAccessTo(ItemDefinitionIOActions.CREATE).join(", ") + " - " +
    "READ ACCESS: " + propertyDefinition.getRolesWithAccessTo(ItemDefinitionIOActions.READ).join(", ") + " - " +
    "EDIT ACCESS: " + propertyDefinition.getRolesWithAccessTo(ItemDefinitionIOActions.EDIT).join(", ") + " - ";

  // add it to the result
  resultFieldsSchema[options.prefix + propertyDefinition.getId()] = {
    type: gqlResult,
    description,
  };

  // return it
  return resultFieldsSchema;
}
