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
const util_2 = require("util");
;
const RESET_PASSWORD_EMAIL_RESEND_SECONDS_TIME = 600;
const RESET_PASSWORD_TOKEN_VALID_SECONDS_TIME = 86400;
const VERIFY_ACCOUNT_EMAIL_RESEND_SECONDS_TIME = 600;
exports.customUserQueries = (appData) => {
    const userModule = appData.root.getModuleFor(["users"]);
    const userIdef = userModule.getItemDefinitionFor(["user"]);
    const userTable = userIdef.getQualifiedPathName();
    const moduleTable = userModule.getQualifiedPathName();
    const usernameProperty = userIdef.getPropertyDefinitionFor("username", false);
    const emailProperty = userIdef.getPropertyDefinitionFor("email", false);
    const eValidatedProperty = userIdef.getPropertyDefinitionFor("e_validated", false);
    const passwordProperty = userIdef.getPropertyDefinitionFor("password", false);
    const userNamePropertyDescription = usernameProperty.getPropertyDefinitionDescription();
    const passwordPropertyDescription = passwordProperty.getPropertyDefinitionDescription();
    const emailPropertyDescription = emailProperty.getPropertyDefinitionDescription();
    const eValidatedPropertyDescription = eValidatedProperty.getPropertyDefinitionDescription();
    const setPromisified = util_2.promisify(appData.redis.set).bind(appData.redis);
    const expirePromisified = util_2.promisify(appData.redis.expire).bind(appData.redis);
    const getPromisified = util_2.promisify(appData.redis.get).bind(appData.redis);
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
                    let decoded = null;
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
                    // now we check the session id to see if it has been cancelled
                    if (resultUser.session_id !== decoded.sessionId) {
                        throw new errors_1.EndpointError({
                            message: "Session has been cancelled",
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
                    resultUserQuery
                        .where((subQueryBuilder) => {
                        // now for email login to be possible
                        subQueryBuilder
                            .where(userNamePropertyDescription.sqlEqual(args.username, "", usernameProperty.getId(), true, appData.knex))
                            .orWhere((innerSuqueryBuilder) => {
                            // only emails that have been validated are valid, the reason is simple, otherwise this would allow any user to use
                            // another invalidated email that other user has and has a chance to login as them
                            // you might wonder why not avoid them to set the
                            // email as that user to start with, well this is to avoid a DDOS attack similar to one that was present at github
                            // where you would set an invalidated email, and that user won't be able to claim its own email
                            innerSuqueryBuilder
                                .where(emailPropertyDescription.sqlEqual(args.username, "", emailProperty.getId(), true, appData.knex))
                                .andWhere(eValidatedPropertyDescription.sqlEqual(true, "", eValidatedProperty.getId(), false, appData.knex));
                        });
                    })
                        .andWhere(passwordPropertyDescription.sqlEqual(args.password, "", passwordProperty.getId(), false, appData.knex));
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
                const avoidSendingEmailEmailTarget = !!(await getPromisified("USER_VERIFY_ACCOUNT_EMAIL_TEMP_AVOID_SENDING." + resultUser.id.toString()));
                if (avoidSendingEmailEmailTarget === resultUser.email) {
                    return {
                        status: "OK",
                    };
                }
                await setPromisified("USER_VERIFY_ACCOUNT_EMAIL_TEMP_AVOID_SENDING." + resultUser.id.toString(), resultUser.email.toString());
                await expirePromisified("USER_VERIFY_ACCOUNT_EMAIL_TEMP_AVOID_SENDING." + resultUser.id.toString(), VERIFY_ACCOUNT_EMAIL_RESEND_SECONDS_TIME);
                const appLanguage = resultUser.app_language;
                let languageToUse = appLanguage;
                let i18nData = userIdef.getI18nDataFor(appLanguage);
                if (!i18nData) {
                    languageToUse = "en";
                    i18nData = userIdef.getI18nDataFor("en");
                }
                const validateToken = await token_1.jwtSign({
                    validateUserId: decoded.id,
                    validateUserEmail: resultUser.email,
                }, appData.sensitiveConfig.jwtKey);
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
        send_reset_password: {
            type: graphql_standard_reply_object_1.default,
            args: {
                email: {
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
                // only emails that have been validated are valid, the reason is simple, otherwise this would allow any user to use
                // another invalidated email that other user has and then has a chance to recover and change their password instead
                // you might wonder why not to prevent email that are equal as that user to start with,
                // well this is to avoid a DDOS attack similar to one that was present at github
                // where you would set an invalidated email, and that user won't be able to claim its own email
                const resultUser = await appData.knex.first(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME, "email", "username", "app_language").from(userTable)
                    .where(emailPropertyDescription.sqlEqual(args.email, "", emailProperty.getId(), true, appData.knex))
                    .andWhere(eValidatedPropertyDescription.sqlEqual(true, "", eValidatedProperty.getId(), false, appData.knex));
                if (!resultUser) {
                    throw new errors_1.EndpointError({
                        message: "User with that email does not exist",
                        code: constants_1.ENDPOINT_ERRORS.NOT_FOUND,
                    });
                }
                const appLanguage = resultUser.app_language;
                let languageToUse = appLanguage;
                let i18nData = userIdef.getI18nDataFor(appLanguage);
                if (!i18nData) {
                    languageToUse = "en";
                    i18nData = userIdef.getI18nDataFor("en");
                }
                const userId = resultUser[constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME];
                const avoidSendingEmail = !!(await getPromisified("USER_RESET_PASSWORD_TEMP_AVOID_SENDING." + userId.toString()));
                if (avoidSendingEmail) {
                    return {
                        status: "OK",
                    };
                }
                const randomId = Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
                await setPromisified("USER_RESET_PASSWORD_TEMP_TOKEN_CODE." + randomId.toString(), userId.toString());
                await expirePromisified("USER_RESET_PASSWORD_TEMP_TOKEN_CODE." + randomId.toString(), RESET_PASSWORD_TOKEN_VALID_SECONDS_TIME);
                await setPromisified("USER_RESET_PASSWORD_TEMP_AVOID_SENDING." + userId.toString(), userId.toString());
                await expirePromisified("USER_RESET_PASSWORD_TEMP_AVOID_SENDING." + userId.toString(), RESET_PASSWORD_EMAIL_RESEND_SECONDS_TIME);
                const resetToken = await token_1.jwtSign({
                    resetPasswordUserId: userId,
                    resetPasswordTempTokenCode: randomId,
                }, appData.sensitiveConfig.jwtKey);
                const resetPasswordLink = (appData.sensitiveConfig.mailgunTargetDomain || appData.config.productionHostname) +
                    i18nData.custom.forgot_password_link_target + "?token=" + encodeURIComponent(resetToken);
                const templateToUse = i18nData.custom.forgot_password_template_name;
                const from = `${i18nData.custom.forgot_password_user} <${i18nData.custom.forgot_password_email_user}@${appData.sensitiveConfig.mailgunDomain}>`;
                const to = resultUser.email;
                const subject = util_1.capitalize(i18nData.custom.forgot_password_title);
                if (!templateToUse) {
                    await appData.mailgun.messages().send({
                        from,
                        to,
                        subject,
                        text: `You do not have a template setup for language ${languageToUse}\n` +
                            `forgot_password_link = ${resetPasswordLink}\n` +
                            `forgot_password = ${util_1.capitalize(i18nData.custom.forgot_password)}\n` +
                            `forgot_password_title = ${util_1.capitalize(i18nData.custom.forgot_password_title)}\n` +
                            `forgot_password_description = ${i18nData.custom.forgot_password_description}\n` +
                            `forgot_password_recover_button = ${util_1.capitalize(i18nData.custom.forgot_password_recover_button)}\n` +
                            `forgot_password_alt_link = ${util_1.capitalize(i18nData.custom.forgot_password_alt_link)}\n` +
                            `forgot_password_username = ${resultUser.username}`
                    });
                }
                else {
                    await appData.mailgun.messages().send({
                        from,
                        to,
                        subject,
                        template: templateToUse,
                        forgot_password_link: resetPasswordLink,
                        forgot_password: util_1.capitalize(i18nData.custom.forgot_password),
                        forgot_password_title: util_1.capitalize(i18nData.custom.forgot_password_title),
                        forgot_password_description: i18nData.custom.forgot_password_description,
                        forgot_password_recover_button: util_1.capitalize(i18nData.custom.forgot_password_recover_button),
                        forgot_password_alt_link: util_1.capitalize(i18nData.custom.forgot_password_alt_link),
                        forgot_password_username: resultUser.username,
                    });
                }
                return {
                    status: "OK",
                };
            }
        },
        reset_password: {
            type: graphql_standard_reply_object_1.default,
            args: {
                token: {
                    type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
                new_password: {
                    type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
            },
            async resolve(source, args, context, info) {
                let decoded = null;
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
                if (typeof decoded.resetPasswordUserId !== "number" ||
                    typeof decoded.resetPasswordTempTokenCode !== "number") {
                    throw new errors_1.EndpointError({
                        message: "Token is invalid",
                        code: constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS,
                    });
                }
                const codeWasSent = await getPromisified("USER_RESET_PASSWORD_TEMP_TOKEN_CODE." + decoded.resetPasswordTempTokenCode.toString());
                if (!codeWasSent) {
                    throw new errors_1.EndpointError({
                        message: "Token is invalid",
                        code: constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS,
                    });
                }
                const invalidReason = passwordProperty.isValidValueNoExternalChecking(decoded.resetPasswordUserId, null, args.new_password);
                if (invalidReason) {
                    throw new errors_1.EndpointError({
                        message: "Password is invalid",
                        code: constants_1.ENDPOINT_ERRORS.INVALID_PROPERTY,
                        pcode: invalidReason,
                        itemDefPath: userIdef.getPath(),
                        modulePath: userModule.getPath(),
                        propertyId: "password",
                    });
                }
                const resultUser = await appData.cache.requestValue(userIdef, decoded.resetPasswordUserId, null);
                if (!resultUser) {
                    throw new errors_1.EndpointError({
                        message: "User does not exist",
                        code: constants_1.ENDPOINT_ERRORS.NOT_FOUND,
                    });
                }
                await appData.cache.requestUpdate(userIdef, decoded.resetPasswordUserId, null, {
                    password: args.new_password,
                }, null, null, null, null);
                return {
                    status: "OK",
                };
            }
        },
    };
};
