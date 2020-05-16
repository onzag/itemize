"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const errors_1 = require("../../base/errors");
const __1 = require("../");
// TODO mailing lists triggers per language supported
exports.customUserTriggers = {
    itemDefinition: {
        "users/user": async (arg) => {
            // we add a trigger for when the user updated the email
            // either because of creation or from a normal update
            // from will be null during creation, this means creation
            // will trigger this path
            if (arg.update &&
                typeof arg.update !== "undefined") {
                // so this is the new email, remember this can be null and it
                // can be a partial update in which case it's undefined
                const newEmail = arg.update.email;
                // and this is the email that was changed to
                const changedEmail = !arg.from || (typeof newEmail !== "undefined" && newEmail !== arg.from.email);
                if (changedEmail && newEmail !== null) {
                    // now we try to find another user with such email
                    let result;
                    try {
                        result = await arg.appData.knex.first(constants_1.CONNECTOR_SQL_COLUMN_ID_FK_NAME)
                            .from(arg.itemDefinition.getQualifiedPathName()).where({
                            email: newEmail,
                            e_validated: true,
                        });
                    }
                    catch (err) {
                        __1.logger.error("customUserTriggers [SERIOUS]: Failed to execute SQL query to check " +
                            " if email had been taken for email " + newEmail + " this caused the whole user not to be able to update/create");
                        throw err;
                    }
                    // if there's no such
                    if (!result) {
                        // then it's allowed and we mark e_validated as false
                        return {
                            ...arg.update,
                            e_validated: false,
                        };
                    }
                    else {
                        // otherwise we throw an error that the email has been taken
                        throw new errors_1.EndpointError({
                            message: "The email has been taken and validated by another user",
                            code: constants_1.ENDPOINT_ERRORS.USER_EMAIL_TAKEN,
                        });
                    }
                }
                else if (newEmail === null) {
                    // if otherwise we gave a new email that is null
                    // then we set e_vaidated to false, null cannot be a valid
                    // email after all
                    return {
                        ...arg.update,
                        e_validated: false,
                    };
                }
            }
            return null;
        }
    }
};
