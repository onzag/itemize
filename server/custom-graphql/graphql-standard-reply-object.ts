import { GraphQLString, GraphQLObjectType, GraphQLNonNull } from "graphql";

const STANDARD_REPLY = new GraphQLObjectType({
  name: "STANDARD_REPLY",
  fields: {
    status: {
      type: GraphQLNonNull(GraphQLString),
    }
  },
});

export default STANDARD_REPLY;
