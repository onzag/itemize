import { IAppDataType } from "..";
import { logger } from "../logger";
import { Router } from "express";
import { ENDPOINT_ERRORS, CONNECTOR_SQL_COLUMN_ID_FK_NAME, SECONDARY_JWT_KEY, JWT_KEY } from "../../constants";
import { jwtVerify, jwtSign } from "../token";
import { ISQLTableRowValue } from "../../base/Root/sql";
import bcyrpt from "bcrypt";
import { IServerSideTokenDataType } from "../resolvers/basic";
import type { IValidateUserTokenDataType } from "./queries";

export interface IUnsubscribeUserTokenDataType {
  unsubscribeUserId: string;
  unsubscribeProperty: string;
}

export function userRestServices(appData: IAppDataType) {
  const userModule = appData.root.getModuleFor(["users"]);
  const userIdef = userModule.getItemDefinitionFor(["user"]);

  const hasEmailProperty = userIdef.hasPropertyDefinitionFor("email", false);
  const hasEvalidatedProperty = userIdef.hasPropertyDefinitionFor("e_validated", false);
  const hasPhoneProperty = userIdef.hasPropertyDefinitionFor("phone", false);
  const hasPvalidatedProperty = userIdef.hasPropertyDefinitionFor("p_validated", false);

  const userTable = userIdef.getQualifiedPathName();

  const router = Router();
  router.get("/token", async (req, res) => {
    const username = req.

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
        decoded = await jwtVerify<IServerSideTokenDataType>(args.token, await appData.registry.getJWTSecretFor(JWT_KEY));
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
                  value: args.username as string,
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
          value: args.password as string,
          property: passwordProperty,
          whereBuilder: internalPasswordWhereBuilder,
          appData,
        })
      });

      // Security slowdown
      // should prevent brute force logins even if they are using different IPs
      // yes it has the potential to affect the user, making its login slow too
      try {
        // get the last login data if any
        const lastLoginAttemptData = await appData.redisGlobal.get(
          "USER_LAST_LOGIN_ATTEMPT." + args.username,
        );
        const lastLoginAttemptDataParsed: [string, number] = (lastLoginAttemptData && JSON.parse(lastLoginAttemptData)) || [null, 0];

        // save the current last login attempt for the user
        const currentDate = new Date();
        await appData.redisGlobal.set(
          "USER_LAST_LOGIN_ATTEMPT." + args.username,
          JSON.stringify([currentDate.toISOString(), lastLoginAttemptDataParsed[1] + 1]),
        );
        // make it expire 10 seconds
        await appData.redisGlobal.expire(
          "USER_LAST_LOGIN_ATTEMPT." + args.username,
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
            functionName: "customUserQueries",
            endpoint: "token",
            message: "Failed to perform the security slowdown for preventing brute force login attempts",
            serious: true,
            err,
            data: {
              username: args.username,
            },
          },
        );
        throw err;
      }

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
        }, await appData.registry.getJWTSecretFor(JWT_KEY)));
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
  });
  router.get("/validate", async (req, res) => {
    if ((!req.query.token && !req.query.randomId) || (req.query.randomId && !req.query.userId)) {
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
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
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
      return;
    };

    if (decoded.validateType === "email" && !hasEmailProperty || !hasEvalidatedProperty) {
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.UNSPECIFIED);
      return;
    } else if (decoded.validateType === "phone" && !hasPhoneProperty || !hasPvalidatedProperty) {
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.UNSPECIFIED);
      return;
    }

    if (!decoded.validateUserId || !decoded.validateValue) {
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
      return;
    }

    let user: ISQLTableRowValue;

    try {
      user = await appData.cache.requestValue(userIdef, decoded.validateUserId, null);
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
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
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
          res.redirect(`/${user.app_language}/?err=${decoded.validateType === "email" ? ENDPOINT_ERRORS.USER_EMAIL_TAKEN : ENDPOINT_ERRORS.USER_PHONE_TAKEN}`);
        } else if (result[CONNECTOR_SQL_COLUMN_ID_FK_NAME] === user.id) {
          res.redirect(`/${user.app_language}/?msg=validate_account_success&msgtitle=validate_account_success_title`);
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

    res.redirect(`/${user.app_language}/?msg=validate_account_success&msgtitle=validate_account_success_title`);
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
      throw err;
    }

    // display the success status
    noRedirect ? res.status(200).end() : res.redirect(`/${user.app_language}/?msg=unsubscribe_success&msgtitle=unsubscribe_success_title`);
  });

  return router;
}