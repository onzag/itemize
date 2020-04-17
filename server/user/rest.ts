import { IAppDataType } from "..";
import { Router } from "express";
import { ENDPOINT_ERRORS, CONNECTOR_SQL_COLUMN_ID_FK_NAME } from "../../constants";
import { jwtVerify } from "../token";

export function userRestServices(appData: IAppDataType) {
  const userModule = appData.root.getModuleFor(["users"]);
  const userIdef = userModule.getItemDefinitionFor(["user"]);

  const userTable = userIdef.getQualifiedPathName();

  const router = Router();
  router.get("/validate-email", async (req, res) => {
    if (!req.query.token) {
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
    }

    let decoded: {
      validateUserId: number;
      validateUserEmail: string;
    };
    try {
      // we attempt to decode it
      decoded = await jwtVerify(req.query.token, appData.sensitiveConfig.jwtKey);
    } catch (err) {
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
    };

    if (!decoded.validateUserId || !decoded.validateUserEmail) {
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
    }

    const user = await appData.cache.requestValue(userIdef, decoded.validateUserId, null);
    if (!user) {
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.USER_REMOVED);
    } else if (user.blocked_at !== null) {
      res.redirect(`/${user.app_language}/?err=${ENDPOINT_ERRORS.USER_BLOCKED}`);
    }

    // this happens when the user sends a validation email, then changes the email
    // immediately and tries to use the previous token to validate the email
    // a security concern
    if (user.email !== decoded.validateUserEmail) {
      // we consider this invalid as credentials it does refer
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
    }

    const result = await appData.knex.first(CONNECTOR_SQL_COLUMN_ID_FK_NAME)
      .from(userTable).where({
        email: user.email,
        e_validated: true,
      });
    
    if (result) {
      if (result[CONNECTOR_SQL_COLUMN_ID_FK_NAME] !== user.id) {
        res.redirect(`/${user.app_language}/?err=${ENDPOINT_ERRORS.USER_EMAIL_TAKEN}`);
      } else if (result[CONNECTOR_SQL_COLUMN_ID_FK_NAME] === user.id) {
        res.redirect(`/${user.app_language}/?usrmsg=validate_account_success&usrmsgtitle=validate_account_success_title`);
      }
    }

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
    );

    res.redirect(`/${user.app_language}/?usrmsg=validate_account_success&usrmsgtitle=validate_account_success_title`);
  });

  return router;
}