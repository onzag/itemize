import { IAppDataType } from "..";
import { IGQLQueryFieldsDefinitionType } from "../../base/Root/gql";
import { GraphQLString, GraphQLNonNull } from "graphql";
import {
  CONNECTOR_SQL_COLUMN_ID_FK_NAME,
  CONNECTOR_SQL_COLUMN_VERSION_FK_NAME,
  ENDPOINT_ERRORS,
} from "../../constants";
import { jwtVerify, jwtSign } from "../token";
import { EndpointError } from "../../base/errors";
import { IServerSideTokenDataType } from "../resolvers/basic";
import { ISQLTableRowValue } from "../../base/Root/sql";
import TOKEN_OBJECT from "../custom-graphql/graphql-token-object";
import STANDARD_REPLY from "../custom-graphql/graphql-standard-reply-object";
import { capitalize } from "../../util";

// TODO recover account (just send a login standard token)

export const customUserQueries = (appData: IAppDataType): IGQLQueryFieldsDefinitionType => {
  const userModule = appData.root.getModuleFor(["users"]);
  const userIdef = userModule.getItemDefinitionFor(["user"]);

  const userTable = userIdef.getQualifiedPathName();
  const moduleTable = userModule.getQualifiedPathName();

  const usernameProperty = userIdef.getPropertyDefinitionFor("username", false);
  const passwordProperty = userIdef.getPropertyDefinitionFor("password", false);

  const userNamePropertyDescription = usernameProperty.getPropertyDefinitionDescription();
  const passwordPropertyDescription = passwordProperty.getPropertyDefinitionDescription();

  return {
    token: {
      type: TOKEN_OBJECT,
      args: {
        username: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
        token: {
          type: GraphQLString,
        },
      },
      async resolve(source: any, args: any, context: any, info: any) {
        // if there is no username and there is no token
        // the credentials are automatically invalid
        if (!args.username && !args.token) {
          throw new EndpointError({
            message: "Invalid Credentials",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          });
        }

        // now we prepare the query we use to get the
        // user related to this token or credentials
        const resultUserQuery = appData.knex.first(
          "id",
          "role",
          "blocked_at",
        ).from(moduleTable).join(userTable, (clause) => {
          clause.on(CONNECTOR_SQL_COLUMN_ID_FK_NAME, "=", "id");
          clause.on(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "=", "version");
        });
        let failureToGetUserIsCredentials = false;
        let preGeneratedToken: string = null;
        let queryHasPasswordCheck: boolean = false;
        let decodedId: number = null;

        // if we have a token provided
        if (args.token) {
          try {
            // we attempt to decode it
            const decoded = await jwtVerify<IServerSideTokenDataType>(args.token, appData.sensitiveConfig.jwtKey);
            // and set the token as the pre generated token so we reuse it
            preGeneratedToken = args.token;
            // the query fullfillment will depend on the decoded id present in the token
            resultUserQuery
              .where("id", decoded.id)
              .andWhere("role", decoded.role);

            decodedId = decoded.id;
          } catch (err) {
            throw new EndpointError({
              message: "Token is invalid",
              code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
            });
          }
        } else {
          // otherwise we are using username and password combo
          failureToGetUserIsCredentials = true;
          queryHasPasswordCheck = true;
          // and we apply as required
          resultUserQuery
            .where(userNamePropertyDescription.sqlEqual(args.username, "", usernameProperty.getId(), appData.knex))
            .andWhere(passwordPropertyDescription.sqlEqual(args.password, "", passwordProperty.getId(), appData.knex));
        }

        // now we get the user whichever was the method
        let resultUserFromSQLQuery: ISQLTableRowValue = null;
        if (!queryHasPasswordCheck) {
          resultUserFromSQLQuery = await appData.cache.requestValue(
            userIdef,
            decodedId,
            null,
          );
        } else {
          resultUserFromSQLQuery = await resultUserQuery || null;
        }

        const resultUser = resultUserFromSQLQuery;
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
          // otherwise we provide the token, either re-give the same token
          // or provide a new one
          const token = preGeneratedToken || (await jwtSign({
            id: resultUser.id,
            role: resultUser.role,
          }, appData.sensitiveConfig.jwtKey, {
            expiresIn: "7d",
          }));
          // and we return the information back to the user
          return {
            ...resultUser,
            token,
          };
        } else if (failureToGetUserIsCredentials) {
          // if we don't get an user and we previously
          // have used a username and password combination
          // we give an invalid credentials error
          throw new EndpointError({
            message: "Invalid Credentials",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          });
        } else {
          // otherwise the user has been removed as the id
          // is not found, this can happen if the user
          // has kept a session active after nuking his account
          throw new EndpointError({
            message: "User has been removed",
            code: ENDPOINT_ERRORS.USER_REMOVED,
          });
        }
      },
    },
    send_validate_email: {
      type: STANDARD_REPLY,
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        }
      },
      async resolve(source: any, args: any, context: any, info: any) {
        if (!appData.mailgun) {
          throw new EndpointError({
            message: "Mailgun is not available",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        }

        let decoded: IServerSideTokenDataType;
        try {
          // we attempt to decode it
          decoded = await jwtVerify<IServerSideTokenDataType>(args.token, appData.sensitiveConfig.jwtKey);
        } catch (err) {
          throw new EndpointError({
            message: "Token is invalid",
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          });
        }

        const resultUser = await appData.cache.requestValue(userIdef, decoded.id, null);
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
        } else {
          // otherwise the user has been removed as the id
          // is not found, this can happen if the user
          // has kept a session active after nuking his account
          throw new EndpointError({
            message: "User has been removed",
            code: ENDPOINT_ERRORS.USER_REMOVED,
          });
        }

        if (!resultUser.email) {
          // the error is unspecified because this shouldn't
          // be allowed to happen in the client side
          throw new EndpointError({
            message: "There's no email to validate",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        } else if (resultUser.e_validated) {
          throw new EndpointError({
            message: "User is already validated",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          });
        }

        // now we try to find another user with such email that has already validated
        // such
        const userWithThatEmail = await appData.knex.first(CONNECTOR_SQL_COLUMN_ID_FK_NAME)
          .from(userTable).where({
            email: resultUser.email,
            e_validated: true,
          });

        if (userWithThatEmail) {
          throw new EndpointError({
            message: "That email is taken",
            code: ENDPOINT_ERRORS.USER_EMAIL_TAKEN,
          });
        }

        const appLanguage = resultUser.app_language;
        let languageToUse = appLanguage;
        let i18nData = userIdef.getI18nDataFor(appLanguage);
        if (!i18nData) {
          languageToUse = "en";
          i18nData = userIdef.getI18nDataFor("en");
        }

        const validateToken = await jwtSign({validateUserId: decoded.id}, appData.sensitiveConfig.jwtKey);
        const validateLink = (appData.sensitiveConfig.mailgunTargetDomain || appData.config.productionHostname) +
          "/rest/user/validate-email&token" + encodeURIComponent(validateToken);

        const templateToUse = i18nData.custom.validate_account_template_name;
        const from = `${i18nData.custom.validate_account_user} <${i18nData.custom.validate_account_email_user}@${appData.sensitiveConfig.mailgunDomain}>`;
        const to = resultUser.email;
        const subject = capitalize(i18nData.custom.validate_account);
        if (!templateToUse) {
          await appData.mailgun.messages().send({
            from,
            to,
            subject,
            text: `You do not have a template setup for language ${languageToUse}\n` +
            `validate_account_link = ${validateLink}\n` +
            `validate_account = ${i18nData.custom.validate_account}\n` +
            `validate_account_title = ${i18nData.custom.validate_account_title}\n` +
            `validate_account_description = ${i18nData.custom.validate_account_description}\n` +
            `validate_account_activate_button = ${i18nData.custom.validate_account_activate_button}\n` +
            `validate_account_alt_link = ${i18nData.custom.validate_account_alt_link}`
          });
        } else {
          await appData.mailgun.messages().send({
            from,
            to,
            subject,
            template: templateToUse,
            validate_account_link: validateLink,
            validate_account: i18nData.custom.validate_account,
            validate_account_title: i18nData.custom.validate_account_title,
            validate_account_description: i18nData.custom.validate_account_description,
            validate_account_activate_button: i18nData.custom.validate_account_activate_button,
            validate_account_alt_link: i18nData.custom.validate_account_alt_link,
          });
        }
      }
    },
  };
};
