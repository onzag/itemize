"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../../constants");
const token_1 = require("../token");
function userRestServices(appData) {
    const userModule = appData.root.getModuleFor(["users"]);
    const userIdef = userModule.getItemDefinitionFor(["user"]);
    const userTable = userIdef.getQualifiedPathName();
    const router = express_1.Router();
    router.get("/validate-email", async (req, res) => {
        if (!req.query.token) {
            res.redirect("/en/?err=" + constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS);
        }
        let decoded;
        try {
            // we attempt to decode it
            decoded = await token_1.jwtVerify(req.query.token, appData.sensitiveConfig.jwtKey);
        }
        catch (err) {
            res.redirect("/en/?err=" + constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS);
        }
        ;
        if (!decoded.validateUserId || !decoded.validateUserEmail) {
            res.redirect("/en/?err=" + constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS);
        }
        const user = await appData.cache.requestValue(userIdef, decoded.validateUserId, null);
        if (!user) {
            res.redirect("/en/?err=" + constants_1.ENDPOINT_ERRORS.USER_REMOVED);
        }
        else if (user.blocked_at !== null) {
            res.redirect(`/${user.app_language}/?err=${constants_1.ENDPOINT_ERRORS.USER_BLOCKED}`);
        }
        // this happens when the user sends a validation email, then changes the email
        // immediately and tries to use the previous token to validate the email
        // a security concern
        if (user.email !== decoded.validateUserEmail) {
            // we consider this invalid as credentials it does refer
            res.redirect("/en/?err=" + constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS);
        }
        const result = await appData.knex.first(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME)
            .from(userTable).where({
            email: user.email,
            e_validated: true,
        });
        if (result) {
            if (result[constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME] !== user.id) {
                res.redirect(`/${user.app_language}/?err=${constants_1.ENDPOINT_ERRORS.USER_EMAIL_TAKEN}`);
            }
            else if (result[constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME] === user.id) {
                res.redirect(`/${user.app_language}/?msg=validate_account_success&msgtitle=validate_account_success_title`);
            }
        }
        await appData.cache.requestUpdate(userIdef, decoded.validateUserId, null, {
            e_validated: true,
        }, null, null, null, null);
        res.redirect(`/${user.app_language}/?msg=validate_account_success&msgtitle=validate_account_success_title`);
    });
    return router;
}
exports.userRestServices = userRestServices;
