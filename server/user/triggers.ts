import { ITriggerRegistry } from "../resolvers/triggers";
import { CONNECTOR_SQL_COLUMN_ID_FK_NAME, ENDPOINT_ERRORS } from "../../constants";
import { EndpointError } from "../../base/errors";

// TODO mailing lists triggers per language supported

export const customUserTriggers: ITriggerRegistry = {
  itemDefinition: {
    "users/user": async (arg) => {
      // we add a trigger for when the user updated the email
      // either because of creation or from a normal update
      if (
        arg.update &&
        typeof arg.update !== "undefined"
      ) {
        // so this is the new email, remember this can be null
        const newEmail = arg.update.email;
        // and this is the email that was changed to
        const changedEmail = !arg.from || newEmail !== arg.from.email;
        if (
          changedEmail && newEmail !== null
        ) {
          // now we try to find another user with such email
          const result = await arg.appData.knex.first(CONNECTOR_SQL_COLUMN_ID_FK_NAME)
            .from(arg.itemDefinition.getQualifiedPathName()).where({
              email: newEmail,
              e_validated: true,
            });

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
  }
}