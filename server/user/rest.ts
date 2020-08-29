import { IAppDataType, logger } from "..";
import { Router } from "express";
import { ENDPOINT_ERRORS, CONNECTOR_SQL_COLUMN_ID_FK_NAME } from "../../constants";
import { jwtVerify, jwtSign } from "../token";
import { ISQLTableRowValue } from "../../base/Root/sql";
import bcyrpt from "bcrypt";
import { IServerSideTokenDataType } from "../resolvers/basic";

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

    let decoded: {
      validateUserId: number;
      validateUserEmail: string;
    };
    try {
      // we attempt to decode it
      decoded = await jwtVerify(req.query.token as string, appData.sensitiveConfig.jwtKey);
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
      return;
    }

    let tokenData: IServerSideTokenDataType;
    if (token) {
      tokenData = await jwtVerify(token, appData.sensitiveConfig.jwtKey);
      if (!tokenData.isRealUser) {
        res.redirect(`/en/?err=${ENDPOINT_ERRORS.UNSPECIFIED}`);
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
      res.cookie("token", assignedToken, {
        httpOnly: false,
        expires: new Date(9999999999999),
        path: "/",
      });
      res.cookie("lang", user.app_language, {
        httpOnly: false,
        expires: new Date(9999999999999),
        path: "/",
      });
      res.cookie("country", user.app_country, {
        httpOnly: false,
        expires: new Date(9999999999999),
        path: "/",
      });
      res.cookie("currency", user.app_currency, {
        httpOnly: false,
        expires: new Date(9999999999999),
        path: "/",
      });
      res.cookie("id", user.id, {
        httpOnly: false,
        expires: new Date(9999999999999),
        path: "/",
      });
      res.cookie("role", user.role, {
        httpOnly: false,
        expires: new Date(9999999999999),
        path: "/",
      });
      res.redirect(`/${user.app_language}${redirect}`);
    } else {
      res.redirect("/" + user.app_language + "/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
      return;
    }
  });

  return router;
}