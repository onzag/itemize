"use strict";
/**
 * This file contains the graphql utility functions for managing
 * Includes that exist within item definitions, it doesn't contain
 * the conversion function sql.ts does
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../../../constants");
const graphql_1 = require("graphql");
const gql_1 = require("../PropertyDefinition/gql");
/**
 * Provides the graphql definition that will be required to store
 * this include bit
 * @param include the include
 * @param options.propertiesAsInput if it's in input mode to get
 * graphql input fields instead
 * @returns a list of field definitions that represent the include in graphql form
 * for use within the graphql description
 */
function getGQLFieldsDefinitionForInclude(include, options) {
    // the exclusion state needs to be stored in the schema bit
    let includeFields = {};
    // we need all the sinking properties and those are the
    // ones added to the schema bit
    include.getSinkingProperties().forEach((sinkingProperty) => {
        includeFields = {
            ...includeFields,
            ...gql_1.getGQLFieldsDefinitionForProperty(sinkingProperty, {
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
    let includeGQLName = constants_1.PREFIXED_CONCAT(include.getItemDefinition().getQualifiedPathName(), include.getQualifiedIdentifier());
    if (options.propertiesAsInput) {
        storedObjLocation += "InObj";
        includeGQLName += "_In";
    }
    else {
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
            include[storedObjLocation] = new graphql_1.GraphQLInputObjectType({
                name: includeGQLName,
                fields: includeFields,
            });
        }
        else {
            include[storedObjLocation] = new graphql_1.GraphQLObjectType({
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
            type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            description: description + " - exclusion state",
        },
        [include.getQualifiedIdentifier()]: {
            type: include[storedObjLocation],
            description,
        },
    };
}
exports.getGQLFieldsDefinitionForInclude = getGQLFieldsDefinitionForInclude;
