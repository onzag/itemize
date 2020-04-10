"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const TOKEN_OBJECT = new graphql_1.GraphQLObjectType({
    name: "TOKEN_OBJECT",
    fields: {
        token: {
            type: graphql_1.GraphQLString,
        },
        id: {
            type: graphql_1.GraphQLInt,
        },
        role: {
            type: graphql_1.GraphQLString,
        },
        sessionId: {
            type: graphql_1.GraphQLInt,
        },
    },
});
exports.default = TOKEN_OBJECT;
