"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
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
    const emailProperty = userIdef.hasPropertyDefinitionFor("email", false) &&
        userIdef.getPropertyDefinitionFor("email", false);
    const eValidatedProperty = userIdef.hasPropertyDefinitionFor("e_validated", false) &&
        userIdef.getPropertyDefinitionFor("e_validated", false);
    const passwordProperty = userIdef.getPropertyDefinitionFor("password", false);
    const userNamePropertyDescription = usernameProperty.getPropertyDefinitionDescription();
    const passwordPropertyDescription = passwordProperty.getPropertyDefinitionDescription();
    const emailPropertyDescription = emailProperty && emailProperty.getPropertyDefinitionDescription();
    const eValidatedPropertyDescription = eValidatedProperty && eValidatedProperty.getPropertyDefinitionDescription();
    const setPromisified = util_2.promisify(appData.redisGlobal.set).bind(appData.redisGlobal);
    const expirePromisified = util_2.promisify(appData.redisGlobal.expire).bind(appData.redisGlobal);
    const getPromisified = util_2.promisify(appData.redisGlobal.get).bind(appData.redisGlobal);
    const delPromisified = util_2.promisify(appData.redisGlobal.del).bind(appData.redisGlobal);
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
                            message: "Token is invalid due to wrong shape",
                            code: constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS,
                        });
                    }
                    // and set the token as the pre generated token so we reuse it
                    preGeneratedToken = args.token;
                    try {
                        resultUser = await appData.cache.requestValue(userIdef, decoded.id, null);
                    }
                    catch (err) {
                        __1.logger.error("customUserQueries.token [SERIOUS]: failed to retrieve user value from cache/database which caused the user not to login", {
                            errMessage: err.message,
                            errStack: err.stack,
                            id: decoded.id,
                        });
                        throw err;
                    }
                    // now we check the session id to see if it has been cancelled
                    if ((resultUser.session_id || 0) !== decoded.sessionId) {
                        throw new errors_1.EndpointError({
                            message: "Session has been cancelled",
                            code: constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS,
                        });
                    }
                    else if (resultUser.role !== decoded.role) {
                        throw new errors_1.EndpointError({
                            message: "Token role mismatch",
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
                            .where(userNamePropertyDescription.sqlEqual({
                            id: usernameProperty.getId(),
                            prefix: "",
                            ignoreCase: true,
                            knex: appData.knex,
                            serverData: appData.cache.getServerData(),
                            itemDefinition: userIdef,
                            include: null,
                            value: args.username,
                            property: usernameProperty,
                        }))
                            .orWhere((innerSuqueryBuilder) => {
                            // cannot search by email if these properties are missing
                            if (!emailProperty || !eValidatedProperty) {
                                return null;
                            }
                            // only emails that have been validated are valid, the reason is simple, otherwise this would allow any user to use
                            // another invalidated email that other user has and has a chance to login as them
                            // you might wonder why not avoid them to set the
                            // email as that user to start with, well this is to avoid a DDOS attack similar to one that was present at github
                            // where you would set an invalidated email, and that user won't be able to claim its own email
                            innerSuqueryBuilder
                                .where(emailPropertyDescription.sqlEqual({
                                id: emailProperty.getId(),
                                prefix: "",
                                ignoreCase: true,
                                knex: appData.knex,
                                serverData: appData.cache.getServerData(),
                                itemDefinition: userIdef,
                                include: null,
                                value: args.username,
                                property: usernameProperty,
                            }))
                                .andWhere(eValidatedPropertyDescription.sqlEqual({
                                id: eValidatedProperty.getId(),
                                prefix: "",
                                ignoreCase: true,
                                knex: appData.knex,
                                serverData: appData.cache.getServerData(),
                                itemDefinition: userIdef,
                                include: null,
                                value: true,
                                property: eValidatedProperty,
                            }));
                        });
                    })
                        .andWhere(passwordPropertyDescription.sqlEqual({
                        id: passwordProperty.getId(),
                        prefix: "",
                        ignoreCase: true,
                        knex: appData.knex,
                        serverData: appData.cache.getServerData(),
                        itemDefinition: userIdef,
                        include: null,
                        value: args.password,
                        property: passwordProperty,
                    }));
                    try {
                        resultUser = await resultUserQuery || null;
                    }
                    catch (err) {
                        __1.logger.error("customUserQueries.token [SERIOUS]: failed to execute sql query in order to retrieve " +
                            "a user which caused the user to be unable to login", {
                            errMessage: err.message,
                            errStack: err.stack,
                            username: args.username,
                        });
                        throw err;
                    }
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
                    try {
                        // otherwise we provide the token, either re-give the same token
                        // or provide a new one
                        const token = preGeneratedToken || (await token_1.jwtSign({
                            id: resultUser.id,
                            role: resultUser.role,
                            sessionId: resultUser.session_id || 0,
                        }, appData.sensitiveConfig.jwtKey));
                        // and we return the information back to the user
                        return {
                            ...resultUser,
                            token,
                        };
                    }
                    catch (err) {
                        __1.logger.error("customUserQueries.token [SERIOUS]: failed to sign token which caused user to be unable to login", {
                            errMessage: err.message,
                            errStack: err.stack,
                            resultUser,
                        });
                        throw err;
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
                else if (!emailProperty || !eValidatedProperty) {
                    throw new errors_1.EndpointError({
                        message: "email and e_validated are not available, as such sending validation emails is not available",
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
                let resultUser;
                try {
                    resultUser = await appData.cache.requestValue(userIdef, decoded.id, null);
                }
                catch (err) {
                    __1.logger.error("customUserQueries.send_validate_email [SERIOUS]: failed to retrieve user", {
                        errMessage: err.message,
                        errStack: err.stack,
                        id: decoded.id,
                    });
                    throw err;
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
                let userWithThatEmail;
                try {
                    userWithThatEmail = await appData.knex.first(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME)
                        .from(userTable).where({
                        email: resultUser.email,
                        e_validated: true,
                    });
                }
                catch (err) {
                    __1.logger.error("customUserQueries.send_validate_email [SERIOUS]: could not perform the SQL query to find out if user with same email but " +
                        "validated existed which caused the current user to be unable to send a validation email", {
                        errMessage: err.message,
                        errStack: err.stack,
                        resultUser,
                    });
                    throw err;
                }
                // if we ifind an user with the same email
                if (userWithThatEmail) {
                    throw new errors_1.EndpointError({
                        message: "That email is taken",
                        code: constants_1.ENDPOINT_ERRORS.USER_EMAIL_TAKEN,
                    });
                }
                try {
                    const avoidSendingEmailEmailTarget = !!(await getPromisified("USER_VERIFY_ACCOUNT_EMAIL_TEMP_AVOID_SENDING." + resultUser.id.toString()));
                    if (avoidSendingEmailEmailTarget === resultUser.email) {
                        return {
                            status: "OK",
                        };
                    }
                }
                catch (err) {
                    __1.logger.error("customUserQueries.send_validate_email [SERIOUS]: failed to retrieve flag from global redis instance to avoid sending " +
                        "which caused to be unable to send the email at all", {
                        errMessage: err.message,
                        errStack: err.stack,
                        resultUser,
                    });
                    throw err;
                }
                // retrieving user language information
                const appLanguage = resultUser.app_language;
                let languageToUse = appLanguage;
                let i18nData = userIdef.getI18nDataFor(appLanguage);
                if (!i18nData) {
                    languageToUse = "en";
                    i18nData = userIdef.getI18nDataFor("en");
                }
                let validateToken;
                try {
                    validateToken = await token_1.jwtSign({
                        validateUserId: decoded.id,
                        validateUserEmail: resultUser.email,
                    }, appData.sensitiveConfig.jwtKey);
                }
                catch (err) {
                    __1.logger.error("customUserQueries.send_validate_email [SERIOUS]: could not sign the validation email token", {
                        errMessage: err.message,
                        errStack: err.stack,
                        resultUser,
                    });
                    throw err;
                }
                try {
                    await setPromisified("USER_VERIFY_ACCOUNT_EMAIL_TEMP_AVOID_SENDING." + resultUser.id.toString(), resultUser.email.toString());
                    await expirePromisified("USER_VERIFY_ACCOUNT_EMAIL_TEMP_AVOID_SENDING." + resultUser.id.toString(), VERIFY_ACCOUNT_EMAIL_RESEND_SECONDS_TIME);
                }
                catch (err) {
                    __1.logger.error("customUserQueries.send_validate_email [SERIOUS]: could not set the global values for the temporary avoid sending email flags", {
                        errMessage: err.message,
                        errStack: err.stack,
                        resultUser,
                    });
                    throw err;
                }
                const validateLink = (appData.sensitiveConfig.mailgunTargetDomain || appData.config.productionHostname) +
                    "/rest/user/validate-email?token=" + encodeURIComponent(validateToken) + "&id=" + decoded.id;
                const templateIdToUse = parseInt(i18nData.custom.validate_account_fragment_id, 10);
                const to = resultUser.email;
                const subject = util_1.capitalize(i18nData.custom.validate_account);
                const fragmentIdef = appData.root.getModuleFor(["cms"]).getItemDefinitionFor(["fragment"]);
                const extractedProperties = {};
                Object.keys(resultUser).forEach((p) => {
                    if (typeof resultUser[p] === "string" || typeof resultUser[p] === "number") {
                        extractedProperties[p] = resultUser[p].toString();
                    }
                });
                await appData.mailService.sendTemplateEmail({
                    fromUsername: i18nData.custom.validate_account_user,
                    fromEmailHandle: i18nData.custom.validate_account_email_user,
                    id: templateIdToUse,
                    version: languageToUse,
                    itemDefinition: fragmentIdef,
                    args: {
                        validate_account_link: validateLink,
                        validate_account_properties: extractedProperties,
                    },
                    property: fragmentIdef.getPropertyDefinitionFor("content", true),
                    subject,
                    to,
                });
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
                else if (!emailProperty || !eValidatedProperty) {
                    throw new errors_1.EndpointError({
                        message: "email and e_validated are not available, as such password recovery is not available",
                        code: constants_1.ENDPOINT_ERRORS.UNSPECIFIED,
                    });
                }
                // only emails that have been validated are valid, the reason is simple, otherwise this would allow any user to use
                // another invalidated email that other user has and then has a chance to recover and change their password instead
                // you might wonder why not to prevent email that are equal as that user to start with,
                // well this is to avoid a DDOS attack similar to one that was present at github
                // where you would set an invalidated email, and that user won't be able to claim its own email
                let resultUser;
                try {
                    resultUser = await appData.knex.first(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME, "email", "username", "app_language").from(userTable)
                        .where(emailPropertyDescription.sqlEqual({
                        id: emailProperty.getId(),
                        prefix: "",
                        ignoreCase: true,
                        knex: appData.knex,
                        serverData: appData.cache.getServerData(),
                        itemDefinition: userIdef,
                        include: null,
                        value: args.email,
                        property: eValidatedProperty,
                    }))
                        .andWhere(eValidatedPropertyDescription.sqlEqual({
                        id: eValidatedProperty.getId(),
                        prefix: "",
                        ignoreCase: true,
                        knex: appData.knex,
                        serverData: appData.cache.getServerData(),
                        itemDefinition: userIdef,
                        include: null,
                        value: true,
                        property: eValidatedProperty,
                    }));
                }
                catch (err) {
                    __1.logger.error("customUserQueries.send_reset_password [SERIOUS]: could not request user from user table by email", {
                        errMessage: err.message,
                        errStack: err.stack,
                        email: args.email,
                    });
                    throw err;
                }
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
                try {
                    const avoidSendingEmail = !!(await getPromisified("USER_RESET_PASSWORD_TEMP_AVOID_SENDING." + userId.toString()));
                    if (avoidSendingEmail) {
                        return {
                            status: "OK",
                        };
                    }
                }
                catch (err) {
                    __1.logger.error("customUserQueries.send_reset_password [SERIOUS]: failed to retrieve flag from global redis instance to avoid sending " +
                        "which caused to be unable to send the email at all", {
                        errMessage: err.message,
                        errStack: err.stack,
                        resultUser,
                    });
                    throw err;
                }
                const randomId = Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
                try {
                    await setPromisified("USER_RESET_PASSWORD_TEMP_TOKEN_CODE." + randomId.toString(), userId.toString());
                    await expirePromisified("USER_RESET_PASSWORD_TEMP_TOKEN_CODE." + randomId.toString(), RESET_PASSWORD_TOKEN_VALID_SECONDS_TIME);
                    await setPromisified("USER_RESET_PASSWORD_TEMP_AVOID_SENDING." + userId.toString(), userId.toString());
                    await expirePromisified("USER_RESET_PASSWORD_TEMP_AVOID_SENDING." + userId.toString(), RESET_PASSWORD_EMAIL_RESEND_SECONDS_TIME);
                }
                catch (err) {
                    __1.logger.error("customUserQueries.send_reset_password [SERIOUS]: failed to set flags into global redis instance to avoid sending " +
                        "which caused to be unable to send the email at all", {
                        errMessage: err.message,
                        errStack: err.stack,
                        resultUser,
                        randomId,
                    });
                    throw err;
                }
                let resetToken;
                try {
                    resetToken = await token_1.jwtSign({
                        resetPasswordUserId: userId,
                        resetPasswordTempTokenCode: randomId,
                    }, appData.sensitiveConfig.jwtKey);
                }
                catch (err) {
                    __1.logger.error("customUserQueries.send_reset_password [SERIOUS]: failed to sign reset token", {
                        errMessage: err.message,
                        errStack: err.stack,
                        resultUser,
                        randomId,
                    });
                    throw err;
                }
                const resetPasswordLink = (appData.sensitiveConfig.mailgunTargetDomain || appData.config.productionHostname) +
                    i18nData.custom.forgot_password_link_target + "?token=" + encodeURIComponent(resetToken) + "&id=" + userId;
                const templateIdToUse = parseInt(i18nData.custom.forgot_password_fragment_id, 10);
                const to = resultUser.email;
                const subject = util_1.capitalize(i18nData.custom.forgot_password_title);
                const extractedProperties = {};
                Object.keys(resultUser).forEach((p) => {
                    if (typeof resultUser[p] === "string" || typeof resultUser[p] === "number") {
                        extractedProperties[p] = resultUser[p].toString();
                    }
                });
                const fragmentIdef = appData.root.getModuleFor(["cms"]).getItemDefinitionFor(["fragment"]);
                await appData.mailService.sendTemplateEmail({
                    fromUsername: i18nData.custom.validate_account_user,
                    fromEmailHandle: i18nData.custom.validate_account_email_user,
                    id: templateIdToUse,
                    version: languageToUse,
                    itemDefinition: fragmentIdef,
                    args: {
                        forgot_password_link: resetPasswordLink,
                        forgot_password_properties: extractedProperties,
                    },
                    property: fragmentIdef.getPropertyDefinitionFor("content", true),
                    subject,
                    to,
                });
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
                        message: "Reset token is invalid",
                        code: constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS,
                    });
                }
                if (typeof decoded.resetPasswordUserId !== "number" ||
                    typeof decoded.resetPasswordTempTokenCode !== "number") {
                    throw new errors_1.EndpointError({
                        message: "Reset token is invalid due to wrong shape",
                        code: constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS,
                    });
                }
                let codeWasSent;
                try {
                    codeWasSent = await getPromisified("USER_RESET_PASSWORD_TEMP_TOKEN_CODE." + decoded.resetPasswordTempTokenCode.toString());
                }
                catch (err) {
                    __1.logger.error("customUserQueries.reset_password [SERIOUS]: failed to check the token code that was sent", {
                        errMessage: err.message,
                        errStack: err.stack,
                        decoded,
                    });
                    throw err;
                }
                if (!codeWasSent) {
                    throw new errors_1.EndpointError({
                        message: "Reset token is invalid due to expiration",
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
                let resultUser;
                try {
                    resultUser = await appData.cache.requestValue(userIdef, decoded.resetPasswordUserId, null);
                }
                catch (err) {
                    __1.logger.error("customUserQueries.reset_password [SERIOUS]: failed to retrieve user", {
                        errMessage: err.message,
                        errStack: err.stack,
                        decoded,
                    });
                    throw err;
                }
                if (!resultUser) {
                    throw new errors_1.EndpointError({
                        message: "User does not exist",
                        code: constants_1.ENDPOINT_ERRORS.NOT_FOUND,
                    });
                }
                try {
                    await appData.cache.requestUpdate(userIdef, decoded.resetPasswordUserId, null, {
                        password: args.new_password,
                    }, null, null, null, null, null);
                }
                catch (err) {
                    __1.logger.error("customUserQueries.reset_password [SERIOUS]: failed to run password update request", {
                        errMessage: err.message,
                        errStack: err.stack,
                        decoded,
                    });
                    throw err;
                }
                (async () => {
                    try {
                        await delPromisified("USER_RESET_PASSWORD_TEMP_TOKEN_CODE." + decoded.resetPasswordTempTokenCode.toString());
                    }
                    catch (err) {
                        __1.logger.error("customUserQueries.reset_password (detached): failed to remove temporary token code for password reset", {
                            errMessage: err.message,
                            errStack: err.stack,
                            decoded,
                        });
                    }
                })();
                return {
                    status: "OK",
                };
            }
        },
    };
};
