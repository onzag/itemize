import { GraphQLString, GraphQLInt, GraphQLObjectType } from "graphql";

const TOKEN_OBJECT = new GraphQLObjectType({
  name: "TOKEN_OBJECT",
  fields: {
    token: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLInt,
    },
    role: {
      type: GraphQLString,
    },
    sessionId: {
      type: GraphQLInt,
    },
  },
});

export default TOKEN_OBJECT;
