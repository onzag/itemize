import { IAppDataType, logger } from "..";
import { Router } from "express";
import { ENDPOINT_ERRORS, CONNECTOR_SQL_COLUMN_ID_FK_NAME } from "../../constants";
import { jwtVerify, jwtSign } from "../token";
import { ISQLTableRowValue } from "../../base/Root/sql";
import bcyrpt from "bcrypt";
import { IServerSideTokenDataType } from "../resolvers/basic";

export interface IValidateUserTokenDataType {
  validateUserId: number;
  validateUserEmail: string;
}

export interface IUnsubscribeUserTokenDataType {
  unsubscribeUserId: number;
  unsubscribeProperty: string;
}

export function userRestServices(appData: IAppDataType) {
  const userModule = appData.root.getModuleFor(["users"]);
  const userIdef = userModule.getItemDefinitionFor(["user"]);

  const hasEmailProperty = userIdef.hasPropertyDefinitionFor("email", false);
  const hasEvalidatedProperty = userIdef.hasPropertyDefinitionFor("e_validated", false);

  const userTable = userIdef.getQualifiedPathName();

  const router = Router();
  router.get("/validate-email", async (req, res) => {
    if (!hasEmailProperty || !hasEvalidatedProperty) {
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.UNSPECIFIED);
      return;
    } else if (!req.query.token) {
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
      return;
    }

    let decoded: IValidateUserTokenDataType;
    try {
      // we attempt to decode it
      decoded = await jwtVerify(req.query.token as string, appData.sensitiveConfig.secondaryJwtKey);
    } catch (err) {
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
      return;
    };

    if (!decoded.validateUserId || !decoded.validateUserEmail) {
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
        "userRestServices/validate-email: failed to retrieve user from token credentials",
        {
          errMessage: err.message,
          errStack: err.stack,
          decoded,
        }
      );
      throw err;
    }

    // this happens when the user sends a validation email, then changes the email
    // immediately and tries to use the previous token to validate the email
    // a security concern
    if (user.email !== decoded.validateUserEmail) {
      // we consider this invalid as credentials it does refer
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
      return;
    }

    try {
      const result = await appData.knex.first(CONNECTOR_SQL_COLUMN_ID_FK_NAME)
        .from(userTable).where({
          email: user.email,
          e_validated: true,
        });

      if (result) {
        if (result[CONNECTOR_SQL_COLUMN_ID_FK_NAME] !== user.id) {
          res.redirect(`/${user.app_language}/?err=${ENDPOINT_ERRORS.USER_EMAIL_TAKEN}`);
        } else if (result[CONNECTOR_SQL_COLUMN_ID_FK_NAME] === user.id) {
          res.redirect(`/${user.app_language}/?msg=validate_account_success&msgtitle=validate_account_success_title`);
        }
      }
    } catch (err) {
      logger.error(
        "userRestServices/validate-email: failed to request users by email",
        {
          errMessage: err.message,
          errStack: err.stack,
          user,
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
          e_validated: true,
        },
        null,
        null,
        null,
        null,
        null,
      );
    } catch (err) {
      logger.error(
        "userRestServices/validate-email: failed to set e_validated status to true",
        {
          errMessage: err.message,
          errStack: err.stack,
          user,
        }
      );
      throw err;
    }

    res.redirect(`/${user.app_language}/?msg=validate_account_success&msgtitle=validate_account_success_title`);
  });

  router.get("/redirected-login", async (req, res) => {
    const userId = parseInt(req.query.userid as string);
    const password = req.query.password as string;
    const token = req.query.token as string;

    let redirect = req.query.redirect as string;
    if (redirect && !redirect.startsWith("/")) {
      redirect = "/" + redirect;
    } else if (!redirect) {
      redirect = "/";
    }

    if ((isNaN(userId) || userId <= 0) || (!password && !token)) {
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.UNSPECIFIED);
      logger.error(
        "userRestServices/redirected-login: user id not provided or password nor token provided",
        {
          userId,
          passwordGiven: !!password,
          tokenGiven: !!token,
        }
      );
      return;
    }

    let tokenData: IServerSideTokenDataType;
    if (token) {
      try {
        tokenData = await jwtVerify(token, appData.sensitiveConfig.jwtKey);
        if (tokenData.custom && !tokenData.isRealUser) {
          res.redirect(`/en/?err=${ENDPOINT_ERRORS.UNSPECIFIED}`);
          logger.error(
            "userRestServices/redirected-login: tried to login with a custom token that is not a real user",
            {
              tokenData,
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
        "userRestServices/redirected-login: failed to retrieve user from the id",
        {
          errMessage: err.message,
          errStack: err.stack,
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
        }, appData.sensitiveConfig.jwtKey);
      } catch (err) {
        res.redirect("/" + user.app_language + "/?err=" + ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR);
        return;
      }
    }

    if (isValidPassword || assignedToken) {
      const useSecure = !req.headers.host || !req.headers.host.startsWith("localhost");
      const host = req.headers.host;
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
    const userId = parseInt(req.query.userid as string);
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
        "userRestServices/unsubscribe: failed to retrieve user from the id",
        {
          errMessage: err.message,
          errStack: err.stack,
        }
      );
      throw err;
    }

    // now let's confirm the token given is valid
    let tokenData: IUnsubscribeUserTokenDataType;
    if (token) {
      // we try
      try {
        tokenData = await jwtVerify(token, appData.sensitiveConfig.secondaryJwtKey);
        // check the shape of the token
        if (
          !tokenData.unsubscribeUserId ||
          !tokenData.unsubscribeProperty
        ) {
          // invalid shape
          noRedirect ? res.status(403).end() : res.redirect(`/${user.app_language}/?err=${ENDPOINT_ERRORS.UNSPECIFIED}`);
          logger.error(
            "userRestServices/unsubscribe: The token provided was invalid and did not respect the shape",
            {
              tokenData,
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
        null,
        null,
        null,
        null,
        null,
      );
    } catch (err) {
      logger.error(
        "userRestServices/unsubscribe: failed to set " + tokenData.unsubscribeProperty + " status to false",
        {
          errMessage: err.message,
          errStack: err.stack,
          user,
        }
      );
      throw err;
    }

    // display the success status
    noRedirect ? res.status(200).end() : res.redirect(`/${user.app_language}/?msg=unsubscribe_success&msgtitle=unsubscribe_success_title`);
  });

  return router;
}