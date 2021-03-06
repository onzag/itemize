import { IAppDataType } from "..";
import { logger } from "../logger";
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

interface RecoverPasswordTokenType {
  resetPasswordUserId: string;
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
  const emailProperty = userIdef.hasPropertyDefinitionFor("email", false) &&
    userIdef.getPropertyDefinitionFor("email", false);
  const eValidatedProperty = userIdef.hasPropertyDefinitionFor("e_validated", false) &&
    userIdef.getPropertyDefinitionFor("e_validated", false);
  const passwordProperty = userIdef.getPropertyDefinitionFor("password", false);

  const userNamePropertyDescription = usernameProperty.getPropertyDefinitionDescription();
  const passwordPropertyDescription = passwordProperty.getPropertyDefinitionDescription();
  const emailPropertyDescription = emailProperty && emailProperty.getPropertyDefinitionDescription();
  const eValidatedPropertyDescription = eValidatedProperty && eValidatedProperty.getPropertyDefinitionDescription();

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

          // only real user tokens can be used here for these
          // kind of requests so they must have this shape
          // other sort of tokens cannot be used in this
          if (
            typeof decoded.id !== "string" ||
            typeof decoded.role !== "string" ||
            typeof decoded.sessionId !== "number"
          ) {
            throw new EndpointError({
              message: "Token is invalid due to wrong shape",
              code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
            });
          }

          // and set the token as the pre generated token so we reuse it
          preGeneratedToken = args.token;
          try {
            resultUser = await appData.cache.requestValue(
              userIdef,
              decoded.id,
              null,
            );
          } catch (err) {
            logger.error(
              "customUserQueries.token [SERIOUS]: failed to retrieve user value from cache/database which caused the user not to login",
              {
                errMessage: err.message,
                errStack: err.stack,
                id: decoded.id,
              },
            );
            throw err;
          }

          // now we check the session id to see if it has been cancelled
          if (!resultUser || (resultUser.session_id || 0) !== decoded.sessionId) {
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
          const selectQuery = appData.databaseConnection.getSelectBuilder();
          selectQuery.select("id", "role", "session_id", "blocked_at");
          selectQuery.fromBuilder.from(moduleTable);
          selectQuery.joinBuilder.join(userTable, (clause) => {
            clause
              .onColumnEquals(CONNECTOR_SQL_COLUMN_ID_FK_NAME, "id")
              .onColumnEquals(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "version");
          });
          selectQuery.limit(1);

          selectQuery.whereBuilder.andWhere((subqueryBuilder) => {
            subqueryBuilder.orWhere(
              (internalOrQueryBuilder) => {
                userNamePropertyDescription.sqlEqual({
                  id: usernameProperty.getId(),
                  prefix: "",
                  ignoreCase: true,
                  serverData: appData.cache.getServerData(),
                  itemDefinition: userIdef,
                  include: null,
                  value: args.username as string,
                  property: usernameProperty,
                  whereBuilder: internalOrQueryBuilder,
                })
              }
            );

            // cannot search by email if these properties are missing
            if (!emailProperty || !eValidatedProperty) {
              return;
            }

            // only emails that have been validated are valid, the reason is simple, otherwise this would allow any user to use
            // another invalidated email that other user has and has a chance to login as them
            // you might wonder why not avoid them to set the
            // email as that user to start with, well this is to avoid a DDOS attack similar to one that was present at github
            // where you would set an invalidated email, and that user won't be able to claim its own email
            subqueryBuilder.orWhere(
              (internalOrQueryBuilder) => {
                internalOrQueryBuilder.andWhere((internalUsernameWhereBuilder) => {
                  emailPropertyDescription.sqlEqual({
                    id: emailProperty.getId(),
                    prefix: "",
                    ignoreCase: true,
                    serverData: appData.cache.getServerData(),
                    itemDefinition: userIdef,
                    include: null,
                    value: args.username as string,
                    property: usernameProperty,
                    whereBuilder: internalUsernameWhereBuilder,
                  });
                }).andWhere((internalEvalidatedWhereBuilder) => {
                  eValidatedPropertyDescription.sqlEqual({
                    id: eValidatedProperty.getId(),
                    prefix: "",
                    ignoreCase: true,
                    serverData: appData.cache.getServerData(),
                    itemDefinition: userIdef,
                    include: null,
                    value: true,
                    property: eValidatedProperty,
                    whereBuilder: internalEvalidatedWhereBuilder,
                  });
                })
              }
            )
          }).andWhere((internalPasswordWhereBuilder) => {
            passwordPropertyDescription.sqlEqual({
              id: passwordProperty.getId(),
              prefix: "",
              ignoreCase: true,
              serverData: appData.cache.getServerData(),
              itemDefinition: userIdef,
              include: null,
              value: args.password as string,
              property: passwordProperty,
              whereBuilder: internalPasswordWhereBuilder,
            })
          });

          try {
            resultUser = await appData.databaseConnection.queryFirst(selectQuery) || null;
          } catch (err) {
            logger.error(
              "customUserQueries.token [SERIOUS]: failed to execute sql query in order to retrieve " +
              "a user which caused the user to be unable to login",
              {
                errMessage: err.message,
                errStack: err.stack,
                username: args.username,
              },
            );
            throw err;
          }

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

          try {
            // otherwise we provide the token, either re-give the same token
            // or provide a new one
            const token = preGeneratedToken || (await jwtSign({
              id: resultUser.id,
              role: resultUser.role,
              sessionId: resultUser.session_id || 0,
            }, appData.sensitiveConfig.jwtKey));
            // and we return the information back to the user
            return {
              ...resultUser,
              token,
            };
          } catch (err) {
            logger.error(
              "customUserQueries.token [SERIOUS]: failed to sign token which caused user to be unable to login",
              {
                errMessage: err.message,
                errStack: err.stack,
                resultUser,
              },
            );
            throw err;
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
        if (!appData.mailService) {
          throw new EndpointError({
            message: "Mail service is not available",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        } else if (!emailProperty || !eValidatedProperty) {
          throw new EndpointError({
            message: "email and e_validated are not available, as such sending validation emails is not available",
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

        let resultUser: ISQLTableRowValue;
        try {
          resultUser = await appData.cache.requestValue(userIdef, decoded.id, null);
        } catch (err) {
          logger.error(
            "customUserQueries.send_validate_email [SERIOUS]: failed to retrieve user",
            {
              errMessage: err.message,
              errStack: err.stack,
              id: decoded.id,
            },
          );
          throw err;
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
        let userWithThatEmail: ISQLTableRowValue;
        try {
          userWithThatEmail = await appData.databaseConnection.queryFirst(
            `SELECT ${JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME)} FROM ${JSON.stringify(userTable)} ` +
            `WHERE "email"=$1 AND "e_validated"=$2 LIMIT 1`,
            [
              resultUser.email,
              true,
            ],
          );
        } catch (err) {
          logger.error(
            "customUserQueries.send_validate_email [SERIOUS]: could not perform the SQL query to find out if user with same email but " +
            "validated existed which caused the current user to be unable to send a validation email",
            {
              errMessage: err.message,
              errStack: err.stack,
              resultUser,
            },
          );
          throw err;
        }

        // if we ifind an user with the same email
        if (userWithThatEmail) {
          throw new EndpointError({
            message: "That email is taken",
            code: ENDPOINT_ERRORS.USER_EMAIL_TAKEN,
          });
        }

        try {
          const avoidSendingEmailEmailTarget =
            !!(await appData.redisGlobal.get("USER_VERIFY_ACCOUNT_EMAIL_TEMP_AVOID_SENDING." + resultUser.id.toString()));
          if (avoidSendingEmailEmailTarget === resultUser.email) {
            return {
              status: "OK",
            };
          }
        } catch (err) {
          logger.error(
            "customUserQueries.send_validate_email [SERIOUS]: failed to retrieve flag from global redis instance to avoid sending " +
            "which caused to be unable to send the email at all",
            {
              errMessage: err.message,
              errStack: err.stack,
              resultUser,
            },
          );
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

        let validateToken: string;
        try {
          validateToken = await jwtSign({
            validateUserId: decoded.id,
            validateUserEmail: resultUser.email,
          }, appData.sensitiveConfig.secondaryJwtKey);
        } catch (err) {
          logger.error(
            "customUserQueries.send_validate_email [SERIOUS]: could not sign the validation email token",
            {
              errMessage: err.message,
              errStack: err.stack,
              resultUser,
            },
          );
          throw err;
        }

        try {
          await appData.redisGlobal.set("USER_VERIFY_ACCOUNT_EMAIL_TEMP_AVOID_SENDING." + resultUser.id.toString(), resultUser.email.toString());
          await appData.redisGlobal.expire("USER_VERIFY_ACCOUNT_EMAIL_TEMP_AVOID_SENDING." + resultUser.id.toString(), VERIFY_ACCOUNT_EMAIL_RESEND_SECONDS_TIME);
        } catch (err) {
          logger.error(
            "customUserQueries.send_validate_email [SERIOUS]: could not set the global values for the temporary avoid sending email flags",
            {
              errMessage: err.message,
              errStack: err.stack,
              resultUser,
            },
          );
          throw err;
        }

        const validateLink = (
          process.env.NODE_ENV === "development" ? appData.config.developmentHostname : appData.config.productionHostname
        ) +
          "/rest/user/validate-email?token=" + encodeURIComponent(validateToken) + "&id=" + encodeURIComponent(decoded.id);
        const templateIdToUse = i18nData.custom.validate_account_fragment_id;

        const subject = capitalize(i18nData.custom.validate_account);

        const fragmentIdef = appData.root.getModuleFor(["cms"]).getItemDefinitionFor(["fragment"]);

        const extractedProperties: any = {};
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
            ...extractedProperties,
            validate_account_link: validateLink,
          },
          property: fragmentIdef.getPropertyDefinitionFor("content", true),
          subject,
          to: resultUser,
          canUnsubscribe: false,
          ignoreUnsubscribe: true,
          subscribeProperty: null,
          emailProperty: "email",
        });

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
        if (!appData.mailService) {
          throw new EndpointError({
            message: "Mail service is not available",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        } else if (!emailProperty || !eValidatedProperty) {
          throw new EndpointError({
            message: "email and e_validated are not available, as such password recovery is not available",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        }

        // only emails that have been validated are valid, the reason is simple, otherwise this would allow any user to use
        // another invalidated email that other user has and then has a chance to recover and change their password instead
        // you might wonder why not to prevent email that are equal as that user to start with,
        // well this is to avoid a DDOS attack similar to one that was present at github
        // where you would set an invalidated email, and that user won't be able to claim its own email
        let resultUser: ISQLTableRowValue;

        const selectQuery = appData.databaseConnection.getSelectBuilder();
        selectQuery.select(CONNECTOR_SQL_COLUMN_ID_FK_NAME, "email", "username", "app_language");
        selectQuery.fromBuilder.from(userTable);
        selectQuery.limit(1);

        selectQuery.whereBuilder.andWhere((emailWhereBuilder) => {
          emailPropertyDescription.sqlEqual({
            id: emailProperty.getId(),
            prefix: "",
            ignoreCase: true,
            whereBuilder: emailWhereBuilder,
            serverData: appData.cache.getServerData(),
            itemDefinition: userIdef,
            include: null,
            value: args.email,
            property: eValidatedProperty,
          })
        }).andWhere((evalidatedWhereBuilder) => {
          eValidatedPropertyDescription.sqlEqual({
            id: eValidatedProperty.getId(),
            prefix: "",
            ignoreCase: true,
            whereBuilder: evalidatedWhereBuilder,
            serverData: appData.cache.getServerData(),
            itemDefinition: userIdef,
            include: null,
            value: true,
            property: eValidatedProperty,
          })
        });

        try {
          resultUser = await appData.databaseConnection.queryFirst(selectQuery);
        } catch (err) {
          logger.error(
            "customUserQueries.send_reset_password [SERIOUS]: could not request user from user table by email",
            {
              errMessage: err.message,
              errStack: err.stack,
              email: args.email,
            },
          );
          throw err;
        }

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

        try {
          const avoidSendingEmail = !!(await appData.redisGlobal.get("USER_RESET_PASSWORD_TEMP_AVOID_SENDING." + userId.toString()));
          if (avoidSendingEmail) {
            return {
              status: "OK",
            };
          }
        } catch (err) {
          logger.error(
            "customUserQueries.send_reset_password [SERIOUS]: failed to retrieve flag from global redis instance to avoid sending " +
            "which caused to be unable to send the email at all",
            {
              errMessage: err.message,
              errStack: err.stack,
              resultUser,
            },
          );
          throw err;
        }

        const randomId = Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));

        try {
          await appData.redisGlobal.set("USER_RESET_PASSWORD_TEMP_TOKEN_CODE." + randomId.toString(), userId.toString());
          await appData.redisGlobal.expire("USER_RESET_PASSWORD_TEMP_TOKEN_CODE." + randomId.toString(), RESET_PASSWORD_TOKEN_VALID_SECONDS_TIME);
          await appData.redisGlobal.set("USER_RESET_PASSWORD_TEMP_AVOID_SENDING." + userId.toString(), userId.toString());
          await appData.redisGlobal.expire("USER_RESET_PASSWORD_TEMP_AVOID_SENDING." + userId.toString(), RESET_PASSWORD_EMAIL_RESEND_SECONDS_TIME);
        } catch (err) {
          logger.error(
            "customUserQueries.send_reset_password [SERIOUS]: failed to set flags into global redis instance to avoid sending " +
            "which caused to be unable to send the email at all",
            {
              errMessage: err.message,
              errStack: err.stack,
              resultUser,
              randomId,
            },
          );
          throw err;
        }

        let resetToken: string;
        try {
          resetToken = await jwtSign({
            resetPasswordUserId: userId,
            resetPasswordTempTokenCode: randomId,
          }, appData.sensitiveConfig.secondaryJwtKey);
        } catch (err) {
          logger.error(
            "customUserQueries.send_reset_password [SERIOUS]: failed to sign reset token",
            {
              errMessage: err.message,
              errStack: err.stack,
              resultUser,
              randomId,
            },
          );
          throw err;
        }

        const resetPasswordLink = (
          process.env.NODE_ENV === "development" ? appData.config.developmentHostname : appData.config.productionHostname
        ) +
          i18nData.custom.forgot_password_link_target + "?token=" +
          encodeURIComponent(resetToken) + "&id=" +
          encodeURIComponent(userId);

        const templateIdToUse = i18nData.custom.forgot_password_fragment_id;
        const subject = capitalize(i18nData.custom.forgot_password_title);

        const extractedProperties: any = {};
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
            ...extractedProperties,
            forgot_password_link: resetPasswordLink,
          },
          property: fragmentIdef.getPropertyDefinitionFor("content", true),
          subject,
          to: resultUser,
          canUnsubscribe: false,
          ignoreUnsubscribe: true,
          subscribeProperty: null,
          emailProperty: "email",
        });

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
          decoded = await jwtVerify<RecoverPasswordTokenType>(args.token, appData.sensitiveConfig.secondaryJwtKey);
        } catch (err) {
          throw new EndpointError({
            message: "Reset token is invalid",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          });
        }

        if (
          typeof decoded.resetPasswordUserId !== "string" ||
          typeof decoded.resetPasswordTempTokenCode !== "number"
        ) {
          throw new EndpointError({
            message: "Reset token is invalid due to wrong shape",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          });
        }

        let codeWasSent: any;
        try {
          codeWasSent = await appData.redisGlobal.get("USER_RESET_PASSWORD_TEMP_TOKEN_CODE." + decoded.resetPasswordTempTokenCode.toString());
        } catch (err) {
          logger.error(
            "customUserQueries.reset_password [SERIOUS]: failed to check the token code that was sent",
            {
              errMessage: err.message,
              errStack: err.stack,
              decoded,
            },
          );
          throw err;
        }

        if (!codeWasSent) {
          throw new EndpointError({
            message: "Reset token is invalid due to expiration",
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

        let resultUser: ISQLTableRowValue;

        try {
          resultUser = await appData.cache.requestValue(
            userIdef,
            decoded.resetPasswordUserId,
            null,
          );
        } catch (err) {
          logger.error(
            "customUserQueries.reset_password [SERIOUS]: failed to retrieve user",
            {
              errMessage: err.message,
              errStack: err.stack,
              decoded,
            },
          );
          throw err;
        }

        if (!resultUser) {
          throw new EndpointError({
            message: "User does not exist",
            code: ENDPOINT_ERRORS.NOT_FOUND,
          });
        }

        try {
          await appData.cache.requestUpdateSimple(
            userIdef,
            decoded.resetPasswordUserId,
            null,
            {
              password: args.new_password,
            },
            null,
          );
        } catch (err) {
          logger.error(
            "customUserQueries.reset_password [SERIOUS]: failed to run password update request",
            {
              errMessage: err.message,
              errStack: err.stack,
              decoded,
            },
          );
          throw err;
        }

        (async () => {
          try {
            await appData.redisGlobal.del("USER_RESET_PASSWORD_TEMP_TOKEN_CODE." + decoded.resetPasswordTempTokenCode.toString());
          } catch (err) {
            logger.error(
              "customUserQueries.reset_password (detached): failed to remove temporary token code for password reset",
              {
                errMessage: err.message,
                errStack: err.stack,
                decoded,
              },
            );
          }
        })();

        return {
          status: "OK",
        };
      }
    },
  };
};
