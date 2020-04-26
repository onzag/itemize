import { IAppDataType } from "..";
import { IGQLQueryFieldsDefinitionType } from "../../base/Root/gql";
import { GraphQLString, GraphQLNonNull } from "graphql";
import {
  CONNECTOR_SQL_COLUMN_ID_FK_NAME,
  CONNECTOR_SQL_COLUMN_VERSION_FK_NAME,
  ENDPOINT_ERRORS,
} from "../../constants";
import { jwtVerify, jwtSign } from "../token";
import { EndpointError } from "../../base/errors";
import { IServerSideTokenDataType } from "../resolvers/basic";
import { ISQLTableRowValue } from "../../base/Root/sql";
import TOKEN_OBJECT from "../custom-graphql/graphql-token-object";
import STANDARD_REPLY from "../custom-graphql/graphql-standard-reply-object";
import { capitalize } from "../../util";
import { promisify } from "util";

interface RecoverPasswordTokenType {
  resetPasswordUserId: number;
  resetPasswordTempTokenCode: number;
};

const RESET_PASSWORD_EMAIL_RESEND_SECONDS_TIME = 600;
const RESET_PASSWORD_TOKEN_VALID_SECONDS_TIME = 86400;
const VERIFY_ACCOUNT_EMAIL_RESEND_SECONDS_TIME = 600;

export const customUserQueries = (appData: IAppDataType): IGQLQueryFieldsDefinitionType => {
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

  const setPromisified = promisify(appData.redis.set).bind(appData.redis);
  const expirePromisified = promisify(appData.redis.expire).bind(appData.redis);
  const getPromisified = promisify(appData.redis.get).bind(appData.redis);
  const delPromisified = promisify(appData.redis.del).bind(appData.redis);

  return {
    token: {
      type: TOKEN_OBJECT,
      args: {
        username: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
        token: {
          type: GraphQLString,
        },
      },
      async resolve(source: any, args: any, context: any, info: any) {
        // if there is no username and there is no token
        // the credentials are automatically invalid
        if (!args.username && !args.token) {
          throw new EndpointError({
            message: "Invalid Credentials",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          });
        }

        let preGeneratedToken: string = null;
        let resultUser: ISQLTableRowValue = null;

        // if we have a token provided
        if (args.token) {
          let decoded: IServerSideTokenDataType = null;
          try {
            // we attempt to decode it
            decoded = await jwtVerify<IServerSideTokenDataType>(args.token, appData.sensitiveConfig.jwtKey);
          } catch (err) {
            throw new EndpointError({
              message: "Token is invalid",
              code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
            });
          }

          if (
            typeof decoded.id !== "number" ||
            typeof decoded.role !== "string" ||
            typeof decoded.sessionId !== "number"
          ) {
            throw new EndpointError({
              message: "Token is invalid",
              code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
            });
          }

          // and set the token as the pre generated token so we reuse it
          preGeneratedToken = args.token;
          resultUser = await appData.cache.requestValue(
            userIdef,
            decoded.id,
            null,
          );

          // now we check the session id to see if it has been cancelled
          if (resultUser.session_id !== decoded.sessionId) {
            throw new EndpointError({
              message: "Session has been cancelled",
              code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
            });
          } else if (resultUser.role !== decoded.role) {
            throw new EndpointError({
              message: "Token role mismatch",
              code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
            });
          }

        } else {
          // now we prepare the query we use to get the
          // user related to this token or credentials
          const resultUserQuery = appData.knex.first(
            "id",
            "role",
            "session_id",
            "blocked_at",
          ).from(moduleTable).join(userTable, (clause) => {
            clause.on(CONNECTOR_SQL_COLUMN_ID_FK_NAME, "=", "id");
            clause.on(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "=", "version");
          });
          // and we apply as required
          resultUserQuery
            .where((subQueryBuilder) => {
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
            throw new EndpointError({
              message: "Invalid Credentials",
              code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
            });
          }
        }

        // if we get an user
        if (resultUser) {
          // if the user is blocked
          if (resultUser.blocked_at) {
            // we give an error for that
            throw new EndpointError({
              message: "User is blocked",
              code: ENDPOINT_ERRORS.USER_BLOCKED,
            });
          }
          // otherwise we provide the token, either re-give the same token
          // or provide a new one
          const token = preGeneratedToken || (await jwtSign({
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
        } else {
          // otherwise the user has been removed as the id
          // is not found, this can happen if the user
          // has kept a session active after nuking his account
          throw new EndpointError({
            message: "User has been removed",
            code: ENDPOINT_ERRORS.USER_REMOVED,
          });
        }
      },
    },
    send_validate_email: {
      type: STANDARD_REPLY,
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        }
      },
      async resolve(source: any, args: any, context: any, info: any) {
        if (!appData.mailgun) {
          throw new EndpointError({
            message: "Mailgun is not available",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        }

        let decoded: IServerSideTokenDataType;
        try {
          // we attempt to decode it
          decoded = await jwtVerify<IServerSideTokenDataType>(args.token, appData.sensitiveConfig.jwtKey);
        } catch (err) {
          throw new EndpointError({
            message: "Token is invalid",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          });
        }

        const resultUser = await appData.cache.requestValue(userIdef, decoded.id, null);
        // if we get an user
        if (resultUser) {
          // if the user is blocked
          if (resultUser.blocked_at) {
            // we give an error for that
            throw new EndpointError({
              message: "User is blocked",
              code: ENDPOINT_ERRORS.USER_BLOCKED,
            });
          }
        } else {
          // otherwise the user has been removed as the id
          // is not found, this can happen if the user
          // has kept a session active after nuking his account
          throw new EndpointError({
            message: "User has been removed",
            code: ENDPOINT_ERRORS.USER_REMOVED,
          });
        }

        if (!resultUser.email) {
          // the error is unspecified because this shouldn't
          // be allowed to happen in the client side
          throw new EndpointError({
            message: "There's no email to validate",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        } else if (resultUser.e_validated) {
          throw new EndpointError({
            message: "User is already validated",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        }

        // now we try to find another user with such email that has already validated
        // such
        const userWithThatEmail = await appData.knex.first(CONNECTOR_SQL_COLUMN_ID_FK_NAME)
          .from(userTable).where({
            email: resultUser.email,
            e_validated: true,
          });

        if (userWithThatEmail) {
          throw new EndpointError({
            message: "That email is taken",
            code: ENDPOINT_ERRORS.USER_EMAIL_TAKEN,
          });
        }

        const avoidSendingEmailEmailTarget =
          !!(await getPromisified("USER_VERIFY_ACCOUNT_EMAIL_TEMP_AVOID_SENDING." + resultUser.id.toString()));
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

        const validateToken = await jwtSign({
          validateUserId: decoded.id,
          validateUserEmail: resultUser.email,
        }, appData.sensitiveConfig.jwtKey);
        const validateLink = (appData.sensitiveConfig.mailgunTargetDomain || appData.config.productionHostname) +
          "/rest/user/validate-email?token=" + encodeURIComponent(validateToken) + "&id=" + decoded.id;

        const templateToUse = i18nData.custom.validate_account_template_name;
        const from = `${i18nData.custom.validate_account_user} <${i18nData.custom.validate_account_email_user}@${appData.sensitiveConfig.mailgunDomain}>`;
        const to = resultUser.email;
        const subject = capitalize(i18nData.custom.validate_account);
        if (!templateToUse) {
          await appData.mailgun.messages().send({
            from,
            to,
            subject,
            text: `You do not have a template setup for language ${languageToUse}\n` +
            `validate_account_link = ${validateLink}\n` +
            `validate_account = ${capitalize(i18nData.custom.validate_account)}\n` +
            `validate_account_title = ${capitalize(i18nData.custom.validate_account_title)}\n` +
            `validate_account_description = ${i18nData.custom.validate_account_description}\n` +
            `validate_account_activate_button = ${capitalize(i18nData.custom.validate_account_activate_button)}\n` +
            `validate_account_alt_link = ${capitalize(i18nData.custom.validate_account_alt_link)}`
          });
        } else {
          await appData.mailgun.messages().send({
            from,
            to,
            subject,
            template: templateToUse,
            validate_account_link: validateLink,
            validate_account: capitalize(i18nData.custom.validate_account),
            validate_account_title: capitalize(i18nData.custom.validate_account_title),
            validate_account_description: i18nData.custom.validate_account_description,
            validate_account_activate_button: capitalize(i18nData.custom.validate_account_activate_button),
            validate_account_alt_link: capitalize(i18nData.custom.validate_account_alt_link),
          });
        }

        return {
          status: "OK",
        };
      }
    },
    send_reset_password: {
      type: STANDARD_REPLY,
      args: {
        email: {
          type: GraphQLNonNull(GraphQLString),
        }
      },
      async resolve(source: any, args: any, context: any, info: any) {
        if (!appData.mailgun) {
          throw new EndpointError({
            message: "Mailgun is not available",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        }

        // only emails that have been validated are valid, the reason is simple, otherwise this would allow any user to use
        // another invalidated email that other user has and then has a chance to recover and change their password instead
        // you might wonder why not to prevent email that are equal as that user to start with,
        // well this is to avoid a DDOS attack similar to one that was present at github
        // where you would set an invalidated email, and that user won't be able to claim its own email
        const resultUser = await appData.knex.first(
          CONNECTOR_SQL_COLUMN_ID_FK_NAME,
          "email",
          "username",
          "app_language",
        ).from(userTable)
          .where(emailPropertyDescription.sqlEqual(args.email, "", emailProperty.getId(), true, appData.knex))
          .andWhere(eValidatedPropertyDescription.sqlEqual(true, "", eValidatedProperty.getId(), false, appData.knex));

        if (!resultUser) {
          throw new EndpointError({
            message: "User with that email does not exist",
            code: ENDPOINT_ERRORS.NOT_FOUND,
          });
        }

        const appLanguage = resultUser.app_language;
        let languageToUse = appLanguage;
        let i18nData = userIdef.getI18nDataFor(appLanguage);
        if (!i18nData) {
          languageToUse = "en";
          i18nData = userIdef.getI18nDataFor("en");
        }

        const userId = resultUser[CONNECTOR_SQL_COLUMN_ID_FK_NAME];
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

        const resetToken = await jwtSign({
          resetPasswordUserId: userId,
          resetPasswordTempTokenCode: randomId,
        }, appData.sensitiveConfig.jwtKey);
        const resetPasswordLink = (appData.sensitiveConfig.mailgunTargetDomain || appData.config.productionHostname) +
          i18nData.custom.forgot_password_link_target + "?token=" + encodeURIComponent(resetToken);

        const templateToUse = i18nData.custom.forgot_password_template_name;
        const from = `${i18nData.custom.forgot_password_user} <${i18nData.custom.forgot_password_email_user}@${appData.sensitiveConfig.mailgunDomain}>`;
        const to = resultUser.email;
        const subject = capitalize(i18nData.custom.forgot_password_title);
        if (!templateToUse) {
          await appData.mailgun.messages().send({
            from,
            to,
            subject,
            text: `You do not have a template setup for language ${languageToUse}\n` +
            `forgot_password_link = ${resetPasswordLink}\n` +
            `forgot_password = ${capitalize(i18nData.custom.forgot_password)}\n` +
            `forgot_password_title = ${capitalize(i18nData.custom.forgot_password_title)}\n` +
            `forgot_password_description = ${i18nData.custom.forgot_password_description}\n` +
            `forgot_password_recover_button = ${capitalize(i18nData.custom.forgot_password_recover_button)}\n` +
            `forgot_password_alt_link = ${capitalize(i18nData.custom.forgot_password_alt_link)}\n` +
            `forgot_password_username = ${resultUser.username}`
          });
        } else {
          await appData.mailgun.messages().send({
            from,
            to,
            subject,
            template: templateToUse,
            forgot_password_link: resetPasswordLink,
            forgot_password: capitalize(i18nData.custom.forgot_password),
            forgot_password_title: capitalize(i18nData.custom.forgot_password_title),
            forgot_password_description: i18nData.custom.forgot_password_description,
            forgot_password_recover_button: capitalize(i18nData.custom.forgot_password_recover_button),
            forgot_password_alt_link: capitalize(i18nData.custom.forgot_password_alt_link),
            forgot_password_username: resultUser.username,
          });
        }

        return {
          status: "OK",
        };
      }
    },
    reset_password: {
      type: STANDARD_REPLY,
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        },
        new_password: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      async resolve(source: any, args: any, context: any, info: any) {
        let decoded: RecoverPasswordTokenType = null;
        try {
          // we attempt to decode it
          decoded = await jwtVerify<RecoverPasswordTokenType>(args.token, appData.sensitiveConfig.jwtKey);
        } catch (err) {
          throw new EndpointError({
            message: "Token is invalid",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          });
        }

        if (
          typeof decoded.resetPasswordUserId !== "number" ||
          typeof decoded.resetPasswordTempTokenCode !== "number"
        ) {
          throw new EndpointError({
            message: "Token is invalid",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          });
        }

        const codeWasSent = await getPromisified("USER_RESET_PASSWORD_TEMP_TOKEN_CODE." + decoded.resetPasswordTempTokenCode.toString());
        if (!codeWasSent) {
          throw new EndpointError({
            message: "Token is invalid",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          });
        }

        const invalidReason =
          passwordProperty.isValidValueNoExternalChecking(decoded.resetPasswordUserId, null, args.new_password);
        if (invalidReason) {
          throw new EndpointError({
            message: "Password is invalid",
            code: ENDPOINT_ERRORS.INVALID_PROPERTY,
            pcode: invalidReason,
            itemDefPath: userIdef.getPath(),
            modulePath: userModule.getPath(),
            propertyId: "password",
          });
        }

        const resultUser = await appData.cache.requestValue(
          userIdef,
          decoded.resetPasswordUserId,
          null,
        );

        if (!resultUser) {
          throw new EndpointError({
            message: "User does not exist",
            code: ENDPOINT_ERRORS.NOT_FOUND,
          });
        }

        await appData.cache.requestUpdate(
          userIdef,
          decoded.resetPasswordUserId,
          null,
          {
            password: args.new_password,
          },
          null,
          null,
          null,
          null,
        );

        await delPromisified("USER_RESET_PASSWORD_TEMP_TOKEN_CODE." + decoded.resetPasswordTempTokenCode.toString());

        return {
          status: "OK",
        };
      }
    },
  };
};
