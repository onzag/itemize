/**
 * This is the shape that tokens and custom tokens are expected to be retrieved
 * while tokens might contain more information than this token might suggest
 * this is the standard shape for a token endpoint and it's what the app token
 * service offers
 * @packageDocumentation
 */

import { GraphQLString, GraphQLObjectType } from "graphql";

/**
 * This is the token object that specifies the shape that token information
 * is expected to be retrieved, however the token itself might contain more
 * information that here
 * 
 * While the primary token endpoint that is used by default in itemize will always
 * return a token for a given user id, other endpoints can return something else
 * these custom endpoints are meant for usage for non-clients, eg. sensors and they
 * are not meant to interact with the page but rather with the grapqhl API
 */
const TOKEN_OBJECT = new GraphQLObjectType({
  name: "TOKEN_OBJECT",
  fields: {
    token: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLString,
    },
    role: {
      type: GraphQLString,
    },
  },
});

export default TOKEN_OBJECT;
