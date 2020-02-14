"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const constants_1 = require("../../constants");
const token_1 = require("../token");
const errors_1 = require("../../base/errors");
const graphql_token_object_1 = __importDefault(require("../custom-token/graphql-token-object"));
exports.customUserQueries = (appData) => {
    const userModule = appData.root.getModuleFor(["users"]);
    const userIdef = userModule.getItemDefinitionFor(["user"]);
    const userTable = userIdef.getQualifiedPathName();
    const moduleTable = userModule.getQualifiedPathName();
    const usernameProperty = userIdef.getPropertyDefinitionFor("username", false);
    const passwordProperty = userIdef.getPropertyDefinitionFor("password", false);
    const userNamePropertyDescription = usernameProperty.getPropertyDefinitionDescription();
    const passwordPropertyDescription = passwordProperty.getPropertyDefinitionDescription();
    return {
        token: {
            type: graphql_token_object_1.default,
            args: {
                username: {
                    type: graphql_1.GraphQLString,
                },
                password: {
                    type: graphql_1.GraphQLString,
                },
                token: {
                    type: graphql_1.GraphQLString,
                },
            },
            async resolve(source, args, context, info) {
                // if there is no username and there is no token
                // the credentials are automatically invalid
                if (!args.username && !args.token) {
                    throw new errors_1.EndpointError({
                        message: "Invalid Credentials",
                        code: constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS,
                    });
                }
                // now we prepare the query we use to get the
                // user related to this token or credentials
                const resultUserQuery = appData.knex.first("id", "role", "blocked_at").from(moduleTable).join(userTable, (clause) => {
                    clause.on(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME, "=", "id");
                    clause.on(constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "=", "version");
                });
                let failureToGetUserIsCredentials = false;
                let preGeneratedToken = null;
                let queryHasPasswordCheck = false;
                let decodedId = null;
                // if we have a token provided
                if (args.token) {
                    try {
                        // we attempt to decode it
                        const decoded = await token_1.jwtVerify(args.token, appData.sensitiveConfig.jwtKey);
                        // and set the token as the pre generated token so we reuse it
                        preGeneratedToken = args.token;
                        // the query fullfillment will depend on the decoded id present in the token
                        resultUserQuery
                            .where("id", decoded.id)
                            .andWhere("role", decoded.role);
                        decodedId = decoded.id;
                    }
                    catch (err) {
                        throw new errors_1.EndpointError({
                            message: "Token is invalid",
                            code: constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS,
                        });
                    }
                }
                else {
                    // otherwise we are using username and password combo
                    failureToGetUserIsCredentials = true;
                    queryHasPasswordCheck = true;
                    // and we apply as required
                    resultUserQuery
                        .where(userNamePropertyDescription.sqlEqual(args.username, "", usernameProperty.getId(), appData.knex))
                        .andWhere(passwordPropertyDescription.sqlEqual(args.password, "", passwordProperty.getId(), appData.knex));
                }
                // now we get the user whichever was the method
                let resultUserFromSQLQuery = null;
                if (!queryHasPasswordCheck) {
                    resultUserFromSQLQuery = await appData.cache.requestCache(userTable, moduleTable, decodedId, null);
                }
                else {
                    resultUserFromSQLQuery = await resultUserQuery || null;
                }
                const resultUser = resultUserFromSQLQuery;
                // if we get an user
                if (resultUser) {
                    // if the user is blocked
                    if (resultUser.blocked_at) {
                        // we give an error for that
                        throw new errors_1.EndpointError({
                            message: "User is blocked",
                            code: constants_1.ENDPOINT_ERRORS.USER_BLOCKED,
                        });
                    }
                    // otherwise we provide the token, either re-give the same token
                    // or provide a new one
                    const token = preGeneratedToken || (await token_1.jwtSign({
                        id: resultUser.id,
                        role: resultUser.role,
                    }, appData.sensitiveConfig.jwtKey, {
                        expiresIn: "7d",
                    }));
                    // and we return the information back to the user
                    return {
                        ...resultUser,
                        token,
                    };
                }
                else if (failureToGetUserIsCredentials) {
                    // if we don't get an user and we previously
                    // have used a username and password combination
                    // we give an invalid credentials error
                    throw new errors_1.EndpointError({
                        message: "Invalid Credentials",
                        code: constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS,
                    });
                }
                else {
                    // otherwise the user has been removed as the id
                    // is not found, this can happen if the user
                    // has kept a session active after nuking his account
                    throw new errors_1.EndpointError({
                        message: "User has been removed",
                        code: constants_1.ENDPOINT_ERRORS.USER_REMOVED,
                    });
                }
            },
        },
    };
};
