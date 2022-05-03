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
import { capitalize, checkIsPossiblePhoneNumber, convertPhoneNumberToInternational } from "../../util";
import { NODE_ENV } from "../environment";

const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function generateRandomId(size: number) {
  var result = '';
  for (var i = size; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export interface IValidateUserTokenDataType {
  validateUserId: string;
  validateUserRandomId: string;
  validateType: "email" | "phone";
  validateValue: string;
}

export interface RecoverPasswordTokenType {
  resetPasswordUserId: string;
  resetPasswordRandomId: string;
};

const RESET_PASSWORD_EMAIL_RESEND_SECONDS_TIME = 60;
const RESET_PASSWORD_TOKEN_VALID_SECONDS_TIME = 86400;
const VERIFY_ACCOUNT_EMAIL_RESEND_SECONDS_TIME = 60;
const VERIFY_ACCOUNT_TOKEN_BY_RANDOMID_VALID_SECONDS_TIME = 86400;

export const customUserQueries = (appData: IAppDataType): IGQLQueryFieldsDefinitionType => {
  const userModule = appData.root.getModuleFor(["users"]);
  const userIdef = userModule.getItemDefinitionFor(["user"]);

  const userTable = userIdef.getQualifiedPathName();
  const moduleTable = userModule.getQualifiedPathName();

  const usernameProperty = userIdef.getPropertyDefinitionFor("username", false);
  const emailProperty = userIdef.hasPropertyDefinitionFor("email", false) &&
    userIdef.getPropertyDefinitionFor("email", false);
  const phoneProperty = userIdef.hasPropertyDefinitionFor("phone", false) &&
    userIdef.getPropertyDefinitionFor("phone", false);
  const eValidatedProperty = userIdef.hasPropertyDefinitionFor("e_validated", false) &&
    userIdef.getPropertyDefinitionFor("e_validated", false);
  const pValidatedProperty = userIdef.hasPropertyDefinitionFor("p_validated", false) &&
    userIdef.getPropertyDefinitionFor("p_validated", false);
  const passwordProperty = userIdef.getPropertyDefinitionFor("password", false);

  const userNamePropertyDescription = usernameProperty.getPropertyDefinitionDescription();
  const passwordPropertyDescription = passwordProperty.getPropertyDefinitionDescription();
  const emailPropertyDescription = emailProperty && emailProperty.getPropertyDefinitionDescription();
  const eValidatedPropertyDescription = eValidatedProperty && eValidatedProperty.getPropertyDefinitionDescription();
  const phonePropertyDescription = phoneProperty && phoneProperty.getPropertyDefinitionDescription();
  const pValidatedPropertyDescription = pValidatedProperty && pValidatedProperty.getPropertyDefinitionDescription();

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
        country: {
          type: GraphQLString,
        }
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
              {
                functionName: "customUserQueries",
                endpoint: "token",
                message: "Failed to retrieve user value from cache/database which caused the user not to login",
                serious: true,
                err,
                data: {
                  id: decoded.id,
                },
              },
            );
            throw err;
          }

          // now we check the session id to see if it has been cancelled
          if (!resultUser || (resultUser.session_id || 0) !== decoded.sessionId) {
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

          if (!args.country) {
            throw new EndpointError({
              message: "You must specify a country when loggin in via credentials, this is used to ensure proper phone numbers",
              code: ENDPOINT_ERRORS.UNSPECIFIED,
            });
          }

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
            if (emailProperty && eValidatedProperty) {
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
            }

            // cannot search by phone if these properties are missing
            if (phoneProperty && pValidatedProperty && checkIsPossiblePhoneNumber(args.username as string)) {
              const phoneNumberIntValue = convertPhoneNumberToInternational(
                args.username as string,
                args.country,
              );

              subqueryBuilder.orWhere(
                (internalOrQueryBuilder) => {
                  internalOrQueryBuilder.andWhere((internalUsernameWhereBuilder) => {
                    phonePropertyDescription.sqlEqual({
                      id: phoneProperty.getId(),
                      prefix: "",
                      ignoreCase: true,
                      serverData: appData.cache.getServerData(),
                      itemDefinition: userIdef,
                      include: null,
                      value: phoneNumberIntValue,
                      property: phoneProperty,
                      whereBuilder: internalUsernameWhereBuilder,
                    });
                  }).andWhere((internalPvalidatedWhereBuilder) => {
                    pValidatedPropertyDescription.sqlEqual({
                      id: pValidatedProperty.getId(),
                      prefix: "",
                      ignoreCase: true,
                      serverData: appData.cache.getServerData(),
                      itemDefinition: userIdef,
                      include: null,
                      value: true,
                      property: pValidatedProperty,
                      whereBuilder: internalPvalidatedWhereBuilder,
                    });
                  })
                }
              )
            }


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
              {
                functionName: "customUserQueries",
                endpoint: "token",
                message: "Failed to execute sql query in order to retrieve " +
                  "a user which caused the user to be unable to login",
                serious: true,
                err,
                data: {
                  username: args.username,
                },
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
              {
                className: "customUserQueries",
                methodName: "token",
                message: "Failed to sign token which caused user to be unable to login",
                serious: true,
                err,
                data: {
                  resultUser,
                },
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
    validate: {
      type: STANDARD_REPLY,
      args: {
        token: {
          type: GraphQLString,
        },
        random_id: {
          type: GraphQLString,
        },
        user_id: {
          type: GraphQLString,
        },
      },
      async resolve(source: any, args: any, context: any, info: any) {
        if ((!args.token && !args.random_id) || (args.random_id && !args.user_id)) {
          throw new EndpointError({
            message: "Invalid Credentials",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          });
        }

        let token = args.token;
        if (args.random_id) {
          token = await appData.redisGlobal.get(
            "USER_VERIFY_ACCOUNT_TEMP_TOKEN_CODE." + args.user_id + "." + args.random_id,
          );
        }

        if (!token) {
          throw new EndpointError({
            message: "Random id expired",
            code: ENDPOINT_ERRORS.TOKEN_EXPIRED,
          });
        }

        let decoded: IValidateUserTokenDataType;
        try {
          // we attempt to decode it
          decoded = await jwtVerify(token, appData.sensitiveConfig.secondaryJwtKey);
        } catch (err) {
          throw new EndpointError({
            message: "Invalid Token",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          });
        };

        if (decoded.validateType === "email" && !emailProperty || !eValidatedProperty) {
          throw new EndpointError({
            message: "This server does not support emails",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        } else if (decoded.validateType === "phone" && !phoneProperty || !pValidatedProperty) {
          throw new EndpointError({
            message: "This server does not support phone numbers",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        }

        if (!decoded.validateUserId || !decoded.validateValue) {
          throw new EndpointError({
            message: "Invalid token shape",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          });
        }

        let user: ISQLTableRowValue;

        try {
          user = await appData.cache.requestValue(userIdef, decoded.validateUserId, null);
          if (!user) {
            throw new EndpointError({
              message: "the user in question has been removed",
              code: ENDPOINT_ERRORS.USER_REMOVED,
            });
          } else if (user.blocked_at !== null) {
            throw new EndpointError({
              message: "the user in question has been blocked",
              code: ENDPOINT_ERRORS.USER_BLOCKED,
            });
          }
        } catch (err) {
          logger.error(
            {
              functionName: "customUserQueries",
              endpoint: "validate",
              message: "Failed to retrieve user from token credentials",
              err,
              data: {
                decoded,
              },
            }
          );
          throw err;
        }

        // this happens when the user sends a validation email/phone, then changes the email/phone
        // immediately and tries to use the previous token to validate the email/phone
        // a security concern
        if (user[decoded.validateType] !== decoded.validateValue) {
          // we consider this invalid as credentials it does refer
          throw new EndpointError({
            message: "The token credential is not granted to the same value as the current of the user",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          });
        }

        try {
          const result = await appData.databaseConnection.queryFirst(
            `SELECT ${JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME)} FROM ${JSON.stringify(userTable)} ` +
            `WHERE ` + JSON.stringify(decoded.validateType) + ` = $1 AND "${decoded.validateType[0]}_validated" = $2 LIMIT 1`,
            // cheap way to get email/phone e_validated/p_validated
            [
              decoded.validateValue,
              true,
            ],
          );

          if (result) {
            if (result[CONNECTOR_SQL_COLUMN_ID_FK_NAME] !== user.id) {
              throw new EndpointError({
                message: "The email/phone has been validated before this user managed to do so",
                code: decoded.validateType === "email" ? ENDPOINT_ERRORS.USER_EMAIL_TAKEN : ENDPOINT_ERRORS.USER_PHONE_TAKEN,
              });
            } else if (result[CONNECTOR_SQL_COLUMN_ID_FK_NAME] === user.id) {
              return {
                status: "OK",
              };
            }
          }
        } catch (err) {
          logger.error(
            {
              functionName: "customUserQueries",
              endpoint: "validate",
              message: "Failed to request users",
              err,
              data: {
                user,
              },
            }
          );
          throw err;
        }

        try {
          await appData.cache.requestUpdateSimple(
            userIdef,
            decoded.validateUserId,
            null,
            {
              [decoded.validateType === "email" ? "e_validated" : "p_validated"]: true,
            },
            null,
            null,
          );
        } catch (err) {
          logger.error(
            {
              functionName: "customUserQueries",
              endpoint: "validate",
              message: "Failed to set validated status to true",
              err,
              data: {
                user,
              },
            }
          );
          throw err;
        }

        return {
          status: "OK",
        };
      }
    },
    send_validate: {
      type: STANDARD_REPLY,
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        },
        type: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      async resolve(source: any, args: any, context: any, info: any) {
        const isMail = args.type === "email";
        const isPhone = args.type === "phone";

        if (isMail && !appData.mailService) {
          throw new EndpointError({
            message: "Mail service is not available",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        } else if (isMail && (!emailProperty || !eValidatedProperty)) {
          throw new EndpointError({
            message: "email and e_validated are not available, as such sending validation emails is not available",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        } else if (isPhone && !appData.phoneService) {
          throw new EndpointError({
            message: "Phone service is not available",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        } else if (isPhone && (!phoneProperty || !pValidatedProperty)) {
          throw new EndpointError({
            message: "phone and p_validated are not available, as such sending validation SMS is not available",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        } else if (!isMail && !isPhone) {
          throw new EndpointError({
            message: "Unknown type: " + args.type,
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
            {
              functionName: "customUserQueries",
              endpoint: "send_validate",
              message: "Failed to retrieve user",
              serious: true,
              err,
              data: {
                id: decoded.id,
              },
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

        if (isMail ? !resultUser.email : !resultUser.phone) {
          // the error is unspecified because this shouldn't
          // be allowed to happen in the client side
          throw new EndpointError({
            message: "There's no " + args.type + " to validate",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        } else if (isMail ? resultUser.e_validated : resultUser.p_validated) {
          throw new EndpointError({
            message: "User is already validated",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        }

        // now we try to find another user with such email that has already validated
        // such
        if (isMail) {
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
              {
                functionName: "customUserQueries",
                endpoint: "send_validate",
                message: "Could not perform the SQL query to find out if user with same email but " +
                  "validated existed which caused the current user to be unable to send a validation email",
                serious: true,
                err,
                data: {
                  resultUser,
                },
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
        } else {
          let userWithThatPhone: ISQLTableRowValue;
          try {
            userWithThatPhone = await appData.databaseConnection.queryFirst(
              `SELECT ${JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME)} FROM ${JSON.stringify(userTable)} ` +
              `WHERE "phone"=$1 AND "p_validated"=$2 LIMIT 1`,
              [
                resultUser.phone,
                true,
              ],
            );
          } catch (err) {
            logger.error(
              {
                functionName: "customUserQueries",
                endpoint: "send_validate",
                message: "Could not perform the SQL query to find out if user with same phone but " +
                  "validated existed which caused the current user to be unable to send a validation SMS",
                serious: true,
                err,
                data: {
                  resultUser,
                },
              },
            );
            throw err;
          }

          // if we ifind an user with the same email
          if (userWithThatPhone) {
            throw new EndpointError({
              message: "That phone number is taken",
              code: ENDPOINT_ERRORS.USER_PHONE_TAKEN,
            });
          }
        }

        try {
          const avoidSendingTarget =
            !!(await appData.redisGlobal.get("USER_VERIFY_ACCOUNT_TEMP_AVOID_SENDING." + args.type + "." + resultUser.id));
          if (avoidSendingTarget === (isMail ? resultUser.email : resultUser.phone)) {
            return {
              status: "OK",
            };
          }
        } catch (err) {
          logger.error(
            {
              functionName: "customUserQueries",
              endpoint: "send_validate",
              message: "Failed to retrieve flag from global redis instance to avoid sending " +
                "which caused to be unable to send the email at all",
              serious: true,
              err,
              data: {
                resultUser,
              },
            },
          );
          throw err;
        }

        const randomId = generateRandomId(6);

        let validateToken: string;
        try {
          validateToken = await jwtSign({
            validateUserId: decoded.id,
            validateUserRandomId: randomId,
            validateType: args.type,
            validateValue: isMail ? resultUser.email : resultUser.phone,
          }, appData.sensitiveConfig.secondaryJwtKey);
        } catch (err) {
          logger.error(
            {
              functionName: "customUserQueries",
              endpoint: "send_validate",
              message: "Could not sign the validation email token",
              serious: true,
              err,
              data: {
                resultUser,
              },
            },
          );
          throw err;
        }

        try {
          await appData.redisGlobal.set(
            "USER_VERIFY_ACCOUNT_TEMP_AVOID_SENDING." + args.type + "." + resultUser.id,
            isMail ? resultUser.email.toString() : resultUser.phone.toString()
          );
          await appData.redisGlobal.expire(
            "USER_VERIFY_ACCOUNT_TEMP_AVOID_SENDING." + args.type + "." + resultUser.id,
            VERIFY_ACCOUNT_EMAIL_RESEND_SECONDS_TIME,
          );
          await appData.redisGlobal.set(
            "USER_VERIFY_ACCOUNT_TEMP_TOKEN_CODE." + resultUser.id + "." + randomId,
            validateToken,
          );
          await appData.redisGlobal.expire(
            "USER_VERIFY_ACCOUNT_TEMP_TOKEN_CODE." + resultUser.id + "." + randomId,
            VERIFY_ACCOUNT_TOKEN_BY_RANDOMID_VALID_SECONDS_TIME,
          );
        } catch (err) {
          logger.error(
            {
              functionName: "customUserQueries",
              endpoint: "send_validate",
              message: "Could not set the global values for the temporary avoid sending email flags",
              serious: true,
              err,
              data: {
                resultUser,
              },
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

        const fragmentIdef = appData.root.getModuleFor(["cms"]).getItemDefinitionFor(["fragment"]);

        const extractedProperties: any = {};
        Object.keys(resultUser).forEach((p) => {
          if (typeof resultUser[p] === "string" || typeof resultUser[p] === "number") {
            extractedProperties[p] = resultUser[p].toString();
          }
        });

        const validateLink = (
          NODE_ENV === "development" ? appData.config.developmentHostname : appData.config.productionHostname
        ) +
          "/rest/user/validate?token=" + encodeURIComponent(validateToken) + "&id=" + encodeURIComponent(decoded.id);

        if (isMail) {
          const templateIdToUse = i18nData.custom.validate_account_email_fragment_id;

          const subject = capitalize(i18nData.custom.validate_account);

          await appData.mailService.sendTemplateEmail({
            fromUsername: i18nData.custom.validate_account_user,
            fromEmailHandle: i18nData.custom.validate_account_email_user,
            id: templateIdToUse,
            version: languageToUse,
            itemDefinition: fragmentIdef,
            args: {
              ...extractedProperties,
              validate_account_link: validateLink,
              validate_account_random_id: randomId,
            },
            property: fragmentIdef.getPropertyDefinitionFor("content", true),
            subject,
            to: resultUser,
            canUnsubscribe: false,
            ignoreUnsubscribe: true,
            subscribeProperty: null,
            emailProperty: "email",
          });
        } else {
          const templateIdToUse = i18nData.custom.validate_account_phone_fragment_id;

          await appData.phoneService.sendTemplateSMS({
            id: templateIdToUse,
            version: languageToUse,
            itemDefinition: fragmentIdef,
            args: {
              ...extractedProperties,
              validate_account_random_id: randomId,
              validate_account_link: validateLink,
            },
            property: fragmentIdef.getPropertyDefinitionFor("content", true),
            to: resultUser,
            ignoreUnsubscribe: true,
            subscribeProperty: null,
            phoneProperty: "phone",
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
          type: GraphQLString,
        },
        phone: {
          type: GraphQLString,
        }
      },
      async resolve(source: any, args: any, context: any, info: any) {
        if (!args.email && !args.phone) {
          throw new EndpointError({
            message: "You must specify either email or phone",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        }

        if (args.email && !appData.mailService) {
          throw new EndpointError({
            message: "Mail service is not available",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        } else if (args.email && (!emailProperty || !eValidatedProperty)) {
          throw new EndpointError({
            message: "email and e_validated are not available, as such password recovery is not available",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        } else if (args.phone && !appData.phoneService) {
          throw new EndpointError({
            message: "Phone service is not available",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        } else if (args.phone && (!phoneProperty || !pValidatedProperty)) {
          throw new EndpointError({
            message: "phone and p_validated are not available, as such password recovery is not available",
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
        selectQuery.select(CONNECTOR_SQL_COLUMN_ID_FK_NAME, args.email ? "email" : "phone", "username", "app_language");
        selectQuery.fromBuilder.from(userTable);
        selectQuery.limit(1);

        if (args.email) {
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
              property: emailProperty,
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
        } else {
          selectQuery.whereBuilder.andWhere((phoneWhereBuilder) => {
            phonePropertyDescription.sqlEqual({
              id: phoneProperty.getId(),
              prefix: "",
              ignoreCase: true,
              whereBuilder: phoneWhereBuilder,
              serverData: appData.cache.getServerData(),
              itemDefinition: userIdef,
              include: null,
              value: args.phone,
              property: phoneProperty,
            })
          }).andWhere((pvalidatedWhereBuilder) => {
            pValidatedPropertyDescription.sqlEqual({
              id: pValidatedProperty.getId(),
              prefix: "",
              ignoreCase: true,
              whereBuilder: pvalidatedWhereBuilder,
              serverData: appData.cache.getServerData(),
              itemDefinition: userIdef,
              include: null,
              value: true,
              property: pValidatedProperty,
            })
          });
        }

        try {
          resultUser = await appData.databaseConnection.queryFirst(selectQuery);
        } catch (err) {
          logger.error(
            {
              functionName: "customUserQueries",
              endpoint: "send_reset_password",
              message: "Could not request user from user table by email/phone",
              serious: true,
              err,
              data: {
                email: args.email,
              },
            },
          );
          throw err;
        }

        if (!resultUser) {
          throw new EndpointError({
            message: "User with that email/phone does not exist",
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
          const avoidSendingEmailOrSMS = !!(await appData.redisGlobal.get("USER_RESET_PASSWORD_TEMP_AVOID_SENDING." + userId.toString()));
          if (avoidSendingEmailOrSMS) {
            return {
              status: "OK",
            };
          }
        } catch (err) {
          logger.error(
            {
              functionName: "customUserQueries",
              endpoint: "send_reset_password",
              message: "Failed to retrieve flag from global redis instance to avoid sending " +
                "which caused to be unable to send the email at all",
              serious: true,
              err,
              data: {
                resultUser,
              },
            },
          );
          throw err;
        }

        const randomId = generateRandomId(6);

        let resetToken: string;
        try {
          resetToken = await jwtSign({
            resetPasswordUserId: userId,
            resetPasswordRandomId: randomId,
          }, appData.sensitiveConfig.secondaryJwtKey);
        } catch (err) {
          logger.error(
            {
              functionName: "customUserQueries",
              endpoint: "send_reset_password",
              message: "Failed to sign reset token",
              serious: true,
              err,
              data: {
                resultUser,
                randomId,
              },
            },
          );
          throw err;
        }

        try {
          await appData.redisGlobal.set("USER_RESET_PASSWORD_TEMP_TOKEN_CODE." + userId + "." + randomId, resetToken);
          await appData.redisGlobal.expire("USER_RESET_PASSWORD_TEMP_TOKEN_CODE." + randomId, RESET_PASSWORD_TOKEN_VALID_SECONDS_TIME);
          await appData.redisGlobal.set("USER_RESET_PASSWORD_TEMP_AVOID_SENDING." + userId, userId);
          await appData.redisGlobal.expire("USER_RESET_PASSWORD_TEMP_AVOID_SENDING." + userId, RESET_PASSWORD_EMAIL_RESEND_SECONDS_TIME);
        } catch (err) {
          logger.error(
            {
              functionName: "customUserQueries",
              endpoint: "send_reset_password",
              message: "Failed to set flags into global redis instance to avoid sending " +
                "which caused to be unable to send the email at all",
              serious: true,
              err,
              data: {
                resultUser,
                randomId,
              },
            },
          );
          throw err;
        }

        const templateIdToUse = args.email ? i18nData.custom.forgot_password_fragment_id : i18nData.custom.forgot_password_phone_fragment_id;

        const fragmentIdef = appData.root.getModuleFor(["cms"]).getItemDefinitionFor(["fragment"]);
        const extractedProperties: any = {};
        Object.keys(resultUser).forEach((p) => {
          if (typeof resultUser[p] === "string" || typeof resultUser[p] === "number") {
            extractedProperties[p] = resultUser[p].toString();
          }
        });

        const resetPasswordLink = (
          NODE_ENV === "development" ? appData.config.developmentHostname : appData.config.productionHostname
        ) +
          i18nData.custom.forgot_password_link_target + "?token=" +
          encodeURIComponent(resetToken) + "&id=" +
          encodeURIComponent(userId);

        if (args.email) {
          const subject = capitalize(i18nData.custom.forgot_password_title);

          await appData.mailService.sendTemplateEmail({
            fromUsername: i18nData.custom.validate_account_user,
            fromEmailHandle: i18nData.custom.validate_account_email_user,
            id: templateIdToUse,
            version: languageToUse,
            itemDefinition: fragmentIdef,
            args: {
              ...extractedProperties,
              forgot_password_link: resetPasswordLink,
              forgot_password_random_id: randomId,
            },
            property: fragmentIdef.getPropertyDefinitionFor("content", true),
            subject,
            to: resultUser,
            canUnsubscribe: false,
            ignoreUnsubscribe: true,
            subscribeProperty: null,
            emailProperty: "email",
          });
        } else {
          await appData.phoneService.sendTemplateSMS({
            id: templateIdToUse,
            version: languageToUse,
            itemDefinition: fragmentIdef,
            args: {
              ...extractedProperties,
              forgot_password_random_id: randomId,
              forgot_password_link: resetPasswordLink,
            },
            property: fragmentIdef.getPropertyDefinitionFor("content", true),
            to: resultUser,
            ignoreUnsubscribe: true,
            subscribeProperty: null,
            phoneProperty: "phone",
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
        random_id: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
        phone: {
          type: GraphQLString,
        },
        token: {
          type: GraphQLString,
        },
        new_password: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      async resolve(source: any, args: any, context: any, info: any) {
        const useTokenMethod = args.token;
        const usePhoneMethod = args.phone && args.random_id;
        const useEmailMethod = args.email && args.random_id;

        if (!usePhoneMethod && !useTokenMethod && !useEmailMethod) {
          throw new EndpointError({
            message: "You need to specify either a token, or a random_id + email or random_id + phone",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        }

        let randomId: string;
        let codeWasSent: string;
        let resultUser: ISQLTableRowValue;
        let userId: string;

        if (useTokenMethod) {
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
            typeof decoded.resetPasswordRandomId !== "string"
          ) {
            throw new EndpointError({
              message: "Reset token is invalid due to wrong shape",
              code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
            });
          }

          randomId = decoded.resetPasswordRandomId;
          userId = decoded.resetPasswordUserId;

          try {
            resultUser = await appData.cache.requestValue(
              userIdef,
              decoded.resetPasswordUserId,
              null,
            );
          } catch (err) {
            logger.error(
              {
                functionName: "customUserQueries",
                endpoint: "reset_password",
                message: "Failed to retrieve user",
                serious: true,
                err,
                data: {
                  decoded,
                },
              },
            );
            throw err;
          }

        } else {
          randomId = args.random_id;

          const selectQuery = appData.databaseConnection.getSelectBuilder();
          selectQuery.select(CONNECTOR_SQL_COLUMN_ID_FK_NAME, args.email ? "email" : "phone", "username", "app_language");
          selectQuery.fromBuilder.from(userTable);
          selectQuery.limit(1);

          if (args.email) {
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
                property: emailProperty,
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
          } else {
            selectQuery.whereBuilder.andWhere((phoneWhereBuilder) => {
              phonePropertyDescription.sqlEqual({
                id: phoneProperty.getId(),
                prefix: "",
                ignoreCase: true,
                whereBuilder: phoneWhereBuilder,
                serverData: appData.cache.getServerData(),
                itemDefinition: userIdef,
                include: null,
                value: args.phone,
                property: phoneProperty,
              })
            }).andWhere((pvalidatedWhereBuilder) => {
              pValidatedPropertyDescription.sqlEqual({
                id: pValidatedProperty.getId(),
                prefix: "",
                ignoreCase: true,
                whereBuilder: pvalidatedWhereBuilder,
                serverData: appData.cache.getServerData(),
                itemDefinition: userIdef,
                include: null,
                value: true,
                property: pValidatedProperty,
              })
            });
          }

          try {
            resultUser = await appData.databaseConnection.queryFirst(selectQuery);
            userId = resultUser[CONNECTOR_SQL_COLUMN_ID_FK_NAME];
          } catch (err) {
            logger.error(
              {
                functionName: "customUserQueries",
                endpoint: "send_reset_password",
                message: "Could not request user from user table by email/phone",
                serious: true,
                err,
                data: {
                  email: args.email,
                  phone: args.phone,
                },
              },
            );
            throw err;
          }
        }

        if (!resultUser) {
          throw new EndpointError({
            message: "User does not exist",
            code: ENDPOINT_ERRORS.NOT_FOUND,
          });
        }

        try {
          codeWasSent = await appData.redisGlobal.get("USER_RESET_PASSWORD_TEMP_TOKEN_CODE." + userId + "." + randomId);
        } catch (err) {
          logger.error(
            {
              functionName: "customUserQueries",
              endpoint: "reset_password",
              message: "Failed to check the token code that was sent",
              serious: true,
              err,
            },
          );
          throw err;
        }

        if (!codeWasSent) {
          throw new EndpointError({
            message: "Reset token/random id is invalid due to expiration",
            code: ENDPOINT_ERRORS.TOKEN_EXPIRED,
          });
        }

        const invalidReason =
          passwordProperty.isValidValueNoExternalChecking(resultUser.id, null, args.new_password);
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

        try {
          await appData.cache.requestUpdateSimple(
            userIdef,
            userId,
            null,
            {
              password: args.new_password,
            },
            null,
            null,
          );
        } catch (err) {
          logger.error(
            {
              functionName: "customUserQueries",
              endpoint: "reset_password",
              message: "Failed to run password update request",
              serious: true,
              err,
            },
          );
          throw err;
        }

        (async () => {
          try {
            await appData.redisGlobal.del("USER_RESET_PASSWORD_TEMP_TOKEN_CODE." + userId + "." + randomId);
          } catch (err) {
            logger.error(
              {
                functionName: "customUserQueries",
                endpoint: "reset_password (detached)",
                message: "Failed to remove temporary token code for password reset",
                err,
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
