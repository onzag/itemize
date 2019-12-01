import { IAppDataType } from "..";
import { IGQLQueryFieldsDefinitionType } from "../../../itemize/base/Root/gql";
import { GraphQLString, GraphQLObjectType, GraphQLInt } from "graphql";
import { CONNECTOR_SQL_COLUMN_FK_NAME } from "../../constants";
import { jwtVerify, jwtSign } from "../token";
import { GraphQLEndpointError } from "../../../itemize/base/errors";
import { PropertyInvalidReason } from "../../../itemize/base/Root/Module/ItemDefinition/PropertyDefinition";

export const customUserQueries = (appData: IAppDataType): IGQLQueryFieldsDefinitionType => {
  const userModule = appData.root.getModule("users");
  const userIdef = userModule.getItemDefinitionFor(["user"]);

  const userTable = userIdef.getQualifiedPathName();

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
        if (!args.username && !args.token) {
          throw new GraphQLEndpointError({
            message: "Invalid Credentials",
            code: "INVALID_CREDENTIALS",
          });
        }

        if (args.token) {
          try {
            const decoded: any = await jwtVerify(args.token, appData.config.jwtKey) as object;
            return {
              token: args.token,
              id: decoded.id,
              role: decoded.role,
            };
          } catch (err) {
            return null;
          }
        } else {
          const resultUser = await appData.knex.first(
            appData.knex.raw("?? AS ??", [CONNECTOR_SQL_COLUMN_FK_NAME, "id"]),
            "role",
          ).from(userTable)
          .where(userNamePropertyDescription.sqlEqual(args.username, "", usernameProperty.getId(), appData.knex))
          .andWhere(passwordPropertyDescription.sqlEqual(args.password, "", passwordProperty.getId(), appData.knex));

          if (resultUser) {
            const token = await jwtSign(resultUser, appData.config.jwtKey, {
              expiresIn: "7d",
            });
            return {
              ...resultUser,
              token,
            };
          } else {
            throw new GraphQLEndpointError({
              message: "Invalid Credentials",
              code: "INVALID_CREDENTIALS",
            });
          }
        }
      },
    },
  };
};
