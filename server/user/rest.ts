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
    let decoded: {
      validateUserId: number;
    };
    try {
      // we attempt to decode it
      decoded = await jwtVerify(req.query.token, appData.sensitiveConfig.jwtKey);
    } catch (err) {
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
    };

    if (!decoded.validateUserId) {
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
    }

    const user = await appData.cache.requestValue(userIdef, decoded.validateUserId, null);
    if (!user) {
      res.redirect("/en/?err=" + ENDPOINT_ERRORS.USER_REMOVED);
    } else if (user.blocked_at !== null) {
      res.redirect(`/${user.app_language}/?err=${ENDPOINT_ERRORS.USER_BLOCKED}`);
    }

    const result = await appData.knex.first(CONNECTOR_SQL_COLUMN_ID_FK_NAME)
      .from(userTable).where({
        email: user.email,
        e_validated: true,
      });
    
    if (result && result[CONNECTOR_SQL_COLUMN_ID_FK_NAME] !== user.id) {
      res.redirect(`/${user.app_language}/?err=${ENDPOINT_ERRORS.USER_EMAIL_TAKEN}`);
    } else if (result[CONNECTOR_SQL_COLUMN_ID_FK_NAME] === user.id) {
      res.redirect(`/${user.app_language}/?usrmsg=validate_account_success`);
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

    res.redirect(`/${user.app_language}/?usrmsg=validate_account_success`);
  });
}