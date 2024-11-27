import { IAppDataType } from "..";
import { logger } from "../logger";
import express, { Router } from "express";
import { ENDPOINT_ERRORS, CONNECTOR_SQL_COLUMN_ID_FK_NAME, SECONDARY_JWT_KEY, JWT_KEY, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME } from "../../constants";
import { jwtVerify, jwtSign } from "../token";
import { ISQLTableRowValue } from "../../base/Root/sql";
import bcyrpt from "bcrypt";
import { IServerSideTokenDataType } from "../resolvers/basic";
import { capitalize, checkIsPossiblePhoneNumber, convertPhoneNumberToInternational } from "../../util";
import { NODE_ENV } from "../environment";
import { EndpointError } from "../../base/errors";

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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

export interface IUnsubscribeUserTokenDataType {
  unsubscribeUserId: string;
  unsubscribeProperty: string;
}

async function wait(n: number) {
  return new Promise((r) => {
    setTimeout(r, n);
  })
}

export function userRestServices(appData: IAppDataType) {
  const userModule = appData.root.getModuleFor(["users"]);
  const userIdef = userModule.getItemDefinitionFor(["user"]);

  const hasEmailProperty = userIdef.hasPropertyDefinitionFor("email", false);
  const hasEvalidatedProperty = userIdef.hasPropertyDefinitionFor("e_validated", false);
  const hasPhoneProperty = userIdef.hasPropertyDefinitionFor("phone", false);
  const hasPvalidatedProperty = userIdef.hasPropertyDefinitionFor("p_validated", false);

  const userTable = userIdef.getQualifiedPathName();
  const moduleTable = userIdef.getParentModule().getQualifiedPathName();

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

  async function tokenQuery(res: express.Response, arg: { username: string; token: string; password: string; country: string }) {
    if (res) {
      res.setHeader("content-type", "application/json; charset=utf-8");
    }

    try {
      // if there is no username and there is no token
      // the credentials are automatically invalid
      if (!arg.username && !arg.token) {
        const error = {
          message: "Invalid Credentials",
          code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
        };
        if (!res) {
          throw new EndpointError(error);
        } else {
          res.status(403).end(JSON.stringify({
            error,
          }));
          return;
        }
      }

      let preGeneratedToken: string = null;
      let resultUser: ISQLTableRowValue = null;

      // if we have a token provided
      if (arg.token) {
        let decoded: IServerSideTokenDataType = null;
        try {
          // we attempt to decode it
          decoded = await jwtVerify<IServerSideTokenDataType>(arg.token, await appData.registry.getJWTSecretFor(JWT_KEY));
        } catch (err) {
          const error = {
            message: "Token is invalid",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          };
          if (!res) {
            throw new EndpointError(error);
          } else {
            res.status(403).end(JSON.stringify({
              error,
            }))
            return;
          }
        }

        // only real user tokens can be used here for these
        // kind of requests so they must have this shape
        // other sort of tokens cannot be used in this
        if (
          typeof decoded.id !== "string" ||
          typeof decoded.role !== "string" ||
          typeof decoded.sessionId !== "number"
        ) {
          const error = {
            message: "Token is invalid due to wrong shape",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          };
          if (!res) {
            throw new EndpointError(error);
          } else {
            res.status(400).end(JSON.stringify({
              error,
            }))
            return;
          }
        }

        // and set the token as the pre generated token so we reuse it
        preGeneratedToken = arg.token;
        try {
          resultUser = await appData.cache.requestValue(
            userIdef,
            decoded.id,
            null,
          );
        } catch (err) {
          logger.error(
            {
              functionName: "userRestServices",
              endpoint: "token",
              message: "Failed to retrieve user value from cache/database which caused the user not to login",
              serious: true,
              err,
              data: {
                id: decoded.id,
              },
            },
          );

          const error = {
            message: "Internal Server Error",
            code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
          };

          if (!res) {
            throw new EndpointError(error);
          } else {
            res.status(500).end(JSON.stringify({
              error,
            }));
            return;
          }
        }

        // now we check the session id to see if it has been cancelled
        if (!resultUser || (resultUser.session_id || 0) !== decoded.sessionId) {
          const error = {
            message: "Session has been cancelled",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          };
          if (!res) {
            throw new EndpointError(error);
          } else {
            res.status(403).end(JSON.stringify({
              error,
            }));
            return;
          }
        } else if (resultUser.role !== decoded.role) {
          const error = {
            message: "Token role mismatch",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          };
          if (!res) {
            throw new EndpointError(error);
          } else {
            res.status(403).end(JSON.stringify({
              error,
            }));
            return;
          }
        }

      } else {
        if (!arg.country) {
          const error = {
            message: "You must specify a country when loggin in via credentials, this is used to ensure proper phone numbers",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          };

          if (!res) {
            throw new EndpointError(error);
          } else {
            res.status(400).end(JSON.stringify({
              error,
            }));
            return;
          }
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
                value: arg.username as string,
                property: usernameProperty,
                whereBuilder: internalOrQueryBuilder,
                appData,
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
                    value: arg.username as string,
                    property: usernameProperty,
                    whereBuilder: internalUsernameWhereBuilder,
                    appData,
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
                    appData,
                  });
                })
              }
            )
          }

          // cannot search by phone if these properties are missing
          if (phoneProperty && pValidatedProperty && checkIsPossiblePhoneNumber(arg.username as string)) {
            const phoneNumberIntValue = convertPhoneNumberToInternational(
              arg.username as string,
              arg.country,
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
                    appData,
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
                    appData,
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
            value: arg.password as string,
            property: passwordProperty,
            whereBuilder: internalPasswordWhereBuilder,
            appData,
          })
        });

        if (res) {
          // Security slowdown
          // should prevent brute force logins even if they are using different IPs
          // yes it has the potential to affect the user, making its login slow too
          try {
            // get the last login data if any
            const lastLoginAttemptData = await appData.redisGlobal.get(
              "USER_LAST_LOGIN_ATTEMPT." + arg.username,
            );
            const lastLoginAttemptDataParsed: [string, number] = (lastLoginAttemptData && JSON.parse(lastLoginAttemptData)) || [null, 0];

            // save the current last login attempt for the user
            const currentDate = new Date();
            await appData.redisGlobal.set(
              "USER_LAST_LOGIN_ATTEMPT." + arg.username,
              JSON.stringify([currentDate.toISOString(), lastLoginAttemptDataParsed[1] + 1]),
            );
            // make it expire 10 seconds
            await appData.redisGlobal.expire(
              "USER_LAST_LOGIN_ATTEMPT." + arg.username,
              10,
            );

            // we have a date that we last tried
            if (lastLoginAttemptDataParsed[0]) {
              // lets parse it
              const lastLoginAttemptTime = (new Date(lastLoginAttemptDataParsed[0])).getTime();
              // current time
              const currentTime = currentDate.getTime();

              // the amount of time it ellapsed
              const diff = currentTime - lastLoginAttemptTime;
              // so we add 100ms to the number of attempts within 10 seconds, that's the smallest
              // time we are allowed to try to login again
              let minAllowedDiff = 100 * lastLoginAttemptDataParsed[1];
              // make it 10 seconds tops
              if (minAllowedDiff > 10000) {
                minAllowedDiff = 10000;
              }

              // so if we tried to login again in less than the allowed minimum time
              if (diff < minAllowedDiff) {
                // the amount of time necessary to make up for those milliseconds
                const msDiff = minAllowedDiff - diff;

                // only relevant if more than 100ms
                if (msDiff >= 100) {
                  // make it slow
                  await wait(msDiff);
                }
              }
            }
          } catch (err) {
            logger.error(
              {
                functionName: "userRestServices",
                endpoint: "token",
                message: "Failed to perform the security slowdown for preventing brute force login attempts",
                serious: true,
                err,
                data: {
                  username: arg.username,
                },
              },
            );

            const error = {
              message: "Internal Server Error",
              code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
            };

            if (!res) {
              throw new EndpointError(error);
            } else {
              res.status(500).end(JSON.stringify({
                error,
              }));
              return;
            }
          }
        }

        try {
          resultUser = await appData.databaseConnection.queryFirst(selectQuery) || null;
        } catch (err) {
          logger.error(
            {
              functionName: "userRestServices",
              endpoint: "token",
              message: "Failed to execute sql query in order to retrieve " +
                "a user which caused the user to be unable to login",
              serious: true,
              err,
              data: {
                username: arg.username,
              },
            },
          );
          const error = {
            message: "Internal Server Error",
            code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
          };
          if (!res) {
            throw new EndpointError(error);
          } else {
            res.status(500).end(JSON.stringify({
              error,
            }));
            return;
          }
        }

        if (!resultUser) {
          // if we don't get an user and we previously
          // have used a username and password combination
          // we give an invalid credentials error
          const error = {
            message: "Invalid Credentials",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          };

          if (!res) {
            throw new EndpointError(error);
          } else {
            res.status(403).end(JSON.stringify({
              error,
            }));
            return;
          }
        }
      }

      // if we get an user
      if (resultUser) {
        // if the user is blocked
        if (resultUser.blocked_at) {
          const error = {
            message: "User is Blocked",
            code: ENDPOINT_ERRORS.USER_BLOCKED,
          };
          if (!res) {
            throw new EndpointError(error);
          } else {
            // we give an error for that
            res.status(403).end(JSON.stringify({
              error,
              blocked_until: resultUser.blocked_until || null,
            }));
            return;
          }
        }

        try {
          // otherwise we provide the token, either re-give the same token
          // or provide a new one
          const token = preGeneratedToken || (await jwtSign({
            id: resultUser.id,
            role: resultUser.role,
            sessionId: resultUser.session_id || 0,
          }, await appData.registry.getJWTSecretFor(JWT_KEY)));
          // and we return the information back to the user
          const rs = {
            id: resultUser.id,
            role: resultUser.role,
            token,
          };

          if (res) {
            res.status(200).end(JSON.stringify(rs));
            return;
          } else {
            return rs;
          }
        } catch (err) {
          logger.error(
            {
              className: "userRestServices",
              endpoint: "token",
              message: "Failed to sign token which caused user to be unable to login",
              serious: true,
              err,
              data: {
                resultUser,
              },
            },
          );


          const error = {
            message: "Internal Server Error",
            code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
          };
          if (!res) {
            throw new EndpointError(error);
          } else {
            res.status(500).end(JSON.stringify({
              error,
            }));
            return;
          }
        }
      } else {
        const error = {
          message: "User has been removed",
          code: ENDPOINT_ERRORS.USER_REMOVED,
        };
        // otherwise the user has been removed as the id
        // is not found, this can happen if the user
        // has kept a session active after nuking his account
        if (!res) {
          throw new EndpointError(error);
        } else {
          res.status(404).end(JSON.stringify({
            error,
          }));
        }
        return;
      }
    } catch (err) {
      if (err instanceof EndpointError) {
        throw err;
      } else {
        logger.error(
          {
            className: "userRestServices",
            endpoint: "token",
            message: "Error while trying to login",
            serious: true,
            err,
          },
        );
        const error = {
          message: "Internal Server Error",
          code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
        };
        if (!res) {
          throw new EndpointError(error);
        } else {
          res.status(500).end(JSON.stringify({
            error,
          })); 
        }
        return;
      }
    }
  }

  appData.userTokenQuery = tokenQuery.bind(null, null);

  const router = Router();

  const bodyParserJSON = express.json({
    strict: false,
  });

  // now we use the body parse router
  router.use((req, res, next) => {
    bodyParserJSON(req, res, (err) => {
      if (err) {
        res.setHeader("content-type", "application/json; charset=utf-8");
        res.status(400);
        res.end(JSON.stringify({
          message: "malformed json",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        }));
      } else {
        next();
      }
    });
  });

  router.post("/token", async (req, res) => {
    const username = req.body.username;
    const token = req.headers.token as string;
    const password = req.body.password;
    const country = req.body.country;

    tokenQuery(res, {
      username,
      token,
      password,
      country,
    });
  });
  router.get("/validate", async (req, res) => {
    const noRedirect = req.query.noRedirect;

    if (noRedirect) {
      res.setHeader("content-type", "application/json; charset=utf-8");
    }

    try {
      if ((!req.query.token && !req.query.randomId) || (req.query.randomId && !req.query.userId)) {
        if (noRedirect) {
          res.status(403).end(JSON.stringify({
            error: {
              message: "Invalid Credentials",
              code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
            },
          }));
        } else {
          res.redirect("/en/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
        }
        return;
      }

      let token = req.query.token;
      if (req.query.randomId) {
        token = await appData.redisGlobal.get(
          "USER_VERIFY_ACCOUNT_TEMP_TOKEN_CODE." + req.query.userId + "." + req.query.randomId,
        );
      }

      let decoded: IValidateUserTokenDataType;
      try {
        // we attempt to decode it
        decoded = await jwtVerify(token as string, await appData.registry.getJWTSecretFor(SECONDARY_JWT_KEY));
      } catch (err) {
        if (noRedirect) {
          res.status(403).end(JSON.stringify({
            error: {
              message: "Invalid Credentials",
              code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
            },
          }));
        } else {
          res.redirect("/en/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
        }
        return;
      };

      if (decoded.validateType === "email" && !hasEmailProperty || !hasEvalidatedProperty) {
        if (noRedirect) {
          res.status(403).end(JSON.stringify({
            error: {
              message: "This server does not support emails",
              code: ENDPOINT_ERRORS.UNSPECIFIED,
            },
          }));
        } else {
          res.redirect("/en/?err=" + ENDPOINT_ERRORS.UNSPECIFIED);
        }
        return;
      } else if (decoded.validateType === "phone" && !hasPhoneProperty || !hasPvalidatedProperty) {
        if (noRedirect) {
          res.status(403).end(JSON.stringify({
            error: {
              message: "This server does not support phone",
              code: ENDPOINT_ERRORS.UNSPECIFIED,
            },
          }));
        } else {
          res.redirect("/en/?err=" + ENDPOINT_ERRORS.UNSPECIFIED);
        }
        return;
      }

      if (!decoded.validateUserId || !decoded.validateValue) {
        if (noRedirect) {
          res.status(403).end(JSON.stringify({
            error: {
              message: "Invalid Credentials",
              code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
            },
          }));
        } else {
          res.redirect("/en/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
        }
        return;
      }

      let user: ISQLTableRowValue;

      try {
        user = await appData.cache.requestValue(userIdef, decoded.validateUserId, null);
        if (!user) {
          if (noRedirect) {
            res.status(403).end(JSON.stringify({
              error: {
                message: "User has been removed",
                code: ENDPOINT_ERRORS.USER_REMOVED,
              },
            }));
          } else {
            res.redirect("/en/?err=" + ENDPOINT_ERRORS.USER_REMOVED);
          }
          return;
        } else if (user.blocked_at !== null) {
          if (noRedirect) {
            res.status(403).end(JSON.stringify({
              error: {
                message: "User has been blocked",
                code: ENDPOINT_ERRORS.USER_BLOCKED,
              },
            }));
          } else {
            res.redirect(`/${user.app_language}/?err=${ENDPOINT_ERRORS.USER_BLOCKED}`);
          }
          return;
        }
      } catch (err) {
        logger.error(
          {
            functionName: "userRestServices",
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
        if (noRedirect) {
          res.status(403).end(JSON.stringify({
            error: {
              message: "Invalid Credentials",
              code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
            },
          }));
        } else {
          res.redirect("/en/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
        }
        return;
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
            if (noRedirect) {
              res.status(403).end(JSON.stringify({
                error: {
                  message: "The email/phone has been validated before this user managed to do so",
                  code: decoded.validateType === "email" ? ENDPOINT_ERRORS.USER_EMAIL_TAKEN : ENDPOINT_ERRORS.USER_PHONE_TAKEN,
                }
              }));
            } else {
              res.redirect(`/${user.app_language}/?err=${decoded.validateType === "email" ? ENDPOINT_ERRORS.USER_EMAIL_TAKEN : ENDPOINT_ERRORS.USER_PHONE_TAKEN}`);
            }
          } else if (result[CONNECTOR_SQL_COLUMN_ID_FK_NAME] === user.id) {
            if (noRedirect) {
              res.status(200).end("{}");
            } else {
              res.redirect(`/${user.app_language}/?msg=validate_account_success&msgtitle=validate_account_success_title`);
            }
            return;
          }
        }
      } catch (err) {
        logger.error(
          {
            functionName: "userRestServices",
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
        await appData.cache.requestUpdate(
          userIdef,
          decoded.validateUserId,
          null,
          {
            [decoded.validateType === "email" ? "e_validated" : "p_validated"]: true,
          },
          {
            language: "en",
            dictionary: "simple",
          },
        );
      } catch (err) {
        logger.error(
          {
            functionName: "userRestServices",
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

      if (noRedirect) {
        res.status(200).end("{}");
      } else {
        res.redirect(`/${user.app_language}/?msg=validate_account_success&msgtitle=validate_account_success_title`);
      }
    } catch (err) {
      logger.error(
        {
          className: "userRestServices",
          endpoint: "token",
          message: "Error while trying to login",
          serious: true,
          err,
        },
      );
      res.status(500).end(JSON.stringify({
        error: {
          message: "Internal Server Error",
          code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
        },
      }));
      return;
    }
  });

  router.get("/redirected-login", async (req, res) => {
    const userId = req.query.userid as string;
    const password = req.query.password as string;
    const token = req.query.token as string;

    let redirect = req.query.redirect as string;
    if (redirect && !redirect.startsWith("/")) {
      redirect = "/" + redirect;
    } else if (!redirect) {
      redirect = "/";
    }

    if (!userId || (!password && !token)) {
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.UNSPECIFIED);
      logger.error(
        {
          functionName: "userRestServices",
          endpoint: "redirected-login",
          message: "User id not provided or password nor token provided",
          data: {
            userId,
            passwordGiven: !!password,
            tokenGiven: !!token,
          },
        }
      );
      return;
    }

    let tokenData: IServerSideTokenDataType;
    if (token) {
      try {
        tokenData = await jwtVerify(token, await appData.registry.getJWTSecretFor(JWT_KEY));
        if (tokenData.custom && !tokenData.isRealUser) {
          res.redirect(`/en/?err=${ENDPOINT_ERRORS.UNSPECIFIED}`);
          logger.error(
            {
              functionName: "userRestServices",
              endpoint: "redirected-login",
              message: "Tried to login with a custom token that is not a real user",
              data: {
                tokenData,
              },
            }
          );
          return;
        }
      } catch {
        res.redirect(`/en/?err=${ENDPOINT_ERRORS.INVALID_CREDENTIALS}`);
        return;
      }
    }

    let user: ISQLTableRowValue;
    try {
      user = await appData.cache.requestValue(userIdef, userId, null);
      if (!user) {
        res.redirect("/en/?err=" + ENDPOINT_ERRORS.USER_REMOVED);
        return;
      } else if (user.blocked_at !== null) {
        res.redirect(`/${user.app_language}/?err=${ENDPOINT_ERRORS.USER_BLOCKED}`);
        return;
      }
    } catch (err) {
      logger.error(
        {
          functionName: "userRestServices",
          endpoint: "redirected-login",
          message: "Failed to retrieve user from the id",
          err,
        }
      );
      throw err;
    }

    if (token) {
      if (tokenData.id !== userId) {
        res.redirect(`/${user.app_language}/?err=${ENDPOINT_ERRORS.UNSPECIFIED}`);
        return;
      } else if ((tokenData.sessionId || 0) !== (user.session_id || 0)) {
        res.redirect(`/${user.app_language}/?err=${ENDPOINT_ERRORS.INVALID_CREDENTIALS}`);
        return;
      }
    }

    let isValidPassword: boolean = false;
    let assignedToken: string = token || null;
    if (!assignedToken) {
      try {
        isValidPassword = await bcyrpt.compare(password, user.password);
        assignedToken = await jwtSign({
          id: user.id,
          role: user.role,
          sessionId: user.session_id || 0,
        }, await appData.registry.getJWTSecretFor(JWT_KEY));
      } catch (err) {
        if (req.query.noredirect) {
          res.status(400).end(JSON.stringify({
            message: "The token has been made to expire",
            error: ENDPOINT_ERRORS.TOKEN_EXPIRED
          }));
          return;
        }
        res.redirect("/" + user.app_language + "/?err=" + ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR);
        return;
      }
    }

    if (isValidPassword || assignedToken) {
      const useSecure = !req.headers.host || !req.headers.host.startsWith("localhost");
      const host = req.headers.host && req.headers.host.split(":")[0];
      res.cookie("token", assignedToken, {
        httpOnly: false,
        expires: new Date(9999999999999),
        path: "/",
        secure: useSecure,
        domain: host,
      });
      res.cookie("lang", user.app_language, {
        httpOnly: false,
        expires: new Date(9999999999999),
        path: "/",
        secure: useSecure,
        domain: host,
      });
      res.cookie("country", user.app_country, {
        httpOnly: false,
        expires: new Date(9999999999999),
        path: "/",
        secure: useSecure,
        domain: host,
      });
      res.cookie("currency", user.app_currency, {
        httpOnly: false,
        expires: new Date(9999999999999),
        path: "/",
        secure: useSecure,
        domain: host,
      });
      res.cookie("id", user.id, {
        httpOnly: false,
        expires: new Date(9999999999999),
        path: "/",
        secure: useSecure,
        domain: host,
      });
      res.cookie("role", user.role, {
        httpOnly: false,
        expires: new Date(9999999999999),
        path: "/",
        secure: useSecure,
        domain: host,
      });
      res.redirect(`/${user.app_language}${redirect}`);
    } else {
      res.redirect("/" + user.app_language + "/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
      return;
    }
  });

  router.get("/unsubscribe", async (req, res) => {
    const userId = req.query.userid as string;
    const token = req.query.token as string;
    const noRedirect = !!req.query.noredirect;

    let user: ISQLTableRowValue;
    // let's ensure the user exists that we are working with
    try {
      user = await appData.cache.requestValue(userIdef, userId, null);
      if (!user) {
        noRedirect ? res.status(404).end() : res.redirect("/en/?err=" + ENDPOINT_ERRORS.USER_REMOVED);
        return;
      } else if (user.blocked_at !== null) {
        noRedirect ? res.status(403).end() : res.redirect(`/${user.app_language}/?err=${ENDPOINT_ERRORS.USER_BLOCKED}`);
        return;
      }
    } catch (err) {
      logger.error(
        {
          functionName: "userRestServices",
          endpoint: "unsubscribe",
          message: "Failed to retrieve user from the id",
          err,
        }
      );
      throw err;
    }

    // now let's confirm the token given is valid
    let tokenData: IUnsubscribeUserTokenDataType;
    if (token) {
      // we try
      try {
        tokenData = await jwtVerify(token, await appData.registry.getJWTSecretFor(SECONDARY_JWT_KEY));
        // check the shape of the token
        if (
          !tokenData.unsubscribeUserId ||
          !tokenData.unsubscribeProperty
        ) {
          // invalid shape
          noRedirect ? res.status(403).end() : res.redirect(`/${user.app_language}/?err=${ENDPOINT_ERRORS.UNSPECIFIED}`);
          logger.error(
            {
              functionName: "userRestServices",
              endpoint: "unsubscribe",
              message: "The token provided was invalid and did not respect the shape",
              data: {
                tokenData,
              },
            }
          );
          return;
        } else if (tokenData.unsubscribeUserId !== userId) {
          // the given user id does not match
          noRedirect ? res.status(403).end() : res.redirect(`/${user.app_language}/?err=${ENDPOINT_ERRORS.INVALID_CREDENTIALS}`);
          return;
        } else if (!userIdef.hasPropertyDefinitionFor(tokenData.unsubscribeProperty, true)) {
          // there's no such property to toggle to false
          noRedirect ? res.status(403).end() : res.redirect(`/${user.app_language}/?err=${ENDPOINT_ERRORS.INVALID_CREDENTIALS}`);
          return;
        } else if (!user[tokenData.unsubscribeProperty]) {
          // it's already toggled to false
          noRedirect ? res.status(200).end() : res.redirect(`/${user.app_language}/?msg=unsubscribe_success&msgtitle=unsubscribe_success_title`);
          return;
        }
      } catch {
        // invalid credentials as the token did not decode
        noRedirect ? res.status(403).end() : res.redirect(`/${user.app_language}/?err=${ENDPOINT_ERRORS.INVALID_CREDENTIALS}`);
        return;
      }
    } else {
      // no token, forbidden
      noRedirect ? res.status(403).end() : res.redirect(`/${user.app_language}/?err=${ENDPOINT_ERRORS.INVALID_CREDENTIALS}`);
      return;
    }

    // now we are going to toggle the property
    try {
      await appData.cache.requestUpdate(
        userIdef,
        tokenData.unsubscribeUserId,
        null,
        {
          [tokenData.unsubscribeProperty]: false,
        },
        {
          language: "en",
          dictionary: "simple",
        },
      );
    } catch (err) {
      logger.error(
        {
          functionName: "userRestServices",
          endpoint: "unsubscribe",
          message: "Failed to set " + tokenData.unsubscribeProperty + " status to false",
          err,
          data: {
            user,
          },
        }
      );
      noRedirect ? res.status(500).end() : res.redirect(`/${user.app_language}/?err=${ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR}`);
      return;
    }

    // display the success status
    noRedirect ? res.status(200).end() : res.redirect(`/${user.app_language}/?msg=unsubscribe_success&msgtitle=unsubscribe_success_title`);
  });

  router.post("/send-validate", async (req, res) => {
    const type = req.body.type as string;
    const token = req.headers.token as string;

    res.setHeader("content-type", "application/json; charset=utf-8");

    try {
      const isMail = type === "email";
      const isPhone = type === "phone";

      if (isMail && !appData.mailService) {
        res.status(400).end(JSON.stringify({
          message: "Mail service is not available",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        }));
        return;
      } else if (isMail && (!emailProperty || !eValidatedProperty)) {
        res.status(400).end(JSON.stringify({
          message: "email and e_validated are not available, as such sending validation emails is not available",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        }));
        return;
      } else if (isPhone && !appData.phoneService) {
        res.status(400).end(JSON.stringify({
          message: "Phone service is not available",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        }));
        return;
      } else if (isPhone && (!phoneProperty || !pValidatedProperty)) {
        res.status(400).end(JSON.stringify({
          message: "phone and p_validated are not available, as such sending validation SMS is not available",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        }));
        return;
      } else if (!isMail && !isPhone) {
        res.status(400).end(JSON.stringify({
          message: "Unknown type: " + type,
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        }));
        return;
      }

      let decoded: IServerSideTokenDataType;
      try {
        // we attempt to decode it
        decoded = await jwtVerify<IServerSideTokenDataType>(token, await appData.registry.getJWTSecretFor(JWT_KEY));
      } catch (err) {
        res.status(400).end(JSON.stringify({
          message: "Token is invalid",
          code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
        }));
        return;
      }

      let resultUser: ISQLTableRowValue;
      try {
        resultUser = await appData.cache.requestValue(userIdef, decoded.id, null);
      } catch (err) {
        logger.error(
          {
            functionName: "userRestServices",
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
          res.status(403).end(JSON.stringify({
            message: "User is blocked",
            code: ENDPOINT_ERRORS.USER_BLOCKED,
          }));
          return;
        }
      } else {
        // otherwise the user has been removed as the id
        // is not found, this can happen if the user
        // has kept a session active after nuking his account
        res.status(403).end(JSON.stringify({
          message: "User has been removed",
          code: ENDPOINT_ERRORS.USER_REMOVED,
        }));
        return;
      }

      if (isMail ? !resultUser.email : !resultUser.phone) {
        // the error is unspecified because this shouldn't
        // be allowed to happen in the client side
        res.status(403).end(JSON.stringify({
          message: "There's no " + type + " to validate",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        }));
        return;
      } else if (isMail ? resultUser.e_validated : resultUser.p_validated) {
        res.status(403).end(JSON.stringify({
          message: "User is already validated",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        }));
        return;
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
              functionName: "userRestServices",
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
          res.status(403).end(JSON.stringify({
            message: "That email is taken",
            code: ENDPOINT_ERRORS.USER_EMAIL_TAKEN,
          }));
          return;
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
              functionName: "userRestServices",
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
          res.status(403).end(JSON.stringify({
            message: "That phone number is taken",
            code: ENDPOINT_ERRORS.USER_PHONE_TAKEN,
          }));
          return;
        }
      }

      try {
        const avoidSendingTarget =
          !!(await appData.redisGlobal.get("USER_VERIFY_ACCOUNT_TEMP_AVOID_SENDING." + type + "." + resultUser.id));
        if (avoidSendingTarget === (isMail ? resultUser.email : resultUser.phone)) {
          return {
            status: "OK",
          };
        }
      } catch (err) {
        logger.error(
          {
            functionName: "userRestServices",
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
          validateType: type,
          validateValue: isMail ? resultUser.email : resultUser.phone,
        }, await appData.registry.getJWTSecretFor(SECONDARY_JWT_KEY));
      } catch (err) {
        logger.error(
          {
            functionName: "userRestServices",
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
          "USER_VERIFY_ACCOUNT_TEMP_AVOID_SENDING." + type + "." + resultUser.id,
          isMail ? resultUser.email.toString() : resultUser.phone.toString()
        );
        await appData.redisGlobal.expire(
          "USER_VERIFY_ACCOUNT_TEMP_AVOID_SENDING." + type + "." + resultUser.id,
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
            functionName: "userRestServices",
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
        const templateIdToUse = i18nData.custom.validate_account_email_fragment_id.toString();

        const subject = capitalize(i18nData.custom.validate_account.toString());

        await appData.mailService.sendTemplateEmail({
          fromUsername: i18nData.custom.validate_account_user.toString(),
          fromEmailHandle: i18nData.custom.validate_account_email_user.toString(),
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
        const templateIdToUse = i18nData.custom.validate_account_phone_fragment_id.toString();

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

      res.status(200).end("{}");
    } catch (err) {
      logger.error(
        {
          className: "userRestServices",
          endpoint: "token",
          message: "Error while trying to login",
          serious: true,
          err,
        },
      );
      res.status(500).end(JSON.stringify({
        error: {
          message: "Internal Server Error",
          code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
        },
      }));
    }
  });

  router.post("/send-reset-password", async (req, res) => {
    const email = req.body.email;
    const phone = req.body.phone;

    res.setHeader("content-type", "application/json; charset=utf-8");

    try {

      if (!email && !phone) {
        res.status(403).end(JSON.stringify({
          message: "You must specify either email or phone",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        }));
        return;
      }

      if (email && !appData.mailService) {
        res.status(400).end(JSON.stringify({
          message: "Mail service is not available",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        }));
        return;
      } else if (email && (!emailProperty || !eValidatedProperty)) {
        res.status(400).end(JSON.stringify({
          message: "email and e_validated are not available, as such password recovery is not available",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        }));
        return;
      } else if (phone && !appData.phoneService) {
        res.status(400).end(JSON.stringify({
          message: "Phone service is not available",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        }));
        return;
      } else if (phone && (!phoneProperty || !pValidatedProperty)) {
        res.status(400).end(JSON.stringify({
          message: "phone and p_validated are not available, as such password recovery is not available",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        }));
        return;
      }


      // only emails that have been validated are valid, the reason is simple, otherwise this would allow any user to use
      // another invalidated email that other user has and then has a chance to recover and change their password instead
      // you might wonder why not to prevent email that are equal as that user to start with,
      // well this is to avoid a DDOS attack similar to one that was present at github
      // where you would set an invalidated email, and that user won't be able to claim its own email
      let resultUser: ISQLTableRowValue;

      const selectQuery = appData.databaseConnection.getSelectBuilder();
      selectQuery.select(CONNECTOR_SQL_COLUMN_ID_FK_NAME, email ? "email" : "phone", "username", "app_language");
      selectQuery.fromBuilder.from(userTable);
      selectQuery.limit(1);

      if (email) {
        selectQuery.whereBuilder.andWhere((emailWhereBuilder) => {
          emailPropertyDescription.sqlEqual({
            id: emailProperty.getId(),
            prefix: "",
            ignoreCase: true,
            whereBuilder: emailWhereBuilder,
            serverData: appData.cache.getServerData(),
            itemDefinition: userIdef,
            include: null,
            value: email,
            property: emailProperty,
            appData,
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
            appData,
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
            value: phone,
            property: phoneProperty,
            appData,
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
            appData,
          })
        });
      }

      try {
        resultUser = await appData.databaseConnection.queryFirst(selectQuery);
      } catch (err) {
        logger.error(
          {
            functionName: "userRestServices",
            endpoint: "send-reset-password",
            message: "Could not request user from user table by email/phone",
            serious: true,
            err,
            data: {
              email: email,
            },
          },
        );
        throw err;
      }

      if (!resultUser) {
        res.status(404).end(JSON.stringify({
          message: "User with that email/phone does not exist",
          code: ENDPOINT_ERRORS.NOT_FOUND,
        }));
        return;
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
            functionName: "userRestServices",
            endpoint: "send-reset-password",
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
        }, await appData.registry.getJWTSecretFor(SECONDARY_JWT_KEY));
      } catch (err) {
        logger.error(
          {
            functionName: "userRestServices",
            endpoint: "send-reset-password",
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
            functionName: "userRestServices",
            endpoint: "send-reset-password",
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

      const templateIdToUse = (email ? i18nData.custom.forgot_password_fragment_id : i18nData.custom.forgot_password_phone_fragment_id).toString();

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

      if (email) {
        const subject = capitalize(i18nData.custom.forgot_password_title.toString());

        await appData.mailService.sendTemplateEmail({
          fromUsername: i18nData.custom.forgot_password_user.toString(),
          fromEmailHandle: i18nData.custom.forgot_password_email_user.toString(),
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

      res.status(200).end("{}");
    } catch (err) {
      logger.error(
        {
          className: "userRestServices",
          endpoint: "send-reset-password",
          message: "Error while trying to send reset password",
          serious: true,
          err,
        },
      );
      res.status(500).end(JSON.stringify({
        error: {
          message: "Internal Server Error",
          code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
        },
      }));
    }
  });

  router.post("/reset-password", async (req, res) => {
    const token = req.body.token as string;
    const phone = req.body.phone as string;
    const email = req.body.email as string;
    const srcRandomId = req.body.randomId as string;
    const newPassword = req.body.newPass;

    const useTokenMethod = token;
    const usePhoneMethod = phone && srcRandomId;
    const useEmailMethod = email && srcRandomId;

    try {
      if (!usePhoneMethod && !useTokenMethod && !useEmailMethod) {
        res.status(403).end(JSON.stringify({
          message: "You need to specify either a token, or a random_id + email or random_id + phone",
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        }));
        return;
      }

      let randomId: string;
      let codeWasSent: string;
      let resultUser: ISQLTableRowValue;
      let userId: string;

      if (useTokenMethod) {
        let decoded: RecoverPasswordTokenType = null;
        try {
          // we attempt to decode it
          decoded = await jwtVerify<RecoverPasswordTokenType>(token, await appData.registry.getJWTSecretFor(SECONDARY_JWT_KEY));
        } catch (err) {
          res.status(403).end(JSON.stringify({
            message: "Reset token is invalid",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          }));
          return;
        }

        if (
          typeof decoded.resetPasswordUserId !== "string" ||
          typeof decoded.resetPasswordRandomId !== "string"
        ) {
          res.status(403).end(JSON.stringify({
            message: "Reset token is invalid due to wrong shape",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          }));
          return;
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
              functionName: "userRestServices",
              endpoint: "reset-password",
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
        randomId = srcRandomId;

        const selectQuery = appData.databaseConnection.getSelectBuilder();
        selectQuery.select(CONNECTOR_SQL_COLUMN_ID_FK_NAME, email ? "email" : "phone", "username", "app_language");
        selectQuery.fromBuilder.from(userTable);
        selectQuery.limit(1);

        if (email) {
          selectQuery.whereBuilder.andWhere((emailWhereBuilder) => {
            emailPropertyDescription.sqlEqual({
              id: emailProperty.getId(),
              prefix: "",
              ignoreCase: true,
              whereBuilder: emailWhereBuilder,
              serverData: appData.cache.getServerData(),
              itemDefinition: userIdef,
              include: null,
              value: email,
              property: emailProperty,
              appData,
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
              appData,
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
              value: phone,
              property: phoneProperty,
              appData,
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
              appData,
            })
          });
        }

        try {
          resultUser = await appData.databaseConnection.queryFirst(selectQuery);
          userId = resultUser[CONNECTOR_SQL_COLUMN_ID_FK_NAME];
        } catch (err) {
          logger.error(
            {
              functionName: "userRestServices",
              endpoint: "send-reset-password",
              message: "Could not request user from user table by email/phone",
              serious: true,
              err,
              data: {
                email: email,
                phone: phone,
              },
            },
          );
          throw err;
        }
      }

      if (!resultUser) {
        res.status(403).end(JSON.stringify({
          message: "User does not exist",
          code: ENDPOINT_ERRORS.NOT_FOUND,
        }));
        return;
      }

      try {
        codeWasSent = await appData.redisGlobal.get("USER_RESET_PASSWORD_TEMP_TOKEN_CODE." + userId + "." + randomId);
      } catch (err) {
        logger.error(
          {
            functionName: "userRestServices",
            endpoint: "reset-password",
            message: "Failed to check the token code that was sent",
            serious: true,
            err,
          },
        );
        throw err;
      }

      if (!codeWasSent) {
        res.status(400).end(JSON.stringify({
          message: "Reset token/random id is invalid due to expiration",
          code: ENDPOINT_ERRORS.TOKEN_EXPIRED,
        }));
        return;
      }

      const invalidReason =
        passwordProperty.isValidValueNoExternalChecking(resultUser.id, null, newPassword);
      if (invalidReason) {
        res.status(403).end(JSON.stringify({
          message: "Password is invalid",
          code: ENDPOINT_ERRORS.INVALID_PROPERTY,
          pcode: invalidReason,
          itemDefPath: userIdef.getPath(),
          modulePath: userModule.getPath(),
          propertyId: "password",
        }));
        return;
      }

      try {
        await appData.cache.requestUpdate(
          userIdef,
          userId,
          null,
          {
            password: newPassword,
          },
          {
            dictionary: "simple",
            language: "en",
          },
        );
      } catch (err) {
        logger.error(
          {
            functionName: "userRestServices",
            endpoint: "reset-password",
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
              functionName: "userRestServices",
              endpoint: "reset-password (detached)",
              message: "Failed to remove temporary token code for password reset",
              err,
            },
          );
        }
      })();

      res.status(200).end("{}");
    } catch (err) {
      logger.error(
        {
          className: "userRestServices",
          endpoint: "reset-password",
          message: "Error while trying to reset password",
          serious: true,
          err,
        },
      );
      res.status(500).end(JSON.stringify({
        error: {
          message: "Internal Server Error",
          code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
        },
      }));
    }
  });

  return router;
}