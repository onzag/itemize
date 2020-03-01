"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const STANDARD_REPLY = new graphql_1.GraphQLObjectType({
    name: "STANDARD_REPLY",
    fields: {
        status: {
            type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        }
    },
});
exports.default = STANDARD_REPLY;
