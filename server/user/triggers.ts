import { ITriggerRegistry, IOTriggerActions } from "../resolvers/triggers";
import { CONNECTOR_SQL_COLUMN_ID_FK_NAME, ENDPOINT_ERRORS, PROTECTED_USERNAMES } from "../../constants";
import { EndpointError } from "../../base/errors";
import { ISQLTableRowValue } from "../../base/Root/sql";
import { logger } from "../";

export const customUserTriggers: ITriggerRegistry = {
  itemDefinition: {
    io: {
      "users/user": async (arg) => {
        // these might not be there on custom builds so we check
        // if these properties are even real
        const hasEmail = arg.itemDefinition.hasPropertyDefinitionFor("email", false);
        const hasEvalidated = arg.itemDefinition.hasPropertyDefinitionFor("e_validated", false);
        
        // check for sessionId changes in order to trigger a whole kick
        // event
        if (
          (arg.action === IOTriggerActions.CREATE || arg.action === IOTriggerActions.EDIT) &&
          arg.value &&
          arg.update
        ) {
          const newSessionId = arg.update.sessionId;
          const oldSessionId = arg.value.sessionId;

          if (newSessionId && newSessionId !== oldSessionId) {
            arg.appData.listener.sendKickEvent(arg.value.id as string);
          }

          const newUsername = arg.update.username;
          if (newUsername) {
            if (PROTECTED_USERNAMES.includes(newUsername as string)) {
              arg.forbid("This is a protected username");
              return;
            }
          }

          if (hasEmail && arg.update.email) {
            const host = (arg.update.email as string).split("@")[1];
            const isEmailPartOfThisHost =
              host === arg.appData.config.developmentHostname ||
              host === arg.appData.config.productionHostname;
            if (isEmailPartOfThisHost) {
              arg.forbid("Emails from the same domain are not allowed");
            }
          }
        }

        // we add a trigger for when the user updated the email
        // either because of creation or from a normal update
        // from will be null during creation, this means creation
        // will trigger this path
        if (
          hasEmail &&
          hasEvalidated &&
          (arg.action === IOTriggerActions.CREATE || arg.action === IOTriggerActions.EDIT) &&
          arg.update
        ) {
          // so this is the new email, remember this can be null and it
          // can be a partial update in which case it's undefined
          const newEmail = arg.update.email;
          // and this is the email that was changed to
          // !arg from means this is a new user that has assigned itself an email
          // or the new Email is not undefined and the new email is not equal to the old
          const changedEmail = !arg.value || (typeof newEmail !== "undefined" && newEmail !== arg.value.email);
          // newEmail being set is not null, and new email being set is not undefined which means is not
          // being updated at all
          if (
            changedEmail && newEmail !== null && typeof newEmail !== "undefined"
          ) {
            // now we try to find another user with such email
            let result: ISQLTableRowValue;
            try {
              result = await arg.appData.knex.first(CONNECTOR_SQL_COLUMN_ID_FK_NAME)
                .from(arg.itemDefinition.getQualifiedPathName()).where({
                  email: newEmail,
                  e_validated: true,
                });
            } catch (err) {
              logger.error("customUserTriggers [SERIOUS]: Failed to execute SQL query to check " +
                "if email had been taken for email " + newEmail + " this caused the whole user not to be able to update/create");
              throw err;
            }

            // if there's no such
            if (!result) {
              // then it's allowed and we mark e_validated as false
              return {
                ...arg.update,
                e_validated: false,
              }
            } else {
              // otherwise we throw an error that the email has been taken
              throw new EndpointError({
                message: "The email has been taken and validated by another user",
                code: ENDPOINT_ERRORS.USER_EMAIL_TAKEN,
              });
            }
          } else if (newEmail === null) {
            // if otherwise we gave a new email that is null
            // then we set e_vaidated to false, null cannot be a valid
            // email after all
            return {
              ...arg.update,
              e_validated: false,
            }
          }
        }
        return null;
      }
    },
  }
}