/**
 * This file contains the standard reply that would be given by a custom graphql endpoint
 * when this graphql endpoint does not return an error
 * @module
 */

import { GraphQLString, GraphQLObjectType, GraphQLNonNull } from "graphql";

/**
 * This standard reply is pretty meaningless for the user it is basically
 * just a messsage that should aid the developer on how it succeeded
 * in order to give errors you should use
 * 
 * throw new EndpointError({
 *   message: "whatever",
 *   code: ENDPOINT_ERRORS.UNSPECIFIED,
 * });
 * 
 * The standard reply exists because graphql needs something for success
 */
const STANDARD_REPLY = new GraphQLObjectType({
  name: "STANDARD_REPLY",
  fields: {
    status: {
      type: GraphQLNonNull(GraphQLString),
    },
    content: {
      type: GraphQLString,
    },
  },
});

export default STANDARD_REPLY;
