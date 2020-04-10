"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const constants_1 = require("../../constants");
const token_1 = require("../token");
const errors_1 = require("../../base/errors");
const graphql_token_object_1 = __importDefault(require("../custom-graphql/graphql-token-object"));
const graphql_standard_reply_object_1 = __importDefault(require("../custom-graphql/graphql-standard-reply-object"));
const util_1 = require("../../util");
// TODO recover account (just send a login standard token)
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
                let preGeneratedToken = null;
                let resultUser = null;
                // if we have a token provided
                if (args.token) {
                    try {
                        // we attempt to decode it
                        const decoded = await token_1.jwtVerify(args.token, appData.sensitiveConfig.jwtKey);
                        if (typeof decoded.id !== "number" ||
                            typeof decoded.role !== "string" ||
                            typeof decoded.sessionId !== "number") {
                            throw new errors_1.EndpointError({
                                message: "Token is invalid",
                                code: constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS,
                            });
                        }
                        // and set the token as the pre generated token so we reuse it
                        preGeneratedToken = args.token;
                        resultUser = await appData.cache.requestValue(userIdef, decoded.id, null);
                        if (resultUser.session_id !== decoded.sessionId) {
                            throw new errors_1.EndpointError({
                                message: "Session has been cancelled",
                                code: constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS,
                            });
                        }
                    }
                    catch (err) {
                        throw new errors_1.EndpointError({
                            message: "Token is invalid",
                            code: constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS,
                        });
                    }
                }
                else {
                    // now we prepare the query we use to get the
                    // user related to this token or credentials
                    const resultUserQuery = appData.knex.first("id", "role", "session_id", "blocked_at").from(moduleTable).join(userTable, (clause) => {
                        clause.on(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME, "=", "id");
                        clause.on(constants_1.CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "=", "version");
                    });
                    // and we apply as required
                    // TODO login by email
                    resultUserQuery
                        .where(userNamePropertyDescription.sqlEqual(args.username, "", usernameProperty.getId(), appData.knex))
                        .andWhere(passwordPropertyDescription.sqlEqual(args.password, "", passwordProperty.getId(), appData.knex));
                    resultUser = await resultUserQuery || null;
                    if (!resultUser) {
                        // if we don't get an user and we previously
                        // have used a username and password combination
                        // we give an invalid credentials error
                        throw new errors_1.EndpointError({
                            message: "Invalid Credentials",
                            code: constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS,
                        });
                    }
                }
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
                        sessionId: resultUser.session_id,
                    }, appData.sensitiveConfig.jwtKey, {
                        expiresIn: "7d",
                    }));
                    // and we return the information back to the user
                    return {
                        ...resultUser,
                        token,
                    };
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
        send_validate_email: {
            type: graphql_standard_reply_object_1.default,
            args: {
                token: {
                    type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                }
            },
            async resolve(source, args, context, info) {
                if (!appData.mailgun) {
                    throw new errors_1.EndpointError({
                        message: "Mailgun is not available",
                        code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
                    });
                }
                let decoded;
                try {
                    // we attempt to decode it
                    decoded = await token_1.jwtVerify(args.token, appData.sensitiveConfig.jwtKey);
                }
                catch (err) {
                    throw new errors_1.EndpointError({
                        message: "Token is invalid",
                        code: constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS,
                    });
                }
                const resultUser = await appData.cache.requestValue(userIdef, decoded.id, null);
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
                if (!resultUser.email) {
                    // the error is unspecified because this shouldn't
                    // be allowed to happen in the client side
                    throw new errors_1.EndpointError({
                        message: "There's no email to validate",
                        code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
                    });
                }
                else if (resultUser.e_validated) {
                    throw new errors_1.EndpointError({
                        message: "User is already validated",
                        code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
                    });
                }
                // now we try to find another user with such email that has already validated
                // such
                const userWithThatEmail = await appData.knex.first(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME)
                    .from(userTable).where({
                    email: resultUser.email,
                    e_validated: true,
                });
                if (userWithThatEmail) {
                    throw new errors_1.EndpointError({
                        message: "That email is taken",
                        code: constants_1.ENDPOINT_ERRORS.USER_EMAIL_TAKEN,
                    });
                }
                const appLanguage = resultUser.app_language;
                let languageToUse = appLanguage;
                let i18nData = userIdef.getI18nDataFor(appLanguage);
                if (!i18nData) {
                    languageToUse = "en";
                    i18nData = userIdef.getI18nDataFor("en");
                }
                const validateToken = await token_1.jwtSign({ validateUserId: decoded.id }, appData.sensitiveConfig.jwtKey);
                const validateLink = (appData.sensitiveConfig.mailgunTargetDomain || appData.config.productionHostname) +
                    "/rest/user/validate-email?token=" + encodeURIComponent(validateToken);
                const templateToUse = i18nData.custom.validate_account_template_name;
                const from = `${i18nData.custom.validate_account_user} <${i18nData.custom.validate_account_email_user}@${appData.sensitiveConfig.mailgunDomain}>`;
                const to = resultUser.email;
                const subject = util_1.capitalize(i18nData.custom.validate_account);
                if (!templateToUse) {
                    await appData.mailgun.messages().send({
                        from,
                        to,
                        subject,
                        text: `You do not have a template setup for language ${languageToUse}\n` +
                            `validate_account_link = ${validateLink}\n` +
                            `validate_account = ${util_1.capitalize(i18nData.custom.validate_account)}\n` +
                            `validate_account_title = ${util_1.capitalize(i18nData.custom.validate_account_title)}\n` +
                            `validate_account_description = ${i18nData.custom.validate_account_description}\n` +
                            `validate_account_activate_button = ${util_1.capitalize(i18nData.custom.validate_account_activate_button)}\n` +
                            `validate_account_alt_link = ${util_1.capitalize(i18nData.custom.validate_account_alt_link)}`
                    });
                }
                else {
                    await appData.mailgun.messages().send({
                        from,
                        to,
                        subject,
                        template: templateToUse,
                        validate_account_link: validateLink,
                        validate_account: util_1.capitalize(i18nData.custom.validate_account),
                        validate_account_title: util_1.capitalize(i18nData.custom.validate_account_title),
                        validate_account_description: i18nData.custom.validate_account_description,
                        validate_account_activate_button: util_1.capitalize(i18nData.custom.validate_account_activate_button),
                        validate_account_alt_link: util_1.capitalize(i18nData.custom.validate_account_alt_link),
                    });
                }
                return {
                    status: "OK",
                };
            }
        },
    };
};
