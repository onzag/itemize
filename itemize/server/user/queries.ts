import { IAppDataType } from "..";
import { IGQLQueryFieldsDefinitionType } from "../../../itemize/base/Root/gql";
import { GraphQLString, GraphQLObjectType, GraphQLInt } from "graphql";
import { CONNECTOR_SQL_COLUMN_FK_NAME } from "../../constants";
import { jwtVerify, jwtSign } from "../token";
import { GraphQLEndpointError } from "../../../itemize/base/errors";
import { IServerSideTokenDataType } from "../resolvers/basic";
import { ISQLTableRowValue } from "../../base/Root/sql";

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
      type: new GraphQLObjectType({
        name: "TOKEN_OBJECT",
        fields: {
          token: {
            type: GraphQLString,
          },
          id: {
            type: GraphQLInt,
          },
          role: {
            type: GraphQLString,
          },
        },
      }),
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
          throw new GraphQLEndpointError({
            message: "Invalid Credentials",
            code: "INVALID_CREDENTIALS",
          });
        }

        // now we prepare the query we use to get the
        // user related to this token or credentials
        const resultUserQuery = appData.knex.first(
          "id",
          "role",
          "blocked_at",
        ).from(moduleTable).join(userTable, (clause) => {
          clause.on(CONNECTOR_SQL_COLUMN_FK_NAME, "=", "id");
        });
        let failureToGetUserIsCredentials = false;
        let preGeneratedToken: string = null;
        let queryHasPasswordCheck: boolean = false;
        let decodedId: number = null;

        // if we have a token provided
        if (args.token) {
          try {
            // we attempt to decode it
            const decoded = await jwtVerify<IServerSideTokenDataType>(args.token, appData.config.jwtKey);
            // and set the token as the pre generated token so we reuse it
            preGeneratedToken = args.token;
            // the query fullfillment will depend on the decoded id present in the token
            resultUserQuery
              .where("id", decoded.id)
              .andWhere("role", decoded.role);

            decodedId = decoded.id;
          } catch (err) {
            throw new GraphQLEndpointError({
              message: "Token is invalid",
              code: "INVALID_CREDENTIALS",
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
          resultUserFromSQLQuery = await appData.cache.requestCache(
            userTable,
            moduleTable,
            decodedId,
          );
        } else {
          resultUserFromSQLQuery = await resultUserQuery;
        }

        let resultUser = resultUserFromSQLQuery;
        if (resultUser) {
          resultUser = {
            id: resultUser.id,
            role: resultUser.role,
            blocked_at: resultUser.blocked_at,
          };
        }
        // if we get an user
        if (resultUser) {
          // if the user is blocked
          if (resultUser.blocked_at) {
            // we give an error for that
            throw new GraphQLEndpointError({
              message: "User is blocked",
              code: "USER_BLOCKED",
            });
          }
          // otherwise we provide the token, either re-give the same token
          // or provide a new one
          const token = preGeneratedToken || (await jwtSign(resultUser, appData.config.jwtKey, {
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
          throw new GraphQLEndpointError({
            message: "Invalid Credentials",
            code: "INVALID_CREDENTIALS",
          });
        } else {
          // otherwise the user has been removed as the id
          // is not found, this can happen if the user
          // has kept a session active after nuking his account
          throw new GraphQLEndpointError({
            message: "User has been removed",
            code: "USER_REMOVED",
          });
        }
      },
    },
  };
};
